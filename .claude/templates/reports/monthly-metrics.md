# Báo Cáo Metrics Hàng Tháng

**Tháng:** {{monthYear}}
**Team:** {{teamName}}
**Quy mô team:** {{teamSize}} thành viên
**Người tạo:** {{reportAuthor}}

---

## 1. KPIs Tổng Quan

| KPI | Mục tiêu | Thực tế | Đạt/Chưa | Trend |
|-----|----------|---------|-----------|-------|
| Delivery On-time | {{targetOnTime}}% | {{actualOnTime}}% | {{statusOnTime}} | {{trendOnTime}} |
| Code Quality | {{targetQuality}}% | {{actualQuality}}% | {{statusQuality}} | {{trendQuality}} |
| Sprint Velocity | {{targetVelocity}} SP | {{actualVelocity}} SP | {{statusVelocity}} | {{trendVelocity}} |
| Bug Rate | <{{targetBugRate}} | {{actualBugRate}} | {{statusBugRate}} | {{trendBugRate}} |
| Team Satisfaction | >{{targetSatisfaction}}/5 | {{actualSatisfaction}}/5 | {{statusSatisfaction}} | {{trendSatisfaction}} |

---

## 2. Delivery Metrics

### 2.1 Projects Delivered

| # | Project | Status | Delivery Date | On-time |
|---|---------|--------|---------------|---------|
| 1 | {{project1}} | {{status1}} | {{deliveryDate1}} | {{onTime1}} |
| 2 | {{project2}} | {{status2}} | {{deliveryDate2}} | {{onTime2}} |
| 3 | {{project3}} | {{status3}} | {{deliveryDate3}} | {{onTime3}} |

**Tổng projects delivered:** {{projectsDelivered}}
**On-time delivery rate:** {{onTimeRate}}%

### 2.2 Sprint Metrics

```
Sprint 1: {{sprint1SP}} SP  [{{sprint1Bar}}] {{sprint1Completion}}%
Sprint 2: {{sprint2SP}} SP  [{{sprint2Bar}}] {{sprint2Completion}}%
Sprint 3: {{sprint3SP}} SP  [{{sprint3Bar}}] {{sprint3Completion}}%  (nếu có)
Average:  {{avgSprintSP}} SP
```

### 2.3 Task Breakdown

| Loại | Số lượng | Story Points | % Tổng |
|------|----------|-------------|--------|
| Feature | {{featureCount}} | {{featureSP}} | {{featurePercent}}% |
| Bug Fix | {{bugCount}} | {{bugSP}} | {{bugPercent}}% |
| Tech Debt | {{techDebtCount}} | {{techDebtSP}} | {{techDebtPercent}}% |
| Research | {{researchCount}} | {{researchSP}} | {{researchPercent}}% |

---

## 3. Quality Metrics

### 3.1 Code Quality

| Metric | Giá trị | Mục tiêu | Trend |
|--------|---------|----------|-------|
| Test Coverage | {{testCoverage}}% | >80% | {{coverageTrend}} |
| Code Review Time | {{reviewTime}}h | <24h | {{reviewTrend}} |
| Bugs in Production | {{prodBugs}} | <{{bugTarget}} | {{bugTrend}} |
| Technical Debt Score | {{techDebtScore}} | <{{debtTarget}} | {{debtTrend}} |

### 3.2 Incident Report

| Severity | Số lượng | MTTR | Impact |
|----------|----------|------|--------|
| Critical (P0) | {{p0Count}} | {{p0MTTR}} | {{p0Impact}} |
| High (P1) | {{p1Count}} | {{p1MTTR}} | {{p1Impact}} |
| Medium (P2) | {{p2Count}} | {{p2MTTR}} | {{p2Impact}} |
| Low (P3) | {{p3Count}} | {{p3MTTR}} | {{p3Impact}} |

---

## 4. Team Performance

### 4.1 Individual Contributions

| Thành viên | Tasks Done | Story Points | Code Reviews | Ghi chú |
|------------|-----------|-------------|-------------|---------|
| {{member1}} | {{m1Tasks}} | {{m1SP}} | {{m1Reviews}} | {{m1Note}} |
| {{member2}} | {{m2Tasks}} | {{m2SP}} | {{m2Reviews}} | {{m2Note}} |
| {{member3}} | {{m3Tasks}} | {{m3SP}} | {{m3Reviews}} | {{m3Note}} |

### 4.2 Team Health

| Chỉ số | Đánh giá | Ghi chú |
|--------|----------|---------|
| Collaboration | {{collabScore}}/5 | {{collabNote}} |
| Communication | {{commScore}}/5 | {{commNote}} |
| Innovation | {{innovScore}}/5 | {{innovNote}} |
| Work-life Balance | {{wlbScore}}/5 | {{wlbNote}} |

---

## 5. Trend Analysis

### 5.1 Velocity Trend (3 tháng)

```
Tháng -2: {{velMonth2}} SP  |{{velBar2}}|
Tháng -1: {{velMonth1}} SP  |{{velBar1}}|
Tháng  0: {{velMonth0}} SP  |{{velBar0}}|
Trend: {{velocityTrendDirection}}
```

### 5.2 Quality Trend

```
Tháng -2: {{qualMonth2}} bugs  |{{qualBar2}}|
Tháng -1: {{qualMonth1}} bugs  |{{qualBar1}}|
Tháng  0: {{qualMonth0}} bugs  |{{qualBar0}}|
Trend: {{qualityTrendDirection}}
```

---

## 6. Recommendations

### 6.1 Cải Thiện Cần Thiết
1. {{improvement1}}
2. {{improvement2}}
3. {{improvement3}}

### 6.2 Action Items

| # | Action | Owner | Deadline | Priority |
|---|--------|-------|----------|----------|
| 1 | {{action1}} | {{actionOwner1}} | {{actionDeadline1}} | {{actionPriority1}} |
| 2 | {{action2}} | {{actionOwner2}} | {{actionDeadline2}} | {{actionPriority2}} |
| 3 | {{action3}} | {{actionOwner3}} | {{actionDeadline3}} | {{actionPriority3}} |

### 6.3 Mục Tiêu Tháng Tới
- {{nextMonthGoal1}}
- {{nextMonthGoal2}}
- {{nextMonthGoal3}}

---

*Báo cáo được tạo bởi CTO AI Assistant - {{createdDate}}*
