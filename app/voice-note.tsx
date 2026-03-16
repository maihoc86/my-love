import React, { useState } from "react";
import { Colors } from "@/theme";
import { View, Text, Pressable, ScrollView, StatusBar } from "react-native";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Quay lại"
          accessibilityRole="button"
          hitSlop={12}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.surface,
            shadowColor: Colors.textPrimary,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <ChevronLeft size={20} color={Colors.textPrimary} />
        </Pressable>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
            color: Colors.textPrimary,
          }}
        >
          Ghi chú giọng nói
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {VOICE_NOTES.map((note) => (
          <View
            key={note.id}
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              shadowColor: Colors.textPrimary,
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            {/* Player Row */}
            <View
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
            >
              <Pressable
                accessibilityLabel={
                  playingId === note.id ? "Tạm dừng" : "Phát ghi âm"
                }
                accessibilityRole="button"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.primary,
                }}
                onPress={() =>
                  setPlayingId(playingId === note.id ? null : note.id)
                }
              >
                {playingId === note.id ? (
                  <Pause size={18} color={Colors.textOnPrimary} fill={Colors.textOnPrimary} />
                ) : (
                  <Play size={18} color={Colors.textOnPrimary} fill={Colors.textOnPrimary} />
                )}
              </Pressable>

              {/* Waveform placeholder */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 12,
                  gap: 2,
                }}
              >
                {[...Array(20)].map((_, i) => (
                  <View
                    key={i}
                    style={{
                      width: 3,
                      height: 6 + Math.random() * 18,
                      borderRadius: 999,
                      backgroundColor:
                        playingId === note.id ? Colors.primary : Colors.border,
                    }}
                  />
                ))}
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: Colors.textSecondary,
                }}
              >
                {note.duration}
              </Text>
            </View>

            {/* Status + Date */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 999,
                  backgroundColor:
                    note.status === "saved"
                      ? Colors.successAlpha15
                      : Colors.warningLight + "30",
                }}
              >
                {note.status === "saved" ? (
                  <Check size={12} color={Colors.success} />
                ) : (
                  <Clock size={12} color={Colors.warning} />
                )}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    marginLeft: 4,
                    color:
                      note.status === "saved" ? Colors.success : Colors.warning,
                  }}
                >
                  {note.status === "saved" ? "Đã lưu" : "Chờ lưu"}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: Colors.textTertiary }}>
                {note.date}
              </Text>
            </View>

            {/* Transcript */}
            <Text
              style={{
                fontSize: 14,
                fontStyle: "italic",
                marginBottom: 12,
                color: Colors.textSecondary,
              }}
              numberOfLines={2}
            >
              "{note.transcript}"
            </Text>

            {/* AI Parsed Entries */}
            <View
              style={{
                padding: 12,
                borderRadius: 12,
                marginBottom: 12,
                backgroundColor: Colors.aiPurpleAlpha10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Sparkles size={14} color={Colors.aiPurple} />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    marginLeft: 6,
                    color: Colors.aiPurple,
                  }}
                >
                  Kết quả phân tích
                </Text>
              </View>
              {note.entries.map((entry, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 999,
                      marginRight: 8,
                      backgroundColor: Colors.aiPurpleAlpha05,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: Colors.aiPurple }}>
                      {entry.category}
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: 12, flex: 1, color: Colors.textPrimary }}
                  >
                    {entry.title}
                  </Text>
                </View>
              ))}
            </View>

            {/* Save Button (for pending) */}
            {note.status === "pending" && (
              <Pressable
                accessibilityLabel="Lưu ghi chú"
                accessibilityRole="button"
                style={{
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: Colors.success,
                  minHeight: 48,
                }}
              >
                <Text
                  style={{
                    color: Colors.textOnPrimary,
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  Lưu ghi chú
                </Text>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Floating Mic Button */}
      <View style={{ alignItems: "center", paddingBottom: 24 }}>
        <Text
          style={{ fontSize: 12, marginBottom: 8, color: Colors.textTertiary }}
        >
          Nhấn giữ để ghi âm
        </Text>
        <Pressable
          accessibilityLabel="Ghi âm giọng nói"
          accessibilityRole="button"
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.primary,
            shadowColor: Colors.primary,
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }}
          onLongPress={() => router.push("/recording")}
        >
          <Mic size={28} color={Colors.textOnPrimary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
