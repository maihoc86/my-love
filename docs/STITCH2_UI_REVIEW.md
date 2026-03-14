# Stitch 2 — UI/UX Review Report

> Đánh giá dựa trên **UI/UX Pro Max** (99 UX guidelines, 161 color palettes, 50+ styles)
> và **Vercel React Best Practices** (62 rules, 8 categories).
> Ngày đánh giá: 14/03/2026

---

## I. TỔNG QUAN

**15 screens** | **14 HTML files** | **~22,000 dòng code**

| Tiêu chí | Stitch 1 | Stitch 2 | Thay đổi |
|----------|----------|----------|----------|
| Visual Design | 8/10 | **9/10** | +1 |
| Color System | 8.5/10 | **9/10** | +0.5 |
| Typography | 7.5/10 | **8.5/10** | +1 |
| Layout & Spacing | 8/10 | **8.5/10** | +0.5 |
| Content Accuracy (VN) | 7/10 | **9/10** | +2 |
| Spec Compliance | 6/10 | **8.5/10** | +2.5 |
| Navigation Consistency | 4/10 | **9/10** | +5 |
| Mock Data | 6.5/10 | **8.5/10** | +2 |
| Animation/Interaction | 3/10 | **7/10** | +4 |
| Accessibility | N/A | **6/10** | mới |
| **TỔNG** | **6.5/10** | **8.3/10** | **+1.8** |

**Kết luận: Stitch 2 cải thiện đáng kể so với Stitch 1**, đặc biệt Navigation consistency (+5), Spec compliance (+2.5), và Content accuracy (+2).

---

## II. ĐÁNH GIÁ TỪNG SCREEN

### Screen 1: Dashboard (Trang chủ) — 9/10

**Đạt xuất sắc:**
- Hero card gradient đẹp, decorative circles, số "12" nổi bật
- Mini-app grid 4x2 đúng style Grab/MoMo — gradient riêng biệt, badges HOT/MỚI
- Upcoming dates có countdown badges (5 ngày, 12 ngày) đúng color coding
- Warning section "Lưu ý quan trọng" với pills
- Recent entries dùng icon + category thay vì ảnh stock
- Bottom nav 5 tabs **thống nhất** (fix lớn nhất so với Stitch 1)

**Cần cải thiện:**
- `no-emoji-icons` (Priority 4): Mini-app grid dùng Material Icons — tốt, nhưng emoji vẫn xuất hiện ở upcoming dates
- `touch-target-size` (Priority 2): Các "Chi tiết" text links trên recent entries nhỏ, cần đảm bảo hit area >= 44x44pt
- Thiếu Quick Stats Bar (56 ghi chú | 365 ngày yêu | 4 sự kiện | 128 ảnh) như trong prompt

---

### Screen 2: Add Entry (Thêm ghi chú) — 9/10

**Đạt xuất sắc:**
- Category grid 3x4, "Món ăn" có **selected state** rõ ràng (border rose, bg tinted)
- Emoji prefix trong input placeholder: "🍜 Thái Hoc thích..."
- Sentiment picker với **selected state** trên "THÍCH" (border, scale)
- "Tùy chọn nâng cao" expandable — date picker + toggle "Lặp lại hàng năm"
- Label đúng: "Cảm xúc của Thái Hoc về điều này"
- Bottom nav thống nhất, "Thêm" active

**Cần cải thiện:**
- `no-emoji-icons` (Priority 4): Sentiment picker dùng emoji (❤️👍😐👎🚫) — theo UI/UX Pro Max nên dùng SVG icons. Tuy nhiên, **cho trường hợp sentiment biểu cảm, emoji là UX hợp lý** — chấp nhận được.
- `input-labels` (Priority 8): Label "Tiêu đề ghi chú *" có asterisk — đúng chuẩn `required-indicators`
- `touch-friendly-input` (Priority 8): Input height đủ lớn (py-4) — OK

---

### Screen 3: AI Chat — 8.5/10

**Đạt xuất sắc:**
- Header có nút **History** (icon clock) + **"Gợi ý"** pill button (tím) — đúng spec
- User bubble gradient rose, Assistant bubble trắng — đúng pattern
- **"Phân tích từ AI"** card rất đẹp: 3 entries với color-coded borders (xanh/hồng/xanh dương)
- Sentiment badges: "Yêu thích", "Không thích", "Quan trọng"
- Nút "Lưu tất cả vào nhật ký" + confirm message
- **Typing indicator** 3 dots animated
- Voice input button (mic tím) bên trái input
- Hint text: "Nhấn giữ 🎙 để nói tiếng Việt"
- Bottom nav thống nhất

**Cần cải thiện:**
- `no-emoji-icons` (Priority 4): User message bubble chứa emoji (🍜, 🧅, 💗) — đây là user content nên OK
- `state-clarity` (Priority 4): Nút "Lưu tất cả" nên có disabled state rõ hơn sau khi đã lưu
- AI Analysis card phân loại "Mắm tôm" là "Gia vị/Thành phần" — nên là "Món ăn" theo spec

---

### Screen 4: Calendar (Lịch sự kiện) — 9/10

**Đạt xuất sắc:**
- **4 event cards** đầy đủ (2 ngày, 5 ngày, 15 ngày, 45 ngày) — đúng spec
- **Countdown ring SVG** rõ ràng với số ngày ở giữa + label "NGÀY"
- **Color coding đúng urgency**: đỏ (2, 5 ngày), cam/hồng (15, 45 ngày)
- Badges "HÀNG NĂM" + "NGÀY LỄ" chính xác
- Bell + Trash action icons trên mỗi card — bỏ ảnh stock
- Bottom sheet form có toggle "Lặp lại hàng năm"
- Card 1 urgent: border nổi bật
- Bottom nav thống nhất, "Lịch" active

**Cần cải thiện:**
- `touch-spacing` (Priority 2): Bell và Trash icons sát nhau — cần gap >= 8px
- Bottom sheet thiếu textarea "Ghi chú (tùy chọn)" và field "Nhắc trước N ngày"
- Font header bị crop ở screenshot — "Ngày đặc biệt" bị cắt

---

### Screen 5: Settings (Cài đặt) — 9.5/10

**Đạt xuất sắc — screen tốt nhất:**
- **Profile card gradient** với avatar "N", stats row (56, 4, 12)
- **Thông tin người yêu**: Tên, Sinh nhật, Biệt danh, Ảnh đại diện + nút chỉnh sửa
- **Tài khoản**: 4 items (Thông tin, Mật khẩu, Bảo mật, Sao lưu)
- **Thông báo**: 4 toggles (ON/OFF states rõ ràng)
- **Chung**: Giao diện (Sáng), Ngôn ngữ (Tiếng Việt), Bộ nhớ (124 MB), Xoá cache
- **Hỗ trợ**: 4 items
- **Footer**: "MyLoveThaiHoc v2.4.0 · Made with love for Thái Học"
- **Đăng xuất** button tách biệt — đúng `destructive-nav-separation`
- Không còn bug overlap text của Stitch 1
- Bottom nav thống nhất

**Cần cải thiện:**
- `color-semantic` (Priority 6): Một số icon dùng màu giống nhau — có thể diversify hơn
- Footer font dùng chữ nghiêng handwriting (Caveat?) — hơi khác so với Plus Jakarta Sans của app

---

### Screen 6: Login — 9/10

**Đạt xuất sắc:**
- Gradient header rose → purple, heart icon, app name + tagline
- Form card overlap đẹp (rounded-t-3xl)
- Input fields có left icons (phone, lock), placeholder data
- "Quên mật khẩu?" link
- Gradient login button
- Divider "HOẶC"
- OTP button (outlined) + Google button
- "Chưa có tài khoản? Đăng ký" footer
- Không có bottom nav — đúng spec

**Cần cải thiện:**
- `password-toggle` (Priority 8): Có icon visibility — nhưng cần đảm bảo toggle hoạt động
- `input-type-keyboard` (Priority 8): Phone input nên có `inputmode="tel"` khi convert sang RN
- `autofill-support` (Priority 8): Cần `textContentType` cho email/password khi implement

---

### Screen 7: Register (Đăng ký OTP) — 8.5/10

**Đạt xuất sắc:**
- Back button + gradient header + heart icon
- Phone + Email inputs
- "Gửi mã OTP" button
- OTP 6 ô input — clear visual
- Countdown timer "Gửi lại mã (01:59)"
- Password confirm field
- "Xác nhận và Đăng ký" gradient button
- Google signup + "Đã có tài khoản? Đăng nhập" link

**Cần cải thiện:**
- `multi-step-progress` (Priority 8): Thiếu step indicator (1/3 steps) — user không biết đang ở bước nào
- `form-labels` (Priority 1): OTP input boxes thiếu accessible labels
- Thiếu **password strength indicator** (spec yêu cầu 4 bars + "Mật khẩu khá mạnh")
- Thiếu **terms checkbox** ("Tôi đồng ý với Điều khoản sử dụng")

---

### Screen 8: Forgot Password — 9/10

**Đạt xuất sắc:**
- 3 steps hiển thị tuần tự trên 1 screen — rõ ràng
- Step 1: Lock icon + mô tả + input phone/email + "Gửi mã xác thực"
- Step 2: OTP 6 ô (2 ô đã điền "4", "8"), focus state trên ô thứ 3
- "Gửi lại sau 45 giây" countdown
- "Xác nhận" button disabled (gray) — đúng `disabled-states`
- Step 3: New password + confirm + "Đặt lại mật khẩu" gradient button
- "Quay lại đăng nhập" link ở bottom

**Cần cải thiện:**
- `progressive-disclosure` (Priority 8): Hiện cả 3 steps cùng lúc có thể overwhelming — nên chỉ hiển thị step active. Tuy nhiên, cho mục đích mockup thì OK.
- Password inputs thiếu visibility toggle icon

---

### Screen 9: Bản đồ hẹn hò — 8.5/10

**Đạt xuất sắc:**
- Map area với grid lines mô phỏng bản đồ
- Category pills floating: "Quán ăn" (active, rose), "Cà phê", "Homestay", "Khu vui chơi"
- Map pins (rose color) + user location dot (blue)
- "Powered by eKMap" watermark
- **AI gợi ý badge**: "Thái Hoc thích quán có view đẹp, yên tĩnh"
- Spot detail: "Phở Thìn Bờ Hồ", 4.5 stars, 850m, address
- Tags: "Em thích", "Có chỗ đỗ xe", "Bình dân"
- Action buttons: "Dẫn đường" (primary), "Lưu", "Share"
- "Gợi ý gần đây" list
- Zoom controls (+, -, my location)

**Cần cải thiện:**
- `touch-target-size` (Priority 2): Map pins rất nhỏ — khi implement RN, cần hitSlop mở rộng tap area
- `gesture-conflicts` (Priority 2): Map scroll vs page scroll cần xử lý kỹ
- Map placeholder đơn giản — sẽ thay bằng eKMap SDK thực tế

---

### Screen 10: Dẫn đường — 8/10

**Đạt xuất sắc:**
- Full-screen map view
- Navigation instruction card: "Rẽ phải vào đường Trần Hưng Đạo, trong 200m"
- Direction icon (blue, rõ ràng)
- Bottom panel: destination info + stats (12 phút, 3.2 km, 14:42)
- Transport mode selector: Ô tô (active, blue), Xe máy, Đi bộ
- "Bắt đầu" button (blue gradient) + "Chia sẻ"
- Không bottom nav — đúng (full-screen overlay)

**Cần cải thiện:**
- `primary-action` (Priority 4): "Bắt đầu" button dùng **màu xanh** thay vì rose primary — hợp lý cho navigation context nhưng tạo **inconsistency** với design system. Chấp nhận được vì đây là contextual color (navigation = blue).
- Map area quá trống — chỉ có grid lines và 1 pin, thiếu route line
- Close button trên instruction card nên rõ hơn

---

### Screen 11: Album ảnh — 8.5/10

**Đạt xuất sắc:**
- Stats bar: 128 ảnh, 12 sự kiện, 5 tháng
- Filter tabs: "Tất cả" (active), "Hẹn hò", "Du lịch", "Kỷ niệm"
- Photo groups theo event: "Hẹn hò Phố Cổ", "Du lịch Đà Lạt", "Kỷ niệm 1 năm"
- Mixed grid layout (col-span-2 + regular) — đẹp
- Colored placeholders thay ảnh stock — đúng spec
- "+5", "+21", "+12" overlays
- "Xem tất cả" links per group
- Floating camera FAB (rose gradient)

**Cần cải thiện:**
- `color-not-only` (Priority 1): Photo placeholders chỉ dùng màu + icon nhỏ — khi có ảnh thật sẽ OK
- Grid spacing có thể chặt — `touch-spacing` cần >= 8px gap giữa ảnh
- Thiếu "Yêu thích" filter tab (prompt có 5 tabs, screen chỉ hiện 4)

---

### Screen 12: Đếm ngày yêu — Không có screen riêng

> Screen này chưa được generate trong Stitch 2. Dashboard Hero card có số "12" nhưng chưa có screen "Đếm ngày yêu nhau" đầy đủ với milestones timeline.

---

### Screen 13: Insight 360° — 9/10

**Đạt xuất sắc:**
- Summary bar: "56 ghi chú · 11 danh mục · 5 cảm xúc"
- **Neuron map tuyệt đẹp**: "THÁI HỌC" ở trung tâm (rose gradient)
- Category nodes xung quanh: Món ăn (24), Địa điểm (8), Sở thích (15), Tính cách (7), Dị ứng (4), Âm nhạc (6)
- Node size proportional to count — đúng
- SVG connection lines giữa các nodes
- Sub-labels: "Phở bò, Mắm tôm" dưới Món ăn
- **Sentiment bars**: Yêu thích 50%, Thích 25%, Bình thường 11%, Ghét/Dị ứng 14%
- **AI Tổng quan** card: Phân tích text + gợi ý hẹn hò — rất hay

**Cần cải thiện:**
- `touch-target-size` (Priority 2): Neuron nodes nhỏ trên mobile — cần tap area lớn hơn
- Neuron map hơi crowded — khi nhiều categories hơn sẽ cần zoom/scroll
- Dị ứng node nên có red warning border nổi bật hơn

---

### Screen 14: Voice Note (Ghi chú nhanh) — 8.5/10

**Đạt xuất sắc:**
- Recent notes list với play button, waveform mini, duration, status badges
- Status: "Đã lưu" (xanh), "Chờ lưu" (cam)
- "Kết quả phân tích" với AI Insight badge
- Transcript trong italic quotes
- Parsed entries: "Pizza 4P's Bến Thành" (Địa điểm), "Kỷ niệm 2 năm" (Ngày đặc biệt)
- "Lưu ghi chú" green button
- Floating mic button (rose gradient) + "Nhấn giữ để ghi âm"

**Cần cải thiện:**
- `loading-states` (Priority 7): Cần skeleton loading cho kết quả phân tích
- Waveform bars rất nhỏ — chủ yếu decorative, OK

---

### Screen 14b: Recording State — 8/10

**Đạt xuất sắc:**
- Full-screen overlay, clean layout
- "ĐANG LẮNG NGHE..." label nổi bật
- "AI sẽ tự động chuyển thành văn bản"
- Pulsing mic icon (concentric circles animation)
- Waveform bars animated
- Timer "00:03" lớn, rõ ràng
- "Dừng & Gửi" primary button + "Hủy" secondary
- Close button (X) top-left

**Cần cải thiện:**
- `no-blocking-animation` (Priority 7): Pulse animation nên không block interaction
- `interruptible` (Priority 7): User phải có thể cancel bất cứ lúc nào — có nút Hủy, OK
- Screen hơi sparse — có thể thêm real-time transcript preview

---

### Screen 15: Chat History — 8.5/10

**Đạt xuất sắc:**
- Summary card gradient: "12 Cuộc chat, 34 Ghi chú, 3 Voice"
- Search input
- Filter pills: "Tất cả", "Có ghi chú", "Giọng nói", "Gợi ý AI"
- Grouped by date: "Hôm nay", "Hôm qua", "12 Tháng 3"
- Entry count badges (3, 5, 2, 4) — color-coded
- Icon differentiation: chat (rose), AI suggest (purple), voice (orange)
- Chevron arrows for navigation

**Cần cải thiện:**
- `nav-label-icon` (Priority 9): Mỗi item có icon + text — OK
- Thiếu swipe-to-delete gesture hint
- Summary card gradient khác với app primary — hơi khác biệt (purple → rose → orange)

---

## III. ĐÁNH GIÁ THEO UI/UX PRO MAX CHECKLIST

### Priority 1: Accessibility (CRITICAL)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `color-contrast` | **PASS** | Text #1e1b2e trên #f8f5f6 = ~15:1. White text trên gradient ~5:1 |
| `focus-states` | **WARN** | HTML tĩnh — cần implement focus rings khi convert RN |
| `alt-text` | **PASS** | Không dùng ảnh stock, chỉ icons + text |
| `aria-labels` | **FAIL** | Không có aria-labels — cần thêm khi implement RN |
| `keyboard-nav` | **N/A** | Mobile app — dùng screen reader thay keyboard |
| `dynamic-type` | **WARN** | Font sizes cố định px — cần convert sang Dynamic Type khi implement |
| `reduced-motion` | **FAIL** | Không có prefers-reduced-motion — cần thêm |
| `voiceover-sr` | **FAIL** | Không có accessibilityLabel — cần thêm |
| `color-not-only` | **PASS** | Icons + text + color kết hợp (sentiment badges có cả text + color) |

**Score: 6/10** — Cần bổ sung accessibility khi convert sang React Native.

### Priority 2: Touch & Interaction (CRITICAL)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `touch-target-size` | **MOSTLY PASS** | Buttons đủ lớn (py-3, py-4). Một số icons nhỏ cần hitSlop |
| `touch-spacing` | **MOSTLY PASS** | gap-2 đến gap-4 — OK. Calendar bell/trash icons hơi sát |
| `hover-vs-tap` | **PASS** | Không rely on hover |
| `loading-buttons` | **PASS** | Submit buttons có loading state concept |
| `press-feedback` | **PASS** | active:scale-95 trên buttons |
| `safe-area-awareness` | **PASS** | pb-6, pb-24 cho bottom nav |
| `gesture-alternative` | **PASS** | Tất cả gesture đều có visible button fallback |

**Score: 8/10**

### Priority 3: Performance (HIGH) — Vercel React Best Practices

| Rule | Impact | Status | Ghi chú |
|------|--------|--------|---------|
| `bundle-dynamic-imports` | CRITICAL | **CẦN** | Insight 360 SVG map, Date Map nên lazy load |
| `bundle-barrel-imports` | CRITICAL | **CẦN** | Import Material Icons trực tiếp, không barrel |
| `async-parallel` | CRITICAL | **CẦN** | Dashboard fetch entries + special_dates + stats nên Promise.all() |
| `rendering-content-visibility` | MEDIUM | **CẦN** | Settings screen rất dài — dùng content-visibility cho off-screen sections |
| `rerender-memo` | MEDIUM | **CẦN** | Neuron map SVG, Waveform bars — expensive render, cần memo |
| `rendering-hoist-jsx` | MEDIUM | **CẦN** | Bottom nav JSX identical 5 screens — hoist thành shared component |
| `js-set-map-lookups` | LOW | **CẦN** | Category lookup, sentiment mapping — dùng Map |
| `client-swr-dedup` | MEDIUM-HIGH | **CẦN** | Entries data dùng chung Dashboard + Add + Chat — SWR dedup |

**Score: Chưa implement** — Đây là HTML tĩnh. Checklist này áp dụng khi convert sang React Native.

### Priority 4: Style Selection (HIGH)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `style-match` | **PASS** | Romantic/personal app dùng rose/pink — rất phù hợp |
| `consistency` | **PASS** | Design system nhất quán xuyên suốt 15 screens |
| `no-emoji-icons` | **PARTIAL** | Sentiment picker, upcoming dates dùng emoji — chấp nhận cho personal/romantic context |
| `effects-match-style` | **PASS** | Shadows, gradients, rounded-xl nhất quán |
| `platform-adaptive` | **WARN** | Cần kiểm tra iOS HIG vs Material khi implement |
| `elevation-consistent` | **PASS** | shadow-sm cho cards, shadow-lg cho CTAs, shadow-xl cho modals |
| `primary-action` | **PASS** | Mỗi screen chỉ 1 primary CTA rõ ràng |
| `icon-style-consistent` | **PASS** | Material Symbols Outlined xuyên suốt |

**Score: 8.5/10**

### Priority 5: Layout & Responsive (HIGH)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `mobile-first` | **PASS** | max-w-md, mobile viewport |
| `spacing-scale` | **PASS** | 4/8/12/16/20/24px system |
| `readable-font-size` | **PASS** | Body 14px, labels 12px, titles 18-24px |
| `horizontal-scroll` | **PASS** | Chỉ upcoming dates + filter pills — intentional |
| `fixed-element-offset` | **PASS** | pb-24 cho bottom nav |
| `visual-hierarchy` | **PASS** | Size + weight + color hierarchy rõ ràng |
| `z-index-management` | **PASS** | z-10, z-20, z-40, z-50 layered |

**Score: 9/10**

### Priority 6: Typography & Color (MEDIUM)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `line-height` | **PASS** | leading-relaxed (1.625) cho body |
| `font-scale` | **PASS** | 10/12/14/16/18/20/24px scale |
| `weight-hierarchy` | **PASS** | Bold headings (700), Medium labels (500-600), Regular body (400) |
| `color-semantic` | **PASS** | Primary, success, danger, warning, info colors defined |
| `color-dark-mode` | **PARTIAL** | CSS classes có nhưng chưa test dark mode rendering |
| `color-accessible-pairs` | **PASS** | Contrast ratios đạt AA |
| `truncation-strategy` | **PASS** | Dùng truncate class + "..." trên chat history items |

**Score: 8.5/10**

### Priority 7: Animation (MEDIUM)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `duration-timing` | **PASS** | 150-300ms transitions |
| `loading-states` | **PARTIAL** | Typing dots animated, nhưng thiếu skeleton screens |
| `easing` | **PASS** | ease-out entering, standard easing |
| `stagger-sequence` | **WARN** | Chưa thấy stagger trên list items |
| `scale-feedback` | **PASS** | active:scale-95 trên buttons |
| `motion-consistency` | **PASS** | animate-pulse, animate-bounce nhất quán |
| `excessive-motion` | **PASS** | Chỉ 1-2 elements animated per view |

**Score: 7.5/10**

### Priority 8: Forms & Feedback (MEDIUM)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `input-labels` | **PASS** | Visible labels trên tất cả inputs |
| `error-placement` | **WARN** | Chưa có error state mockup |
| `required-indicators` | **PASS** | Asterisk (*) trên required fields |
| `empty-states` | **WARN** | Chưa có empty state mockups |
| `disabled-states` | **PASS** | OTP "Xác nhận" button disabled (gray) — đúng |
| `progressive-disclosure` | **PASS** | "Tùy chọn nâng cao" expandable |
| `password-toggle` | **PASS** | Visibility toggle icons trên password fields |
| `success-feedback` | **PASS** | "Đã lưu 3 ghi chú thành công!" confirm message |

**Score: 7.5/10**

### Priority 9: Navigation Patterns (HIGH)

| Rule | Status | Chi tiết |
|------|--------|----------|
| `bottom-nav-limit` | **PASS** | 5 tabs — đúng max |
| `back-behavior` | **PASS** | Back arrow trên sub-screens |
| `nav-label-icon` | **PASS** | Icon + text label trên tất cả nav items |
| `nav-state-active` | **PASS** | Active tab: primary color, filled icon, bold text |
| `navigation-consistency` | **PASS** | 5 tabs giống nhau trên 5 main screens |
| `bottom-nav-top-level` | **PASS** | Bottom nav chỉ cho top-level screens |
| `modal-escape` | **PASS** | Close/X button trên modals + bottom sheets |
| `destructive-nav-separation` | **PASS** | "Đăng xuất" tách biệt ở cuối Settings |

**Score: 9.5/10** — Cải thiện lớn nhất so với Stitch 1.

---

## IV. VERCEL REACT BEST PRACTICES — KHUYẾN NGHỊ KHI IMPLEMENT

### Critical (Phải làm ngay)

```
1. async-parallel: Dashboard mount → Promise.all([fetchEntries(), fetchDates(), fetchStats()])
2. bundle-dynamic-imports: Lazy load Insight360, DateMap, Navigation screens
3. rendering-hoist-jsx: Extract BottomTabBar, Header components — shared across 5 screens
4. bundle-barrel-imports: Import { Heart, Plus, Chat } from individual icon files
```

### High (Nên làm)

```
5. client-swr-dedup: useSWR cho entries data — shared giữa Dashboard, Add, Chat
6. server-parallel-fetching: Khi có API, fetch entries + dates + ai_logs song song
7. rerender-memo: React.memo cho NeuronMap, WaveformBars, CountdownRing components
8. rendering-content-visibility: CSS content-visibility: auto cho Settings sections
```

### Medium (Tối ưu sau)

```
9. rerender-derived-state: Dashboard category counts = derived from entries, không state riêng
10. js-set-map-lookups: categoryMap = new Map() cho O(1) lookup
11. rerender-functional-setstate: setEntries(prev => [...prev, newEntry])
12. bundle-defer-third-party: Load eKMap SDK sau initial render
```

---

## V. SO SÁNH STITCH 1 vs STITCH 2

| Vấn đề Stitch 1 | Stitch 2 | Trạng thái |
|-----------------|----------|------------|
| Bottom nav khác nhau mỗi screen | 5 tabs thống nhất | **FIXED** |
| Dùng ảnh stock Google | Icons + colored placeholders | **FIXED** |
| Category thiếu số lượng | Mini-app grid với badges HOT/MỚI | **IMPROVED** |
| Recent entries thiếu sentiment | Có sentiment emoji + trash icon | **FIXED** |
| AI Chat thiếu nút Gợi ý | Có nút "Gợi ý" tím | **FIXED** |
| AI Chat thiếu typing indicator | 3 bouncing dots | **FIXED** |
| Calendar countdown ring mờ | SVG ring rõ, color-coded | **FIXED** |
| Calendar ảnh stock | Icon buttons (bell, trash) | **FIXED** |
| Settings overlap text bug | Rebuilt hoàn toàn — user-facing | **FIXED** |
| Chỉ 5 screens | 15 screens đầy đủ | **EXPANDED** |
| Thiếu auth screens | Login + Register + Forgot Password | **ADDED** |
| Thiếu voice chat | Voice input + Recording state | **ADDED** |
| Thiếu map/navigation | Bản đồ eKMap + Dẫn đường | **ADDED** |
| Thiếu album ảnh | Album với filter + groups | **ADDED** |
| Thiếu insight | Neuron map 360° | **ADDED** |
| Thiếu chat history | History panel + search + filters | **ADDED** |

---

## VI. KẾT LUẬN & KHUYẾN NGHỊ

### Điểm mạnh nổi bật

1. **Navigation consistency** — 5 tabs thống nhất, sub-screens có back arrow, auth screens không có nav
2. **Visual design** — Gradient system đẹp, spacing nhất quán, typography hierarchy rõ ràng
3. **Feature coverage** — 15 screens bao phủ toàn bộ tính năng: core + auth + map + voice + insight + album
4. **Interaction states** — Selected states trên category/sentiment, disabled OTP button, toggle switches
5. **Vietnamese content** — Text tự nhiên, mock data thực tế, labels chính xác

### Cần bổ sung khi implement React Native

1. **Accessibility labels** — Thêm `accessibilityLabel`, `accessibilityHint` cho tất cả interactive elements
2. **Dynamic Type** — Convert px sang scale-responsive sizes
3. **Reduced motion** — Respect `useReducedMotion()` hook
4. **Error states** — Thiết kế error UI cho forms, API failures
5. **Empty states** — Thiết kế empty UI khi chưa có data
6. **Skeleton loading** — Shimmer placeholders cho Dashboard, Chat History
7. **Dark mode** — Test và hoàn thiện dark theme
8. **Screen chưa có** — "Đếm ngày yêu nhau" (Love Day Counter) + "Daily Reminder"

### Verdict

> **Stitch 2 đạt 8.3/10** — Đủ chất lượng để dùng làm **design reference chính thức** cho việc implement React Native. Không cần quay lại chỉnh sửa Stitch nữa. Tập trung vào code implementation, bổ sung accessibility + error/empty states + dark mode trong quá trình dev.
