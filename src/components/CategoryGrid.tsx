import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Colors } from '@/theme';
import { Category } from '../types';

interface CategoryGridProps {
  selected?: string;
  onSelect: (category: string) => void;
}

const CATEGORY_ITEMS: { key: Category; emoji: string; label: string }[] = [
  { key: 'food', emoji: '🍜', label: 'Món ăn' },
  { key: 'place', emoji: '📍', label: 'Địa điểm' },
  { key: 'hobby', emoji: '🎨', label: 'Sở thích' },
  { key: 'date', emoji: '📅', label: 'Ngày đ.biệt' },
  { key: 'gift', emoji: '🎁', label: 'Quà tặng' },
  { key: 'trait', emoji: '💫', label: 'Tính cách' },
  { key: 'allergy', emoji: '⚠️', label: 'Dị ứng' },
  { key: 'style', emoji: '👗', label: 'Phong cách' },
  { key: 'music', emoji: '🎵', label: 'Âm nhạc' },
  { key: 'movie', emoji: '🎬', label: 'Phim ảnh' },
  { key: 'other', emoji: '💝', label: 'Khác' },
];

export default function CategoryGrid({ selected, onSelect }: CategoryGridProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {CATEGORY_ITEMS.map((item) => {
        const isSelected = selected === item.key;
        return (
          <View key={item.key} style={{ width: '33.33%', padding: 4 }}>
            <Pressable
              onPress={() => onSelect(item.key)}
              accessibilityLabel={item.label}
              accessibilityRole="button"
              style={[
                {
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderRadius: 16,
                  backgroundColor: isSelected
                    ? Colors.primaryAlpha08
                    : Colors.surfaceSecondary,
                  borderWidth: 2,
                  borderColor: isSelected ? Colors.primaryLight : 'transparent',
                },
                isSelected && {
                  shadowColor: Colors.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 4,
                },
              ]}
            >
              <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  marginTop: 4,
                  color: isSelected ? Colors.primary : Colors.textSecondary,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
