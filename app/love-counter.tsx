import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Heart,
  Share2,
  Image as ImageIcon,
  Check,
  Clock,
} from "lucide-react-native";

const LOVE_START = new Date("2025-03-14");
const NOW = new Date();
const DIFF_MS = NOW.getTime() - LOVE_START.getTime();
const TOTAL_DAYS = Math.floor(DIFF_MS / (1000 * 60 * 60 * 24));
const TOTAL_HOURS = Math.floor(DIFF_MS / (1000 * 60 * 60));
const YEARS = Math.floor(TOTAL_DAYS / 365);
const MONTHS = Math.floor((TOTAL_DAYS % 365) / 30);
const DAYS = TOTAL_DAYS % 30;

const MILESTONES = [
  { day: 100, label: "100 ngày yêu nhau", emoji: "💕" },
  { day: 200, label: "200 ngày bên nhau", emoji: "🌹" },
  { day: 365, label: "1 năm hạnh phúc", emoji: "🎉" },
  { day: 500, label: "500 ngày kỷ niệm", emoji: "💎" },
  { day: 730, label: "2 năm tuyệt vời", emoji: "🏆" },
  { day: 1000, label: "1000 ngày yêu thương", emoji: "👑" },
];

export default function LoveCounterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fdf2f8" }}>
      <ScrollView bounces={false}>
        {/* Hero Section */}
        <View
          className="px-6 pt-4 pb-10 items-center"
          style={{ backgroundColor: "#f43f5e" }}
        >
          {/* Header */}
          <View className="flex-row items-center w-full mb-8">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <ChevronLeft size={20} color="#fff" />
            </Pressable>
            <Text className="flex-1 text-center text-lg font-bold text-white mr-10">
              Đếm ngày yêu nhau
            </Text>
          </View>

          {/* Couple Avatars */}
          <View className="flex-row items-center mb-6">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            >
              <Text className="text-2xl">👤</Text>
            </View>
            <View className="mx-4">
              <Heart size={24} color="#fff" fill="#fff" />
            </View>
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            >
              <Text className="text-2xl">👩</Text>
            </View>
          </View>

          {/* Main Counter */}
          <Text className="text-7xl font-extrabold text-white">{TOTAL_DAYS}</Text>
          <Text className="text-white/80 text-lg font-medium mt-1">ngày</Text>
          <Text className="text-white/60 text-sm mt-2">
            Bắt đầu từ {LOVE_START.toLocaleDateString("vi-VN")}
          </Text>

          {/* Breakdown */}
          <View className="flex-row mt-6 gap-4">
            {[
              { value: YEARS, label: "Năm" },
              { value: MONTHS, label: "Tháng" },
              { value: DAYS, label: "Ngày" },
              { value: TOTAL_HOURS.toLocaleString(), label: "Giờ" },
            ].map((item, idx) => (
              <View
                key={idx}
                className="items-center px-3 py-2 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Text className="text-white font-extrabold text-lg">
                  {item.value}
                </Text>
                <Text className="text-white/70 text-xs">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View className="flex-row px-6 -mt-5 gap-3 mb-6">
          <Pressable
            className="flex-1 flex-row items-center justify-center py-3.5 rounded-xl bg-white"
            style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
          >
            <Share2 size={16} color="#f43f5e" />
            <Text className="font-semibold text-sm ml-2" style={{ color: "#f43f5e" }}>
              Chia sẻ
            </Text>
          </Pressable>
          <Pressable
            className="flex-1 flex-row items-center justify-center py-3.5 rounded-xl bg-white"
            style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
          >
            <ImageIcon size={16} color="#8b5cf6" />
            <Text className="font-semibold text-sm ml-2" style={{ color: "#8b5cf6" }}>
              Đặt hình nền
            </Text>
          </Pressable>
        </View>

        {/* Milestones */}
        <View className="px-6 mb-8">
          <Text className="text-base font-bold mb-4" style={{ color: "#1e1b2e" }}>
            Cột mốc tình yêu
          </Text>

          {MILESTONES.map((m, idx) => {
            const achieved = TOTAL_DAYS >= m.day;
            return (
              <View key={idx} className="flex-row items-center mb-3">
                {/* Timeline */}
                <View className="items-center mr-4">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: achieved ? "#10b981" : "#f3f4f6",
                    }}
                  >
                    {achieved ? (
                      <Check size={18} color="#fff" />
                    ) : (
                      <Clock size={18} color="#9ca3af" />
                    )}
                  </View>
                  {idx < MILESTONES.length - 1 && (
                    <View
                      className="w-0.5 h-6"
                      style={{
                        backgroundColor: achieved ? "#10b981" : "#e5e7eb",
                      }}
                    />
                  )}
                </View>

                {/* Content */}
                <View
                  className="flex-1 p-3 rounded-xl"
                  style={{
                    backgroundColor: achieved ? "#ecfdf5" : "#fff",
                    borderWidth: achieved ? 1 : 0,
                    borderColor: "#d1fae5",
                  }}
                >
                  <View className="flex-row items-center">
                    <Text className="text-lg mr-2">{m.emoji}</Text>
                    <Text
                      className="font-semibold text-sm flex-1"
                      style={{
                        color: achieved ? "#065f46" : "#1e1b2e",
                      }}
                    >
                      {m.label}
                    </Text>
                    <Text
                      className="text-xs font-medium"
                      style={{
                        color: achieved ? "#10b981" : "#9ca3af",
                      }}
                    >
                      {achieved
                        ? "Đã đạt ✓"
                        : `Còn ${m.day - TOTAL_DAYS} ngày`}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
