import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Search,
  Bot,
  Map,
  Timer,
  Brain,
  Mic,
  ImageIcon,
  Bell,
  CalendarDays,
  BookOpen,
  HelpCircle,
  Gift,
} from 'lucide-react-native';
import { Colors } from '@/theme';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface UtilityItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  badge?: string;
  badgeColor?: string;
  route?: string;
  comingSoon?: boolean;
}

// ─── Constants ──────────────────────────────────────────────────────────────────

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_GAP = 14;
const CARD_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_PADDING * 2 - CARD_GAP) / 2;

const MAIN_UTILITIES: UtilityItem[] = [
  {
    id: 'chat',
    label: 'AI Chat',
    description: 'Trò chuyện với AI về người yêu',
    icon: <Bot size={22} color="#fff" />,
    iconBg: '#7c3aed',
    badge: 'HOT',
    badgeColor: Colors.primary,
    route: '/(tabs)/chat',
  },
  {
    id: 'map',
    label: 'Bản đồ hẹn hò',
    description: 'Khám phá địa điểm hẹn hò',
    icon: <Map size={22} color="#fff" />,
    iconBg: '#059669',
    badge: 'MỚI',
    badgeColor: '#059669',
    route: '/date-map',
  },
  {
    id: 'counter',
    label: 'Đếm ngày yêu',
    description: 'Đếm ngược ngày kỷ niệm',
    icon: <Timer size={22} color="#fff" />,
    iconBg: Colors.primary,
    badge: 'HOT',
    badgeColor: Colors.primary,
    route: '/love-counter',
  },
  {
    id: 'insight',
    label: 'Insight 360',
    description: 'Phân tích sâu về người yêu',
    icon: <Brain size={22} color="#fff" />,
    iconBg: '#f59e0b',
    badge: 'MỚI',
    badgeColor: '#059669',
    route: '/insight',
  },
  {
    id: 'voice',
    label: 'Ghi âm tình yêu',
    description: 'Lưu giữ giọng nói yêu thương',
    icon: <Mic size={22} color="#fff" />,
    iconBg: '#4f46e5',
    badge: 'MỚI',
    badgeColor: '#059669',
    route: '/voice-note',
  },
  {
    id: 'album',
    label: 'Album ảnh',
    description: 'Bộ sưu tập khoảnh khắc',
    icon: <ImageIcon size={22} color="#fff" />,
    iconBg: '#0ea5e9',
    route: '/album',
  },
  {
    id: 'reminder',
    label: 'Nhắc nhở',
    description: 'Không quên ngày quan trọng',
    icon: <Bell size={22} color="#fff" />,
    iconBg: '#f97316',
    route: '/daily-reminder',
  },
  {
    id: 'calendar',
    label: 'Ngày đặc biệt',
    description: 'Quản lý sự kiện hai đứa',
    icon: <CalendarDays size={22} color="#fff" />,
    iconBg: '#ec4899',
    route: '/(tabs)/calendar',
  },
];

const COMING_SOON: UtilityItem[] = [
  {
    id: 'diary',
    label: 'Nhật ký tình yêu',
    description: '',
    icon: <BookOpen size={22} color="#fff" />,
    iconBg: '#14b8a6',
    comingSoon: true,
  },
  {
    id: 'quiz',
    label: 'Quiz tình yêu',
    description: '',
    icon: <HelpCircle size={22} color="#fff" />,
    iconBg: '#8b5cf6',
    comingSoon: true,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    description: '',
    icon: <Gift size={22} color="#fff" />,
    iconBg: Colors.primaryDark,
    comingSoon: true,
  },
];

// ─── Utility Card ───────────────────────────────────────────────────────────────

const UtilityCard = memo(function UtilityCard({
  item,
  onPress,
}: {
  item: UtilityItem;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={item.comingSoon ? undefined : onPress}
      style={({ pressed }) => [
        styles.card,
        item.comingSoon && styles.cardDisabled,
        !item.comingSoon && pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
      ]}
    >
      {/* Badge */}
      {item.badge && (
        <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      {item.comingSoon && (
        <View style={[styles.badge, { backgroundColor: Colors.textMuted }]}>
          <Text style={[styles.badgeText, { fontSize: 8 }]}>SẮP RA MẮT</Text>
        </View>
      )}

      {/* Icon */}
      <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
        {item.icon}
      </View>

      {/* Label + description */}
      <Text style={styles.cardLabel} numberOfLines={1}>{item.label}</Text>
      {item.description ? (
        <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
      ) : null}
    </Pressable>
  );
});

// ─── Main Screen ────────────────────────────────────────────────────────────────

export default function AllUtilitiesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredMain = search.trim()
    ? MAIN_UTILITIES.filter(
        (u) =>
          u.label.toLowerCase().includes(search.toLowerCase()) ||
          u.description.toLowerCase().includes(search.toLowerCase())
      )
    : MAIN_UTILITIES;

  const handlePress = useCallback(
    (route?: string) => {
      if (route) router.push(route as any);
    },
    [router]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <ChevronLeft size={22} color="#374151" />
        </Pressable>

        <Text style={styles.headerTitle}>Tất cả tiện ích</Text>

        <Pressable
          hitSlop={10}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Search size={20} color="#374151" />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Search bar ── */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm tiện ích..."
              placeholderTextColor={Colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* ── Main utilities grid ── */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.sectionTitle}>TIỆN ÍCH CHÍNH</Text>
          <View style={styles.grid}>
            {filteredMain.map((item) => (
              <UtilityCard
                key={item.id}
                item={item}
                onPress={() => handlePress(item.route)}
              />
            ))}
          </View>
        </View>

        {/* ── Coming soon ── */}
        {!search.trim() && (
          <View style={{ paddingHorizontal: 16, marginTop: 28 }}>
            <Text style={styles.sectionTitle}>SẮP RA MẮT</Text>
            <View style={[styles.grid, { opacity: 0.5 }]}>
              {COMING_SOON.map((item) => (
                <UtilityCard
                  key={item.id}
                  item={item}
                  onPress={() => {}}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },

  // Search
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    paddingVertical: 0,
    marginLeft: 10,
  },

  // Section
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 14,
    paddingLeft: 2,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Card
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: CARD_GAP,
  },
  cardDisabled: {
    opacity: 1,
  },

  // Badge
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textOnPrimary,
  },

  // Icon box
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  // Card text
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
});
