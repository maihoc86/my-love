import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Camera,
  Image as ImageIcon,
  Heart,
} from "lucide-react-native";

const FILTERS = ["Tất cả", "Hẹn hò", "Du lịch", "Kỷ niệm", "Yêu thích"];

const PHOTO_GROUPS = [
  {
    title: "Hẹn hò Phố Cổ",
    date: "10 tháng 3, 2026",
    count: 8,
    category: "date",
    colors: ["#fda4af", "#fb7185", "#f43f5e", "#fecdd3", "#ffe4e6"],
  },
  {
    title: "Du lịch Đà Lạt",
    date: "28 tháng 2, 2026",
    count: 24,
    category: "travel",
    colors: ["#93c5fd", "#60a5fa", "#3b82f6", "#bfdbfe", "#dbeafe"],
  },
  {
    title: "Kỷ niệm 1 năm",
    date: "14 tháng 3, 2026",
    count: 15,
    category: "anniversary",
    colors: ["#c4b5fd", "#a78bfa", "#8b5cf6", "#ddd6fe", "#ede9fe"],
  },
];

export default function AlbumScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const totalPhotos = PHOTO_GROUPS.reduce((sum, g) => sum + g.count, 0);

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
          Album ảnh
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {/* Stats */}
        <View className="flex-row mx-4 mb-4 gap-3">
          {[
            { value: totalPhotos, label: "Ảnh", icon: ImageIcon, color: "#f43f5e" },
            { value: PHOTO_GROUPS.length, label: "Sự kiện", icon: Heart, color: "#8b5cf6" },
            { value: 3, label: "Tháng", icon: Camera, color: "#10b981" },
          ].map((stat, idx) => (
            <View
              key={idx}
              className="flex-1 bg-white rounded-2xl p-3 items-center"
              style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
            >
              <stat.icon size={18} color={stat.color} />
              <Text className="text-lg font-extrabold mt-1" style={{ color: "#1e1b2e" }}>
                {stat.value}
              </Text>
              <Text className="text-xs" style={{ color: "#6b7280" }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-4">
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

        {/* Photo Groups */}
        {PHOTO_GROUPS.map((group, gIdx) => (
          <View key={gIdx} className="px-4 mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-sm font-bold" style={{ color: "#1e1b2e" }}>
                  {group.title}
                </Text>
                <Text className="text-xs" style={{ color: "#6b7280" }}>
                  {group.date}
                </Text>
              </View>
              <Pressable>
                <Text className="text-xs font-semibold" style={{ color: "#f43f5e" }}>
                  Xem tất cả
                </Text>
              </Pressable>
            </View>

            {/* Photo Grid */}
            <View className="flex-row flex-wrap gap-2">
              {/* Large photo */}
              <View
                className="rounded-xl items-center justify-center"
                style={{
                  width: "48%",
                  height: 160,
                  backgroundColor: group.colors[0],
                }}
              >
                <ImageIcon size={24} color="rgba(255,255,255,0.5)" />
              </View>
              {/* Small photos */}
              <View style={{ width: "48%", gap: 8 }}>
                <View
                  className="rounded-xl items-center justify-center"
                  style={{
                    height: 76,
                    backgroundColor: group.colors[1],
                  }}
                >
                  <ImageIcon size={16} color="rgba(255,255,255,0.5)" />
                </View>
                <View
                  className="rounded-xl items-center justify-center"
                  style={{
                    height: 76,
                    backgroundColor: group.colors[2],
                  }}
                >
                  {group.count > 3 && (
                    <Text className="text-white font-bold text-lg">
                      +{group.count - 3}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center"
        style={{
          backgroundColor: "#f43f5e",
          shadowColor: "#f43f5e",
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Camera size={24} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
