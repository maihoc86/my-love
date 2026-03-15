# Business Requirements Document (BRD)
## MyLoveThaiHoc Mobile App

| Thông tin | Chi tiết |
|-----------|----------|
| **Dự án** | MyLoveThaiHoc - Ứng dụng ghi nhận thông tin người yêu |
| **Phiên bản** | 2.0.0 |
| **Ngày tạo** | 2026-03-14 |
| **Tác giả** | CTO Office - Tiên Phong CDS |
| **Nền tảng** | React Native (Expo) — iOS & Android |
| **Trạng thái** | Approved |

---

## 1. Tổng Quan Dự Án

### 1.1. Bối cảnh
Trong cuộc sống hàng ngày, mỗi người đều có những thông tin quan trọng về người yêu: sở thích ăn uống, dị ứng, ngày sinh nhật, kỷ niệm, phong cách, âm nhạc yêu thích... Tuy nhiên, trí nhớ con người có giới hạn — dễ quên những chi tiết nhỏ nhưng quan trọng.

**MyLoveThaiHoc** là ứng dụng cá nhân giúp ghi nhận, phân loại, và nhắc nhở mọi thông tin về người yêu (Thái Hoc). Ứng dụng tích hợp AI để phân tích ngôn ngữ tự nhiên và Telegram Bot để gửi thông báo tự động.

### 1.2. Vấn đề cần giải quyết

| # | Vấn đề | Tác động |
|---|--------|----------|
| 1 | Quên sở thích, dị ứng của người yêu | Gây hiểu lầm, thiếu chu đáo |
| 2 | Bỏ lỡ ngày đặc biệt (sinh nhật, kỷ niệm) | Ảnh hưởng tình cảm |
| 3 | Không có nơi tập trung lưu trữ thông tin | Thông tin rải rác (notes, tin nhắn, trí nhớ) |
| 4 | Thiếu gợi ý để quan tâm người yêu hàng ngày | Không biết nên làm gì để người yêu vui |
| 5 | Không có nơi lưu trữ ảnh kỷ niệm hẹn hò | Ảnh rải rác trong gallery, khó tìm |
| 6 | Không biết địa điểm hẹn hò phù hợp | Mất thời gian tìm kiếm, chọn sai chỗ |
| 7 | Quên đếm ngày yêu nhau, cột mốc quan trọng | Bỏ lỡ kỷ niệm 100 ngày, 1 năm... |

### 1.3. Giải pháp đề xuất
Xây dựng ứng dụng mobile (iOS + Android) với các khả năng:
- **Ghi chú thông minh**: Ghi nhận 11 danh mục thông tin với 5 mức cảm xúc
- **AI tự động phân tích**: Nhập bằng ngôn ngữ tự nhiên, AI parse thành entries có cấu trúc
- **Nhắc nhở chủ động**: Countdown ngày đặc biệt, gửi reminder qua Telegram
- **Gợi ý hàng ngày**: AI phân tích data và đưa ra gợi ý phù hợp
- **Bản đồ hẹn hò thông minh**: Tích hợp eKMap gợi ý địa điểm (quán ăn, cafe, homestay, khu vui chơi, TTTM) dựa trên sở thích
- **Voice input**: Ghi chú nhanh bằng giọng nói, AI tự chuyển thành text và phân tích
- **Album ảnh hẹn hò**: Lưu trữ ảnh theo sự kiện, nhóm theo ngày/category
- **Đếm ngày yêu nhau**: Countdown tự động, cột mốc milestones, chia sẻ
- **Insight 360°**: Sơ đồ neuron map trực quan hóa toàn bộ thông tin về người yêu
- **Daily reminder**: Nhắc nhở hàng ngày với gợi ý AI

---

## 2. Mục Tiêu Kinh Doanh

### 2.1. Mục tiêu chính (Primary Objectives)

| ID | Mục tiêu | Metric | Target |
|----|----------|--------|--------|
| O1 | Ghi nhận mọi thông tin quan trọng về người yêu | Số entries đã lưu | > 50 entries trong tháng đầu |
| O2 | Không bỏ lỡ ngày đặc biệt nào | Reminder sent rate | 100% |
| O3 | Tăng sự chu đáo hàng ngày | Daily suggestions used | > 3 lần/tuần |
| O4 | Trải nghiệm nhập liệu nhanh và tiện | Avg time to add entry | < 30 giây |
| O5 | Gợi ý địa điểm hẹn hò phù hợp | Date spots suggested | > 5 lần/tháng |
| O6 | Lưu trữ kỷ niệm bằng ảnh | Photos organized | > 20 ảnh/tháng |
| O7 | Nhập liệu bằng giọng nói nhanh chóng | Voice notes used | > 5 lần/tuần |

### 2.2. Mục tiêu phụ (Secondary Objectives)
- Có thể sử dụng offline (đọc dữ liệu đã cache)
- Sync real-time giữa các thiết bị
- Push notification native thay vì chỉ Telegram
- Trải nghiệm mobile-native (gesture, haptic feedback, smooth animation)

---

## 3. Phạm Vi Dự Án (Scope)

### 3.1. Trong phạm vi (In Scope)

| Module | Mô tả | Ưu tiên |
|--------|--------|---------|
| **M1 - Dashboard** | Tổng quan: hero card, mini-app grid (8 features), quick stats, upcoming dates, warnings, recent entries | P0 |
| **M2 - Entry Management** | CRUD ghi chú: 11 categories, 5 sentiments, tags, event dates | P0 |
| **M2.1 - All Notes** | Xem tất cả ghi chú: full-screen list, real-time search, filter chips theo category, sort (mới nhất/cũ nhất/A→Z), FAB thêm mới, empty state | P0 |
| **M3 - AI Chat** | Chat NLP: text + voice input → AI parse → batch save. Lịch sử chat, gợi ý AI | P0 |
| **M4 - Calendar** | CRUD ngày đặc biệt: countdown ring, recurring, reminder, color-coded urgency | P0 |
| **M5 - Settings** | Profile, thông tin người yêu, tài khoản, thông báo (toggles), chung, hỗ trợ | P0 |
| **M5.1 - Partner Info** | Chỉnh sửa thông tin người yêu: tên gọi, biệt danh, sinh nhật, SĐT, ghi chú, ảnh đại diện | P0 |
| **M5.2 - Personal Info** | Thông tin cá nhân: họ tên, email, SĐT, ngày tham gia. Toggle readonly/editable | P0 |
| **M5.3 - Security** | Bảo mật: sinh trắc học, OTP 2 bước, đổi mật khẩu, phiên đăng nhập, xoá tài khoản | P0 |
| **M5.4 - Backup** | Sao lưu & Đồng bộ: auto backup, Wi-Fi only, tần suất, dung lượng, lịch sử, xoá cache | P0 |
| **M6 - Authentication** | Login (email/phone + password), Google OAuth, OTP verification, đăng ký, quên mật khẩu | P0 |
| **M7 - Date Map** | Bản đồ hẹn hò eKMap: gợi ý quán ăn, cafe, homestay, khu vui chơi, TTTM. AI suggest dựa trên sở thích | P1 |
| **M8 - Navigation** | Dẫn đường turn-by-turn đến địa điểm hẹn hò, chọn phương tiện (ô tô/xe máy/đi bộ) | P1 |
| **M9 - Photo Album** | Lưu trữ ảnh hẹn hò theo sự kiện/ngày, filter, photo grid, FAB upload | P1 |
| **M10 - Love Counter** | Đếm ngày yêu nhau, breakdown (năm/tháng/ngày/giờ), milestones timeline, chia sẻ | P1 |
| **M11 - Insight 360°** | Neuron map trực quan hóa thông tin, sentiment analysis, AI tổng quan | P1 |
| **M12 - Voice Note** | Ghi chú giọng nói nhanh, AI speech-to-text + parse entries, lịch sử recordings | P1 |
| **M13 - Daily Reminder** | Nhắc nhở hàng ngày, gợi ý AI tự động, cài đặt giờ/kênh/quiet hours | P1 |
| **M14 - Telegram Integration** | Gửi reminder, daily suggestions, test connection qua Telegram Bot | P1 |
| **M15 - Push Notifications** | Native push notification cho reminders và daily suggestions | P2 |
| **M16 - Offline Support** | Cache entries locally, sync khi có mạng | P2 |
| **M17 - Chat History** | Lịch sử chat AI: search, filter (text/voice/AI suggest), nhóm theo ngày | P1 |

### 3.2. Ngoài phạm vi (Out of Scope) — v2.0
- Multi-user support (chỉ 1 user)
- Chia sẻ entries giữa các cặp đôi
- Integration với calendar system (Google Calendar, Apple Calendar)
- Widget (iOS/Android home screen widget)
- Apple Watch / WearOS companion app
- Video attachment cho entries
- AR/VR features

---

## 4. Stakeholders

| Vai trò | Người | Trách nhiệm |
|---------|-------|--------------|
| Product Owner | CTO | Quyết định tính năng, ưu tiên |
| End User | Chính mình (single user) | Sử dụng app, feedback |
| Developer | CTO + AI Assistant | Thiết kế, phát triển, deploy |

---

## 5. Yêu Cầu Chức Năng (Functional Requirements Summary)

### FR1: Quản lý Ghi chú (Entry Management)
- Thêm/sửa/xoá ghi chú với 11 danh mục
- Mỗi ghi chú có: title, detail, category, sentiment, event_date, tags
- Lọc và tìm kiếm theo category, sentiment, keyword
- Hiển thị ghi chú gần đây trên dashboard

### FR1.1: Xem Tất Cả Ghi Chú (M2.1)
- Màn hình full-screen, mở từ "Xem tất cả >" trên Dashboard
- **Search bar** sticky dưới header: real-time filter theo title và detail, nút clear (×)
- **Filter chips** horizontal scroll: Tất cả (default) + 11 category chips có icon + count badge
- **Sort**: dropdown/picker — Mới nhất / Cũ nhất / A→Z
- **Results counter**: hiển thị "X ghi chú" kết quả sau khi lọc
- **Entry list**: mỗi card có icon circle 44px + title + detail (optional) + category·time + nút "Chi tiết"
- **FAB** (+) bottom-right → navigate đến Add Entry screen
- **Empty state** khi không có kết quả: icon 🔍 + message + nút "Xoá bộ lọc"
- **Swipe-to-delete** trên mỗi card (Android: trailing action, iOS: swipe left)

### FR2: AI Chat (Natural Language Processing)
- Nhập văn bản tự nhiên bằng tiếng Việt
- AI phân tích và extract nhiều entries từ 1 câu
- Hiển thị preview trước khi lưu (batch save)
- Gợi ý hàng ngày dựa trên data đã có

### FR3: Quản lý Ngày Đặc Biệt
- CRUD ngày đặc biệt (sinh nhật, kỷ niệm, ngày lễ, khác)
- Countdown ring hiển thị số ngày còn lại
- Lặp lại hàng năm (recurring)
- Gửi reminder trước N ngày qua Telegram/push

### FR4: Thông báo & Nhắc nhở
- Gửi reminder ngày đặc biệt qua Telegram
- Gửi daily suggestions qua Telegram
- (P1) Native push notification

### FR5: Dashboard
- Tổng quan số liệu (total entries, by category)
- Upcoming dates (sắp tới trong 30 ngày)
- Cảnh báo dị ứng / điều ghét
- Quick actions (thêm mới, chat AI)

### FR6: Settings (User-Facing)
- Profile card gradient: avatar, tên, email, phone, edit button, stats row
- Thông tin người yêu: tên gọi, biệt danh, sinh nhật, ảnh. Nút Chỉnh sửa → M5.1
- Tài khoản: thông tin cá nhân (M5.2), đổi mật khẩu, bảo mật (M5.3), sao lưu (M5.4)
- Thông báo: 4 toggles (ngày đặc biệt, gợi ý ngày, Telegram, email)
- Chung: giao diện, ngôn ngữ, bộ nhớ, xoá cache
- Hỗ trợ: trung tâm, góp ý, chính sách, điều khoản
- Đăng xuất với alert confirm

### FR6.1: Chỉnh sửa thông tin người yêu (M5.1)
- Avatar 96px với camera overlay để đổi ảnh (expo-image-picker)
- Form: tên gọi, biệt danh, sinh nhật (date picker), số điện thoại, ghi chú (textarea)
- Nút "Lưu thay đổi" rose gradient — TODO: PUT Supabase users table
- Nút "Xoá tài khoản" red text — Alert confirm 2 bước

### FR6.2: Thông tin cá nhân (M5.2)
- Profile hero card gradient rose→purple với avatar, tên, email
- Form readonly mặc định: họ tên, email, SĐT, ngày tham gia
- Toggle "Chỉnh sửa"/"Hủy" header → fields chuyển sang editable
- Nút "Lưu thay đổi" slide-up từ bottom khi ở edit mode
- TODO: PATCH Supabase auth.updateUser

### FR6.3: Bảo mật (M5.3)
- Section Xác thực: toggle sinh trắc học (Face ID/vân tay), toggle OTP 2 bước, nav row đổi mật khẩu
- Section Phiên đăng nhập: thiết bị hiện tại + badge "Thiết bị này", nút "Đăng xuất tất cả thiết bị khác" (orange)
- Section Nguy hiểm: xoá tài khoản (red, Alert confirm)

### FR6.4: Sao lưu & Đồng bộ (M5.4)
- Status hero card rose gradient: trạng thái đồng bộ, timestamp lần cuối, nút "Đồng bộ ngay"
- Cài đặt: toggle tự động sao lưu, toggle Wi-Fi only, nav row tần suất, info row dung lượng + progress bar
- Lịch sử sao lưu: 3 items với timestamp, dung lượng, badge Tự động/Thủ công
- Nút "Xoá tất cả bản sao lưu" (red, Alert confirm)

### FR7: Authentication & Account
- Đăng nhập bằng email/phone + mật khẩu
- Đăng nhập bằng Google OAuth
- Đăng nhập bằng mã OTP (SMS/Email)
- Đăng ký tài khoản mới (phone + email + password)
- Quên mật khẩu (OTP verification + đặt lại)
- Quản lý profile (tên, email, phone, avatar)

### FR8: Bản đồ Hẹn hò (Date Map)
- Hiển thị bản đồ eKMap với map pins theo category
- Filter theo 5 loại: quán ăn, cafe, homestay, khu vui chơi, TTTM
- AI gợi ý dựa trên sở thích người yêu đã lưu
- Chi tiết địa điểm: tên, rating, khoảng cách, địa chỉ, tags
- Dẫn đường turn-by-turn (ô tô, xe máy, đi bộ)
- Lưu địa điểm yêu thích, chia sẻ

### FR9: Album Ảnh Hẹn hò
- Upload ảnh từ camera hoặc gallery
- Nhóm ảnh theo sự kiện/ngày hẹn hò
- Filter: tất cả, hẹn hò, du lịch, kỷ niệm, yêu thích
- Photo grid với mixed layout (col-span)
- Stats: tổng ảnh, sự kiện, tháng

### FR10: Đếm Ngày Yêu Nhau
- Đếm tự động từ ngày bắt đầu yêu
- Breakdown: năm, tháng, ngày, giờ
- Milestones timeline (100 ngày, 365 ngày, 500 ngày, 1000 ngày)
- Chia sẻ dưới dạng ảnh, đặt hình nền

### FR11: Insight 360°
- Neuron map SVG: người yêu ở trung tâm, categories xung quanh
- Node size proportional to entry count
- Sentiment analysis bars (yêu thích, thích, bình thường, ghét)
- AI tổng quan: phân tích tự động + gợi ý hẹn hò

### FR12: Voice Input & Note
- Ghi chú giọng nói (nhấn giữ mic)
- AI speech-to-text tự động (tiếng Việt)
- Parse voice content thành structured entries
- Lịch sử recordings với waveform preview
- Playback, trạng thái: đã lưu / chờ lưu

### FR13: Daily Reminder
- Nhắc nhở ngày đặc biệt hôm nay và sắp tới
- AI gợi ý 3-5 việc nên làm hôm nay (dựa trên data)
- Cài đặt: giờ nhắc, kênh (push + Telegram), AI tự động, quiet hours
- Gửi gợi ý qua Telegram

### FR14: Chat History
- Lịch sử tất cả cuộc chat AI
- Search và filter: text, voice, AI suggest
- Nhóm theo ngày
- Stats: tổng chat, entries đã lưu, voice chats

---

## 6. Yêu Cầu Phi Chức Năng (Non-Functional Requirements Summary)

| Thuộc tính | Yêu cầu | Target |
|------------|---------|--------|
| **Performance** | App load time | < 2 giây |
| **Performance** | Screen transition | < 300ms |
| **Performance** | Map rendering | < 2 giây (eKMap SDK) |
| **Performance** | Voice transcription | < 5 giây (AI processing) |
| **Availability** | Offline read | Có (cached data) |
| **Security** | Data at rest | Supabase RLS + device encryption |
| **Security** | Authentication | Supabase Auth (email, Google, OTP) |
| **Security** | Token storage | Expo SecureStore / Keychain |
| **Usability** | Touch target | >= 44x44pt |
| **Compatibility** | iOS | >= 15.0 |
| **Compatibility** | Android | >= API 24 (Android 7.0) |
| **Accessibility** | Font scaling | Dynamic Type support |
| **Accessibility** | Screen reader | VoiceOver/TalkBack labels |

---

## 7. Tech Stack

| Layer | Công nghệ | Lý do chọn |
|-------|-----------|------------|
| **Framework** | React Native + Expo SDK 52+ | Cross-platform, OTA updates, Expo ecosystem |
| **Navigation** | Expo Router (file-based) | Convention over configuration, deep linking |
| **Styling** | NativeWind (Tailwind for RN) | Consistent with web version, utility-first |
| **State** | React hooks + Context | Simple app, no need for Redux |
| **Backend** | Supabase (PostgreSQL + Auth) | Existing infrastructure from web version |
| **AI** | OpenRouter API (Claude Sonnet) | Existing integration, tiếng Việt support |
| **Notifications** | Telegram Bot API + Expo Notifications | Dual channel |
| **Storage** | AsyncStorage + Supabase | Offline cache + cloud sync |
| **Maps** | eKMap SDK | Vietnamese map data, custom pins |
| **Voice** | expo-av + OpenRouter Whisper | Recording + transcription |
| **Auth** | Supabase Auth | Email, Google, OTP |
| **Image** | expo-image-picker + Supabase Storage | Upload + cloud storage |
| **Animations** | react-native-reanimated 3 | 60fps GPU-accelerated |

---

## 8. Constraints & Assumptions

### Constraints (Ràng buộc)
1. Single user per account — mỗi tài khoản 1 người dùng, không multi-user sharing
2. Budget: $0 (personal project, free tier services)
3. API keys lưu trong app config (acceptable cho personal app)
4. Supabase free tier: 500MB database, 50K monthly active users

### Assumptions (Giả định)
1. User luôn có internet khi thêm/sửa data (offline chỉ đọc)
2. Tiếng Việt là ngôn ngữ chính
3. OpenRouter API available và responsive
4. User đăng ký tài khoản và app tự cấu hình services

---

## 9. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| OpenRouter API downtime | Low | Medium | Cache AI responses, fallback message |
| Supabase free tier limit | Low | High | Monitor usage, upgrade plan if needed |
| Expo SDK breaking changes | Medium | Medium | Lock SDK version, test before upgrade |
| API keys leaked from app bundle | Medium | Medium | Environment variables, obfuscation |
| eKMap SDK performance on low-end devices | Medium | Medium | Lazy load map, fallback to list view |
| Voice recording permission denied | Medium | Low | Clear permission flow, text input fallback |
| Photo storage exceeds Supabase free tier | Medium | High | Compress images, limit resolution, monitor usage |

---

## 10. Timeline Dự Kiến

| Phase | Thời gian | Deliverables |
|-------|-----------|-------------|
| **Phase 0: Documentation** | 1 ngày | BRD v2, SRS v2, User Stories v2, Stitch UI |
| **Phase 1: Foundation** | 2-3 ngày | Expo setup, navigation, Supabase client, design system, auth flow |
| **Phase 2: Core Features** | 5-7 ngày | Dashboard (mini-app grid), Entry CRUD, Calendar, Settings |
| **Phase 3: AI Integration** | 3-4 ngày | AI Chat (text + voice), NLP parsing, voice note, daily suggestions |
| **Phase 4: Advanced Features** | 4-5 ngày | Date Map (eKMap), Navigation, Album ảnh, Đếm ngày yêu |
| **Phase 5: Analytics & Insight** | 2-3 ngày | Insight 360° neuron map, Chat History, Daily Reminder |
| **Phase 6: Notifications** | 1-2 ngày | Telegram integration, push notifications |
| **Phase 7: Polish** | 2-3 ngày | Animations, offline support, accessibility, testing |
| **Phase 8: Release** | 1 ngày | TestFlight/Internal testing, EAS Build |

**Tổng ước tính: 3-4 tuần**

---

## Phê Duyệt

| Vai trò | Tên | Ngày | Chữ ký |
|---------|-----|------|--------|
| Product Owner | | | |
| Technical Lead | | | |

---

## Revision History

| Phiên bản | Ngày | Tác giả | Thay đổi |
|-----------|------|---------|----------|
| 1.0.0 | 2026-03-14 | CTO | Initial version: 8 modules (Dashboard, Entry, AI Chat, Calendar, Settings, Telegram, Push, Offline) |
| 2.0.0 | 2026-03-14 | CTO | Added: Auth (M6), Date Map (M7), Navigation (M8), Photo Album (M9), Love Counter (M10), Insight 360° (M11), Voice Note (M12), Daily Reminder (M13), Chat History (M17). Updated: Dashboard mini-app grid, Settings user-facing, AI Chat voice input. Total 17 modules. |
| 2.1.0 | 2026-03-15 | CTO | Added Settings sub-screens: M5.1 Partner Info, M5.2 Personal Info, M5.3 Security, M5.4 Backup & Sync. Updated FR6 requirements. |
| 2.2.0 | 2026-03-15 | CTO | Phase 4 implementation: M7 Date Map, M9 Photo Album, M11 Insight 360°. Refined FR8 (Map), FR9 (Album), FR11 (Insight) với chi tiết UI/UX từ Stitch designs. Thêm user stories. Các màn hình được redesign theo stitch: map 55% height + bottom sheet overlay, neuron map SVG với floating animation, album stats single card + mixed photo grid. |
| 2.3.0 | 2026-03-15 | CTO | Added M2.1 - All Notes screen: full-screen list với real-time search, filter chips (11 categories), sort, empty state, FAB. Thêm FR1.1. Xoá "Lưu ý quan trọng" khỏi Dashboard. Splash screen với expo-splash-screen. |
