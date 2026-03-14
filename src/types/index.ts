// ============================================================
// MyLoveThaiHoc - Core Type Definitions
// ============================================================

// --- Enums ---

export type Category =
  | 'food'
  | 'place'
  | 'hobby'
  | 'date'
  | 'gift'
  | 'trait'
  | 'allergy'
  | 'style'
  | 'music'
  | 'movie'
  | 'other';

export type Sentiment = 'love' | 'like' | 'neutral' | 'dislike' | 'hate';

export type SpecialDateCategory = 'birthday' | 'anniversary' | 'holiday' | 'other';

// --- Data Models ---

export interface Entry {
  id: string;
  category: Category;
  title: string;
  detail?: string;
  sentiment: Sentiment;
  event_date?: string;
  is_recurring: boolean;
  created_at: string;
}

export interface SpecialDate {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  is_recurring: boolean;
  reminder_days: number;
  category: SpecialDateCategory;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  parsed_entries?: ParsedEntry[];
  timestamp: string;
}

export interface ParsedEntry {
  category: Category;
  title: string;
  detail?: string;
  sentiment: Sentiment;
}

export interface ConnectionStatus {
  supabase: boolean;
  openrouter: boolean;
  telegram: boolean;
}

// --- Category & Sentiment Info ---

export interface CategoryInfo {
  key: Category;
  label: string;
  icon: string;
}

export interface SentimentInfo {
  key: Sentiment;
  label: string;
  emoji: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { key: 'food', label: 'Đồ ăn', icon: '🍜' },
  { key: 'place', label: 'Địa điểm', icon: '📍' },
  { key: 'hobby', label: 'Sở thích', icon: '🎯' },
  { key: 'date', label: 'Hẹn hò', icon: '💑' },
  { key: 'gift', label: 'Quà tặng', icon: '🎁' },
  { key: 'trait', label: 'Tính cách', icon: '✨' },
  { key: 'allergy', label: 'Dị ứng', icon: '⚠️' },
  { key: 'style', label: 'Phong cách', icon: '👗' },
  { key: 'music', label: 'Âm nhạc', icon: '🎵' },
  { key: 'movie', label: 'Phim ảnh', icon: '🎬' },
  { key: 'other', label: 'Khác', icon: '📝' },
];

export const SENTIMENTS: SentimentInfo[] = [
  { key: 'love', label: 'Yêu thích', emoji: '❤️' },
  { key: 'like', label: 'Thích', emoji: '👍' },
  { key: 'neutral', label: 'Bình thường', emoji: '😐' },
  { key: 'dislike', label: 'Không thích', emoji: '👎' },
  { key: 'hate', label: 'Ghét', emoji: '💔' },
];

// --- Helper Functions ---

export function getCategoryInfo(key: Category): CategoryInfo {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[CATEGORIES.length - 1];
}

export function getSentimentInfo(key: Sentiment): SentimentInfo {
  return SENTIMENTS.find((s) => s.key === key) ?? SENTIMENTS[2]; // default neutral
}
