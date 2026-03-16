// ============================================================
// Register Screen - AI Love
// Rebuilt v2.0 — based on stitch/ng_k_otp_mylovethaihoc/code.html
// + BRD v2.0 Epic 4 + SRS FR-AUTH-002 (OTP registration flow)
// ============================================================

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
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
import {
  Heart,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
} from "lucide-react-native";

import { Colors } from "@/theme";

// ─── Constants ───────────────────────────────────────────────

const PRIMARY = Colors.primary;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = SCREEN_HEIGHT * 0.24;

// ─── Helpers ─────────────────────────────────────────────────

function formatCountdown(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getPasswordStrength(pwd: string): {
  level: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
} {
  if (!pwd) return { level: 0, label: "", color: Colors.border };
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 1, label: "Yếu", color: Colors.error };
  if (score <= 2) return { level: 2, label: "Trung bình", color: Colors.sentimentLike };
  if (score <= 3) return { level: 3, label: "Khá mạnh", color: Colors.warning };
  return { level: 4, label: "Rất mạnh", color: Colors.success };
}

// ─── Input Field ─────────────────────────────────────────────

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
        borderRadius: 14,
        paddingHorizontal: 12,
        gap: 8,
      }}
    >
      {icon}
      <TextInput
        style={{ flex: 1, paddingVertical: 13, fontSize: 15, color: Colors.textPrimary }}
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

// ─── OTP 6-Box Input ─────────────────────────────────────────

const OtpBoxes = memo(function OtpBoxes({
  otp,
  onChange,
}: {
  otp: string[];
  onChange: (val: string, idx: number) => void;
}) {
  const refs = useRef<(TextInput | null)[]>([]);

  const handleChange = (val: string, idx: number) => {
    // Only keep last char if pasted
    const char = val.slice(-1);
    onChange(char, idx);
    if (char && idx < 5) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
      {otp.map((digit, idx) => (
        <TextInput
          key={idx}
          ref={(r) => { refs.current[idx] = r; }}
          style={{
            flex: 1,
            height: 52,
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
            borderRadius: 12,
            borderWidth: 2,
            borderColor: digit ? PRIMARY : Colors.border,
            backgroundColor: digit ? Colors.primaryAlpha05 : Colors.surfaceSecondary,
            color: Colors.textPrimary,
          }}
          maxLength={1}
          keyboardType="number-pad"
          value={digit}
          onChangeText={(v) => handleChange(v, idx)}
          onKeyPress={(e) => handleKeyPress(e, idx)}
        />
      ))}
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function RegisterScreen() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);
  const otpFilled = otp.join("").length === 6;
  const canRegister =
    phone.trim().length >= 9 &&
    otpFilled &&
    password.length >= 6 &&
    password === confirmPwd;

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSendOtp = useCallback(() => {
    try {
      if (!phone.trim()) return;
      // TODO: Supabase OTP via phone
      setOtpSent(true);
      setCountdown(120);
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }, [phone]);

  const handleOtpChange = useCallback((val: string, idx: number) => {
    setOtp((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }, []);

  const handleRegister = useCallback(async () => {
    try {
      if (!canRegister || loading) return;
      setLoading(true);
      // TODO: Supabase signUp + OTP verify
      setTimeout(() => {
        setLoading(false);
        // Redirect to onboarding for first-time users
        router.replace("/onboarding");
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }, [canRegister, loading, router]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: PRIMARY }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
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
            <View
              style={{
                position: "absolute",
                top: -40,
                right: -40,
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
                left: -20,
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: Colors.whiteAlpha07,
              }}
            />

            {/* Back button */}
            <Pressable
              onPress={() => router.back()}
              accessibilityLabel="Quay lại"
              accessibilityRole="button"
              style={{
                position: "absolute",
                top: Platform.OS === "ios" ? 54 : 20,
                left: 20,
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: Colors.whiteAlpha20,
                alignItems: "center",
                justifyContent: "center",
              }}
              hitSlop={12}
            >
              <ChevronLeft size={20} color={Colors.textOnPrimary} />
            </Pressable>

            {/* Icon + title */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: Colors.whiteAlpha20,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <Heart size={26} color={Colors.textOnPrimary} fill={Colors.textOnPrimary} />
            </View>
            <Text
              style={{
                color: Colors.textOnPrimary,
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              Tạo tài khoản
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View
            style={{
              marginTop: -20,
              backgroundColor: Colors.surface,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              paddingHorizontal: 24,
              paddingTop: 28,
              paddingBottom: 40,
              minHeight: SCREEN_HEIGHT * 0.76,
              shadowColor: Colors.textPrimary,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 12,
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "700", color: Colors.textPrimary, marginBottom: 4 }}
            >
              Đăng ký
            </Text>
            <Text
              style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 24 }}
            >
              Bắt đầu ghi nhớ mọi điều về em
            </Text>

            {/* Phone */}
            <FieldLabel>Số điện thoại</FieldLabel>
            <View style={{ marginBottom: 14 }}>
              <AuthInput
                icon={<Phone size={17} color={Colors.textMuted} />}
                placeholder="0xxx xxx xxx"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            </View>

            {/* Email */}
            <FieldLabel>Email</FieldLabel>
            <View style={{ marginBottom: 16 }}>
              <AuthInput
                icon={<Mail size={17} color={Colors.textMuted} />}
                placeholder="example@mail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Send OTP Button */}
            {!otpSent ? (
              <Pressable
                onPress={handleSendOtp}
                disabled={!phone.trim()}
                accessibilityLabel="Tiếp tục"
                accessibilityRole="button"
                style={{
                  paddingVertical: 13,
                  borderRadius: 14,
                  alignItems: "center",
                  backgroundColor: phone.trim() ? Colors.primaryAlpha10 : Colors.surfaceSecondary,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: phone.trim() ? PRIMARY : Colors.textMuted,
                  }}
                >
                  Tiếp tục
                </Text>
              </Pressable>
            ) : (
              <View style={{ marginBottom: 20 }}>
                <FieldLabel>Nhập mã xác thực (OTP)</FieldLabel>
                <View style={{ marginBottom: 12 }}>
                  <OtpBoxes otp={otp} onChange={handleOtpChange} />
                </View>

                {/* Resend row */}
                <View
                  style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 }}
                >
                  <Text style={{ fontSize: 13, color: Colors.textSecondary }}>
                    Chưa nhận được mã?
                  </Text>
                  <Pressable
                    onPress={() => { if (countdown === 0) setCountdown(120); }}
                    disabled={countdown > 0}
                    accessibilityLabel="Gửi lại mã OTP"
                    accessibilityRole="button"
                    hitSlop={12}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: countdown > 0 ? Colors.textMuted : PRIMARY,
                      }}
                    >
                      Gửi lại mã
                    </Text>
                  </Pressable>
                  {countdown > 0 && (
                    <Text style={{ fontSize: 13, color: Colors.textMuted }}>
                      ({formatCountdown(countdown)})
                    </Text>
                  )}
                </View>
              </View>
            )}

            {/* Password */}
            <FieldLabel>Mật khẩu</FieldLabel>
            <View style={{ marginBottom: strength.level > 0 ? 8 : 14 }}>
              <AuthInput
                icon={<Lock size={17} color={Colors.textMuted} />}
                placeholder="Tạo mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPwd}
                rightElement={
                  <Pressable
                    onPress={() => setShowPwd((v) => !v)}
                    accessibilityLabel={showPwd ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    accessibilityRole="button"
                    hitSlop={12}
                    style={{ minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center" }}
                  >
                    {showPwd ? (
                      <EyeOff size={17} color={Colors.textMuted} />
                    ) : (
                      <Eye size={17} color={Colors.textMuted} />
                    )}
                  </Pressable>
                }
              />
            </View>

            {/* Strength bar */}
            {strength.level > 0 && (
              <View style={{ marginBottom: 14 }}>
                <View style={{ flexDirection: "row", gap: 4, marginBottom: 4 }}>
                  {([1, 2, 3, 4] as const).map((i) => (
                    <View
                      key={i}
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2,
                        backgroundColor:
                          i <= strength.level ? strength.color : Colors.border,
                      }}
                    />
                  ))}
                </View>
                <Text style={{ fontSize: 11, color: strength.color, fontWeight: "600" }}>
                  {strength.label}
                </Text>
              </View>
            )}

            {/* Confirm Password */}
            <FieldLabel>Xác nhận mật khẩu</FieldLabel>
            <View style={{ marginBottom: 28 }}>
              <AuthInput
                icon={<Lock size={17} color={Colors.textMuted} />}
                placeholder="Nhập lại mật khẩu"
                value={confirmPwd}
                onChangeText={setConfirmPwd}
                secureTextEntry={!showPwd}
              />
              {confirmPwd.length > 0 && password !== confirmPwd && (
                <Text
                  style={{ fontSize: 11, color: Colors.error, marginTop: 4, marginLeft: 2 }}
                >
                  Mật khẩu không khớp
                </Text>
              )}
            </View>

            {/* Submit */}
            <Pressable
              onPress={handleRegister}
              disabled={!canRegister || loading}
              accessibilityLabel="Đăng ký"
              accessibilityRole="button"
              style={{
                paddingVertical: 16,
                borderRadius: 16,
                alignItems: "center",
                backgroundColor: canRegister && !loading ? PRIMARY : Colors.primaryLight,
                shadowColor: PRIMARY,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: canRegister ? 0.28 : 0,
                shadowRadius: 12,
                elevation: canRegister ? 8 : 0,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textOnPrimary }}>
                {loading ? "Đang xử lý..." : "Xác nhận và Đăng ký"}
              </Text>
            </Pressable>

            {/* Divider */}
            <View
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: Colors.surfaceSecondary }} />
              <Text
                style={{
                  marginHorizontal: 14,
                  fontSize: 11,
                  fontWeight: "600",
                  color: Colors.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                hoặc
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: Colors.surfaceSecondary }} />
            </View>

            {/* Google */}
            <Pressable
              onPress={() => {}}
              accessibilityLabel="Đăng ký với Google"
              accessibilityRole="button"
              style={{
                paddingVertical: 14,
                borderRadius: 16,
                borderWidth: 1.5,
                borderColor: Colors.border,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
                backgroundColor: Colors.surfaceSecondary,
                marginBottom: 24,
              }}
            >
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
              <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.textSecondary }}>
                Đăng ký với Google
              </Text>
            </Pressable>

            {/* Login link */}
            <View
              style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}
            >
              <Text style={{ fontSize: 14, color: Colors.textSecondary }}>
                Đã có tài khoản?
              </Text>
              <Pressable
                onPress={() => router.back()}
                accessibilityLabel="Đã có tài khoản, đăng nhập"
                accessibilityRole="link"
                hitSlop={12}
              >
                <Text style={{ fontSize: 14, fontWeight: "700", color: PRIMARY }}>
                  Đăng nhập
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Local helpers ────────────────────────────────────────────

const FieldLabel = memo(function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 13,
        fontWeight: "600",
        color: Colors.textSecondary,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
});
