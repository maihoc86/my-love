import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Search,
  MessageCircle,
  Sparkles,
  Mic,
  ChevronRight,
} from "lucide-react-native";

const FILTERS = ["Tất cả", "Có ghi chú", "Giọng nói", "Gợi ý AI"];

const CHAT_HISTORY = [
  {
    date: "Hôm nay",
    items: [
      {
        id: "1",
        type: "text" as const,
        preview: "Em thích ăn phở bò, ghét ăn hành...",
        entries: 3,
        time: "14:30",
      },
      {
        id: "2",
        type: "suggestion" as const,
        preview: "Gợi ý hẹn hò cuối tuần",
        entries: 0,
        time: "10:15",
      },
    ],
  },
  {
    date: "Hôm qua",
    items: [
      {
        id: "3",
        type: "voice" as const,
        preview: "Ghi âm về sở thích âm nhạc",
        entries: 2,
        time: "20:45",
      },
      {
        id: "4",
        type: "text" as const,
        preview: "Em thích mặc đồ tối giản, pastel...",
        entries: 5,
        time: "16:20",
      },
    ],
  },
  {
    date: "12 Tháng 3",
    items: [
      {
        id: "5",
        type: "text" as const,
        preview: "Sinh nhật em 27 tháng 5, thích hoa hồng...",
        entries: 4,
        time: "09:30",
      },
    ],
  },
];

const TYPE_CONFIG = {
  text: { icon: MessageCircle, color: "#f43f5e", bg: "#fff1f2" },
  suggestion: { icon: Sparkles, color: "#8b5cf6", bg: "#f5f3ff" },
  voice: { icon: Mic, color: "#f97316", bg: "#fff7ed" },
};

export default function ChatHistoryScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const totalChats = CHAT_HISTORY.reduce((sum, g) => sum + g.items.length, 0);
  const totalEntries = CHAT_HISTORY.reduce(
    (sum, g) => sum + g.items.reduce((s, i) => s + i.entries, 0),
    0
  );
  const voiceChats = CHAT_HISTORY.reduce(
    (sum, g) => sum + g.items.filter((i) => i.type === "voice").length,
    0
  );

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
          Lịch sử chat
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {/* Summary Card */}
        <View
          className="mx-4 mb-4 p-4 rounded-2xl flex-row justify-around"
          style={{ backgroundColor: "#f43f5e" }}
        >
          {[
            { value: totalChats, label: "Cuộc chat" },
            { value: totalEntries, label: "Ghi chú" },
            { value: voiceChats, label: "Voice" },
          ].map((stat, idx) => (
            <View key={idx} className="items-center">
              <Text className="text-white text-xl font-extrabold">
                {stat.value}
              </Text>
              <Text className="text-white/70 text-xs">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Search */}
        <View className="mx-4 mb-3 flex-row items-center bg-white rounded-xl px-3">
          <Search size={16} color="#9ca3af" />
          <TextInput
            className="flex-1 py-3 px-2 text-sm"
            placeholder="Tìm kiếm cuộc trò chuyện..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 mb-4"
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              className="mr-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: activeFilter === f ? "#f43f5e" : "#fff",
                borderWidth: activeFilter === f ? 0 : 1,
                borderColor: "#e5e7eb",
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{
                  color: activeFilter === f ? "#fff" : "#6b7280",
                }}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Chat Groups */}
        {CHAT_HISTORY.map((group) => (
          <View key={group.date} className="mb-4">
            <Text className="px-4 text-xs font-bold mb-2 uppercase" style={{ color: "#9ca3af" }}>
              {group.date}
            </Text>
            <View className="mx-4 bg-white rounded-2xl overflow-hidden">
              {group.items.map((item, idx) => {
                const config = TYPE_CONFIG[item.type];
                const Icon = config.icon;
                return (
                  <Pressable
                    key={item.id}
                    className="flex-row items-center p-4"
                    style={{
                      borderTopWidth: idx > 0 ? 1 : 0,
                      borderTopColor: "#f3f4f6",
                    }}
                  >
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: config.bg }}
                    >
                      <Icon size={18} color={config.color} />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-sm font-medium"
                        style={{ color: "#1e1b2e" }}
                        numberOfLines={1}
                      >
                        {item.preview}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Text className="text-xs" style={{ color: "#9ca3af" }}>
                          {item.time}
                        </Text>
                        {item.entries > 0 && (
                          <View
                            className="ml-2 px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: config.bg }}
                          >
                            <Text
                              className="text-xs font-bold"
                              style={{ color: config.color }}
                            >
                              {item.entries}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <ChevronRight size={16} color="#d1d5db" />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
