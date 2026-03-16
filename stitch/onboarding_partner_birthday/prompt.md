# Stitch Prompt: Onboarding - Sinh nhật người yêu

## Prompt cho Google Stitch

```
Màn hình Onboarding Step 3 - Nhập ngày sinh người yêu cho app MyLoveThaiHoc.

Layout: Mobile iOS (375px)
Font: Plus Jakarta Sans

Header (25vh):
- Gradient background rose-500 → purple-600 (chéo)
- Decorative circles trắng mờ
- Back button: trắng/20%, backdrop-blur, rounded-full
- Icon giữa: cake (48px, trắng) trong box trắng/20% rounded-2xl backdrop-blur
- Title: "Sinh nhật người ấy" (text-2xl, font-bold, trắng)

Form Card:
- Card trắng rounded-t-[32px], -mt-6, shadow-xl, px-6 pt-8 pb-10
- Subtitle: "Để mình nhắc bạn chuẩn bị quà nhé 🎁" (text-sm, slate-500)

Date Picker Section:
- 3 dropdown/selector boxes ngang (flex gap-3):
  1. Ngày (01-31) - w-1/4, bg-slate-50 border-slate-200 rounded-xl, py-3, text-center
  2. Tháng (01-12) - flex-1, bg-slate-50 border-slate-200 rounded-xl, py-3, text-center
  3. Năm (1990-2010) - w-1/3, bg-slate-50 border-slate-200 rounded-xl, py-3, text-center
- Icon calendar_month ở trên mỗi selector (text-primary, text-sm)

Zodiac Preview Card (mt-6):
- Card nhỏ bg-rose-50 border border-rose-100 rounded-2xl p-4
- Row: emoji cung hoàng đạo lớn (32px) + tên cung + đặc điểm ngắn
- Ví dụ: "♌ Sư Tử — Tự tin, nhiệt huyết, trung thành"
- Text: slate-700 font-semibold cho tên, slate-500 text-sm cho đặc điểm

Checkbox (mt-4):
- "Không biết ngày sinh chính xác" — text-sm slate-500, checkbox rose-500
- Khi check: ẩn date picker, hiện text "Bạn có thể cập nhật sau trong Cài đặt"

Bottom section:
- Nút "Tiếp tục" - full width, gradient rose→pink, rounded-2xl, shadow-lg, py-4
- Link "Bỏ qua" dưới nút (text-sm, slate-400, text-center)
- Progress dots: 5 dots, dots 1-3 active (rose-500)

Style: Playful, light. Date selector giống iOS wheel picker style nhưng flat.
```
