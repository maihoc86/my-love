# Báo Cáo Trạng Thái Dự Án

**Dự án:** {{projectName}}
**Project Manager:** {{projectManager}}
**Ngày báo cáo:** {{reportDate}}
**Kỳ báo cáo:** {{reportPeriod}}

---

## 1. Tổng Quan Dự Án

| Thông tin | Chi tiết |
|-----------|----------|
| Tên dự án | {{projectName}} |
| Khách hàng | {{clientName}} |
| Bắt đầu | {{startDate}} |
| Kết thúc dự kiến | {{endDate}} |
| Project Manager | {{projectManager}} |
| Team size | {{teamSize}} |

---

## 2. Trạng Thái Tổng Thể

### Traffic Light Status

| Hạng mục | Trạng thái | Ghi chú |
|----------|------------|---------|
| **Tổng thể** | {{overallStatus}} | {{overallNote}} |
| **Timeline** | {{timelineStatus}} | {{timelineNote}} |
| **Ngân sách** | {{budgetStatus}} | {{budgetNote}} |
| **Chất lượng** | {{qualityStatus}} | {{qualityNote}} |
| **Rủi ro** | {{riskStatus}} | {{riskNote}} |

> Chú thích: GREEN = Đúng kế hoạch | YELLOW = Cần chú ý | RED = Cần can thiệp

---

## 3. Tiến Độ Hoàn Thành

### 3.1 Progress Overview

```
Tổng tiến độ: {{completionPercentage}}%
[{{progressBar}}]

Phase 1 - Analysis:    [##########] 100%  DONE
Phase 2 - Design:      [##########] 100%  DONE
Phase 3 - Development: [{{devBar}}] {{devPercent}}%  {{devStatus}}
Phase 4 - Testing:     [{{testBar}}] {{testPercent}}%  {{testStatus}}
Phase 5 - Deployment:  [{{deployBar}}] {{deployPercent}}%  {{deployStatus}}
```

### 3.2 Milestone Status

| # | Milestone | Planned Date | Actual Date | Status | Variance |
|---|-----------|-------------|-------------|--------|----------|
| M1 | {{milestone1}} | {{m1Planned}} | {{m1Actual}} | {{m1Status}} | {{m1Variance}} |
| M2 | {{milestone2}} | {{m2Planned}} | {{m2Actual}} | {{m2Status}} | {{m2Variance}} |
| M3 | {{milestone3}} | {{m3Planned}} | {{m3Actual}} | {{m3Status}} | {{m3Variance}} |
| M4 | {{milestone4}} | {{m4Planned}} | {{m4Actual}} | {{m4Status}} | {{m4Variance}} |

---

## 4. Metrics

### 4.1 Delivery Metrics

| Metric | Planned | Actual | Variance |
|--------|---------|--------|----------|
| Tasks hoàn thành | {{plannedTasks}} | {{actualTasks}} | {{taskVariance}} |
| Story Points | {{plannedSP}} | {{actualSP}} | {{spVariance}} |
| Sprint Velocity | {{plannedVelocity}} | {{actualVelocity}} | {{velVariance}} |

### 4.2 Quality Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Bugs Found | <{{bugTarget}} | {{bugsFound}} | {{bugStatus}} |
| Test Coverage | >{{coverageTarget}}% | {{actualCoverage}}% | {{coverageStatus}} |
| Code Review | 100% | {{reviewRate}}% | {{reviewStatus}} |

---

## 5. Đánh Giá Rủi Ro (Risk Assessment)

### 5.1 Top Risks

| # | Risk | Probability | Impact | Level | Mitigation | Owner |
|---|------|-------------|--------|-------|------------|-------|
| 1 | {{risk1}} | {{riskProb1}} | {{riskImpact1}} | {{riskLevel1}} | {{riskAction1}} | {{riskOwner1}} |
| 2 | {{risk2}} | {{riskProb2}} | {{riskImpact2}} | {{riskLevel2}} | {{riskAction2}} | {{riskOwner2}} |
| 3 | {{risk3}} | {{riskProb3}} | {{riskImpact3}} | {{riskLevel3}} | {{riskAction3}} | {{riskOwner3}} |

### 5.2 Issues Đang Mở

| # | Issue | Priority | Owner | Status | ETA |
|---|-------|----------|-------|--------|-----|
| 1 | {{issue1}} | {{issuePriority1}} | {{issueOwner1}} | {{issueStatus1}} | {{issueEta1}} |
| 2 | {{issue2}} | {{issuePriority2}} | {{issueOwner2}} | {{issueStatus2}} | {{issueEta2}} |

---

## 6. Trạng Thái Ngân Sách

| Hạng mục | Kế hoạch | Đã chi | Còn lại | % Sử dụng |
|----------|----------|--------|---------|-----------|
| Nhân sự | {{hrBudget}} | {{hrSpent}} | {{hrRemaining}} | {{hrPercent}}% |
| Hạ tầng | {{infraBudget}} | {{infraSpent}} | {{infraRemaining}} | {{infraPercent}}% |
| Tools/License | {{toolsBudget}} | {{toolsSpent}} | {{toolsRemaining}} | {{toolsPercent}}% |
| Dự phòng | {{contingencyBudget}} | {{contingencySpent}} | {{contingencyRemaining}} | {{contingencyPercent}}% |
| **TỔNG** | **{{totalBudget}}** | **{{totalSpent}}** | **{{totalRemaining}}** | **{{totalPercent}}%** |

Budget Burn Rate: {{burnRate}}/tháng
Projected Total: {{projectedTotal}}

---

## 7. Giai Đoạn Tiếp Theo

### 7.1 Kế Hoạch Tuần/Tháng Tới

| # | Hạng mục | Responsible | Deadline | Priority |
|---|----------|-------------|----------|----------|
| 1 | {{nextItem1}} | {{nextOwner1}} | {{nextDeadline1}} | {{nextPriority1}} |
| 2 | {{nextItem2}} | {{nextOwner2}} | {{nextDeadline2}} | {{nextPriority2}} |
| 3 | {{nextItem3}} | {{nextOwner3}} | {{nextDeadline3}} | {{nextPriority3}} |

### 7.2 Key Decisions Cần Thiết

{{decisionsNeeded}}

### 7.3 Yêu Cầu Hỗ Trợ

{{supportRequests}}

---

**Xác nhận:**

| Vai trò | Người | Ngày |
|---------|-------|------|
| PM | {{projectManager}} | {{reportDate}} |
| CTO | {{ctoName}} | _______ |
| Client | {{clientName}} | _______ |

---

*Tạo bởi CTO AI Assistant - {{reportDate}}*
