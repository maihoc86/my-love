import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Mic,
  Play,
  Pause,
  Sparkles,
  Check,
  Clock,
} from "lucide-react-native";

const VOICE_NOTES = [
  {
    id: "1",
    duration: "0:45",
    transcript:
      "Hôm nay em nói thích ăn Pizza 4P's Bến Thành, lần sau phải đưa em đi...",
    status: "saved" as const,
    entries: [
      { category: "Địa điểm", title: "Pizza 4P's Bến Thành", sentiment: "love" },
      { category: "Ngày đặc biệt", title: "Kỷ niệm 2 năm", sentiment: "love" },
    ],
    date: "Hôm nay · 14:30",
  },
  {
    id: "2",
    duration: "1:12",
    transcript: "Em ghét mùi thuốc lá, nhớ tránh chỗ nào cho hút thuốc...",
    status: "pending" as const,
    entries: [
      { category: "Dị ứng", title: "Ghét mùi thuốc lá", sentiment: "hate" },
    ],
    date: "Hôm qua · 20:15",
  },
];

export default function VoiceNoteScreen() {
  const router = useRouter();
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fdf2f8" }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center bg-white"
          style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
        >
          <ChevronLeft size={20} color="#1e1b2e" />
        </Pressable>
        <Text className="flex-1 text-lg font-bold text-center" style={{ color: "#1e1b2e" }}>
          Ghi chú giọng nói
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Voice Notes List */}
        {VOICE_NOTES.map((note) => (
          <View
            key={note.id}
            className="bg-white rounded-2xl p-4 mb-4"
            style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 }}
          >
            {/* Player Row */}
            <View className="flex-row items-center mb-3">
              <Pressable
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: "#f43f5e" }}
                onPress={() =>
                  setPlayingId(playingId === note.id ? null : note.id)
                }
              >
                {playingId === note.id ? (
                  <Pause size={18} color="#fff" fill="#fff" />
                ) : (
                  <Play size={18} color="#fff" fill="#fff" />
                )}
              </Pressable>

              {/* Waveform placeholder */}
              <View className="flex-1 flex-row items-center mx-3 gap-0.5">
                {[...Array(20)].map((_, i) => (
                  <View
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 3,
                      height: 6 + Math.random() * 18,
                      backgroundColor:
                        playingId === note.id ? "#f43f5e" : "#d1d5db",
                    }}
                  />
                ))}
              </View>

              <Text className="text-xs font-medium" style={{ color: "#6b7280" }}>
                {note.duration}
              </Text>
            </View>

            {/* Status + Date */}
            <View className="flex-row items-center justify-between mb-3">
              <View
                className="flex-row items-center px-2 py-1 rounded-full"
                style={{
                  backgroundColor:
                    note.status === "saved" ? "#ecfdf5" : "#fffbeb",
                }}
              >
                {note.status === "saved" ? (
                  <Check size={12} color="#10b981" />
                ) : (
                  <Clock size={12} color="#f59e0b" />
                )}
                <Text
                  className="text-xs font-medium ml-1"
                  style={{
                    color: note.status === "saved" ? "#10b981" : "#f59e0b",
                  }}
                >
                  {note.status === "saved" ? "Đã lưu" : "Chờ lưu"}
                </Text>
              </View>
              <Text className="text-xs" style={{ color: "#9ca3af" }}>
                {note.date}
              </Text>
            </View>

            {/* Transcript */}
            <Text
              className="text-sm italic mb-3"
              style={{ color: "#6b7280" }}
              numberOfLines={2}
            >
              "{note.transcript}"
            </Text>

            {/* AI Parsed Entries */}
            <View
              className="p-3 rounded-xl mb-3"
              style={{ backgroundColor: "#f5f3ff" }}
            >
              <View className="flex-row items-center mb-2">
                <Sparkles size={14} color="#8b5cf6" />
                <Text className="text-xs font-bold ml-1.5" style={{ color: "#8b5cf6" }}>
                  Kết quả phân tích
                </Text>
              </View>
              {note.entries.map((entry, idx) => (
                <View key={idx} className="flex-row items-center mb-1">
                  <View
                    className="px-2 py-0.5 rounded-full mr-2"
                    style={{ backgroundColor: "#ede9fe" }}
                  >
                    <Text className="text-xs" style={{ color: "#8b5cf6" }}>
                      {entry.category}
                    </Text>
                  </View>
                  <Text className="text-xs flex-1" style={{ color: "#1e1b2e" }}>
                    {entry.title}
                  </Text>
                </View>
              ))}
            </View>

            {/* Save Button (for pending) */}
            {note.status === "pending" && (
              <Pressable
                className="py-3 rounded-xl items-center"
                style={{ backgroundColor: "#10b981" }}
              >
                <Text className="text-white font-bold text-sm">
                  Lưu ghi chú
                </Text>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Floating Mic Button */}
      <View className="items-center pb-6">
        <Text className="text-xs mb-2" style={{ color: "#9ca3af" }}>
          Nhấn giữ để ghi âm
        </Text>
        <Pressable
          className="w-16 h-16 rounded-full items-center justify-center"
          style={{
            backgroundColor: "#f43f5e",
            shadowColor: "#f43f5e",
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }}
          onLongPress={() => router.push("/recording")}
        >
          <Mic size={28} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
