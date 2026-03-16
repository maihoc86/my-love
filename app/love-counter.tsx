import React, { memo } from "react";
import { Colors, Shadows } from "@/theme";
import { View, Text, Pressable, ScrollView, StatusBar } from "react-native";
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

const BREAKDOWN = [
  { value: YEARS, label: "Năm" },
  { value: MONTHS, label: "Tháng" },
  { value: DAYS, label: "Ngày" },
  { value: TOTAL_HOURS.toLocaleString(), label: "Giờ" },
];

const MilestoneItem = memo(function MilestoneItem({
  m,
  idx,
  achieved,
  isLast,
}: {
  m: (typeof MILESTONES)[number];
  idx: number;
  achieved: boolean;
  isLast: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
      <View style={{ alignItems: "center", marginRight: 16 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: achieved ? Colors.success : Colors.borderLight,
          }}
        >
          {achieved ? (
            <Check size={18} color={Colors.textOnPrimary} />
          ) : (
            <Clock size={18} color={Colors.textTertiary} />
          )}
        </View>
        {!isLast && (
          <View
            style={{
              width: 2,
              height: 24,
              backgroundColor: achieved ? Colors.success : Colors.border,
            }}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 12,
          backgroundColor: achieved ? Colors.successAlpha15 : Colors.surface,
          borderWidth: achieved ? 1 : 0,
          borderColor: Colors.successLight,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 18, marginRight: 8 }}>{m.emoji}</Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              flex: 1,
              color: achieved ? Colors.success : Colors.textPrimary,
            }}
          >
            {m.label}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: achieved ? Colors.success : Colors.textTertiary,
            }}
          >
            {achieved ? "Đã đạt ✓" : `Còn ${m.day - TOTAL_DAYS} ngày`}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default function LoveCounterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView bounces={false}>
        {/* Hero Section */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 40,
            alignItems: "center",
            backgroundColor: Colors.primary,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginBottom: 32,
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
                backgroundColor: Colors.whiteAlpha20,
              }}
            >
              <ChevronLeft size={20} color={Colors.textOnPrimary} />
            </Pressable>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "700",
                color: Colors.textOnPrimary,
                marginRight: 48,
              }}
            >
              Đếm ngày yêu nhau
            </Text>
          </View>

          {/* Couple Avatars */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.whiteAlpha25,
              }}
            >
              <Text style={{ fontSize: 24 }}>👤</Text>
            </View>
            <View style={{ marginHorizontal: 16 }}>
              <Heart size={24} color={Colors.textOnPrimary} fill={Colors.textOnPrimary} />
            </View>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.whiteAlpha25,
              }}
            >
              <Text style={{ fontSize: 24 }}>👩</Text>
            </View>
          </View>

          {/* Main Counter */}
          <Text style={{ fontSize: 72, fontWeight: "800", color: Colors.textOnPrimary }}>
            {TOTAL_DAYS}
          </Text>
          <Text
            style={{
              color: Colors.whiteAlpha80,
              fontSize: 18,
              fontWeight: "500",
              marginTop: 4,
            }}
          >
            ngày
          </Text>
          <Text style={{ color: Colors.whiteAlpha60, fontSize: 14, marginTop: 8 }}>
            Bắt đầu từ {LOVE_START.toLocaleDateString("vi-VN")}
          </Text>

          {/* Breakdown */}
          <View style={{ flexDirection: "row", marginTop: 24, gap: 16 }}>
            {BREAKDOWN.map((item, idx) => (
              <View
                key={idx}
                style={{
                  alignItems: "center",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: Colors.whiteAlpha15,
                }}
              >
                <Text
                  style={{ color: Colors.textOnPrimary, fontWeight: "800", fontSize: 18 }}
                >
                  {item.value}
                </Text>
                <Text style={{ color: Colors.whiteAlpha80, fontSize: 12 }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 24,
            marginTop: -20,
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Pressable
            accessibilityLabel="Chia sẻ"
            accessibilityRole="button"
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 14,
              borderRadius: 12,
              backgroundColor: Colors.surface,
              shadowColor: Colors.textPrimary,
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Share2 size={16} color={Colors.primary} />
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                marginLeft: 8,
                color: Colors.primary,
              }}
            >
              Chia sẻ
            </Text>
          </Pressable>
          <Pressable
            accessibilityLabel="Đặt hình nền"
            accessibilityRole="button"
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 14,
              borderRadius: 12,
              backgroundColor: Colors.surface,
              shadowColor: Colors.textPrimary,
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <ImageIcon size={16} color={Colors.aiPurple} />
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                marginLeft: 8,
                color: Colors.aiPurple,
              }}
            >
              Đặt hình nền
            </Text>
          </Pressable>
        </View>

        {/* Milestones */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 16,
              color: Colors.textPrimary,
            }}
          >
            Cột mốc tình yêu
          </Text>
          {MILESTONES.map((m, idx) => (
            <MilestoneItem
              key={idx}
              m={m}
              idx={idx}
              achieved={TOTAL_DAYS >= m.day}
              isLast={idx === MILESTONES.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
