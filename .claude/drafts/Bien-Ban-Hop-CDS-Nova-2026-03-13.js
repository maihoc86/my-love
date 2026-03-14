/**
 * BIÊN BẢN CUỘC HỌP - NOVAGROUP x CDS - eSales Module 1
 * Ngày: 13/03/2026 - 14h00
 * Chủ đề: Review AS-IS / TO-BE Module 1 - Quản lý Bán hàng & Khách hàng (SFA)
 */

const fs = require("fs");
const path = require("path");
const {
  Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, PageBreak,
  C, FONT, CONTENT_WIDTH,
  borders, noBorders, cellMargins,
  headerCell, bodyCell, labelCell,
  sectionHeader, subSectionTitle, bodyParagraph, bodyParagraphMixed,
  bulletItem, bulletItemBold, numberedItem, calloutBox, spacer,
  createInfoTable, createDataTable,
  signatureBlock, createDocumentShell
} = require(path.resolve(__dirname, "../skills/meeting-minutes/scripts/meeting-minutes-template.js"));

// ══════════════════════════════════════════════════════════════
// BUILD DOCUMENT
// ══════════════════════════════════════════════════════════════

const children = [
  // ── TITLE ──
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: "BIÊN BẢN CUỘC HỌP", font: FONT, size: 36, bold: true, color: C.darkNavy })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "NOVAGROUP x CDS — Review Module 1: eSales SFA", font: FONT, size: 28, bold: true, color: C.darkNavy })]
  }),

  // ── THÔNG TIN CHUNG ──
  createInfoTable([
    ["Chủ đề", "Review AS-IS / TO-BE Module 1 — Quản lý Bán hàng & Khách hàng (SFA)"],
    ["Dự án", "eSales — Hệ thống Quản lý Kinh doanh NovaGroup"],
    ["Ngày họp", "Thứ Năm, 13/03/2026"],
    ["Thời gian", "14h00 — chiều"],
    ["Địa điểm", "Online / Trực tuyến"],
    ["Chủ trì", "Đại diện NovaGroup & Đội tư vấn CDS"],
  ]),
  spacer(80),

  // Bảng thành viên tham dự
  subSectionTitle("Thành viên tham dự"),
  createDataTable(
    ["STT", "Họ và tên", "Chức vụ / Vai trò", "Đơn vị"],
    [
      ["1", "Anh Khanh", "Đại diện Ban Kinh doanh", "NovaGroup"],
      ["2", "Chị Phúc", "Thành viên đội dự án", "NovaGroup"],
      ["3", "Chị Mi", "Thành viên đội dự án", "NovaGroup"],
      ["4", "Anh Duy", "Thành viên đội dự án", "NovaGroup"],
      ["5", "Đội tư vấn CDS", "Business Analyst / Solution Consultant", "TienPhong CDS"],
    ],
    [600, 2400, 3800, 2838]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 1. MỤC ĐÍCH CUỘC HỌP
  // ══════════════════════════════════════════════════════════════
  sectionHeader("1. MỤC ĐÍCH CUỘC HỌP"),
  spacer(80),
  bodyParagraph("Rà soát và hoàn thiện tài liệu phân tích hiện trạng (AS-IS) và thiết kế giải pháp tương lai (TO-BE) cho Module 1 — Quản lý Bán hàng và Khách hàng (Sales Force Automation — SFA), bao gồm các phân hệ:"),
  bulletItem("M1.1 — Quản lý và Phân bổ Lead"),
  bulletItem("M1.2 — Quy trình Bán hàng 10 bước (SOP) & tích hợp Sale Hub / Customer 360"),
  bulletItem("M1.2.1 — Module Báo giá kỹ thuật số"),
  bulletItem("M1.3 — Hệ thống KPI và Cấp bậc"),
  bulletItem("M1.4 — Cơ chế Hoa hồng (Commission Rule Engine)"),
  bulletItem("M1.5 — Module Sự kiện"),
  bulletItem("Phân quyền đa vai trò & Master ID"),
  spacer(60),
  calloutBox("YÊU CẦU QUAN TRỌNG: NovaGroup nhấn mạnh tài liệu TO-BE hiện vẫn còn quá chung chung, cần chi tiết hơn, bám sát quy trình thực tế của NOVA, và phải viết bằng tiếng Việt để đội kinh doanh dễ đọc."),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 2. NỘI DUNG THẢO LUẬN
  // ══════════════════════════════════════════════════════════════
  sectionHeader("2. NỘI DUNG THẢO LUẬN"),
  spacer(100),

  // ── 2.1 Review AS-IS Module 1 ──
  subSectionTitle("2.1 Review hiện trạng AS-IS — Module 1 (SFA)"),
  bodyParagraph("CDS trình bày tổng quan các cập nhật trong tài liệu AS-IS. NovaGroup đưa ra nhiều nhận xét quan trọng:"),
  spacer(40),
  bulletItemBold("Thiếu nội dung liên quan đến Sản phẩm: ", "Tài liệu AS-IS hiện chỉ đang tập trung vào quy trình phân bổ lead, chưa đề cập đến quản lý sản phẩm và mối liên hệ sản phẩm — khách hàng."),
  bulletItemBold("Báo giá: ", "CDS đề xuất thêm màn hình báo giá vào luồng SOP để hỗ trợ BAM ở bước \"thả thính\" và theo dõi tình trạng báo giá. NovaGroup đồng ý hướng này."),
  bulletItemBold("KPI: ", "NovaGroup cho biết bảng KPI thực tế rất chi tiết và phức tạp, đã đính kèm tài liệu. Nội dung KPI trong tài liệu CDS chưa phản ánh đúng thực tế — cần bổ sung nhiều hơn."),
  bulletItemBold("Tạo khách hàng: ", "BAM chỉ nhập liệu cơ bản (họ tên, SĐT, thông tin bổ sung). Back-office ghi nhận thêm khi có thông tin pháp lý. Không có quy trình tạo khách hàng riêng — chỉ là nhập liệu."),
  spacer(40),
  calloutBox("LƯU Ý: Tài liệu CDS ghi nhận sai chỗ quy trình tạo khách hàng — cần sửa lại. Thực tế KHÔNG CÓ quy trình tạo KH, chỉ có nhập liệu đơn giản."),
  spacer(120),

  // ── 2.2 Review TO-BE Module 1 ──
  subSectionTitle("2.2 Review thiết kế TO-BE — Module 1 (SFA)"),
  bodyParagraph("NovaGroup nhận xét tổng quan tài liệu TO-BE vẫn còn quá chung chung, cần chi tiết hơn nhiều. Các điểm cụ thể:"),
  spacer(40),
  bulletItemBold("M1.4 — Hoa hồng (Referral): ", "Phạm vi Referral phải mở rộng thành ALL (tất cả các kênh giới thiệu), không chỉ giới hạn Novator. Bao gồm: Telemarketing, Affiliate Marketing, MLS, V-Shop, CTV, và các kênh khác."),
  bulletItemBold("M1.5 — Kênh tương tác: ", "Không chỉ có Zalo mà phải bao gồm tất cả social media (Facebook, Zalo, Viber, v.v.). NovaGroup đã đính kèm tài liệu chi tiết."),
  bulletItemBold("Dashboard: ", "Phải có dashboard real-time ở MỌI module và MỌI phân hệ, không chỉ ở tổng quan."),
  bulletItemBold("Ngôn ngữ tài liệu: ", "Yêu cầu tài liệu bám sát ngôn ngữ và quy trình NOVA, viết bằng tiếng Việt để đội kinh doanh dễ đọc, dễ review."),
  bulletItemBold("Báo giá KTS — Trạng thái: ", "Cần NovaGroup cung cấp chi tiết các trạng thái báo giá (Book có tiền, Book không tiền, v.v.) để CDS mô tả chính xác."),
  spacer(120),

  // ── 2.3 Master ID & Chống trùng lặp ──
  subSectionTitle("2.3 Quy trình tạo Master ID và Logic chống trùng lặp dữ liệu"),
  bodyParagraph("Đây là phần thảo luận kỹ thuật quan trọng nhất. Giải pháp được thống nhất gồm hai giai đoạn:"),
  spacer(40),

  bodyParagraphMixed("Giai đoạn 1 — Khách hàng tiềm năng (Trước hợp đồng): ", "BAM nhập thông tin cơ bản (Họ tên, SĐT, Nguồn KH). Hệ thống tạo mã định danh tạm thời."),
  bulletItem("Khi trùng SĐT với BAM khác: Hiển thị CẢNH BÁO \"Khách hàng đã tồn tại, có thể đang được người khác phụ trách\" nhưng KHÔNG CHẶN tạo mới.", 1),
  bulletItem("Khi trùng SĐT với chính mình: CHẶN — không cho tạo trùng dữ liệu của bản thân.", 1),
  spacer(40),

  bodyParagraphMixed("Giai đoạn 2 — Khi có giao dịch/hợp đồng: ", "Back-office cập nhật thông tin pháp lý đầy đủ (CCCD, MST) và hệ thống tạo Master ID duy nhất."),
  bulletItem("Khách hàng cá nhân: CHẶN tạo Master ID nếu trùng số CCCD.", 1),
  bulletItem("Khách hàng doanh nghiệp/đại lý: CHẶN tạo Master ID nếu trùng Mã số thuế (MST).", 1),
  bulletItem("Tất cả mã tạm trước đó liên quan sẽ được liên kết vào Master ID duy nhất.", 1),
  spacer(40),
  calloutBox("QUAN TRỌNG: Mục 2.1.2 trong tài liệu TO-BE hiện KHÔNG ĐÚNG THỰC TẾ — cần viết lại. Phải mô tả chi tiết nhiều case hơn: trùng với mình thì sao, trùng với BAM khác thì sao, trùng mà chưa có Master ID thì xử lý thế nào. Cần liên kết MST / CCCD với SĐT."),
  spacer(40),

  bodyParagraph("Hệ thống phải hỗ trợ nhiều loại khách hàng ngay từ đầu: B2C, B2B, Đại lý (TA), OTA, Hướng dẫn viên, Cộng tác viên — mỗi loại có các trường thông tin đặc thù."),
  bulletItem("Thiếu TA / OTA / CTV trong droplist cấu hình — cần bổ sung chi tiết."),
  spacer(120),

  // ── 2.4 Phân bổ lead ──
  subSectionTitle("2.4 Cấu hình nguồn Lead và Quy tắc phân bổ"),
  bodyParagraph("Hệ thống cần cơ chế quản lý nguồn lead và rule engine phân bổ tự động. Các điểm chính:"),
  spacer(40),

  bulletItemBold("Nguồn lead: ", "Digital (Facebook, Zalo, Google, Website, App), Sự kiện, Referral/Affiliate/MLS, Đối tác (TA, OTA, CTV, HDV), Nhập liệu thủ công (Import Excel)."),
  bulletItemBold("HUB Marketing → Sale: ", "Lead từ marketing rót về sale thông qua HUB, phải gắn tag nguồn tự động (auto-tag) để nhận biết lead đến từ đâu."),
  bulletItemBold("Thiếu rule của NOVA: ", "Tài liệu hiện chỉ mô tả rule chạy ngầm hệ thống, thiếu rule phân bổ đặc thù của NOVA. NovaGroup đã đính kèm lưu đồ phân bổ chi tiết."),
  bulletItemBold("Thu hồi lead: ", "Tự động thu hồi theo mốc thời gian (N+16 ngày, N+23 ngày). Giới hạn 3 lần phân bổ lại cho lead không liên lạc được hoặc KH không quan tâm."),
  bulletItemBold("BAM nghỉ việc: ", "Hệ thống tự động chuyển toàn bộ KH sang BAM khác (có thể chọn BAM cụ thể hoặc hệ thống tự phân bổ)."),
  bulletItemBold("Nguyên tắc thu hồi: ", "Về số lượng và KPI chuyển đổi — phải đạt ngưỡng mới được phân bổ thêm. Tài liệu đã có trong lưu đồ phân bổ."),
  spacer(120),

  // ── 2.5 SOP 10 bước ──
  subSectionTitle("2.5 SOP — Quy trình bán hàng 10 bước & Tích hợp Sale Hub / Customer 360"),
  bodyParagraph("Điểm cập nhật quan trọng nhất: Tích hợp sâu Sale Hub và Customer 360 vào từng bước SOP, tạo không gian làm việc hợp nhất cho BAM."),
  spacer(40),

  bulletItemBold("Tất cả kênh: ", "SOP phải áp dụng cho TẤT CẢ các kênh tương tác, không giới hạn."),
  bulletItemBold("Bước Phân tích: ", "BAM xem hồ sơ KH 360 độ, lịch sử tương tác, phân loại khách hàng. Cần bổ sung khả năng xem được phân loại KH tại bước này."),
  bulletItemBold("Bước Thả thính: ", "Truy cập Sale Hub lấy brochure, video, tài liệu sản phẩm. Cần tích hợp call center để lưu record cuộc gọi thay vì yêu cầu BAM screenshot."),
  bulletItemBold("Bước Gieo hạt: ", "Cần thêm yêu cầu đảm bảo KH đã tải app NMS — ghi nhận trạng thái tải app, liên kết qua SĐT."),
  bulletItemBold("Bước Chốt deal: ", "Tạo báo giá, đơn hàng, booking trực tiếp từ SOP qua API tích hợp với Sale Hub (Land, Service, Booking)."),
  bulletItemBold("Chuyển hóa KH: ", "Cần xem lại và mô tả chi tiết hơn chỗ chuyển hóa khách hàng trong SOP."),
  spacer(60),

  // Cơ chế bằng chứng
  bodyParagraphMixed("Cơ chế cung cấp bằng chứng hoàn thành SOP: ", ""),
  bulletItemBold("Hoạt động có tích hợp: ", "Email, call center tích hợp → Hệ thống TỰ ĐỘNG LOG, không cần bằng chứng thủ công."),
  bulletItemBold("Hoạt động không tích hợp: ", "Zalo cá nhân, gọi điện thường → BAM PHẢI TẢI LÊN bằng chứng (screenshot)."),
  bulletItem("Hệ thống xây dựng cơ chế \"Activity\" linh hoạt: quản trị viên cấu hình loại hành động cần thực hiện ở mỗi bước SOP."),
  spacer(120),

  // ── 2.6 Ghi âm cuộc gọi ──
  subSectionTitle("2.6 Ghi âm cuộc gọi và Thu thập dữ liệu cho AI"),
  calloutBox("YÊU CẦU BẮT BUỘC TỪ TẬP ĐOÀN: Phải có record cuộc gọi tư vấn của BAM để huấn luyện AI ở giai đoạn 3. Pipeline: Ghi âm → Speech-to-Text → Keyword → Prompt → Kịch bản cho AI học."),
  spacer(60),
  bodyParagraph("Các phương án được thảo luận và đánh giá:"),
  spacer(40),

  createDataTable(
    ["Phương án", "Đánh giá", "Kết luận"],
    [
      ["Ghi âm thủ công (BAM tự bấm ghi)", "Quá rườm rà, không được tuân thủ", "Loại bỏ"],
      ["App bên thứ ba (iTap,...)", "Không bền vững, iOS/Android siết quyền riêng tư", "Loại bỏ"],
      ["Tai nghe AI chuyên dụng", "Chỉ phù hợp văn phòng telesales, khó gắn vào CRM", "Loại bỏ"],
      ["Meta (FB/Zalo call) trích keyword", "Tiềm năng nhưng rất phức tạp, mang tính tương lai", "Nghiên cứu thêm"],
      ["SIP Call (tổng đài SIP)", "Khả thi nhất: ghi âm tập trung, hiển thị Brandname", "ƯU TIÊN HÀNG ĐẦU"],
    ],
    [2500, 4638, 2500]
  ),
  spacer(60),

  bulletItemBold("Kết luận: ", "Hệ thống TO-BE sẽ được thiết kế để có khả năng tiếp nhận và lưu trữ file ghi âm vào hồ sơ KH. Giải pháp SIP Call là ưu tiên hàng đầu. Vấn đề \"làm thế nào để có file ghi âm\" sẽ là bài toán riêng cần tiếp tục nghiên cứu."),
  bulletItemBold("Anh Khanh yêu cầu: ", "Mong muốn có được giải pháp ghi âm cuộc gọi qua Zalo — CDS cần nghiên cứu khả thi."),
  spacer(60),

  // Vấn đề pháp lý
  bodyParagraphMixed("Lưu ý pháp lý: ", "Theo Thông tư 13, việc ghi âm cuộc gọi cần thông báo và được sự đồng ý của người nghe — đa số khách hàng sẽ từ chối. Cần có giải pháp phù hợp quy định pháp luật."),
  spacer(120),

  // ── 2.7 Module Báo giá ──
  subSectionTitle("2.7 Module Báo giá kỹ thuật số (M1.2.1)"),
  bodyParagraph("Module báo giá chuyên biệt, truy cập độc lập hoặc từ SOP. Các tính năng chính:"),
  spacer(40),
  bulletItemBold("Tạo báo giá linh hoạt: ", "Dựa trên sản phẩm từ giỏ hàng Sale Hub, áp dụng bảng giá/chính sách đã định nghĩa."),
  bulletItemBold("Xuất PDF theo mẫu: ", "Tự động sinh file PDF báo giá theo mẫu chuẩn công ty."),
  bulletItemBold("Tích hợp kênh gửi: ", "Gửi trực tiếp qua email hoặc social media tích hợp."),
  bulletItemBold("Quản lý phiên bản & trạng thái: ", "Lưu trữ tất cả phiên bản (lần 1, 2,...). Quản lý vòng đời: Mới tạo → Đã gửi → Đã xem → Chuyển thành đơn hàng,... Cần NOVA cung cấp chi tiết trạng thái."),
  bulletItemBold("Tích hợp Customer 360: ", "Mọi hoạt động báo giá tự động ghi nhận vào timeline KH."),
  bulletItemBold("Luồng phê duyệt: ", "Tùy chọn — phần lớn báo giá của BAM không cần phê duyệt."),
  spacer(40),
  calloutBox("Feedback Anh Duy: Chưa rõ sâu về Báo giá — Nó sẽ lấy báo giá từ đâu? Cần CDS mô tả rõ hơn nguồn dữ liệu giá."),
  bulletItem("Làm rõ phương thức lưu trữ dữ liệu báo giá (Link PDF? File PDF? Inline data?)."),
  spacer(120),

  // ── 2.8 KPI ──
  subSectionTitle("2.8 Hệ thống KPI và Cấp bậc (M1.3)"),
  bodyParagraph("NovaGroup nhấn mạnh KPI thực tế phức tạp hơn nhiều so với ghi nhận ban đầu. Có bảng tính KPI tổng thể (master sheet) rất chi tiết."),
  spacer(40),
  bulletItemBold("Tính toán KPI tự động: ", "Theo tháng/quý cho tất cả đối tượng (BAM, quản lý, vai trò hỗ trợ)."),
  bulletItemBold("Cảnh báo vi phạm SOP: ", "Tự động cảnh báo khi BAM vi phạm quy trình."),
  bulletItemBold("Dashboard Real-time: ", "Mỗi module phải có dashboard riêng — BAM và quản lý tự theo dõi hiệu suất."),
  bulletItemBold("Hệ thống cấp bậc (Level): ", "Tự động tăng/giảm cấp bậc BAM (level 4-8) dựa trên KPI. Cấp bậc ảnh hưởng đến phân bổ lead và chỉ tiêu."),
  bulletItem("Bổ sung ở mục báo cáo theo file tài liệu đã bổ sung từ NovaGroup."),
  spacer(120),

  // ── 2.9 Hoa hồng ──
  subSectionTitle("2.9 Cơ chế Hoa hồng (M1.4)"),
  bodyParagraph("Phần này cực kỳ phức tạp. NovaGroup nhận xét nội dung hiện đang thiếu RẤT NHIỀU và quá chung chung."),
  spacer(40),
  bulletItemBold("Rule Engine: ", "Cho phép kinh doanh/nhân sự tự định nghĩa công thức, quy tắc tính hoa hồng cho từng sản phẩm, chương trình, đối tượng."),
  bulletItemBold("Co-owner: ", "Hỗ trợ giao dịch nhiều người cùng hưởng hoa hồng, định nghĩa tỷ lệ phân chia."),
  bulletItemBold("Luồng phê duyệt chi trả: ", "Cấu hình các bước phê duyệt trước khi chi trả."),
  bulletItemBold("Mở rộng loại hình: ", "Referral (ALL kênh), Affiliate Marketing, MLS (Multi-level Sale), V-Shop."),
  bulletItemBold("Đối soát & báo cáo: ", "Hoa hồng dự kiến, đã trả, còn lại cho từng cá nhân và tổng thể."),
  spacer(40),
  calloutBox("NOVA chưa comment thêm vì thấy nội dung vẫn quá chung. Lưu ý: mỗi BU khác nhau có cơ chế hoa hồng khác nhau, thậm chí trong cùng một BU cũng có thể khác. CDS cần chi tiết hóa đáng kể."),
  spacer(120),

  // ── 2.10 Sự kiện ──
  subSectionTitle("2.10 Module Quản lý Sự kiện"),
  bodyParagraph("NovaGroup nhận xét module sự kiện ĐANG KHÔNG CHI TIẾT — cần phải chi tiết hơn nhiều. Các yêu cầu:"),
  spacer(40),
  bulletItemBold("Tạo & cấu hình sự kiện: ", "Tạo sự kiện, định nghĩa tên, thời gian, địa điểm. Thiết kế mẫu thư mời (EDM) động — đã mô tả trong tài liệu đính kèm."),
  bulletItemBold("Quản lý đăng ký: ", "BAM đăng ký cho KH. Khách vãng lai có thể được tạo thông tin tại sự kiện. Marketing ghi nhận thư mời nhưng quản lý phải là bên Sale."),
  bulletItemBold("QR Code / Vé: ", "PHẢI CÓ QR giống như vé lưu hành — biết đó là ai. Gửi qua Zalo/SMS/Email sau đăng ký."),
  bulletItemBold("Check-in / Check-out: ", "Quét QR qua app, ghi nhận real-time. Cần mô tả KĨ quy trình check-in/out."),
  bulletItemBold("Khách tự tới: ", "Cần bổ sung phần quản lý khách hàng tự đến (walk-in) mà không có đăng ký trước."),
  bulletItemBold("Quản lý người đi cùng: ", "Ghi nhận thông tin người đi cùng để quản lý chi phí và phục vụ."),
  bulletItemBold("Voucher / Quà tặng: ", "Tự động phát hành voucher điện tử hoặc ghi nhận quà tặng khi check-in, trừ vào kho trên Sale Hub."),
  bulletItemBold("Khảo sát sau sự kiện: ", "Gửi form survey đến KH đã tham gia — hiện đang THIẾU trong tài liệu."),
  spacer(120),

  // ── 2.11 Phân quyền ──
  subSectionTitle("2.11 Phân quyền đa vai trò"),
  bodyParagraph("Đặc thù tổ chức: một người có thể kiêm nhiệm nhiều vai trò ở các BU khác nhau. Yêu cầu phân quyền rất chi tiết."),
  spacer(40),
  bulletItemBold("Cấu trúc phân cấp: ", "Công ty → Phòng ban/Nhóm → Vai trò (Role)."),
  bulletItemBold("Gán nhiều vai trò: ", "Một User có thể có nhiều Role. Ưu tiên quyền lớn hơn → Gộp role."),
  bulletItemBold("Phân quyền chi tiết: ", "Không chỉ ở cấp module mà sâu đến từng hành động cụ thể trên từng màn hình. Ví dụ: trong module Báo giá, BAM được \"Tạo\", \"Sửa\" báo giá của mình nhưng không được \"Phê duyệt\" hay \"Xem báo giá BU khác\"."),
  bulletItemBold("Phân quyền đặc thù: ", "Cho phép gán quyền đặc biệt cho User cụ thể xử lý ngoại lệ."),
  bulletItemBold("Tree Map: ", "CDS cam kết cung cấp cây Tree Map phân quyền chi tiết cho NovaGroup review."),
  spacer(40),
  calloutBox("NOVA đặt đề bài: Trong 1 module (ngoài create, delete,...) thì sâu bên trong cũng có vài BAM không được thực hiện hành động nhỏ bên trong — hệ thống phải hỗ trợ. Hiện SAP đang làm được, có thể follow theo. CDS cần ghi lại trong tài liệu CHI TIẾT HƠN."),
  spacer(120),

  // ── 2.12 Yêu cầu khác ──
  subSectionTitle("2.12 Các yêu cầu bổ sung"),
  bulletItemBold("Bảng tích hợp phần mềm: ", "Cần mô tả cụ thể hơn các hệ thống tích hợp."),
  bulletItemBold("Ngôn ngữ tài liệu: ", "Tất cả tài liệu dành cho end user phải viết bằng tiếng Việt. Tài liệu BA cũng chủ yếu viết bằng tiếng Việt."),
  bulletItemBold("Lưu trữ dữ liệu: ", "Cần làm rõ phương thức lưu trữ (Link PDF? PDF? Inline?)."),
  bulletItemBold("Báo cáo: ", "Bổ sung ở mục báo cáo theo file tài liệu đã bổ sung từ NovaGroup."),
  bulletItemBold("Quy trình: ", "NovaGroup mong muốn được hỏi nhiều hơn về quy trình thực tế để tài liệu phản ánh đúng nghiệp vụ."),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 3. CÁC QUYẾT ĐỊNH CHÍNH
  // ══════════════════════════════════════════════════════════════
  sectionHeader("3. CÁC QUYẾT ĐỊNH CHÍNH"),
  spacer(100),

  createDataTable(
    ["STT", "Quyết định", "Nội dung chi tiết"],
    [
      ["1", "Tích hợp Sale Hub & Customer 360", "Nhất trí tích hợp chặt chẽ vào từng bước SOP — tạo không gian làm việc hợp nhất cho BAM."],
      ["2", "Logic chống trùng lặp Master ID", "Trùng SĐT (giai đoạn tiềm năng): CHỈ CẢNH BÁO, không chặn (trừ trùng với chính mình). Trùng CCCD/MST (giai đoạn giao dịch): CHẶN tạo Master ID."],
      ["3", "Ghi âm cuộc gọi cho AI", "Mục tiêu dài hạn BẮT BUỘC. Giải pháp SIP Call là ưu tiên nghiên cứu. Hệ thống sẵn sàng tiếp nhận và lưu trữ bản ghi."],
      ["4", "Phân quyền đa vai trò", "Hệ thống PHẢI hỗ trợ một người nhiều vai trò, phân quyền chi tiết đến từng hành động. CDS cung cấp Tree Map."],
      ["5", "Hoa hồng — Referral mở rộng", "Referral áp dụng ALL kênh giới thiệu, không chỉ Novator."],
      ["6", "Dashboard real-time", "Bắt buộc có dashboard ở MỌI module, mọi phân hệ."],
      ["7", "Tạm dừng họp hàng ngày", "CDS tập trung hoàn thiện bộ tài liệu chi tiết trước khi tiếp tục họp."],
    ],
    [600, 2800, 6238]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 4. PHÂN CÔNG CÔNG VIỆC (ACTION ITEMS)
  // ══════════════════════════════════════════════════════════════
  sectionHeader("4. PHÂN CÔNG CÔNG VIỆC (ACTION ITEMS)"),
  spacer(100),

  subSectionTitle("4.1 TienPhong CDS — Đội tư vấn & BA"),

  createDataTable(
    ["STT", "Hạng mục", "Chi tiết", "Deadline"],
    [
      ["1", "Hoàn thiện bộ tài liệu AS-IS, TO-BE, Blueprint", "Cập nhật và chi tiết hóa toàn bộ tài liệu cho Module 1, 2, 3 dựa trên phản hồi cuộc họp", "14-15/03/2026"],
      ["2", "Mô tả kịch bản chi tiết (Use Cases)", "Bổ sung use case cụ thể cho Master ID, phân bổ lead, các bước SOP", "14-15/03/2026"],
      ["3", "Chi tiết hóa ma trận phân quyền", "Xây dựng ma trận phân quyền chi tiết đến từng hành động trên từng chức năng + Tree Map", "14-15/03/2026"],
      ["4", "Bổ sung các yêu cầu còn thiếu", "Survey sau sự kiện, quản lý người đi cùng, sơ đồ tổ chức trực quan, loại hình hoa hồng mới, droplist TA/OTA/CTV", "14-15/03/2026"],
      ["5", "Sửa lại mục 2.1.2 (tạo KH)", "Viết lại logic chống trùng lặp phản ánh đúng thực tế, mô tả đầy đủ các case", "14-15/03/2026"],
      ["6", "Nghiên cứu giải pháp ghi âm", "SIP Call là ưu tiên. Nghiên cứu thêm khả năng ghi âm qua Zalo", "Tiếp tục"],
      ["7", "Viết tài liệu bằng tiếng Việt", "Toàn bộ tài liệu dành cho end user và BA phải viết bằng tiếng Việt", "14-15/03/2026"],
    ],
    [500, 2200, 4738, 2200]
  ),
  spacer(120),

  subSectionTitle("4.2 NovaGroup — Đội kinh doanh & các BU"),

  createDataTable(
    ["STT", "Hạng mục", "Chi tiết", "Deadline"],
    [
      ["1", "Review tài liệu chi tiết", "Xem xét kỹ lưỡng bộ tài liệu AS-IS, TO-BE, Blueprint khi nhận được", "Sau khi nhận tài liệu"],
      ["2", "Lấy ý kiến các BU", "Chia sẻ tài liệu và thu thập phản hồi từ tất cả BU liên quan", "Sau khi nhận tài liệu"],
      ["3", "Chuẩn bị phiên chuyên đề", "Sẵn sàng cho buổi làm việc chuyên sâu: (1) Master Data, (2) Cơ chế Hoa hồng / Giá / Khuyến mãi", "Sau khi review"],
      ["4", "Cung cấp chi tiết trạng thái báo giá", "Đưa rõ hơn các trạng thái: Book có tiền, Book không tiền, v.v.", "Khi review tài liệu"],
      ["5", "Feedback trực tiếp", "Nếu không thấy trong droplist hoặc có questions → liên hệ trực tiếp CDS", "Liên tục"],
    ],
    [500, 2400, 4538, 2200]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 5. MỐC THỜI GIAN QUAN TRỌNG
  // ══════════════════════════════════════════════════════════════
  sectionHeader("5. MỐC THỜI GIAN QUAN TRỌNG"),
  spacer(100),

  createDataTable(
    ["Mốc", "Thời gian", "Nội dung"],
    [
      ["Cuộc họp hiện tại", "13/03/2026 (Thứ Năm)", "Review AS-IS / TO-BE Module 1 — Nhận phản hồi chi tiết từ NOVA"],
      ["CDS gửi tài liệu hoàn chỉnh", "14-15/03/2026 (Thứ Bảy — Chủ Nhật)", "Gửi toàn bộ AS-IS, TO-BE và Blueprint chi tiết cho Module 1, 2, 3"],
      ["NOVA review & lấy ý kiến BU", "Sau khi nhận tài liệu", "Các BU review và gửi phản hồi"],
      ["Phiên chuyên đề tiếp theo", "Sau khi NOVA review xong", "Chủ đề: (1) Master Data, (2) Hoa hồng / Giá / Khuyến mãi"],
    ],
    [2800, 2800, 4038]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 6. GHI CHÚ BỔ SUNG
  // ══════════════════════════════════════════════════════════════
  sectionHeader("6. GHI CHÚ BỔ SUNG"),
  spacer(100),

  numberedItem("NovaGroup mong muốn CDS hỏi nhiều hơn về quy trình thực tế trước khi viết tài liệu, tránh mô tả sai nghiệp vụ."),
  numberedItem("Tài liệu BA chủ yếu viết bằng tiếng Việt — đây là yêu cầu xuyên suốt."),
  numberedItem("CDS cần tập trung thời gian hoàn thiện tài liệu thay vì họp hàng ngày — tạm dừng các cuộc họp daily cho đến khi gửi xong bộ tài liệu."),
  numberedItem("Khi viết use case cho Master ID, cần mô tả rõ từng case: trùng với mình, trùng với BAM khác, trùng mà chưa có Master ID, v.v."),
  numberedItem("Module Hoa hồng rất phức tạp — mỗi BU khác nhau có cơ chế khác nhau. Cần buổi làm việc chuyên đề riêng."),
  numberedItem("Giải pháp ghi âm cuộc gọi là bài toán dài hạn nhưng BẮT BUỘC phải giải quyết cho giai đoạn AI (Mục 3)."),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // KẾT THÚC
  // ══════════════════════════════════════════════════════════════
  sectionHeader("KẾT THÚC"),
  spacer(100),

  bodyParagraphMixed("Thời gian kết thúc: ", "Buổi chiều 13/03/2026"),
  bodyParagraphMixed("Người lập biên bản: ", "Đội tư vấn CDS"),
  bodyParagraphMixed("Cuộc họp tiếp theo: ", "Sau khi NovaGroup nhận và review xong bộ tài liệu chi tiết (dự kiến sau 14-15/03/2026)"),
  spacer(200),

  // Signature block
  signatureBlock(
    "ĐẠI DIỆN BÊN A",
    "NOVAGROUP",
    "ĐẠI DIỆN BÊN B",
    "TIENPHONG CDS"
  ),
];

// ══════════════════════════════════════════════════════════════
// GENERATE FILE
// ══════════════════════════════════════════════════════════════
const doc = createDocumentShell("NovaGroup x CDS — 13/03/2026", children);
const OUTPUT = path.join(__dirname, "Bien-Ban-Hop-CDS-Nova-2026-03-13.docx");

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT, buf);
  console.log(`✅ Đã tạo: ${OUTPUT}`);
  console.log(`📄 Kích thước: ${(buf.length / 1024).toFixed(1)} KB`);
}).catch(err => {
  console.error("❌ Lỗi:", err.message);
  process.exit(1);
});
