import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bot, User } from 'lucide-react-native';
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
            backgroundColor: '#8b5cf6',
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
      return { borderColor: '#9ca3af', badgeText: '#4b5563', badgeBg: '#f9fafb', label: 'Bình thường' };
    case 'dislike':
      return { borderColor: '#f97316', badgeText: '#ea580c', badgeBg: '#fff7ed', label: 'Không thích' };
    case 'hate':
      return { borderColor: '#f43f5e', badgeText: '#e11d48', badgeBg: '#fff1f2', label: 'Ghét' };
  }
}

// ─── AI Bubble Avatar ──────────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3e8ff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Bot size={17} color="#8b5cf6" />
    </View>
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
        <View style={{ marginLeft: 10, marginBottom: 2 }}>
          <Text style={{ fontSize: 11, fontWeight: '600', color: '#8b5cf6', marginBottom: 6, marginLeft: 2 }}>
            AI Assistant
          </Text>
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 18,
              borderTopLeftRadius: 4,
              paddingHorizontal: 18,
              paddingVertical: 14,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.07,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <TypingDots />
          </View>
        </View>
      </View>
    );
  }

  // ── AI / Assistant bubble ──
  if (isAssistant) {
    const hasParsed = message.parsed_entries && message.parsed_entries.length > 0;
    const hasContent = message.content.length > 0;

    return (
      <View style={{ marginBottom: 12, paddingHorizontal: 16 }}>
        {/* AI text bubble */}
        {(hasContent || !hasParsed) && (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: hasParsed ? 12 : 0 }}>
            <BotAvatar />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#8b5cf6', marginBottom: 6, marginLeft: 2 }}>
                AI Assistant
              </Text>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 18,
                  borderTopLeftRadius: 4,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  maxWidth: '90%',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.07,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <Text style={{ fontSize: 14, lineHeight: 21, color: '#1f2937' }}>
                  {message.content}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Parsed entries section */}
        {hasParsed && (
          <View style={{ marginLeft: 42 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#9ca3af',
                letterSpacing: 0.8,
                marginBottom: 8,
                marginLeft: 2,
              }}
            >
              PHÂN TÍCH TỪ AI
            </Text>

            {/* Cards container */}
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.07,
                shadowRadius: 8,
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
                      paddingVertical: 13,
                      borderLeftWidth: 4,
                      borderLeftColor: sentStyle.borderColor,
                      borderBottomWidth: isLast ? 0 : 1,
                      borderBottomColor: '#f3f4f6',
                    }}
                  >
                    {/* Left: icon + info */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
                      <Text style={{ fontSize: 26, marginRight: 12 }}>{catInfo.icon}</Text>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{ fontSize: 14, fontWeight: '700', color: '#1f2937', marginBottom: 2 }}
                          numberOfLines={1}
                        >
                          {entry.title}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#9ca3af' }}>{catInfo.label}</Text>
                      </View>
                    </View>

                    {/* Right: sentiment badge */}
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 8,
                        backgroundColor: sentStyle.badgeBg,
                      }}
                    >
                      <Text
                        style={{ fontSize: 12, fontWeight: '600', color: sentStyle.badgeText }}
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
      {/* Label */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6 }}>
        <Text style={{ fontSize: 11, fontWeight: '600', color: '#f43f5e', marginRight: 4 }}>Bạn</Text>
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: '#fce7f3',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <User size={13} color="#f43f5e" />
        </View>
      </View>

      {/* Gradient bubble */}
      <LinearGradient
        colors={['#f43f5e', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 18,
          borderTopRightRadius: 4,
          paddingHorizontal: 16,
          paddingVertical: 12,
          maxWidth: '80%',
          shadowColor: '#f43f5e',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 14, lineHeight: 21, color: '#ffffff' }}>{message.content}</Text>
      </LinearGradient>
    </View>
  );
}
