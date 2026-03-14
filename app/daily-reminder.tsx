import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Bell,
  Send,
  Check,
  Clock,
  Sparkles,
  Calendar,
  Settings,
} from "lucide-react-native";

const REMINDERS = [
  {
    id: "1",
    title: "Sinh nhật Thái Hoc",
    date: "27 tháng 5",
    daysLeft: 0,
    type: "today" as const,
    color: "#f43f5e",
  },
  {
    id: "2",
    title: "Kỷ niệm 1 năm",
    date: "20 tháng 5",
    daysLeft: 2,
    type: "upcoming" as const,
    color: "#f97316",
  },
  {
    id: "3",
    title: "Valentine's Day",
    date: "14 tháng 2",
    daysLeft: 6,
    type: "weekly" as const,
    color: "#3b82f6",
  },
];

const AI_SUGGESTIONS = [
  "💐 Mua hoa hồng cho em — em thích hoa hồng trắng!",
  "☕ Rủ em đi cafe The Note — quán yên tĩnh em thích",
  "📖 Tặng em cuốn sách mới — em đang đọc dở 'Nhà Giả Kim'",
  "🍜 Nấu phở bò cho em — món em yêu thích nhất",
];

export default function DailyReminderScreen() {
  const router = useRouter();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [telegramEnabled, setTelegramEnabled] = useState(true);

  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fdf2f8" }}>
      <ScrollView bounces={false}>
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
            Nhắc nhở hàng ngày
          </Text>
          <View className="w-10" />
        </View>

        {/* Today Card */}
        <View
          className="mx-4 mb-4 p-4 rounded-2xl"
          style={{ backgroundColor: "#f43f5e" }}
        >
          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="#fff" />
            <Text className="text-white/70 text-xs ml-2">Hôm nay</Text>
          </View>
          <Text className="text-white font-bold text-base">{today}</Text>
          <Text className="text-white/80 text-sm mt-1">
            Chúc bạn có một ngày tuyệt vời bên Thái Hoc! 💕
          </Text>
        </View>

        {/* Reminders */}
        <View className="px-4 mb-6">
          <Text className="text-sm font-bold mb-3" style={{ color: "#1e1b2e" }}>
            Nhắc nhở hôm nay
          </Text>

          {REMINDERS.map((r) => (
            <View
              key={r.id}
              className="bg-white rounded-xl p-4 mb-2 flex-row"
              style={{
                borderLeftWidth: 4,
                borderLeftColor: r.color,
                shadowColor: "#000",
                shadowOpacity: 0.04,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <View className="flex-1">
                <Text className="text-sm font-semibold" style={{ color: "#1e1b2e" }}>
                  {r.title}
                </Text>
                <Text className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                  {r.date} ·{" "}
                  {r.daysLeft === 0
                    ? "Hôm nay!"
                    : `Còn ${r.daysLeft} ngày`}
                </Text>
              </View>
              <View className="flex-row gap-2">
                <Pressable
                  className="px-3 py-2 rounded-lg flex-row items-center"
                  style={{ backgroundColor: "#eff6ff" }}
                >
                  <Send size={12} color="#3b82f6" />
                  <Text className="text-xs font-medium ml-1" style={{ color: "#3b82f6" }}>
                    Telegram
                  </Text>
                </Pressable>
                <Pressable
                  className="w-8 h-8 rounded-lg items-center justify-center"
                  style={{ backgroundColor: "#ecfdf5" }}
                >
                  <Check size={14} color="#10b981" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* AI Suggestions */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Sparkles size={16} color="#8b5cf6" />
              <Text className="text-sm font-bold ml-2" style={{ color: "#1e1b2e" }}>
                AI gợi ý hôm nay
              </Text>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4" style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}>
            {AI_SUGGESTIONS.map((suggestion, idx) => (
              <View
                key={idx}
                className="py-2"
                style={{
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: "#f3f4f6",
                }}
              >
                <Text className="text-sm" style={{ color: "#1e1b2e" }}>
                  {suggestion}
                </Text>
              </View>
            ))}

            <Pressable
              className="mt-3 py-3 rounded-xl flex-row items-center justify-center"
              style={{ backgroundColor: "#eff6ff" }}
            >
              <Send size={14} color="#3b82f6" />
              <Text className="text-sm font-semibold ml-2" style={{ color: "#3b82f6" }}>
                Gửi gợi ý qua Telegram
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Settings */}
        <View className="px-4 mb-8">
          <View className="flex-row items-center mb-3">
            <Settings size={16} color="#6b7280" />
            <Text className="text-sm font-bold ml-2" style={{ color: "#1e1b2e" }}>
              Cài đặt nhắc nhở
            </Text>
          </View>

          <View className="bg-white rounded-2xl overflow-hidden">
            {/* Time */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Clock size={18} color="#6b7280" />
                <Text className="text-sm ml-3" style={{ color: "#1e1b2e" }}>
                  Giờ nhắc
                </Text>
              </View>
              <Text className="text-sm font-semibold" style={{ color: "#f43f5e" }}>
                08:00
              </Text>
            </View>

            {/* Push */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Bell size={18} color="#6b7280" />
                <Text className="text-sm ml-3" style={{ color: "#1e1b2e" }}>
                  Push notification
                </Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: "#e5e7eb", true: "#fda4af" }}
                thumbColor={pushEnabled ? "#f43f5e" : "#fff"}
              />
            </View>

            {/* Telegram */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Send size={18} color="#6b7280" />
                <Text className="text-sm ml-3" style={{ color: "#1e1b2e" }}>
                  Telegram
                </Text>
              </View>
              <Switch
                value={telegramEnabled}
                onValueChange={setTelegramEnabled}
                trackColor={{ false: "#e5e7eb", true: "#fda4af" }}
                thumbColor={telegramEnabled ? "#f43f5e" : "#fff"}
              />
            </View>

            {/* AI Auto */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Sparkles size={18} color="#6b7280" />
                <Text className="text-sm ml-3" style={{ color: "#1e1b2e" }}>
                  AI gợi ý tự động
                </Text>
              </View>
              <Switch
                value={aiEnabled}
                onValueChange={setAiEnabled}
                trackColor={{ false: "#e5e7eb", true: "#c4b5fd" }}
                thumbColor={aiEnabled ? "#8b5cf6" : "#fff"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
