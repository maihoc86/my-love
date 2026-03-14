# Software Requirements Specification (SRS)
## MyLoveThaiHoc Mobile App

| Thông tin | Chi tiết |
|-----------|----------|
| **Dự án** | MyLoveThaiHoc Mobile |
| **Phiên bản tài liệu** | 2.0.0 |
| **Ngày tạo** | 2026-03-14 |
| **Tham chiếu** | BRD v1.0.0 |
| **Nền tảng** | React Native (Expo) — iOS & Android |

---

## 1. Giới Thiệu

### 1.1. Mục đích tài liệu
Tài liệu SRS mô tả chi tiết yêu cầu kỹ thuật cho ứng dụng MyLoveThaiHoc Mobile, bao gồm kiến trúc hệ thống, yêu cầu chức năng chi tiết, data model, API specifications, và yêu cầu phi chức năng.

### 1.2. Phạm vi hệ thống
Hệ thống gồm 5 thành phần:
1. **Mobile App** (React Native/Expo) — Frontend
2. **Supabase** (PostgreSQL + Auth + Storage) — Backend/Database/Auth
3. **External APIs** (OpenRouter AI, Telegram Bot) — AI & Notifications
4. **eKMap SDK** — Maps & Navigation
5. **Speech-to-Text** (OpenRouter Whisper) — Voice Processing

### 1.3. Thuật ngữ

| Thuật ngữ | Định nghĩa |
|-----------|------------|
| Entry | Một ghi chú về người yêu (VD: "Em thích phở bò") |
| Category | Phân loại của entry (food, place, hobby...) |
| Sentiment | Mức độ cảm xúc (love, like, neutral, dislike, hate) |
| Special Date | Ngày đặc biệt cần nhớ (sinh nhật, kỷ niệm) |
| NLP Parse | AI phân tích văn bản tự nhiên thành structured data |
| Voice Note | Ghi chú bằng giọng nói, AI tự chuyển thành text |
| Date Spot | Địa điểm hẹn hò gợi ý bởi AI và bản đồ |
| Neuron Map | Sơ đồ trực quan hóa thông tin dạng mạng nơ-ron |
| Love Counter | Bộ đếm ngày yêu nhau tự động |
| MFRI | Mobile Feasibility & Risk Index |

---

## 2. Kiến Trúc Hệ Thống

### 2.1. High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    MOBILE APP (Expo)                      │
│  ┌─────────┬────────┬────────┬────────┬────────┐        │
│  │Dashboard│Entries │AI Chat │Calendar│Settings│        │
│  │(MiniApp)│        │+Voice  │        │(User)  │        │
│  ├─────────┼────────┼────────┼────────┼────────┤        │
│  │Date Map │Album   │Insight │Love    │Voice   │        │
│  │(eKMap)  │Photos  │360°    │Counter │Note    │        │
│  └────┬────┴───┬────┴───┬────┴───┬────┴───┬────┘        │
│       │        │        │        │        │              │
│  ┌────┴────────┴────────┴────────┴────────┴────┐        │
│  │          State Management (SWR + Hooks)      │        │
│  └────┬────────┬────────┬────────┬─────────────┘        │
│       │        │        │        │                       │
│  ┌────┴──┐ ┌───┴──┐ ┌──┴────┐ ┌─┴─────┐               │
│  │Supa   │ │Open  │ │Tele   │ │eKMap  │               │
│  │base   │ │Router│ │gram   │ │SDK    │               │
│  └───┬───┘ └──┬───┘ └──┬───┘ └──┬────┘               │
└──────┼────────┼────────┼────────┼─────────────────────┘
       │        │        │        │
  ┌────┴───┐ ┌──┴───┐ ┌──┴─────┐ ┌┴──────┐
  │Supabase│ │Open  │ │Telegram│ │eKMap  │
  │Cloud   │ │Router│ │Bot API │ │Server │
  │(PG+Auth│ │API   │ │        │ │       │
  │+Store) │ │      │ │        │ │       │
  └────────┘ └──────┘ └────────┘ └───────┘
```

### 2.2. Project Structure

```
MyLoveThaiHoc-Mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── _layout.tsx               # Root layout
│   ├── (auth)/                   # Auth group (no tab bar)
│   │   ├── login.tsx             # Login screen
│   │   ├── register.tsx          # Register + OTP
│   │   └── forgot-password.tsx   # Forgot password flow
│   ├── (tabs)/                   # Main app (tab bar)
│   │   ├── _layout.tsx           # Tab bar configuration
│   │   ├── index.tsx             # Dashboard (Trang chủ)
│   │   ├── add.tsx               # Add Entry (Thêm)
│   │   ├── chat.tsx              # AI Chat
│   │   ├── calendar.tsx          # Calendar (Lịch)
│   │   └── settings.tsx          # Settings (Cài đặt)
│   ├── date-map.tsx              # Bản đồ hẹn hò
│   ├── navigation.tsx            # Dẫn đường
│   ├── album.tsx                 # Album ảnh
│   ├── love-counter.tsx          # Đếm ngày yêu
│   ├── insight.tsx               # Insight 360°
│   ├── voice-note.tsx            # Ghi chú giọng nói
│   ├── recording.tsx             # Trạng thái ghi âm
│   ├── chat-history.tsx          # Lịch sử chat
│   └── daily-reminder.tsx        # Nhắc nhở hàng ngày
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── BottomTabBar.tsx      # Shared bottom navigation
│   │   ├── EntryCard.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── SentimentPicker.tsx
│   │   ├── CountdownRing.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── MiniAppGrid.tsx       # Dashboard feature tiles
│   │   ├── NeuronMap.tsx         # Insight SVG visualization
│   │   ├── WaveformBars.tsx      # Voice note waveform
│   │   ├── PhotoGrid.tsx         # Album photo grid
│   │   ├── MapPins.tsx           # Date map pins
│   │   └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useEntries.ts
│   │   ├── useSpecialDates.ts
│   │   ├── useAuth.ts            # Authentication hook
│   │   ├── useVoiceRecorder.ts   # Voice recording hook
│   │   ├── useLoveCounter.ts     # Love day calculation
│   │   └── useLocation.ts        # GPS + eKMap
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── openrouter.ts
│   │   ├── telegram.ts
│   │   ├── ekmap.ts              # eKMap SDK wrapper
│   │   ├── speech.ts             # Speech-to-text
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts
│       └── spacing.ts
├── assets/
├── docs/
├── app.json
└── tsconfig.json
```

### 2.3. Technology Stack Detail

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | React Native | 0.76+ |
| Framework | Expo SDK | 52+ |
| Language | TypeScript | 5.x |
| Routing | Expo Router | 4.x |
| Styling | NativeWind | 4.x |
| Database | Supabase JS | 2.x |
| AI API | OpenRouter (REST) | v1 |
| Telegram | Telegram Bot API | latest |
| Date Utils | date-fns | 4.x |
| Icons | lucide-react-native | 0.x |
| Storage | @react-native-async-storage | 2.x |
| Maps | eKMap SDK | latest |
| Voice | expo-av | 14.x |
| Speech-to-Text | OpenRouter Whisper | v1 |
| Auth | Supabase Auth | 2.x |
| Image Storage | Supabase Storage | 2.x |
| Image Picker | expo-image-picker | 15.x |
| Animations | react-native-reanimated | 3.x |
| Lists | @shopify/flash-list | 1.x |
| Secure Storage | expo-secure-store | 13.x |

---

## 3. Data Model

### 3.1. Entity Relationship Diagram

```
┌──────────────────────┐     ┌──────────────────────┐
│       entries         │     │    special_dates      │
├──────────────────────┤     ├──────────────────────┤
│ id: UUID (PK)        │     │ id: UUID (PK)        │
│ user_id: UUID (FK)   │     │ user_id: UUID (FK)   │
│ category: ENUM       │     │ title: TEXT           │
│ title: TEXT           │     │ description: TEXT     │
│ detail: TEXT          │     │ event_date: DATE      │
│ sentiment: ENUM      │     │ is_recurring: BOOL    │
│ event_date: DATE?    │     │ reminder_days: INT    │
│ is_recurring: BOOL   │     │ category: ENUM        │
│ reminder_days: INT   │     │ last_reminded_at: TS? │
│ tags: TEXT[]         │     │ created_at: TIMESTAMPTZ│
│ created_at: TIMESTAMPTZ│   └──────────────────────┘
│ updated_at: TIMESTAMPTZ│
└──────────────────────┘     ┌──────────────────────┐
                              │      ai_logs          │
                              ├──────────────────────┤
                              │ id: UUID (PK)        │
                              │ user_id: UUID (FK)   │
                              │ user_input: TEXT      │
                              │ ai_response: TEXT     │
                              │ parsed_entries: JSONB │
                              │ created_at: TIMESTAMPTZ│
                              └──────────────────────┘
```

### 3.2. Users Table

```
users (managed by Supabase Auth)
├── id: UUID (PK)
├── email: TEXT
├── phone: TEXT
├── full_name: TEXT
├── avatar_url: TEXT
├── lover_name: TEXT (default: "Thái Hoc")
├── lover_birthday: DATE
├── lover_nickname: TEXT
├── love_start_date: DATE
├── created_at: TIMESTAMPTZ
└── updated_at: TIMESTAMPTZ
```

### 3.3. Voice Notes Table

```
voice_notes
├── id: UUID (PK)
├── user_id: UUID (FK → users)
├── audio_url: TEXT
├── duration_seconds: INT
├── transcript: TEXT
├── parsed_entries: JSONB
├── status: ENUM (pending, saved)
├── created_at: TIMESTAMPTZ
```

### 3.4. Photos Table

```
photos
├── id: UUID (PK)
├── user_id: UUID (FK → users)
├── image_url: TEXT
├── event_title: TEXT
├── event_date: DATE
├── category: ENUM (date, travel, anniversary, favorite)
├── created_at: TIMESTAMPTZ
```

### 3.5. Saved Places Table

```
saved_places
├── id: UUID (PK)
├── user_id: UUID (FK → users)
├── name: TEXT
├── address: TEXT
├── category: ENUM (restaurant, cafe, homestay, entertainment, mall)
├── latitude: FLOAT
├── longitude: FLOAT
├── rating: FLOAT
├── is_favorite: BOOL
├── created_at: TIMESTAMPTZ
```

### 3.6. Chat Sessions Table

```
chat_sessions
├── id: UUID (PK)
├── user_id: UUID (FK → users)
├── type: ENUM (text, voice, suggestion)
├── messages: JSONB
├── entries_saved: INT
├── created_at: TIMESTAMPTZ
```

### 3.7. Enums

**Category Enum (11 values)**:
```
food | place | hobby | date | gift | trait | allergy | style | music | movie | other
```

**Sentiment Enum (5 values)**:
```
love | like | neutral | dislike | hate
```

**Special Date Category Enum (4 values)**:
```
birthday | anniversary | holiday | other
```

**Voice Note Status Enum (2 values)**:
```
pending | saved
```

**Photo Category Enum (4 values)**:
```
date | travel | anniversary | favorite
```

**Place Category Enum (5 values)**:
```
restaurant | cafe | homestay | entertainment | mall
```

**Chat Session Type Enum (3 values)**:
```
text | voice | suggestion
```

### 3.8. RLS Policies
- Multi-user app với Supabase Auth
- All tables use `user_id = auth.uid()` policy
- SELECT, INSERT, UPDATE, DELETE allowed only for authenticated user's own data

---

## 4. Yêu Cầu Chức Năng Chi Tiết

### 4.1. SCR-01: Dashboard Screen

**Mô tả**: Màn hình chính hiển thị tổng quan mọi thông tin.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-D01 | Hiển thị tổng số entries đã lưu | P0 |
| FR-D02 | Mini-app feature grid (4x2): AI Chat, Bản đồ, Đếm ngày, Insight 360, Ghi âm, Album ảnh, Nhắc nhở, Ngày đặc biệt. Badges HOT/MỚI | P0 |
| FR-D03 | Hiển thị danh sách upcoming dates (trong 30 ngày), horizontal scroll | P0 |
| FR-D04 | Hiển thị cảnh báo dị ứng/ghét (category=allergy OR sentiment=hate) | P0 |
| FR-D05 | Hiển thị 5 entries gần nhất | P0 |
| FR-D06 | Quick action buttons: Thêm mới, Chat AI | P0 |
| FR-D07 | Hero card với gradient background và decorative elements | P1 |
| FR-D08 | Pull-to-refresh để reload data | P1 |
| FR-D09 | Skeleton loading state khi đang fetch data | P1 |
| FR-D10 | Quick stats bar: Ghi chú, Ngày yêu, Sự kiện, Ảnh | P0 |

**Data Flow**:
```
App Mount → useEntries() + useSpecialDates() → Supabase Query → setState → Render
```

### 4.2. SCR-02: Add Entry Screen

**Mô tả**: Form thêm ghi chú mới với category selector, sentiment picker.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-A01 | Category selector: grid 3 cột, 11 items, icon + label | P0 |
| FR-A02 | Title input: required, placeholder dynamic theo category | P0 |
| FR-A03 | Detail textarea: optional, multi-line | P0 |
| FR-A04 | Sentiment picker: 5 circular buttons (love→hate) | P0 |
| FR-A05 | Submit button: validate → save → success feedback | P0 |
| FR-A06 | Advanced options: event_date, is_recurring (expandable) | P1 |
| FR-A07 | Success toast animation sau khi lưu | P1 |
| FR-A08 | Auto-reset form sau khi lưu thành công | P0 |
| FR-A09 | Keyboard aware: form scroll khi keyboard mở | P0 |

**Validation Rules**:
- `title`: required, min 1 char, max 200 chars
- `category`: required, must be valid enum
- `sentiment`: required, must be valid enum
- `detail`: optional, max 2000 chars
- `event_date`: optional, must be valid date format

### 4.3. SCR-03: AI Chat Screen

**Mô tả**: Chat interface để nhập bằng ngôn ngữ tự nhiên, AI parse thành entries.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-C01 | Chat bubble UI: assistant (trái) + user (phải) | P0 |
| FR-C02 | Text input + send button (disabled khi rỗng) | P0 |
| FR-C03 | Gửi text → OpenRouter API → parse JSON entries | P0 |
| FR-C04 | Hiển thị parsed entries summary trong bubble | P0 |
| FR-C05 | "Lưu tất cả" button: batch save tất cả parsed entries | P0 |
| FR-C06 | "Gợi ý" button: generate daily suggestions từ existing entries | P1 |
| FR-C07 | Typing indicator (3 bouncing dots) khi đang chờ AI | P1 |
| FR-C08 | Error handling: hiển thị lỗi khi API fail | P0 |
| FR-C09 | Auto-scroll to bottom khi có message mới | P1 |
| FR-C10 | Role labels "Assistant" / "Bạn" trên mỗi message | P1 |
| FR-C11 | Voice input button (mic, purple) bên trái text input | P0 |
| FR-C12 | Voice recording state: pulsing mic, waveform, timer, Dừng & Gửi / Hủy | P0 |
| FR-C13 | Speech-to-text → auto send to AI for parsing | P0 |
| FR-C14 | Chat history button (clock icon) → navigate to Chat History | P0 |
| FR-C15 | Hint text: "Nhấn giữ 🎙 để nói tiếng Việt" | P1 |

**AI Prompt Spec**:
```
System: Parse thông tin người yêu từ câu văn tự nhiên tiếng Việt
Input: Free-form text (VD: "Em thích ăn phở, ghét ăn hành")
Output: JSON { entries: [{ category, title, detail, sentiment, date }] }
Model: anthropic/claude-sonnet-4 via OpenRouter
Max tokens: 2000
```

### 4.4. SCR-04: Calendar Screen

**Mô tả**: Quản lý ngày đặc biệt với countdown và reminder.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-L01 | Hiển thị danh sách ngày đặc biệt sorted by countdown | P0 |
| FR-L02 | Countdown ring SVG: hiển thị số ngày còn lại | P0 |
| FR-L03 | Color coding: xanh (hôm nay), đỏ (<=3), cam (<=7), hồng (else) | P0 |
| FR-L04 | Add form: bottom sheet style, slide-down animation | P0 |
| FR-L05 | Fields: title, description, date, category, recurring, reminder_days | P0 |
| FR-L06 | Toggle switch cho "Lặp lại hàng năm" | P0 |
| FR-L07 | Send reminder button: gửi qua Telegram | P1 |
| FR-L08 | Delete: double-tap confirmation (tap 1 = red highlight, tap 2 = delete) | P0 |
| FR-L09 | Category badges: icon + label (Sinh nhật/Kỷ niệm/Ngày lễ/Khác) | P1 |
| FR-L10 | Empty state: centered icon + message + CTA | P0 |

### 4.5. SCR-05: Settings Screen (User-Facing)

**Mô tả**: Quản lý tài khoản, thông tin người yêu, thông báo, và hỗ trợ.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-S01 | Profile card gradient: avatar, tên, email, phone, edit button | P0 |
| FR-S02 | Stats row: ghi chú, ngày đặc biệt, cuộc chat | P0 |
| FR-S03 | Section "Thông tin người yêu": tên gọi, sinh nhật, biệt danh, ảnh. Nút "Chỉnh sửa" | P0 |
| FR-S04 | Section "Tài khoản": thông tin cá nhân, đổi mật khẩu, bảo mật, sao lưu & đồng bộ | P0 |
| FR-S05 | Section "Thông báo": 4 toggles (nhắc nhở ngày đặc biệt, gợi ý hàng ngày, Telegram, email) | P0 |
| FR-S06 | Section "Chung": giao diện (sáng/tối), ngôn ngữ, bộ nhớ, xoá cache | P1 |
| FR-S07 | Section "Hỗ trợ": trung tâm trợ giúp, góp ý, chính sách bảo mật, điều khoản | P1 |
| FR-S08 | Footer card: app name, version, branding | P1 |
| FR-S09 | Nút "Đăng xuất" tách biệt (border đỏ, bg nhạt) | P0 |

### 4.6. SCR-06: Login Screen

**Mô tả**: Màn hình đăng nhập cho người dùng.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-LG01 | Gradient header với heart icon + app name + tagline | P0 |
| FR-LG02 | Input phone/email với left icon, password với visibility toggle | P0 |
| FR-LG03 | "Quên mật khẩu?" link → forgot password screen | P0 |
| FR-LG04 | Login button gradient (rose → pink) | P0 |
| FR-LG05 | Divider "hoặc" | P0 |
| FR-LG06 | "Đăng nhập bằng mã OTP" button outlined | P0 |
| FR-LG07 | "Tiếp tục với Google" button with Google logo | P0 |
| FR-LG08 | "Chưa có tài khoản? Đăng ký" link footer | P0 |
| FR-LG09 | Không có bottom tab bar (auth screen) | P0 |

### 4.7. SCR-07: Register Screen (OTP)

**Mô tả**: Màn hình đăng ký tài khoản mới với xác thực OTP.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-RG01 | Gradient header nhỏ hơn login, back button, heart icon | P0 |
| FR-RG02 | Phone + Email inputs | P0 |
| FR-RG03 | "Gửi mã OTP" button → send OTP to phone | P0 |
| FR-RG04 | OTP 6 ô input với focus state | P0 |
| FR-RG05 | Countdown timer "Gửi lại mã (01:59)" | P0 |
| FR-RG06 | Password confirm input | P0 |
| FR-RG07 | "Xác nhận và Đăng ký" gradient button | P0 |
| FR-RG08 | Google signup option | P1 |
| FR-RG09 | "Đã có tài khoản? Đăng nhập" link | P0 |

### 4.8. SCR-08: Forgot Password Screen

**Mô tả**: Quy trình khôi phục mật khẩu qua OTP.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-FP01 | Gradient header compact, lock icon | P0 |
| FR-FP02 | Step 1: Input phone/email + "Gửi mã xác thực" | P0 |
| FR-FP03 | Step 2: OTP 6 ô + "Gửi lại sau 45 giây" countdown | P0 |
| FR-FP04 | Step 3: New password + confirm + "Đặt lại mật khẩu" | P0 |
| FR-FP05 | "Quay lại đăng nhập" link footer | P0 |

### 4.9. SCR-09: Date Map Screen

**Mô tả**: Bản đồ hẹn hò với gợi ý địa điểm từ AI và eKMap.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DM01 | eKMap full-width map area (~55vh) với map pins theo category | P0 |
| FR-DM02 | Category filter pills floating: Quán ăn, Cà phê, Homestay, Khu vui chơi, TTTM | P0 |
| FR-DM03 | Map pins color-coded theo category, selected pin animated bounce | P0 |
| FR-DM04 | User location blue dot với ping animation | P0 |
| FR-DM05 | Zoom controls (+, -, my location) | P0 |
| FR-DM06 | "Powered by eKMap" watermark | P0 |
| FR-DM07 | AI gợi ý badge: "Thái Hoc thích quán có view đẹp, yên tĩnh" | P1 |
| FR-DM08 | Bottom sheet spot detail: tên, rating, category, distance, address | P0 |
| FR-DM09 | Tags: "Em thích", "Có chỗ đỗ xe", "Bình dân" | P1 |
| FR-DM10 | Action buttons: Dẫn đường (primary), Lưu, Share | P0 |
| FR-DM11 | "Gợi ý gần đây" list bên dưới | P1 |

### 4.10. SCR-10: Navigation Screen

**Mô tả**: Màn hình dẫn đường đến địa điểm hẹn hò.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-NV01 | Full-screen map với route line | P0 |
| FR-NV02 | Turn-by-turn instruction card (direction icon + text + distance) | P0 |
| FR-NV03 | Bottom panel: destination info + stats (time, distance, ETA) | P0 |
| FR-NV04 | Transport mode selector: Ô tô, Xe máy, Đi bộ | P0 |
| FR-NV05 | "Bắt đầu" primary button + "Chia sẻ" secondary | P0 |
| FR-NV06 | Close button trên instruction card | P0 |

### 4.11. SCR-11: Album Ảnh Screen

**Mô tả**: Quản lý album ảnh kỷ niệm theo sự kiện.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AL01 | Stats bar: tổng ảnh, sự kiện, tháng | P0 |
| FR-AL02 | Filter tabs: Tất cả, Hẹn hò, Du lịch, Kỷ niệm, Yêu thích | P0 |
| FR-AL03 | Photo groups organized by event + date | P0 |
| FR-AL04 | Mixed grid layout (col-span-2 + regular), "+N" overlay | P0 |
| FR-AL05 | Floating camera FAB for upload | P0 |
| FR-AL06 | Upload from camera or gallery (expo-image-picker) | P0 |
| FR-AL07 | "Xem tất cả" per group → full gallery view | P1 |

### 4.12. SCR-12: Love Counter Screen

**Mô tả**: Bộ đếm ngày yêu nhau với milestones.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-LC01 | Hero gradient section (~60vh) với couple avatars | P0 |
| FR-LC02 | Main counter: large number "365" + "ngày" + start date | P0 |
| FR-LC03 | Breakdown: Năm, Tháng, Ngày, Giờ | P0 |
| FR-LC04 | Milestones timeline: achieved (check) + upcoming (schedule) | P0 |
| FR-LC05 | "Chia sẻ" + "Đặt hình nền" buttons | P1 |

### 4.13. SCR-13: Insight 360° Screen

**Mô tả**: Trực quan hóa thông tin về người yêu dạng mạng nơ-ron.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-IN01 | Summary bar: total entries, categories, sentiments | P0 |
| FR-IN02 | Neuron map SVG: center node "Thái Hoc", category nodes around | P0 |
| FR-IN03 | Node size proportional to entry count | P0 |
| FR-IN04 | SVG connection lines between nodes | P0 |
| FR-IN05 | Sub-labels on hover/tap (e.g., "Phở bò, Mắm tôm") | P1 |
| FR-IN06 | Sentiment analysis bars with percentages | P0 |
| FR-IN07 | AI Tổng quan: auto-generated analysis + dating suggestion | P1 |

### 4.14. SCR-14: Voice Note Screen

**Mô tả**: Ghi chú bằng giọng nói với AI chuyển đổi thành text.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-VN01 | Recent voice notes list: play, waveform, duration, status | P0 |
| FR-VN02 | Status badges: "Đã lưu" (green), "Chờ lưu" (amber) | P0 |
| FR-VN03 | Transcription preview with AI parsed entries | P0 |
| FR-VN04 | "Lưu ghi chú" green button | P0 |
| FR-VN05 | Floating mic button "Nhấn giữ để ghi âm" | P0 |
| FR-VN06 | Recording state: pulsing mic, waveform bars, timer, Dừng & Gửi / Hủy | P0 |

### 4.15. SCR-15: Daily Reminder Screen

**Mô tả**: Quản lý nhắc nhở hàng ngày với gợi ý AI.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DR01 | Today header card gradient with date + greeting | P0 |
| FR-DR02 | Today's reminders: urgent (today), upcoming (3 days), weekly | P0 |
| FR-DR03 | Color-coded left border: rose (today), orange (upcoming), blue (weekly) | P0 |
| FR-DR04 | Action buttons per reminder: "Gửi Telegram", "Đã xong", "Nhắc lại sau" | P1 |
| FR-DR05 | AI gợi ý hôm nay: 3-5 suggestions with emoji | P1 |
| FR-DR06 | "Gửi gợi ý qua Telegram" button | P1 |
| FR-DR07 | Settings: giờ nhắc (08:00), kênh (Push+Telegram), AI tự động toggle, quiet hours | P0 |

### 4.16. SCR-16: Chat History Screen

**Mô tả**: Lịch sử các cuộc trò chuyện với AI.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CH01 | Summary card gradient: total chats, notes saved, voice chats | P0 |
| FR-CH02 | Search input | P0 |
| FR-CH03 | Filter pills: Tất cả, Có ghi chú, Giọng nói, Gợi ý AI | P0 |
| FR-CH04 | History grouped by date (Hôm nay, Hôm qua, specific dates) | P0 |
| FR-CH05 | Entry count badges per chat session | P0 |
| FR-CH06 | Icon differentiation: chat (rose), AI suggest (purple), voice (orange) | P0 |

---

## 5. API Specifications

### 5.1. Supabase REST API

**Base URL**: `{SUPABASE_URL}/rest/v1`

#### GET /entries
```
Query: ?select=*&order=created_at.desc
Response: Entry[]
```

#### POST /entries
```
Body: { category, title, detail?, sentiment, event_date?, is_recurring?, tags? }
Response: Entry
```

#### DELETE /entries?id=eq.{id}
```
Response: 204 No Content
```

#### GET /special_dates
```
Query: ?select=*&order=event_date.asc
Response: SpecialDate[]
```

#### POST /special_dates
```
Body: { title, description?, event_date, is_recurring, reminder_days_before, category }
Response: SpecialDate
```

### 5.2. OpenRouter API

**Endpoint**: `POST https://openrouter.ai/api/v1/chat/completions`

```json
{
  "model": "anthropic/claude-sonnet-4",
  "messages": [
    { "role": "system", "content": "<NLP parse prompt>" },
    { "role": "user", "content": "<user input>" }
  ],
  "max_tokens": 2000
}
```

**Response parsing**: Extract `choices[0].message.content` → JSON.parse → validate entries array

### 5.3. Telegram Bot API

**Endpoint**: `POST https://api.telegram.org/bot{TOKEN}/sendMessage`

```json
{
  "chat_id": "{CHAT_ID}",
  "text": "<HTML message>",
  "parse_mode": "HTML"
}
```

### 5.4. Supabase Auth API

**Base URL**: `{SUPABASE_URL}/auth/v1`

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | /auth/v1/signup | Register new user |
| POST | /auth/v1/token?grant_type=password | Login |
| POST | /auth/v1/otp | Send OTP |
| POST | /auth/v1/verify | Verify OTP |
| POST | /auth/v1/recover | Forgot password |
| GET | /auth/v1/user | Get current user |
| PUT | /auth/v1/user | Update user profile |

### 5.5. eKMap API

**Base URL**: eKMap Server

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | /places/nearby?lat={lat}&lng={lng}&category={cat}&radius={r} | Tìm địa điểm gần đây |
| GET | /directions?origin={lat,lng}&destination={lat,lng}&mode={driving\|walking\|cycling} | Dẫn đường |

### 5.6. Supabase Storage API

**Base URL**: `{SUPABASE_URL}/storage/v1`

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | /storage/v1/object/photos/{userId}/{filename} | Upload photo |
| GET | /storage/v1/object/public/photos/{userId}/{filename} | Get photo URL |
| DELETE | /storage/v1/object/photos/{userId}/{filename} | Delete photo |

### 5.7. Voice Processing

**Endpoint**: `POST https://openrouter.ai/api/v1/audio/transcriptions`

```
Body: FormData {
  file: audio_blob,
  model: "openai/whisper-large-v3",
  language: "vi"
}
```

**Response**: Transcribed text in Vietnamese → sent to AI Chat for parsing

---

## 6. Yêu Cầu Phi Chức Năng

### 6.1. Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Cold start (first open) | < 3 giây | Time to interactive |
| Screen transition | < 300ms | Animation duration |
| API response (Supabase) | < 1 giây | Network round-trip |
| API response (OpenRouter) | < 10 giây | AI processing time |
| List rendering (100 items) | 60 FPS | No frame drops during scroll |
| Memory usage | < 150MB | Background usage |

### 6.2. Security
- API keys stored in Expo SecureStore (not plain AsyncStorage)
- HTTPS for all API calls
- Supabase RLS enabled
- No sensitive data in console logs (production)

### 6.3. Usability
- Touch target: >= 44x44pt (iOS) / >= 48x48dp (Android)
- Body text: >= 14px
- Contrast ratio: >= 4.5:1 (WCAG AA)
- Support Dynamic Type (iOS) / Font scaling (Android)
- Respect `prefers-reduced-motion`

### 6.4. Compatibility
- iOS: >= 15.0
- Android: >= API 24 (Android 7.0)
- Expo SDK: 52+
- React Native: 0.76+

### 6.5. Offline Behavior
- Cached data available when offline (read-only)
- Show offline indicator
- Queue writes for sync when back online (P2)
- Error toast when network action fails

---

## 7. Design System Reference

### 7.1. Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #f43f5e | CTA buttons, active states |
| `primary-gradient` | #f43f5e → #ec4899 → #c026d3 | Hero card, submit buttons |
| `ai-purple` | #8b5cf6 → #7c3aed | AI Chat elements |
| `success` | #34d399 → #10b981 | Save success, positive |
| `background` | #fdf2f8 | App background |
| `surface` | #ffffff | Cards, inputs |
| `text-primary` | #1e1b2e | Headings, body |
| `text-secondary` | #6b7280 | Subtitles |
| `text-muted` | #9ca3af | Placeholders |
| `border` | rgba(244,63,94,0.08) | Card borders |
| `danger` | #ef4444 | Delete, errors |

### 7.2. Typography Scale

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| Title | 20px | 800 | Page titles |
| Heading | 16px | 700 | Section headers |
| Body | 14px | 400 | Content text |
| Label | 14px | 700 | Form labels |
| Caption | 12px | 600 | Badges, timestamps |
| Tiny | 11px | 600 | Category labels |

### 7.3. Spacing Scale
```
4 → 8 → 12 → 16 → 20 → 24 → 32 → 40 → 48 → 64
```

### 7.4. Border Radius
- Cards: 20px
- Buttons: 14px
- Inputs: 14px
- Badges: 9999px (pill)
- Avatars: 12px

---

## 8. Error Handling

| Scenario | UI Response | Technical Action |
|----------|-------------|-----------------|
| Network offline | Toast "Không có kết nối mạng" | Check NetInfo, use cached data |
| Supabase query fails | Toast "Lỗi tải dữ liệu" + retry button | Log error, retry with backoff |
| OpenRouter API fails | Chat bubble "Có lỗi xảy ra" | Log error, suggest check API key |
| Telegram send fails | Badge "Lỗi" on test button | Log error, check token/chatId |
| Invalid form data | Inline error below field | Client-side validation |
| Entry save fails | Toast "Lưu thất bại" | Retry, keep form state |
| Auth login fails | Toast "Sai thông tin đăng nhập" + shake animation | Check credentials, retry |
| OTP expired | Toast "Mã OTP đã hết hạn" + resend button | Auto-resend option |
| Photo upload fails | Toast "Tải ảnh thất bại" + retry | Compress image, retry |
| Map load fails | Fallback to list view | Check network, retry |
| Voice recording fails | Toast "Không thể ghi âm" | Check mic permission |
| GPS unavailable | Use last known location | Request permission, manual location |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-14 | CTO | Initial document |
| 2.0.0 | 2026-03-14 | CTO | Major update: 16 screens, auth flow, date map, album, love counter, insight 360°, voice note, daily reminder, chat history. Updated architecture, data model, API specs. |
