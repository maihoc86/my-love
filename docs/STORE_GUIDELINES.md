# Store Guidelines - Google Play & Apple App Store

> Tài liệu tham khảo đầy đủ về điều kiện đưa app lên Google Play và App Store.
> Cập nhật: 03/2026

---

## 1. Yêu cầu kỹ thuật

### Google Play (Android)

| Yêu cầu | Giá trị |
|----------|---------|
| Target API level | **Android 15 (API 35)** trở lên |
| Định dạng publish | **Android App Bundle (.aab)** — không dùng APK |
| App Signing | Play App Signing bắt buộc khi dùng AAB |
| Kiến trúc | Phải có **64-bit** cho mỗi 32-bit native |
| Developer account | $25 USD (một lần), xác minh danh tính bắt buộc |

### Apple App Store (iOS)

| Yêu cầu | Giá trị |
|----------|---------|
| SDK tối thiểu | **iOS 18 SDK** (Xcode 16+), từ 04/2026 yêu cầu iOS 26 SDK |
| App size tối đa | 4 GB (uncompressed), 200 MB giới hạn cellular download |
| Developer account | $99 USD/năm |
| Code Signing | Distribution Certificate + Provisioning Profile (EAS tự quản lý) |
| Test | Phải test trên thiết bị thật qua TestFlight trước khi submit |

### Expo/React Native

```bash
# Build production
eas build --platform ios --profile production
eas build --platform android --profile production

# Submit
eas submit --platform ios
eas submit --platform android  # Lần đầu phải upload .aab thủ công
```

**Lưu ý:**
- Expo SDK 54 tương thích iOS 18 SDK + API 35
- `--legacy-peer-deps` khi npm install
- `versionCode` (Android) phải tăng mỗi lần update
- `buildNumber` (iOS) phải tăng mỗi lần update

---

## 2. Quyền riêng tư & Dữ liệu (Privacy & Data)

### Privacy Policy (BẮT BUỘC cả 2 store)

- URL công khai, luôn truy cập được
- Hiển thị **trong app** và trên store listing
- Mô tả rõ: dữ liệu nào thu thập, mục đích, chia sẻ với ai
- Link hỏng = reject ngay

### Google Play — Data Safety Section

Phải khai báo chính xác trong Play Console:
- Dữ liệu thu thập: thông tin cá nhân, tin nhắn, ảnh, hoạt động app
- Dữ liệu chia sẻ: OpenRouter (AI), Supabase (backend)
- Google tự động scan binary để so khớp khai báo — SAI = reject

### Apple — Privacy Manifest & App Privacy Labels

- Khai báo tất cả data types trong Privacy Manifest
- App Privacy Labels ("Nutrition Labels") trên App Store
- **12% submissions bị reject Q1/2025** vì vi phạm Privacy Manifest
- Phải cập nhật khi có thay đổi

### App Tracking Transparency (iOS)

- Bắt buộc dùng ATT framework nếu tracking user
- Từ iOS 18.5: user có thể cho phép **từng loại tracking** riêng
- Phải chỉ rõ đối tác cụ thể (vd: "OpenRouter")

---

## 3. Quy định AI, Chat, Personal Data

### AI Apps

**Google Play:**
- Phải ngăn chặn AI tạo nội dung bị cấm (hate speech, CSAM, lừa đảo)
- Phải có cơ chế **report/flag** nội dung AI không phù hợp
- Developer chịu trách nhiệm mọi nội dung AI tạo ra

**Apple (Guideline 5.1.2(i) — 11/2025):**
- Bắt buộc khai báo khi gửi personal data đến third-party AI
- Phải có **consent modal cụ thể**: chỉ rõ AI provider và data types
- Không dùng consent forms chung chung
- User phải biết khi nội dung do AI tạo

### Áp dụng cho MyLoveThaiHoc

App dùng **OpenRouter AI** và **Supabase**, cần:

1. **Consent modal** trước khi gửi dữ liệu đến OpenRouter:
   > "Dữ liệu của bạn sẽ được gửi đến OpenRouter (dịch vụ AI) để xử lý tin nhắn"

2. **Privacy policy** chỉ rõ:
   - Supabase lưu trữ: thông tin cá nhân, ghi chú, lịch sử chat
   - OpenRouter nhận: nội dung chat để xử lý AI response

3. **App Privacy Labels** khai báo: name, relationship data, chat messages, usage data

4. **Report/flag mechanism** cho nội dung AI không phù hợp

### Chat Features

- Nội dung chat = sensitive user data → khai báo "Messages" trong Data Safety
- Chat với AI: khai báo rõ đây là AI, không giả làm người thật
- Cần content moderation

---

## 4. Thiết kế & UX

### Google Play

- Material 3 (Material You) được khuyến khích
- Touch target tối thiểu **48dp**
- Contrast đủ cho accessibility
- Hỗ trợ dark theme (Android 16+)

### Apple — Human Interface Guidelines

- **Safe Areas**: không đặt nội dung dưới notch, Dynamic Island, home indicator
- **Dynamic Type**: typography phải adapt theo user settings (bắt buộc 2026)
- **Responsive Layout**: hỗ trợ nhiều kích thước (iPhone SE → Pro Max)
- Test cross-device

### Áp dụng cho source code

```tsx
// ✅ ĐÚNG — SafeAreaView với edges
<SafeAreaView edges={["top"]}>

// ✅ ĐÚNG — Touch target >= 48dp
<TouchableOpacity style={{ minWidth: 48, minHeight: 48 }}>

// ✅ ĐÚNG — Accessibility labels
<Pressable accessibilityLabel="Thêm ghi chú" accessibilityRole="button">

// ✅ ĐÚNG — KeyboardAvoidingView cho forms
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
```

---

## 5. Store Listing

### Google Play

| Asset | Kích thước | Yêu cầu |
|-------|-----------|----------|
| App icon | 512 x 512 px | PNG 32-bit, max 1 MB |
| Feature graphic | 1024 x 500 px | Hiển thị đầu listing |
| Screenshots | Min 2, max 8 | JPEG/PNG, ≥320px, 16:9 hoặc 9:16 |
| Short description | Max 80 ký tự | |
| Full description | Max 4000 ký tự | |
| Content rating | IARC questionnaire | Bắt buộc |

### Apple App Store

| Asset | Kích thước | Yêu cầu |
|-------|-----------|----------|
| App icon | 1024 x 1024 px | PNG, không alpha, không bo góc |
| Screenshots | 1-10 | iPhone 6.9": 1320 x 2868 px |
| App preview | Max 3 video | 15-30 giây, max 500 MB |
| Description | Chính xác với app | |
| Age rating | Questionnaire | Bắt buộc, có mức 13+/16+/18+ mới |

---

## 6. Info.plist Keys (iOS — Expo app.json)

Chỉ khai báo key cho features **thực sự sử dụng** — khai báo thừa cũng bị reject.

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.tienphongcds.mylovethaihoc",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "Cho phép chụp ảnh để ghi lại kỷ niệm",
        "NSPhotoLibraryUsageDescription": "Cho phép chọn ảnh từ thư viện để đính kèm",
        "NSLocationWhenInUseUsageDescription": "Cho phép truy cập vị trí để ghi nhận nơi check-in",
        "NSFaceIDUsageDescription": "Cho phép dùng Face ID để bảo mật ứng dụng",
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    "android": {
      "package": "com.tienphongcds.mylovethaihoc",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_MEDIA_IMAGES",
        "ACCESS_FINE_LOCATION",
        "USE_BIOMETRIC",
        "INTERNET"
      ]
    }
  }
}
```

---

## 7. Lý do bị Reject phổ biến

| # | Lý do | Cách tránh |
|---|-------|------------|
| 1 | Vi phạm Privacy | Khai báo đầy đủ Privacy Manifest/Data Safety, privacy policy URL hợp lệ |
| 2 | Crash/Bug | Test trên thiết bị thật, error handling đầy đủ, test nhiều OS versions |
| 3 | Metadata sai/thiếu | Screenshots khớp app thực tế, không dùng placeholder |
| 4 | UI/UX kém | Test cross-device, safe areas, layout không bị vỡ |
| 5 | Permissions thừa | Chỉ request permissions cần thiết cho core functionality |
| 6 | AI data không khai báo | Consent modal cụ thể cho OpenRouter, khai báo trong Privacy Manifest |
| 7 | Content không phù hợp | Content moderation cho AI chat, report mechanism |
| 8 | Third-party SDK | Đảm bảo mọi SDK có privacy manifest và signatures |

---

## 8. Checklist trước khi Submit

### Android (Google Play)
- [ ] Target API 35 (Android 15)
- [ ] Build .aab format
- [ ] Privacy Policy URL hợp lệ
- [ ] Data Safety section chính xác
- [ ] Content Rating (IARC) hoàn thành
- [ ] App icon 512x512, screenshots, feature graphic
- [ ] Xác minh developer account
- [ ] Test trên nhiều devices/API levels

### iOS (App Store)
- [ ] Build với iOS 18 SDK (Xcode 16+)
- [ ] Privacy Policy URL hợp lệ (trong app + listing)
- [ ] Privacy Manifest đầy đủ
- [ ] App Privacy Labels chính xác
- [ ] Consent modal cho OpenRouter AI
- [ ] ATT prompt nếu có tracking
- [ ] Age rating questionnaire
- [ ] Screenshots 1320x2868 (iPhone 6.9")
- [ ] Test trên thiết bị thật qua TestFlight
- [ ] Info.plist keys chỉ cho features thực sự dùng
- [ ] Safe Areas, Dynamic Type, responsive layout
- [ ] `bundleIdentifier` + `buildNumber` chính xác
