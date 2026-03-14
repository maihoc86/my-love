import React, { useState } from "react";
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
import { Heart, Phone, Lock, Eye, EyeOff, Mail } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Implement Supabase auth
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1000);
  };

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
        {/* Gradient Header */}
        <View
          className="items-center pt-16 pb-12 rounded-b-3xl"
          style={{
            backgroundColor: "#f43f5e",
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <Heart size={40} color="#fff" fill="#fff" />
          </View>
          <Text className="text-white text-2xl font-extrabold">
            MyLoveThaiHoc
          </Text>
          <Text className="text-white/80 text-sm mt-1">
            Ghi nhớ mọi điều về em 💕
          </Text>
        </View>

        {/* Form Card */}
        <View className="px-6 -mt-6">
          <View className="bg-white rounded-3xl p-6 shadow-lg">
            <Text className="text-xl font-bold mb-1" style={{ color: "#1e1b2e" }}>
              Đăng nhập
            </Text>
            <Text className="text-sm mb-6" style={{ color: "#6b7280" }}>
              Chào mừng bạn quay trở lại!
            </Text>

            {/* Phone/Email Input */}
            <Text
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#f43f5e" }}
            >
              Số điện thoại hoặc Email
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-4">
              <Phone size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-4 px-3 text-sm"
                placeholder="Nhập số điện thoại hoặc email"
                placeholderTextColor="#9ca3af"
                value={phoneOrEmail}
                onChangeText={setPhoneOrEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <Text
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#f43f5e" }}
            >
              Mật khẩu
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 mb-2">
              <Lock size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 py-4 px-3 text-sm"
                placeholder="Nhập mật khẩu"
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

            {/* Forgot Password */}
            <Pressable
              className="self-end mb-6"
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text className="text-xs font-medium" style={{ color: "#f43f5e" }}>
                Quên mật khẩu?
              </Text>
            </Pressable>

            {/* Login Button */}
            <Pressable
              className="py-4 rounded-xl items-center mb-4"
              style={{
                backgroundColor: loading ? "#fda4af" : "#f43f5e",
                opacity: !phoneOrEmail || !password ? 0.5 : 1,
              }}
              disabled={!phoneOrEmail || !password || loading}
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-base">
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Text>
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-xs text-gray-400">HOẶC</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* OTP Button */}
            <Pressable
              className="py-3.5 rounded-xl items-center border mb-3"
              style={{ borderColor: "#f43f5e" }}
              onPress={() => {}}
            >
              <View className="flex-row items-center">
                <Mail size={18} color="#f43f5e" />
                <Text
                  className="font-semibold text-sm ml-2"
                  style={{ color: "#f43f5e" }}
                >
                  Đăng nhập bằng mã OTP
                </Text>
              </View>
            </Pressable>

            {/* Google Button */}
            <Pressable
              className="py-3.5 rounded-xl items-center border border-gray-200 bg-gray-50"
              onPress={() => {}}
            >
              <View className="flex-row items-center">
                <Text className="text-lg mr-2">G</Text>
                <Text className="font-semibold text-sm" style={{ color: "#1e1b2e" }}>
                  Tiếp tục với Google
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center mt-6 mb-8">
            <Text className="text-sm" style={{ color: "#6b7280" }}>
              Chưa có tài khoản?{" "}
            </Text>
            <Pressable onPress={() => router.push("/(auth)/register")}>
              <Text className="text-sm font-bold" style={{ color: "#f43f5e" }}>
                Đăng ký
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
