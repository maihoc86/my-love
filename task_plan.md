# Task Plan: Rebuild Architecture - MyLoveThaiHoc Mobile

## Goal
Rebuild kiến trúc project theo React Native best practices, đảm bảo tính mở rộng, đồng bộ design system (icons, colors, layout, UI/UX), và loại bỏ lỗi vặt.

## Current State
- 31 app files, 18 src files (~8,800 LOC)
- Expo Router 6 + TypeScript strict + NativeWind + Supabase
- Nhiều vấn đề: color duplication, no barrel exports, mixed styling, hardcoded strings, duplicated data structures

## Phases

### Phase 1: Design System Centralization `status: pending`
- [ ] Tạo `src/theme/colors.ts` - Single source of truth cho colors
- [ ] Tạo `src/theme/spacing.ts` - Spacing constants
- [ ] Tạo `src/theme/typography.ts` - Font sizes, weights
- [ ] Tạo `src/theme/shadows.ts` - Shadow presets
- [ ] Tạo `src/theme/index.ts` - Barrel export theme
- [ ] Xóa tất cả hardcoded colors trong screens

### Phase 2: Shared Components & Barrel Exports `status: pending`
- [ ] Tạo `src/components/ui/` - Base UI components (Button, Input, Card, Header)
- [ ] Tạo `src/components/index.ts` - Barrel export
- [ ] Tạo `src/hooks/index.ts` - Barrel export
- [ ] Tạo `src/lib/index.ts` - Barrel export
- [ ] Tạo `src/types/index.ts` - Update barrel export

### Phase 3: Data Constants Consolidation `status: pending`
- [ ] Consolidate CATEGORIES config (hiện duplicate 3 lần)
- [ ] Consolidate SENTIMENTS config
- [ ] Tạo `src/lib/strings.ts` - Vietnamese strings centralized
- [ ] Xóa duplicate data structures trong screens

### Phase 4: Screen Refactoring `status: pending`
- [ ] Refactor screens dùng theme + shared components
- [ ] Extract screen-specific hooks (useHome, useChat, useAdd...)
- [ ] Thêm proper error handling (try/catch) cho async operations thiếu
- [ ] Fix `as any` casts (5 instances)
- [ ] Thêm useMemo cho filtered/sorted data

### Phase 5: Quality & Store Compliance `status: pending`
- [ ] Verify accessibility labels trên interactive elements
- [ ] Verify touch targets >= 48dp
- [ ] Verify SafeAreaView usage
- [ ] Verify KeyboardAvoidingView trên form screens
- [ ] TypeScript check: `npm run ts:check`

## Architecture Target

```
src/
├── theme/                  # NEW - Design system
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── shadows.ts
│   └── index.ts
├── components/
│   ├── ui/                 # NEW - Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── ScreenHeader.tsx
│   │   └── index.ts
│   ├── ChatBubble.tsx
│   ├── EntryCard.tsx
│   ├── CategoryGrid.tsx
│   ├── SentimentPicker.tsx
│   ├── CountdownRing.tsx
│   ├── EmptyState.tsx
│   └── index.ts            # Barrel export
├── hooks/
│   ├── useAuth.ts
│   ├── useEntries.ts
│   ├── useSpecialDates.ts
│   └── index.ts            # Barrel export
├── types/
│   ├── index.ts
│   └── map.ts
├── lib/
│   ├── constants.ts         # Categories, Sentiments, strings
│   ├── supabase.ts
│   ├── openrouter.ts
│   ├── telegram.ts
│   ├── ekmap.ts
│   └── index.ts            # Barrel export
└── mocks/
```

## Decisions
- Giữ NativeWind cho utility classes, dùng theme constants cho dynamic values
- Không thêm i18n library (chỉ centralize strings vào constants)
- Barrel exports nhưng KHÔNG barrel re-export từ barrel (tránh tree-shaking issues)
- Giữ Animated.Value pattern hiện tại (không migrate sang Reanimated cho existing animations)

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| (none yet) | | |
