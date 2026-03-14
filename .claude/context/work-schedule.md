# Lịch Làm Việc & Quy Trình Agile

> AI sử dụng thông tin này để:
> - Tính timeline dự án chính xác (trừ ngày nghỉ)
> - Đặt lịch họp / milestone phù hợp
> - Ghi đúng giờ làm việc trong SLA, SOW
> - Áp dụng đúng quy trình Agile khi lập kế hoạch sprint, backlog

## Giờ Làm Việc

- **Thứ 2 - Thứ 6:** 08:00 - 12:00, 13:00 - 17:00 (8 giờ/ngày)
- **Thứ 7:** 08:00 - 12:00 (4 giờ, chỉ sáng)
- **Chủ Nhật:** Nghỉ
- **Timezone:** Asia/Ho_Chi_Minh (UTC+7)
- **Nghỉ trưa:** 12:00 - 13:00
- **Tổng giờ/tuần:** 44 giờ (40h Thứ 2-Thứ 6 + 4h Thứ 7)

## Ngày Nghỉ Lễ 2026

> Cập nhật hàng năm. AI dùng để trừ ngày khi tính timeline.

| Ngày | Dịp lễ | Số ngày nghỉ |
|------|--------|-------------|
| 01/01 | Tết Dương lịch | 1 |
| 28/01 - 02/02 | Tết Nguyên Đán | 6 |
| 10/03 (ÂL) | Giỗ Tổ Hùng Vương | 1 |
| 30/04 | Giải phóng Miền Nam | 1 |
| 01/05 | Quốc tế Lao động | 1 |
| 02/09 - 03/09 | Quốc khánh | 2 |
| **Tổng** | | **~12 ngày** |

> Thêm ngày nghỉ bù, ngày nghỉ riêng của công ty nếu có.

---

## Quy Trình Agile - Mô Hình Scrumban

> Công ty áp dụng **Scrumban** (kết hợp Scrum + Kanban) để tận dụng cả hai:
> - Scrum: cấu trúc sprint, ceremony, vai trò rõ ràng
> - Kanban: trực quan hoá luồng công việc, WIP limit, tối ưu liên tục

### Triết Lý Agile

- **Individuals & Interactions** > processes & tools
- **Working Software** > comprehensive documentation
- **Customer Collaboration** > contract negotiation
- **Responding to Change** > following a plan
- Delivery liên tục, phản hồi nhanh, tự cải tiến, cross-functional teams

### Vai Trò Scrum

| Vai trò | Trách nhiệm |
|---------|------------|
| **Product Owner (PO)** | Quản lý Product Backlog, sắp xếp ưu tiên, đảm bảo giá trị sản phẩm, làm việc với stakeholders |
| **Scrum Master (SM)** | Hỗ trợ team theo Scrum, loại bỏ trở ngại, facilitate ceremonies, bảo vệ team khỏi gián đoạn |
| **Development Team** | Cross-functional, tự tổ chức, chịu trách nhiệm deliver Increment mỗi sprint |

### Cấu Trúc Sprint

- **Thời lượng sprint:** 2 tuần
- **Bắt đầu sprint:** Thứ 2
- **Kết thúc sprint:** Thứ 6

### Sự Kiện Scrum (Ceremonies)

| Sự kiện | Thời lượng | Thời điểm | Thành phần | Mục đích |
|---------|-----------|-----------|-----------|----------|
| **Sprint Planning** | ~4h (sprint 2 tuần) | Thứ 2 đầu sprint, 08:00 | Full team + PO | Xác định Sprint Goal, chọn items từ Product Backlog, lập Sprint Backlog |
| **Daily Scrum** | 15 phút | Mỗi ngày, 09:00 | Dev team | Đồng bộ tiến độ: Hôm qua làm gì? Hôm nay làm gì? Có blocker? |
| **Sprint Review** | ~2h | Thứ 6 cuối sprint, 14:00 | Team + Stakeholders | Demo Increment, thu thập feedback, cập nhật Product Backlog |
| **Sprint Retrospective** | ~1.5h | Thứ 6 cuối sprint, 16:00 | Dev team + SM | Nhìn lại sprint: điều gì tốt? cần cải thiện? action items |
| **Backlog Refinement** | ~2h | Giữa sprint (Thứ 4) | PO + Dev team | Làm rõ user stories, estimate, tách task, đảm bảo DoR |

### Thực Hành Kanban (Kết Hợp Trong Scrumban)

- **Kanban Board:** Trực quan hoá luồng công việc trên board (To Do → In Progress → Review → Testing → Done)
- **WIP Limits:** Giới hạn số lượng task "In Progress" để tránh overload (khuyến nghị: 2-3 task/người)
- **Pull System:** Dev tự kéo task khi có capacity, không bị push
- **Cycle Time:** Theo dõi thời gian từ bắt đầu → hoàn thành 1 task
- **Continuous Flow:** Không đợi hết sprint mới release, có thể deploy liên tục nếu task done

### Quản Lý Backlog

#### Product Backlog
- PO quản lý, sắp xếp theo giá trị kinh doanh
- Items: User Stories, Bugs, Technical Debt, Spikes
- Ưu tiên theo **WSJF** (Weighted Shortest Job First):
  - WSJF = (Business Value + Time Criticality + Risk Reduction) / Job Size
  - Ưu tiên: WSJF cao nhất làm trước

#### Định Dạng User Story
```
As a [role], I want [feature], so that [benefit]
Acceptance Criteria:
- Given [context], When [action], Then [result]
```

#### Definition of Ready (DoR)
- User story rõ ràng, có acceptance criteria
- Đã estimate (Story Points)
- Không có dependency chưa giải quyết
- Có mockup/wireframe (nếu cần)
- PO đã confirm ưu tiên

#### Definition of Done (DoD)
- Code hoàn thành, đã review (PR approved)
- Unit tests pass (coverage >= target)
- Integration tests pass
- Documentation cập nhật
- Deploy thành công lên staging
- PO đã accept

### Ước Lượng (Estimation)

- **Story Points:** Fibonacci (1, 2, 3, 5, 8, 13, 21)
- **Planning Poker:** Team cùng estimate
- **T-shirt Sizing:** Cho high-level estimate (S, M, L, XL)
- **Velocity:** Theo dõi trung bình story points/sprint để dự báo capacity

### Chỉ Số Agile (Metrics)

| Chỉ số | Mục đích | Target |
|--------|---------|--------|
| **Velocity** | Số story points hoàn thành/sprint | Ổn định qua các sprint |
| **Sprint Goal Success** | % sprint đạt được Sprint Goal | >= 85% |
| **Cycle Time** | Thời gian trung bình hoàn thành 1 task | Giảm dần |
| **Throughput** | Số items hoàn thành/sprint | Tăng dần |
| **Defect Rate** | Số bugs phát sinh/sprint | Giảm dần |
| **Sprint Burndown** | Tiến độ trong sprint | Tuyến thực tế sát tuyến lý tưởng |
| **Cumulative Flow (CFD)** | Phân bổ task theo trạng thái | Không có bottleneck |
| **Flow Efficiency** | % thời gian làm việc thực / tổng thời gian | Càng cao càng tốt |

### Công Cụ (Tools)

| Mục đích | Công cụ |
|---------|--------|
| Quản lý dự án | Jira, Trello, Azure DevOps |
| Quản lý mã nguồn | GitHub, GitLab |
| CI/CD | Jenkins, GitHub Actions, GitLab CI |
| Tài liệu | Confluence, Notion |
| Giao tiếp | Slack, Microsoft Teams |
| Thiết kế | Figma |

### Quy Trình Sprint Chi Tiết

```
1. BACKLOG GROOMING (Liên tục)
   PO cập nhật, ưu tiên Product Backlog
   Team Refinement giữa sprint
   ↓
2. SPRINT PLANNING (Đầu sprint - Thứ 2)
   Chọn items theo Velocity & Priority
   Xác định Sprint Goal
   Tạo Sprint Backlog, tách tasks
   ↓
3. EXECUTION (Trong sprint)
   Daily Scrum 15 phút/ngày
   Dev pull task từ Sprint Backlog
   WIP limit: 2-3 task/người
   Code → Review → Test → Done
   ↓
4. SPRINT REVIEW (Cuối sprint - Thứ 6)
   Demo Increment cho stakeholders
   Thu thập feedback
   Cập nhật Product Backlog
   ↓
5. SPRINT RETROSPECTIVE (Cuối sprint - Thứ 6)
   Điều gì tốt?
   Điều gì cần cải thiện?
   Action items cho sprint tiếp
   ↓
6. LẶP LẠI → Cải tiến liên tục
```

### Quản Lý Dependency & Rủi Ro

- **Dependency Board:** Trực quan hoá dependency giữa các team/task
- **Risk Register:** Theo dõi rủi ro, kế hoạch giảm thiểu
- **Blocker Escalation:** Blocker > 24h → Escalate lên SM → CTO
- **Cross-team Sync:** Khi có dependency giữa các team, tổ chức Scrum of Scrums

### Văn Hoá Agile

- **Tự tổ chức (Self-organizing):** Team tự quyết định cách làm, không micro-manage
- **Cross-functional:** Mỗi team có đủ kỹ năng để deliver end-to-end
- **Minh bạch (Transparency):** Mọi thông tin được chia sẻ công khai (board, metrics, blockers)
- **Kiểm tra & Thích ứng (Inspect & Adapt):** Liên tục kiểm tra và điều chỉnh quy trình
- **Thất bại nhanh, học nhanh (Fail Fast, Learn Fast):** Khuyến khích thử nghiệm, chấp nhận thất bại để học hỏi
- **Kaizen:** Cải tiến liên tục, nhỏ nhưng đều đặn

## Cam Kết Thời Gian Phản Hồi

> Dùng trong SLA, SOW

| Kênh | Thời gian phản hồi | Ghi chú |
|------|--------------|---------|
| Email | Trong 24h làm việc | |
| Slack/Teams | Trong 4h làm việc | |
| Phone (khẩn cấp) | Trong 1h | Chỉ cho P0/P1 |
| Ticket (bình thường) | Trong 48h làm việc | |
| Ticket (nghiêm trọng) | Trong 4h làm việc | |
