// ============================================================
// MyLoveThaiHoc - Design System: Shadows
// ============================================================

import { Platform, ViewStyle } from 'react-native';

type ShadowPreset = Pick<ViewStyle, 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'>;

function shadow(
  offsetY: number,
  opacity: number,
  radius: number,
  elevation: number,
  color = '#000',
): ShadowPreset {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
    default: {
      shadowColor: color,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
  }) as ShadowPreset;
}

export const Shadows = {
  /** Cards, entry rows */
  sm: shadow(1, 0.05, 6, 2),
  /** Buttons, elevated cards */
  md: shadow(2, 0.08, 10, 4),
  /** Modals, FAB */
  lg: shadow(4, 0.12, 16, 8),
  /** FAB with primary color glow */
  fab: shadow(6, 0.45, 12, 12, '#f43f5e'),
  /** Tab bar shadow */
  tabBar: shadow(-2, 0.06, 12, 12),
} as const;
