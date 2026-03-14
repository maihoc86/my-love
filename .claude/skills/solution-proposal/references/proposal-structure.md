# Cau Truc Chi Tiet - De Xuat Giai Phap & Bao Gia

Tai lieu nay chua template day du cho tung phan cua proposal. Khi tao khung suon, doc phan tuong ung va dien thong tin.

## Muc Luc
1. [Trang Bia & Tong Quan](#phan-1)
2. [Muc Luc](#phan-2)
3. [Tom Tat Du An](#phan-3)
4. [Gioi Thieu Cong Ty](#phan-4)
5. [Hieu Biet Nhu Cau & Thach Thuc](#phan-5)
6. [Giai Phap De Xuat](#phan-6)
7. [Ke Hoach Trien Khai](#phan-7)
8. [Chi Phi & Bao Gia](#phan-8)
9. [Doi Ngu Du An](#phan-9)
10. [Phan Tich Rui Ro](#phan-10)
11. [Cam Ket & Hau Mai](#phan-11)
12. [Ket Luan](#phan-12)

---

<a id="phan-1"></a>
## PHAN 1: TRANG BIA & TONG QUAN

```markdown
# DE XUAT GIAI PHAP VA BAO GIA
# {{TEN_GIAI_PHAP}}

**Phien ban:** {{VERSION}} (vd: v1.0)
**Ngay tao:** {{NGAY}}
**Bao mat:** Tai lieu mat - Chi su dung noi bo giua {{TEN_CONG_TY}} va {{TEN_KHACH_HANG}}

---

| Thong tin | Don vi thuc hien | Khach hang |
|-----------|-----------------|------------|
| Ten cong ty | [Lay tu company-profile.md] | {{TEN_KHACH_HANG}} |
| Dia chi | [Lay tu company-profile.md] | {{DIA_CHI_KHACH}} |
| Nguoi lien he | [Lay tu contacts.md] | {{NGUOI_LIEN_HE_KHACH}} |
| Dien thoai | [Lay tu contacts.md] | {{SDT_KHACH}} |
| Email | [Lay tu contacts.md] | {{EMAIL_KHACH}} |
```

---

<a id="phan-2"></a>
## PHAN 2: MUC LUC

Tu dong sinh tu cac heading. Khong can template.

---

<a id="phan-3"></a>
## PHAN 3: TOM TAT DU AN (Executive Summary)

Gioi han 1 trang. Nguoi doc (thuong la C-level) chi doc phan nay de quyet dinh co doc tiep khong.

```markdown
## 3. Tom Tat Du An

### Boi canh
{{TEN_KHACH_HANG}} dang [mo ta ngan gon van de/co hoi]. Hien tai, [mo ta tinh trang hien tai].

### Giai phap de xuat
Tien Phong CDS de xuat trien khai **{{TEN_GIAI_PHAP}}** - [mo ta 1-2 cau ve giai phap].

### Loi ich chinh
- **[Loi ich 1]**: [Mo ta ngan]
- **[Loi ich 2]**: [Mo ta ngan]
- **[Loi ich 3]**: [Mo ta ngan]
- **[Loi ich 4]**: [Mo ta ngan]

### Tong quan du an
| Hang muc | Chi tiet |
|----------|---------|
| Tong chi phi | {{TONG_CHI_PHI}} VND (chua VAT) |
| Thoi gian trien khai | {{TONG_THOI_GIAN}} |
| So giai doan | {{SO_PHASE}} phases |
| Bao hanh | {{THOI_GIAN_BAO_HANH}} |
```

---

<a id="phan-4"></a>
## PHAN 4: GIOI THIEU TIEN PHONG CDS

Lay noi dung tu `.claude/context/company-profile.md`. Chon loc thong tin lien quan den du an.

```markdown
## 4. Gioi Thieu Tien Phong CDS

### 4.1 Tong Quan Cong Ty
[Lay tu company-profile.md: ten, nam thanh lap, linh vuc, tam nhin]

### 4.2 Nang Luc & Kinh Nghiem
[Lay tu company-profile.md: thanh tuu, so du an, khach hang tieu bieu]

### 4.3 Doi Tac Cong Nghe
[Lay tu services.md: partnerships, certifications]

### 4.4 Du An Tieu Bieu Lien Quan
| Du an | Khach hang | Nganh | Cong nghe | Ket qua |
|-------|-----------|-------|-----------|---------|
| [Du an 1] | [Khach 1] | [Nganh] | [Stack] | [Ket qua] |
| [Du an 2] | [Khach 2] | [Nganh] | [Stack] | [Ket qua] |

[CAN BO SUNG: Chon case studies phu hop nhat voi du an hien tai]
```

---

<a id="phan-5"></a>
## PHAN 5: HIEU BIET VE NHU CAU & THACH THUC

Phan nay chung minh cho khach hang thay minh HIEU ho. Rat quan trong cho trust building.

```markdown
## 5. Hieu Biet Ve Nhu Cau & Thach Thuc

### 5.1 Boi Canh Nganh {{NGANH_KHACH_HANG}}
[Mo ta xu huong nganh, ap luc canh tranh, yeu cau chuyen doi so]

### 5.2 Thach Thuc Hien Tai
| # | Thach thuc | Mo ta | Tac dong |
|---|-----------|-------|---------|
| 1 | {{THACH_THUC_1}} | [Chi tiet] | [Tac dong den KD] |
| 2 | {{THACH_THUC_2}} | [Chi tiet] | [Tac dong den KD] |
| 3 | {{THACH_THUC_3}} | [Chi tiet] | [Tac dong den KD] |
| 4 | {{THACH_THUC_4}} | [Chi tiet] | [Tac dong den KD] |

### 5.3 Muc Tieu Kinh Doanh
- **Ngan han (6 thang):** [Muc tieu]
- **Trung han (1-2 nam):** [Muc tieu]
- **Dai han (3-5 nam):** [Muc tieu]

### 5.4 Yeu Cau Ky Thuat
- Performance: [vd: 10,000 concurrent users]
- Availability: [vd: 99.9% uptime]
- Security: [vd: ISO 27001, GDPR compliance]
- Integration: [Danh sach he thong can ket noi]
- Mobile: [vd: iOS + Android native/hybrid]
```

---

<a id="phan-6"></a>
## PHAN 6: GIAI PHAP DE XUAT

Day la phan lon nhat va quan trong nhat. Co the chiem 40-50% tai lieu.

### 6.1 Kien Truc Tong The & Cong Nghe

```markdown
## 6. Giai Phap De Xuat

### 6.1 Kien Truc Tong The

#### Architecture Overview
[Mo ta kien truc: Microservices / Monolith / Hybrid / Serverless]
[Mo ta cac layer: Presentation → API Gateway → Business Logic → Data]

#### Tech Stack

| Layer | Cong nghe | Ly do chon |
|-------|-----------|-----------|
| Frontend | [vd: Next.js, TypeScript, Tailwind CSS] | [Ly do] |
| Backend | [vd: Node.js/NestJS hoac PHP Lumen] | [Ly do] |
| Database | [vd: PostgreSQL/MySQL 8.0 + Redis] | [Ly do] |
| Infrastructure | [vd: Kubernetes, Docker, AWS/GCP] | [Ly do] |
| CI/CD | [vd: GitLab CI, ArgoCD] | [Ly do] |
| Monitoring | [vd: Prometheus, Grafana, ELK] | [Ly do] |

#### Non-Functional Requirements

| Yeu cau | Muc tieu | Giai phap |
|---------|---------|----------|
| Performance | [vd: Response < 200ms p95] | [vd: Redis cache, CDN, query optimization] |
| Scalability | [vd: 50K CCU] | [vd: Kubernetes HPA, read replicas] |
| Security | [vd: OWASP Top 10] | [vd: WAF, encryption at rest/transit] |
| Availability | [vd: 99.9%] | [vd: Multi-AZ, auto-failover] |

[CAN BO SUNG: Dung /cto-advisor de phan tich kien truc chi tiet]
```

### 6.2 Mo Ta Chi Tiet Tung Module

Lap lai format nay cho MOI module:

```markdown
### 6.2.{{N}} Module {{N}}: {{TEN_MODULE}}

**Muc tieu:** [Mo ta muc tieu cua module trong 1-2 cau]

**Danh sach tinh nang:**

| # | Tinh nang | Mo ta | Do uu tien |
|---|-----------|-------|-----------|
| {{N}}.1 | [Ten tinh nang] | [Mo ta chi tiet] | Must-have |
| {{N}}.2 | [Ten tinh nang] | [Mo ta chi tiet] | Must-have |
| {{N}}.3 | [Ten tinh nang] | [Mo ta chi tiet] | Should-have |
| {{N}}.4 | [Ten tinh nang] | [Mo ta chi tiet] | Nice-to-have |

**User Stories chinh:**
- Voi tu cach [vai tro], toi muon [hanh dong] de [loi ich]
- Voi tu cach [vai tro], toi muon [hanh dong] de [loi ich]

**Tich hop:** Ket noi voi Module [X], Module [Y] thong qua [phuong thuc]

[CAN BO SUNG: Dung /technical-writer de viet mo ta chi tiet]
```

### 6.3 Tich Hop He Thong

```markdown
### 6.3 Tich Hop He Thong Ben Thu Ba

| # | He thong | Phuong thuc | Muc dich | Do phuc tap |
|---|---------|-------------|---------|------------|
| 1 | [vd: SAP ERP] | REST API | Dong bo du lieu khach hang | Cao |
| 2 | [vd: Payment Gateway] | Webhook | Xu ly thanh toan | Trung binh |
| 3 | [vd: SMS Provider] | API | Gui thong bao | Thap |

**Ma tran tich hop:**
[Bang chi ro module nao ket noi he thong nao, huong du lieu, tan suat]
```

---

<a id="phan-7"></a>
## PHAN 7: KE HOACH TRIEN KHAI

```markdown
## 7. Ke Hoach Trien Khai

### 7.1 Phuong Phap Luan
- **Methodology:** Agile Scrum
- **Sprint:** 2 tuan/sprint
- **Review:** Demo cuoi moi sprint
- **Retrospective:** Cuoi moi sprint
- **Communication:** Daily standup, Weekly report

### 7.2 Cac Giai Doan

#### Phase 1: {{TEN_PHASE_1}} ({{THOI_GIAN_PHASE_1}})
- **Muc tieu:** [Muc tieu phase]
- **Module:** [Danh sach module trong phase nay]
- **Deliverables:**
  - [ ] [Deliverable 1]
  - [ ] [Deliverable 2]
- **Tieu chi nghiem thu:** [Criteria]

#### Phase 2: {{TEN_PHASE_2}} ({{THOI_GIAN_PHASE_2}})
[Tuong tu Phase 1]

### 7.3 Timeline Chi Tiet

| Tuan | Hoat dong | Output | Milestone |
|------|----------|--------|-----------|
| W1-W2 | Kick-off, Discovery | SRS, Wireframes | M1: Project Start |
| W3-W6 | UI/UX Design | Mockups approved | M2: Design Complete |
| W7-W16 | Development Phase 1 | MVP | M3: MVP Ready |
| W17-W20 | Testing & QA | Test reports | M4: QA Complete |
| W21-W22 | UAT | Sign-off | M5: UAT Passed |
| W23-W24 | Go-live & Training | Production | M6: Go-Live |

### 7.4 Thu Tu Uu Tien Trien Khai
[Giai thich tai sao trien khai module X truoc, Y sau. Dua tren gia tri kinh doanh va dependency]
```

---

<a id="phan-8"></a>
## PHAN 8: CHI PHI & BAO GIA

4 bang chi phi rieng biet. KHONG de lot margin/cost noi bo.

```markdown
## 8. Chi Phi & Bao Gia

### 8.1 Chi Phi Phat Trien Theo Module

| # | Module | Effort (man-days) | Don gia | Thanh tien |
|---|--------|-------------------|---------|-----------|
| 1 | {{MODULE_1}} | {{MD_1}} | {{DON_GIA}} | {{THANH_TIEN_1}} |
| 2 | {{MODULE_2}} | {{MD_2}} | {{DON_GIA}} | {{THANH_TIEN_2}} |
| ... | ... | ... | ... | ... |
| | **Tong** | **{{TONG_MD}}** | | **{{TONG_PHAT_TRIEN}}** |

### 8.2 Chi Phi Tich Hop He Thong

| # | He thong tich hop | Effort | Thanh tien |
|---|-------------------|--------|-----------|
| 1 | [He thong 1] | [MD] | [Chi phi] |
| | **Tong** | | **{{TONG_TICH_HOP}}** |

### 8.3 Chi Phi Dao Tao & Ha Tang

| # | Hang muc | Chi tiet | Thanh tien |
|---|---------|---------|-----------|
| 1 | Dao tao nguoi dung | [So buoi] x [So nguoi] | [Chi phi] |
| 2 | Dao tao admin | [So buoi] | [Chi phi] |
| 3 | Ha tang (nam dau) | [Cloud specs] | [Chi phi] |
| 4 | License phan mem | [Danh sach] | [Chi phi] |
| | **Tong** | | **{{TONG_DAO_TAO_HA_TANG}}** |

### 8.4 Chi Phi Chuyen Giao Source Code (Neu co)

| Hang muc | Chi tiet | Thanh tien |
|---------|---------|-----------|
| Source code & documentation | [Mo ta] | [Chi phi] |
| Knowledge transfer | [So buoi] | [Chi phi] |
| **Tong** | | **{{TONG_CHUYEN_GIAO}}** |

### 8.5 Tong Hop Chi Phi

| # | Hang muc | Thanh tien |
|---|---------|-----------|
| 1 | Phat trien module | {{TONG_PHAT_TRIEN}} |
| 2 | Tich hop he thong | {{TONG_TICH_HOP}} |
| 3 | Dao tao & Ha tang | {{TONG_DAO_TAO_HA_TANG}} |
| 4 | Chuyen giao (neu co) | {{TONG_CHUYEN_GIAO}} |
| | **TONG CONG** | **{{TONG_CHI_PHI}}** |

*Chua bao gom VAT 8%*

### 8.6 Dieu Khoan Thanh Toan

| Dot | Thoi diem | Ty le | So tien | Dieu kien |
|-----|----------|-------|---------|-----------|
| 1 | Ky hop dong | 30% | {{DOT_1}} | Sau khi ky SOW |
| 2 | Sau Go-Live | 60% | {{DOT_2}} | Nghiem thu thanh cong |
| 3 | Het bao hanh | 10% | {{DOT_3}} | Hoan thanh bao hanh {{THOI_GIAN_BH}} |

[CAN BO SUNG: Dien so lieu chi phi cu the]
```

---

<a id="phan-9"></a>
## PHAN 9: DOI NGU DU AN

```markdown
## 9. Doi Ngu Du An

### 9.1 So Do To Chuc

```
[Khach hang] ←→ [Project Manager]
                    ├── [Tech Lead / Solution Architect]
                    │   ├── [Senior Dev 1]
                    │   ├── [Senior Dev 2]
                    │   └── [Frontend Dev]
                    ├── [QA Lead]
                    │   └── [QA Engineer]
                    └── [DevOps Engineer]
```

### 9.2 Vai Tro & Trach Nhiem

| Vai tro | Ten | Trach nhiem | % Tham gia |
|---------|-----|------------|-----------|
| Project Manager | [Lay tu team-roster.md] | Quan ly tien do, bao cao, giao tiep | 100% |
| Solution Architect | [Lay tu team-roster.md] | Thiet ke kien truc, tech decisions | 50% |
| Tech Lead | [Lay tu team-roster.md] | Lead dev team, code review | 100% |
| Senior Developer | [CAN BO SUNG] | Core development | 100% |
| QA Engineer | [CAN BO SUNG] | Testing, quality assurance | 100% |
| DevOps | [CAN BO SUNG] | Infrastructure, CI/CD | 30% |

### 9.3 Yeu Cau Tu Phia Khach Hang
- **Product Owner:** 1 nguoi, tham gia sprint review, phe duyet requirements
- **Business Analyst:** Ho tro giai thich nghiep vu
- **IT Contact:** Ho tro tich hop he thong hien tai
- **End Users:** Tham gia UAT (5-10 nguoi)
```

---

<a id="phan-10"></a>
## PHAN 10: PHAN TICH RUI RO

```markdown
## 10. Phan Tich Rui Ro

### 10.1 Ma Tran Rui Ro

| # | Loai | Rui ro | Xac suat | Tac dong | Bien phap giam thieu | Nguoi chiu TN |
|---|------|--------|----------|---------|---------------------|--------------|
| R1 | Ky thuat | Tich hop he thong cu gap kho khan | Cao | Cao | POC som, du phong thoi gian +20% | Tech Lead |
| R2 | Ky thuat | Performance khong dat yeu cau | Trung binh | Cao | Load test som, optimize lien tuc | DevOps |
| R3 | Du an | Scope creep - yeu cau thay doi lien tuc | Cao | Cao | Change management process chat | PM |
| R4 | Du an | Thieu resource dung thoi diem | Trung binh | Trung binh | Backup team, cross-training | PM |
| R5 | Kinh doanh | Khach hang cham phe duyet | Cao | Trung binh | SLA phe duyet 3 ngay, escalation path | PM |
| R6 | Kinh doanh | Thay doi chien luoc kinh doanh | Thap | Cao | MVP approach, phan chia phase | PM + SA |

[CAN BO SUNG: Dung /cto-advisor de phan tich rui ro cu the cho du an]

### 10.2 Ke Hoach Du Phong
- **Timeline buffer:** +15-20% cho moi phase
- **Budget contingency:** 10% tong chi phi
- **Resource backup:** Danh sach thanh vien thay the
```

---

<a id="phan-11"></a>
## PHAN 11: CAM KET & HAU MAI

```markdown
## 11. Cam Ket & Hau Mai

### 11.1 Bao Hanh
- **Thoi gian:** {{THOI_GIAN_BH}} (thuong 12 thang sau Go-Live)
- **Pham vi:** Sua loi phan mem do team phat trien gay ra
- **Khong bao gom:** Loi do thay doi yeu cau, third-party, su dung sai

### 11.2 SLA Ho Tro

| Muc do | Mo ta | Thoi gian phan hoi | Thoi gian xu ly |
|--------|-------|-------------------|----------------|
| Critical | He thong down | 1 gio | 4 gio |
| High | Chuc nang chinh bi anh huong | 4 gio | 8 gio |
| Medium | Chuc nang phu | 8 gio | 24 gio |
| Low | Cosmetic, enhancement | 24 gio | Theo sprint |

### 11.3 Chuyen Giao Kien Thuc
- Tai lieu ky thuat day du (architecture, API, deployment guide)
- {{SO_BUOI}} buoi dao tao cho IT team cua khach hang
- Video huong dan su dung
- Source code & documentation

### 11.4 Hop Dong Bao Tri (Sau bao hanh)
- Goi bao tri hang thang: [CAN BO SUNG]
- Ho tro mo rong tinh nang
- Update bao mat dinh ky
```

---

<a id="phan-12"></a>
## PHAN 12: KET LUAN

```markdown
## 12. Ket Luan

### Gia Tri Mang Lai
{{TEN_GIAI_PHAP}} se giup {{TEN_KHACH_HANG}}:
1. **[Gia tri 1]:** [Mo ta cu the, co so lieu neu co]
2. **[Gia tri 2]:** [Mo ta]
3. **[Gia tri 3]:** [Mo ta]

### Tai Sao Chon Tien Phong CDS
- [Ly do 1: Kinh nghiem nganh]
- [Ly do 2: Doi ngu ky thuat]
- [Ly do 3: Phuong phap lam viec]
- [Ly do 4: Cam ket chat luong]

### Buoc Tiep Theo
1. Phe duyet de xuat nay
2. Ky ket hop dong / SOW
3. Kick-off meeting
4. Bat dau Phase 1

### Lien He
[Lay tu contacts.md]

---
*Tai lieu nay co hieu luc trong 30 ngay ke tu ngay {{NGAY_TAO}}.*
*De biet them chi tiet, vui long lien he: [EMAIL] | [SDT]*
```

---

## PHU LUC: DIEU CHINH THEO QUY MO

### Du an S (< 500 trieu, < 3 thang)
- Gom PHAN 4 thanh 1 doan ngan
- PHAN 6.2: Toi da 3-4 module
- PHAN 9: Bang don gian, khong can org chart
- PHAN 10: 3-4 rui ro chinh
- PHAN 11: Rut gon

### Du an M (500tr - 2 ty, 3-6 thang)
- Giu day du 12 phan
- PHAN 6.2: 5-8 module
- PHAN 8: Co the gom 8.2 va 8.4

### Du an L (2 ty - 10 ty, 6-12 thang)
- Day du 12 phan, chi tiet toi da
- PHAN 6.2: 8-15 module voi full feature table
- PHAN 7: Multi-phase voi timeline chi tiet
- PHAN 8: Day du 4 bang chi phi

### Du an XL (> 10 ty, > 12 thang)
- Nhu L + them:
- PHAN 6: Them sub-section ve Data Architecture, Security Architecture
- PHAN 7: Them Governance & Steering Committee
- PHAN 8: Them TCO (Total Cost of Ownership) 3-5 nam
- PHAN 10: Them Risk Register chi tiet
