import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
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
    <View className="flex-1" style={{ backgroundColor: "#e8f5e9" }}>
      {/* Map Area */}
      <View className="flex-1">
        {/* Grid background */}
        <View className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <View
              key={`h${i}`}
              className="absolute left-0 right-0 h-px bg-gray-500"
              style={{ top: `${(i + 1) * 8}%` }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <View
              key={`v${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-500"
              style={{ left: `${(i + 1) * 12}%` }}
            />
          ))}
        </View>

        {/* Route line placeholder */}
        <View
          className="absolute"
          style={{
            top: "30%",
            left: "20%",
            width: "60%",
            height: 3,
            backgroundColor: "#3b82f6",
            borderRadius: 2,
            transform: [{ rotate: "25deg" }],
          }}
        />

        {/* Destination pin */}
        <View className="absolute" style={{ top: "25%", right: "25%" }}>
          <View
            className="w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: "#f43f5e" }}
          >
            <MapPin size={16} color="#fff" />
          </View>
        </View>

        {/* User location */}
        <View className="absolute" style={{ bottom: "40%", left: "25%" }}>
          <View
            className="w-5 h-5 rounded-full border-2 border-white"
            style={{ backgroundColor: "#3b82f6" }}
          />
        </View>
      </View>

      {/* Close Button */}
      <SafeAreaView className="absolute top-0 left-0 right-0">
        <View className="px-4 pt-2">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center bg-white"
            style={{ shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 }}
          >
            <X size={20} color="#1e1b2e" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Turn Instruction Card */}
      <View
        className="absolute top-24 left-4 right-4 bg-white rounded-2xl p-4 flex-row items-center"
        style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}
      >
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: "#eff6ff" }}
        >
          <NavIcon size={20} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-bold" style={{ color: "#1e1b2e" }}>
            Rẽ phải vào đường Trần Hưng Đạo
          </Text>
          <Text className="text-xs" style={{ color: "#6b7280" }}>
            trong 200m
          </Text>
        </View>
      </View>

      {/* Bottom Panel */}
      <SafeAreaView edges={["bottom"]}>
        <View
          className="bg-white rounded-t-3xl px-4 pt-4 pb-6"
          style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 }}
        >
          {/* Destination */}
          <View className="flex-row items-center mb-4">
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: "#fff1f2" }}
            >
              <MapPin size={18} color="#f43f5e" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold" style={{ color: "#1e1b2e" }}>
                Phở Thìn Bờ Hồ
              </Text>
              <Text className="text-xs" style={{ color: "#6b7280" }}>
                13 Lò Đúc, Hai Bà Trưng, Hà Nội
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row bg-gray-50 rounded-xl p-3 mb-4">
            <View className="flex-1 items-center">
              <Clock size={14} color="#6b7280" />
              <Text className="text-lg font-extrabold mt-1" style={{ color: "#1e1b2e" }}>
                {currentMode.time}
              </Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="flex-1 items-center">
              <Route size={14} color="#6b7280" />
              <Text className="text-lg font-extrabold mt-1" style={{ color: "#1e1b2e" }}>
                {currentMode.distance}
              </Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="flex-1 items-center">
              <MapPin size={14} color="#6b7280" />
              <Text className="text-lg font-extrabold mt-1" style={{ color: "#1e1b2e" }}>
                14:42
              </Text>
              <Text className="text-xs" style={{ color: "#6b7280" }}>ETA</Text>
            </View>
          </View>

          {/* Transport Modes */}
          <View className="flex-row gap-2 mb-4">
            {TRANSPORT_MODES.map((mode) => {
              const Icon = mode.icon;
              const active = activeMode === mode.key;
              return (
                <Pressable
                  key={mode.key}
                  onPress={() => setActiveMode(mode.key)}
                  className="flex-1 flex-row items-center justify-center py-2.5 rounded-xl"
                  style={{
                    backgroundColor: active ? "#eff6ff" : "#f9fafb",
                    borderWidth: active ? 1.5 : 1,
                    borderColor: active ? "#3b82f6" : "#e5e7eb",
                  }}
                >
                  <Icon size={16} color={active ? "#3b82f6" : "#6b7280"} />
                  <Text
                    className="text-xs font-semibold ml-1.5"
                    style={{ color: active ? "#3b82f6" : "#6b7280" }}
                  >
                    {mode.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Actions */}
          <View className="flex-row gap-3">
            <Pressable
              className="flex-1 py-3.5 rounded-xl items-center"
              style={{ backgroundColor: "#3b82f6" }}
            >
              <Text className="text-white font-bold text-base">Bắt đầu</Text>
            </Pressable>
            <Pressable
              className="w-12 h-12 rounded-xl items-center justify-center bg-gray-100"
            >
              <Share2 size={18} color="#6b7280" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
