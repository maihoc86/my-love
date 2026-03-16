// ============================================================
// AI Love - Design System: Colors (Nano Banana Pro)
// Single source of truth — import from @/theme
// ============================================================

export const Colors = {
  // Primary (Hot Coral Pink — love, passion, energy)
  primary: '#FF2D55',
  primaryLight: '#FF6B8A',
  primaryDark: '#E6003D',
  primaryGradientStart: '#FF2D55',
  primaryGradientEnd: '#FF6B9D',

  // Secondary / AI (Electric Violet — intelligence, premium)
  aiPurple: '#7B61FF',
  aiPurpleLight: '#A594FF',
  aiPurpleDark: '#5B3FE0',

  // Accent (Golden Banana — joy, warmth, playfulness)
  accent: '#FFB800',
  accentLight: '#FFD54F',
  accentDark: '#F5A000',

  // Semantic
  success: '#00C48C',
  successLight: '#34EDAC',
  warning: '#FFB800',
  warningLight: '#FFD54F',
  error: '#FF3B5C',
  errorLight: '#FF6B8A',
  info: '#4D8AFF',
  infoLight: '#7BACFF',

  // Background & Surface (Warm Ivory — cozy, inviting)
  background: '#FFFBF5',
  backgroundSecondary: '#FFF0E6',
  surface: '#ffffff',
  surfaceSecondary: '#FAF7F2',

  // Text (Violet-tinted — distinctive, premium)
  textPrimary: '#1A1033',
  textSecondary: '#5C5478',
  textTertiary: '#8E85A8',
  textMuted: '#B5ADCC',
  textOnPrimary: '#ffffff',

  // Border (Soft Lavender)
  border: '#E8E4F0',
  borderLight: '#F3F0F8',

  // Sentiment
  sentimentLove: '#FF2D55',
  sentimentLike: '#FFB800',
  sentimentNeutral: '#8E85A8',
  sentimentDislike: '#4D8AFF',
  sentimentHate: '#7B61FF',

  // Transparent variants — Primary (Hot Coral Pink)
  primaryAlpha05: 'rgba(255,45,85,0.05)',
  primaryAlpha08: 'rgba(255,45,85,0.08)',
  primaryAlpha10: 'rgba(255,45,85,0.10)',
  primaryAlpha15: 'rgba(255,45,85,0.15)',

  // Transparent variants — Black
  blackAlpha06: 'rgba(0,0,0,0.06)',
  blackAlpha08: 'rgba(0,0,0,0.08)',
  blackAlpha10: 'rgba(0,0,0,0.10)',
  blackAlpha50: 'rgba(0,0,0,0.5)',

  // Transparent variants — White
  whiteAlpha07: 'rgba(255,255,255,0.07)',
  whiteAlpha10: 'rgba(255,255,255,0.1)',
  whiteAlpha15: 'rgba(255,255,255,0.15)',
  whiteAlpha20: 'rgba(255,255,255,0.2)',
  whiteAlpha25: 'rgba(255,255,255,0.25)',
  whiteAlpha28: 'rgba(255,255,255,0.28)',
  whiteAlpha60: 'rgba(255,255,255,0.6)',
  whiteAlpha80: 'rgba(255,255,255,0.8)',

  // Transparent variants — Semantic
  successAlpha10: 'rgba(0,196,140,0.1)',
  successAlpha15: 'rgba(0,196,140,0.15)',
  infoAlpha15: 'rgba(77,138,255,0.15)',
  aiPurpleAlpha05: 'rgba(123,97,255,0.05)',
  aiPurpleAlpha10: 'rgba(123,97,255,0.10)',
  aiPurpleAlpha15: 'rgba(123,97,255,0.15)',
  errorAlpha10: 'rgba(255,59,92,0.10)',
  warningAlpha15: 'rgba(255,184,0,0.15)',

  // Transparent variants — Accent (Golden Banana)
  accentAlpha08: 'rgba(255,184,0,0.08)',
  accentAlpha15: 'rgba(255,184,0,0.15)',

  // Brand colors
  googleBlue: '#4285F4',
} as const;

export type ColorKey = keyof typeof Colors;
