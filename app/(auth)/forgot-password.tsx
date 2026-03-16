// ============================================================
// Forgot Password Screen - MyLoveThaiHoc
// Rebuilt v2.0 — based on stitch/qu_n_m_t_kh_u_mylovethaihoc/code.html
// + BRD v2.0 Epic 4 + SRS FR-AUTH-003 (3-step reset flow)
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
} from "react-native";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Lock,
  Phone,
  Eye,
  EyeOff,
  RefreshCw,
  ShieldCheck,
} from "lucide-react-native";

import { Colors } from "@/theme";

// ─── Constants ───────────────────────────────────────────────

const PRIMARY = Colors.primary;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = SCREEN_HEIGHT * 0.22;

type Step = 1 | 2 | 3;

// ─── Step Indicator ──────────────────────────────────────────

const StepDots = memo(function StepDots({ current }: { current: Step }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
        marginBottom: 28,
      }}
    >
      {([1, 2, 3] as Step[]).map((s) => (
        <View
          key={s}
          style={{
            height: 6,
            width: s === current ? 28 : 14,
            borderRadius: 3,
            backgroundColor: s <= current ? PRIMARY : "#e2e8f0",
          }}
        />
      ))}
    </View>
  );
});

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
    const char = val.slice(-1);
    onChange(char, idx);
    if (char && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {otp.map((digit, idx) => (
        <TextInput
          key={idx}
          ref={(r) => { refs.current[idx] = r; }}
          style={{
            flex: 1,
            height: 54,
            textAlign: "center",
            fontSize: 22,
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

// ─── Input Field ─────────────────────────────────────────────

function AuthInput({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightElement,
  keyboardType,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  rightElement?: React.ReactNode;
  keyboardType?: "default" | "email-address" | "phone-pad";
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
        paddingHorizontal: 14,
        gap: 10,
      }}
    >
      {icon}
      <TextInput
        style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: "#1e293b" }}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize="none"
      />
      {rightElement}
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [identity, setIdentity] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpFilled = otp.join("").length === 6;
  const canReset =
    newPassword.length >= 6 && newPassword === confirmPwd;

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSendCode = useCallback(() => {
    if (!identity.trim() || loading) return;
    setLoading(true);
    // TODO: Supabase OTP reset
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCountdown(45);
    }, 900);
  }, [identity, loading]);

  const handleVerifyOtp = useCallback(() => {
    if (!otpFilled) return;
    // TODO: verify OTP with Supabase
    setStep(3);
  }, [otpFilled]);

  const handleResetPassword = useCallback(() => {
    if (!canReset || loading) return;
    setLoading(true);
    // TODO: Supabase updateUser password
    setTimeout(() => {
      setLoading(false);
      router.replace("/(auth)/login");
    }, 1200);
  }, [canReset, loading, router]);

  const handleOtpChange = useCallback((val: string, idx: number) => {
    setOtp((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }, []);

  const handleBack = useCallback(() => {
    if (step > 1) setStep((s) => (s - 1) as Step);
    else router.back();
  }, [step, router]);

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
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 20,
          }}
        >
          {/* Decorative circles */}
          <View
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: -20,
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: "rgba(255,255,255,0.07)",
            }}
          />

          {/* Back button */}
          <Pressable
            onPress={handleBack}
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
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <Lock size={26} color="#fff" />
          </View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
            Quên mật khẩu
          </Text>
        </View>

        {/* ── Form Card ── */}
        <View
          style={{
            marginTop: -24,
            marginHorizontal: 16,
            backgroundColor: "#fff",
            borderRadius: 28,
            padding: 28,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 24,
            elevation: 14,
            marginBottom: 32,
          }}
        >
          {/* Step dots */}
          <StepDots current={step} />

          {/* ── Step 1: Enter identity ── */}
          {step === 1 && (
            <View>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(244,63,94,0.08)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <RefreshCw size={26} color={PRIMARY} />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: 6,
                  }}
                >
                  Đặt lại mật khẩu
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#64748b",
                    textAlign: "center",
                    lineHeight: 20,
                  }}
                >
                  Vui lòng nhập số điện thoại hoặc email{"\n"}để nhận mã xác thực OTP.
                </Text>
              </View>

              <AuthInput
                icon={<Phone size={18} color="#94a3b8" />}
                placeholder="Số điện thoại hoặc Email"
                value={identity}
                onChangeText={setIdentity}
                keyboardType="email-address"
              />

              <Pressable
                onPress={handleSendCode}
                disabled={!identity.trim() || loading}
                style={{
                  marginTop: 20,
                  paddingVertical: 16,
                  borderRadius: 16,
                  alignItems: "center",
                  backgroundColor: identity.trim() && !loading ? PRIMARY : "#fda4af",
                  shadowColor: PRIMARY,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: identity.trim() ? 0.28 : 0,
                  shadowRadius: 12,
                  elevation: identity.trim() ? 8 : 0,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                  {loading ? "Đang gửi..." : "Gửi mã xác thực"}
                </Text>
              </Pressable>
            </View>
          )}

          {/* ── Step 2: OTP ── */}
          {step === 2 && (
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: 6,
                }}
              >
                Nhập mã xác thực
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginBottom: 24,
                  lineHeight: 20,
                }}
              >
                Mã 6 số đã được gửi đến{"\n"}
                <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                  {identity}
                </Text>
              </Text>

              <OtpBoxes otp={otp} onChange={handleOtpChange} />

              {/* Resend */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 16,
                  marginBottom: 24,
                }}
              >
                <Text style={{ fontSize: 13, color: "#64748b" }}>
                  Chưa nhận được mã?
                </Text>
                <Pressable
                  onPress={() => { if (countdown === 0) setCountdown(45); }}
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
                    Gửi lại
                  </Text>
                </Pressable>
                {countdown > 0 && (
                  <Text style={{ fontSize: 12, color: PRIMARY, fontWeight: "600" }}>
                    {countdown} giây
                  </Text>
                )}
              </View>

              <Pressable
                onPress={handleVerifyOtp}
                disabled={!otpFilled}
                style={{
                  paddingVertical: 16,
                  borderRadius: 16,
                  alignItems: "center",
                  backgroundColor: otpFilled ? PRIMARY : "#cbd5e1",
                  shadowColor: PRIMARY,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: otpFilled ? 0.28 : 0,
                  shadowRadius: 10,
                  elevation: otpFilled ? 6 : 0,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                  Xác nhận
                </Text>
              </Pressable>
            </View>
          )}

          {/* ── Step 3: New Password ── */}
          {step === 3 && (
            <View>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(16,185,129,0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <ShieldCheck size={28} color="#10b981" />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: 6,
                  }}
                >
                  Tạo mật khẩu mới
                </Text>
                <Text
                  style={{ fontSize: 13, color: "#64748b", textAlign: "center" }}
                >
                  Mật khẩu mới phải khác với mật khẩu cũ.
                </Text>
              </View>

              {/* New password */}
              <Text style={fieldLabelStyle}>Mật khẩu mới</Text>
              <View style={{ marginBottom: 14 }}>
                <AuthInput
                  icon={<Lock size={17} color="#94a3b8" />}
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChangeText={setNewPassword}
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

              {/* Confirm password */}
              <Text style={fieldLabelStyle}>Xác nhận mật khẩu mới</Text>
              <View style={{ marginBottom: 8 }}>
                <AuthInput
                  icon={<Lock size={17} color="#94a3b8" />}
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPwd}
                  onChangeText={setConfirmPwd}
                  secureTextEntry={!showPwd}
                />
              </View>

              {confirmPwd.length > 0 && newPassword !== confirmPwd && (
                <Text
                  style={{
                    fontSize: 11,
                    color: "#ef4444",
                    marginBottom: 12,
                    marginLeft: 2,
                  }}
                >
                  Mật khẩu không khớp
                </Text>
              )}

              <Pressable
                onPress={handleResetPassword}
                disabled={!canReset || loading}
                style={{
                  marginTop: 12,
                  paddingVertical: 16,
                  borderRadius: 16,
                  alignItems: "center",
                  backgroundColor: canReset && !loading ? PRIMARY : "#fda4af",
                  shadowColor: PRIMARY,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: canReset ? 0.28 : 0,
                  shadowRadius: 12,
                  elevation: canReset ? 8 : 0,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                  {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* ── Back to login ── */}
        <Pressable
          onPress={() => router.replace("/(auth)/login")}
          style={{
            alignItems: "center",
            marginBottom: 32,
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <ChevronLeft size={16} color="#64748b" />
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#64748b" }}>
            Quay lại đăng nhập
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────

const fieldLabelStyle = {
  fontSize: 13,
  fontWeight: "600" as const,
  color: "#475569",
  marginBottom: 8,
};
