import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AlertTriangle, Trash2, ChevronRight } from "lucide-react-native";

// ─── Mock Data ───────────────────────────────────────────────

const CATEGORIES: Record<string, { emoji: string; label: string }> = {
  food_like: { emoji: "🍜", label: "Thich an" },
  food_dislike: { emoji: "🚫", label: "Khong thich an" },
  hobby: { emoji: "🎮", label: "So thich" },
  fashion: { emoji: "👗", label: "Thoi trang" },
  music: { emoji: "🎵", label: "Am nhac" },
  movie: { emoji: "🎬", label: "Phim" },
  place: { emoji: "📍", label: "Dia diem" },
  gift: { emoji: "🎁", label: "Qua tang" },
  habit: { emoji: "💫", label: "Thoi quen" },
  health: { emoji: "💊", label: "Suc khoe" },
  other: { emoji: "📝", label: "Khac" },
};

const mockEntries = [
  {
    id: "1",
    category: "food_like",
    title: "Pho bo tai nam",
    detail: "Thich an pho bo tai nam o quan Ly Quoc Su",
    sentiment: "love",
    date: "2026-03-10",
  },
  {
    id: "2",
    category: "food_like",
    title: "Tra sua tran chau duong den",
    detail: "Uong it duong, nhieu tran chau",
    sentiment: "love",
    date: "2026-03-09",
  },
  {
    id: "3",
    category: "food_dislike",
    title: "Di ung tom",
    detail: "Bi noi man do neu an tom",
    sentiment: "hate",
    date: "2026-03-08",
  },
  {
    id: "4",
    category: "hobby",
    title: "Ve tranh mau nuoc",
    detail: "Thich ve phong canh thien nhien",
    sentiment: "love",
    date: "2026-03-07",
  },
  {
    id: "5",
    category: "music",
    title: "Nghe nhac ballad Han Quoc",
    detail: "Dac biet la IU va BTS",
    sentiment: "like",
    date: "2026-03-06",
  },
  {
    id: "6",
    category: "fashion",
    title: "Thich mac vay hoa nhat",
    detail: "Mau pastel nhe nhang",
    sentiment: "like",
    date: "2026-03-05",
  },
  {
    id: "7",
    category: "movie",
    title: "Phim hoat hinh Ghibli",
    detail: "Spirited Away la phim yeu thich nhat",
    sentiment: "love",
    date: "2026-03-04",
  },
  {
    id: "8",
    category: "place",
    title: "Quan ca phe The Note Coffee",
    detail: "Thich ngoi tang 3, nhin ra Ho Guom",
    sentiment: "love",
    date: "2026-03-03",
  },
  {
    id: "9",
    category: "gift",
    title: "Gau bong teddy",
    detail: "Thich mau hong pastel, co nho",
    sentiment: "like",
    date: "2026-03-02",
  },
  {
    id: "10",
    category: "health",
    title: "Di ung phan hoa",
    detail: "Bi hat xi va chay nuoc mui vao mua xuan",
    sentiment: "dislike",
    date: "2026-03-01",
  },
  {
    id: "11",
    category: "habit",
    title: "Thich doc sach truoc khi ngu",
    detail: "Thuong doc sach self-help va tieu thuyet",
    sentiment: "like",
    date: "2026-02-28",
  },
  {
    id: "12",
    category: "food_dislike",
    title: "Ghet mon kho qua",
    detail: "Khong chiu duoc vi dang",
    sentiment: "hate",
    date: "2026-02-27",
  },
];

const mockUpcomingDates = [
  {
    id: "d1",
    title: "Sinh nhat Thai Hoc",
    date: "2026-03-17",
    emoji: "🎂",
    type: "birthday",
  },
  {
    id: "d2",
    title: "Ky niem 1 nam",
    date: "2026-03-21",
    emoji: "💕",
    type: "anniversary",
  },
  {
    id: "d3",
    title: "Valentine trang",
    date: "2026-03-14",
    emoji: "🎉",
    type: "holiday",
  },
];

const mockWarnings = [
  { id: "w1", label: "Di ung tom", type: "allergy" },
  { id: "w2", label: "Ghet kho qua", type: "hate" },
];

const SENTIMENT_EMOJI: Record<string, string> = {
  love: "❤️",
  like: "👍",
  neutral: "😐",
  dislike: "👎",
  hate: "🚫",
};

// ─── Helpers ─────────────────────────────────────────────────

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getUrgencyColor(days: number): string {
  if (days === 0) return "#10b981";
  if (days <= 3) return "#ef4444";
  if (days <= 7) return "#f97316";
  return "#f43f5e";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  return `${day} thang ${month < 10 ? "0" + month : month}`;
}

function getCategoryStats() {
  const counts: Record<string, number> = {};
  mockEntries.forEach((e) => {
    counts[e.category] = (counts[e.category] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([cat, count]) => ({
      category: cat,
      emoji: CATEGORIES[cat]?.emoji || "📝",
      label: CATEGORIES[cat]?.label || cat,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

// ─── Component ───────────────────────────────────────────────

export default function DashboardScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState(mockEntries);
  const totalCount = entries.length;
  const categoryStats = getCategoryStats();
  const recentEntries = entries.slice(0, 5);

  const handleDelete = (id: string) => {
    Alert.alert("Xoa ghi chu", "Ban co chac muon xoa ghi chu nay?", [
      { text: "Huy", style: "cancel" },
      {
        text: "Xoa",
        style: "destructive",
        onPress: () => setEntries((prev) => prev.filter((e) => e.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fdf2f8" }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Card ── */}
        <View
          className="mx-4 mt-4 p-6"
          style={{
            backgroundColor: "#f43f5e",
            borderRadius: 20,
            shadowColor: "#f43f5e",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          <Text className="text-2xl font-extrabold text-white mb-1">
            ♥ Thai Hoc cua ban
          </Text>
          <Text className="text-white opacity-90 text-base mb-5">
            Ban da luu giu {totalCount} ki niem tuyet voi
          </Text>
          <View className="flex-row gap-3">
            <Pressable
              className="flex-1 items-center py-3 active:opacity-80"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 14,
              }}
              onPress={() => router.push("/add")}
            >
              <Text className="font-bold" style={{ color: "#f43f5e" }}>
                Them moi
              </Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center py-3 active:opacity-80"
              style={{
                backgroundColor: "rgba(255,255,255,0.25)",
                borderRadius: 14,
              }}
              onPress={() => router.push("/chat")}
            >
              <Text className="font-bold text-white">Chat AI</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Upcoming Dates ── */}
        <View className="mt-6 px-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className="text-lg font-bold"
              style={{ color: "#1e1b2e" }}
            >
              Sap toi
            </Text>
            <Pressable
              className="flex-row items-center active:opacity-80"
              onPress={() => router.push("/calendar")}
            >
              <Text
                className="text-sm font-semibold mr-1"
                style={{ color: "#f43f5e" }}
              >
                Xem tat ca
              </Text>
              <ChevronRight size={16} color="#f43f5e" />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {mockUpcomingDates.map((item) => {
              const days = getDaysUntil(item.date);
              const urgencyColor = getUrgencyColor(days);
              return (
                <View
                  key={item.id}
                  className="p-4"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 20,
                    width: 160,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <Text className="text-3xl mb-2">{item.emoji}</Text>
                  <View
                    className="self-start px-3 py-1 mb-2"
                    style={{
                      backgroundColor: urgencyColor,
                      borderRadius: 12,
                    }}
                  >
                    <Text className="text-white text-xs font-bold">
                      {days === 0
                        ? "Hom nay!"
                        : days < 0
                          ? `Da qua ${Math.abs(days)} ngay`
                          : `Con ${days} ngay`}
                    </Text>
                  </View>
                  <Text
                    className="font-bold text-sm mb-1"
                    style={{ color: "#1e1b2e" }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-xs" style={{ color: "#9ca3af" }}>
                    {formatDate(item.date)}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Warning Section ── */}
        {mockWarnings.length > 0 && (
          <View className="mx-4 mt-6">
            <View
              className="p-4 flex-row items-start"
              style={{
                backgroundColor: "#fef2f2",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#fecaca",
              }}
            >
              <AlertTriangle
                size={22}
                color="#ef4444"
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View className="flex-1">
                <Text
                  className="font-bold text-base mb-2"
                  style={{ color: "#ef4444" }}
                >
                  Luu y quan trong
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {mockWarnings.map((w) => (
                    <View
                      key={w.id}
                      className="px-3 py-1"
                      style={{
                        backgroundColor: "#fee2e2",
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: "#dc2626" }}
                      >
                        {w.type === "allergy" ? "⚠️" : "🚫"} {w.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ── Category Stats Grid ── */}
        <View className="mt-6 px-4">
          <Text
            className="text-lg font-bold mb-3"
            style={{ color: "#1e1b2e" }}
          >
            Danh muc
          </Text>
          <View className="flex-row flex-wrap" style={{ gap: 10 }}>
            {categoryStats.map((stat) => (
              <View
                key={stat.category}
                className="items-center p-3"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 20,
                  width: "31%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text className="text-2xl mb-1">{stat.emoji}</Text>
                <Text
                  className="text-xs font-semibold mb-0.5"
                  style={{ color: "#1e1b2e" }}
                  numberOfLines={1}
                >
                  {stat.label}
                </Text>
                <Text
                  className="text-xs font-bold"
                  style={{ color: "#f43f5e" }}
                >
                  {stat.count}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Recent Entries ── */}
        <View className="mt-6 px-4">
          <Text
            className="text-lg font-bold mb-3"
            style={{ color: "#1e1b2e" }}
          >
            Gan day
          </Text>
          {recentEntries.map((entry) => {
            const cat = CATEGORIES[entry.category];
            return (
              <View
                key={entry.id}
                className="flex-row items-center p-4 mb-3"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text className="text-2xl mr-3">{cat?.emoji || "📝"}</Text>
                <View className="flex-1">
                  <Text
                    className="font-bold text-sm"
                    style={{ color: "#1e1b2e" }}
                    numberOfLines={1}
                  >
                    {entry.title}
                  </Text>
                  <Text className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                    {formatDate(entry.date)}
                  </Text>
                </View>
                <Text className="text-lg mr-3">
                  {SENTIMENT_EMOJI[entry.sentiment] || "😐"}
                </Text>
                <Pressable
                  className="p-2 active:opacity-80"
                  onPress={() => handleDelete(entry.id)}
                  style={{ borderRadius: 10 }}
                >
                  <Trash2 size={18} color="#9ca3af" />
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
