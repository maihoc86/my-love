import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Camera, Tag, Calendar, MapPin, ChevronRight, Edit2, Check } from "lucide-react-native";

// ─── Constants ────────────────────────────────────────────────────────────────

import { Colors } from "@/theme";

const SENTIMENTS_VIEW = [
  { key: "love", emoji: "❤️", label: "Yêu thích" },
  { key: "happy", emoji: "😊", label: "Vui vẻ" },
  { key: "neutral", emoji: "😐", label: "Bình thường" },
  { key: "sad", emoji: "😕", label: "Hơi buồn" },
  { key: "blocked", emoji: "🚫", label: "Khó chịu" },
] as const;

type SentimentKey = typeof SENTIMENTS_VIEW[number]["key"];

const SENTIMENTS_EDIT = [
  { key: "love", emoji: "🥰", label: "Rất thích" },
  { key: "happy", emoji: "😊", label: "Vui vẻ" },
  { key: "neutral", emoji: "😐", label: "Bình thường" },
  { key: "sad", emoji: "😢", label: "Hơi buồn" },
] as const;

// ─── Mock Data ─────────────────────────────────────────────────────────────────

interface EntryData {
  id: string;
  emoji: string;
  category: string;
  title: string;
  sentiment: SentimentKey;
  detail: string;
  createdAt: string;
  reminder: string;
  location?: string;
}

const MOCK_ENTRY: EntryData = {
  id: "1",
  emoji: "🍜",
  category: "Món ăn",
  title: "Phở bò là món em yêu nhất",
  sentiment: "love",
  detail:
    "Chi tiết món phở — Em thích ăn phở bò tái với nước dùng ngọt, thêm giá, rau thơm và không bỏ hành lá. Hôm nay anh dắt em đi ăn phở Lý Quốc Sư, em đã rất hạnh phúc. Nước dùng đậm đà, thịt bò mềm và quan trọng nhất là được ăn cùng anh.",
  createdAt: "15/03/2026",
  reminder: "Hàng năm",
  location: "Lý Quốc Sư, Hà Nội",
};

// ─── Sub-components: View Mode ─────────────────────────────────────────────────

interface HeroCardProps {
  emoji: string;
  category: string;
  title: string;
}

const HeroCard = React.memo(({ emoji, category, title }: HeroCardProps) => (
  <View style={styles.heroCard}>
    <Text style={styles.heroEmoji}>{emoji}</Text>
    <View style={styles.categoryBadge}>
      <Text style={styles.categoryBadgeText}>{category.toUpperCase()}</Text>
    </View>
    <Text style={styles.heroTitle}>{title}</Text>
  </View>
));

interface SentimentRowProps {
  active: SentimentKey;
  onSelect: (key: SentimentKey) => void;
  editable?: boolean;
}

const SentimentRowView = React.memo(({ active, onSelect }: SentimentRowProps) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionLabel}>CẢM XÚC LIÊN QUAN</Text>
    <View style={styles.sentimentRow}>
      {SENTIMENTS_VIEW.map((s) => {
        const isActive = s.key === active;
        return (
          <TouchableOpacity
            key={s.key}
            onPress={() => onSelect(s.key)}
            style={[styles.sentimentBtn, isActive && styles.sentimentBtnActive]}
            activeOpacity={0.75}
          >
            <Text style={[styles.sentimentEmoji, !isActive && styles.sentimentInactive]}>
              {s.emoji}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
));

interface DetailCardProps {
  detail: string;
}

const DetailCard = React.memo(({ detail }: DetailCardProps) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionLabel}>NỘI DUNG CHI TIẾT</Text>
    <Text style={styles.detailText}>{detail}</Text>
  </View>
));

interface InfoMetaCardProps {
  category: string;
  sentiment: SentimentKey;
  createdAt: string;
  reminder: string;
}

const InfoMetaCard = React.memo(
  ({ category, sentiment, createdAt, reminder }: InfoMetaCardProps) => {
    const sentimentInfo = SENTIMENTS_VIEW.find((s) => s.key === sentiment);
    return (
      <View style={styles.sectionCard}>
        <Text style={styles.sectionLabel}>THÔNG TIN</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Danh mục</Text>
          <Text style={styles.metaValue}>{category}</Text>
        </View>
        <View style={[styles.metaRow, styles.metaRowBorder]}>
          <Text style={styles.metaLabel}>Cảm xúc</Text>
          <Text style={styles.metaValue}>
            {sentimentInfo?.label ?? ""} {sentimentInfo?.emoji ?? ""}
          </Text>
        </View>
        <View style={[styles.metaRow, styles.metaRowBorder]}>
          <Text style={styles.metaLabel}>Ngày tạo</Text>
          <Text style={styles.metaValue}>{createdAt}</Text>
        </View>
        <View style={[styles.metaRow, styles.metaRowBorder]}>
          <Text style={styles.metaLabel}>Nhắc lại</Text>
          <Text style={styles.metaValue}>{reminder}</Text>
        </View>
      </View>
    );
  }
);

// ─── Sub-components: Edit Mode ──────────────────────────────────────────────────

interface EditEmojiProps {
  emoji: string;
}

const EditEmojiBox = React.memo(({ emoji }: EditEmojiProps) => (
  <View style={styles.editEmojiWrapper}>
    <View style={styles.editEmojiBox}>
      <Text style={styles.editEmoji}>{emoji}</Text>
      <View style={styles.editCameraBtn}>
        <Camera size={14} color={Colors.primary} strokeWidth={2} />
      </View>
    </View>
  </View>
));

interface SentimentGridProps {
  active: SentimentKey;
  onSelect: (key: SentimentKey) => void;
}

const SentimentGrid = React.memo(({ active, onSelect }: SentimentGridProps) => (
  <View style={styles.sectionCard}>
    <Text style={[styles.sectionLabel, { marginBottom: 10 }]}>Cảm xúc của em</Text>
    <View style={styles.sentimentGrid}>
      {SENTIMENTS_EDIT.map((s) => {
        const isActive = s.key === active;
        return (
          <TouchableOpacity
            key={s.key}
            onPress={() => onSelect(s.key)}
            style={[styles.sentimentGridBtn, isActive && styles.sentimentGridBtnActive]}
            activeOpacity={0.75}
          >
            <Text style={styles.sentimentGridEmoji}>{s.emoji}</Text>
            <Text style={[styles.sentimentGridLabel, isActive && { color: Colors.primary }]}>
              {s.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
));

interface MetaInfoRowProps {
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  borderBottom?: boolean;
  onPress?: () => void;
}

const MetaInfoRow = React.memo(
  ({ iconBg, iconColor, icon, label, value, borderBottom = true, onPress }: MetaInfoRowProps) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.metaEditRow, borderBottom && styles.metaEditRowBorder]}
    >
      <View style={styles.metaEditLeft}>
        <View style={[styles.metaEditIcon, { backgroundColor: iconBg }]}>{icon}</View>
        <Text style={styles.metaEditLabel}>{label}</Text>
      </View>
      <View style={styles.metaEditRight}>
        <Text style={styles.metaEditValue}>{value}</Text>
        <ChevronRight size={16} color={Colors.textTertiary} strokeWidth={2} />
      </View>
    </TouchableOpacity>
  )
);

// ─── Main Screen ───────────────────────────────────────────────────────────────

export default function EntryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // In production: fetch entry by id. For now, use mock data.
  const [entry, setEntry] = useState<EntryData>({ ...MOCK_ENTRY, id: id ?? "1" });
  const [isEditing, setIsEditing] = useState(false);

  // Edit state (draft)
  const [draftTitle, setDraftTitle] = useState(entry.title);
  const [draftDetail, setDraftDetail] = useState(entry.detail);
  const [draftSentiment, setDraftSentiment] = useState<SentimentKey>(entry.sentiment);
  const [viewSentiment, setViewSentiment] = useState<SentimentKey>(entry.sentiment);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleGoBack = useCallback(() => router.back(), []);

  const handleStartEdit = useCallback(() => {
    setDraftTitle(entry.title);
    setDraftDetail(entry.detail);
    setDraftSentiment(entry.sentiment);
    setIsEditing(true);
  }, [entry]);

  const handleCancelEdit = useCallback(() => setIsEditing(false), []);

  const handleSave = useCallback(() => {
    setEntry((prev) => ({
      ...prev,
      title: draftTitle.trim() || prev.title,
      detail: draftDetail.trim() || prev.detail,
      sentiment: draftSentiment,
    }));
    setViewSentiment(draftSentiment);
    setIsEditing(false);
  }, [draftTitle, draftDetail, draftSentiment]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      "Xoá ghi chú",
      "Bạn có chắc muốn xoá ghi chú này? Hành động này không thể hoàn tác.",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  }, []);

  const handleSelectSentimentView = useCallback((key: SentimentKey) => {
    setViewSentiment(key);
  }, []);

  const handleSelectSentimentEdit = useCallback((key: SentimentKey) => {
    setDraftSentiment(key);
  }, []);

  // ─── View Mode ─────────────────────────────────────────────────────────────

  if (!isEditing) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBackBtn} onPress={handleGoBack} activeOpacity={0.7}>
            <ChevronLeft size={24} color="#1e293b" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết ghi chú</Text>
          <TouchableOpacity onPress={handleStartEdit} activeOpacity={0.7} style={styles.headerEditBtn}>
            <Text style={styles.headerEditText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <HeroCard emoji={entry.emoji} category={entry.category} title={entry.title} />
          <SentimentRowView
            active={viewSentiment}
            onSelect={handleSelectSentimentView}
          />
          <DetailCard detail={entry.detail} />
          <InfoMetaCard
            category={entry.category}
            sentiment={viewSentiment}
            createdAt={entry.createdAt}
            reminder={entry.reminder}
          />

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={handleStartEdit}
              activeOpacity={0.85}
            >
              <Text style={styles.btnPrimaryText}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDanger}
              onPress={handleDelete}
              activeOpacity={0.85}
            >
              <Text style={styles.btnDangerText}>Xoá ghi chú</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Edit Mode ─────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={handleCancelEdit} activeOpacity={0.7}>
          <ChevronLeft size={24} color="#1e293b" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa ghi chú</Text>
        <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.7} style={styles.headerEditBtn}>
          <Text style={styles.headerCancelText}>Huỷ</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero: Emoji + Title */}
          <View style={styles.editHeroSection}>
            <EditEmojiBox emoji={entry.emoji} />
            <View style={{ width: "100%" }}>
              <Text style={styles.inputLabel}>TIÊU ĐỀ GHI CHÚ</Text>
              <TextInput
                style={styles.titleInput}
                value={draftTitle}
                onChangeText={setDraftTitle}
                placeholder="Nhập tiêu đề..."
                placeholderTextColor={Colors.textTertiary}
                returnKeyType="done"
              />
            </View>
          </View>

          {/* Sentiment Grid */}
          <SentimentGrid active={draftSentiment} onSelect={handleSelectSentimentEdit} />

          {/* Detail Textarea */}
          <View style={styles.sectionCard}>
            <View style={styles.detailLabelRow}>
              <Edit2 size={14} color={Colors.primary} strokeWidth={2} />
              <Text style={[styles.metaEditLabel, { marginLeft: 6 }]}>Nội dung chi tiết</Text>
            </View>
            <TextInput
              style={styles.detailTextarea}
              value={draftDetail}
              onChangeText={setDraftDetail}
              placeholder="Nhập nội dung chi tiết..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Meta Rows */}
          <View style={styles.sectionCard}>
            <MetaInfoRow
              iconBg="#fff1f2"
              iconColor={Colors.primary}
              icon={<Tag size={16} color={Colors.primary} strokeWidth={2} />}
              label="Danh mục"
              value={entry.category}
            />
            <MetaInfoRow
              iconBg="#eff6ff"
              iconColor={Colors.info}
              icon={<Calendar size={16} color={Colors.info} strokeWidth={2} />}
              label="Ngày tạo"
              value={entry.createdAt}
            />
            <MetaInfoRow
              iconBg="#ecfdf5"
              iconColor={Colors.success}
              icon={<MapPin size={16} color={Colors.success} strokeWidth={2} />}
              label="Địa điểm"
              value={entry.location ?? "Chưa có"}
              borderBottom={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed Footer */}
      <View style={styles.editFooter}>
        <TouchableOpacity style={styles.btnSave} onPress={handleSave} activeOpacity={0.85}>
          <Check size={20} color={Colors.surface} strokeWidth={2.5} />
          <Text style={styles.btnSaveText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    height: 56,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(244,63,94,0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
  },
  headerEditBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerEditText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
  },
  headerCancelText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748b",
  },

  // Scroll
  scrollContent: {
    padding: 16,
    gap: 12,
  },

  // Hero Card
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  heroEmoji: {
    fontSize: 80,
    lineHeight: 96,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: "#ffe4e6",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.primary,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
    lineHeight: 30,
  },

  // Section Card
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textTertiary,
    letterSpacing: 1.2,
    textAlign: "center",
    marginBottom: 14,
  },

  // Sentiment Row (View)
  sentimentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  sentimentBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },
  sentimentBtnActive: {
    backgroundColor: "#fff1f2",
    borderWidth: 2,
    borderColor: Colors.primary,
    transform: [{ scale: 1.15 }],
  },
  sentimentEmoji: {
    fontSize: 24,
  },
  sentimentInactive: {
    opacity: 0.4,
  },

  // Detail Text
  detailText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
  },

  // Info Meta
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  metaRowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#f8fafc",
  },
  metaLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },

  // Actions Section
  actionsSection: {
    gap: 10,
    paddingTop: 8,
    paddingBottom: 32,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnPrimaryText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
  btnDanger: {
    backgroundColor: "transparent",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDangerText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: "700",
  },

  // Edit Mode: Hero
  editHeroSection: {
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
  },
  editEmojiWrapper: {
    alignItems: "center",
  },
  editEmojiBox: {
    width: 96,
    height: 96,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffe4e6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  editEmoji: {
    fontSize: 52,
  },
  editCameraBtn: {
    position: "absolute",
    bottom: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "#fecdd3",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  // Edit Title
  inputLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.primary,
    letterSpacing: 1,
    marginBottom: 6,
    marginLeft: 2,
  },
  titleInput: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    width: "100%",
  },

  // Sentiment Grid (Edit)
  sentimentGrid: {
    flexDirection: "row",
    gap: 8,
  },
  sentimentGridBtn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    gap: 4,
  },
  sentimentGridBtnActive: {
    backgroundColor: "#fff1f2",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  sentimentGridEmoji: {
    fontSize: 24,
  },
  sentimentGridLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textTertiary,
    letterSpacing: 0.5,
    textAlign: "center",
  },

  // Detail Textarea
  detailLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailTextarea: {
    backgroundColor: "rgba(255,241,242,0.3)",
    borderWidth: 2,
    borderColor: "#fecdd3",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    minHeight: 120,
  },

  // Meta Edit Rows
  metaEditRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  metaEditRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f8fafc",
  },
  metaEditLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  metaEditIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  metaEditLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  metaEditRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaEditValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },

  // Footer Save
  editFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopWidth: 1,
    borderTopColor: "#ffe4e6",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
  },
  btnSave: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnSaveText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
});
