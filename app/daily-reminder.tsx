import React, { useState } from "react";
import { Colors } from "@/theme";
import { View, Text, Pressable, ScrollView, Switch, StatusBar } from "react-native";
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
    color: Colors.primary,
  },
  {
    id: "2",
    title: "Kỷ niệm 1 năm",
    date: "20 tháng 5",
    daysLeft: 2,
    type: "upcoming" as const,
    color: Colors.sentimentLike,
  },
  {
    id: "3",
    title: "Valentine's Day",
    date: "14 tháng 2",
    daysLeft: 6,
    type: "weekly" as const,
    color: Colors.info,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView bounces={false}>
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
            Nhắc nhở hàng ngày
          </Text>
          <View style={{ width: 48 }} />
        </View>

        {/* Today Card */}
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 16,
            padding: 16,
            borderRadius: 16,
            backgroundColor: Colors.primary,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Calendar size={16} color={Colors.textOnPrimary} />
            <Text
              style={{
                color: Colors.whiteAlpha80,
                fontSize: 12,
                marginLeft: 8,
              }}
            >
              Hôm nay
            </Text>
          </View>
          <Text style={{ color: Colors.textOnPrimary, fontWeight: "700", fontSize: 16 }}>
            {today}
          </Text>
          <Text
            style={{
              color: Colors.whiteAlpha80,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            Chúc bạn có một ngày tuyệt vời bên Thái Hoc! 💕
          </Text>
        </View>

        {/* Reminders */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 12,
              color: Colors.textPrimary,
            }}
          >
            Nhắc nhở hôm nay
          </Text>

          {REMINDERS.map((r) => (
            <View
              key={r.id}
              style={{
                backgroundColor: Colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 8,
                flexDirection: "row",
                borderLeftWidth: 4,
                borderLeftColor: r.color,
                shadowColor: Colors.textPrimary,
                shadowOpacity: 0.04,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.textPrimary }}>
                  {r.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    color: Colors.textSecondary,
                  }}
                >
                  {r.date} ·{" "}
                  {r.daysLeft === 0 ? "Hôm nay!" : `Còn ${r.daysLeft} ngày`}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable
                  accessibilityLabel="Gửi qua Telegram"
                  accessibilityRole="button"
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: Colors.infoAlpha15,
                    minHeight: 48,
                  }}
                >
                  <Send size={12} color={Colors.info} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      marginLeft: 4,
                      color: Colors.info,
                    }}
                  >
                    Telegram
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityLabel="Đánh dấu hoàn thành"
                  accessibilityRole="button"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.successAlpha15,
                  }}
                >
                  <Check size={14} color={Colors.success} />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* AI Suggestions */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Sparkles size={16} color={Colors.aiPurple} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  marginLeft: 8,
                  color: Colors.textPrimary,
                }}
              >
                AI gợi ý hôm nay
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 16,
              padding: 16,
              shadowColor: Colors.textPrimary,
              shadowOpacity: 0.04,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            {AI_SUGGESTIONS.map((suggestion, idx) => (
              <View
                key={idx}
                style={{
                  paddingVertical: 8,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: Colors.borderLight,
                }}
              >
                <Text style={{ fontSize: 14, color: Colors.textPrimary }}>
                  {suggestion}
                </Text>
              </View>
            ))}

            <Pressable
              accessibilityLabel="Gửi gợi ý qua Telegram"
              accessibilityRole="button"
              style={{
                marginTop: 12,
                paddingVertical: 12,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.infoAlpha15,
                minHeight: 48,
              }}
            >
              <Send size={14} color={Colors.info} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  marginLeft: 8,
                  color: Colors.info,
                }}
              >
                Gửi gợi ý qua Telegram
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Settings */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <Settings size={16} color={Colors.textSecondary} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                marginLeft: 8,
                color: Colors.textPrimary,
              }}
            >
              Cài đặt nhắc nhở
            </Text>
          </View>

          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Time */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderLight,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Clock size={18} color={Colors.textSecondary} />
                <Text style={{ fontSize: 14, marginLeft: 12, color: Colors.textPrimary }}>
                  Giờ nhắc
                </Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.primary }}>
                08:00
              </Text>
            </View>

            {/* Push */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderLight,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Bell size={18} color={Colors.textSecondary} />
                <Text style={{ fontSize: 14, marginLeft: 12, color: Colors.textPrimary }}>
                  Push notification
                </Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                accessibilityLabel="Bật/tắt push notification"
                trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                thumbColor={pushEnabled ? Colors.primary : Colors.surface}
              />
            </View>

            {/* Telegram */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderLight,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Send size={18} color={Colors.textSecondary} />
                <Text style={{ fontSize: 14, marginLeft: 12, color: Colors.textPrimary }}>
                  Telegram
                </Text>
              </View>
              <Switch
                value={telegramEnabled}
                onValueChange={setTelegramEnabled}
                accessibilityLabel="Bật/tắt Telegram"
                trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                thumbColor={telegramEnabled ? Colors.primary : Colors.surface}
              />
            </View>

            {/* AI Auto */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Sparkles size={18} color={Colors.textSecondary} />
                <Text style={{ fontSize: 14, marginLeft: 12, color: Colors.textPrimary }}>
                  AI gợi ý tự động
                </Text>
              </View>
              <Switch
                value={aiEnabled}
                onValueChange={setAiEnabled}
                accessibilityLabel="Bật/tắt AI gợi ý tự động"
                trackColor={{ false: Colors.border, true: Colors.aiPurpleLight }}
                thumbColor={aiEnabled ? Colors.aiPurple : Colors.surface}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
