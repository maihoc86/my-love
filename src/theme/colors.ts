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
  primaryAlpha05: 'rgba(244,63,94,0.05)',
  primaryAlpha08: 'rgba(244,63,94,0.08)',
  primaryAlpha10: 'rgba(244,63,94,0.10)',
  primaryAlpha15: 'rgba(244,63,94,0.15)',
  blackAlpha06: 'rgba(0,0,0,0.06)',
  blackAlpha08: 'rgba(0,0,0,0.08)',
  blackAlpha10: 'rgba(0,0,0,0.10)',
  blackAlpha50: 'rgba(0,0,0,0.5)',
  whiteAlpha07: 'rgba(255,255,255,0.07)',
  whiteAlpha10: 'rgba(255,255,255,0.1)',
  whiteAlpha15: 'rgba(255,255,255,0.15)',
  whiteAlpha20: 'rgba(255,255,255,0.2)',
  whiteAlpha25: 'rgba(255,255,255,0.25)',
  whiteAlpha28: 'rgba(255,255,255,0.28)',
  whiteAlpha60: 'rgba(255,255,255,0.6)',
  whiteAlpha80: 'rgba(255,255,255,0.8)',
  successAlpha10: 'rgba(16,185,129,0.1)',
  successAlpha15: 'rgba(16,185,129,0.15)',
  infoAlpha15: 'rgba(59,130,246,0.15)',
  aiPurpleAlpha05: 'rgba(139,92,246,0.05)',
  aiPurpleAlpha10: 'rgba(139,92,246,0.10)',
  aiPurpleAlpha15: 'rgba(139,92,246,0.15)',
  errorAlpha10: 'rgba(239,68,68,0.10)',
  warningAlpha15: 'rgba(245,158,11,0.15)',

  // Brand colors
  googleBlue: '#4285F4',
} as const;

export type ColorKey = keyof typeof Colors;
