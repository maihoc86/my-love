import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown, ChevronUp } from "lucide-react-native";

// ─── Categories ──────────────────────────────────────────────

const CATEGORIES = [
  { id: "food_like", emoji: "🍜", label: "Thich an", placeholder: "🍜 Thai Hoc thich..." },
  { id: "food_dislike", emoji: "🚫", label: "Khong thich an", placeholder: "🚫 Thai Hoc khong thich..." },
  { id: "hobby", emoji: "🎮", label: "So thich", placeholder: "🎮 Thai Hoc thich choi..." },
  { id: "fashion", emoji: "👗", label: "Thoi trang", placeholder: "👗 Thai Hoc thich mac..." },
  { id: "music", emoji: "🎵", label: "Am nhac", placeholder: "🎵 Thai Hoc thich nghe..." },
  { id: "movie", emoji: "🎬", label: "Phim", placeholder: "🎬 Thai Hoc thich xem..." },
  { id: "place", emoji: "📍", label: "Dia diem", placeholder: "📍 Thai Hoc thich den..." },
  { id: "gift", emoji: "🎁", label: "Qua tang", placeholder: "🎁 Thai Hoc thich nhan..." },
  { id: "habit", emoji: "💫", label: "Thoi quen", placeholder: "💫 Thai Hoc thuong..." },
  { id: "health", emoji: "💊", label: "Suc khoe", placeholder: "💊 Thai Hoc can luu y..." },
  { id: "other", emoji: "📝", label: "Khac", placeholder: "📝 Ghi chu ve Thai Hoc..." },
];

const SENTIMENTS = [
  { id: "love", emoji: "❤️", label: "YEU THICH" },
  { id: "like", emoji: "👍", label: "THICH" },
  { id: "neutral", emoji: "😐", label: "BINH THUONG" },
  { id: "dislike", emoji: "👎", label: "KHONG THICH" },
  { id: "hate", emoji: "🚫", label: "GHET" },
];

// ─── Component ───────────────────────────────────────────────

export default function AddEntryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dateText, setDateText] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory);
  const placeholder = currentCategory?.placeholder || "Nhap tieu de ghi chu...";
  const canSubmit = title.trim().length > 0;

  const handleSubmit = () => {
    const entry = {
      category: selectedCategory,
      title: title.trim(),
      detail: detail.trim(),
      sentiment: selectedSentiment,
      date: dateText || new Date().toISOString().split("T")[0],
      isRecurring,
    };
    console.log("Submit entry:", entry);

    // Reset form
    setSelectedCategory(null);
    setTitle("");
    setDetail("");
    setSelectedSentiment(null);
    setShowAdvanced(false);
    setDateText("");
    setIsRecurring(false);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fdf2f8" }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <View className="px-5 pt-4 pb-2">
            <Text
              className="text-2xl font-extrabold"
              style={{ color: "#1e1b2e" }}
            >
              Ghi chu moi
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: "#f43f5e" }}
            >
              Them mot dieu ve Thai Hoc
            </Text>
          </View>

          {/* ── Category Grid ── */}
          <View className="px-4 mt-4">
            <Text
              className="text-xs font-bold uppercase tracking-wider mb-3 px-1"
              style={{ color: "#9ca3af" }}
            >
              Danh muc
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 10 }}>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    className="items-center py-3 active:opacity-80"
                    style={{
                      width: "31%",
                      backgroundColor: isSelected ? "#fff1f2" : "#ffffff",
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: isSelected ? "#f43f5e" : "transparent",
                      shadowColor: isSelected ? "#f43f5e" : "#000",
                      shadowOffset: { width: 0, height: isSelected ? 4 : 1 },
                      shadowOpacity: isSelected ? 0.15 : 0.04,
                      shadowRadius: isSelected ? 8 : 4,
                      elevation: isSelected ? 6 : 2,
                    }}
                    onPress={() => setSelectedCategory(cat.id)}
                  >
                    <Text className="text-3xl mb-1">{cat.emoji}</Text>
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: isSelected ? "#f43f5e" : "#6b7280" }}
                      numberOfLines={1}
                    >
                      {cat.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* ── Title Input ── */}
          <View className="px-4 mt-6">
            <Text
              className="text-xs font-bold uppercase tracking-wider mb-2 px-1"
              style={{ color: "#9ca3af" }}
            >
              Tieu de *
            </Text>
            <View
              className="flex-row items-center px-4"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: title.trim() ? "#f43f5e" : "#e5e7eb",
              }}
            >
              {currentCategory && (
                <Text className="text-lg mr-2">{currentCategory.emoji}</Text>
              )}
              <TextInput
                className="flex-1 py-4 text-base"
                style={{ color: "#1e1b2e" }}
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* ── Detail Textarea ── */}
          <View className="px-4 mt-4">
            <Text
              className="text-xs font-bold uppercase tracking-wider mb-2 px-1"
              style={{ color: "#9ca3af" }}
            >
              Chi tiet
            </Text>
            <TextInput
              className="px-4 py-3 text-base"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                color: "#1e1b2e",
                minHeight: 80,
                textAlignVertical: "top",
              }}
              placeholder="Viet them chi tiet o day..."
              placeholderTextColor="#9ca3af"
              value={detail}
              onChangeText={setDetail}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* ── Sentiment Picker ── */}
          <View className="px-4 mt-6">
            <Text
              className="text-xs font-bold uppercase tracking-wider mb-3 px-1"
              style={{ color: "#9ca3af" }}
            >
              Muc do yeu thich
            </Text>
            <View className="flex-row justify-between">
              {SENTIMENTS.map((s) => {
                const isSelected = selectedSentiment === s.id;
                return (
                  <Pressable
                    key={s.id}
                    className="items-center active:opacity-80"
                    onPress={() => setSelectedSentiment(s.id)}
                  >
                    <View
                      className="items-center justify-center"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: isSelected ? "#fff1f2" : "#ffffff",
                        borderWidth: 2,
                        borderColor: isSelected ? "#f43f5e" : "#e5e7eb",
                        shadowColor: isSelected ? "#f43f5e" : "transparent",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: isSelected ? 0.2 : 0,
                        shadowRadius: 8,
                        elevation: isSelected ? 6 : 0,
                        transform: [{ scale: isSelected ? 1.1 : 1 }],
                      }}
                    >
                      <Text className="text-2xl">{s.emoji}</Text>
                    </View>
                    <Text
                      className="text-[9px] font-bold mt-1.5"
                      style={{ color: isSelected ? "#f43f5e" : "#9ca3af" }}
                    >
                      {s.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* ── Advanced Options ── */}
          <View className="px-4 mt-6">
            <Pressable
              className="flex-row items-center justify-between py-3 px-4 active:opacity-80"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 14,
              }}
              onPress={() => setShowAdvanced(!showAdvanced)}
            >
              <Text className="font-semibold" style={{ color: "#6b7280" }}>
                Tuy chon nang cao
              </Text>
              {showAdvanced ? (
                <ChevronUp size={20} color="#6b7280" />
              ) : (
                <ChevronDown size={20} color="#6b7280" />
              )}
            </Pressable>
            {showAdvanced && (
              <View
                className="mt-2 p-4"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 14,
                }}
              >
                {/* Date Input */}
                <Text
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "#9ca3af" }}
                >
                  Ngay (dd/mm/yyyy)
                </Text>
                <TextInput
                  className="px-4 py-3 text-base mb-4"
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    color: "#1e1b2e",
                  }}
                  placeholder="14/03/2026"
                  placeholderTextColor="#9ca3af"
                  value={dateText}
                  onChangeText={setDateText}
                  keyboardType="numbers-and-punctuation"
                />

                {/* Recurring Toggle */}
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: "#1e1b2e" }}
                  >
                    Lap lai hang nam
                  </Text>
                  <Switch
                    value={isRecurring}
                    onValueChange={setIsRecurring}
                    trackColor={{ false: "#e5e7eb", true: "#fda4af" }}
                    thumbColor={isRecurring ? "#f43f5e" : "#f4f3f4"}
                  />
                </View>
              </View>
            )}
          </View>

          {/* ── Submit Button ── */}
          <View className="px-4 mt-8">
            <Pressable
              className="items-center py-4 active:opacity-80"
              style={{
                backgroundColor: canSubmit ? "#f43f5e" : "#fda4af",
                borderRadius: 14,
                shadowColor: "#f43f5e",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: canSubmit ? 0.3 : 0,
                shadowRadius: 12,
                elevation: canSubmit ? 8 : 0,
              }}
              disabled={!canSubmit}
              onPress={handleSubmit}
            >
              <Text className="text-white text-base font-bold">
                Luu ghi chu
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
