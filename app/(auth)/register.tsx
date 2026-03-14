import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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

export default function RegisterScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpCountdown(120);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: "", color: "#e5e7eb" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, text: "Yếu", color: "#ef4444" };
    if (score <= 2) return { level: 2, text: "Trung bình", color: "#f97316" };
    if (score <= 3) return { level: 3, text: "Khá mạnh", color: "#eab308" };
    return { level: 4, text: "Rất mạnh", color: "#10b981" };
  };

  const strength = getPasswordStrength();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View
          className="flex-row items-center pt-14 pb-8 px-4"
          style={{ backgroundColor: "#f43f5e" }}
        >
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ChevronLeft size={22} color="#fff" />
          </Pressable>
          <View className="flex-1 items-center mr-10">
            <Heart size={28} color="#fff" fill="#fff" />
            <Text className="text-white font-bold text-lg mt-1">Đăng ký</Text>
          </View>
        </View>

        {/* Form */}
        <View className="px-6 -mt-4">
          <View className="bg-white rounded-3xl p-6 shadow-lg">
            <Text className="text-lg font-bold mb-1" style={{ color: "#1e1b2e" }}>
              Tạo tài khoản mới
            </Text>
            <Text className="text-sm mb-5" style={{ color: "#6b7280" }}>
              Bắt đầu lưu giữ kỉ niệm tuyệt vời!
            </Text>

            {/* Phone */}
            <Text
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#f43f5e" }}
            >
              Số điện thoại
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-3">
              <Phone size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-3.5 px-3 text-sm"
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#9ca3af"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            {/* Email */}
            <Text
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#f43f5e" }}
            >
              Email
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-4">
              <Mail size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-3.5 px-3 text-sm"
                placeholder="Nhập email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Send OTP */}
            {!otpSent ? (
              <Pressable
                className="py-3 rounded-xl items-center border mb-4"
                style={{
                  borderColor: "#f43f5e",
                  opacity: !phone ? 0.5 : 1,
                }}
                disabled={!phone}
                onPress={handleSendOtp}
              >
                <Text className="font-semibold text-sm" style={{ color: "#f43f5e" }}>
                  Gửi mã OTP
                </Text>
              </Pressable>
            ) : (
              <>
                {/* OTP Input */}
                <Text
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "#f43f5e" }}
                >
                  Mã xác thực OTP
                </Text>
                <View className="flex-row justify-between mb-2">
                  {otp.map((digit, idx) => (
                    <TextInput
                      key={idx}
                      ref={(ref) => {
                        otpRefs.current[idx] = ref;
                      }}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl"
                      style={{
                        backgroundColor: digit ? "#fff1f2" : "#f9fafb",
                        borderWidth: 2,
                        borderColor: digit ? "#f43f5e" : "#e5e7eb",
                        color: "#1e1b2e",
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      value={digit}
                      onChangeText={(val) => handleOtpChange(val, idx)}
                    />
                  ))}
                </View>
                <Text className="text-xs text-center mb-4" style={{ color: "#6b7280" }}>
                  {otpCountdown > 0
                    ? `Gửi lại mã (${formatCountdown(otpCountdown)})`
                    : ""}
                  {otpCountdown === 0 && otpSent && (
                    <Text
                      style={{ color: "#f43f5e" }}
                      onPress={() => setOtpCountdown(120)}
                    >
                      Gửi lại mã
                    </Text>
                  )}
                </Text>
              </>
            )}

            {/* Password */}
            <Text
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#f43f5e" }}
            >
              Mật khẩu
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-2">
              <Lock size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-3.5 px-3 text-sm"
                placeholder="Tạo mật khẩu"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={18} color="#9ca3af" />
                ) : (
                  <Eye size={18} color="#9ca3af" />
                )}
              </Pressable>
            </View>

            {/* Password Strength */}
            {password.length > 0 && (
              <View className="mb-3">
                <View className="flex-row gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <View
                      key={i}
                      className="flex-1 h-1 rounded-full"
                      style={{
                        backgroundColor:
                          i <= strength.level ? strength.color : "#e5e7eb",
                      }}
                    />
                  ))}
                </View>
                <Text className="text-xs" style={{ color: strength.color }}>
                  {strength.text}
                </Text>
              </View>
            )}

            {/* Confirm Password */}
            <Text
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#f43f5e" }}
            >
              Xác nhận mật khẩu
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-6">
              <Lock size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-3.5 px-3 text-sm"
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#9ca3af"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </View>

            {/* Register Button */}
            <Pressable
              className="py-4 rounded-xl items-center"
              style={{
                backgroundColor: "#f43f5e",
                opacity:
                  !phone || !password || password !== confirmPassword ? 0.5 : 1,
              }}
              disabled={!phone || !password || password !== confirmPassword || loading}
              onPress={handleRegister}
            >
              <Text className="text-white font-bold text-base">
                {loading ? "Đang xử lý..." : "Xác nhận và Đăng ký"}
              </Text>
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-xs text-gray-400">HOẶC</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Google */}
            <Pressable
              className="py-3.5 rounded-xl items-center border border-gray-200 bg-gray-50"
              onPress={() => {}}
            >
              <View className="flex-row items-center">
                <Text className="text-lg mr-2">G</Text>
                <Text className="font-semibold text-sm" style={{ color: "#1e1b2e" }}>
                  Đăng ký với Google
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center mt-6 mb-8">
            <Text className="text-sm" style={{ color: "#6b7280" }}>
              Đã có tài khoản?{" "}
            </Text>
            <Pressable onPress={() => router.back()}>
              <Text className="text-sm font-bold" style={{ color: "#f43f5e" }}>
                Đăng nhập
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
