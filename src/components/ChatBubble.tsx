import React from 'react';
import { View, Text } from 'react-native';
import { Bot, User } from 'lucide-react-native';
import { ChatMessage, getCategoryInfo, getSentimentInfo } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
  isTyping?: boolean;
}

export default function ChatBubble({ message, isTyping }: ChatBubbleProps) {
  const isAssistant = message.role === 'assistant';

  if (isTyping) {
    return (
      <View className="flex-row items-start mb-4 px-4">
        <View className="mr-2 mt-1">
          <View
            className="w-7 h-7 rounded-full items-center justify-center"
            style={{ backgroundColor: '#f3e8ff' }}
          >
            <Bot size={16} color="#8b5cf6" />
          </View>
        </View>
        <View>
          <Text className="text-xs font-medium mb-1" style={{ color: '#8b5cf6' }}>
            Assistant
          </Text>
          <View
            className="px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 6,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ color: '#8b5cf6', fontSize: 18, letterSpacing: 4 }}>
              ●  ●  ●
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (isAssistant) {
    return (
      <View className="flex-row items-start mb-4 px-4" style={{ maxWidth: '85%' }}>
        <View className="mr-2 mt-1">
          <View
            className="w-7 h-7 rounded-full items-center justify-center"
            style={{ backgroundColor: '#f3e8ff' }}
          >
            <Bot size={16} color="#8b5cf6" />
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-xs font-medium mb-1" style={{ color: '#8b5cf6' }}>
            Assistant
          </Text>
          <View
            className="px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 6,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="text-sm leading-5" style={{ color: '#1f2937' }}>
              {message.content}
            </Text>

            {message.parsed_entries && message.parsed_entries.length > 0 && (
              <View className="mt-3 space-y-2">
                {message.parsed_entries.map((entry, index) => {
                  const catInfo = getCategoryInfo(entry.category);
                  const sentInfo = getSentimentInfo(entry.sentiment);
                  return (
                    <View
                      key={index}
                      className="flex-row items-center p-2 rounded-xl"
                      style={{
                        backgroundColor: '#fdf2f8',
                        borderLeftWidth: 3,
                        borderLeftColor: '#f43f5e',
                        marginTop: index > 0 ? 8 : 0,
                      }}
                    >
                      <Text className="text-lg mr-2">{catInfo.icon}</Text>
                      <View className="flex-1">
                        <Text className="text-sm font-semibold" style={{ color: '#1f2937' }}>
                          {entry.title}
                        </Text>
                        <View className="flex-row items-center mt-1">
                          <View
                            className="px-2 py-0.5 rounded-full mr-2"
                            style={{ backgroundColor: '#fce7f3' }}
                          >
                            <Text className="text-xs" style={{ color: '#f43f5e' }}>
                              {catInfo.label}
                            </Text>
                          </View>
                          <Text className="text-xs">
                            {sentInfo.emoji} {sentInfo.label}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }

  // User bubble
  return (
    <View className="items-end mb-4 px-4">
      <View className="flex-row items-center mb-1">
        <Text className="text-xs font-medium mr-1" style={{ color: '#f43f5e' }}>
          Bạn
        </Text>
        <View
          className="w-5 h-5 rounded-full items-center justify-center"
          style={{ backgroundColor: '#fce7f3' }}
        >
          <User size={12} color="#f43f5e" />
        </View>
      </View>
      <View
        className="px-4 py-3 rounded-2xl"
        style={{
          backgroundColor: '#f43f5e',
          borderTopRightRadius: 6,
          maxWidth: '80%',
        }}
      >
        <Text className="text-sm leading-5" style={{ color: '#ffffff' }}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}
