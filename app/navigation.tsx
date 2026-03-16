import React, { useState } from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/theme";
import {
  X,
  Navigation as NavIcon,
  MapPin,
  Car,
  Bike,
  Footprints,
  Share2,
  Clock,
  Route,
} from "lucide-react-native";

const TRANSPORT_MODES = [
  { key: "car", label: "Ô tô", icon: Car, time: "12 phút", distance: "3.2 km" },
  { key: "bike", label: "Xe máy", icon: Bike, time: "15 phút", distance: "3.0 km" },
  { key: "walk", label: "Đi bộ", icon: Footprints, time: "35 phút", distance: "2.8 km" },
];

export default function NavigationScreen() {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState("car");
  const currentMode = TRANSPORT_MODES.find((m) => m.key === activeMode)!;

  return (
    <View style={{ flex: 1, backgroundColor: "#e8f5e9" }}>
      <StatusBar barStyle="dark-content" />
      {/* Map Area */}
      <View style={{ flex: 1 }}>
        {/* Grid background */}
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
          {[...Array(12)].map((_, i) => (
            <View
              key={`h${i}`}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: Colors.textSecondary,
                top: `${(i + 1) * 8}%`,
              }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <View
              key={`v${i}`}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: Colors.textSecondary,
                left: `${(i + 1) * 12}%`,
              }}
            />
          ))}
        </View>

        {/* Route line placeholder */}
        <View
          style={{
            position: "absolute",
            top: "30%",
            left: "20%",
            width: "60%",
            height: 3,
            backgroundColor: Colors.info,
            borderRadius: 2,
            transform: [{ rotate: "25deg" }],
          }}
        />

        {/* Destination pin */}
        <View style={{ position: "absolute", top: "25%", right: "25%" }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary,
            }}
          >
            <MapPin size={16} color={Colors.textOnPrimary} />
          </View>
        </View>

        {/* User location */}
        <View style={{ position: "absolute", bottom: "40%", left: "25%" }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Colors.surface,
              backgroundColor: Colors.info,
            }}
          />
        </View>
      </View>

      {/* Close Button */}
      <SafeAreaView style={{ position: "absolute", top: 0, left: 0, right: 0 }} edges={["top"]}>
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel="Đóng"
            accessibilityRole="button"
            hitSlop={12}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.surface,
              shadowColor: Colors.textPrimary,
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <X size={20} color={Colors.textPrimary} />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Turn Instruction Card */}
      <View
        style={{
          position: "absolute",
          top: 96,
          left: 16,
          right: 16,
          backgroundColor: Colors.surface,
          borderRadius: 16,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: Colors.textPrimary,
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            backgroundColor: Colors.infoAlpha15,
          }}
        >
          <NavIcon size={20} color={Colors.info} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary }}>
            Rẽ phải vào đường Trần Hưng Đạo
          </Text>
          <Text style={{ fontSize: 12, color: Colors.textSecondary }}>trong 200m</Text>
        </View>
      </View>

      {/* Bottom Panel */}
      <SafeAreaView edges={["bottom"]}>
        <View
          style={{
            backgroundColor: Colors.surface,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
            shadowColor: Colors.textPrimary,
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Destination */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
                backgroundColor: Colors.primaryAlpha08,
              }}
            >
              <MapPin size={18} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>
                Phở Thìn Bờ Hồ
              </Text>
              <Text style={{ fontSize: 12, color: Colors.textSecondary }}>
                13 Lò Đúc, Hai Bà Trưng, Hà Nội
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: Colors.surfaceSecondary,
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Clock size={14} color={Colors.textSecondary} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  marginTop: 4,
                  color: Colors.textPrimary,
                }}
              >
                {currentMode.time}
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: Colors.border }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Route size={14} color={Colors.textSecondary} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  marginTop: 4,
                  color: Colors.textPrimary,
                }}
              >
                {currentMode.distance}
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: Colors.border }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <MapPin size={14} color={Colors.textSecondary} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  marginTop: 4,
                  color: Colors.textPrimary,
                }}
              >
                14:42
              </Text>
              <Text style={{ fontSize: 12, color: Colors.textSecondary }}>ETA</Text>
            </View>
          </View>

          {/* Transport Modes */}
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
            {TRANSPORT_MODES.map((mode) => {
              const Icon = mode.icon;
              const active = activeMode === mode.key;
              return (
                <Pressable
                  key={mode.key}
                  onPress={() => setActiveMode(mode.key)}
                  accessibilityLabel={mode.label}
                  accessibilityRole="button"
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    borderRadius: 12,
                    minHeight: 48,
                    backgroundColor: active ? Colors.infoAlpha15 : Colors.surfaceSecondary,
                    borderWidth: active ? 1.5 : 1,
                    borderColor: active ? Colors.info : Colors.border,
                  }}
                >
                  <Icon size={16} color={active ? Colors.info : Colors.textSecondary} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 6,
                      color: active ? Colors.info : Colors.textSecondary,
                    }}
                  >
                    {mode.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Actions */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              accessibilityLabel="Bắt đầu dẫn đường"
              accessibilityRole="button"
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                backgroundColor: Colors.info,
                minHeight: 48,
              }}
            >
              <Text
                style={{ color: Colors.textOnPrimary, fontWeight: "700", fontSize: 16 }}
              >
                Bắt đầu
              </Text>
            </Pressable>
            <Pressable
              accessibilityLabel="Chia sẻ"
              accessibilityRole="button"
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.surfaceSecondary,
              }}
            >
              <Share2 size={18} color={Colors.textSecondary} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
