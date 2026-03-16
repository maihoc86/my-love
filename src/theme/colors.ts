// ============================================================
// MyLoveThaiHoc - Design System: Colors
// Single source of truth — import from @/theme
// ============================================================

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
  textMuted: '#94a3b8',
  textOnPrimary: '#ffffff',

  // Border
  border: '#e5e7eb',
  borderLight: '#f3f4f6',

  // Sentiment
  sentimentLove: '#ef4444',
  sentimentLike: '#f97316',
  sentimentNeutral: '#6b7280',
  sentimentDislike: '#3b82f6',
  sentimentHate: '#8b5cf6',

  // Transparent variants
  primaryAlpha08: 'rgba(244,63,94,0.08)',
  primaryAlpha15: 'rgba(244,63,94,0.15)',
  blackAlpha06: 'rgba(0,0,0,0.06)',
  blackAlpha50: 'rgba(0,0,0,0.5)',
} as const;

export type ColorKey = keyof typeof Colors;
