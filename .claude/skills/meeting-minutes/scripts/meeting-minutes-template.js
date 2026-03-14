/**
 * MEETING MINUTES TEMPLATE - TienPhong CDS
 * ==========================================
 * Template chuẩn để tạo biên bản cuộc họp dạng .docx
 *
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Copy file này thành file mới trong .claude/drafts/
 * 2. Chỉnh sửa phần DATA bên dưới
 * 3. Chạy: node <tên-file>.js
 * 4. Validate: python scripts/office/validate.py <output>.docx
 *
 * Version: 1.0.0
 * Author: CTO Office - TienPhong CDS
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  HeadingLevel, PageNumber, PageBreak, LevelFormat
} = require("docx");

// ══════════════════════════════════════════════════════════════
// DESIGN CONSTANTS (CDS Standard - KHÔNG THAY ĐỔI)
// ══════════════════════════════════════════════════════════════
const C = {
  navy: "1B3A5C",        // Section headers, label text
  darkNavy: "0F2440",    // Main title
  accent: "E8843C",      // Callout border, highlight
  white: "FFFFFF",       // Text on navy bg
  lightGray: "F2F4F7",   // Label cell bg
  midGray: "8899AA",     // Secondary text
  border: "CCCCCC",      // Table borders
  headerBg: "1B3A5C",    // Table header bg
  headerText: "FFFFFF",  // Table header text
  sectionBg: "1B3A5C",   // Section bar bg
};

const FONT = "Calibri";
const PAGE_WIDTH = 11906;  // A4
const PAGE_HEIGHT = 16838;
const MARGIN = 1134;       // ~2cm
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 9638

// ══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS (CDS Standard - KHÔNG THAY ĐỔI)
// ══════════════════════════════════════════════════════════════
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: C.border };
const borders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const noBorders = {
  top: { style: BorderStyle.NONE, size: 0 },
  bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
};
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

/** Cell header (nền navy, chữ trắng, bold, center) */
function headerCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: C.headerBg, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, font: FONT, size: 20, color: C.headerText })]
    })]
  });
}

/** Cell body (nền trắng, có thể nhận text hoặc array Paragraph) */
function bodyCell(children, width, opts = {}) {
  const paragraphs = Array.isArray(children) && children[0] instanceof Paragraph
    ? children
    : [new Paragraph({
        alignment: opts.align || AlignmentType.LEFT,
        spacing: { after: 40 },
        children: Array.isArray(children)
          ? children
          : [new TextRun({ text: children, font: FONT, size: 20 })]
      })];
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    verticalAlign: opts.valign || "center",
    children: paragraphs
  });
}

/** Cell label (nền xám nhạt, chữ bold navy) */
function labelCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: C.lightGray, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, font: FONT, size: 20, color: C.darkNavy })]
    })]
  });
}

/** Section header bar (nền navy full-width, chữ trắng centered) */
function sectionHeader(text) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { ...noBorders },
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        shading: { fill: C.sectionBg, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text, bold: true, font: FONT, size: 22, color: C.white })]
        })]
      })]
    })]
  });
}

/** Sub-section title (bold, navy, underline) */
function subSectionTitle(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({
      text, bold: true, font: FONT, size: 22, color: C.navy,
      underline: { type: "single", color: C.navy }
    })]
  });
}

/** Body paragraph */
function bodyParagraph(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 80 },
    indent: opts.indent ? { left: opts.indent } : undefined,
    children: [new TextRun({ text, font: FONT, size: 20, bold: opts.bold, italics: opts.italic })]
  });
}

/** Body paragraph with mixed formatting (bold label + normal text) */
function bodyParagraphMixed(boldText, normalText) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: boldText, font: FONT, size: 20, bold: true }),
      new TextRun({ text: normalText, font: FONT, size: 20 })
    ]
  });
}

/** Bullet item */
function bulletItem(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 40 },
    children: [new TextRun({ text, font: FONT, size: 20 })]
  });
}

/** Bullet item with bold prefix */
function bulletItemBold(boldText, normalText, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 40 },
    children: [
      new TextRun({ text: boldText, bold: true, font: FONT, size: 20 }),
      new TextRun({ text: normalText, font: FONT, size: 20 })
    ]
  });
}

/** Numbered item */
function numberedItem(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    spacing: { after: 40 },
    children: [new TextRun({ text, font: FONT, size: 20 })]
  });
}

/** Callout box (viền trái accent, nền xám, italic) */
function calloutBox(text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    indent: { left: 360 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: C.accent, space: 8 }
    },
    shading: { fill: C.lightGray, type: ShadingType.CLEAR },
    children: [new TextRun({ text, font: FONT, size: 20, italics: true, color: C.navy })]
  });
}

/** Empty spacer paragraph */
function spacer(after = 100) {
  return new Paragraph({ spacing: { after } });
}

/** Info table row (label + value) */
function infoRow(label, value, labelWidth = 3200) {
  return new TableRow({
    children: [
      labelCell(label, labelWidth),
      bodyCell(value, CONTENT_WIDTH - labelWidth)
    ]
  });
}

/** Create standard info table */
function createInfoTable(rows, labelWidth = 3200) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [labelWidth, CONTENT_WIDTH - labelWidth],
    rows: rows.map(([label, value]) => infoRow(label, value, labelWidth))
  });
}

/** Create standard data table with header row */
function createDataTable(headers, rows, columnWidths) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths,
    rows: [
      new TableRow({
        children: headers.map((h, i) => headerCell(h, columnWidths[i]))
      }),
      ...rows.map(row => new TableRow({
        children: row.map((cell, i) => {
          if (cell instanceof TableCell) return cell;
          if (typeof cell === "object" && cell.bold) {
            return new TableCell({
              borders,
              width: { size: columnWidths[i], type: WidthType.DXA },
              margins: cellMargins,
              children: [new Paragraph({
                children: [new TextRun({ text: cell.text, bold: true, font: FONT, size: 20 })]
              })]
            });
          }
          return bodyCell(cell, columnWidths[i]);
        })
      }))
    ]
  });
}

/** Signature block (2 cột: bên trái + bên phải) */
function signatureBlock(leftTitle, leftOrg, rightTitle, rightOrg) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [Math.floor(CONTENT_WIDTH / 2), Math.ceil(CONTENT_WIDTH / 2)],
    rows: [new TableRow({
      children: [
        // Left
        new TableCell({
          borders: noBorders,
          width: { size: Math.floor(CONTENT_WIDTH / 2), type: WidthType.DXA },
          margins: cellMargins,
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: leftTitle, font: FONT, size: 20, bold: true })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: leftOrg, font: FONT, size: 20, bold: true })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "(Chức danh / Ký tên / Đóng dấu)", font: FONT, size: 18, italics: true, color: C.midGray })] }),
            spacer(40), spacer(40), spacer(40),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "Họ và tên: ..........................................", font: FONT, size: 20 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "Chức vụ: ...........................................", font: FONT, size: 20 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "Ngày: ................................................", font: FONT, size: 20 })] }),
          ]
        }),
        // Right
        new TableCell({
          borders: noBorders,
          width: { size: Math.ceil(CONTENT_WIDTH / 2), type: WidthType.DXA },
          margins: cellMargins,
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: rightTitle, font: FONT, size: 20, bold: true })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: rightOrg, font: FONT, size: 20, bold: true })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "(Chức danh / Ký tên / Đóng dấu)", font: FONT, size: 18, italics: true, color: C.midGray })] }),
            spacer(40), spacer(40), spacer(40),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "Họ và tên: ..........................................", font: FONT, size: 20 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "Chức vụ: ...........................................", font: FONT, size: 20 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
              children: [new TextRun({ text: "Ngày: ................................................", font: FONT, size: 20 })] }),
          ]
        }),
      ]
    })]
  });
}

// ══════════════════════════════════════════════════════════════
// DOCUMENT SETUP (CDS Standard - KHÔNG THAY ĐỔI)
// ══════════════════════════════════════════════════════════════
function createDocumentShell(headerRight, children) {
  return new Document({
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
            { level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 1080, hanging: 360 } } } },
          ]
        },
        {
          reference: "numbers",
          levels: [
            { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          ]
        },
      ]
    },
    styles: {
      default: { document: { run: { font: FONT, size: 20 } } },
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.navy, space: 4 } },
            children: [
              new TextRun({ text: "BIÊN BẢN HỌP", font: FONT, size: 16, color: C.midGray }),
              new TextRun({ text: `  |  ${headerRight}`, font: FONT, size: 16, color: C.midGray, bold: true }),
            ]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 1, color: C.border, space: 4 } },
            children: [
              new TextRun({ text: "Trang ", font: FONT, size: 16, color: C.midGray }),
              new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: C.midGray }),
            ]
          })]
        })
      },
      children
    }]
  });
}

// ══════════════════════════════════════════════════════════════
// EXPORTS (để sử dụng như module)
// ══════════════════════════════════════════════════════════════
module.exports = {
  // Constants
  C, FONT, PAGE_WIDTH, PAGE_HEIGHT, MARGIN, CONTENT_WIDTH,
  borders, noBorders, cellMargins,
  // Cell builders
  headerCell, bodyCell, labelCell,
  // Layout builders
  sectionHeader, subSectionTitle, bodyParagraph, bodyParagraphMixed,
  bulletItem, bulletItemBold, numberedItem, calloutBox, spacer,
  // Table builders
  infoRow, createInfoTable, createDataTable,
  // Signature
  signatureBlock,
  // Document shell
  createDocumentShell,
  // Re-exports from docx (convenience)
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  HeadingLevel, PageNumber, PageBreak, LevelFormat
};
