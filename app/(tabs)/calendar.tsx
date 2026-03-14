import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, X, Bell, Trash2, Calendar, ChevronDown } from "lucide-react-native";

// ─── Types ───────────────────────────────────────────────────

interface SpecialDate {
  id: string;
  title: string;
  category: string;
  date: string; // yyyy-mm-dd
  note: string;
  isRecurring: boolean;
  remindDaysBefore: number;
}

// ─── Mock Data ───────────────────────────────────────────────

const initialDates: SpecialDate[] = [
  {
    id: "sd1",
    title: "Sinh nhat Thai Hoc",
    category: "birthday",
    date: "2026-03-17",
    note: "Chuan bi qua va banh kem dau tay",
    isRecurring: true,
    remindDaysBefore: 7,
  },
  {
    id: "sd2",
    title: "Ky niem 1 nam yeu nhau",
    category: "anniversary",
    date: "2026-03-21",
    note: "Dat nha hang va mua hoa",
    isRecurring: true,
    remindDaysBefore: 5,
  },
  {
    id: "sd3",
    title: "Valentine trang",
    category: "holiday",
    date: "2026-03-14",
    note: "Tang keo va thiep tu lam",
    isRecurring: true,
    remindDaysBefore: 3,
  },
  {
    id: "sd4",
    title: "Ngay tot nghiep",
    category: "other",
    date: "2026-06-15",
    note: "Chup anh cung tai truong",
    isRecurring: false,
    remindDaysBefore: 14,
  },
];

const CATEGORY_OPTIONS = [
  { id: "birthday", label: "Sinh nhat", emoji: "🎂" },
  { id: "anniversary", label: "Ky niem", emoji: "💕" },
  { id: "holiday", label: "Ngay le", emoji: "🎉" },
  { id: "other", label: "Khac", emoji: "📌" },
];

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

function formatDateVN(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
}

function getCategoryInfo(catId: string) {
  return CATEGORY_OPTIONS.find((c) => c.id === catId) || CATEGORY_OPTIONS[3];
}

// ─── Component ───────────────────────────────────────────────

export default function CalendarScreen() {
  const [dates, setDates] = useState<SpecialDate[]>(initialDates);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const deleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("birthday");
  const [formDate, setFormDate] = useState("");
  const [formNote, setFormNote] = useState("");
  const [formRecurring, setFormRecurring] = useState(true);
  const [formRemindDays, setFormRemindDays] = useState("7");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // Sort dates by countdown
  const sortedDates = [...dates].sort(
    (a, b) => getDaysUntil(a.date) - getDaysUntil(b.date)
  );

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("birthday");
    setFormDate("");
    setFormNote("");
    setFormRecurring(true);
    setFormRemindDays("7");
    setShowCategoryPicker(false);
  };

  const handleAdd = () => {
    if (!formTitle.trim()) return;
    // Parse dd/mm/yyyy to yyyy-mm-dd
    let isoDate = formDate;
    const parts = formDate.split("/");
    if (parts.length === 3) {
      isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    const newDate: SpecialDate = {
      id: `sd-${Date.now()}`,
      title: formTitle.trim(),
      category: formCategory,
      date: isoDate || new Date().toISOString().split("T")[0],
      note: formNote.trim(),
      isRecurring: formRecurring,
      remindDaysBefore: parseInt(formRemindDays) || 7,
    };
    setDates((prev) => [...prev, newDate]);
    resetForm();
    setShowForm(false);
  };

  const handleDeleteTap = (id: string) => {
    if (deleteConfirm === id) {
      // Second tap -> delete
      setDates((prev) => prev.filter((d) => d.id !== id));
      setDeleteConfirm(null);
      if (deleteTimer.current) clearTimeout(deleteTimer.current);
    } else {
      // First tap -> confirm state
      setDeleteConfirm(id);
      if (deleteTimer.current) clearTimeout(deleteTimer.current);
      deleteTimer.current = setTimeout(() => {
        setDeleteConfirm(null);
      }, 3000);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fdf2f8" }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <View>
            <Text
              className="text-2xl font-extrabold"
              style={{ color: "#1e1b2e" }}
            >
              Ngay dac biet
            </Text>
            <Text className="text-sm mt-1" style={{ color: "#6b7280" }}>
              {dates.length} su kien
            </Text>
          </View>
          <Pressable
            className="items-center justify-center active:opacity-80"
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#f43f5e",
              shadowColor: "#f43f5e",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
            onPress={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? (
              <X size={24} color="#ffffff" />
            ) : (
              <Plus size={24} color="#ffffff" />
            )}
          </Pressable>
        </View>

        {/* ── Add Form ── */}
        {showForm && (
          <View className="mx-4 mt-3">
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              {/* Handle bar */}
              <View className="items-center pt-3 pb-1">
                <View
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "#e5e7eb",
                  }}
                />
              </View>

              <View className="px-5 pb-5 pt-2">
                {/* Ten su kien */}
                <Text
                  className="text-[10px] font-bold uppercase mb-2"
                  style={{ color: "#fb7185", letterSpacing: 1.5 }}
                >
                  Ten su kien *
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
                  placeholder="VD: Sinh nhat Thai Hoc"
                  placeholderTextColor="#9ca3af"
                  value={formTitle}
                  onChangeText={setFormTitle}
                />

                {/* Danh muc */}
                <Text
                  className="text-[10px] font-bold uppercase mb-2"
                  style={{ color: "#fb7185", letterSpacing: 1.5 }}
                >
                  Danh muc
                </Text>
                <Pressable
                  className="flex-row items-center justify-between px-4 py-3 mb-1 active:opacity-80"
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                  }}
                  onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                >
                  <Text style={{ color: "#1e1b2e" }}>
                    {getCategoryInfo(formCategory).emoji}{" "}
                    {getCategoryInfo(formCategory).label}
                  </Text>
                  <ChevronDown size={18} color="#9ca3af" />
                </Pressable>
                {showCategoryPicker && (
                  <View
                    className="mb-3"
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: 14,
                      overflow: "hidden",
                    }}
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <Pressable
                        key={opt.id}
                        className="flex-row items-center px-4 py-3 active:opacity-80"
                        style={{
                          backgroundColor:
                            formCategory === opt.id ? "#fff1f2" : "transparent",
                        }}
                        onPress={() => {
                          setFormCategory(opt.id);
                          setShowCategoryPicker(false);
                        }}
                      >
                        <Text className="mr-2">{opt.emoji}</Text>
                        <Text
                          className="font-semibold"
                          style={{
                            color:
                              formCategory === opt.id ? "#f43f5e" : "#1e1b2e",
                          }}
                        >
                          {opt.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
                {!showCategoryPicker && <View className="mb-3" />}

                {/* Ngay */}
                <Text
                  className="text-[10px] font-bold uppercase mb-2"
                  style={{ color: "#fb7185", letterSpacing: 1.5 }}
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
                  value={formDate}
                  onChangeText={setFormDate}
                  keyboardType="numbers-and-punctuation"
                />

                {/* Ghi chu */}
                <Text
                  className="text-[10px] font-bold uppercase mb-2"
                  style={{ color: "#fb7185", letterSpacing: 1.5 }}
                >
                  Ghi chu
                </Text>
                <TextInput
                  className="px-4 py-3 text-base mb-4"
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    color: "#1e1b2e",
                    minHeight: 70,
                    textAlignVertical: "top",
                  }}
                  placeholder="Ghi chu them..."
                  placeholderTextColor="#9ca3af"
                  value={formNote}
                  onChangeText={setFormNote}
                  multiline
                  numberOfLines={3}
                />

                {/* Lap lai hang nam */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text
                    className="text-[10px] font-bold uppercase"
                    style={{ color: "#fb7185", letterSpacing: 1.5 }}
                  >
                    Lap lai hang nam
                  </Text>
                  <Switch
                    value={formRecurring}
                    onValueChange={setFormRecurring}
                    trackColor={{ false: "#e5e7eb", true: "#fda4af" }}
                    thumbColor={formRecurring ? "#f43f5e" : "#f4f3f4"}
                  />
                </View>

                {/* Nhac truoc N ngay */}
                <Text
                  className="text-[10px] font-bold uppercase mb-2"
                  style={{ color: "#fb7185", letterSpacing: 1.5 }}
                >
                  Nhac truoc (ngay)
                </Text>
                <TextInput
                  className="px-4 py-3 text-base mb-5"
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    color: "#1e1b2e",
                    width: 100,
                  }}
                  value={formRemindDays}
                  onChangeText={setFormRemindDays}
                  keyboardType="number-pad"
                />

                {/* Submit */}
                <Pressable
                  className="items-center py-4 active:opacity-80"
                  style={{
                    backgroundColor: formTitle.trim() ? "#f43f5e" : "#fda4af",
                    borderRadius: 14,
                  }}
                  disabled={!formTitle.trim()}
                  onPress={handleAdd}
                >
                  <Text className="text-white text-base font-bold">
                    Luu su kien
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {/* ── Date Cards ── */}
        {sortedDates.length === 0 ? (
          /* Empty State */
          <View className="items-center justify-center px-6 mt-20">
            <Calendar size={64} color="#d1d5db" />
            <Text
              className="text-lg font-bold mt-4 mb-2"
              style={{ color: "#6b7280" }}
            >
              Chua co ngay dac biet
            </Text>
            <Text
              className="text-center text-sm"
              style={{ color: "#9ca3af" }}
            >
              Them sinh nhat, ky niem cua em!
            </Text>
          </View>
        ) : (
          <View className="px-4 mt-5">
            {sortedDates.map((item) => {
              const days = getDaysUntil(item.date);
              const urgencyColor = getUrgencyColor(days);
              const isUrgent = days >= 0 && days <= 7;
              const catInfo = getCategoryInfo(item.category);

              return (
                <View
                  key={item.id}
                  className="flex-row items-center p-4 mb-3"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 20,
                    borderWidth: isUrgent ? 1.5 : 0,
                    borderColor: isUrgent ? "#f43f5e" : "transparent",
                    shadowColor: isUrgent ? "#f43f5e" : "#000",
                    shadowOffset: {
                      width: 0,
                      height: isUrgent ? 4 : 1,
                    },
                    shadowOpacity: isUrgent ? 0.12 : 0.04,
                    shadowRadius: isUrgent ? 12 : 4,
                    elevation: isUrgent ? 8 : 2,
                  }}
                >
                  {/* Countdown Circle */}
                  <View
                    className="items-center justify-center mr-4"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      borderWidth: 3,
                      borderColor: urgencyColor,
                      backgroundColor: `${urgencyColor}10`,
                    }}
                  >
                    <Text
                      className="text-lg font-extrabold"
                      style={{ color: urgencyColor, lineHeight: 22 }}
                    >
                      {days < 0 ? Math.abs(days) : days}
                    </Text>
                    <Text
                      className="text-[8px] font-bold uppercase"
                      style={{ color: urgencyColor }}
                    >
                      {days < 0 ? "QUA" : "NGAY"}
                    </Text>
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <Text
                      className="text-base font-extrabold mb-1"
                      style={{ color: "#1e1b2e" }}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <View className="flex-row items-center mb-1">
                      {/* Category badge */}
                      <View
                        className="px-2 py-0.5 mr-2"
                        style={{
                          backgroundColor: "#f3f4f6",
                          borderRadius: 8,
                        }}
                      >
                        <Text className="text-[10px] font-semibold" style={{ color: "#6b7280" }}>
                          {catInfo.emoji} {catInfo.label}
                        </Text>
                      </View>
                      {item.isRecurring && (
                        <View
                          className="px-2 py-0.5"
                          style={{
                            backgroundColor: "#ede9fe",
                            borderRadius: 8,
                          }}
                        >
                          <Text
                            className="text-[10px] font-semibold"
                            style={{ color: "#8b5cf6" }}
                          >
                            🔁 Hang nam
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      className="text-xs"
                      style={{ color: "#9ca3af" }}
                    >
                      {formatDateVN(item.date)}
                    </Text>
                    {item.note ? (
                      <Text
                        className="text-xs mt-1"
                        style={{ color: "#6b7280" }}
                        numberOfLines={2}
                      >
                        {item.note}
                      </Text>
                    ) : null}
                  </View>

                  {/* Action Buttons */}
                  <View className="items-center ml-2" style={{ gap: 8 }}>
                    <Pressable
                      className="p-2 active:opacity-80"
                      style={{
                        backgroundColor: "#eff6ff",
                        borderRadius: 10,
                      }}
                    >
                      <Bell size={16} color="#3b82f6" />
                    </Pressable>
                    <Pressable
                      className="p-2 active:opacity-80"
                      style={{
                        backgroundColor:
                          deleteConfirm === item.id ? "#fef2f2" : "#f9fafb",
                        borderRadius: 10,
                      }}
                      onPress={() => handleDeleteTap(item.id)}
                    >
                      <Trash2
                        size={16}
                        color={
                          deleteConfirm === item.id ? "#ef4444" : "#9ca3af"
                        }
                      />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
