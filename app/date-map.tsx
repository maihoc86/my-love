import React, { useCallback, useRef, useState } from 'react';
import { Colors } from "@/theme";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
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
import { EKGIS_API_KEY, DEFAULT_CAMERA } from '../src/lib/ekmap';
import { POI, POICategory, CATEGORY_CONFIGS, getCategoryConfig } from '../src/types/map';

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

// ─── Category emoji map for markers ──────────────────────────────────────────

const CATEGORY_EMOJI: Record<string, string> = {
  restaurant: '🍜',
  cafe: '☕',
  cinema: '🎬',
  date_spot: '💑',
};

const CATEGORY_COLOR: Record<string, string> = {
  restaurant: Colors.primary,
  cafe: '#8b5cf6',
  cinema: Colors.info,
  date_spot: Colors.primaryGradientEnd,
};

// ─── MapLibre HTML ───────────────────────────────────────────────────────────

function buildMapHTML(pois: POI[], center: [number, number], zoom: number): string {
  const markers = pois.map((poi) => {
    const emoji = CATEGORY_EMOJI[poi.category] || '📍';
    const color = CATEGORY_COLOR[poi.category] || Colors.primary;
    return `{id:"${poi.id}",lat:${poi.lat},lng:${poi.lng},emoji:"${emoji}",color:"${color}",fav:${poi.isPartnerFavorite ? 'true' : 'false'},name:"${poi.name.replace(/"/g, '\\"')}"}`;
  });

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
<link href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" rel="stylesheet"/>
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body,html{width:100%;height:100%;overflow:hidden}
#map{width:100%;height:100%}
.marker{display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;transition:transform 0.2s}
.marker-inner{width:36px;height:36px;border-radius:18px;border:2px solid;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 3px 6px rgba(0,0,0,0.15);transition:all 0.2s}
.marker.selected .marker-inner{width:44px;height:44px;border-radius:22px;font-size:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25)}
.fav-badge{position:absolute;top:-3px;right:-3px;width:14px;height:14px;background:#f43f5e;border-radius:50%;border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:6px}
</style>
</head>
<body>
<div id="map"></div>
<script>
var pois = [${markers.join(',')}];
var selectedId = pois.length > 0 ? pois[0].id : null;

var map = new maplibregl.Map({
  container:'map',
  style:'https://api.ekgis.vn/v2/mapstyles/style/osmplus/bright/style.json?api_key=${EKGIS_API_KEY}',
  center:[${center[0]},${center[1]}],
  zoom:${zoom},
  attributionControl:false
});

map.addControl(new maplibregl.AttributionControl({compact:true}),'bottom-left');

var markers = {};

function createMarkerEl(poi) {
  var el = document.createElement('div');
  el.className = 'marker' + (poi.id === selectedId ? ' selected' : '');
  el.id = 'marker-' + poi.id;
  var inner = document.createElement('div');
  inner.className = 'marker-inner';
  inner.style.borderColor = poi.color;
  inner.style.backgroundColor = poi.id === selectedId ? poi.color : (poi.color + '20');
  inner.textContent = poi.emoji;
  el.appendChild(inner);
  if (poi.fav) {
    var badge = document.createElement('div');
    badge.className = 'fav-badge';
    badge.textContent = '♥';
    el.appendChild(badge);
  }
  el.addEventListener('click', function() {
    selectPOI(poi.id);
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'select',id:poi.id}));
  });
  return el;
}

function selectPOI(id) {
  if (selectedId) {
    var prev = document.getElementById('marker-' + selectedId);
    if (prev) {
      prev.classList.remove('selected');
      var prevPoi = pois.find(function(p){return p.id===selectedId});
      if (prevPoi) prev.querySelector('.marker-inner').style.backgroundColor = prevPoi.color + '20';
    }
  }
  selectedId = id;
  var cur = document.getElementById('marker-' + id);
  if (cur) {
    cur.classList.add('selected');
    var curPoi = pois.find(function(p){return p.id===id});
    if (curPoi) {
      cur.querySelector('.marker-inner').style.backgroundColor = curPoi.color;
      map.flyTo({center:[curPoi.lng,curPoi.lat],duration:600});
    }
  }
}

pois.forEach(function(poi) {
  var el = createMarkerEl(poi);
  var m = new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([poi.lng,poi.lat]).addTo(map);
  markers[poi.id] = m;
});

// Listen for commands from React Native
window.addEventListener('message', function(e) {
  try {
    var msg = JSON.parse(e.data);
    if (msg.type === 'flyTo') {
      map.flyTo({center:[msg.lng,msg.lat],zoom:msg.zoom||14,duration:600});
    } else if (msg.type === 'select') {
      selectPOI(msg.id);
    } else if (msg.type === 'zoomIn') {
      map.zoomIn();
    } else if (msg.type === 'zoomOut') {
      map.zoomOut();
    } else if (msg.type === 'locateMe') {
      map.flyTo({center:[${center[0]},${center[1]}],zoom:${zoom},duration:600});
    }
  } catch(err) {}
});

document.addEventListener('message', function(e) {
  try {
    var msg = JSON.parse(e.data);
    if (msg.type === 'flyTo') map.flyTo({center:[msg.lng,msg.lat],zoom:msg.zoom||14,duration:600});
    else if (msg.type === 'select') selectPOI(msg.id);
    else if (msg.type === 'zoomIn') map.zoomIn();
    else if (msg.type === 'zoomOut') map.zoomOut();
    else if (msg.type === 'locateMe') map.flyTo({center:[${center[0]},${center[1]}],zoom:${zoom},duration:600});
  } catch(err) {}
});
</script>
</body>
</html>`;
}

// ─── Date Map Screen ─────────────────────────────────────────────────────────

export default function DateMapScreen() {
  const router = useRouter();
  const webviewRef = useRef<WebView>(null);

  const [activeCategory, setActiveCategory] = useState<POICategory | 'all'>('all');
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(SYSTEM_POIS[0]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const filteredPOIs =
    activeCategory === 'all'
      ? SYSTEM_POIS
      : SYSTEM_POIS.filter((p) => p.category === activeCategory);

  const nearbyPOIs = filteredPOIs.filter((p) => p.id !== selectedPOI?.id).slice(0, 4);

  const mapHTML = buildMapHTML(
    filteredPOIs,
    DEFAULT_CAMERA.centerCoordinate,
    DEFAULT_CAMERA.zoomLevel
  );

  // ── Send command to WebView ────────────────────────────────────────────────

  const sendToMap = useCallback((msg: object) => {
    webviewRef.current?.postMessage(JSON.stringify(msg));
  }, []);

  // ── Select POI ─────────────────────────────────────────────────────────────

  const selectPOI = useCallback((poi: POI) => {
    setSelectedPOI(poi);
    sendToMap({ type: 'flyTo', lng: poi.lng, lat: poi.lat, zoom: 15 });
    sendToMap({ type: 'select', id: poi.id });
  }, [sendToMap]);

  // ── Handle messages from WebView ───────────────────────────────────────────

  const handleMapMessage = useCallback((event: { nativeEvent: { data: string } }) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'select') {
        const poi = SYSTEM_POIS.find((p) => p.id === msg.id);
        if (poi) setSelectedPOI(poi);
      }
    } catch {}
  }, []);

  // ── Bookmark ───────────────────────────────────────────────────────────────

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
      {/* ── Map WebView (full screen behind bottom sheet) ── */}
      <WebView
        ref={webviewRef}
        source={{ html: mapHTML }}
        style={StyleSheet.absoluteFill}
        onMessage={handleMapMessage}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
        mixedContentMode="always"
      />

      {/* ── Safe-area container over map ── */}
      <SafeAreaView style={{ flex: 1 }} edges={['top']} pointerEvents="box-none">
        {/* ── Header ── */}
        <View style={styles.header} pointerEvents="box-none">
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
              { backgroundColor: activeCategory === 'all' ? Colors.primary : 'rgba(255,255,255,0.95)' },
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
        <View style={styles.mapControls} pointerEvents="box-none">
          <Pressable
            onPress={() => sendToMap({ type: 'locateMe' })}
            style={styles.mapControlBtn}
            accessibilityLabel="Vị trí của tôi"
          >
            <LocateFixed size={18} color="#3b82f6" />
          </Pressable>
          <View style={[styles.mapControlBtn, styles.zoomGroup]}>
            <Pressable
              style={styles.zoomBtn}
              onPress={() => sendToMap({ type: 'zoomIn' })}
              accessibilityLabel="Phóng to"
            >
              <Plus size={18} color="#374151" />
            </Pressable>
            <View style={styles.zoomDivider} />
            <Pressable
              style={styles.zoomBtn}
              onPress={() => sendToMap({ type: 'zoomOut' })}
              accessibilityLabel="Thu nhỏ"
            >
              <Minus size={18} color="#374151" />
            </Pressable>
          </View>
        </View>

        {/* ── Powered by eKMap watermark ── */}
        <View style={styles.watermark} pointerEvents="none">
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
          <PlusCircle size={26} color={Colors.textOnPrimary} fill={Colors.primary} />
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
                  <Text style={{ fontWeight: '700', color: Colors.textPrimary }}>Thái Hoc</Text>{' '}
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
            <Text style={{ fontSize: 11, color: Colors.textTertiary }}>📍</Text>
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
            <Heart size={11} color={Colors.primary} fill={Colors.primary} />
            <Text style={[styles.tagText, { color: Colors.primary }]}>Em thích</Text>
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
          <Navigation size={16} color={Colors.textOnPrimary} />
          <Text style={styles.actionPrimaryText}>Dẫn đường</Text>
        </Pressable>

        <Pressable
          onPress={onBookmark}
          style={({ pressed }) => [
            styles.actionSecondary,
            { opacity: pressed ? 0.75 : 1 },
            isBookmarked && { backgroundColor: Colors.backgroundSecondary, borderColor: '#fda4af' },
          ]}
          accessibilityLabel="Lưu"
        >
          <Bookmark
            size={18}
            color={isBookmarked ? Colors.primary : Colors.textSecondary}
            fill={isBookmarked ? Colors.primary : 'transparent'}
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
    backgroundColor: Colors.surface,
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
    color: Colors.textPrimary,
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
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  zoomGroup: {
    height: 'auto' as any,
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
    backgroundColor: Colors.borderLight,
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
    color: Colors.textSecondary,
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
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
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
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.border,
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
    color: Colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },

  // Spot card
  spotName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
  },
  metaDot: {
    color: '#d1d5db',
    fontSize: 13,
  },
  metaText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  addressText: {
    fontSize: 12,
    color: Colors.textTertiary,
    flex: 1,
  },

  // Note box
  noteBox: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.backgroundSecondary,
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
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
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
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionPrimaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.surface,
  },
  actionSecondary: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Nearby
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 16,
  },
  nearbySectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textTertiary,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceSecondary,
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
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  nearbyMeta: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});
