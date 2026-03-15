import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Send } from 'lucide-react-native';

// ─── Waveform bar heights (fixed, matches stitch) ─────────────────────────────
const BAR_HEIGHTS = [16, 32, 48, 64, 40, 56, 24];

// ─── Recording Screen ──────────────────────────────────────────────────────────

export default function RecordingScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(true);

  // Pulsing ring animations
  const ring1 = useRef(new Animated.Value(1)).current;
  const ring2 = useRef(new Animated.Value(1)).current;

  // Waveform bar animations
  const bars = useRef(BAR_HEIGHTS.map(() => new Animated.Value(1))).current;

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

  const handleStopAndSend = () => {
    setIsRecording(false);
    // TODO: transcribe audio → send to AI Chat
    setTimeout(() => router.back(), 400);
  };

  return (
    <LinearGradient
      colors={['#ffffff', 'rgba(244,63,94,0.05)']}
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
            onPress={() => router.back()}
            hitSlop={12}
            style={({ pressed }) => ({
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            })}
            accessibilityLabel="Đóng"
          >
            <X size={24} color="#1f2937" />
          </Pressable>

          <Text style={{ fontSize: 17, fontWeight: '700', color: '#1f2937' }}>
            MyLoveThaiHoc
          </Text>

          {/* Spacer to balance header */}
          <View style={{ width: 48 }} />
        </View>

        {/* ── Content ── */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>

          {/* Status badge */}
          <View
            style={{
              backgroundColor: 'rgba(244,63,94,0.1)',
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
                color: '#f43f5e',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              {isRecording ? 'Đang lắng nghe...' : 'Đã dừng'}
            </Text>
          </View>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#6b7280',
              marginBottom: 48,
              textAlign: 'center',
            }}
          >
            AI sẽ tự động chuyển thành văn bản
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
                backgroundColor: 'rgba(244,63,94,0.08)',
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
                backgroundColor: 'rgba(244,63,94,0.15)',
                transform: [{ scale: ring2 }],
              }}
            />

            {/* Mic circle — gradient rose → purple */}
            <LinearGradient
              colors={['#f43f5e', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#f43f5e',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.35,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <Text style={{ fontSize: 48, color: '#ffffff' }}>🎙</Text>
            </LinearGradient>

            {/* Waveform bars — absolutely below the mic area */}
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
                    backgroundColor: '#f43f5e',
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
          </View>

          {/* Timer */}
          <Text
            style={{
              fontSize: 56,
              fontWeight: '800',
              color: '#1f2937',
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
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              accessibilityLabel="Dừng và gửi"
            >
              <LinearGradient
                colors={['#f43f5e', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  borderRadius: 14,
                  gap: 8,
                  shadowColor: '#f43f5e',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <Send size={18} color="#ffffff" />
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#ffffff' }}>
                  Dừng &amp; Gửi
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Hủy — slate-100 bg */}
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#e5e7eb' : '#f1f5f9',
                paddingVertical: 16,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
              })}
              accessibilityLabel="Hủy"
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#4b5563' }}>
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
            backgroundColor: 'rgba(139,92,246,0.06)',
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
            backgroundColor: 'rgba(244,63,94,0.06)',
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
