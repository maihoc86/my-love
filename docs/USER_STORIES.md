# User Stories - MyLoveThaiHoc v2.0

> **Phiên bản:** 2.0
> **Cập nhật:** 2026-03-14
> **Tổng số stories:** 37
> **Tổng Story Points:** 118
> **Số Sprints:** 4 (5 ngày/sprint)

---

## Epic 1: Quản lý Ghi chú (Entry Management)

### US-1.1: Xem tổng quan trên Dashboard

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 5 |
| **Module** | dashboard |

**User Story:**
Là người dùng, tôi muốn nhìn thấy tổng quan mọi thông tin đã lưu về người yêu ngay khi mở app, để nắm được bao nhiêu thông tin đã ghi nhận và có gì sắp tới.

**Acceptance Criteria:**
- [ ] Hero card hiển thị tổng số entries với text "Bạn đã lưu giữ X kỉ niệm tuyệt vời"
- [ ] Hiển thị top 6 categories với icon + số lượng (grid 3 cột)
- [ ] Hiển thị 5 entries gần nhất với category icon, title, sentiment, date
- [ ] Hero card có 2 quick action: "Thêm mới" → /add, "Chat AI" → /chat
- [ ] Skeleton loading khi đang fetch data
- [ ] Empty state hiển thị khi chưa có entries: icon Heart + "Chưa có ghi chú nào" + CTA "Thêm ngay"

**API:** `GET /entries?order=created_at.desc`, `GET /special_dates`
**Depends on:** US-1.3

---

### US-1.2: Xem cảnh báo dị ứng và điều ghét

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 2 |
| **Module** | dashboard |

**User Story:**
Là người dùng, tôi muốn thấy cảnh báo nổi bật về dị ứng và điều người yêu ghét, để tránh sai lầm quan trọng.

**Acceptance Criteria:**
- [ ] Section "Lưu ý quan trọng" hiện khi có entries với category='allergy' HOẶC sentiment='hate'
- [ ] Background gradient đỏ nhạt (red-50 → rose-50), border đỏ, icon AlertTriangle
- [ ] Mỗi item hiện dưới dạng pill badge: bg white/80, text đỏ, icon AlertTriangle nhỏ
- [ ] Không hiện section nếu không có entries phù hợp

**API:** `GET /entries?or=(category.eq.allergy,sentiment.eq.hate)`
**Depends on:** US-1.3

---

### US-1.3: Thêm ghi chú mới (thủ công)

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 5 |
| **Module** | entry |

**User Story:**
Là người dùng, tôi muốn thêm ghi chú mới về người yêu bằng cách chọn danh mục và nhập thông tin, để lưu lại từng điều cụ thể.

**Acceptance Criteria:**
- [ ] Chọn 1 trong 11 danh mục từ grid 3 cột (icon lớn 3xl, press feedback scale 0.95)
- [ ] Selected category: rose border + shadow + bg color
- [ ] Nhập tiêu đề (required, min 1 / max 200 chars, icon prefix theo category)
- [ ] Nhập chi tiết (optional, max 2000 chars, textarea 3 rows)
- [ ] Chọn mức cảm xúc từ 5 circular buttons (w-14 h-14 rounded-full): ❤️→🚫
- [ ] Selected sentiment: scale 1.1 + rose border + shadow
- [ ] Expand "Tùy chọn nâng cao" (slide-down): date picker + "Lặp lại hàng năm" checkbox
- [ ] Nhấn "Lưu ghi chú" → loading spinner → success toast (slide-down animation)
- [ ] Form auto-reset (giữ category + sentiment) sau khi lưu thành công
- [ ] Keyboard aware: form scroll khi keyboard mở (KeyboardAvoidingView)

**API:** `POST /entries`
**Depends on:** —

---

### US-1.4: Xoá ghi chú

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 2 |
| **Module** | entry |

**User Story:**
Là người dùng, tôi muốn xoá ghi chú không còn chính xác, để data luôn cập nhật.

**Acceptance Criteria:**
- [ ] Mỗi entry card có nút Trash icon (p-2 rounded-xl, gray-300)
- [ ] Nhấn lần 1: hiện confirm inline (nút "Xoá" đỏ + nút "X" huỷ, animate scale-in)
- [ ] Nhấn "Xoá": entry bị xoá khỏi Supabase và UI (optimistic update)
- [ ] Nhấn "X" hoặc sau 3 giây: tự ẩn confirm buttons
- [ ] Card có animation khi bị remove khỏi list

**API:** `DELETE /entries?id=eq.{id}`
**Depends on:** US-1.3

---

## Epic 2: AI Chat

### US-2.1: Chat với AI để thêm thông tin bằng ngôn ngữ tự nhiên

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 2 |
| **Story Points** | 8 |
| **Module** | ai_chat |

**User Story:**
Là người dùng, tôi muốn kể về người yêu bằng câu văn tự nhiên tiếng Việt và AI tự phân tích thành các entries có cấu trúc, để thêm nhiều thông tin cùng lúc mà không cần điền form.

**Acceptance Criteria:**
- [ ] Chat bubble UI: assistant (trái, white bg, rounded-tl-md) + user (phải, gradient rose, rounded-tr-md)
- [ ] Role labels "Assistant"/"Bạn" với avatar icon trên mỗi message
- [ ] Text input + send button tròn (disabled khi rỗng hoặc loading)
- [ ] Gửi text → OpenRouter API (claude-sonnet-4) → parse JSON entries
- [ ] Hiển thị summary: icon + title + category + sentiment cho mỗi entry parsed
- [ ] Typing indicator (3 bouncing purple dots) khi chờ AI
- [ ] Error handling: bubble "Có lỗi xảy ra. Kiểm tra API key..." khi API fail
- [ ] Auto-scroll to bottom khi có message mới
- [ ] Welcome message mặc định khi mở chat lần đầu

**API:** `POST https://openrouter.ai/api/v1/chat/completions`
**Depends on:** —

---

### US-2.2: Lưu batch entries từ AI

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 2 |
| **Story Points** | 3 |
| **Module** | ai_chat |

**User Story:**
Là người dùng, tôi muốn review và lưu tất cả thông tin AI đã phân tích với 1 nút bấm, để quá trình lưu nhanh chóng.

**Acceptance Criteria:**
- [ ] Nút "Lưu tất cả (N mục)" xuất hiện khi AI parse thành công (animate scale-in)
- [ ] Nút có gradient xanh lá (success), pill shape (rounded-full)
- [ ] Nhấn → batch insert tất cả entries vào Supabase
- [ ] Thành công → AI confirm "Đã lưu N ghi chú thành công!"
- [ ] Nút ẩn đi sau khi lưu
- [ ] Entries mới xuất hiện trên Dashboard (useEntries refetch)

**API:** `POST /entries` (batch insert)
**Depends on:** US-2.1, US-1.3

---

### US-2.3: Nhận gợi ý hàng ngày từ AI

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 2 |
| **Story Points** | 3 |
| **Module** | ai_chat |

**User Story:**
Là người dùng, tôi muốn nhận gợi ý những việc nên làm hôm nay dựa trên thông tin đã lưu, để luôn có ý tưởng quan tâm người yêu.

**Acceptance Criteria:**
- [ ] Nút "Gợi ý" (Sparkles icon, rose-50 bg) ở góc phải header chat
- [ ] Nhấn → gửi tất cả entries + ngày hiện tại cho AI
- [ ] AI trả về 3-5 gợi ý cụ thể bằng tiếng Việt, có emoji
- [ ] Hiển thị trong assistant chat bubble
- [ ] Disabled khi loading hoặc chưa có entries
- [ ] Nếu chưa có entries: message "Cần thêm thông tin trước đã nhé!"

**API:** `POST https://openrouter.ai/api/v1/chat/completions` (daily suggestions prompt)
**Depends on:** US-2.1, US-1.3

---

## Epic 3: Lịch & Ngày đặc biệt (Calendar)

### US-3.1: Xem danh sách ngày đặc biệt với countdown

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 5 |
| **Module** | calendar |

**User Story:**
Là người dùng, tôi muốn xem tất cả ngày đặc biệt sorted theo countdown, để biết ngày nào sắp đến gần nhất.

**Acceptance Criteria:**
- [ ] Danh sách sorted ascending theo số ngày còn lại
- [ ] Mỗi card: countdown ring SVG (56px), title extrabold, category badge, date, description
- [ ] Countdown ring color: xanh #10b981 (hôm nay), đỏ #ef4444 (<=3), cam #f97316 (<=7), hồng #f43f5e (else)
- [ ] Ring hiển thị số ngày ở giữa + label "NGÀY" nhỏ bên dưới
- [ ] Cards trong vòng 7 ngày: border rose + elevated shadow
- [ ] "Hàng năm" tag cho recurring events
- [ ] Empty state: Calendar icon centered + "Chưa có ngày đặc biệt" + "Thêm sinh nhật, kỷ niệm của em!"
- [ ] Stagger animation khi cards load

**API:** `GET /special_dates?order=event_date.asc`
**Depends on:** —

---

### US-3.2: Thêm ngày đặc biệt mới (bottom sheet form)

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 3 |
| **Module** | calendar |

**User Story:**
Là người dùng, tôi muốn thêm ngày đặc biệt như sinh nhật, kỷ niệm, để app nhắc tôi trước ngày đó.

**Acceptance Criteria:**
- [ ] Nút "+" (gradient rose, 48x48) ở header → toggle form slide-down
- [ ] Form style bottom sheet: sheet handle bar, close button
- [ ] Labels uppercase rose-400 tracking-wider (TÊN SỰ KIỆN, DANH MỤC...)
- [ ] Fields: tên sự kiện (required), danh mục select (4 options), ngày (date required)
- [ ] Ghi chú textarea (optional), toggle switch "Lặp lại hàng năm"
- [ ] Nhắc trước N ngày (number input, default 7, range 1-30)
- [ ] Submit → lưu Supabase → form ẩn → card xuất hiện trong list
- [ ] Form mở: nút "+" chuyển thành "X" màu gray

**API:** `POST /special_dates`
**Depends on:** —

---

### US-3.3: Xoá ngày đặc biệt (double-tap confirm)

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 2 |
| **Module** | calendar |

**User Story:**
Là người dùng, tôi muốn xoá ngày đặc biệt không còn cần thiết, với cơ chế xác nhận chống lỡ tay.

**Acceptance Criteria:**
- [ ] Nút Trash (w-9 h-9 rounded-xl) trên mỗi date card
- [ ] Nhấn lần 1: nút chuyển đỏ (bg-red-500 text-white) — cảnh báo
- [ ] Nhấn lần 2 (trong 3 giây): xoá thực sự khỏi Supabase + UI
- [ ] Không nhấn lần 2 trong 3 giây → tự reset về bình thường (gray)
- [ ] Optimistic update: card biến mất ngay, rollback nếu API fail

**API:** `DELETE /special_dates?id=eq.{id}`
**Depends on:** US-3.1

---

### US-3.4: Gửi reminder ngày đặc biệt qua Telegram

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 2 |
| **Story Points** | 2 |
| **Module** | calendar |

**User Story:**
Là người dùng, tôi muốn gửi reminder về ngày đặc biệt sắp tới qua Telegram, để được nhắc nhở trên điện thoại.

**Acceptance Criteria:**
- [ ] Nút Bell (w-9 h-9 rounded-xl, text-blue-400) trên mỗi date card
- [ ] Nhấn → loading spinner → gọi Telegram Bot sendMessage
- [ ] Message format HTML: bold title + date + emoji + "Đừng quên nhé!"
- [ ] Thành công → icon chuyển thành Check (text-emerald-500) trong 2 giây
- [ ] Disabled khi Telegram chưa cấu hình (token/chatId rỗng)

**API:** `POST https://api.telegram.org/bot{TOKEN}/sendMessage`
**Depends on:** US-3.1, US-5.1

---

## Epic 4: Ngày sắp tới (Upcoming Dates)

### US-4.1: Xem ngày sắp tới trên Dashboard

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 3 |
| **Module** | dashboard |

**User Story:**
Là người dùng, tôi muốn thấy ngay các ngày đặc biệt sắp tới khi mở app, để không bao giờ quên sinh nhật, kỷ niệm.

**Acceptance Criteria:**
- [ ] Section "Sắp tới" hiện khi có ngày trong vòng 30 ngày tới
- [ ] Horizontal scroll cards (min-width 160px, snap-x)
- [ ] Mỗi card: emoji, countdown badge, title, date "dd tháng MM"
- [ ] Badge color: xanh (hôm nay), đỏ (<=3 ngày), cam (else)
- [ ] "Xem tất cả >" link → navigate to Calendar tab
- [ ] Tap card → navigate to Calendar tab
- [ ] Không hiện section nếu không có upcoming dates

**API:** `GET /special_dates?order=event_date.asc`
**Depends on:** US-3.1

---

## Epic 5: Cài đặt (Settings)

### US-5.1: Xem và chỉnh sửa profile

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 3 |
| **Module** | settings |

**User Story:**
Là người dùng, tôi muốn xem và chỉnh sửa thông tin cá nhân của mình, để quản lý tài khoản dễ dàng.

**Acceptance Criteria:**
- [ ] Profile card gradient hiển thị avatar initial, tên, email, số điện thoại
- [ ] Nút Edit để chỉnh sửa thông tin
- [ ] Stats row hiển thị: số ghi chú, ngày đặc biệt, số cuộc chat
- [ ] Lưu thay đổi → cập nhật Supabase Auth user metadata
- [ ] Validation: email format, phone format

**API:** `GET /auth/user`, `PUT /auth/user`
**Depends on:** US-6.1

---

### US-5.2: Quản lý thông tin người yêu

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 2 |
| **Module** | settings |

**User Story:**
Là người dùng, tôi muốn quản lý thông tin cơ bản về người yêu (tên, sinh nhật, nickname), để app hiển thị đúng tên và tính toán ngày đặc biệt.

**Acceptance Criteria:**
- [ ] Section hiển thị tên người yêu, ngày sinh, nickname, avatar
- [ ] Nút Edit mở form chỉnh sửa tất cả trường
- [ ] Form validation: tên required, ngày sinh format dd/mm/yyyy
- [ ] Lưu thành công → cập nhật toàn bộ UI references

**API:** `PUT /lover_profile`
**Depends on:** —

---

### US-5.3: Quản lý tài khoản

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 2 |
| **Story Points** | 2 |
| **Module** | settings |

**User Story:**
Là người dùng, tôi muốn quản lý các thiết lập bảo mật và đồng bộ dữ liệu của tài khoản, để đảm bảo an toàn và không mất data.

**Acceptance Criteria:**
- [ ] Section chỉnh sửa thông tin cá nhân (tên, email, phone)
- [ ] Đổi mật khẩu: nhập mật khẩu cũ + mật khẩu mới + xác nhận
- [ ] Bảo mật: bật/tắt xác thực 2 lớp (2FA)
- [ ] Backup & Sync: hiển thị trạng thái đồng bộ, nút backup thủ công

**API:** `PUT /auth/user`, `POST /auth/mfa/enroll`
**Depends on:** US-6.1

---

### US-5.4: Cài đặt thông báo

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 2 |
| **Story Points** | 2 |
| **Module** | settings |

**User Story:**
Là người dùng, tôi muốn tùy chỉnh loại thông báo nào sẽ nhận, để không bị làm phiền bởi những thông báo không cần thiết.

**Acceptance Criteria:**
- [ ] 4 toggle switches với label rõ ràng:
  - Nhắc ngày đặc biệt (ON/OFF)
  - Gợi ý hàng ngày (ON/OFF)
  - Thông báo qua Telegram (ON/OFF)
  - Thông báo qua Email (ON/OFF)
- [ ] Toggle có trạng thái ON (rose/green) và OFF (gray)
- [ ] Lưu preference vào Supabase user settings
- [ ] Thay đổi áp dụng ngay lập tức

**API:** `PUT /user_settings`
**Depends on:** US-6.1

---

### US-5.5: Đăng xuất

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 1 |
| **Module** | settings |

**User Story:**
Là người dùng, tôi muốn đăng xuất khỏi app an toàn, để bảo vệ thông tin cá nhân khi không sử dụng.

**Acceptance Criteria:**
- [ ] Nút Đăng xuất tách biệt ở cuối trang Settings (viền đỏ, text đỏ)
- [ ] Nhấn → hiện confirm dialog "Bạn có chắc muốn đăng xuất?"
- [ ] Xác nhận → clear session, xoá token khỏi storage
- [ ] Redirect về màn hình Login (US-6.1)
- [ ] Không mất dữ liệu đã lưu trên server

**API:** `POST /auth/signout`
**Depends on:** US-6.1

---

## Epic 6: Xác thực (Authentication)

### US-6.1: Đăng nhập bằng email/phone + mật khẩu

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 3 |
| **Module** | auth |

**User Story:**
Là người dùng, tôi muốn đăng nhập bằng email hoặc số điện thoại kèm mật khẩu, để truy cập vào app an toàn.

**Acceptance Criteria:**
- [ ] Gradient header với heart icon ở trên cùng
- [ ] Input field phone/email với icon prefix
- [ ] Input field password với visibility toggle (ẩn/hiện mật khẩu)
- [ ] Nút Login gradient rose full-width
- [ ] Error handling: hiển thị lỗi inline dưới input (sai mật khẩu, tài khoản không tồn tại)
- [ ] Loading state trên button khi đang xử lý
- [ ] Đăng nhập thành công → redirect Dashboard
- [ ] Remember me: lưu session token vào AsyncStorage

**API:** `POST /auth/token?grant_type=password`
**Depends on:** —

---

### US-6.2: Đăng nhập bằng Google

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 2 |
| **Module** | auth |

**User Story:**
Là người dùng, tôi muốn đăng nhập nhanh bằng tài khoản Google, để không cần nhớ mật khẩu riêng.

**Acceptance Criteria:**
- [ ] Nút "Đăng nhập với Google" với Google logo chính thức
- [ ] Tích hợp Supabase Auth Google OAuth flow
- [ ] Redirect back to app sau khi Google xác thực thành công
- [ ] Auto-create profile nếu lần đầu đăng nhập (tên, email từ Google account)
- [ ] Error handling: popup bị chặn, user huỷ OAuth, network error

**API:** `POST /auth/token?grant_type=oauth`, Supabase Auth Google Provider
**Depends on:** —

---

### US-6.3: Đăng nhập bằng OTP

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 3 |
| **Module** | auth |

**User Story:**
Là người dùng, tôi muốn đăng nhập bằng mã OTP gửi về điện thoại/email, để không cần nhớ mật khẩu.

**Acceptance Criteria:**
- [ ] Nút "Đăng nhập bằng OTP" trên màn hình login
- [ ] Nhập số điện thoại hoặc email để nhận OTP
- [ ] Nhận mã 6 chữ số qua SMS/email
- [ ] 6 ô input riêng biệt cho OTP (auto-focus next, auto-submit khi đủ 6 số)
- [ ] Countdown timer (60 giây) trước khi cho phép gửi lại
- [ ] Nút "Gửi lại mã" active sau khi countdown kết thúc
- [ ] Verify OTP thành công → đăng nhập + redirect Dashboard

**API:** `POST /auth/otp`, `POST /auth/token?grant_type=otp`
**Depends on:** —

---

### US-6.4: Đăng ký tài khoản

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 3 |
| **Module** | auth |

**User Story:**
Là người dùng mới, tôi muốn tạo tài khoản để bắt đầu sử dụng app lưu giữ thông tin người yêu.

**Acceptance Criteria:**
- [ ] Form đăng ký: số điện thoại + email + mật khẩu + xác nhận mật khẩu
- [ ] Gửi OTP xác thực sau khi submit form
- [ ] Verify OTP → tạo tài khoản trên Supabase Auth
- [ ] Option đăng ký bằng Google (cùng flow US-6.2)
- [ ] Checkbox đồng ý điều khoản sử dụng (required)
- [ ] Password validation: min 8 chars, uppercase, lowercase, number
- [ ] Đăng ký thành công → auto login → redirect Dashboard

**API:** `POST /auth/signup`
**Depends on:** —

---

### US-6.5: Quên mật khẩu

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Story Points** | 3 |
| **Module** | auth |

**User Story:**
Là người dùng, tôi muốn đặt lại mật khẩu khi quên, để lấy lại quyền truy cập vào tài khoản.

**Acceptance Criteria:**
- [ ] Flow 3 bước:
  - **Bước 1:** Nhập số điện thoại hoặc email → gửi OTP
  - **Bước 2:** Nhập OTP 6 số → verify
  - **Bước 3:** Nhập mật khẩu mới + xác nhận → đổi mật khẩu
- [ ] Countdown timer cho OTP (60 giây)
- [ ] Nút Verify disabled cho đến khi nhập đủ 6 số OTP
- [ ] Mật khẩu mới phải khác mật khẩu cũ
- [ ] Thành công → redirect về Login với message "Đổi mật khẩu thành công"

**API:** `POST /auth/recover`, `PUT /auth/user`
**Depends on:** —

---

## Epic 7: Bản đồ Hẹn hò (Date Map)

### US-7.1: Xem bản đồ với địa điểm hẹn hò

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 3 |
| **Story Points** | 5 |
| **Module** | date_map |

**User Story:**
Là người dùng, tôi muốn xem bản đồ các địa điểm hẹn hò phù hợp xung quanh, để dễ dàng tìm chỗ đưa người yêu đi chơi.

**Acceptance Criteria:**
- [ ] eKMap full-width chiếm toàn bộ màn hình
- [ ] Category filter pills ngang trên cùng (5 danh mục: Quán cafe, Nhà hàng, Công viên, Rạp phim, Khác)
- [ ] Map pins color-coded theo category (mỗi category 1 màu riêng)
- [ ] User location hiển thị chấm xanh (blue dot) với accuracy circle
- [ ] Zoom controls (+/-) góc phải
- [ ] Watermark "Powered by eKMap" góc dưới
- [ ] Request location permission khi lần đầu mở

**API:** eKMap SDK, `GET /date_spots`
**Depends on:** —

---

### US-7.2: Xem chi tiết địa điểm

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 3 |
| **Story Points** | 3 |
| **Module** | date_map |

**User Story:**
Là người dùng, tôi muốn xem thông tin chi tiết của một địa điểm hẹn hò, để đánh giá có phù hợp hay không.

**Acceptance Criteria:**
- [ ] Tap pin → hiện bottom sheet với thông tin chi tiết
- [ ] Hiển thị: tên địa điểm, rating (sao), category, khoảng cách từ user
- [ ] Địa chỉ đầy đủ
- [ ] Tags: "Em thích", "Có chỗ đỗ xe", "Bình dân" (lấy từ data)
- [ ] Action buttons: Dẫn đường, Lưu (bookmark), Share
- [ ] Bottom sheet swipe-up để xem thêm, swipe-down để đóng

**API:** `GET /date_spots/{id}`
**Depends on:** US-7.1

---

### US-7.3: Nhận gợi ý AI cho địa điểm

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 3 |
| **Story Points** | 3 |
| **Module** | date_map |

**User Story:**
Là người dùng, tôi muốn nhận gợi ý địa điểm dựa trên sở thích người yêu đã lưu, để chọn nơi em ấy sẽ thích.

**Acceptance Criteria:**
- [ ] AI suggestion badge trên map pins được gợi ý (ngôi sao nhỏ)
- [ ] Gợi ý dựa trên entries đã lưu (food preferences, favorite places, etc.)
- [ ] Hiển thị insight: "Thái Hoc thích quán có view đẹp, yên tĩnh"
- [ ] Section "Gợi ý gần đây" dạng horizontal list
- [ ] Tap gợi ý → zoom map đến địa điểm + mở bottom sheet

**API:** `POST /ai/suggest-spots`, OpenRouter API
**Depends on:** US-7.1, US-1.3

---

### US-7.4: Dẫn đường đến địa điểm

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 3 |
| **Story Points** | 5 |
| **Module** | date_map |

**User Story:**
Là người dùng, tôi muốn được dẫn đường từ vị trí hiện tại đến địa điểm hẹn hò, để không bị lạc đường.

**Acceptance Criteria:**
- [ ] Full-screen navigation mode
- [ ] Turn-by-turn instruction card ở trên cùng (rẽ trái/phải, đi thẳng)
- [ ] Trip stats hiển thị: thời gian dự kiến, khoảng cách, ETA
- [ ] Transport mode selector: Ô tô / Xe máy / Đi bộ
- [ ] Nút Start lớn để bắt đầu dẫn đường
- [ ] Nút Share route để gửi cho người yêu
- [ ] Auto-recalculate khi đi lệch đường

**API:** eKMap Routing API
**Depends on:** US-7.1

---

## Epic 8: Album Ảnh Hẹn hò

### US-8.1: Xem album ảnh theo sự kiện

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 3 |
| **Story Points** | 3 |
| **Module** | photo_album |

**User Story:**
Là người dùng, tôi muốn xem lại ảnh hẹn hò được nhóm theo sự kiện, để ôn lại kỷ niệm đẹp.

**Acceptance Criteria:**
- [ ] Stats bar trên cùng: tổng ảnh, số sự kiện, số tháng
- [ ] Filter tabs: Tất cả, Hẹn hò, Du lịch, Kỷ niệm, Khác
- [ ] Photo groups nhóm theo sự kiện/ngày với header title + date
- [ ] Mixed grid layout (2-3 cột, ảnh kích thước khác nhau)
- [ ] Overlay "+N" khi nhóm có nhiều hơn 6 ảnh
- [ ] "Xem tất cả" link cho mỗi nhóm → full gallery view
- [ ] Tap ảnh → full-screen viewer với swipe navigation

**API:** `GET /photos?order=event_date.desc`
**Depends on:** —

---

### US-8.2: Upload ảnh mới

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 3 |
| **Story Points** | 3 |
| **Module** | photo_album |

**User Story:**
Là người dùng, tôi muốn upload ảnh hẹn hò mới vào album, để lưu giữ khoảnh khắc đáng nhớ.

**Acceptance Criteria:**
- [ ] FAB camera button (góc phải dưới) luôn hiển thị
- [ ] Nhấn → chọn Camera (chụp mới) hoặc Gallery (chọn từ thư viện) via expo-image-picker
- [ ] Assign thông tin: tiêu đề sự kiện, ngày, category
- [ ] Compress ảnh trước khi upload (max 1MB)
- [ ] Upload lên Supabase Storage bucket "photos"
- [ ] Progress bar hiển thị % upload
- [ ] Ảnh mới xuất hiện trong album ngay sau upload

**API:** `POST /storage/photos`, `POST /photos` (metadata)
**Depends on:** —

---

## Epic 9: Đếm Ngày Yêu Nhau

### US-9.1: Xem đếm ngày yêu

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 3 |
| **Story Points** | 3 |
| **Module** | love_counter |

**User Story:**
Là người dùng, tôi muốn xem đã yêu nhau được bao nhiêu ngày, để trân trọng từng khoảnh khắc bên nhau.

**Acceptance Criteria:**
- [ ] Hero gradient card với couple avatars (hiển thị chữ cái đầu tên)
- [ ] Con số đếm ngày lớn nổi bật ở giữa
- [ ] Text "kể từ" + ngày bắt đầu yêu bên dưới
- [ ] Breakdown chi tiết: N năm, N tháng, N ngày, N giờ (cập nhật realtime)
- [ ] Milestones timeline: đã đạt (tick xanh) + sắp tới (100 ngày, 365 ngày, 1000 ngày...)
- [ ] Nút Share: tạo card ảnh đẹp để share lên social media
- [ ] Nút Set Wallpaper: đặt card làm hình nền

**API:** `GET /couple_profile`
**Depends on:** US-5.2

---

## Epic 10: Insight 360°

### US-10.1: Xem neuron map trực quan

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 4 |
| **Story Points** | 5 |
| **Module** | insight |

**User Story:**
Là người dùng, tôi muốn xem bản đồ trực quan về tất cả thông tin đã lưu về người yêu, để hiểu toàn diện sở thích và đặc điểm của em ấy.

**Acceptance Criteria:**
- [ ] Summary bar: tổng entries, categories, sentiment trung bình
- [ ] SVG neuron map với node trung tâm "Thái Hoc"
- [ ] Category nodes xung quanh, kích thước tỷ lệ với số entries
- [ ] Connection lines nối center → category nodes
- [ ] Tap node → hiện sub-labels (chi tiết entries trong category)
- [ ] Sentiment bars cho mỗi category với phần trăm (love/like/neutral/dislike/hate)
- [ ] Zoom + pan gesture trên neuron map
- [ ] Color scheme theo category

**API:** `GET /entries/stats`, `GET /entries?select=category,sentiment`
**Depends on:** US-1.3

---

### US-10.2: Đọc AI tổng quan

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 4 |
| **Story Points** | 3 |
| **Module** | insight |

**User Story:**
Là người dùng, tôi muốn đọc bản phân tích AI tổng hợp về người yêu, để có cái nhìn sâu sắc hơn.

**Acceptance Criteria:**
- [ ] AI-generated analysis text dạng paragraph dễ đọc
- [ ] Highlight food preferences: món thích, món ghét, dị ứng
- [ ] Highlight favorite places: quán hay đến, kiểu quán thích
- [ ] Dating suggestions: gợi ý hoạt động phù hợp với sở thích
- [ ] Nút "Tạo lại phân tích" để refresh AI analysis
- [ ] Loading skeleton khi đang generate
- [ ] Cache kết quả, chỉ tạo mới khi có entries mới

**API:** OpenRouter API, `GET /entries`
**Depends on:** US-1.3

---

## Epic 11: Voice Input & Note

### US-11.1: Ghi chú bằng giọng nói

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 2 |
| **Story Points** | 5 |
| **Module** | voice_input |

**User Story:**
Là người dùng, tôi muốn ghi chú về người yêu bằng giọng nói tiếng Việt, để thêm thông tin nhanh khi không tiện gõ phím.

**Acceptance Criteria:**
- [ ] Floating mic button hiển thị trên các màn hình chính
- [ ] Press-and-hold để bắt đầu ghi âm
- [ ] Pulsing mic animation khi đang ghi
- [ ] Waveform bars hiển thị realtime theo âm thanh
- [ ] Timer đếm thời gian ghi âm
- [ ] 2 action buttons: "Dừng & Gửi" (xanh) / "Hủy" (xám)
- [ ] AI speech-to-text chuyển giọng nói tiếng Việt → text
- [ ] Auto-parse text thành entries (giống AI Chat flow)
- [ ] Hiển thị kết quả parsed để user review trước khi lưu

**API:** Speech-to-Text API, OpenRouter API
**Depends on:** —

---

### US-11.2: Xem lịch sử voice notes

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 2 |
| **Story Points** | 2 |
| **Module** | voice_input |

**User Story:**
Là người dùng, tôi muốn xem lại các ghi chú giọng nói đã ghi, để review và lưu những gì chưa lưu.

**Acceptance Criteria:**
- [ ] Danh sách recent voice notes sắp xếp theo thời gian
- [ ] Mỗi item: nút Play, mini waveform, duration
- [ ] Status badges: "Đã lưu" (xanh), "Chờ lưu" (cam)
- [ ] Transcription preview text (2 dòng, truncated)
- [ ] Expand → xem full transcription + parsed entries
- [ ] Nút "Lưu" cho các notes chưa lưu

**API:** `GET /voice_notes?order=created_at.desc`
**Depends on:** US-11.1

---

## Epic 12: Daily Reminder

### US-12.1: Xem nhắc nhở hôm nay

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 4 |
| **Story Points** | 3 |
| **Module** | daily_reminder |

**User Story:**
Là người dùng, tôi muốn xem tất cả nhắc nhở cho hôm nay ở một nơi, để không bỏ lỡ việc quan trọng.

**Acceptance Criteria:**
- [ ] Header hôm nay: ngày tháng + lời chào theo thời gian (Chào buổi sáng/chiều/tối)
- [ ] Danh sách reminders chia 3 nhóm: Khẩn cấp, Sắp tới, Hàng tuần
- [ ] Color-coded borders: đỏ (khẩn cấp), cam (sắp tới), xanh (hàng tuần)
- [ ] Mỗi reminder có action buttons:
  - "Gửi Telegram": gửi nhắc nhở qua bot
  - "Đã xong": đánh dấu hoàn thành (strikethrough)
  - "Nhắc lại sau": snooze 1 giờ/3 giờ/ngày mai
- [ ] Badge count trên tab icon

**API:** `GET /reminders?date=today`, `PUT /reminders/{id}`
**Depends on:** —

---

### US-12.2: Nhận gợi ý AI hàng ngày

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 4 |
| **Story Points** | 3 |
| **Module** | daily_reminder |

**User Story:**
Là người dùng, tôi muốn nhận gợi ý AI mỗi ngày về cách quan tâm người yêu, để luôn có ý tưởng mới mẻ.

**Acceptance Criteria:**
- [ ] AI-generated 3-5 gợi ý mỗi ngày dựa trên entries đã lưu
- [ ] Mỗi gợi ý có emoji + text mô tả cụ thể
- [ ] Gợi ý contextual: theo mùa, ngày đặc biệt sắp tới, sở thích gần đây
- [ ] Nút "Gửi gợi ý qua Telegram" → forward cho bản thân qua bot
- [ ] Cache gợi ý theo ngày, không gọi AI lại nếu đã có

**API:** OpenRouter API, `POST /telegram/sendMessage`
**Depends on:** US-1.3

---

### US-12.3: Cài đặt nhắc nhở

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 4 |
| **Story Points** | 2 |
| **Module** | daily_reminder |

**User Story:**
Là người dùng, tôi muốn tùy chỉnh thời gian và kênh nhận nhắc nhở, để phù hợp với lịch sinh hoạt.

**Acceptance Criteria:**
- [ ] Time picker chọn giờ nhắc nhở (default 08:00)
- [ ] Channel selector: Push Notification + Telegram (multi-select)
- [ ] Toggle AI auto suggestions (bật/tắt gợi ý tự động)
- [ ] Quiet hours: không gửi thông báo từ 22:00 - 07:00
- [ ] Lưu settings → áp dụng cho notification scheduler

**API:** `PUT /user_settings/reminders`
**Depends on:** —

---

## Epic 13: Lịch sử Chat (Chat History)

### US-13.1: Xem lịch sử chat AI

| Thuộc tính | Giá trị |
|------------|---------|
| **Priority** | P1 |
| **Sprint** | Sprint 4 |
| **Story Points** | 3 |
| **Module** | chat_history |

**User Story:**
Là người dùng, tôi muốn xem lại lịch sử các cuộc trò chuyện với AI, để tìm lại thông tin đã trao đổi trước đó.

**Acceptance Criteria:**
- [ ] Summary card trên cùng: tổng cuộc chat, tổng ghi chú tạo từ chat, tổng voice notes
- [ ] Search input để tìm kiếm trong lịch sử
- [ ] Filter pills: Tất cả, Có ghi chú, Giọng nói, Gợi ý AI
- [ ] Danh sách grouped theo ngày (Hôm nay, Hôm qua, Tuần này, Tháng này)
- [ ] Mỗi item: preview text, entry count badge, timestamp
- [ ] Icon differentiation: chat bubble (text chat), AI sparkle (AI suggestion), mic (voice)
- [ ] Tap → mở lại conversation đầy đủ

**API:** `GET /chat_sessions?order=created_at.desc`
**Depends on:** US-2.1

---

## Bảng tổng hợp

### Tổng quan theo Epic

| Epic | Tên | Số Stories | Tổng Points |
|------|-----|-----------|-------------|
| E1 | Quản lý Ghi chú (Entry Management) | 4 | 14 |
| E2 | AI Chat | 3 | 14 |
| E3 | Lịch & Ngày đặc biệt (Calendar) | 4 | 12 |
| E4 | Ngày sắp tới (Upcoming Dates) | 1 | 3 |
| E5 | Cài đặt (Settings) | 5 | 10 |
| E6 | Xác thực (Authentication) | 5 | 14 |
| E7 | Bản đồ Hẹn hò (Date Map) | 4 | 16 |
| E8 | Album Ảnh Hẹn hò | 2 | 6 |
| E9 | Đếm Ngày Yêu Nhau | 1 | 3 |
| E10 | Insight 360° | 2 | 8 |
| E11 | Voice Input & Note | 2 | 7 |
| E12 | Daily Reminder | 3 | 8 |
| E13 | Lịch sử Chat (Chat History) | 1 | 3 |
| **Tổng** | | **37** | **118** |

### Sprint Planning

| Sprint | Stories | Points | Focus |
|--------|---------|--------|-------|
| Sprint 1 (5 ngày) | US-6.1~6.5, US-1.1~1.4, US-3.1~3.3, US-4.1, US-5.1~5.2, US-5.5 | 44 | Auth + Core CRUD + Dashboard |
| Sprint 2 (5 ngày) | US-2.1~2.3, US-3.4, US-5.3~5.4, US-11.1~11.2 | 25 | AI Chat + Voice + Settings |
| Sprint 3 (5 ngày) | US-7.1~7.4, US-8.1~8.2, US-9.1 | 25 | Maps + Album + Love Counter |
| Sprint 4 (5 ngày) | US-10.1~10.2, US-12.1~12.3, US-13.1 | 24 | Insight + Reminder + History |

### Priority Distribution

| Priority | Số Stories | Tổng Points |
|----------|-----------|-------------|
| P0 (Must Have) | 19 | 62 |
| P1 (Should Have) | 18 | 56 |

### Sprint Velocity Target

| Metric | Giá trị |
|--------|---------|
| Trung bình points/sprint | ~30 |
| Tổng thời gian | 4 tuần (20 ngày làm việc) |
| Buffer | 10% cho bug fixes & tech debt |
