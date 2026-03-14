import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Database,
  Brain,
  MessageSquare,
  Send,
  Zap,
  ExternalLink,
  Heart,
} from 'lucide-react-native';

interface ConnectionItem {
  label: string;
  service: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  connected: boolean;
}

export default function SettingsScreen() {
  // Mock connection status - in real app, check env vars
  const [connections] = useState<ConnectionItem[]>([
    {
      label: 'Database',
      service: 'Supabase',
      description: 'Lưu trữ dữ liệu kỉ niệm',
      icon: <Database size={20} color="#10b981" />,
      iconBg: '#ecfdf5',
      connected: true,
    },
    {
      label: 'AI',
      service: 'OpenRouter',
      description: 'Trí tuệ nhân tạo (AI)',
      icon: <Brain size={20} color="#8b5cf6" />,
      iconBg: '#f3e8ff',
      connected: true,
    },
    {
      label: 'Telegram',
      service: 'Telegram Bot',
      description: 'Thông báo & tương tác',
      icon: <MessageSquare size={20} color="#3b82f6" />,
      iconBg: '#eff6ff',
      connected: false,
    },
  ]);

  const setupGuides = [
    {
      step: 1,
      title: 'Kết nối Database',
      description: 'Tạo project Supabase và cấu hình kết nối',
      url: 'https://supabase.com',
      color: '#10b981',
    },
    {
      step: 2,
      title: 'Cấu hình API OpenRouter',
      description: 'Đăng ký và lấy API key từ OpenRouter',
      url: 'https://openrouter.ai',
      color: '#8b5cf6',
    },
    {
      step: 3,
      title: 'Tạo Telegram Bot',
      description: 'Tạo bot qua BotFather để nhận thông báo',
      url: 'https://t.me/BotFather',
      color: '#3b82f6',
    },
  ];

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#fdf2f8' }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-2xl font-bold" style={{ color: '#1f2937' }}>
            Cài đặt
          </Text>
          <Text className="text-sm mt-1" style={{ color: '#6b7280' }}>
            Quản lý kết nối & cấu hình
          </Text>
        </View>

        {/* Connection Status Section */}
        <View className="px-5 mt-5">
          <Text
            className="text-xs font-bold mb-3 tracking-wider"
            style={{ color: '#f43f5e' }}
          >
            TRẠNG THÁI KẾT NỐI
          </Text>
          <View
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            {connections.map((conn, index) => (
              <View
                key={conn.label}
                className="flex-row items-center px-4 py-3.5"
                style={
                  index < connections.length - 1
                    ? { borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }
                    : undefined
                }
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: conn.iconBg }}
                >
                  {conn.icon}
                </View>
                <View className="flex-1">
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: '#1f2937' }}
                  >
                    {conn.service}
                  </Text>
                  <Text className="text-xs" style={{ color: '#9ca3af' }}>
                    {conn.description}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <View
                    className="w-2.5 h-2.5 rounded-full mr-1.5"
                    style={{
                      backgroundColor: conn.connected ? '#10b981' : '#ef4444',
                    }}
                  />
                  <Text
                    className="text-xs font-medium"
                    style={{
                      color: conn.connected ? '#10b981' : '#ef4444',
                    }}
                  >
                    {conn.connected ? 'Đã kết nối' : 'Chưa kết nối'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Test Buttons */}
        <View className="px-5 mt-5">
          <View className="flex-row">
            <View style={{ flex: 1, marginRight: 6 }}>
              <Pressable
                className="items-center py-4 rounded-2xl"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: '#eff6ff' }}
                >
                  <Send size={18} color="#3b82f6" />
                </View>
                <Text
                  className="text-xs font-semibold text-center"
                  style={{ color: '#1f2937' }}
                >
                  Gửi test Telegram
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 1, marginLeft: 6 }}>
              <Pressable
                className="items-center py-4 rounded-2xl"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: '#f3e8ff' }}
                >
                  <Zap size={18} color="#8b5cf6" />
                </View>
                <Text
                  className="text-xs font-semibold text-center"
                  style={{ color: '#1f2937' }}
                >
                  Test AI + Telegram
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Setup Guide */}
        <View className="px-5 mt-6">
          <Text
            className="text-xs font-bold mb-3 tracking-wider"
            style={{ color: '#f43f5e' }}
          >
            HƯỚNG DẪN THIẾT LẬP
          </Text>
          {setupGuides.map((guide) => (
            <Pressable
              key={guide.step}
              onPress={() => handleOpenLink(guide.url)}
              className="flex-row items-center p-4 mb-3 rounded-2xl"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: guide.color + '15' }}
              >
                <Text
                  className="text-sm font-bold"
                  style={{ color: guide.color }}
                >
                  {guide.step}
                </Text>
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm font-bold"
                  style={{ color: '#1f2937' }}
                >
                  {guide.title}
                </Text>
                <Text className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
                  {guide.description}
                </Text>
              </View>
              <ExternalLink size={16} color="#9ca3af" />
            </Pressable>
          ))}
        </View>

        {/* Footer Card */}
        <View className="px-5 mt-4">
          <View
            className="items-center py-6 rounded-2xl"
            style={{
              backgroundColor: '#f43f5e',
              borderRadius: 20,
              shadowColor: '#f43f5e',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Heart size={28} color="#ffffff" fill="#ffffff" />
            <Text
              className="text-lg font-bold mt-2"
              style={{ color: '#ffffff' }}
            >
              MyLoveThaiHoc
            </Text>
            <Text className="text-xs mt-1" style={{ color: '#fecdd3' }}>
              Phiên bản 2.0 · 12 entries
            </Text>
            <Text
              className="text-xs font-semibold mt-3 tracking-widest"
              style={{ color: '#ffffff', opacity: 0.8 }}
            >
              MADE WITH LOVE FOR THÁI HOC
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
