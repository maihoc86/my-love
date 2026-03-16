// ============================================================
// ScreenHeader - Reusable header for sub-screens
// ============================================================

import React, { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const ScreenHeader = memo(function ScreenHeader({
  title,
  subtitle,
  showBack = true,
  onBack,
  rightAction,
}: ScreenHeaderProps) {
  const router = useRouter();

  const handleBack = onBack ?? (() => router.back());

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.surface,
      }}
    >
      {showBack ? (
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          style={{
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 24,
          }}
          hitSlop={8}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </Pressable>
      ) : (
        <View style={{ width: 48 }} />
      )}

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: Colors.textPrimary,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={{
              fontSize: 12,
              color: Colors.textSecondary,
              marginTop: 2,
            }}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={{ width: 48, alignItems: 'center' }}>
        {rightAction ?? null}
      </View>
    </View>
  );
});
