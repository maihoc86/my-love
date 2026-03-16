// ============================================================
// All Notes Screen - MyLoveThaiHoc
// SCR-02.1 — stitch/tat_ca_ghi_chu/code.html
// ============================================================

import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  FlatList,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronDown, Plus, Search, SlidersHorizontal, X } from "lucide-react-native";
import { Colors } from "@/theme";

// ─── Types ───────────────────────────────────────────────────

type SortOrder = "newest" | "oldest" | "az";

interface Entry {
  id: string;
  emoji: string;
  iconBg: string;
  title: string;
  detail?: string;
  categoryLabel: string;
  timeAgo: string;
  category: string;
}

// ─── Category Config ─────────────────────────────────────────

const CATEGORY_CONFIG: Record<
  string,
  { label: string; emoji: string; iconBg: string }
> = {
  food:    { label: "Món ăn",    emoji: "🍜", iconBg: "#fff7ed" },
  place:   { label: "Địa điểm", emoji: "📍", iconBg: "#eff6ff" },
  hobby:   { label: "Sở thích", emoji: "🎨", iconBg: "#fdf4ff" },
  allergy: { label: "Dị ứng",   emoji: "⚠️", iconBg: "#fef2f2" },
  music:   { label: "Âm nhạc",  emoji: "🎵", iconBg: "#eef2ff" },
  movie:   { label: "Phim",     emoji: "🎬", iconBg: "#f5f3ff" },
  gift:    { label: "Quà",      emoji: "🎁", iconBg: "#f0fdf4" },
  date:    { label: "Hẹn hò",   emoji: "💑", iconBg: "#fff1f2" },
  trait:   { label: "Tính cách",emoji: "✨", iconBg: "#fefce8" },
  style:   { label: "Phong cách",emoji: "👗", iconBg: "#faf5ff" },
  other:   { label: "Khác",     emoji: "📝", iconBg: "#f8fafc" },
};

// ─── Mock Data ───────────────────────────────────────────────

const MOCK_ENTRIES: Entry[] = [
  {
    id: "1",
    category: "food",
    emoji: "🍜",
    iconBg: "#fff7ed",
    title: "Phở bò là món em yêu nhất",
    detail: "Chi tiết món phở",
    categoryLabel: "Món ăn",
    timeAgo: "2 giờ trước",
  },
  {
    id: "2",
    category: "place",
    emoji: "📍",
    iconBg: "#eff6ff",
    title: "Góc chill của hai đứa",
    detail: "Quán cafe nhỏ quận 1",
    categoryLabel: "Địa điểm",
    timeAgo: "Hôm qua",
  },
  {
    id: "3",
    category: "hobby",
    emoji: "🎨",
    iconBg: "#fdf4ff",
    title: "Em mê vẽ tranh sơn dầu",
    detail: "Dụng cụ vẽ tranh mới mua",
    categoryLabel: "Sở thích",
    timeAgo: "2 ngày trước",
  },
  {
    id: "4",
    category: "allergy",
    emoji: "⚠️",
    iconBg: "#fef2f2",
    title: "Dị ứng tôm",
    detail: "Ăn tôm bị nổi mề đay",
    categoryLabel: "Dị ứng",
    timeAgo: "3 ngày trước",
  },
  {
    id: "5",
    category: "music",
    emoji: "🎵",
    iconBg: "#eef2ff",
    title: "Thích nghe Vũ Cát Tường",
    detail: "List nhạc buổi tối",
    categoryLabel: "Âm nhạc",
    timeAgo: "1 tuần trước",
  },
  {
    id: "6",
    category: "movie",
    emoji: "🎬",
    iconBg: "#f5f3ff",
    title: "Mê phim Studio Ghibli",
    detail: "Xem đi xem lại nhiều lần",
    categoryLabel: "Phim",
    timeAgo: "1 tuần trước",
  },
  {
    id: "7",
    category: "gift",
    emoji: "🎁",
    iconBg: "#f0fdf4",
    title: "Thích hoa hướng dương",
    detail: "Màu vàng là màu em thích",
    categoryLabel: "Quà",
    timeAgo: "2 tuần trước",
  },
  {
    id: "8",
    category: "trait",
    emoji: "✨",
    iconBg: "#fefce8",
    title: "Em hay cười khi ngại ngùng",
    categoryLabel: "Tính cách",
    timeAgo: "2 tuần trước",
  },
  {
    id: "9",
    category: "style",
    emoji: "👗",
    iconBg: "#faf5ff",
    title: "Thích mặc đồ pastel nhẹ nhàng",
    detail: "Tông màu hồng và be",
    categoryLabel: "Phong cách",
    timeAgo: "3 tuần trước",
  },
  {
    id: "10",
    category: "date",
    emoji: "💑",
    iconBg: "#fff1f2",
    title: "Thích đi cà phê buổi sáng",
    detail: "Uống bạc sỉu ít đường",
    categoryLabel: "Hẹn hò",
    timeAgo: "1 tháng trước",
  },
];

// ─── EntryCard ───────────────────────────────────────────────

const EntryCard = memo(function EntryCard({
  item,
  onPress,
}: {
  item: Entry;
  onPress: (id: string) => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, tension: 200, friction: 20 }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 200, friction: 20 }).start();
  }, [scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(item.id)}
        style={{
          backgroundColor: Colors.surface,
          borderRadius: 16,
          padding: 14,
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
          marginBottom: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        {/* Icon circle */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: item.iconBg,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
        </View>

        {/* Content */}
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: Colors.textPrimary,
              marginBottom: 2,
            }}
          >
            {item.title}
          </Text>
          {item.detail ? (
            <Text
              numberOfLines={1}
              style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 2 }}
            >
              {item.detail}
            </Text>
          ) : null}
          <Text style={{ fontSize: 12, color: Colors.textMuted }}>
            {item.categoryLabel} · {item.timeAgo}
          </Text>
        </View>

        {/* Chi tiết button */}
        <Text
          style={{
            fontSize: 13,
            fontWeight: "700",
            color: Colors.primary,
            flexShrink: 0,
          }}
        >
          Chi tiết
        </Text>
      </Pressable>
    </Animated.View>
  );
});

// ─── FilterChip ──────────────────────────────────────────────

const FilterChip = memo(function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={12}>
      {({ pressed }) => (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: active ? Colors.primary : Colors.surface,
            borderWidth: 1,
            borderColor: active ? Colors.primary : Colors.border,
            opacity: pressed ? 0.85 : 1,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: active ? "700" : "500",
              color: active ? Colors.textOnPrimary : Colors.textSecondary,
            }}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
});

// ─── Sort Bottom Sheet ───────────────────────────────────────

const SORT_OPTIONS: { key: SortOrder; label: string }[] = [
  { key: "newest", label: "Mới nhất" },
  { key: "oldest", label: "Cũ nhất" },
  { key: "az",     label: "A → Z" },
];

const SortSheet = memo(function SortSheet({
  visible,
  current,
  onSelect,
  onClose,
}: {
  visible: boolean;
  current: SortOrder;
  onSelect: (s: SortOrder) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: Colors.surface,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingBottom: Platform.OS === "ios" ? 36 : 24,
                paddingTop: 12,
              }}
            >
              {/* Handle */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: Colors.textMuted,
                  alignSelf: "center",
                  marginBottom: 16,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: Colors.textPrimary,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Sắp xếp
              </Text>

              {SORT_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.key}
                  onPress={() => { onSelect(opt.key); onClose(); }}
                >
                  {({ pressed }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 24,
                        paddingVertical: 16,
                        backgroundColor: pressed ? Colors.surfaceSecondary : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: current === opt.key ? "700" : "500",
                          color: current === opt.key ? Colors.primary : Colors.textPrimary,
                        }}
                      >
                        {opt.label}
                      </Text>
                      {current === opt.key && (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: Colors.primary,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: Colors.textOnPrimary, fontSize: 12, fontWeight: "700" }}>✓</Text>
                        </View>
                      )}
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function AllNotesScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [sortVisible, setSortVisible] = useState(false);

  const searchRef = useRef<TextInput>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MOCK_ENTRIES.length };
    for (const e of MOCK_ENTRIES) {
      counts[e.category] = (counts[e.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  // Build filter chip list (only categories that have entries)
  const filterChips = useMemo(() => {
    const chips = [{ key: "all", label: `Tất cả ${categoryCounts.all}` }];
    for (const [key, cfg] of Object.entries(CATEGORY_CONFIG)) {
      if (categoryCounts[key]) {
        chips.push({ key, label: `${cfg.emoji} ${cfg.label}` });
      }
    }
    return chips;
  }, [categoryCounts]);

  // Filter + sort
  const filteredEntries = useMemo(() => {
    let list = MOCK_ENTRIES;

    if (activeCategory !== "all") {
      list = list.filter((e) => e.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.detail ?? "").toLowerCase().includes(q)
      );
    }

    if (sortOrder === "oldest") {
      list = [...list].reverse();
    } else if (sortOrder === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, "vi"));
    }

    return list;
  }, [searchQuery, activeCategory, sortOrder]);

  const sortLabel = SORT_OPTIONS.find((o) => o.key === sortOrder)?.label ?? "Mới nhất";

  const handleEntryPress = useCallback((id: string) => {
    router.push(`/entries/${id}`);
  }, [router]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    searchRef.current?.focus();
  }, []);

  const handleClearFilter = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortOrder("newest");
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Entry }) => (
      <EntryCard item={item} onPress={handleEntryPress} />
    ),
    [handleEntryPress]
  );

  const keyExtractor = useCallback((item: Entry) => item.id, []);

  // ── Empty state ──
  const EmptyState = useMemo(
    () => (
      <View style={{ alignItems: "center", paddingTop: 80, paddingHorizontal: 32 }}>
        <Text style={{ fontSize: 56, marginBottom: 16 }}>🔍</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: Colors.textPrimary,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Không tìm thấy ghi chú
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: Colors.textMuted,
            textAlign: "center",
            lineHeight: 20,
            marginBottom: 24,
          }}
        >
          Thử tìm với từ khoá khác hoặc đổi bộ lọc
        </Text>
        <Pressable
          onPress={handleClearFilter}
          hitSlop={12}
          style={({ pressed }) => ({
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: pressed ? "#fee2e8" : "#fff1f4",
          })}
        >
          <Text style={{ fontSize: 13, fontWeight: "700", color: Colors.primary }}>
            Xoá bộ lọc
          </Text>
        </Pressable>
      </View>
    ),
    [handleClearFilter]
  );

  const ListHeader = useMemo(
    () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 4,
          paddingVertical: 8,
          marginBottom: 4,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "500", color: Colors.textSecondary }}>
          {filteredEntries.length} ghi chú
        </Text>
        <Pressable
          onPress={() => setSortVisible(true)}
          hitSlop={12}
          style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
        >
          <Text style={{ fontSize: 13, fontWeight: "700", color: Colors.primary }}>
            {sortLabel}
          </Text>
          <ChevronDown size={14} color={Colors.primary} />
        </Pressable>
      </View>
    ),
    [filteredEntries.length, sortLabel]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* ── Sticky Header + Search ── */}
      <View
        style={{
          backgroundColor: "rgba(248,245,246,0.95)",
          borderBottomWidth: 1,
          borderBottomColor: Colors.primaryAlpha08,
          paddingBottom: 12,
        }}
      >
        {/* Title row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 13,
          }}
        >
          <Pressable onPress={() => router.back()} hitSlop={12} style={{ width: 48, minHeight: 48, justifyContent: "center" }} accessibilityLabel="Quay lại" accessibilityRole="button">
            <ArrowLeft size={22} color={Colors.textPrimary} />
          </Pressable>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 17,
              fontWeight: "700",
              color: Colors.textPrimary,
            }}
          >
            Tất cả ghi chú
          </Text>
          <Pressable
            onPress={() => setSortVisible(true)}
            hitSlop={12}
            style={{ width: 48, minHeight: 48, alignItems: "flex-end", justifyContent: "center" }}
            accessibilityLabel="Bộ lọc"
            accessibilityRole="button"
          >
            <SlidersHorizontal size={20} color={Colors.textSecondary} />
          </Pressable>
        </View>

        {/* Search bar */}
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.surface,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: Colors.border,
              paddingHorizontal: 14,
              height: 46,
              gap: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <Search size={16} color={Colors.textMuted} />
            <TextInput
              ref={searchRef}
              style={{
                flex: 1,
                fontSize: 15,
                color: Colors.textPrimary,
                paddingVertical: 0,
              }}
              placeholder="Tìm kiếm ghi chú..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              clearButtonMode="never"
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={handleClearSearch} hitSlop={12} accessibilityLabel="Xoá tìm kiếm" accessibilityRole="button">
                <X size={16} color={Colors.textMuted} />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {/* ── Filter Chips ── */}
      <View
        style={{
          backgroundColor: Colors.background,
          paddingVertical: 10,
        }}
      >
        <FlatList
          data={filterChips}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          renderItem={({ item }) => (
            <FilterChip
              label={item.label}
              active={activeCategory === item.key}
              onPress={() => setActiveCategory(item.key)}
            />
          )}
        />
      </View>

      {/* ── List ── */}
      <FlatList
        data={filteredEntries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />

      {/* ── FAB ── */}
      <Pressable
        onPress={() => router.push("/(tabs)/add")}
        hitSlop={12}
        accessibilityLabel="Thêm ghi chú"
        accessibilityRole="button"
        style={({ pressed }) => ({
          position: "absolute",
          bottom: 28,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: Colors.primary,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 10,
          opacity: pressed ? 0.88 : 1,
        })}
      >
        <Plus size={26} color={Colors.textOnPrimary} />
      </Pressable>

      {/* ── Sort Sheet ── */}
      <SortSheet
        visible={sortVisible}
        current={sortOrder}
        onSelect={setSortOrder}
        onClose={() => setSortVisible(false)}
      />
    </SafeAreaView>
  );
}
