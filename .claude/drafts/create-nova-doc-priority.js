const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, LevelFormat, TabStopType, TabStopPosition
} = require("docx");

// ===== CONSTANTS =====
const PRIMARY_COLOR = "1B3A5C";
const ACCENT_COLOR = "2E75B6";
const LIGHT_BG = "E8F0F8";
const HEADER_BG = "1B3A5C";
const TIER1_COLOR = "C0392B";
const TIER2_COLOR = "E67E22";
const TIER3_COLOR = "F1C40F";
const TIER4_COLOR = "27AE60";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F5F5F5";

const PAGE_WIDTH = 12240;
const MARGIN = 1440;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN; // 9360

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

// ===== HELPERS =====
function headerCell(text, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({ text, bold: true, font: "Arial", size: 18, color: WHITE })]
    })]
  });
}

function dataCell(text, width, opts = {}) {
  const runs = [];
  if (opts.bold) {
    runs.push(new TextRun({ text, bold: true, font: "Arial", size: 18, color: opts.color || "333333" }));
  } else {
    runs.push(new TextRun({ text, font: "Arial", size: 18, color: opts.color || "333333" }));
  }
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { before: 40, after: 40 },
      children: runs
    })]
  });
}

function multiLineCell(lines, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    verticalAlign: "center",
    children: lines.map(l => new Paragraph({
      spacing: { before: 20, after: 20 },
      children: [new TextRun({ text: l, font: "Arial", size: 18, color: opts.color || "333333" })]
    }))
  });
}

function sectionTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 28, color: PRIMARY_COLOR })]
  });
}

function sectionSubtitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 160 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 24, color: ACCENT_COLOR })]
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({
      text,
      font: "Arial",
      size: 20,
      color: opts.color || "333333",
      bold: opts.bold || false,
      italics: opts.italic || false
    })]
  });
}

function emptyLine() {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [] });
}

function tierBadge(tier) {
  const colors = { 1: TIER1_COLOR, 2: TIER2_COLOR, 3: TIER3_COLOR, 4: TIER4_COLOR };
  return new TextRun({ text: `[Tier ${tier}]`, bold: true, font: "Arial", size: 18, color: colors[tier] || "333333" });
}

// ===== PRIORITY TABLES DATA =====
const priority1Items = [
  { doc: "NVG-MAC-REG09", name: "Quy ch\u1EBF l\u1EADp k\u1EBF ho\u1EA1ch Marketing", modules: "M1 (AOP/Budget)", reason: "N\u1EC1n t\u1EA3ng quy tr\xECnh l\u1EADp ng\xE2n s\xE1ch MKT" },
  { doc: "Brand Guideline Form", name: "Brand Guideline (NVG-MAC-REG09)", modules: "M4 (Content/DAM)", reason: "Chu\u1EA9n brand \u0111\u1EC3 c\u1EA5u h\xECnh DAM" },
  { doc: "Sales & MKT Plan.xlsx", name: "K\u1EBF ho\u1EA1ch Sales & MKT", modules: "M1, M2, M8", reason: "Template KPI/Budget th\u1EF1c t\u1EBF" },
  { doc: "NVG-MAC-SOP17", name: "Quy tr\xECnh l\u1EADp k\u1EBF ho\u1EA1ch MKT", modules: "M1, M9.1", reason: "Workflow c\u1EA7n s\u1ED1 h\xF3a \u0111\u1EA7u ti\xEAn" },
];

const priority2Items = [
  { doc: "NVG-MAC-SOP18", name: "Quy tr\xECnh qu\u1EA3n l\xFD POSM", modules: "M3 (POSM)", reason: "POSM lifecycle management" },
  { doc: "NVG-MAC-SOP19", name: "Quy tr\xECnh tri\u1EC3n khai CTKM", modules: "M3 (Promotion)", reason: "Promotion workflow + approval" },
  { doc: "NVG-MAC-REG14", name: "Quy ch\u1EBF t\u1ED5 ch\u1EE9c Event", modules: "M5 (Event)", reason: "Event management \u0111\u01B0\u1EE3c mention nhi\u1EC1u" },
  { doc: "NVG-MAC-SOP16", name: "Quy tr\xECnh qu\u1EA3ng c\xE1o OOH", modules: "M5 (OOH/Ads)", reason: "Paid media management" },
];

const priority3Items = [
  { doc: "NVG-MAC-SOP11", name: "Ph\u1EA3n h\u1ED3i KH qua MXH", modules: "M6 (Social Listening)", reason: "Social response workflow" },
  { doc: "NVG-MAC-REG02", name: "Quy ch\u1EBF qu\u1EA3n l\xFD nh\xE3n hi\u1EC7u", modules: "M4 (DAM)", reason: "Brand governance cho DAM" },
  { doc: "NVG-MAC-REG08", name: "Quy ch\u1EBF nh\u1EADn di\u1EC7n th\u01B0\u01A1ng hi\u1EC7u", modules: "M4 (DAM)", reason: "Visual identity standards" },
  { doc: "NVG-MAC-REG04", name: "Quy ch\u1EBF quan h\u1EC7 b\xE1o ch\xED", modules: "M7 (PR/Media)", reason: "PR approval workflow" },
  { doc: "NVG-MAC-REG05", name: "Quy ch\u1EBF truy\u1EC1n th\xF4ng n\u1ED9i b\u1ED9", modules: "M7 (Internal Comms)", reason: "Internal comms rules" },
];

const priority4Items = [
  { doc: "NVG-MAC-REG03", name: "Quy ch\u1EBF MXH", modules: "M6 (Social)", reason: "Social media governance" },
  { doc: "NVG-MAC-REG06", name: "Quy ch\u1EBF ph\xE1t ng\xF4n", modules: "M7 (PR)", reason: "Spokesperson guidelines" },
  { doc: "NVG-MAC-REG07", name: "Quy ch\u1EBF x\u1EED l\xFD kh\u1EE7ng ho\u1EA3ng", modules: "M7 (Crisis)", reason: "Crisis management" },
  { doc: "NVG-MAC-REG10", name: "Quy ch\u1EBF t\xE0i tr\u1EE3", modules: "M1 (Budget)", reason: "Sponsorship budget rules" },
  { doc: "NVG-MAC-REG11", name: "Quy ch\u1EBF qu\u1EA3n l\xFD vendor MKT", modules: "M9 (Vendor)", reason: "Vendor management" },
  { doc: "NVG-MAC-REG12", name: "Quy ch\u1EBF \u0111\u1EA5u th\u1EA7u", modules: "M9 (Procurement)", reason: "Bidding process" },
  { doc: "NVG-MAC-SPEC02", name: "Quy c\xE1ch thi\u1EBFt k\u1EBF \u1EA5n ph\u1EA9m", modules: "M4 (DAM)", reason: "Design specifications" },
];

const missingItems = [
  { item: "Danh s\xE1ch nh\xE0 cung c\u1EA5p MKT hi\u1EC7n t\u1EA1i", modules: "M9.3 (Integration)", note: "C\u1EA7n h\u1ECDp ri\xEAng v\u1EDBi Procurement" },
  { item: "Ma tr\u1EADn ph\xE2n quy\u1EC1n ph\xEA duy\u1EC7t (Approval Matrix)", modules: "M9.1 (Workflow/RBAC)", note: "C\u1EA7n h\u1ECDp v\u1EDBi C-level \u0111\u1EC3 x\xE1c nh\u1EADn" },
  { item: "Danh m\u1EE5c KPI MKT hi\u1EC7n t\u1EA1i", modules: "M8 (KPI/ROI)", note: "C\u1EA7n t\u1EEB MKT Director" },
  { item: "Danh m\u1EE5c h\u1EC7 th\u1ED1ng \u0111ang s\u1EED d\u1EE5ng (IT Landscape)", modules: "M9.3 (Integration)", note: "C\u1EA7n h\u1ECDp v\u1EDBi IT team" },
  { item: "M\u1EABu b\xE1o c\xE1o MKT hi\u1EC7n t\u1EA1i", modules: "M8 (Analytics)", note: "C\u1EA7n t\u1EEB MKT Analytics team" },
];

// ===== DOCUMENT =====
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 20 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: PRIMARY_COLOR },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: ACCENT_COLOR },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: "444444" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 }
      },
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "bullets2",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u25CB", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
    ]
  },
  sections: [
    // ===== COVER PAGE =====
    {
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: [
        emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
        // Top accent line
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR, space: 1 } },
          children: []
        }),
        emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 200 },
          children: [new TextRun({ text: "TIEN PHONG CDS", bold: true, font: "Arial", size: 36, color: PRIMARY_COLOR })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "D\u1EABn \u0111\u1EA7u Chuy\u1EC3n \u0111\u1ED5i s\u1ED1 Kinh doanh", font: "Arial", size: 22, color: ACCENT_COLOR, italics: true })]
        }),
        emptyLine(), emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({
            text: "PH\xC2N T\xCDCH M\u1EE8C \u0110\u1ED8 \u01AFU TI\xCAN \u0110\u1ECCC T\xC0I LI\u1EC6U",
            bold: true, font: "Arial", size: 32, color: PRIMARY_COLOR
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({
            text: "D\u1EF1 \xE1n eMarketing DMP - Nova Group",
            bold: true, font: "Arial", size: 26, color: ACCENT_COLOR
          })]
        }),
        emptyLine(),
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR, space: 1 } },
          children: []
        }),
        emptyLine(), emptyLine(),
        // Info table
        new Table({
          width: { size: 5000, type: WidthType.DXA },
          columnWidths: [2000, 3000],
          rows: [
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "D\u1EF1 \xE1n:", bold: true, font: "Arial", size: 20, color: "666666" })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "eMarketing DMP", font: "Arial", size: 20 })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "Kh\xE1ch h\xE0ng:", bold: true, font: "Arial", size: 20, color: "666666" })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "Nova Group", font: "Arial", size: 20 })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "M\xE3 t\xE0i li\u1EC7u:", bold: true, font: "Arial", size: 20, color: "666666" })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "EM-BPD-002 v2.0", font: "Arial", size: 20 })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "Ng\xE0y:", bold: true, font: "Arial", size: 20, color: "666666" })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "13/03/2026", font: "Arial", size: 20 })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "Chu\u1EA9n b\u1ECB:", bold: true, font: "Arial", size: 20, color: "666666" })] })] }),
              new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, margins: cellMargins,
                children: [new Paragraph({ children: [new TextRun({ text: "TienPhong CDS - BA Team", font: "Arial", size: 20 })] })] }),
            ]}),
          ]
        }),
        emptyLine(), emptyLine(), emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "T\xC0I LI\u1EC6U N\u1ED8I B\u1ED8 - INTERNAL USE ONLY", bold: true, font: "Arial", size: 18, color: TIER1_COLOR })]
        }),
      ]
    },

    // ===== MAIN CONTENT =====
    {
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT_COLOR, space: 1 } },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: "TienPhong CDS", bold: true, font: "Arial", size: 16, color: PRIMARY_COLOR }),
              new TextRun({ text: "\tNova Group - eMarketing DMP", font: "Arial", size: 16, color: "999999" }),
            ]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC", space: 1 } },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: "Ph\xE2n t\xEDch \u01AFu ti\xEAn \u0110\u1ECDc T\xE0i li\u1EC7u | N\u1ED9i b\u1ED9", font: "Arial", size: 14, color: "999999" }),
              new TextRun({ text: "\tTrang ", font: "Arial", size: 14, color: "999999" }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 14, color: "999999" }),
            ]
          })]
        })
      },
      children: [
        // ===== 1. MỤC ĐÍCH =====
        sectionTitle("1. M\u1EE5c \u0110\xEDch T\xE0i Li\u1EC7u"),
        bodyText("T\xE0i li\u1EC7u n\xE0y ph\xE2n t\xEDch v\xE0 \u0111\xE1nh gi\xE1 m\u1EE9c \u0111\u1ED9 \u01B0u ti\xEAn \u0111\u1ECDc c\xE1c t\xE0i li\u1EC7u m\xE0 Nova Group \u0111\xE3 upload l\xEAn SharePoint, ph\u1EE5c v\u1EE5 vi\u1EC7c tri\u1EC3n khai d\u1EF1 \xE1n eMarketing DMP."),
        emptyLine(),
        bodyText("C\u01A1 s\u1EDF ph\xE2n t\xEDch:"),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "B\u1EA3n tr\u1EA3 l\u1EDDi kh\u1EA3o s\xE1t EM-BPD-002 v2.0 (41 trang, 9 modules)", font: "Arial", size: 20 })]
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "C\u1EA5u tr\xFAc th\u01B0 m\u1EE5c SharePoint c\u1EE7a Nova Group (NVG-MAC)", font: "Arial", size: 20 })]
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "B\u1EA3ng \u0111\xE1nh gi\xE1 m\u1EE9c \u0111\u1ED9 \u01B0u ti\xEAn modules (Tier 1\u20135) t\u1EEB kh\u1EA3o s\xE1t", font: "Arial", size: 20 })]
        }),

        // ===== 2. TỔNG QUAN MODULE TIERS =====
        sectionTitle("2. T\u1ED5ng Quan Ph\xE2n H\u1EA1ng Module"),
        bodyText("D\u1EF1a tr\xEAn b\u1EA3ng \u0111\xE1nh gi\xE1 trong kh\u1EA3o s\xE1t, c\xE1c module \u0111\u01B0\u1EE3c ph\xE2n th\xE0nh 5 tier:"),
        emptyLine(),

        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1200, 4160, 2000, 2000],
          rows: [
            new TableRow({ children: [
              headerCell("Tier", 1200, { center: true }),
              headerCell("Modules", 4160),
              headerCell("M\u1EE9c \u0111\u1ED9", 2000, { center: true }),
              headerCell("Ghi ch\xFA", 2000),
            ]}),
            new TableRow({ children: [
              dataCell("Tier 1", 1200, { bold: true, color: TIER1_COLOR, center: true }),
              dataCell("M1 (AOP/Budget), M9.1 (Workflow), M9.3 (Integration)", 4160),
              dataCell("N\u1EC1n t\u1EA3ng", 2000, { center: true, color: TIER1_COLOR, bold: true }),
              dataCell("Tri\u1EC3n khai \u0111\u1EA7u ti\xEAn", 2000),
            ]}),
            new TableRow({ children: [
              dataCell("Tier 2", 1200, { bold: true, color: TIER2_COLOR, center: true, bg: LIGHT_GRAY }),
              dataCell("M3 (Campaign/POSM/Promotion), M5 (Paid Ads/OOH/Event)", 4160, { bg: LIGHT_GRAY }),
              dataCell("Quan tr\u1ECDng", 2000, { center: true, color: TIER2_COLOR, bold: true, bg: LIGHT_GRAY }),
              dataCell("Sau khi c\xF3 n\u1EC1n t\u1EA3ng", 2000, { bg: LIGHT_GRAY }),
            ]}),
            new TableRow({ children: [
              dataCell("Tier 3", 1200, { bold: true, color: "B7950B", center: true }),
              dataCell("M2 (Campaign Strategy), M4 (Content/DAM), M6 (Omnichannel/CDP)", 4160),
              dataCell("C\u1EA7n thi\u1EBFt", 2000, { center: true, color: "B7950B", bold: true }),
              dataCell("Tri\u1EC3n khai song song", 2000),
            ]}),
            new TableRow({ children: [
              dataCell("Tier 4", 1200, { bold: true, color: TIER4_COLOR, center: true, bg: LIGHT_GRAY }),
              dataCell("M7 (PR/Media), M8 (KPI/ROI/AI Analytics)", 4160, { bg: LIGHT_GRAY }),
              dataCell("B\u1ED5 sung", 2000, { center: true, color: TIER4_COLOR, bold: true, bg: LIGHT_GRAY }),
              dataCell("Phase 2+", 2000, { bg: LIGHT_GRAY }),
            ]}),
            new TableRow({ children: [
              dataCell("Tier 5", 1200, { bold: true, color: "7F8C8D", center: true }),
              dataCell("M9.2 (RBAC - ph\xE2n quy\u1EC1n nâng cao)", 4160),
              dataCell("T\xF9y ch\u1ECDn", 2000, { center: true, color: "7F8C8D", bold: true }),
              dataCell("N\u1EBFu c\u1EA7n", 2000),
            ]}),
          ]
        }),

        // ===== 3. PRIORITY 1 =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("3. \u01AFu Ti\xEAn \u0110\u1ECDc T\xE0i Li\u1EC7u"),

        sectionSubtitle("3.1. \u01AFu Ti\xEAn 1 - \u0110\u1ECDc Ngay (Tier 1 - N\u1EC1n T\u1EA3ng)"),
        bodyText("C\xE1c t\xE0i li\u1EC7u li\xEAn quan tr\u1EF1c ti\u1EBFp \u0111\u1EBFn modules n\u1EC1n t\u1EA3ng (M1, M9.1, M9.3). \u0110\xE2y l\xE0 nh\u1EEFng t\xE0i li\u1EC7u c\u1EA7n \u0111\u1ECDc v\xE0 ph\xE2n t\xEDch tr\u01B0\u1EDBc ti\xEAn \u0111\u1EC3 hi\u1EC3u r\xF5 quy tr\xECnh l\u1EADp k\u1EBF ho\u1EA1ch, ph\xE2n b\u1ED5 ng\xE2n s\xE1ch v\xE0 workflow hi\u1EC7n t\u1EA1i."),
        emptyLine(),

        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1800, 2800, 2200, 2560],
          rows: [
            new TableRow({ children: [
              headerCell("M\xE3 t\xE0i li\u1EC7u", 1800),
              headerCell("T\xEAn t\xE0i li\u1EC7u", 2800),
              headerCell("Module li\xEAn quan", 2200),
              headerCell("L\xFD do \u01B0u ti\xEAn", 2560),
            ]}),
            ...priority1Items.map((item, i) => new TableRow({ children: [
              dataCell(item.doc, 1800, { bold: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.name, 2800, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.modules, 2200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.reason, 2560, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        // ===== PRIORITY 2 =====
        emptyLine(),
        sectionSubtitle("3.2. \u01AFu Ti\xEAn 2 - \u0110\u1ECDc S\u1EDBm (Tier 2 - Campaign & Paid Media)"),
        bodyText("T\xE0i li\u1EC7u li\xEAn quan \u0111\u1EBFn qu\u1EA3n l\xFD chi\u1EBFn d\u1ECBch, POSM, khuy\u1EBFn m\xE3i v\xE0 qu\u1EA3ng c\xE1o. C\u1EA7n \u0111\u1ECDc sau khi \u0111\xE3 hi\u1EC3u n\u1EC1n t\u1EA3ng t\u1EEB \u01AFu ti\xEAn 1."),
        emptyLine(),

        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1800, 2800, 2200, 2560],
          rows: [
            new TableRow({ children: [
              headerCell("M\xE3 t\xE0i li\u1EC7u", 1800),
              headerCell("T\xEAn t\xE0i li\u1EC7u", 2800),
              headerCell("Module li\xEAn quan", 2200),
              headerCell("L\xFD do \u01B0u ti\xEAn", 2560),
            ]}),
            ...priority2Items.map((item, i) => new TableRow({ children: [
              dataCell(item.doc, 1800, { bold: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.name, 2800, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.modules, 2200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.reason, 2560, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        // ===== PRIORITY 3 =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionSubtitle("3.3. \u01AFu Ti\xEAn 3 - \u0110\u1ECDc B\u1ED5 Sung (Tier 3 - Content & Social)"),
        bodyText("T\xE0i li\u1EC7u v\u1EC1 qu\u1EA3n l\xFD n\u1ED9i dung, th\u01B0\u01A1ng hi\u1EC7u, m\u1EA1ng x\xE3 h\u1ED9i v\xE0 PR. Cung c\u1EA5p th\xEAm ng\u1EEF c\u1EA3nh cho c\xE1c module \u0111\u01B0\u1EE3c tri\u1EC3n khai song song."),
        emptyLine(),

        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1800, 2800, 2200, 2560],
          rows: [
            new TableRow({ children: [
              headerCell("M\xE3 t\xE0i li\u1EC7u", 1800),
              headerCell("T\xEAn t\xE0i li\u1EC7u", 2800),
              headerCell("Module li\xEAn quan", 2200),
              headerCell("L\xFD do \u01B0u ti\xEAn", 2560),
            ]}),
            ...priority3Items.map((item, i) => new TableRow({ children: [
              dataCell(item.doc, 1800, { bold: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.name, 2800, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.modules, 2200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.reason, 2560, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        // ===== PRIORITY 4 =====
        emptyLine(),
        sectionSubtitle("3.4. \u01AFu Ti\xEAn 4 - Tham Kh\u1EA3o Th\xEAm (Tier 4\u20135 - B\u1ED5 Sung)"),
        bodyText("T\xE0i li\u1EC7u b\u1ED5 sung v\u1EC1 quy ch\u1EBF, ti\xEAu chu\u1EA9n. Kh\xF4ng c\u1EA5p b\xE1ch nh\u01B0ng h\u1EEFu \xEDch \u0111\u1EC3 hi\u1EC3u to\xE0n di\u1EC7n h\u01A1n v\u1EC1 quy tr\xECnh MKT c\u1EE7a Nova Group."),
        emptyLine(),

        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1800, 2800, 2200, 2560],
          rows: [
            new TableRow({ children: [
              headerCell("M\xE3 t\xE0i li\u1EC7u", 1800),
              headerCell("T\xEAn t\xE0i li\u1EC7u", 2800),
              headerCell("Module li\xEAn quan", 2200),
              headerCell("L\xFD do \u01B0u ti\xEAn", 2560),
            ]}),
            ...priority4Items.map((item, i) => new TableRow({ children: [
              dataCell(item.doc, 1800, { bold: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.name, 2800, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.modules, 2200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.reason, 2560, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        // ===== 4. MISSING ITEMS =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("4. T\xE0i Li\u1EC7u C\xF2n Thi\u1EBFu - C\u1EA7n H\u1ECDp Ri\xEAng"),
        bodyText("C\xE1c h\u1EA1ng m\u1EE5c sau \u0111\u01B0\u1EE3c \u0111\u1EC1 c\u1EADp trong kh\u1EA3o s\xE1t nh\u01B0ng ch\u01B0a c\xF3 t\xE0i li\u1EC7u t\u01B0\u01A1ng \u1EE9ng tr\xEAn SharePoint. C\u1EA7n t\u1ED5 ch\u1EE9c bu\u1ED5i h\u1ECDp ri\xEAng \u0111\u1EC3 thu th\u1EADp th\xF4ng tin.", { bold: false }),
        emptyLine(),

        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [800, 3200, 2200, 3160],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 800, { center: true }),
              headerCell("H\u1EA1ng m\u1EE5c c\u1EA7n thu th\u1EADp", 3200),
              headerCell("Module li\xEAn quan", 2200),
              headerCell("\u0110\u1EC1 xu\u1EA5t h\xE0nh \u0111\u1ED9ng", 3160),
            ]}),
            ...missingItems.map((item, i) => new TableRow({ children: [
              dataCell(`${i + 1}`, 800, { center: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.item, 3200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.modules, 2200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(item.note, 3160, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        // ===== 5. MAPPING TỔNG HỢP =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("5. Mapping T\u1ED5ng H\u1EE3p: SharePoint \u2192 Module Kh\u1EA3o S\xE1t"),
        bodyText("B\u1EA3ng d\u01B0\u1EDBi \u0111\xE2y mapping to\xE0n b\u1ED9 t\xE0i li\u1EC7u tr\xEAn SharePoint v\u1EDBi c\xE1c h\u1EA1ng m\u1EE5c trong b\u1EA3n kh\u1EA3o s\xE1t eMarketing, nh\xF3m theo ch\u1EE7 \u0111\u1EC1."),
        emptyLine(),

        // Group A: SOP & Processes
        sectionSubtitle("Nh\xF3m A: SOP & Quy Tr\xECnh (10 t\xE0i li\u1EC7u)"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1600, 3200, 2000, 2560],
          rows: [
            new TableRow({ children: [
              headerCell("M\xE3 SOP", 1600),
              headerCell("N\u1ED9i dung", 3200),
              headerCell("Module", 2000),
              headerCell("M\u1EE5c kh\u1EA3o s\xE1t", 2560),
            ]}),
            ...([
              ["SOP17", "L\u1EADp k\u1EBF ho\u1EA1ch MKT", "M1, M9.1", "M1-AS01\u201303"],
              ["SOP18", "Qu\u1EA3n l\xFD POSM", "M3", "M3-AS04\u201306"],
              ["SOP19", "Tri\u1EC3n khai CTKM", "M3", "M3-AS07\u201309"],
              ["SOP16", "QC OOH t\u1EA1i \u0111\u01A1n v\u1ECB KD", "M5", "M5-AS01\u201303"],
              ["SOP11", "Ph\u1EA3n h\u1ED3i KH qua MXH", "M6", "M6-AS04\u201306"],
              ["SOP09", "T\u1ED5 ch\u1EE9c s\u1EF1 ki\u1EC7n", "M5", "M5-AS07\u201309"],
              ["SOP10", "X\u1EED l\xFD kh\u1EE7ng ho\u1EA3ng TT", "M7", "M7-AS04\u201306"],
              ["SOP12", "Qu\u1EA3n l\xFD b\xE1o ch\xED", "M7", "M7-AS01\u201303"],
              ["SOP14", "S\u1EA3n xu\u1EA5t TVC/Photo", "M4", "M4-AS01\u201303"],
              ["SOP15", "S\u1EA3n xu\u1EA5t \u1EA5n ph\u1EA9m", "M4", "M4-AS04\u201306"],
            ]).map((row, i) => new TableRow({ children: [
              dataCell(row[0], 1600, { bold: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[1], 3200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[2], 2000, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[3], 2560, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        emptyLine(),
        // Group B: REG - Quy chế
        sectionSubtitle("Nh\xF3m B: REG - Quy Ch\u1EBF & Quy \u0110\u1ECBnh (11 t\xE0i li\u1EC7u)"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1600, 3200, 2000, 2560],
          rows: [
            new TableRow({ children: [
              headerCell("M\xE3 REG", 1600),
              headerCell("N\u1ED9i dung", 3200),
              headerCell("Module", 2000),
              headerCell("M\u1EE5c kh\u1EA3o s\xE1t", 2560),
            ]}),
            ...([
              ["REG02", "Qu\u1EA3n l\xFD nh\xE3n hi\u1EC7u", "M4", "M4-AS01\u201303"],
              ["REG03", "Qu\u1EA3n l\xFD MXH", "M6", "M6-AS01\u201303"],
              ["REG04", "Quan h\u1EC7 b\xE1o ch\xED", "M7", "M7-AS01\u201303"],
              ["REG05", "Truy\u1EC1n th\xF4ng n\u1ED9i b\u1ED9", "M7", "M7-AS07\u201309"],
              ["REG06", "Quy ch\u1EBF ph\xE1t ng\xF4n", "M7", "M7-AS01\u201303"],
              ["REG07", "X\u1EED l\xFD kh\u1EE7ng ho\u1EA3ng", "M7", "M7-AS04\u201306"],
              ["REG08", "Nh\u1EADn di\u1EC7n th\u01B0\u01A1ng hi\u1EC7u", "M4", "M4-AS01\u201303"],
              ["REG09", "L\u1EADp k\u1EBF ho\u1EA1ch MKT", "M1", "M1-AS01\u201303"],
              ["REG10", "T\xE0i tr\u1EE3", "M1", "M1-AS04\u201306"],
              ["REG11", "Qu\u1EA3n l\xFD vendor MKT", "M9", "M9-AS01\u201303"],
              ["REG12", "\u0110\u1EA5u th\u1EA7u", "M9", "M9-AS04\u201306"],
            ]).map((row, i) => new TableRow({ children: [
              dataCell(row[0], 1600, { bold: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[1], 3200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[2], 2000, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[3], 2560, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        emptyLine(),
        // Group C: SPEC & Others
        sectionSubtitle("Nh\xF3m C: SPEC & T\xE0i Li\u1EC7u Kh\xE1c"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [2000, 3200, 2000, 2160],
          rows: [
            new TableRow({ children: [
              headerCell("M\xE3 t\xE0i li\u1EC7u", 2000),
              headerCell("N\u1ED9i dung", 3200),
              headerCell("Module", 2000),
              headerCell("M\u1EE5c kh\u1EA3o s\xE1t", 2160),
            ]}),
            ...([
              ["SPEC02", "Quy c\xE1ch thi\u1EBFt k\u1EBF \u1EA5n ph\u1EA9m", "M4", "M4-AS04\u201306"],
              ["REG14", "T\u1ED5 ch\u1EE9c Event", "M5", "M5-AS07\u201309"],
              ["Brand Guideline", "B\u1ED9 nh\u1EADn di\u1EC7n th\u01B0\u01A1ng hi\u1EC7u", "M4", "M4-AS01\u201303"],
              ["Sales & MKT Plan", "K\u1EBF ho\u1EA1ch Sales & MKT (xlsx)", "M1, M2, M8", "M1-AS01, M8-AS01"],
            ]).map((row, i) => new TableRow({ children: [
              dataCell(row[0], 2000, { bold: true, bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[1], 3200, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[2], 2000, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
              dataCell(row[3], 2160, { bg: i % 2 === 1 ? LIGHT_GRAY : undefined }),
            ]})),
          ]
        }),

        // ===== 6. ĐỀ XUẤT HÀNH ĐỘNG =====
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("6. \u0110\u1EC1 Xu\u1EA5t H\xE0nh \u0110\u1ED9ng Ti\u1EBFp Theo"),
        emptyLine(),

        sectionSubtitle("6.1. H\xE0nh \u0111\u1ED9ng ng\u1EAFn h\u1EA1n (Tu\u1EA7n n\xE0y)"),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text: "\u0110\u1ECDc v\xE0 ph\xE2n t\xEDch 4 t\xE0i li\u1EC7u \u01AFu ti\xEAn 1 (NVG-MAC-REG09, Brand Guideline, Sales & MKT Plan, SOP17)", font: "Arial", size: 20 })]
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text: "T\u1EA1o ma tr\u1EADn mapping chi ti\u1EBFt gi\u1EEFa n\u1ED9i dung t\xE0i li\u1EC7u v\xE0 c\xE1c AS-IS items trong kh\u1EA3o s\xE1t", font: "Arial", size: 20 })]
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text: "X\xE1c \u0111\u1ECBnh gaps gi\u1EEFa quy tr\xECnh hi\u1EC7n t\u1EA1i v\xE0 y\xEAu c\u1EA7u TO-BE", font: "Arial", size: 20 })]
        }),

        emptyLine(),
        sectionSubtitle("6.2. H\xE0nh \u0111\u1ED9ng trung h\u1EA1n (2 tu\u1EA7n t\u1EDBi)"),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text: "\u0110\u1ECDc 4 t\xE0i li\u1EC7u \u01AFu ti\xEAn 2 (SOP18, SOP19, REG14, SOP16)", font: "Arial", size: 20 })]
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text: "L\xEAn l\u1ECBch h\u1ECDp ri\xEAng \u0111\u1EC3 thu th\u1EADp 5 h\u1EA1ng m\u1EE5c c\xF2n thi\u1EBFu (M\u1EE5c 4)", font: "Arial", size: 20 })]
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text: "B\u1EAFt \u0111\u1EA7u draft Solution Design cho M1 v\xE0 M9.1", font: "Arial", size: 20 })]
        }),

        emptyLine(),
        sectionSubtitle("6.3. Bu\u1ED5i h\u1ECDp c\u1EA7n t\u1ED5 ch\u1EE9c"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [800, 3600, 2400, 2560],
          rows: [
            new TableRow({ children: [
              headerCell("STT", 800, { center: true }),
              headerCell("Ch\u1EE7 \u0111\u1EC1 h\u1ECDp", 3600),
              headerCell("Th\xE0nh ph\u1EA7n", 2400),
              headerCell("M\u1EE5c ti\xEAu", 2560),
            ]}),
            new TableRow({ children: [
              dataCell("1", 800, { center: true }),
              dataCell("Approval Matrix & Ph\xE2n quy\u1EC1n", 3600),
              dataCell("C-level, MKT Director", 2400),
              dataCell("X\xE1c \u0111\u1ECBnh lu\u1ED3ng ph\xEA duy\u1EC7t", 2560),
            ]}),
            new TableRow({ children: [
              dataCell("2", 800, { center: true, bg: LIGHT_GRAY }),
              dataCell("KPI & B\xE1o c\xE1o MKT hi\u1EC7n t\u1EA1i", 3600, { bg: LIGHT_GRAY }),
              dataCell("MKT Director, Analytics", 2400, { bg: LIGHT_GRAY }),
              dataCell("Danh m\u1EE5c KPI + m\u1EABu b\xE1o c\xE1o", 2560, { bg: LIGHT_GRAY }),
            ]}),
            new TableRow({ children: [
              dataCell("3", 800, { center: true }),
              dataCell("IT Landscape & Integration", 3600),
              dataCell("IT Team, MKT Ops", 2400),
              dataCell("Danh s\xE1ch h\u1EC7 th\u1ED1ng, API", 2560),
            ]}),
            new TableRow({ children: [
              dataCell("4", 800, { center: true, bg: LIGHT_GRAY }),
              dataCell("Vendor & Nh\xE0 cung c\u1EA5p MKT", 3600, { bg: LIGHT_GRAY }),
              dataCell("Procurement, MKT Ops", 2400, { bg: LIGHT_GRAY }),
              dataCell("Danh s\xE1ch vendor hi\u1EC7n t\u1EA1i", 2560, { bg: LIGHT_GRAY }),
            ]}),
          ]
        }),

        // ===== 7. TỔNG KẾT =====
        emptyLine(), emptyLine(),
        sectionTitle("7. T\u1ED5ng K\u1EBFt"),
        emptyLine(),

        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [4680, 1560, 1560, 1560],
          rows: [
            new TableRow({ children: [
              headerCell("H\u1EA1ng m\u1EE5c", 4680),
              headerCell("S\u1ED1 l\u01B0\u1EE3ng", 1560, { center: true }),
              headerCell("Tr\u1EA1ng th\xE1i", 1560, { center: true }),
              headerCell("Ghi ch\xFA", 1560),
            ]}),
            new TableRow({ children: [
              dataCell("T\u1ED5ng t\xE0i li\u1EC7u tr\xEAn SharePoint", 4680),
              dataCell("~25", 1560, { center: true }),
              dataCell("\u2705 C\xF3 s\u1EB5n", 1560, { center: true, color: TIER4_COLOR }),
              dataCell("C\u1EA7n \u0111\u1ECDc", 1560),
            ]}),
            new TableRow({ children: [
              dataCell("T\xE0i li\u1EC7u \u01AFu ti\xEAn 1 (\u0111\u1ECDc ngay)", 4680, { bg: LIGHT_GRAY }),
              dataCell("4", 1560, { center: true, bg: LIGHT_GRAY }),
              dataCell("\u01AFU TI\xCAN CAO", 1560, { center: true, color: TIER1_COLOR, bold: true, bg: LIGHT_GRAY }),
              dataCell("Tier 1", 1560, { bg: LIGHT_GRAY }),
            ]}),
            new TableRow({ children: [
              dataCell("T\xE0i li\u1EC7u \u01AFu ti\xEAn 2 (\u0111\u1ECDc s\u1EDBm)", 4680),
              dataCell("4", 1560, { center: true }),
              dataCell("QUAN TR\u1ECCNG", 1560, { center: true, color: TIER2_COLOR, bold: true }),
              dataCell("Tier 2", 1560),
            ]}),
            new TableRow({ children: [
              dataCell("T\xE0i li\u1EC7u \u01AFu ti\xEAn 3 (b\u1ED5 sung)", 4680, { bg: LIGHT_GRAY }),
              dataCell("5", 1560, { center: true, bg: LIGHT_GRAY }),
              dataCell("B\u1ED4 SUNG", 1560, { center: true, color: "B7950B", bold: true, bg: LIGHT_GRAY }),
              dataCell("Tier 3\u20134", 1560, { bg: LIGHT_GRAY }),
            ]}),
            new TableRow({ children: [
              dataCell("T\xE0i li\u1EC7u \u01AFu ti\xEAn 4 (tham kh\u1EA3o)", 4680),
              dataCell("7", 1560, { center: true }),
              dataCell("THAM KH\u1EA2O", 1560, { center: true, color: "7F8C8D", bold: true }),
              dataCell("Tier 4\u20135", 1560),
            ]}),
            new TableRow({ children: [
              dataCell("H\u1EA1ng m\u1EE5c c\u1EA7n h\u1ECDp ri\xEAng (ch\u01B0a c\xF3 t\xE0i li\u1EC7u)", 4680, { bg: LIGHT_GRAY }),
              dataCell("5", 1560, { center: true, bg: LIGHT_GRAY }),
              dataCell("\u26A0\uFE0F C\u1EA6N THU TH\u1EACP", 1560, { center: true, color: TIER1_COLOR, bold: true, bg: LIGHT_GRAY }),
              dataCell("L\xEAn l\u1ECBch h\u1ECDp", 1560, { bg: LIGHT_GRAY }),
            ]}),
          ]
        }),

        emptyLine(), emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT_COLOR, space: 1 } },
          spacing: { before: 400 },
          children: [new TextRun({
            text: "H\xE3y c\xF9ng ch\xFAng t\xF4i ki\u1EBFn t\u1EA1o t\u01B0\u01A1ng lai s\u1ED1!",
            bold: true, font: "Arial", size: 22, color: ACCENT_COLOR, italics: true
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80 },
          children: [new TextRun({
            text: "TienPhong CDS - D\u1EABn \u0111\u1EA7u Chuy\u1EC3n \u0111\u1ED5i s\u1ED1 Kinh doanh",
            font: "Arial", size: 18, color: "999999"
          })]
        }),
      ]
    }
  ]
});

// ===== EXPORT =====
const outputPath = "/Users/mac/Documents/Work/Projects/TIEN PHONG CDS/cto-ai-assistant/.claude/drafts/CDSxNOVA_UuTien_DocTaiLieu_eMarketing.docx";

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log("Created: " + outputPath);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
