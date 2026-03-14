const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, LevelFormat, TabStopType, TabStopPosition
} = require("docx");

// Brand colors
const GREEN = "2E7D32";
const RED = "C62828";
const DARK = "212121";
const LIGHT_GREEN = "E8F5E9";
const LIGHT_RED = "FFEBEE";
const LIGHT_GRAY = "F5F5F5";
const WHITE = "FFFFFF";
const GRAY_BORDER = "BDBDBD";

const border = { style: BorderStyle.SINGLE, size: 1, color: GRAY_BORDER };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorders = {
  top: { style: BorderStyle.NONE, size: 0 },
  bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
};
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

// Page dimensions (A4)
const PAGE_WIDTH = 11906;
const MARGIN_LEFT = 1440;
const MARGIN_RIGHT = 1440;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT; // 9026

function headerCell(text, width, colspan) {
  const opts = {
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: GREEN, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text, bold: true, color: WHITE, font: "Arial", size: 20 })] })],
  };
  if (colspan) opts.columnSpan = colspan;
  return new TableCell(opts);
}

function dataCell(text, width, opts = {}) {
  const { bold, color, align, fill, colspan } = opts;
  const cellOpts = {
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({
      alignment: align || AlignmentType.LEFT,
      children: [new TextRun({ text, bold: !!bold, color: color || DARK, font: "Arial", size: 18 })]
    })],
  };
  if (fill) cellOpts.shading = { fill, type: ShadingType.CLEAR };
  if (colspan) cellOpts.columnSpan = colspan;
  return new TableCell(cellOpts);
}

function progressCell(percent, width) {
  let color = GREEN;
  let fill = LIGHT_GREEN;
  if (percent === 0) { color = RED; fill = LIGHT_RED; }
  else if (percent < 80) { color = "E65100"; fill = "FFF3E0"; }
  return dataCell(`${percent}%`, width, { bold: true, color, align: AlignmentType.CENTER, fill });
}

function statusCell(status, width) {
  let color = GREEN;
  let fill = LIGHT_GREEN;
  if (status === "Hoàn thành") { color = GREEN; fill = LIGHT_GREEN; }
  else if (status.includes("Đang")) { color = "E65100"; fill = "FFF3E0"; }
  else { color = RED; fill = LIGHT_RED; }
  return dataCell(status, width, { bold: true, color, align: AlignmentType.CENTER, fill });
}

function sectionTitle(text, level) {
  return new Paragraph({
    heading: level || HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 200 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: level === HeadingLevel.HEADING_2 ? 26 : 30, color: level === HeadingLevel.HEADING_2 ? RED : GREEN })]
  });
}

function subTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 22, color: DARK })]
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: opts.indent ? { left: 360 } : undefined,
    children: [new TextRun({ text, font: "Arial", size: 20, color: DARK, bold: opts.bold, italics: opts.italic })]
  });
}

function emptyLine() {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [] });
}

// ============== BUILD DOCUMENT ==============

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: GREEN },
        paragraph: { spacing: { before: 300, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: RED },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers2", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [
    // ==================== TRANG BÌA ====================
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: [
        emptyLine(), emptyLine(), emptyLine(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
          new TextRun({ text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", bold: true, font: "Arial", size: 24, color: DARK })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
          new TextRun({ text: "Độc lập - Tự do - Hạnh phúc", bold: true, font: "Arial", size: 22, color: DARK })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN, space: 1 } }, children: [] }),
        emptyLine(), emptyLine(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
          new TextRun({ text: "TIÊN PHONG CDS", bold: true, font: "Arial", size: 28, color: GREEN })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [
          new TextRun({ text: "HIỆP HỘI VĂN HÓA ẨM THỰC VIỆT NAM", bold: true, font: "Arial", size: 22, color: RED })
        ]}),
        emptyLine(), emptyLine(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
          new TextRun({ text: "BÁO CÁO TIẾN ĐỘ CÔNG VIỆC", bold: true, font: "Arial", size: 36, color: GREEN })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
          new TextRun({ text: "DỰA THEO LỘ TRÌNH CÔNG VIỆC", bold: true, font: "Arial", size: 32, color: RED })
        ]}),
        emptyLine(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
          new TextRun({ text: "Dự án: Xây dựng Nền tảng Bản Đồ Ẩm Thực Việt Nam", font: "Arial", size: 24, color: DARK })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
          new TextRun({ text: "(Vietnam's Food Map)", italics: true, font: "Arial", size: 22, color: DARK })
        ]}),
        emptyLine(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: GRAY_BORDER, space: 1 } }, children: [] }),
        emptyLine(),
        // Info table
        new Table({
          width: { size: 6000, type: WidthType.DXA },
          columnWidths: [2600, 3400],
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2600, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Căn cứ pháp lý:", bold: true, font: "Arial", size: 20, color: DARK })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3400, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Hợp đồng số 02/2025/VCCA-CDS", font: "Arial", size: 20, color: DARK })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2600, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [] })] }),
              new TableCell({ borders: noBorders, width: { size: 3400, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Biên bản ghi nhớ số 01/2025/VCCA-CDS", font: "Arial", size: 20, color: DARK })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2600, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Quản lý dự án:", bold: true, font: "Arial", size: 20, color: DARK })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3400, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Thái Hoàng Mai Học", font: "Arial", size: 20, color: DARK })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2600, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Đơn vị thực hiện:", bold: true, font: "Arial", size: 20, color: DARK })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3400, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Công ty Cổ phần Tiên Phong CDS", font: "Arial", size: 20, color: DARK })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2600, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Đơn vị đối tác:", bold: true, font: "Arial", size: 20, color: DARK })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3400, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Hiệp hội Văn hóa Ẩm thực Việt Nam (VCCA)", font: "Arial", size: 20, color: DARK })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2600, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "Ngày báo cáo:", bold: true, font: "Arial", size: 20, color: DARK })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3400, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "12/03/2026", font: "Arial", size: 20, color: DARK })] })] }),
            ]}),
          ]
        }),
        emptyLine(), emptyLine(),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "Thành phố Hồ Chí Minh, tháng 03 năm 2026", italics: true, font: "Arial", size: 22, color: DARK })
        ]}),
      ]
    },

    // ==================== NỘI DUNG CHÍNH ====================
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1200, bottom: 1440, left: 1200 }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              spacing: { after: 120 },
              border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: GREEN, space: 4 } },
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              children: [
                new TextRun({ text: "TIÊN PHONG CDS", bold: true, font: "Arial", size: 16, color: GREEN }),
                new TextRun({ text: "\tHIỆP HỘI VĂN HÓA ẨM THỰC VIỆT NAM", bold: true, font: "Arial", size: 16, color: RED }),
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 1, color: GRAY_BORDER, space: 4 } },
              children: [
                new TextRun({ text: "Báo cáo tiến độ dự án Vietnam's Food Map  |  Trang ", font: "Arial", size: 16, color: "757575" }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "757575" }),
              ]
            })
          ]
        })
      },
      children: [
        // ===== I. TỔNG QUAN DỰ ÁN =====
        sectionTitle("I. TỔNG QUAN DỰ ÁN"),
        bodyText("Dự án Vietnam's Food Map được triển khai từ ngày 01/03/2025 với mục tiêu xây dựng nền tảng bản đồ ẩm thực Việt Nam, kết nối văn hóa ẩm thực với du lịch và phát triển kinh tế."),
        emptyLine(),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
          new TextRun({ text: "Các bên liên quan: ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "Tiên Phong CDS (đơn vị triển khai công nghệ), VCCA (đơn vị chủ đề án), Vietravel (đối tác chiến lược)", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
          new TextRun({ text: "Mô hình vận hành: ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "BOT - chi phí ban đầu 10-20%, phần còn lại thu hồi theo cơ chế chia sẻ doanh thu sau khi trừ chi phí vận hành và marketing trong vòng 3 năm (có thể gia hạn thêm 1 năm)", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
          new TextRun({ text: "Lộ trình: ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "4 giai đoạn: Setup nền tảng → Xây dựng cộng đồng → Mở rộng hệ sinh thái → Hoàn thiện hệ thống", font: "Arial", size: 20 }),
        ]}),

        // ===== BẢNG TỔNG KẾT NHANH =====
        emptyLine(),
        subTitle("Tổng quan tiến độ theo giai đoạn"),
        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [600, 3200, 1200, 4506],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 600),
              headerCell("Giai đoạn", 3200),
              headerCell("Tiến độ", 1200),
              headerCell("Trạng thái", 4506),
            ]}),
            new TableRow({ children: [
              dataCell("1", 600, { align: AlignmentType.CENTER }),
              dataCell("Setup Nền Tảng", 3200, { bold: true }),
              progressCell(100, 1200),
              statusCell("Hoàn thành", 4506),
            ]}),
            new TableRow({ children: [
              dataCell("2", 600, { align: AlignmentType.CENTER }),
              dataCell("Xây Dựng Cộng Đồng", 3200, { bold: true }),
              dataCell("~70%", 1200, { bold: true, color: "E65100", align: AlignmentType.CENTER, fill: "FFF3E0" }),
              statusCell("Đang triển khai", 4506),
            ]}),
            new TableRow({ children: [
              dataCell("3", 600, { align: AlignmentType.CENTER }),
              dataCell("Mở Rộng Hệ Sinh Thái", 3200, { bold: true }),
              progressCell(0, 1200),
              statusCell("Chưa triển khai", 4506),
            ]}),
            new TableRow({ children: [
              dataCell("4", 600, { align: AlignmentType.CENTER }),
              dataCell("Hoàn Thiện Hệ Thống", 3200, { bold: true }),
              progressCell(0, 1200),
              statusCell("Chưa triển khai", 4506),
            ]}),
          ]
        }),

        // ===== II. GIAI ĐOẠN 1 =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("II. GIAI ĐOẠN 1: SETUP NỀN TẢNG"),
        new Paragraph({ spacing: { after: 120 }, children: [
          new TextRun({ text: "Tiến độ tổng: ", bold: true, font: "Arial", size: 22, color: DARK }),
          new TextRun({ text: "100% - ĐÃ HOÀN THÀNH", bold: true, font: "Arial", size: 22, color: GREEN }),
        ]}),
        bodyText("Mục tiêu: Thiết lập nền tảng kỹ thuật và nội dung cơ bản cho dự án Vietnamfoodmap.", { italic: true }),
        bodyText("Giai đoạn 1 đã được nghiệm thu theo Biên bản nghiệm thu ký ngày 25/03/2025.", { bold: true }),
        emptyLine(),

        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 2200, 2506, 2100, 1200, 1000],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Hạng mục", 2200),
              headerCell("Mô tả", 2506),
              headerCell("Thời gian", 2100),
              headerCell("Tiến độ", 1200),
              headerCell("Trạng thái", 1000),
            ]}),
            ...[
              ["1", "Xây dựng Vietnam's Food Map & Food Guide", "Tạo bản đồ ẩm thực và hướng dẫn ẩm thực. Đã bàn giao nền tảng Web/App/Admin", "01/2025 - 02/2025 (45 ngày)", 100, "Hoàn thành"],
              ["2", "Quyền lợi nhà tài trợ", "Xác định và triển khai quyền lợi nhà tài trợ. Gắn banner lên các trang", "01/03 - 10/03/2025 (10 ngày)", 100, "Hoàn thành"],
              ["3", "Hệ thống tin tức & Quản lý sự kiện", "Xây dựng hệ thống quản lý tin tức và sự kiện ẩm thực", "28/02 - 05/03/2025 (6 ngày)", 100, "Hoàn thành"],
              ["4", "Kiểm thử hệ thống & Tối ưu hiệu suất", "Kiểm tra và cải thiện hiệu suất hệ thống", "05/03 - 08/03/2025 (4 ngày)", 100, "Hoàn thành"],
              ["5", "Chuẩn bị dữ liệu & Triển khai nội dung", "Thu thập dữ liệu và triển khai nội dung lên hệ thống", "08/03 - 13/03/2025 (6 ngày)", 100, "Hoàn thành"],
              ["6", "Deploy & Đào tạo sử dụng hệ thống", "Triển khai hệ thống chính thức và đào tạo người dùng", "14/03 - 28/03/2025 (15 ngày)", 100, "Hoàn thành"],
              ["7", "Tổng kết & Kế hoạch Launching", "Đánh giá kết quả Giai đoạn 1 và chuẩn bị cho launching", "28/03/2025 (1 ngày)", 100, "Hoàn thành"],
            ].map(([stt, name, desc, time, pct, status]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 2200, { bold: true }),
              dataCell(desc, 2506),
              dataCell(time, 2100, { align: AlignmentType.CENTER }),
              progressCell(pct, 1200),
              statusCell(status, 1000),
            ]}))
          ]
        }),

        // ===== III. GIAI ĐOẠN 2 =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("III. GIAI ĐOẠN 2: XÂY DỰNG CỘNG ĐỒNG"),
        new Paragraph({ spacing: { after: 120 }, children: [
          new TextRun({ text: "Tiến độ tổng: ", bold: true, font: "Arial", size: 22, color: DARK }),
          new TextRun({ text: "~70% - ĐANG TRIỂN KHAI", bold: true, font: "Arial", size: 22, color: "E65100" }),
        ]}),
        bodyText("Mục tiêu: Thiết lập cộng đồng ẩm thực, chuẩn hóa dữ liệu, và ứng dụng công nghệ AI để nâng cao trải nghiệm người dùng.", { italic: true }),
        emptyLine(),

        // A. ĐÃ HOÀN THÀNH
        sectionTitle("A. Các hạng mục đã hoàn thành", HeadingLevel.HEADING_2),
        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 2200, 3606, 2000, 1200],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Hạng mục", 2200),
              headerCell("Mô tả", 3606),
              headerCell("Thời gian", 2000),
              headerCell("Tiến độ", 1200),
            ]}),
            ...[
              ["1", "Thiết lập nền tảng & Chuẩn hóa tiêu chuẩn", "Đã thiết kế Trang chủ, Chức năng định chuẩn, Chức năng đánh giá chuyên gia", "29/03 - 13/04/2025 (16 ngày)", 100],
              ["2", "Hoàn thiện CMS nội bộ", "Quản lý toàn diện: Món ăn, Nghệ nhân, Nhà hàng, Phiếu đề xuất, Bài viết, Tin tức/Sự kiện, Video", "Hoàn thành 08/09/2025", 100],
              ["3", "Phát triển Bản đồ ẩm thực nâng cao", "Đã xây dựng bản đồ nâng cao, chỉnh sửa giao diện theo bố cục mới, bổ sung hiệu ứng sinh động, cấu hình theo 34 tỉnh thành", "17/07 - 15/08/2025 (26 ngày)", 100],
            ].map(([stt, name, desc, time, pct]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 2200, { bold: true }),
              dataCell(desc, 3606),
              dataCell(time, 2000, { align: AlignmentType.CENTER }),
              progressCell(pct, 1200),
            ]}))
          ]
        }),

        // B. ĐANG TRIỂN KHAI
        emptyLine(),
        sectionTitle("B. Các hạng mục đang triển khai", HeadingLevel.HEADING_2),
        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 1800, 2206, 1500, 900, 2600],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Hạng mục", 1800),
              headerCell("Mô tả", 2206),
              headerCell("Thời gian", 1500),
              headerCell("Tiến độ", 900),
              headerCell("Tồn đọng", 2600),
            ]}),
            ...[
              ["1", "Triển khai form nhập thông tin nhà hàng/quán ăn", "Đã có Form nhập liệu làng nghề/nhà hàng. Đang triển khai Hạng mục đề cử", "04/2025 - 12/2025", 80, "Hạng mục đề cử theo cấp bậc: Cá nhân, cấp huyện, cấp tỉnh, thành phố trung ương, Unesco, Toàn cầu"],
              ["2", "Tích hợp dữ liệu địa điểm", "Đã thiết kế bản đồ, danh sách địa điểm nổi bật. Cần hoàn thiện dữ liệu nghệ nhân đề xuất", "09/2025 - 12/2025", 80, "Màn hình danh sách địa điểm được nghệ nhân đề xuất"],
              ["3", "Ứng dụng AI phân tích", "Đã có AI đánh giá nguyên liệu. Đang triển khai AI kiểm tra chính tả, đạo văn và cảnh báo trùng lặp", "07/2025 - 12/2025", 70, "Đánh giá tính đúng sai, chính tả. Đánh giá chỉ định/chống chỉ định. Cảnh báo trùng lặp, đạo văn"],
              ["4", "ReviewHub", "Đã xây dựng khung đăng ký, tải lên video. Đang làm bộ lọc, Thumbnail, Gợi ý video", "08/2025 - 12/2025", 50, "Bộ lọc Nổi bật, Gợi ý video, Thumbnail cho video"],
              ["5", "Nghệ nhân", "Đã xây dựng danh sách nghệ nhân, câu chuyện, hình ảnh, video biểu diễn. Đang làm tính năng đặt lịch", "09/2025 - 10/2025", 80, "Tính năng đặt lịch nghệ nhân (Booking)"],
            ].map(([stt, name, desc, time, pct, backlog]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 1800, { bold: true }),
              dataCell(desc, 2206),
              dataCell(time, 1500, { align: AlignmentType.CENTER }),
              progressCell(pct, 900),
              dataCell(backlog, 2600),
            ]}))
          ]
        }),

        // C. CHƯA BẮT ĐẦU
        emptyLine(),
        sectionTitle("C. Các hạng mục chưa bắt đầu", HeadingLevel.HEADING_2),
        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 2800, 3006, 2000, 1200],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Hạng mục", 2800),
              headerCell("Mô tả", 3006),
              headerCell("Thời gian dự kiến", 2000),
              headerCell("Tiến độ", 1200),
            ]}),
            ...[
              ["1", "Điều chỉnh thiết kế theo layout mới", "Điều chỉnh lại thiết kế theo thống nhất layout giữa các bên", "20/12/2025 - 10/01/2026", 0],
              ["2", "Kiểm thử, tối ưu & Triển khai chính thức", "Kiểm tra và triển khai hệ thống cộng đồng", "30/12/2025 - 07/01/2026", 0],
              ["3", "Tổng kết & Kế hoạch Launching Giai đoạn 2", "Tổng kết Giai đoạn 2 và chuẩn bị launching", "07/01/2026 - 12/01/2026", 0],
            ].map(([stt, name, desc, time, pct]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 2800, { bold: true }),
              dataCell(desc, 3006),
              dataCell(time, 2000, { align: AlignmentType.CENTER }),
              progressCell(pct, 1200),
            ]}))
          ]
        }),

        // D. TỒN ĐỌNG
        emptyLine(),
        sectionTitle("D. Các hạng mục tồn đọng (thuộc phạm vi hợp đồng)", HeadingLevel.HEADING_2),
        bodyText("Các hạng mục dưới đây thuộc phạm vi Giai đoạn 2 trong Hợp đồng nhưng chưa được triển khai:", { italic: true }),
        emptyLine(),
        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 2800, 4006, 2200],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Phân hệ", 2800),
              headerCell("Mô tả", 4006),
              headerCell("Tình trạng", 2200),
            ]}),
            ...[
              ["1", "Marketplace (Sàn giao dịch)", "Đang lên kế hoạch. Đây là tính năng tạo doanh thu quan trọng", "Chưa triển khai"],
              ["2", "Culinary Showcase (Biểu diễn ẩm thực)", "Đang lên kế hoạch. Tính năng đặt lịch nghệ nhân chưa có", "Chưa triển khai"],
              ["3", "Module Nhà tài trợ & Vinh danh (Nâng cao)", "Chưa triển khai khu vực vinh danh chi tiết theo Phụ lục 01", "Chưa triển khai"],
              ["4", "Hệ thống quản lý Chứng nhận", "Đang lên kế hoạch. Kênh thông tin chính sách, chứng nhận ngành chưa hoàn thiện", "Chưa triển khai"],
            ].map(([stt, name, desc, status]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 2800, { bold: true }),
              dataCell(desc, 4006),
              statusCell(status, 2200),
            ]}))
          ]
        }),

        // ===== IV. GIAI ĐOẠN 3 =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("IV. GIAI ĐOẠN 3: MỞ RỘNG HỆ SINH THÁI"),
        new Paragraph({ spacing: { after: 120 }, children: [
          new TextRun({ text: "Tiến độ tổng: ", bold: true, font: "Arial", size: 22, color: DARK }),
          new TextRun({ text: "0% - CHƯA TRIỂN KHAI", bold: true, font: "Arial", size: 22, color: RED }),
        ]}),
        bodyText("Mục tiêu: Phát triển hệ sinh thái ẩm thực, bao gồm bảo tàng, mạng lưới F&B, và hỗ trợ khởi nghiệp.", { italic: true }),
        bodyText("Kế hoạch ban đầu: 12/01/2026 - 19/02/2026. Trạng thái: Chưa triển khai do Giai đoạn 2 chưa hoàn thành."),
        emptyLine(),

        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 3000, 3006, 2000, 1000],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Hạng mục", 3000),
              headerCell("Mô tả", 3006),
              headerCell("Thời gian dự kiến", 2000),
              headerCell("Tiến độ", 1000),
            ]}),
            ...[
              ["1", "Khởi động & Xây dựng Bảo tàng Ẩm thực", "Lên kế hoạch và xây dựng bảo tàng ẩm thực Việt Nam số hóa hiện đại", "12/01 - 22/01/2026", 0],
              ["2", "Hợp tác kinh doanh & Mở rộng mạng lưới F&B", "Thiết lập quan hệ đối tác trong ngành thực phẩm và đồ uống", "12/01 - 22/01/2026", 0],
              ["3", "Hỗ trợ đầu tư & Khởi nghiệp ngành ẩm thực", "Cung cấp hỗ trợ cho các dự án khởi nghiệp ẩm thực", "23/01 - 02/02/2026", 0],
              ["4", "Liên kết ứng dụng & Tối ưu hệ sinh thái", "Tích hợp các ứng dụng và tối ưu hóa hệ sinh thái", "03/02 - 17/02/2026", 0],
              ["5", "Kiểm thử tổng thể & Chuẩn bị launching", "Kiểm tra toàn bộ hệ thống và chuẩn bị ra mắt", "18/02/2026", 0],
              ["6", "Tổng kết & Kế hoạch Launching", "Đánh giá Giai đoạn 3 và lập kế hoạch ra mắt", "18/02 - 19/02/2026", 0],
            ].map(([stt, name, desc, time, pct]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 3000, { bold: true }),
              dataCell(desc, 3006),
              dataCell(time, 2000, { align: AlignmentType.CENTER }),
              progressCell(pct, 1000),
            ]}))
          ]
        }),

        emptyLine(),
        subTitle("Các phân hệ chi tiết dự kiến trong Giai đoạn 3"),
        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 2800, 4006, 2200],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Phân hệ", 2800),
              headerCell("Mô tả chi tiết", 4006),
              headerCell("Tình trạng", 2200),
            ]}),
            ...[
              ["1", "Đầu tư & Khởi nghiệp", "Nền tảng kết nối nhà đầu tư và các dự án khởi nghiệp ẩm thực. Giúp startup thu hút vốn và sự chú ý"],
              ["2", "Chuyện nghệ nhân", "Không gian tôn vinh nghệ nhân ẩm thực tài năng, giới thiệu câu chuyện, hành trình sáng tạo"],
              ["3", "Hợp tác kinh doanh", "Kết nối B2B: từ nông dân, nhà cung cấp nguyên liệu đến nhà hàng, chuỗi bán lẻ"],
              ["4", "Liên kết hợp tác", "Kết nối ngành ẩm thực với Nông nghiệp, Du lịch và Giáo dục"],
              ["5", "Liên kết ứng dụng", "Tích hợp API với ứng dụng đặt món, giao hàng và mạng xã hội"],
              ["6", "Thị trường ẩm thực", "Kiến thức và công cụ hỗ trợ kinh doanh ẩm thực cho doanh nghiệp"],
              ["7", "Bảo tàng ẩm thực Việt Nam", "Bảo tàng số hóa hiện đại, lưu trữ bộ sưu tập món ăn và văn hóa ẩm thực qua các thời kỳ"],
              ["8", "Dự án đang triển khai", "Hệ thống quản lý dự án: Kết nối, hỗ trợ, cập nhật tiến độ trong hệ sinh thái"],
            ].map(([stt, name, desc]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 2800, { bold: true }),
              dataCell(desc, 4006),
              statusCell("Chưa triển khai", 2200),
            ]}))
          ]
        }),

        // ===== V. GIAI ĐOẠN 4 =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("V. GIAI ĐOẠN 4: HOÀN THIỆN HỆ THỐNG"),
        new Paragraph({ spacing: { after: 120 }, children: [
          new TextRun({ text: "Tiến độ tổng: ", bold: true, font: "Arial", size: 22, color: DARK }),
          new TextRun({ text: "0% - CHƯA TRIỂN KHAI", bold: true, font: "Arial", size: 22, color: RED }),
        ]}),
        bodyText("Mục tiêu: Hoàn thiện toàn bộ hệ thống, tổ chức sự kiện ra mắt, và định hướng mở rộng.", { italic: true }),
        bodyText("Kế hoạch ban đầu: 20/02/2026 - 12/03/2026. Trạng thái: Chưa triển khai do các giai đoạn trước chưa hoàn thành."),
        emptyLine(),

        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 3500, 3006, 1500, 1000],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Hạng mục", 3500),
              headerCell("Mô tả", 3006),
              headerCell("Thời gian", 1500),
              headerCell("Tiến độ", 1000),
            ]}),
            ...[
              ["1", "Tri ân, đào tạo & Công tác xã hội", "Tri ân đội ngũ, đào tạo nâng cao, thực hiện công tác xã hội", "20/02 - 27/02/2026", 0],
              ["2", "Hoàn thiện hệ thống & Tối ưu vận hành", "Hoàn thiện các tính năng và tối ưu hóa vận hành", "28/02 - 07/03/2026", 0],
              ["3", "Launching & Sự kiện kết thúc Giai đoạn 4", "Tổ chức sự kiện ra mắt chính thức Giai đoạn 4", "08/03 - 10/03/2026", 0],
              ["4", "Grand Event - Kết thúc & Định hướng mở rộng", "Tổ chức sự kiện lớn kết thúc dự án và định hướng tương lai", "11/03 - 12/03/2026", 0],
            ].map(([stt, name, desc, time, pct]) => new TableRow({ children: [
              dataCell(stt, 500, { align: AlignmentType.CENTER }),
              dataCell(name, 3500, { bold: true }),
              dataCell(desc, 3006),
              dataCell(time, 1500, { align: AlignmentType.CENTER }),
              progressCell(pct, 1000),
            ]}))
          ]
        }),

        // ===== VI. CÁC THAY ĐỔI ẢNH HƯỞNG TIẾN ĐỘ =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("VI. CÁC THAY ĐỔI ẢNH HƯỞNG TIẾN ĐỘ"),
        bodyText("VCCA đã yêu cầu nhiều thay đổi lớn so với kế hoạch ban đầu, dẫn đến gia tăng khối lượng công việc và ảnh hưởng đến tiến độ dự án:"),
        emptyLine(),

        subTitle("1. Tái cấu trúc toàn bộ Phân hệ ReviewHub (Thay đổi lớn nhất)"),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Chuyển sang giao diện video dọc toàn màn hình (Full-screen) theo hướng TikTok", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Yêu cầu tương tác vuốt/lướt dọc để xem video kế tiếp", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Phải xử lý nhúng video từ TikTok hoặc xây dựng trình phát video riêng", font: "Arial", size: 20 })] }),
        emptyLine(),

        subTitle("2. Thay đổi cốt lõi Logic và Giao diện Bản đồ"),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Cấu trúc lại địa lý theo 34 tỉnh thành mới (yêu cầu nhiều thời gian nghiên cứu)", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Logic điều hướng dữ liệu tự động lọc theo vị trí (location)", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Hiệu ứng phức tạp: âm thanh (tiếng xèo xèo, dao thớt, lửa bếp), bản đồ rung nhẹ, tự động highlight vòng lặp", font: "Arial", size: 20 })] }),
        emptyLine(),

        subTitle("3. Thay đổi Luồng người dùng và Onboarding"),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Phân luồng riêng cho \"Lần đầu truy cập\" và \"Đã truy cập trước đó\"", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Thu thập dữ liệu nhân khẩu học (Ngôn ngữ, Vị trí) ngay màn hình Intro", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Thêm Video Intro giới thiệu món ăn 10-15 giây trước khi vào trang chủ", font: "Arial", size: 20 })] }),
        emptyLine(),

        subTitle("4. Thay đổi cấu trúc Trang chủ (Homepage Layout)"),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Rút gọn Menu chính còn 5 mục và thay đổi cách hiển thị thanh điều hướng (Home Bar)", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Thay khối Tin tức tĩnh thành Slide Banner động", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Bổ sung các khối \"Gợi ý hấp dẫn\", \"Địa điểm gợi ý\", \"Cộng đồng\" với tương tác thời gian thực", font: "Arial", size: 20 })] }),
        emptyLine(),

        subTitle("5. Tích hợp tính năng Quảng cáo và Modal mới"),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Modal Video Quảng cáo dạng ngắn (5-10 giây) tự động phát theo vị trí", font: "Arial", size: 20 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Thay đổi cơ chế Modal thông tin tỉnh sang hiệu ứng thu phóng (Zoom) và vào thẳng trang chủ đã lọc dữ liệu", font: "Arial", size: 20 })] }),

        // ===== VII. TỔNG KẾT =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("VII. TỔNG KẾT TIẾN ĐỘ TOÀN DỰ ÁN"),
        emptyLine(),

        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [500, 3000, 1200, 4806],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 500),
              headerCell("Giai đoạn", 3000),
              headerCell("Tiến độ", 1200),
              headerCell("Ghi chú", 4806),
            ]}),
            new TableRow({ children: [
              dataCell("1", 500, { align: AlignmentType.CENTER }),
              dataCell("Setup Nền Tảng", 3000, { bold: true }),
              progressCell(100, 1200),
              dataCell("Đã nghiệm thu ngày 25/03/2025. Đã bàn giao đầy đủ nền tảng Web/App/Admin", 4806),
            ]}),
            new TableRow({ children: [
              dataCell("2", 500, { align: AlignmentType.CENTER }),
              dataCell("Xây Dựng Cộng Đồng", 3000, { bold: true }),
              dataCell("~70%", 1200, { bold: true, color: "E65100", align: AlignmentType.CENTER, fill: "FFF3E0" }),
              dataCell("Đang triển khai. 3 hạng mục đã hoàn thành, 5 hạng mục đang phát triển, 3 hạng mục chưa bắt đầu, 4 hạng mục tồn đọng chưa triển khai", 4806),
            ]}),
            new TableRow({ children: [
              dataCell("3", 500, { align: AlignmentType.CENTER }),
              dataCell("Mở Rộng Hệ Sinh Thái", 3000, { bold: true }),
              progressCell(0, 1200),
              dataCell("Chưa triển khai. Bị ảnh hưởng bởi Giai đoạn 2 chưa hoàn thành. Bao gồm 8 phân hệ và 6 hạng mục công việc", 4806),
            ]}),
            new TableRow({ children: [
              dataCell("4", 500, { align: AlignmentType.CENTER }),
              dataCell("Hoàn Thiện Hệ Thống", 3000, { bold: true }),
              progressCell(0, 1200),
              dataCell("Chưa triển khai. Bị ảnh hưởng bởi các giai đoạn trước. Bao gồm 3 phân hệ và 4 hạng mục công việc, kết thúc bằng Grand Event", 4806),
            ]}),
          ]
        }),

        // ===== VIII. KIẾN NGHỊ =====
        emptyLine(), emptyLine(),
        sectionTitle("VIII. KIẾN NGHỊ VÀ ĐỀ XUẤT"),
        emptyLine(),

        new Paragraph({ numbering: { reference: "numbers2", level: 0 }, spacing: { after: 80 }, children: [
          new TextRun({ text: "Ưu tiên hoàn thiện 5 hạng mục ra mắt: ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "Vietnam's Food Map, Vietnam's Food Guide, Events, Sự kiện ẩm thực, ReviewHub", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "numbers2", level: 0 }, spacing: { after: 80 }, children: [
          new TextRun({ text: "Rà soát 15 hạng mục tổng, ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "bổ sung hoặc giảm bớt cho hợp đồng điều chỉnh tiếp theo", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "numbers2", level: 0 }, spacing: { after: 80 }, children: [
          new TextRun({ text: "Chốt layout với các bên: ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "Mr. Quang, Mr. Khánh, Mr. Chiến sẽ họp riêng để thống nhất", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "numbers2", level: 0 }, spacing: { after: 80 }, children: [
          new TextRun({ text: "Chuẩn bị hồ sơ nghiệm thu Giai đoạn 2 ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "để trình qua Ms. Thúy (Chánh Văn phòng) gửi Mr. Kỳ xét duyệt", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "numbers2", level: 0 }, spacing: { after: 80 }, children: [
          new TextRun({ text: "Thống nhất KPI cho từng giai đoạn ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "và đánh giá lại tính khả thi, phân tích thị trường và đối thủ", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "numbers2", level: 0 }, spacing: { after: 80 }, children: [
          new TextRun({ text: "Đánh giá tính khả thi thương mại cho Giai đoạn 2 ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "để đảm bảo yếu tố thương mại và marketing thu được doanh thu", font: "Arial", size: 20 }),
        ]}),
        new Paragraph({ numbering: { reference: "numbers2", level: 0 }, spacing: { after: 80 }, children: [
          new TextRun({ text: "Hoàn thiện bộ máy vận hành đề án, ", bold: true, font: "Arial", size: 20 }),
          new TextRun({ text: "VCCA cần cử người quản lý trang quản trị (nếu chưa có nhân sự, Tiên Phong CDS sẽ hỗ trợ)", font: "Arial", size: 20 }),
        ]}),

        // ===== KÝ TÊN =====
        emptyLine(), emptyLine(), emptyLine(),
        new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 3, color: GREEN, space: 4 } }, children: [] }),
        emptyLine(),

        new Table({
          width: { size: 9506, type: WidthType.DXA },
          columnWidths: [4753, 4753],
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 4753, type: WidthType.DXA }, margins: cellMargins, children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ĐẠI DIỆN VCCA", bold: true, font: "Arial", size: 22, color: RED })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(Ký tên, đóng dấu)", italics: true, font: "Arial", size: 18, color: "757575" })] }),
                emptyLine(), emptyLine(), emptyLine(),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VŨ MINH CHIẾN", bold: true, font: "Arial", size: 22, color: DARK })] }),
              ]}),
              new TableCell({ borders: noBorders, width: { size: 4753, type: WidthType.DXA }, margins: cellMargins, children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ĐẠI DIỆN TIÊN PHONG CDS", bold: true, font: "Arial", size: 22, color: GREEN })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(Ký tên, đóng dấu)", italics: true, font: "Arial", size: 18, color: "757575" })] }),
                emptyLine(), emptyLine(), emptyLine(),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NGUYỄN THÀNH QUANG", bold: true, font: "Arial", size: 22, color: DARK })] }),
              ]}),
            ]}),
          ]
        }),
      ]
    }
  ]
});

const OUTPUT = "/Users/mac/Documents/Work/Projects/TIEN PHONG CDS/cto-ai-assistant/.claude/drafts/vnfm-bao-cao-tien-do.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Created: " + OUTPUT);
  console.log("Size: " + (buffer.length / 1024).toFixed(1) + " KB");
});
