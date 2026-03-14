---
name: solution-proposal
description: |
  Tao khung suon (framework/skeleton) cua mot file de xuat giai phap (solution proposal) chuan cho khach hang doanh nghiep.
  Su dung khi nguoi dung can tao proposal giai phap ky thuat, bao gia trien khai he thong, de xuat du an CNTT,
  hoac bat ky tai lieu nao co cau truc: tong quan → giai phap → ke hoach → chi phi → doi ngu → rui ro.
  Cung su dung khi nguoi dung noi "tao proposal", "de xuat giai phap", "bao gia du an", "tao skeleton proposal",
  "khung suon de xuat", "proposal cho khach hang", "tao tai lieu giai phap", hoac muon chuyen tu discovery sang proposal.
  Skill nay tao ra khung suon day du 12 phan theo chuan cua Tien Phong CDS, sau do nguoi dung co the dung
  cto-advisor, technical-writer de bo sung noi dung va docx de xuat file Word.
metadata:
  version: 1.0.0
  author: CTO Office - Tien Phong CDS
  category: document-generation
  domain: solution-proposal
---

# Solution Proposal Generator

Tao khung suon cua tai lieu "De Xuat Giai Phap va Bao Gia" chuan cho khach hang doanh nghiep. Cau truc 12 phan da duoc chuan hoa tu cac du an thuc te cua Tien Phong CDS.

## Workflow Tong The

```
[1] Thu thap thong tin co ban (skill nay)
    ↓
[2] Tao khung suon 12 phan (skill nay)
    ↓
[3] Bo sung noi dung chuyen sau:
    - /cto-advisor → architecture, tech stack, risk analysis
    - /technical-writer → mo ta module, API specs
    - /content-generator → email gui kem, cover letter
    ↓
[4] Xuat file:
    - /docx → Word document
    - /pptx → Slide tom tat cho presentation
    - /pdf → PDF ban cuoi
```

## Buoc 1: Thu Thap Thong Tin

Truoc khi tao khung suon, hoi nguoi dung cac thong tin bat buoc:

### Thong tin bat buoc
| # | Thong tin | Vi du |
|---|-----------|-------|
| 1 | Ten khach hang & nganh | Novaland Group - Bat dong san |
| 2 | Ten du an / giai phap | Digital Sales Platform & SFA/PRM |
| 3 | Van de/thach thuc chinh | Quy trinh ban hang thu cong, mat du lieu khach hang |
| 4 | Quy mo du an (S/M/L/XL) | L - Du an lon, nhieu module |
| 5 | Budget range (neu biet) | 3-7 ty VND |
| 6 | Timeline mong muon | 6-9 thang |

### Thong tin bo sung (hoi them neu can)
- So luong nguoi dung cuoi (end users)
- He thong hien tai can tich hop
- Yeu cau dac biet (bao mat, compliance, nganh dac thu)
- Doi thu canh tranh (biet de positioning)
- Stakeholders chinh phia khach hang

## Buoc 2: Doc Context Cong Ty

QUAN TRONG: PHAI doc cac file context truoc khi tao noi dung:

```
.claude/context/company-profile.md  → Thong tin cong ty, phap ly, thanh tuu
.claude/context/services.md         → Dich vu, tech stack, USP, case studies
.claude/context/team-roster.md      → Doi ngu, nang luc
.claude/context/contacts.md         → Thong tin lien he, signature
.claude/context/branding.md         → Tone of voice, brand guidelines
.claude/context/clients/[ten-khach].md → Ho so khach hang (neu co)
```

## Buoc 3: Tao Khung Suon 12 Phan

Doc file `references/proposal-structure.md` de lay cau truc chi tiet cua tung phan.

Cau truc tong quan:

### PHAN 1: TRANG BIA & TONG QUAN
- Logo cong ty, ten du an, phien ban, ngay tao
- Thong tin lien he 2 ben
- Ghi chu bao mat "Tai lieu mat - Chi su dung noi bo"

### PHAN 2: MUC LUC
- Tu dong tao tu cac section

### PHAN 3: TOM TAT DU AN (Executive Summary)
- Tong quan nhu cau khach hang (2-3 cau)
- Giai phap de xuat (2-3 cau)
- Loi ich chinh (3-5 bullet points)
- Tong chi phi & timeline tong quan

### PHAN 4: GIOI THIEU TIEN PHONG CDS
- Lay tu `company-profile.md`
- Thanh tuu, kinh nghiem lien quan
- Case studies tuong tu (neu co)
- Chung chi, doi tac cong nghe

### PHAN 5: HIEU BIET VE NHU CAU & THACH THUC
- Boi canh nganh cua khach hang
- Thach thuc hien tai (4-6 muc)
- Muc tieu kinh doanh cua khach hang
- Yeu cau ky thuat chinh

### PHAN 6: GIAI PHAP DE XUAT
Phan quan trong nhat, gom:

**6.1 Kien Truc Tong The & Cong Nghe**
- Architecture diagram description (microservices/monolith/hybrid)
- Tech stack: Frontend, Backend, Database, Infrastructure
- Non-functional requirements (performance, security, scalability)
- → Dung /cto-advisor de bo sung chi tiet

**6.2 Mo Ta Chi Tiet Tung Module**
Moi module co format chuan:
```
Module [SO]: [TEN MODULE]
├── Muc tieu
├── Bang tinh nang chi tiet (Feature | Mo ta | Do uu tien)
├── User stories chinh
└── Tich hop voi module khac
```
- → Dung /technical-writer de viet mo ta chuyen sau

**6.3 Tich Hop He Thong**
- Danh sach he thong can tich hop
- Phuong thuc tich hop (API/Webhook/File/Real-time)
- Ma tran tich hop

### PHAN 7: KE HOACH TRIEN KHAI
- Methodology (Agile/Scrum)
- Cac giai doan (Phase 1, 2, ...)
- Timeline chi tiet voi milestones
- Thu tu uu tien trien khai

### PHAN 8: CHI PHI & BAO GIA
4 bang chi phi:
1. Chi phi phat trien theo module
2. Chi phi tich hop he thong
3. Chi phi dao tao & ha tang
4. Chi phi chuyen giao source code (neu co)

Dieu khoan thanh toan: 30% ky HD / 60% Go-Live / 10% het bao hanh

### PHAN 9: DOI NGU DU AN
- So do to chuc du an
- Vai tro & trach nhiem (RACI matrix)
- Profile thanh vien chu chot
- Lay tu `team-roster.md`

### PHAN 10: PHAN TICH RUI RO
Bang rui ro voi cot:
| Rui ro | Xac suat | Tac dong | Bien phap giam thieu | Nguoi chiu trach nhiem |

Cac loai rui ro thuong gap:
- Ky thuat (tech stack moi, tich hop phuc tap)
- Du an (scope creep, resource, timeline)
- Kinh doanh (thay doi yeu cau, budget)

### PHAN 11: CAM KET & HAU MAI
- Bao hanh (12 thang thong thuong)
- SLA ho tro (Critical/High/Medium/Low)
- Chinh sach nang cap & bao tri
- Dao tao & chuyen giao kien thuc

### PHAN 12: KET LUAN
- Tom tat gia tri mang lai
- Call to action
- Buoc tiep theo
- Thong tin lien he

## Buoc 4: Luu Draft & Validate

1. Luu vao `.claude/drafts/proposal-[ten-khach]-[ten-du-an]-[ngay].md`
2. Chay validate: `bash .claude/hooks/validate-proposal.sh <file>`
3. Chay client-ready check: `bash .claude/hooks/validate-client-ready.sh <file>`

## Buoc 5: Huong Dan Buoc Tiep Theo

Sau khi tao khung suon, huong dan nguoi dung:

```
"Khung suon da san sang! Ban co the tiep tuc voi:

1. Bo sung noi dung ky thuat:
   → 'Dung cto-advisor de phan tich kien truc cho [DU AN]'
   → 'Dung technical-writer de viet mo ta module [MODULE]'

2. Xuat file:
   → 'Xuat proposal thanh file Word (.docx)'
   → 'Tao slide tom tat proposal (.pptx)'

3. Tao tai lieu di kem:
   → 'Viet email gui kem proposal cho [KHACH HANG]'
   → 'Tao demo script cho [DU AN]'"
```

## Luu Y Quan Trong

- **Bao mat**: KHONG de lot thong tin noi bo (margin, cost noi bo, luong) vao proposal
- **So lieu**: Khong bua so lieu - danh dau [CAN BO SUNG] cho nhung cho chua co data
- **Ngon ngu**: Mac dinh tieng Viet. Chuyen Anh khi khach hang la cong ty nuoc ngoai
- **Tone**: Chuyen nghiep, tu tin nhung khong khoe khoang. Tap trung vao gia tri cho khach hang
- **Template chu khong phai noi dung cuoi**: Skill nay tao KHUNG SUON, khong phai tai lieu hoan chinh. Danh dau ro cac cho can nguoi dung bo sung

## Vi Du Su Dung

### Vi du 1: Du an lon
```
User: "Tao proposal giai phap cho Vingroup, du an Digital Workplace, budget 5 ty"

Claude se:
1. Hoi them: quy mo nguoi dung, he thong hien tai, timeline
2. Doc context cong ty
3. Tao khung suon 12 phan day du
4. Danh dau [CAN BO SUNG] cho cac phan can data cu the
5. Luu draft va huong dan buoc tiep
```

### Vi du 2: Du an nho
```
User: "Tao proposal nhanh cho ABC Corp, lam app mobile, 800 trieu, 3 thang"

Claude se:
1. Giam nhe cac phan (co the gom PHAN 9, 10, 11 thanh ngan gon)
2. Tap trung vao PHAN 5, 6, 7, 8
3. Tao ban "lite" phu hop quy mo S/M
```
