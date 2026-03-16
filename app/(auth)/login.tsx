// ============================================================
// Login Screen - MyLoveThaiHoc
// OTP-first login flow with password fallback
// ============================================================

import React, { useState, useCallback, useRef, useEffect, memo } from "react";
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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Heart,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
} from "lucide-react-native";
import { Colors } from "@/theme";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HERO_HEIGHT = SCREEN_HEIGHT * 0.35;
const OTP_LENGTH = 6;

// ─── Google SVG Icon ─────────────────────────────────────────

const GoogleIcon = memo(function GoogleIcon() {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.googleBlue,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: Colors.textOnPrimary, fontSize: 11, fontWeight: "800" }}>G</Text>
    </View>
  );
});

// ─── OTP Input Component ─────────────────────────────────────

const OTPInput = memo(function OTPInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<TextInput>(null);
  // Build array of 6 digits (filled or empty)
  const digits: string[] = [];
  for (let i = 0; i < OTP_LENGTH; i++) {
    digits.push(i < value.length ? value[i] : "");
  }

  return (
    <View>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        accessibilityLabel="Nhập mã OTP"
        accessibilityRole="button"
      >
        {digits.map((digit, i) => {
          const isFocused = i === value.length && value.length < OTP_LENGTH;
          return (
            <View
              key={i}
              style={{
                width: 48,
                height: 52,
                backgroundColor: digit ? Colors.surface : Colors.surfaceSecondary,
                borderWidth: 1.5,
                borderColor: isFocused ? Colors.primary : digit ? Colors.border : Colors.surfaceSecondary,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: Colors.textPrimary,
                }}
              >
                {digit || (isFocused ? "│" : "")}
              </Text>
            </View>
          );
        })}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChange(t.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH))}
        keyboardType="number-pad"
        maxLength={OTP_LENGTH}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
        autoFocus
        caretHidden
      />
    </View>
  );
});

// ─── Auth Input ─────────────────────────────────────────────

const AuthInput = memo(function AuthInput({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightElement,
  keyboardType,
  autoCapitalize,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  rightElement?: React.ReactNode;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences";
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.surfaceSecondary,
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderRadius: 16,
        paddingHorizontal: 14,
        gap: 10,
      }}
    >
      {icon}
      <TextInput
        style={{
          flex: 1,
          paddingVertical: 14,
          fontSize: 15,
          color: Colors.textPrimary,
        }}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize={autoCapitalize ?? "sentences"}
      />
      {rightElement}
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

type LoginStep = "phone" | "otp" | "password";

export default function LoginScreen() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // ── Countdown timer ──
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ── Send OTP ──
  const handleSendOTP = useCallback(() => {
    if (phone.trim().length < 9 || loading) return;
    try {
      setLoading(true);
      // TODO: Call Supabase phone auth
      setTimeout(() => {
        setLoading(false);
        setStep("otp");
        setCountdown(120);
      }, 800);
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
      setLoading(false);
    }
  }, [phone, loading]);

  // ── Resend OTP ──
  const handleResendOTP = useCallback(() => {
    if (countdown > 0) return;
    try {
      setOtp("");
      setCountdown(120);
      // TODO: Resend OTP via Supabase
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }, [countdown]);

  // ── Verify OTP ──
  const handleVerifyOTP = useCallback(() => {
    if (otp.length !== OTP_LENGTH || loading) return;
    try {
      setLoading(true);
      // TODO: Verify OTP with Supabase
      setTimeout(() => {
        setLoading(false);
        router.replace("/(tabs)");
      }, 1000);
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
      setLoading(false);
    }
  }, [otp, loading, router]);

  // ── Password login ──
  const handlePasswordLogin = useCallback(() => {
    if (phone.trim().length < 9 || password.length < 6 || loading) return;
    try {
      setLoading(true);
      // TODO: Supabase signIn with password
      setTimeout(() => {
        setLoading(false);
        router.replace("/(tabs)");
      }, 1000);
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
      setLoading(false);
    }
  }, [phone, password, loading, router]);

  // ── Auto-verify when all 6 digits entered ──
  useEffect(() => {
    if (otp.length === OTP_LENGTH && step === "otp") {
      handleVerifyOTP();
    }
  }, [otp, step]);

  // ── Determine hero title/subtitle ──
  const heroTitle = step === "otp" ? "Xác thực OTP" : "MyLoveThaiHoc";
  const heroSubtitle =
    step === "otp"
      ? `Mã đã gửi đến ${phone}`
      : "Ghi nhớ mọi điều về em 💕";

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.primary }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Hero Section ── */}
          <LinearGradient
            colors={[Colors.primary, Colors.primaryGradientEnd, Colors.aiPurpleDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: HERO_HEIGHT,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <View
              style={{
                position: "absolute",
                top: 30,
                left: -40,
                width: 128,
                height: 128,
                borderRadius: 64,
                backgroundColor: Colors.whiteAlpha10,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 60,
                right: -20,
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: Colors.whiteAlpha10,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 60,
                left: "30%",
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: Colors.whiteAlpha07,
              }}
            />

            {/* Back button (on OTP/password step) */}
            {step !== "phone" && (
              <Pressable
                onPress={() => {
                  setStep("phone");
                  setOtp("");
                }}
                style={{
                  position: "absolute",
                  top: 56,
                  left: 20,
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: Colors.whiteAlpha20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                hitSlop={12}
                accessibilityLabel="Quay lại"
                accessibilityRole="button"
              >
                <ArrowLeft size={20} color={Colors.textOnPrimary} />
              </Pressable>
            )}

            {/* Brand */}
            <View
              style={{
                width: 68,
                height: 68,
                borderRadius: 34,
                backgroundColor: Colors.whiteAlpha20,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Heart size={34} color={Colors.textOnPrimary} fill={Colors.textOnPrimary} />
            </View>
            <Text
              style={{
                color: Colors.textOnPrimary,
                fontSize: 26,
                fontWeight: "800",
                letterSpacing: -0.5,
              }}
            >
              {heroTitle}
            </Text>
            <Text
              style={{
                color: Colors.whiteAlpha80,
                fontSize: 14,
                fontWeight: "500",
                marginTop: 4,
              }}
            >
              {heroSubtitle}
            </Text>
          </LinearGradient>

          {/* ── Form Card ── */}
          <View
            style={{
              marginHorizontal: 16,
              marginTop: -28,
              backgroundColor: Colors.surface,
              borderRadius: 28,
              padding: 28,
              shadowColor: Colors.textPrimary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 24,
              elevation: 16,
              marginBottom: 32,
            }}
          >
            {/* ── Step: Phone input (default OTP flow) ── */}
            {step === "phone" && (
              <>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: Colors.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  Đăng nhập
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.textSecondary,
                    marginBottom: 24,
                  }}
                >
                  Nhập số điện thoại để nhận mã OTP
                </Text>

                {/* Phone input */}
                <Text style={styles.inputLabel}>Số điện thoại</Text>
                <AuthInput
                  icon={<Phone size={18} color={Colors.textMuted} />}
                  placeholder="0912 345 678"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />

                {/* Send OTP button */}
                <Pressable
                  onPress={handleSendOTP}
                  disabled={phone.trim().length < 9 || loading}
                  style={{
                    marginTop: 20,
                    paddingVertical: 16,
                    borderRadius: 16,
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                  accessibilityLabel="Gửi mã OTP"
                  accessibilityRole="button"
                >
                  <LinearGradient
                    colors={
                      phone.trim().length >= 9 && !loading
                        ? [Colors.primaryGradientStart, Colors.primaryGradientEnd]
                        : [Colors.primaryLight, Colors.primaryLight]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <MessageSquare size={18} color={Colors.textOnPrimary} />
                    <Text
                      style={{ fontSize: 16, fontWeight: "700", color: Colors.textOnPrimary }}
                    >
                      {loading ? "Đang gửi..." : "Gửi mã OTP"}
                    </Text>
                  </View>
                </Pressable>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>hoặc</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Password login option */}
                <Pressable
                  onPress={() => setStep("password")}
                  style={({ pressed }) => ({
                    paddingVertical: 14,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: Colors.border,
                    marginBottom: 12,
                    backgroundColor: pressed ? Colors.surfaceSecondary : Colors.surface,
                  })}
                  accessibilityLabel="Đăng nhập bằng mật khẩu"
                  accessibilityRole="button"
                >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Lock size={18} color={Colors.textSecondary} />
                    <Text
                      style={{ fontSize: 14, fontWeight: "600", color: Colors.textSecondary, marginLeft: 8 }}
                    >
                      Đăng nhập bằng mật khẩu
                    </Text>
                  </View>
                </Pressable>

                {/* Google login */}
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    paddingVertical: 14,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: Colors.border,
                    backgroundColor: pressed ? Colors.surfaceSecondary : Colors.surfaceSecondary,
                  })}
                  accessibilityLabel="Tiếp tục với Google"
                  accessibilityRole="button"
                >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <GoogleIcon />
                    <Text
                      style={{ fontSize: 14, fontWeight: "600", color: Colors.textSecondary, marginLeft: 10 }}
                    >
                      Tiếp tục với Google
                    </Text>
                  </View>
                </Pressable>

                {/* Register link */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    gap: 4,
                  }}
                >
                  <Text style={{ fontSize: 14, color: Colors.textSecondary }}>
                    Chưa có tài khoản?
                  </Text>
                  <Pressable
                    onPress={() => router.push("/(auth)/register")}
                    hitSlop={12}
                    accessibilityLabel="Đăng ký tài khoản"
                    accessibilityRole="link"
                  >
                    <Text
                      style={{ fontSize: 14, fontWeight: "700", color: Colors.primary }}
                    >
                      Đăng ký
                    </Text>
                  </Pressable>
                </View>
              </>
            )}

            {/* ── Step: OTP verification ── */}
            {step === "otp" && (
              <>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: Colors.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  Nhập mã xác thực
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.textSecondary,
                    marginBottom: 28,
                    lineHeight: 20,
                  }}
                >
                  Chúng tôi đã gửi mã 6 số đến{" "}
                  <Text style={{ fontWeight: "700", color: Colors.textPrimary }}>{phone}</Text>
                </Text>

                {/* OTP 6-digit input */}
                <Text style={styles.inputLabel}>Mã xác thực (OTP)</Text>
                <OTPInput value={otp} onChange={setOtp} />

                {/* Resend + countdown */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                    gap: 6,
                  }}
                >
                  <Text style={{ fontSize: 13, color: Colors.textMuted }}>
                    Chưa nhận được mã?
                  </Text>
                  <Pressable
                    onPress={handleResendOTP}
                    disabled={countdown > 0}
                    hitSlop={12}
                    accessibilityLabel="Gửi lại mã OTP"
                    accessibilityRole="button"
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: countdown > 0 ? Colors.border : Colors.primary,
                      }}
                    >
                      Gửi lại mã
                    </Text>
                  </Pressable>
                  {countdown > 0 && (
                    <Text style={{ fontSize: 13, color: Colors.textMuted, fontWeight: "500" }}>
                      ({formatCountdown(countdown)})
                    </Text>
                  )}
                </View>

                {/* Verify button */}
                <Pressable
                  onPress={handleVerifyOTP}
                  disabled={otp.length !== OTP_LENGTH || loading}
                  style={{ marginTop: 28 }}
                  accessibilityLabel="Xác nhận OTP"
                  accessibilityRole="button"
                >
                  <LinearGradient
                    colors={
                      otp.length === OTP_LENGTH && !loading
                        ? [Colors.primaryGradientStart, Colors.primaryGradientEnd]
                        : [Colors.primaryLight, Colors.primaryLight]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      paddingVertical: 16,
                      borderRadius: 16,
                      alignItems: "center",
                      shadowColor: Colors.primary,
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: otp.length === OTP_LENGTH ? 0.3 : 0,
                      shadowRadius: 12,
                      elevation: otp.length === OTP_LENGTH ? 8 : 0,
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text
                        style={{ fontSize: 16, fontWeight: "700", color: Colors.textOnPrimary }}
                      >
                        {loading ? "Đang xác thực..." : "Xác nhận & Đăng nhập"}
                      </Text>
                      {!loading && <ChevronRight size={18} color={Colors.textOnPrimary} />}
                    </View>
                  </LinearGradient>
                </Pressable>

                {/* Switch to password */}
                <Pressable
                  onPress={() => setStep("password")}
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                  }}
                  hitSlop={12}
                  accessibilityLabel="Chuyển sang đăng nhập mật khẩu"
                  accessibilityRole="button"
                >
                  <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.textSecondary }}>
                    Dùng mật khẩu thay thế
                  </Text>
                </Pressable>
              </>
            )}

            {/* ── Step: Password login (fallback) ── */}
            {step === "password" && (
              <>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: Colors.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  Đăng nhập
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.textSecondary,
                    marginBottom: 24,
                  }}
                >
                  Chào mừng bạn quay lại
                </Text>

                {/* Phone / Email */}
                <Text style={styles.inputLabel}>Số điện thoại / Email</Text>
                <AuthInput
                  icon={<Phone size={18} color={Colors.textMuted} />}
                  placeholder="0912 345 678"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {/* Password */}
                <Text style={[styles.inputLabel, { marginTop: 16 }]}>Mật khẩu</Text>
                <AuthInput
                  icon={<Lock size={18} color={Colors.textMuted} />}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPwd}
                  rightElement={
                    <Pressable
                      onPress={() => setShowPwd((p) => !p)}
                      hitSlop={12}
                      style={{ minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center' }}
                      accessibilityLabel={showPwd ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      accessibilityRole="button"
                    >
                      {showPwd ? (
                        <EyeOff size={18} color={Colors.textMuted} />
                      ) : (
                        <Eye size={18} color={Colors.textMuted} />
                      )}
                    </Pressable>
                  }
                />

                {/* Forgot Password */}
                <Pressable
                  onPress={() => router.push("/(auth)/forgot-password")}
                  style={{ alignSelf: "flex-end", marginTop: 10, marginBottom: 24 }}
                  hitSlop={12}
                  accessibilityLabel="Quên mật khẩu"
                  accessibilityRole="link"
                >
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", color: Colors.primary }}
                  >
                    Quên mật khẩu?
                  </Text>
                </Pressable>

                {/* Login Button */}
                <Pressable
                  onPress={handlePasswordLogin}
                  disabled={phone.trim().length < 9 || password.length < 6 || loading}
                  accessibilityLabel="Đăng nhập"
                  accessibilityRole="button"
                >
                  <LinearGradient
                    colors={
                      phone.trim().length >= 9 && password.length >= 6 && !loading
                        ? [Colors.primaryGradientStart, Colors.primaryGradientEnd]
                        : [Colors.primaryLight, Colors.primaryLight]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      paddingVertical: 16,
                      borderRadius: 16,
                      alignItems: "center",
                      shadowColor: Colors.primary,
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity:
                        phone.trim().length >= 9 && password.length >= 6 ? 0.3 : 0,
                      shadowRadius: 12,
                      elevation:
                        phone.trim().length >= 9 && password.length >= 6 ? 8 : 0,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "700", color: Colors.textOnPrimary }}
                    >
                      {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Text>
                  </LinearGradient>
                </Pressable>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>hoặc</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Switch to OTP */}
                <Pressable
                  onPress={() => setStep("phone")}
                  style={({ pressed }) => ({
                    paddingVertical: 14,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: Colors.primary,
                    marginBottom: 12,
                    opacity: pressed ? 0.85 : 1,
                  })}
                  accessibilityLabel="Chuyển sang đăng nhập OTP"
                  accessibilityRole="button"
                >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <MessageSquare size={18} color={Colors.primary} />
                    <Text
                      style={{ fontSize: 14, fontWeight: "700", color: Colors.primary, marginLeft: 8 }}
                    >
                      Đăng nhập bằng mã OTP
                    </Text>
                  </View>
                </Pressable>

                {/* Google Login */}
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    paddingVertical: 14,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: Colors.border,
                    backgroundColor: pressed ? Colors.surfaceSecondary : Colors.surfaceSecondary,
                  })}
                  accessibilityLabel="Tiếp tục với Google"
                  accessibilityRole="button"
                >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <GoogleIcon />
                    <Text
                      style={{ fontSize: 14, fontWeight: "600", color: Colors.textSecondary, marginLeft: 10 }}
                    >
                      Tiếp tục với Google
                    </Text>
                  </View>
                </Pressable>

                {/* Register Link */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    gap: 4,
                  }}
                >
                  <Text style={{ fontSize: 14, color: Colors.textSecondary }}>
                    Chưa có tài khoản?
                  </Text>
                  <Pressable
                    onPress={() => router.push("/(auth)/register")}
                    hitSlop={12}
                    accessibilityLabel="Đăng ký tài khoản"
                    accessibilityRole="link"
                  >
                    <Text
                      style={{ fontSize: 14, fontWeight: "700", color: Colors.primary }}
                    >
                      Đăng ký
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Shared Styles ───────────────────────────────────────────

const styles = {
  inputLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: Colors.textSecondary,
    textTransform: "uppercase" as const,
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  divider: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.surfaceSecondary,
  },
  dividerText: {
    marginHorizontal: 14,
    fontSize: 11,
    fontWeight: "600" as const,
    color: Colors.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
};
