import { Tabs } from "expo-router";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import {
  Heart,
  Plus,
  MessageCircle,
  Calendar,
  Settings,
} from "lucide-react-native";

const PRIMARY = "#f43f5e";

// ─── Custom Add Tab Button ────────────────────────────────────

function AddTabButton({ onPress, accessibilityState }: BottomTabBarButtonProps) {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Thêm"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // Push the circle up above the tab bar
        marginTop: -22,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: focused ? "#e11d48" : PRIMARY,
          alignItems: "center",
          justifyContent: "center",
          // White ring border
          borderWidth: 4,
          borderColor: "#ffffff",
          // Shadow
          shadowColor: PRIMARY,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.45,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <Plus size={28} color="#ffffff" strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}

// ─── Tab Layout ───────────────────────────────────────────────

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "rgba(244,63,94,0.08)",
          borderTopWidth: 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 12,
          height: 88,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, focused }) => (
            <Heart size={22} color={color} fill={focused ? color : "none"} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI Chat",
          tabBarIcon: ({ color }) => (
            <MessageCircle size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: () => null,
          tabBarLabel: () => null,
          tabBarButton: (props) => <AddTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Lịch",
          tabBarIcon: ({ color }) => (
            <Calendar size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Cài đặt",
          tabBarIcon: ({ color }) => (
            <Settings size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
