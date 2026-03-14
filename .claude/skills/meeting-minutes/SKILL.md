---
name: meeting-minutes
description: >
  Tao bien ban cuoc hop (BBCH) chuyen nghiep duoi dang file .docx voi format chuan cua Tien Phong CDS.
  Su dung khi nguoi dung yeu cau tao bien ban cuoc hop, ghi chep cuoc hop, meeting minutes, BBCH,
  hoac khi nguoi dung cung cap noi dung cuoc hop va muon tao tai lieu chinh thuc.
  Cung su dung khi nguoi dung noi "tao bien ban", "ghi bien ban", "meeting minutes",
  "bien ban hop", "lap bien ban", "BBCH", "tong hop cuoc hop thanh bien ban",
  "tao file bien ban", hoac bat ky yeu cau nao lien quan den viec chinh thuc hoa noi dung cuoc hop
  thanh tai lieu docx.
metadata:
  version: 1.0.0
  author: CTO Office - Tien Phong CDS
  category: document-generation
  domain: meeting-documentation
  updated: 2026-03-09
---

# Meeting Minutes Generator (Bien Ban Cuoc Hop)

Tao bien ban cuoc hop chuyen nghiep dang .docx theo format chuan cua Tien Phong CDS.

## Keywords
bien ban cuoc hop, BBCH, meeting minutes, ghi chep cuoc hop, lap bien ban, tong hop cuoc hop, bao cao cuoc hop, meeting notes, meeting record, hop du an, hop ky thuat, meeting summary

## Khi Nao Su Dung

Su dung skill nay khi:
- Nguoi dung yeu cau tao bien ban cuoc hop
- Nguoi dung cung cap noi dung meeting va muon tao tai lieu chinh thuc
- Can tong hop notes cuoc hop thanh bien ban co cau truc
- Can tao file docx cho bien ban cuoc hop

## Cau Truc Bien Ban Chuan

Bien ban cuoc hop CDS su dung cau truc 7 phan chuan:

```
BIEN BAN CUOC HOP
|
+-- Thong tin chung (bang: Chu de, Ngay, Thoi gian, Dia diem, Chu tri, Thanh vien)
|
+-- 1. MUC DICH CUOC HOP
|   (Mo ta ngan gon ly do va muc tieu cuoc hop)
|   (Callout box cho yeu cau quan trong neu co)
|
+-- 2. NOI DUNG THAO LUAN
|   +-- 2.1 Chu de 1
|   +-- 2.2 Chu de 2
|   +-- ... (so luong tuy theo noi dung thuc te)
|
+-- 3. KE HOACH TRIEN KHAI (neu co)
|   (Chi tiet ke hoach cho tung hang muc)
|
+-- 4. CAC QUYET DINH CHINH
|   (Bang: STT, Quyet dinh, Noi dung)
|
+-- 5. PHAN CONG CONG VIEC (ACTION ITEMS)
|   +-- 5.1 Nhom/Nguoi 1
|   +-- 5.2 Nhom/Nguoi 2
|   +-- ... (Bang: STT, Hang muc, Chi tiet, Deadline)
|
+-- 6. MOC THOI GIAN QUAN TRONG
|   (Bang: Moc, Thoi gian, Noi dung)
|
+-- 7. GHI CHU BO SUNG
|   (Danh sach cac luu y them)
|
+-- KET THUC
    (Thoi gian ket thuc, Nguoi lap, Xac nhan chu tri, Ngay lap, Cuoc hop tiep theo)
```

## Thiet Ke & Style Guide

### Mau Sac
- Navy header: `#1B3A5C` (bang header, section header bars)
- Dark navy: `#0F2440` (tieu de chinh)
- Accent: `#E8843C` (callout border)
- White: `#FFFFFF` (text tren nen navy)
- Light gray: `#F2F4F7` (label cells)
- Mid gray: `#8899AA` (text phu, header/footer)
- Border: `#CCCCCC`

### Typography
- Font: Calibri
- Tieu de chinh: 36pt, bold, dark navy, center
- Phu de: 28pt, bold, dark navy, center
- Section header bar: 22pt, bold, white tren nen navy, center
- Sub-section: 22pt, bold, navy, underline
- Body text: 20pt (10pt), regular
- Header/footer: 16pt, mid gray

### Layout
- Trang A4 (11906 x 16838 DXA)
- Margin: ~2cm moi ben (1134 DXA)
- Content width: 9638 DXA
- Section headers: Full-width navy bar voi text trang centered
- Callout box: Left border accent color, nen light gray, italic

### Bang Bieu
- Header row: Nen navy, text trang, bold, centered
- Label cells: Nen light gray, text bold navy
- Body cells: Nen trang, text den, margins 60/100 DXA
- Border: 1pt, mau #CCCCCC

## Quy Trinh Tao Bien Ban

### Buoc 1: Thu thap thong tin
Hoi nguoi dung (neu chua co):
- Chu de cuoc hop
- Ngay, thoi gian, dia diem
- Chu tri va thanh vien tham du (ten, chuc vu, don vi)
- Noi dung chinh cua cuoc hop
- Cac quyet dinh da dua ra
- Phan cong cong viec (ai lam gi, deadline)
- Moc thoi gian quan trong

### Buoc 2: Doc context
- Doc `.claude/context/company-profile.md` de lay thong tin cong ty
- Doc `.claude/context/contacts.md` de lay thong tin lien he
- Doc `.claude/context/branding.md` de dam bao tone of voice

### Buoc 3: Tao file JS va generate DOCX
1. Su dung template JS trong `scripts/meeting-minutes-template.js` lam co so
2. Dien noi dung cuoc hop vao template
3. Chay `node <file>.js` de generate file .docx
4. Validate bang `python scripts/office/validate.py <file>.docx`
5. Luu vao `.claude/drafts/`

### Buoc 4: Dat ten file
Format: `Bien-Ban-Hop-[Don-vi]-[Ngay].docx`
Vi du: `Bien-Ban-Hop-CDS-Nova-2026-03-09.docx`

## Luu Y Quan Trong

1. **Font Calibri** - Su dung nhat quan trong toan bo tai lieu
2. **Tieng Viet co dau** - Noi dung bien ban PHAI co dau tieng Viet day du
3. **Section headers** - Su dung full-width navy bar (khong phai heading text don gian)
4. **Callout boxes** - Dung cho "QUAN TRONG", "Yeu cau quan trong", "Thong nhat"
5. **Bang quyet dinh** - Luon co bang tong hop cac quyet dinh chinh
6. **Phan cong** - Nhom theo nguoi/team, co deadline ro rang
7. **Ky xac nhan** - Luon co phan ky cuoi bien ban (2 cot: 2 ben)
8. **Validate** - Luon validate file docx sau khi tao
