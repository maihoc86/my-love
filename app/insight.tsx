import React from "react";
import { Colors } from "@/theme";
import { View, Text, Pressable, ScrollView, StatusBar } from "react-native";
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
  { key: "neutral", label: "Bình thường", pct: 11, color: Colors.primaryLight },
  { key: "hate", label: "Ghét / Dị ứng", pct: 14, color: Colors.error },
];

const TOTAL_ENTRIES = 56;

export default function InsightScreen() {
  const router = useRouter();
  const cx = 160;
  const cy = 140;
  const radius = 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView bounces={false}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
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
              backgroundColor: Colors.surface,
              shadowColor: Colors.textPrimary,
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <ChevronLeft size={20} color={Colors.textPrimary} />
          </Pressable>
          <Text
            style={{
              flex: 1,
              fontSize: 18,
              fontWeight: "700",
              textAlign: "center",
              color: Colors.textPrimary,
            }}
          >
            Insight 360°
          </Text>
          <View style={{ width: 48 }} />
        </View>

        {/* Summary Bar */}
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: Colors.surface,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "600", color: Colors.textSecondary }}>
            <Text style={{ color: Colors.primary, fontWeight: "800" }}>{TOTAL_ENTRIES}</Text>{" "}
            ghi chú
          </Text>
          <Text style={{ fontSize: 12, color: Colors.border }}>·</Text>
          <Text style={{ fontSize: 12, fontWeight: "600", color: Colors.textSecondary }}>
            <Text style={{ color: Colors.aiPurple, fontWeight: "800" }}>11</Text> danh mục
          </Text>
          <Text style={{ fontSize: 12, color: Colors.border }}>·</Text>
          <Text style={{ fontSize: 12, fontWeight: "600", color: Colors.textSecondary }}>
            <Text style={{ color: Colors.success, fontWeight: "800" }}>5</Text> cảm xúc
          </Text>
        </View>

        {/* Neuron Map */}
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 16,
            backgroundColor: Colors.surface,
            borderRadius: 16,
            padding: 16,
            alignItems: "center",
            shadowColor: Colors.textPrimary,
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 8,
              color: Colors.textPrimary,
            }}
          >
            Bản đồ thông tin
          </Text>
          <Svg width={320} height={280}>
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
                  stroke={Colors.primaryLight}
                  strokeWidth={1.5}
                  strokeDasharray="4,4"
                />
              );
            })}
            <Circle cx={cx} cy={cy} r={32} fill={Colors.primary} />
            <SvgText
              x={cx}
              y={cy - 4}
              fill={Colors.textOnPrimary}
              fontSize={10}
              fontWeight="800"
              textAnchor="middle"
            >
              THÁI HỌC
            </SvgText>
            <SvgText
              x={cx}
              y={cy + 10}
              fill={Colors.whiteAlpha80}
              fontSize={8}
              textAnchor="middle"
            >
              ♥
            </SvgText>
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
                    fill={cat.key === "allergy" ? Colors.errorLight : Colors.primaryAlpha05}
                    stroke={cat.key === "allergy" ? Colors.error : Colors.primaryLight}
                    strokeWidth={2}
                  />
                  <SvgText x={x} y={y - 4} fontSize={14} textAnchor="middle">
                    {cat.emoji}
                  </SvgText>
                  <SvgText
                    x={x}
                    y={y + 12}
                    fill={Colors.textPrimary}
                    fontSize={8}
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {cat.count}
                  </SvgText>
                  <SvgText
                    x={x}
                    y={y + size + 14}
                    fill={Colors.textSecondary}
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
          style={{
            marginHorizontal: 16,
            marginBottom: 16,
            backgroundColor: Colors.surface,
            borderRadius: 16,
            padding: 16,
            shadowColor: Colors.textPrimary,
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 16,
              color: Colors.textPrimary,
            }}
          >
            Phân tích cảm xúc
          </Text>
          {SENTIMENTS.map((s) => (
            <View key={s.key} style={{ marginBottom: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "500", color: Colors.textPrimary }}>
                  {s.label}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "700", color: s.color }}>
                  {s.pct}%
                </Text>
              </View>
              <View
                style={{
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: Colors.borderLight,
                }}
              >
                <View
                  style={{
                    height: 8,
                    borderRadius: 999,
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
          style={{
            marginHorizontal: 16,
            marginBottom: 32,
            borderRadius: 16,
            padding: 16,
            backgroundColor: Colors.aiPurpleAlpha10,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
          >
            <Sparkles size={18} color={Colors.aiPurple} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                marginLeft: 8,
                color: Colors.aiPurple,
              }}
            >
              AI Tổng quan
            </Text>
          </View>
          <Text style={{ fontSize: 14, lineHeight: 24, color: Colors.textPrimary }}>
            Thái Hoc là người yêu ẩm thực, đặc biệt thích phở bò và đồ Việt. Em rất thích
            đi cafe có view đẹp, yên tĩnh. Sở thích chính gồm đọc sách và nghe nhạc indie.
            Lưu ý em dị ứng tôm và hải sản có vỏ.
          </Text>
          <View
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              backgroundColor: Colors.surface,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                marginBottom: 4,
                color: Colors.aiPurple,
              }}
            >
              💡 Gợi ý hẹn hò
            </Text>
            <Text
              style={{ fontSize: 12, lineHeight: 20, color: Colors.textSecondary }}
            >
              Thử đưa em đi quán cafe view sông Hồng vào cuối tuần, gọi trà sữa trà xanh
              (em thích!) và mang theo cuốn sách mới.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
