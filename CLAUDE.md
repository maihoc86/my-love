# CLAUDE.md - Project Instructions

## Project Overview

AI Love - Trợ lý tình yêu AI thông minh. Mobile app ghi nhận thông tin về người yêu, hỗ trợ bởi AI.

**Brand Identity (Nano Banana Pro)**:
- **Logo**: "AI" (golden `#FFB800`) + "Love" (coral `#FF2D55`)
- **Slogan**: "Yêu thương thông minh hơn mỗi ngày ✨"
- **Primary**: `#FF2D55` (Hot Coral Pink) — love, passion
- **Secondary/AI**: `#7B61FF` (Electric Violet) — intelligence, premium
- **Accent**: `#FFB800` (Golden Banana) — joy, warmth
- **Background**: `#FFFBF5` (Warm Ivory) — cozy, inviting
- **Text**: `#1A1033` (Deep Midnight) — violet-tinted, distinctive

**Tech stack**: React Native 0.81.5 + Expo SDK 54 + Expo Router 6 + TypeScript + Supabase + OpenRouter AI + Telegram Bot.

## Architecture

### Routing (Expo Router — file-based)

```
app/
├── _layout.tsx              # Root layout + animated splash (AI Love branding)
├── index.tsx                # Landing/redirect
├── onboarding.tsx           # Onboarding 5-step (Welcome → Name → Birthday → Anniversary → Avatar)
├── (auth)/                  # Auth flow (OTP-first)
├── (tabs)/                  # Main tab navigator
│   ├── _layout.tsx          # Tab bar (5 tabs: Trang chủ → AI Chat → + Thêm → Lịch → Cài đặt)
│   ├── index.tsx            # Dashboard (SCR-01)
│   ├── chat.tsx             # AI Chat (SCR-03)
│   ├── add.tsx              # Thêm ghi chú (SCR-02)
│   ├── calendar.tsx         # Lịch (SCR-04)
│   └── settings.tsx         # Cài đặt (SCR-05)
├── entries/                 # Entry screens (Stack navigator)
│   ├── _layout.tsx
│   ├── all.tsx              # Tất cả ghi chú (SCR-02.1)
│   └── [id].tsx             # Chi tiết ghi chú — View + Edit mode
├── settings/                # Settings sub-screens (Stack navigator)
│   ├── _layout.tsx
│   ├── personal-info.tsx    # Thông tin cá nhân (SCR-05.1)
│   ├── partner-info.tsx     # Thông tin người yêu (SCR-05.2)
│   ├── security.tsx         # Bảo mật (SCR-05.3)
│   └── backup.tsx           # Sao lưu — Đám mây AI Love (SCR-05.4)
├── album.tsx                # Album ảnh
├── chat-history.tsx         # Lịch sử chat
├── daily-reminder.tsx       # Nhắc nhở hàng ngày
├── date-map.tsx             # Bản đồ hẹn hò
├── insight.tsx              # Insights
├── love-counter.tsx         # Đếm ngày yêu
├── recording.tsx            # Ghi âm
└── voice-note.tsx           # Ghi chú giọng nói
```

### Key Patterns

- **SafeAreaView**: `edges={["top"]}` trên mọi screen
- **KeyboardAvoidingView**: Bọc mọi form/input screen
- **React.memo**: Tất cả sub-components
- **useCallback**: Tất cả handlers
- **useMemo**: Filtered/sorted/computed data
- **FlatList**: Dùng cho danh sách (không dùng ScrollView cho list)
- **Animation**: `Animated.Value` + spring/timing (không dùng thư viện ngoài)

### Design System (Nano Banana Pro)

**Centralized trong `src/theme/`** — KHÔNG hardcode colors trong screens.

```
src/theme/
├── colors.ts       # All color tokens (Nano Banana Pro palette)
├── spacing.ts      # Spacing scale, radius presets, layout constants
├── typography.ts   # Font sizes, weights, line heights
├── shadows.ts      # Shadow presets (sm, md, lg, fab, tabBar)
└── index.ts        # Barrel export
```

- **Import**: `import { Colors, Shadows, Spacing } from '@/theme'`
- **Primary**: `Colors.primary` (`#FF2D55` Hot Coral Pink)
- **Secondary**: `Colors.aiPurple` (`#7B61FF` Electric Violet)
- **Accent**: `Colors.accent` (`#FFB800` Golden Banana)
- **Background**: `Colors.background` (`#FFFBF5` Warm Ivory)
- **Gradient hero**: `Colors.primary` → `Colors.aiPurple` (love → AI)
- **Gradient warm**: `Colors.primaryGradientStart` → `Colors.primaryGradientEnd`
- **Icons**: `lucide-react-native` (single source)
- **Tab bar**: FAB circular button ở giữa (nút Thêm), `Layout.fabElevation`
- **Touch target**: Min 48dp (`Layout.minTouchTarget`)

#### Color Tokens Quick Reference

| Token | Hex | Dùng cho |
|-------|-----|----------|
| `primary` | `#FF2D55` | CTA, active tabs, FAB, accent |
| `primaryLight` | `#FF6B8A` | Disabled buttons, light variant |
| `primaryDark` | `#E6003D` | Hover/press states |
| `aiPurple` | `#7B61FF` | AI features, chat, secondary accent |
| `accent` | `#FFB800` | Logo "AI" text, golden highlights, joy |
| `background` | `#FFFBF5` | App background |
| `backgroundSecondary` | `#FFF0E6` | Section backgrounds |
| `surface` | `#ffffff` | Cards, modals |
| `textPrimary` | `#1A1033` | Main text |
| `textSecondary` | `#5C5478` | Secondary text |
| `textMuted` | `#B5ADCC` | Hints, placeholders |
| `border` | `#E8E4F0` | Soft lavender borders |

### Shared Components

```
src/components/
├── ui/              # Base UI primitives
│   ├── ScreenHeader.tsx
│   ├── Card.tsx
│   ├── PrimaryButton.tsx
│   ├── AppTextInput.tsx
│   └── index.ts
├── ChatBubble.tsx   # Domain-specific
├── EntryCard.tsx
├── CategoryGrid.tsx
├── SentimentPicker.tsx
├── CountdownRing.tsx
├── EmptyState.tsx
└── index.ts         # Barrel export
```

### Barrel Exports

- **Components**: `import { Card, EntryCard } from '@/components'`
- **Hooks**: `import { useAuth, useEntries } from '@/hooks'`
- **Lib**: `import { parseUserInput, addEntry } from '@/lib'`
- **Theme**: `import { Colors, Shadows } from '@/theme'`

## Hooks System

Hooks được cấu hình trong `.claude/settings.json` và scripts nằm tại `.claude/hooks/`.

| Hook | Event | Mục đích |
|------|-------|----------|
| `typecheck.sh` | PostToolUse (Write\|Edit) | Tự động `tsc --noEmit` sau khi sửa .ts/.tsx |
| `pre-commit-check.sh` | PreToolUse (Bash) | Kiểm tra secrets trước khi chạy commands |
| `lint-check.sh` | Manual | Chạy `expo lint` khi cần |

## Skills System

### Cách đọc skills từ `.claude/skills/`

Mỗi skill là một thư mục trong `.claude/skills/<skill-name>/` với cấu trúc:

```
.claude/skills/<skill-name>/
├── SKILL.md          # File chính - chứa frontmatter + hướng dẫn
├── references/       # (optional) Tài liệu tham khảo
├── scripts/          # (optional) Scripts thực thi
└── evals/            # (optional) Test cases
```

### Quy trình khi nhận request từ user

1. **Match skill**: Đọc `description` và `Keywords` trong SKILL.md để xác định skill phù hợp
2. **Invoke**: Dùng `Skill` tool với tên skill từ frontmatter `name`
3. **Follow instructions**: Làm theo hướng dẫn trong SKILL.md body
4. **Use references/scripts**: Nếu skill có thư mục `references/` hoặc `scripts/`, đọc và sử dụng khi cần

### Danh sách skills hiện có

| Skill | Mô tả ngắn |
|-------|-------------|
| `cto-advisor` | Tư vấn tech leadership, architecture decisions, tech debt |
| `daily-planner` | Quản lý task CTO hàng ngày qua Notion |
| `product-manager-toolkit` | RICE prioritization, PRD, user research |
| `docx` | Tạo/đọc/sửa file Word (.docx) |
| `xlsx` | Tạo/đọc/sửa file Excel (.xlsx) |
| `pptx` | Tạo/đọc/sửa file PowerPoint (.pptx) |
| `pdf` | Xử lý file PDF |
| `meeting-minutes` | Tạo biên bản cuộc họp (.docx) |
| `solution-proposal` | Tạo đề xuất giải pháp cho khách hàng |
| `technical-writer` | Tài liệu kỹ thuật (SRS, SDD, API docs) |
| `training-material` | Tài liệu đào tạo khách hàng |
| `internal-comms` | Truyền thông nội bộ (status reports, updates) |
| `content-strategy` | Content marketing B2B cho CDS |
| `launch-strategy` | Kế hoạch ra mắt sản phẩm/tính năng |
| `marketing-strategy-pmm` | Product marketing, positioning, GTM |
| `project-estimation` | Ước tính effort, timeline, chi phí |
| `ux-researcher-designer` | UX research, persona, journey map |
| `ui-ux-pro-max` | UI/UX design patterns, color palettes, fonts |
| `n8n-workflow-patterns` | Workflow automation patterns |
| `skill-creator` | Tạo/sửa/đánh giá skills |
| `agent-browser` | Browser automation |
| `planning-with-files` | File-based planning cho complex tasks |
| `stitch-loop` | Iterative website building |
| `vercel-react-best-practices` | React/Next.js performance optimization |
| `figma:implement-design` | Figma to code |
| `figma:code-connect-components` | Connect Figma components to code |
| `figma:create-design-system-rules` | Design system rules |

## Store Guidelines (Google Play & App Store)

Tài liệu đầy đủ: `docs/STORE_GUIDELINES.md`

### Quy tắc BẮT BUỘC áp dụng khi code

#### 1. Privacy & Consent (quan trọng nhất — #1 lý do bị reject)

- **Consent modal cho AI**: Trước khi gửi dữ liệu đến OpenRouter, PHẢI hiển thị consent cụ thể:
  > "Dữ liệu của bạn sẽ được gửi đến OpenRouter (dịch vụ AI) để xử lý tin nhắn"
- **Không thu thập dữ liệu thừa**: Chỉ request data cần thiết cho core functionality
- **Không hardcode secrets**: API keys, tokens phải dùng env variables hoặc Expo SecureStore
- **Privacy policy link**: Phải có trong app (Settings screen) và luôn truy cập được

#### 2. Permissions — Chỉ request khi cần

```tsx
// ĐÚNG — Chỉ request permission khi user thực sự dùng feature
const requestCamera = async () => {
  const { status } = await Camera.requestPermissionsAsync();
  if (status !== "granted") { /* handle gracefully */ }
};

// SAI — Request tất cả permissions khi mở app
```

**Info.plist keys** (chỉ khai báo cho features thực sự dùng — khai báo thừa = reject):
- `NSCameraUsageDescription` — nếu dùng camera
- `NSPhotoLibraryUsageDescription` — nếu đọc photo library
- `NSLocationWhenInUseUsageDescription` — nếu dùng location
- `NSFaceIDUsageDescription` — nếu dùng biometric
- `ITSAppUsesNonExemptEncryption: false` — chỉ dùng HTTPS standard

**Android permissions** (trong app.json `expo.android.permissions`):
- Chỉ liệt kê permissions cần thiết, không dùng wildcard

#### 3. UI/UX — Chuẩn Store

- **Safe Areas**: `SafeAreaView edges={["top"]}` — KHÔNG đặt nội dung dưới notch/Dynamic Island/home indicator
- **Touch target**: Tối thiểu **48dp** cho mọi nút bấm (`minWidth: 48, minHeight: 48`)
- **Accessibility**: Mọi interactive element phải có `accessibilityLabel` và `accessibilityRole`
- **KeyboardAvoidingView**: Bọc mọi screen có input
- **Responsive**: Test trên nhiều kích thước (iPhone SE → Pro Max)
- **Dynamic Type** (iOS): Typography nên adapt theo user settings
- **Error handling**: App KHÔNG ĐƯỢC crash — mọi async operation cần try/catch

#### 4. AI Chat — Quy định đặc biệt

- Khai báo rõ đây là **AI chatbot**, không giả làm người thật
- Phải có cơ chế **report/flag** nội dung AI không phù hợp
- Ngăn chặn AI tạo nội dung bị cấm (hate speech, CSAM, lừa đảo)
- Developer chịu trách nhiệm mọi nội dung AI tạo ra
- Khai báo "Messages" trong Data Safety (Google Play) và Privacy Manifest (iOS)

#### 5. Build & Versioning

```json
// app.json
{
  "expo": {
    "name": "AI Love",
    "scheme": "ailove",
    "ios": {
      "bundleIdentifier": "com.tienphongcds.ailove",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.tienphongcds.ailove",
      "versionCode": 1
    }
  }
}
```

- Android: build `.aab` (không dùng APK), target API 35
- iOS: build với iOS 18 SDK (Expo SDK 54 tự xử lý)
- Test trên thiết bị thật trước khi submit (TestFlight cho iOS)

## Documentation

| File | Nội dung |
|------|----------|
| `docs/BRD.md` | Business Requirements Document |
| `docs/SRS.md` | Software Requirements Specification |
| `docs/user-stories.json` | User Stories (JSON format) |
| `docs/STORE_GUIDELINES.md` | Quy định Google Play & App Store đầy đủ |
| `docs/STITCH_PROMPT.md` | Google Stitch prompts |
| `docs/PROTOTYPE.md` | Prototype notes |

### User Stories

Khi cần tham chiếu User Story, **bắt buộc dùng file JSON**:

- **File**: `docs/user-stories.json`
- **Không dùng** file `.md` (đã xóa)
- **ID format**: `US-DASH-01`, `US-ENTRY-01`, `US-CHAT-01`, `US-CAL-01`, `US-SET-01~03` (stories cũ) và `US-1.5`, `US-1.6`, `US-5.1~5.5`, `US-6.1~6.5`, `US-7.1~7.4`, `US-8.1~8.2`, `US-9.1`, `US-10.1~10.2`, `US-11.1~11.2`, `US-12.1~12.3`, `US-13.1` (stories mới)

## Conventions

- Ngôn ngữ giao tiếp: Tiếng Việt
- Timezone: Asia/Ho_Chi_Minh
- Draft files lưu tại: `.claude/drafts/`
- Dùng `--legacy-peer-deps` khi npm install
- TypeScript strict mode — 0 errors required
- npm scripts: `npm run ts:check` (tsc), `npm run lint` (expo lint)
