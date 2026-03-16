// ============================================================
// Settings Screen - AI Love
// Rebuilt v2.0 — based on stitch/c_i_t_ng_i_d_ng/code.html
// + BRD v2.0 + SRS v2.0 (FR-SET-001/002/003)
// ============================================================

import React, { memo, useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  Cake,
  ChevronRight,
  CloudUpload,
  Database,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  Image,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Pencil,
  Send,
  Shield,
  Sun,
  Trash2,
  User,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/theme";

// ─── Mock user data ───────────────────────────────────────────

const USER = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@gmail.com",
  phone: "0912 345 678",
  initial: "N",
  stats: {
    notes: 56,
    specialDates: 4,
    chats: 12,
  },
};

// ─── Reusable row components ──────────────────────────────────

/** Nav row — pressable, arrow on right */
const NavRow = memo(function NavRow({
  icon,
  iconBg,
  label,
  onPress,
  hasBorderTop = true,
  accessibilityLabel: a11yLabel,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  onPress?: () => void;
  hasBorderTop?: boolean;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={4} accessibilityLabel={a11yLabel ?? label} accessibilityRole="button">
      {({ pressed }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 13,
            minHeight: 48,
            gap: 14,
            backgroundColor: pressed ? "#f8fafc" : "transparent",
            borderTopWidth: hasBorderTop ? 1 : 0,
            borderTopColor: "#f8fafc",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: iconBg,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </View>
          <Text
            style={{ flex: 1, fontSize: 14, fontWeight: "500", color: Colors.textPrimary }}
          >
            {label}
          </Text>
          <ChevronRight size={16} color="#cbd5e1" />
        </View>
      )}
    </Pressable>
  );
});

/** Info row — static value on right */
const InfoRow = memo(function InfoRow({
  icon,
  iconBg,
  label,
  value,
  valueColor = Colors.primary,
  hasBorderTop = true,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
  hasBorderTop?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 13,
        gap: 14,
        borderTopWidth: hasBorderTop ? 1 : 0,
        borderTopColor: "#f8fafc",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: iconBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <Text
        style={{ flex: 1, fontSize: 14, fontWeight: "500", color: Colors.textPrimary }}
      >
        {label}
      </Text>
      <Text style={{ fontSize: 13, fontWeight: "600", color: valueColor }}>
        {value}
      </Text>
    </View>
  );
});

/** Toggle row — Switch on right */
const ToggleRow = memo(function ToggleRow({
  icon,
  iconBg,
  label,
  value,
  onValueChange,
  hasBorderTop = true,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  hasBorderTop?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12,
        minHeight: 48,
        gap: 14,
        borderTopWidth: hasBorderTop ? 1 : 0,
        borderTopColor: "#f8fafc",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: iconBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <Text
        style={{ flex: 1, fontSize: 14, fontWeight: "500", color: Colors.textPrimary }}
      >
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e2e8f0", true: "#FF6B8A" }}
        thumbColor={value ? Colors.primary : Colors.surfaceSecondary}
        accessibilityLabel={label}
        accessibilityRole="switch"
      />
    </View>
  );
});

/** Section wrapper */
const SettingsSection = memo(function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: Colors.textMuted,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          marginBottom: 10,
          paddingHorizontal: 4,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: Colors.surface,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: Colors.surfaceSecondary,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {children}
      </View>
    </View>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function SettingsScreen() {
  const router = useRouter();

  // Notification toggles
  const [notifySpecialDate, setNotifySpecialDate] = useState(true);
  const [notifyDailyTip, setNotifyDailyTip] = useState(true);
  const [notifyTelegram, setNotifyTelegram] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc muốn đăng xuất không?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: () => {
            // TODO: Supabase signOut + clear session
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  }, [router]);

  const handleClearCache = useCallback(() => {
    Alert.alert(
      "Xoá cache",
      "Xoá toàn bộ dữ liệu cache?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: () => {
            // TODO: clear AsyncStorage cache
          },
        },
      ]
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Card (gradient rose → purple) ── */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
          <View
            style={{
              borderRadius: 28,
              overflow: "hidden",
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            {/* Rose base */}
            <View
              style={{
                backgroundColor: Colors.primary,
                padding: 24,
              }}
            >
              {/* Purple overlay (simulate gradient) */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "55%",
                  height: "100%",
                  backgroundColor: Colors.aiPurpleDark,
                  opacity: 0.55,
                }}
              />

              {/* Top row: avatar + name + edit */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  {/* Avatar */}
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: Colors.whiteAlpha28,
                      borderWidth: 2,
                      borderColor: "rgba(255,255,255,0.5)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "800",
                        color: Colors.textOnPrimary,
                      }}
                    >
                      {USER.initial}
                    </Text>
                  </View>

                  {/* Name / contact */}
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "800",
                        color: Colors.textOnPrimary,
                      }}
                    >
                      {USER.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.8)",
                        marginTop: 2,
                      }}
                    >
                      {USER.email}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {USER.phone}
                    </Text>
                  </View>
                </View>

                {/* Edit button */}
                <Pressable
                  onPress={() => router.push("/settings/personal-info")}
                  hitSlop={8}
                  accessibilityLabel="Chỉnh sửa hồ sơ"
                  accessibilityRole="button"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: Colors.whiteAlpha20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pencil size={16} color={Colors.textOnPrimary} />
                </Pressable>
              </View>

              {/* Stats row */}
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(0,0,0,0.12)",
                  borderRadius: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "800",
                      color: Colors.textOnPrimary,
                      lineHeight: 22,
                    }}
                  >
                    {USER.stats.notes}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "700",
                      color: "rgba(255,255,255,0.75)",
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      marginTop: 2,
                    }}
                  >
                    Ghi chú
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "800",
                      color: Colors.textOnPrimary,
                      lineHeight: 22,
                    }}
                  >
                    {USER.stats.specialDates}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "700",
                      color: "rgba(255,255,255,0.75)",
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      marginTop: 2,
                    }}
                  >
                    Ngày đặc biệt
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "800",
                      color: Colors.textOnPrimary,
                      lineHeight: 22,
                    }}
                  >
                    {USER.stats.chats}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "700",
                      color: "rgba(255,255,255,0.75)",
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      marginTop: 2,
                    }}
                  >
                    Cuộc chat
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ── Sections ── */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>

          {/* Thông tin người yêu */}
          <SettingsSection title="Thông tin người yêu">
            <InfoRow
              icon={<User size={18} color={Colors.primaryGradientEnd} />}
              iconBg={Colors.backgroundSecondary}
              label="Tên gọi"
              value="Thái Học"
              hasBorderTop={false}
            />
            <InfoRow
              icon={<Cake size={18} color={Colors.aiPurpleLight} />}
              iconBg={Colors.aiPurpleAlpha15}
              label="Sinh nhật"
              value="15 tháng 8"
            />
            <InfoRow
              icon={<Heart size={18} color={Colors.warning} />}
              iconBg={Colors.warningAlpha15}
              label="Biệt danh"
              value="Em bé"
            />
            <InfoRow
              icon={<Image size={18} color={Colors.info} />}
              iconBg={Colors.infoAlpha15}
              label="Ảnh đại diện"
              value="Đã tải lên"
            />
            <Pressable
              onPress={() => router.push("/settings/partner-info")}
              hitSlop={4}
              accessibilityLabel="Chỉnh sửa thông tin người yêu"
              accessibilityRole="button"
            >
              {({ pressed }) => (
                <View
                  style={{
                    margin: 8,
                    marginTop: 6,
                    paddingVertical: 13,
                    borderRadius: 14,
                    alignItems: "center",
                    backgroundColor: pressed ? "#fee2e9" : "#fff1f4",
                  }}
                >
                  <Text
                    style={{ fontSize: 13, fontWeight: "700", color: Colors.primary }}
                  >
                    Chỉnh sửa thông tin người yêu
                  </Text>
                </View>
              )}
            </Pressable>
          </SettingsSection>

          {/* Tài khoản */}
          <SettingsSection title="Tài khoản">
            <NavRow
              icon={<User size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Thông tin cá nhân"
              onPress={() => router.push("/settings/personal-info")}
              hasBorderTop={false}
            />
            <NavRow
              icon={<Lock size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Đổi mật khẩu"
              onPress={() => router.push("/settings/security")}
            />
            <NavRow
              icon={<Shield size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Bảo mật"
              onPress={() => router.push("/settings/security")}
            />
            <NavRow
              icon={<CloudUpload size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Sao lưu & đồng bộ"
              onPress={() => router.push("/settings/backup")}
            />
          </SettingsSection>

          {/* Thông báo */}
          <SettingsSection title="Thông báo">
            <ToggleRow
              icon={<Bell size={18} color={Colors.primary} />}
              iconBg="#fff1f4"
              label="Nhắc nhở ngày đặc biệt"
              value={notifySpecialDate}
              onValueChange={setNotifySpecialDate}
              hasBorderTop={false}
            />
            <ToggleRow
              icon={<Sun size={18} color={Colors.primary} />}
              iconBg="#fff1f4"
              label="Gợi ý hàng ngày"
              value={notifyDailyTip}
              onValueChange={setNotifyDailyTip}
            />
            <ToggleRow
              icon={<Send size={18} color={Colors.primary} />}
              iconBg="#fff1f4"
              label="Thông báo Telegram"
              value={notifyTelegram}
              onValueChange={setNotifyTelegram}
            />
            <ToggleRow
              icon={<Mail size={18} color={Colors.primary} />}
              iconBg="#fff1f4"
              label="Thông báo Email"
              value={notifyEmail}
              onValueChange={setNotifyEmail}
            />
          </SettingsSection>

          {/* Chung */}
          <SettingsSection title="Chung">
            <InfoRow
              icon={<Sun size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Giao diện"
              value="Sáng"
              hasBorderTop={false}
            />
            <InfoRow
              icon={<Globe size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Ngôn ngữ"
              value="Tiếng Việt"
            />
            <InfoRow
              icon={<Database size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Bộ nhớ"
              value="124 MB"
              valueColor={Colors.textMuted}
            />
            <NavRow
              icon={<Trash2 size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Xoá dữ liệu cache"
              onPress={handleClearCache}
            />
          </SettingsSection>

          {/* Hỗ trợ */}
          <SettingsSection title="Hỗ trợ">
            <NavRow
              icon={<HelpCircle size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Trung tâm trợ giúp"
              hasBorderTop={false}
            />
            <NavRow
              icon={<MessageSquare size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Góp ý & phản hồi"
            />
            <NavRow
              icon={<FileText size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Chính sách bảo mật"
            />
            <NavRow
              icon={<FileText size={18} color={Colors.textSecondary} />}
              iconBg={Colors.surfaceSecondary}
              label="Điều khoản sử dụng"
            />
          </SettingsSection>

          {/* ── Footer brand card ── */}
          <View
            style={{
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 20,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primaryAlpha05,
                paddingVertical: 32,
                paddingHorizontal: 24,
                alignItems: "center",
                borderWidth: 1,
                borderColor: Colors.primaryAlpha10,
                borderRadius: 24,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "800" }}>
                <Text style={{ color: Colors.accent }}>AI</Text>
                {" "}
                <Text style={{ color: Colors.primary }}>Love</Text>
              </Text>
              <Text
                style={{ fontSize: 12, color: Colors.textMuted, marginTop: 4 }}
              >
                Phiên bản 2.0.0 (Build 2026)
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: Colors.textSecondary,
                  marginTop: 12,
                  fontStyle: "italic",
                }}
              >
                Yêu thương thông minh hơn mỗi ngày ✨
              </Text>
            </View>
          </View>

          {/* ── Logout button ── */}
          <Pressable onPress={handleLogout} hitSlop={4} accessibilityLabel="Đăng xuất" accessibilityRole="button">
            {({ pressed }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  minHeight: 48,
                  paddingVertical: 16,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: "rgba(255,45,85,0.25)",
                  backgroundColor: pressed ? "#fff1f4" : "transparent",
                }}
              >
                <LogOut size={18} color={Colors.primary} />
                <Text style={{ fontSize: 15, fontWeight: "700", color: Colors.primary }}>
                  Đăng xuất
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
