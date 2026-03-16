// ============================================================
// Dev Log Viewer — Floating button + modal log console
// Only rendered when __DEV__ is true
// ============================================================

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  Animated,
  Dimensions,
  Share,
} from 'react-native';
import { Colors } from '@/theme';
import { logger, type LogEntry, type LogLevel } from '@/lib/logger';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Level badge colors ──────────────────────────────────────────────────────

const LEVEL_CONFIG: Record<LogLevel, { bg: string; fg: string; label: string }> = {
  debug: { bg: '#E8E4F0', fg: '#5C5478', label: 'DBG' },
  info: { bg: 'rgba(77,138,255,0.15)', fg: '#4D8AFF', label: 'INF' },
  warn: { bg: 'rgba(255,184,0,0.15)', fg: '#E6A600', label: 'WRN' },
  error: { bg: 'rgba(255,59,92,0.12)', fg: '#FF3B5C', label: 'ERR' },
};

// ─── Log Row ─────────────────────────────────────────────────────────────────

const LogRow = memo(({ item }: { item: LogEntry }) => {
  const cfg = LEVEL_CONFIG[item.level];
  const time = item.timestamp.split('T')[1]?.substring(0, 12) ?? '';

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.borderLight,
      }}
    >
      {/* Header: time + level + category */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
        <Text style={{ fontSize: 10, fontFamily: 'Courier', color: Colors.textMuted }}>
          {time}
        </Text>
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 1,
            borderRadius: 3,
            backgroundColor: cfg.bg,
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: '700', color: cfg.fg, fontFamily: 'Courier' }}>
            {cfg.label}
          </Text>
        </View>
        <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.aiPurple }}>
          {item.category}
        </Text>
      </View>

      {/* Message */}
      <Text style={{ fontSize: 12, color: Colors.textPrimary, lineHeight: 17 }}>
        {item.message}
      </Text>

      {/* Data (if any) */}
      {item.data !== undefined && (
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Courier',
            color: Colors.textSecondary,
            marginTop: 3,
            backgroundColor: Colors.surfaceSecondary,
            padding: 6,
            borderRadius: 4,
          }}
          numberOfLines={6}
        >
          {typeof item.data === 'string' ? item.data : JSON.stringify(item.data, null, 2)}
        </Text>
      )}
    </View>
  );
});

// ─── Filter Chip ─────────────────────────────────────────────────────────────

const FilterChip = memo(
  ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        backgroundColor: active ? Colors.primary : Colors.surfaceSecondary,
        borderWidth: 1,
        borderColor: active ? Colors.primary : Colors.border,
      }}
      accessibilityLabel={`Lọc ${label}`}
      accessibilityRole="button"
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: '600',
          color: active ? Colors.textOnPrimary : Colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  )
);

// ─── Main Component ──────────────────────────────────────────────────────────

function DevLogViewerInner() {
  const [visible, setVisible] = useState(false);
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const flatListRef = useRef<FlatList>(null);
  const fabScale = useRef(new Animated.Value(1)).current;
  const errorCount = useRef(0);
  const [badgeCount, setBadgeCount] = useState(0);

  // Subscribe to new log entries
  useEffect(() => {
    const unsub = logger.subscribe((entry) => {
      setEntries([...logger.getEntries()]);
      if (entry.level === 'error' && !visible) {
        errorCount.current += 1;
        setBadgeCount(errorCount.current);
        // Pulse the FAB on error
        Animated.sequence([
          Animated.timing(fabScale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
          Animated.timing(fabScale, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
      }
    });
    return unsub;
  }, [visible]);

  const handleOpen = useCallback(() => {
    setEntries([...logger.getEntries()]);
    setVisible(true);
    errorCount.current = 0;
    setBadgeCount(0);
  }, []);

  const handleClose = useCallback(() => setVisible(false), []);

  const handleClear = useCallback(() => {
    logger.clear();
    setEntries([]);
  }, []);

  const handleShare = useCallback(async () => {
    const displayed = filter === 'all' ? entries : entries.filter((e) => e.level === filter);
    const text = displayed
      .map(
        (e) =>
          `[${e.timestamp.split('T')[1]?.substring(0, 12)}] [${e.level.toUpperCase()}] [${e.category}] ${e.message}${e.data !== undefined ? '\n  ' + JSON.stringify(e.data) : ''}`
      )
      .join('\n');
    await Share.share({ message: text, title: 'AI Love Dev Logs' });
  }, [entries, filter]);

  const filtered = filter === 'all' ? entries : entries.filter((e) => e.level === filter);

  const renderItem = useCallback(({ item }: { item: LogEntry }) => <LogRow item={item} />, []);
  const keyExtractor = useCallback((item: LogEntry) => item.id, []);

  return (
    <>
      {/* ── Floating Action Button ── */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 100,
          right: 12,
          zIndex: 9998,
          transform: [{ scale: fabScale }],
        }}
      >
        <Pressable
          onPress={handleOpen}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: badgeCount > 0 ? Colors.error : Colors.aiPurple,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 0.85,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 8,
          })}
          accessibilityLabel="Mở dev logs"
          accessibilityRole="button"
        >
          <Text style={{ fontSize: 18 }}>{'</>'}</Text>
          {badgeCount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: Colors.error,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' }}>
                {badgeCount > 9 ? '9+' : badgeCount}
              </Text>
            </View>
          )}
        </Pressable>
      </Animated.View>

      {/* ── Log Modal ── */}
      <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <Pressable style={{ height: SCREEN_HEIGHT * 0.15 }} onPress={handleClose} />

          <View
            style={{
              flex: 1,
              backgroundColor: Colors.surface,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
            }}
          >
            {/* Handle bar */}
            <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 4 }}>
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: Colors.border,
                }}
              />
            </View>

            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.textPrimary }}>
                Dev Logs
              </Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable onPress={handleShare} accessibilityLabel="Chia sẻ logs" accessibilityRole="button">
                  <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.aiPurple }}>
                    Share
                  </Text>
                </Pressable>
                <Pressable onPress={handleClear} accessibilityLabel="Xóa logs" accessibilityRole="button">
                  <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.error }}>
                    Clear
                  </Text>
                </Pressable>
                <Pressable onPress={handleClose} accessibilityLabel="Đóng" accessibilityRole="button">
                  <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textSecondary }}>
                    Done
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Filter chips */}
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                paddingHorizontal: 16,
                paddingBottom: 8,
              }}
            >
              {(['all', 'error', 'warn', 'info', 'debug'] as const).map((lvl) => (
                <FilterChip
                  key={lvl}
                  label={lvl === 'all' ? `All (${entries.length})` : `${lvl.toUpperCase()} (${entries.filter((e) => e.level === lvl).length})`}
                  active={filter === lvl}
                  onPress={() => setFilter(lvl)}
                />
              ))}
            </View>

            {/* Entry count */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 4,
                backgroundColor: Colors.surfaceSecondary,
              }}
            >
              <Text style={{ fontSize: 11, color: Colors.textMuted }}>
                {filtered.length} entries
              </Text>
            </View>

            {/* Log list */}
            <FlatList
              ref={flatListRef}
              data={filtered}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={{ flex: 1 }}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: false })
              }
              ListEmptyComponent={
                <View style={{ padding: 32, alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: Colors.textMuted }}>
                    Chưa có logs nào
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

/** Only renders in __DEV__ mode */
export default function DevLogViewer() {
  if (!__DEV__) return null;
  return <DevLogViewerInner />;
}
