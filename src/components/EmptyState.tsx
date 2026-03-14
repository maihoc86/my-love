import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View className="mb-4">{icon}</View>
      <Text
        className="text-lg font-bold text-center mb-2"
        style={{ color: '#1f2937' }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          className="text-sm text-center mb-6"
          style={{ color: '#6b7280', lineHeight: 20 }}
        >
          {subtitle}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          className="px-6 py-3 rounded-xl"
          style={{
            backgroundColor: '#f43f5e',
            borderRadius: 14,
          }}
        >
          <Text className="text-sm font-semibold" style={{ color: '#ffffff' }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
