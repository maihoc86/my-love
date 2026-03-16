// ============================================================
// Calendar / Special Dates Screen - AI Love
// Rebuilt v2.0 — based on stitch/l_ch_s_ki_n_c_p_nh_t/code.html
// + BRD v2.0 + SRS v2.0 (FR-CAL-001/002/003)
// ============================================================

import React, { memo, useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Bell, Plus, Trash2, Calendar } from "lucide-react-native";
import Svg, { Circle } from "react-native-svg";

// ─── Constants ───────────────────────────────────────────────

import { Colors } from "@/theme";

// ─── Types ───────────────────────────────────────────────────

interface SpecialDate {
  id: string;
  title: string;
  category: string;
  date: string; // yyyy-mm-dd
  note: string;
  isRecurring: boolean;
  remindDaysBefore: number;
}

type CategoryId = "birthday" | "anniversary" | "holiday" | "other";

// ─── Category Config ──────────────────────────────────────────

const CATEGORIES: { id: CategoryId; label: string; emoji: string }[] = [
  { id: "birthday", label: "Sinh nhật", emoji: "🎂" },
  { id: "anniversary", label: "Kỷ niệm", emoji: "💕" },
  { id: "holiday", label: "Ngày lễ", emoji: "🎉" },
  { id: "other", label: "Khác", emoji: "📌" },
];

function getCategoryInfo(catId: string) {
  return CATEGORIES.find((c) => c.id === catId) ?? CATEGORIES[3];
}

// ─── Mock Data ───────────────────────────────────────────────

const INITIAL_DATES: SpecialDate[] = [
  {
    id: "sd1",
    title: "Sinh nhật Thái Học",
    category: "birthday",
    date: "2026-03-17",
    note: "Chuẩn bị quà và bánh kem dâu tây",
    isRecurring: true,
    remindDaysBefore: 7,
  },
  {
    id: "sd2",
    title: "Kỷ niệm 1 năm yêu nhau",
    category: "anniversary",
    date: "2026-03-21",
    note: "Đặt nhà hàng và mua hoa",
    isRecurring: true,
    remindDaysBefore: 5,
  },
  {
    id: "sd3",
    title: "Valentine trắng",
    category: "holiday",
    date: "2026-03-14",
    note: "Tặng kẹo và thiệp tự làm",
    isRecurring: true,
    remindDaysBefore: 3,
  },
  {
    id: "sd4",
    title: "Ngày tốt nghiệp",
    category: "other",
    date: "2026-06-15",
    note: "Chụp ảnh cùng tại trường",
    isRecurring: false,
    remindDaysBefore: 14,
  },
];

// ─── Helpers ─────────────────────────────────────────────────

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

function getUrgencyColor(days: number): string {
  if (days <= 0) return Colors.success; // today or past
  if (days <= 7) return Colors.error; // red — very soon
  if (days <= 30) return "#f97316"; // orange — within a month
  return Colors.primary; // pink — far away
}

/** Stroke-dashoffset for the SVG ring (out of 100) */
function getRingOffset(days: number): number {
  if (days <= 0) return 0; // full ring
  const fill = Math.min((days / 60) * 100, 95); // cap at ~95% for visual clarity
  return Math.round(100 - fill);
}

const DOW_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const MONTH_VI = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
  "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
  "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr);
  const dow = DOW_VI[d.getDay()];
  const day = d.getDate();
  const month = MONTH_VI[d.getMonth()];
  const year = d.getFullYear();
  return `${dow}, ${day} ${month}, ${year}`;
}

// ─── CountdownRing ────────────────────────────────────────────

const CountdownRing = memo(function CountdownRing({
  days,
  color,
}: {
  days: number;
  color: string;
}) {
  const offset = getRingOffset(days);
  const label = days < 0 ? "QUÁ" : "NGÀY";
  const display = Math.abs(days);

  return (
    <View style={{ width: 64, height: 64 }}>
      <Svg
        width={64}
        height={64}
        viewBox="0 0 36 36"
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        {/* Track */}
        <Circle
          cx={18}
          cy={18}
          r={16}
          fill="none"
          stroke={Colors.surfaceSecondary}
          strokeWidth={3}
        />
        {/* Progress */}
        <Circle
          cx={18}
          cy={18}
          r={16}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeDasharray="100"
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Center label */}
      <View
        style={{
          position: "absolute",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ color, fontSize: 14, fontWeight: "800", lineHeight: 17 }}
        >
          {display}
        </Text>
        <Text style={{ color, fontSize: 8, fontWeight: "700" }}>{label}</Text>
      </View>
    </View>
  );
});

// ─── EventCard ────────────────────────────────────────────────

const EventCard = memo(function EventCard({
  item,
  onDelete,
  isConfirmingDelete,
}: {
  item: SpecialDate;
  onDelete: (id: string) => void;
  isConfirmingDelete: boolean;
}) {
  const days = getDaysUntil(item.date);
  const color = getUrgencyColor(days);
  const isUrgent = days >= 0 && days <= 7;
  const catInfo = getCategoryInfo(item.category);

  return (
    <View
      style={{
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        borderWidth: isUrgent ? 1.5 : 1,
        borderColor: isUrgent ? `${color}50` : Colors.surfaceSecondary,
        shadowColor: isUrgent ? color : "#000",
        shadowOffset: { width: 0, height: isUrgent ? 4 : 1 },
        shadowOpacity: isUrgent ? 0.12 : 0.04,
        shadowRadius: isUrgent ? 12 : 4,
        elevation: isUrgent ? 6 : 2,
      }}
    >
      {/* Countdown Ring */}
      <CountdownRing days={days} color={color} />

      {/* Content */}
      <View style={{ flex: 1 }}>
        {/* Badges row */}
        <View
          style={{ flexDirection: "row", gap: 6, marginBottom: 5, flexWrap: "wrap" }}
        >
          {item.isRecurring && (
            <View
              style={{
                backgroundColor: Colors.primaryAlpha15,
                borderRadius: 6,
                paddingHorizontal: 7,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{ fontSize: 9, fontWeight: "700", color: Colors.primary }}
              >
                Hàng năm
              </Text>
            </View>
          )}
          {!item.isRecurring && (
            <View
              style={{
                backgroundColor: Colors.borderLight,
                borderRadius: 6,
                paddingHorizontal: 7,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{ fontSize: 9, fontWeight: "700", color: Colors.textSecondary }}
              >
                {catInfo.emoji} {catInfo.label}
              </Text>
            </View>
          )}
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "800",
            color: Colors.textPrimary,
            marginBottom: 3,
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text style={{ fontSize: 11, color: Colors.textTertiary }}>
          {formatDateLong(item.date)}
        </Text>
        {!!item.note && (
          <Text
            style={{ fontSize: 12, color: Colors.textSecondary, marginTop: 3 }}
            numberOfLines={1}
          >
            {item.note}
          </Text>
        )}
      </View>

      {/* Action buttons */}
      <View style={{ gap: 8 }}>
        <Pressable
          hitSlop={6}
          accessibilityLabel="Thông báo"
          accessibilityRole="button"
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: Colors.infoAlpha15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* TODO: wire up notification */}
          <Bell size={15} color={Colors.info} />
        </Pressable>
        <Pressable
          hitSlop={6}
          onPress={() => onDelete(item.id)}
          accessibilityLabel="Xoá sự kiện"
          accessibilityRole="button"
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: isConfirmingDelete ? Colors.errorAlpha10 : Colors.surfaceSecondary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Trash2 size={15} color={isConfirmingDelete ? Colors.error : Colors.textTertiary} />
        </Pressable>
      </View>
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function CalendarScreen() {
  const router = useRouter();
  const [dates, setDates] = useState<SpecialDate[]>(INITIAL_DATES);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const deleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sort by days until (ascending)
  const sortedDates = [...dates].sort(
    (a, b) => getDaysUntil(a.date) - getDaysUntil(b.date)
  );

  const upcomingCount = dates.filter((d) => getDaysUntil(d.date) >= 0).length;

  const handleDelete = useCallback(
    (id: string) => {
      if (deleteConfirm === id) {
        // Second tap → confirm delete
        if (deleteTimer.current) clearTimeout(deleteTimer.current);
        setDates((prev) => prev.filter((d) => d.id !== id));
        setDeleteConfirm(null);
      } else {
        // First tap → enter confirm state
        setDeleteConfirm(id);
        if (deleteTimer.current) clearTimeout(deleteTimer.current);
        deleteTimer.current = setTimeout(() => setDeleteConfirm(null), 3000);
      }
    },
    [deleteConfirm]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* ── Sticky Header ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 14,
          backgroundColor: "rgba(248,245,246,0.95)",
          borderBottomWidth: 1,
          borderBottomColor: Colors.primaryAlpha08,
        }}
      >
        <View>
          <Text
            style={{ fontSize: 24, fontWeight: "800", color: Colors.textPrimary }}
          >
            Ngày đặc biệt
          </Text>
          <Text style={{ fontSize: 13, color: Colors.textTertiary, marginTop: 2 }}>
            {upcomingCount} sự kiện sắp tới
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/(tabs)/add")}
          hitSlop={8}
          accessibilityLabel="Thêm sự kiện"
          accessibilityRole="button"
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: Colors.primary,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 10,
            elevation: 8,
          }}
        >
          <Plus size={22} color={Colors.textOnPrimary} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {sortedDates.length === 0 ? (
          /* ── Empty State ── */
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 80,
            }}
          >
            <Calendar size={64} color="#e2e8f0" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#64748b",
                marginTop: 20,
                marginBottom: 8,
              }}
            >
              Chưa có ngày đặc biệt
            </Text>
            <Text
              style={{ fontSize: 14, color: Colors.textTertiary, textAlign: "center" }}
            >
              Thêm sinh nhật, kỷ niệm của em!
            </Text>
            <Pressable
              onPress={() => router.push("/(tabs)/add")}
              accessibilityLabel="Thêm sự kiện đầu tiên"
              accessibilityRole="button"
              style={{
                marginTop: 24,
                paddingHorizontal: 28,
                minHeight: 48,
                justifyContent: "center",
                borderRadius: 14,
                backgroundColor: Colors.primary,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "700", color: Colors.textOnPrimary }}>
                Thêm sự kiện đầu tiên
              </Text>
            </Pressable>
          </View>
        ) : (
          /* ── Event Cards ── */
          sortedDates.map((item) => (
            <EventCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              isConfirmingDelete={deleteConfirm === item.id}
            />
          ))
        )}
      </ScrollView>

    </SafeAreaView>
  );
}
