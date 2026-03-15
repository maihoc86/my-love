// ============================================================
// Personal Info Screen - MyLoveThaiHoc
// SCR-05.2 — stitch/th_ng_tin_c_nh_n_mylovethaihoc/code.html
// ============================================================

import React, { memo, useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  StatusBar,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, User } from "lucide-react-native";

// ─── Constants ───────────────────────────────────────────────

const PRIMARY = "#f43f5e";
const BG = "#f8f5f6";

// ─── FieldInput ───────────────────────────────────────────────

const FieldInput = memo(function FieldInput({
  label,
  value,
  onChangeText,
  isEditing,
  keyboardType,
  readonly = false,
}: {
  label: string;
  value: string;
  onChangeText?: (v: string) => void;
  isEditing: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  readonly?: boolean;
}) {
  const editable = isEditing && !readonly;
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "700",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1.2,
          marginBottom: 6,
          marginLeft: 2,
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          paddingHorizontal: editable ? 14 : 2,
          paddingVertical: editable ? 13 : 10,
          fontSize: 15,
          fontWeight: "500",
          color: "#0f172a",
          backgroundColor: editable ? "#f8fafc" : "transparent",
          borderRadius: 14,
          borderWidth: editable ? 1.5 : 0,
          borderColor: editable ? PRIMARY : "transparent",
        }}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize="none"
      />
      {/* Divider shown only in readonly mode */}
      {!editable && !readonly && (
        <View style={{ height: 1, backgroundColor: "#f1f5f9", marginTop: 2 }} />
      )}
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function PersonalInfoScreen() {
  const router = useRouter();

  // Original values (for cancel revert)
  const original = {
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0912 345 678",
    joinDate: "15/03/2025",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(original.fullName);
  const [email, setEmail] = useState(original.email);
  const [phone, setPhone] = useState(original.phone);

  // Animated bottom save button
  const slideAnim = useRef(new Animated.Value(80)).current;

  const showSaveBtn = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
  }, [slideAnim]);

  const hideSaveBtn = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 80,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
  }, [slideAnim]);

  const handleToggleEdit = useCallback(() => {
    if (isEditing) {
      // Cancel — revert
      setFullName(original.fullName);
      setEmail(original.email);
      setPhone(original.phone);
      setIsEditing(false);
      hideSaveBtn();
    } else {
      setIsEditing(true);
      showSaveBtn();
    }
  }, [isEditing, hideSaveBtn, showSaveBtn]);

  const handleSave = useCallback(() => {
    // TODO: PATCH Supabase auth.updateUser({ data: { full_name: fullName }, phone })
    Alert.alert("Đã lưu!", "Thông tin cá nhân đã được cập nhật.", [
      {
        text: "OK",
        onPress: () => {
          setIsEditing(false);
          hideSaveBtn();
        },
      },
    ]);
  }, [fullName, phone, hideSaveBtn]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* ── Header ── */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 13,
            backgroundColor: "rgba(248,245,246,0.95)",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(244,63,94,0.08)",
          }}
        >
          <Pressable onPress={() => router.back()} hitSlop={10} style={{ width: 40 }}>
            <ArrowLeft size={22} color="#0f172a" />
          </Pressable>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 17,
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Thông tin cá nhân
          </Text>
          <Pressable onPress={handleToggleEdit} hitSlop={10} style={{ width: 56, alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isEditing ? "#64748b" : PRIMARY,
              }}
            >
              {isEditing ? "Hủy" : "Chỉnh sửa"}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Profile Hero Card (gradient rose→purple) ── */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}>
            <View
              style={{
                borderRadius: 20,
                overflow: "hidden",
                shadowColor: PRIMARY,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 14,
                elevation: 6,
              }}
            >
              <View
                style={{ backgroundColor: PRIMARY, padding: 28, alignItems: "center" }}
              >
                {/* Purple gradient overlay */}
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "55%",
                    height: "100%",
                    backgroundColor: "#a855f7",
                    opacity: 0.5,
                  }}
                />

                {/* Avatar */}
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: "rgba(255,255,255,0.25)",
                    borderWidth: 3,
                    borderColor: "rgba(255,255,255,0.4)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    overflow: "hidden",
                  }}
                >
                  <User size={36} color="#fff" />
                </View>

                <Text style={{ fontSize: 18, fontWeight: "800", color: "#fff" }}>
                  {fullName}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 4,
                  }}
                >
                  {email}
                </Text>
              </View>
            </View>
          </View>

          {/* ── Form ── */}
          <View
            style={{
              marginHorizontal: 16,
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
              borderWidth: 1,
              borderColor: "#f1f5f9",
            }}
          >
            <FieldInput
              label="Họ và tên"
              value={fullName}
              onChangeText={setFullName}
              isEditing={isEditing}
            />
            <FieldInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              isEditing={isEditing}
              keyboardType="email-address"
            />
            <FieldInput
              label="Số điện thoại"
              value={phone}
              onChangeText={setPhone}
              isEditing={isEditing}
              keyboardType="phone-pad"
            />
            {/* Join date — always readonly */}
            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  marginBottom: 6,
                  marginLeft: 2,
                }}
              >
                Ngày tham gia
              </Text>
              <Text
                style={{
                  paddingHorizontal: 2,
                  paddingVertical: 10,
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#64748b",
                }}
              >
                {original.joinDate}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* ── Animated Save Button (slide from bottom) ── */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            paddingBottom: Platform.OS === "ios" ? 28 : 20,
            backgroundColor: "rgba(255,255,255,0.92)",
            borderTopWidth: 1,
            borderTopColor: "#f1f5f9",
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => ({
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: "center",
              backgroundColor: PRIMARY,
              opacity: pressed ? 0.88 : 1,
              shadowColor: PRIMARY,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 6,
            })}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
              Lưu thay đổi
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
