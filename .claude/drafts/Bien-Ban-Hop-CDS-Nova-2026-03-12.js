/**
 * BIÊN BẢN CUỘC HỌP - CDS x NOVA GROUP
 * Ngày: 12/03/2026
 * Chủ đề: Rà soát tài liệu nghiệp vụ Sale Hub, Master Data và quy trình bán hàng
 */

const {
  Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType,
  C, FONT, CONTENT_WIDTH, borders, noBorders, cellMargins,
  headerCell, bodyCell, labelCell,
  sectionHeader, subSectionTitle, bodyParagraph, bodyParagraphMixed,
  bulletItem, bulletItemBold, numberedItem, calloutBox, spacer,
  createInfoTable, createDataTable, signatureBlock, createDocumentShell
} = require("../skills/meeting-minutes/scripts/meeting-minutes-template.js");

const fs = require("fs");

// ══════════════════════════════════════════════════════════════
// BUILD DOCUMENT CONTENT
// ══════════════════════════════════════════════════════════════

const children = [
  // ── TITLE ──
  spacer(200),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: "BIÊN BẢN CUỘC HỌP", font: FONT, size: 36, bold: true, color: C.darkNavy })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "Rà soát tài liệu nghiệp vụ Sale Hub, Master Data\nvà quy trình bán hàng", font: FONT, size: 28, bold: true, color: C.darkNavy })]
  }),
  spacer(100),

  // ── THÔNG TIN CHUNG ──
  createInfoTable([
    ["Chủ đề", "Rà soát tài liệu nghiệp vụ Sale Hub, Master Data và quy trình bán hàng"],
    ["Ngày họp", "12/03/2026"],
    ["Địa điểm", "Họp trực tuyến / Văn phòng NOVA Group"],
    ["Bên tham dự", "Công ty Cổ phần Tiên Phong CDS (CDS) và NOVA Group (NOVA)"],
  ]),
  spacer(60),

  // Bảng thành viên tham dự
  subSectionTitle("Thành viên tham dự"),
  createDataTable(
    ["Bên", "Họ và tên", "Vai trò"],
    [
      ["NOVA Group", "Anh Khánh", "Đại diện phía NOVA Group"],
      ["NOVA Group", "Anh Duy", "Đại diện phía NOVA Group"],
      ["CDS", "Đại diện CDS", "Bên triển khai giải pháp"],
    ],
    [2400, 3600, 3638]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 1. MỤC ĐÍCH CUỘC HỌP
  // ══════════════════════════════════════════════════════════════
  sectionHeader("1. MỤC ĐÍCH CUỘC HỌP"),
  spacer(80),
  bodyParagraph("Cuộc họp được tổ chức nhằm các mục tiêu sau:"),
  bulletItem("Rà soát và đối chiếu tài liệu nghiệp vụ hiện tại với thông tin nghiệp vụ mà NOVA đã cung cấp trước đó."),
  bulletItem("Kiểm tra mức độ chi tiết và tính chính xác của tài liệu đối với các module thuộc phạm vi Sale Hub."),
  bulletItem("Thảo luận và thống nhất các yêu cầu nghiệp vụ liên quan đến quy trình bán hàng, quản lý khách hàng, kiến trúc Master Data, và các tính năng hệ thống."),
  bulletItem("Xác định các hạng mục cần bổ sung, chỉnh sửa và lên kế hoạch hoàn thiện tài liệu."),
  spacer(80),
  calloutBox("Yêu cầu quan trọng: Tài liệu nghiệp vụ cần phản ánh đúng hiện trạng và đủ chi tiết để NOVA có thể kiểm tra, đối soát và nghiệm thu."),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 2. NỘI DUNG THẢO LUẬN
  // ══════════════════════════════════════════════════════════════
  sectionHeader("2. NỘI DUNG THẢO LUẬN"),
  spacer(80),

  // 2.1
  subSectionTitle("2.1. Phản hồi về tài liệu nghiệp vụ hiện tại"),
  bulletItemBold("Phía NOVA (Anh Khánh): ", "Biên bản và tài liệu hiện tại chưa phản ánh đầy đủ và chưa khớp với các thông tin nghiệp vụ mà NOVA đã cung cấp trước đó."),
  bulletItemBold("Phía NOVA nhận xét: ", "Tài liệu hiện tại còn ở mức mô tả tổng quan, chưa đủ chi tiết để phản ánh đúng hiện trạng nghiệp vụ, dẫn đến khó khăn trong quá trình kiểm tra và nghiệm thu."),
  bulletItemBold("Phía CDS xác nhận: ", "Sẽ tiếp tục làm việc trong buổi chiều cùng ngày để rà soát các module thuộc phạm vi Sale Hub."),
  bulletItemBold("Thống nhất: ", "Hai bên cần rà soát và cập nhật lại nội dung chi tiết hơn trong tài liệu nghiệp vụ."),
  spacer(100),

  // 2.2
  subSectionTitle("2.2. Chuẩn hóa quy trình bán hàng (SOP)"),
  bodyParagraph("Hai bên thảo luận về việc kiểm tra và chuẩn hóa lại SOP bán hàng, đặc biệt chú ý các bước sau:"),
  bulletItemBold("Bước 3: ", "Cần rà soát lại nội dung và logic áp dụng cho từng kênh phân phối."),
  bulletItem("Cần làm rõ thời điểm và luồng dữ liệu khi khách hàng bắt đầu tương tác với ứng dụng. Mục tiêu là chuyển đổi người dùng thành định danh trong hệ sinh thái Nova.", 1),
  bulletItemBold("Bước 7 – Nhóm KOL/KOC: ", "Có nội dung chuyển đổi khách hàng thành KOC/KOL, bước này có liên quan đến hệ sinh thái eMarketing (eMar). Khách hàng sẽ tải ứng dụng Nova Membership để kết nối dữ liệu với hệ thống Marketing."),
  bulletItem("Cần thiết lập cơ chế kết nối và quản lý nhóm khách hàng đặc thù này, nhằm biến chính khách hàng thành những người truyền thông cho Tập đoàn.", 1),
  spacer(60),
  bodyParagraph("Các lưu ý bổ sung về SOP:"),
  bulletItem("Hệ thống SOP có khả năng tùy chỉnh số bước trong quy trình bán hàng. Tuy nhiên, cần rà soát lại logic áp dụng cho từng kênh phân phối."),
  bulletItemBold("Kênh Đại lý (TA): ", "Đang bị sai bước quy trình, cụ thể: Không có bước Xác nhận tồn kho (Inventory Confirmation)."),
  bulletItemBold("Nguyên tắc chung: ", "Tất cả các kênh bán hàng đều phải bắt đầu bằng bước Phân tích (Analysis Stage) theo logic chuẩn."),
  spacer(100),

  // 2.3
  subSectionTitle("2.3. Quy trình phân bổ Lead"),
  bulletItem("Quy trình phân bổ Lead hiện chưa được cập nhật theo đúng tài liệu nghiệp vụ đã bàn giao trước đó."),
  bulletItem("Cần đối chiếu lại tài liệu Lead Management với thực tế quy trình phân bổ Lead trong hệ thống."),
  spacer(100),

  // 2.4
  subSectionTitle("2.4. Chuẩn hóa thông tin định danh khách hàng"),
  bodyParagraph("Hệ thống cần có công cụ chuyển đổi và chuẩn hóa thông tin định danh giữa Căn cước công dân (CCCD) và Chứng minh nhân dân (CMND) để đảm bảo đồng nhất dữ liệu khách hàng."),
  spacer(60),
  bodyParagraphMixed("Giải pháp định danh số: ", "Thiết lập phương án gắn công cụ truy xuất, đối chiếu dữ liệu giữa giấy tờ cũ và Căn cước công dân mới thông qua API VNeID."),
  spacer(100),

  // 2.5
  subSectionTitle("2.5. Quản lý số điện thoại khách hàng"),
  bodyParagraph("Thực trạng:"),
  bulletItem("Một khách hàng có thể sở hữu nhiều số điện thoại khác nhau."),
  bulletItem("Trong hợp đồng bắt buộc phải xác định rõ số điện thoại chính (default contact number)."),
  spacer(60),
  bodyParagraphMixed("Giải pháp đề xuất từ CDS:", ""),
  bulletItem("Hệ thống cho phép một khách hàng có nhiều thông tin liên hệ (multiple contact points)."),
  bulletItem("Không xóa số điện thoại cũ, kể cả khi không còn sử dụng, nhằm bảo toàn lịch sử giao dịch đã phát sinh trước đó."),
  spacer(60),
  bodyParagraphMixed("Cơ chế chọn số điện thoại mặc định:", ""),
  bulletItem("Hệ thống sẽ tự động xác định số điện thoại mặc định dựa trên số liên hệ gần nhất."),
  bulletItem("Các giao dịch và thông tin tiếp theo sẽ được gắn với số điện thoại mặc định này."),
  spacer(100),

  // 2.6
  subSectionTitle("2.6. Kiến trúc Master Data khách hàng"),
  bodyParagraphMixed("Tình huống NOVA đưa ra:", ""),
  bulletItem("Khách hàng A mua sản phẩm CityGym bằng số điện thoại 1."),
  bulletItem("Cùng khách hàng A mua sản phẩm Nova Land bằng số điện thoại 2."),
  bulletItemBold("Câu hỏi: ", "Làm thế nào để đồng bộ dữ liệu này lên hệ thống eSales?"),
  spacer(60),
  bodyParagraphMixed("Giải thích từ CDS:", ""),
  bulletItem("Mỗi Master Customer Data có thể chứa nhiều Transaction Data thuộc các Business Unit khác nhau."),
  bulletItem("Master ID sẽ là định danh khách hàng cấp cao nhất."),
  bulletItem("Dữ liệu phát sinh tại từng Business Unit chỉ lưu ở tầng giao dịch (Transaction Layer)."),
  bulletItem("Khi cần tổng hợp, dữ liệu sẽ được tổng hợp (roll-up) về Master Data cấp trên."),
  bulletItem("Căn cước công dân (CCCD) / Chứng minh nhân dân (CMND) sẽ là dữ liệu cấp 2, đóng vai trò là dữ liệu dùng để ánh xạ (mapping) khách hàng."),
  spacer(60),
  bodyParagraphMixed("Yêu cầu đối với CDS:", ""),
  bulletItem("Cung cấp tài liệu kiến trúc dữ liệu Master Data chi tiết hơn."),
  bulletItem("Cung cấp bản mô tả chi tiết về cách khởi tạo, lưu trữ và đặc biệt là cơ chế ánh xạ (mapping) Master ID. Đảm bảo tính duy nhất và xuyên suốt của dữ liệu khách hàng trên toàn hệ thống, theo đúng các kịch bản (scenario) đã trao đổi."),
  bulletItem("Làm rõ cơ chế ánh xạ (mapping) dữ liệu khách hàng giữa các Business Unit."),
  bulletItem("Làm rõ cơ chế đồng bộ giữa Master Data và Transaction Data."),
  spacer(60),
  calloutBox("Hiện tại hai bên vẫn còn chưa thống nhất và còn nhiều điểm chưa rõ ràng về kiến trúc Master Data. Hai bên thống nhất tổ chức một buổi làm việc riêng vào ngày 16/03/2026 để phân tích chuyên sâu về Master Data."),
  spacer(100),

  // 2.7
  subSectionTitle("2.7. Chỉ số hiệu suất (KPI)"),
  bodyParagraph("Tài liệu hiện tại chưa đề cập KPI cho hai nhóm cộng tác viên:"),
  bulletItem("Cộng tác viên chuyên trách."),
  bulletItem("Cộng tác viên không chuyên trách."),
  spacer(60),
  bodyParagraph("Ngoài ra, cần làm rõ thêm:"),
  bulletItem("KPI cho vị trí BAM (Business Area Manager)."),
  bulletItem("Cơ chế phân bổ số lượng Lead (gieo hạt, thả thính,...). Logic phân bổ phần trăm này hiện không thay đổi so với quy trình hiện tại."),
  spacer(100),

  // 2.8
  subSectionTitle("2.8. Chính sách hoa hồng"),
  bulletItem("CDS cần gửi lại phương án hoa hồng để NOVA xem xét."),
  bulletItem("CDS lưu ý: Cần hiểu rõ cấu trúc sản phẩm và chính sách bán hàng của NOVA trước, vì mô hình hoa hồng khá phức tạp."),
  spacer(100),

  // 2.9
  subSectionTitle("2.9. Sale Hub – Phạm vi và thiết kế"),
  bodyParagraphMixed("Đề xuất của NOVA: ", "Tách Inventory ra khỏi Sale Hub."),
  bulletItemBold("Lý do: ", "Sale Hub là tài liệu hỗ trợ bán hàng (Sales Enablement), trong khi Inventory chỉ phát sinh khi có giao dịch bán hàng."),
  spacer(60),
  bodyParagraphMixed("Quan điểm CDS: ", "Sale Hub chỉ là tên module. Các thông tin sẽ được tập trung và tích hợp tại đây."),
  spacer(60),
  bodyParagraph("Đề xuất thiết kế giao diện từ NOVA: Sale Hub phía dưới có thể hiển thị Inventory."),
  spacer(60),
  bodyParagraph("NOVA cho biết trong tài liệu nghiệp vụ đã mô tả khá chi tiết logic mong muốn của hệ thống. CDS cần xem lại tài liệu này để đảm bảo thiết kế đúng yêu cầu."),
  spacer(60),
  bodyParagraphMixed("Ý kiến Anh Duy: ", "Trong quá trình bán hàng, cần phân tách rõ các line item theo từng hạng mục sản phẩm."),
  spacer(60),
  bodyParagraphMixed("Yêu cầu bổ sung về giao diện: ", "Cần bổ sung giao diện và luồng thông tin hiển thị dành cho nhân viên kinh doanh trên Sale Hub. Dữ liệu cần được đẩy ra giao diện người dùng (front-end) một cách trực quan để hỗ trợ hoạt động bán hàng. Hiện tại phần này chưa được thể hiện trong tài liệu."),
  spacer(100),

  // 2.10
  subSectionTitle("2.10. Quy trình giỏ hàng"),
  bodyParagraph("Luồng nghiệp vụ quy trình giỏ hàng được mô tả như sau:"),
  numberedItem("Khởi tạo giỏ hàng (Cart)."),
  numberedItem("Ghi nhận thông tin đặt chỗ (Booking)."),
  numberedItem("Chuyển giỏ hàng cho người có thẩm quyền phê duyệt."),
  numberedItem("Hệ thống giữ chỗ trong vòng 5 ngày."),
  numberedItem("Ghi nhận ngày đặt cọc."),
  numberedItem("Kiểm tra các giới hạn cấu hình."),
  numberedItem("Chuyển sang quy trình đặt chỗ chính thức (Booking)."),
  spacer(60),
  bodyParagraph("NOVA đã gửi lưu đồ quy trình này trước đó. CDS cần xem lại quy trình và điều chỉnh cho phù hợp với logic hệ thống."),
  spacer(60),
  bodyParagraphMixed("Yêu cầu bổ sung: ", "Cần cập nhật lại quy trình và kịch bản demo cho các giỏ hàng. Nội dung phải sát với nghiệp vụ thực tế (về loại hình sản phẩm, chính sách bán hàng) thay vì các bản demo dạng landing page như hiện tại."),
  spacer(100),

  // 2.11
  subSectionTitle("2.11. Quy tắc cấu trúc mã sản phẩm"),
  bulletItem("Không có công thức đặt tên bất động sản cố định."),
  bulletItem("Cho phép NOVA tự điều chỉnh quy tắc đặt mã sản phẩm."),
  bulletItem("Mã sản phẩm được đồng bộ từ hệ thống SAP."),
  bulletItem("Không phát sinh thêm logic tạo mã mới."),
  spacer(100),

  // 2.12
  subSectionTitle("2.12. Cơ chế khóa sản phẩm (Lock)"),
  bodyParagraph("Cơ chế khóa sản phẩm (Lock) phải tuân thủ chặt chẽ theo quy trình nghiệp vụ, cụ thể:"),
  bulletItem("Khi một sản phẩm đã bị khóa (Lock), người khác không thể thực hiện thao tác khóa tiếp trên sản phẩm đó."),
  bulletItem("Chỉ khi trạng thái khóa được giải phóng (Release) thì mới có thể thực hiện thao tác khóa lại."),
  spacer(100),

  // 2.13
  subSectionTitle("2.13. Bán chéo sản phẩm (Cross-selling)"),
  bulletItem("NOVA đã gửi file chuỗi sản phẩm (Product Chain)."),
  bulletItem("Hệ thống cần hiển thị lịch sản phẩm (Product Calendar) để hỗ trợ logic bán chéo sản phẩm."),
  spacer(100),

  // 2.14
  subSectionTitle("2.14. Quản lý phiếu ưu đãi (Voucher)"),
  bodyParagraphMixed("Đề xuất của Anh Duy: ", "Nhân viên bán hàng (Seller) cần xem được khách hàng đang có những phiếu ưu đãi (Voucher) nào."),
  spacer(60),
  bodyParagraph("Các vấn đề cần làm rõ về cơ chế sử dụng Voucher:"),
  bulletItem("Khi một nhân viên bán hàng chọn sử dụng Voucher, có cần khóa (Lock) Voucher đó không?"),
  bulletItem("Cơ chế tránh trùng lặp sử dụng Voucher giữa các nhân viên bán hàng?"),
  spacer(100),

  // 2.15
  subSectionTitle("2.15. Chuẩn hóa quy trình đặt hàng trong tài liệu"),
  bodyParagraph("Quy trình đặt hàng hiện tại trong tài liệu mới chỉ đang ở mức quy trình nghiệp vụ (Business Flow). Cần chuyển hóa thành quy trình thao tác trên hệ thống (System Workflow)."),
  spacer(60),
  bodyParagraphMixed("Kế hoạch CDS: ", "Sau ngày 15/03/2026, CDS sẽ thực hiện:"),
  bulletItem("Xác nhận hiện trạng nghiệp vụ (As-Is)."),
  bulletItem("Thiết kế quy trình nghiệp vụ tương lai (To-Be)."),
  bulletItem("Chuẩn bị phương án triển khai vận hành."),
  spacer(100),

  // 2.16
  subSectionTitle("2.16. Yêu cầu phát trực tuyến video (Video Streaming)"),
  bodyParagraphMixed("Yêu cầu từ NOVA (Anh Duy): ", "Hiện tại cơ chế video yêu cầu phải tải đủ dung lượng trước khi xem được. Yêu cầu chuyển sang cơ chế phát trực tuyến (Streaming) để người dùng có thể xem video ngay mà không cần tải toàn bộ dung lượng trước."),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 3. KẾ HOẠCH HOÀN THIỆN TÀI LIỆU
  // ══════════════════════════════════════════════════════════════
  sectionHeader("3. KẾ HOẠCH HOÀN THIỆN TÀI LIỆU"),
  spacer(80),
  bodyParagraph("CDS cam kết hoàn tất việc ánh xạ (mapping) và cập nhật tài liệu trong khoảng thời gian từ ngày 13/03/2026 đến ngày 15/03/2026."),
  spacer(60),
  bodyParagraph("Nội dung cần hoàn thiện bao gồm:"),
  bulletItem("Ánh xạ Master ID khách hàng với sản phẩm."),
  bulletItem("Cập nhật chi tiết các tài liệu nghiệp vụ theo phản hồi của NOVA."),
  bulletItem("Đảm bảo tài liệu đủ rõ ràng để NOVA có thể kiểm tra và nghiệm thu."),
  spacer(60),
  calloutBox("Yêu cầu từ NOVA: CDS cần hoàn thiện tài liệu bám sát vào các câu trả lời và tài liệu đã được cung cấp, đồng thời bắt đầu Phần 2 – Phân tích cho Module 1, 2, 3. Song song đó, tiếp tục triển khai các module tiếp theo."),
  spacer(60),
  bodyParagraph("CDS cần thực hiện:"),
  bulletItem("Cập nhật lại nội dung tài liệu chi tiết hơn, bám sát vào các câu trả lời và tài liệu nghiệp vụ đã được NOVA cung cấp."),
  bulletItem("Bắt đầu Phần 2 – Phân tích cho Module 1, Module 2 và Module 3."),
  bulletItem("Song song triển khai các module tiếp theo."),
  bulletItem("Phản ánh đúng logic nghiệp vụ của NOVA."),
  bulletItem("Đảm bảo tài liệu đủ rõ ràng để NOVA có thể kiểm tra và nghiệm thu."),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 4. CÁC QUYẾT ĐỊNH CHÍNH
  // ══════════════════════════════════════════════════════════════
  sectionHeader("4. CÁC QUYẾT ĐỊNH CHÍNH"),
  spacer(80),
  createDataTable(
    ["STT", "Quyết định", "Nội dung chi tiết"],
    [
      ["1", "Rà soát tài liệu nghiệp vụ", "Hai bên thống nhất cần rà soát và cập nhật lại nội dung tài liệu nghiệp vụ chi tiết hơn, phản ánh đúng hiện trạng nghiệp vụ của NOVA."],
      ["2", "Chuẩn hóa SOP bán hàng", "Kiểm tra và chuẩn hóa lại quy trình bán hàng (SOP), đặc biệt Bước 3 và Bước 7. Bổ sung bước Xác nhận tồn kho cho kênh Đại lý."],
      ["3", "Tổ chức buổi làm việc riêng về Master Data", "Hai bên tổ chức buổi làm việc chuyên sâu về kiến trúc Master Data vào ngày 16/03/2026."],
      ["4", "Cơ chế quản lý số điện thoại", "Áp dụng cơ chế cho phép nhiều số điện thoại, không xóa số cũ, tự động chọn số mặc định theo liên hệ gần nhất."],
      ["5", "Mã sản phẩm đồng bộ từ SAP", "Mã sản phẩm được đồng bộ từ hệ thống SAP, cho phép NOVA tự điều chỉnh quy tắc đặt mã, không tạo logic mã mới."],
      ["6", "Chuyển đổi Business Flow sang System Workflow", "Quy trình đặt hàng cần được chuyển từ mức mô tả nghiệp vụ sang mức thao tác trên hệ thống."],
      ["7", "Hỗ trợ phát trực tuyến video", "Chuyển cơ chế video từ tải toàn bộ sang phát trực tuyến (Streaming)."],
      ["8", "Định danh số qua API VNeID", "Thiết lập phương án truy xuất và đối chiếu dữ liệu giấy tờ cũ với Căn cước công dân mới thông qua API VNeID."],
      ["9", "Bắt đầu Phần 2 phân tích Module 1, 2, 3", "CDS hoàn thiện tài liệu bám sát tài liệu đã cung cấp, đồng thời bắt đầu phân tích cho Module 1, 2, 3 và triển khai song song các module tiếp."],
      ["10", "Bổ sung giao diện Sale Hub", "Bổ sung giao diện và luồng thông tin hiển thị trực quan trên front-end cho nhân viên kinh doanh trên Sale Hub."],
      ["11", "Cập nhật demo giỏ hàng sát nghiệp vụ", "Quy trình và kịch bản demo giỏ hàng phải sát với nghiệp vụ thực tế, không dùng dạng landing page."],
    ],
    [600, 2800, 6238]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 5. PHÂN CÔNG CÔNG VIỆC (ACTION ITEMS)
  // ══════════════════════════════════════════════════════════════
  sectionHeader("5. PHÂN CÔNG CÔNG VIỆC (ACTION ITEMS)"),
  spacer(80),

  subSectionTitle("5.1. Phía CDS"),
  createDataTable(
    ["STT", "Hạng mục", "Nội dung chi tiết", "Thời hạn"],
    [
      ["1", "Cập nhật tài liệu nghiệp vụ", "Rà soát, bổ sung chi tiết tài liệu nghiệp vụ Sale Hub, phản ánh đúng logic nghiệp vụ của NOVA.", "13 – 15/03/2026"],
      ["2", "Ánh xạ Master ID – Sản phẩm", "Hoàn tất việc ánh xạ Master ID khách hàng với sản phẩm trong tài liệu.", "13 – 15/03/2026"],
      ["3", "Tài liệu kiến trúc Master Data", "Cung cấp tài liệu kiến trúc dữ liệu Master Data chi tiết, bao gồm cơ chế ánh xạ giữa các Business Unit và cơ chế đồng bộ Master – Transaction.", "Trước 16/03/2026"],
      ["4", "Chuẩn hóa SOP bán hàng", "Kiểm tra và chuẩn hóa lại SOP, bổ sung bước Xác nhận tồn kho cho kênh Đại lý, rà soát logic từng kênh.", "13 – 15/03/2026"],
      ["5", "Đối chiếu quy trình Lead", "Đối chiếu tài liệu Lead Management với thực tế quy trình phân bổ Lead trong hệ thống.", "13 – 15/03/2026"],
      ["6", "Phương án hoa hồng", "Gửi lại phương án hoa hồng cho NOVA xem xét, trên cơ sở hiểu rõ cấu trúc sản phẩm và chính sách bán hàng.", "Theo thỏa thuận"],
      ["7", "Rà soát quy trình giỏ hàng", "Xem lại lưu đồ quy trình giỏ hàng đã được NOVA gửi và điều chỉnh cho phù hợp với logic hệ thống.", "13 – 15/03/2026"],
      ["8", "Thiết kế As-Is / To-Be", "Sau ngày 15/03: Xác nhận hiện trạng (As-Is), thiết kế quy trình tương lai (To-Be), chuẩn bị phương án triển khai vận hành.", "Sau 15/03/2026"],
      ["9", "Tích hợp API VNeID", "Thiết lập phương án gắn công cụ truy xuất, đối chiếu dữ liệu giữa giấy tờ cũ và Căn cước công dân mới thông qua API VNeID.", "Theo thỏa thuận"],
      ["10", "Mô tả chi tiết Master Data", "Cung cấp bản mô tả chi tiết về cách khởi tạo, lưu trữ và cơ chế ánh xạ Master ID, đảm bảo tính duy nhất và xuyên suốt trên toàn hệ thống.", "Trước 16/03/2026"],
      ["11", "Bổ sung giao diện Sale Hub", "Thiết kế giao diện và luồng thông tin hiển thị trực quan trên front-end cho nhân viên kinh doanh trên Sale Hub.", "Theo thỏa thuận"],
      ["12", "Cập nhật demo giỏ hàng", "Cập nhật lại quy trình và kịch bản demo giỏ hàng sát với nghiệp vụ thực tế (loại hình sản phẩm, chính sách bán hàng).", "Theo thỏa thuận"],
      ["13", "Phân tích Module 1, 2, 3", "Bắt đầu Phần 2 – Phân tích cho Module 1, Module 2 và Module 3. Song song triển khai các module tiếp theo.", "Theo kế hoạch"],
    ],
    [500, 2200, 5138, 1800]
  ),
  spacer(100),

  subSectionTitle("5.2. Phía NOVA"),
  createDataTable(
    ["STT", "Hạng mục", "Nội dung chi tiết", "Thời hạn"],
    [
      ["1", "Hỗ trợ cung cấp thông tin", "Hỗ trợ CDS trong quá trình rà soát, cung cấp bổ sung tài liệu nghiệp vụ khi cần.", "Liên tục"],
      ["2", "Cung cấp thông tin cấu trúc sản phẩm", "Cung cấp chi tiết cấu trúc sản phẩm và chính sách bán hàng để CDS xây dựng phương án hoa hồng.", "Theo thỏa thuận"],
      ["3", "Tham gia buổi làm việc Master Data", "Cử đại diện tham gia buổi làm việc chuyên sâu về kiến trúc Master Data vào ngày 16/03/2026.", "16/03/2026"],
    ],
    [500, 2400, 5038, 1700]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 6. MỐC THỜI GIAN QUAN TRỌNG
  // ══════════════════════════════════════════════════════════════
  sectionHeader("6. MỐC THỜI GIAN QUAN TRỌNG"),
  spacer(80),
  createDataTable(
    ["Mốc thời gian", "Nội dung"],
    [
      ["12/03/2026 (chiều)", "CDS tiếp tục rà soát các module thuộc phạm vi Sale Hub."],
      ["13/03 – 15/03/2026", "CDS hoàn tất ánh xạ (mapping) và cập nhật tài liệu nghiệp vụ chi tiết."],
      ["Trước 16/03/2026", "CDS cung cấp tài liệu kiến trúc dữ liệu Master Data."],
      ["16/03/2026", "Buổi làm việc riêng giữa hai bên để phân tích chuyên sâu về kiến trúc Master Data."],
      ["Sau 15/03/2026", "CDS xác nhận hiện trạng (As-Is), thiết kế quy trình tương lai (To-Be), chuẩn bị phương án triển khai vận hành."],
    ],
    [2800, 6838]
  ),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // 7. GHI CHÚ BỔ SUNG
  // ══════════════════════════════════════════════════════════════
  sectionHeader("7. GHI CHÚ BỔ SUNG"),
  spacer(80),
  numberedItem("Hệ thống cần có công cụ chuyển đổi và chuẩn hóa thông tin định danh giữa Căn cước công dân (CCCD) và Chứng minh nhân dân (CMND), bao gồm tích hợp API VNeID để truy xuất và đối chiếu dữ liệu."),
  numberedItem("Cơ chế khóa sản phẩm (Lock) phải tuân thủ nguyên tắc: sản phẩm đã bị khóa thì không thể khóa tiếp, chỉ khi được giải phóng mới có thể khóa lại."),
  numberedItem("Hệ thống cần hiển thị lịch sản phẩm (Product Calendar) để hỗ trợ bán chéo sản phẩm (Cross-selling), dựa trên file chuỗi sản phẩm mà NOVA đã gửi."),
  numberedItem("Cần xây dựng cơ chế quản lý và khóa (Lock) Voucher khi nhân viên bán hàng sử dụng, đồng thời tránh trùng lặp sử dụng Voucher giữa các nhân viên."),
  numberedItem("Trong quy trình bán hàng, cần phân tách rõ các mục sản phẩm (line item) theo từng hạng mục."),
  numberedItem("Quy trình đặt hàng cần được chuyển từ mức mô tả nghiệp vụ (Business Flow) sang mức thao tác trên hệ thống (System Workflow)."),
  numberedItem("Video cần hỗ trợ cơ chế phát trực tuyến (Streaming) thay vì yêu cầu tải toàn bộ dung lượng trước khi xem."),
  numberedItem("NOVA đã gửi lưu đồ quy trình giỏ hàng và file chuỗi sản phẩm (Product Chain) trước đó, CDS cần tham khảo trong quá trình rà soát."),
  numberedItem("Bước 3 SOP: Cần làm rõ thời điểm và luồng dữ liệu khi khách hàng tương tác ứng dụng, với mục tiêu chuyển đổi người dùng thành định danh trong hệ sinh thái Nova."),
  numberedItem("Bước 7 SOP – Nhóm KOL/KOC: Cần thiết lập cơ chế kết nối và quản lý nhóm khách hàng đặc thù, biến khách hàng thành người truyền thông cho Tập đoàn."),
  numberedItem("Quản trị Master Data: Cần bản mô tả chi tiết về cách khởi tạo, lưu trữ và cơ chế ánh xạ Master ID, đảm bảo tính duy nhất và xuyên suốt trên toàn hệ thống theo các kịch bản đã trao đổi."),
  numberedItem("Sale Hub: Cần bổ sung giao diện và luồng thông tin hiển thị trực quan trên front-end cho nhân viên kinh doanh. Phần này hiện chưa được thể hiện trong tài liệu."),
  numberedItem("Giỏ hàng: Quy trình và kịch bản demo cần sát với nghiệp vụ thực tế (loại hình sản phẩm, chính sách bán hàng), không dùng dạng landing page."),
  numberedItem("CDS cần hoàn thiện tài liệu bám sát các câu trả lời và tài liệu đã cung cấp, bắt đầu Phần 2 phân tích cho Module 1, 2, 3, song song triển khai các module tiếp theo."),
  spacer(200),

  // ══════════════════════════════════════════════════════════════
  // KẾT THÚC
  // ══════════════════════════════════════════════════════════════
  sectionHeader("KẾT THÚC"),
  spacer(80),
  bodyParagraph("Cuộc họp kết thúc với sự đồng thuận của hai bên về các nội dung đã thảo luận và phân công công việc nêu trên."),
  spacer(60),
  bodyParagraphMixed("Cuộc họp tiếp theo: ", "Ngày 16/03/2026 – Phân tích chuyên sâu về kiến trúc Master Data."),
  spacer(200),

  // ── SIGNATURE ──
  signatureBlock(
    "ĐẠI DIỆN PHÍA NOVA GROUP",
    "NOVA Group",
    "ĐẠI DIỆN PHÍA CDS",
    "Công ty Cổ phần Tiên Phong CDS"
  ),
  spacer(100),

  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200 },
    children: [new TextRun({ text: "Ngày lập biên bản: 12/03/2026", font: FONT, size: 20, italics: true, color: C.midGray })]
  }),
];

// ══════════════════════════════════════════════════════════════
// GENERATE DOCX
// ══════════════════════════════════════════════════════════════
const doc = createDocumentShell("CDS x NOVA GROUP – 12/03/2026", children);

const OUTPUT = __dirname + "/Bien-Ban-Hop-CDS-Nova-2026-03-12.docx";

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`✅ Đã tạo: ${OUTPUT}`);
  console.log(`📄 Kích thước: ${(buffer.length / 1024).toFixed(1)} KB`);
}).catch(err => {
  console.error("❌ Lỗi:", err);
  process.exit(1);
});
