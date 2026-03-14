# Google Stitch Prompt — MyLoveThaiHoc Mobile App

> Copy toàn bộ nội dung bên dưới vào Google Stitch để generate UI.

---

## PROMPT

```
Build a beautiful mobile app called "MyLoveThaiHoc" — a personal love notes app to remember everything about your girlfriend (Thái Hoc). The app has 5 tabs and uses Vietnamese language throughout. All API calls should be bypassed with realistic mock/dummy data. No real backend needed.

---

## APP OVERVIEW

A romantic personal app that helps you record, categorize, and remember everything about your loved one — from food preferences, allergies, hobbies, to special dates like birthdays and anniversaries. Features AI chat for natural language input and Telegram reminders.

---

## DESIGN SYSTEM

### Colors
- Primary: #f43f5e (Rose-500)
- Primary gradient: linear-gradient(135deg, #f43f5e, #ec4899, #c026d3) — used for hero card, submit buttons
- AI purple gradient: linear-gradient(135deg, #8b5cf6, #7c3aed) — used for AI chat elements
- Success gradient: linear-gradient(135deg, #34d399, #10b981) — used for save success
- Background: #fdf2f8 (very light pink)
- Surface/Cards: #ffffff with border rgba(244,63,94,0.08)
- Text primary: #1e1b2e
- Text secondary: #6b7280
- Text muted: #9ca3af
- Danger: #ef4444

### Typography
- Title: 20px, weight 800
- Heading: 16px, weight 700
- Body: 14px, weight 400
- Label: 14px, weight 700
- Caption: 12px, weight 600
- Tiny: 11px, weight 600
- Font: System font (San Francisco on iOS, Roboto on Android)

### Spacing & Radius
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- Card radius: 20px
- Button radius: 14px
- Input radius: 14px
- Badge radius: 9999px (pill)

### Shadows
- Card shadow: 0 2px 12px rgba(244,63,94,0.06)
- Elevated: 0 4px 20px rgba(244,63,94,0.12)

---

## NAVIGATION

Bottom Tab Navigator with 5 tabs:
1. "Trang chủ" (Home icon ♥) — Dashboard
2. "Thêm" (Plus icon ⊕) — Add Entry
3. "AI Chat" (Chat icon 💬) — AI Chat
4. "Lịch" (Calendar icon 📅) — Special Dates Calendar
5. "Cài đặt" (Settings icon ⚙) — Settings

- Active tab: Rose-500 color, bg-rose-50, icon scale 1.1, bold label
- Inactive tab: Gray-400, normal weight
- Tab bar: White background with subtle top border, glass effect

---

## SCREEN 1: DASHBOARD (Trang chủ)

### Header
- Sticky header with glass effect (backdrop blur)
- Left: Heart icon + "MyLoveThaiHoc" title
- Subtitle: "Ghi nhớ mọi điều về em"

### Hero Card
- Full-width card with primary gradient background (rose → pink → purple)
- Decorative floating circles (semi-transparent white, slow floating animation)
- Large number showing total entries count: "12"
- Text: "Bạn đã lưu giữ 12 kỉ niệm tuyệt vời"
- 2 CTA buttons at bottom:
  - "⊕ Thêm mới" (white bg, rose text)
  - "✨ Chat AI" (white bg, purple text)

### Section: "Sắp tới" (Upcoming dates)
- Section header: "⏰ Sắp tới" with "Xem tất cả >" link on right
- Horizontal scrollable cards (snap to each card, 160px min width):
  - Card 1: 🎂 emoji, red badge "5 ngày", title "Sinh nhật em", date "12 tháng 05"
  - Card 2: 💕 emoji, orange badge "12 ngày", title "Kỷ niệm 1 năm", date "20 tháng 05"
  - Card 3: 🎉 emoji, pink badge "28 ngày", title "Du lịch Đà Lạt", date "05 tháng 06"
- Each card: white bg, rounded-20, subtle shadow, pastel colored top accent

### Section: "Lưu ý quan trọng" (Important warnings)
- Only show when there are allergy/hate entries (show it in mock)
- Light red gradient background, red border
- AlertTriangle icon
- Pill badges: "⚠ Dị ứng tôm", "⚠ Ghét ăn hành", "⚠ Dị ứng phấn hoa"

### Section: "Phân loại" (Category stats)
- Grid 3 columns, 2 rows (show top 6 categories)
- Each cell: icon + category name (uppercase, tiny) + count number
- Mock data:
  - 🍜 MÓN ĂN: 24 | 📍 ĐỊA ĐIỂM: 8 | 🎨 SỞ THÍCH: 15
  - 📅 NGÀY Đ.B.: 3 | 🎁 QUÀ TẶNG: 5 | 💫 TÍNH CÁCH: 7
- Each cell: white card bg, subtle border, press effect

### Section: "Ghi chép gần đây" (Recent entries)
- Section header with "Xem tất cả >" link
- List of entry cards (show 5 mock entries):
  1. 🍜 "Phở bò là món em yêu nhất" — sentiment: 🥰 — "Món ăn · 2 giờ trước" — trash icon
  2. 📍 "Góc chill của hai đứa" — detail: "Quán cafe nhỏ quận 1..." — 💛 — "Địa điểm · Hôm qua" — trash icon
  3. 🎨 "Em mê vẽ tranh sơn dầu" — 🥰 — "Sở thích · 2 ngày trước"
  4. ⚠️ "Dị ứng tôm" — detail: "Ăn tôm bị nổi mề đay" — 🚫 — "Dị ứng · 3 ngày trước"
  5. 🎵 "Thích nghe Vũ Cát Tường" — 👍 — "Âm nhạc · 1 tuần trước"
- Each card: white bg, rounded-16, left accent color matching category, sentiment emoji on right

---

## SCREEN 2: ADD ENTRY (Thêm)

### Header
- Title: "Ghi chú mới" (extrabold, 20px)
- Subtitle: "Thêm một điều về Thái Hoc" (rose color)

### Category Selector
- Label: "❖ Chọn danh mục"
- Grid 3 columns, 4 rows (11 items):
  - 🍜 Món ăn | 📍 Địa điểm | 🎨 Sở thích
  - 📅 Ngày đặc biệt | 🎁 Quà tặng | 💫 Tính cách
  - ⚠️ Dị ứng | 👗 Phong cách | 🎵 Âm nhạc
  - 🎬 Phim | 💝 Khác
- Each cell: icon (24px), label below (tiny), white bg, rounded-14
- Selected state: rose border, rose-50 bg, slight scale up, shadow
- Default selected: "Món ăn"

### Title Input
- Label: "Tiêu đề ghi chú *" (required asterisk in rose)
- Input: emoji prefix based on selected category + placeholder "Thái Hoc thích..."
- White bg, rounded-14, border gray-200, focus border rose

### Detail Textarea
- Label: "Chi tiết"
- Textarea: placeholder "Viết thêm chi tiết ở đây...", 3 rows min
- Same styling as title input

### Sentiment Picker
- Label: "Cảm xúc của Thái Hoc về điều này"
- 5 circular buttons in a row, evenly spaced:
  - ❤️ YÊU THÍCH (love) | 👍 THÍCH (like) | 😐 BÌNH THƯỜNG (neutral) | 👎 KHÔNG THÍCH (dislike) | 🚫 GHÉT (hate)
- Each: 52px circle, gray-100 bg, emoji inside
- Selected: rose border, scale 1.1, shadow, rose-50 bg
- Labels below each in tiny text
- Default selected: "THÍCH"

### Advanced Options
- Collapsible section: "⌄ Tùy chọn nâng cao" with dashed line
- When expanded:
  - Date picker: "Ngày sự kiện" (optional)
  - Toggle: "Lặp lại hàng năm"

### Submit Button
- Full width, primary gradient, white text "Lưu ghi chú", rounded-14
- Height 52px, bold text
- Press: scale 0.95

---

## SCREEN 3: AI CHAT

### Chat Header
- Left: Purple gradient robot icon 🤖 + "AI Chat" title
- Subtitle: "Kể tự nhiên, AI sẽ phân tích"
- Right: "✨ Gợi ý" button (purple outline, pill shape)
- Divider line below

### Chat Area (scrollable, takes remaining space)
- Show mock conversation:

**Message 1 — Assistant (left-aligned)**:
- Role label: "🤖 Assistant" above bubble
- White bubble, rounded-16 (top-left: rounded-4):
  "Xin chào! 👋 Hôm nay bạn muốn chia sẻ gì về Thái Hoc? Hãy kể tự nhiên, mình sẽ giúp bạn ghi nhớ mọi điều nhé! 💕"

**Message 2 — User (right-aligned)**:
- Role label: "Bạn 👤" above bubble (right-aligned)
- Rose gradient bubble, white text, rounded-16 (top-right: rounded-4):
  "Hôm nay em nói em thích ăn bún bò, ghét ăn mắm tôm, và sinh nhật em là ngày 15 tháng 8"

**Message 3 — Assistant (left-aligned)**:
- White bubble with parsed entries summary:
  "Mình đã phân tích được 3 thông tin:

  🍜 **Thích ăn bún bò** — Món ăn · 🥰 Yêu thích
  🍜 **Ghét ăn mắm tôm** — Món ăn · 🚫 Ghét
  📅 **Sinh nhật 15/08** — Ngày đặc biệt · ❤️

  Bạn muốn lưu lại không?"

**Save Button (centered, below message 3)**:
- Green gradient pill button: "✓ Lưu tất cả (3)"
- Scale-in appearance animation

**Message 4 — Assistant**:
- "Đã lưu 3 ghi chú thành công! ✨ Bạn muốn chia sẻ thêm gì không?"

### Input Area (bottom, above tab bar)
- Divider line
- Text input: "Nhắn tin cho AI..." placeholder, rounded-24, gray-100 bg
- Send button: rose gradient circle with arrow icon, 40px
- Send disabled (gray) when input empty

---

## SCREEN 4: CALENDAR (Lịch — Ngày đặc biệt)

### Header
- Title: "Ngày đặc biệt" (extrabold)
- Subtitle: "3 sự kiện sắp tới" (gray)
- Right: "+" button (rose gradient circle, white plus icon)

### Add Form (Bottom Sheet style — show it expanded in mock)
- Sheet handle bar (gray, centered, 40px wide, rounded)
- Title: "Thêm sự kiện mới" + "×" close button
- Fields:
  - "TÊN SỰ KIỆN" (uppercase rose label) — text input
  - 2-column row:
    - "DANH MỤC" — select dropdown with options: Sinh nhật, Kỷ niệm, Ngày lễ, Khác
    - "NGÀY DIỄN RA" — date picker (dd/mm/yyyy)
  - "GHI CHÚ (TÙY CHỌN)" — textarea
  - Toggle row: "Lặp lại hàng năm" with iOS-style toggle switch (rose when on)
  - "Nhắc trước" — number input with suffix "ngày", default "7"
- Submit: full-width rose gradient button "Lưu sự kiện"

### Date Cards List (below form)
Show 4 mock special date cards:

**Card 1 (URGENT — 2 days):**
- Rose border, elevated shadow
- Left: SVG countdown ring (56px diameter, red stroke) with "2" in center, "NGÀY" below
- Content: "Kỷ niệm · 14/02/2026" caption, "1000 Ngày Bên Nhau" title (bold)
- Right: Bell icon 🔔 + Trash icon 🗑
- Badge: "Hàng năm" pill (rose-100 bg, rose text)

**Card 2 (SOON — 5 days):**
- Countdown ring: red stroke, "5" center
- "Sinh nhật · 27/03/2026"
- "Sinh nhật em bé" title
- Recurring badge

**Card 3 (NORMAL — 15 days):**
- Countdown ring: orange stroke, "15" center
- "Kỷ niệm · 10/04/2026"
- "Valentine 2026"

**Card 4 (FAR — 45 days):**
- Countdown ring: pink stroke, "45" center
- "Ngày lễ · 01/05/2026"
- "Du lịch Đà Lạt"

### Empty State (show as alternative)
- Centered layout: Calendar icon (64px, gray-300)
- "Chưa có ngày đặc biệt nào"
- "Thêm ngày sinh nhật, kỷ niệm để không bao giờ quên" (gray text)
- CTA button: "Thêm ngày đặc biệt đầu tiên"

---

## SCREEN 5: SETTINGS (Cài đặt)

### Header
- Title: "Cài đặt" (extrabold)
- Subtitle: "Quản lý kết nối & cấu hình"

### Section: "TRẠNG THÁI KẾT NỐI" (uppercase rose label)
- White card with 3 rows, dividers between:
  1. 🛢 icon (blue) | "Supabase" title, "Lưu trữ dữ liệu kỉ niệm" subtitle | Green dot (with ping pulse animation)
  2. 🤖 icon (purple) | "OpenRouter" title, "Trí tuệ nhân tạo (AI)" subtitle | Green dot
  3. 📱 icon (blue) | "Telegram Bot" title, "Thông báo & tương tác" subtitle | Green dot

### Test Buttons (2-column grid)
- Card 1: 💬 icon, "Gửi test Telegram" label, card style, press effect
- Card 2: ⚡ icon, "Test AI + Telegram" label, card style, press effect
- Each: white bg, rounded-16, centered content, subtle border

### Section: "HƯỚNG DẪN THIẾT LẬP" (uppercase rose label)
- White card with 3 rows, numbered:
  1. "[1]" rose circle | "Kết nối Database" title | "Nhập URL và Anon Key từ Supabase Dashboard" subtitle | External link icon ↗
  2. "[2]" rose circle | "Cấu hình API OpenRouter" title | "Dùng để kích hoạt AI phân tích thông tin" subtitle | ↗
  3. "[3]" rose circle | "Tạo Telegram Bot" title | "Sử dụng BotFather để tạo bot mới" subtitle | ↗

### Footer Card
- Full-width card with primary gradient
- Heart icon (white, 24px)
- "MyLoveThaiHoc" (white, bold)
- "Phiên bản 1.0 · 12 entries" (white, opacity 0.9)
- "MADE WITH LOVE FOR THÁI HOC" (uppercase, white, tiny, letter-spacing wide)

---

## ANIMATIONS (apply where possible)

- Page enter: fade in + slide up (450ms)
- Card list items: stagger animation (50ms delay per item)
- Button press: scale to 0.95 then back
- Form expand/collapse: slide down/up with opacity
- Toast notification: slide down from top
- Floating decorative circles on hero: slow vertical float (3s infinite)
- Skeleton loading: shimmer effect (gradient moving left to right)
- Tab switch: crossfade (200ms)
- Countdown ring: stroke animation on appear (800ms)

---

## MOCK DATA SUMMARY

### Entries (12 total):
1. 🍜 food | "Phở bò là món em yêu nhất" | love | 2 hours ago
2. 📍 place | "Góc chill của hai đứa" | "Quán cafe nhỏ quận 1" | like | yesterday
3. 🎨 hobby | "Em mê vẽ tranh sơn dầu" | love | 2 days ago
4. ⚠️ allergy | "Dị ứng tôm" | "Ăn tôm bị nổi mề đay" | hate | 3 days ago
5. 🎵 music | "Thích nghe Vũ Cát Tường" | like | 1 week ago
6. 🎬 movie | "Mê phim Ghibli" | love | 1 week ago
7. 🎁 gift | "Thích hoa hồng trắng" | love | 2 weeks ago
8. 💫 trait | "Hay cười khi bối rối" | love | 2 weeks ago
9. 👗 style | "Thích mặc đồ pastel" | like | 3 weeks ago
10. 🍜 food | "Ghét ăn mắm tôm" | hate | 3 weeks ago
11. ⚠️ allergy | "Dị ứng phấn hoa" | hate | 1 month ago
12. 📍 place | "Thích đi Đà Lạt" | love | 1 month ago

### Special Dates (4):
1. "1000 Ngày Bên Nhau" | anniversary | 2026-03-16 | recurring | 2 days
2. "Sinh nhật em bé" | birthday | 2026-03-19 | recurring | 5 days
3. "Valentine 2026" | anniversary | 2026-03-29 | not recurring | 15 days
4. "Du lịch Đà Lạt" | holiday | 2026-04-28 | not recurring | 45 days

### Category Counts:
food: 24, place: 8, hobby: 15, date: 3, gift: 5, trait: 7, allergy: 4, style: 3, music: 6, movie: 5, other: 2

---

## IMPORTANT NOTES

1. ALL text in Vietnamese — do not translate to English
2. Bypass all API calls — use the mock data above directly
3. Mobile-first design (375-430px width viewport)
4. The app feels warm, romantic, and personal — pink/rose theme throughout
5. Use smooth animations and transitions for a premium feel
6. Touch targets minimum 44x44px
7. Cards should have subtle shadows and rounded corners (20px)
8. The overall feel should be like a premium personal journal app
```

---

## Ghi chú sử dụng

### Cách dùng với Google Stitch:
1. Truy cập [stitch.withgoogle.com](https://stitch.withgoogle.com)
2. Copy toàn bộ nội dung trong block ` ``` ` ở trên
3. Paste vào prompt input của Stitch
4. Nhấn Generate

### Nếu Stitch giới hạn độ dài prompt:
Có thể tách thành từng screen, mỗi lần generate 1 screen. Thứ tự ưu tiên:
1. **Screen 1 + Navigation** — Dashboard (quan trọng nhất, thể hiện toàn bộ design system)
2. **Screen 2** — Add Entry (form interactions)
3. **Screen 3** — AI Chat (chat UI pattern)
4. **Screen 4** — Calendar (countdown ring, bottom sheet)
5. **Screen 5** — Settings (connection status, footer)

### Sau khi generate:
- Review output và so sánh với wireframes trong [PROTOTYPE.md](PROTOTYPE.md)
- Kiểm tra color palette có đúng design system không
- Đảm bảo Vietnamese text hiển thị chính xác
- Export code và adapt vào project React Native + NativeWind
