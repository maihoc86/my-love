// ============================================================
// MyLoveThaiHoc - App Constants
// ============================================================

export const APP_NAME = 'MyLoveThaiHoc';
export const APP_VERSION = '2.0.0';
export const LOVER_NAME = 'Thái Hoc';

export const Colors = {
  // Primary
  primary: '#f43f5e',
  primaryLight: '#fb7185',
  primaryDark: '#e11d48',
  primaryGradientStart: '#f43f5e',
  primaryGradientEnd: '#ec4899',

  // AI / Assistant
  aiPurple: '#8b5cf6',
  aiPurpleLight: '#a78bfa',
  aiPurpleDark: '#7c3aed',

  // Semantic
  success: '#10b981',
  successLight: '#34d399',
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  error: '#ef4444',
  errorLight: '#f87171',
  info: '#3b82f6',
  infoLight: '#60a5fa',

  // Background & Surface
  background: '#fdf2f8',
  backgroundSecondary: '#fce7f3',
  surface: '#ffffff',
  surfaceSecondary: '#f9fafb',

  // Text
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textTertiary: '#9ca3af',
  textOnPrimary: '#ffffff',

  // Border
  border: '#e5e7eb',
  borderLight: '#f3f4f6',

  // Sentiment colors
  sentimentLove: '#ef4444',
  sentimentLike: '#f97316',
  sentimentNeutral: '#6b7280',
  sentimentDislike: '#3b82f6',
  sentimentHate: '#8b5cf6',
} as const;

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

export const SentimentEmojis: Record<string, string> = {
  love: '❤️',
  like: '👍',
  neutral: '😐',
  dislike: '👎',
  hate: '💔',
};
