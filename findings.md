# Findings: Architecture Audit

## Critical Issues

### 1. Color Duplication (HIGH)
- `PRIMARY = "#f43f5e"` redefined 6+ lần trong: index.tsx, add.tsx, settings.tsx, all.tsx, _layout.tsx, login.tsx, all-utilities.tsx
- `src/lib/constants.ts` có Colors object nhưng screens không import
- Chat.tsx có local `const C = {...}` riêng

### 2. Category Data Duplication (MEDIUM)
- `CATEGORY_EMOJIS` trong index.tsx
- `CATEGORY_CONFIG` trong entries/all.tsx
- `CATEGORIES[]` trong src/types/index.ts
- 3 sources of truth khác nhau cho cùng data

### 3. Missing Barrel Exports (LOW)
- Không có index.ts trong: src/components/, src/hooks/, src/lib/
- Import paths dài và không consistent

### 4. Mixed Styling (MEDIUM)
- 178 instances NativeWind className
- 57 instances StyleSheet.create
- Extensive inline styles
- Không có convention rõ ràng

### 5. Hardcoded Vietnamese Strings (MEDIUM)
- 50+ strings hardcoded trong screens
- Chỉ có `LOVER_NAME` centralized trong constants.ts

### 6. Missing Error Handling (MEDIUM)
- add.tsx submit không có try/catch
- Login form thiếu error handling
- Không có Error Boundary component

### 7. `as any` Casts (LOW - 5 instances)
- router.push(route as any) - 2 lần
- height: 'auto' as any - 1 lần
- event handler typing - 2 lần

## Positive Findings
- ✅ Icon imports consistent (lucide-react-native only)
- ✅ React.memo used extensively (46 instances)
- ✅ useCallback properly used
- ✅ FlatList used for lists (not ScrollView)
- ✅ TypeScript strict mode, minimal `any`
- ✅ Proper SafeAreaView usage
- ✅ Good file-based routing structure
