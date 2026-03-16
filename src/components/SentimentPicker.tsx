import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Colors } from '@/theme';
import { Sentiment } from '../types';

interface SentimentPickerProps {
  selected?: string;
  onSelect: (sentiment: string) => void;
}

const SENTIMENT_ITEMS: { key: Sentiment; emoji: string; label: string }[] = [
  { key: 'love', emoji: '❤️', label: 'YÊU THÍCH' },
  { key: 'like', emoji: '👍', label: 'THÍCH' },
  { key: 'neutral', emoji: '😐', label: 'BÌNH THƯỜNG' },
  { key: 'dislike', emoji: '👎', label: 'KHÔNG THÍCH' },
  { key: 'hate', emoji: '🚫', label: 'GHÉT' },
];

export default function SentimentPicker({ selected, onSelect }: SentimentPickerProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
      }}
    >
      {SENTIMENT_ITEMS.map((item) => {
        const isSelected = selected === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            accessibilityLabel={item.label}
            accessibilityRole="button"
            style={[
              {
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: isSelected
                  ? Colors.primaryAlpha08
                  : Colors.borderLight,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: isSelected ? 2 : 0,
                borderColor: isSelected ? Colors.primaryLight : 'transparent',
              },
              isSelected && {
                transform: [{ scale: 1.05 }],
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 6,
              },
            ]}
          >
            <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
