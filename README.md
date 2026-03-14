# MyLoveThaiHoc

Ứng dụng mobile cá nhân giúp ghi nhận, quản lý mọi thông tin về người yêu (Thái Hoc) — từ sở thích ăn uống, địa điểm yêu thích, đến ngày kỷ niệm, album ảnh hẹn hò, và gợi ý AI hàng ngày.

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
| **Login** | Email/phone + password, Google OAuth, OTP |
| **Register** | Phone + email + OTP verification + password |
| **Forgot Password** | 3-step: nhập phone → verify OTP → đặt mật khẩu mới |

## Tech Stack

| Thành phần | Công nghệ |
|------------|-----------|
| Framework | React Native 0.83 + Expo SDK 55 |
| Language | TypeScript |
| Routing | Expo Router (file-based) |
| Styling | NativeWind (Tailwind CSS for RN) |
| Animations | react-native-reanimated 3 |
| Lists | @shopify/flash-list |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| AI | OpenRouter API (Claude Sonnet) |
| Voice | expo-av + OpenRouter Whisper |
| Maps | eKMap SDK |
| Notifications | Telegram Bot API + Expo Notifications |
| Secure Storage | expo-secure-store |

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
  │+Storage││+Whisp││       ││        │
  └────────┘└──────┘└───────┘└────────┘
```

## Cấu trúc dự án

```
MyLoveThaiHoc-Mobile/
├── app/                          # Expo Router
│   ├── (auth)/                   # Auth screens (no tab bar)
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                   # Main app (5-tab bar)
│   │   ├── index.tsx             # Dashboard
│   │   ├── add.tsx               # Add Entry
│   │   ├── chat.tsx              # AI Chat
│   │   ├── calendar.tsx          # Calendar
│   │   └── settings.tsx          # Settings
│   ├── date-map.tsx              # Bản đồ hẹn hò
│   ├── navigation.tsx            # Dẫn đường
│   ├── album.tsx                 # Album ảnh
│   ├── love-counter.tsx          # Đếm ngày yêu
│   ├── insight.tsx               # Insight 360°
│   ├── voice-note.tsx            # Ghi chú giọng nói
│   ├── chat-history.tsx          # Lịch sử chat
│   └── daily-reminder.tsx        # Nhắc nhở
├── src/
│   ├── components/               # Shared UI components
│   │   ├── BottomTabBar.tsx
│   │   ├── MiniAppGrid.tsx
│   │   ├── NeuronMap.tsx
│   │   ├── CountdownRing.tsx
│   │   ├── WaveformBars.tsx
│   │   ├── PhotoGrid.tsx
│   │   └── ...
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useEntries.ts
│   │   ├── useVoiceRecorder.ts
│   │   ├── useLoveCounter.ts
│   │   └── ...
│   ├── lib/                      # Service clients
│   │   ├── supabase.ts
│   │   ├── openrouter.ts
│   │   ├── telegram.ts
│   │   ├── ekmap.ts
│   │   └── speech.ts
│   ├── types/
│   └── theme/
├── assets/
├── docs/                         # Documentation (BRD, SRS, User Stories)
└── stitch 2/                     # UI Design reference (15 screens)
```

## Cài đặt & Chạy

### Yêu cầu

- Node.js >= 18
- npm hoặc yarn
- Expo CLI (`npx expo`)
- iOS Simulator (macOS) hoặc Android Emulator

### 1. Clone & cài dependencies

```bash
git clone <repo-url>
cd MyLoveThaiHoc-Mobile
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
| **users** | Profile, lover info, love_start_date (managed by Supabase Auth) |
| **entries** | Ghi chú (category, title, detail, sentiment, tags) |
| **special_dates** | Ngày đặc biệt (sinh nhật, kỷ niệm) |
| **ai_logs** | Lịch sử chat AI |
| **voice_notes** | Ghi chú giọng nói (audio_url, transcript, status) |
| **photos** | Ảnh hẹn hò (image_url, event_title, category) |
| **saved_places** | Địa điểm yêu thích (name, lat/lng, category, rating) |
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
```

## Tài liệu

| Tài liệu | Version | Mô tả |
|-----------|---------|--------|
| [BRD](docs/BRD.md) | v2.0 | Business Requirements — 17 modules, 7 objectives |
| [SRS](docs/SRS.md) | v2.0 | Software Requirements — 16 screens, 8 tables, 7 API specs |
| [User Stories](docs/USER_STORIES.md) | v2.0 | 13 epics, 37 stories, 118 story points |
| [Prototype](docs/PROTOTYPE.md) | v1.0 | Wireframe descriptions |
| [UI Review](docs/STITCH2_UI_REVIEW.md) | v1.0 | Stitch 2 UI/UX evaluation (8.3/10) |

## Sprint Planning

| Sprint | Focus | Points |
|--------|-------|--------|
| Sprint 1 (5 days) | Auth + Core CRUD + Dashboard | 44 |
| Sprint 2 (5 days) | AI Chat + Voice + Settings | 25 |
| Sprint 3 (5 days) | Maps + Album + Love Counter | 25 |
| Sprint 4 (5 days) | Insight + Reminder + History | 24 |

**Total: 118 story points / 4 sprints / 20 working days**

## Design Reference

15 screens UI đã được generate bằng Google Stitch, lưu tại `stitch 2/`:

```
Auth:       Login, Register (OTP), Forgot Password
Tabs:       Dashboard, Add Entry, AI Chat, Calendar, Settings
Sub:        Date Map, Navigation, Album, Insight 360°,
            Voice Note, Recording State, Chat History
```

> Đánh giá UI/UX: **8.3/10** — Chi tiết tại [STITCH2_UI_REVIEW.md](docs/STITCH2_UI_REVIEW.md)

## Compatibility

- iOS >= 15.0
- Android >= API 24 (Android 7.0)
- Expo SDK 55+
- React Native 0.83+

## License

Private — Internal use only.
