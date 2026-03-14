const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Tiên Phong CDS";
pres.title = "Báo cáo Tiến độ Công việc - Vietnam's Food Map (Chi tiết)";

// Brand colors
const GREEN = "2E7D32";
const DARK_GREEN = "1B5E20";
const LIGHT_GREEN = "E8F5E9";
const RED = "C62828";
const DARK_RED = "8E0000";
const LIGHT_RED = "FFEBEE";
const DARK = "212121";
const GRAY = "757575";
const LIGHT_GRAY = "F5F5F5";
const WHITE = "FFFFFF";
const ORANGE = "E65100";
const LIGHT_ORANGE = "FFF3E0";
const BLUE = "1565C0";
const LIGHT_BLUE = "E3F2FD";

const makeShadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.1 });

function addFooter(slide, num) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.15, w: 10, h: 0.475, fill: { color: DARK_GREEN } });
  slide.addText("Tiên Phong CDS  |  VCCA  |  Vietnam's Food Map", {
    x: 0.5, y: 5.15, w: 7, h: 0.475, fontSize: 9, color: WHITE, fontFace: "Arial", valign: "middle"
  });
  slide.addText(String(num), {
    x: 8.5, y: 5.15, w: 1, h: 0.475, fontSize: 9, color: WHITE, fontFace: "Arial", align: "right", valign: "middle"
  });
}

function addHeader(slide, title, color, titleW) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: color || GREEN } });
  slide.addText(title, { x: 0.5, y: 0, w: titleW || 9, h: 0.9, fontSize: 24, bold: true, color: WHITE, fontFace: "Arial", valign: "middle", margin: 0 });
}

function addBadge(slide, text, x, y, bgColor, textColor) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 1.4, h: 0.5, fill: { color: bgColor }, rectRadius: 0.1, shadow: makeShadow() });
  slide.addText(text, { x, y, w: 1.4, h: 0.5, fontSize: 18, bold: true, color: textColor, fontFace: "Arial", align: "center", valign: "middle" });
}

// ============== SLIDE 1: TRANG BÌA ==============
let s1 = pres.addSlide();
s1.background = { color: LIGHT_GREEN };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: GREEN } });
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.08, w: 10, h: 0.04, fill: { color: RED } });
s1.addText("TIÊN PHONG CDS", { x: 0.8, y: 0.5, w: 4, h: 0.4, fontSize: 14, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
s1.addText("HIỆP HỘI VĂN HÓA ẨM THỰC VIỆT NAM", { x: 5, y: 0.5, w: 4.5, h: 0.4, fontSize: 12, bold: true, color: RED, fontFace: "Arial", align: "right", margin: 0 });
s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.3, w: 8.4, h: 2.8, fill: { color: WHITE }, shadow: makeShadow() });
s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.3, w: 0.1, h: 2.8, fill: { color: GREEN } });
s1.addText("BÁO CÁO TIẾN ĐỘ CÔNG VIỆC", { x: 1.2, y: 1.5, w: 7.8, h: 0.8, fontSize: 30, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
s1.addText("DỰA THEO LỘ TRÌNH CÔNG VIỆC", { x: 1.2, y: 2.2, w: 7.8, h: 0.6, fontSize: 22, bold: true, color: RED, fontFace: "Arial", margin: 0 });
s1.addShape(pres.shapes.LINE, { x: 1.2, y: 2.9, w: 3, h: 0, line: { color: GREEN, width: 2 } });
s1.addText("Dự án: Vietnam's Food Map", { x: 1.2, y: 3.0, w: 7.8, h: 0.4, fontSize: 14, color: DARK, fontFace: "Arial", margin: 0 });
s1.addText("Ngày báo cáo: 12/03/2026", { x: 1.2, y: 3.4, w: 7.8, h: 0.4, fontSize: 12, color: GRAY, fontFace: "Arial", margin: 0 });
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.7, w: 10, h: 0.04, fill: { color: RED } });
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.74, w: 10, h: 0.885, fill: { color: DARK_GREEN } });
s1.addText("Công ty Cổ phần Tiên Phong CDS  |  Hiệp hội Văn hóa Ẩm thực Việt Nam (VCCA)", {
  x: 0.5, y: 4.85, w: 9, h: 0.5, fontSize: 11, color: WHITE, fontFace: "Arial", align: "center", valign: "middle"
});

// ============== SLIDE 2: TỔNG QUAN DỰ ÁN ==============
let s2 = pres.addSlide();
s2.background = { color: WHITE };
addFooter(s2, 2);
addHeader(s2, "TỔNG QUAN DỰ ÁN");

const infoItems = [
  ["Dự án", "Xây dựng Nền tảng Bản Đồ Ẩm Thực Việt Nam"],
  ["Bắt đầu", "01/03/2025"],
  ["Các bên", "Tiên Phong CDS + VCCA + Vietravel"],
  ["Mô hình", "BOT (chia sẻ doanh thu 3 năm)"],
];
infoItems.forEach(([label, value], i) => {
  const y = 1.2 + i * 0.72;
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.6, fill: { color: i % 2 === 0 ? LIGHT_GREEN : WHITE }, shadow: makeShadow() });
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.08, h: 0.6, fill: { color: GREEN } });
  s2.addText(label, { x: 0.8, y, w: 1.8, h: 0.6, fontSize: 13, bold: true, color: GREEN, fontFace: "Arial", valign: "middle", margin: 0 });
  s2.addText(value, { x: 2.6, y, w: 6.7, h: 0.6, fontSize: 13, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

s2.addText("Lộ trình 4 giai đoạn:", { x: 0.5, y: 4.15, w: 9, h: 0.35, fontSize: 13, bold: true, color: DARK, fontFace: "Arial", margin: 0 });
const phases = ["Setup Nền Tảng", "Xây Dựng Cộng Đồng", "Mở Rộng Hệ Sinh Thái", "Hoàn Thiện Hệ Thống"];
phases.forEach((name, i) => {
  const x = 0.5 + i * 2.35;
  s2.addShape(pres.shapes.RECTANGLE, { x, y: 4.55, w: 2.1, h: 0.45, fill: { color: i === 0 ? GREEN : i === 1 ? ORANGE : RED }, shadow: makeShadow() });
  s2.addText(name, { x, y: 4.55, w: 2.1, h: 0.45, fontSize: 10, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  if (i < 3) {
    s2.addText("→", { x: x + 2.1, y: 4.55, w: 0.25, h: 0.45, fontSize: 16, color: GRAY, fontFace: "Arial", align: "center", valign: "middle" });
  }
});

// ============== SLIDE 3: TỔNG KẾT TIẾN ĐỘ ==============
let s3 = pres.addSlide();
s3.background = { color: WHITE };
addFooter(s3, 3);
addHeader(s3, "TỔNG KẾT TIẾN ĐỘ THEO GIAI ĐOẠN");

const summaryData = [
  [{ text: "Giai đoạn", options: { bold: true, color: WHITE, fill: { color: GREEN } } },
   { text: "Tiến độ", options: { bold: true, color: WHITE, fill: { color: GREEN } } },
   { text: "Trạng thái", options: { bold: true, color: WHITE, fill: { color: GREEN } } },
   { text: "Ghi chú", options: { bold: true, color: WHITE, fill: { color: GREEN } } }],
  [{ text: "Giai đoạn 1\nSetup Nền Tảng", options: { bold: true } }, { text: "100%", options: { bold: true, color: GREEN, align: "center" } },
   { text: "Hoàn thành", options: { color: GREEN, bold: true, fill: { color: LIGHT_GREEN }, align: "center" } },
   "Đã nghiệm thu 25/03/2025"],
  [{ text: "Giai đoạn 2\nXây Dựng Cộng Đồng", options: { bold: true } }, { text: "~70%", options: { bold: true, color: ORANGE, align: "center" } },
   { text: "Đang triển khai", options: { color: ORANGE, bold: true, fill: { color: LIGHT_ORANGE }, align: "center" } },
   "3 hoàn thành, 5 đang phát triển, 4 tồn đọng"],
  [{ text: "Giai đoạn 3\nMở Rộng Hệ Sinh Thái", options: { bold: true } }, { text: "0%", options: { bold: true, color: RED, align: "center" } },
   { text: "Chưa triển khai", options: { color: RED, bold: true, fill: { color: LIGHT_RED }, align: "center" } },
   "Bị ảnh hưởng bởi Giai đoạn 2"],
  [{ text: "Giai đoạn 4\nHoàn Thiện Hệ Thống", options: { bold: true } }, { text: "0%", options: { bold: true, color: RED, align: "center" } },
   { text: "Chưa triển khai", options: { color: RED, bold: true, fill: { color: LIGHT_RED }, align: "center" } },
   "Bị ảnh hưởng bởi các giai đoạn trước"],
];
s3.addTable(summaryData, { x: 0.5, y: 1.2, w: 9, colW: [2.5, 1.2, 1.8, 3.5], fontSize: 12, fontFace: "Arial", color: DARK, border: { pt: 0.5, color: "BDBDBD" }, rowH: [0.5, 0.7, 0.7, 0.7, 0.7] });

// ============== SLIDE 4: GIAI ĐOẠN 1 ==============
let s4 = pres.addSlide();
s4.background = { color: WHITE };
addFooter(s4, 4);
addHeader(s4, "GIAI ĐOẠN 1: SETUP NỀN TẢNG");
addBadge(s4, "100%", 8.0, 0.2, WHITE, GREEN);

s4.addText("Đã nghiệm thu theo Biên bản nghiệm thu ký ngày 25/03/2025", {
  x: 0.5, y: 1.05, w: 9, h: 0.4, fontSize: 12, italic: true, color: GREEN, fontFace: "Arial", margin: 0
});

const phase1Items = [
  "Vietnam's Food Map & Food Guide (Web/App/Admin)",
  "Quyền lợi nhà tài trợ + Gắn banner lên các trang",
  "Hệ thống tin tức & Quản lý sự kiện ẩm thực",
  "Kiểm thử hệ thống & Tối ưu hiệu suất",
  "Chuẩn bị dữ liệu & Triển khai nội dung",
  "Deploy & Đào tạo sử dụng hệ thống",
  "Tổng kết & Kế hoạch Launching",
];
phase1Items.forEach((item, i) => {
  const y = 1.6 + i * 0.48;
  s4.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.4, fill: { color: i % 2 === 0 ? LIGHT_GREEN : WHITE }, shadow: makeShadow() });
  s4.addText("✓", { x: 0.6, y, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: GREEN, fontFace: "Arial", align: "center", valign: "middle" });
  s4.addText(item, { x: 1.1, y, w: 8.2, h: 0.4, fontSize: 12, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 5: GĐ2 HOÀN THÀNH - TRANG CHỦ VIETNAM FOODMAP ==============
let s5 = pres.addSlide();
s5.background = { color: WHITE };
addFooter(s5, 5);
addHeader(s5, "GĐ2 HOÀN THÀNH: TRANG CHỦ VIETNAM FOODMAP", GREEN, 7.5);
addBadge(s5, "100%", 8.2, 0.2, WHITE, GREEN);

s5.addText("Module 2 - Thiết lập nền tảng & Chuẩn hóa tiêu chuẩn  |  Hoàn thành 13/04/2025", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 11, italic: true, color: GREEN, fontFace: "Arial", margin: 0
});

// Left column - Mô tả
s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 4.3, h: 3.4, fill: { color: LIGHT_GREEN }, shadow: makeShadow() });
s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 0.08, h: 3.4, fill: { color: GREEN } });
s5.addText("Mục đích", { x: 0.8, y: 1.6, w: 3.8, h: 0.35, fontSize: 12, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
s5.addText("Giao diện trực quan giúp người dùng tiếp cận nhanh các tính năng, thông tin nổi bật và quảng bá đối tác, nhà tài trợ.", {
  x: 0.8, y: 1.95, w: 3.8, h: 0.6, fontSize: 10, color: DARK, fontFace: "Arial", margin: 0
});
s5.addText("Đối tượng sử dụng", { x: 0.8, y: 2.6, w: 3.8, h: 0.35, fontSize: 12, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
s5.addText("Người dùng cuối, nhà hàng, tổ chức ẩm thực, nhà tài trợ, đối tác thương hiệu.", {
  x: 0.8, y: 2.95, w: 3.8, h: 0.5, fontSize: 10, color: DARK, fontFace: "Arial", margin: 0
});
s5.addText("Giá trị mang lại", { x: 0.8, y: 3.5, w: 3.8, h: 0.35, fontSize: 12, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
s5.addText("Tăng tương tác, truy cập nhanh sự kiện/tin tức/món ăn, nâng cao hiệu quả quảng cáo nhà tài trợ.", {
  x: 0.8, y: 3.85, w: 3.8, h: 0.6, fontSize: 10, color: DARK, fontFace: "Arial", margin: 0
});

// Right column - Tính năng chi tiết
s5.addText("Tính năng đã triển khai", { x: 5.2, y: 1.55, w: 4.3, h: 0.35, fontSize: 12, bold: true, color: DARK_GREEN, fontFace: "Arial", margin: 0 });

const homepageFeatures = [
  "Banner giới thiệu & quảng cáo nhà tài trợ",
  "Thanh tìm kiếm thông minh (món ăn, địa điểm, nhà hàng)",
  "Danh mục chức năng: Bản đồ, Cẩm nang, Sự kiện, Tin tức",
  "Khối sự kiện sắp diễn ra + đếm ngược",
  "Tin tức ẩm thực cập nhật liên tục",
  "Thanh điều hướng (Home Bar) rút gọn 5 mục",
  "Slide Banner động thay thế khối tin tức tĩnh",
  "Khối \"Gợi ý hấp dẫn\" & \"Địa điểm gợi ý\"",
];
homepageFeatures.forEach((feat, i) => {
  const y = 2.0 + i * 0.38;
  s5.addShape(pres.shapes.RECTANGLE, { x: 5.2, y, w: 4.3, h: 0.32, fill: { color: i % 2 === 0 ? LIGHT_GREEN : WHITE } });
  s5.addText("✓", { x: 5.25, y, w: 0.3, h: 0.32, fontSize: 11, bold: true, color: GREEN, fontFace: "Arial", align: "center", valign: "middle" });
  s5.addText(feat, { x: 5.6, y, w: 3.8, h: 0.32, fontSize: 10, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 6: GĐ2 HOÀN THÀNH - BẢN ĐỒ ẨM THỰC TOÀN QUỐC ==============
let s6 = pres.addSlide();
s6.background = { color: WHITE };
addFooter(s6, 6);
addHeader(s6, "GĐ2 HOÀN THÀNH: BẢN ĐỒ ẨM THỰC TOÀN QUỐC", GREEN, 7.5);
addBadge(s6, "100%", 8.2, 0.2, WHITE, GREEN);

s6.addText("Module 3 - Phát triển Bản đồ ẩm thực nâng cao  |  Hoàn thành 15/08/2025", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 11, italic: true, color: GREEN, fontFace: "Arial", margin: 0
});

// Left column - Bản đồ tương tác
s6.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 4.3, h: 1.7, fill: { color: LIGHT_GREEN }, shadow: makeShadow() });
s6.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 0.08, h: 1.7, fill: { color: GREEN } });
s6.addText("Bản đồ tương tác", { x: 0.8, y: 1.6, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
const mapFeats1 = [
  "Bản đồ toàn bộ Việt Nam với 34 tỉnh/thành",
  "Label tên tỉnh chuẩn hóa + Tooltip món đặc trưng",
  "Click tỉnh → phóng to, viền sáng, xem chi tiết",
  "Hover → hiện tooltip tên món đặc sản",
  "Auto-highlight vòng lặp mỗi 5-10 giây",
];
mapFeats1.forEach((f, i) => {
  s6.addText("• " + f, { x: 0.8, y: 1.95 + i * 0.24, w: 3.8, h: 0.24, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Left column - Luồng người dùng
s6.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.4, w: 4.3, h: 1.55, fill: { color: LIGHT_BLUE }, shadow: makeShadow() });
s6.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.4, w: 0.08, h: 1.55, fill: { color: BLUE } });
s6.addText("Luồng người dùng (Onboarding)", { x: 0.8, y: 3.45, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: BLUE, fontFace: "Arial", margin: 0 });
const onboardFeats = [
  "Lần đầu: Chọn ngôn ngữ (VN/EN) + cấp quyền định vị",
  "Video Intro giới thiệu 10-15 giây",
  "Lần sau: Bỏ qua, vào thẳng bản đồ chính",
  "Splash screen 1-2s khi truy cập lại",
];
onboardFeats.forEach((f, i) => {
  s6.addText("• " + f, { x: 0.8, y: 3.8 + i * 0.26, w: 3.8, h: 0.26, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right column - Nội dung & Hiệu ứng
s6.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.55, w: 4.3, h: 1.7, fill: { color: LIGHT_ORANGE }, shadow: makeShadow() });
s6.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.55, w: 0.08, h: 1.7, fill: { color: ORANGE } });
s6.addText("Nội dung dưới bản đồ", { x: 5.5, y: 1.6, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: ORANGE, fontFace: "Arial", margin: 0 });
const contentFeats = [
  "Gợi ý hấp dẫn: Món nổi bật, tìm kiếm nhiều, nghệ nhân tiêu biểu",
  "Slide Banner: Sự kiện, món ăn nổi bật, hoạt động đặc sắc",
  "Địa điểm gợi ý: Từ nghệ nhân & curated bởi VCCA",
  "Sự kiện nổi bật: Đang diễn ra + sắp tới (countdown)",
  "Nút \"Xem chi tiết\" & \"Đăng ký tham gia\"",
];
contentFeats.forEach((f, i) => {
  s6.addText("• " + f, { x: 5.5, y: 1.95 + i * 0.24, w: 3.8, h: 0.24, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right bottom - Hiệu ứng
s6.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.4, w: 4.3, h: 1.55, fill: { color: LIGHT_GREEN }, shadow: makeShadow() });
s6.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.4, w: 0.08, h: 1.55, fill: { color: DARK_GREEN } });
s6.addText("Hiệu ứng & Tìm kiếm", { x: 5.5, y: 3.45, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: DARK_GREEN, fontFace: "Arial", margin: 0 });
const effectFeats = [
  "Âm thanh nhẹ nhàng: xèo xèo, lửa, dao thớt",
  "Zoom in/out trên mobile",
  "Tìm kiếm nhanh: Món ăn, Địa điểm, Nhà hàng",
  "Màu nền & hiệu ứng theo vùng miền",
];
effectFeats.forEach((f, i) => {
  s6.addText("• " + f, { x: 5.5, y: 3.8 + i * 0.26, w: 3.8, h: 0.26, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 7: GĐ2 HOÀN THÀNH - CMS NỘI BỘ & CẨM NANG ẨM THỰC ==============
let s7 = pres.addSlide();
s7.background = { color: WHITE };
addFooter(s7, 7);
addHeader(s7, "GĐ2 HOÀN THÀNH: CMS NỘI BỘ & CẨM NANG ẨM THỰC", GREEN, 7.5);
addBadge(s7, "100%", 8.2, 0.2, WHITE, GREEN);

s7.addText("Hoàn thành CMS: 08/09/2025  |  Cẩm nang ẩm thực (Module 4): Giai đoạn 1", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 11, italic: true, color: GREEN, fontFace: "Arial", margin: 0
});

// CMS Grid - 2 columns x 4 rows
s7.addText("Hệ thống CMS quản trị nội bộ — 7 phân hệ", { x: 0.5, y: 1.5, w: 4.5, h: 0.35, fontSize: 12, bold: true, color: DARK_GREEN, fontFace: "Arial", margin: 0 });

const cmsModules = [
  ["Quản lý Món ăn", "CRUD, phân loại, hình ảnh, video, trạng thái duyệt"],
  ["Quản lý Nghệ nhân", "Hồ sơ, cấp bậc, chứng nhận, liên kết nhà hàng"],
  ["Quản lý Nhà hàng", "Thông tin, vị trí bản đồ, thực đơn, đánh giá"],
  ["Quản lý Phiếu đề xuất", "Tiếp nhận đề xuất món ăn, quy trình duyệt"],
  ["Quản lý Bài viết", "Blog, công thức, câu chuyện văn hóa"],
  ["Quản lý Tin tức/Sự kiện", "Đăng tin, lịch sự kiện, đăng ký tham gia"],
  ["Quản lý Video", "Upload, phân loại, nhúng, kiểm duyệt"],
];
cmsModules.forEach(([title, desc], i) => {
  const col = i < 4 ? 0 : 1;
  const row = i < 4 ? i : i - 4;
  const x = 0.5 + col * 4.7;
  const y = 1.95 + row * 0.6;
  s7.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 0.5, fill: { color: i % 2 === 0 ? LIGHT_GREEN : WHITE }, shadow: makeShadow() });
  s7.addText("✓", { x: x + 0.05, y, w: 0.3, h: 0.5, fontSize: 12, bold: true, color: GREEN, fontFace: "Arial", align: "center", valign: "middle" });
  s7.addText(title, { x: x + 0.35, y, w: 1.6, h: 0.5, fontSize: 10, bold: true, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
  s7.addText(desc, { x: x + 1.95, y, w: 2.35, h: 0.5, fontSize: 9, color: GRAY, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Cẩm nang ẩm thực
s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.2, w: 9, h: 0.75, fill: { color: LIGHT_BLUE }, shadow: makeShadow() });
s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.2, w: 0.08, h: 0.75, fill: { color: BLUE } });
s7.addText("Cẩm nang ẩm thực (Module 4)", { x: 0.8, y: 4.22, w: 3, h: 0.3, fontSize: 11, bold: true, color: BLUE, fontFace: "Arial", margin: 0 });
s7.addText("Danh sách món đề xuất • Chi tiết món ăn (nguyên liệu, công thức, các bước) • Đánh giá chuyên gia • Câu chuyện văn hóa nguồn gốc • Video hướng dẫn chế biến • Chia sẻ, yêu thích, đánh giá", {
  x: 0.8, y: 4.52, w: 8.5, h: 0.35, fontSize: 9, color: DARK, fontFace: "Arial", margin: 0
});

// ============== SLIDE 8: GĐ2 ĐANG TRIỂN KHAI - TỔNG QUAN ==============
let s8 = pres.addSlide();
s8.background = { color: WHITE };
addFooter(s8, 8);
addHeader(s8, "GĐ2 ĐANG TRIỂN KHAI: TỔNG QUAN 5 HẠNG MỤC", ORANGE);

s8.addText("Mapping theo tài liệu Tổng quan Hệ sinh thái Vietnam's Food Map (MSTR v5.0)", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 11, italic: true, color: GRAY, fontFace: "Arial", margin: 0
});

const ipData = [
  [{ text: "Hạng mục", options: { bold: true, color: WHITE, fill: { color: ORANGE } } },
   { text: "Module", options: { bold: true, color: WHITE, fill: { color: ORANGE } } },
   { text: "Tiến độ", options: { bold: true, color: WHITE, fill: { color: ORANGE } } },
   { text: "Đã triển khai", options: { bold: true, color: WHITE, fill: { color: ORANGE } } },
   { text: "Tồn đọng", options: { bold: true, color: WHITE, fill: { color: ORANGE } } }],
  [{ text: "Đề xuất món ăn\n& Form nhà hàng", options: { bold: true, fontSize: 10 } },
   { text: "Module 1", options: { align: "center", fontSize: 10 } },
   { text: "80%", options: { bold: true, color: GREEN, align: "center" } },
   { text: "Form nhập liệu, thông tin chi tiết, ảnh/video, quy trình đề xuất", options: { fontSize: 9 } },
   { text: "Hạng mục đề cử đa cấp (huyện, tỉnh, TW, UNESCO)", options: { fontSize: 9 } }],
  [{ text: "Bản đồ\nđịa phương", options: { bold: true, fontSize: 10 } },
   { text: "Module 9", options: { align: "center", fontSize: 10 } },
   { text: "80%", options: { bold: true, color: GREEN, align: "center" } },
   { text: "Bản đồ chi tiết tỉnh, tìm kiếm địa điểm, chi tiết quán ăn", options: { fontSize: 9 } },
   { text: "Địa điểm nghệ nhân đề xuất", options: { fontSize: 9 } }],
  [{ text: "AI Đánh giá\nmón ăn", options: { bold: true, fontSize: 10 } },
   { text: "Module 7-8", options: { align: "center", fontSize: 10 } },
   { text: "70%", options: { bold: true, color: ORANGE, align: "center" } },
   { text: "AI scoring tổng quan + chi tiết, phân tích 9 khía cạnh", options: { fontSize: 9 } },
   { text: "Kiểm tra chính tả, đạo văn, trùng lặp", options: { fontSize: 9 } }],
  [{ text: "ReviewHub", options: { bold: true, fontSize: 10 } },
   { text: "Module 6", options: { align: "center", fontSize: 10 } },
   { text: "50%", options: { bold: true, color: RED, align: "center" } },
   { text: "Khung đăng ký, upload video, video dọc TikTok style", options: { fontSize: 9 } },
   { text: "Bộ lọc, Thumbnail, Gợi ý video", options: { fontSize: 9 } }],
  [{ text: "Nghệ nhân", options: { bold: true, fontSize: 10 } },
   { text: "Module 10", options: { align: "center", fontSize: 10 } },
   { text: "80%", options: { bold: true, color: GREEN, align: "center" } },
   { text: "Danh sách, hồ sơ chi tiết, video, bộ lọc, chứng chỉ", options: { fontSize: 9 } },
   { text: "Tính năng đặt lịch (Booking)", options: { fontSize: 9 } }],
];
s8.addTable(ipData, { x: 0.3, y: 1.5, w: 9.4, colW: [1.6, 0.9, 0.9, 3.2, 2.8], fontSize: 11, fontFace: "Arial", color: DARK, border: { pt: 0.5, color: "BDBDBD" }, rowH: [0.4, 0.6, 0.6, 0.6, 0.6, 0.6] });

// ============== SLIDE 9: CHI TIẾT - ĐỀ XUẤT MÓN ĂN & BẢN ĐỒ ĐỊA PHƯƠNG ==============
let s9 = pres.addSlide();
s9.background = { color: WHITE };
addFooter(s9, 9);
addHeader(s9, "CHI TIẾT: ĐỀ XUẤT MÓN ĂN & BẢN ĐỒ ĐỊA PHƯƠNG", ORANGE);

// Left - Đề xuất món ăn (Module 1)
s9.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 3.85, fill: { color: WHITE }, shadow: makeShadow() });
s9.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 0.45, fill: { color: ORANGE } });
s9.addText("Đề xuất món ăn lên Foodmap (Module 1)", { x: 0.7, y: 1.1, w: 3, h: 0.45, fontSize: 11, bold: true, color: WHITE, fontFace: "Arial", valign: "middle", margin: 0 });
s9.addText("80%", { x: 3.8, y: 1.1, w: 0.8, h: 0.45, fontSize: 14, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });

s9.addText("Đã triển khai:", { x: 0.7, y: 1.65, w: 3.9, h: 0.3, fontSize: 10, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
const dexuatDone = [
  "Form nhập: Tên món, nguyên liệu, gia vị, cách chế biến",
  "Nguồn gốc, câu chuyện & giá trị văn hóa",
  "Ảnh đại diện + Bộ sưu tập hình ảnh minh họa",
  "Video hướng dẫn chế biến (nếu có)",
  "Quy trình gửi → chuyên gia đánh giá → duyệt",
  "Thông báo trạng thái đề xuất cho người dùng",
];
dexuatDone.forEach((f, i) => {
  s9.addText("✓ " + f, { x: 0.7, y: 1.95 + i * 0.28, w: 3.9, h: 0.28, fontSize: 9, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

s9.addText("Tồn đọng:", { x: 0.7, y: 3.7, w: 3.9, h: 0.3, fontSize: 10, bold: true, color: RED, fontFace: "Arial", margin: 0 });
const dexuatPending = [
  "Hệ thống đề cử đa cấp: Cá nhân → Huyện → Tỉnh → TW → UNESCO → Toàn cầu",
  "Form nhập thông tin làng nghề/nhà hàng nâng cao",
];
dexuatPending.forEach((f, i) => {
  s9.addText("✗ " + f, { x: 0.7, y: 4.0 + i * 0.32, w: 3.9, h: 0.32, fontSize: 9, color: RED, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right - Bản đồ địa phương (Module 9)
s9.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 3.85, fill: { color: WHITE }, shadow: makeShadow() });
s9.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 0.45, fill: { color: ORANGE } });
s9.addText("Bản đồ địa phương chi tiết (Module 9)", { x: 5.4, y: 1.1, w: 3, h: 0.45, fontSize: 11, bold: true, color: WHITE, fontFace: "Arial", valign: "middle", margin: 0 });
s9.addText("80%", { x: 8.5, y: 1.1, w: 0.8, h: 0.45, fontSize: 14, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });

s9.addText("Đã triển khai:", { x: 5.4, y: 1.65, w: 3.9, h: 0.3, fontSize: 10, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });
const mapDone = [
  "Bản đồ chi tiết khi chọn tỉnh từ bản đồ tổng thể",
  "Danh sách nhà hàng/quán ăn trên bản đồ (icon)",
  "Tìm kiếm món ăn/địa điểm trong khu vực",
  "Chi tiết: tên, địa chỉ, ảnh, đánh giá, SĐT, giờ mở cửa",
  "Xem thực đơn, chỉ đường (Google Maps)",
  "Đánh giá & lưu địa điểm yêu thích",
  "Tin tức/sự kiện + Đặc sản địa phương",
];
mapDone.forEach((f, i) => {
  s9.addText("✓ " + f, { x: 5.4, y: 1.95 + i * 0.28, w: 3.9, h: 0.28, fontSize: 9, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

s9.addText("Tồn đọng:", { x: 5.4, y: 3.95, w: 3.9, h: 0.3, fontSize: 10, bold: true, color: RED, fontFace: "Arial", margin: 0 });
s9.addText("✗ Địa điểm được nghệ nhân đề xuất", { x: 5.4, y: 4.25, w: 3.9, h: 0.28, fontSize: 9, color: RED, fontFace: "Arial", valign: "middle", margin: 0 });
s9.addText("✗ Đặt xe (xe máy, ô tô) trực tiếp từ bản đồ", { x: 5.4, y: 4.53, w: 3.9, h: 0.28, fontSize: 9, color: RED, fontFace: "Arial", valign: "middle", margin: 0 });

// ============== SLIDE 10: CHI TIẾT - REVIEWHUB ==============
let s10 = pres.addSlide();
s10.background = { color: WHITE };
addFooter(s10, 10);
addHeader(s10, "CHI TIẾT: REVIEWHUB — CỘNG ĐỒNG REVIEW ẨM THỰC", ORANGE);

s10.addText("Module 6  |  Tiến độ: 50%  |  Đối tượng: End User, Reviewer, KOL/KOC, Nhà sáng tạo nội dung", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 10, italic: true, color: GRAY, fontFace: "Arial", margin: 0
});

// Left - Đã triển khai
s10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 3.45, fill: { color: LIGHT_GREEN }, shadow: makeShadow() });
s10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 0.08, h: 3.45, fill: { color: GREEN } });
s10.addText("Đã triển khai", { x: 0.8, y: 1.55, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });

const reviewDone = [
  "Giao diện video dọc (Full-screen TikTok style)",
  "Vuốt/lướt dọc xem video kế tiếp",
  "Chi tiết video: caption, thẻ tag, lượt thích",
  "Bình luận, chia sẻ, bày tỏ cảm xúc",
  "Tích hợp hiển thị món ăn liên quan + giá bán",
  "Nút mua hàng trực tiếp từ video",
  "Giao diện upload video + tiêu đề/nội dung",
  "Liên kết món ăn khi đăng video",
  "Hồ sơ reviewer: thống kê like, follower, bài đăng",
  "Follow reviewer + danh sách video",
];
reviewDone.forEach((f, i) => {
  s10.addText("✓ " + f, { x: 0.8, y: 1.9 + i * 0.28, w: 3.8, h: 0.28, fontSize: 9, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right - Tồn đọng + Giá trị
s10.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 1.5, fill: { color: LIGHT_RED }, shadow: makeShadow() });
s10.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 0.08, h: 1.5, fill: { color: RED } });
s10.addText("Tồn đọng cần hoàn thiện", { x: 5.5, y: 1.55, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: RED, fontFace: "Arial", margin: 0 });
const reviewPending = [
  "Bộ lọc: \"Nổi bật\", \"Xem nhiều\", \"Đã follow\"",
  "Thumbnail tự động cho video",
  "Gợi ý video liên quan cho người dùng",
  "Tìm kiếm gần đây + món ăn liên quan",
];
reviewPending.forEach((f, i) => {
  s10.addText("✗ " + f, { x: 5.5, y: 1.9 + i * 0.26, w: 3.8, h: 0.26, fontSize: 9.5, color: RED, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Giá trị
s10.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.2, w: 4.3, h: 1.75, fill: { color: LIGHT_BLUE }, shadow: makeShadow() });
s10.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.2, w: 0.08, h: 1.75, fill: { color: BLUE } });
s10.addText("Giá trị kinh doanh", { x: 5.5, y: 3.25, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: BLUE, fontFace: "Arial", margin: 0 });
const reviewValue = [
  "Tăng tương tác & lan tỏa nội dung ẩm thực",
  "Cơ hội kiếm tiền cho KOL/KOC",
  "Thương mại hóa video: mua nguyên liệu, đặt món",
  "Nền tảng \"Chi hội Review ẩm thực\" của VCCA",
  "Kết nối người dùng ↔ địa điểm ↔ món ăn trực quan",
];
reviewValue.forEach((f, i) => {
  s10.addText("• " + f, { x: 5.5, y: 3.6 + i * 0.26, w: 3.8, h: 0.26, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 11: CHI TIẾT - AI ĐÁNH GIÁ MÓN ĂN ==============
let s11 = pres.addSlide();
s11.background = { color: WHITE };
addFooter(s11, 11);
addHeader(s11, "CHI TIẾT: AI ĐÁNH GIÁ MÓN ĂN (TỔNG QUAN & CHI TIẾT)", ORANGE);

s11.addText("Module 7 + Module 8  |  Tiến độ: 70%  |  AI tự động phân tích, chấm điểm, đánh giá chuyên sâu", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 10, italic: true, color: GRAY, fontFace: "Arial", margin: 0
});

// Left - AI Tổng quan (Module 7)
s11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 1.6, fill: { color: WHITE }, shadow: makeShadow() });
s11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 0.35, fill: { color: GREEN } });
s11.addText("AI Đánh giá Tổng quan (Module 7)", { x: 0.7, y: 1.5, w: 3.9, h: 0.35, fontSize: 11, bold: true, color: WHITE, fontFace: "Arial", valign: "middle", margin: 0 });

const aiOverview = [
  "Điểm tổng thể: Circle Chart, tối đa 100 điểm",
  "5 khía cạnh (0-10): Độ phức tạp, Dinh dưỡng, Sáng tạo, Khả năng thực hiện, Sức hấp dẫn",
  "Thanh slider trực quan cho mỗi khía cạnh",
  "AI tạo nhận xét tổng kết tự động",
  "Lưu kết quả làm cơ sở duyệt/phê duyệt",
];
aiOverview.forEach((f, i) => {
  s11.addText("✓ " + f, { x: 0.7, y: 1.92 + i * 0.22, w: 3.9, h: 0.22, fontSize: 8.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right - AI Chi tiết (Module 8)
s11.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 1.6, fill: { color: WHITE }, shadow: makeShadow() });
s11.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 0.35, fill: { color: GREEN } });
s11.addText("AI Đánh giá Chi tiết (Module 8)", { x: 5.4, y: 1.5, w: 3.9, h: 0.35, fontSize: 11, bold: true, color: WHITE, fontFace: "Arial", valign: "middle", margin: 0 });

const aiDetail = [
  "Thông tin: Tên, loại, vùng miền, dân tộc, khẩu vị",
  "Nguyên liệu chính + Gia vị (loại, mức độ, phổ biến)",
  "Hương vị cảm nhận: mùi, vị, kết cấu chi tiết",
  "Giá trị dinh dưỡng: calo, protein, chất xơ, chất béo",
  "Điểm tổng hợp 1-5 sao (trung bình 6 yếu tố)",
];
aiDetail.forEach((f, i) => {
  s11.addText("✓ " + f, { x: 5.4, y: 1.92 + i * 0.22, w: 3.9, h: 0.22, fontSize: 8.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Bottom - Bảng khía cạnh phân tích (2 cột song song)
s11.addText("9 khía cạnh AI phân tích chi tiết mỗi món ăn:", { x: 0.5, y: 3.15, w: 5, h: 0.25, fontSize: 10, bold: true, color: DARK_GREEN, fontFace: "Arial", margin: 0 });

// Left table - 5 aspects
const aiAspectsL = [
  [{ text: "Yếu tố", options: { bold: true, color: WHITE, fill: { color: GREEN }, fontSize: 8 } },
   { text: "Mô tả", options: { bold: true, color: WHITE, fill: { color: GREEN }, fontSize: 8 } }],
  [{ text: "Nguyên liệu", options: { fontSize: 8, bold: true } }, { text: "Danh sách kèm số lượng, đơn vị", options: { fontSize: 8 } }],
  [{ text: "Gia vị", options: { fontSize: 8, bold: true } }, { text: "Loại, mức độ, độ phổ biến vùng", options: { fontSize: 8 } }],
  [{ text: "Độ phức tạp", options: { fontSize: 8, bold: true } }, { text: "1-5 sao, yêu cầu kỹ năng", options: { fontSize: 8 } }],
  [{ text: "Hương vị", options: { fontSize: 8, bold: true } }, { text: "Mùi, vị, kết cấu chi tiết", options: { fontSize: 8 } }],
  [{ text: "Tính độc đáo", options: { fontSize: 8, bold: true } }, { text: "So sánh món tương đồng", options: { fontSize: 8 } }],
];
s11.addTable(aiAspectsL, { x: 0.5, y: 3.4, w: 4.3, colW: [1.2, 3.1], fontSize: 8, fontFace: "Arial", color: DARK, border: { pt: 0.5, color: "BDBDBD" }, margin: [2, 4, 2, 4] });

// Right table - 4 aspects
const aiAspectsR = [
  [{ text: "Yếu tố", options: { bold: true, color: WHITE, fill: { color: GREEN }, fontSize: 8 } },
   { text: "Mô tả", options: { bold: true, color: WHITE, fill: { color: GREEN }, fontSize: 8 } }],
  [{ text: "Dinh dưỡng", options: { fontSize: 8, bold: true } }, { text: "Calo, protein, chất xơ, khoáng chất", options: { fontSize: 8 } }],
  [{ text: "Chế biến", options: { fontSize: 8, bold: true } }, { text: "Các bước chi tiết, đúng giai đoạn", options: { fontSize: 8 } }],
  [{ text: "Giới thiệu", options: { fontSize: 8, bold: true } }, { text: "Đề xuất ngữ nghĩa phù hợp", options: { fontSize: 8 } }],
  [{ text: "Câu chuyện", options: { fontSize: 8, bold: true } }, { text: "Đánh giá chính tả, mạch lạc", options: { fontSize: 8 } }],
];
s11.addTable(aiAspectsR, { x: 5.2, y: 3.4, w: 4.3, colW: [1.2, 3.1], fontSize: 8, fontFace: "Arial", color: DARK, border: { pt: 0.5, color: "BDBDBD" }, margin: [2, 4, 2, 4] });

// ============== SLIDE 12: CHI TIẾT - NGHỆ NHÂN ==============
let s12 = pres.addSlide();
s12.background = { color: WHITE };
addFooter(s12, 12);
addHeader(s12, "CHI TIẾT: NGHỆ NHÂN ẨM THỰC VIỆT NAM", ORANGE);

s12.addText("Module 10  |  Tiến độ: 80%  |  Danh bạ nghệ nhân được VCCA thẩm định & chứng nhận", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 10, italic: true, color: GRAY, fontFace: "Arial", margin: 0
});

// Left - Đã triển khai
s12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 3.45, fill: { color: WHITE }, shadow: makeShadow() });
s12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 0.08, h: 3.45, fill: { color: GREEN } });
s12.addText("Đã triển khai", { x: 0.8, y: 1.55, w: 3.8, h: 0.35, fontSize: 12, bold: true, color: GREEN, fontFace: "Arial", margin: 0 });

s12.addText("Màn hình danh sách Nghệ nhân:", { x: 0.8, y: 1.95, w: 3.8, h: 0.25, fontSize: 10, bold: true, color: DARK, fontFace: "Arial", margin: 0 });
const artisanList = [
  "Danh sách với hình ảnh, tên, thông tin tóm tắt",
  "Bộ lọc: Tỉnh/Thành phố, kinh nghiệm, cấp độ",
  "Sắp xếp A-Z, theo kinh nghiệm",
];
artisanList.forEach((f, i) => {
  s12.addText("✓ " + f, { x: 0.8, y: 2.25 + i * 0.25, w: 3.8, h: 0.25, fontSize: 9, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

s12.addText("Màn hình chi tiết Nghệ nhân:", { x: 0.8, y: 3.1, w: 3.8, h: 0.25, fontSize: 10, bold: true, color: DARK, fontFace: "Arial", margin: 0 });
const artisanDetail = [
  "Thông tin cá nhân + Tiểu sử chi tiết",
  "Video giới thiệu nghệ nhân",
  "Chứng chỉ / Bằng cấp đã đạt",
  "Kinh nghiệm làm việc",
  "Đánh giá (review) từ cộng đồng",
  "Nhà hàng / Món ăn do nghệ nhân đề xuất",
];
artisanDetail.forEach((f, i) => {
  s12.addText("✓ " + f, { x: 0.8, y: 3.4 + i * 0.25, w: 3.8, h: 0.25, fontSize: 9, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right top - Đối tượng
s12.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 1.65, fill: { color: LIGHT_BLUE }, shadow: makeShadow() });
s12.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 0.08, h: 1.65, fill: { color: BLUE } });
s12.addText("Đối tượng sử dụng", { x: 5.5, y: 1.55, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: BLUE, fontFace: "Arial", margin: 0 });
const artisanUsers = [
  "Nhà hàng, khách sạn: Tư vấn, xây dựng thực đơn",
  "Tổ chức sự kiện: Mời giám khảo, diễn giả",
  "Cá nhân, gia đình: Đầu bếp riêng, lớp nấu ăn",
  "Nhãn hàng F&B: Đại diện, cố vấn, quảng bá",
];
artisanUsers.forEach((f, i) => {
  s12.addText("• " + f, { x: 5.5, y: 1.9 + i * 0.28, w: 3.8, h: 0.28, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right bottom - Tồn đọng
s12.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.35, w: 4.3, h: 1.6, fill: { color: LIGHT_RED }, shadow: makeShadow() });
s12.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.35, w: 0.08, h: 1.6, fill: { color: RED } });
s12.addText("Tồn đọng: Tính năng Booking", { x: 5.5, y: 3.4, w: 3.8, h: 0.3, fontSize: 12, bold: true, color: RED, fontFace: "Arial", margin: 0 });
const artisanPending = [
  "Nút \"Liên Hệ Booking\" nổi bật trên trang chi tiết",
  "Biểu mẫu: Họ tên, SĐT, Email, nội dung yêu cầu",
  "Hệ thống gửi thông tin đến nghệ nhân",
  "Nghệ nhân chủ động liên hệ lại người dùng",
];
artisanPending.forEach((f, i) => {
  s12.addText("✗ " + f, { x: 5.5, y: 3.75 + i * 0.28, w: 3.8, h: 0.28, fontSize: 9.5, color: RED, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 13: GĐ2 - TỒN ĐỌNG ==============
let s13 = pres.addSlide();
s13.background = { color: WHITE };
addFooter(s13, 13);
addHeader(s13, "GIAI ĐOẠN 2: HẠNG MỤC TỒN ĐỌNG", RED);

// Left: Chưa bắt đầu
s13.addText("Chưa bắt đầu (0%)", { x: 0.5, y: 1.1, w: 4.3, h: 0.4, fontSize: 14, bold: true, color: RED, fontFace: "Arial", margin: 0 });
const notStarted = [
  "Điều chỉnh thiết kế theo layout mới",
  "Kiểm thử & Triển khai chính thức",
  "Tổng kết & Kế hoạch Launching",
];
notStarted.forEach((item, i) => {
  const y = 1.6 + i * 0.55;
  s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 4.3, h: 0.45, fill: { color: LIGHT_RED }, shadow: makeShadow() });
  s13.addText("✗", { x: 0.6, y, w: 0.35, h: 0.45, fontSize: 13, bold: true, color: RED, fontFace: "Arial", align: "center", valign: "middle" });
  s13.addText(item, { x: 1.0, y, w: 3.7, h: 0.45, fontSize: 11, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Right: Tồn đọng hợp đồng
s13.addText("Chưa triển khai (thuộc hợp đồng)", { x: 5.2, y: 1.1, w: 4.3, h: 0.4, fontSize: 14, bold: true, color: RED, fontFace: "Arial", margin: 0 });
const backlog = [
  ["Marketplace", "Sàn giao dịch - Tạo doanh thu"],
  ["Culinary Showcase", "Biểu diễn ẩm thực"],
  ["Nhà tài trợ & Vinh danh", "Module nâng cao"],
  ["Quản lý Chứng nhận", "Chính sách, chứng nhận ngành"],
];
backlog.forEach(([title, desc], i) => {
  const y = 1.6 + i * 0.55;
  s13.addShape(pres.shapes.RECTANGLE, { x: 5.2, y, w: 4.3, h: 0.45, fill: { color: LIGHT_RED }, shadow: makeShadow() });
  s13.addText(title, { x: 5.4, y, w: 2.0, h: 0.45, fontSize: 11, bold: true, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
  s13.addText(desc, { x: 7.4, y, w: 2.0, h: 0.45, fontSize: 10, color: GRAY, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 14: GIAI ĐOẠN 3 & 4 ==============
let s14 = pres.addSlide();
s14.background = { color: WHITE };
addFooter(s14, 14);
addHeader(s14, "GIAI ĐOẠN 3 & 4: CHƯA TRIỂN KHAI (0%)", RED);

// Phase 3
s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 0.45, fill: { color: DARK_GREEN } });
s14.addText("Giai đoạn 3 - Mở rộng Hệ sinh thái (01-02/2026)", { x: 0.5, y: 1.1, w: 4.3, h: 0.45, fontSize: 11, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });

const phase3Items = ["Bảo tàng ẩm thực số hóa", "Hợp tác kinh doanh F&B", "Đầu tư & Khởi nghiệp", "Liên kết hợp tác liên ngành", "Liên kết ứng dụng (API)", "Thị trường ẩm thực", "Chuyện nghệ nhân", "Quản lý dự án"];
phase3Items.forEach((item, i) => {
  const y = 1.65 + i * 0.38;
  s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 4.3, h: 0.3, fill: { color: i % 2 === 0 ? LIGHT_GREEN : WHITE } });
  s14.addText(item, { x: 0.7, y, w: 4, h: 0.3, fontSize: 10, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Phase 4
s14.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 0.45, fill: { color: DARK_RED } });
s14.addText("Giai đoạn 4 - Hoàn thiện Hệ thống (02-03/2026)", { x: 5.2, y: 1.1, w: 4.3, h: 0.45, fontSize: 11, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });

const phase4Items = ["Tri ân & Tôn vinh", "Đào tạo nghiệp vụ (E-learning)", "Công tác xã hội (CSR)", "Grand Event kết thúc dự án (11-12/03/2026)"];
phase4Items.forEach((item, i) => {
  const y = 1.65 + i * 0.45;
  s14.addShape(pres.shapes.RECTANGLE, { x: 5.2, y, w: 4.3, h: 0.35, fill: { color: i % 2 === 0 ? LIGHT_RED : WHITE } });
  s14.addText(item, { x: 5.4, y, w: 4, h: 0.35, fontSize: 10, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
});

// Warning box
s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9, h: 0.6, fill: { color: LIGHT_RED }, shadow: makeShadow() });
s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 0.1, h: 0.6, fill: { color: RED } });
s14.addText("Lý do chậm: Giai đoạn 2 chưa hoàn thành, tạo hiệu ứng block cho toàn bộ giai đoạn 3 và 4", {
  x: 0.8, y: 4.3, w: 8.5, h: 0.6, fontSize: 12, bold: true, color: RED, fontFace: "Arial", valign: "middle", margin: 0
});

// ============== SLIDE 15: THAY ĐỔI ẢNH HƯỞNG ==============
let s15 = pres.addSlide();
s15.background = { color: WHITE };
addFooter(s15, 15);
addHeader(s15, "CÁC THAY ĐỔI ẢNH HƯỞNG TIẾN ĐỘ", RED);

s15.addText("5 thay đổi lớn từ VCCA ảnh hưởng trực tiếp đến khối lượng công việc:", {
  x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 12, italic: true, color: GRAY, fontFace: "Arial", margin: 0
});

const changes = [
  ["1", "Tái cấu trúc ReviewHub", "Giao diện video dọc toàn màn hình kiểu TikTok, nhúng video từ TikTok"],
  ["2", "Thay đổi Logic Bản đồ", "34 tỉnh thành mới, hiệu ứng âm thanh, bản đồ rung nhẹ, auto-highlight"],
  ["3", "Luồng người dùng mới", "Phân luồng Onboarding, Video Intro 10-15 giây, thu thập dữ liệu nhân khẩu"],
  ["4", "Layout Trang chủ", "Menu rút gọn 5 mục, Slide Banner động, khối Gợi ý, Địa điểm, Cộng đồng"],
  ["5", "Quảng cáo & Modal", "Modal Video quảng cáo 5-10 giây theo vị trí, hiệu ứng thu phóng (Zoom)"],
];
changes.forEach(([num, title, desc], i) => {
  const y = 1.5 + i * 0.7;
  s15.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.6, fill: { color: WHITE }, shadow: makeShadow() });
  s15.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.5, h: 0.6, fill: { color: RED } });
  s15.addText(num, { x: 0.5, y, w: 0.5, h: 0.6, fontSize: 16, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  s15.addText(title, { x: 1.15, y, w: 2.5, h: 0.6, fontSize: 12, bold: true, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
  s15.addText(desc, { x: 3.7, y, w: 5.6, h: 0.6, fontSize: 11, color: GRAY, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 16: KIẾN NGHỊ ==============
let s16 = pres.addSlide();
s16.background = { color: WHITE };
addFooter(s16, 16);
addHeader(s16, "KIẾN NGHỊ VÀ ĐỀ XUẤT");

const recommendations = [
  ["01", "Ưu tiên hoàn thiện 5 hạng mục ra mắt", "Food Map, Food Guide, Events, Sự kiện ẩm thực, ReviewHub"],
  ["02", "Rà soát 15 hạng mục cho hợp đồng điều chỉnh", "Bổ sung hoặc giảm bớt phù hợp thực tế"],
  ["03", "Chốt layout với các bên liên quan", "Mr. Quang, Mr. Khánh, Mr. Chiến họp riêng"],
  ["04", "Chuẩn bị hồ sơ nghiệm thu Giai đoạn 2", "Trình qua Ms. Thúy gửi Mr. Kỳ xét duyệt"],
  ["05", "Thống nhất KPI cho từng giai đoạn", "Đánh giá tính khả thi, phân tích thị trường"],
  ["06", "Đánh giá tính khả thi thương mại", "Đảm bảo yếu tố thương mại và marketing"],
  ["07", "Hoàn thiện bộ máy vận hành đề án", "VCCA cử người quản lý trang quản trị"],
];
recommendations.forEach(([num, title, desc], i) => {
  const y = 1.1 + i * 0.55;
  s16.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.45, fill: { color: i % 2 === 0 ? LIGHT_GREEN : WHITE }, shadow: makeShadow() });
  s16.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.5, h: 0.45, fill: { color: GREEN } });
  s16.addText(num, { x: 0.5, y, w: 0.5, h: 0.45, fontSize: 13, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  s16.addText(title, { x: 1.15, y, w: 3.85, h: 0.45, fontSize: 11, bold: true, color: DARK, fontFace: "Arial", valign: "middle", margin: 0 });
  s16.addText(desc, { x: 5.1, y, w: 4.2, h: 0.45, fontSize: 10, color: GRAY, fontFace: "Arial", valign: "middle", margin: 0 });
});

// ============== SLIDE 17: KẾT THÚC ==============
let s17 = pres.addSlide();
s17.background = { color: DARK_GREEN };
s17.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: RED } });
s17.addText("CẢM ƠN", { x: 1, y: 1.2, w: 8, h: 1.2, fontSize: 48, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
s17.addShape(pres.shapes.LINE, { x: 3.5, y: 2.5, w: 3, h: 0, line: { color: WHITE, width: 2 } });
s17.addText("Tiên Phong CDS  |  VCCA", { x: 1, y: 2.7, w: 8, h: 0.6, fontSize: 18, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
s17.addText("Vietnam's Food Map", { x: 1, y: 3.2, w: 8, h: 0.5, fontSize: 16, italic: true, color: LIGHT_GREEN, fontFace: "Arial", align: "center", valign: "middle" });
s17.addShape(pres.shapes.LINE, { x: 3.5, y: 3.85, w: 3, h: 0, line: { color: WHITE, width: 1 } });
s17.addText("Liên hệ: Nguyễn Thành Quang - Tổng Giám đốc Tiên Phong CDS", { x: 1, y: 4.0, w: 8, h: 0.4, fontSize: 12, color: LIGHT_GREEN, fontFace: "Arial", align: "center", valign: "middle" });
s17.addText("Email: quang@tienphongcds.com  |  Điện thoại: 0985909720", { x: 1, y: 4.4, w: 8, h: 0.4, fontSize: 11, color: LIGHT_GREEN, fontFace: "Arial", align: "center", valign: "middle" });
s17.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: RED } });

const OUTPUT = "/Users/mac/Documents/Work/Projects/TIEN PHONG CDS/cto-ai-assistant/.claude/drafts/vnfm-bao-cao-tien-do-slides.pptx";
pres.writeFile({ fileName: OUTPUT }).then(() => {
  console.log("Created: " + OUTPUT);
});
