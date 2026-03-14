---
name: training-material
description: |
  Tạo tài liệu đào tạo cho khách hàng sử dụng CDS Platform - bao gồm training slides,
  user guides, exercise sheets, và assessment quizzes.
  Sử dụng khi: cần tạo tài liệu training, hướng dẫn sử dụng, bài tập thực hành,
  kế hoạch đào tạo, hoặc đánh giá sau training cho khách hàng.
  Trigger: "training", "đào tạo", "tài liệu hướng dẫn", "user guide",
  "training plan", "kế hoạch đào tạo", "bài tập thực hành", "exercise",
  "assessment", "onboarding material", "train the trainer".
metadata:
  version: 1.0.0
  category: training
  domain: client-enablement
---

# Training Material Generator

Tạo tài liệu đào tạo chuyên nghiệp cho khách hàng triển khai CDS Platform.

## Trước Khi Bắt Đầu

**Đọc context bắt buộc:**
- `.claude/context/services.md` - CDS Platform modules
- `.claude/context/clients/[tên-khách].md` - Scope triển khai
- `.claude/context/branding.md` - Brand guidelines cho slides

---

## Các Loại Tài Liệu Training

| Loại | Format | Audience | Thời lượng |
|------|--------|----------|-----------|
| **Training Slides** | pptx | Classroom / Online | 2-4 giờ/session |
| **User Manual** | docx/pdf | Self-study | Tham khảo |
| **Quick Start Guide** | pdf (2-5 trang) | End user | 15 phút đọc |
| **Exercise Sheet** | docx/pdf | Hands-on practice | 30-60 phút |
| **Assessment Quiz** | docx/Google Form | Post-training | 15-20 phút |
| **Video Script** | docx | Recording | 5-15 phút/video |
| **Train-the-Trainer Guide** | docx | Internal trainer | 1 ngày prep |

---

## Training Plan Template

### Kế Hoạch Đào Tạo Tổng Thể

```
Dự án:           [TÊN]
Khách hàng:      [TÊN CÔNG TY]
Modules:         [DANH SÁCH MODULES]
Tổng sessions:   [SỐ]
Thời gian:       [TỪ] → [ĐẾN]
```

### Phân Loại Đối Tượng

| Nhóm | Mô tả | Modules | Số người | Sessions |
|------|-------|---------|----------|---------|
| **Admin** | IT team, system admin | Tất cả (admin view) | 2-5 | 3-5 sessions |
| **Manager** | Trưởng phòng, quản lý | Dashboard, Reports, Approval | 5-15 | 2-3 sessions |
| **End User** | Nhân viên sử dụng hàng ngày | Module cụ thể | 20-100+ | 2-3 sessions |
| **Executive** | CEO, CFO, Directors | BI, Dashboard overview | 3-5 | 1 session |

### Lịch Training Mẫu

**Tuần 1: Admin Training**
| Ngày | Thời gian | Nội dung | Trainer |
|------|-----------|----------|---------|
| T2 | 9:00-12:00 | System Overview & Admin Console | CDS SA |
| T2 | 14:00-17:00 | User Management & Permissions | CDS SA |
| T4 | 9:00-12:00 | Module Configuration | CDS Dev |
| T4 | 14:00-17:00 | Integration & Data Management | CDS Dev |

**Tuần 2: Manager Training**
| Ngày | Thời gian | Nội dung | Trainer |
|------|-----------|----------|---------|
| T2 | 9:00-11:30 | Dashboard & Reporting (BI Module) | CDS BA |
| T4 | 9:00-11:30 | Approval Workflows & KPIs | CDS BA |

**Tuần 3-4: End User Training**
| Ngày | Thời gian | Nội dung | Trainer |
|------|-----------|----------|---------|
| T2-T3 | 9:00-12:00 | [Module X] - Basic Operations | CDS BA |
| T4-T5 | 9:00-12:00 | [Module X] - Advanced Features | CDS BA |
| T2-T3 | 9:00-12:00 | [Module Y] - Basic Operations | CDS BA |
| T4-T5 | 9:00-12:00 | [Module Y] - Advanced Features | CDS BA |

---

## Training Slides Template

### Cấu Trúc Slide Deck (Per Module)

```
Slide 1:  Title Slide (CDS + Client logos)
Slide 2:  Agenda
Slide 3:  Training Objectives (3-5 objectives)
Slide 4:  Module Overview - Tổng quan chức năng
Slide 5:  Quy trình nghiệp vụ (Business Process Flow)
Slide 6:  Giao diện chính (Screenshot + annotations)
Slide 7-15: Chức năng chi tiết (1 chức năng = 2-3 slides)
  - Screenshot giao diện
  - Các bước thao tác (numbered)
  - Tips & Best practices
Slide 16: Bài tập thực hành (Exercise)
Slide 17: Tổng kết & Key Takeaways
Slide 18: FAQ - Câu hỏi thường gặp
Slide 19: Liên hệ hỗ trợ (Helpdesk info)
Slide 20: Q&A
```

### Nguyên Tắc Thiết Kế Slides

| Rule | Mô tả |
|------|-------|
| **1 slide = 1 ý** | Không nhồi nhét nhiều nội dung |
| **Screenshots bắt buộc** | Mỗi chức năng phải có ảnh giao diện |
| **Numbering** | Đánh số bước thao tác rõ ràng |
| **Highlight** | Dùng mũi tên/khoanh đỏ chỉ vào vùng cần click |
| **Font size** | Tối thiểu 18pt cho body text |
| **Bilingual** | Tiêu đề EN + nội dung VN nếu cần |

---

## User Manual Template

### Cấu Trúc User Manual

```markdown
# Hướng Dẫn Sử Dụng [TÊN MODULE]
## Dành cho: [End User / Admin / Manager]

### Mục Lục
1. Giới Thiệu
2. Đăng Nhập & Giao Diện Tổng Quan
3. [Chức năng 1]
4. [Chức năng 2]
5. [Chức năng 3]
6. Báo Cáo
7. Xử Lý Sự Cố
8. Bảng Thuật Ngữ
9. Liên Hệ Hỗ Trợ

---

### 1. Giới Thiệu
Module [TÊN] giúp [MÔ TẢ MỤC ĐÍCH].

**Đối tượng sử dụng:** [AI SỬ DỤNG]
**Yêu cầu:** Trình duyệt Chrome/Edge, kết nối internet

### 2. Đăng Nhập
1. Truy cập [URL]
2. Nhập username và password
3. Click "Đăng nhập"
[Screenshot]

### 3. [Chức Năng 1]

#### 3.1 Mô tả
[Chức năng này dùng để làm gì]

#### 3.2 Các bước thực hiện
1. Từ menu chính, chọn [Menu Item]
   [Screenshot]
2. Click nút [Tên Nút]
   [Screenshot]
3. Nhập thông tin vào form
   [Screenshot + chú thích từng field]
4. Click [Lưu/Xác nhận]
5. Hệ thống hiển thị [Kết quả]
   [Screenshot]

#### 3.3 Lưu ý
- [Lưu ý 1]
- [Lưu ý 2]

---

### 7. Xử Lý Sự Cố

| Lỗi | Nguyên nhân | Cách khắc phục |
|-----|-------------|---------------|
| Không đăng nhập được | Sai password | Reset password qua IT |
| Trang load chậm | Network | Kiểm tra kết nối internet |
| Lỗi "Permission denied" | Chưa phân quyền | Liên hệ Admin |
| Data không hiển thị | Filter sai | Reset filter, refresh page |

### 8. Bảng Thuật Ngữ

| Thuật ngữ | Tiếng Việt | Mô tả |
|-----------|-----------|-------|
| Dashboard | Bảng điều khiển | Trang tổng quan |
| Pipeline | Phễu bán hàng | Các giai đoạn deal |
| KPI | Chỉ số hiệu suất | Đo lường mục tiêu |
```

---

## Quick Start Guide Template

### Format: 1 Trang A4 (2 mặt)

```
╔═══════════════════════════════════════════╗
║     QUICK START - [TÊN MODULE]           ║
║     CDS Platform                          ║
╠═══════════════════════════════════════════╣
║                                           ║
║  BƯỚC 1: Đăng nhập                       ║
║  → Truy cập [URL]                        ║
║  → Nhập username/password                ║
║  [Mini screenshot]                        ║
║                                           ║
║  BƯỚC 2: [Thao tác chính 1]             ║
║  → [Hướng dẫn ngắn]                     ║
║  [Mini screenshot]                        ║
║                                           ║
║  BƯỚC 3: [Thao tác chính 2]             ║
║  → [Hướng dẫn ngắn]                     ║
║  [Mini screenshot]                        ║
║                                           ║
║  BƯỚC 4: [Thao tác chính 3]             ║
║  → [Hướng dẫn ngắn]                     ║
║  [Mini screenshot]                        ║
║                                           ║
║  ❓ CẦN HỖ TRỢ?                         ║
║  📧 Email: support@tienphongcds.com      ║
║  📱 Hotline: [SỐ]                        ║
║  💬 Zalo: [LINK]                          ║
╚═══════════════════════════════════════════╝
```

---

## Exercise Sheet Template

### Bài Tập Thực Hành - [Module Name]

```
BÀI TẬP THỰC HÀNH
Module: [TÊN]
Thời gian: 30 phút
Mức độ: [ ] Cơ bản  [ ] Trung bình  [ ] Nâng cao

---

BÀI 1: [Tên bài tập] (10 phút)
Mục tiêu: [Học viên có thể...]

Yêu cầu:
1. Đăng nhập hệ thống
2. Tạo [đối tượng] mới với thông tin sau:
   - Tên: [...]
   - Loại: [...]
   - Số lượng: [...]
3. Lưu và kiểm tra kết quả
4. Xuất báo cáo [loại]

Kết quả mong đợi:
✅ [Đối tượng] xuất hiện trong danh sách
✅ Báo cáo hiển thị đúng dữ liệu

---

BÀI 2: [Tên bài tập] (10 phút)
...

BÀI 3: [Tên bài tập] (10 phút)
...

---

ĐÁNH GIÁ:
[ ] Hoàn thành tốt tất cả bài tập
[ ] Hoàn thành nhưng cần hỗ trợ
[ ] Cần training thêm

Ghi chú trainer:
_________________________________
```

---

## Assessment Quiz Template

### Bài Kiểm Tra Sau Training

```
BÀI KIỂM TRA - [MODULE NAME]
Thời gian: 15 phút
Số câu: 10
Điểm đạt: 7/10

---

Câu 1: [Module] dùng để làm gì?
a) [Đáp án sai]
b) [Đáp án đúng] ✓
c) [Đáp án sai]
d) [Đáp án sai]

Câu 2: Để tạo [đối tượng] mới, bạn cần:
a) [Bước đúng] ✓
b) [Bước sai]
c) [Bước sai]

Câu 3: (Thực hành) Hãy thực hiện [thao tác X] và chụp screenshot kết quả.
[Phần trả lời]

...

Câu 10: Khi gặp lỗi [X], bạn nên:
a) Restart máy tính
b) Liên hệ IT support ✓
c) Tạo lại từ đầu
```

---

## Train-the-Trainer Guide

### Hướng Dẫn Cho Internal Trainer

```
MỤC ĐÍCH: Giúp nhân sự khách hàng có thể tự training cho đồng nghiệp mới

NỘI DUNG:
1. Tổng quan hệ thống CDS Platform
2. Chuẩn bị môi trường training (sandbox account)
3. Kỹ năng truyền đạt cơ bản
4. Slide deck + hướng dẫn sử dụng
5. Xử lý câu hỏi thường gặp
6. Đánh giá kết quả training

CHECKLIST TRƯỚC SESSION:
- [ ] Kiểm tra projector/screen share
- [ ] Login sandbox account OK
- [ ] Dữ liệu demo đã chuẩn bị
- [ ] In handout cho học viên
- [ ] Backup plan nếu hệ thống chậm/lỗi
```

---

## Quy Trình Tạo Training Material

```
1. Xác định audience và modules → training-material
2. Tạo Training Plan (schedule, resources)
3. Tạo slides cho từng session → pptx
4. Tạo User Manual → docx / technical-writer
5. Tạo Quick Start Guide → pdf
6. Tạo Exercise Sheets
7. Tạo Assessment Quizzes
8. Review & validate → validate-client-ready.sh
9. Lưu vào .claude/drafts/[client]/training/
```

---

## Workflow Tích Hợp

```
contract-sow-generator (Scope) → training-material (Tạo tài liệu)
                                → pptx (Xuất slides)
                                → docx (Xuất manuals)
                                → pdf (Xuất quick start guides)
                                → technical-writer (System docs)
```
