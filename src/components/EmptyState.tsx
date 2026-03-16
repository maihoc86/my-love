import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Colors } from '@/theme';

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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 48,
      }}
    >
      <View style={{ marginBottom: 16 }}>{icon}</View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 8,
          color: Colors.textPrimary,
        }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 24,
            color: Colors.textSecondary,
            lineHeight: 20,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityLabel={actionLabel}
          accessibilityRole="button"
          style={{
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 14,
            backgroundColor: Colors.primary,
            minHeight: 48,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: Colors.surface,
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
