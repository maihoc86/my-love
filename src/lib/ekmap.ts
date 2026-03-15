// ─── eKMAP / eKGIS Integration Config ────────────────────────────────────────
//
// eKMAP Platform: https://docs.ekgis.vn/ekmap-platform-map-reactnative/
// Underlying library: @rnmapbox/maps (Mapbox GL Native wrapper)
//
// Requires env vars:
//   EXPO_PUBLIC_EKGIS_API_KEY  — eKGIS API key for style URL
//   EXPO_PUBLIC_MAPBOX_TOKEN   — Mapbox access token for native SDK auth

import { POI } from '../types/map';

// ─── API Keys ────────────────────────────────────────────────────────────────

export const EKGIS_API_KEY = process.env.EXPO_PUBLIC_EKGIS_API_KEY ?? '';
export const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '';

// ─── Map Style URLs ──────────────────────────────────────────────────────────

export const EKGIS_STYLE = {
  // OSM Plus – bright (recommended default)
  bright: `https://api.ekgis.vn/v2/mapstyles/style/osmplus/bright/style.json?api_key=${EKGIS_API_KEY}`,
  // OSM Plus – dark (for night mode)
  dark: `https://api.ekgis.vn/v2/mapstyles/style/osmplus/dark/style.json?api_key=${EKGIS_API_KEY}`,
  // Satellite imagery
  satellite: `https://api.ekgis.vn/v2/mapstyles/style/satellite/style.json?api_key=${EKGIS_API_KEY}`,
} as const;

// ─── Default Camera ──────────────────────────────────────────────────────────

export const DEFAULT_CAMERA = {
  centerCoordinate: [105.8542, 21.0245] as [number, number], // Hanoi
  zoomLevel: 13,
  animationDuration: 800,
} as const;

// ─── GeoJSON helpers ─────────────────────────────────────────────────────────

/** Convert POI array to GeoJSON FeatureCollection for use with ShapeSource */
export function poisToGeoJSON(
  pois: POI[]
): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: 'FeatureCollection',
    features: pois.map((poi) => ({
      type: 'Feature',
      id: poi.id,
      geometry: {
        type: 'Point',
        coordinates: [poi.lng, poi.lat],
      },
      properties: {
        id: poi.id,
        name: poi.name,
        category: poi.category,
        source: poi.source,
        rating: poi.rating ?? 0,
        isPartnerFavorite: poi.isPartnerFavorite ?? false,
      },
    })),
  };
}

/** Calculate haversine distance (meters) between two coords */
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Format distance into human-readable string */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
