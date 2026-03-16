import React, { useState } from 'react';
import { Colors } from "@/theme";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Search,
  MessageCircle,
  Sparkles,
  Mic,
  ChevronRight,
} from 'lucide-react-native';

// ─── Types ─────────────────────────────────────────────────────────────────────

type ChatType = 'text' | 'suggestion' | 'voice';

interface ChatItem {
  id: string;
  type: ChatType;
  preview: string;
  entries: number;
  time: string;
}

interface ChatGroup {
  date: string;
  items: ChatItem[];
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const CHAT_HISTORY: ChatGroup[] = [
  {
    date: 'HÔM NAY',
    items: [
      {
        id: '1',
        type: 'text',
        preview: 'Em thích ăn bún bò, ghét mắm tôm...',
        entries: 3,
        time: '14:30',
      },
      {
        id: '2',
        type: 'suggestion',
        preview: 'Gợi ý hôm nay: Mua hoa hồng trắng...',
        entries: 0,
        time: '09:15',
      },
    ],
  },
  {
    date: 'HÔM QUA',
    items: [
      {
        id: '3',
        type: 'text',
        preview: 'Em mê phim Ghibli, thích vẽ trann...',
        entries: 5,
        time: '20:45',
      },
      {
        id: '4',
        type: 'voice',
        preview: 'Ghi âm: Em kể về quán cafe mới...',
        entries: 2,
        time: '18:20',
      },
    ],
  },
  {
    date: '12 THÁNG 3',
    items: [
      {
        id: '5',
        type: 'text',
        preview: 'Dị ứng tôm, phấn hoa. Sinh nhật...',
        entries: 4,
        time: '10:00',
      },
    ],
  },
];

const FILTERS = ['Tất cả', 'Có ghi chú', 'Giọng nói', 'Gợi ý AI'];

// ─── Type config ───────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  ChatType,
  { Icon: typeof MessageCircle; color: string; bg: string; label: string }
> = {
  text: { Icon: MessageCircle, color: Colors.primary, bg: Colors.primaryAlpha08, label: 'Chat' },
  suggestion: { Icon: Sparkles, color: Colors.aiPurple, bg: Colors.aiPurpleAlpha10, label: 'Gợi ý AI' },
  voice: { Icon: Mic, color: Colors.sentimentLike, bg: Colors.warningAlpha15, label: 'Voice' },
};

// ─── Chat History Screen ────────────────────────────────────────────────────────

export default function ChatHistoryScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const totalChats = CHAT_HISTORY.reduce((s, g) => s + g.items.length, 0);
  const totalEntries = CHAT_HISTORY.reduce(
    (s, g) => s + g.items.reduce((a, i) => a + i.entries, 0),
    0
  );
  const voiceCount = CHAT_HISTORY.reduce(
    (s, g) => s + g.items.filter((i) => i.type === 'voice').length,
    0
  );

  // Filter logic
  const filterMap: Record<string, ChatType | null> = {
    'Tất cả': null,
    'Có ghi chú': 'text',
    'Giọng nói': 'voice',
    'Gợi ý AI': 'suggestion',
  };

  const filteredHistory = CHAT_HISTORY.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      const typeFilter = filterMap[activeFilter];
      const matchesType = !typeFilter || item.type === typeFilter;
      const matchesSearch =
        !search || item.preview.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    }),
  })).filter((group) => group.items.length > 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      {/* ── Header ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: Colors.background,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, minWidth: 48, minHeight: 48, justifyContent: "center" as const })}
          accessibilityLabel="Quay lại"
          accessibilityRole="button"
        >
          <ChevronLeft size={26} color={Colors.textPrimary} />
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.textPrimary }}>
          Lịch sử Chat
        </Text>

        <Pressable
          hitSlop={12}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, minWidth: 48, minHeight: 48, alignItems: "flex-end" as const, justifyContent: "center" as const })}
          accessibilityLabel="Tìm kiếm"
          accessibilityRole="button"
        >
          <Search size={22} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Summary card (gradient) ── */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <LinearGradient
            colors={[Colors.aiPurpleDark, Colors.primary, '#fb923c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 20,
              padding: 20,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.8)',
                fontWeight: '500',
                marginBottom: 14,
              }}
            >
              Tổng quan hoạt động
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {[
                { value: totalChats, label: 'Cuộc chat' },
                { value: totalEntries, label: 'Ghi chú' },
                { value: voiceCount, label: 'Voice' },
              ].map((stat, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <View
                      style={{
                        width: 1,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        marginHorizontal: 16,
                      }}
                    />
                  )}
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                      style={{ fontSize: 28, fontWeight: '800', color: Colors.surface }}
                    >
                      {stat.value}
                    </Text>
                    <Text
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}
                    >
                      {stat.label}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* ── Search bar ── */}
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.surface,
            borderRadius: 14,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: Colors.borderLight,
            shadowColor: Colors.textPrimary,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Search size={16} color={Colors.textTertiary} />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 13,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Colors.textPrimary,
            }}
            placeholder="Tìm kiếm lịch sử..."
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* ── Filter pills ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
            >
              {({ pressed }) => (
                <View
                  style={{
                    paddingHorizontal: 18,
                    paddingVertical: 9,
                    borderRadius: 24,
                    backgroundColor: activeFilter === f ? Colors.primary : Colors.surface,
                    borderWidth: activeFilter === f ? 0 : 1,
                    borderColor: Colors.border,
                    opacity: pressed ? 0.8 : 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: activeFilter === f ? '700' : '500',
                      color: activeFilter === f ? Colors.surface : Colors.textSecondary,
                    }}
                  >
                    {f}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Chat groups ── */}
        {filteredHistory.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 48 }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>💬</Text>
            <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.textSecondary }}>
              Chưa có cuộc chat nào
            </Text>
          </View>
        ) : (
          filteredHistory.map((group) => (
            <View key={group.date} style={{ marginBottom: 24 }}>
              {/* Date label */}
              <Text
                style={{
                  paddingHorizontal: 16,
                  fontSize: 11,
                  fontWeight: '700',
                  color: Colors.textTertiary,
                  letterSpacing: 0.8,
                  marginBottom: 8,
                }}
              >
                {group.date}
              </Text>

              {/* Card container */}
              <View
                style={{
                  marginHorizontal: 16,
                  backgroundColor: Colors.surface,
                  borderRadius: 18,
                  overflow: 'hidden',
                  shadowColor: Colors.textPrimary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {group.items.map((item, idx) => {
                  const cfg = TYPE_CONFIG[item.type];
                  const Icon = cfg.Icon;
                  const subtitle =
                    item.type === 'suggestion'
                      ? `Gợi ý AI · ${item.time}`
                      : item.type === 'voice'
                      ? `Voice · ${item.entries > 0 ? `${item.entries} entries · ` : ''}${item.time}`
                      : `${item.entries > 0 ? `${item.entries} entries đã lưu · ` : ''}${item.time}`;

                  return (
                    <Pressable key={item.id}>
                      {({ pressed }) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderTopWidth: idx > 0 ? 1 : 0,
                            borderTopColor: Colors.borderLight,
                            backgroundColor: pressed ? Colors.surfaceSecondary : 'transparent',
                          }}
                        >
                          {/* Icon circle */}
                          <View
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 22,
                              backgroundColor: cfg.bg,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 12,
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={20} color={cfg.color} />
                          </View>

                          {/* Content */}
                          <View style={{ flex: 1, marginRight: 10 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: Colors.textPrimary,
                                marginBottom: 4,
                              }}
                              numberOfLines={1}
                            >
                              {item.preview}
                            </Text>
                            <Text
                              style={{ fontSize: 12, color: Colors.textTertiary }}
                              numberOfLines={1}
                            >
                              {subtitle}
                            </Text>
                          </View>

                          {/* Entry count badge */}
                          {item.entries > 0 && (
                            <View
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                backgroundColor: Colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 8,
                                flexShrink: 0,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 11,
                                  fontWeight: '700',
                                  color: Colors.surface,
                                }}
                              >
                                {item.entries}
                              </Text>
                            </View>
                          )}

                          <ChevronRight size={16} color={Colors.border} />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
