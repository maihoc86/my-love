import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapboxGL from '@rnmapbox/maps';
import {
  ChevronLeft,
  SlidersHorizontal,
  LocateFixed,
  Plus,
  Minus,
  Sparkles,
  Star,
  Navigation,
  Bookmark,
  Share2,
  ChevronRight,
  Heart,
  PlusCircle,
} from 'lucide-react-native';
import { EKGIS_STYLE, MAPBOX_TOKEN, DEFAULT_CAMERA, formatDistance, haversineDistance } from '../src/lib/ekmap';
import { POI, POICategory, CATEGORY_CONFIGS, getCategoryConfig } from '../src/types/map';

// ─── Mapbox token init ───────────────────────────────────────────────────────

MapboxGL.setAccessToken(MAPBOX_TOKEN);

// ─── Mock POI data ───────────────────────────────────────────────────────────
// TODO: Replace with Supabase fetch in production

const SYSTEM_POIS: POI[] = [
  {
    id: 's1',
    name: 'Phở Thìn Bờ Hồ',
    category: 'restaurant',
    source: 'system',
    lat: 21.0336,
    lng: 105.8519,
    rating: 4.5,
    reviewCount: 824,
    distance: '850m',
    address: '61 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội',
    tags: ['Em thích', 'Có chỗ đỗ xe', 'Bình dân'],
    priceRange: 1,
    isPartnerFavorite: true,
  },
  {
    id: 's2',
    name: 'The Note Coffee',
    category: 'cafe',
    source: 'system',
    lat: 21.0334,
    lng: 105.8497,
    rating: 4.3,
    reviewCount: 512,
    distance: '1.2km',
    address: '64 Lương Văn Can, Hoàn Kiếm, Hà Nội',
    tags: ['View đẹp', 'Yên tĩnh'],
    priceRange: 2,
  },
  {
    id: 's3',
    name: 'Lotte Cinema Landmark',
    category: 'cinema',
    source: 'system',
    lat: 21.0308,
    lng: 105.8156,
    rating: 4.6,
    reviewCount: 1200,
    distance: '3.5km',
    address: '54 Liễu Giai, Ba Đình, Hà Nội',
    tags: ['IMAX', 'Sạch đẹp'],
    priceRange: 2,
  },
  {
    id: 's4',
    name: 'Hồ Hoàn Kiếm',
    category: 'date_spot',
    source: 'system',
    lat: 21.0285,
    lng: 105.852,
    rating: 4.8,
    reviewCount: 9800,
    distance: '1.8km',
    address: 'Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội',
    tags: ['Lãng mạn', 'Miễn phí'],
    priceRange: 1,
  },
  {
    id: 'u1',
    name: 'Cà phê Pho Co',
    category: 'cafe',
    source: 'user',
    lat: 21.0344,
    lng: 105.8525,
    rating: 4.7,
    reviewCount: 0,
    distance: '600m',
    address: '11 Hàng Gai, Hoàn Kiếm, Hà Nội',
    tags: ['Em thích', 'View Hồ Gươm'],
    note: 'Quán em hay dẫn anh tới nhé 😊',
    priceRange: 2,
    isPartnerFavorite: true,
  },
];

// ─── POI Marker ──────────────────────────────────────────────────────────────

function POIMarker({
  poi,
  isSelected,
  onPress,
}: {
  poi: POI;
  isSelected: boolean;
  onPress: () => void;
}) {
  const cfg = getCategoryConfig(poi.category);

  return (
    <MapboxGL.PointAnnotation
      id={`poi-${poi.id}`}
      coordinate={[poi.lng, poi.lat]}
      onSelected={onPress}
    >
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.markerOuter,
            {
              backgroundColor: isSelected ? cfg.color : cfg.bgColor,
              borderColor: cfg.color,
              width: isSelected ? 44 : 36,
              height: isSelected ? 44 : 36,
              borderRadius: isSelected ? 22 : 18,
              shadowOpacity: isSelected ? 0.4 : 0.15,
            },
          ]}
        >
          <Text style={{ fontSize: isSelected ? 20 : 16 }}>{cfg.emoji}</Text>
          {poi.isPartnerFavorite && (
            <View style={styles.favBadge}>
              <Heart size={7} color="#fff" fill="#fff" />
            </View>
          )}
        </View>
      </Pressable>
    </MapboxGL.PointAnnotation>
  );
}

// ─── Date Map Screen ─────────────────────────────────────────────────────────

export default function DateMapScreen() {
  const router = useRouter();
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const mapRef = useRef<MapboxGL.MapView>(null);

  const [activeCategory, setActiveCategory] = useState<POICategory | 'all'>('all');
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(SYSTEM_POIS[0]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const filteredPOIs =
    activeCategory === 'all'
      ? SYSTEM_POIS
      : SYSTEM_POIS.filter((p) => p.category === activeCategory);

  const nearbyPOIs = filteredPOIs.filter((p) => p.id !== selectedPOI?.id).slice(0, 4);

  // ── Fly to selected POI ──────────────────────────────────────────────────

  const selectPOI = useCallback((poi: POI) => {
    setSelectedPOI(poi);
    cameraRef.current?.flyTo([poi.lng, poi.lat], 600);
  }, []);

  // ── Locate me ────────────────────────────────────────────────────────────

  const handleLocateMe = useCallback(() => {
    cameraRef.current?.flyTo(DEFAULT_CAMERA.centerCoordinate, 600);
  }, []);

  // ── Bookmark ─────────────────────────────────────────────────────────────

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={{ flex: 1 }}>
      {/* ── Map (full screen behind bottom sheet) ── */}
      <MapboxGL.MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        styleURL={EKGIS_STYLE.bright}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        scaleBarEnabled={false}
      >
        <MapboxGL.Camera
          ref={cameraRef}
          centerCoordinate={DEFAULT_CAMERA.centerCoordinate}
          zoomLevel={DEFAULT_CAMERA.zoomLevel}
          animationDuration={DEFAULT_CAMERA.animationDuration}
        />

        {/* User location dot */}
        <MapboxGL.UserLocation
          visible
          renderMode={MapboxGL.UserLocationRenderMode.Native}
        />

        {/* POI markers */}
        {filteredPOIs.map((poi) => (
          <POIMarker
            key={poi.id}
            poi={poi}
            isSelected={selectedPOI?.id === poi.id}
            onPress={() => selectPOI(poi)}
          />
        ))}
      </MapboxGL.MapView>

      {/* ── Safe-area container over map ── */}
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.7 : 1 }]}
            accessibilityLabel="Quay lại"
          >
            <ChevronLeft size={22} color="#1f2937" />
          </Pressable>

          <Text style={styles.headerTitle}>Bản đồ hẹn hò</Text>

          <Pressable
            hitSlop={10}
            style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.7 : 1 }]}
            accessibilityLabel="Bộ lọc"
          >
            <SlidersHorizontal size={20} color="#1f2937" />
          </Pressable>
        </View>

        {/* ── Category filter pills (over map) ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {/* "Tất cả" pill */}
          <Pressable
            onPress={() => setActiveCategory('all')}
            style={[
              styles.filterPill,
              { backgroundColor: activeCategory === 'all' ? '#f43f5e' : 'rgba(255,255,255,0.95)' },
            ]}
          >
            <Text
              style={[
                styles.filterPillText,
                { color: activeCategory === 'all' ? '#fff' : '#374151' },
              ]}
            >
              Tất cả
            </Text>
          </Pressable>

          {CATEGORY_CONFIGS.map((cfg) => (
            <Pressable
              key={cfg.key}
              onPress={() => setActiveCategory(cfg.key)}
              style={[
                styles.filterPill,
                {
                  backgroundColor:
                    activeCategory === cfg.key ? cfg.color : 'rgba(255,255,255,0.95)',
                },
              ]}
            >
              <Text style={{ marginRight: 4, fontSize: 13 }}>{cfg.emoji}</Text>
              <Text
                style={[
                  styles.filterPillText,
                  { color: activeCategory === cfg.key ? '#fff' : '#374151' },
                ]}
              >
                {cfg.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Map controls ── */}
        <View style={styles.mapControls}>
          <Pressable
            onPress={handleLocateMe}
            style={styles.mapControlBtn}
            accessibilityLabel="Vị trí của tôi"
          >
            <LocateFixed size={18} color="#3b82f6" />
          </Pressable>
          <View style={[styles.mapControlBtn, styles.zoomGroup]}>
            <Pressable
              style={styles.zoomBtn}
              onPress={() => {
                /* TODO: zoom in via camera */
              }}
              accessibilityLabel="Phóng to"
            >
              <Plus size={18} color="#374151" />
            </Pressable>
            <View style={styles.zoomDivider} />
            <Pressable
              style={styles.zoomBtn}
              onPress={() => {
                /* TODO: zoom out via camera */
              }}
              accessibilityLabel="Thu nhỏ"
            >
              <Minus size={18} color="#374151" />
            </Pressable>
          </View>
        </View>

        {/* ── Powered by eKMap watermark ── */}
        <View style={styles.watermark}>
          <Text style={styles.watermarkText}>Powered by eKMap</Text>
        </View>

        {/* ── FAB: Add new spot ── */}
        <Pressable
          style={({ pressed }) => [
            styles.fab,
            { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] },
          ]}
          accessibilityLabel="Thêm địa điểm"
        >
          <PlusCircle size={26} color="#fff" fill="#f43f5e" />
        </Pressable>

        {/* ── Bottom Sheet ── */}
        <View style={styles.sheet}>
          {/* Drag handle */}
          <View style={styles.dragHandle} />

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
              {/* AI Insight badge */}
              <View style={styles.aiBadge}>
                <Sparkles size={15} color="#8b5cf6" />
                <Text style={styles.aiBadgeText}>
                  AI gợi ý:{' '}
                  <Text style={{ fontWeight: '700', color: '#1f2937' }}>Thái Hoc</Text>{' '}
                  thích quán có view đẹp, yên tĩnh để trò chuyện.
                </Text>
              </View>

              {/* Selected POI */}
              {selectedPOI && (
                <SelectedSpotCard
                  poi={selectedPOI}
                  isBookmarked={bookmarkedIds.has(selectedPOI.id)}
                  onBookmark={() => toggleBookmark(selectedPOI.id)}
                />
              )}

              {/* Divider */}
              {nearbyPOIs.length > 0 && (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.nearbySectionTitle}>GỢI Ý GẦN ĐÂY</Text>
                  {nearbyPOIs.map((poi) => (
                    <NearbyItem key={poi.id} poi={poi} onPress={() => selectPOI(poi)} />
                  ))}
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ─── Selected Spot Card ───────────────────────────────────────────────────────

function SelectedSpotCard({
  poi,
  isBookmarked,
  onBookmark,
}: {
  poi: POI;
  isBookmarked: boolean;
  onBookmark: () => void;
}) {
  const cfg = getCategoryConfig(poi.category);

  return (
    <View style={{ marginBottom: 8 }}>
      {/* Name + meta */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Text style={styles.spotName} numberOfLines={1}>
              {poi.name}
            </Text>
            {poi.source === 'user' && (
              <View style={styles.userBadge}>
                <Text style={styles.userBadgeText}>Của tôi</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {poi.rating !== undefined && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <Star size={13} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.ratingText}>{poi.rating}</Text>
              </View>
            )}
            {poi.rating !== undefined && (
              <Text style={styles.metaDot}>•</Text>
            )}
            <Text style={styles.metaText}>{cfg.label}</Text>
            {poi.distance && (
              <>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{poi.distance}</Text>
              </>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
            <Text style={{ fontSize: 11, color: '#9ca3af' }}>📍</Text>
            <Text style={styles.addressText} numberOfLines={1}>
              {poi.address}
            </Text>
          </View>
        </View>
      </View>

      {/* Personal note (user POIs) */}
      {poi.note && (
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>💬 {poi.note}</Text>
        </View>
      )}

      {/* Tags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
        contentContainerStyle={{ gap: 8 }}
      >
        {poi.isPartnerFavorite && (
          <View style={[styles.tag, { backgroundColor: '#fff1f2', borderColor: '#fecdd3' }]}>
            <Heart size={11} color="#f43f5e" fill="#f43f5e" />
            <Text style={[styles.tagText, { color: '#f43f5e' }]}>Em thích</Text>
          </View>
        )}
        {poi.tags.filter((t) => t !== 'Em thích').map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Action buttons */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable
          style={({ pressed }) => [styles.actionPrimary, { opacity: pressed ? 0.85 : 1 }]}
          accessibilityLabel="Dẫn đường"
        >
          <Navigation size={16} color="#fff" />
          <Text style={styles.actionPrimaryText}>Dẫn đường</Text>
        </Pressable>

        <Pressable
          onPress={onBookmark}
          style={({ pressed }) => [
            styles.actionSecondary,
            { opacity: pressed ? 0.75 : 1 },
            isBookmarked && { backgroundColor: '#fce7f3', borderColor: '#fda4af' },
          ]}
          accessibilityLabel="Lưu"
        >
          <Bookmark
            size={18}
            color={isBookmarked ? '#f43f5e' : '#6b7280'}
            fill={isBookmarked ? '#f43f5e' : 'transparent'}
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.actionSecondary, { opacity: pressed ? 0.75 : 1 }]}
          accessibilityLabel="Chia sẻ"
        >
          <Share2 size={18} color="#6b7280" />
        </Pressable>
      </View>
    </View>
  );
}

// ─── Nearby Item ──────────────────────────────────────────────────────────────

function NearbyItem({ poi, onPress }: { poi: POI; onPress: () => void }) {
  const cfg = getCategoryConfig(poi.category);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.nearbyItem, { opacity: pressed ? 0.8 : 1 }]}
    >
      <View style={[styles.nearbyIcon, { backgroundColor: cfg.bgColor }]}>
        <Text style={{ fontSize: 20 }}>{cfg.emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nearbyName} numberOfLines={1}>
          {poi.name}
        </Text>
        <Text style={styles.nearbyMeta}>
          {cfg.label}
          {poi.distance ? ` • ${poi.distance}` : ''}
        </Text>
      </View>
      <ChevronRight size={16} color="#d1d5db" />
    </Pressable>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
  },

  // Filter
  filterRow: {
    marginTop: 8,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Map controls
  mapControls: {
    position: 'absolute',
    right: 14,
    bottom: 270,
    gap: 10,
  },
  mapControlBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  zoomGroup: {
    height: 'auto',
    flexDirection: 'column',
  },
  zoomBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    width: '100%',
  },

  // Watermark
  watermark: {
    position: 'absolute',
    bottom: 240,
    left: 12,
  },
  watermarkText: {
    fontSize: 10,
    color: '#6b7280',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  // FAB
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 248,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f43f5e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },

  // Bottom sheet
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 340,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
  },
  dragHandle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#e5e7eb',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },

  // AI badge
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#f5f3ff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ede9fe',
  },
  aiBadgeText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
    flex: 1,
  },

  // Spot card
  spotName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  userBadge: {
    backgroundColor: '#ede9fe',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexShrink: 0,
  },
  userBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7c3aed',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
  },
  metaDot: {
    color: '#d1d5db',
    fontSize: 13,
  },
  metaText: {
    fontSize: 13,
    color: '#6b7280',
  },
  addressText: {
    fontSize: 12,
    color: '#9ca3af',
    flex: 1,
  },

  // Note box
  noteBox: {
    backgroundColor: '#fdf2f8',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  noteText: {
    fontSize: 12,
    color: '#be185d',
    lineHeight: 18,
  },

  // Tags
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },

  // Actions
  actionPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f43f5e',
    borderRadius: 16,
    paddingVertical: 14,
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionPrimaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionSecondary: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Nearby
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 16,
  },
  nearbySectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ca3af',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  nearbyIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  nearbyMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },

  // Marker
  markerOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  favBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#f43f5e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});
