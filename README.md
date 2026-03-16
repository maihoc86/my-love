# AI Love

> Yêu thương thông minh hơn mỗi ngày ✨

Ứng dụng mobile trợ lý tình yêu AI — giúp ghi nhận, quản lý mọi thông tin về người yêu: sở thích ăn uống, địa điểm yêu thích, ngày kỷ niệm, album ảnh hẹn hò, và gợi ý AI thông minh hàng ngày.

## Brand Identity (Nano Banana Pro)

| Element | Value |
|---------|-------|
| **Logo** | **AI** (golden `#FFB800`) + **Love** (coral `#FF2D55`) |
| **Slogan** | Yêu thương thông minh hơn mỗi ngày ✨ |
| **Primary** | `#FF2D55` Hot Coral Pink |
| **Secondary** | `#7B61FF` Electric Violet |
| **Accent** | `#FFB800` Golden Banana |
| **Background** | `#FFFBF5` Warm Ivory |
| **Text** | `#1A1033` Deep Midnight (violet-tinted) |
| **Style** | Premium warm · nano details · banana accent energy |

## Tính năng

### Core (5 tabs chính)

| Tab | Tính năng |
|-----|-----------|
| **Dashboard** | Hero card, mini-app grid (8 features kiểu Grab), quick stats, upcoming dates, cảnh báo dị ứng, recent entries |
| **Thêm ghi chú** | Form 11 category, 5 sentiment, tùy chọn nâng cao (ngày, lặp lại hàng năm) |
| **AI Chat** | Text + voice input tiếng Việt, AI parse entries, typing indicator, lịch sử chat, gợi ý AI |
| **Lịch** | Countdown ring SVG, color-coded urgency, bell reminder, bottom sheet form |
| **Cài đặt** | Profile, thông tin người yêu, tài khoản, thông báo (toggles), chung, hỗ trợ, đăng xuất |

### Advanced (sub-screens)

| Tính năng | Mô tả |
|-----------|--------|
| **Bản đồ hẹn hò** | eKMap với 5 category (quán ăn, cafe, homestay, khu vui chơi, TTTM), AI gợi ý dựa trên sở thích |
| **Dẫn đường** | Turn-by-turn navigation, chọn phương tiện (ô tô/xe máy/đi bộ), ETA |
| **Album ảnh** | Lưu ảnh hẹn hò theo sự kiện, filter, photo grid mixed layout |
| **Đếm ngày yêu** | Counter lớn + breakdown (năm/tháng/ngày/giờ) + milestones timeline |
| **Insight 360°** | Neuron map SVG trực quan hóa thông tin, sentiment analysis, AI tổng quan |
| **Voice Note** | Ghi chú giọng nói, AI speech-to-text + parse entries, waveform preview |
| **Daily Reminder** | Nhắc nhở hàng ngày, AI gợi ý 3-5 việc nên làm, cài đặt giờ/kênh |
| **Chat History** | Lịch sử chat AI, search, filter (text/voice/AI suggest), nhóm theo ngày |

### Auth

| Screen | Mô tả |
|--------|--------|
| **Login** | Phone OTP (primary) + password fallback + Google OAuth |
| **Register** | Phone + email + OTP verification + password |
| **Forgot Password** | 3-step: nhập phone → verify OTP → đặt mật khẩu mới |

### Onboarding

5-step flow: Welcome → Partner Name → Birthday → Anniversary → Avatar

## Tech Stack

| Thành phần | Công nghệ |
|------------|-----------|
| Framework | React Native 0.81.5 + Expo SDK 54 |
| Language | TypeScript (strict mode) |
| Routing | Expo Router 6 (file-based) |
| Design System | Centralized `src/theme/` (Nano Banana Pro) |
| Animations | `Animated` API (spring/timing) |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| AI | OpenRouter API (Claude Sonnet) |
| Voice | expo-av + OpenRouter Whisper |
| Maps | eKMap SDK |
| Notifications | Telegram Bot API + Expo Notifications |
| Secure Storage | expo-secure-store |
| Icons | lucide-react-native |

## Kiến trúc

```
┌──────────────────────────────────────────┐
│            MOBILE APP (Expo)             │
│  ┌────────┬────────┬────────┬────────┐  │
│  │Dashboard│AI Chat │Calendar│Settings│  │
│  │(MiniApp)│+Voice  │        │(User)  │  │
│  ├────────┼────────┼────────┼────────┤  │
│  │Date Map│Album   │Insight │Love    │  │
│  │(eKMap) │Photos  │360°    │Counter │  │
│  └───┬────┴───┬────┴───┬────┴───┬────┘  │
│      │        │        │        │        │
│  ┌───┴────┐┌──┴───┐┌──┴────┐┌──┴─────┐  │
│  │Supabase││OpenRt││Telegr ││eKMap   │  │
│  │Client  ││Client││Client ││SDK     │  │
│  └───┬────┘└──┬───┘└──┬────┘└──┬─────┘  │
└──────┼────────┼───────┼────────┼─────────┘
       │        │       │        │
  ┌────┴───┐┌───┴──┐┌───┴───┐┌──┴─────┐
  │Supabase││OpenRt││Telegr ││eKMap   │
  │Cloud   ││API   ││Bot API││Server  │
  │PG+Auth ││Claude││       ││        │
  │+Storage││      ││       ││        │
  └────────┘└──────┘└───────┘└────────┘
```

## Cấu trúc dự án

```
ai-love-mobile/
├── app/                          # Expo Router (file-based)
│   ├── _layout.tsx               # Root layout + animated splash
│   ├── index.tsx                 # Landing/redirect
│   ├── onboarding.tsx            # 5-step onboarding
│   ├── (auth)/                   # Auth screens
│   │   ├── login.tsx             # OTP-first login
│   │   ├── register.tsx          # Registration
│   │   └── forgot-password.tsx   # Password recovery
│   ├── (tabs)/                   # Main app (5-tab bar + FAB)
│   │   ├── _layout.tsx           # Tab bar with central FAB
│   │   ├── index.tsx             # Dashboard
│   │   ├── add.tsx               # Add Entry
│   │   ├── chat.tsx              # AI Chat
│   │   ├── calendar.tsx          # Calendar
│   │   └── settings.tsx          # Settings
│   ├── entries/                  # Entry screens
│   │   ├── all.tsx               # All notes
│   │   └── [id].tsx              # Entry detail
│   ├── settings/                 # Settings sub-screens
│   │   ├── personal-info.tsx
│   │   ├── partner-info.tsx
│   │   ├── security.tsx
│   │   └── backup.tsx
│   ├── date-map.tsx              # Bản đồ hẹn hò
│   ├── album.tsx                 # Album ảnh
│   ├── love-counter.tsx          # Đếm ngày yêu
│   ├── insight.tsx               # Insight 360°
│   ├── voice-note.tsx            # Ghi chú giọng nói
│   ├── recording.tsx             # Ghi âm
│   ├── chat-history.tsx          # Lịch sử chat
│   └── daily-reminder.tsx        # Nhắc nhở
├── src/
│   ├── theme/                    # Design System (Nano Banana Pro)
│   │   ├── colors.ts             # Color tokens
│   │   ├── spacing.ts            # Spacing & layout
│   │   ├── typography.ts         # Font system
│   │   ├── shadows.ts            # Shadow presets
│   │   └── index.ts              # Barrel export
│   ├── components/               # Shared UI components
│   │   ├── ui/                   # Base primitives
│   │   ├── ChatBubble.tsx
│   │   ├── EntryCard.tsx
│   │   ├── CountdownRing.tsx
│   │   └── ...
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useEntries.ts
│   │   └── useSpecialDates.ts
│   ├── lib/                      # Service clients
│   │   ├── supabase.ts
│   │   ├── openrouter.ts
│   │   ├── telegram.ts
│   │   └── constants.ts
│   └── types/
├── assets/                       # App icon, splash, favicons
├── docs/                         # BRD, SRS, User Stories, Store Guidelines
└── stitch/                       # UI Design prototypes (Google Stitch)
```

## Cài đặt & Chạy

### Yêu cầu

- Node.js >= 18
- npm
- Expo CLI (`npx expo`)
- iOS Simulator (macOS) hoặc Android Emulator

### 1. Clone & cài dependencies

```bash
git clone <repo-url>
cd ai-love-mobile
npm install --legacy-peer-deps
```

### 2. Cấu hình biến môi trường

Tạo file `.env` tại root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_OPENROUTER_API_KEY=your-openrouter-key
EXPO_PUBLIC_TELEGRAM_BOT_TOKEN=your-bot-token
EXPO_PUBLIC_TELEGRAM_CHAT_ID=your-chat-id
EXPO_PUBLIC_EKMAP_API_KEY=your-ekmap-key
```

### 3. Setup Supabase

Tạo các bảng trong Supabase Dashboard:

| Table | Mô tả |
|-------|--------|
| **users** | Profile, lover info, love_start_date |
| **entries** | Ghi chú (category, title, detail, sentiment, tags) |
| **special_dates** | Ngày đặc biệt (sinh nhật, kỷ niệm) |
| **ai_logs** | Lịch sử chat AI |
| **voice_notes** | Ghi chú giọng nói (audio_url, transcript) |
| **photos** | Ảnh hẹn hò (image_url, event_title) |
| **saved_places** | Địa điểm yêu thích (name, lat/lng, category) |
| **chat_sessions** | Phiên chat (type, messages, entries_saved) |

> Chi tiết schema xem tại [docs/SRS.md](docs/SRS.md#3-data-model)

### 4. Chạy ứng dụng

```bash
# Development server
npm start

# iOS
npm run ios

# Android
npm run android

# TypeScript check
npm run ts:check

# Lint
npm run lint
```

## Tài liệu

| Tài liệu | Mô tả |
|-----------|--------|
| [BRD](docs/BRD.md) | Business Requirements Document |
| [SRS](docs/SRS.md) | Software Requirements Specification |
| [User Stories](docs/user-stories.json) | User Stories (JSON) |
| [Store Guidelines](docs/STORE_GUIDELINES.md) | Quy định Google Play & App Store |
| [Stitch Prompts](docs/STITCH_PROMPT.md) | Google Stitch UI prompts |

## App Configuration

| Key | Value |
|-----|-------|
| **Package name** | `ai-love-mobile` |
| **iOS Bundle ID** | `com.tienphongcds.ailove` |
| **Android Package** | `com.tienphongcds.ailove` |
| **URI Scheme** | `ailove` |
| **Version** | 2.0.0 |

## Compatibility

- iOS >= 15.0
- Android >= API 24 (Android 7.0)
- Expo SDK 54
- React Native 0.81.5

## License

Private — Internal use only.
