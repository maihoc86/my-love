const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Tiên Phong CDS";
pres.title = "Đề Xuất Giải Pháp Hub Integration - Novagroup";

// Novaland / Novagroup Brand Colors
const NAVY = "0D1B4C";
const DARK_NAVY = "070E28";
const GOLD = "C8A962";
const BLUE = "2563EB";
const LIGHT_BLUE = "EFF6FF";
const TEAL = "0891B2";
const WHITE = "FFFFFF";
const DARK = "1F2937";
const GRAY = "6B7280";
const LIGHT_GRAY = "F3F4F6";
const GREEN = "059669";
const LIGHT_GREEN = "ECFDF5";
const RED = "DC2626";
const LIGHT_RED = "FEF2F2";
const ORANGE = "EA580C";
const LIGHT_ORANGE = "FFF7ED";

const makeShadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 });

function addFooter(slide, num) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.15, w: 10, h: 0.475, fill: { color: NAVY } });
  slide.addText("Tiên Phong CDS  |  Novagroup  |  Hub Integration Platform", {
    x: 0.5, y: 5.15, w: 7, h: 0.475, fontSize: 9, color: GOLD, fontFace: "Arial", valign: "middle"
  });
  slide.addText(String(num), {
    x: 8.5, y: 5.15, w: 1, h: 0.475, fontSize: 9, color: WHITE, fontFace: "Arial", align: "right", valign: "middle"
  });
}

function addHeader(slide, title, subtitle) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: NAVY } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.0, w: 10, h: 0.04, fill: { color: GOLD } });
  slide.addText(title, { x: 0.5, y: 0, w: 9, h: subtitle ? 0.6 : 1.0, fontSize: 24, bold: true, color: WHITE, fontFace: "Arial", valign: subtitle ? "bottom" : "middle" });
  if (subtitle) {
    slide.addText(subtitle, { x: 0.5, y: 0.6, w: 9, h: 0.4, fontSize: 13, color: GOLD, fontFace: "Arial", valign: "top" });
  }
}

function addSectionSlide(slide, sectionNum, title, subtitle) {
  slide.background = { color: NAVY };
  // Decorative lines top-right
  slide.addShape(pres.shapes.LINE, { x: 7.5, y: 0.3, w: 2.2, h: 0, line: { color: GOLD, width: 2 }, rotate: -30 });
  slide.addShape(pres.shapes.LINE, { x: 8, y: 0.1, w: 2.2, h: 0, line: { color: GOLD, width: 1 }, rotate: -30 });
  // Decorative lines bottom-left
  slide.addShape(pres.shapes.LINE, { x: 0.3, y: 4.5, w: 2.2, h: 0, line: { color: GOLD, width: 2 }, rotate: -30 });
  slide.addShape(pres.shapes.LINE, { x: 0, y: 4.8, w: 2.2, h: 0, line: { color: GOLD, width: 1 }, rotate: -30 });
  // Section number
  if (sectionNum) {
    slide.addText(String(sectionNum), { x: 0.5, y: 1.5, w: 1.2, h: 1.2, fontSize: 48, bold: true, color: GOLD, fontFace: "Arial", align: "center", valign: "middle" });
  }
  // Title
  slide.addText(title, { x: sectionNum ? 1.8 : 0.5, y: 1.8, w: 8, h: 1.2, fontSize: 36, bold: true, color: WHITE, fontFace: "Arial", valign: "middle" });
  if (subtitle) {
    slide.addText(subtitle, { x: sectionNum ? 1.8 : 0.5, y: 3.0, w: 8, h: 0.6, fontSize: 16, color: GOLD, fontFace: "Arial", valign: "top" });
  }
  // Gold bottom accent
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.4, w: 10, h: 0.225, fill: { color: GOLD } });
}

function addCard(slide, x, y, w, h, title, content, accentColor) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: WHITE }, rectRadius: 0.08, shadow: makeShadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: accentColor || NAVY } });
  if (title) {
    slide.addText(title, { x: x + 0.2, y, w: w - 0.3, h: 0.4, fontSize: 12, bold: true, color: accentColor || NAVY, fontFace: "Arial", valign: "middle" });
  }
  if (content) {
    slide.addText(content, { x: x + 0.2, y: y + (title ? 0.35 : 0.1), w: w - 0.3, h: h - (title ? 0.45 : 0.2), fontSize: 10, color: DARK, fontFace: "Arial", valign: "top", lineSpacingMultiple: 1.3 });
  }
}

function addNumberCard(slide, x, y, num, title, desc, color) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.8, h: 1.5, fill: { color: WHITE }, rectRadius: 0.08, shadow: makeShadow() });
  slide.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.15, w: 0.5, h: 0.5, fill: { color: color || NAVY } });
  slide.addText(String(num), { x: x + 0.15, y: y + 0.15, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  slide.addText(title, { x: x + 0.75, y: y + 0.15, w: 1.9, h: 0.45, fontSize: 11, bold: true, color: NAVY, fontFace: "Arial", valign: "middle" });
  slide.addText(desc, { x: x + 0.15, y: y + 0.7, w: 2.5, h: 0.7, fontSize: 9, color: GRAY, fontFace: "Arial", valign: "top", lineSpacingMultiple: 1.3 });
}

// ============== SLIDE 1: TRANG BÌA ==============
let s1 = pres.addSlide();
s1.background = { color: NAVY };
// Decorative elements
s1.addShape(pres.shapes.LINE, { x: 6.5, y: 0.2, w: 3.5, h: 0, line: { color: GOLD, width: 3 }, rotate: -25 });
s1.addShape(pres.shapes.LINE, { x: 7, y: 0, w: 3.5, h: 0, line: { color: GOLD, width: 1.5 }, rotate: -25 });
s1.addShape(pres.shapes.LINE, { x: 0.2, y: 4.8, w: 3, h: 0, line: { color: GOLD, width: 3 }, rotate: -25 });
s1.addShape(pres.shapes.LINE, { x: 0, y: 5.1, w: 3, h: 0, line: { color: GOLD, width: 1.5 }, rotate: -25 });
// Logos area
s1.addText("TIÊN PHONG CDS", { x: 0.8, y: 0.5, w: 3.5, h: 0.4, fontSize: 14, bold: true, color: GOLD, fontFace: "Arial" });
s1.addText("NOVAGROUP", { x: 5.5, y: 0.5, w: 4, h: 0.4, fontSize: 14, bold: true, color: GOLD, fontFace: "Arial", align: "right" });
// Separator
s1.addShape(pres.shapes.LINE, { x: 0.8, y: 1.1, w: 8.4, h: 0, line: { color: GOLD, width: 1 } });
// Main title block
s1.addText("ĐỀ XUẤT GIẢI PHÁP", { x: 0.8, y: 1.6, w: 8.4, h: 0.8, fontSize: 20, color: GOLD, fontFace: "Arial", letterSpacing: 3 });
s1.addText("HUB INTEGRATION\nPLATFORM", { x: 0.8, y: 2.2, w: 8.4, h: 1.6, fontSize: 42, bold: true, color: WHITE, fontFace: "Arial", lineSpacingMultiple: 1.1 });
s1.addText("Nền tảng Tích hợp Hệ thống Tập trung cho Tập đoàn Novagroup", {
  x: 0.8, y: 3.8, w: 8.4, h: 0.5, fontSize: 15, color: GOLD, fontFace: "Arial"
});
// Bottom bar
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.1, w: 10, h: 0.04, fill: { color: GOLD } });
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.14, w: 10, h: 0.485, fill: { color: DARK_NAVY } });
s1.addText("Tháng 03/2026  |  Phiên bản 1.0  |  Tài liệu Mật", {
  x: 0.5, y: 5.14, w: 9, h: 0.485, fontSize: 10, color: GOLD, fontFace: "Arial", align: "center", valign: "middle"
});

// ============== SLIDE 2: TÓM TẮT ĐIỀU HÀNH ==============
let s2 = pres.addSlide();
s2.background = { color: WHITE };
addHeader(s2, "Tóm tắt Điều hành", "Executive Summary");
addFooter(s2, 2);

// 3 columns: Thách thức - Giải pháp - Lợi ích
const cols = [
  { num: "1", title: "Thách thức", color: RED, bg: LIGHT_RED, items: "8 nền tảng (ONENOVA, CRM, ERP, NMS, eSales...) quản lý dữ liệu rời rạc\n\nKết nối point-to-point giữa các platform phức tạp\n\nThiếu master data thống nhất & Customer 360\n\nNghiệp vụ chồng chéo giữa các nhóm chức năng" },
  { num: "2", title: "Giải pháp", color: BLUE, bg: LIGHT_BLUE, items: "Xây dựng Hub Integration Platform tập trung gồm:\n\n1. API Gateway quản lý giao tiếp\n2. Event Streaming (Kafka) xử lý real-time\n3. Workflow Engine (n8n) điều phối\n4. Bảo mật & SSO tập trung" },
  { num: "3", title: "Lợi ích", color: GREEN, bg: LIGHT_GREEN, items: "Giảm 70% chi phí tích hợp so với point-to-point\n\nThời gian tích hợp hệ thống mới: từ tháng → ngày\n\nCustomer 360 xuyên suốt toàn tập đoàn\n\nTiết kiệm $300K-1M USD/năm license vs enterprise" },
];
cols.forEach((col, i) => {
  const x = 0.35 + i * 3.15;
  slide = s2;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.3, w: 2.95, h: 3.7, fill: { color: col.bg }, rectRadius: 0.1, shadow: makeShadow() });
  slide.addShape(pres.shapes.OVAL, { x: x + 1.1, y: 1.4, w: 0.7, h: 0.7, fill: { color: col.color } });
  slide.addText(col.num, { x: x + 1.1, y: 1.4, w: 0.7, h: 0.7, fontSize: 24, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  slide.addText(col.title, { x, y: 2.2, w: 2.95, h: 0.4, fontSize: 16, bold: true, color: col.color, fontFace: "Arial", align: "center", valign: "middle" });
  slide.addText(col.items, { x: x + 0.15, y: 2.65, w: 2.65, h: 2.25, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "top", lineSpacingMultiple: 1.2 });
});

// ============== SLIDE 3: SECTION - BỐI CẢNH ==============
let s3 = pres.addSlide();
addSectionSlide(s3, null, "BỐI CẢNH &\nTHÁCH THỨC", "Hiện trạng hệ thống và nhu cầu tích hợp tại Novagroup");

// ============== SLIDE 4: BẢN ĐỒ HỆ THỐNG NVG ==============
let s4 = pres.addSlide();
s4.background = { color: WHITE };
addHeader(s4, "Bản đồ Hệ thống Novagroup", "System Landscape Overview");
addFooter(s4, 4);

const sysGroups = [
  { title: "CORE PLATFORMS", color: BLUE, systems: ["ONENOVA (Unified Portal)", "CRM (Customer Mgmt)", "ERP (Finance & Ops)", "NMS (Nova Mgmt System)"], x: 0.3, y: 1.3 },
  { title: "DIGITAL & SALES", color: TEAL, systems: ["eSales (E-commerce)", "GMS (Group Mgmt)", "Voucher & Loyalty", "Bán hàng tập trung"], x: 3.45, y: 1.3 },
  { title: "HR & COMMS", color: ORANGE, systems: ["SAP SuccessFactors (HR)", "ICS (Internal Comms)", "Training & Gamification", "Đào tạo trực tuyến"], x: 6.6, y: 1.3 },
  { title: "NGHIỆP VỤ CHÍNH", color: GREEN, systems: ["Lead Mgmt & SOP (AI)", "Tracking & Tương tác", "Hợp đồng & Công nợ", "CSKH & Case Mgmt", "BAM / Kênh / Sự kiện"], x: 1.8, y: 3.6 },
  { title: "AI & ANALYTICS", color: GRAY, systems: ["Lead Scoring (AI)", "FaceID Recognition", "Chatbot & Voice Chat", "Dự báo thông minh", "Dashboard Quản trị"], x: 5.1, y: 3.6 },
];
sysGroups.forEach(g => {
  const h = g.systems.length * 0.22 + 0.6;
  slide = s4;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: g.x, y: g.y, w: 2.95, h: Math.min(h, 2.1), fill: { color: WHITE }, rectRadius: 0.06, shadow: makeShadow(), line: { color: g.color, width: 1.5 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: g.x, y: g.y, w: 2.95, h: 0.35, fill: { color: g.color }, rectRadius: 0.06 });
  slide.addText(g.title, { x: g.x + 0.1, y: g.y, w: 2.75, h: 0.35, fontSize: 9, bold: true, color: WHITE, fontFace: "Arial", valign: "middle" });
  const sysText = g.systems.map(s => `• ${s}`).join("\n");
  slide.addText(sysText, { x: g.x + 0.1, y: g.y + 0.4, w: 2.75, h: Math.min(h, 2.1) - 0.5, fontSize: 8.5, color: DARK, fontFace: "Arial", valign: "top", lineSpacingMultiple: 1.25 });
});

// ============== SLIDE 5: THÁCH THỨC ==============
let s5 = pres.addSlide();
s5.background = { color: WHITE };
addHeader(s5, "Thách thức Tích hợp Hệ thống", "Challenges with Current System Integration");
addFooter(s5, 5);

const challenges = [
  { num: 1, title: "Dữ liệu phân tán", desc: "8 nền tảng (ONENOVA, CRM, ERP, NMS, eSales, GMS, SuccessFactors, ICS) quản lý dữ liệu riêng biệt, thiếu Customer 360.", color: RED },
  { num: 2, title: "Kết nối Point-to-Point", desc: "8 nền tảng + hàng chục modules nghiệp vụ cần hàng trăm kết nối riêng lẻ. Mỗi thay đổi ảnh hưởng dây chuyền.", color: ORANGE },
  { num: 3, title: "Đồng bộ dữ liệu phức tạp", desc: "Lead từ CRM, hợp đồng từ ONENOVA, tài chính từ ERP, nhân sự từ SuccessFactors - thiếu master data thống nhất.", color: RED },
  { num: 4, title: "Khó mở rộng", desc: "Thêm module/hệ thống mới phải tạo kết nối với tất cả platform hiện có. Chi phí và thời gian tăng tuyến tính.", color: ORANGE },
  { num: 5, title: "Thiếu giám sát tổng thể", desc: "Không có visibility về data flow giữa ONENOVA-CRM-ERP-GMS. Lỗi phát hiện chậm, debug phức tạp.", color: RED },
  { num: 6, title: "Nghiệp vụ chồng chéo", desc: "Voucher & Loyalty, quản lý KH xuất hiện ở nhiều nhóm chức năng. Cần Hub thống nhất luồng dữ liệu.", color: ORANGE },
];
challenges.forEach((c, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.3 + col * 4.8;
  const y = 1.3 + row * 1.2;
  addNumberCard(s5, x, y, c.num, c.title, c.desc, c.color);
});

// ============== SLIDE 6: SECTION - GIẢI PHÁP ==============
let s6 = pres.addSlide();
addSectionSlide(s6, null, "GIẢI PHÁP\nHUB INTEGRATION", "Nền tảng tích hợp tập trung, hiện đại, mở rộng linh hoạt");

// ============== SLIDE 7: TỔNG QUAN GIẢI PHÁP ==============
let s7 = pres.addSlide();
s7.background = { color: WHITE };
addHeader(s7, "Tổng quan Giải pháp Hub Integration", "Solution Overview");
addFooter(s7, 7);

// Left side - Description
s7.addText("Mục tiêu:", { x: 0.4, y: 1.25, w: 4.5, h: 0.35, fontSize: 13, bold: true, color: NAVY, fontFace: "Arial" });
const objectives = [
  "Xây dựng Integration Hub tập trung, kết nối toàn bộ hệ thống Novagroup.",
  "Chuẩn hóa giao tiếp qua API Gateway và Event Streaming.",
  "Tích hợp SSO & bảo mật tập trung cho toàn tập đoàn.",
  "Cung cấp monitoring & observability toàn diện.",
  "Đảm bảo khả năng mở rộng và hiệu suất cao.",
];
objectives.forEach((obj, i) => {
  s7.addText(`•  ${obj}`, { x: 0.5, y: 1.6 + i * 0.38, w: 4.5, h: 0.38, fontSize: 10.5, color: DARK, fontFace: "Arial", valign: "middle", lineSpacingMultiple: 1.2 });
});

s7.addText("Kiến trúc hệ thống:", { x: 0.4, y: 3.55, w: 4.5, h: 0.35, fontSize: 13, bold: true, color: NAVY, fontFace: "Arial" });
const archItems = [
  "API Gateway: Kong/APISIX - quản lý & bảo mật API",
  "Event Streaming: Apache Kafka - async messaging",
  "Workflow Engine: n8n - orchestration & automation",
  "IAM: Keycloak - SSO, OAuth2, SAML",
  "Observability: Prometheus + Grafana + ELK",
  "Infrastructure: Kubernetes (container orchestration)",
];
archItems.forEach((item, i) => {
  s7.addText(`•  ${item}`, { x: 0.5, y: 3.9 + i * 0.32, w: 4.5, h: 0.32, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle" });
});

// Right side - Architecture diagram (simplified visual)
s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: 1.25, w: 4.5, h: 3.7, fill: { color: LIGHT_BLUE }, rectRadius: 0.1, shadow: makeShadow() });
s7.addText("KIẾN TRÚC HUB INTEGRATION", { x: 5.3, y: 1.3, w: 4.3, h: 0.35, fontSize: 10, bold: true, color: NAVY, fontFace: "Arial", align: "center" });

// Architecture layers visual
const layers = [
  { name: "API Gateway Layer", sub: "Kong / APISIX", color: BLUE, y: 1.75 },
  { name: "Integration Layer", sub: "Kafka + n8n + Camel", color: TEAL, y: 2.45 },
  { name: "Security Layer", sub: "Keycloak + Vault", color: GREEN, y: 3.15 },
  { name: "Infrastructure Layer", sub: "Kubernetes + Monitoring", color: NAVY, y: 3.85 },
];
layers.forEach(l => {
  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: l.y, w: 4, h: 0.55, fill: { color: l.color }, rectRadius: 0.06 });
  s7.addText(l.name, { x: 5.6, y: l.y, w: 2.5, h: 0.55, fontSize: 10, bold: true, color: WHITE, fontFace: "Arial", valign: "middle" });
  s7.addText(l.sub, { x: 7.8, y: l.y, w: 1.6, h: 0.55, fontSize: 8, color: GOLD, fontFace: "Arial", align: "right", valign: "middle" });
});

// ============== SLIDE 8: KIẾN TRÚC CHI TIẾT ==============
let s8 = pres.addSlide();
s8.background = { color: WHITE };
addHeader(s8, "Kiến trúc Hệ thống Chi tiết", "High-Level Architecture");
addFooter(s8, 8);

// Source systems (left)
s8.addText("NGUỒN DỮ LIỆU", { x: 0.2, y: 1.25, w: 1.8, h: 0.3, fontSize: 9, bold: true, color: NAVY, fontFace: "Arial", align: "center" });
const sources = ["ONENOVA", "CRM", "ERP", "NMS", "eSales", "SuccessFactors", "GMS / ICS"];
sources.forEach((src, i) => {
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.15, y: 1.6 + i * 0.48, w: 1.9, h: 0.38, fill: { color: LIGHT_BLUE }, rectRadius: 0.04 });
  s8.addText(src, { x: 0.15, y: 1.6 + i * 0.48, w: 1.9, h: 0.38, fontSize: 8.5, color: NAVY, fontFace: "Arial", align: "center", valign: "middle" });
});

// Hub Integration (center)
s8.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.5, y: 1.25, w: 5, h: 3.7, fill: { color: NAVY }, rectRadius: 0.1 });
s8.addText("NVG HUB INTEGRATION PLATFORM", { x: 2.6, y: 1.3, w: 4.8, h: 0.35, fontSize: 11, bold: true, color: GOLD, fontFace: "Arial", align: "center" });

// Inside hub layers
const hubLayers = [
  { name: "API Gateway (Kong)", desc: "Auth | Rate Limit | Routing | Transform", y: 1.75, color: BLUE },
  { name: "Event Streaming (Kafka)", desc: "Pub/Sub | CDC | Stream Processing", y: 2.35, color: TEAL },
  { name: "Workflow Engine (n8n)", desc: "Orchestration | Business Logic | Retry", y: 2.95, color: GREEN },
  { name: "Security (Keycloak + Vault)", desc: "SSO | OAuth2 | Secret Management", y: 3.55, color: ORANGE },
  { name: "Monitoring (Prometheus + ELK)", desc: "Metrics | Logs | Tracing | Alerts", y: 4.15, color: GRAY },
];
hubLayers.forEach(l => {
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.7, y: l.y, w: 4.6, h: 0.48, fill: { color: l.color }, rectRadius: 0.04 });
  s8.addText(l.name, { x: 2.8, y: l.y, w: 2.2, h: 0.48, fontSize: 9, bold: true, color: WHITE, fontFace: "Arial", valign: "middle" });
  s8.addText(l.desc, { x: 5, y: l.y, w: 2.2, h: 0.48, fontSize: 7.5, color: GOLD, fontFace: "Arial", align: "right", valign: "middle" });
});

// Destinations (right)
s8.addText("ĐÍCH", { x: 8, y: 1.25, w: 1.8, h: 0.3, fontSize: 9, bold: true, color: NAVY, fontFace: "Arial", align: "center" });
const dests = ["Data Warehouse", "BI Dashboard", "Mobile App", "Partner API", "Notification", "Analytics", "Audit Log"];
dests.forEach((dst, i) => {
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.95, y: 1.6 + i * 0.48, w: 1.9, h: 0.38, fill: { color: LIGHT_GREEN }, rectRadius: 0.04 });
  s8.addText(dst, { x: 7.95, y: 1.6 + i * 0.48, w: 1.9, h: 0.38, fontSize: 8.5, color: NAVY, fontFace: "Arial", align: "center", valign: "middle" });
});

// Arrows
s8.addText("→", { x: 2.1, y: 2.6, w: 0.4, h: 0.4, fontSize: 20, color: GOLD, fontFace: "Arial", align: "center", valign: "middle" });
s8.addText("→", { x: 7.5, y: 2.6, w: 0.4, h: 0.4, fontSize: 20, color: GOLD, fontFace: "Arial", align: "center", valign: "middle" });

// ============== SLIDE 9: THÀNH PHẦN CHI TIẾT ==============
let s9 = pres.addSlide();
s9.background = { color: WHITE };
addHeader(s9, "Thành phần & Công cụ Chi tiết", "Components & Technology Stack");
addFooter(s9, 9);

const components = [
  { title: "1. API Gateway", desc: "Kong Gateway / Apache APISIX\n• Routing, authentication, rate limiting\n• OAuth2/JWT via Keycloak\n• Request/Response transformation\n• Load balancing, circuit breaker\n• 100+ plugins mở rộng", color: BLUE, bg: LIGHT_BLUE },
  { title: "2. Event Streaming", desc: "Apache Kafka\n• Pub/Sub messaging real-time\n• Kafka Connect: 200+ connectors\n• Debezium CDC: capture thay đổi DB\n• ksqlDB: stream processing\n• Throughput: triệu msg/giây", color: TEAL, bg: "E0F7FA" },
  { title: "3. Workflow Engine", desc: "n8n (Self-hosted)\n• Visual workflow builder\n• 400+ integrations có sẵn\n• Custom node (TypeScript)\n• Error handling, retry logic\n• Scheduling & webhooks", color: GREEN, bg: LIGHT_GREEN },
  { title: "4. Data Integration", desc: "Apache Camel\n• 300+ components\n• Enterprise Integration Patterns\n• XML ↔ JSON ↔ CSV transform\n• Legacy system adapter\n• High-performance pipeline", color: ORANGE, bg: LIGHT_ORANGE },
  { title: "5. Security & IAM", desc: "Keycloak + HashiCorp Vault\n• Single Sign-On (SSO) toàn tập đoàn\n• OAuth 2.0, OIDC, SAML 2.0\n• LDAP/Active Directory integration\n• Secret management & rotation\n• mTLS service-to-service", color: RED, bg: LIGHT_RED },
  { title: "6. Observability", desc: "Prometheus + Grafana + ELK\n• Metrics thu thập tự động\n• Custom dashboards per domain\n• Centralized logging (ELK Stack)\n• Distributed tracing (Jaeger)\n• Alerting & on-call rotation", color: NAVY, bg: LIGHT_BLUE },
];
components.forEach((c, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.25 + col * 3.2;
  const y = 1.25 + row * 2.0;
  s9.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.0, h: 1.85, fill: { color: c.bg }, rectRadius: 0.06, shadow: makeShadow() });
  s9.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 0.35, fill: { color: c.color }, rectRadius: 0.06 });
  s9.addText(c.title, { x: x + 0.1, y, w: 2.8, h: 0.35, fontSize: 10, bold: true, color: WHITE, fontFace: "Arial", valign: "middle" });
  s9.addText(c.desc, { x: x + 0.1, y: y + 0.4, w: 2.8, h: 1.35, fontSize: 8.5, color: DARK, fontFace: "Arial", valign: "top", lineSpacingMultiple: 1.25 });
});

// ============== SLIDE 10: INTEGRATION PATTERNS ==============
let s10 = pres.addSlide();
s10.background = { color: WHITE };
addHeader(s10, "Integration Patterns cho Novagroup", "Key Integration Use Cases");
addFooter(s10, 10);

const patterns = [
  { title: "Customer 360", desc: "Hợp nhất dữ liệu khách hàng từ CRM, PMS, POS, Sales, Loyalty thành một profile duy nhất xuyên suốt toàn tập đoàn.", icon: "👤", color: BLUE },
  { title: "Revenue Consolidation", desc: "Tổng hợp doanh thu real-time từ BĐS, Hospitality, Retail, F&B vào Data Warehouse phục vụ BI dashboard.", icon: "📊", color: GREEN },
  { title: "Cross-Selling", desc: "Khách mua nhà Novaland → tự động offer ưu đãi khách sạn, F&B. Event-driven via Kafka.", icon: "🔗", color: TEAL },
  { title: "Booking-to-Revenue", desc: "Channel Manager → PMS → Update inventory → Accounting → Housekeeping → Guest notification.", icon: "🏨", color: ORANGE },
  { title: "Master Data Sync", desc: "Đồng bộ Customer, Product, Employee, Organization master data giữa tất cả hệ thống.", icon: "🔄", color: NAVY },
  { title: "Compliance & Audit", desc: "Audit trail cho mọi giao dịch. Tuân thủ Luật An ninh mạng VN, e-invoice, báo cáo thuế tự động.", icon: "🔒", color: RED },
];
patterns.forEach((p, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.25 + col * 3.2;
  const y = 1.25 + row * 2.0;
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.0, h: 1.85, fill: { color: WHITE }, rectRadius: 0.06, shadow: makeShadow() });
  s10.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 0.04, fill: { color: p.color } });
  s10.addText(p.title, { x: x + 0.1, y: y + 0.1, w: 2.8, h: 0.4, fontSize: 12, bold: true, color: p.color, fontFace: "Arial", valign: "middle" });
  s10.addText(p.desc, { x: x + 0.1, y: y + 0.55, w: 2.8, h: 1.2, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "top", lineSpacingMultiple: 1.3 });
});

// ============== SLIDE 11: SECTION - TRIỂN KHAI ==============
let s11 = pres.addSlide();
addSectionSlide(s11, null, "QUY TRÌNH\nTRIỂN KHAI", "Roadmap 4 giai đoạn, tổng thời gian 12 tháng");

// ============== SLIDE 12: ROADMAP ==============
let s12 = pres.addSlide();
s12.background = { color: WHITE };
addHeader(s12, "Lộ trình Triển khai 4 Giai đoạn", "Implementation Roadmap - 12 Months");
addFooter(s12, 12);

const phases = [
  { num: "Phase 1", name: "Foundation", time: "Tháng 1-3", color: BLUE, items: ["Setup Kubernetes cluster", "Deploy Kong API Gateway", "Deploy Keycloak (SSO)", "Setup monitoring stack", "CI/CD pipeline", "Tích hợp 2-3 hệ thống critical"] },
  { num: "Phase 2", name: "Core Integration", time: "Tháng 4-6", color: TEAL, items: ["Deploy Kafka cluster", "Deploy n8n workflow engine", "Customer sync CRM ↔ ERP", "Financial flow POS → ERP", "Booking flow PMS → CRM → Finance", "Service registry (Consul)"] },
  { num: "Phase 3", name: "Expansion", time: "Tháng 7-9", color: GREEN, items: ["Tích hợp PMS, POS, HRM, DMS", "Event-driven patterns (Kafka)", "Master Data Management", "Cross-BU integration", "Advanced monitoring & alerting"] },
  { num: "Phase 4", name: "Optimization", time: "Tháng 10-12", color: GOLD, items: ["Data Warehouse integration", "BI/Analytics pipeline", "External partner integration", "Performance optimization", "Disaster Recovery (cloud)"] },
];
phases.forEach((p, i) => {
  const x = 0.2 + i * 2.45;
  // Phase card
  s12.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.25, w: 2.3, h: 3.7, fill: { color: WHITE }, rectRadius: 0.06, shadow: makeShadow() });
  // Header
  s12.addShape(pres.shapes.RECTANGLE, { x, y: 1.25, w: 2.3, h: 0.65, fill: { color: p.color }, rectRadius: 0.06 });
  s12.addText(p.num, { x, y: 1.25, w: 2.3, h: 0.35, fontSize: 10, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  s12.addText(p.name, { x, y: 1.55, w: 2.3, h: 0.35, fontSize: 13, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  // Timeline
  s12.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.3, y: 2.0, w: 1.7, h: 0.3, fill: { color: LIGHT_GRAY }, rectRadius: 0.04 });
  s12.addText(p.time, { x: x + 0.3, y: 2.0, w: 1.7, h: 0.3, fontSize: 9, bold: true, color: p.color, fontFace: "Arial", align: "center", valign: "middle" });
  // Items
  const itemText = p.items.map(item => `• ${item}`).join("\n");
  s12.addText(itemText, { x: x + 0.1, y: 2.45, w: 2.1, h: 2.4, fontSize: 8.5, color: DARK, fontFace: "Arial", valign: "top", lineSpacingMultiple: 1.35 });
  // Arrow
  if (i < 3) {
    s12.addText("→", { x: x + 2.3, y: 1.5, w: 0.15, h: 0.4, fontSize: 14, color: GOLD, fontFace: "Arial", align: "center", valign: "middle" });
  }
});

// ============== SLIDE 13: MÔ HÌNH TRIỂN KHAI ==============
let s13 = pres.addSlide();
s13.background = { color: WHITE };
addHeader(s13, "Mô hình Triển khai Hybrid", "Deployment Model - On-Premise + Cloud");
addFooter(s13, 13);

// On-premise box
s13.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.3, y: 1.3, w: 4.3, h: 3.5, fill: { color: LIGHT_BLUE }, rectRadius: 0.1, line: { color: NAVY, width: 2 } });
s13.addText("NVG PRIVATE CLOUD / ON-PREMISE", { x: 0.4, y: 1.35, w: 4.1, h: 0.35, fontSize: 10, bold: true, color: NAVY, fontFace: "Arial", align: "center" });
const onPremItems = [
  "Core Integration Hub",
  "API Gateway (Kong)",
  "Kafka Cluster (3+ brokers)",
  "n8n Workflows",
  "Keycloak (IAM)",
  "Core Databases (PostgreSQL HA)",
  "ELK Stack & Monitoring",
  "Dữ liệu nhạy cảm",
];
onPremItems.forEach((item, i) => {
  s13.addText(`✓  ${item}`, { x: 0.5, y: 1.75 + i * 0.35, w: 3.9, h: 0.35, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle" });
});

// Cloud box
s13.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 1.3, w: 4.3, h: 3.5, fill: { color: LIGHT_ORANGE }, rectRadius: 0.1, line: { color: ORANGE, width: 2 } });
s13.addText("PUBLIC CLOUD (AWS / AZURE)", { x: 5.5, y: 1.35, w: 4.1, h: 0.35, fontSize: 10, bold: true, color: ORANGE, fontFace: "Arial", align: "center" });
const cloudItems = [
  "CDN, WAF, DDoS Protection",
  "External API Gateway",
  "DR / Backup Site",
  "Dev/Staging Environment",
  "AI/ML Services",
  "Object Storage (archival)",
  "SaaS Connectors",
  "Burst Capacity",
];
cloudItems.forEach((item, i) => {
  s13.addText(`✓  ${item}`, { x: 5.6, y: 1.75 + i * 0.35, w: 3.9, h: 0.35, fontSize: 9.5, color: DARK, fontFace: "Arial", valign: "middle" });
});

// VPN connection arrow
s13.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.15, y: 2.7, w: 1.7, h: 0.45, fill: { color: NAVY }, rectRadius: 0.1 });
s13.addText("VPN / Direct Connect", { x: 4.15, y: 2.7, w: 1.7, h: 0.45, fontSize: 8, bold: true, color: GOLD, fontFace: "Arial", align: "center", valign: "middle" });

// ============== SLIDE 14: SECTION - GIÁ TRỊ ==============
let s14 = pres.addSlide();
addSectionSlide(s14, null, "GIÁ TRỊ\nMANG LẠI", "Lợi ích kinh doanh và kỹ thuật cho Novagroup");

// ============== SLIDE 15: GIÁ TRỊ MANG LẠI ==============
let s15 = pres.addSlide();
s15.background = { color: WHITE };
addHeader(s15, "Giá trị Mang Lại", "Business & Technical Benefits");
addFooter(s15, 15);

const benefits = [
  { num: 1, title: "Giảm 70% chi phí tích hợp", desc: "Hub architecture thay thế point-to-point. Thêm hệ thống mới chỉ cần 1 kết nối thay vì N kết nối.", color: GREEN },
  { num: 2, title: "Tích hợp nhanh gấp 10 lần", desc: "Thời gian tích hợp hệ thống mới từ 2-3 tháng xuống 1-2 tuần nhờ pre-built connectors và workflow engine.", color: BLUE },
  { num: 3, title: "Customer 360 toàn diện", desc: "Một customer profile duy nhất xuyên suốt BĐS, Hotel, Retail. Hỗ trợ cross-selling, personalization.", color: TEAL },
  { num: 4, title: "Tiết kiệm $300K-1M/năm", desc: "Open source stack thay vì enterprise license (MuleSoft, TIBCO). Chi phí chỉ bằng 20-30% giải pháp tương đương.", color: GOLD },
  { num: 5, title: "Bảo mật & tuân thủ", desc: "SSO tập trung, audit trail mọi giao dịch. Tuân thủ Luật An ninh mạng VN, data residency on-premise.", color: RED },
  { num: 6, title: "Mở rộng không giới hạn", desc: "Kiến trúc cloud-native, horizontal scaling. Đáp ứng tăng trưởng dữ liệu và hệ thống trong tương lai.", color: NAVY },
];
benefits.forEach((b, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.25 + col * 3.2;
  const y = 1.25 + row * 2.0;
  addNumberCard(s15, x, y, b.num, b.title, b.desc, b.color);
});

// ============== SLIDE 16: SO SÁNH ==============
let s16 = pres.addSlide();
s16.background = { color: WHITE };
addHeader(s16, "So sánh với Giải pháp Enterprise", "Cost & Capability Comparison");
addFooter(s16, 16);

// Table header
const tableX = 0.3;
const tableW = 9.4;
const colWidths = [2.2, 3.5, 3.7];
const headers = ["Tiêu chí", "Enterprise Platform\n(MuleSoft/TIBCO/IBM)", "CDS Hub Integration\n(Open Source + Custom)"];
let tableY = 1.25;

// Header row
let hx = tableX;
headers.forEach((h, i) => {
  s16.addShape(pres.shapes.RECTANGLE, { x: hx, y: tableY, w: colWidths[i], h: 0.55, fill: { color: NAVY } });
  s16.addText(h, { x: hx, y: tableY, w: colWidths[i], h: 0.55, fontSize: 9.5, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  hx += colWidths[i];
});

const tableRows = [
  ["License cost/năm", "$300K - $1M USD", "~$0 (Open Source)"],
  ["Customization", "Giới hạn theo vendor", "Toàn quyền kiểm soát"],
  ["Vendor lock-in", "Cao", "Thấp (open standards)"],
  ["Hỗ trợ tại VN", "Qua partner (Deloitte, PwC)", "Trực tiếp từ CDS team"],
  ["Time to value", "6-12 tháng", "3-6 tháng (Phase 1-2)"],
  ["Phù hợp context VN", "Trung bình", "Cao (hiểu thị trường)"],
  ["Tổng chi phí 3 năm", "$1 - $3M USD", "$200K - $500K USD"],
];
tableRows.forEach((row, ri) => {
  hx = tableX;
  const rowY = tableY + 0.55 + ri * 0.45;
  const bgColor = ri % 2 === 0 ? LIGHT_GRAY : WHITE;
  row.forEach((cell, ci) => {
    s16.addShape(pres.shapes.RECTANGLE, { x: hx, y: rowY, w: colWidths[ci], h: 0.45, fill: { color: ci === 2 ? (ri % 2 === 0 ? LIGHT_GREEN : WHITE) : bgColor }, line: { color: "E5E7EB", width: 0.5 } });
    s16.addText(cell, { x: hx + 0.1, y: rowY, w: colWidths[ci] - 0.2, h: 0.45, fontSize: 9, bold: ci === 0, color: ci === 2 ? GREEN : DARK, fontFace: "Arial", align: ci === 0 ? "left" : "center", valign: "middle" });
    hx += colWidths[ci];
  });
});

// ============== SLIDE 17: ĐỘI NGŨ ==============
let s17 = pres.addSlide();
s17.background = { color: WHITE };
addHeader(s17, "Đội ngũ Triển khai", "Project Team & Resources");
addFooter(s17, 17);

const roles = [
  { role: "Solution Architect", count: "1", desc: "Thiết kế kiến trúc tổng thể, technical decisions", color: NAVY },
  { role: "Integration Developer", count: "2-3", desc: "Phát triển integration services (Java/Camel/API)", color: BLUE },
  { role: "DevOps/SRE Engineer", count: "1-2", desc: "K8s, CI/CD, monitoring, infrastructure", color: TEAL },
  { role: "n8n Workflow Developer", count: "1-2", desc: "Business workflows, n8n customization", color: GREEN },
  { role: "API Developer", count: "1-2", desc: "API design, Kong configuration, testing", color: ORANGE },
  { role: "QA Engineer", count: "1", desc: "Integration testing, performance testing", color: RED },
  { role: "Project Manager", count: "1", desc: "Coordination, stakeholder management", color: GOLD },
];
roles.forEach((r, i) => {
  const y = 1.25 + i * 0.5;
  s17.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.3, y, w: 9.4, h: 0.42, fill: { color: i % 2 === 0 ? LIGHT_GRAY : WHITE }, rectRadius: 0.04, shadow: makeShadow() });
  s17.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.06, h: 0.42, fill: { color: r.color } });
  s17.addText(r.role, { x: 0.5, y, w: 2.5, h: 0.42, fontSize: 10, bold: true, color: NAVY, fontFace: "Arial", valign: "middle" });
  s17.addShape(pres.shapes.OVAL, { x: 3.2, y: y + 0.06, w: 0.5, h: 0.3, fill: { color: r.color } });
  s17.addText(r.count, { x: 3.2, y: y + 0.06, w: 0.5, h: 0.3, fontSize: 10, bold: true, color: WHITE, fontFace: "Arial", align: "center", valign: "middle" });
  s17.addText(r.desc, { x: 3.9, y, w: 5.6, h: 0.42, fontSize: 9.5, color: GRAY, fontFace: "Arial", valign: "middle" });
});

// Total
s17.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.3, y: 4.8, w: 9.4, h: 0.35, fill: { color: NAVY }, rectRadius: 0.04 });
s17.addText("TỔNG ĐỘI NGŨ: 8-12 NGƯỜI", { x: 0.5, y: 4.8, w: 4, h: 0.35, fontSize: 11, bold: true, color: GOLD, fontFace: "Arial", valign: "middle" });
s17.addText("Tiên Phong CDS cung cấp toàn bộ nhân lực triển khai", { x: 5, y: 4.8, w: 4.5, h: 0.35, fontSize: 9, color: WHITE, fontFace: "Arial", align: "right", valign: "middle" });

// ============== SLIDE 18: BƯỚC TIẾP THEO ==============
let s18 = pres.addSlide();
s18.background = { color: WHITE };
addHeader(s18, "Bước Tiếp theo", "Next Steps & Call to Action");
addFooter(s18, 18);

const nextSteps = [
  { num: "01", title: "Họp Kỹ Thuật Chi Tiết", desc: "Book lịch họp với Team kỹ thuật NVG để trao đổi về hiện trạng hệ thống, yêu cầu cụ thể, và ưu tiên tích hợp.", timeline: "Tuần 1" },
  { num: "02", title: "Khảo Sát Hệ Thống (Discovery)", desc: "CDS team thực hiện system audit: inventory tất cả hệ thống, API sẵn có, data formats, integration points hiện tại.", timeline: "Tuần 2-3" },
  { num: "03", title: "Thiết Kế Kiến Trúc Chi Tiết", desc: "Dựa trên kết quả discovery, thiết kế kiến trúc chi tiết, chọn tech stack cuối cùng, ước tính effort & chi phí.", timeline: "Tuần 4-5" },
  { num: "04", title: "POC (Proof of Concept)", desc: "Triển khai POC với 2-3 hệ thống quan trọng nhất. Demo kết quả thực tế cho leadership NVG.", timeline: "Tuần 6-8" },
  { num: "05", title: "Ký Kết SOW & Triển Khai", desc: "Hoàn thiện Statement of Work, timeline, milestones, SLA. Bắt đầu Phase 1 triển khai chính thức.", timeline: "Tuần 9+" },
];
nextSteps.forEach((s, i) => {
  const y = 1.25 + i * 0.78;
  s18.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.3, y, w: 9.4, h: 0.68, fill: { color: WHITE }, rectRadius: 0.06, shadow: makeShadow() });
  // Number
  s18.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.45, y: y + 0.12, w: 0.65, h: 0.44, fill: { color: NAVY }, rectRadius: 0.06 });
  s18.addText(s.num, { x: 0.45, y: y + 0.12, w: 0.65, h: 0.44, fontSize: 16, bold: true, color: GOLD, fontFace: "Arial", align: "center", valign: "middle" });
  // Title & desc
  s18.addText(s.title, { x: 1.3, y: y + 0.05, w: 5.5, h: 0.3, fontSize: 11, bold: true, color: NAVY, fontFace: "Arial", valign: "middle" });
  s18.addText(s.desc, { x: 1.3, y: y + 0.35, w: 5.5, h: 0.28, fontSize: 8.5, color: GRAY, fontFace: "Arial", valign: "top" });
  // Timeline badge
  s18.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.2, y: y + 0.15, w: 1.3, h: 0.38, fill: { color: LIGHT_BLUE }, rectRadius: 0.04 });
  s18.addText(s.timeline, { x: 8.2, y: y + 0.15, w: 1.3, h: 0.38, fontSize: 9, bold: true, color: BLUE, fontFace: "Arial", align: "center", valign: "middle" });
});

// ============== SLIDE 19: KẾT LUẬN ==============
let s19 = pres.addSlide();
s19.background = { color: NAVY };
// Decorative
s19.addShape(pres.shapes.LINE, { x: 7, y: 0.2, w: 3.2, h: 0, line: { color: GOLD, width: 2 }, rotate: -25 });
s19.addShape(pres.shapes.LINE, { x: 7.5, y: 0, w: 3.2, h: 0, line: { color: GOLD, width: 1 }, rotate: -25 });
s19.addShape(pres.shapes.LINE, { x: 0.2, y: 4.6, w: 3, h: 0, line: { color: GOLD, width: 2 }, rotate: -25 });

s19.addText("Kết Luận", { x: 0.8, y: 0.8, w: 8.4, h: 0.8, fontSize: 36, bold: true, color: WHITE, fontFace: "Arial" });
s19.addShape(pres.shapes.LINE, { x: 0.8, y: 1.6, w: 2, h: 0, line: { color: GOLD, width: 3 } });

s19.addText(
  "Tiên Phong CDS cam kết mang đến giải pháp Hub Integration hiện đại, " +
  "giúp Novagroup kết nối toàn bộ hệ sinh thái số, tối ưu hóa vận hành, " +
  "và tạo nền tảng vững chắc cho chiến lược chuyển đổi số dài hạn.",
  { x: 0.8, y: 1.8, w: 5.5, h: 1.2, fontSize: 14, color: WHITE, fontFace: "Arial", lineSpacingMultiple: 1.5 }
);

s19.addText("Thông tin liên hệ", { x: 0.8, y: 3.3, w: 5, h: 0.4, fontSize: 14, bold: true, color: GOLD, fontFace: "Arial" });
s19.addText(
  "+84 975 286 868\n" +
  "info@tienphongcds.com\n" +
  "164 Nguyễn Văn Thương, Bình Thạnh, TP.HCM",
  { x: 0.8, y: 3.7, w: 5, h: 1.0, fontSize: 12, color: WHITE, fontFace: "Arial", lineSpacingMultiple: 1.5 }
);

// Gold bottom accent
s19.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.4, w: 10, h: 0.225, fill: { color: GOLD } });

// ============== SAVE ==============
const outputPath = "/Users/mac/Documents/Work/Projects/TIEN PHONG CDS/cto-ai-assistant/.claude/drafts/NVG-Hub-Integration-Proposal.pptx";
pres.writeFile({ fileName: outputPath })
  .then(() => console.log("PPTX saved:", outputPath))
  .catch(err => console.error("Error:", err));
