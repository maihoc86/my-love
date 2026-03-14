---
name: project-estimation
description: |
  Ước tính effort, timeline, chi phí và resource planning cho dự án triển khai CDS Platform.
  Sử dụng khi: cần báo giá dự án, ước tính thời gian triển khai, lập resource plan,
  tính toán chi phí, hoặc phân bổ team cho dự án.
  Trigger: "ước tính", "estimation", "báo giá", "effort", "timeline dự án",
  "resource plan", "bao lâu", "tốn bao nhiêu", "cần bao nhiêu người",
  "project cost", "pricing", "quotation", "man-day", "man-month".
metadata:
  version: 1.0.0
  category: project-management
  domain: estimation
---

# Project Estimation - Ước Tính Dự Án CDS

Công cụ ước tính effort, timeline, chi phí và resource planning cho dự án triển khai CDS Platform.

## Trước Khi Bắt Đầu

**Đọc context bắt buộc:**
- `.claude/context/services.md` - CDS Platform modules & services
- `.claude/context/team-roster.md` - Năng lực team hiện tại
- `.claude/context/clients/[tên-khách].md` - Nếu có discovery data

---

## Estimation Framework

### Quy Trình 4 Bước

```
1. Scope Definition → 2. Effort Estimation → 3. Resource Planning → 4. Cost Calculation
```

---

## Bước 1: Scope Definition

### Phân Loại Dự Án

| Loại | Quy mô | Timeline | Team size | Budget range |
|------|--------|----------|-----------|-------------|
| **Small** | 1-2 modules, basic config | 1-3 tháng | 2-3 người | 200-500 triệu |
| **Medium** | 3-5 modules, customization | 3-6 tháng | 4-6 người | 500 triệu - 1.5 tỷ |
| **Large** | 6-10 modules, integration | 6-12 tháng | 6-10 người | 1.5 - 4 tỷ |
| **Enterprise** | Full 12 modules, complex | 12-24 tháng | 10-15 người | 4 - 10+ tỷ |

### Scope Checklist

- [ ] Modules CDS Platform nào cần triển khai?
- [ ] Customization requirements?
- [ ] Integration với hệ thống hiện có?
- [ ] Data migration volume?
- [ ] Số lượng users?
- [ ] Training requirements?
- [ ] Go-live strategy (Big Bang vs Phased)?
- [ ] Support & maintenance requirements?

---

## Bước 2: Effort Estimation

### Effort Cho Từng Module CDS Platform

**Baseline Effort (man-days) - Medium complexity:**

| Module | Config | Custom | Integration | Testing | Total |
|--------|--------|--------|-------------|---------|-------|
| M1: Sales Management | 15 | 10-20 | 5-10 | 8 | 38-53 |
| M2: Trade Marketing | 12 | 8-15 | 5-8 | 6 | 31-41 |
| M3: Marketing | 15 | 10-25 | 8-12 | 8 | 41-60 |
| M4: CDP | 20 | 15-30 | 10-15 | 10 | 55-75 |
| M5: Inventory | 15 | 10-20 | 8-12 | 8 | 41-55 |
| M6: Purchasing | 12 | 8-15 | 5-8 | 6 | 31-41 |
| M7: Production | 18 | 12-25 | 8-12 | 10 | 48-65 |
| M8: HR | 15 | 10-20 | 5-10 | 8 | 38-53 |
| M9: Accounting | 20 | 15-30 | 10-15 | 12 | 57-77 |
| M10: BI | 15 | 10-25 | 8-12 | 8 | 41-60 |
| M11: Integration | 10 | 15-30 | 15-25 | 10 | 50-75 |
| M12: Advanced Tech | 15 | 20-40 | 10-15 | 12 | 57-82 |

### Complexity Multiplier

| Factor | Low (0.8x) | Medium (1.0x) | High (1.5x) | Very High (2.0x) |
|--------|-----------|---------------|-------------|-----------------|
| Customization | Dùng mặc định | Chỉnh sửa nhỏ | Tùy biến nhiều | Dev từ đầu |
| Integration | Không | 1-2 hệ thống | 3-5 hệ thống | 5+ hệ thống |
| Data migration | Không | < 100K records | 100K-1M | > 1M records |
| User count | < 50 | 50-200 | 200-500 | > 500 |
| Process complexity | Standard | Vài ngoại lệ | Nhiều ngoại lệ | Rất phức tạp |

### Công Thức Tính Effort

```
Total Effort = Σ (Module Base Effort × Complexity Multiplier)
             + Project Management (15-20% of total)
             + Training (10-15% of total)
             + Buffer (15-25% of total)
             + Data Migration (case by case)
```

### Effort Cho Hoạt Động Chung

| Hoạt động | Effort (man-days) | Ghi chú |
|-----------|-------------------|---------|
| Project kickoff & planning | 5-10 | Depending on scale |
| Requirement analysis | 10-20 | Per module group |
| System design & architecture | 8-15 | One-time |
| Data migration (small) | 10-20 | < 100K records |
| Data migration (medium) | 20-40 | 100K-1M records |
| Data migration (large) | 40-80 | > 1M records |
| UAT support | 10-20 | Per phase |
| Go-live support | 5-10 | Per phase |
| Training (basic) | 3-5 | Per module |
| Training (advanced) | 5-10 | Per module |
| Documentation | 5-15 | Per module |
| Project management | 15-20% total | Continuous |

---

## Bước 3: Resource Planning

### Vai Trò & Tỷ Lệ Phân Bổ

| Vai trò | Allocation | Responsibility |
|---------|-----------|---------------|
| Project Manager | 100% | Quản lý tiến độ, stakeholder |
| Business Analyst | 50-100% | Requirements, process design |
| Solution Architect | 30-50% | Technical design, review |
| Developer (Senior) | 100% | Core development, integration |
| Developer (Junior) | 100% | Module config, customization |
| QA Engineer | 50-100% | Testing, validation |
| Data Engineer | As needed | Migration, ETL |
| Trainer | As needed | End-user training |

### Team Structure Theo Quy Mô

**Small Project (1-3 tháng):**
```
PM (50%) + BA/Dev (100%) + Dev (100%) + QA (50%)
= 3 FTE equivalent
```

**Medium Project (3-6 tháng):**
```
PM (100%) + BA (100%) + SA (30%) + Sr.Dev (100%) + Dev (100%) + QA (100%)
= 5.3 FTE equivalent
```

**Large Project (6-12 tháng):**
```
PM (100%) + BA (100%) + SA (50%) + Sr.Dev ×2 (100%) + Dev ×2 (100%) + QA (100%) + Data Eng (50%)
= 8.5 FTE equivalent
```

### Timeline Estimation

```
Timeline (months) = Total Effort (man-days) ÷ (Team Size × 22 working days/month) × 1.2 buffer
```

**Milestones Chuẩn:**

| Phase | % Timeline | Deliverables |
|-------|-----------|-------------|
| Initiation & Planning | 10% | Project plan, SOW signed |
| Analysis & Design | 20% | SRS, system design, process maps |
| Build & Configure | 35% | Configured modules, customizations |
| Testing (SIT + UAT) | 20% | Test reports, bug fixes |
| Go-Live & Handover | 10% | Deployment, training, documentation |
| Stabilization | 5% | Bug fixes, optimization |

---

## Bước 4: Cost Calculation

### Cấu Trúc Chi Phí

```
Tổng Chi Phí = License + Implementation + Training + Support

1. License Fee
   - CDS Platform: Per module/user/month hoặc perpetual
   - Third-party: Cloud hosting, SMS, email service...

2. Implementation Fee
   = Total Man-days × Daily Rate
   - Daily rate tham khảo: [Xem services.md - NỘI BỘ]

3. Training Fee
   - Per session hoặc package

4. Support & Maintenance (Year 1+)
   - Thường 15-20% của implementation fee/năm
```

### Output Template: Bảng Tóm Tắt Chi Phí

```
╔══════════════════════════════════════════════╗
║         DỰ ÁN: [TÊN KHÁCH HÀNG]            ║
║         ESTIMATION SUMMARY                    ║
╠══════════════════════════════════════════════╣
║                                              ║
║  Scope: [SỐ] modules CDS Platform           ║
║  Timeline: [SỐ] tháng                       ║
║  Team: [SỐ] FTE                             ║
║                                              ║
║  EFFORT BREAKDOWN:                           ║
║  ├── Analysis & Design:    [XX] man-days     ║
║  ├── Build & Configure:    [XX] man-days     ║
║  ├── Testing:              [XX] man-days     ║
║  ├── Training:             [XX] man-days     ║
║  ├── Project Management:   [XX] man-days     ║
║  └── Buffer (20%):         [XX] man-days     ║
║  TOTAL:                    [XX] man-days     ║
║                                              ║
║  COST BREAKDOWN:                             ║
║  ├── License:              [XXX] triệu       ║
║  ├── Implementation:       [XXX] triệu       ║
║  ├── Training:             [XXX] triệu       ║
║  └── Year 1 Support:       [XXX] triệu       ║
║  TOTAL:                    [X.X] tỷ          ║
║                                              ║
╚══════════════════════════════════════════════╝
```

---

## Estimation Cheat Sheet

### Quick Estimation (Rough Order of Magnitude)

Khi cần estimate nhanh mà chưa có detail:

| Câu hỏi | Nếu... | ROM |
|----------|--------|-----|
| Bao nhiêu module? | 1-3 | 2-4 tháng, 300-500M |
| | 4-6 | 4-8 tháng, 800M-1.5B |
| | 7-10 | 8-14 tháng, 1.5-3B |
| | Full 12 | 12-24 tháng, 3-8B |
| Có integration? | Không | +0% |
| | 1-2 hệ thống | +15-20% |
| | 3+ hệ thống | +25-40% |
| Data migration? | < 100K records | +5-10% |
| | > 100K records | +15-25% |
| Customization level? | Low | +0% |
| | Medium | +20-30% |
| | High | +40-60% |

### Risk Factors (Tăng buffer)

| Risk | Impact | Khuyến nghị |
|------|--------|-------------|
| Khách hàng chưa rõ requirements | +20-30% buffer | Tăng phase Analysis |
| Lần đầu triển khai ngành này | +15-20% buffer | Thêm research time |
| Integration với legacy system | +20-30% buffer | POC trước |
| Change management concerns | +10-15% buffer | Thêm training |
| Tight deadline | -20% scope hoặc +team | Không giảm quality |

---

## Workflow Tích Hợp

```
client-discovery (Scope) → project-estimation (Cost & Timeline)
                         → solution-proposal (Formal Proposal)
                         → contract-sow-generator (SOW)
                         → xlsx (Export bảng chi phí Excel)
```
