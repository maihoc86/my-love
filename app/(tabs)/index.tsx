// ============================================================
// Dashboard Screen - AI Love
// Rebuilt v2.0 — based on stitch/trang_ch_ch_nh_s_a_nh_b_a/code.html
// + BRD v2.0 + SRS v2.0 + User Stories
// ============================================================

import React, { memo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Heart,
  Camera,
  Bot,
  Map,
  Timer,
  Brain,
  Mic,
  ImageIcon,
  Bell,
  CalendarDays,
} from "lucide-react-native";
import { Colors, Shadows } from "@/theme";
import { CategoryIcons } from "@/lib/constants";

// ─── Types ───────────────────────────────────────────────────

interface UpcomingDate {
  id: string;
  title: string;
  date: string;
  emoji: string;
}


interface AppTile {
  id: string;
  label: string;
  bg: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  route: string;
}

interface RecentEntry {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  detail?: string;
  timeAgo: string;
  iconBg: string;
}

// ─── Mock Data ───────────────────────────────────────────────

const MOCK_UPCOMING: UpcomingDate[] = [
  { id: "d1", title: "Sinh nhật em", date: "2026-03-20", emoji: "🎂" },
  { id: "d2", title: "Kỷ niệm 1 năm", date: "2026-03-27", emoji: "💕" },
  { id: "d3", title: "Du lịch Đà Lạt", date: "2026-04-12", emoji: "🎉" },
];


const MOCK_RECENT: RecentEntry[] = [
  {
    id: "1",
    category: "food",
    categoryLabel: "Món ăn",
    title: "Phở bò là món em yêu nhất",
    timeAgo: "2 giờ trước",
    iconBg: "#fff7ed",
  },
  {
    id: "2",
    category: "place",
    categoryLabel: "Địa điểm",
    title: "Góc chill của hai đứa",
    detail: "Quán cafe nhỏ quận 1",
    timeAgo: "Hôm qua",
    iconBg: "#eff6ff",
  },
  {
    id: "3",
    category: "hobby",
    categoryLabel: "Sở thích",
    title: "Em mê vẽ tranh sơn dầu",
    timeAgo: "2 ngày trước",
    iconBg: "#fdf4ff",
  },
  {
    id: "4",
    category: "allergy",
    categoryLabel: "Dị ứng",
    title: "Dị ứng tôm",
    detail: "Ăn tôm bị nổi mề đay",
    timeAgo: "3 ngày trước",
    iconBg: "#fef2f2",
  },
  {
    id: "5",
    category: "music",
    categoryLabel: "Âm nhạc",
    title: "Thích nghe Vũ Cát Tường",
    timeAgo: "1 tuần trước",
    iconBg: "#eef2ff",
  },
];

const TOTAL_MEMORIES = 12;

// ─── Helpers ─────────────────────────────────────────────────

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}

function getCountdownColor(days: number): string {
  if (days <= 0) return Colors.success;
  if (days <= 3) return Colors.error;
  if (days <= 7) return Colors.warning;
  return Colors.primaryGradientEnd;
}

function formatCountdown(days: number): string {
  if (days === 0) return "Hôm nay!";
  if (days < 0) return `Đã qua ${Math.abs(days)} ngày`;
  return `${days} ngày`;
}

// ─── Sub-components ───────────────────────────────────────────


/** Hero gradient card */
const HeroCard = memo(function HeroCard() {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 20,
        padding: 24,
        backgroundColor: Colors.primary,
        overflow: "hidden",
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 12,
      }}
    >
      {/* Decorative circles */}
      <View
        style={{
          position: "absolute",
          top: 16,
          right: 32,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 32,
          right: 64,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,0.12)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 52,
          left: 8,
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      />
      {/* Large decorative heart */}
      <View
        style={{
          position: "absolute",
          right: -14,
          bottom: -14,
          opacity: 0.15,
        }}
      >
        <Heart size={120} color="#fff" fill="#fff" />
      </View>

      {/* Camera button */}
      <Pressable
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          width: 34,
          height: 34,
          borderRadius: 17,
          backgroundColor: "rgba(255,255,255,0.2)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.3)",
          alignItems: "center",
          justifyContent: "center",
        }}
        hitSlop={8}
      >
        <Camera size={16} color="#fff" />
      </Pressable>

      {/* Text content */}
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: "rgba(255,255,255,0.85)",
          marginBottom: 4,
        }}
      >
        ♥ Thái Hoc của bạn
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff", opacity: 0.9 }}>
        Bạn đã lưu giữ
      </Text>
      <Text
        style={{ fontSize: 42, fontWeight: "800", color: "#fff", lineHeight: 50 }}
      >
        {TOTAL_MEMORIES}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "rgba(255,255,255,0.8)" }}>
        kỉ niệm tuyệt vời
      </Text>
    </View>
  );
});

/** Single upcoming date card in horizontal scroll */
const UpcomingCard = memo(function UpcomingCard({ item }: { item: UpcomingDate }) {
  const days = getDaysUntil(item.date);
  const color = getCountdownColor(days);

  return (
    <View
      style={{
        width: 160,
        padding: 16,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        marginRight: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Countdown badge */}
      <View
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: color,
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>
          {formatCountdown(days)}
        </Text>
      </View>

      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.primaryAlpha08,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
      </View>
      <Text
        style={{ fontSize: 13, fontWeight: "700", color: Colors.textPrimary }}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </View>
  );
});


/** Single app icon tile in the 4-col utility grid */
const AppTileItem = memo(function AppTileItem({
  item,
  onPress,
}: {
  item: AppTile;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: "25%", alignItems: "center", marginBottom: 20 }}
      hitSlop={4}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          backgroundColor: item.bg,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: item.bg,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        {item.icon}
        {item.badge != null && (
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              backgroundColor: item.badgeColor ?? "#ef4444",
              paddingHorizontal: 4,
              paddingVertical: 1,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 7, fontWeight: "800" }}>
              {item.badge}
            </Text>
          </View>
        )}
      </View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "700",
          color: Colors.textSecondary,
          textAlign: "center",
          marginTop: 6,
        }}
        numberOfLines={2}
      >
        {item.label}
      </Text>
    </Pressable>
  );
});

/** Single recent entry row */
const RecentEntryRow = memo(function RecentEntryRow({
  item,
  onPress,
}: {
  item: RecentEntry;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: item.iconBg,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          {CategoryIcons[item.category] ?? "📝"}
        </Text>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{ fontSize: 13, fontWeight: "700", color: Colors.textPrimary }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        {item.detail != null && (
          <Text
            style={{ fontSize: 11, color: Colors.textSecondary, marginTop: 1 }}
            numberOfLines={1}
          >
            {item.detail}
          </Text>
        )}
        <Text style={{ fontSize: 10, color: Colors.textMuted, marginTop: 2 }}>
          {item.categoryLabel} · {item.timeAgo}
        </Text>
      </View>
      <Text
        style={{ fontSize: 11, fontWeight: "600", color: Colors.primaryAlpha15 }}
      >
        Chi tiết
      </Text>
    </Pressable>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function DashboardScreen() {
  const router = useRouter();

  const appTiles: AppTile[] = [
    {
      id: "chat",
      label: "AI Chat",
      bg: "#7c3aed",
      icon: <Bot size={24} color="#fff" />,
      badge: "HOT",
      badgeColor: "#ef4444",
      route: "/(tabs)/chat",
    },
    {
      id: "map",
      label: "Bản đồ",
      bg: "#059669",
      icon: <Map size={24} color="#fff" />,
      badge: "MỚI",
      badgeColor: "#3b82f6",
      route: "/date-map",
    },
    {
      id: "counter",
      label: "Đếm ngày",
      bg: Colors.primary,
      icon: <Timer size={24} color="#fff" />,
      badge: "HOT",
      badgeColor: "#ef4444",
      route: "/love-counter",
    },
    {
      id: "insight",
      label: "Insight 360",
      bg: "#f59e0b",
      icon: <Brain size={24} color="#fff" />,
      badge: "MỚI",
      badgeColor: "#3b82f6",
      route: "/insight",
    },
    {
      id: "voice",
      label: "Ghi âm",
      bg: "#4f46e5",
      icon: <Mic size={24} color="#fff" />,
      badge: "MỚI",
      badgeColor: "#3b82f6",
      route: "/voice-note",
    },
    {
      id: "album",
      label: "Album ảnh",
      bg: "#0ea5e9",
      icon: <ImageIcon size={24} color="#fff" />,
      route: "/album",
    },
    {
      id: "reminder",
      label: "Nhắc nhở",
      bg: "#f97316",
      icon: <Bell size={24} color="#fff" />,
      route: "/daily-reminder",
    },
    {
      id: "calendar",
      label: "Ngày đặc biệt",
      bg: "#ec4899",
      icon: <CalendarDays size={24} color="#fff" />,
      route: "/(tabs)/calendar",
    },
  ];

  const handleTilePress = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const handleEntryPress = useCallback((id: string) => {
    router.push(`/entries/${id}`);
  }, [router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Card ── */}
        <HeroCard />

        {/* ── Sắp tới ── */}
        <View style={{ marginTop: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>
              Sắp tới
            </Text>
            <Pressable
              onPress={() => router.push("/(tabs)/calendar")}
              style={{ flexDirection: "row", alignItems: "center" }}
              hitSlop={8}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: Colors.primary,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Xem tất cả
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 4 }}
          >
            {MOCK_UPCOMING.map((item) => (
              <UpcomingCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* ── Tiện ích ── */}
        <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: Colors.textPrimary,
              }}
            >
              Tiện ích
            </Text>
            <Pressable
              onPress={() => router.push("/all-utilities")}
              hitSlop={8}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: Colors.primary,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Xem tất cả
              </Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {appTiles.map((tile) => (
              <AppTileItem
                key={tile.id}
                item={tile}
                onPress={() => handleTilePress(tile.route)}
              />
            ))}
          </View>
        </View>

        {/* ── Ghi chép gần đây ── */}
        <View style={{ marginTop: 8, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>
              Ghi chép gần đây
            </Text>
            <Pressable
              onPress={() => router.push("/entries/all")}
              hitSlop={8}
            >
              <Text
                style={{ fontSize: 11, fontWeight: "700", color: Colors.primary }}
              >
                Xem tất cả {">"}
              </Text>
            </Pressable>
          </View>
          {MOCK_RECENT.map((entry) => (
            <RecentEntryRow
              key={entry.id}
              item={entry}
              onPress={() => handleEntryPress(entry.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
