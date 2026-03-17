# Kế Hoạch Dự Án: AI Love — Trợ Lý Tình Yêu AI Thông Minh

**Chủ dự án:** Thái Hoàng Mai Học
**Ngày tạo:** 17/03/2026
**Phiên bản:** 1.0
**Loại dự án:** Cá nhân (Personal Project)
**Trạng thái:** In Progress (Đang triển khai)

---

## 1. Executive Summary

### 1.1 Tổng Quan

AI Love là dự án cá nhân phát triển ứng dụng mobile (iOS + Android), xuất phát từ nhu cầu thực tế của chính mình. Ứng dụng giúp người dùng ghi nhận và quản lý thông tin về người yêu một cách thông minh, hỗ trợ bởi AI — từ nhập liệu bằng ngôn ngữ tự nhiên đến gợi ý hẹn hò cá nhân hóa.

Dự án này vừa là sản phẩm mình muốn dùng hàng ngày, vừa là cơ hội để kiểm chứng mô hình "solo founder + AI tools" — liệu một người có thể ship sản phẩm chất lượng store-ready trong thời gian hợp lý không.

### 1.2 Mục Tiêu Chính

- **Ship lên Store:** Publish thành công trên cả App Store và Google Play, đạt approval lần đầu (hoặc lần 2 nếu có minor rejection)
- **Chất lượng sản phẩm:** App ổn định, crash-free rate > 99%, trải nghiệm mượt mà trên cả iOS và Android
- **Năng lực cá nhân:** Thành thạo full-stack mobile development với React Native + Expo + AI integration
- **Foundation cho growth:** Kiến trúc đủ linh hoạt để scale từ 100 → 100,000 users mà không cần rewrite

### 1.3 Chỉ Số Thành Công (KPIs)

| KPI | Mục tiêu | Phương pháp đo |
|-----|----------|----------------|
| Store approval | Approved trên cả 2 store | App Store Connect + Google Play Console |
| Crash-free rate | > 99% | Expo EAS Insights |
| App load time (p95) | < 3 giây | Đo thực tế trên 5+ thiết bị |
| AI Chat accuracy | > 90% parse đúng | Test 100 câu Tiếng Việt phổ biến |
| Test coverage (core flows) | > 70% | Jest coverage report |
| TypeScript errors | 0 | `tsc --noEmit` |
| Time-to-market | < 18 tuần từ kick-off | Project timeline tracking |

---

## 2. Phạm Vi Dự Án

### 2.1 Trong Phạm Vi (In Scope)

**P0 — Core Features (bắt buộc cho v1.0):**
- Onboarding 5 bước (Welcome → Tên → Sinh nhật → Kỷ niệm → Avatar)
- Auth: OTP (phone/email) + Google OAuth
- Dashboard với hero card, mini-app grid, stats, upcoming dates
- Entry CRUD: 11 danh mục, 5 sentiments, tags, search, filter, sort
- AI Chat: NLP parse Tiếng Việt → structured entries (text input)
- Voice Note: Record → STT → AI parse → entries (voice input)
- Calendar: Ngày đặc biệt, countdown rings, recurring reminders
- Settings: Personal info, Partner info, Security (biometric), Backup
- Daily Reminder: AI suggestions + Telegram Bot push

**P1 — Advanced Features (v1.1, triển khai song song nếu đủ bandwidth):**
- Date Map: Bản đồ + AI gợi ý địa điểm
- Photo Album: Organized by events, mixed grid
- Love Counter: Đếm ngày, milestones tự động
- Insight 360°: Neuron map visualization
- Chat History: Search, filter, grouped by date

### 2.2 Ngoài Phạm Vi (Out of Scope — v2.0 trở đi)

- Push Notifications nâng cao (scheduled, rich notifications)
- Offline mode đầy đủ (write queue + sync)
- Social features (chia sẻ milestones, couple linking)
- Web version
- Monetization implementation (in-app purchase, subscription)
- Admin dashboard / CMS
- Multi-language support (ngoài Tiếng Việt)

### 2.3 Giả Định

- Có đủ thời gian cá nhân (buổi tối + cuối tuần) để duy trì tiến độ
- AI development tools (Claude Code, Copilot) hoạt động ổn định, tăng tốc phát triển 2-3x
- Supabase Pro plan đủ cho phase launch (< 10,000 users)
- OpenRouter API stable và latency chấp nhận được cho Tiếng Việt
- Apple Developer Account và Google Play Developer Account đã setup
- Thiết bị test: ít nhất 1 iPhone (iOS 15+) và 1 Android (API 28+) thật

### 2.4 Ràng Buộc

- **Ngân sách hạ tầng:** < 3,000,000₫/tháng (giai đoạn launch)
- **Timeline:** Tổng ~18 tuần, target go-live trước Q3/2026
- **Nguồn lực:** Chủ yếu 1 người (founder) + AI tools, có thể mời cộng tác viên khi cần
- **Tech stack:** React Native + Expo — phù hợp nhất cho solo developer cần cross-platform
- **Store compliance:** Phải tuân thủ 100% guidelines (không có "fix sau khi bị reject")

---

## 3. Timeline & Milestones

### 3.1 Tổng Quan Timeline

| Giai đoạn | Bắt đầu | Kết thúc | Thời lượng | Trạng thái |
|-----------|---------|----------|------------|------------|
| Phase 0: Setup & Design | W1 (17/03) | W3 (04/04) | 3 tuần | Đang thực hiện |
| Phase 1: Core Development | W4 (07/04) | W9 (16/05) | 6 tuần | Sắp tới |
| Phase 2: AI & Voice | W7 (28/04) | W10 (23/05) | 4 tuần | Sắp tới |
| Phase 3: Advanced Features | W10 (19/05) | W14 (20/06) | 4 tuần | Chờ |
| Phase 4: Testing & Polish | W14 (16/06) | W16 (04/07) | 2 tuần | Chờ |
| Phase 5: Store Submission | W16 (30/06) | W17 (11/07) | 1.5 tuần | Chờ |
| Phase 6: Launch & Monitor | W17 (07/07) | W18 (18/07) | 1.5 tuần | Chờ |

> **Lưu ý:** Phase 2 và Phase 1 overlap — AI Chat phát triển song song với core CRUD vì 2 developers có thể chia task.

### 3.2 Milestones

1. **M1 — Kick-off & Environment Ready** (W1, 17/03/2026)
   - Dev environment setup hoàn tất (Expo project, Supabase, OpenRouter)
   - CLAUDE.md + Store Guidelines documentation done
   - UI mockups draft (Google Stitch)

2. **M2 — Design & Architecture Approved** (W3, 04/04/2026)
   - UI/UX designs finalized trên Stitch/Figma
   - Data model + RLS policies defined
   - Architecture document reviewed
   - Design system (Nano Banana Pro) implemented trong `src/theme/`

3. **M3 — Core MVP Working** (W9, 16/05/2026)
   - Auth flow (OTP + OAuth) working
   - Dashboard, Entry CRUD, Calendar, Settings — all P0 screens functional
   - Navigation complete (tab bar + stack navigators)
   - Có thể demo trên TestFlight

4. **M4 — AI Integration Complete** (W10, 23/05/2026)
   - AI Chat parse Tiếng Việt → entries thành công > 90%
   - Voice Note: Record → STT → parse → save working
   - Daily Reminder + Telegram Bot integration done
   - Demo "từ nói → data" end-to-end

5. **M5 — Feature Complete** (W14, 20/06/2026)
   - All P0 + P1 features implemented
   - 15+ screens hoạt động đầy đủ
   - Regression test pass trên iOS + Android

6. **M6 — Store Ready** (W16, 04/07/2026)
   - 0 critical bugs, < 3 medium bugs
   - Performance đạt targets (load < 2s, 60 FPS, memory < 150MB)
   - Store compliance audit pass
   - Privacy Policy live
   - App screenshots + description sẵn sàng

7. **M7 — Go-live** (W18, 18/07/2026)
   - Published trên App Store + Google Play
   - Monitoring setup, crash tracking active
   - Support runbook documented

### 3.3 Sprint Breakdown

| Sprint | Tuần | Focus | Key Deliverables |
|--------|------|-------|-----------------|
| Sprint 1 | W4-W5 | Foundation | Auth, Navigation, Dashboard skeleton, Entry CRUD |
| Sprint 2 | W6-W7 | Core Screens | All Notes, Calendar, Settings (4 sub-screens) |
| Sprint 3 | W7-W8 | AI Chat | NLP parsing, chat UI, entry preview & batch save |
| Sprint 4 | W9-W10 | Voice & Reminder | Voice Note (STT/TTS), Daily Reminder, Telegram Bot |
| Sprint 5 | W10-W11 | Advanced 1 | Date Map, Photo Album, Love Counter |
| Sprint 6 | W12-W13 | Advanced 2 | Insight 360°, Chat History, Onboarding polish |
| Sprint 7 | W14-W15 | Testing | E2E tests, performance optimization, bug fixing |
| Sprint 8 | W16-W18 | Launch | Store submission, monitoring, hotfix |

---

## 4. Nguồn Lực

### 4.1 Đội Ngũ Dự Án

| Vai trò | Người | Trách nhiệm chính |
|---------|-------|-------------------|
| **Founder / Full-stack** | Thái Hoàng Mai Học | Architecture, UI/UX, coding, AI integration, Supabase setup, build & submit — tất cả |
| **AI Pair Programmer** | Claude Code + GitHub Copilot | Code generation, review, debugging, documentation |
| **Cộng tác viên (nếu cần)** | Freelancer / Bạn bè | QA testing, UI polish, specific features |

**Mô hình:** Solo founder + AI-assisted development. Đây là thử nghiệm thực tế về việc 1 người có thể ship sản phẩm hoàn chỉnh nhờ AI tools.

### 4.2 Focus Theo Phase

| Phase | Focus chính | AI Tools hỗ trợ |
|-------|------------|-----------------|
| Phase 0 | Expo setup, Supabase config, theme system, architecture | Claude Code: scaffold project structure |
| Phase 1 | Auth, Dashboard, Entry CRUD, Calendar, Settings, Navigation | Claude Code: generate screens, components |
| Phase 2 | AI Chat, Voice Note, Daily Reminder, Telegram Bot | Claude Code: prompt engineering, API integration |
| Phase 3 | Date Map, Photo Album, Love Counter, Insight, Chat History | Claude Code: complex UI, animations |
| Phase 4 | Performance optimization, bug fixing, E2E testing | Claude Code: debugging, test generation |
| Phase 5 | iOS + Android build, Store submission, compliance check | Manual review + checklist |

### 4.3 Công Nghệ & Hạ Tầng

- **Tech Stack:** React Native 0.81.5 + Expo SDK 54 + TypeScript + Supabase + OpenRouter AI
- **Design Tools:** Google Stitch (rapid prototyping) + Figma (detail design)
- **Dev Tools:** VSCode + Claude Code (AI pair programming)
- **Build/Deploy:** EAS Build + EAS Submit
- **Version Control:** Git + GitHub
- **Workflow:** Solo — self-managed sprints, progress tracked qua GitHub issues + todo lists

### 4.4 Ngân Sách

| Hạng mục | Chi phí | Ghi chú |
|----------|---------|---------|
| Thời gian cá nhân (~175 man-days) | Sweat equity | Founder tự invest |
| Supabase Pro (6 tháng) | ~3,750,000₫ | $25/mo × 6 |
| OpenRouter API (6 tháng) | ~7,500,000₫ | ~$50/mo × 6 (dev + production) |
| Apple Developer Account | 2,475,000₫ | $99/year |
| Google Play Developer | 625,000₫ | $25 one-time |
| Mapbox | 0₫ | Free tier |
| Expo EAS | 0₫ | Free tier cho build |
| AI Dev Tools (Claude Code, Copilot) | ~3,000,000₫ | 6 tháng licenses |
| Domain (ailove.vn) | ~600,000₫ | 1 năm |
| Dự phòng (10%) | ~1,795,000₫ | Buffer cho chi phí phát sinh |
| **Tổng out-of-pocket** | **~19,745,000₫** | ~$790 — rất thấp cho 1 sản phẩm hoàn chỉnh |

---

## 5. Quản Lý Rủi Ro

### 5.1 Ma Trận Rủi Ro

| ID | Rủi ro | Xác suất | Tác động | Mức độ | Phương án giảm thiểu |
|----|--------|----------|----------|--------|---------------------|
| R1 | **App bị reject trên Store** — privacy issues, missing declarations, UI non-compliance | Trung bình | Cao | Nghiêm trọng | Đã document Store Guidelines chi tiết; QA review compliance trước submit; dùng checklist Apple/Google |
| R2 | **AI parse Tiếng Việt kém** — Vietnamese NLP khó hơn English, đặc biệt với slang | Trung bình | Cao | Nghiêm trọng | System prompt tuning kỹ; test 100+ câu thực tế; cho user edit preview trước khi save; fallback manual input |
| R3 | **Bận việc chính, thiếu thời gian cá nhân** — dự án cá nhân phải nhường chỗ cho công việc chính | Cao | Trung bình | Cao | Ưu tiên P0 features; tận dụng AI tools tối đa; sprint nhỏ buổi tối/cuối tuần; chấp nhận timeline linh hoạt |
| R4 | **OpenRouter API unstable hoặc tăng giá** — vendor risk | Thấp | Trung bình | Trung bình | Gemini Flash làm fallback; abstract AI layer để switch provider dễ dàng; cache responses |
| R5 | **Performance kém trên Android mid-range** — React Native trên Android hay gặp jank | Trung bình | Trung bình | Trung bình | Dùng FlatList (không ScrollView cho list); React.memo + useCallback; test sớm trên thiết bị thật; Hermes engine (default) |
| R6 | **Scope creep** — thêm feature ngoài plan | Trung bình | Trung bình | Trung bình | Rõ ràng In/Out of Scope; mọi feature mới phải qua CTO approval; dùng P0/P1/P2 priority system |

### 5.2 Kế Hoạch Ứng Phó

- **Self-management:** Dự án cá nhân — tự quyết định mọi thứ, không cần escalation chain
- **Decision log:** Ghi lại các quyết định quan trọng trong GitHub issues/commits để track lại khi cần
- **Contingency Budget:** 10% (~1,795,000₫) cho chi phí phát sinh
- **Contingency Timeline:** Buffer 1-2 tuần giữa "feature complete" và "store submission" — linh hoạt vì không có deadline cứng từ khách hàng

---

## 6. Quy Trình Làm Việc

### 6.1 Daily Workflow

```
Buổi tối (20:00 - 23:00) hoặc Cuối tuần:

1. Review GitHub issues / todo list → chọn task tiếp theo
2. Code với Claude Code — AI pair programming
   - Claude Code hooks tự động check TypeScript khi save
   - Commit thường xuyên, message rõ ràng
3. Test trên thiết bị thật (iPhone + Android)
4. Push code, update progress

Cuối tuần: Tổng kết tuần, plan sprint tiếp theo
```

### 6.2 Git Workflow

```
main ← production-ready code
  │
  ├── feature/auth-otp
  ├── feature/ai-chat
  ├── feature/voice-note
  ├── fix/calendar-countdown-bug
  └── ...

Rule:
- Branch từ main, merge về main (solo nên có thể merge trực tiếp hoặc qua PR)
- Commit requires: 0 TypeScript errors (auto-check via hooks)
- Commit convention: feat: / fix: / refactor: / docs:
- Commit thường xuyên — small, focused commits
```

### 6.3 Definition of Done (DoD)

Một feature/screen được coi là "done" khi:
- [ ] Code implement đầy đủ theo design
- [ ] TypeScript strict — 0 errors (`tsc --noEmit` pass)
- [ ] SafeAreaView + KeyboardAvoidingView đúng
- [ ] Touch targets >= 48dp
- [ ] accessibilityLabel cho interactive elements
- [ ] React.memo cho sub-components, useCallback cho handlers
- [ ] Test trên ít nhất 1 iOS + 1 Android thiết bị thật
- [ ] Self-review code trước khi merge
- [ ] Không hardcode colors (dùng `src/theme/`)

---

## 7. Tiêu Chí Thành Công

### 7.1 Tiêu Chí Nghiệm Thu (v1.0 Release)

- [ ] Tất cả P0 features hoạt động đúng (7 modules core)
- [ ] AI Chat parse thành công > 90% câu Tiếng Việt test cases
- [ ] Voice Note: Record → STT → parse → save hoạt động end-to-end
- [ ] Performance đạt targets: load < 2s, scroll 60 FPS, memory < 150MB
- [ ] 0 critical bugs, < 3 medium bugs (accepted)
- [ ] Store compliance: Privacy Policy live, consent modals, permissions đúng
- [ ] App approved trên cả App Store và Google Play
- [ ] TypeScript 0 errors, ESLint 0 errors
- [ ] Documentation hoàn chỉnh (BRD, SRS, Architecture, Store Guidelines)

### 7.2 Đánh Giá Sau Triển Khai

| Thời điểm | Đánh giá | Tiêu chí |
|-----------|----------|----------|
| +7 ngày | Hotfix sprint | Crash-free > 99%, fix critical bugs từ production |
| +30 ngày | Monthly review | 100+ downloads, crash-free > 99.5%, user feedback tổng hợp |
| +90 ngày | Quarterly review | 1,000+ MAU, retention rate, feature usage analytics |
| +180 ngày | ROI assessment | Monetization readiness, team capability assessment, next product decision |

### 7.3 Lessons Learned

Sau khi go-live, viết retrospective cá nhân:
- Solo + AI tools hiệu quả đến mức nào? Tiết kiệm được bao nhiêu thời gian so với code thủ công?
- React Native + Expo có đáng để dùng cho dự án cá nhân tiếp theo không?
- Chi phí thực tế vs dự kiến — có bất ngờ gì không?
- Nếu làm lại từ đầu, sẽ thay đổi gì?

Kết quả retrospective sẽ được document lại — vừa cho bản thân, vừa có thể chia sẻ với cộng đồng dev Việt Nam.

---

## 8. Progress Tracking

### 8.1 Cách Theo Dõi Tiến Độ

Dự án cá nhân không cần quy trình communication nặng nề. Thay vào đó:

| Công cụ | Mục đích | Tần suất |
|---------|----------|----------|
| GitHub Commits | Lịch sử thay đổi, decision log | Mỗi session coding |
| GitHub Issues | Feature tracking, bug tracking | Tạo khi phát hiện |
| CLAUDE.md | Living documentation — cập nhật khi architecture thay đổi | Khi cần |
| Notion / Notes | Weekly reflection — tuần này làm gì, tuần sau focus gì | Hàng tuần |

### 8.2 Documentation Deliverables

| Document | Thời điểm | Trạng thái |
|----------|-----------|------------|
| BRD (Business Requirements) | Phase 0 | Done |
| SRS (Software Requirements) | Phase 0 | Done |
| Store Guidelines | Phase 0 | Done |
| Technical Proposal | Phase 0 | Done |
| Solution Architecture | Phase 0 | Done |
| Project Plan | Phase 0 | Done (tài liệu này) |
| UI/UX Designs | Phase 0 | In Progress |
| Test Cases | Phase 4 | Pending |
| Store Submission Checklist | Phase 4 | Pending |
| Retrospective Report | Phase 6 | Pending |

---

*Tài liệu này là tài sản trí tuệ cá nhân của Thái Hoàng Mai Học. Mọi quyền được bảo lưu.*
*Ngày tạo: 17/03/2026*
