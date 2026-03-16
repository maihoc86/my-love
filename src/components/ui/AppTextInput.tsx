// ============================================================
// AppTextInput - Consistent text input with theme colors
// ============================================================

import React, { memo, forwardRef } from 'react';
import { TextInput, TextInputProps, View, Text, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '@/theme';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const AppTextInput = memo(
  forwardRef<TextInput, AppTextInputProps>(function AppTextInput(
    { label, error, containerStyle, style, ...props },
    ref,
  ) {
    return (
      <View style={containerStyle}>
        {label ? (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: Colors.textPrimary,
              marginBottom: Spacing.sm,
            }}
          >
            {label}
          </Text>
        ) : null}
        <TextInput
          ref={ref}
          placeholderTextColor={Colors.textTertiary}
          style={[
            {
              backgroundColor: Colors.surfaceSecondary,
              borderRadius: Radius.md,
              paddingHorizontal: Spacing.lg,
              paddingVertical: Spacing.md,
              fontSize: 15,
              color: Colors.textPrimary,
              borderWidth: 1,
              borderColor: error ? Colors.error : Colors.borderLight,
            },
            style,
          ]}
          {...props}
        />
        {error ? (
          <Text
            style={{
              fontSize: 12,
              color: Colors.error,
              marginTop: Spacing.xs,
            }}
          >
            {error}
          </Text>
        ) : null}
      </View>
    );
  }),
);
