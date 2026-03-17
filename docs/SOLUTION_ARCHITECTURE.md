# Kiến Trúc Giải Pháp: AI Love — Mobile Application

**Chủ dự án:** Thái Hoàng Mai Học
**Ngày tạo:** 17/03/2026
**Phiên bản:** 1.0
**Loại dự án:** Cá nhân (Personal Project)

---

## 1. Tổng Quan Hệ Thống

### 1.1 Mô Tả

AI Love là ứng dụng mobile cross-platform (iOS + Android) được xây dựng trên nền tảng React Native + Expo, kết nối với Supabase làm backend-as-a-service và OpenRouter làm AI gateway. Hệ thống phục vụ người dùng cá nhân (B2C), với kiến trúc được thiết kế cho 10,000+ người dùng đồng thời và uptime 99.5%.

Điểm đặc biệt của kiến trúc này: chúng ta không cần xây và vận hành backend riêng. Supabase cung cấp đầy đủ Authentication, Database (PostgreSQL), Storage, và Realtime — còn logic AI thì gọi trực tiếp qua OpenRouter API. Điều này giúp team tập trung 100% vào trải nghiệm người dùng thay vì quản lý infrastructure.

### 1.2 Yêu Cầu Chức Năng

- Đăng ký/đăng nhập bằng OTP (phone/email) và Google OAuth
- CRUD ghi chú theo 11 danh mục với 5 mức cảm xúc, hỗ trợ tags và full-text search
- AI Chat parse ngôn ngữ tự nhiên (Tiếng Việt) thành structured entries — text và voice
- Lịch ngày đặc biệt với countdown, nhắc nhở qua push notification + Telegram Bot
- Bản đồ hẹn hò với gợi ý AI, album ảnh, đếm ngày yêu, insight 360°

### 1.3 Yêu Cầu Phi Chức Năng

| Yêu cầu | Chỉ tiêu | Ưu tiên |
|----------|----------|---------|
| Performance | App load < 2s, screen transition < 300ms, list scroll 60 FPS | Cao |
| Availability | Uptime 99.5% (Supabase SLA) | Cao |
| Scalability | 10,000+ concurrent users, 100,000+ total users | Trung bình |
| Security | Supabase RLS, SecureStore cho secrets, HTTPS only | Cao |
| Memory | App memory < 150MB trên thiết bị mid-range | Cao |
| Offline | Read-only cached data khi mất mạng | Trung bình |

---

## 2. Kiến Trúc Hệ Thống

### 2.1 Sơ Đồ Kiến Trúc Tổng Quan

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │           AI Love Mobile App (React Native + Expo)          │   │
│   │                                                             │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │   │
│   │  │Dashboard │  │ AI Chat  │  │ Calendar │  │ Settings  │  │   │
│   │  │  (tabs)  │  │  (tabs)  │  │  (tabs)  │  │  (tabs)   │  │   │
│   │  └──────────┘  └──────────┘  └──────────┘  └───────────┘  │   │
│   │                                                             │   │
│   │  ┌──────────────────────────────────────────────────────┐  │   │
│   │  │            State Management (React Context)           │  │   │
│   │  │     + AsyncStorage (cache) + SecureStore (secrets)    │  │   │
│   │  └──────────────────────────────────────────────────────┘  │   │
│   └──────────────────────┬──────────────────────────────────────┘   │
│                          │                                          │
└──────────────────────────┼──────────────────────────────────────────┘
                           │ HTTPS
          ┌────────────────┼─────────────────────┐
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────┐ ┌──────────────┐  ┌──────────────────────┐
│   SUPABASE      │ │  OPENROUTER  │  │   EXTERNAL SERVICES  │
│   (BaaS)        │ │  (AI Gateway)│  │                      │
│                 │ │              │  │  ┌────────────────┐   │
│ ┌─────────────┐ │ │ ┌──────────┐│  │  │ Telegram Bot   │   │
│ │ Auth (GoTrue)│ │ │ │Claude   ││  │  │ API            │   │
│ │ - OTP       │ │ │ │Sonnet 4 ││  │  └────────────────┘   │
│ │ - OAuth     │ │ │ │(NLP Chat)││  │                      │
│ └─────────────┘ │ │ └──────────┘│  │  ┌────────────────┐   │
│                 │ │              │  │  │ Mapbox /       │   │
│ ┌─────────────┐ │ │ ┌──────────┐│  │  │ eKMap API      │   │
│ │ PostgreSQL  │ │ │ │GPT-4o   ││  │  └────────────────┘   │
│ │ - entries   │ │ │ │Audio    ││  │                      │
│ │ - users     │ │ │ │(STT/TTS)││  │  ┌────────────────┐   │
│ │ - special   │ │ │ └──────────┘│  │  │ Expo Push      │   │
│ │   _dates    │ │ │              │  │  │ Notification   │   │
│ │ - photos    │ │ │ ┌──────────┐│  │  └────────────────┘   │
│ │ - voice     │ │ │ │Gemini   ││  │                      │
│ │   _notes    │ │ │ │Flash    ││  └──────────────────────┘
│ │ - chat      │ │ │ │(Fallback)││
│ │   _sessions │ │ │ └──────────┘│
│ │ - saved     │ │ │              │
│ │   _places   │ │ └──────────────┘
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ Storage     │ │
│ │ (Photos,    │ │
│ │  Audio)     │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ Row Level   │ │
│ │ Security    │ │
│ │ (RLS)       │ │
│ └─────────────┘ │
└─────────────────┘
```

### 2.2 Kiến Trúc Chi Tiết

**Pattern:** Serverless BaaS (Backend-as-a-Service) — không có custom backend server

Đây là quyết định kiến trúc quan trọng nhất của dự án. Thay vì xây backend API riêng (Node.js/NestJS), chúng ta dùng Supabase làm backend hoàn chỉnh. Lý do:

1. **Solo developer:** Một mình không thể vừa maintain frontend vừa xây backend — BaaS là lựa chọn tất yếu
2. **Time-to-market quan trọng:** BaaS giúp ship nhanh hơn 2-3x so với custom backend, đặc biệt quan trọng cho dự án cá nhân
3. **Scale tự động:** Supabase Pro plan handle được 10,000+ concurrent connections — không cần lo DevOps
4. **Security built-in:** RLS policies đảm bảo mỗi user chỉ thấy data của mình — không cần viết middleware authorization

**Trade-off chấp nhận được:**
- Vendor lock-in với Supabase (mitigated: Supabase là open-source, có thể self-host nếu cần)
- Không custom logic phức tạp ở backend (mitigated: Supabase Edge Functions nếu cần)
- AI calls đi trực tiếp từ client (mitigated: API key lưu SecureStore, rate limit ở OpenRouter)

### 2.3 Data Flow — AI Chat (Core Feature)

Đây là flow phức tạp nhất trong hệ thống, minh họa cách AI Love biến ngôn ngữ tự nhiên thành dữ liệu có cấu trúc:

```
User nhập: "Bé thích ăn phở bò tái lần, dị ứng hải sản, yêu màu hồng"
    │
    ▼
┌─────────────────────────────────┐
│  1. Client gửi text + system    │
│     prompt đến OpenRouter API   │
│     (Claude Sonnet 4)           │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  2. AI parse → JSON array:      │
│  [                              │
│    { category: "food",          │
│      title: "Phở bò tái lần",  │
│      sentiment: "love" },       │
│    { category: "allergy",       │
│      title: "Hải sản",         │
│      sentiment: "hate" },       │
│    { category: "style",         │
│      title: "Màu hồng",        │
│      sentiment: "love" }        │
│  ]                              │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  3. Client hiển thị preview     │
│     cards → User confirm/edit   │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  4. Batch INSERT vào Supabase   │
│     entries table (RLS applied) │
└─────────────────────────────────┘
```

### 2.4 Data Flow — Voice Note

```
User nhấn nút ghi âm → nói tiếng Việt
    │
    ▼
┌─────────────────────────────────┐
│  1. Record WAV via expo-av       │
│     (48kHz, mono, PCM16)         │
└────────────────┬─────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  2. Convert WAV → base64        │
│     Gửi đến OpenRouter:         │
│     gpt-4o-audio-preview (STT)  │
└────────────────┬─────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  3. Nhận transcription text     │
│     → Chuyển sang AI Chat flow  │
│     (bước 1 ở trên)             │
└────────────────┬─────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  4. (Optional) TTS response     │
│     gpt-4o-audio-preview        │
│     voice "nova" → mp3 playback │
└──────────────────────────────────┘
```

---

## 3. Technology Stack

### 3.1 Mobile Client

| Thành phần | Công nghệ | Phiên bản | Lý do chọn |
|------------|-----------|-----------|------------|
| Runtime | React Native | 0.81.5 | Mature ecosystem, large community, team expertise |
| Framework | Expo SDK | 54 | Managed workflow, OTA updates, simplified native config |
| Router | Expo Router | 6 | File-based routing — quen thuộc với web devs, deep linking built-in |
| Language | TypeScript | Strict mode | Type safety, better DX, catch bugs at compile time |
| Icons | lucide-react-native | Latest | Consistent icon set, tree-shakeable, lightweight |
| Maps | @rnmapbox/maps | Latest | Mapbox GL — smooth vector tiles, offline support |
| Secure Storage | expo-secure-store | SDK 54 | Keychain (iOS) + Keystore (Android) cho API keys |
| Audio | expo-av | SDK 54 | Recording + playback, đủ cho voice note feature |

### 3.2 Backend (Supabase BaaS)

| Thành phần | Công nghệ | Mục đích |
|------------|-----------|----------|
| Auth | Supabase GoTrue | OTP (phone/email), Google OAuth, session management |
| Database | PostgreSQL 15 | Primary data store — entries, users, special_dates, etc. |
| Storage | Supabase Storage | Photos, voice note audio files (S3-compatible) |
| Realtime | Supabase Realtime | Live sync khi có thay đổi data (future: multi-device sync) |
| Edge Functions | Deno runtime | Serverless functions nếu cần logic phức tạp (dự phòng) |
| RLS | PostgreSQL policies | Row Level Security — mỗi user chỉ access data của mình |

### 3.3 AI Services (qua OpenRouter Gateway)

| Model | Mục đích | Latency | Chi phí |
|-------|----------|---------|---------|
| Claude Sonnet 4 | NLP Chat — parse text Tiếng Việt → structured entries | 2-5s | ~$3/1M tokens |
| GPT-4o Audio Preview | STT (Speech-to-Text) + TTS (Text-to-Speech) | 3-8s | ~$0.06/phút audio |
| Gemini 2.0 Flash | Fallback STT khi OpenRouter Audio unavailable | 1-3s | Free tier generous |

**Tại sao dùng OpenRouter thay vì gọi trực tiếp từng provider?**
- Một API key, nhiều models — switch giữa Claude/GPT/Gemini không cần đổi code
- Automatic fallback: nếu model A down, route sang model B
- Unified billing & monitoring
- Rate limiting built-in

### 3.4 External Services

| Dịch vụ | Mục đích | Integration |
|---------|----------|-------------|
| Telegram Bot API | Push daily reminders, quick notifications | HTTP API, bot token |
| Mapbox / eKMap | Bản đồ hẹn hò, directions, POI search | @rnmapbox/maps SDK |
| Expo Push Notifications | Native push notifications (iOS + Android) | expo-notifications |
| EAS (Expo Application Services) | Build, submit, OTA updates | CLI + CI/CD |

### 3.5 Development & DevOps

| Thành phần | Công nghệ | Mục đích |
|------------|-----------|----------|
| IDE | VSCode + Claude Code | AI-assisted development |
| Version Control | Git + GitHub | Source code management |
| CI/CD | EAS Build + EAS Submit | Automated build & store submission |
| TypeScript Check | `tsc --noEmit` (auto via hooks) | Zero-error policy |
| Linting | `expo lint` (ESLint) | Code quality |
| Testing | Jest + @testing-library/react-native | Unit + component tests |
| E2E Testing | Maestro / Detox | End-to-end flow testing |
| Design | Google Stitch + Figma | UI/UX mockups → code |

---

## 4. Data Model

### 4.1 Database Schema (PostgreSQL via Supabase)

```
┌──────────────────────┐       ┌──────────────────────────┐
│       users           │       │        entries            │
│ (managed by Supabase) │       │                          │
├──────────────────────┤       ├──────────────────────────┤
│ id (UUID, PK)        │──┐    │ id (UUID, PK)            │
│ email                │  │    │ user_id (FK → users)     │
│ phone                │  ├───>│ category (ENUM 11 types) │
│ full_name            │  │    │ title (VARCHAR 200)      │
│ avatar_url           │  │    │ detail (TEXT)            │
│ lover_name           │  │    │ sentiment (ENUM 5 types) │
│ lover_birthday       │  │    │ event_date (DATE)        │
│ lover_avatar_url     │  │    │ tags (TEXT[])            │
│ anniversary_date     │  │    │ created_at (TIMESTAMPTZ) │
│ onboarding_completed │  │    │ updated_at (TIMESTAMPTZ) │
│ created_at           │  │    └──────────────────────────┘
│ updated_at           │  │
└──────────────────────┘  │    ┌──────────────────────────┐
                          │    │     special_dates         │
                          │    ├──────────────────────────┤
                          ├───>│ id (UUID, PK)            │
                          │    │ user_id (FK → users)     │
                          │    │ title (VARCHAR 200)      │
                          │    │ date (DATE)              │
                          │    │ category (ENUM 4 types)  │
                          │    │ recurring (BOOLEAN)      │
                          │    │ reminder_days (INT[])    │
                          │    │ notes (TEXT)             │
                          │    └──────────────────────────┘
                          │
                          │    ┌──────────────────────────┐
                          │    │      voice_notes          │
                          │    ├──────────────────────────┤
                          ├───>│ id (UUID, PK)            │
                          │    │ user_id (FK → users)     │
                          │    │ audio_url (TEXT)         │
                          │    │ transcription (TEXT)     │
                          │    │ duration_seconds (INT)   │
                          │    │ parsed_entries (JSONB)   │
                          │    │ created_at (TIMESTAMPTZ) │
                          │    └──────────────────────────┘
                          │
                          │    ┌──────────────────────────┐
                          │    │       photos              │
                          │    ├──────────────────────────┤
                          ├───>│ id (UUID, PK)            │
                          │    │ user_id (FK → users)     │
                          │    │ url (TEXT)               │
                          │    │ thumbnail_url (TEXT)     │
                          │    │ event_title (VARCHAR)    │
                          │    │ event_date (DATE)        │
                          │    │ category (VARCHAR)       │
                          │    │ created_at (TIMESTAMPTZ) │
                          │    └──────────────────────────┘
                          │
                          │    ┌──────────────────────────┐
                          │    │     saved_places          │
                          │    ├──────────────────────────┤
                          ├───>│ id (UUID, PK)            │
                          │    │ user_id (FK → users)     │
                          │    │ name (VARCHAR 200)       │
                          │    │ address (TEXT)           │
                          │    │ latitude (DECIMAL)       │
                          │    │ longitude (DECIMAL)      │
                          │    │ category (ENUM 5 types)  │
                          │    │ rating (INT 1-5)         │
                          │    │ notes (TEXT)             │
                          │    │ visited_date (DATE)      │
                          │    └──────────────────────────┘
                          │
                          │    ┌──────────────────────────┐
                          │    │    chat_sessions          │
                          │    ├──────────────────────────┤
                          └───>│ id (UUID, PK)            │
                               │ user_id (FK → users)     │
                               │ type (ENUM: text/voice/  │
                               │        suggestion)       │
                               │ messages (JSONB[])       │
                               │ entries_created (INT)    │
                               │ created_at (TIMESTAMPTZ) │
                               │ updated_at (TIMESTAMPTZ) │
                               └──────────────────────────┘
```

### 4.2 Enums

```sql
-- 11 danh mục ghi chú
CREATE TYPE entry_category AS ENUM (
  'food', 'place', 'hobby', 'date', 'gift',
  'trait', 'allergy', 'style', 'music', 'movie', 'other'
);

-- 5 mức cảm xúc
CREATE TYPE sentiment_level AS ENUM (
  'love', 'like', 'neutral', 'dislike', 'hate'
);

-- 4 loại ngày đặc biệt
CREATE TYPE special_date_category AS ENUM (
  'birthday', 'anniversary', 'holiday', 'other'
);

-- 5 loại địa điểm
CREATE TYPE place_category AS ENUM (
  'restaurant', 'cafe', 'homestay', 'entertainment', 'mall'
);

-- 3 loại chat session
CREATE TYPE chat_type AS ENUM (
  'text', 'voice', 'suggestion'
);
```

### 4.3 Row Level Security (RLS)

Mọi table đều bật RLS với policy đơn giản nhưng hiệu quả:

```sql
-- Mỗi user chỉ thấy data của chính mình
CREATE POLICY "Users can only access own data"
ON entries FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Áp dụng tương tự cho: special_dates, voice_notes, photos,
-- saved_places, chat_sessions
```

Đây là lớp bảo mật quan trọng nhất — ngay cả khi có bug ở client code, PostgreSQL vẫn đảm bảo không user nào đọc được data của người khác.

---

## 5. Bảo Mật

### 5.1 Authentication & Authorization

- **Method:** Supabase GoTrue — JWT-based authentication
- **Login options:** OTP (phone/email) + Google OAuth
- **Session:** JWT access token (1 giờ) + refresh token (30 ngày)
- **Biometric:** FaceID/TouchID (iOS), Fingerprint (Android) qua expo-local-authentication — gate cho app access, không thay thế auth
- **Authorization:** RLS tại database level — không cần middleware phức tạp

### 5.2 Data Security

- **Encryption at Rest:** Supabase encrypt tất cả data at rest (AES-256 trên infrastructure level)
- **Encryption in Transit:** TLS 1.3 cho mọi API call (Supabase, OpenRouter, Telegram)
- **Sensitive Data:** API keys lưu trong Expo SecureStore (iOS Keychain / Android Keystore) — KHÔNG hardcode trong bundle
- **PII Handling:** Tên, ảnh, thông tin tình cảm là PII — chỉ lưu trên Supabase với RLS, không log ra bên thứ ba
- **Data Backup:** Supabase tự động daily backup (Pro plan), point-in-time recovery 7 ngày

### 5.3 AI Data Privacy

Đây là điểm nhạy cảm nhất — dữ liệu gửi đến AI chứa thông tin cá nhân:

- **Consent modal bắt buộc:** Trước lần đầu dùng AI Chat, user phải đồng ý: *"Dữ liệu của bạn sẽ được gửi đến OpenRouter (dịch vụ AI) để xử lý tin nhắn"*
- **Không gửi user ID / PII** đến AI — chỉ gửi nội dung tin nhắn
- **OpenRouter privacy:** Dữ liệu không được dùng để train models (theo ToS)
- **Local caching:** AI responses cache local để giảm lần gọi API (giảm data exposure)

### 5.4 Store Compliance

- **Privacy Policy:** URL public, accessible từ trong app (Settings) và trên Store listing
- **iOS Privacy Manifest:** Khai báo tất cả data types (name, relationship data, chat messages, usage data)
- **Google Play Data Safety:** Khai báo OpenRouter, Supabase, chat data
- **Permissions:** Chỉ request khi user thực sự cần feature (camera, photos, location, microphone)
- `ITSAppUsesNonExemptEncryption: false` — chỉ dùng HTTPS standard

---

## 6. Khả Năng Mở Rộng

### 6.1 Scaling Strategy

Vì dùng Supabase (managed service), scaling phần lớn là tự động:

| Tier | Concurrent Users | Database | Storage | Chi phí/tháng |
|------|------------------|----------|---------|---------------|
| Free | 500 | 500MB | 1GB | $0 |
| Pro (hiện tại) | 10,000 | 8GB | 100GB | $25 |
| Team | 50,000 | 32GB | 200GB | $599 |
| Enterprise | 100,000+ | Custom | Custom | Custom |

**Chiến lược:** Bắt đầu với Pro plan → upgrade lên Team khi đạt 10,000 MAU.

### 6.2 Performance Targets

| Metric | Target (bình thường) | Peak (events/holidays) |
|--------|---------------------|----------------------|
| Concurrent users | 1,000 | 5,000 |
| API requests/second | 100 | 500 |
| App load time | < 2s | < 3s |
| AI response time | < 5s | < 10s |
| Database connections | 50 | 200 |
| Memory usage | < 100MB | < 150MB |

### 6.3 Caching Strategy

- **L1 — React State:** In-memory cache cho data đang hiển thị (entries, special dates)
- **L2 — AsyncStorage:** Persistent local cache cho offline access (recent entries, profile data)
- **L3 — Supabase Cache:** Database query caching ở server level
- **AI Response Cache:** Cache AI parsing results cho input patterns tương tự → giảm API calls + chi phí
- **Image Cache:** expo-image với disk caching cho photos và avatars

### 6.4 Offline Behavior

Khi mất mạng, app vẫn hoạt động ở chế độ read-only:
- Đọc entries, special dates, photos từ AsyncStorage cache
- Hiển thị banner "Đang offline — một số tính năng tạm thời không khả dụng"
- Queue các thao tác write → sync khi có mạng trở lại (Phase 2: P2 feature)
- AI Chat và Voice Note require network — hiển thị thông báo rõ ràng

---

## 7. Monitoring & Observability

### 7.1 Error Tracking

| Công cụ | Mục đích | Khi nào |
|---------|----------|---------|
| Expo EAS Insights | Crash reports, ANR, app not responding | Production |
| Console.error boundaries | React error boundaries log | Development + Production |
| Supabase Dashboard | Database queries, auth events, storage usage | Luôn luôn |
| OpenRouter Dashboard | AI API usage, latency, errors, cost tracking | Luôn luôn |

### 7.2 Key Metrics to Monitor

- **Crash-free rate:** Target > 99.5%
- **App load time (p95):** Target < 3s
- **AI Chat success rate:** Target > 95% (parse thành công)
- **API error rate:** Target < 1%
- **Daily Active Users:** Track growth trend
- **Entries created/user/day:** Track engagement
- **AI cost/user/month:** Track unit economics

---

## 8. Phân Tích Chi Phí Hạ Tầng

### 8.1 Chi Phí Hàng Tháng (Launch Phase — 0-1,000 users)

| Hạng mục | Cấu hình | Chi phí/tháng |
|----------|----------|---------------|
| Supabase Pro | 8GB DB, 100GB Storage, 50 connections | $25 (~625,000₫) |
| OpenRouter API | ~1M tokens/tháng (Claude + GPT-4o Audio) | ~$50 (~1,250,000₫) |
| Mapbox | Free tier (25,000 map loads/mo) | $0 |
| Expo EAS | Free tier (30 builds/mo) | $0 |
| Domain | ailove.vn | ~100,000₫ |
| **Tổng** | | **~2,000,000₫/tháng** |

### 8.2 Chi Phí Hàng Tháng (Growth Phase — 10,000+ users)

| Hạng mục | Cấu hình | Chi phí/tháng |
|----------|----------|---------------|
| Supabase Team | 32GB DB, 200GB Storage | $599 (~15,000,000₫) |
| OpenRouter API | ~10M tokens/tháng | ~$500 (~12,500,000₫) |
| Mapbox | Growth tier | ~$100 (~2,500,000₫) |
| Expo EAS Production | Unlimited builds, priority | $99 (~2,500,000₫) |
| **Tổng** | | **~32,500,000₫/tháng** |

### 8.3 Unit Economics

- **Chi phí/user/tháng (launch):** ~2,000₫ (với 1,000 users)
- **Chi phí/user/tháng (scale):** ~3,250₫ (với 10,000 users)
- **Premium subscription:** 49,000-99,000₫/tháng
- **Gross margin target:** > 90% (sau khi đạt 500+ premium users)

---

## 9. Deployment & Release Strategy

### 9.1 Build Pipeline

```
Code Push (GitHub)
    │
    ▼
TypeScript Check (tsc --noEmit) ← Auto via Claude Code hooks
    │
    ▼
ESLint (expo lint)
    │
    ▼
Unit Tests (jest)
    │
    ▼
EAS Build (cloud)
    ├── iOS → .ipa (Xcode signing)
    └── Android → .aab (keystore signing)
    │
    ▼
EAS Submit
    ├── iOS → TestFlight → App Store
    └── Android → Internal Testing → Google Play
```

### 9.2 Release Channels

| Channel | Mục đích | Audience |
|---------|----------|----------|
| Development | Local dev, hot reload | Team only |
| Preview | EAS Update (OTA) cho internal testing | Team + beta testers |
| Production | Store builds | Public |

### 9.3 OTA Updates

Expo EAS Update cho phép push JS bundle updates mà không cần qua Store review — hữu ích cho hotfix nhanh (bug fixes, text changes, config updates). Native code changes vẫn phải qua Store.

---

---

*Tài liệu này là tài sản trí tuệ cá nhân của Thái Hoàng Mai Học. Mọi quyền được bảo lưu.*
*Ngày tạo: 17/03/2026*
