import "../global.css";
import { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  View,
} from "react-native";

// Keep native splash visible while JS loads
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");
import { Colors } from "@/theme";

// ─── Custom Animated Splash ───────────────────────────────────

function AppSplash({ onDone }: { onDone: () => void }) {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Fade-in + scale-up logo
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2. Fade-in tagline
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        // 3. Hold 800ms → fade out entire screen
        setTimeout(() => {
          Animated.timing(screenOpacity, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }).start(onDone);
        }, 800);
      });
    });
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
        zIndex: 999,
        opacity: screenOpacity,
      }}
    >
      {/* Decorative background circles — Nano Banana Pro warm tones */}
      <View
        style={{
          position: "absolute",
          top: height * 0.12,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: "rgba(255,45,85,0.06)",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: height * 0.15,
          left: -60,
          width: 240,
          height: 240,
          borderRadius: 120,
          backgroundColor: "rgba(123,97,255,0.04)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: height * 0.35,
          left: -20,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "rgba(255,184,0,0.06)",
        }}
      />

      {/* Logo */}
      <Animated.View
        style={{
          alignItems: "center",
          transform: [{ scale: logoScale }],
          opacity: logoOpacity,
        }}
      >
        <Image
          source={require("../assets/app-icon/app-icon.png")}
          style={{
            width: 112,
            height: 112,
            borderRadius: 28,
            marginBottom: 20,
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
            letterSpacing: -0.5,
          }}
        >
          <Text style={{ color: Colors.accent }}>AI</Text>
          {" "}
          <Text style={{ color: Colors.primary }}>Love</Text>
        </Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text
        style={{
          marginTop: 10,
          fontSize: 14,
          fontWeight: "500",
          color: Colors.textMuted,
          opacity: taglineOpacity,
          letterSpacing: 0.3,
        }}
      >
        Yêu thương thông minh hơn mỗi ngày ✨
      </Animated.Text>
    </Animated.View>
  );
}

// ─── Root Layout ─────────────────────────────────────────────

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false);

  // Hide native splash as soon as the layout mounts
  useEffect(() => {
    SplashScreen.hideAsync().then(() => setNativeSplashHidden(true));
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
      {/* Custom splash overlay — shown on top until animation completes */}
      {nativeSplashHidden && !splashDone && (
        <AppSplash onDone={() => setSplashDone(true)} />
      )}
    </>
  );
}
