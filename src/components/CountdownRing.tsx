import React from 'react';
import { View, Text } from 'react-native';

interface CountdownRingProps {
  daysLeft: number;
  size?: number;
}

function getRingColor(daysLeft: number): string {
  if (daysLeft === 0) return '#10b981';
  if (daysLeft <= 3) return '#ef4444';
  if (daysLeft <= 7) return '#f97316';
  return '#f43f5e';
}

export default function CountdownRing({ daysLeft, size = 80 }: CountdownRingProps) {
  const color = getRingColor(daysLeft);
  const innerSize = size - 8;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 4,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Text
        style={{
          fontSize: size * 0.3,
          fontWeight: '800',
          color: color,
          lineHeight: size * 0.35,
        }}
      >
        {daysLeft}
      </Text>
      <Text
        style={{
          fontSize: size * 0.12,
          fontWeight: '600',
          color: '#9ca3af',
          marginTop: 2,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        NGÀY
      </Text>
    </View>
  );
}
