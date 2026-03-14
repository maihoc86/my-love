import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { X, Mic, Send } from "lucide-react-native";

export default function RecordingScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleStopAndSend = () => {
    setIsRecording(false);
    // TODO: Send to AI for transcription
    setTimeout(() => router.back(), 500);
  };

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: "#1e1b2e" }}
    >
      {/* Close Button */}
      <Pressable
        className="absolute top-16 left-6 w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        onPress={() => router.back()}
      >
        <X size={20} color="#fff" />
      </Pressable>

      {/* Status */}
      <View className="items-center mb-8">
        <Text className="text-white/60 text-xs uppercase tracking-widest font-bold">
          {isRecording ? "ĐANG LẮNG NGHE..." : "ĐÃ DỪNG"}
        </Text>
        <Text className="text-white/40 text-xs mt-1">
          AI sẽ tự động chuyển thành văn bản
        </Text>
      </View>

      {/* Pulsing Mic */}
      <View className="items-center justify-center mb-8">
        {/* Outer rings */}
        {isRecording && (
          <>
            <View
              className="absolute w-40 h-40 rounded-full"
              style={{ backgroundColor: "rgba(244,63,94,0.08)" }}
            />
            <View
              className="absolute w-32 h-32 rounded-full"
              style={{ backgroundColor: "rgba(244,63,94,0.15)" }}
            />
            <View
              className="absolute w-24 h-24 rounded-full"
              style={{ backgroundColor: "rgba(244,63,94,0.25)" }}
            />
          </>
        )}
        <View
          className="w-20 h-20 rounded-full items-center justify-center"
          style={{ backgroundColor: "#f43f5e" }}
        >
          <Mic size={36} color="#fff" />
        </View>
      </View>

      {/* Waveform */}
      <View className="flex-row items-center gap-1 mb-6 h-12">
        {[...Array(24)].map((_, i) => (
          <View
            key={i}
            className="rounded-full"
            style={{
              width: 3,
              height: isRecording ? 8 + Math.random() * 32 : 4,
              backgroundColor: isRecording
                ? `rgba(244,63,94,${0.4 + Math.random() * 0.6})`
                : "rgba(244,63,94,0.2)",
            }}
          />
        ))}
      </View>

      {/* Timer */}
      <Text className="text-white text-4xl font-bold mb-12">
        {formatTime(seconds)}
      </Text>

      {/* Controls */}
      <View className="flex-row items-center gap-8">
        <Pressable
          className="px-8 py-4 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          onPress={() => router.back()}
        >
          <Text className="text-white/70 font-semibold text-base">Hủy</Text>
        </Pressable>

        <Pressable
          className="flex-row items-center px-8 py-4 rounded-full"
          style={{ backgroundColor: "#f43f5e" }}
          onPress={handleStopAndSend}
        >
          <Send size={18} color="#fff" />
          <Text className="text-white font-bold text-base ml-2">
            Dừng & Gửi
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
