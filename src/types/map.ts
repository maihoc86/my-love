// ─── Map & POI Types ─────────────────────────────────────────────────────────

export type POICategory =
  | 'restaurant'
  | 'cafe'
  | 'cinema'
  | 'date_spot'
  | 'mall'
  | 'park'
  | 'homestay'
  | 'entertainment';

export type POISource = 'system' | 'user';

export interface POI {
  id: string;
  name: string;
  category: POICategory;
  source: POISource;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  distance?: string; // formatted: "850m" | "1.2km"
  address: string;
  tags: string[];
  note?: string;            // personal note
  isPartnerFavorite?: boolean; // Thái Hoc yêu thích
  openHours?: string;       // "07:00 – 22:00"
  priceRange?: 1 | 2 | 3;  // 1=bình dân, 2=trung bình, 3=cao cấp
  phone?: string;
  imageUrl?: string;
}

export interface POICategoryConfig {
  key: POICategory;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
}

// ─── Category Configs ────────────────────────────────────────────────────────

export const CATEGORY_CONFIGS: POICategoryConfig[] = [
  { key: 'restaurant',    label: 'Quán ăn',     emoji: '🍜', color: '#f43f5e', bgColor: '#fff1f2' },
  { key: 'cafe',          label: 'Cà phê',       emoji: '☕', color: '#f97316', bgColor: '#fff7ed' },
  { key: 'cinema',        label: 'Rạp phim',     emoji: '🎬', color: '#8b5cf6', bgColor: '#f5f3ff' },
  { key: 'date_spot',     label: 'Hẹn hò',       emoji: '💑', color: '#ec4899', bgColor: '#fdf2f8' },
  { key: 'mall',          label: 'TTTM',          emoji: '🏬', color: '#3b82f6', bgColor: '#eff6ff' },
  { key: 'park',          label: 'Công viên',    emoji: '🌳', color: '#10b981', bgColor: '#ecfdf5' },
  { key: 'homestay',      label: 'Homestay',     emoji: '🏠', color: '#f59e0b', bgColor: '#fffbeb' },
  { key: 'entertainment', label: 'Vui chơi',     emoji: '🎡', color: '#06b6d4', bgColor: '#ecfeff' },
];

export function getCategoryConfig(key: POICategory): POICategoryConfig {
  return CATEGORY_CONFIGS.find((c) => c.key === key) ?? CATEGORY_CONFIGS[0];
}

export function getPriceLabel(price?: 1 | 2 | 3): string {
  switch (price) {
    case 1: return 'Bình dân';
    case 2: return 'Trung bình';
    case 3: return 'Cao cấp';
    default: return '';
  }
}
