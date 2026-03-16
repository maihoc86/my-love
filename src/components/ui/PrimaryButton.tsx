// ============================================================
// PrimaryButton - Consistent button with proper touch target
// ============================================================

import React, { memo } from 'react';
import { Pressable, Text, ViewStyle, ActivityIndicator } from 'react-native';
import { Colors, Radius, Shadows, Layout } from '@/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export const PrimaryButton = memo(function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'filled',
  size = 'md',
  style,
  accessibilityLabel,
}: PrimaryButtonProps) {
  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 13 },
    md: { paddingVertical: 14, paddingHorizontal: 24, fontSize: 15 },
    lg: { paddingVertical: 18, paddingHorizontal: 32, fontSize: 16 },
  };

  const variantStyles = {
    filled: {
      bg: disabled ? Colors.textTertiary : Colors.primary,
      text: Colors.textOnPrimary,
      border: 'transparent',
    },
    outline: {
      bg: 'transparent',
      text: disabled ? Colors.textTertiary : Colors.primary,
      border: disabled ? Colors.textTertiary : Colors.primary,
    },
    ghost: {
      bg: 'transparent',
      text: disabled ? Colors.textTertiary : Colors.primary,
      border: 'transparent',
    },
  };

  const s = sizeStyles[size];
  const v = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: disabled || loading }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.primaryDark : v.bg,
          borderRadius: Radius.lg,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor: v.border,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          minHeight: Layout.minTouchTarget,
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
          opacity: disabled ? 0.5 : 1,
          ...(variant === 'filled' ? Shadows.md : {}),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.text} />
      ) : (
        <Text
          style={{
            fontSize: s.fontSize,
            fontWeight: '600',
            color: v.text,
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
});
