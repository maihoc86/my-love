// ============================================================
// Login Screen - MyLoveThaiHoc
// OTP-first login flow with password fallback
// ============================================================

import React, { useState, useCallback, useRef, useEffect } from "react";
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

function GoogleIcon() {
  return (
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
  );
}

// ─── OTP Input Component ─────────────────────────────────────

function OTPInput({
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
      >
        {digits.map((digit, i) => {
          const isFocused = i === value.length && value.length < OTP_LENGTH;
          return (
            <View
              key={i}
              style={{
                width: 48,
                height: 52,
                backgroundColor: digit ? "#fff" : "#f8fafc",
                borderWidth: 1.5,
                borderColor: isFocused ? Colors.primary : digit ? "#e2e8f0" : "#f1f5f9",
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#0f172a",
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
}

// ─── Auth Input ─────────────────────────────────────────────

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
          color: "#1e293b",
        }}
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
    setLoading(true);
    // TODO: Call Supabase phone auth
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setCountdown(120);
    }, 800);
  }, [phone, loading]);

  // ── Resend OTP ──
  const handleResendOTP = useCallback(() => {
    if (countdown > 0) return;
    setOtp("");
    setCountdown(120);
    // TODO: Resend OTP via Supabase
  }, [countdown]);

  // ── Verify OTP ──
  const handleVerifyOTP = useCallback(() => {
    if (otp.length !== OTP_LENGTH || loading) return;
    setLoading(true);
    // TODO: Verify OTP with Supabase
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1000);
  }, [otp, loading, router]);

  // ── Password login ──
  const handlePasswordLogin = useCallback(() => {
    if (phone.trim().length < 9 || password.length < 6 || loading) return;
    setLoading(true);
    // TODO: Supabase signIn with password
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1000);
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
          colors={[Colors.primary, "#ec4899", "#9333ea"]}
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
              backgroundColor: "rgba(255,255,255,0.1)",
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
              backgroundColor: "rgba(255,255,255,0.1)",
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
              backgroundColor: "rgba(255,255,255,0.06)",
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
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
              hitSlop={10}
            >
              <ArrowLeft size={20} color="#fff" />
            </Pressable>
          )}

          {/* Brand */}
          <View
            style={{
              width: 68,
              height: 68,
              borderRadius: 34,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <Heart size={34} color="#fff" fill="#fff" />
          </View>
          <Text
            style={{
              color: "#fff",
              fontSize: 26,
              fontWeight: "800",
              letterSpacing: -0.5,
            }}
          >
            {heroTitle}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
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
            shadowColor: "#000",
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
                  color: "#0f172a",
                  marginBottom: 4,
                }}
              >
                Đăng nhập
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginBottom: 24,
                }}
              >
                Nhập số điện thoại để nhận mã OTP
              </Text>

              {/* Phone input */}
              <Text style={styles.inputLabel}>Số điện thoại</Text>
              <AuthInput
                icon={<Phone size={18} color="#94a3b8" />}
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
              >
                <LinearGradient
                  colors={
                    phone.trim().length >= 9 && !loading
                      ? [Colors.primaryGradientStart, Colors.primaryGradientEnd]
                      : ["#fda4af", "#fda4af"]
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
                  <MessageSquare size={18} color="#fff" />
                  <Text
                    style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}
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
                  borderColor: "#e2e8f0",
                  marginBottom: 12,
                  backgroundColor: pressed ? "#f8fafc" : "#fff",
                })}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <Lock size={18} color="#64748b" />
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#334155", marginLeft: 8 }}
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
                  borderColor: "#e2e8f0",
                  backgroundColor: pressed ? "#f8fafc" : "#fafafa",
                })}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <GoogleIcon />
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#334155", marginLeft: 10 }}
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
                <Text style={{ fontSize: 14, color: "#64748b" }}>
                  Chưa có tài khoản?
                </Text>
                <Pressable
                  onPress={() => router.push("/(auth)/register")}
                  hitSlop={6}
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
                  color: "#0f172a",
                  marginBottom: 4,
                }}
              >
                Nhập mã xác thực
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginBottom: 28,
                  lineHeight: 20,
                }}
              >
                Chúng tôi đã gửi mã 6 số đến{" "}
                <Text style={{ fontWeight: "700", color: "#0f172a" }}>{phone}</Text>
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
                <Text style={{ fontSize: 13, color: "#94a3b8" }}>
                  Chưa nhận được mã?
                </Text>
                <Pressable onPress={handleResendOTP} disabled={countdown > 0} hitSlop={6}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: countdown > 0 ? "#cbd5e1" : Colors.primary,
                    }}
                  >
                    Gửi lại mã
                  </Text>
                </Pressable>
                {countdown > 0 && (
                  <Text style={{ fontSize: 13, color: "#94a3b8", fontWeight: "500" }}>
                    ({formatCountdown(countdown)})
                  </Text>
                )}
              </View>

              {/* Verify button */}
              <Pressable
                onPress={handleVerifyOTP}
                disabled={otp.length !== OTP_LENGTH || loading}
                style={{ marginTop: 28 }}
              >
                <LinearGradient
                  colors={
                    otp.length === OTP_LENGTH && !loading
                      ? [Colors.primaryGradientStart, Colors.primaryGradientEnd]
                      : ["#fda4af", "#fda4af"]
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
                      style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}
                    >
                      {loading ? "Đang xác thực..." : "Xác nhận & Đăng nhập"}
                    </Text>
                    {!loading && <ChevronRight size={18} color="#fff" />}
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
                hitSlop={8}
              >
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#64748b" }}>
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
                  color: "#0f172a",
                  marginBottom: 4,
                }}
              >
                Đăng nhập
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginBottom: 24,
                }}
              >
                Chào mừng bạn quay lại
              </Text>

              {/* Phone / Email */}
              <Text style={styles.inputLabel}>Số điện thoại / Email</Text>
              <AuthInput
                icon={<Phone size={18} color="#94a3b8" />}
                placeholder="0912 345 678"
                value={phone}
                onChangeText={setPhone}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password */}
              <Text style={[styles.inputLabel, { marginTop: 16 }]}>Mật khẩu</Text>
              <AuthInput
                icon={<Lock size={18} color="#94a3b8" />}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPwd}
                rightElement={
                  <Pressable
                    onPress={() => setShowPwd((p) => !p)}
                    hitSlop={8}
                  >
                    {showPwd ? (
                      <EyeOff size={18} color="#94a3b8" />
                    ) : (
                      <Eye size={18} color="#94a3b8" />
                    )}
                  </Pressable>
                }
              />

              {/* Forgot Password */}
              <Pressable
                onPress={() => router.push("/(auth)/forgot-password")}
                style={{ alignSelf: "flex-end", marginTop: 10, marginBottom: 24 }}
                hitSlop={8}
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
              >
                <LinearGradient
                  colors={
                    phone.trim().length >= 9 && password.length >= 6 && !loading
                      ? [Colors.primaryGradientStart, Colors.primaryGradientEnd]
                      : ["#fda4af", "#fda4af"]
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
                    style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}
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
                  borderColor: "#e2e8f0",
                  backgroundColor: pressed ? "#f8fafc" : "#fafafa",
                })}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <GoogleIcon />
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#334155", marginLeft: 10 }}
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
                <Text style={{ fontSize: 14, color: "#64748b" }}>
                  Chưa có tài khoản?
                </Text>
                <Pressable
                  onPress={() => router.push("/(auth)/register")}
                  hitSlop={6}
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
  );
}

// ─── Shared Styles ───────────────────────────────────────────

const styles = {
  inputLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: "#64748b",
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
    backgroundColor: "#f1f5f9",
  },
  dividerText: {
    marginHorizontal: 14,
    fontSize: 11,
    fontWeight: "600" as const,
    color: "#94a3b8",
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
};
