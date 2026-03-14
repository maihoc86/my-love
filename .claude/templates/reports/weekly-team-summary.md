# Báo Cáo Tổng Kết Tuần - {{teamName}}

**Tuần:** {{weekDate}}
**Người tạo:** {{reportAuthor}}
**Ngày tạo:** {{createdDate}}

---

## 1. Tổng Quan

| Chỉ số | Giá trị | So với tuần trước |
|--------|---------|-------------------|
| Tasks hoàn thành | {{completedTasks}} | {{completedTrend}} |
| Story Points delivered | {{storyPointsDelivered}} | {{spTrend}} |
| Velocity | {{velocity}} SP/sprint | {{velocityTrend}} |
| Completion Rate | {{completionRate}}% | {{rateTrend}} |

---

## 2. Tasks Đã Hoàn Thành

### 2.1 Danh Sách Tasks

| # | Task | Assignee | Story Points | Trạng thái |
|---|------|----------|-------------|------------|
| 1 | {{task1}} | {{assignee1}} | {{sp1}} | Done |
| 2 | {{task2}} | {{assignee2}} | {{sp2}} | Done |
| 3 | {{task3}} | {{assignee3}} | {{sp3}} | Done |
| 4 | {{task4}} | {{assignee4}} | {{sp4}} | Done |
| 5 | {{task5}} | {{assignee5}} | {{sp5}} | Done |

### 2.2 Tasks Đang Thực Hiện (In Progress)

| # | Task | Assignee | Tiến độ | ETA |
|---|------|----------|---------|-----|
| 1 | {{ipTask1}} | {{ipAssignee1}} | {{ipProgress1}}% | {{ipEta1}} |
| 2 | {{ipTask2}} | {{ipAssignee2}} | {{ipProgress2}}% | {{ipEta2}} |

---

## 3. Velocity & Burndown

### 3.1 Velocity Chart
```
Sprint -3: {{velocityMinus3}} SP  |{{velocityBar3}}|
Sprint -2: {{velocityMinus2}} SP  |{{velocityBar2}}|
Sprint -1: {{velocityMinus1}} SP  |{{velocityBar1}}|
Sprint  0: {{velocityCurrent}} SP |{{velocityBarCurrent}}|
Average:   {{velocityAvg}} SP
```

### 3.2 Burndown
```
Planned:   {{plannedTasks}} tasks ({{plannedSP}} SP)
Completed: {{completedTasks}} tasks ({{completedSP}} SP)
Remaining: {{remainingTasks}} tasks ({{remainingSP}} SP)
Burndown:  [{{burndownBar}}] {{burndownPercent}}%
```

---

## 4. Blockers & Risks

### 4.1 Blockers Hiện Tại

| # | Blocker | Ảnh hưởng | Owner | Trạng thái |
|---|---------|-----------|-------|------------|
| 1 | {{blocker1}} | {{blockerImpact1}} | {{blockerOwner1}} | {{blockerStatus1}} |
| 2 | {{blocker2}} | {{blockerImpact2}} | {{blockerOwner2}} | {{blockerStatus2}} |

### 4.2 Risks

| # | Risk | Xác suất | Tác động | Giảm thiểu |
|---|------|----------|----------|------------|
| 1 | {{risk1}} | {{riskProb1}} | {{riskImpact1}} | {{riskMitigation1}} |
| 2 | {{risk2}} | {{riskProb2}} | {{riskImpact2}} | {{riskMitigation2}} |

---

## 5. Kế Hoạch Tuần Tới

### 5.1 Mục Tiêu
- {{nextGoal1}}
- {{nextGoal2}}
- {{nextGoal3}}

### 5.2 Tasks Planned

| # | Task | Assignee | Story Points | Priority |
|---|------|----------|-------------|----------|
| 1 | {{nextTask1}} | {{nextAssignee1}} | {{nextSP1}} | {{nextPriority1}} |
| 2 | {{nextTask2}} | {{nextAssignee2}} | {{nextSP2}} | {{nextPriority2}} |
| 3 | {{nextTask3}} | {{nextAssignee3}} | {{nextSP3}} | {{nextPriority3}} |

### 5.3 Target Velocity: {{targetVelocity}} SP

---

## 6. Team Notes

### Highlights
{{highlights}}

### Concerns
{{concerns}}

### Shout-outs
{{shoutouts}}

---

*Báo cáo được tạo tự động bởi CTO AI Assistant vào {{createdDate}}*
