// ============================================================
// Register Screen - MyLoveThaiHoc
// Rebuilt v2.0 — based on stitch/ng_k_otp_mylovethaihoc/code.html
// + BRD v2.0 Epic 4 + SRS FR-AUTH-002 (OTP registration flow)
// ============================================================

import React, { useState, useRef, useEffect, useCallback } from "react";
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
} from "react-native";
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
  if (!pwd) return { level: 0, label: "", color: "#e2e8f0" };
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 1, label: "Yếu", color: "#ef4444" };
  if (score <= 2) return { level: 2, label: "Trung bình", color: "#f97316" };
  if (score <= 3) return { level: 3, label: "Khá mạnh", color: "#eab308" };
  return { level: 4, label: "Rất mạnh", color: "#10b981" };
}

// ─── Input Field ─────────────────────────────────────────────

function AuthInput({
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
        backgroundColor: "#f8fafc",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 14,
        paddingHorizontal: 12,
        gap: 8,
      }}
    >
      {icon}
      <TextInput
        style={{ flex: 1, paddingVertical: 13, fontSize: 15, color: "#1e293b" }}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize={autoCapitalize ?? "sentences"}
      />
      {rightElement}
    </View>
  );
}

// ─── OTP 6-Box Input ─────────────────────────────────────────

function OtpBoxes({
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
            borderColor: digit ? PRIMARY : "#e2e8f0",
            backgroundColor: digit ? "rgba(244,63,94,0.05)" : "#f8fafc",
            color: "#0f172a",
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
}

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
    if (!phone.trim()) return;
    // TODO: Supabase OTP via phone
    setOtpSent(true);
    setCountdown(120);
  }, [phone]);

  const handleOtpChange = useCallback((val: string, idx: number) => {
    setOtp((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }, []);

  const handleRegister = useCallback(async () => {
    if (!canRegister || loading) return;
    setLoading(true);
    // TODO: Supabase signUp + OTP verify
    setTimeout(() => {
      setLoading(false);
      // Redirect to onboarding for first-time users
      router.replace("/onboarding");
    }, 1500);
  }, [canRegister, loading, router]);

  return (
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
              backgroundColor: "rgba(255,255,255,0.1)",
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
              backgroundColor: "rgba(255,255,255,0.07)",
            }}
          />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
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
          >
            <ChevronLeft size={20} color="#fff" />
          </Pressable>

          {/* Icon + title */}
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <Heart size={26} color="#fff" fill="#fff" />
          </View>
          <Text
            style={{
              color: "#fff",
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
            backgroundColor: "#fff",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 40,
            minHeight: SCREEN_HEIGHT * 0.76,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 12,
          }}
        >
          <Text
            style={{ fontSize: 22, fontWeight: "700", color: "#0f172a", marginBottom: 4 }}
          >
            Đăng ký
          </Text>
          <Text
            style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}
          >
            Bắt đầu ghi nhớ mọi điều về em
          </Text>

          {/* Phone */}
          <FieldLabel>Số điện thoại</FieldLabel>
          <View style={{ marginBottom: 14 }}>
            <AuthInput
              icon={<Phone size={17} color="#94a3b8" />}
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
              icon={<Mail size={17} color="#94a3b8" />}
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
              style={{
                paddingVertical: 13,
                borderRadius: 14,
                alignItems: "center",
                backgroundColor: phone.trim() ? "rgba(244,63,94,0.1)" : "#f1f5f9",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: phone.trim() ? PRIMARY : "#94a3b8",
                }}
              >
                Gửi mã OTP
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
                <Text style={{ fontSize: 13, color: "#64748b" }}>
                  Chưa nhận được mã?
                </Text>
                <Pressable
                  onPress={() => { if (countdown === 0) setCountdown(120); }}
                  disabled={countdown > 0}
                  hitSlop={6}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: countdown > 0 ? "#94a3b8" : PRIMARY,
                    }}
                  >
                    Gửi lại mã
                  </Text>
                </Pressable>
                {countdown > 0 && (
                  <Text style={{ fontSize: 13, color: "#94a3b8" }}>
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
              icon={<Lock size={17} color="#94a3b8" />}
              placeholder="Tạo mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPwd}
              rightElement={
                <Pressable onPress={() => setShowPwd((v) => !v)} hitSlop={8}>
                  {showPwd ? (
                    <EyeOff size={17} color="#94a3b8" />
                  ) : (
                    <Eye size={17} color="#94a3b8" />
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
                        i <= strength.level ? strength.color : "#e2e8f0",
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
              icon={<Lock size={17} color="#94a3b8" />}
              placeholder="Nhập lại mật khẩu"
              value={confirmPwd}
              onChangeText={setConfirmPwd}
              secureTextEntry={!showPwd}
            />
            {confirmPwd.length > 0 && password !== confirmPwd && (
              <Text
                style={{ fontSize: 11, color: "#ef4444", marginTop: 4, marginLeft: 2 }}
              >
                Mật khẩu không khớp
              </Text>
            )}
          </View>

          {/* Submit */}
          <Pressable
            onPress={handleRegister}
            disabled={!canRegister || loading}
            style={{
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              backgroundColor: canRegister && !loading ? PRIMARY : "#fda4af",
              shadowColor: PRIMARY,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: canRegister ? 0.28 : 0,
              shadowRadius: 12,
              elevation: canRegister ? 8 : 0,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
              {loading ? "Đang xử lý..." : "Xác nhận và Đăng ký"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#f1f5f9" }} />
            <Text
              style={{
                marginHorizontal: 14,
                fontSize: 11,
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              hoặc
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#f1f5f9" }} />
          </View>

          {/* Google */}
          <Pressable
            onPress={() => {}}
            style={{
              paddingVertical: 14,
              borderRadius: 16,
              borderWidth: 1.5,
              borderColor: "#e2e8f0",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              backgroundColor: "#fafafa",
              marginBottom: 24,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#4285F4",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}>G</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#334155" }}>
              Đăng ký với Google
            </Text>
          </Pressable>

          {/* Login link */}
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}
          >
            <Text style={{ fontSize: 14, color: "#64748b" }}>
              Đã có tài khoản?
            </Text>
            <Pressable onPress={() => router.back()} hitSlop={6}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: PRIMARY }}>
                Đăng nhập
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Local helpers ────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}
