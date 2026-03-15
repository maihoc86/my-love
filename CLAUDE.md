# CLAUDE.md - Project Instructions

## Project Overview
MyLoveThaiHoc - Personal app ghi nhận thông tin về người yêu (Thái Hoc).
Tech stack: React 19 + Vite 8 + Tailwind CSS 4 + Supabase + OpenRouter AI + Telegram Bot.

## Skills System

### Cách đọc skills từ `.claude/skills/`

Mỗi skill là một thư mục trong `.claude/skills/<skill-name>/` với cấu trúc:

```
.claude/skills/<skill-name>/
├── SKILL.md          # File chính - chứa frontmatter + hướng dẫn đầy đủ
├── references/       # (optional) Tài liệu tham khảo, frameworks
├── scripts/          # (optional) Scripts thực thi (Python, JS, etc.)
└── evals/            # (optional) Test cases cho skill
```

### Cách đọc SKILL.md

Mỗi `SKILL.md` có YAML frontmatter ở đầu file:

```yaml
---
name: <skill-name>              # Tên skill, dùng để invoke: /skill-name
description: <mô tả chi tiết>   # Mô tả + trigger keywords
license: MIT | Proprietary
metadata:                        # (optional)
  version: x.x.x
  author: ...
  category: ...
  domain: ...
  updated: YYYY-MM-DD
  integrations: ...              # Các service tích hợp (notion, telegram, etc.)
---
```

Phần body của SKILL.md chứa:
- **Keywords**: Từ khóa trigger skill
- **Quick Start**: Cách sử dụng nhanh
- **Chi tiết**: Hướng dẫn đầy đủ, templates, workflows

### Quy trình khi nhận request từ user

1. **Match skill**: Đọc `description` và `Keywords` trong SKILL.md để xác định skill phù hợp
2. **Invoke**: Dùng `Skill` tool với tên skill từ frontmatter `name`
3. **Follow instructions**: Làm theo hướng dẫn trong SKILL.md body
4. **Use references/scripts**: Nếu skill có thư mục `references/` hoặc `scripts/`, đọc và sử dụng khi cần

### Danh sách skills hiện có

| Skill | Mô tả ngắn |
|-------|-------------|
| `cto-advisor` | Tư vấn tech leadership, architecture decisions, tech debt |
| `daily-planner` | Quản lý task CTO hàng ngày qua Notion |
| `product-manager-toolkit` | RICE prioritization, PRD, user research |
| `docx` | Tạo/đọc/sửa file Word (.docx) |
| `xlsx` | Tạo/đọc/sửa file Excel (.xlsx) |
| `pptx` | Tạo/đọc/sửa file PowerPoint (.pptx) |
| `pdf` | Xử lý file PDF |
| `meeting-minutes` | Tạo biên bản cuộc họp (.docx) |
| `solution-proposal` | Tạo đề xuất giải pháp cho khách hàng |
| `technical-writer` | Tài liệu kỹ thuật (SRS, SDD, API docs) |
| `training-material` | Tài liệu đào tạo khách hàng |
| `internal-comms` | Truyền thông nội bộ (status reports, updates) |
| `content-strategy` | Content marketing B2B cho CDS |
| `launch-strategy` | Kế hoạch ra mắt sản phẩm/tính năng |
| `marketing-strategy-pmm` | Product marketing, positioning, GTM |
| `project-estimation` | Ước tính effort, timeline, chi phí |
| `ux-researcher-designer` | UX research, persona, journey map |
| `ui-ux-pro-max` | UI/UX design patterns, color palettes, fonts |
| `n8n-workflow-patterns` | Workflow automation patterns |
| `skill-creator` | Tạo/sửa/đánh giá skills |
| `agent-browser` | Browser automation |
| `planning-with-files` | File-based planning cho complex tasks |
| `stitch-loop` | Iterative website building |
| `vercel-react-best-practices` | React/Next.js performance optimization |
| `figma:implement-design` | Figma to code |
| `figma:code-connect-components` | Connect Figma components to code |
| `figma:create-design-system-rules` | Design system rules |

## User Stories

Khi cần liên kết hoặc tham chiếu đến User Story, **bắt buộc dùng file JSON**:

- **File**: `docs/user-stories.json`
- **Không dùng** file `.md` (đã xóa)
- **ID format**: `US-DASH-01`, `US-ENTRY-01`, `US-CHAT-01`, `US-CAL-01`, `US-SET-01~03` (stories cũ) và `US-1.5`, `US-1.6`, `US-5.1~5.5`, `US-6.1~6.5`, `US-7.1~7.4`, `US-8.1~8.2`, `US-9.1`, `US-10.1~10.2`, `US-11.1~11.2`, `US-12.1~12.3`, `US-13.1` (stories mới)

## Conventions

- Ngôn ngữ giao tiếp: Tiếng Việt
- Timezone: Asia/Ho_Chi_Minh
- Draft files lưu tại: `.claude/drafts/`
- Tailwind CSS 4: dùng `@tailwindcss/vite` plugin, KHÔNG dùng `tailwind.config.js`
- Dùng `--legacy-peer-deps` khi npm install (Vite 8 peer dep conflict)
