# BÁO CÁO SỰ CỐ (INCIDENT REPORT)

---

## Thông Tin Sự Cố

| Mục | Chi Tiết |
|-----|----------|
| **Mã sự cố** | INC-{{incidentId}} |
| **Mức độ nghiêm trọng** | {{severity}} (P0-Critical / P1-High / P2-Medium / P3-Low) |
| **Trạng thái** | {{status}} (Đang xử lý / Đã giải quyết / Đã đóng) |
| **Hệ thống bị ảnh hưởng** | {{affectedSystem}} |
| **Dịch vụ bị ảnh hưởng** | {{affectedServices}} |
| **Người phát hiện** | {{reportedBy}} |
| **Người phụ trách** | {{incidentOwner}} |
| **Ngày tạo báo cáo** | {{reportDate}} |

---

## 1. Tóm Tắt Sự Cố (Executive Summary)

{{incidentSummary}}

**Impact:**
- Số người dùng bị ảnh hưởng: {{affectedUsers}}
- Thời gian downtime: {{downtimeDuration}}
- Ảnh hưởng doanh thu ước tính: {{revenueImpact}}
- Ảnh hưởng danh tiếng: {{reputationImpact}}

---

## 2. Timeline Sự Cố

| Thời Gian | Sự Kiện | Người Thực Hiện |
|-----------|---------|----------------|
| {{time1}} | **Phát hiện:** {{event1}} | {{person1}} |
| {{time2}} | **Xác nhận:** {{event2}} | {{person2}} |
| {{time3}} | **Escalation:** {{event3}} | {{person3}} |
| {{time4}} | **Bắt đầu xử lý:** {{event4}} | {{person4}} |
| {{time5}} | **Workaround áp dụng:** {{event5}} | {{person5}} |
| {{time6}} | **Fix triển khai:** {{event6}} | {{person6}} |
| {{time7}} | **Xác nhận khôi phục:** {{event7}} | {{person7}} |
| {{time8}} | **Đóng sự cố:** {{event8}} | {{person8}} |

### Các Mốc Thời Gian Quan Trọng

| Metric | Thời Gian |
|--------|-----------|
| **Time to Detect (TTD)** | {{timeToDetect}} |
| **Time to Acknowledge (TTA)** | {{timeToAcknowledge}} |
| **Time to Mitigate (TTM)** | {{timeToMitigate}} |
| **Time to Resolve (TTR)** | {{timeToResolve}} |

---

## 3. Nguyên Nhân Gốc (Root Cause Analysis)

### 3.1. Nguyên Nhân Trực Tiếp
{{directCause}}

### 3.2. Nguyên Nhân Gốc (Root Cause)
{{rootCause}}

### 3.3. Contributing Factors
- {{contributingFactor1}}
- {{contributingFactor2}}
- {{contributingFactor3}}

### 3.4. Phân Tích 5 Whys

| # | Why? | Trả Lời |
|---|------|---------|
| 1 | Tại sao sự cố xảy ra? | {{why1}} |
| 2 | Tại sao {{why1Short}}? | {{why2}} |
| 3 | Tại sao {{why2Short}}? | {{why3}} |
| 4 | Tại sao {{why3Short}}? | {{why4}} |
| 5 | Tại sao {{why4Short}}? | {{why5}} |

---

## 4. Biện Pháp Xử Lý

### 4.1. Biện Pháp Tạm Thời (Workaround)
{{workaround}}

### 4.2. Biện Pháp Khắc Phục (Fix)
{{permanentFix}}

### 4.3. Xác Nhận Khắc Phục
- [ ] Fix đã được deploy thành công
- [ ] Hệ thống hoạt động bình thường
- [ ] Monitoring xác nhận không còn lỗi
- [ ] Khách hàng/người dùng đã được thông báo

---

## 5. Ảnh Hưởng Chi Tiết

### 5.1. Ảnh Hưởng Kỹ Thuật

| Hệ Thống/Service | Mức Độ | Mô Tả |
|-------------------|--------|--------|
| {{system1}} | {{system1Impact}} | {{system1Desc}} |
| {{system2}} | {{system2Impact}} | {{system2Desc}} |
| {{system3}} | {{system3Impact}} | {{system3Desc}} |

### 5.2. Ảnh Hưởng Business

| Khía Cạnh | Ước Tính |
|-----------|----------|
| Số transactions bị ảnh hưởng | {{affectedTransactions}} |
| Doanh thu mất | {{revenueLoss}} |
| SLA vi phạm | {{slaViolation}} |
| Số ticket support nhận được | {{supportTickets}} |

### 5.3. Thông Báo Đã Gửi

| Đối Tượng | Kênh | Thời Gian | Nội Dung |
|-----------|------|-----------|----------|
| {{notifyGroup1}} | {{notifyChannel1}} | {{notifyTime1}} | {{notifyContent1}} |
| {{notifyGroup2}} | {{notifyChannel2}} | {{notifyTime2}} | {{notifyContent2}} |
| {{notifyGroup3}} | {{notifyChannel3}} | {{notifyTime3}} | {{notifyContent3}} |

---

## 6. Action Items (Post-Incident)

### 6.1. Ngắn Hạn (Trong 1 tuần)

| # | Action Item | Owner | Deadline | Status |
|---|------------|-------|----------|--------|
| 1 | {{shortAction1}} | {{shortOwner1}} | {{shortDeadline1}} | {{shortStatus1}} |
| 2 | {{shortAction2}} | {{shortOwner2}} | {{shortDeadline2}} | {{shortStatus2}} |
| 3 | {{shortAction3}} | {{shortOwner3}} | {{shortDeadline3}} | {{shortStatus3}} |

### 6.2. Trung Hạn (Trong 1 tháng)

| # | Action Item | Owner | Deadline | Status |
|---|------------|-------|----------|--------|
| 1 | {{medAction1}} | {{medOwner1}} | {{medDeadline1}} | {{medStatus1}} |
| 2 | {{medAction2}} | {{medOwner2}} | {{medDeadline2}} | {{medStatus2}} |

### 6.3. Dài Hạn (Trong 1 quý)

| # | Action Item | Owner | Deadline | Status |
|---|------------|-------|----------|--------|
| 1 | {{longAction1}} | {{longOwner1}} | {{longDeadline1}} | {{longStatus1}} |
| 2 | {{longAction2}} | {{longOwner2}} | {{longDeadline2}} | {{longStatus2}} |

---

## 7. Bài Học Kinh Nghiệm (Lessons Learned)

### 7.1. Điều Làm Tốt
- {{whatWentWell1}}
- {{whatWentWell2}}
- {{whatWentWell3}}

### 7.2. Điều Cần Cải Thiện
- {{whatToImprove1}}
- {{whatToImprove2}}
- {{whatToImprove3}}

### 7.3. Điều May Mắn (Lucky)
- {{luckyFactor1}}

---

## 8. Phòng Ngừa Tái Diễn

| # | Biện Pháp | Loại | Ưu Tiên | Owner |
|---|-----------|------|---------|-------|
| 1 | {{prevention1}} | Process / Technical / People | {{preventPriority1}} | {{preventOwner1}} |
| 2 | {{prevention2}} | Process / Technical / People | {{preventPriority2}} | {{preventOwner2}} |
| 3 | {{prevention3}} | Process / Technical / People | {{preventPriority3}} | {{preventOwner3}} |

---

## 9. Monitoring & Alert Improvements

| Hiện Tại | Cần Bổ Sung | Ưu Tiên |
|----------|------------|---------|
| {{currentMonitoring1}} | {{newMonitoring1}} | {{monitorPriority1}} |
| {{currentMonitoring2}} | {{newMonitoring2}} | {{monitorPriority2}} |

---

## 10. Phê Duyệt Post-Mortem

| Vai Trò | Họ Tên | Ngày Review |
|---------|--------|------------|
| Incident Owner | {{incidentOwner}} | {{ownerReviewDate}} |
| Engineering Manager | {{engManager}} | {{engReviewDate}} |
| CTO | {{ctoName}} | {{ctoReviewDate}} |

---

**Nguyên tắc Post-Mortem:**
- Blameless - Không đổ lỗi cá nhân, tập trung vào hệ thống và quy trình
- Trung thực - Ghi nhận chính xác những gì đã xảy ra
- Actionable - Mọi bài học phải dẫn đến action item cụ thể
- Follow-up - Theo dõi action items đến khi hoàn thành

---

*Template version: 1.0 | Cập nhật: {{templateDate}}*
*Bảo mật: {{confidentialityLevel}} (Internal / Confidential / Restricted)*
