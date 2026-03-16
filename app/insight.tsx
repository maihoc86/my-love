import React from "react";
import { Colors } from "@/theme";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Sparkles } from "lucide-react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

const CATEGORIES_DATA = [
  { key: "food", label: "Món ăn", count: 24, emoji: "🍜", angle: 0 },
  { key: "place", label: "Địa điểm", count: 8, emoji: "📍", angle: 60 },
  { key: "hobby", label: "Sở thích", count: 15, emoji: "🎨", angle: 120 },
  { key: "trait", label: "Tính cách", count: 7, emoji: "💫", angle: 180 },
  { key: "allergy", label: "Dị ứng", count: 4, emoji: "⚠️", angle: 240 },
  { key: "music", label: "Âm nhạc", count: 6, emoji: "🎵", angle: 300 },
];

const SENTIMENTS = [
  { key: "love", label: "Yêu thích", pct: 50, color: Colors.primary },
  { key: "like", label: "Thích", pct: 25, color: Colors.primaryLight },
  { key: "neutral", label: "Bình thường", pct: 11, color: "#fda4af" },
  { key: "hate", label: "Ghét / Dị ứng", pct: 14, color: Colors.error },
];

const TOTAL_ENTRIES = 56;

export default function InsightScreen() {
  const router = useRouter();
  const cx = 160;
  const cy = 140;
  const radius = 100;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.background }}>
      <ScrollView bounces={false}>
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center bg-white"
            style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <ChevronLeft size={20} color="#1e1b2e" />
          </Pressable>
          <Text className="flex-1 text-lg font-bold text-center" style={{ color: "#1e1b2e" }}>
            Insight 360°
          </Text>
          <View className="w-10" />
        </View>

        {/* Summary Bar */}
        <View
          className="mx-4 mb-4 px-4 py-3 rounded-xl flex-row justify-around"
          style={{ backgroundColor: "#fff" }}
        >
          <Text className="text-xs font-semibold" style={{ color: Colors.textSecondary }}>
            <Text style={{ color: Colors.primary, fontWeight: "800" }}>{TOTAL_ENTRIES}</Text> ghi chú
          </Text>
          <Text className="text-xs" style={{ color: "#d1d5db" }}>·</Text>
          <Text className="text-xs font-semibold" style={{ color: Colors.textSecondary }}>
            <Text style={{ color: "#8b5cf6", fontWeight: "800" }}>11</Text> danh mục
          </Text>
          <Text className="text-xs" style={{ color: "#d1d5db" }}>·</Text>
          <Text className="text-xs font-semibold" style={{ color: Colors.textSecondary }}>
            <Text style={{ color: Colors.success, fontWeight: "800" }}>5</Text> cảm xúc
          </Text>
        </View>

        {/* Neuron Map */}
        <View
          className="mx-4 mb-4 bg-white rounded-2xl p-4 items-center"
          style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 }}
        >
          <Text className="text-sm font-bold mb-2" style={{ color: "#1e1b2e" }}>
            Bản đồ thông tin
          </Text>
          <Svg width={320} height={280}>
            {/* Connection lines */}
            {CATEGORIES_DATA.map((cat) => {
              const rad = (cat.angle * Math.PI) / 180;
              const x = cx + radius * Math.cos(rad);
              const y = cy + radius * Math.sin(rad);
              return (
                <Line
                  key={cat.key}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#fecdd3"
                  strokeWidth={1.5}
                  strokeDasharray="4,4"
                />
              );
            })}

            {/* Center node */}
            <Circle cx={cx} cy={cy} r={32} fill={Colors.primary} />
            <SvgText
              x={cx}
              y={cy - 4}
              fill="#fff"
              fontSize={10}
              fontWeight="800"
              textAnchor="middle"
            >
              THÁI HỌC
            </SvgText>
            <SvgText
              x={cx}
              y={cy + 10}
              fill="rgba(255,255,255,0.8)"
              fontSize={8}
              textAnchor="middle"
            >
              ♥
            </SvgText>

            {/* Category nodes */}
            {CATEGORIES_DATA.map((cat) => {
              const rad = (cat.angle * Math.PI) / 180;
              const x = cx + radius * Math.cos(rad);
              const y = cy + radius * Math.sin(rad);
              const size = 16 + cat.count * 0.6;
              return (
                <React.Fragment key={cat.key}>
                  <Circle
                    cx={x}
                    cy={y}
                    r={size}
                    fill={cat.key === "allergy" ? "#fef2f2" : "#fff1f2"}
                    stroke={cat.key === "allergy" ? Colors.error : "#fda4af"}
                    strokeWidth={2}
                  />
                  <SvgText
                    x={x}
                    y={y - 4}
                    fontSize={14}
                    textAnchor="middle"
                  >
                    {cat.emoji}
                  </SvgText>
                  <SvgText
                    x={x}
                    y={y + 12}
                    fill="#1e1b2e"
                    fontSize={8}
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {cat.count}
                  </SvgText>
                  <SvgText
                    x={x}
                    y={y + size + 14}
                    fill="#6b7280"
                    fontSize={8}
                    textAnchor="middle"
                  >
                    {cat.label}
                  </SvgText>
                </React.Fragment>
              );
            })}
          </Svg>
        </View>

        {/* Sentiment Analysis */}
        <View
          className="mx-4 mb-4 bg-white rounded-2xl p-4"
          style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 }}
        >
          <Text className="text-sm font-bold mb-4" style={{ color: "#1e1b2e" }}>
            Phân tích cảm xúc
          </Text>
          {SENTIMENTS.map((s) => (
            <View key={s.key} className="mb-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs font-medium" style={{ color: "#1e1b2e" }}>
                  {s.label}
                </Text>
                <Text className="text-xs font-bold" style={{ color: s.color }}>
                  {s.pct}%
                </Text>
              </View>
              <View className="h-2 rounded-full bg-gray-100">
                <View
                  className="h-2 rounded-full"
                  style={{
                    width: `${s.pct}%`,
                    backgroundColor: s.color,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* AI Overview */}
        <View
          className="mx-4 mb-8 rounded-2xl p-4"
          style={{ backgroundColor: "#f5f3ff" }}
        >
          <View className="flex-row items-center mb-3">
            <Sparkles size={18} color="#8b5cf6" />
            <Text className="text-sm font-bold ml-2" style={{ color: "#8b5cf6" }}>
              AI Tổng quan
            </Text>
          </View>
          <Text className="text-sm leading-6" style={{ color: "#1e1b2e" }}>
            Thái Hoc là người yêu ẩm thực, đặc biệt thích phở bò và đồ Việt. Em rất
            thích đi cafe có view đẹp, yên tĩnh. Sở thích chính gồm đọc sách và nghe
            nhạc indie. Lưu ý em dị ứng tôm và hải sản có vỏ.
          </Text>
          <View className="mt-3 p-3 rounded-xl bg-white">
            <Text className="text-xs font-semibold mb-1" style={{ color: "#8b5cf6" }}>
              💡 Gợi ý hẹn hò
            </Text>
            <Text className="text-xs leading-5" style={{ color: Colors.textSecondary }}>
              Thử đưa em đi quán cafe view sông Hồng vào cuối tuần, gọi trà sữa trà xanh
              (em thích!) và mang theo cuốn sách mới.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
