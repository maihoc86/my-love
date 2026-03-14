import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  MapPin,
  Navigation,
  Bookmark,
  Share2,
  Plus,
  Minus,
  LocateFixed,
  Star,
  Sparkles,
} from "lucide-react-native";

const CATEGORIES = [
  { key: "restaurant", label: "Quán ăn", emoji: "🍜", active: true },
  { key: "cafe", label: "Cà phê", emoji: "☕" },
  { key: "homestay", label: "Homestay", emoji: "🏠" },
  { key: "entertainment", label: "Khu vui chơi", emoji: "🎡" },
  { key: "mall", label: "TTTM", emoji: "🏬" },
];

const SPOTS = [
  {
    id: "1",
    name: "Phở Thìn Bờ Hồ",
    category: "restaurant",
    rating: 4.5,
    distance: "850m",
    address: "13 Lò Đúc, Hai Bà Trưng, Hà Nội",
    tags: ["Em thích", "Có chỗ đỗ xe", "Bình dân"],
    lat: 21.028,
    lng: 105.852,
  },
  {
    id: "2",
    name: "The Note Coffee",
    category: "cafe",
    rating: 4.3,
    distance: "1.2km",
    address: "64 Lương Văn Can, Hoàn Kiếm",
    tags: ["View đẹp", "Yên tĩnh"],
    lat: 21.033,
    lng: 105.849,
  },
  {
    id: "3",
    name: "Lotte Center",
    category: "mall",
    rating: 4.6,
    distance: "3.5km",
    address: "54 Liễu Giai, Ba Đình, Hà Nội",
    tags: ["Shopping", "Có rạp phim"],
    lat: 21.031,
    lng: 105.812,
  },
];

export default function DateMapScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("restaurant");
  const [selectedSpot, setSelectedSpot] = useState(SPOTS[0]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fdf2f8" }}>
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
          Bản đồ hẹn hò
        </Text>
        <View className="w-10" />
      </View>

      {/* Map Placeholder */}
      <View className="mx-4 rounded-2xl overflow-hidden" style={{ height: 320 }}>
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: "#e8f5e9" }}
        >
          {/* Grid lines to simulate map */}
          <View className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <View
                key={`h${i}`}
                className="absolute left-0 right-0 h-px bg-gray-500"
                style={{ top: `${(i + 1) * 12}%` }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <View
                key={`v${i}`}
                className="absolute top-0 bottom-0 w-px bg-gray-500"
                style={{ left: `${(i + 1) * 16}%` }}
              />
            ))}
          </View>

          {/* Map Pins */}
          <View className="absolute" style={{ top: "30%", left: "40%" }}>
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: "#f43f5e" }}
            >
              <MapPin size={16} color="#fff" />
            </View>
          </View>
          <View className="absolute" style={{ top: "50%", left: "60%" }}>
            <View
              className="w-6 h-6 rounded-full items-center justify-center"
              style={{ backgroundColor: "#f43f5e", opacity: 0.7 }}
            >
              <MapPin size={12} color="#fff" />
            </View>
          </View>
          <View className="absolute" style={{ top: "40%", left: "25%" }}>
            <View
              className="w-6 h-6 rounded-full items-center justify-center"
              style={{ backgroundColor: "#f43f5e", opacity: 0.7 }}
            >
              <MapPin size={12} color="#fff" />
            </View>
          </View>

          {/* User location */}
          <View className="absolute" style={{ top: "55%", left: "48%" }}>
            <View
              className="w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: "#3b82f6" }}
            />
          </View>

          {/* eKMap watermark */}
          <Text className="absolute bottom-2 right-2 text-xs opacity-50">
            Powered by eKMap
          </Text>
        </View>

        {/* Category Pills */}
        <View className="absolute top-3 left-0 right-0">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-3">
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.key}
                onPress={() => setActiveCategory(cat.key)}
                className="mr-2 px-3 py-2 rounded-full flex-row items-center"
                style={{
                  backgroundColor:
                    activeCategory === cat.key ? "#f43f5e" : "rgba(255,255,255,0.95)",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text className="mr-1">{cat.emoji}</Text>
                <Text
                  className="text-xs font-semibold"
                  style={{
                    color: activeCategory === cat.key ? "#fff" : "#1e1b2e",
                  }}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* AI Badge */}
        <View
          className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl flex-row items-center"
          style={{ backgroundColor: "rgba(139,92,246,0.9)" }}
        >
          <Sparkles size={14} color="#fff" />
          <Text className="text-white text-xs ml-2 flex-1">
            Thái Hoc thích quán có view đẹp, yên tĩnh
          </Text>
        </View>

        {/* Zoom Controls */}
        <View className="absolute right-3 top-16 gap-2">
          <Pressable
            className="w-9 h-9 rounded-lg items-center justify-center bg-white"
            style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <Plus size={18} color="#1e1b2e" />
          </Pressable>
          <Pressable
            className="w-9 h-9 rounded-lg items-center justify-center bg-white"
            style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <Minus size={18} color="#1e1b2e" />
          </Pressable>
          <Pressable
            className="w-9 h-9 rounded-lg items-center justify-center bg-white"
            style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <LocateFixed size={18} color="#3b82f6" />
          </Pressable>
        </View>
      </View>

      {/* Spot Detail */}
      {selectedSpot && (
        <View className="mx-4 mt-4 bg-white rounded-2xl p-4" style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}>
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1">
              <Text className="text-base font-bold" style={{ color: "#1e1b2e" }}>
                {selectedSpot.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Star size={14} color="#eab308" fill="#eab308" />
                <Text className="text-sm font-semibold ml-1" style={{ color: "#1e1b2e" }}>
                  {selectedSpot.rating}
                </Text>
                <Text className="text-xs ml-3" style={{ color: "#6b7280" }}>
                  {selectedSpot.distance}
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-xs mb-3" style={{ color: "#6b7280" }}>
            {selectedSpot.address}
          </Text>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-1.5 mb-4">
            {selectedSpot.tags.map((tag) => (
              <View
                key={tag}
                className="px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "#fff1f2" }}
              >
                <Text className="text-xs font-medium" style={{ color: "#f43f5e" }}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View className="flex-row gap-2">
            <Pressable
              className="flex-1 py-3 rounded-xl flex-row items-center justify-center"
              style={{ backgroundColor: "#f43f5e" }}
              onPress={() => router.push("/navigation")}
            >
              <Navigation size={16} color="#fff" />
              <Text className="text-white font-bold text-sm ml-2">Dẫn đường</Text>
            </Pressable>
            <Pressable
              className="w-12 h-12 rounded-xl items-center justify-center bg-gray-100"
            >
              <Bookmark size={18} color="#6b7280" />
            </Pressable>
            <Pressable
              className="w-12 h-12 rounded-xl items-center justify-center bg-gray-100"
            >
              <Share2 size={18} color="#6b7280" />
            </Pressable>
          </View>
        </View>
      )}

      {/* Nearby Suggestions */}
      <View className="px-4 mt-4 mb-6">
        <Text className="text-sm font-bold mb-3" style={{ color: "#1e1b2e" }}>
          Gợi ý gần đây
        </Text>
        {SPOTS.slice(1).map((spot) => (
          <Pressable
            key={spot.id}
            className="flex-row items-center bg-white rounded-xl p-3 mb-2"
            style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
            onPress={() => setSelectedSpot(spot)}
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: "#fff1f2" }}
            >
              <MapPin size={18} color="#f43f5e" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold" style={{ color: "#1e1b2e" }}>
                {spot.name}
              </Text>
              <Text className="text-xs" style={{ color: "#6b7280" }}>
                {spot.distance} · {spot.rating}⭐
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
