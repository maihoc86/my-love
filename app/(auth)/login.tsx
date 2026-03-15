// ============================================================
// Login Screen - MyLoveThaiHoc
// Rebuilt v2.0 — based on stitch/ng_nh_p_mylovethaihoc/code.html
// + BRD v2.0 Epic 4 + SRS FR-AUTH-001/002/003
// ============================================================

import React, { useState, useCallback } from "react";
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
import { Heart, Phone, Lock, Eye, EyeOff, MessageSquare } from "lucide-react-native";

// ─── Constants ───────────────────────────────────────────────

const PRIMARY = "#f43f5e";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HERO_HEIGHT = SCREEN_HEIGHT * 0.38;

// ─── Google SVG Icon (inline) ────────────────────────────────

function GoogleIcon() {
  // Rendered as colored text circles — no SVG dep needed
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

export default function LoginScreen() {
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const canLogin = identity.trim().length > 0 && password.length >= 6;

  const handleLogin = useCallback(async () => {
    if (!canLogin || loading) return;
    setLoading(true);
    // TODO: Supabase signIn (email/phone + password)
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1000);
  }, [canLogin, loading, router]);

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
        {/* ── Hero Section ── */}
        <View
          style={{
            height: HERO_HEIGHT,
            backgroundColor: PRIMARY,
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

          {/* Brand */}
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <Heart size={36} color="#fff" fill="#fff" />
          </View>
          <Text
            style={{
              color: "#fff",
              fontSize: 26,
              fontWeight: "800",
              letterSpacing: -0.5,
            }}
          >
            MyLoveThaiHoc
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              fontWeight: "500",
              marginTop: 4,
            }}
          >
            Ghi nhớ mọi điều về em 💕
          </Text>
        </View>

        {/* ── Form Card (lifted over hero) ── */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: -28,
            backgroundColor: "#fff",
            borderRadius: 28,
            padding: 28,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.12,
            shadowRadius: 24,
            elevation: 16,
            marginBottom: 32,
          }}
        >
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
          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 0.6,
              marginBottom: 8,
            }}
          >
            Số điện thoại / Email
          </Text>
          <AuthInput
            icon={<Phone size={18} color="#94a3b8" />}
            placeholder="0912 345 678"
            value={identity}
            onChangeText={setIdentity}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 0.6,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            Mật khẩu
          </Text>
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
              style={{ fontSize: 13, fontWeight: "600", color: PRIMARY }}
            >
              Quên mật khẩu?
            </Text>
          </Pressable>

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            disabled={!canLogin || loading}
            style={{
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              backgroundColor: canLogin && !loading ? PRIMARY : "#fda4af",
              shadowColor: PRIMARY,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: canLogin ? 0.3 : 0,
              shadowRadius: 12,
              elevation: canLogin ? 8 : 0,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 24,
            }}
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

          {/* OTP Login */}
          <Pressable
            onPress={() => {}}
            style={{
              paddingVertical: 14,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: PRIMARY,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <MessageSquare size={18} color={PRIMARY} />
            <Text
              style={{ fontSize: 14, fontWeight: "700", color: PRIMARY }}
            >
              Đăng nhập bằng mã OTP
            </Text>
          </Pressable>

          {/* Google Login */}
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
            }}
          >
            <GoogleIcon />
            <Text
              style={{ fontSize: 14, fontWeight: "600", color: "#334155" }}
            >
              Tiếp tục với Google
            </Text>
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
            <Pressable onPress={() => router.push("/(auth)/register")} hitSlop={6}>
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: PRIMARY }}
              >
                Đăng ký
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
