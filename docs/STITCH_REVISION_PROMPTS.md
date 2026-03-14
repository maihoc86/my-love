# Stitch Revision Prompts — Chỉnh sửa từng Screen

> Mỗi prompt dưới đây dùng để paste vào Google Stitch để yêu cầu chỉnh sửa screen tương ứng.
> Kèm theo 3 prompts tạo mới: Login, Register, Forgot Password.

---

## MỤC LỤC

1. [Screen 1: Dashboard (Trang chủ)](#screen-1-dashboard)
2. [Screen 2: Add Entry (Thêm ghi chú)](#screen-2-add-entry)
3. [Screen 3: AI Chat](#screen-3-ai-chat)
4. [Screen 4: Calendar (Lịch sự kiện)](#screen-4-calendar)
5. [Screen 5: Settings (Cài đặt)](#screen-5-settings)
6. [Screen 6: Login (Đăng nhập) — MỚI](#screen-6-login)
7. [Screen 7: Register (Đăng ký) — MỚI](#screen-7-register)
8. [Screen 8: Forgot Password (Quên mật khẩu) — MỚI](#screen-8-forgot-password)
9. [Screen 9: Bản đồ hẹn hò (eKMap)](#screen-9-bản-đồ-hẹn-hò) — MỚI
10. [Screen 10: Dẫn đường (Navigation)](#screen-10-dẫn-đường) — MỚI
11. [Screen 11: Album ảnh hẹn hò](#screen-11-album-ảnh-hẹn-hò) — MỚI
12. [Screen 12: Đếm ngày yêu nhau](#screen-12-đếm-ngày-yêu-nhau) — MỚI
13. [Screen 13: Insight 360° (Neuron Map)](#screen-13-insight-360) — MỚI
14. [Screen 14: Voice Note (Ghi chú giọng nói)](#screen-14-voice-note) — MỚI
15. [Screen 15: Daily Reminder](#screen-15-daily-reminder) — MỚI

---

## Screen 1: Dashboard

```
Revise this mobile app screen (Dashboard / Trang chủ) with these specific changes. Keep the same design system (colors, fonts, Tailwind CSS, Material Icons). All text in Vietnamese.

## CRITICAL FIX: Bottom Navigation Bar

Replace the current bottom navigation with this EXACT 5-tab layout. This MUST be identical across ALL screens of the app:

Tab 1: icon "favorite" (filled when active) | label "Trang chủ" | ACTIVE on this screen (text-primary, font-bold)
Tab 2: icon "add_circle" | label "Thêm" | inactive (text-slate-400)
Tab 3: icon "chat_bubble" | label "AI Chat" | inactive
Tab 4: icon "calendar_today" | label "Lịch" | inactive
Tab 5: icon "settings" | label "Cài đặt" | inactive

- NO floating action button. All 5 tabs are equal height, evenly spaced.
- Active tab: text-primary (#f43e5c), font-bold, icon filled (font-variation-settings: 'FILL' 1)
- Inactive tab: text-slate-400, font-medium
- Tab bar: white bg, border-t border-primary/10, pb-6 (safe area)

## CHANGES TO HERO CARD

- Add 3 decorative floating circles on the hero card gradient:
  <div class="absolute top-4 right-8 w-16 h-16 bg-white/10 rounded-full"></div>
  <div class="absolute bottom-8 right-16 w-10 h-10 bg-white/15 rounded-full"></div>
  <div class="absolute top-12 left-4 w-8 h-8 bg-white/10 rounded-full"></div>
- Change hero text from "12 kỉ niệm tuyệt vời" to:
  - Line 1 (small label): "♥ Thái Hoc của bạn"
  - Line 2 (large): "Bạn đã lưu giữ"
  - Line 3 (extra large number, 36px bold): "12"
  - Line 4 (small): "kỉ niệm tuyệt vời"

## CHANGES TO UPCOMING SECTION

- Add countdown badge on each card (top-right corner of the card):
  - Card 1 "Sinh nhật em": RED badge "5 ngày" (bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full)
  - Card 2 "Kỷ niệm 1 năm": ORANGE badge "12 ngày" (bg-orange-500)
  - Card 3 "Du lịch Đà Lạt": PINK badge "28 ngày" (bg-pink-400)
- Replace Material Icons with emoji on each card:
  - Card 1: 🎂 (instead of cake icon)
  - Card 2: 💕 (instead of event_repeat icon)
  - Card 3: 🎉 (instead of flight icon)

## REPLACE "Phân loại" WITH: Mini-App Feature Grid (style giống Grab / MoMo / ZaloPay)

Remove the old "Phân loại" category stats section entirely. Replace with a MINI-APP GRID that showcases all app features as tappable icon tiles — similar to how Grab, MoMo, and ZaloPay display their services on the home screen.

### Section Header
- "Tính năng" (left, font-bold) + "Xem tất cả >" (right, text-primary, text-xs)

### Grid Layout: 4 columns, 2 rows (8 items visible) + horizontal scroll hint for more

<div class="space-y-3">
  <div class="flex items-center justify-between">
    <h3 class="font-bold text-slate-800">Tính năng</h3>
    <span class="text-primary text-xs font-bold">Xem tất cả ></span>
  </div>

  <div class="grid grid-cols-4 gap-3">

    <!-- 1. AI Chat — HOT badge -->
    <div class="flex flex-col items-center gap-1.5 relative">
      <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-md shadow-purple-200">
        <span class="material-symbols-outlined text-white text-xl">smart_toy</span>
      </div>
      <!-- HOT badge (top-right, overlapping) -->
      <div class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-[8px] font-bold rounded-full leading-none shadow-sm">HOT</div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">AI Chat</span>
    </div>

    <!-- 2. Bản đồ hẹn hò — NEW badge -->
    <div class="flex flex-col items-center gap-1.5 relative">
      <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-md shadow-emerald-200">
        <span class="material-symbols-outlined text-white text-xl">map</span>
      </div>
      <div class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-blue-500 text-white text-[8px] font-bold rounded-full leading-none shadow-sm">MỚI</div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">Bản đồ</span>
    </div>

    <!-- 3. Đếm ngày yêu — HOT badge -->
    <div class="flex flex-col items-center gap-1.5 relative">
      <div class="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-md shadow-rose-200">
        <span class="material-symbols-outlined text-white text-xl">favorite</span>
      </div>
      <div class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-[8px] font-bold rounded-full leading-none shadow-sm">HOT</div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">Đếm ngày</span>
    </div>

    <!-- 4. Insight 360° — NEW badge -->
    <div class="flex flex-col items-center gap-1.5 relative">
      <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-md shadow-amber-200">
        <span class="material-symbols-outlined text-white text-xl">hub</span>
      </div>
      <div class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-blue-500 text-white text-[8px] font-bold rounded-full leading-none shadow-sm">MỚI</div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">Insight 360</span>
    </div>

    <!-- 5. Ghi âm nhanh -->
    <div class="flex flex-col items-center gap-1.5 relative">
      <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-200">
        <span class="material-symbols-outlined text-white text-xl">mic</span>
      </div>
      <div class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-blue-500 text-white text-[8px] font-bold rounded-full leading-none shadow-sm">MỚI</div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">Ghi âm</span>
    </div>

    <!-- 6. Album ảnh -->
    <div class="flex flex-col items-center gap-1.5">
      <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-md shadow-cyan-200">
        <span class="material-symbols-outlined text-white text-xl">photo_library</span>
      </div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">Album ảnh</span>
    </div>

    <!-- 7. Nhắc nhở -->
    <div class="flex flex-col items-center gap-1.5">
      <div class="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-md shadow-orange-200">
        <span class="material-symbols-outlined text-white text-xl">notifications_active</span>
      </div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">Nhắc nhở</span>
    </div>

    <!-- 8. Lịch -->
    <div class="flex flex-col items-center gap-1.5">
      <div class="w-14 h-14 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-md shadow-pink-200">
        <span class="material-symbols-outlined text-white text-xl">calendar_month</span>
      </div>
      <span class="text-[10px] font-semibold text-slate-700 text-center leading-tight">Ngày đặc biệt</span>
    </div>

  </div>
</div>

### Design specs for the mini-app grid:
- Each tile: 56x56px (w-14 h-14) icon box with gradient background + rounded-2xl (16px) + shadow-md
- Icon: white Material Symbols, 20px
- Label: 10px, font-semibold, text-slate-700, centered, max 2 lines
- Badges: absolute positioned top-right (-top-1 -right-1):
  - "HOT": bg-red-500 text-white text-[8px] font-bold rounded-full — for popular features
  - "MỚI": bg-blue-500 text-white text-[8px] font-bold rounded-full — for new features
- Grid: 4 columns, gap-3, centered within card
- Each gradient is UNIQUE per feature — no two tiles share the same gradient

---

## ADD: Quick Stats Bar (between Hero and Tính năng)

After the hero card and BEFORE the mini-app grid, add a horizontal stats bar:

<div class="flex justify-around py-3 bg-white rounded-xl border border-primary/5 shadow-sm">
  <div class="text-center">
    <p class="text-lg font-bold text-primary">56</p>
    <p class="text-[9px] text-slate-400 font-medium">Ghi chú</p>
  </div>
  <div class="w-px bg-slate-100"></div>
  <div class="text-center">
    <p class="text-lg font-bold text-purple-500">365</p>
    <p class="text-[9px] text-slate-400 font-medium">Ngày yêu</p>
  </div>
  <div class="w-px bg-slate-100"></div>
  <div class="text-center">
    <p class="text-lg font-bold text-emerald-500">4</p>
    <p class="text-[9px] text-slate-400 font-medium">Sự kiện</p>
  </div>
  <div class="w-px bg-slate-100"></div>
  <div class="text-center">
    <p class="text-lg font-bold text-amber-500">128</p>
    <p class="text-[9px] text-slate-400 font-medium">Ảnh</p>
  </div>
</div>

---

## CHANGES TO RECENT ENTRIES

- Remove all <img> and background-image URLs. Do NOT use any stock photos.
- Instead, use a colored circle with Material Icon for each entry:
  Entry 1: bg-orange-100, icon "restaurant" text-orange-500 → title "Phở bò là món em yêu nhất" → right side: emoji 🥰 → subtitle "Món ăn · 2 giờ trước" → trash icon (delete)
  Entry 2: bg-blue-100, icon "location_on" text-blue-500 → "Góc chill của hai đứa" → detail "Quán cafe nhỏ quận 1" → 💛 → "Địa điểm · Hôm qua" → trash icon
  Entry 3: bg-pink-100, icon "palette" text-pink-500 → "Em mê vẽ tranh sơn dầu" → 🥰 → "Sở thích · 2 ngày trước"
  Entry 4: bg-red-100, icon "warning" text-red-500 → "Dị ứng tôm" → detail "Ăn tôm bị nổi mề đay" → 🚫 → "Dị ứng · 3 ngày trước"
  Entry 5: bg-indigo-100, icon "music_note" text-indigo-500 → "Thích nghe Vũ Cát Tường" → 👍 → "Âm nhạc · 1 tuần trước"
- Each entry card layout: [icon circle 40px] [title + detail + category·time] [sentiment emoji] [trash icon]
- Add "Xem tất cả >" link text on the right of section header (replace the "..." icon)

## REMOVE

- Remove the search icon button from the header (top right). Keep only the heart icon + title.
```

---

## Screen 2: Add Entry

```
Revise this mobile app screen (Add Entry / Thêm ghi chú) with these specific changes. Keep the same design system. All text in Vietnamese.

## CRITICAL FIX: Bottom Navigation Bar

Replace the current bottom nav with this EXACT 5-tab layout (must be identical across all screens):

Tab 1: icon "favorite" | label "Trang chủ" | inactive (text-slate-400)
Tab 2: icon "add_circle" (filled) | label "Thêm" | ACTIVE (text-primary, font-bold)
Tab 3: icon "chat_bubble" | label "AI Chat" | inactive
Tab 4: icon "calendar_today" | label "Lịch" | inactive
Tab 5: icon "settings" | label "Cài đặt" | inactive

No floating action button. All tabs equal height, evenly spaced.

## CHANGES TO CATEGORY SELECTOR

- Show "Món ăn" as SELECTED state:
  - Selected: border-2 border-primary, bg-primary/5, shadow-md, scale slightly (transform: scale(1.02))
  - All others: border border-slate-200, bg-white, no shadow
- This shows the user what a selected category looks like

## CHANGES TO SENTIMENT PICKER

- Change label from "Cảm xúc liên quan" to "Cảm xúc của Thái Hoc về điều này"
- Make buttons CIRCULAR (w-14 h-14 rounded-full) instead of rectangular
- Show "THÍCH" (👍) as SELECTED state:
  - Selected: border-2 border-primary, bg-primary/5, shadow-md, scale-105
  - Others: border border-slate-200, bg-white

## ADD: Advanced Options Section

After the sentiment picker, before the submit button, add an expandable section:

<div class="border-t border-dashed border-slate-200 pt-4">
  <button class="flex items-center justify-between w-full text-sm text-slate-500">
    <span class="flex items-center gap-2">
      <span class="material-symbols-outlined text-sm">expand_more</span>
      Tùy chọn nâng cao
    </span>
    <span class="h-px flex-1 bg-slate-200 mx-3"></span>
  </button>
  <!-- Expanded content (show it expanded): -->
  <div class="mt-4 space-y-4">
    <div>
      <label class="text-sm font-semibold mb-2 block">Ngày sự kiện</label>
      <input type="date" class="w-full rounded-xl border border-primary/20 bg-white p-4 focus:ring-2 focus:ring-primary" />
    </div>
    <div class="flex items-center justify-between">
      <span class="text-sm font-semibold">Lặp lại hàng năm</span>
      <!-- iOS-style toggle switch -->
      <div class="w-12 h-7 bg-primary rounded-full relative">
        <div class="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow"></div>
      </div>
    </div>
  </div>
</div>

## CHANGES TO TITLE INPUT

- Add dynamic emoji prefix inside the input based on selected category.
  Since "Món ăn" is selected, show: placeholder="🍜 Thái Hoc thích..."
- Change subtitle from "Ghi lại những điều quan trọng cần nhớ" to rose colored text "Ghi lại những điều quan trọng cần nhớ" with class text-primary/70

## REMOVE

- Remove the back arrow button from header (this is a tab screen, not a pushed screen)
```

---

## Screen 3: AI Chat

```
Revise this mobile app screen (AI Chat) with these specific changes. Keep the same design system. All text in Vietnamese.

## CRITICAL FIX: Bottom Navigation Bar

Replace current bottom nav with this EXACT 5-tab layout:

Tab 1: icon "favorite" | label "Trang chủ" | inactive (text-slate-400)
Tab 2: icon "add_circle" | label "Thêm" | inactive
Tab 3: icon "chat_bubble" (filled) | label "AI Chat" | ACTIVE (text-primary, font-bold)
Tab 4: icon "calendar_today" | label "Lịch" | inactive
Tab 5: icon "settings" | label "Cài đặt" | inactive

## CHANGES TO HEADER

- Replace the info icon button (top right) with TWO buttons side by side:

  Button 1 — Chat History:
  <button class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
    <span class="material-symbols-outlined text-slate-500 text-lg">history</span>
  </button>

  Button 2 — Gợi ý:
  <button class="flex items-center gap-1 px-3 py-1.5 rounded-full border border-purple-400 text-purple-600 text-xs font-bold">
    <span class="material-symbols-outlined text-sm">auto_awesome</span>
    Gợi ý
  </button>

## CHANGES TO USER MESSAGE BUBBLE

- Remove the user avatar image (the photo). Replace with a simple icon circle:
  <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
    <span class="material-symbols-outlined text-primary text-sm">person</span>
  </div>
- Change user bubble background from solid bg-primary to gradient:
  bg-gradient-to-r from-rose-500 to-pink-500

## CHANGES TO AI ANALYSIS RESPONSE

- Add category icon + sentiment emoji to each parsed entry:
  Line 1: 🍜 icon + "Thích: Bún bò" + right side "Món ăn · 🥰 Yêu thích"
  Line 2: 🍜 icon + "Ghét: Mắm tôm" + right side "Món ăn · 🚫 Ghét"
  Line 3: 📅 icon + "Sinh nhật: 15 tháng 8" + right side "Ngày đặc biệt · ❤️"
- Each entry row should have: colored left border (green for like, red for dislike, blue for date)

## ADD: Confirm Message (after save button)

Add a 4th assistant message below the save button:
- Assistant bubble with text: "Đã lưu 3 ghi chú thành công! ✨ Bạn muốn chia sẻ thêm gì không?"

## ADD: Typing Indicator

Add a 5th element — typing indicator bubble (assistant side):
<div class="flex items-start gap-3">
  <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
    <span class="material-symbols-outlined text-primary text-sm">smart_toy</span>
  </div>
  <div class="bg-slate-100 p-3 rounded-2xl rounded-tl-none">
    <div class="flex gap-1.5">
      <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
      <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
      <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
    </div>
  </div>
</div>

## HIDE SAVE BUTTON

After adding the confirm message, the save button should be hidden (remove it or add opacity-50 + pointer-events-none) since entries are already saved.

## ADD: Voice Input Button (next to text input)

Change the input area at the bottom. Add a microphone button BEFORE the text input:

<div class="p-4 border-t border-primary/10 bg-white">
  <div class="flex items-center gap-2">
    <!-- Voice button -->
    <button class="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform">
      <span class="material-symbols-outlined text-purple-600">mic</span>
    </button>
    <!-- Text input -->
    <div class="flex-1 flex items-center bg-slate-100 rounded-full px-4 py-2">
      <input class="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2" placeholder="Nhắn tin hoặc nói cho AI..." type="text" />
      <button class="w-10 h-10 bg-gradient-to-r from-rose-400 to-primary rounded-full flex items-center justify-center text-white shadow-md">
        <span class="material-symbols-outlined">send</span>
      </button>
    </div>
  </div>
  <!-- Voice recording hint -->
  <p class="text-center text-[10px] text-slate-400 mt-1.5">Nhấn giữ 🎙 để nói tiếng Việt — AI sẽ tự chuyển thành văn bản</p>
</div>

## ADD: Voice Recording State (show as overlay mockup)

Below the main chat content, add a SEPARATE section showing the "voice recording in progress" state as a visual reference. Wrap it in a light gray dashed border with label "Trạng thái ghi âm (khi nhấn giữ mic)":

<div class="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-4">
  <p class="text-xs text-slate-400 mb-3 text-center">— Trạng thái đang ghi âm —</p>
  <div class="bg-purple-50 border border-purple-200 rounded-2xl p-6 text-center space-y-3">
    <!-- Pulsing mic icon -->
    <div class="w-16 h-16 mx-auto bg-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-300">
      <span class="material-symbols-outlined text-white text-3xl">mic</span>
    </div>
    <!-- Waveform bars -->
    <div class="flex items-center justify-center gap-1 h-8">
      <div class="w-1 bg-purple-400 rounded-full animate-pulse" style="height: 12px"></div>
      <div class="w-1 bg-purple-500 rounded-full animate-pulse" style="height: 24px; animation-delay: 100ms"></div>
      <div class="w-1 bg-purple-400 rounded-full animate-pulse" style="height: 16px; animation-delay: 200ms"></div>
      <div class="w-1 bg-purple-600 rounded-full animate-pulse" style="height: 28px; animation-delay: 50ms"></div>
      <div class="w-1 bg-purple-400 rounded-full animate-pulse" style="height: 20px; animation-delay: 150ms"></div>
      <div class="w-1 bg-purple-500 rounded-full animate-pulse" style="height: 14px; animation-delay: 250ms"></div>
      <div class="w-1 bg-purple-400 rounded-full animate-pulse" style="height: 22px; animation-delay: 100ms"></div>
    </div>
    <p class="text-purple-700 font-bold text-sm">Đang lắng nghe...</p>
    <p class="text-purple-400 text-xs">00:03</p>
    <!-- Cancel / Stop buttons -->
    <div class="flex gap-3 justify-center mt-2">
      <button class="px-4 py-2 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">close</span> Huỷ
      </button>
      <button class="px-4 py-2 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-md">
        <span class="material-symbols-outlined text-sm">stop_circle</span> Gửi
      </button>
    </div>
  </div>
</div>

## ADD: Chat History Side Panel (show as separate mockup section)

Below the voice recording state, add ANOTHER separate section showing the "chat history panel" as a visual reference:

<div class="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-4">
  <p class="text-xs text-slate-400 mb-3 text-center">— Panel lịch sử chat (khi nhấn icon history) —</p>
  <div class="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
    <!-- Panel header -->
    <div class="bg-gradient-to-r from-primary to-pink-500 p-4 flex items-center justify-between">
      <h3 class="text-white font-bold">Lịch sử chat</h3>
      <button class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <span class="material-symbols-outlined text-white text-sm">close</span>
      </button>
    </div>
    <!-- Search bar -->
    <div class="p-3 border-b border-slate-100">
      <div class="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
        <span class="material-symbols-outlined text-slate-400 text-sm">search</span>
        <input class="bg-transparent text-sm flex-1 border-none focus:ring-0" placeholder="Tìm kiếm cuộc trò chuyện..." />
      </div>
    </div>
    <!-- Chat history list -->
    <div class="divide-y divide-slate-50">
      <!-- Today -->
      <div class="px-4 py-2 bg-slate-50">
        <span class="text-[10px] font-bold text-slate-400 uppercase">Hôm nay</span>
      </div>
      <div class="flex items-center gap-3 p-3 hover:bg-slate-50">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-primary text-sm">chat_bubble</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Em thích ăn bún bò, ghét mắm tôm...</p>
          <p class="text-[10px] text-slate-400">3 entries đã lưu · 14:30</p>
        </div>
        <span class="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">3</span>
      </div>
      <div class="flex items-center gap-3 p-3 hover:bg-slate-50">
        <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-purple-500 text-sm">auto_awesome</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Gợi ý hôm nay: Mua hoa hồng trắng...</p>
          <p class="text-[10px] text-slate-400">Gợi ý AI · 09:15</p>
        </div>
      </div>
      <!-- Yesterday -->
      <div class="px-4 py-2 bg-slate-50">
        <span class="text-[10px] font-bold text-slate-400 uppercase">Hôm qua</span>
      </div>
      <div class="flex items-center gap-3 p-3 hover:bg-slate-50">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-primary text-sm">chat_bubble</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Em mê phim Ghibli, thích vẽ tranh...</p>
          <p class="text-[10px] text-slate-400">5 entries đã lưu · 20:45</p>
        </div>
        <span class="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">5</span>
      </div>
      <div class="flex items-center gap-3 p-3 hover:bg-slate-50">
        <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-orange-500 text-sm">mic</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">🎙 Ghi âm: Em kể về quán cafe mới...</p>
          <p class="text-[10px] text-slate-400">Voice · 2 entries · 18:20</p>
        </div>
        <span class="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">2</span>
      </div>
      <!-- Older -->
      <div class="px-4 py-2 bg-slate-50">
        <span class="text-[10px] font-bold text-slate-400 uppercase">12 tháng 3</span>
      </div>
      <div class="flex items-center gap-3 p-3 hover:bg-slate-50">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-primary text-sm">chat_bubble</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Dị ứng tôm, phấn hoa. Sinh nhật 15/8...</p>
          <p class="text-[10px] text-slate-400">4 entries đã lưu · 10:00</p>
        </div>
        <span class="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">4</span>
      </div>
    </div>
    <!-- Stats footer -->
    <div class="p-3 bg-slate-50 border-t border-slate-100 flex justify-around">
      <div class="text-center">
        <p class="text-sm font-bold text-primary">12</p>
        <p class="text-[9px] text-slate-400">Cuộc chat</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-bold text-primary">34</p>
        <p class="text-[9px] text-slate-400">Entries đã lưu</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-bold text-purple-500">3</p>
        <p class="text-[9px] text-slate-400">Voice chats</p>
      </div>
    </div>
  </div>
</div>
```

---

## Screen 4: Calendar

```
Revise this mobile app screen (Calendar / Lịch sự kiện) with these specific changes. Keep the same design system. All text in Vietnamese.

## CRITICAL FIX: Bottom Navigation Bar

Replace current bottom nav with this EXACT 5-tab layout:

Tab 1: icon "favorite" | label "Trang chủ" | inactive (text-slate-400)
Tab 2: icon "add_circle" | label "Thêm" | inactive
Tab 3: icon "chat_bubble" | label "AI Chat" | inactive
Tab 4: icon "calendar_today" (filled) | label "Lịch" | ACTIVE (text-primary, font-bold)
Tab 5: icon "settings" | label "Cài đặt" | inactive

## CRITICAL FIX: Remove Stock Photos

- Remove ALL background-image URLs and stock photos from event cards.
- Replace each card's right-side image with action icon buttons:
  <div class="flex flex-col gap-2">
    <button class="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
      <span class="material-symbols-outlined text-blue-500 text-sm">notifications</span>
    </button>
    <button class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
      <span class="material-symbols-outlined text-red-400 text-sm">delete</span>
    </button>
  </div>

## CRITICAL FIX: Countdown Ring Colors

Change the countdown ring stroke color based on urgency (currently all use stroke-primary):
- Card 1 (2 ngày): stroke-red-500 (urgent)
- Card 2 (5 ngày): stroke-red-500 (urgent, <=7 days)
- Card 3 (15 ngày): stroke-orange-400 (soon)
- Card 4 (ADD THIS — 45 ngày): stroke-pink-400 (far away)

Also change the number color inside the ring to match:
- 2 days: text-red-500
- 5 days: text-red-500
- 15 days: text-orange-400
- 45 days: text-pink-400

## ADD: 4th Event Card

Add a 4th event card after Valentine:
- Countdown: 45 days, stroke-pink-400
- Title: "Du lịch Đà Lạt"
- Date: "Thứ Tư, 28 Tháng 4, 2026"
- Category badge: "Ngày lễ" (instead of "Hàng năm")

## CHANGES TO EVENT CARDS

- Card 1 "1000 Ngày Bên Nhau": Add badge "Hàng năm" (already has it — keep)
  - Add rose border + elevated shadow since it's <=3 days: border-primary/30 shadow-lg shadow-primary/10
- Card 2 "Sinh nhật em bé": Add badge "Hàng năm" (missing)
- Card 3 "Valentine 2026": No badge (not recurring)
- Card 4 "Du lịch Đà Lạt": No badge

## CHANGES TO BOTTOM SHEET FORM

Add these missing fields to the form modal:

1. After date picker, add a textarea:
   <div>
     <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Ghi chú (tùy chọn)</label>
     <textarea class="w-full bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary resize-none" rows="2" placeholder="Thêm mô tả ngắn..."></textarea>
   </div>

2. Add toggle switch for recurring:
   <div class="flex items-center justify-between">
     <span class="text-sm font-semibold">Lặp lại hàng năm</span>
     <div class="w-12 h-7 bg-primary rounded-full relative cursor-pointer">
       <div class="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow"></div>
     </div>
   </div>

## CHANGES TO HEADER

- Add subtitle below title: <p class="text-sm text-slate-500 mt-1">Không bỏ lỡ ngày nào quan trọng</p>
- Change "3 sự kiện sắp tới" to "4 sự kiện sắp tới" (since we added card 4)
```

---

## Screen 5: Settings

```
Rebuild this mobile app screen completely. This is now a USER-FACING Settings screen (Cài đặt) — NOT a developer/technical settings page. Remove all Supabase, OpenRouter, Telegram connection status, test buttons, and setup guide. Replace with personal account settings, lover info management, notifications, and support. Keep the same design system. All text in Vietnamese.

## DESIGN SYSTEM (same as other screens)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, rounded-xl cards, all text Vietnamese

## CRITICAL: Bottom Navigation Bar

EXACT 5-tab layout (identical across all screens):

Tab 1: icon "favorite" | label "Trang chủ" | inactive (text-slate-400)
Tab 2: icon "add_circle" | label "Thêm" | inactive
Tab 3: icon "chat_bubble" | label "AI Chat" | inactive
Tab 4: icon "calendar_today" | label "Lịch" | inactive
Tab 5: icon "settings" (filled) | label "Cài đặt" | ACTIVE (text-primary, font-bold)

---

## SCREEN LAYOUT

### Header — Profile Card

At the top, show a user profile card (NOT a plain title):

<div class="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 p-6 pb-8 text-white">
  <div class="flex items-center gap-4">
    <!-- Avatar circle with initial -->
    <div class="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center">
      <span class="text-2xl font-bold">N</span>
    </div>
    <div class="flex-1">
      <h1 class="text-xl font-bold">Nguyễn Văn A</h1>
      <p class="text-white/70 text-sm">nguyenvana@gmail.com</p>
      <p class="text-white/60 text-xs mt-0.5">0912 345 678</p>
    </div>
    <!-- Edit profile button -->
    <button class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
      <span class="material-symbols-outlined text-white text-sm">edit</span>
    </button>
  </div>
  <!-- Stats row -->
  <div class="flex justify-around mt-5 bg-white/10 rounded-xl py-3">
    <div class="text-center">
      <p class="text-lg font-bold">56</p>
      <p class="text-[10px] text-white/70">Ghi chú</p>
    </div>
    <div class="w-px bg-white/20"></div>
    <div class="text-center">
      <p class="text-lg font-bold">4</p>
      <p class="text-[10px] text-white/70">Ngày đặc biệt</p>
    </div>
    <div class="w-px bg-white/20"></div>
    <div class="text-center">
      <p class="text-lg font-bold">12</p>
      <p class="text-[10px] text-white/70">Cuộc chat</p>
    </div>
  </div>
</div>

---

### Section 1: THÔNG TIN NGƯỜI YÊU (Lover Info)

Section label: "THÔNG TIN NGƯỜI YÊU" (uppercase, text-xs, font-bold, text-primary, tracking-wider, px-1, mb-2)

White card with rounded-xl, border border-primary/5, overflow-hidden. Rows separated by divider (border-b border-slate-50):

Row 1:
- Left: icon "favorite" in bg-pink-100 text-pink-500 rounded-lg (w-10 h-10)
- Middle: title "Tên gọi" (font-semibold) + value "Thái Hoc" (text-sm, text-slate-500)
- Right: chevron icon "chevron_right" (text-slate-300)

Row 2:
- Left: icon "cake" in bg-purple-100 text-purple-500
- Middle: "Sinh nhật" + "15 tháng 8"
- Right: chevron

Row 3:
- Left: icon "star" in bg-amber-100 text-amber-500
- Middle: "Biệt danh" + "Em bé"
- Right: chevron

Row 4:
- Left: icon "photo_camera" in bg-blue-100 text-blue-500
- Middle: "Ảnh đại diện" + "Đã cập nhật"
- Right: chevron

Bottom of card — full-width edit button:
<button class="w-full py-3 text-center text-primary text-sm font-bold border-t border-slate-50 flex items-center justify-center gap-1">
  <span class="material-symbols-outlined text-sm">edit</span>
  Chỉnh sửa thông tin người yêu
</button>

---

### Section 2: TÀI KHOẢN (Account)

Section label: "TÀI KHOẢN"

White card, same style. Rows:

Row 1:
- icon "person" in bg-blue-100 text-blue-500
- "Thông tin cá nhân" + "Tên, email, số điện thoại" (text-xs, text-slate-400)
- chevron_right

Row 2:
- icon "lock" in bg-green-100 text-green-500
- "Đổi mật khẩu" + "Cập nhật lần cuối 2 tuần trước"
- chevron_right

Row 3:
- icon "security" in bg-orange-100 text-orange-500
- "Bảo mật" + "Xác thực 2 lớp, thiết bị đăng nhập"
- chevron_right

Row 4:
- icon "cloud_sync" in bg-indigo-100 text-indigo-500
- "Sao lưu & đồng bộ" + "Tự động sao lưu lúc 2:00 AM"
- chevron_right

---

### Section 3: THÔNG BÁO (Notifications)

Section label: "THÔNG BÁO"

White card. Rows with TOGGLE SWITCHES instead of chevrons:

Row 1:
- icon "notifications_active" in bg-rose-100 text-rose-500
- "Nhắc nhở ngày đặc biệt" + "Nhắc trước 1, 3, 7 ngày"
- Toggle ON (bg-primary, knob right)

Row 2:
- icon "lightbulb" in bg-amber-100 text-amber-500
- "Gợi ý hàng ngày" + "AI gợi ý mỗi sáng lúc 8:00"
- Toggle ON

Row 3:
- icon "send" in bg-blue-100 text-blue-500
- "Thông báo Telegram" + "Gửi qua Telegram Bot"
- Toggle ON

Row 4:
- icon "email" in bg-slate-100 text-slate-500
- "Thông báo Email" + "Tổng hợp hàng tuần"
- Toggle OFF (bg-slate-200, knob left)

Toggle switch HTML:
ON: <div class="w-11 h-6 bg-primary rounded-full relative flex-shrink-0">
      <div class="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
    </div>
OFF: <div class="w-11 h-6 bg-slate-200 rounded-full relative flex-shrink-0">
       <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
     </div>

---

### Section 4: CHUNG (General)

Section label: "CHUNG"

White card. Rows with chevrons:

Row 1:
- icon "palette" in bg-pink-100 text-pink-500
- "Giao diện" + "Sáng"
- chevron_right

Row 2:
- icon "translate" in bg-green-100 text-green-500
- "Ngôn ngữ" + "Tiếng Việt"
- chevron_right

Row 3:
- icon "storage" in bg-purple-100 text-purple-500
- "Bộ nhớ" + "Đã dùng 12.5 MB / 500 MB"
- chevron_right

Row 4:
- icon "delete_sweep" in bg-red-100 text-red-500
- "Xoá dữ liệu cache" + "Giải phóng bộ nhớ tạm"
- chevron_right

---

### Section 5: HỖ TRỢ (Support)

Section label: "HỖ TRỢ"

White card. Rows:

Row 1:
- icon "help" in bg-blue-100 text-blue-500
- "Trung tâm trợ giúp" + "Hướng dẫn sử dụng app"
- chevron_right

Row 2:
- icon "feedback" in bg-amber-100 text-amber-500
- "Góp ý & phản hồi" + "Gửi ý kiến đóng góp"
- chevron_right

Row 3:
- icon "privacy_tip" in bg-green-100 text-green-500
- "Chính sách bảo mật" + "Quyền riêng tư & dữ liệu"
- chevron_right

Row 4:
- icon "description" in bg-slate-100 text-slate-500
- "Điều khoản sử dụng"
- chevron_right

---

### Footer

Footer card (same gradient as hero, rounded-2xl, p-5, mt-6, text-center, text-white):

<div class="rounded-2xl p-5 bg-gradient-to-br from-primary to-pink-400 text-white text-center relative overflow-hidden">
  <div class="absolute -top-4 -right-4 opacity-20">
    <span class="material-symbols-outlined text-8xl" style="font-variation-settings: 'FILL' 1">favorite</span>
  </div>
  <span class="material-symbols-outlined text-2xl mb-1 animate-bounce" style="font-variation-settings: 'FILL' 1">favorite</span>
  <p class="font-bold text-base">MyLoveThaiHoc</p>
  <p class="text-white/80 text-xs mt-1">Phiên bản 1.0 · 56 ghi chú</p>
  <p class="text-white/60 text-[10px] mt-0.5 uppercase tracking-widest">Made with love for Thái Hoc</p>
</div>

### Logout Button (below footer)

<button class="w-full mt-4 mb-8 py-3.5 rounded-xl border-2 border-red-200 text-red-500 font-bold text-sm flex items-center justify-center gap-2 bg-red-50/50">
  <span class="material-symbols-outlined text-sm">logout</span>
  Đăng xuất
</button>
```

---

## Screen 6: Login

```
Create a new mobile app screen for Login (Đăng nhập) for the app "MyLoveThaiHoc". Use the same design system as the existing screens.

## DESIGN SYSTEM (must match exactly)

- Primary color: #f43e5c
- Background: #f8f5f6
- Font: Plus Jakarta Sans (Google Fonts)
- Icons: Material Symbols Outlined
- Tailwind CSS via CDN
- Border radius: cards 1.5rem (xl), buttons 0.75rem (lg), inputs 0.75rem
- Mobile viewport, max-w-md mx-auto, min-height 100dvh
- All text in Vietnamese

## SCREEN LAYOUT

### Top Section (40% of screen)
- Full-width gradient background: bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600
- Centered content:
  - Large heart icon (64px, white): <span class="material-symbols-outlined text-white text-6xl filled-icon">favorite</span>
  - App name: "MyLoveThaiHoc" (white, text-3xl, font-bold)
  - Tagline: "Ghi nhớ mọi điều về em" (white/80, text-sm)
- 3 decorative floating circles (white/10, white/15) positioned absolutely
- Bottom of gradient: curved wave or rounded-t-3xl white overlay

### Login Form Section (white background, -mt-6 overlap with gradient)
- Rounded top corners card: bg-white rounded-t-3xl p-6 shadow-xl

#### Title
- "Đăng nhập" (text-2xl, font-bold)
- "Chào mừng bạn quay lại" (text-sm, text-slate-500)

#### Phone/Email Input
- Label: "Số điện thoại hoặc Email" (text-sm, font-semibold)
- Input: with left icon "phone" inside, placeholder "0912 345 678"
- Full width, rounded-xl, border border-slate-200, p-4, focus:ring-2 focus:ring-primary

#### Password Input
- Label: "Mật khẩu" (text-sm, font-semibold)
- Input: with left icon "lock", right icon "visibility_off" (toggle), placeholder "••••••••"
- type="password"

#### Forgot Password Link
- Right-aligned: "Quên mật khẩu?" (text-sm, text-primary, font-medium)

#### Login Button
- Full width, bg-gradient-to-r from-primary to-pink-500, text-white, font-bold, py-4, rounded-xl
- Text: "Đăng nhập"
- Shadow: shadow-lg shadow-primary/30
- active:scale-95 transition

#### Divider
- Horizontal line with text in center: "──── hoặc ────"
- Use flex with two <hr> lines and "hoặc" text (text-slate-400, text-sm)

#### OTP Login Button
- Full width, outlined style: border-2 border-primary, text-primary, bg-white
- Icon "sms" + text "Đăng nhập bằng mã OTP"
- py-3.5 rounded-xl font-bold

#### Google Login Button
- Full width, bg-white, border border-slate-200, text-slate-700
- Google "G" logo (use SVG or text "G" in a colored circle: blue/red/yellow/green)
- Text: "Tiếp tục với Google"
- py-3.5 rounded-xl font-medium, shadow-sm

#### Register Link (bottom)
- Centered text: "Chưa có tài khoản?" (text-slate-500) + "Đăng ký" (text-primary, font-bold)
- Padding bottom: pb-8

### NO bottom tab navigation on this screen (login is before the main app)
```

---

## Screen 7: Register

```
Create a new mobile app screen for Register (Đăng ký) for the app "MyLoveThaiHoc". Use the same design system as login screen.

## DESIGN SYSTEM (same as login)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## SCREEN LAYOUT

### Header (smaller than login — 25% of screen)
- Gradient bg: bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600
- Back arrow button (top-left): white, rounded-full, bg-white/20
  <button class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
    <span class="material-symbols-outlined text-white">arrow_back</span>
  </button>
- Centered: Heart icon (48px) + "Tạo tài khoản" (white, text-2xl, bold)
- Decorative circles (same style as login)
- Curved bottom overlap into white form area

### Register Form (white card, rounded-t-3xl, -mt-6, p-6)

#### Title
- "Đăng ký" (text-2xl, font-bold)
- "Bắt đầu ghi nhớ mọi điều về em" (text-sm, text-slate-500)

#### Full Name Input
- Label: "Họ và tên" (text-sm, font-semibold)
- Input: icon "person" left, placeholder "Nguyễn Văn A"

#### Phone Input
- Label: "Số điện thoại" (text-sm, font-semibold)
- Input: icon "phone" left, placeholder "0912 345 678"

#### Email Input
- Label: "Email" (text-sm, font-semibold)
- Input: icon "email" left, placeholder "you@example.com"

#### Password Input
- Label: "Mật khẩu" (text-sm, font-semibold)
- Input: icon "lock" left, icon "visibility_off" right, placeholder "Tối thiểu 8 ký tự"
- type="password"

#### Confirm Password Input
- Label: "Xác nhận mật khẩu"
- Input: icon "lock" left, icon "visibility_off" right, placeholder "Nhập lại mật khẩu"

#### Password Strength Indicator
Below password input, show strength bars:
<div class="flex gap-1 mt-2">
  <div class="h-1 flex-1 rounded-full bg-primary"></div>
  <div class="h-1 flex-1 rounded-full bg-primary"></div>
  <div class="h-1 flex-1 rounded-full bg-primary"></div>
  <div class="h-1 flex-1 rounded-full bg-slate-200"></div>
</div>
<p class="text-xs text-primary mt-1 font-medium">Mật khẩu khá mạnh</p>

#### Terms Checkbox
- <input type="checkbox"> + "Tôi đồng ý với" + "Điều khoản sử dụng" (text-primary, underline) + "và" + "Chính sách bảo mật" (text-primary, underline)
- text-sm

#### Register Button
- Full width, gradient from-primary to-pink-500, white text, font-bold, py-4, rounded-xl
- Text: "Tạo tài khoản"
- shadow-lg shadow-primary/30

#### Divider "──── hoặc ────"

#### Google Register Button
- Same style as login: white bg, border, Google "G" logo, "Đăng ký với Google"

#### Login Link (bottom)
- "Đã có tài khoản?" + "Đăng nhập" (text-primary, font-bold)
- pb-8

### NO bottom tab navigation
```

---

## Screen 8: Forgot Password

```
Create a new mobile app screen for Forgot Password (Quên mật khẩu) for the app "MyLoveThaiHoc". Use the same design system.

## DESIGN SYSTEM (same as login/register)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## SCREEN LAYOUT

### Header (compact — 20% of screen)
- Gradient bg: bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600
- Back arrow button (top-left, same as register)
- Centered: Lock icon (48px, white) + "Quên mật khẩu" (white, text-xl, bold)
- Curved bottom

### Main Content (white card, rounded-t-3xl, -mt-6, p-6)

#### Step 1: Enter Phone/Email (show this state)

**Illustration area:**
- Centered icon composition:
  <div class="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
    <span class="material-symbols-outlined text-primary text-4xl">lock_reset</span>
  </div>

**Title & Description:**
- "Đặt lại mật khẩu" (text-xl, font-bold, text-center)
- "Nhập số điện thoại hoặc email đã đăng ký. Chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu." (text-sm, text-slate-500, text-center, max-w-xs mx-auto)

**Input:**
- Label: "Số điện thoại hoặc Email"
- Input: icon "phone" left, placeholder "0912 345 678 hoặc email"

**Send OTP Button:**
- Full width, gradient, white text, font-bold, py-4, rounded-xl
- Text: "Gửi mã xác thực"
- shadow-lg shadow-primary/30

---

#### Step 2: Enter OTP (show below Step 1, with a divider)

Add a dashed divider: <div class="border-t border-dashed border-slate-200 my-8"></div>

**Title:** "Nhập mã xác thực" (text-lg, font-bold)
**Description:** "Mã 6 số đã được gửi đến 0912 ***678" (text-sm, text-slate-500)

**OTP Input — 6 boxes in a row:**
<div class="flex gap-3 justify-center my-6">
  <input class="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20" maxlength="1" value="4" />
  <input class="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20" maxlength="1" value="8" />
  <input class="w-12 h-14 text-center text-xl font-bold border-2 border-primary rounded-xl ring-2 ring-primary/20" maxlength="1" value="" />  <!-- active/focus state -->
  <input class="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl" maxlength="1" />
  <input class="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl" maxlength="1" />
  <input class="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl" maxlength="1" />
</div>

**Resend link:**
- "Không nhận được mã?" (text-slate-500, text-sm) + "Gửi lại" (text-primary, font-bold)
- Below that: countdown timer "Gửi lại sau 45 giây" (text-xs, text-slate-400)

**Verify Button:**
- Full width, gradient, text "Xác nhận" — but show as disabled state since OTP is incomplete:
  bg-slate-200 text-slate-400 cursor-not-allowed (instead of gradient)

---

#### Step 3: New Password (show below Step 2, with another dashed divider)

**Title:** "Tạo mật khẩu mới" (text-lg, font-bold)

**New Password Input:**
- Label: "Mật khẩu mới"
- Input: icon "lock" left, icon "visibility_off" right, placeholder "Tối thiểu 8 ký tự"

**Confirm Password Input:**
- Label: "Xác nhận mật khẩu mới"
- Input: icon "lock" left, placeholder "Nhập lại mật khẩu mới"

**Reset Button:**
- Full width, gradient from-primary to-pink-500, white text, font-bold
- Text: "Đặt lại mật khẩu"

#### Back to Login Link (bottom)
- Centered: icon "arrow_back" + "Quay lại đăng nhập" (text-primary, font-medium)
- pb-8

### NO bottom tab navigation
```

---

## Screen 9: Bản đồ hẹn hò

```
Create a new mobile app screen for Date Map (Bản đồ hẹn hò) for the app "MyLoveThaiHoc". This screen uses eKMap to show date spot suggestions. All text in Vietnamese.

## DESIGN SYSTEM (same as other screens)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## NAVIGATION

This is a SUB-SCREEN (pushed from Dashboard or a new tab). Show:
- Top header with back button (arrow_back) + title "Bản đồ hẹn hò" + filter icon button (tune)
- NO bottom tab bar (this is a detail/pushed screen)

---

## SCREEN LAYOUT

### Map Area (takes ~55% of screen height)

Show a full-width map placeholder:

<div class="relative w-full bg-slate-200" style="height: 55vh">
  <!-- Map background placeholder with grid pattern to simulate streets -->
  <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-slate-100 to-blue-50">
    <!-- Simulated roads -->
    <div class="absolute top-1/3 left-0 right-0 h-1 bg-slate-300"></div>
    <div class="absolute top-2/3 left-0 right-0 h-0.5 bg-slate-200"></div>
    <div class="absolute top-0 bottom-0 left-1/4 w-1 bg-slate-300"></div>
    <div class="absolute top-0 bottom-0 left-2/3 w-0.5 bg-slate-200"></div>
    <!-- River/lake blob -->
    <div class="absolute bottom-8 right-4 w-24 h-16 bg-blue-200/50 rounded-full blur-sm"></div>
  </div>

  <!-- Category filter pills (floating on map, top area) -->
  <div class="absolute top-3 left-3 right-3 flex gap-2 overflow-x-auto hide-scrollbar">
    <button class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-lg whitespace-nowrap">
      <span class="material-symbols-outlined text-sm">restaurant</span> Quán ăn
    </button>
    <button class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-slate-700 text-xs font-medium shadow-md whitespace-nowrap">
      <span class="material-symbols-outlined text-sm">local_cafe</span> Cà phê
    </button>
    <button class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-slate-700 text-xs font-medium shadow-md whitespace-nowrap">
      <span class="material-symbols-outlined text-sm">cottage</span> Homestay
    </button>
    <button class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-slate-700 text-xs font-medium shadow-md whitespace-nowrap">
      <span class="material-symbols-outlined text-sm">attractions</span> Khu vui chơi
    </button>
    <button class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-slate-700 text-xs font-medium shadow-md whitespace-nowrap">
      <span class="material-symbols-outlined text-sm">shopping_bag</span> TTTM
    </button>
  </div>

  <!-- Map pins (scattered across the map area) -->
  <!-- Pin 1: Selected/Active restaurant -->
  <div class="absolute top-[35%] left-[30%] flex flex-col items-center">
    <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-2 border-white animate-bounce">
      <span class="material-symbols-outlined text-white text-lg">restaurant</span>
    </div>
    <div class="w-2 h-2 bg-primary rounded-full mt-[-2px]"></div>
  </div>

  <!-- Pin 2: Cafe -->
  <div class="absolute top-[50%] left-[55%] flex flex-col items-center">
    <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
      <span class="material-symbols-outlined text-white text-sm">local_cafe</span>
    </div>
  </div>

  <!-- Pin 3: Homestay -->
  <div class="absolute top-[25%] left-[70%] flex flex-col items-center">
    <div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
      <span class="material-symbols-outlined text-white text-sm">cottage</span>
    </div>
  </div>

  <!-- Pin 4: Entertainment -->
  <div class="absolute top-[60%] left-[20%] flex flex-col items-center">
    <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
      <span class="material-symbols-outlined text-white text-sm">attractions</span>
    </div>
  </div>

  <!-- Pin 5: Mall -->
  <div class="absolute top-[45%] left-[80%] flex flex-col items-center">
    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
      <span class="material-symbols-outlined text-white text-sm">shopping_bag</span>
    </div>
  </div>

  <!-- Pin 6: User location -->
  <div class="absolute top-[48%] left-[45%] flex flex-col items-center">
    <div class="w-4 h-4 bg-blue-600 rounded-full border-3 border-white shadow-lg">
      <div class="w-full h-full rounded-full bg-blue-600 animate-ping opacity-40"></div>
    </div>
  </div>

  <!-- Map controls (right side) -->
  <div class="absolute right-3 bottom-4 flex flex-col gap-2">
    <button class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
      <span class="material-symbols-outlined text-slate-600 text-lg">my_location</span>
    </button>
    <button class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
      <span class="material-symbols-outlined text-slate-600 text-lg">add</span>
    </button>
    <button class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
      <span class="material-symbols-outlined text-slate-600 text-lg">remove</span>
    </button>
  </div>

  <!-- eKMap watermark -->
  <div class="absolute bottom-2 left-3 bg-white/80 px-2 py-1 rounded text-[9px] text-slate-400 font-medium">
    🗺️ Powered by eKMap
  </div>
</div>

### Bottom Sheet — Spot Detail Card (draggable handle)

Below the map, a bottom sheet that overlaps the map slightly (rounded-t-2xl, -mt-4, relative z-10):

<div class="bg-white rounded-t-2xl -mt-4 relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
  <!-- Handle bar -->
  <div class="flex justify-center pt-3 pb-2">
    <div class="w-10 h-1 bg-slate-200 rounded-full"></div>
  </div>

  <!-- AI Suggestion badge -->
  <div class="px-4 mb-3">
    <div class="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-100 rounded-xl">
      <span class="material-symbols-outlined text-purple-500 text-sm">auto_awesome</span>
      <p class="text-xs text-purple-700 font-medium">AI gợi ý: <span class="font-bold">Thái Hoc thích quán có view đẹp, yên tĩnh</span></p>
    </div>
  </div>

  <!-- Selected spot detail -->
  <div class="px-4 pb-3">
    <div class="flex items-start gap-3">
      <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <span class="material-symbols-outlined text-primary text-2xl">restaurant</span>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <h3 class="font-bold text-base">Phở Thìn Bờ Hồ</h3>
          <span class="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">4.5 ★</span>
        </div>
        <p class="text-xs text-slate-500 mt-0.5">🍜 Quán ăn · 1.2 km · Đang mở cửa</p>
        <p class="text-xs text-slate-400 mt-1">61 Lò Đúc, Hai Bà Trưng, Hà Nội</p>
        <!-- Tags from AI analysis -->
        <div class="flex gap-1.5 mt-2">
          <span class="px-2 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-medium rounded-full">❤️ Em thích</span>
          <span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-full">🅿️ Có chỗ đỗ xe</span>
          <span class="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-medium rounded-full">💰 Bình dân</span>
        </div>
      </div>
    </div>
    <!-- Action buttons row -->
    <div class="flex gap-2 mt-4">
      <button class="flex-1 py-3 bg-gradient-to-r from-primary to-pink-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
        <span class="material-symbols-outlined text-sm">directions</span> Dẫn đường
      </button>
      <button class="py-3 px-4 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl flex items-center justify-center gap-1">
        <span class="material-symbols-outlined text-sm">bookmark_add</span> Lưu
      </button>
      <button class="py-3 px-4 bg-slate-50 text-slate-600 font-bold text-sm rounded-xl flex items-center justify-center gap-1">
        <span class="material-symbols-outlined text-sm">share</span>
      </button>
    </div>
  </div>

  <!-- Divider -->
  <div class="border-t border-slate-100"></div>

  <!-- Nearby suggestions list -->
  <div class="px-4 py-3">
    <h4 class="text-sm font-bold mb-3">Gợi ý gần đây cho bạn</h4>

    <div class="space-y-3">
      <!-- Item 1 -->
      <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-amber-600">local_cafe</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">The Coffee House - Trần Hưng Đạo</p>
          <p class="text-[10px] text-slate-400">☕ Cà phê · 0.8 km · 4.3 ★</p>
        </div>
        <span class="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
      </div>

      <!-- Item 2 -->
      <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-emerald-600">cottage</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Zen Homestay Đà Lạt</p>
          <p class="text-[10px] text-slate-400">🏡 Homestay · 2.5 km · 4.8 ★</p>
        </div>
        <span class="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
      </div>

      <!-- Item 3 -->
      <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-purple-600">attractions</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Vincom Mega Mall Royal City</p>
          <p class="text-[10px] text-slate-400">🎡 Khu vui chơi · 3.1 km · 4.2 ★</p>
        </div>
        <span class="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
      </div>
    </div>
  </div>
</div>
```

---

## Screen 10: Dẫn đường

```
Create a new mobile app screen for Navigation / Turn-by-turn Directions (Dẫn đường) for the app "MyLoveThaiHoc". This is the navigation view after tapping "Dẫn đường" from the Map screen. All text Vietnamese.

## DESIGN SYSTEM (same)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## NO bottom tab navigation (this is a full-screen navigation overlay)

---

## SCREEN LAYOUT

### Full-Screen Map with Route (100vh)

<div class="relative w-full h-screen bg-gradient-to-br from-green-50 via-slate-100 to-blue-50">
  <!-- Simulated roads with route highlight -->
  <div class="absolute top-[30%] left-[10%] right-[15%] h-1.5 bg-slate-300 rounded-full"></div>
  <div class="absolute top-[30%] left-[10%] w-[40%] h-1.5 bg-blue-500 rounded-full"></div> <!-- active route -->
  <div class="absolute top-[30%] right-[15%] w-1.5 h-[40%] bg-slate-300 rounded-full"></div>
  <div class="absolute top-[30%] right-[15%] w-1.5 h-[20%] bg-blue-500 rounded-full"></div> <!-- active route -->

  <!-- Route dots -->
  <div class="absolute top-[28%] left-[10%] w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow animate-ping"></div>
  <div class="absolute top-[68%] right-[14%] w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
    <span class="material-symbols-outlined text-white text-[10px]">flag</span>
  </div>

  <!-- Top: Navigation instruction card -->
  <div class="absolute top-0 left-0 right-0 p-4 pt-12 bg-gradient-to-b from-white/95 to-transparent">
    <div class="bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4">
      <!-- Direction icon -->
      <div class="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
        <span class="material-symbols-outlined text-white text-3xl">turn_right</span>
      </div>
      <div class="flex-1">
        <p class="text-lg font-bold">Rẽ phải</p>
        <p class="text-sm text-slate-500">vào đường Trần Hưng Đạo</p>
        <p class="text-xs text-blue-500 font-bold mt-1">trong 200m</p>
      </div>
      <!-- Close button -->
      <button class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
        <span class="material-symbols-outlined text-slate-500">close</span>
      </button>
    </div>
  </div>

  <!-- Bottom: Trip info panel -->
  <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-8">
    <!-- Handle -->
    <div class="flex justify-center pt-3 pb-2">
      <div class="w-10 h-1 bg-slate-200 rounded-full"></div>
    </div>

    <!-- Destination info -->
    <div class="px-4 pb-3 flex items-center gap-3">
      <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
        <span class="material-symbols-outlined text-primary text-xl">restaurant</span>
      </div>
      <div class="flex-1">
        <p class="font-bold text-sm">Phở Thìn Bờ Hồ</p>
        <p class="text-xs text-slate-400">61 Lò Đúc, Hai Bà Trưng, Hà Nội</p>
      </div>
    </div>

    <!-- Trip stats row -->
    <div class="flex justify-around px-4 py-3 mx-4 bg-slate-50 rounded-xl">
      <div class="text-center">
        <p class="text-lg font-bold text-blue-600">12 phút</p>
        <p class="text-[10px] text-slate-400">Thời gian</p>
      </div>
      <div class="w-px bg-slate-200"></div>
      <div class="text-center">
        <p class="text-lg font-bold text-slate-800">3.2 km</p>
        <p class="text-[10px] text-slate-400">Khoảng cách</p>
      </div>
      <div class="w-px bg-slate-200"></div>
      <div class="text-center">
        <p class="text-lg font-bold text-green-500">14:42</p>
        <p class="text-[10px] text-slate-400">Đến nơi</p>
      </div>
    </div>

    <!-- Transport mode selector -->
    <div class="flex gap-2 px-4 mt-3">
      <button class="flex-1 py-2.5 bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
        <span class="material-symbols-outlined text-sm">directions_car</span> Ô tô
      </button>
      <button class="flex-1 py-2.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5">
        <span class="material-symbols-outlined text-sm">two_wheeler</span> Xe máy
      </button>
      <button class="flex-1 py-2.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5">
        <span class="material-symbols-outlined text-sm">directions_walk</span> Đi bộ
      </button>
    </div>

    <!-- Action buttons -->
    <div class="flex gap-2 px-4 mt-3">
      <button class="flex-1 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
        <span class="material-symbols-outlined text-sm">navigation</span> Bắt đầu
      </button>
      <button class="py-3.5 px-4 bg-primary/10 text-primary font-bold text-sm rounded-xl flex items-center justify-center gap-1">
        <span class="material-symbols-outlined text-sm">share</span> Chia sẻ
      </button>
    </div>
  </div>
</div>
```

---

## Screen 11: Album ảnh hẹn hò

```
Create a new mobile app screen for Dating Photo Album (Album ảnh hẹn hò) for the app "MyLoveThaiHoc". This stores and displays dating photos organized by date/event. All text Vietnamese. Do NOT use any real stock photo URLs — use only colored placeholder boxes with icons.

## DESIGN SYSTEM (same)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## NAVIGATION

Sub-screen with:
- Header: back arrow + "Album ảnh" title + camera icon button (add photo)
- NO bottom tab bar

---

## SCREEN LAYOUT

### Header Stats Bar

Below the header, a horizontal stats row:

<div class="flex justify-around py-3 mx-4 bg-white rounded-xl border border-primary/5 shadow-sm">
  <div class="text-center">
    <p class="text-lg font-bold text-primary">128</p>
    <p class="text-[10px] text-slate-400">Tổng ảnh</p>
  </div>
  <div class="w-px bg-slate-100"></div>
  <div class="text-center">
    <p class="text-lg font-bold text-purple-500">12</p>
    <p class="text-[10px] text-slate-400">Sự kiện</p>
  </div>
  <div class="w-px bg-slate-100"></div>
  <div class="text-center">
    <p class="text-lg font-bold text-amber-500">5</p>
    <p class="text-[10px] text-slate-400">Tháng</p>
  </div>
</div>

### Filter Tabs

<div class="flex gap-2 px-4 mt-4 overflow-x-auto hide-scrollbar">
  <button class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full whitespace-nowrap">Tất cả</button>
  <button class="px-4 py-2 bg-white text-slate-600 text-xs font-medium rounded-full border border-slate-200 whitespace-nowrap">Hẹn hò</button>
  <button class="px-4 py-2 bg-white text-slate-600 text-xs font-medium rounded-full border border-slate-200 whitespace-nowrap">Du lịch</button>
  <button class="px-4 py-2 bg-white text-slate-600 text-xs font-medium rounded-full border border-slate-200 whitespace-nowrap">Kỷ niệm</button>
  <button class="px-4 py-2 bg-white text-slate-600 text-xs font-medium rounded-full border border-slate-200 whitespace-nowrap">Yêu thích</button>
</div>

### Photo Groups (organized by date/event)

#### Group 1: "Hẹn hò Phố Cổ — 12/03/2026"

<div class="px-4 mt-5">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h3 class="font-bold text-sm">Hẹn hò Phố Cổ</h3>
      <p class="text-[10px] text-slate-400">12 tháng 3, 2026 · 8 ảnh</p>
    </div>
    <span class="px-2 py-0.5 bg-pink-50 text-pink-500 text-[10px] font-bold rounded-full">❤️ Hẹn hò</span>
  </div>
  <!-- Photo grid: 3 columns, mixed sizes -->
  <div class="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
    <!-- Large photo spans 2 cols, 2 rows -->
    <div class="col-span-2 row-span-2 bg-rose-100 rounded-lg flex items-center justify-center aspect-square">
      <div class="text-center">
        <span class="material-symbols-outlined text-rose-300 text-4xl">photo_camera</span>
        <p class="text-[9px] text-rose-300 mt-1">IMG_001.jpg</p>
      </div>
    </div>
    <div class="bg-pink-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-pink-300 text-2xl">image</span>
    </div>
    <div class="bg-purple-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-purple-300 text-2xl">image</span>
    </div>
    <div class="bg-amber-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-amber-300 text-2xl">image</span>
    </div>
    <div class="bg-blue-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-blue-300 text-2xl">image</span>
    </div>
    <!-- "+3 more" overlay on last photo -->
    <div class="bg-slate-800/60 rounded-lg flex items-center justify-center aspect-square relative">
      <div class="bg-slate-200 rounded-lg absolute inset-0 flex items-center justify-center">
        <span class="material-symbols-outlined text-slate-300 text-2xl">image</span>
      </div>
      <div class="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-lg">+3</span>
      </div>
    </div>
  </div>
</div>

#### Group 2: "Du lịch Đà Lạt — 02/03/2026"

<div class="px-4 mt-6">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h3 class="font-bold text-sm">Du lịch Đà Lạt</h3>
      <p class="text-[10px] text-slate-400">02 tháng 3, 2026 · 24 ảnh</p>
    </div>
    <span class="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">🌿 Du lịch</span>
  </div>
  <div class="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
    <div class="bg-green-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-green-300 text-2xl">landscape</span>
    </div>
    <div class="bg-emerald-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-emerald-300 text-2xl">image</span>
    </div>
    <div class="bg-teal-100 rounded-lg flex items-center justify-center aspect-square relative">
      <div class="bg-teal-100 rounded-lg absolute inset-0 flex items-center justify-center">
        <span class="material-symbols-outlined text-teal-300 text-2xl">image</span>
      </div>
      <div class="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-sm">+21</span>
      </div>
    </div>
  </div>
</div>

#### Group 3: "Kỷ niệm 1 năm — 14/02/2026"

<div class="px-4 mt-6">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h3 class="font-bold text-sm">Kỷ niệm 1 năm yêu nhau</h3>
      <p class="text-[10px] text-slate-400">14 tháng 2, 2026 · 15 ảnh</p>
    </div>
    <span class="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-full">💕 Kỷ niệm</span>
  </div>
  <div class="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
    <div class="bg-purple-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-purple-300 text-2xl">favorite</span>
    </div>
    <div class="bg-pink-100 rounded-lg flex items-center justify-center aspect-square">
      <span class="material-symbols-outlined text-pink-300 text-2xl">image</span>
    </div>
    <div class="bg-rose-100 rounded-lg flex items-center justify-center aspect-square relative">
      <div class="bg-rose-100 absolute inset-0 rounded-lg flex items-center justify-center">
        <span class="material-symbols-outlined text-rose-300 text-2xl">image</span>
      </div>
      <div class="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-sm">+12</span>
      </div>
    </div>
  </div>
</div>

### Floating Add Button (bottom-right)

<button class="fixed bottom-8 right-6 w-14 h-14 bg-gradient-to-r from-primary to-pink-500 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center text-white">
  <span class="material-symbols-outlined text-2xl">add_a_photo</span>
</button>
```

---

## Screen 12: Đếm ngày yêu nhau

```
Create a new mobile app screen for Love Day Counter (Đếm ngày yêu nhau) for the app "MyLoveThaiHoc". This is an emotional, visually rich screen showing how long the couple has been together. All text Vietnamese. NO stock photos.

## DESIGN SYSTEM (same)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## NAVIGATION

Sub-screen: back arrow + "Đếm ngày yêu" title + share icon
NO bottom tab bar

---

## SCREEN LAYOUT (full-screen emotional design)

### Hero Section (gradient background, takes 60% of screen)

<div class="relative bg-gradient-to-b from-rose-500 via-pink-500 to-purple-600 min-h-[60vh] flex flex-col items-center justify-center text-white overflow-hidden px-6">
  <!-- Decorative elements -->
  <div class="absolute top-10 left-6 w-20 h-20 bg-white/5 rounded-full"></div>
  <div class="absolute top-24 right-8 w-12 h-12 bg-white/10 rounded-full"></div>
  <div class="absolute bottom-20 left-12 w-16 h-16 bg-white/5 rounded-full"></div>
  <div class="absolute bottom-32 right-16 w-8 h-8 bg-white/10 rounded-full"></div>

  <!-- Floating hearts (scattered, different sizes) -->
  <div class="absolute top-16 left-1/4 text-white/20 text-2xl animate-bounce" style="animation-delay: 0s">♥</div>
  <div class="absolute top-32 right-1/4 text-white/15 text-lg animate-bounce" style="animation-delay: 0.5s">♥</div>
  <div class="absolute bottom-24 left-1/3 text-white/10 text-3xl animate-bounce" style="animation-delay: 1s">♥</div>

  <!-- Couple avatars -->
  <div class="flex items-center gap-3 mb-6">
    <div class="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center">
      <span class="text-2xl font-bold">A</span>
    </div>
    <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
      <span class="material-symbols-outlined text-white text-lg" style="font-variation-settings: 'FILL' 1">favorite</span>
    </div>
    <div class="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center">
      <span class="text-2xl font-bold">H</span>
    </div>
  </div>

  <!-- Main counter -->
  <p class="text-white/70 text-sm font-medium mb-2">Chúng mình đã bên nhau</p>
  <div class="flex items-baseline gap-2">
    <span class="text-7xl font-bold tracking-tight" style="text-shadow: 0 4px 20px rgba(0,0,0,0.2)">365</span>
    <span class="text-2xl font-bold text-white/80">ngày</span>
  </div>
  <p class="text-white/60 text-sm mt-2">kể từ 14/03/2025</p>

  <!-- Sub-counter breakdown -->
  <div class="flex gap-6 mt-6 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
    <div class="text-center">
      <p class="text-2xl font-bold">1</p>
      <p class="text-[10px] text-white/70">Năm</p>
    </div>
    <div class="w-px bg-white/20"></div>
    <div class="text-center">
      <p class="text-2xl font-bold">0</p>
      <p class="text-[10px] text-white/70">Tháng</p>
    </div>
    <div class="w-px bg-white/20"></div>
    <div class="text-center">
      <p class="text-2xl font-bold">0</p>
      <p class="text-[10px] text-white/70">Ngày</p>
    </div>
    <div class="w-px bg-white/20"></div>
    <div class="text-center">
      <p class="text-2xl font-bold">8760</p>
      <p class="text-[10px] text-white/70">Giờ</p>
    </div>
  </div>
</div>

### Milestones Section (white card, overlapping hero)

<div class="bg-white rounded-t-3xl -mt-6 relative z-10 p-6">
  <h3 class="font-bold text-base mb-4">Cột mốc quan trọng</h3>

  <!-- Timeline milestones -->
  <div class="space-y-0 ml-3 border-l-2 border-primary/20 pl-6 relative">
    <!-- Milestone 1: Achieved -->
    <div class="pb-6 relative">
      <div class="absolute -left-[31px] top-0 w-5 h-5 bg-primary rounded-full border-2 border-white flex items-center justify-center">
        <span class="material-symbols-outlined text-white text-[10px]">check</span>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <p class="font-bold text-sm">100 ngày yêu nhau</p>
          <p class="text-[10px] text-slate-400">22/06/2025 · Đã đạt ✨</p>
        </div>
        <span class="text-lg">🎉</span>
      </div>
    </div>

    <!-- Milestone 2: Achieved -->
    <div class="pb-6 relative">
      <div class="absolute -left-[31px] top-0 w-5 h-5 bg-primary rounded-full border-2 border-white flex items-center justify-center">
        <span class="material-symbols-outlined text-white text-[10px]">check</span>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <p class="font-bold text-sm">365 ngày — 1 năm!</p>
          <p class="text-[10px] text-slate-400">14/03/2026 · Hôm nay 🎂</p>
        </div>
        <span class="text-lg">💕</span>
      </div>
    </div>

    <!-- Milestone 3: Upcoming -->
    <div class="pb-6 relative">
      <div class="absolute -left-[31px] top-0 w-5 h-5 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center">
        <span class="material-symbols-outlined text-slate-400 text-[10px]">schedule</span>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold text-sm text-slate-400">500 ngày</p>
          <p class="text-[10px] text-slate-300">26/07/2026 · Còn 135 ngày</p>
        </div>
        <span class="text-lg opacity-40">🌟</span>
      </div>
    </div>

    <!-- Milestone 4: Upcoming -->
    <div class="relative">
      <div class="absolute -left-[31px] top-0 w-5 h-5 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center">
        <span class="material-symbols-outlined text-slate-400 text-[10px]">schedule</span>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold text-sm text-slate-400">1000 ngày</p>
          <p class="text-[10px] text-slate-300">08/12/2027 · Còn 635 ngày</p>
        </div>
        <span class="text-lg opacity-40">👑</span>
      </div>
    </div>
  </div>

  <!-- Share / Set wallpaper buttons -->
  <div class="flex gap-3 mt-6">
    <button class="flex-1 py-3 bg-gradient-to-r from-primary to-pink-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
      <span class="material-symbols-outlined text-sm">share</span> Chia sẻ
    </button>
    <button class="flex-1 py-3 bg-purple-50 text-purple-600 font-bold text-sm rounded-xl flex items-center justify-center gap-2">
      <span class="material-symbols-outlined text-sm">wallpaper</span> Đặt hình nền
    </button>
  </div>
</div>
```

---

## Screen 13: Insight 360°

```
Create a new mobile app screen for Insight 360° (Neuron Map) for the app "MyLoveThaiHoc". This visualizes all knowledge about the lover as a neuron/mind-map style diagram with the lover's name at the center. All text Vietnamese. NO stock photos.

## DESIGN SYSTEM (same)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## NAVIGATION

Sub-screen: back arrow + "Insight 360°" title + filter icon
NO bottom tab bar

---

## SCREEN LAYOUT

### Top Summary Bar

<div class="px-4 py-3 flex items-center gap-3">
  <div class="flex-1 flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-xl px-3 py-2">
    <span class="material-symbols-outlined text-purple-500 text-sm">psychology</span>
    <p class="text-xs text-purple-700"><span class="font-bold">56 ghi chú</span> · 11 danh mục · 5 cảm xúc</p>
  </div>
</div>

### NEURON MAP (the main visual — takes ~60% of screen)

This is the core visualization. Create a neuron/mind-map style diagram using CSS absolute positioning:

<div class="relative mx-4 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" style="height: 380px">
  <!-- Subtle grid background -->
  <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle, #f43e5c 1px, transparent 1px); background-size: 20px 20px"></div>

  <!-- CONNECTION LINES (SVG lines between nodes) -->
  <svg class="absolute inset-0 w-full h-full" style="z-index: 0">
    <!-- Center to Food -->
    <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#f43e5c" stroke-width="2" opacity="0.3"/>
    <!-- Center to Place -->
    <line x1="50%" y1="50%" x2="78%" y2="22%" stroke="#3b82f6" stroke-width="2" opacity="0.3"/>
    <!-- Center to Hobby -->
    <line x1="50%" y1="50%" x2="18%" y2="55%" stroke="#ec4899" stroke-width="1.5" opacity="0.25"/>
    <!-- Center to Allergy -->
    <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#ef4444" stroke-width="2" opacity="0.3"/>
    <!-- Center to Music -->
    <line x1="50%" y1="50%" x2="30%" y2="82%" stroke="#6366f1" stroke-width="1.5" opacity="0.25"/>
    <!-- Center to Trait -->
    <line x1="50%" y1="50%" x2="72%" y2="78%" stroke="#f59e0b" stroke-width="1.5" opacity="0.25"/>
    <!-- Center to Gift -->
    <line x1="50%" y1="50%" x2="15%" y2="35%" stroke="#8b5cf6" stroke-width="1" opacity="0.2"/>
    <!-- Center to Movie -->
    <line x1="50%" y1="50%" x2="85%" y2="72%" stroke="#10b981" stroke-width="1" opacity="0.2"/>

    <!-- Sub-connections: Food to sub-items -->
    <line x1="25%" y1="20%" x2="12%" y2="8%" stroke="#f43e5c" stroke-width="1" opacity="0.15"/>
    <line x1="25%" y1="20%" x2="35%" y2="6%" stroke="#f43e5c" stroke-width="1" opacity="0.15"/>
  </svg>

  <!-- CENTER NODE: Thái Hoc -->
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
    <div class="w-20 h-20 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center shadow-xl shadow-primary/30 border-3 border-white">
      <div class="text-center text-white">
        <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1">favorite</span>
        <p class="text-[9px] font-bold mt-[-2px]">Thái Hoc</p>
      </div>
    </div>
    <!-- Pulse ring -->
    <div class="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary/20 animate-ping"></div>
  </div>

  <!-- CATEGORY NODES (positioned around center) -->

  <!-- Food node (top-left, LARGE because 24 entries) -->
  <div class="absolute top-[14%] left-[18%] z-10">
    <div class="w-16 h-16 bg-orange-100 border-2 border-orange-300 rounded-full flex flex-col items-center justify-center shadow-md">
      <span class="material-symbols-outlined text-orange-500 text-lg">restaurant</span>
      <span class="text-[8px] font-bold text-orange-600">24</span>
    </div>
    <p class="text-center text-[9px] font-bold mt-1 text-slate-600">Món ăn</p>
  </div>

  <!-- Sub-nodes of Food -->
  <div class="absolute top-[3%] left-[5%] z-10">
    <div class="px-2 py-1 bg-orange-50 border border-orange-200 rounded-full">
      <span class="text-[8px] font-medium text-orange-600">🥰 Phở bò</span>
    </div>
  </div>
  <div class="absolute top-[2%] left-[28%] z-10">
    <div class="px-2 py-1 bg-red-50 border border-red-200 rounded-full">
      <span class="text-[8px] font-medium text-red-600">🚫 Mắm tôm</span>
    </div>
  </div>

  <!-- Place node (top-right) -->
  <div class="absolute top-[16%] right-[15%] z-10">
    <div class="w-12 h-12 bg-blue-100 border-2 border-blue-300 rounded-full flex flex-col items-center justify-center shadow-md">
      <span class="material-symbols-outlined text-blue-500 text-sm">location_on</span>
      <span class="text-[8px] font-bold text-blue-600">8</span>
    </div>
    <p class="text-center text-[9px] font-bold mt-1 text-slate-600">Địa điểm</p>
  </div>

  <!-- Hobby node (middle-left) -->
  <div class="absolute top-[48%] left-[8%] z-10">
    <div class="w-14 h-14 bg-pink-100 border-2 border-pink-300 rounded-full flex flex-col items-center justify-center shadow-md">
      <span class="material-symbols-outlined text-pink-500">palette</span>
      <span class="text-[8px] font-bold text-pink-600">15</span>
    </div>
    <p class="text-center text-[9px] font-bold mt-1 text-slate-600">Sở thích</p>
  </div>

  <!-- Allergy node (middle-right, RED border for danger) -->
  <div class="absolute top-[44%] right-[10%] z-10">
    <div class="w-13 h-13 bg-red-100 border-2 border-red-400 rounded-full flex flex-col items-center justify-center shadow-md" style="width: 52px; height: 52px">
      <span class="material-symbols-outlined text-red-500 text-sm">warning</span>
      <span class="text-[8px] font-bold text-red-600">4</span>
    </div>
    <p class="text-center text-[9px] font-bold mt-1 text-red-500">Dị ứng ⚠️</p>
  </div>

  <!-- Music node (bottom-left) -->
  <div class="absolute top-[76%] left-[22%] z-10">
    <div class="w-11 h-11 bg-indigo-100 border-2 border-indigo-300 rounded-full flex flex-col items-center justify-center shadow-sm">
      <span class="material-symbols-outlined text-indigo-500 text-sm">music_note</span>
      <span class="text-[8px] font-bold text-indigo-600">6</span>
    </div>
    <p class="text-center text-[9px] font-bold mt-1 text-slate-500">Âm nhạc</p>
  </div>

  <!-- Trait node (bottom-right) -->
  <div class="absolute top-[72%] right-[20%] z-10">
    <div class="w-11 h-11 bg-amber-100 border-2 border-amber-300 rounded-full flex flex-col items-center justify-center shadow-sm">
      <span class="material-symbols-outlined text-amber-500 text-sm">psychology</span>
      <span class="text-[8px] font-bold text-amber-600">7</span>
    </div>
    <p class="text-center text-[9px] font-bold mt-1 text-slate-500">Tính cách</p>
  </div>

  <!-- Gift node (far left) -->
  <div class="absolute top-[30%] left-[5%] z-10">
    <div class="w-10 h-10 bg-purple-100 border border-purple-300 rounded-full flex items-center justify-center shadow-sm">
      <span class="material-symbols-outlined text-purple-500 text-sm">redeem</span>
    </div>
  </div>

  <!-- Movie node (far right bottom) -->
  <div class="absolute top-[66%] right-[7%] z-10">
    <div class="w-10 h-10 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center shadow-sm">
      <span class="material-symbols-outlined text-emerald-500 text-sm">movie</span>
    </div>
  </div>
</div>

### Sentiment Breakdown (below the map)

<div class="px-4 mt-4">
  <h3 class="font-bold text-sm mb-3">Phân tích cảm xúc</h3>
  <div class="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
    <!-- Love bar -->
    <div class="flex items-center gap-3">
      <span class="text-lg">🥰</span>
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold">Yêu thích</span>
          <span class="text-xs text-slate-400">28 (50%)</span>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-primary to-pink-400 rounded-full" style="width: 50%"></div>
        </div>
      </div>
    </div>
    <!-- Like bar -->
    <div class="flex items-center gap-3">
      <span class="text-lg">👍</span>
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold">Thích</span>
          <span class="text-xs text-slate-400">14 (25%)</span>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-blue-400 rounded-full" style="width: 25%"></div>
        </div>
      </div>
    </div>
    <!-- Neutral bar -->
    <div class="flex items-center gap-3">
      <span class="text-lg">😐</span>
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold">Bình thường</span>
          <span class="text-xs text-slate-400">6 (11%)</span>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-amber-400 rounded-full" style="width: 11%"></div>
        </div>
      </div>
    </div>
    <!-- Hate bar -->
    <div class="flex items-center gap-3">
      <span class="text-lg">🚫</span>
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold">Ghét / Dị ứng</span>
          <span class="text-xs text-slate-400">8 (14%)</span>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-red-400 rounded-full" style="width: 14%"></div>
        </div>
      </div>
    </div>
  </div>
</div>

### AI Insight Summary

<div class="px-4 mt-4 mb-8">
  <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4">
    <div class="flex items-center gap-2 mb-2">
      <span class="material-symbols-outlined text-purple-500">auto_awesome</span>
      <span class="text-sm font-bold text-purple-700">AI Insight</span>
    </div>
    <p class="text-sm text-slate-600 leading-relaxed">
      Thái Hoc là người <span class="font-bold text-primary">yêu ẩm thực</span> (24 ghi chú), đặc biệt thích phở bò và bún bò. Cần <span class="font-bold text-red-500">lưu ý dị ứng tôm và phấn hoa</span>. Em thích đi <span class="font-bold text-blue-500">Đà Lạt</span>, yêu phim Ghibli và nghe Vũ Cát Tường. Gợi ý: Hẹn hò quán cafe yên tĩnh có view đẹp 🌸
    </p>
  </div>
</div>
```

---

## Screen 14: Voice Note

```
Create a new mobile app screen for Voice Note (Ghi chú giọng nói) for the app "MyLoveThaiHoc". This allows quick voice recording that AI transcribes and converts to structured entries. All text Vietnamese. NO stock photos.

## DESIGN SYSTEM (same)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## NAVIGATION

Sub-screen: back arrow + "Ghi chú nhanh" title + history icon
NO bottom tab bar

---

## SCREEN LAYOUT

### Top Section — Recent Voice Notes

<div class="px-4 pt-4">
  <h3 class="font-bold text-sm mb-3">Ghi chú gần đây</h3>

  <div class="space-y-2">
    <!-- Voice note 1 -->
    <div class="bg-white rounded-xl border border-slate-100 p-3 flex items-center gap-3">
      <button class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="material-symbols-outlined text-primary text-lg">play_arrow</span>
      </button>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold truncate">Em thích quán cafe mới ở Thảo Điền...</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[10px] text-slate-400">0:23</span>
          <!-- Mini waveform -->
          <div class="flex items-end gap-0.5 h-3">
            <div class="w-0.5 bg-primary/40 rounded-full" style="height: 4px"></div>
            <div class="w-0.5 bg-primary/60 rounded-full" style="height: 8px"></div>
            <div class="w-0.5 bg-primary/40 rounded-full" style="height: 6px"></div>
            <div class="w-0.5 bg-primary/80 rounded-full" style="height: 12px"></div>
            <div class="w-0.5 bg-primary/50 rounded-full" style="height: 7px"></div>
            <div class="w-0.5 bg-primary/70 rounded-full" style="height: 10px"></div>
            <div class="w-0.5 bg-primary/40 rounded-full" style="height: 5px"></div>
            <div class="w-0.5 bg-primary/60 rounded-full" style="height: 9px"></div>
            <div class="w-0.5 bg-slate-200 rounded-full" style="height: 6px"></div>
            <div class="w-0.5 bg-slate-200 rounded-full" style="height: 4px"></div>
            <div class="w-0.5 bg-slate-200 rounded-full" style="height: 8px"></div>
            <div class="w-0.5 bg-slate-200 rounded-full" style="height: 3px"></div>
          </div>
          <span class="text-[10px] text-slate-400">Hôm nay · 2 entries</span>
        </div>
      </div>
      <span class="px-2 py-0.5 bg-green-100 text-green-600 text-[9px] font-bold rounded-full">Đã lưu</span>
    </div>

    <!-- Voice note 2 -->
    <div class="bg-white rounded-xl border border-slate-100 p-3 flex items-center gap-3">
      <button class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="material-symbols-outlined text-primary text-lg">play_arrow</span>
      </button>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold truncate">Sinh nhật em muốn được tặng...</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[10px] text-slate-400">0:45</span>
          <div class="flex items-end gap-0.5 h-3">
            <div class="w-0.5 bg-primary/50 rounded-full" style="height: 6px"></div>
            <div class="w-0.5 bg-primary/70 rounded-full" style="height: 10px"></div>
            <div class="w-0.5 bg-primary/40 rounded-full" style="height: 4px"></div>
            <div class="w-0.5 bg-primary/80 rounded-full" style="height: 12px"></div>
            <div class="w-0.5 bg-primary/50 rounded-full" style="height: 7px"></div>
          </div>
          <span class="text-[10px] text-slate-400">Hôm qua · 3 entries</span>
        </div>
      </div>
      <span class="px-2 py-0.5 bg-green-100 text-green-600 text-[9px] font-bold rounded-full">Đã lưu</span>
    </div>

    <!-- Voice note 3: pending -->
    <div class="bg-white rounded-xl border border-amber-200 p-3 flex items-center gap-3">
      <button class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="material-symbols-outlined text-amber-600 text-lg">play_arrow</span>
      </button>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold truncate">Em kể về kỷ niệm hồi nhỏ...</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[10px] text-slate-400">1:12</span>
          <span class="text-[10px] text-slate-400">2 ngày trước</span>
        </div>
      </div>
      <span class="px-2 py-0.5 bg-amber-100 text-amber-600 text-[9px] font-bold rounded-full">Chờ lưu</span>
    </div>
  </div>
</div>

### Transcription Preview (show result of latest recording)

<div class="px-4 mt-5">
  <h3 class="font-bold text-sm mb-3">Kết quả phân tích</h3>
  <div class="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
    <!-- Transcript text -->
    <div class="bg-slate-50 rounded-lg p-3">
      <p class="text-xs text-slate-400 mb-1 font-medium">Nội dung ghi âm:</p>
      <p class="text-sm text-slate-700 leading-relaxed italic">"Em thích quán cafe mới ở Thảo Điền, view sông đẹp lắm, em muốn quay lại cuối tuần này"</p>
    </div>
    <!-- AI parsed entries -->
    <p class="text-xs text-purple-600 font-bold flex items-center gap-1">
      <span class="material-symbols-outlined text-sm">auto_awesome</span>
      AI đã phân tích được 2 thông tin:
    </p>
    <div class="space-y-2">
      <div class="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border-l-3 border-blue-400">
        <span class="material-symbols-outlined text-blue-500 text-sm">location_on</span>
        <div class="flex-1">
          <p class="text-xs font-bold">Quán cafe Thảo Điền — view sông</p>
          <p class="text-[10px] text-slate-400">Địa điểm · 🥰 Yêu thích</p>
        </div>
      </div>
      <div class="flex items-center gap-2 p-2 bg-pink-50 rounded-lg border-l-3 border-pink-400">
        <span class="material-symbols-outlined text-pink-500 text-sm">calendar_today</span>
        <div class="flex-1">
          <p class="text-xs font-bold">Muốn quay lại cuối tuần</p>
          <p class="text-[10px] text-slate-400">Ngày đặc biệt · 👍 Thích</p>
        </div>
      </div>
    </div>
    <!-- Save button -->
    <button class="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
      <span class="material-symbols-outlined text-sm">save</span> Lưu 2 ghi chú
    </button>
  </div>
</div>

### Main Record Button (fixed bottom center)

<div class="fixed bottom-8 left-0 right-0 flex flex-col items-center z-20">
  <p class="text-xs text-slate-400 mb-3">Nhấn giữ để ghi âm</p>
  <button class="w-20 h-20 bg-gradient-to-br from-primary to-pink-500 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center border-4 border-white active:scale-90 transition-transform">
    <span class="material-symbols-outlined text-white text-4xl">mic</span>
  </button>
</div>
```

---

## Screen 15: Daily Reminder

```
Create a new mobile app screen for Daily Reminder (Nhắc nhở hàng ngày) for the app "MyLoveThaiHoc". This shows today's reminders, AI daily suggestions, and reminder settings. All text Vietnamese. NO stock photos.

## DESIGN SYSTEM (same)

- Primary: #f43e5c, Background: #f8f5f6
- Font: Plus Jakarta Sans, Icons: Material Symbols Outlined
- Tailwind CSS CDN, mobile max-w-md, all text Vietnamese

## NAVIGATION

Sub-screen: back arrow + "Nhắc nhở" title + settings gear icon
NO bottom tab bar

---

## SCREEN LAYOUT

### Today Header Card

<div class="mx-4 mt-4 bg-gradient-to-r from-primary to-pink-500 rounded-2xl p-5 text-white relative overflow-hidden">
  <div class="absolute -top-4 -right-4 opacity-20">
    <span class="material-symbols-outlined text-7xl" style="font-variation-settings: 'FILL' 1">notifications_active</span>
  </div>
  <p class="text-white/70 text-xs font-medium">Thứ Bảy, 14 tháng 3, 2026</p>
  <h2 class="text-xl font-bold mt-1">Chào buổi sáng! 🌅</h2>
  <p class="text-white/80 text-sm mt-1">Hôm nay có 3 nhắc nhở cho bạn</p>
</div>

### Section: Nhắc nhở hôm nay (Today's Reminders)

<div class="px-4 mt-5">
  <h3 class="font-bold text-sm mb-3 flex items-center gap-2">
    <span class="material-symbols-outlined text-primary text-lg">today</span>
    Nhắc nhở hôm nay
  </h3>

  <div class="space-y-3">
    <!-- Reminder 1: URGENT — Special date today -->
    <div class="bg-white rounded-xl border-l-4 border-primary p-4 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-primary">celebration</span>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-bold rounded-full uppercase">Hôm nay</span>
          </div>
          <p class="font-bold text-sm mt-1">Kỷ niệm 1 năm yêu nhau! 💕</p>
          <p class="text-xs text-slate-500 mt-0.5">Đừng quên tổ chức gì đặc biệt nhé</p>
          <div class="flex gap-2 mt-3">
            <button class="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">send</span> Gửi Telegram
            </button>
            <button class="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">Đã xong ✓</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reminder 2: Upcoming 3 days -->
    <div class="bg-white rounded-xl border-l-4 border-orange-400 p-4 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-orange-500">cake</span>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 bg-orange-100 text-orange-600 text-[9px] font-bold rounded-full">Còn 3 ngày</span>
          </div>
          <p class="font-bold text-sm mt-1">Sinh nhật Thái Hoc 🎂</p>
          <p class="text-xs text-slate-500 mt-0.5">17/03/2026 — Chuẩn bị quà sinh nhật</p>
          <button class="mt-2 px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">notifications</span> Nhắc lại sau
          </button>
        </div>
      </div>
    </div>

    <!-- Reminder 3: Weekly check-in -->
    <div class="bg-white rounded-xl border-l-4 border-blue-400 p-4 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-blue-500">event_repeat</span>
        </div>
        <div class="flex-1">
          <span class="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] font-bold rounded-full">Hàng tuần</span>
          <p class="font-bold text-sm mt-1">Review ghi chú tuần này</p>
          <p class="text-xs text-slate-500 mt-0.5">Kiểm tra và bổ sung thông tin mới</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Section: Gợi ý AI hôm nay

<div class="px-4 mt-5">
  <h3 class="font-bold text-sm mb-3 flex items-center gap-2">
    <span class="material-symbols-outlined text-purple-500 text-lg">auto_awesome</span>
    Gợi ý từ AI hôm nay
  </h3>

  <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-4 space-y-3">
    <div class="flex items-start gap-2">
      <span class="text-lg">🌹</span>
      <p class="text-sm text-slate-700">Hôm nay là ngày kỷ niệm — <span class="font-bold">mua hoa hồng trắng</span> (em thích loại này!)</p>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-lg">🍜</span>
      <p class="text-sm text-slate-700">Rủ em ăn <span class="font-bold">phở bò Lý Quốc Sư</span> — quán em thích nhất</p>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-lg">☕</span>
      <p class="text-sm text-slate-700">Chiều nay ghé <span class="font-bold">The Coffee House Trần Hưng Đạo</span> — gần chỗ em làm</p>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-lg">💌</span>
      <p class="text-sm text-slate-700">Viết cho em một <span class="font-bold">lời nhắn ngọt ngào</span> gửi qua Telegram nhé</p>
    </div>

    <button class="w-full py-2.5 bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 mt-2 shadow-md shadow-purple-200">
      <span class="material-symbols-outlined text-sm">send</span> Gửi gợi ý qua Telegram
    </button>
  </div>
</div>

### Section: Cài đặt nhắc nhở

<div class="px-4 mt-5 mb-8">
  <h3 class="font-bold text-sm mb-3 flex items-center gap-2">
    <span class="material-symbols-outlined text-slate-500 text-lg">tune</span>
    Cài đặt nhắc nhở
  </h3>

  <div class="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50">
    <!-- Time setting -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-amber-500">schedule</span>
        <div>
          <p class="text-sm font-semibold">Giờ nhắc nhở</p>
          <p class="text-[10px] text-slate-400">Gửi nhắc nhở mỗi sáng</p>
        </div>
      </div>
      <span class="text-sm font-bold text-primary">08:00</span>
    </div>
    <!-- Channel -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-blue-500">send</span>
        <div>
          <p class="text-sm font-semibold">Kênh thông báo</p>
          <p class="text-[10px] text-slate-400">Nơi nhận nhắc nhở</p>
        </div>
      </div>
      <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">Push + Telegram</span>
    </div>
    <!-- AI suggestion toggle -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-purple-500">auto_awesome</span>
        <div>
          <p class="text-sm font-semibold">Gợi ý AI tự động</p>
          <p class="text-[10px] text-slate-400">AI phân tích và gợi ý mỗi ngày</p>
        </div>
      </div>
      <div class="w-11 h-6 bg-primary rounded-full relative flex-shrink-0">
        <div class="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
      </div>
    </div>
    <!-- Quiet hours -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-slate-400">do_not_disturb_on</span>
        <div>
          <p class="text-sm font-semibold">Giờ yên tĩnh</p>
          <p class="text-[10px] text-slate-400">Không gửi thông báo</p>
        </div>
      </div>
      <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">22:00 — 07:00</span>
    </div>
  </div>
</div>
```

---

## Ghi chú chung

### Thứ tự paste vào Stitch:

**Auth flow (không có bottom nav):**
1. Screen 6: Login
2. Screen 7: Register
3. Screen 8: Forgot Password

**5 Tab chính (có bottom nav thống nhất):**
4. Screen 1: Dashboard — chỉnh sửa
5. Screen 2: Add Entry — chỉnh sửa
6. Screen 3: AI Chat — chỉnh sửa (voice chat + history)
7. Screen 4: Calendar — chỉnh sửa
8. Screen 5: Settings — rebuild hoàn toàn

**Sub-screens (không có bottom nav, có back arrow):**
9. Screen 9: Bản đồ hẹn hò (eKMap)
10. Screen 10: Dẫn đường (Navigation)
11. Screen 11: Album ảnh hẹn hò
12. Screen 12: Đếm ngày yêu nhau
13. Screen 13: Insight 360° (Neuron Map)
14. Screen 14: Voice Note
15. Screen 15: Daily Reminder

### Key point cho mỗi prompt:
- **5 tab chính**: Bottom nav thống nhất 5 tabs (Trang chủ, Thêm, AI Chat, Lịch, Cài đặt)
- **Auth screens**: KHÔNG có bottom nav
- **Sub-screens**: KHÔNG có bottom nav, có back arrow
- Mọi screen **KHÔNG dùng ảnh stock** — chỉ dùng Material Icons + emoji + colored placeholders
- Tất cả text **tiếng Việt**
