// ============================================================
// Add Entry Screen - MyLoveThaiHoc
// Rebuilt v2.0 — based on stitch/th_m_ghi_ch_c_p_nh_t/code.html
// + BRD v2.0 + SRS v2.0 + User Stories (US-003, US-004, US-005)
// ============================================================

import React, { memo, useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CATEGORIES, SENTIMENTS, type Category, type Sentiment } from "../../src/types";
import { Colors } from "@/theme";
import { CATEGORY_PLACEHOLDERS } from "@/lib/constants";

// ─── Sub-components ───────────────────────────────────────────

/** Centered header */
const AddHeader = memo(function AddHeader({ onBack }: { onBack?: () => void }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 13,
        backgroundColor: "rgba(248,245,246,0.95)",
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryAlpha08,
      }}
    >
      {/* Left spacer balances the title center */}
      <View style={{ width: 40 }} />
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 17,
          fontWeight: "700",
          color: Colors.textPrimary,
        }}
      >
        Ghi chú mới
      </Text>
      <View style={{ width: 40 }} />
    </View>
  );
});

/** 3-col category grid */
const CategoryGrid = memo(function CategoryGrid({
  selected,
  onSelect,
}: {
  selected: Category | null;
  onSelect: (cat: Category) => void;
}) {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: Colors.primary,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          marginBottom: 12,
        }}
      >
        Danh mục
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat.key;
          return (
            <Pressable
              key={cat.key}
              onPress={() => onSelect(cat.key)}
              accessibilityLabel={`Danh mục ${cat.label}`}
              accessibilityRole="button"
              hitSlop={12}
              style={{
                width: "31%",
                paddingVertical: 12,
                alignItems: "center",
                gap: 4,
                backgroundColor: isActive ? Colors.primaryAlpha05 : Colors.surface,
                borderRadius: 14,
                borderWidth: isActive ? 2 : 1,
                borderColor: isActive ? Colors.primary : Colors.border,
                shadowColor: isActive ? Colors.primary : Colors.textPrimary,
                shadowOffset: { width: 0, height: isActive ? 4 : 1 },
                shadowOpacity: isActive ? 0.15 : 0.04,
                shadowRadius: isActive ? 8 : 3,
                elevation: isActive ? 5 : 2,
              }}
            >
              <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: isActive ? Colors.primary : Colors.textSecondary,
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

/** Sentiment 5-button row */
const SentimentPicker = memo(function SentimentPicker({
  selected,
  onSelect,
}: {
  selected: Sentiment | null;
  onSelect: (s: Sentiment) => void;
}) {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: Colors.textPrimary,
          marginBottom: 14,
        }}
      >
        Cảm xúc của Thái Học về điều này
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {SENTIMENTS.map((s) => {
          const isActive = selected === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => onSelect(s.key)}
              accessibilityLabel={`Cảm xúc ${s.label}`}
              accessibilityRole="button"
              hitSlop={12}
              style={{ alignItems: "center", gap: 6, minWidth: 48, minHeight: 48 }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: isActive ? "rgba(244,63,94,0.06)" : Colors.surface,
                  borderWidth: isActive ? 2 : 1.5,
                  borderColor: isActive ? Colors.primary : Colors.border,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: isActive ? Colors.primary : "transparent",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: isActive ? 0.2 : 0,
                  shadowRadius: 6,
                  elevation: isActive ? 4 : 0,
                  transform: [{ scale: isActive ? 1.08 : 1 }],
                }}
              >
                <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
              </View>
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: "700",
                  color: isActive ? Colors.primary : Colors.textTertiary,
                  textAlign: "center",
                }}
              >
                {s.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function AddEntryScreen() {
  const router = useRouter();

  const [category, setCategory] = useState<Category | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [eventDate, setEventDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const canSubmit = title.trim().length > 0;
  const activeCat = CATEGORIES.find((c) => c.key === category);
  const titlePlaceholder = category
    ? CATEGORY_PLACEHOLDERS[category]
    : "Thái Học thích...";

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;

    const entry = {
      category: category ?? "other",
      title: title.trim(),
      detail: detail.trim() || undefined,
      sentiment: sentiment ?? "neutral",
      event_date: eventDate || new Date().toISOString().split("T")[0],
      is_recurring: isRecurring,
    };

    // TODO: persist to Supabase via useEntries hook
    console.log("[AddEntry] submit:", entry);

    Alert.alert("Đã lưu!", `Ghi chú "${entry.title}" đã được lưu.`, [
      {
        text: "Thêm nữa",
        onPress: () => {
          setCategory(null);
          setTitle("");
          setDetail("");
          setSentiment(null);
          setEventDate("");
          setIsRecurring(false);
        },
      },
      {
        text: "Về trang chủ",
        style: "default",
        onPress: () => router.push("/(tabs)"),
      },
    ]);
  }, [canSubmit, category, title, detail, sentiment, eventDate, isRecurring, router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ── */}
      <AddHeader />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Intro title ── */}
          <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 4 }}>
            <Text
              style={{ fontSize: 22, fontWeight: "700", color: Colors.textPrimary, lineHeight: 30 }}
            >
              Thêm một điều về{"\n"}Thái Học 💕
            </Text>
            <Text style={{ fontSize: 13, color: Colors.primary, marginTop: 6, opacity: 0.8 }}>
              Ghi lại những điều quan trọng cần nhớ
            </Text>
          </View>

          {/* ── Category Grid ── */}
          <CategoryGrid selected={category} onSelect={setCategory} />

          {/* ── Form Fields ── */}
          <View style={{ paddingHorizontal: 16, marginTop: 24, gap: 16 }}>
            {/* Title */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: Colors.textPrimary,
                  marginBottom: 8,
                }}
              >
                Tiêu đề ghi chú{" "}
                <Text style={{ color: Colors.primary }}>*</Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: Colors.surface,
                  borderRadius: 14,
                  borderWidth: 1.5,
                  borderColor: title.trim() ? Colors.primary : "rgba(244,63,94,0.2)",
                  paddingHorizontal: 14,
                }}
              >
                {activeCat != null && (
                  <Text style={{ fontSize: 18, marginRight: 8 }}>
                    {activeCat.icon}
                  </Text>
                )}
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    fontSize: 15,
                    color: Colors.textPrimary,
                  }}
                  placeholder={titlePlaceholder}
                  placeholderTextColor={Colors.textTertiary}
                  value={title}
                  onChangeText={setTitle}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Detail */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: Colors.textPrimary,
                  marginBottom: 8,
                }}
              >
                Chi tiết
              </Text>
              <TextInput
                style={{
                  backgroundColor: Colors.surface,
                  borderRadius: 14,
                  borderWidth: 1.5,
                  borderColor: "rgba(244,63,94,0.2)",
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  fontSize: 15,
                  color: Colors.textPrimary,
                  minHeight: 100,
                  textAlignVertical: "top",
                }}
                placeholder="Nhập thêm thông tin chi tiết tại đây..."
                placeholderTextColor={Colors.textTertiary}
                value={detail}
                onChangeText={setDetail}
                multiline
              />
            </View>
          </View>

          {/* ── Sentiment Picker ── */}
          <SentimentPicker selected={sentiment} onSelect={setSentiment} />

          {/* ── Advanced Options ── */}
          <View style={{ paddingHorizontal: 16, marginTop: 28 }}>
            {/* Section divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: Colors.textPrimary }}
              >
                Tùy chọn nâng cao
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: Colors.border }} />
            </View>

            {/* Event date input */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: Colors.textPrimary,
                  marginBottom: 8,
                }}
              >
                Ngày sự kiện
              </Text>
              <TextInput
                style={{
                  backgroundColor: Colors.surface,
                  borderRadius: 14,
                  borderWidth: 1.5,
                  borderColor: "rgba(244,63,94,0.2)",
                  paddingHorizontal: 14,
                  paddingVertical: 13,
                  fontSize: 15,
                  color: Colors.textPrimary,
                }}
                placeholder="15/03/2026"
                placeholderTextColor={Colors.textTertiary}
                value={eventDate}
                onChangeText={setEventDate}
                keyboardType="numbers-and-punctuation"
              />
            </View>

            {/* Recurring toggle */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: Colors.textPrimary }}>
                Lặp lại hàng năm
              </Text>
              <Switch
                value={isRecurring}
                onValueChange={setIsRecurring}
                trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                thumbColor={isRecurring ? Colors.primary : Colors.surfaceSecondary}
                accessibilityLabel="Lặp lại hàng năm"
                accessibilityRole="switch"
              />
            </View>
          </View>

          {/* ── Submit Button ── */}
          <View style={{ paddingHorizontal: 16, marginTop: 32 }}>
            <Pressable
              onPress={handleSubmit}
              disabled={!canSubmit}
              accessibilityLabel="Lưu ghi chú"
              accessibilityRole="button"
              style={{
                paddingVertical: 16,
                borderRadius: 14,
                alignItems: "center",
                minHeight: 48,
                backgroundColor: canSubmit ? Colors.primary : Colors.primaryLight,
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: canSubmit ? 6 : 0 },
                shadowOpacity: canSubmit ? 0.3 : 0,
                shadowRadius: 12,
                elevation: canSubmit ? 8 : 0,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: Colors.textOnPrimary }}
              >
                Lưu ghi chú
              </Text>
            </Pressable>

            {/* Quick AI Chat shortcut */}
            <Pressable
              onPress={() => router.push("/(tabs)/chat")}
              accessibilityLabel="Dùng AI Chat để ghi nhanh bằng giọng nói"
              accessibilityRole="button"
              hitSlop={12}
              style={{ alignItems: "center", marginTop: 14, paddingVertical: 8, minHeight: 48 }}
            >
              <Text
                style={{ fontSize: 13, color: Colors.textSecondary, fontWeight: "500" }}
              >
                Hoặc{" "}
                <Text style={{ color: Colors.primary, fontWeight: "700" }}>
                  dùng AI Chat
                </Text>{" "}
                để ghi nhanh bằng giọng nói
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
