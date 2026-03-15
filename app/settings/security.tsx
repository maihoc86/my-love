// ============================================================
// Security Screen - MyLoveThaiHoc
// SCR-05.3 — stitch/b_o_m_t_mylovethaihoc/code.html
// ============================================================

import React, { memo, useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StatusBar,
  Switch,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ChevronRight,
  Fingerprint,
  KeyRound,
  Lock,
  LogOut,
  Monitor,
  Shield,
  ShieldAlert,
  Trash2,
} from "lucide-react-native";

// ─── Constants ───────────────────────────────────────────────

const PRIMARY = "#f43f5e";
const BG = "#f8f5f6";

// ─── SectionHeader ────────────────────────────────────────────

const SectionHeader = memo(function SectionHeader({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 1.2,
        marginBottom: 8,
        marginLeft: 4,
      }}
    >
      {title}
    </Text>
  );
});

// ─── ToggleRow ────────────────────────────────────────────────

const ToggleRow = memo(function ToggleRow({
  icon,
  label,
  sublabel,
  value,
  onValueChange,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: "rgba(244,63,94,0.08)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500", color: "#0f172a" }}>{label}</Text>
        {sublabel ? (
          <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{sublabel}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e2e8f0", true: "rgba(244,63,94,0.4)" }}
        thumbColor={value ? PRIMARY : "#f1f5f9"}
        ios_backgroundColor="#e2e8f0"
      />
    </View>
  );
});

// ─── NavRow ───────────────────────────────────────────────────

const NavRow = memo(function NavRow({
  icon,
  label,
  sublabel,
  onPress,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 12,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: danger ? "rgba(239,68,68,0.08)" : "rgba(244,63,94,0.08)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: danger ? "#ef4444" : "#0f172a",
          }}
        >
          {label}
        </Text>
        {sublabel ? (
          <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{sublabel}</Text>
        ) : null}
      </View>
      <ChevronRight size={16} color={danger ? "#ef4444" : "#cbd5e1"} />
    </Pressable>
  );
});

// ─── Divider ──────────────────────────────────────────────────

const Divider = () => (
  <View style={{ height: 1, backgroundColor: "#f1f5f9", marginLeft: 64 }} />
);

// ─── Card ─────────────────────────────────────────────────────

const Card = memo(function Card({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#f1f5f9",
      }}
    >
      {children}
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function SecurityScreen() {
  const router = useRouter();

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [otpEnabled, setOtpEnabled] = useState(false);

  const handleChangePassword = useCallback(() => {
    // TODO: Navigate to change password flow (OTP + new password)
    Alert.alert("Đổi mật khẩu", "Tính năng sẽ được cập nhật sớm.", [{ text: "OK" }]);
  }, []);

  const handleLogoutAllDevices = useCallback(() => {
    Alert.alert(
      "Đăng xuất tất cả thiết bị khác",
      "Tất cả phiên đăng nhập trên các thiết bị khác sẽ bị kết thúc. Bạn có chắc chắn?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: () => {
            // TODO: Supabase auth.admin.signOut(userId, "others")
            Alert.alert("Thành công", "Đã đăng xuất tất cả thiết bị khác.", [{ text: "OK" }]);
          },
        },
      ]
    );
  }, []);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

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
          Bảo mật
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Xác thực ── */}
        <View style={{ paddingHorizontal: 16, marginBottom: 6 }}>
          <SectionHeader title="Xác thực" />
        </View>
        <Card>
          <ToggleRow
            icon={<Fingerprint size={18} color={PRIMARY} />}
            label="Sinh trắc học"
            sublabel="Mở khoá bằng Face ID / Touch ID"
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
          />
          <Divider />
          <ToggleRow
            icon={<Shield size={18} color={PRIMARY} />}
            label="Xác thực 2 bước (OTP)"
            sublabel="Nhận mã OTP qua email mỗi lần đăng nhập"
            value={otpEnabled}
            onValueChange={setOtpEnabled}
          />
          <Divider />
          <NavRow
            icon={<KeyRound size={18} color={PRIMARY} />}
            label="Đổi mật khẩu"
            sublabel="Cập nhật mật khẩu đăng nhập"
            onPress={handleChangePassword}
          />
        </Card>

        {/* ── Phiên đăng nhập ── */}
        <View style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 6 }}>
          <SectionHeader title="Phiên đăng nhập" />
        </View>
        <Card>
          {/* Device card */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 14,
              paddingHorizontal: 16,
              gap: 12,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "rgba(244,63,94,0.08)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Monitor size={18} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ fontSize: 15, fontWeight: "500", color: "#0f172a" }}>
                  {Platform.OS === "ios" ? "iPhone" : "Android"} — Thiết bị này
                </Text>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    backgroundColor: "rgba(34,197,94,0.12)",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{ fontSize: 10, fontWeight: "700", color: "#16a34a", letterSpacing: 0.5 }}
                  >
                    ĐANG DÙNG
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                Đăng nhập lần cuối: hôm nay
              </Text>
            </View>
          </View>
          <Divider />
          {/* Logout all other devices */}
          <Pressable
            onPress={handleLogoutAllDevices}
            hitSlop={4}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 14,
              paddingHorizontal: 16,
              gap: 12,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "rgba(249,115,22,0.08)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogOut size={18} color="#f97316" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "500", color: "#f97316" }}>
                Đăng xuất tất cả thiết bị khác
              </Text>
              <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                Kết thúc tất cả phiên đăng nhập khác
              </Text>
            </View>
            <ChevronRight size={16} color="#f97316" />
          </Pressable>
        </Card>

        {/* ── Nguy hiểm ── */}
        <View style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 6 }}>
          <SectionHeader title="Vùng nguy hiểm" />
        </View>
        <Card>
          <NavRow
            icon={<ShieldAlert size={18} color="#ef4444" />}
            label="Xoá tài khoản"
            sublabel="Xoá vĩnh viễn tài khoản và toàn bộ dữ liệu"
            onPress={handleDeleteAccount}
            danger
          />
        </Card>

        {/* ── Info note ── */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 20,
            padding: 14,
            backgroundColor: "rgba(244,63,94,0.05)",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "rgba(244,63,94,0.1)",
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <Lock size={14} color={PRIMARY} style={{ marginTop: 1 }} />
          <Text style={{ flex: 1, fontSize: 12, color: "#64748b", lineHeight: 18 }}>
            Dữ liệu của bạn được mã hoá và bảo vệ. Chúng tôi không bao giờ chia sẻ thông tin cá
            nhân với bên thứ ba.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
