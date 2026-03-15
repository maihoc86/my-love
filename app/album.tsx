import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Camera,
  Heart,
  Utensils,
  Mountain,
  Sun,
  PartyPopper,
  Cake,
  Sparkles,
  Plus,
} from 'lucide-react-native';

// ─── Types ─────────────────────────────────────────────────────────────────────

type GridType = 'mixed' | 'triple';

interface PhotoCell {
  bg: string;
  Icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  extra?: number; // "+N" overlay count
  iconSize?: number;
}

interface PhotoGroup {
  id: string;
  title: string;
  date: string;
  count: number;
  gridType: GridType;
  cells: PhotoCell[];
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const FILTERS = ['Tất cả', 'Hẹn hò', 'Du lịch', 'Kỷ niệm', 'Yêu thích'];

const PHOTO_GROUPS: PhotoGroup[] = [
  {
    id: '1',
    title: 'Hẹn hò Phố Cổ',
    date: '12/03/2026',
    count: 8,
    gridType: 'mixed',
    cells: [
      { bg: '#ffe4e6', Icon: Heart, iconColor: '#fda4af', iconSize: 36 },
      { bg: '#fecdd3', Icon: Utensils, iconColor: '#fb7185' },
      { bg: '#fff1f2', Icon: Camera, iconColor: '#fda4af', extra: 5 },
    ],
  },
  {
    id: '2',
    title: 'Du lịch Đà Lạt',
    date: '02/03/2026',
    count: 24,
    gridType: 'triple',
    cells: [
      { bg: '#dbeafe', Icon: Mountain, iconColor: '#93c5fd' },
      { bg: '#d1fae5', Icon: Sun, iconColor: '#6ee7b7' },
      { bg: '#fef9c3', Icon: Sparkles, iconColor: '#fcd34d', extra: 21 },
    ],
  },
  {
    id: '3',
    title: 'Kỷ niệm 1 năm',
    date: '14/02/2026',
    count: 15,
    gridType: 'mixed',
    cells: [
      { bg: '#ede9fe', Icon: PartyPopper, iconColor: '#c4b5fd', iconSize: 36 },
      { bg: '#fce7f3', Icon: Cake, iconColor: '#f9a8d4' },
      { bg: '#fff1f2', Icon: Sparkles, iconColor: '#fda4af', extra: 12 },
    ],
  },
];

// ─── Photo grid: mixed (2fr:1fr, 2 rows) ──────────────────────────────────────

function PhotoGridMixed({
  cells,
  gap,
  totalWidth,
}: {
  cells: PhotoCell[];
  gap: number;
  totalWidth: number;
}) {
  const bigW = (totalWidth * 2) / 3 - gap / 2;
  const smallW = totalWidth / 3 - gap / 2;
  const rowH = 100;

  const Icon0 = cells[0].Icon;
  const Icon1 = cells[1].Icon;
  const Icon2 = cells[2].Icon;

  return (
    <View style={{ flexDirection: 'row', gap, borderRadius: 16, overflow: 'hidden' }}>
      {/* Left: spans 2 rows */}
      <View
        style={{
          width: bigW,
          height: rowH * 2 + gap,
          backgroundColor: cells[0].bg,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon0 size={cells[0].iconSize ?? 28} color={cells[0].iconColor} />
      </View>

      {/* Right column: 2 stacked */}
      <View style={{ width: smallW, gap }}>
        <View
          style={{
            height: rowH,
            backgroundColor: cells[1].bg,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon1 size={22} color={cells[1].iconColor} />
        </View>

        {/* Bottom right with +N overlay */}
        <View
          style={{
            height: rowH,
            backgroundColor: cells[2].bg,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {cells[2].extra ? (
            <View
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: 12,
                backgroundColor: 'rgba(0,0,0,0.06)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151' }}>
                +{cells[2].extra}
              </Text>
            </View>
          ) : (
            <Icon2 size={20} color={cells[2].iconColor} />
          )}
        </View>
      </View>
    </View>
  );
}

// ─── Photo grid: triple (3 equal cols) ────────────────────────────────────────

function PhotoGridTriple({
  cells,
  gap,
  totalWidth,
}: {
  cells: PhotoCell[];
  gap: number;
  totalWidth: number;
}) {
  const cellW = (totalWidth - gap * 2) / 3;
  const cellH = 96;

  return (
    <View style={{ flexDirection: 'row', gap, borderRadius: 16, overflow: 'hidden' }}>
      {cells.map((cell, i) => (
        <View
          key={i}
          style={{
            width: cellW,
            height: cellH,
            backgroundColor: cell.bg,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {cell.extra ? (
            <View
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: 12,
                backgroundColor: 'rgba(0,0,0,0.06)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151' }}>
                +{cell.extra}
              </Text>
            </View>
          ) : (
            (() => { const CellIcon = cell.Icon; return <CellIcon size={22} color={cell.iconColor} />; })()
          )}
        </View>
      ))}
    </View>
  );
}

// ─── Album Screen ──────────────────────────────────────────────────────────────

export default function AlbumScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const gridWidth = width - 48; // 24px padding each side
  const GAP = 8;

  const totalPhotos = PHOTO_GROUPS.reduce((s, g) => s + g.count, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f5f6' }}>
      {/* ── Header ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => ({
            padding: 8,
            borderRadius: 24,
            opacity: pressed ? 0.6 : 1,
          })}
          accessibilityLabel="Quay lại"
        >
          <ChevronLeft size={24} color="#1f2937" />
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: '700', color: '#1f2937' }}>
          Album ảnh
        </Text>

        <Pressable
          hitSlop={10}
          style={({ pressed }) => ({
            padding: 8,
            borderRadius: 24,
            opacity: pressed ? 0.6 : 1,
          })}
          accessibilityLabel="Chụp ảnh"
        >
          <Camera size={24} color="#f43f5e" />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ── Stats bar ── */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 8, marginBottom: 8 }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 24,
              paddingVertical: 20,
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(244,63,94,0.08)',
              shadowColor: 'rgba(244,62,92,0.08)',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 20,
              elevation: 3,
            }}
          >
            {[
              { label: 'TỔNG ẢNH', value: totalPhotos },
              { label: 'SỰ KIỆN', value: PHOTO_GROUPS.length },
              { label: 'THÁNG', value: 5 },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <View style={{ width: 1, height: 36, backgroundColor: '#f1f5f9' }} />
                )}
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '500',
                      color: '#9ca3af',
                      letterSpacing: 0.8,
                      marginBottom: 4,
                    }}
                  >
                    {stat.label}
                  </Text>
                  <Text style={{ fontSize: 22, fontWeight: '700', color: '#1f2937' }}>
                    {stat.value}
                  </Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Filter tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10, paddingVertical: 4 }}
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              style={({ pressed }) => ({
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 24,
                backgroundColor: activeFilter === f ? '#f43f5e' : '#ffffff',
                borderWidth: activeFilter === f ? 0 : 1,
                borderColor: '#e5e7eb',
                shadowColor: activeFilter === f ? '#f43f5e' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: activeFilter === f ? 0.25 : 0.04,
                shadowRadius: activeFilter === f ? 8 : 4,
                elevation: activeFilter === f ? 4 : 1,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: activeFilter === f ? '#ffffff' : '#6b7280',
                }}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Photo groups ── */}
        <View style={{ paddingHorizontal: 24, gap: 32 }}>
          {PHOTO_GROUPS.map((group) => (
            <View key={group.id}>
              {/* Group header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 2 }}
                  >
                    {group.title}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#9ca3af' }}>
                    {group.date} • {group.count} ảnh
                  </Text>
                </View>
                <Pressable hitSlop={8} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#f43f5e' }}>
                    Xem tất cả
                  </Text>
                </Pressable>
              </View>

              {/* Photo grid */}
              {group.gridType === 'mixed' ? (
                <PhotoGridMixed
                  cells={group.cells}
                  gap={GAP}
                  totalWidth={gridWidth}
                />
              ) : (
                <PhotoGridTriple
                  cells={group.cells}
                  gap={GAP}
                  totalWidth={gridWidth}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ── FAB ── */}
      <View
        style={{
          position: 'absolute',
          bottom: 32,
          right: 24,
        }}
      >
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] })}
          accessibilityLabel="Thêm ảnh"
        >
          <LinearGradient
            colors={['#f43f5e', '#fb7185']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#f43f5e',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Camera size={26} color="#ffffff" />
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
