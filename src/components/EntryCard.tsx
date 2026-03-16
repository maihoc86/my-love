import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Trash2, X } from 'lucide-react-native';
import { Colors, Shadows } from '@/theme';
import { Entry, getCategoryInfo, getSentimentInfo } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface EntryCardProps {
  entry: Entry;
  onDelete?: (id: string) => void;
}

export default function EntryCard({ entry, onDelete }: EntryCardProps) {
  const [showDelete, setShowDelete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const catInfo = getCategoryInfo(entry.category);
  const sentInfo = getSentimentInfo(entry.sentiment);

  const relativeTime = formatDistanceToNow(new Date(entry.created_at), {
    addSuffix: true,
    locale: vi,
  });

  useEffect(() => {
    if (showDelete) {
      timerRef.current = setTimeout(() => {
        setShowDelete(false);
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showDelete]);

  const handleDeletePress = () => {
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setShowDelete(false);
    onDelete?.(entry.id);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        ...Shadows.sm,
      }}
    >
      {/* Category Icon */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
          backgroundColor: Colors.background,
        }}
      >
        <Text style={{ fontSize: 20 }}>{catInfo.icon}</Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1, marginRight: 8 }}>
        <Text
          style={{ fontSize: 16, fontWeight: '600', color: Colors.textPrimary }}
        >
          {entry.title}
        </Text>
        {entry.detail ? (
          <Text
            style={{
              fontSize: 14,
              marginTop: 2,
              color: Colors.textSecondary,
            }}
            numberOfLines={1}
          >
            {entry.detail}
          </Text>
        ) : null}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
        >
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 999,
              marginRight: 8,
              backgroundColor: Colors.backgroundSecondary,
            }}
          >
            <Text style={{ fontSize: 12, color: Colors.primary }}>
              {catInfo.label}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: Colors.textTertiary }}>
            {relativeTime}
          </Text>
        </View>
      </View>

      {/* Right side: sentiment + delete */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 8 }}>{sentInfo.emoji}</Text>

        {showDelete ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              onPress={handleConfirmDelete}
              accessibilityLabel="Xác nhận xoá"
              accessibilityRole="button"
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
                marginRight: 4,
                backgroundColor: Colors.errorLight + '20',
                minWidth: 48,
                minHeight: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: '600', color: Colors.error }}
              >
                Xoá
              </Text>
            </Pressable>
            <Pressable
              onPress={handleCancelDelete}
              accessibilityLabel="Huỷ xoá"
              accessibilityRole="button"
              hitSlop={12}
              style={{ padding: 4 }}
            >
              <X size={14} color={Colors.textTertiary} />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={handleDeletePress}
            accessibilityLabel="Xoá ghi chú"
            accessibilityRole="button"
            hitSlop={12}
            style={{ padding: 4 }}
          >
            <Trash2 size={16} color={Colors.textTertiary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
