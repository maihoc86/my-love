// ============================================================
// Card - Reusable card wrapper with consistent styling
// ============================================================

import React, { memo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors } from '@/theme';
import { Shadows } from '@/theme';
import { Radius } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: 'sm' | 'md' | 'lg';
  radius?: keyof typeof Radius;
  backgroundColor?: string;
}

export const Card = memo(function Card({
  children,
  style,
  shadow = 'sm',
  radius = 'xl',
  backgroundColor = Colors.surface,
}: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: Radius[radius],
          ...Shadows[shadow],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
});
