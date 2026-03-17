# TÀI LIỆU YÊU CẦU NGHIỆP VỤ (BRD)
# AI Love - Ứng Dụng Trợ Lý Tình Yêu AI

**Dự án:** AI Love (MyLoveThaiHoc Mobile)
**Khách hàng:** Dự án nội bộ - Tiên Phong CDS
**Phiên bản:** 3.0.0
**Ngày tạo:** 2026-03-14
**Ngày cập nhật:** 2026-03-17
**Tác giả:** CTO Office - Tiên Phong CDS
**Nền tảng:** React Native (Expo SDK 54) — iOS & Android

---

## BẢNG GHI NHẬN THAY ĐỔI TÀI LIỆU

| Phiên bản | Ngày thay đổi | Người thay đổi | Nội dung thay đổi |
|-----------|---------------|----------------|-------------------|
| 1.0.0 | 2026-03-14 | CTO | Tạo mới: 8 modules cơ bản (Dashboard, Entry, AI Chat, Calendar, Settings, Telegram, Push, Offline) |
| 2.0.0 | 2026-03-14 | CTO | Thêm: Auth (M6), Date Map (M7), Navigation (M8), Photo Album (M9), Love Counter (M10), Insight 360° (M11), Voice Note (M12), Daily Reminder (M13), Chat History (M17). Tổng 17 modules |
| 2.1.0 | 2026-03-15 | CTO | Thêm Settings con: M5.1 Partner Info, M5.2 Personal Info, M5.3 Security, M5.4 Backup & Sync |
| 2.2.0 | 2026-03-15 | CTO | Triển khai Phase 4: M7 Date Map, M9 Photo Album, M11 Insight 360°. Thiết kế UI/UX từ Stitch |
| 2.3.0 | 2026-03-15 | CTO | Thêm M2.1 All Notes: tìm kiếm, filter chips, sort, empty state, FAB |
| 2.4.0 | 2026-03-16 | CTO | Voice Chat: STT/TTS qua OpenRouter Audio API, Recording screen, Gemini STT backup |
| 3.0.0 | 2026-03-17 | CTO | Chuyển đổi sang format BRD chuẩn 7 phần. Bổ sung chi tiết trường dữ liệu, dropdown values, validation rules cho tất cả modules |

---

## TRANG KÝ

| Vai trò | Họ tên | Chữ ký | Ngày |
|---------|--------|--------|------|
| Product Owner | | | |
| Technical Lead | | | |
| Người phê duyệt | | | |

---

## MỤC LỤC

1. [Giới thiệu tổng quan](#1-giới-thiệu-tổng-quan)
2. [Mục tiêu yêu cầu](#2-mục-tiêu-yêu-cầu)
3. [Phạm vi áp dụng & Đối tượng sử dụng](#3-phạm-vi-áp-dụng--đối-tượng-sử-dụng)
4. [Phân loại yêu cầu](#4-phân-loại-yêu-cầu)
5. [Quy ước mã yêu cầu và chữ viết tắt](#5-quy-ước-mã-yêu-cầu-và-chữ-viết-tắt)
6. [Lưu đồ sử dụng và vận hành](#6-lưu-đồ-sử-dụng-và-vận-hành)
7. [Yêu cầu nghiệp vụ và tính năng chi tiết](#7-yêu-cầu-nghiệp-vụ-và-tính-năng-chi-tiết)

---

## 1. GIỚI THIỆU TỔNG QUAN

AI Love là ứng dụng mobile cá nhân giúp ghi nhận, phân loại, và nhắc nhở mọi thông tin về người yêu. Ứng dụng tích hợp trí tuệ nhân tạo (AI) để phân tích ngôn ngữ tự nhiên, gợi ý hàng ngày, và hỗ trợ nhập liệu bằng giọng nói.

Hệ thống cho phép người dùng thực hiện đầy đủ các hoạt động quản lý thông tin tình yêu trên một nền tảng tập trung, đảm bảo:
- Ghi nhận mọi thông tin quan trọng về người yêu (sở thích, dị ứng, ngày kỷ niệm...) một cách có cấu trúc.
- Không bỏ lỡ bất kỳ ngày đặc biệt nào nhờ hệ thống nhắc nhở đa kênh.
- Tăng sự chu đáo hàng ngày nhờ gợi ý AI dựa trên dữ liệu đã lưu.
- Nhập liệu nhanh chóng bằng ngôn ngữ tự nhiên hoặc giọng nói, AI tự động phân tích và cấu trúc hóa.
- Lưu trữ kỷ niệm bằng ảnh, bản đồ hẹn hò, và đếm ngày yêu nhau.

---

## 2. MỤC TIÊU YÊU CẦU

- Xây dựng ứng dụng mobile đa nền tảng (iOS + Android) cho phép ghi nhận, phân loại 11 danh mục thông tin về người yêu với 5 mức cảm xúc.
- Tích hợp AI phân tích ngôn ngữ tự nhiên tiếng Việt để tự động trích xuất và cấu trúc hóa thông tin từ văn bản hoặc giọng nói.
- Cung cấp hệ thống nhắc nhở đa kênh (Telegram Bot + Push Notification) cho ngày đặc biệt và gợi ý hàng ngày.
- Tích hợp bản đồ eKMap gợi ý địa điểm hẹn hò phù hợp dựa trên sở thích.
- Trực quan hóa toàn bộ thông tin bằng sơ đồ Neuron Map (Insight 360°).
- Đảm bảo trải nghiệm mobile-native mượt mà với thời gian tải < 2 giây và chuyển màn hình < 300ms.

---

## 3. PHẠM VI ÁP DỤNG & ĐỐI TƯỢNG SỬ DỤNG

### a. Phạm vi áp dụng

- Ứng dụng mobile cá nhân (single-user), chạy trên iOS >= 15.0 và Android >= API 24.
- Bao gồm 17 modules chức năng: từ quản lý ghi chú, AI chat, lịch, cài đặt, đến bản đồ hẹn hò, album ảnh, và nhắc nhở hàng ngày.
- Tích hợp 4 hệ thống bên ngoài: Supabase (backend), OpenRouter (AI), Telegram Bot (thông báo), eKMap (bản đồ).
- Ngoài phạm vi (v2.0): Multi-user, chia sẻ giữa cặp đôi, tích hợp Google/Apple Calendar, Widget, Apple Watch, video, AR/VR.

### b. Đối tượng sử dụng

| STT | Chức danh | Loại tài khoản | Vai trò | Mô tả |
|-----|-----------|---------------|---------|-------|
| 1 | Người dùng cuối | User | Sử dụng toàn bộ tính năng | Cá nhân sử dụng app để ghi nhận thông tin người yêu |
| 2 | Product Owner | Admin | Quản lý tính năng, ưu tiên | CTO quyết định roadmap và phê duyệt |
| 3 | Developer | Dev | Phát triển, triển khai | CTO + AI Assistant thiết kế và code |

---

## 4. PHÂN LOẠI YÊU CẦU

### Chức năng:
- Tạo, sửa, xóa ghi chú theo 11 danh mục và 5 mức cảm xúc.
- AI phân tích ngôn ngữ tự nhiên tiếng Việt, trích xuất nhiều ghi chú từ 1 câu.
- Quản lý ngày đặc biệt với countdown, lặp lại hàng năm, và nhắc nhở.
- Gợi ý AI hàng ngày dựa trên dữ liệu đã có.
- Bản đồ hẹn hò với 5 loại địa điểm, dẫn đường, và AI gợi ý.
- Ghi chú giọng nói với AI chuyển đổi giọng nói thành văn bản.
- Album ảnh hẹn hò, đếm ngày yêu nhau, và Insight 360°.

### Phi chức năng:
- Hiệu năng: Tải app < 2 giây, chuyển màn hình < 300ms, render bản đồ < 2 giây.
- Bảo mật: Supabase RLS + mã hóa thiết bị, token lưu trong SecureStore/Keychain.
- Khả dụng: Đọc offline từ dữ liệu đã cache, đồng bộ khi có mạng.
- Khả năng tiếp cận: Dynamic Type, VoiceOver/TalkBack, touch target >= 48dp.
- Tuân thủ: Google Play & App Store guidelines, quyền riêng tư, consent AI.

---

## 5. QUY ƯỚC MÃ YÊU CẦU VÀ CHỮ VIẾT TẮT

| STT | Thuật ngữ | Diễn giải |
|-----|-----------|-----------|
| 1 | BRD | Tài liệu Yêu cầu Nghiệp vụ (Business Requirements Document) |
| 2 | SRS | Đặc tả Yêu cầu Phần mềm (Software Requirements Specification) |
| 3 | AI | Trí tuệ nhân tạo (Artificial Intelligence) |
| 4 | NLP | Xử lý ngôn ngữ tự nhiên (Natural Language Processing) |
| 5 | STT | Chuyển giọng nói thành văn bản (Speech-to-Text) |
| 6 | TTS | Chuyển văn bản thành giọng nói (Text-to-Speech) |
| 7 | OTP | Mã xác thực một lần (One-Time Password) |
| 8 | FAB | Nút hành động nổi (Floating Action Button) |
| 9 | KH | Khách hàng / Người yêu (trong ngữ cảnh app) |
| 10 | Entry | Một ghi chú thông tin về người yêu |
| 11 | Category | Danh mục phân loại ghi chú (11 loại) |
| 12 | Sentiment | Mức độ cảm xúc (5 mức) |
| 13 | RLS | Bảo mật cấp dòng dữ liệu (Row Level Security) |
| 14 | CDP | Nền tảng dữ liệu khách hàng (Customer Data Platform) |
| 15 | ETA | Thời gian dự kiến đến (Estimated Time of Arrival) |

---

## 6. LƯU ĐỒ SỬ DỤNG VÀ VẬN HÀNH

### a. Mô tả chi tiết

```
                      Luồng sử dụng chính AI Love

Người dùng ──► Mở app ──► Đã đăng nhập? ──Chưa──► Đăng nhập/Đăng ký
                                │                        │
                               Rồi                      Lưu
                                │                        │
                                ▼                        ▼
                      Đã onboarding? ──Chưa──► Onboarding 5 bước
                                │                  (Tên → SN → KN → Avatar)
                               Rồi                      │
                                │                       Lưu
                                ▼                        │
                          Dashboard ◄────────────────────┘
                     ┌────┬────┼────┬────┐
                     │    │    │    │    │
                     ▼    ▼    ▼    ▼    ▼
                  AI    Thêm  Lịch  Cài   Mini-apps
                  Chat  GN    SĐB   đặt  (Map, Album,
                   │     │     │     │    Counter, Insight,
                   │     │     │     │    Voice, Reminder)
                   ▼     ▼     ▼     ▼
                Supabase + OpenRouter + Telegram + eKMap
```

- **Khởi tạo:** Người dùng mở app → kiểm tra trạng thái xác thực → chuyển đến Đăng nhập hoặc Dashboard.
- **Onboarding:** Lần đầu sau đăng ký, người dùng hoàn thành 5 bước: Welcome → Tên người yêu → Ngày sinh → Ngày kỷ niệm → Ảnh đại diện.
- **Sử dụng chính:** Từ Dashboard, người dùng truy cập 5 tab chính (Trang chủ, AI Chat, Thêm, Lịch, Cài đặt) và 8 mini-app (Bản đồ, Album, Đếm ngày, Insight, Voice, Reminder, Chat History, All Notes).
- **Tương tác AI:** Người dùng nhập văn bản hoặc giọng nói → AI phân tích → hiển thị preview → xác nhận lưu.
- **Hoàn tất:** Hệ thống lưu dữ liệu vào Supabase, gửi nhắc nhở qua Telegram/Push khi đến hạn.

### b. Lưu ý nghiệp vụ quan trọng

- Single-user: Mỗi tài khoản chỉ 1 người dùng, không chia sẻ dữ liệu.
- AI consent: Trước khi gửi dữ liệu đến OpenRouter, PHẢI hiển thị consent dialog rõ ràng.
- Offline: Chỉ đọc dữ liệu cache khi offline, mọi thao tác ghi cần internet.
- Privacy: Không thu thập dữ liệu thừa, API keys không hardcode, privacy policy luôn truy cập được.
- Quyền thiết bị: Chỉ request permission khi người dùng thực sự sử dụng tính năng tương ứng.

---

## 7. YÊU CẦU NGHIỆP VỤ VÀ TÍNH NĂNG CHI TIẾT

### 1. Xác thực & Tài khoản (M6)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Đăng nhập | Số điện thoại / Email | Ô nhập | Nhập SĐT hoặc email để đăng nhập | x | Hỗ trợ cả 2 định dạng |
| | Mật khẩu | Ô nhập (ẩn) | Nhập mật khẩu, có nút hiện/ẩn | x | Tối thiểu 6 ký tự |
| | Đăng nhập | Button | Xác thực và chuyển đến Dashboard | x | |
| | Đăng nhập bằng Google | Button | OAuth Google → Supabase Auth | | |
| | Đăng nhập bằng OTP | Button | Gửi mã OTP qua SMS/Email → xác thực | | |
| | Quên mật khẩu | Link | Chuyển đến màn hình quên mật khẩu | | |
| | Đăng ký | Link | Chuyển đến màn hình đăng ký | | |
| Trang Đăng ký | Số điện thoại | Ô nhập | Nhập SĐT | x | Định dạng VN: 0xxx |
| | Email | Ô nhập | Nhập email | x | Validation email format |
| | Mật khẩu | Ô nhập (ẩn) | Tạo mật khẩu | x | Tối thiểu 6 ký tự |
| | Đăng ký | Button | Gửi OTP xác thực → tạo tài khoản | x | |
| Trang Quên MK | Nhập SĐT/Email | Ô nhập | Bước 1: Nhập thông tin | x | |
| | Xác thực OTP | Ô nhập (6 số) | Bước 2: Nhập mã OTP | x | Timeout 60 giây |
| | Mật khẩu mới | Ô nhập (ẩn) | Bước 3: Đặt mật khẩu mới | x | Tối thiểu 6 ký tự |

#### 1.1 Onboarding (lần đầu sau đăng ký)

| STT | Nghiệp vụ | Mô tả | Ghi chú | Trách nhiệm |
|-----|-----------|-------|---------|-------------|
| 1 | Welcome | Màn hình chào mừng với logo AI Love và slogan | Nút "Bắt đầu" | Hệ thống |
| 2 | Tên người yêu | Nhập tên gọi của người yêu | * Bắt buộc | Người dùng |
| 3 | Ngày sinh | Chọn ngày sinh người yêu bằng date picker | Không bắt buộc, có nút bỏ qua | Người dùng |
| 4 | Ngày kỷ niệm | Chọn ngày bắt đầu yêu nhau | Không bắt buộc, có nút bỏ qua | Người dùng |
| 5 | Ảnh đại diện | Chọn ảnh từ gallery hoặc chụp camera | Không bắt buộc, có nút bỏ qua | Người dùng |

---

### 2. Dashboard (M1)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang chủ | Hero Card | Section | Hiển thị ảnh + tên người yêu, đếm ngày yêu, slogan | x | Gradient rose → purple |
| | Mini-app Grid | Grid 4x2 | 8 nút tắt đến các tính năng: Bản đồ, Album, Đếm ngày, Insight, Voice, Reminder, Chat History, All Notes | x | Kiểu Grab/MoMo |
| | Thống kê nhanh | Section | Tổng ghi chú, danh mục nhiều nhất, cảm xúc chủ đạo | x | 3 stat cards |
| | Ngày sắp tới | Section | Danh sách ngày đặc biệt trong 30 ngày tới | x | Countdown badge |
| | Cảnh báo | Section | Hiển thị dị ứng, điều ghét (sentiment = hate/dislike) | | Chỉ hiện khi có dữ liệu |
| | Ghi chú gần đây | Section + Link | 3-5 ghi chú mới nhất, nút "Xem tất cả >" → All Notes | x | |

---

### 3. Quản lý Ghi chú (M2)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Thêm ghi chú | Danh mục | Grid chọn 1 | Chọn 1 trong 11 danh mục | x | Xem danh sách giá trị bên dưới |
| | Cảm xúc | Picker chọn 1 | Chọn 1 trong 5 mức cảm xúc | x | Xem danh sách giá trị bên dưới |
| | Tiêu đề | Ô nhập | Nhập tiêu đề ghi chú | x | Tối đa 100 ký tự |
| | Chi tiết | Ô nhập (textarea) | Mô tả chi tiết | | Tối đa 500 ký tự |
| | Ngày sự kiện | Bộ chọn ngày | Ngày liên quan đến ghi chú | | Mặc định: hôm nay |
| | Lặp lại hàng năm | Toggle | Đánh dấu lặp lại hàng năm | | Mặc định: tắt |
| | Tags | Ô nhập + chips | Nhập từ khóa, phân tách bằng dấu phẩy | | Tối đa 5 tags |
| | Lưu | Button | Lưu ghi chú vào Supabase | x | |

**Danh sách giá trị Danh mục (chọn 1):**
1. Ẩm thực (food) — icon: UtensilsCrossed
2. Địa điểm (place) — icon: MapPin
3. Sở thích (hobby) — icon: Heart
4. Phong cách (style) — icon: Shirt
5. Âm nhạc (music) — icon: Music
6. Phim ảnh (movie) — icon: Film
7. Quà tặng (gift) — icon: Gift
8. Sức khỏe (health) — icon: Activity
9. Gia đình (family) — icon: Users
10. Công việc (work) — icon: Briefcase
11. Khác (other) — icon: MoreHorizontal

**Danh sách giá trị Cảm xúc (chọn 1):**
1. Yêu thích (love) — icon: Heart đỏ
2. Thích (like) — icon: ThumbsUp xanh
3. Bình thường (neutral) — icon: Meh vàng
4. Không thích (dislike) — icon: ThumbsDown cam
5. Ghét (hate) — icon: X đỏ đậm

#### 3.1 Xem tất cả ghi chú (M2.1)

| STT | Nghiệp vụ | Mô tả | Ghi chú | Trách nhiệm |
|-----|-----------|-------|---------|-------------|
| 1 | Tìm kiếm | Thanh search sticky dưới header, lọc real-time theo tiêu đề và chi tiết, nút xóa (×) | Tìm kiếm ngay khi nhập | Người dùng |
| 2 | Lọc theo danh mục | Hàng filter chips cuộn ngang: "Tất cả" (mặc định) + 11 danh mục với icon + badge số lượng | Chọn 1 chip tại 1 thời điểm | Người dùng |
| 3 | Sắp xếp | Dropdown chọn thứ tự sắp xếp | Danh sách giá trị: 1. Mới nhất, 2. Cũ nhất, 3. A→Z | Người dùng |
| 4 | Danh sách ghi chú | Mỗi card hiển thị: icon tròn 44px + tiêu đề + chi tiết (nếu có) + "danh mục · thời gian" + nút "Chi tiết" | FlatList phân trang | Hệ thống |
| 5 | Thêm mới | FAB (+) góc dưới phải → chuyển đến Thêm ghi chú | | Người dùng |
| 6 | Xóa | Vuốt trái trên card → hiện nút Xóa đỏ → Alert xác nhận | Không khôi phục được | Người dùng |
| 7 | Trạng thái trống | Khi không có kết quả: icon tìm kiếm + thông báo + nút "Xóa bộ lọc" | | Hệ thống |

#### 3.2 Chi tiết ghi chú

| STT | Nghiệp vụ | Mô tả | Ghi chú | Trách nhiệm |
|-----|-----------|-------|---------|-------------|
| 1 | Xem chi tiết | Nhấp vào card → mở màn hình chi tiết, hiển thị đầy đủ thông tin | Chế độ chỉ đọc mặc định | Người dùng |
| 2 | Chỉnh sửa | Nút "Sửa" trên header → chuyển sang chế độ chỉnh sửa, tất cả trường mở khóa | | Người dùng |
| 3 | Lưu | Nút "Lưu" → cập nhật Supabase → quay về chế độ xem | | Người dùng |
| 4 | Xóa | Nút "Xóa" → Alert xác nhận → xóa khỏi Supabase → quay về danh sách | | Người dùng |

---

### 4. AI Chat (M3)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang AI Chat | Danh sách tin nhắn | FlatList | Hiển thị lịch sử chat giữa người dùng và AI | x | Nhóm theo ngày |
| | Ô nhập tin nhắn | Ô nhập | Nhập văn bản tiếng Việt | x | Placeholder: "Nhập thông tin về người yêu..." |
| | Nút gửi | Button | Gửi tin nhắn đến OpenRouter AI | x | Icon: Send |
| | Nút ghi âm | Button | Mở màn hình ghi âm → STT → điền vào ô nhập | | Icon: Mic |
| | Nút nghe AI | Button | Phát giọng nói AI phản hồi (TTS) | | Trên mỗi tin nhắn AI |
| | Preview entries | Bottom sheet | AI hiển thị các entries đã trích xuất, cho phép xác nhận lưu hàng loạt | | Nút: Lưu tất cả / Bỏ qua |
| | Gợi ý AI | Chips | 3-5 câu gợi ý nhanh dựa trên dữ liệu | | Hiện khi chat trống |
| | Typing indicator | Animation | Hiệu ứng "AI đang trả lời..." | | 3 chấm nhấp nháy |

#### 4.1 Luồng AI phân tích

| STT | Nghiệp vụ | Mô tả | Ghi chú | Trách nhiệm |
|-----|-----------|-------|---------|-------------|
| 1 | Nhập văn bản | Người dùng nhập: "Em thích ăn phở bò và ghét sầu riêng" | Tiếng Việt | Người dùng |
| 2 | Gửi đến AI | App gửi đến OpenRouter API (Claude Sonnet) với system prompt chuyên biệt | Consent AI phải được chấp nhận trước | Hệ thống |
| 3 | AI trích xuất | AI parse thành 2 entries: {food, love, "Phở bò"} và {food, hate, "Sầu riêng"} | JSON format | Hệ thống |
| 4 | Preview | Hiển thị bottom sheet với danh sách entries đã trích xuất | Cho phép sửa trước khi lưu | Người dùng |
| 5 | Lưu hàng loạt | Nhấp "Lưu tất cả" → batch insert vào Supabase | | Người dùng |

#### 4.2 Ghi âm & Chuyển giọng nói (M12)

| STT | Nghiệp vụ | Mô tả | Ghi chú | Trách nhiệm |
|-----|-----------|-------|---------|-------------|
| 1 | Bắt đầu ghi | Nhấp nút Mic → mở màn hình Recording toàn trang | Yêu cầu quyền microphone | Người dùng |
| 2 | Ghi âm | expo-av ghi WAV → hiển thị waveform + thời lượng | Định dạng: WAV, 16kHz | Hệ thống |
| 3 | Dừng ghi | Nhấp nút Dừng → chuyển audio sang base64 | | Người dùng |
| 4 | STT | Gửi base64 đến OpenRouter Audio API (gpt-4o-audio-preview) → nhận text tiếng Việt | Backup: Gemini STT | Hệ thống |
| 5 | Hiển thị | Text hiện trong ô chat input → người dùng review → nhấp Gửi | Cho phép chỉnh sửa trước khi gửi | Người dùng |
| 6 | TTS phản hồi | Nút "Nghe" trên mỗi tin nhắn AI → OpenRouter TTS (voice: nova, format: mp3) → phát âm | | Người dùng |

---

### 5. Quản lý Ngày Đặc Biệt (M4)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Lịch | Danh sách ngày đặc biệt | FlatList | Hiển thị tất cả ngày đặc biệt với countdown ring | x | Sắp xếp theo ngày gần nhất |
| | Countdown ring | SVG | Vòng tròn SVG hiển thị số ngày còn lại | x | Màu theo urgency |
| | Nút thêm | FAB | Mở bottom sheet form thêm ngày mới | x | |

**Bottom sheet Thêm ngày đặc biệt:**
- Khối Thông tin sự kiện
  1. \* Tên sự kiện (nhập)
  2. \* Ngày (chọn ngày)
  3. \* Loại sự kiện (chọn)
  4. Lặp lại hàng năm (toggle) — mặc định: bật
  5. Nhắc trước (chọn)
  6. Ghi chú (nhập)
  7. → Nhấp nút Lưu hoặc Đóng

**Danh sách giá trị Loại sự kiện (chọn):**
1. Sinh nhật
2. Kỷ niệm
3. Ngày lễ
4. Khác

**Danh sách giá trị Nhắc trước (chọn):**
1. Ngày hôm đó
2. 1 ngày trước
3. 3 ngày trước
4. 7 ngày trước
5. 14 ngày trước

**Danh sách màu countdown theo urgency:**
- Đỏ: <= 3 ngày
- Cam: 4-7 ngày
- Vàng: 8-14 ngày
- Xanh lá: 15-30 ngày
- Xanh dương: > 30 ngày

---

### 6. Cài đặt (M5)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Cài đặt | Profile card | Section | Avatar + tên + email + SĐT + nút Sửa + dãy thống kê | x | Gradient hero card |
| | Thông tin người yêu | Section + Nav | Hiển thị tên + biệt danh + sinh nhật + ảnh. Nút "Chỉnh sửa" → M5.1 | x | |
| | Tài khoản | Section | Nav rows: Thông tin cá nhân (M5.2), Đổi mật khẩu, Bảo mật (M5.3), Sao lưu (M5.4) | x | |
| | Thông báo | Section | 4 toggle switches | x | Xem danh sách bên dưới |
| | Chung | Section | Nav rows: Giao diện, Ngôn ngữ, Bộ nhớ, Xóa cache | | |
| | Hỗ trợ | Section | Nav rows: Trung tâm hỗ trợ, Góp ý, Chính sách, Điều khoản | | |
| | Đăng xuất | Button | Alert xác nhận → đăng xuất → màn hình đăng nhập | | Màu đỏ |

**Danh sách Thông báo (toggle):**
1. Ngày đặc biệt — Nhắc nhở khi có ngày đặc biệt sắp đến
2. Gợi ý hàng ngày — Nhận gợi ý AI mỗi ngày
3. Telegram — Gửi thông báo qua Telegram Bot
4. Email — Gửi thông báo qua email

#### 6.1 Thông tin người yêu (M5.1)

- Khối Ảnh đại diện
  1. Avatar 96px với camera overlay (nhấp → expo-image-picker)

- Khối Thông tin
  1. \* Tên gọi (nhập)
  2. Biệt danh (nhập)
  3. Ngày sinh (chọn ngày)
  4. Số điện thoại (nhập) — định dạng số
  5. Ghi chú (nhập - textarea)

- Nút hành động
  - Lưu thay đổi: Button gradient rose → cập nhật Supabase users table
  - Xóa tài khoản: Button text đỏ → Alert xác nhận 2 bước

#### 6.2 Thông tin cá nhân (M5.2)

- Khối Profile hero
  1. Avatar + tên + email (gradient rose→purple)

- Khối Thông tin (chế độ chỉ đọc mặc định)
  1. Họ tên (nhập / khóa)
  2. Email (nhập / khóa)
  3. Số điện thoại (nhập / khóa)
  4. Ngày tham gia (khóa)

- Toggle "Chỉnh sửa" / "Hủy" trên header → các trường chuyển sang chỉnh sửa được
- Nút "Lưu thay đổi" hiện slide-up từ bottom khi ở chế độ chỉnh sửa

#### 6.3 Bảo mật (M5.3)

- Khối Xác thực
  1. Sinh trắc học (Face ID/Vân tay) (toggle)
  2. OTP 2 bước (toggle)
  3. Đổi mật khẩu (nav row)

- Khối Phiên đăng nhập
  1. Thiết bị hiện tại + badge "Thiết bị này"
  2. Đăng xuất tất cả thiết bị khác (Button cam)

- Khối Nguy hiểm
  1. Xóa tài khoản (Button đỏ → Alert xác nhận)

#### 6.4 Sao lưu & Đồng bộ (M5.4)

- Khối Trạng thái
  1. Trạng thái đồng bộ (khóa) — "Đã đồng bộ" / "Đang chờ"
  2. Lần đồng bộ cuối (khóa) — timestamp
  3. Đồng bộ ngay (Button)

- Khối Cài đặt
  1. Tự động sao lưu (toggle) — mặc định: bật
  2. Chỉ Wi-Fi (toggle) — mặc định: bật
  3. Tần suất (nav row → chọn)
  4. Dung lượng đã dùng (khóa) — hiển thị + progress bar

- Khối Lịch sử
  1. 3 bản sao lưu gần nhất: timestamp + dung lượng + badge "Tự động" / "Thủ công"

- Nút "Xóa tất cả bản sao lưu" (Button đỏ → Alert xác nhận)

**Danh sách giá trị Tần suất sao lưu (chọn):**
1. Hàng ngày
2. Hàng tuần
3. Hàng tháng

---

### 7. Bản đồ Hẹn hò (M7)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Bản đồ | Bản đồ eKMap | Map view | Chiếm 55% chiều cao, hiển thị map pins theo danh mục | x | eKMap SDK |
| | Filter chips | Hàng cuộn ngang | 5 loại danh mục + "Tất cả" | x | Xem danh sách bên dưới |
| | Bottom sheet | Overlay | Danh sách địa điểm, kéo lên/xuống | x | |
| | Card địa điểm | Card | Tên + rating + khoảng cách + địa chỉ + tags | x | |
| | Nút dẫn đường | Button | Mở màn hình dẫn đường turn-by-turn | | |
| | Nút lưu | Icon | Lưu địa điểm yêu thích | | Heart icon toggle |
| | AI gợi ý | Button | AI gợi ý dựa trên sở thích đã lưu | | |

**Danh sách giá trị Danh mục địa điểm (chọn):**
1. Quán ăn — icon: UtensilsCrossed
2. Cafe — icon: Coffee
3. Homestay — icon: Home
4. Khu vui chơi — icon: Smile
5. TTTM (Trung tâm thương mại) — icon: ShoppingBag

**Danh sách giá trị Phương tiện dẫn đường (chọn):**
1. Ô tô
2. Xe máy
3. Đi bộ

---

### 8. Album Ảnh (M9)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Album | Thống kê | Card | Tổng ảnh + số sự kiện + số tháng | x | Single stat card |
| | Filter chips | Hàng cuộn ngang | Lọc theo loại ảnh | x | Xem danh sách bên dưới |
| | Photo grid | Grid layout | Lưới ảnh mixed layout (col-span) | x | |
| | FAB upload | Button | Chọn ảnh từ gallery hoặc chụp camera → upload Supabase Storage | x | expo-image-picker |

**Danh sách giá trị Filter ảnh (chọn):**
1. Tất cả
2. Hẹn hò
3. Du lịch
4. Kỷ niệm
5. Yêu thích

---

### 9. Đếm Ngày Yêu (M10)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Đếm ngày | Counter lớn | Hero section | Số ngày yêu nhau (lớn, nổi bật) | x | Tự động tính từ love_start_date |
| | Breakdown | 4 cards | Năm / Tháng / Ngày / Giờ | x | Real-time update |
| | Milestones | Timeline | Cột mốc quan trọng đã qua và sắp đến | x | |
| | Chia sẻ | Button | Tạo ảnh đếm ngày → chia sẻ | | |
| | Đặt hình nền | Button | Đặt ảnh đếm ngày làm wallpaper | | |

**Danh sách Milestones chuẩn:**
1. 100 ngày
2. 200 ngày
3. 365 ngày (1 năm)
4. 500 ngày
5. 730 ngày (2 năm)
6. 1000 ngày
7. 1095 ngày (3 năm)

---

### 10. Insight 360° (M11)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Insight | Neuron Map | SVG canvas | Người yêu ở trung tâm, 11 danh mục nối xung quanh | x | Node size tỉ lệ số entries |
| | Sentiment bars | Bar chart | Phân bố cảm xúc: yêu thích / thích / bình thường / không thích / ghét | x | 5 màu tương ứng |
| | AI tổng quan | Card | AI phân tích tự động: tóm tắt + gợi ý hẹn hò | x | OpenRouter AI |
| | Nhấp vào node | Bottom sheet | Hiển thị danh sách entries thuộc danh mục đã chọn | | |

---

### 11. Nhắc nhở Hàng ngày (M13)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Nhắc nhở | Ngày đặc biệt hôm nay | Card | Hiển thị sự kiện hôm nay (nếu có) | | Highlight đặc biệt |
| | Ngày sắp tới | Section | 3-5 ngày đặc biệt sắp đến | x | Countdown badge |
| | Gợi ý AI | Section | 3-5 việc nên làm hôm nay, AI tự động sinh | x | OpenRouter AI |
| | Cài đặt nhắc nhở | Section | Cấu hình giờ nhắc, kênh, AI tự động | x | |

- Khối Cài đặt nhắc nhở
  1. Giờ nhắc (chọn) — mặc định: 08:00
  2. Kênh thông báo (chọn nhiều)
  3. AI tự động gợi ý (toggle) — mặc định: bật
  4. Quiet hours bắt đầu (chọn) — mặc định: 22:00
  5. Quiet hours kết thúc (chọn) — mặc định: 07:00

**Danh sách giá trị Kênh thông báo (chọn nhiều):**
1. Push notification
2. Telegram

---

### 12. Lịch sử Chat (M17)

| Màn hình | Mô tả chi tiết | | | | |
|----------|----------------|---|---|---|---|
| | **Khối, trường thông tin** | **Loại** | **Mô tả** | **Bắt buộc** | **Ghi chú** |
| Trang Lịch sử | Thanh tìm kiếm | Ô nhập | Tìm kiếm trong lịch sử chat | | Real-time filter |
| | Filter chips | Hàng cuộn ngang | Lọc theo loại tin nhắn | | Xem danh sách bên dưới |
| | Danh sách chat | FlatList | Nhóm theo ngày, hiển thị preview tin nhắn | x | |
| | Thống kê | Header | Tổng chat + entries đã lưu + voice chats | x | 3 stat badges |

**Danh sách giá trị Filter lịch sử (chọn):**
1. Tất cả
2. Văn bản (text)
3. Giọng nói (voice)
4. Gợi ý AI (AI suggest)

---

### 13. Tích hợp Telegram (M14)

| STT | Nghiệp vụ | Mô tả | Ghi chú | Trách nhiệm |
|-----|-----------|-------|---------|-------------|
| 1 | Cấu hình | Nhập Bot Token + Chat ID trong Settings | Env variables | Người dùng |
| 2 | Test kết nối | Nút "Test" → gửi tin nhắn thử → hiện kết quả | | Người dùng |
| 3 | Gửi reminder | Hệ thống tự động gửi nhắc nhở ngày đặc biệt qua Telegram | Theo cấu hình "Nhắc trước" | Hệ thống |
| 4 | Gửi gợi ý | Gửi 3-5 gợi ý AI hàng ngày qua Telegram | Theo giờ đã cài đặt | Hệ thống |

---

## Phụ Lục A: Ràng Buộc & Giả Định

### Ràng buộc
1. Single user: Mỗi tài khoản 1 người dùng, không chia sẻ.
2. Budget: $0 (dự án cá nhân, sử dụng free tier).
3. Supabase free tier: 500MB database, 50K MAU.
4. Cần internet để ghi/sửa/xóa dữ liệu (offline chỉ đọc).

### Giả định
1. Tiếng Việt là ngôn ngữ chính.
2. OpenRouter API khả dụng và phản hồi nhanh.
3. Người dùng đăng ký tài khoản và tự cấu hình services.
4. eKMap SDK hoạt động ổn định trên cả iOS và Android.

## Phụ Lục B: Rủi Ro

| Rủi ro | Xác suất | Tác động | Biện pháp giảm thiểu |
|--------|----------|----------|---------------------|
| OpenRouter API ngừng hoạt động | Thấp | Trung bình | Cache phản hồi AI, hiển thị thông báo fallback |
| Supabase free tier đạt giới hạn | Thấp | Cao | Theo dõi usage, nâng cấp plan khi cần |
| Expo SDK breaking changes | Trung bình | Trung bình | Khóa phiên bản SDK, test trước khi nâng cấp |
| API keys bị lộ từ app bundle | Trung bình | Trung bình | Biến môi trường, obfuscation |
| eKMap chậm trên thiết bị cấu hình thấp | Trung bình | Trung bình | Lazy load map, fallback sang danh sách |
| Quyền microphone bị từ chối | Trung bình | Thấp | Luồng xin quyền rõ ràng, fallback nhập text |
| Ảnh vượt dung lượng Supabase | Trung bình | Cao | Nén ảnh, giới hạn độ phân giải, theo dõi usage |

## Phụ Lục C: Timeline Dự Kiến

| Giai đoạn | Thời gian | Sản phẩm |
|-----------|-----------|----------|
| Phase 0: Tài liệu | 1 ngày | BRD v3, SRS, User Stories, Stitch UI |
| Phase 1: Nền tảng | 2-3 ngày | Expo setup, navigation, Supabase, design system, auth |
| Phase 2: Tính năng lõi | 5-7 ngày | Dashboard, Entry CRUD, Calendar, Settings |
| Phase 3: Tích hợp AI | 3-4 ngày | AI Chat (text + voice), NLP, voice note, gợi ý AI |
| Phase 4: Tính năng nâng cao | 4-5 ngày | Date Map, Navigation, Album, Love Counter |
| Phase 5: Phân tích & Insight | 2-3 ngày | Insight 360°, Chat History, Daily Reminder |
| Phase 6: Thông báo | 1-2 ngày | Telegram, Push notifications |
| Phase 7: Hoàn thiện | 2-3 ngày | Animation, offline, accessibility, testing |
| Phase 8: Phát hành | 1 ngày | TestFlight/Internal testing, EAS Build |

**Tổng ước tính: 3-4 tuần**
