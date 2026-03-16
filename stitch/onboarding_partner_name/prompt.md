# Stitch Prompt: Onboarding - Tên người yêu

## Prompt cho Google Stitch

```
Màn hình Onboarding Step 2 - Nhập tên người yêu cho app MyLoveThaiHoc.

Layout: Mobile iOS (375px)
Font: Plus Jakarta Sans

Header (25vh):
- Gradient background rose-500 → purple-600 (chéo)
- Decorative circles trắng mờ (10-15% opacity) ở góc
- Back button: trắng/20% opacity, backdrop-blur, rounded-full, icon arrow_back
- Icon giữa: person_heart (48px, trắng) trong box trắng/20% rounded-2xl backdrop-blur
- Title: "Người ấy là ai?" (text-2xl, font-bold, trắng)

Form Card:
- Card trắng rounded-t-[32px], -mt-6, shadow-xl, px-6 pt-8 pb-10
- Subtitle: "Cho mình biết tên người yêu của bạn nhé" (text-sm, slate-500)

Form fields (space-y-5):
1. "Tên người yêu" (required)
   - Label: text-sm font-semibold slate-700
   - Input: icon person trái, placeholder "Ví dụ: Thái Hoc", bg-slate-50 border-slate-200 rounded-xl py-3

2. "Biệt danh / Tên gọi thân mật" (optional)
   - Label: text-sm font-semibold slate-700, badge "Không bắt buộc" nhỏ
   - Input: icon favorite trái, placeholder "Ví dụ: Bé Hoc, Honey...", bg-slate-50 border-slate-200 rounded-xl py-3

Hint text dưới form:
- Icon lightbulb nhỏ + "Biệt danh sẽ hiển thị trên trang chủ" (text-xs, slate-400)

Bottom section:
- Nút "Tiếp tục" - full width, gradient rose→pink, rounded-2xl, shadow-lg, py-4
- Progress dots: 5 dots, dot 1+2 active (rose-500), còn lại slate-200
- Spacing: mb-8 từ button đến dots

Style: Clean, friendly, romantic accent. Input focus state: border-primary + shadow ring rose/20%
```
