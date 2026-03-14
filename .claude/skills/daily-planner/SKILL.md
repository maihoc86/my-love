---
name: daily-planner
description: >-
  AI-powered daily task management for CTO. Reads tasks from Notion "CTO Daily Tasks" database,
  auto-prioritizes using Eisenhower Matrix + Impact/Urgency scoring, breaks down complex tasks
  into subtasks, and generates optimized daily schedules based on energy levels.
  Use when user says "plan ngày hôm nay", "daily plan", "task hôm nay", "lịch làm việc",
  "break down task", "thêm task", "add task", "cập nhật task", "morning briefing",
  "what should I do today", "prioritize my tasks", or mentions daily planning.
metadata:
  version: 1.0.0
  author: CTO Office - Tiên Phong CDS
  category: productivity
  domain: task-management
  updated: 2026-03-05
  integrations: notion, telegram
  notion-database-id: cc3c36193ecb4080be239c8970e5cb23
  notion-data-source-id: baf9a934-ba96-40a2-8278-4b0ce24d4a67
---

# Daily Planner - Quản Lý Task CTO

AI tự động đọc Notion, phân tích ưu tiên, break down task, và tạo lịch làm việc tối ưu cho CTO mỗi ngày.

## Keywords
daily plan, plan ngày, task hôm nay, lịch làm việc, morning briefing, daily briefing, thêm task, add task, break down, ưu tiên, priority, cập nhật task, update task, review tasks, what should I do, việc hôm nay, to do today, daily schedule, notion tasks, task management

## Thông Tin Notion Database

- **Database URL**: https://www.notion.so/cc3c36193ecb4080be239c8970e5cb23
- **Data Source ID**: `baf9a934-ba96-40a2-8278-4b0ce24d4a67`

### Cấu Trúc Properties
| Property | Type | Giá trị |
|----------|------|---------|
| Task | title | Văn bản tự do |
| Priority | select | P0 - Critical, P1 - High, P2 - Medium, P3 - Low |
| Status | status | Not started, In progress, Done |
| Category | select | Strategic, Operational, Meeting, Review, Communication, Learning |
| Deadline | date | Ngày ISO |
| Estimated Time | select | 15m, 30m, 1h, 2h, 3h, 4h+ |
| Energy Level | select | High Focus, Medium, Low/Routine |
| Parent Task | text | Liên kết đến task cha |
| Subtasks | text | Danh sách subtasks đã chia nhỏ |
| Notes | text | Ghi chú, bối cảnh bổ sung |
| AI Summary | text | AI tóm tắt và gợi ý hành động |
| Source | select | Manual, Claude Code, Telegram, Voice/Siri |
| Created Date | date | Ngày tạo task |

## Các Workflow Chính

### 1. Morning Briefing (Chạy mỗi sáng)

Khi user nói: "plan ngày hôm nay", "morning briefing", "daily plan"

**Các bước thực hiện:**

1. **Đọc tasks từ Notion**: Tìm trong database "CTO Daily Tasks" lấy tất cả tasks chưa hoàn thành
2. **Phân tích và sắp xếp**:
   - Lọc tasks có deadline hôm nay hoặc quá hạn
   - Sắp xếp theo Priority (P0 > P1 > P2 > P3)
   - Xét dependencies giữa các tasks
3. **Tạo daily schedule** theo energy blocks:

```
=== MORNING BRIEFING - [Ngày] ===

TỔNG QUAN:
- [X] tasks hôm nay, tổng ước tính: [Y] giờ
- [Z] tasks quá hạn cần xử lý

LỊCH LÀM VIỆC TỐI ƯU:

08:00 - 10:00 | HIGH FOCUS BLOCK
  [P0] Task A (1h) - lý do
  [P1] Task B (1h) - lý do

10:00 - 10:15 | NGHỈ GIẢI LAO

10:15 - 12:00 | MEDIUM FOCUS BLOCK
  [P1] Task C (1h)
  [P2] Task D (30m)

12:00 - 13:00 | NGHỈ TRƯA

13:00 - 14:00 | LOW ENERGY BLOCK
  [P3] Task E - email, đọc tài liệu

14:00 - 16:00 | MEETING BLOCK
  [P0] Meeting F (2h)

16:00 - 17:00 | TỔNG KẾT
  Review & cập nhật tasks
  Lên kế hoạch ngày mai

CẢNH BÁO:
- Task [X] quá hạn 2 ngày!
- Hôm nay có [Y] meetings, chỉ còn [Z]h cho deep work
```

4. **Cập nhật AI Summary** cho từng task trong Notion
5. **Hỏi user**: Có muốn điều chỉnh gì không?

### 2. Thêm Task Mới

Khi user nói: "thêm task [mô tả]", "add task [mô tả]"

**Các bước thực hiện:**

1. Phân tích mô tả task từ user
2. Tự động đánh giá:
   - **Priority**: Dựa trên urgency + impact keywords
     - P0: "urgent", "critical", "khách hàng phàn nàn", "downtime", "security"
     - P1: "quan trọng", "deadline gần", "block team", "revenue"
     - P2: "cần làm", "tuần này", "cải thiện"
     - P3: "khi rảnh", "nice to have", "đọc thêm"
   - **Category**: Dựa trên nội dung
     - Strategic: "strategy", "roadmap", "planning", "vision"
     - Meeting: "họp", "meeting", "call", "sync"
     - Review: "review", "PR", "code", "architecture"
     - Communication: "email", "trả lời", "thông báo"
     - Learning: "đọc", "học", "research", "article"
   - **Energy Level**: Dựa trên độ phức tạp
   - **Estimated Time**: Dựa trên phạm vi
3. Tạo task trong Notion với metadata đầy đủ
4. Nếu task lớn (ước tính > 2h), tự động break down thành subtasks
5. Cập nhật daily schedule nếu cần

### 3. Break Down Task

Khi user nói: "break down [task]", "chia nhỏ [task]"

**Quy tắc break down:**

- Mỗi subtask: 15-30 phút
- Định dạng: `[STT]. [Mô tả cụ thể] ([thời gian])`
- Bao gồm: chuẩn bị, thực hiện, review/validate
- Với tasks liên quan đến khách hàng, thêm bước validate-client-ready

**Ví dụ break down "Viết proposal cho khách hàng":**
```
1. Đọc lại meeting notes và requirements (15m)
2. Xác định tech stack phù hợp (30m)
3. Draft proposal từ template technical-proposal.md (60m)
4. Review pricing và timeline (30m)
5. Chạy validate-client-ready.sh (15m)
6. Viết email gửi kèm proposal (15m)
Tổng: 2h45m → Làm tròn: 3h
```

Cập nhật field "Subtasks" và "Estimated Time" trong Notion.

### 4. Cập Nhật Trạng Thái Task

Khi user nói: "xong [task]", "hoàn thành [task]", "done [task]"

1. Tìm task trong Notion
2. Cập nhật Status → Done
3. Nếu có subtasks, hỏi đã hoàn thành hết chưa
4. Tính lại thời gian còn lại cho ngày
5. Gợi ý task tiếp theo nên làm

### 5. End-of-Day Review

Khi user nói: "review ngày hôm nay", "kết thúc ngày", "end of day"

1. Đọc tất cả tasks hôm nay từ Notion
2. Tổng kết:
   - Tasks hoàn thành: X/Y
   - Thời gian đã dùng vs dự kiến
   - Tasks chuyển sang ngày mai
3. Tự động chuyển tasks chưa xong sang ngày mai
4. Gợi ý priority cho ngày mai

## Thuật Toán Tính Điểm Ưu Tiên

```
Score = (Impact * 3) + (Urgency * 2) + (Dependency * 1)

Impact (1-5):
  5: Ảnh hưởng revenue/khách hàng trực tiếp
  4: Ảnh hưởng hiệu suất team
  3: Cải thiện quy trình/chất lượng
  2: Cải tiến nội bộ
  1: Có thì tốt

Urgency (1-5):
  5: Quá hạn / Hôm nay bắt buộc
  4: Deadline ngày mai
  3: Deadline trong tuần
  2: Deadline trong tháng
  1: Không có deadline

Dependency (1-5):
  5: Block nhiều người/team khác
  4: Block 1-2 người
  3: Block task khác của mình
  2: Không block ai nhưng liên quan
  1: Độc lập hoàn toàn

Phân loại:
  Score >= 20: P0 - Critical
  Score >= 14: P1 - High
  Score >= 8:  P2 - Medium
  Score < 8:   P3 - Low
```

## Lịch Làm Việc Theo Năng Lượng

```
08:00 - 10:00: HIGH FOCUS (Deep work, coding, kiến trúc, viết tài liệu)
10:00 - 10:15: NGHỈ GIẢI LAO
10:15 - 12:00: HIGH FOCUS (Tiếp tục deep work)
12:00 - 13:00: NGHỈ TRƯA
13:00 - 14:00: LOW ENERGY (Email, Slack, đọc tài liệu, admin)
14:00 - 16:00: MEDIUM FOCUS (Họp, review, thảo luận)
16:00 - 17:00: MEDIUM FOCUS (Lên kế hoạch, viết tài liệu, tổng kết)
17:00 - 17:30: REVIEW (Tổng kết cuối ngày, lên kế hoạch ngày mai)
```

Lưu ý: Lịch có thể tùy chỉnh theo sở thích của CTO.

## Tích Hợp Với Telegram Bot

Khi AI tạo daily plan hoặc có task quan trọng:
1. Định dạng tin nhắn thành Telegram-friendly markdown
2. Gọi script: `python tools/telegram-bot/send_reminder.py --message "..."`
3. Bot gửi trực tiếp đến CTO qua Telegram

### Các trigger nhắc hẹn:
- 07:30: Tóm tắt morning briefing
- 30 phút trước mỗi cuộc họp
- 16:30: Nhắc nhở review cuối ngày
- Khi có task P0 mới được tạo

## Lưu Ý Quan Trọng

1. **Luôn đọc Notion trước** - Không bao giờ giả định task list, luôn fetch mới nhất
2. **Không tự ý thay đổi priority** - Gợi ý thay đổi nhưng chờ user xác nhận
3. **Giữ AI Summary ngắn gọn** - Tối đa 2 câu, tập trung vào lời khuyên hành động
4. **Tiếng Việt là chính** - Giao tiếp bằng tiếng Việt, chuyển Anh khi cần
5. **Không bịa deadline** - Nếu user không cho deadline, để trống
6. **Tôn trọng quyết định của user** - Nếu user tự set priority, không để AI ghi đè
