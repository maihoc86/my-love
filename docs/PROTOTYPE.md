# Brief Prototype — Screen Flow & Wireframe Description
## MyLoveThaiHoc Mobile App

---

## 1. Navigation Architecture

```
┌─────────────────────────────────────────┐
│              Tab Navigator              │
│  ┌───────┬───────┬───────┬─────┬──────┐│
│  │Trang  │ Thêm  │  AI   │Lịch │Cài   ││
│  │ chủ   │       │ Chat  │     │ đặt  ││
│  │  ♥    │  ⊕    │  💬   │ 📅  │  ⚙   ││
│  └───┬───┴───┬───┴───┬───┴──┬──┴───┬──┘│
│      │       │       │      │      │    │
│      ▼       ▼       ▼      ▼      ▼    │
│  Dashboard  Add   AIChat Calendar Settings│
│             Entry                         │
└─────────────────────────────────────────┘
```

**Navigation Type**: Bottom Tab Navigator (5 tabs)
**Active State**: Rose-500, bg-rose-50, icon scale 1.1, bold label
**Inactive State**: Gray-400, normal weight

---

## 2. Screen Wireframes

### Screen 1: Dashboard (Trang chủ)

```
┌──────────────────────────────────┐
│ [♥] MyLoveThaiHoc               │ ← Sticky header, glass effect
│     Ghi nhớ mọi điều về em      │
├──────────────────────────────────┤
│                                  │
│ ╔══════════════════════════════╗ │
│ ║  ♥ Thái Hoc của bạn         ║ │ ← Hero card
│ ║                              ║ │    Gradient: rose→pink→purple
│ ║  Bạn đã lưu giữ  12         ║ │    Decorative circles
│ ║  kỉ niệm tuyệt vời         ║ │
│ ║                              ║ │
│ ║  [⊕ Thêm mới] [✨ Chat AI]  ║ │ ← CTA buttons
│ ╚══════════════════════════════╝ │
│                                  │
│ ⏰ Sắp tới          Xem tất cả >│ ← Section header
│                                  │
│ ┌────────┐ ┌────────┐ ┌─────   │ ← Horizontal scroll
│ │ 🎂     │ │ 💕     │ │ 🎉    │
│ │ (5 ng) │ │(12 ng) │ │(28    │
│ │Sinh    │ │Kỷ niệm│ │Du     │
│ │nhật em │ │ 1 năm  │ │lịch   │
│ │12 th 05│ │20 th 05│ │       │
│ └────────┘ └────────┘ └─────   │
│                                  │
│ ⚠ Lưu ý quan trọng             │ ← Warning section (conditional)
│ ┌──────────────────────────────┐ │    Red gradient bg
│ │ [⚠ Dị ứng tôm] [⚠ Ghét...]  │ │    Pill badges
│ └──────────────────────────────┘ │
│                                  │
│ Phân loại                        │ ← Category stats
│ ┌─────────┬─────────┬─────────┐ │    Grid 3 columns
│ │  🍜     │  📍     │  🎨     │ │    Icon + label + count
│ │ MÓN ĂN  │ĐỊA ĐIỂM│SỞ THÍCH │ │
│ │   24    │    8    │   15    │ │
│ ├─────────┼─────────┼─────────┤ │
│ │  📅     │  🎁     │  💫     │ │
│ │NGÀY Đ.B.│QUÀ TẶNG│TÍNH CÁCH│ │
│ │    3    │    5    │    7    │ │
│ └─────────┴─────────┴─────────┘ │
│                                  │
│ Ghi chép gần đây    Xem tất cả >│
│ ┌──────────────────────────────┐ │ ← Entry cards
│ │ [🍜] Món em thích nhất   🥰 │ │    Stagger animation
│ │      Hôm nay phát hiện...   │ │
│ │      Món ăn · 2 giờ trước  🗑│ │
│ ├──────────────────────────────┤ │
│ │ [📍] Góc chill của hai đứa ✨│ │
│ │      Quán cafe nhỏ quận 1...│ │
│ │      Địa điểm · Hôm qua   🗑│ │
│ └──────────────────────────────┘ │
│                                  │
├──────────────────────────────────┤
│ [♥]   [⊕]   [💬]   [📅]   [⚙] │ ← Bottom tab bar
│ Trang  Thêm  AI     Lịch   Cài  │    Glass effect
│  chủ        Chat          đặt   │
└──────────────────────────────────┘
```

**Interactions**:
- Pull-to-refresh → reload entries + special dates
- Tap entry card → (future: navigate to detail)
- Tap upcoming card → navigate to Calendar
- Swipe horizontal on upcoming dates
- Tap delete → confirm → remove

---

### Screen 2: Add Entry (Thêm)

```
┌──────────────────────────────────┐
│ [♥] MyLoveThaiHoc               │
├──────────────────────────────────┤
│ ←                                │ ← Back button
│                                  │
│ Ghi chú mới                     │ ← Page title (extrabold)
│ Thêm một điều về Thái Hoc       │ ← Subtitle (rose)
│                                  │
│ ❖ Chọn danh mục                 │
│ ┌─────────┬─────────┬─────────┐ │ ← Category grid 3x4
│ │  🍜     │  📍     │  🎨     │ │    Large icons (3xl)
│ │ Món ăn  │Địa điểm │Sở thích │ │    Selected: rose border
│ │ [===]   │         │         │ │      + shadow + bg color
│ ├─────────┼─────────┼─────────┤ │
│ │  📅     │  🎁     │  💫     │ │
│ │Ngày đ.b.│Quà tặng │Tính cách│ │
│ ├─────────┼─────────┼─────────┤ │
│ │  ⚠️     │  👗     │  🎵     │ │
│ │ Dị ứng  │P.cách   │Âm nhạc  │ │
│ ├─────────┼─────────┤         │ │
│ │  🎬     │  💝     │         │ │
│ │ Phim    │ Khác    │         │ │
│ └─────────┴─────────┘         │ │
│                                  │
│ Tiêu đề ghi chú *               │
│ ┌──────────────────────────────┐ │ ← Input with emoji prefix
│ │ 🍜 │ Thái Hoc thích...       │ │
│ └──────────────────────────────┘ │
│                                  │
│ Chi tiết                         │
│ ┌──────────────────────────────┐ │ ← Textarea
│ │ Viết thêm chi tiết ở đây... │ │
│ │                              │ │
│ └──────────────────────────────┘ │
│                                  │
│ Cảm xúc của Thái Hoc về điều này│
│  (❤️)  (👍)  (😐)  (👎)  (🚫)  │ ← Circular sentiment buttons
│  YÊU   THÍCH B.TH  KHÔNG  GHÉT  │    Selected: scale 1.1
│  THÍCH       ƯỜNG  THÍCH        │      + rose border + shadow
│                                  │
│ ⌄ Tùy chọn nâng cao ────────── │ ← Expandable section
│                                  │
│ ╔══════════════════════════════╗ │ ← Submit button
│ ║         Lưu ghi chú         ║ │    Gradient primary
│ ╚══════════════════════════════╝ │    Full width
│                                  │
├──────────────────────────────────┤
│ [♥]   [⊕]   [💬]   [📅]   [⚙] │
└──────────────────────────────────┘
```

**Interactions**:
- Scroll form khi keyboard mở (KeyboardAvoidingView)
- Tap category → select (scale animation)
- Tap sentiment → select (scale animation)
- Tap "Tùy chọn nâng cao" → slide-down reveal
- Submit → loading spinner → success toast (slide-down)
- Auto-reset form after success

---

### Screen 3: AI Chat

```
┌──────────────────────────────────┐
│ [♥] MyLoveThaiHoc               │
├──────────────────────────────────┤
│ [🤖] AI Chat            [✨Gợi ý]│ ← Chat header
│      Kể tự nhiên, AI sẽ p.tích │    Purple gradient icon
│ ─────────────────────────────── │ ← Divider
│                                  │
│ 🤖 Assistant                    │ ← Role label + avatar
│ ┌──────────────────────────┐    │ ← Assistant bubble (white)
│ │ Xin chào! Hôm nay bạn   │    │    rounded-tl-md
│ │ cảm thấy thế nào?       │    │
│ │ Hãy chia sẻ câu chuyện  │    │
│ │ của bạn, mình luôn       │    │
│ │ lắng nghe.               │    │
│ └──────────────────────────┘    │
│                                  │
│              Bạn 👤             │ ← User role + avatar
│    ┌──────────────────────────┐ │ ← User bubble (gradient rose)
│    │ Hôm nay mình đã cùng   │ │    rounded-tr-md
│    │ người yêu đi dạo phố    │ │
│    │ cổ và học được cách làm  │ │
│    │ tò he truyền thống.     │ │
│    └──────────────────────────┘ │
│                                  │
│      ╔════════════════════╗     │ ← Save button (conditional)
│      ║ ✓ Lưu tất cả (3)  ║     │    Green gradient, pill shape
│      ╚════════════════════╝     │    Scale-in animation
│                                  │
│ 🤖 Assistant                    │
│ ┌──────────┐                    │ ← Typing indicator
│ │  ● ● ●   │                    │    3 bouncing purple dots
│ └──────────┘                    │
│                                  │
│ ─────────────────────────────── │ ← Divider
│ ┌──────────────────────────┐[▶]│ ← Input + Send button
│ │ Nhắn tin cho AI...       │   │    Send: rose gradient circle
│ └──────────────────────────┘   │
├──────────────────────────────────┤
│ [♥]   [⊕]   [💬]   [📅]   [⚙] │
└──────────────────────────────────┘
```

**Interactions**:
- Type message → send button becomes active
- Enter/Send → message appears → AI responds
- Auto-scroll to latest message
- "Gợi ý" button → sends context to AI for suggestions
- "Lưu tất cả" → batch save to Supabase

---

### Screen 4: Calendar (Lịch)

```
┌──────────────────────────────────┐
│ [♥] MyLoveThaiHoc               │
├──────────────────────────────────┤
│ Ngày đặc biệt              [+] │ ← Header + Add button
│ 3 sự kiện sắp tới              │    Rose gradient (gray khi form mở)
│                                  │
│ ┌──────────────────────────────┐│ ← Bottom sheet form (toggle)
│ │         ─────                ││    Sheet handle bar
│ │ Thêm sự kiện mới        [×] ││
│ │                              ││
│ │ TÊN SỰ KIỆN                 ││ ← Uppercase rose labels
│ │ ┌──────────────────────────┐ ││
│ │ │ Nhập tên sự kiện...     │ ││
│ │ └──────────────────────────┘ ││
│ │ DANH MỤC        NGÀY DIỄN RA││
│ │ ┌────────────┐ ┌────────────┐││ ← 2-col grid
│ │ │ Kỷ niệm ▾ │ │ dd/mm/yyyy │││
│ │ └────────────┘ └────────────┘││
│ │ GHI CHÚ (TÙY CHỌN)         ││
│ │ ┌──────────────────────────┐ ││
│ │ │ Thêm mô tả ngắn...     │ ││
│ │ └──────────────────────────┘ ││
│ │ Lặp lại hàng năm    [═══●] ││ ← Toggle switch
│ │ Tự động nhắc lại...         ││
│ │                              ││
│ │ ╔══════════════════════════╗ ││
│ │ ║      Lưu sự kiện        ║ ││
│ │ ╚══════════════════════════╝ ││
│ └──────────────────────────────┘│
│                                  │
│ ┌──────────────────────────────┐│ ← Date card (urgent)
│ │ ╭──╮                        ││    Rose border + shadow
│ │ │ 2│ Kỷ niệm · 14/02/2026  ││ ← Countdown ring (56px)
│ │ │NG│ 1000 Ngày Bên Nhau    🔔││    Color by urgency
│ │ ╰──╯                      🗑││
│ └──────────────────────────────┘│
│                                  │
│ ┌──────────────────────────────┐│ ← Date card (normal)
│ │ ╭──╮                        ││
│ │ │15│ Sinh nhật · 27/03/2026 ││
│ │ │NG│ Sinh nhật em bé       🔔││
│ │ ╰──╯ Hàng năm             🗑││
│ └──────────────────────────────┘│
│                                  │
├──────────────────────────────────┤
│ [♥]   [⊕]   [💬]   [📅]   [⚙] │
└──────────────────────────────────┘
```

**Interactions**:
- Tap [+] → form slides down
- Tap [×] → form slides up
- Toggle switch for recurring
- Submit → save + form close
- Tap 🔔 → send Telegram reminder
- Tap 🗑 (1st) → icon turns red
- Tap 🗑 (2nd) → delete entry
- Auto-timeout → red resets after 3s

---

### Screen 5: Settings (Cài đặt)

```
┌──────────────────────────────────┐
│ [♥] MyLoveThaiHoc               │
├──────────────────────────────────┤
│ Cài đặt                         │
│ Quản lý kết nối & cấu hình      │
│                                  │
│ TRẠNG THÁI KẾT NỐI             │ ← Uppercase rose section header
│ ┌──────────────────────────────┐ │
│ │ [🛢] Supabase            ● │ │ ← Green dot + ping animation
│ │      Lưu trữ dữ liệu kỉ niệm│ │
│ │──────────────────────────────│ │
│ │ [🤖] OpenRouter           ● │ │
│ │      Trí tuệ nhân tạo (AI)  │ │
│ │──────────────────────────────│ │
│ │ [📱] Telegram Bot         ● │ │
│ │      Thông báo & tương tác   │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌──────────────┬───────────────┐ │ ← Test buttons (2-col grid)
│ │     💬       │      ⚡       │ │    Card style, centered
│ │ Gửi test     │ Test AI +     │ │
│ │ Telegram     │ Telegram      │ │
│ └──────────────┴───────────────┘ │
│                                  │
│ HƯỚNG DẪN THIẾT LẬP            │
│ ┌──────────────────────────────┐ │ ← Setup guide cards
│ │ [1] Kết nối Database     ↗  │ │    Numbered steps
│ │     Nhập URL và Anon Key... │ │    External link icon
│ ├──────────────────────────────┤ │
│ │ [2] Cấu hình API OpenRouter↗│ │
│ │     Dùng để kích hoạt AI... │ │
│ ├──────────────────────────────┤ │
│ │ [3] Tạo Telegram Bot     ↗  │ │
│ │     Sử dụng BotFather...   │ │
│ └──────────────────────────────┘ │
│                                  │
│ ╔══════════════════════════════╗ │ ← Footer card
│ ║           [♥]               ║ │    Gradient primary bg
│ ║      MyLoveThaiHoc          ║ │    White text
│ ║  Phiên bản 1.0 · 12 entries ║ │
│ ║  MADE WITH LOVE FOR THÁI HOC║ │
│ ╚══════════════════════════════╝ │
│                                  │
├──────────────────────────────────┤
│ [♥]   [⊕]   [💬]   [📅]   [⚙] │
└──────────────────────────────────┘
```

---

## 3. Screen Flow Diagram

```
                    ┌─────────┐
                    │  App    │
                    │  Open   │
                    └────┬────┘
                         │
                         ▼
                ┌────────────────┐
                │   Dashboard    │◄──────────────────┐
                │   (Tab 1)     │                    │
                └───┬───┬───┬───┘                    │
                    │   │   │                        │
          ┌─────────┘   │   └──────────┐             │
          ▼             ▼              ▼             │
   ┌──────────┐  ┌──────────┐  ┌──────────┐        │
   │ Add Entry│  │ AI Chat  │  │ Calendar │        │
   │ (Tab 2)  │  │ (Tab 3)  │  │ (Tab 4)  │        │
   └──────────┘  └─────┬────┘  └──────────┘        │
                       │                             │
                       ▼                             │
               ┌──────────────┐                      │
               │  AI Parse    │                      │
               │  Success     │──── Save All ────────┘
               └──────────────┘    (entries appear
                                    on Dashboard)

   Tab Navigation: Any tab ◄──► Any tab (instant switch)

   Deep Links:
   - mylovethaihoc://dashboard
   - mylovethaihoc://add
   - mylovethaihoc://chat
   - mylovethaihoc://calendar
   - mylovethaihoc://settings
```

---

## 4. Animation Specifications

| Trigger | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page enter | fadeInUp (opacity 0→1, translateY 12→0) | 450ms | cubic-bezier(0.22,1,0.36,1) |
| Card list | Stagger children (50ms delay per item) | 400ms each | ease-out |
| Button press | scale(0.95) → scale(1) | 150ms | ease-out |
| Card press | scale(0.985) → scale(1) | 150ms | ease-out |
| Form expand | slideDown (opacity + translateY) | 350ms | ease-out |
| Toast appear | slideDown from top | 350ms | ease-out |
| Save button | scaleIn (scale 0.92→1) | 250ms | ease-out |
| Tab switch | crossfade | 200ms | ease-in-out |
| Countdown ring | stroke-dashoffset transition | 800ms | cubic-bezier(0.22,1,0.36,1) |
| Delete confirm | background-color transition | 200ms | ease |
| Floating circle | translateY 0→-6→0 | 3000ms | ease-in-out, infinite |
| Skeleton shimmer | background-position -200%→200% | 1500ms | ease-in-out, infinite |

---

## 5. Responsive Behavior (React Native)

| Device | Screen Width | Adjustments |
|--------|-------------|-------------|
| iPhone SE (375pt) | Small | Category grid 3-col, smaller hero padding |
| iPhone 14 (390pt) | Standard | Default layout |
| iPhone 14 Pro Max (430pt) | Large | Slightly wider cards, more breathing room |
| iPad (768pt+) | Tablet | Center content max-width 500pt, larger fonts |

---

## 6. Stitch Prompt (cho Google AI Stitch)

Nếu cần generate UI mockup từ Stitch, tham khảo file:
`../MyLoveThaiHoc/.stitch/stitch-prompt.md`

Design system, colors, typography, và interaction specs trong file đó đã được cập nhật theo Stitch output.
