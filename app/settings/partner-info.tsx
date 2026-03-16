// ============================================================
// Partner Info Screen - AI Love
// SCR-05.1 — stitch/ch_nh_s_a_th_ng_tin_ng_i_y_u/code.html
// ============================================================

import React, { memo, useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Camera,
  Cake,
  Heart,
  Phone,
  User,
  AlignLeft,
} from "lucide-react-native";

// ─── Constants ───────────────────────────────────────────────

import { Colors } from "@/theme";

// ─── FieldRow ─────────────────────────────────────────────────

const FieldRow = memo(function FieldRow({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  readonly = false,
  multiline = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "phone-pad";
  readonly?: boolean;
  multiline?: boolean;
}) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: "#475569",
          marginBottom: 8,
          marginLeft: 2,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: multiline ? "column" : "row",
          alignItems: multiline ? "flex-start" : "center",
          backgroundColor: "#f8fafc",
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: readonly ? "#f1f5f9" : Colors.primaryAlpha15,
          paddingHorizontal: 14,
          paddingVertical: multiline ? 12 : 0,
          gap: multiline ? 8 : 10,
        }}
      >
        {!multiline && (
          <View style={{ paddingVertical: 14 }}>{icon}</View>
        )}
        {multiline && icon}
        <TextInput
          style={{
            flex: 1,
            paddingVertical: multiline ? 0 : 14,
            fontSize: 15,
            color: "#0f172a",
            minHeight: multiline ? 80 : undefined,
            textAlignVertical: multiline ? "top" : "center",
            width: "100%",
          }}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType ?? "default"}
          editable={!readonly}
          multiline={multiline}
        />
        {readonly && (
          <View style={{ paddingVertical: 14 }}>
            <Cake size={16} color="#cbd5e1" />
          </View>
        )}
      </View>
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function PartnerInfoScreen() {
  const router = useRouter();

  const [name, setName] = useState("Thái Học");
  const [nickname, setNickname] = useState("Em bé");
  const [birthday, setBirthday] = useState("15/08/2000");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const handleSave = useCallback(() => {
    // TODO: PUT /auth/v1/user — update lover_name, lover_nickname, lover_birthday
    Alert.alert("Đã lưu!", "Thông tin người yêu đã được cập nhật.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  }, [router]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      "Xoá tài khoản",
      "Toàn bộ dữ liệu sẽ bị xoá vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá tài khoản",
          style: "destructive",
          onPress: () => {
            // TODO: Supabase auth.admin.deleteUser()
          },
        },
      ]
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
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
            backgroundColor: Colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: Colors.primaryAlpha08,
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
            Thông tin người yêu
          </Text>
          <Pressable onPress={handleSave} hitSlop={10} style={{ width: 40, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: Colors.primary }}>
              Lưu
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Avatar ── */}
          <View style={{ alignItems: "center", marginTop: 28, marginBottom: 32 }}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: "rgba(255,45,85,0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: Colors.surface,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <User size={40} color="rgba(255,45,85,0.4)" />
              </View>
              {/* Camera overlay */}
              <Pressable
                hitSlop={6}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: Colors.surface,
                  borderWidth: 1,
                  borderColor: "#f1f5f9",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                {/* TODO: expo-image-picker */}
                <Camera size={15} color="#64748b" />
              </Pressable>
            </View>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: Colors.textTertiary,
                textTransform: "uppercase",
                letterSpacing: 0.8,
                marginTop: 10,
              }}
            >
              Chạm để thay đổi ảnh
            </Text>
          </View>

          {/* ── Form ── */}
          <View
            style={{
              marginHorizontal: 16,
              backgroundColor: Colors.surface,
              borderRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <FieldRow
              label="Tên gọi"
              icon={<User size={18} color={Colors.textTertiary} />}
              value={name}
              onChangeText={setName}
              placeholder="Thái Học"
            />
            <FieldRow
              label="Biệt danh"
              icon={<Heart size={18} color={Colors.textTertiary} />}
              value={nickname}
              onChangeText={setNickname}
              placeholder="Em bé"
            />
            <FieldRow
              label="Sinh nhật"
              icon={<Cake size={18} color={Colors.primary} />}
              value={birthday}
              placeholder="dd/mm/yyyy"
              keyboardType="phone-pad"
              readonly
            />
            <FieldRow
              label="Số điện thoại"
              icon={<Phone size={18} color={Colors.textTertiary} />}
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
            />
            <FieldRow
              label="Ghi chú"
              icon={<AlignLeft size={18} color={Colors.textTertiary} />}
              value={note}
              onChangeText={setNote}
              placeholder="Thêm ghi chú về em..."
              multiline
            />
          </View>

          {/* ── Save Button ── */}
          <View style={{ marginHorizontal: 16, marginTop: 28 }}>
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => ({
                paddingVertical: 16,
                borderRadius: 14,
                alignItems: "center",
                backgroundColor: Colors.primary,
                opacity: pressed ? 0.88 : 1,
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              })}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textOnPrimary }}>
                Lưu thay đổi
              </Text>
            </Pressable>

            {/* Delete Account */}
            <Pressable
              onPress={handleDeleteAccount}
              hitSlop={8}
              style={{ alignItems: "center", marginTop: 20, paddingVertical: 8 }}
            >
              <Text style={{ fontSize: 13, color: Colors.error, fontWeight: "500" }}>
                Xoá tài khoản
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
