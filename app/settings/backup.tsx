// ============================================================
// Backup & Sync Screen - MyLoveThaiHoc
// SCR-05.4 — stitch/sao_l_u_ng_b_mylovethaihoc/code.html
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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Cloud,
  CloudDownload,
  CloudUpload,
  RefreshCw,
  Trash2,
  WifiOff,
} from "lucide-react-native";

// ─── Constants ───────────────────────────────────────────────

import { Colors } from "@/theme";

// ─── SectionHeader ────────────────────────────────────────────

const SectionHeader = memo(function SectionHeader({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: "700",
        color: Colors.textTertiary,
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

// ─── Card ─────────────────────────────────────────────────────

const Card = memo(function Card({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        backgroundColor: Colors.surface,
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

// ─── Divider ──────────────────────────────────────────────────

const Divider = () => (
  <View style={{ height: 1, backgroundColor: "#f1f5f9", marginLeft: 64 }} />
);

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
          backgroundColor: Colors.primaryAlpha08,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500", color: "#0f172a" }}>{label}</Text>
        {sublabel ? (
          <Text style={{ fontSize: 12, color: Colors.textTertiary, marginTop: 2 }}>{sublabel}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e2e8f0", true: "rgba(244,63,94,0.4)" }}
        thumbColor={value ? Colors.primary : "#f1f5f9"}
        ios_backgroundColor="#e2e8f0"
      />
    </View>
  );
});

// ─── ActionRow ────────────────────────────────────────────────

const ActionRow = memo(function ActionRow({
  icon,
  label,
  sublabel,
  onPress,
  loading = false,
  danger = false,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onPress: () => void;
  loading?: boolean;
  danger?: boolean;
  accent?: string;
}) {
  const color = danger ? Colors.error : accent ?? Colors.primary;
  return (
    <Pressable onPress={onPress} disabled={loading} hitSlop={4}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 14,
            paddingHorizontal: 16,
            gap: 12,
            opacity: pressed || loading ? 0.7 : 1,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: danger
                ? "rgba(239,68,68,0.08)"
                : accent
                ? `${accent}14`
                : Colors.primaryAlpha08,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "500", color }}>{label}</Text>
            {sublabel ? (
              <Text style={{ fontSize: 12, color: Colors.textTertiary, marginTop: 2 }}>{sublabel}</Text>
            ) : null}
          </View>
          {loading ? (
            <ActivityIndicator size="small" color={color} />
          ) : (
            <ChevronRight size={16} color={danger ? Colors.error : "#cbd5e1"} />
          )}
        </View>
      )}
    </Pressable>
  );
});

// ─── Main Screen ─────────────────────────────────────────────

export default function BackupScreen() {
  const router = useRouter();

  const [autoBackup, setAutoBackup] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  // Mock last backup info
  const lastBackup = "15/03/2026, 08:42";
  const backupSize = "2.3 MB";

  const handleManualBackup = useCallback(() => {
    setIsBackingUp(true);
    // TODO: Supabase storage upload — serialize all user data to JSON and upload
    setTimeout(() => {
      setIsBackingUp(false);
      Alert.alert("Sao lưu thành công", "Dữ liệu đã được sao lưu lên đám mây.", [
        { text: "OK" },
      ]);
    }, 2000);
  }, []);

  const handleRestore = useCallback(() => {
    Alert.alert(
      "Khôi phục dữ liệu",
      "Dữ liệu hiện tại sẽ bị ghi đè bởi bản sao lưu. Bạn có chắc chắn?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Khôi phục",
          onPress: () => {
            setIsRestoring(true);
            // TODO: Supabase storage download + restore
            setTimeout(() => {
              setIsRestoring(false);
              Alert.alert("Khôi phục thành công", "Dữ liệu đã được khôi phục.", [
                { text: "OK" },
              ]);
            }, 2000);
          },
        },
      ]
    );
  }, []);

  const handleClearBackup = useCallback(() => {
    Alert.alert(
      "Xoá bản sao lưu",
      "Toàn bộ dữ liệu sao lưu trên đám mây sẽ bị xoá vĩnh viễn. Bạn có chắc chắn?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: () => {
            // TODO: Supabase storage delete
            Alert.alert("Đã xoá", "Bản sao lưu đã bị xoá.", [{ text: "OK" }]);
          },
        },
      ]
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
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
          Sao lưu & Đồng bộ
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Status Card ── */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <View
            style={{
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: Colors.primary,
              padding: 20,
            }}
          >
            {/* Purple overlay */}
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "50%",
                height: "100%",
                backgroundColor: "#9333ea",
                opacity: 0.45,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cloud size={24} color={Colors.surface} />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.surface }}>
                  Đám mây MyLove
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <CheckCircle size={12} color="rgba(255,255,255,0.8)" />
                  <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                    Đã đồng bộ · {lastBackup}
                  </Text>
                </View>
              </View>
            </View>
            {/* Stats row */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  padding: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "800", color: Colors.surface }}>{backupSize}</Text>
                <Text style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                  Dung lượng
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  padding: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "800", color: Colors.surface }}>Tự động</Text>
                <Text style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                  Chế độ
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Cài đặt sao lưu ── */}
        <View style={{ paddingHorizontal: 16, marginBottom: 6 }}>
          <SectionHeader title="Cài đặt sao lưu" />
        </View>
        <Card>
          <ToggleRow
            icon={<RefreshCw size={18} color={Colors.primary} />}
            label="Tự động sao lưu"
            sublabel="Sao lưu hàng ngày lúc 2:00 AM"
            value={autoBackup}
            onValueChange={setAutoBackup}
          />
          <Divider />
          <ToggleRow
            icon={<WifiOff size={18} color={Colors.primary} />}
            label="Chỉ dùng Wi-Fi"
            sublabel="Không sao lưu khi dùng dữ liệu di động"
            value={wifiOnly}
            onValueChange={setWifiOnly}
          />
        </Card>

        {/* ── Thao tác ── */}
        <View style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 6 }}>
          <SectionHeader title="Thao tác" />
        </View>
        <Card>
          <ActionRow
            icon={<CloudUpload size={18} color={Colors.primary} />}
            label="Sao lưu ngay"
            sublabel="Tải dữ liệu hiện tại lên đám mây"
            onPress={handleManualBackup}
            loading={isBackingUp}
          />
          <Divider />
          <ActionRow
            icon={<CloudDownload size={18} color={Colors.info} />}
            label="Khôi phục dữ liệu"
            sublabel="Tải về và ghi đè dữ liệu từ bản sao lưu"
            onPress={handleRestore}
            loading={isRestoring}
            accent={Colors.info}
          />
        </Card>

        {/* ── Nguy hiểm ── */}
        <View style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 6 }}>
          <SectionHeader title="Vùng nguy hiểm" />
        </View>
        <Card>
          <ActionRow
            icon={<Trash2 size={18} color={Colors.error} />}
            label="Xoá toàn bộ bản sao lưu"
            sublabel="Xoá vĩnh viễn dữ liệu trên đám mây"
            onPress={handleClearBackup}
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
          <Cloud size={14} color={Colors.primary} style={{ marginTop: 1 }} />
          <Text style={{ flex: 1, fontSize: 12, color: "#64748b", lineHeight: 18 }}>
            Dữ liệu sao lưu được mã hoá và lưu trữ an toàn trên Supabase Storage. Bạn có thể khôi
            phục bất kỳ lúc nào chỉ với một lần chạm.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
