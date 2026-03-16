import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '@/theme';
import { View, Text, Pressable, Animated, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, Mic, Send } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { speechToText } from '@/lib/openrouter';
import { logger } from '@/lib/logger';

// ─── Waveform bar config ────────────────────────────────────────────────────────
const NUM_BARS = 24;
const BAR_SEEDS = Array.from({ length: NUM_BARS }, (_, i) => 8 + Math.sin(i * 0.7) * 12 + Math.random() * 8);

export default function RecordingScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  // Mic pulse animation
  const pulse = useRef(new Animated.Value(1)).current;

  // Waveform bar animations
  const bars = useRef(BAR_SEEDS.map(() => new Animated.Value(0.5))).current;

  // Request permission and start recording on mount
  useEffect(() => {
    const initRecording = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Cần quyền micro',
            'Vui lòng cho phép ứng dụng truy cập micro để ghi âm.',
            [{ text: 'OK', onPress: () => router.back() }]
          );
          return;
        }
        setPermissionGranted(true);
        logger.info('Recording', 'Mic permission granted');

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync({
          isMeteringEnabled: true,
          android: {
            extension: '.wav',
            outputFormat: Audio.AndroidOutputFormat.DEFAULT,
            audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          ios: {
            extension: '.wav',
            outputFormat: Audio.IOSOutputFormat.LINEARPCM,
            audioQuality: Audio.IOSAudioQuality.MAX,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
          web: {
            mimeType: 'audio/wav',
            bitsPerSecond: 128000,
          },
        });
        recordingRef.current = recording;
        setIsRecording(true);
        logger.info('Recording', 'Recording started (WAV, 44.1kHz, mono)');
      } catch (err) {
        logger.error('Recording', 'Init error', err instanceof Error ? err.message : err);
        Alert.alert('Lỗi', 'Không thể bắt đầu ghi âm. Vui lòng thử lại.');
        router.back();
      }
    };

    initRecording();

    return () => {
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(() => {});
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    if (!isRecording) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRecording]);

  // Mic pulse animation
  useEffect(() => {
    if (!isRecording) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.15, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [isRecording]);

  // Waveform bar animation
  useEffect(() => {
    if (!isRecording) return;
    const anims = bars.map((bar, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 50),
          Animated.timing(bar, { toValue: 0.3 + Math.random() * 0.7, duration: 200 + Math.random() * 200, useNativeDriver: true }),
          Animated.timing(bar, { toValue: 0.5, duration: 200 + Math.random() * 200, useNativeDriver: true }),
        ])
      )
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [isRecording]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleStopAndSend = useCallback(async () => {
    logger.info('Recording', 'Send button pressed', {
      hasRecording: !!recordingRef.current,
      isTranscribing,
      isRecording,
    });

    if (!recordingRef.current || isTranscribing) {
      logger.warn('Recording', 'Send blocked — no recording or already transcribing');
      return;
    }

    setIsRecording(false);
    setIsTranscribing(true);
    logger.info('Recording', 'Stopped recording, starting transcription', { durationSec: seconds });

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      logger.info('Recording', 'Audio file URI', uri);
      recordingRef.current = null;

      if (!uri) {
        throw new Error('Không tìm thấy file ghi âm');
      }

      // Read audio file as base64 using expo-file-system (reliable on React Native)
      const audioBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      logger.info('Recording', 'Audio file read as base64', { length: audioBase64.length });

      const transcribedText = await speechToText(audioBase64, 'wav');

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      router.back();
      setTimeout(() => {
        router.setParams({ voiceText: transcribedText });
      }, 100);
    } catch (err) {
      logger.error('Recording', 'Transcribe error', err instanceof Error ? err.message : err);
      Alert.alert(
        'Lỗi chuyển giọng nói',
        err instanceof Error ? err.message : 'Không thể chuyển giọng nói thành văn bản.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  }, [isTranscribing, isRecording, seconds, router]);

  const handleCancel = useCallback(async () => {
    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
      } catch {
        // ignore
      }
      recordingRef.current = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    router.back();
  }, [router]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* ── Header ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <Pressable
            onPress={handleCancel}
            hitSlop={12}
            style={({ pressed }) => ({
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            })}
            accessibilityLabel="Đóng"
            accessibilityRole="button"
          >
            <X size={24} color={Colors.textPrimary} />
          </Pressable>

          <Text style={{ fontSize: 17, fontWeight: '600', color: Colors.textPrimary }}>
            Ghi âm
          </Text>

          <View style={{ width: 48 }} />
        </View>

        {/* ── Main Content ── */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>

          {/* Status text */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: isTranscribing ? Colors.aiPurple : Colors.textSecondary,
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            {isTranscribing
              ? 'Đang chuyển thành văn bản...'
              : 'Hãy nói, AI sẽ tự động nhận diện'}
          </Text>

          {/* Mic circle with subtle pulse */}
          <Animated.View
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: isTranscribing ? Colors.aiPurple : Colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
              transform: [{ scale: isRecording ? pulse : 1 }],
              shadowColor: isTranscribing ? Colors.aiPurple : Colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            {isTranscribing ? (
              <ActivityIndicator size="small" color={Colors.textOnPrimary} />
            ) : (
              <Mic size={32} color={Colors.textOnPrimary} />
            )}
          </Animated.View>

          {/* Waveform */}
          {!isTranscribing && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                marginBottom: 24,
                height: 32,
              }}
            >
              {BAR_SEEDS.map((h, i) => (
                <Animated.View
                  key={i}
                  style={{
                    width: 3,
                    borderRadius: 2,
                    backgroundColor: Colors.primary,
                    height: h,
                    opacity: 0.6,
                    transform: [{ scaleY: isRecording ? bars[i] : 0.3 }],
                  }}
                />
              ))}
            </View>
          )}

          {/* Timer */}
          <Text
            style={{
              fontSize: 40,
              fontWeight: '700',
              color: Colors.textPrimary,
              letterSpacing: 1,
              fontVariant: ['tabular-nums'],
              marginBottom: 48,
            }}
          >
            {formatTime(seconds)}
          </Text>

          {/* Actions — inline in content */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
            }}
          >
            {/* Cancel */}
            <Pressable
              onPress={handleCancel}
              style={({ pressed }) => ({
                width: 56,
                height: 56,
                borderRadius: 28,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.surfaceSecondary,
                borderWidth: 1,
                borderColor: Colors.border,
                opacity: isTranscribing ? 0.4 : pressed ? 0.7 : 1,
              })}
              accessibilityLabel="Hủy ghi âm"
              accessibilityRole="button"
            >
              <X size={22} color={Colors.textSecondary} />
            </Pressable>

            {/* Send */}
            <Pressable
              onPress={handleStopAndSend}
              style={({ pressed }) => ({
                width: 72,
                height: 72,
                borderRadius: 36,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isTranscribing ? Colors.aiPurple : Colors.primary,
                opacity: isTranscribing ? 0.7 : pressed ? 0.85 : 1,
                shadowColor: isTranscribing ? Colors.aiPurple : Colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              })}
              accessibilityLabel="Dừng và gửi"
              accessibilityRole="button"
            >
              {isTranscribing ? (
                <ActivityIndicator size="small" color={Colors.textOnPrimary} />
              ) : (
                <Send size={26} color={Colors.textOnPrimary} />
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
