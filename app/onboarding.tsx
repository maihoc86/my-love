// ============================================================
// Onboarding Screen - AI Love
// 5-step flow: Welcome → Name → Birthday → Anniversary → Avatar
// Based on stitch/onboarding_*/code.html prototypes
// ============================================================

import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  Animated,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Heart,
  User,
  Cake,
  CalendarHeart,
  Camera,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ImagePlus,
  Image as ImageIcon,
} from "lucide-react-native";

import { Colors, Spacing, Radius, FontSize, FontWeight, Shadows } from "@/theme";

// ─── Constants ───────────────────────────────────────────────

const PRIMARY = Colors.primary;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = SCREEN_HEIGHT * 0.25;
const TOTAL_STEPS = 5;

// ─── Types ───────────────────────────────────────────────────

interface OnboardingData {
  partnerName: string;
  partnerNickname: string;
  birthdayDay: string;
  birthdayMonth: string;
  birthdayYear: string;
  skipBirthday: boolean;
  anniversaryDay: string;
  anniversaryMonth: string;
  anniversaryYear: string;
  skipAnniversary: boolean;
  avatarUri: string | null;
}

// ─── Zodiac Helper ───────────────────────────────────────────

const ZODIAC_SIGNS = [
  { name: "Ma Kết", emoji: "♑", trait: "Tham vọng, kiên nhẫn, thực tế", range: "22/12 - 19/01" },
  { name: "Bảo Bình", emoji: "♒", trait: "Sáng tạo, độc lập, nhân ái", range: "20/01 - 18/02" },
  { name: "Song Ngư", emoji: "♓", trait: "Lãng mạn, nhạy cảm, giàu trí tưởng tượng", range: "19/02 - 20/03" },
  { name: "Bạch Dương", emoji: "♈", trait: "Năng động, dũng cảm, tự tin", range: "21/03 - 19/04" },
  { name: "Kim Ngưu", emoji: "♉", trait: "Đáng tin cậy, kiên trì, thực tế", range: "20/04 - 20/05" },
  { name: "Song Tử", emoji: "♊", trait: "Hoạt bát, thông minh, linh hoạt", range: "21/05 - 20/06" },
  { name: "Cự Giải", emoji: "♋", trait: "Chu đáo, trung thành, giàu cảm xúc", range: "21/06 - 22/07" },
  { name: "Sư Tử", emoji: "♌", trait: "Tự tin, nhiệt huyết, trung thành", range: "23/07 - 22/08" },
  { name: "Xử Nữ", emoji: "♍", trait: "Tỉ mỉ, chu đáo, thông minh", range: "23/08 - 22/09" },
  { name: "Thiên Bình", emoji: "♎", trait: "Hài hòa, công bằng, lãng mạn", range: "23/09 - 22/10" },
  { name: "Bọ Cạp", emoji: "♏", trait: "Đam mê, quyết đoán, bí ẩn", range: "23/10 - 21/11" },
  { name: "Nhân Mã", emoji: "♐", trait: "Lạc quan, phiêu lưu, trung thực", range: "22/11 - 21/12" },
];

function getZodiac(day: number, month: number) {
  const dates = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
  const idx = day > dates[month - 1] ? month % 12 : (month + 11) % 12;
  return ZODIAC_SIGNS[idx];
}

function calcDaysTogether(day: number, month: number, year: number): { days: number; years: number; months: number; remainDays: number } {
  const start = new Date(year, month - 1, day);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const remainDays = days - years * 365 - months * 30;
  return { days, years, months, remainDays };
}

// ─── Progress Dots ───────────────────────────────────────────

const ProgressDots = React.memo(({ current, total }: { current: number; total: number }) => (
  <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginTop: Spacing.lg }}>
    {Array.from({ length: total }, (_, i) => (
      <View
        key={i}
        style={{
          width: i === current ? 24 : 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: i <= current ? PRIMARY : "#e2e8f0",
        }}
      />
    ))}
  </View>
));

// ─── Gradient Header ─────────────────────────────────────────

const OnboardingHeader = React.memo(({
  icon,
  title,
  showBack,
  onBack,
}: {
  icon: React.ReactNode;
  title: string;
  showBack: boolean;
  onBack: () => void;
}) => (
  <View
    style={{
      height: HEADER_HEIGHT,
      backgroundColor: PRIMARY,
      overflow: "hidden",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 20,
    }}
  >
    {/* Decorative circles */}
    <View style={{ position: "absolute", top: -40, right: -40, width: 128, height: 128, borderRadius: 64, backgroundColor: "rgba(255,255,255,0.1)" }} />
    <View style={{ position: "absolute", top: 60, left: -20, width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.07)" }} />
    <View style={{ position: "absolute", bottom: 40, right: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: "rgba(255,255,255,0.05)" }} />

    {/* Back button */}
    {showBack && (
      <Pressable
        onPress={onBack}
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? 54 : 20,
          left: 20,
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: "rgba(255,255,255,0.2)",
          alignItems: "center",
          justifyContent: "center",
        }}
        hitSlop={8}
        accessibilityLabel="Quay lại"
        accessibilityRole="button"
      >
        <ChevronLeft size={20} color="#fff" />
      </Pressable>
    )}

    {/* Icon */}
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      }}
    >
      {icon}
    </View>
    <Text style={{ color: "#fff", fontSize: FontSize["2xl"], fontWeight: FontWeight.bold }}>
      {title}
    </Text>
  </View>
));

// ─── Step 1: Welcome ─────────────────────────────────────────

const StepWelcome = React.memo(({ onNext }: { onNext: () => void }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Hero */}
      <View
        style={{
          height: SCREEN_HEIGHT * 0.52,
          backgroundColor: PRIMARY,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: "rgba(255,255,255,0.1)" }} />
        <View style={{ position: "absolute", top: 120, left: -30, width: 96, height: 96, borderRadius: 48, backgroundColor: "rgba(255,255,255,0.05)" }} />
        <View style={{ position: "absolute", bottom: 60, right: 30, width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.08)" }} />

        {/* Floating hearts */}
        <Text style={{ position: "absolute", top: 80, left: 50, fontSize: 20, opacity: 0.2 }}>♥</Text>
        <Text style={{ position: "absolute", top: 140, right: 60, fontSize: 16, opacity: 0.15 }}>♥</Text>
        <Text style={{ position: "absolute", bottom: 80, left: 70, fontSize: 18, opacity: 0.1 }}>♥</Text>

        <Animated.View style={{ alignItems: "center", transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 26,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Heart size={48} color="#fff" fill="#fff" />
          </View>
          <Text style={{ fontSize: FontSize["4xl"], fontWeight: FontWeight.extrabold, letterSpacing: -0.5 }}>
            <Text style={{ color: "#FFD54F" }}>AI</Text>
            <Text style={{ color: "#fff" }}> Love</Text>
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: FontSize.md, marginTop: 4 }}>
            Yêu thương thông minh hơn mỗi ngày
          </Text>
        </Animated.View>
      </View>

      {/* Card */}
      <View
        style={{
          flex: 1,
          marginTop: -24,
          backgroundColor: "#fff",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingHorizontal: 24,
          paddingTop: 28,
          paddingBottom: 24,
          ...Shadows.lg,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: FontSize["2xl"], fontWeight: FontWeight.bold, color: "#0f172a" }}>
            Chào mừng bạn! 💕
          </Text>
          <Text style={{ fontSize: FontSize.md, color: "#64748b", marginTop: 8, textAlign: "center", lineHeight: 22 }}>
            AI Love giúp bạn ghi nhận và trân trọng mọi khoảnh khắc bên người bạn yêu thương
          </Text>
        </View>

        {/* Feature pills */}
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.primaryAlpha08, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
            <Text style={{ fontSize: 14 }}>📝</Text>
            <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: PRIMARY }}>Ghi chú</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.aiPurpleAlpha10, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
            <Text style={{ fontSize: 14 }}>💬</Text>
            <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.aiPurple }}>AI Chat</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: Colors.accentAlpha08, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
            <Text style={{ fontSize: 14 }}>📅</Text>
            <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.accentDark }}>Lịch kỷ niệm</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* CTA */}
        <Pressable
          onPress={onNext}
          style={{
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            backgroundColor: PRIMARY,
            ...Shadows.fab,
          }}
          accessibilityLabel="Bắt đầu thiết lập"
          accessibilityRole="button"
        >
          <Text style={{ fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: "#fff" }}>
            Bắt đầu thiết lập
          </Text>
        </Pressable>
        <Text style={{ fontSize: FontSize.xs, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>
          Chỉ mất 2 phút để hoàn tất
        </Text>

        <ProgressDots current={0} total={TOTAL_STEPS} />
      </View>
    </View>
  );
});

// ─── Step 2: Partner Name ────────────────────────────────────

function StepPartnerName({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  onUpdate: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = data.partnerName.trim().length > 0;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OnboardingHeader
          icon={<User size={28} color="#fff" />}
          title="Người ấy là ai?"
          showBack
          onBack={onBack}
        />

        <View
          style={{
            flex: 1,
            marginTop: -20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 32,
            ...Shadows.lg,
          }}
        >
          <Text style={{ fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: "#0f172a", marginBottom: 4 }}>
            Thông tin người yêu
          </Text>
          <Text style={{ fontSize: FontSize.sm, color: "#64748b", marginBottom: 24 }}>
            Cho mình biết tên người yêu của bạn nhé
          </Text>

          {/* Partner Name */}
          <Text style={{ fontSize: 13, fontWeight: FontWeight.semibold, color: "#475569", marginBottom: 8 }}>
            Tên người yêu <Text style={{ color: PRIMARY }}>*</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f8fafc",
              borderWidth: 1.5,
              borderColor: data.partnerName ? PRIMARY : "#e2e8f0",
              borderRadius: 14,
              paddingHorizontal: 12,
              gap: 8,
              marginBottom: 20,
            }}
          >
            <User size={17} color="#94a3b8" />
            <TextInput
              style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: "#1e293b" }}
              placeholder="Ví dụ: Thái Hoc"
              placeholderTextColor="#94a3b8"
              value={data.partnerName}
              onChangeText={(v) => onUpdate({ partnerName: v })}
              autoFocus
            />
          </View>

          {/* Nickname */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 13, fontWeight: FontWeight.semibold, color: "#475569" }}>
              Biệt danh / Tên gọi thân mật
            </Text>
            <View style={{ backgroundColor: "#f1f5f9", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
              <Text style={{ fontSize: 10, color: "#94a3b8", fontWeight: FontWeight.medium }}>Không bắt buộc</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f8fafc",
              borderWidth: 1.5,
              borderColor: data.partnerNickname ? PRIMARY : "#e2e8f0",
              borderRadius: 14,
              paddingHorizontal: 12,
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Heart size={17} color="#94a3b8" fill="#94a3b8" />
            <TextInput
              style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: "#1e293b" }}
              placeholder="Ví dụ: Bé Hoc, Honey..."
              placeholderTextColor="#94a3b8"
              value={data.partnerNickname}
              onChangeText={(v) => onUpdate({ partnerNickname: v })}
            />
          </View>

          {/* Hint */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 32 }}>
            <Lightbulb size={14} color="#cbd5e1" />
            <Text style={{ fontSize: FontSize.xs, color: "#94a3b8" }}>
              Biệt danh sẽ hiển thị trên trang chủ
            </Text>
          </View>

          <View style={{ flex: 1, minHeight: 20 }} />

          {/* CTA */}
          <Pressable
            onPress={onNext}
            disabled={!canContinue}
            style={{
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              backgroundColor: canContinue ? PRIMARY : '#FF6B8A',
              ...Shadows.fab,
              shadowOpacity: canContinue ? 0.28 : 0,
            }}
            accessibilityLabel="Tiếp tục"
            accessibilityRole="button"
          >
            <Text style={{ fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: "#fff" }}>
              Tiếp tục
            </Text>
          </Pressable>

          <ProgressDots current={1} total={TOTAL_STEPS} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Step 3: Birthday ────────────────────────────────────────

function StepBirthday({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  onUpdate: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const day = parseInt(data.birthdayDay) || 0;
  const month = parseInt(data.birthdayMonth) || 0;
  const zodiac = day > 0 && month > 0 ? getZodiac(day, month) : null;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <OnboardingHeader
          icon={<Cake size={28} color="#fff" />}
          title="Sinh nhật người ấy"
          showBack
          onBack={onBack}
        />

        <View
          style={{
            flex: 1,
            marginTop: -20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 32,
            ...Shadows.lg,
          }}
        >
          <Text style={{ fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: "#0f172a", marginBottom: 4 }}>
            Ngày sinh
          </Text>
          <Text style={{ fontSize: FontSize.sm, color: "#64748b", marginBottom: 24 }}>
            Để mình nhắc bạn chuẩn bị quà nhé 🎁
          </Text>

          {!data.skipBirthday && (
            <>
              {/* Date inputs */}
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: "#94a3b8", marginBottom: 6, marginLeft: 2 }}>
                    Ngày
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "#f8fafc",
                      borderWidth: 1.5,
                      borderColor: "#e2e8f0",
                      borderRadius: 14,
                      paddingVertical: 14,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: FontWeight.semibold,
                      color: "#1e293b",
                    }}
                    placeholder="DD"
                    placeholderTextColor="#94a3b8"
                    value={data.birthdayDay}
                    onChangeText={(v) => onUpdate({ birthdayDay: v.replace(/[^0-9]/g, "").slice(0, 2) })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: "#94a3b8", marginBottom: 6, marginLeft: 2 }}>
                    Tháng
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "#f8fafc",
                      borderWidth: 1.5,
                      borderColor: "#e2e8f0",
                      borderRadius: 14,
                      paddingVertical: 14,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: FontWeight.semibold,
                      color: "#1e293b",
                    }}
                    placeholder="MM"
                    placeholderTextColor="#94a3b8"
                    value={data.birthdayMonth}
                    onChangeText={(v) => onUpdate({ birthdayMonth: v.replace(/[^0-9]/g, "").slice(0, 2) })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: "#94a3b8", marginBottom: 6, marginLeft: 2 }}>
                    Năm
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "#f8fafc",
                      borderWidth: 1.5,
                      borderColor: "#e2e8f0",
                      borderRadius: 14,
                      paddingVertical: 14,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: FontWeight.semibold,
                      color: "#1e293b",
                    }}
                    placeholder="YYYY"
                    placeholderTextColor="#94a3b8"
                    value={data.birthdayYear}
                    onChangeText={(v) => onUpdate({ birthdayYear: v.replace(/[^0-9]/g, "").slice(0, 4) })}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>
              </View>

              {/* Zodiac */}
              {zodiac && (
                <View
                  style={{
                    backgroundColor: "rgba(255,45,85,0.06)",
                    borderWidth: 1,
                    borderColor: "rgba(255,45,85,0.12)",
                    borderRadius: 16,
                    padding: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <Text style={{ fontSize: 32 }}>{zodiac.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: "#1e293b" }}>
                      {zodiac.name}
                    </Text>
                    <Text style={{ fontSize: FontSize.xs, color: "#64748b", marginTop: 2 }}>
                      {zodiac.trait}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}

          {/* Skip checkbox */}
          <Pressable
            onPress={() => onUpdate({ skipBirthday: !data.skipBirthday })}
            style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 32 }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: data.skipBirthday }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: data.skipBirthday ? PRIMARY : "#cbd5e1",
                backgroundColor: data.skipBirthday ? PRIMARY : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {data.skipBirthday && (
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700", marginTop: -1 }}>✓</Text>
              )}
            </View>
            <Text style={{ fontSize: FontSize.sm, color: "#64748b" }}>
              Không biết ngày sinh chính xác
            </Text>
          </Pressable>

          {data.skipBirthday && (
            <View style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 14, marginBottom: 20 }}>
              <Text style={{ fontSize: FontSize.xs, color: "#94a3b8", textAlign: "center" }}>
                Bạn có thể cập nhật sau trong Cài đặt → Thông tin người yêu
              </Text>
            </View>
          )}

          <View style={{ flex: 1, minHeight: 20 }} />

          {/* CTA */}
          <Pressable
            onPress={onNext}
            style={{
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              backgroundColor: PRIMARY,
              ...Shadows.fab,
            }}
            accessibilityLabel="Tiếp tục"
            accessibilityRole="button"
          >
            <Text style={{ fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: "#fff" }}>
              Tiếp tục
            </Text>
          </Pressable>
          <Pressable onPress={onNext} style={{ paddingVertical: 10, alignItems: "center" }}>
            <Text style={{ fontSize: FontSize.sm, color: "#94a3b8" }}>Bỏ qua</Text>
          </Pressable>

          <ProgressDots current={2} total={TOTAL_STEPS} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Step 4: Anniversary ─────────────────────────────────────

function StepAnniversary({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  onUpdate: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const day = parseInt(data.anniversaryDay) || 0;
  const month = parseInt(data.anniversaryMonth) || 0;
  const year = parseInt(data.anniversaryYear) || 0;
  const hasDate = day > 0 && month > 0 && year > 0;
  const counter = hasDate ? calcDaysTogether(day, month, year) : null;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <OnboardingHeader
          icon={<CalendarHeart size={28} color="#fff" />}
          title="Ngày đặc biệt 💝"
          showBack
          onBack={onBack}
        />

        <View
          style={{
            flex: 1,
            marginTop: -20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 32,
            ...Shadows.lg,
          }}
        >
          <Text style={{ fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: "#0f172a", marginBottom: 4 }}>
            Ngày yêu nhau
          </Text>
          <Text style={{ fontSize: FontSize.sm, color: "#64748b", marginBottom: 24 }}>
            Ngày hai bạn chính thức bên nhau
          </Text>

          {!data.skipAnniversary && (
            <>
              {/* Date inputs */}
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: "#94a3b8", marginBottom: 6, marginLeft: 2 }}>
                    Ngày
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "#f8fafc",
                      borderWidth: 1.5,
                      borderColor: "#e2e8f0",
                      borderRadius: 14,
                      paddingVertical: 14,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: FontWeight.semibold,
                      color: "#1e293b",
                    }}
                    placeholder="DD"
                    placeholderTextColor="#94a3b8"
                    value={data.anniversaryDay}
                    onChangeText={(v) => onUpdate({ anniversaryDay: v.replace(/[^0-9]/g, "").slice(0, 2) })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: "#94a3b8", marginBottom: 6, marginLeft: 2 }}>
                    Tháng
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "#f8fafc",
                      borderWidth: 1.5,
                      borderColor: "#e2e8f0",
                      borderRadius: 14,
                      paddingVertical: 14,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: FontWeight.semibold,
                      color: "#1e293b",
                    }}
                    placeholder="MM"
                    placeholderTextColor="#94a3b8"
                    value={data.anniversaryMonth}
                    onChangeText={(v) => onUpdate({ anniversaryMonth: v.replace(/[^0-9]/g, "").slice(0, 2) })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: "#94a3b8", marginBottom: 6, marginLeft: 2 }}>
                    Năm
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "#f8fafc",
                      borderWidth: 1.5,
                      borderColor: "#e2e8f0",
                      borderRadius: 14,
                      paddingVertical: 14,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: FontWeight.semibold,
                      color: "#1e293b",
                    }}
                    placeholder="YYYY"
                    placeholderTextColor="#94a3b8"
                    value={data.anniversaryYear}
                    onChangeText={(v) => onUpdate({ anniversaryYear: v.replace(/[^0-9]/g, "").slice(0, 4) })}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>
              </View>

              {/* Love counter preview */}
              {counter && counter.days > 0 && (
                <View
                  style={{
                    backgroundColor: "rgba(255,45,85,0.04)",
                    borderWidth: 1,
                    borderColor: "rgba(255,45,85,0.1)",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 28, fontWeight: FontWeight.extrabold, color: PRIMARY }}>
                    {counter.days.toLocaleString()} ngày
                  </Text>
                  <Text style={{ fontSize: FontSize.sm, color: "#64748b", marginTop: 4 }}>
                    bên nhau 💕
                  </Text>
                  <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                    <View style={{ backgroundColor: "rgba(255,255,255,0.8)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                      <Text style={{ fontSize: FontSize.xs, color: "#94a3b8" }}>{counter.years} năm</Text>
                    </View>
                    <View style={{ backgroundColor: "rgba(255,255,255,0.8)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                      <Text style={{ fontSize: FontSize.xs, color: "#94a3b8" }}>{counter.months} tháng</Text>
                    </View>
                    <View style={{ backgroundColor: "rgba(255,255,255,0.8)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                      <Text style={{ fontSize: FontSize.xs, color: "#94a3b8" }}>{counter.remainDays} ngày</Text>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}

          {/* Skip checkbox */}
          <Pressable
            onPress={() => onUpdate({ skipAnniversary: !data.skipAnniversary })}
            style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 32 }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: data.skipAnniversary }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: data.skipAnniversary ? PRIMARY : "#cbd5e1",
                backgroundColor: data.skipAnniversary ? PRIMARY : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {data.skipAnniversary && (
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700", marginTop: -1 }}>✓</Text>
              )}
            </View>
            <Text style={{ fontSize: FontSize.sm, color: "#64748b" }}>
              Chưa nhớ ngày chính xác
            </Text>
          </Pressable>

          <View style={{ flex: 1, minHeight: 20 }} />

          {/* CTA */}
          <Pressable
            onPress={onNext}
            style={{
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              backgroundColor: PRIMARY,
              ...Shadows.fab,
            }}
            accessibilityLabel="Tiếp tục"
            accessibilityRole="button"
          >
            <Text style={{ fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: "#fff" }}>
              Tiếp tục
            </Text>
          </Pressable>
          <Pressable onPress={onNext} style={{ paddingVertical: 10, alignItems: "center" }}>
            <Text style={{ fontSize: FontSize.sm, color: "#94a3b8" }}>Bỏ qua</Text>
          </Pressable>

          <ProgressDots current={3} total={TOTAL_STEPS} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Step 5: Avatar ──────────────────────────────────────────

function StepAvatar({
  data,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  onNext: () => void;
  onBack: () => void;
}) {
  const handlePickCamera = useCallback(() => {
    // TODO: expo-image-picker camera
    Alert.alert("Chụp ảnh", "Tính năng sẽ được tích hợp với expo-image-picker");
  }, []);

  const handlePickLibrary = useCallback(() => {
    // TODO: expo-image-picker gallery
    Alert.alert("Thư viện ảnh", "Tính năng sẽ được tích hợp với expo-image-picker");
  }, []);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
      <OnboardingHeader
        icon={<Camera size={28} color="#fff" />}
        title="Thêm ảnh người ấy"
        showBack
        onBack={onBack}
      />

      <View
        style={{
          flex: 1,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          paddingHorizontal: 24,
          paddingTop: 28,
          paddingBottom: 32,
          ...Shadows.lg,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: "#0f172a" }}>
            Ảnh đại diện
          </Text>
          <Text style={{ fontSize: FontSize.sm, color: "#64748b", marginTop: 4 }}>
            Để trang chủ thêm sinh động nhé 📸
          </Text>
        </View>

        {/* Avatar circle */}
        <View style={{ alignItems: "center", marginTop: 28 }}>
          {/* Sparkles */}
          <View style={{ position: "relative" }}>
            <Text style={{ position: "absolute", top: -8, right: -8, fontSize: 16, zIndex: 1 }}>✨</Text>
            <Text style={{ position: "absolute", bottom: 4, left: -12, fontSize: 14, zIndex: 1 }}>💕</Text>

            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                borderWidth: 3,
                borderStyle: "dashed",
                borderColor: "rgba(255,45,85,0.3)",
                backgroundColor: "rgba(255,45,85,0.04)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImagePlus size={44} color="rgba(255,45,85,0.4)" />
            </View>

            {/* Camera overlay */}
            <Pressable
              onPress={handlePickCamera}
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: PRIMARY,
                alignItems: "center",
                justifyContent: "center",
                ...Shadows.md,
              }}
              accessibilityLabel="Chụp ảnh"
              accessibilityRole="button"
            >
              <Camera size={18} color="#fff" />
            </Pressable>
          </View>

          {/* Partner name */}
          <Text style={{ fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: "#0f172a", marginTop: 16 }}>
            {data.partnerName || "Người ấy"}
          </Text>
          {data.partnerNickname ? (
            <Text style={{ fontSize: FontSize.sm, color: "#94a3b8", marginTop: 2 }}>
              {data.partnerNickname} 💕
            </Text>
          ) : null}
        </View>

        {/* Upload buttons */}
        <View style={{ flexDirection: "row", gap: 12, marginTop: 32 }}>
          <Pressable
            onPress={handlePickCamera}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 14,
              backgroundColor: "#f8fafc",
              borderWidth: 1.5,
              borderColor: "#e2e8f0",
              borderRadius: 14,
            }}
            accessibilityLabel="Chụp ảnh"
            accessibilityRole="button"
          >
            <Camera size={18} color="#64748b" />
            <Text style={{ fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: "#334155" }}>
              Chụp ảnh
            </Text>
          </Pressable>
          <Pressable
            onPress={handlePickLibrary}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 14,
              backgroundColor: "#f8fafc",
              borderWidth: 1.5,
              borderColor: "#e2e8f0",
              borderRadius: 14,
            }}
            accessibilityLabel="Chọn từ thư viện"
            accessibilityRole="button"
          >
            <ImageIcon size={18} color="#64748b" />
            <Text style={{ fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: "#334155" }}>
              Thư viện
            </Text>
          </Pressable>
        </View>

        <View style={{ flex: 1, minHeight: 40 }} />

        {/* CTA */}
        <Pressable
          onPress={onNext}
          style={{
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            backgroundColor: PRIMARY,
            ...Shadows.fab,
          }}
          accessibilityLabel="Hoàn tất"
          accessibilityRole="button"
        >
          <Text style={{ fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: "#fff" }}>
            Hoàn tất 🎉
          </Text>
        </Pressable>
        <Pressable onPress={onNext} style={{ paddingVertical: 10, alignItems: "center" }}>
          <Text style={{ fontSize: FontSize.sm, color: "#94a3b8" }}>Bỏ qua, để sau</Text>
        </Pressable>

        <ProgressDots current={4} total={TOTAL_STEPS} />
      </View>
    </ScrollView>
  );
}

// ─── Main Onboarding Screen ─────────────────────────────────

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    partnerName: "",
    partnerNickname: "",
    birthdayDay: "",
    birthdayMonth: "",
    birthdayYear: "",
    skipBirthday: false,
    anniversaryDay: "",
    anniversaryMonth: "",
    anniversaryYear: "",
    skipAnniversary: false,
    avatarUri: null,
  });

  const handleUpdate = useCallback((patch: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      // Onboarding complete — save data & navigate to main app
      // TODO: Save to AsyncStorage/Supabase
      console.log("[Onboarding] Complete:", data);
      router.replace("/(tabs)");
    }
  }, [step, data, router]);

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }, [step]);

  return (
    <View style={{ flex: 1, backgroundColor: step === 0 ? PRIMARY : "#fff" }}>
      <StatusBar barStyle="light-content" />
      {step === 0 && <StepWelcome onNext={handleNext} />}
      {step === 1 && <StepPartnerName data={data} onUpdate={handleUpdate} onNext={handleNext} onBack={handleBack} />}
      {step === 2 && <StepBirthday data={data} onUpdate={handleUpdate} onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <StepAnniversary data={data} onUpdate={handleUpdate} onNext={handleNext} onBack={handleBack} />}
      {step === 4 && <StepAvatar data={data} onNext={handleNext} onBack={handleBack} />}
    </View>
  );
}
