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
  Lock,
  ChevronLeft,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react-native";

type Step = 1 | 2 | 3;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [newPassword, setNewPassword] = useState("");
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

  const handleSendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setOtpCountdown(45);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const code = otp.join("");
    if (code.length === 6) {
      setStep(3);
    }
  };

  const handleResetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(auth)/login");
    }, 1500);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const stepIndicator = (
    <View className="flex-row justify-center mb-6 gap-2">
      {[1, 2, 3].map((s) => (
        <View
          key={s}
          className="h-1.5 rounded-full"
          style={{
            width: s === step ? 32 : 16,
            backgroundColor: s <= step ? "#f43f5e" : "#e5e7eb",
          }}
        />
      ))}
    </View>
  );

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
            onPress={() => (step > 1 ? setStep((step - 1) as Step) : router.back())}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ChevronLeft size={22} color="#fff" />
          </Pressable>
          <View className="flex-1 items-center mr-10">
            <Lock size={28} color="#fff" />
            <Text className="text-white font-bold text-lg mt-1">
              Quên mật khẩu
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="px-6 -mt-4">
          <View className="bg-white rounded-3xl p-6 shadow-lg">
            {stepIndicator}

            {/* Step 1: Enter Phone/Email */}
            {step === 1 && (
              <>
                <View className="items-center mb-6">
                  <View
                    className="w-16 h-16 rounded-full items-center justify-center mb-3"
                    style={{ backgroundColor: "#fff1f2" }}
                  >
                    <ShieldCheck size={32} color="#f43f5e" />
                  </View>
                  <Text
                    className="text-base font-bold text-center"
                    style={{ color: "#1e1b2e" }}
                  >
                    Xác thực tài khoản
                  </Text>
                  <Text
                    className="text-sm text-center mt-1"
                    style={{ color: "#6b7280" }}
                  >
                    Nhập số điện thoại hoặc email đã đăng ký
                  </Text>
                </View>

                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-4">
                  <Phone size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 py-4 px-3 text-sm"
                    placeholder="Số điện thoại hoặc email"
                    placeholderTextColor="#9ca3af"
                    value={phoneOrEmail}
                    onChangeText={setPhoneOrEmail}
                    autoCapitalize="none"
                  />
                </View>

                <Pressable
                  className="py-4 rounded-xl items-center"
                  style={{
                    backgroundColor: "#f43f5e",
                    opacity: !phoneOrEmail ? 0.5 : 1,
                  }}
                  disabled={!phoneOrEmail || loading}
                  onPress={handleSendCode}
                >
                  <Text className="text-white font-bold text-base">
                    {loading ? "Đang gửi..." : "Gửi mã xác thực"}
                  </Text>
                </Pressable>
              </>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <>
                <View className="items-center mb-6">
                  <Text
                    className="text-base font-bold text-center"
                    style={{ color: "#1e1b2e" }}
                  >
                    Nhập mã xác thực
                  </Text>
                  <Text
                    className="text-sm text-center mt-1"
                    style={{ color: "#6b7280" }}
                  >
                    Mã OTP đã được gửi đến {phoneOrEmail}
                  </Text>
                </View>

                <View className="flex-row justify-between mb-3 px-2">
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
                    ? `Gửi lại sau ${otpCountdown} giây`
                    : ""}
                  {otpCountdown === 0 && (
                    <Text
                      style={{ color: "#f43f5e" }}
                      onPress={() => setOtpCountdown(45)}
                    >
                      {" "}
                      Gửi lại mã
                    </Text>
                  )}
                </Text>

                <Pressable
                  className="py-4 rounded-xl items-center"
                  style={{
                    backgroundColor:
                      otp.join("").length === 6 ? "#f43f5e" : "#d1d5db",
                  }}
                  disabled={otp.join("").length !== 6}
                  onPress={handleVerifyOtp}
                >
                  <Text className="text-white font-bold text-base">Xác nhận</Text>
                </Pressable>
              </>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <>
                <View className="items-center mb-6">
                  <Text
                    className="text-base font-bold text-center"
                    style={{ color: "#1e1b2e" }}
                  >
                    Đặt lại mật khẩu
                  </Text>
                  <Text
                    className="text-sm text-center mt-1"
                    style={{ color: "#6b7280" }}
                  >
                    Tạo mật khẩu mới cho tài khoản của bạn
                  </Text>
                </View>

                <Text
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "#f43f5e" }}
                >
                  Mật khẩu mới
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-3">
                  <Lock size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 py-3.5 px-3 text-sm"
                    placeholder="Nhập mật khẩu mới"
                    placeholderTextColor="#9ca3af"
                    value={newPassword}
                    onChangeText={setNewPassword}
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
                    placeholder="Nhập lại mật khẩu mới"
                    placeholderTextColor="#9ca3af"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                  />
                </View>

                <Pressable
                  className="py-4 rounded-xl items-center"
                  style={{
                    backgroundColor: "#f43f5e",
                    opacity:
                      !newPassword || newPassword !== confirmPassword ? 0.5 : 1,
                  }}
                  disabled={
                    !newPassword || newPassword !== confirmPassword || loading
                  }
                  onPress={handleResetPassword}
                >
                  <Text className="text-white font-bold text-base">
                    {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                  </Text>
                </Pressable>
              </>
            )}
          </View>

          {/* Back to Login */}
          <Pressable className="items-center mt-6 mb-8" onPress={() => router.back()}>
            <Text className="text-sm font-medium" style={{ color: "#f43f5e" }}>
              ← Quay lại đăng nhập
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
