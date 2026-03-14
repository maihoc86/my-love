const docx = require("docx");
const fs = require("fs");

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageBreak, TabStopPosition, TabStopType, TableOfContents,
  Header, Footer, PageNumber, NumberFormat
} = docx;

// Brand colors
const NAVY = "0D1B4C";
const GOLD = "C8A962";
const BLUE = "2563EB";
const TEAL = "0891B2";
const GREEN = "059669";
const RED = "DC2626";
const ORANGE = "EA580C";
const DARK = "1F2937";
const GRAY = "6B7280";
const LIGHT_GRAY = "F3F4F6";

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 32, color: NAVY, font: "Arial" })],
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 26, color: NAVY, font: "Arial" })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: GOLD } },
  });
}

function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 22, color: BLUE, font: "Arial" })],
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after || 120, line: 360 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, size: 22, color: DARK, font: "Arial", ...opts })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { after: 80, line: 340 },
    children: [new TextRun({ text, size: 22, color: DARK, font: "Arial" })],
  });
}

function boldBullet(boldText, normalText) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80, line: 340 },
    children: [
      new TextRun({ text: boldText, bold: true, size: 22, color: NAVY, font: "Arial" }),
      new TextRun({ text: normalText, size: 22, color: DARK, font: "Arial" }),
    ],
  });
}

function makeTableCell(text, opts = {}) {
  return new TableCell({
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    shading: opts.bg ? { type: ShadingType.SOLID, color: opts.bg } : undefined,
    verticalAlign: "center",
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text, bold: !!opts.bold, size: opts.size || 20, color: opts.color || DARK, font: "Arial" })],
    })],
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
  });
}

function makeTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(h => makeTableCell(h, { bold: true, color: "FFFFFF", bg: NAVY, align: AlignmentType.CENTER })),
      }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map((cell, ci) => makeTableCell(cell, { bg: ri % 2 === 0 ? LIGHT_GRAY : "FFFFFF" })),
      })),
    ],
  });
}

function spacer() {
  return new Paragraph({ spacing: { after: 100 } });
}

// ============== BUILD DOCUMENT ==============
const doc = new Document({
  creator: "Tiên Phong CDS",
  title: "Đề Xuất Giải Pháp Hub Integration - Novagroup",
  description: "Solution Proposal for NVG Hub Integration Platform",
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: DARK } },
      heading1: { run: { font: "Arial", size: 32, color: NAVY, bold: true } },
      heading2: { run: { font: "Arial", size: 26, color: NAVY, bold: true } },
      heading3: { run: { font: "Arial", size: 22, color: BLUE, bold: true } },
    },
  },
  sections: [
    // ===== COVER PAGE =====
    {
      properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
      children: [
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "TIÊN PHONG CDS  ×  NOVAGROUP", size: 24, color: GOLD, font: "Arial", bold: true })],
        }),
        new Paragraph({ spacing: { before: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD } } }),
        new Paragraph({ spacing: { before: 600 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ĐỀ XUẤT GIẢI PHÁP", size: 28, color: GOLD, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "HUB INTEGRATION PLATFORM", size: 52, bold: true, color: NAVY, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 300 },
          children: [new TextRun({ text: "Nền tảng Tích hợp Hệ thống Tập trung", size: 28, color: GRAY, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "cho Tập đoàn Novagroup", size: 28, color: GRAY, font: "Arial" })],
        }),
        new Paragraph({ spacing: { before: 800 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: GOLD } } }),
        new Paragraph({ spacing: { before: 300 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Phiên bản 1.0  |  Tháng 03/2026", size: 22, color: GRAY, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "TÀI LIỆU MẬT - KHÔNG PHÂN PHỐI", size: 20, color: RED, font: "Arial", bold: true })],
        }),
        new Paragraph({ spacing: { before: 600 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Công ty Cổ phần Tiên Phong CDS", size: 22, bold: true, color: NAVY, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50 },
          children: [new TextRun({ text: "164 Nguyễn Văn Thương, Bình Thạnh, TP.HCM", size: 20, color: GRAY, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50 },
          children: [new TextRun({ text: "info@tienphongcds.com  |  +84 975 286 868", size: 20, color: GRAY, font: "Arial" })],
        }),
      ],
    },
    // ===== TABLE OF CONTENTS =====
    {
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Tiên Phong CDS | Hub Integration Platform | Novagroup", size: 16, color: GRAY, font: "Arial", italics: true })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Trang ", size: 18, color: GRAY, font: "Arial" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }),
              new TextRun({ text: " / ", size: 18, color: GRAY, font: "Arial" }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" }),
            ],
          })],
        }),
      },
      children: [
        heading1("MỤC LỤC"),
        new TableOfContents("Mục lục", {
          hyperlink: true,
          headingStyleRange: "1-3",
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 1. TÓM TẮT ĐIỀU HÀNH =====
        heading1("1. TÓM TẮT ĐIỀU HÀNH"),
        para("Novagroup (NVG) là tập đoàn đa ngành hàng đầu Việt Nam với các lĩnh vực hoạt động chính gồm Bất động sản (Novaland), Du lịch - Nghỉ dưỡng (Nova Hospitality), Bán lẻ - F&B (Nova Retail), và nhiều lĩnh vực khác. Với quy mô này, NVG đang vận hành hàng chục hệ thống phần mềm riêng biệt tại các công ty thành viên."),
        para("Hiện tại, NVG đối mặt với thách thức dữ liệu phân tán, kết nối point-to-point phức tạp giữa các hệ thống, chi phí bảo trì cao, và thiếu khả năng nhìn tổng thể (single source of truth) về khách hàng và vận hành."),
        para("Tiên Phong CDS đề xuất xây dựng Hub Integration Platform - nền tảng tích hợp hệ thống tập trung, hiện đại, dựa trên kiến trúc open source gồm:"),
        boldBullet("API Gateway (Kong/APISIX): ", "Quản lý, bảo mật và routing toàn bộ API calls"),
        boldBullet("Event Streaming (Apache Kafka): ", "Messaging real-time, event-driven architecture"),
        boldBullet("Workflow Engine (n8n): ", "Orchestration & automation quy trình nghiệp vụ"),
        boldBullet("Security (Keycloak + Vault): ", "SSO tập trung, secret management"),
        boldBullet("Observability (Prometheus + ELK + Jaeger): ", "Monitoring, logging, tracing toàn diện"),
        spacer(),
        para("Giải pháp được triển khai theo mô hình Hybrid (On-premise + Cloud), đảm bảo data sovereignty và tuân thủ Luật An ninh mạng Việt Nam. Tổng thời gian triển khai: 12 tháng, chia thành 4 giai đoạn, mang lại giá trị từ giai đoạn đầu tiên."),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 2. BỐI CẢNH & THÁCH THỨC =====
        heading1("2. BỐI CẢNH & THÁCH THỨC"),

        heading2("2.1. Hiện trạng Hệ thống Novagroup"),
        para("Novagroup hiện đang vận hành một hệ sinh thái gồm 8 nền tảng phần mềm chính, phục vụ 5 nhóm chức năng nghiệp vụ trải rộng từ quản lý khách hàng, bán hàng, hợp đồng đến vận hành kênh phân phối:"),
        spacer(),
        heading3("8 Nền tảng Hệ thống Chính"),
        makeTable(
          ["STT", "Hệ thống", "Chức năng chính", "Vai trò"],
          [
            ["1", "ONENOVA", "Nền tảng hợp nhất - Portal tổng hợp toàn bộ nghiệp vụ", "Core Platform"],
            ["2", "NMS (Nova Management System)", "Hệ thống quản lý nội bộ Nova", "Management"],
            ["3", "CRM", "Quản lý khách hàng, lead, pipeline bán hàng, loyalty", "Sales & Marketing"],
            ["4", "GMS (Group Management System)", "Quản lý cấp tập đoàn, báo cáo tổng hợp", "Group Operations"],
            ["5", "ERP", "Tài chính, kế toán, công nợ, chuỗi cung ứng", "Finance & Operations"],
            ["6", "eSales", "Bán hàng trực tuyến, e-commerce, kênh số", "Digital Sales"],
            ["7", "SAP SuccessFactors", "Quản lý nhân sự, chấm công, đánh giá KPI", "HR / HCM"],
            ["8", "ICS (Internal Comms System)", "Truyền thông nội bộ, collaboration", "Communication"],
          ],
        ),
        spacer(),
        heading3("8 Modules Nghiệp vụ Ngang"),
        para("Các module nghiệp vụ xuyên suốt hệ thống, được triển khai trên nền các nền tảng trên:"),
        bullet("Sale SOP - Quy trình bán hàng chuẩn hóa"),
        bullet("Hành trình Khách hàng - Customer journey tracking"),
        bullet("Sự kiện & Tiếp khách - Event & hospitality management"),
        bullet("Sản phẩm - Product information management"),
        bullet("Kênh phân phối - Distribution channel management"),
        bullet("Nền tảng Dữ liệu & Báo cáo - Data platform & reporting"),
        bullet("Định hướng Truyền thông - Communications strategy"),
        bullet("Đào tạo trực tuyến - E-learning & training"),
        spacer(),
        heading3("5 Nhóm Chức năng Nghiệp vụ Chính"),
        spacer(),
        para("Nhóm 1: Quản lý Khách hàng & Thực hiện SOP", { bold: true, color: NAVY }),
        bullet("Quản lý và phân bổ Lead đa kênh (online, offline, referral)"),
        bullet("Lead Scoring bằng AI, chuẩn hóa Lead & gắn MasterID"),
        bullet("Phân bổ Lead tự động theo rules, thu hồi & tái phân bổ"),
        bullet("Quản trị tuân thủ SOP bán hàng (checklist, script, giám sát)"),
        bullet("Check-in khách hàng bằng FaceID + GPS"),
        bullet("Chấm điểm & phân nhóm khách hàng tự động"),
        spacer(),
        para("Nhóm 2: Quản lý Hoạt động Tương tác Bán hàng", { bold: true, color: NAVY }),
        bullet("Tracking hoạt động & giao dịch khách hàng toàn diện"),
        bullet("Ghi nhận trải nghiệm, sử dụng dịch vụ & đánh giá chất lượng chăm sóc"),
        bullet("Nhận diện khách hàng qua FaceID, email marketing tích hợp"),
        bullet("Quản lý Voucher & Loyalty, tích điểm, redeem, gợi ý sản phẩm"),
        bullet("Phân tích & Dự báo thông minh (AI/ML), theo dõi hợp đồng & công nợ"),
        spacer(),
        para("Nhóm 3: Bán hàng & Hỗ trợ Kinh doanh", { bold: true, color: NAVY }),
        bullet("Phê duyệt bảng giá / CTBH theo quy trình, đồng bộ Salesteam với SuccessFactors"),
        bullet("Bán hàng tập trung, quản lý tồn kho, chiết khấu & khả dụng"),
        bullet("Thông tin sản phẩm tập trung, cập nhật giá real-time"),
        bullet("Tích hợp các hệ thống e-commerce (eSales) với bán hàng offline"),
        spacer(),
        para("Nhóm 4: Hợp đồng, Công nợ, CSKH, Loyalty & Xử lý Yêu cầu", { bold: true, color: NAVY }),
        bullet("Xử lý yêu cầu - khiếu nại tập trung (Case Management) với SLA"),
        bullet("Voice Chat & Chatbot hỗ trợ khách hàng đa kênh"),
        bullet("Quản lý hợp đồng, phát hành, công nợ, đối soát thanh toán"),
        bullet("Quản lý khách hàng B2C (cá nhân) & B2B (doanh nghiệp)"),
        bullet("Kiểm soát báo cáo, tài chính & hoa hồng đại lý"),
        spacer(),
        para("Nhóm 5: Quản lý BAM / Kênh / Cộng đồng / Sự kiện", { bold: true, color: NAVY }),
        bullet("Mạng lưới đối tác & kênh phân phối (BAM/Agency), quản lý hoa hồng"),
        bullet("Vận hành sàn, check-in khách đến sàn/sự kiện, quản lý công việc"),
        bullet("Dashboard quản trị tổng hợp, hoạch định ngân sách & kho nội dung"),
        bullet("Kênh bán trực tuyến, hệ thống báo chí & truyền thông"),
        bullet("Training & Gamification cho đội ngũ bán hàng & đại lý"),
        bullet("Quản lý đối tác BAM (Đại lý TA), portal đối tác B2B"),
        spacer(),

        heading2("2.2. Thách thức Hiện tại"),
        para("Việc vận hành nhiều hệ thống rời rạc tại các công ty thành viên dẫn đến các thách thức nghiêm trọng:"),
        spacer(),
        boldBullet("1. Dữ liệu phân tán và rời rạc: ", "Mỗi công ty thành viên vận hành hệ thống riêng, dữ liệu khách hàng bị phân mảnh. Một khách hàng mua nhà Novaland không được nhận diện khi check-in khách sạn Nova."),
        boldBullet("2. Kiến trúc Point-to-Point phức tạp: ", "N hệ thống cần N×(N-1)/2 kết nối riêng lẻ. Với 20 hệ thống = 190 kết nối cần bảo trì, tạo ra \"spaghetti architecture\"."),
        boldBullet("3. Chi phí bảo trì cao: ", "Mỗi kết nối cần maintain riêng. Thay đổi API của 1 hệ thống ảnh hưởng dây chuyền tới các hệ thống khác."),
        boldBullet("4. Khó mở rộng: ", "Thêm hệ thống mới phải tạo kết nối với tất cả hệ thống hiện có. Thời gian triển khai tính bằng tháng."),
        boldBullet("5. Thiếu giám sát tổng thể: ", "Không có visibility về data flow giữa các hệ thống. Lỗi phát hiện chậm, troubleshooting khó khăn."),
        boldBullet("6. Bảo mật phân tán: ", "Mỗi hệ thống quản lý authentication riêng. Nhân viên cần nhiều tài khoản, rủi ro bảo mật cao."),
        boldBullet("7. Thiếu Customer 360: ", "Không có single source of truth về khách hàng, cản trở chiến lược cross-selling giữa các business unit."),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 3. GIẢI PHÁP ĐỀ XUẤT =====
        heading1("3. GIẢI PHÁP HUB INTEGRATION"),

        heading2("3.1. Tổng quan Giải pháp"),
        para("Tiên Phong CDS đề xuất xây dựng Hub Integration Platform - một nền tảng tích hợp tập trung đóng vai trò \"trục xương sống\" (backbone) kết nối tất cả hệ thống trong hệ sinh thái Novagroup."),
        para("Thay vì kết nối point-to-point giữa các hệ thống, mọi giao tiếp sẽ đi qua Hub Integration, giúp chuẩn hóa, bảo mật, giám sát và quản lý tập trung."),
        spacer(),
        para("Mục tiêu cụ thể:", { bold: true, color: NAVY }),
        bullet("Xây dựng Integration Hub tập trung, kết nối toàn bộ hệ thống Novagroup"),
        bullet("Chuẩn hóa giao tiếp qua API Gateway và Event Streaming"),
        bullet("Tích hợp SSO & bảo mật tập trung cho toàn tập đoàn"),
        bullet("Cung cấp monitoring & observability toàn diện"),
        bullet("Đảm bảo khả năng mở rộng linh hoạt và hiệu suất cao"),
        bullet("Tạo nền tảng cho Customer 360 và cross-selling giữa các BU"),
        spacer(),

        heading2("3.2. Kiến trúc Hệ thống"),
        para("Kiến trúc Hub Integration Platform được thiết kế theo mô hình nhiều lớp (layered architecture), mỗi lớp đảm nhận một chức năng cụ thể:"),
        spacer(),
        makeTable(
          ["Lớp (Layer)", "Thành phần", "Công nghệ", "Chức năng"],
          [
            ["API Gateway", "Primary Gateway", "Kong / Apache APISIX", "Routing, Auth, Rate Limiting, Transformation"],
            ["Event Streaming", "Message Backbone", "Apache Kafka", "Async messaging, Pub/Sub, CDC, Stream Processing"],
            ["Workflow Engine", "Orchestration", "n8n (Self-hosted)", "Business workflow, Error handling, Scheduling"],
            ["Data Integration", "ETL/EIP", "Apache Camel", "Complex transformation, Legacy adapter, Batch processing"],
            ["Security", "IAM/SSO", "Keycloak + Vault", "OAuth2, SAML, SSO, Secret management"],
            ["Service Discovery", "Registry", "HashiCorp Consul", "Service registration, Health check, Config management"],
            ["Monitoring", "Metrics", "Prometheus + Grafana", "Metrics collection, Dashboard, Alerting"],
            ["Logging", "Centralized Log", "ELK Stack", "Structured logging, Search, Visualization"],
            ["Tracing", "Distributed Trace", "Jaeger", "Request flow tracking, Bottleneck identification"],
            ["Infrastructure", "Container Platform", "Kubernetes (K8s)", "Container orchestration, Auto-scaling, HA"],
            ["Database", "Platform DB", "PostgreSQL (HA)", "Configuration, State management"],
            ["Cache", "Caching Layer", "Redis Cluster", "Response caching, Session storage"],
          ],
        ),
        spacer(),

        heading2("3.3. Chi tiết Thành phần"),

        heading3("3.3.1. API Gateway (Kong / Apache APISIX)"),
        para("API Gateway đóng vai trò \"cửa ngõ duy nhất\" (single entry point) cho tất cả API calls, bao gồm cả internal (giữa các hệ thống NVG) và external (partners, mobile apps, third-party)."),
        spacer(),
        makeTable(
          ["Tính năng", "Chi tiết"],
          [
            ["Routing", "Path-based, host-based, method-based routing đến backend services"],
            ["Authentication", "JWT, OAuth2, API Key, LDAP, mTLS - tích hợp Keycloak"],
            ["Rate Limiting", "Per consumer, per route, sliding window - bảo vệ backend"],
            ["Transformation", "Request/Response body transformation (JSON, XML, GraphQL)"],
            ["Load Balancing", "Round-robin, consistent-hashing, least-connections"],
            ["Circuit Breaker", "Tự động ngắt kết nối khi downstream service lỗi"],
            ["Caching", "Response caching giảm tải backend services"],
            ["Plugins", "100+ plugins ecosystem, custom plugin bằng Lua/Go/Python/JS"],
          ],
        ),
        spacer(),

        heading3("3.3.2. Event Streaming (Apache Kafka)"),
        para("Apache Kafka đóng vai trò \"xương sống\" cho asynchronous communication và event-driven architecture. Các hệ thống giao tiếp qua events/messages theo mô hình publish-subscribe."),
        spacer(),
        para("Kafka Topics dự kiến cho NVG:", { bold: true, color: NAVY }),
        makeTable(
          ["Topic", "Producer", "Consumer", "Use Case"],
          [
            ["nvg.lead.created", "CRM / ONENOVA / eSales", "NMS, Analytics, Notification", "Lead mới từ các kênh"],
            ["nvg.customer.updated", "CRM", "ERP, eSales, GMS, ONENOVA", "Cập nhật thông tin khách hàng"],
            ["nvg.contract.signed", "ONENOVA", "ERP, GMS, CRM, Notification", "Ký hợp đồng mới"],
            ["nvg.payment.completed", "ERP", "CRM, ONENOVA, Notification, Loyalty", "Thanh toán hoàn tất"],
            ["nvg.employee.synced", "SuccessFactors", "NMS, ICS, ONENOVA", "Đồng bộ nhân sự"],
            ["nvg.loyalty.redeemed", "CRM / ONENOVA", "ERP, eSales, Analytics", "Sử dụng voucher/loyalty"],
            ["nvg.case.created", "ONENOVA / Chatbot", "CRM, NMS, Notification", "Yêu cầu/khiếu nại mới"],
            ["nvg.audit.*", "All 8 platforms", "Audit Log, Compliance, GMS", "Audit trail toàn hệ thống"],
          ],
        ),
        spacer(),

        heading3("3.3.3. Workflow Engine (n8n)"),
        para("n8n là visual workflow automation platform, cho phép tạo các integration workflows thông qua giao diện kéo-thả, đồng thời hỗ trợ custom code khi cần."),
        spacer(),
        para("Ví dụ Workflow cho NVG:", { bold: true, color: NAVY }),
        spacer(),
        para("Workflow 1: Khách đặt phòng online → Xử lý tự động", { bold: true }),
        bullet("Webhook (Booking Engine) → Validate booking data"),
        bullet("→ Create reservation in PMS (Opera/Cloudbeds)"),
        bullet("→ Update CRM contact → Charge payment (VNPay/MoMo)"),
        bullet("→ Send confirmation (Email/Zalo) → Update loyalty points"),
        bullet("→ Error? → Retry 3x → Dead letter queue → Alert team"),
        spacer(),
        para("Workflow 2: Đồng bộ khách hàng cross-system", { bold: true }),
        bullet("Trigger: New customer in CRM → Enrich data (phone, address)"),
        bullet("→ Check duplicate across all systems"),
        bullet("→ Create/Update in ERP, PMS, POS, Loyalty → Sync to DW"),
        spacer(),

        heading3("3.3.4. Security & Identity Management"),
        para("Bảo mật là ưu tiên hàng đầu cho hệ thống Integration Hub của tập đoàn:"),
        spacer(),
        makeTable(
          ["Lớp bảo mật", "Công nghệ", "Chi tiết"],
          [
            ["Identity & Access", "Keycloak", "SSO, OAuth 2.0, OIDC, SAML 2.0, LDAP integration, Multi-tenancy"],
            ["Secret Management", "HashiCorp Vault", "API keys, DB passwords, certificates, dynamic secrets, auto-rotation"],
            ["Network Security", "VPN / Firewall", "Private network giữa hệ thống, DDoS protection, IP whitelist"],
            ["Service-to-Service", "mTLS (Istio)", "Mutual TLS giữa tất cả internal services"],
            ["Data Security", "AES-256 / TLS 1.3", "Encryption at rest & in transit, PII masking in logs"],
            ["Audit & Compliance", "ELK + Custom", "All API calls logged, Luật An ninh mạng VN, PDPA preparation"],
          ],
        ),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 4. INTEGRATION PATTERNS =====
        heading1("4. INTEGRATION PATTERNS CHO NOVAGROUP"),
        para("Dựa trên đặc thù kinh doanh của Novagroup, chúng tôi xác định 6 integration patterns chính cần triển khai:"),
        spacer(),

        heading2("4.1. Customer 360 - Hợp nhất Khách hàng"),
        para("Tạo một customer profile duy nhất từ tất cả touchpoints: CRM, PMS, POS, Sales, Loyalty. Khách hàng mua nhà Novaland = check-in khách sạn Nova = mua sắm tại Nova Retail → cùng 1 profile."),
        para("Giá trị: Personalization, cross-selling hiệu quả, lifetime value tracking."),
        spacer(),

        heading2("4.2. Revenue Consolidation - Tổng hợp Doanh thu"),
        para("Tổng hợp doanh thu real-time từ tất cả business units (BĐS, Hospitality, Retail, F&B) vào Data Warehouse phục vụ BI dashboard. CFO có cái nhìn tổng thể doanh thu toàn tập đoàn theo thời gian thực."),
        spacer(),

        heading2("4.3. Cross-Selling Automation"),
        para("Khi khách hàng thực hiện giao dịch tại 1 BU (ví dụ: mua nhà), hệ thống tự động trigger campaign ưu đãi tại các BU khác (khách sạn, F&B). Event-driven via Kafka → CRM campaign engine."),
        spacer(),

        heading2("4.4. Booking-to-Revenue Flow"),
        para("Luồng tự động từ Channel Manager → PMS → Update inventory (all OTAs) → Accounting entry → Housekeeping task → Guest notification. Giảm thao tác thủ công, tăng tốc độ phục vụ."),
        spacer(),

        heading2("4.5. Master Data Synchronization"),
        para("Đồng bộ master data (Customer, Product, Employee, Organization, Chart of Accounts) giữa tất cả hệ thống. Sử dụng Master Data Management (MDM) pattern với golden record."),
        spacer(),

        heading2("4.6. Compliance & Audit Trail"),
        para("Audit trail cho mọi giao dịch. Tuân thủ Luật An ninh mạng Việt Nam, tích hợp e-invoice, báo cáo thuế tự động. Tất cả data changes được log và có thể trace."),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 5. MÔ HÌNH TRIỂN KHAI =====
        heading1("5. MÔ HÌNH TRIỂN KHAI"),

        heading2("5.1. Đề xuất: Mô hình Hybrid"),
        para("Chúng tôi đề xuất mô hình Hybrid (On-premise + Cloud) cho NVG Hub Integration, kết hợp ưu điểm của cả hai môi trường:"),
        spacer(),
        makeTable(
          ["Thành phần", "On-Premise", "Public Cloud (AWS/Azure)"],
          [
            ["Core Integration Hub", "✓ Kong, Kafka, n8n, Keycloak", ""],
            ["Dữ liệu nhạy cảm", "✓ Databases, PII, financial data", ""],
            ["Internal Systems", "✓ SAP, Oracle, PMS, HRM", ""],
            ["Monitoring Stack", "✓ Prometheus, Grafana, ELK", ""],
            ["External API Gateway", "", "✓ CDN, WAF, DDoS protection"],
            ["DR / Backup", "", "✓ Disaster Recovery site"],
            ["Dev/Staging", "", "✓ Development environment"],
            ["AI/ML Services", "", "✓ AI processing, analytics"],
            ["Object Storage", "", "✓ Archival, cold storage"],
          ],
        ),
        spacer(),
        para("Ưu điểm mô hình Hybrid:", { bold: true, color: NAVY }),
        bullet("Data sovereignty: Dữ liệu nhạy cảm lưu trữ on-premise, tuân thủ Luật An ninh mạng VN"),
        bullet("Flexibility: Tận dụng cloud cho non-sensitive workloads và burst capacity"),
        bullet("Cost optimization: On-prem cho workloads ổn định, cloud cho elastic workloads"),
        bullet("External protection: API exposure qua cloud (DDoS protection, CDN, WAF)"),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 6. LỘ TRÌNH TRIỂN KHAI =====
        heading1("6. LỘ TRÌNH TRIỂN KHAI"),
        para("Dự án được triển khai theo 4 giai đoạn, tổng thời gian 12 tháng. Mỗi giai đoạn đều mang lại giá trị cụ thể, không cần đợi đến khi hoàn thành toàn bộ."),
        spacer(),

        heading2("Phase 1: Foundation (Tháng 1-3)"),
        bullet("Setup Kubernetes cluster (on-premise)"),
        bullet("Deploy Kong API Gateway - cổng giao tiếp tập trung"),
        bullet("Deploy Keycloak (SSO) - đăng nhập một lần cho toàn tập đoàn"),
        bullet("Deploy monitoring stack (Prometheus, Grafana, ELK)"),
        bullet("Setup CI/CD pipeline"),
        bullet("API standards & governance documentation"),
        bullet("Tích hợp 2-3 hệ thống critical (ERP, CRM)"),
        para("Deliverable: API Gateway hoạt động, SSO cho 2-3 hệ thống, monitoring dashboard.", { bold: true, color: GREEN }),
        spacer(),

        heading2("Phase 2: Core Integration (Tháng 4-6)"),
        bullet("Deploy Apache Kafka cluster (3+ brokers)"),
        bullet("Deploy n8n workflow engine"),
        bullet("Customer sync: CRM ↔ ERP (Master Data)"),
        bullet("Financial data flow: POS → ERP"),
        bullet("Booking flow: PMS → CRM → Finance"),
        bullet("Deploy Consul (service registry), Vault (secrets)"),
        para("Deliverable: Event-driven integration giữa core systems, Customer data sync, Financial consolidation.", { bold: true, color: GREEN }),
        spacer(),

        heading2("Phase 3: Expansion (Tháng 7-9)"),
        bullet("Tích hợp remaining systems: PMS, POS, HRM, DMS"),
        bullet("Event-driven patterns (Kafka) cho tất cả business events"),
        bullet("Master Data Management workflows"),
        bullet("Cross-BU integration (Property ↔ Hospitality ↔ Retail)"),
        bullet("Advanced monitoring & alerting"),
        para("Deliverable: Toàn bộ hệ thống kết nối qua Hub, Customer 360, Cross-selling automation.", { bold: true, color: GREEN }),
        spacer(),

        heading2("Phase 4: Optimization & Advanced (Tháng 10-12)"),
        bullet("Data Warehouse integration & BI/Analytics pipeline"),
        bullet("External partner integration (OTAs, payment, logistics)"),
        bullet("Performance optimization & tuning"),
        bullet("Disaster Recovery setup (cloud)"),
        bullet("Developer portal & API marketplace nội bộ"),
        bullet("Advanced security: mTLS, API threat protection"),
        para("Deliverable: Full production platform, BI dashboards, DR active, API marketplace.", { bold: true, color: GREEN }),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 7. SO SÁNH GIẢI PHÁP =====
        heading1("7. SO SÁNH VỚI GIẢI PHÁP ENTERPRISE"),
        para("So với việc NVG mua enterprise integration platform (MuleSoft, TIBCO, IBM Integration Bus), giải pháp CDS Hub Integration mang lại nhiều lợi thế vượt trội:"),
        spacer(),
        makeTable(
          ["Tiêu chí", "Enterprise Platform", "CDS Hub Integration"],
          [
            ["License cost/năm", "$300K - $1M USD", "~$0 (Open Source)"],
            ["Customization", "Giới hạn theo vendor", "Toàn quyền kiểm soát source code"],
            ["Vendor lock-in", "Cao (proprietary format)", "Thấp (open standards, portable)"],
            ["Hỗ trợ tại Việt Nam", "Qua partner quốc tế (Deloitte, PwC)", "Trực tiếp từ CDS team tại TPHCM"],
            ["Time to value", "6-12 tháng", "3-6 tháng (giá trị từ Phase 1)"],
            ["Phù hợp context VN", "Trung bình", "Cao (hiểu thị trường, tuân thủ luật VN)"],
            ["Tổng chi phí 3 năm", "$1 - $3M USD", "$200K - $500K USD"],
            ["Khả năng mở rộng", "Tốt (theo license tier)", "Tốt (horizontal scaling, no license limit)"],
            ["Community & Ecosystem", "Vendor ecosystem", "Massive open source community"],
          ],
        ),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 8. ĐỘI NGŨ =====
        heading1("8. ĐỘI NGŨ TRIỂN KHAI"),
        para("Tiên Phong CDS cung cấp toàn bộ nhân lực triển khai, với đội ngũ giàu kinh nghiệm trong lĩnh vực integration, cloud infrastructure, và digital transformation:"),
        spacer(),
        makeTable(
          ["Vai trò", "Số lượng", "Trách nhiệm"],
          [
            ["Solution Architect", "1", "Thiết kế kiến trúc tổng thể, technical decisions, stakeholder alignment"],
            ["Integration Developer (Java/Camel)", "2-3", "Phát triển integration services, API adapter, data transformation"],
            ["DevOps/SRE Engineer", "1-2", "Kubernetes cluster, CI/CD, monitoring, infrastructure as code"],
            ["n8n Workflow Developer", "1-2", "Business workflows, n8n customization, connector development"],
            ["API Developer", "1-2", "API design (OpenAPI), Kong configuration, contract testing"],
            ["QA Engineer", "1", "Integration testing, performance testing, security testing"],
            ["Project Manager", "1", "Project coordination, milestone tracking, stakeholder management"],
          ],
        ),
        spacer(),
        para("Tổng đội ngũ: 8-12 người, duy trì xuyên suốt 12 tháng triển khai.", { bold: true, color: NAVY }),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 9. RỦI RO =====
        heading1("9. QUẢN LÝ RỦI RO"),
        makeTable(
          ["Rủi ro", "Mức độ", "Giải pháp giảm thiểu"],
          [
            ["Legacy systems không có API", "Cao", "Sử dụng Debezium CDC, database-level integration, wrap legacy bằng API adapter"],
            ["Kafka cluster phức tạp vận hành", "Trung bình", "Confluent Platform Community, training team NVG, runbook documentation"],
            ["Team NVG chưa quen event-driven", "Cao", "Training plan 2 tuần, documentation, bắt đầu với simple patterns"],
            ["Data quality kém từ source systems", "Cao", "Data validation layer, cleansing workflows trong n8n/Camel, alerting"],
            ["Performance bottleneck", "Trung bình", "Load testing từ Phase 1, capacity planning, horizontal scaling"],
            ["Scope creep", "Cao", "Phân phase rõ ràng, MoSCoW prioritization, change request process"],
            ["Security breach", "Critical", "Defense-in-depth, security audit quarterly, penetration testing"],
          ],
        ),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 10. BƯỚC TIẾP THEO =====
        heading1("10. BƯỚC TIẾP THEO"),
        para("Để khởi động dự án, chúng tôi đề xuất các bước tiếp theo sau:"),
        spacer(),
        boldBullet("Bước 1 - Họp Kỹ thuật Chi tiết (Tuần 1): ", "Book lịch họp với Team kỹ thuật NVG để trao đổi chi tiết về hiện trạng hệ thống, yêu cầu cụ thể, và ưu tiên tích hợp."),
        boldBullet("Bước 2 - Khảo sát Hệ thống / Discovery (Tuần 2-3): ", "CDS team thực hiện system audit: inventory tất cả hệ thống, API sẵn có, data formats, integration points hiện tại."),
        boldBullet("Bước 3 - Thiết kế Kiến trúc Chi tiết (Tuần 4-5): ", "Dựa trên kết quả discovery, thiết kế kiến trúc chi tiết, chọn tech stack cuối cùng, ước tính effort & chi phí chính xác."),
        boldBullet("Bước 4 - POC / Proof of Concept (Tuần 6-8): ", "Triển khai POC với 2-3 hệ thống quan trọng nhất. Demo kết quả thực tế cho leadership NVG."),
        boldBullet("Bước 5 - Ký kết SOW & Triển khai (Tuần 9+): ", "Hoàn thiện Statement of Work, timeline, milestones, SLA. Bắt đầu Phase 1 triển khai chính thức."),
        new Paragraph({ children: [new PageBreak()] }),

        // ===== 11. KẾT LUẬN =====
        heading1("11. KẾT LUẬN"),
        para("Tiên Phong CDS cam kết mang đến giải pháp Hub Integration Platform hiện đại, giúp Novagroup:"),
        spacer(),
        bullet("Kết nối toàn bộ hệ sinh thái số của tập đoàn vào một nền tảng tập trung"),
        bullet("Giảm 70% chi phí tích hợp và bảo trì hệ thống"),
        bullet("Xây dựng Customer 360 - nền tảng cho cross-selling và personalization"),
        bullet("Tiết kiệm $300K - $1M USD/năm so với giải pháp enterprise tương đương"),
        bullet("Tuân thủ Luật An ninh mạng Việt Nam với mô hình Hybrid deployment"),
        bullet("Tạo nền tảng vững chắc cho chiến lược chuyển đổi số dài hạn"),
        spacer(),
        para("Với kinh nghiệm triển khai hệ thống tích hợp cho các doanh nghiệp lớn tại Việt Nam, đội ngũ kỹ thuật chuyên môn cao, và phương pháp tiếp cận open source giúp tối ưu chi phí, Tiên Phong CDS tự tin là đối tác phù hợp nhất cho dự án Hub Integration của Novagroup."),
        spacer(),
        para("Chúng tôi mong chờ được book lịch họp với Team kỹ thuật NVG để trao đổi chi tiết hơn về giải pháp và bắt đầu hành trình chuyển đổi số cùng Novagroup.", { bold: true, color: NAVY }),
        spacer(),
        spacer(),
        new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: GOLD } } }),
        spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "CÔNG TY CỔ PHẦN TIÊN PHONG CDS", bold: true, size: 24, color: NAVY, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80 },
          children: [new TextRun({ text: "Leading Digital Business Transformation", size: 20, color: GOLD, font: "Arial", italics: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120 },
          children: [new TextRun({ text: "164 Nguyễn Văn Thương, Bình Thạnh, TP.HCM", size: 20, color: GRAY, font: "Arial" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50 },
          children: [new TextRun({ text: "+84 975 286 868  |  info@tienphongcds.com  |  tienphongcds.com", size: 20, color: GRAY, font: "Arial" })],
        }),
      ],
    },
  ],
});

// Save
const outputPath = "/Users/mac/Documents/Work/Projects/TIEN PHONG CDS/cto-ai-assistant/.claude/drafts/NVG-Hub-Integration-Proposal.docx";
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log("DOCX saved:", outputPath);
}).catch(err => console.error("Error:", err));
