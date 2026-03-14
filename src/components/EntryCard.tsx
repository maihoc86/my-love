import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Trash2, X } from 'lucide-react-native';
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
      className="flex-row items-center p-4 mb-3 rounded-2xl"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Category Icon */}
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: '#fdf2f8' }}
      >
        <Text className="text-xl">{catInfo.icon}</Text>
      </View>

      {/* Content */}
      <View className="flex-1 mr-2">
        <Text className="text-base font-semibold" style={{ color: '#1f2937' }}>
          {entry.title}
        </Text>
        {entry.detail ? (
          <Text
            className="text-sm mt-0.5"
            style={{ color: '#6b7280' }}
            numberOfLines={1}
          >
            {entry.detail}
          </Text>
        ) : null}
        <View className="flex-row items-center mt-1.5">
          <View
            className="px-2 py-0.5 rounded-full mr-2"
            style={{ backgroundColor: '#fce7f3' }}
          >
            <Text className="text-xs" style={{ color: '#f43f5e' }}>
              {catInfo.label}
            </Text>
          </View>
          <Text className="text-xs" style={{ color: '#9ca3af' }}>
            {relativeTime}
          </Text>
        </View>
      </View>

      {/* Right side: sentiment + delete */}
      <View className="items-center">
        <Text className="text-xl mb-2">{sentInfo.emoji}</Text>

        {showDelete ? (
          <View className="flex-row items-center">
            <Pressable
              onPress={handleConfirmDelete}
              className="px-2 py-1 rounded-lg mr-1"
              style={{ backgroundColor: '#fef2f2' }}
            >
              <Text className="text-xs font-semibold" style={{ color: '#ef4444' }}>
                Xoá
              </Text>
            </Pressable>
            <Pressable onPress={handleCancelDelete} className="p-1">
              <X size={14} color="#9ca3af" />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={handleDeletePress} className="p-1">
            <Trash2 size={16} color="#9ca3af" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
