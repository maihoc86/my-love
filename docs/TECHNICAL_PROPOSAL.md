# Đề Xuất Kỹ Thuật: AI Love — Trợ Lý Tình Yêu AI Thông Minh

**Chủ dự án:** Thái Hoàng Mai Học
**Ngày tạo:** 17/03/2026
**Phiên bản:** 1.0
**Mức độ phức tạp:** M (Trung bình)
**Loại dự án:** Cá nhân (Personal Project)

---

## 1. Mô Tả Vấn Đề

### 1.1 Bối Cảnh

Trong cuộc sống hiện đại, các cặp đôi đang đối mặt với một nghịch lý: công nghệ kết nối con người dễ dàng hơn bao giờ hết, nhưng chất lượng của mỗi mối quan hệ lại không tỷ lệ thuận với sự tiện lợi đó.

Những vấn đề rất "đời thường" nhưng lại gây ra nhiều mâu thuẫn không đáng có:
- Quên ngày kỷ niệm, sinh nhật — không phải vì không yêu, mà vì cuộc sống bận rộn
- Không nhớ sở thích, dị ứng, món ăn yêu thích của đối phương — dẫn đến những quyết định sai lầm khi chuẩn bị quà tặng hay lên kế hoạch hẹn hò
- Thiếu gợi ý sáng tạo cho các buổi hẹn, khiến mối quan hệ dần trở nên nhàm chán
- Thông tin rải rác khắp nơi: note trên điện thoại, tin nhắn chat, ghi nhớ trong đầu — không có một nơi tập trung để quản lý

Hiện tại trên thị trường Việt Nam, chưa có ứng dụng nào thực sự giải quyết trọn vẹn bài toán này. Các app ghi chú thông thường không có ngữ cảnh tình yêu, các app hẹn hò thì chỉ tập trung vào việc "tìm người", chứ không hỗ trợ "giữ người". Đây chính là lý do mình bắt tay vào xây dựng AI Love như một dự án cá nhân — xuất phát từ nhu cầu thực tế của chính mình.

### 1.2 Vấn Đề Cần Giải Quyết

- **Quản lý thông tin phân tán:** Người dùng không có công cụ tập trung để ghi nhận và tra cứu mọi thông tin về người yêu — từ sở thích, thói quen đến kỷ niệm chung
- **Quên các dịp quan trọng:** Không có hệ thống nhắc nhở thông minh, dẫn đến bỏ lỡ sinh nhật, kỷ niệm, ngày lễ — những dịp mà "quên" đồng nghĩa với "không quan tâm"
- **Thiếu ý tưởng hẹn hò:** Sau vài tháng, đa số cặp đôi rơi vào vòng lặp "ăn ở đâu — không biết — tùy anh/em" vì thiếu gợi ý phù hợp với sở thích cả hai
- **Giao tiếp nhập liệu cồng kềnh:** Các app ghi chú truyền thống yêu cầu nhập thủ công từng trường dữ liệu — ai cũng biết là nên ghi lại, nhưng quá mất công nên không ai làm

### 1.3 Tác Động & Cơ Hội

- **Thị trường mục tiêu:** ~15 triệu người Việt Nam trong độ tuổi 18-35 đang trong mối quan hệ yêu đương
- **Xu hướng "Relationship Tech":** Thị trường global dự kiến đạt $4.2B vào 2027 (nguồn: Allied Market Research)
- **Gap thị trường Việt Nam:** 0 ứng dụng nội địa nào giải quyết bài toán "relationship management" — cơ hội first-mover rõ ràng
- **Monetization potential:** Freemium model với premium AI features, in-app purchases cho quà tặng/trải nghiệm hẹn hò

---

## 2. Giải Pháp Đề Xuất

### 2.1 Tổng Quan Giải Pháp

**AI Love** là ứng dụng mobile (iOS + Android) giúp người dùng ghi nhận, quản lý và khai thác thông minh mọi thông tin về người yêu — được hỗ trợ bởi AI để biến dữ liệu thô thành hành động cụ thể.

Thay vì yêu cầu người dùng điền form phức tạp, AI Love cho phép nhập liệu bằng ngôn ngữ tự nhiên: chỉ cần gõ hoặc nói "Bé thích ăn phở bò tái lần, dị ứng hải sản, thích màu hồng" — AI sẽ tự động phân tích, phân loại và lưu trữ thành các mục riêng biệt.

**Triết lý sản phẩm:** *"Yêu thương thông minh hơn mỗi ngày"* — Công nghệ không thay thế tình yêu, nhưng giúp biểu đạt tình yêu tốt hơn.

### 2.2 Tính Năng Chính

| # | Tính năng | Mô tả | Độ phức tạp |
|---|-----------|-------|-------------|
| F1 | **Dashboard tổng quan** | Hero card hiển thị đếm ngày yêu, lưới mini-app, thống kê nhanh, ngày đặc biệt sắp đến | M |
| F2 | **Ghi chú thông minh** | CRUD 11 danh mục (đồ ăn, sở thích, quà tặng, dị ứng...) với 5 mức cảm xúc, hỗ trợ tags và tìm kiếm | M |
| F3 | **AI Chat (NLP)** | Nhập liệu bằng ngôn ngữ tự nhiên (text + voice) → AI phân tích → preview → lưu hàng loạt | L |
| F4 | **Voice Note** | Ghi âm → STT (Speech-to-Text) → AI phân tích → tự động tạo entries | L |
| F5 | **Lịch & Nhắc nhở** | Đồng hồ đếm ngược cho ngày đặc biệt, nhắc nhở tự động qua app + Telegram Bot | M |
| F6 | **Bản đồ hẹn hò** | Gợi ý địa điểm (nhà hàng, café, homestay) dựa trên sở thích + AI suggestions | M |
| F7 | **Album ảnh** | Tổ chức ảnh theo sự kiện/ngày tháng, mixed grid layout | S |
| F8 | **Insight 360°** | Neuron map trực quan hóa toàn bộ dữ liệu về đối phương — giúp "hiểu" người yêu ở level mới | L |
| F9 | **Daily Reminder** | AI gợi ý hành động hàng ngày + tích hợp Telegram Bot push | M |
| F10 | **Đếm ngày yêu** | Auto countdown từ ngày bắt đầu, milestones tự động (100 ngày, 1 năm...) | S |

### 2.3 Ưu Điểm Giải Pháp

1. **Nhập liệu tự nhiên:** Đây là killer feature — thay vì form truyền thống, người dùng chỉ cần "nói chuyện" với AI. Tỷ lệ nhập liệu dự kiến tăng 3-5x so với form thủ công
2. **Chi phí vận hành thấp:** Sử dụng Supabase (BaaS) + OpenRouter API — không cần maintain server riêng, chi phí scale theo usage thực tế
3. **Cross-platform hiệu quả:** React Native + Expo cho phép 1 codebase chạy trên cả iOS và Android — đặc biệt phù hợp cho dự án cá nhân khi nguồn lực hạn chế
4. **Bảo mật dữ liệu nhạy cảm:** Dữ liệu tình yêu là cực kỳ cá nhân — áp dụng Supabase RLS (Row Level Security), Expo SecureStore cho API keys, mã hóa end-to-end cho chat

### 2.4 So Sánh Với Phương Án Khác

| Tiêu chí | AI Love (React Native + Expo) | Flutter App | Native iOS + Android riêng |
|----------|-------------------------------|-------------|---------------------------|
| Chi phí phát triển | ~200-300 man-days | ~220-320 man-days | ~400-500 man-days |
| Timeline | 3-4 tháng | 3-4 tháng | 6-8 tháng |
| Rủi ro | Thấp — team đã có kinh nghiệm RN | Trung bình — cần training thêm | Cao — cần 2 team riêng biệt |
| Maintenance | 1 codebase | 1 codebase | 2 codebases |
| Performance | 95% native | 98% native | 100% native |
| AI Integration | Excellent — JS ecosystem phong phú | Tốt | Tốt nhưng 2x effort |
| Store compliance | Expo SDK 54 tự xử lý | Cần config thủ công nhiều hơn | Tốt nhất |

**Kết luận:** React Native + Expo là lựa chọn tối ưu nhất xét về tổng thể — cân bằng giữa tốc độ phát triển, chi phí, chất lượng sản phẩm, và năng lực hiện tại của team.

---

## 3. Phương Pháp Triển Khai

### 3.1 Methodology

- **Framework:** Agile/Scrum — phù hợp với dự án cần iterate nhanh, feedback sớm
- **Sprint duration:** 2 tuần — đủ dài để deliver feature hoàn chỉnh, đủ ngắn để adjust nhanh
- **Review cadence:** Demo cuối mỗi sprint trên thiết bị thật (TestFlight + Internal Testing)
- **Communication:** Daily standup 15 phút, weekly technical review, bi-weekly stakeholder demo

### 3.2 Các Giai Đoạn

**Giai đoạn 1: Discovery & Design** (3 tuần)

Giai đoạn này quan trọng nhất vì nó quyết định mọi thứ sau đó. Team sẽ tập trung vào:
- Finalize BRD/SRS (đã có draft, cần review và sign-off)
- Thiết kế UI/UX trên Google Stitch → validate với user testing
- Thiết kế kiến trúc hệ thống và data model
- Setup infrastructure (Supabase project, OpenRouter API, Expo project)
- **Deliverable:** SRS final, UI mockups approved, Architecture doc, Dev environment ready

**Giai đoạn 2: Development — Core Features (P0)** (6 tuần)

Sprint 1-2: Foundation
- Auth flow (OTP + Google OAuth)
- Dashboard skeleton
- Entry CRUD (11 categories, 5 sentiments)
- Navigation structure (tab bar + stack navigators)

Sprint 3-4: AI Integration
- AI Chat với NLP parsing (text → structured entries)
- Voice Note (STT via OpenRouter Audio API)
- Calendar & Special dates với countdown
- Daily Reminder + Telegram Bot integration

Sprint 5-6: Polish & Complete
- All Notes screen (search, filter, sort)
- Settings screens (Personal, Partner, Security, Backup)
- Onboarding flow 5 bước
- **Deliverable:** MVP đầy đủ P0 features, chạy được trên TestFlight

**Giai đoạn 3: Development — Advanced Features (P1)** (4 tuần)

Sprint 7-8:
- Date Map với eKMap integration
- Photo Album
- Love Counter & Milestones
- Insight 360° (neuron map visualization)
- Chat History
- **Deliverable:** Feature-complete app

**Giai đoạn 4: Testing & Store Submission** (2 tuần)

- E2E testing trên thiết bị thật (iPhone SE → Pro Max, Android mid-range → flagship)
- Performance testing (app load < 2s, 60 FPS scroll, memory < 150MB)
- Store compliance audit (Privacy Policy, Data Safety, Consent modals)
- Fix critical/high bugs
- Submit lên TestFlight (iOS) và Internal Testing (Google Play)
- **Deliverable:** Store-ready builds, Test reports

**Giai đoạn 5: Launch & Support** (2 tuần)

- App Store + Google Play submission
- Monitor crash reports, reviews
- Hotfix nếu cần
- Knowledge transfer documentation
- **Deliverable:** Published apps, Support runbook

---

## 4. Timeline & Milestones

### 4.1 Tổng Quan

```
Giai đoạn 1  |████████|
Giai đoạn 2  |        |████████████████████████|
Giai đoạn 3  |        |                        |████████████████|
Giai đoạn 4  |        |                        |                |████████|
Giai đoạn 5  |        |                        |                |        |████████|
             W1       W4                       W10              W14      W16     W18
```

**Tổng thời gian dự kiến: 17-18 tuần (~4.5 tháng)**

### 4.2 Milestones Chi Tiết

| Milestone | Tuần | Deliverable | Tiêu chí nghiệm thu |
|-----------|------|-------------|---------------------|
| M1 — Kick-off | W1 | Project charter, dev environment | Team aligned, tools ready |
| M2 — Design Approved | W3 | UI mockups, Architecture doc | Stakeholder sign-off |
| M3 — MVP P0 Ready | W10 | Core features working | 7 modules P0 pass smoke test |
| M4 — Feature Complete | W14 | All P0 + P1 features | 15 modules pass regression |
| M5 — Store Ready | W16 | Tested builds | 0 critical bugs, Store compliance pass |
| M6 — Go-live | W18 | Published on stores | Apps approved and live |

---

## 5. Nguồn Lực

### 5.1 Đội Ngũ Dự Án

| Vai trò | Người phụ trách | FTE | Effort ước tính |
|---------|-----------------|-----|-----------------|
| Founder / Tech Lead | Thái Hoàng Mai Học | 1.0 | 90 man-days |
| Mobile Developer (nếu có) | Cộng tác viên / Freelancer | 1.0 | 85 man-days |
| AI-Assisted Development | Claude Code + Copilot | — | Tăng tốc ~2-3x |
| **Tổng** | **1-2 người** | | **~175 man-days** |

> **Ghi chú:** Đây là dự án cá nhân — chủ yếu do 1 người thực hiện với sự hỗ trợ mạnh mẽ từ AI development tools. Có thể mời cộng tác viên cho các giai đoạn cần đẩy nhanh tiến độ.

### 5.2 Sizing

| Size | Effort (team) | Effort (solo + AI tools) | Timeline solo |
|------|---------------|--------------------------|---------------|
| S (Nhỏ) | 30-60 man-days | 15-30 man-days | 1-2 tháng |
| **M (Trung bình)** | **60-120 man-days** | **30-60 man-days** | **2-4 tháng** |
| L (Lớn) | 120-240 man-days | 60-120 man-days | 4-6 tháng |

**Dự án AI Love được đánh giá: M** — với AI-assisted development (Claude Code), năng suất cá nhân tăng đáng kể so với workflow truyền thống

---

## 6. Ước Tính Chi Phí

### 6.1 Chi Phí Phát Triển

| Hạng mục | Chi phí (VNĐ) | Ghi chú |
|----------|---------------|---------|
| Thiết kế UX/UI | ~5,000,000 | Google Stitch + Figma (công cụ) |
| AI Dev Tools | ~3,000,000 | Claude Code, GitHub Copilot licenses (6 tháng) |
| Thời gian cá nhân (~175 man-days) | Sweat equity | Founder tự invest |
| **Subtotal** | **~8,000,000** | Chưa tính giá trị thời gian cá nhân |

### 6.2 Chi Phí Hạ Tầng (Năm đầu)

| Hạng mục | Chi phí/tháng | Chi phí/năm |
|----------|---------------|-------------|
| Supabase Pro | $25 (~625,000₫) | $300 (~7,500,000₫) |
| OpenRouter API (AI) | ~$50 (~1,250,000₫) | ~$600 (~15,000,000₫) |
| Apple Developer Account | — | $99/year (~2,475,000₫) |
| Google Play Developer | — | $25 one-time (~625,000₫) |
| Domain + SSL | ~100,000₫ | ~1,200,000₫ |
| Mapbox (maps) | Free tier | $0 (dưới 25k requests/mo) |
| **Subtotal** | **~2,075,000₫** | **~26,800,000₫** |

### 6.3 Tổng Chi Phí

| Hạng mục | Chi phí |
|----------|---------|
| Phát triển (công cụ + dịch vụ) | ~8,000,000₫ |
| Hạ tầng (năm 1) | ~26,800,000₫ |
| Dự phòng (15%) | ~5,220,000₫ |
| **TỔNG CỘNG (năm 1)** | **~40,020,000₫** |

> **Lưu ý:** Chi phí trên chỉ bao gồm công cụ và hạ tầng. Thời gian phát triển (~175 man-days) là "sweat equity" — đầu tư cá nhân của founder. Tổng chi phí out-of-pocket rất thấp nhờ kiến trúc serverless (Supabase BaaS) và AI-assisted development.

---

## 7. ROI & Giá Trị Chiến Lược

### 7.1 Giá Trị Trực Tiếp

| Lợi ích | Giá trị dự kiến | Ghi chú |
|---------|-----------------|---------|
| Sản phẩm cá nhân trên Store | Cao | Portfolio thực tế — app live trên cả 2 store |
| Nâng cao năng lực AI + Mobile | Cao | Kinh nghiệm thực chiến RN + Expo + AI integration |
| Passive income tiềm năng | Tiềm năng | Premium subscription ~49k-99k/tháng |
| IP (Intellectual Property) | Cao | Sở hữu 100% sản phẩm, quyền định đoạt tương lai |

### 7.2 Giá Trị Chiến Lược

- **Personal brand:** Chứng minh năng lực cá nhân — từ ý tưởng → thiết kế → code → ship lên Store, end-to-end
- **Solo founder validation:** Kiểm chứng mô hình "1 người + AI tools" có thể ship sản phẩm chất lượng đến đâu
- **Future options:** Sản phẩm có thể scale thành startup, white-label cho đối tác, hoặc đơn giản là side project tạo thu nhập thụ động

### 7.3 Dự Kiến Monetization (Phase 2)

- **Free tier:** 50 entries, 10 AI chats/ngày, 1 reminder/ngày
- **Premium (49,000₫/tháng):** Unlimited entries, unlimited AI, voice note, insight 360°, date map
- **Target:** 10,000 MAU trong 6 tháng → 500 premium users → ~24,500,000₫/tháng
- **Breakeven:** ~2 tháng sau khi đạt target premium users

---

## 8. Rủi Ro & Giảm Thiểu

| Rủi ro | Xác suất | Tác động | Giải pháp |
|--------|----------|----------|-----------|
| OpenRouter API downtime | Thấp | Cao | Fallback sang Gemini API; cache AI responses |
| App bị reject trên Store | Trung bình | Cao | Tuân thủ Store Guidelines nghiêm ngặt (đã document); pre-submission review |
| AI tạo nội dung không phù hợp | Trung bình | Cao | Content filtering, system prompt kiểm soát chặt, report/flag mechanism |
| Thiếu thời gian cá nhân (bận việc chính) | Cao | Trung bình | Ưu tiên P0 features; tận dụng AI tools tối đa; làm theo sprint nhỏ vào buổi tối/cuối tuần |
| User retention thấp | Trung bình | Trung bình | Focus UX onboarding, daily reminder hooks, gamification (love counter milestones) |

---

---

*Tài liệu này là tài sản trí tuệ cá nhân của Thái Hoàng Mai Học. Mọi quyền được bảo lưu.*
*Ngày tạo: 17/03/2026*
