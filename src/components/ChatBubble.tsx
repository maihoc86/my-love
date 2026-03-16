import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bot, User } from 'lucide-react-native';
import { Colors } from '@/theme';
import { ChatMessage, getCategoryInfo, Sentiment } from '../types';

// ─── Typing Dots ───────────────────────────────────────────────────────────────

function TypingDots() {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const anims = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(dot, { toValue: -7, duration: 220, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 220, useNativeDriver: true }),
          Animated.delay(Math.max(0, 480 - i * 160)),
        ])
      )
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 2 }}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: Colors.aiPurpleLight,
            transform: [{ translateY: dot }],
          }}
        />
      ))}
    </View>
  );
}

// ─── Sentiment helpers ─────────────────────────────────────────────────────────

type SentimentStyle = {
  borderColor: string;
  badgeText: string;
  badgeBg: string;
  label: string;
};

function getSentimentStyle(sentiment: Sentiment): SentimentStyle {
  switch (sentiment) {
    case 'love':
      return { borderColor: '#22c55e', badgeText: '#16a34a', badgeBg: '#f0fdf4', label: 'Yêu thích' };
    case 'like':
      return { borderColor: '#3b82f6', badgeText: '#2563eb', badgeBg: '#eff6ff', label: 'Thích' };
    case 'neutral':
      return { borderColor: Colors.textTertiary, badgeText: '#4b5563', badgeBg: Colors.surfaceSecondary, label: 'Bình thường' };
    case 'dislike':
      return { borderColor: '#f97316', badgeText: '#ea580c', badgeBg: '#fff7ed', label: 'Không thích' };
    case 'hate':
      return { borderColor: Colors.primary, badgeText: Colors.primaryDark, badgeBg: '#fff1f2', label: 'Ghét' };
  }
}

// ─── AI Bubble Avatar ──────────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <LinearGradient
      colors={[Colors.aiPurpleLight, '#6366f1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Text style={{ fontSize: 14 }}>🤖</Text>
    </LinearGradient>
  );
}

// ─── Chat Bubble Component ─────────────────────────────────────────────────────

interface ChatBubbleProps {
  message: ChatMessage;
  isTyping?: boolean;
}

export default function ChatBubble({ message, isTyping }: ChatBubbleProps) {
  const isAssistant = message.role === 'assistant';

  // ── Typing indicator ──
  if (isTyping) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16, paddingHorizontal: 16 }}>
        <BotAvatar />
        <View
          style={{
            marginLeft: 10,
            backgroundColor: Colors.surface,
            borderRadius: 20,
            borderTopLeftRadius: 6,
            paddingHorizontal: 18,
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: Colors.backgroundSecondary,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <TypingDots />
        </View>
      </View>
    );
  }

  // ── AI / Assistant bubble ──
  if (isAssistant) {
    const hasParsed = message.parsed_entries && message.parsed_entries.length > 0;
    const hasContent = message.content.length > 0;

    return (
      <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
        {/* AI text bubble */}
        {(hasContent || !hasParsed) && (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: hasParsed ? 12 : 0, maxWidth: '85%' }}>
            <BotAvatar />
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: Colors.surface,
                borderRadius: 20,
                borderTopLeftRadius: 6,
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderWidth: 1,
                borderColor: Colors.backgroundSecondary,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 14, lineHeight: 22, color: '#374151' }}>
                {message.content}
              </Text>
            </View>
          </View>
        )}

        {/* Parsed entries section */}
        {hasParsed && (
          <View style={{ marginLeft: 40 }}>
            {/* Cards container */}
            <View
              style={{
                backgroundColor: Colors.surface,
                borderRadius: 16,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#f1f5f9',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              {message.parsed_entries!.map((entry, index) => {
                const catInfo = getCategoryInfo(entry.category);
                const sentStyle = getSentimentStyle(entry.sentiment);
                const isLast = index === message.parsed_entries!.length - 1;

                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 14,
                      paddingVertical: 14,
                      borderBottomWidth: isLast ? 0 : 1,
                      borderBottomColor: '#f1f5f9',
                    }}
                  >
                    {/* Left: icon + info */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
                      <Text style={{ fontSize: 22, marginRight: 12 }}>{catInfo.icon}</Text>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{ fontSize: 14, fontWeight: '600', color: '#1e293b', marginBottom: 2 }}
                          numberOfLines={1}
                        >
                          {entry.title}
                        </Text>
                        <Text style={{ fontSize: 12, color: Colors.textMuted }}>{catInfo.label}</Text>
                      </View>
                    </View>

                    {/* Right: sentiment badge */}
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                        backgroundColor: sentStyle.badgeBg,
                      }}
                    >
                      <Text
                        style={{ fontSize: 11, fontWeight: '700', color: sentStyle.badgeText }}
                      >
                        {sentStyle.label}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  }

  // ── User bubble ──
  return (
    <View style={{ alignItems: 'flex-end', marginBottom: 16, paddingHorizontal: 16 }}>
      {/* Gradient bubble */}
      <View style={{ maxWidth: '85%', flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
        <LinearGradient
          colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 20,
            borderTopRightRadius: 6,
            paddingHorizontal: 14,
            paddingVertical: 12,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 14, lineHeight: 22, color: Colors.surface }}>{message.content}</Text>
        </LinearGradient>
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: '#e2e8f0',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <User size={13} color="#64748b" />
        </View>
      </View>
    </View>
  );
}
