// ============================================================
// AI Love - App Constants
// Colors are re-exported from @/theme for backward compatibility.
// New code should import directly from '@/theme'.
// ============================================================

export { Colors } from '../theme/colors';

export const APP_NAME = 'AI Love';
export const APP_VERSION = '2.0.0';
export const APP_SLOGAN = 'Yêu thương thông minh hơn mỗi ngày ✨';
export const LOVER_NAME = 'Thái Hoc';

// ─── Category Icons (single source of truth) ─────────────────

export const CategoryIcons: Record<string, string> = {
  food: '🍜',
  place: '📍',
  hobby: '🎯',
  date: '💑',
  gift: '🎁',
  trait: '✨',
  allergy: '⚠️',
  style: '👗',
  music: '🎵',
  movie: '🎬',
  other: '📝',
};

// ─── Sentiment Emojis ─────────────────────────────────────────

export const SentimentEmojis: Record<string, string> = {
  love: '❤️',
  like: '👍',
  neutral: '😐',
  dislike: '👎',
  hate: '💔',
};

// ─── Category Background Colors ──────────────────────────────

export const CategoryBgColors: Record<string, string> = {
  food: '#fff7ed',
  place: '#eff6ff',
  hobby: '#f0fdf4',
  date: '#FFF0E6',
  gift: '#fef3c7',
  trait: '#faf5ff',
  allergy: '#fef2f2',
  style: '#fdf4ff',
  music: '#ecfdf5',
  movie: '#eef2ff',
  other: '#FAF7F2',
};

// ─── Smart Placeholders per Category ─────────────────────────

export const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  food: 'Thái Hoc thích ăn món gì...',
  place: 'Địa điểm Thái Hoc yêu thích...',
  hobby: 'Sở thích của Thái Hoc...',
  date: 'Tên ngày đặc biệt...',
  gift: 'Quà tặng Thái Hoc thích...',
  trait: 'Tính cách của Thái Hoc...',
  allergy: 'Thứ Thái Hoc bị dị ứng...',
  style: 'Phong cách thời trang của Thái Hoc...',
  music: 'Bài hát / nghệ sĩ Thái Hoc thích...',
  movie: 'Phim Thái Hoc yêu thích...',
  other: 'Ghi chú về Thái Hoc...',
};

// ─── Quick Prompts for AI Chat ────────────────────────────────

export const QUICK_PROMPTS = [
  { label: '🍜 Đồ ăn yêu thích', text: 'Thái Hoc thích ăn phở bò, dị ứng tôm' },
  { label: '🎁 Quà tặng hợp gu', text: 'Thái Hoc thích hoa hồng và nước hoa ngọt' },
  { label: '🎯 Sở thích của em', text: 'Thái Hoc hay đọc sách trước khi ngủ' },
  { label: '📅 Ngày quan trọng', text: 'Sinh nhật Thái Hoc là ngày 15/8' },
];
