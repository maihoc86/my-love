import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '@/theme';
import { View, Text, Pressable, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Send } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { speechToText } from '@/lib/openrouter';

// ─── Waveform bar heights (fixed, matches stitch) ─────────────────────────────
const BAR_HEIGHTS = [16, 32, 48, 64, 40, 56, 24];

// ─── Recording Screen ──────────────────────────────────────────────────────────

export default function RecordingScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  // Pulsing ring animations
  const ring1 = useRef(new Animated.Value(1)).current;
  const ring2 = useRef(new Animated.Value(1)).current;

  // Waveform bar animations
  const bars = useRef(BAR_HEIGHTS.map(() => new Animated.Value(1))).current;

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

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        recordingRef.current = recording;
        setIsRecording(true);
      } catch (err) {
        console.error('[Recording] Init error:', err);
        Alert.alert('Lỗi', 'Không thể bắt đầu ghi âm. Vui lòng thử lại.');
        router.back();
      }
    };

    initRecording();

    return () => {
      // Cleanup: stop recording if component unmounts
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

  // Pulsing ring loop
  useEffect(() => {
    if (!isRecording) return;

    const pulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1.08, duration: 900, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        ])
      );

    const a1 = pulse(ring1, 0);
    const a2 = pulse(ring2, 450);
    a1.start();
    a2.start();
    return () => { a1.stop(); a2.stop(); };
  }, [isRecording]);

  // Waveform bar animation loop
  useEffect(() => {
    if (!isRecording) return;

    const anims = bars.map((bar, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 80),
          Animated.timing(bar, { toValue: 0.4, duration: 300 + i * 40, useNativeDriver: true }),
          Animated.timing(bar, { toValue: 1, duration: 300 + i * 40, useNativeDriver: true }),
          Animated.delay(200),
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
    if (!recordingRef.current || isTranscribing) return;

    setIsRecording(false);
    setIsTranscribing(true);

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;

      if (!uri) {
        throw new Error('Không tìm thấy file ghi âm');
      }

      // Read audio file as base64
      const audioBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Transcribe via OpenRouter STT
      const transcribedText = await speechToText(audioBase64, 'mp3');

      // Reset audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      // Navigate back to chat with the transcribed text
      router.back();
      // Use setTimeout to ensure navigation completes before setting params
      setTimeout(() => {
        router.setParams({ voiceText: transcribedText });
      }, 100);
    } catch (err) {
      console.error('[Recording] Transcribe error:', err);
      Alert.alert(
        'Lỗi chuyển giọng nói',
        err instanceof Error ? err.message : 'Không thể chuyển giọng nói thành văn bản.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  }, [isTranscribing, router]);

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
    <LinearGradient
      colors={[Colors.surface, 'rgba(255,45,85,0.05)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* ── Header ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 4,
            paddingTop: 4,
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

          <Text style={{ fontSize: 17, fontWeight: '700', color: Colors.textPrimary }}>
            AI Love
          </Text>

          {/* Spacer to balance header */}
          <View style={{ width: 48 }} />
        </View>

        {/* ── Content ── */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>

          {/* Status badge */}
          <View
            style={{
              backgroundColor: 'rgba(255,45,85,0.1)',
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 24,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: Colors.primary,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              {isTranscribing ? 'Đang chuyển thành văn bản...' : isRecording ? 'Đang lắng nghe...' : 'Đã dừng'}
            </Text>
          </View>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: Colors.textSecondary,
              marginBottom: 48,
              textAlign: 'center',
            }}
          >
            {isTranscribing
              ? 'OpenRouter AI đang xử lý giọng nói của bạn'
              : 'AI sẽ tự động chuyển thành văn bản'}
          </Text>

          {/* Visualizer: rings + mic + waveform */}
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 48 }}>
            {/* Outer pulsing ring */}
            <Animated.View
              style={{
                position: 'absolute',
                width: 256,
                height: 256,
                borderRadius: 128,
                backgroundColor: isTranscribing ? 'rgba(123,97,255,0.08)' : 'rgba(255,45,85,0.08)',
                transform: [{ scale: ring1 }],
              }}
            />
            {/* Inner pulsing ring */}
            <Animated.View
              style={{
                position: 'absolute',
                width: 192,
                height: 192,
                borderRadius: 96,
                backgroundColor: isTranscribing ? 'rgba(123,97,255,0.15)' : Colors.primaryAlpha15,
                transform: [{ scale: ring2 }],
              }}
            />

            {/* Mic circle — gradient rose → purple */}
            <LinearGradient
              colors={isTranscribing ? ['#7B61FF', '#5B3FDF'] : [Colors.primary, '#7B61FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: isTranscribing ? '#7B61FF' : Colors.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.35,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <Text style={{ fontSize: 48, color: Colors.surface }}>
                {isTranscribing ? '🤖' : '🎙'}
              </Text>
            </LinearGradient>

            {/* Waveform bars — absolutely below the mic area */}
            {!isTranscribing && (
              <View
                style={{
                  position: 'absolute',
                  bottom: -64,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: 6,
                }}
              >
                {BAR_HEIGHTS.map((h, i) => (
                  <Animated.View
                    key={i}
                    style={{
                      width: 6,
                      height: h,
                      borderRadius: 3,
                      backgroundColor: Colors.primary,
                      opacity: bars[i].interpolate({
                        inputRange: [0.4, 1],
                        outputRange: [
                          0.3 + i * 0.1,
                          0.5 + i * 0.07,
                        ],
                      }),
                      transform: [{ scaleY: isRecording ? bars[i] : new Animated.Value(0.3) }],
                    }}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Timer */}
          <Text
            style={{
              fontSize: 56,
              fontWeight: '800',
              color: Colors.textPrimary,
              letterSpacing: -1,
              marginBottom: 48,
            }}
          >
            {formatTime(seconds)}
          </Text>

          {/* Action buttons — vertical stacked */}
          <View style={{ width: '100%', gap: 12 }}>
            {/* Dừng & Gửi — gradient */}
            <Pressable
              onPress={handleStopAndSend}
              disabled={isTranscribing || !isRecording}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : isTranscribing ? 0.6 : 1 })}
              accessibilityLabel="Dừng và gửi"
              accessibilityRole="button"
            >
              <LinearGradient
                colors={[Colors.primary, '#7B61FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  borderRadius: 14,
                  gap: 8,
                  shadowColor: Colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <Send size={18} color="#ffffff" />
                <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.surface }}>
                  {isTranscribing ? 'Đang xử lý...' : 'Dừng & Gửi'}
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Hủy — slate-100 bg */}
            <Pressable
              onPress={handleCancel}
              disabled={isTranscribing}
              style={({ pressed }) => ({
                backgroundColor: pressed ? Colors.border : Colors.surfaceSecondary,
                paddingVertical: 16,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isTranscribing ? 0.5 : 1,
              })}
              accessibilityLabel="Hủy"
              accessibilityRole="button"
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.textSecondary }}>
                Hủy
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Decorative blur circles */}
        <View
          style={{
            position: 'absolute',
            top: 80,
            right: -50,
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: 'rgba(123,97,255,0.06)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 80,
            left: -50,
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: 'rgba(255,45,85,0.06)',
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
