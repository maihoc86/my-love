# AI Love

> Yêu thương thông minh hơn mỗi ngày ✨

Ứng dụng mobile trợ lý tình yêu AI — giúp ghi nhận, quản lý mọi thông tin về người yêu một cách thông minh: sở thích ăn uống, địa điểm yêu thích, ngày kỷ niệm, album ảnh hẹn hò, và gợi ý AI cá nhân hóa hàng ngày. Nhập liệu bằng ngôn ngữ tự nhiên hoặc giọng nói — AI tự động phân tích, phân loại và lưu trữ.

**Chủ dự án:** Thái Hoàng Mai Học
**Loại dự án:** Cá nhân (Personal Project)
**Trạng thái:** Phase 0 — Setup & Design (In Progress)

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

## Tính Năng

### Core (5 tabs chính)

| Tab | Tính năng |
|-----|-----------|
| **Dashboard** | Hero card, mini-app grid (8 features kiểu Grab), quick stats, upcoming dates, cảnh báo dị ứng, recent entries |
| **Thêm ghi chú** | Form 11 danh mục, 5 mức cảm xúc, tags, ngày sự kiện, lặp lại hàng năm |
| **AI Chat** | Text + voice input tiếng Việt, AI parse entries, preview & batch save, typing indicator, gợi ý AI |
| **Lịch** | Countdown ring SVG, color-coded urgency, nhắc nhở, bottom sheet form thêm ngày |
| **Cài đặt** | Profile, thông tin người yêu, tài khoản, bảo mật (biometric), sao lưu, thông báo, đăng xuất |

### 11 Danh Mục Ghi Chú

| # | Danh mục | Key | Icon |
|---|----------|-----|------|
| 1 | Ẩm thực | food | UtensilsCrossed |
| 2 | Địa điểm | place | MapPin |
| 3 | Sở thích | hobby | Heart |
| 4 | Phong cách | style | Shirt |
| 5 | Âm nhạc | music | Music |
| 6 | Phim ảnh | movie | Film |
| 7 | Quà tặng | gift | Gift |
| 8 | Sức khỏe | health | Activity |
| 9 | Gia đình | family | Users |
| 10 | Công việc | work | Briefcase |
| 11 | Khác | other | MoreHorizontal |

### Advanced (mini-apps)

| Tính năng | Mô tả |
|-----------|--------|
| **Bản đồ hẹn hò** | Mapbox/eKMap với 5 loại địa điểm (quán ăn, cafe, homestay, khu vui chơi, TTTM), AI gợi ý, dẫn đường |
| **Album ảnh** | Lưu ảnh hẹn hò theo sự kiện, filter (hẹn hò/du lịch/kỷ niệm/yêu thích), photo grid mixed layout |
| **Đếm ngày yêu** | Counter lớn + breakdown (năm/tháng/ngày/giờ) + milestones timeline (100, 365, 1000 ngày...) |
| **Insight 360°** | Neuron map SVG trực quan hóa thông tin, sentiment analysis, AI tổng quan |
| **Voice Note** | Ghi âm → STT (OpenRouter Audio API) → AI parse → tạo entries tự động |
| **Daily Reminder** | Nhắc nhở hàng ngày, AI gợi ý 3-5 việc nên làm, cài đặt giờ/kênh/quiet hours |
| **Chat History** | Lịch sử chat AI, search, filter (text/voice/AI suggest), nhóm theo ngày |
| **All Notes** | Tìm kiếm, filter chips theo danh mục, sort (mới nhất/cũ nhất/A→Z), swipe-to-delete |

### Auth & Onboarding

| Screen | Mô tả |
|--------|--------|
| **Login** | Phone/Email + Password, OTP login, Google OAuth |
| **Register** | Phone + Email + OTP verification + Password |
| **Forgot Password** | 3-step: nhập SĐT/Email → verify OTP → đặt mật khẩu mới |
| **Onboarding** | 5-step flow: Welcome → Tên người yêu → Ngày sinh → Ngày kỷ niệm → Avatar |

## Tech Stack

| Thành phần | Công nghệ | Phiên bản |
|------------|-----------|-----------|
| Runtime | React Native | 0.81.5 |
| Framework | Expo SDK | 54 |
| Router | Expo Router (file-based) | 6 |
| Language | TypeScript (strict mode) | — |
| Design System | Centralized `src/theme/` (Nano Banana Pro) | — |
| Animations | `Animated` API (spring/timing) | — |
| Database | Supabase (PostgreSQL + Auth + Storage + RLS) | — |
| AI Chat | OpenRouter → Claude Sonnet 4 | — |
| Voice STT/TTS | OpenRouter → GPT-4o Audio Preview | — |
| AI Fallback | Gemini 2.0 Flash | — |
| Maps | Mapbox / eKMap | — |
| Notifications | Telegram Bot API + Expo Push Notifications | — |
| Secure Storage | expo-secure-store (Keychain/Keystore) | — |
| Audio | expo-av (recording + playback) | — |
| Icons | lucide-react-native | — |

## Kiến Trúc

**Pattern:** Serverless BaaS — không có custom backend server.

```
┌───────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                             │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │         AI Love Mobile App (React Native + Expo)        │  │
│  │                                                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐  │  │
│  │  │Dashboard │  │ AI Chat  │  │Calendar│  │ Settings │  │  │
│  │  │(MiniApps)│  │ + Voice  │  │        │  │ (4 subs) │  │  │
│  │  └──────────┘  └──────────┘  └────────┘  └──────────┘  │  │
│  │                                                         │  │
│  │  State: React Context + AsyncStorage + SecureStore      │  │
│  └───────────────────────┬─────────────────────────────────┘  │
│                          │ HTTPS                              │
└──────────────────────────┼────────────────────────────────────┘
           ┌───────────────┼──────────────────┐
           │               │                  │
           ▼               ▼                  ▼
  ┌─────────────────┐ ┌──────────────┐ ┌────────────────┐
  │    SUPABASE     │ │  OPENROUTER  │ │   EXTERNAL     │
  │    (BaaS)       │ │  (AI Gateway)│ │   SERVICES     │
  │                 │ │              │ │                │
  │ • Auth (GoTrue) │ │ • Claude 4   │ │ • Telegram Bot │
  │ • PostgreSQL    │ │   (NLP Chat) │ │ • Mapbox/eKMap │
  │ • Storage       │ │ • GPT-4o     │ │ • Expo Push    │
  │ • RLS policies  │ │   (STT/TTS)  │ │                │
  │ • Realtime      │ │ • Gemini     │ └────────────────┘
  └─────────────────┘ │   (Fallback) │
                      └──────────────┘
```

Chi tiết kiến trúc: [docs/SOLUTION_ARCHITECTURE.md](docs/SOLUTION_ARCHITECTURE.md)

## Cấu Trúc Dự Án

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
│   │   └── [id].tsx              # Entry detail (view + edit)
│   ├── settings/                 # Settings sub-screens
│   │   ├── personal-info.tsx     # Thông tin cá nhân
│   │   ├── partner-info.tsx      # Thông tin người yêu
│   │   ├── security.tsx          # Bảo mật (biometric, OTP 2FA)
│   │   └── backup.tsx            # Sao lưu & đồng bộ
│   ├── date-map.tsx              # Bản đồ hẹn hò
│   ├── album.tsx                 # Album ảnh
│   ├── love-counter.tsx          # Đếm ngày yêu
│   ├── insight.tsx               # Insight 360°
│   ├── voice-note.tsx            # Ghi chú giọng nói
│   ├── recording.tsx             # Ghi âm (STT)
│   ├── chat-history.tsx          # Lịch sử chat
│   └── daily-reminder.tsx        # Nhắc nhở hàng ngày
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
├── docs/                         # Tài liệu dự án
└── stitch/                       # UI Design prototypes (Google Stitch)
```

## Cài Đặt & Chạy

### Yêu cầu

- Node.js >= 18
- npm
- Expo CLI (`npx expo`)
- iOS Simulator (macOS) hoặc Android Emulator
- Thiết bị thật khuyến nghị: iPhone (iOS 15+) + Android (API 28+)

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
| **users** | Profile, lover info, onboarding, love_start_date |
| **entries** | Ghi chú (category, title, detail, sentiment, tags, event_date) |
| **special_dates** | Ngày đặc biệt (title, date, category, recurring, reminder_days) |
| **voice_notes** | Ghi chú giọng nói (audio_url, transcription, duration, parsed_entries) |
| **photos** | Ảnh hẹn hò (url, thumbnail_url, event_title, category) |
| **saved_places** | Địa điểm yêu thích (name, lat/lng, category, rating) |
| **chat_sessions** | Phiên chat (type, messages, entries_created) |

> Chi tiết schema & RLS policies xem tại [docs/SOLUTION_ARCHITECTURE.md](docs/SOLUTION_ARCHITECTURE.md#4-data-model)

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

## Timeline Dự Án

| Giai đoạn | Thời gian | Nội dung | Trạng thái |
|-----------|-----------|----------|------------|
| Phase 0: Setup & Design | W1-W3 (17/03 - 04/04) | BRD, SRS, UI mockups, Architecture, Dev environment | Đang thực hiện |
| Phase 1: Core Development | W4-W9 (07/04 - 16/05) | Auth, Dashboard, Entry CRUD, Calendar, Settings, Navigation | Sắp tới |
| Phase 2: AI & Voice | W7-W10 (28/04 - 23/05) | AI Chat, Voice Note, Daily Reminder, Telegram Bot | Sắp tới |
| Phase 3: Advanced Features | W10-W14 (19/05 - 20/06) | Date Map, Photo Album, Love Counter, Insight 360°, Chat History | Chờ |
| Phase 4: Testing & Polish | W14-W16 (16/06 - 04/07) | E2E tests, performance, bug fixing, Store compliance | Chờ |
| Phase 5: Store Submission | W16-W18 (30/06 - 18/07) | TestFlight, Internal Testing, App Store + Google Play submission | Chờ |

**Tổng thời gian: ~18 tuần (~4.5 tháng)**

Chi tiết: [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md)

## Tài Liệu

| Tài liệu | Mô tả |
|-----------|--------|
| [BRD](docs/BRD.md) | Business Requirements Document (v3.0) — 17 modules, chi tiết trường dữ liệu |
| [SRS](docs/SRS.md) | Software Requirements Specification — yêu cầu kỹ thuật chi tiết |
| [Technical Proposal](docs/TECHNICAL_PROPOSAL.md) | Đề xuất kỹ thuật — vấn đề, giải pháp, ROI, chi phí |
| [Solution Architecture](docs/SOLUTION_ARCHITECTURE.md) | Kiến trúc giải pháp — system design, data model, security, scaling |
| [Project Plan](docs/PROJECT_PLAN.md) | Kế hoạch dự án — timeline, milestones, nguồn lực, rủi ro |
| [User Stories](docs/user-stories.json) | User Stories (JSON format) |
| [Store Guidelines](docs/STORE_GUIDELINES.md) | Quy định Google Play & App Store |
| [Stitch Prompts](docs/STITCH_PROMPT.md) | Google Stitch UI prompts |

## App Configuration

| Key | Value |
|-----|-------|
| **App name** | AI Love |
| **iOS Bundle ID** | `com.tienphongcds.ailove` |
| **Android Package** | `com.tienphongcds.ailove` |
| **URI Scheme** | `ailove` |

## Compatibility

- iOS >= 15.0
- Android >= API 24 (Android 7.0)
- Expo SDK 54
- React Native 0.81.5

## License

Tài sản trí tuệ cá nhân của Thái Hoàng Mai Học. Mọi quyền được bảo lưu.
