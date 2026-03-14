# Claude Code Hooks - CTO Workflow Guardrails

Các hooks tự động kiểm tra chất lượng tài liệu trước khi gửi khách hàng, đảm bảo không lọt thông tin nội bộ, và tổ chức drafts có hệ thống.

## Danh sách Hooks

### Guardrails Bảo Mật
| Hook | Mục đích | Khi nào chạy |
|------|----------|-------------|
| `pre-commit-check.sh` | Kiểm tra secrets trong staged files | Trước khi git commit |
| `validate-client-ready.sh` | Kiểm tra tổng quát trước khi gửi khách | Trước khi gửi BẤT KỲ tài liệu nào cho client |

### Validate Nội Dung
| Hook | Mục đích | Khi nào chạy |
|------|----------|-------------|
| `validate-draft.sh` | Validate format cơ bản (placeholder, secrets) | Sau khi tạo bất kỳ draft nào |
| `validate-proposal.sh` | Kiểm tra proposal có đủ sections bắt buộc | Trước khi gửi proposal cho khách |
| `validate-architecture.sh` | Kiểm tra architecture doc đầy đủ | Trước khi present kiến trúc |

### Tổ Chức & Quản Lý
| Hook | Mục đích | Khi nào chạy |
|------|----------|-------------|
| `auto-organize-draft.sh` | Tự động phân loại và đặt tên draft | Sau khi tạo draft |

## Quy Trình Khuyến Nghị

### Khi tạo Proposal cho khách hàng:
```bash
# 1. Validate format cơ bản
bash .claude/hooks/validate-draft.sh .claude/drafts/proposal-xyz.md
# 2. Validate đầy đủ sections proposal
bash .claude/hooks/validate-proposal.sh .claude/drafts/proposal-xyz.md
# 3. Kiểm tra trước khi gửi khách hàng
bash .claude/hooks/validate-client-ready.sh .claude/drafts/proposal-xyz.md
# 4. Tổ chức vào đúng thư mục
bash .claude/hooks/auto-organize-draft.sh .claude/drafts/proposal-xyz.md proposal
```

### Khi tạo Architecture Document:
```bash
bash .claude/hooks/validate-architecture.sh .claude/drafts/arch-xyz.md
bash .claude/hooks/validate-client-ready.sh .claude/drafts/arch-xyz.md
```

### Khi tạo Email cho khách:
```bash
bash .claude/hooks/validate-draft.sh .claude/drafts/email-xyz.md
bash .claude/hooks/validate-client-ready.sh .claude/drafts/email-xyz.md
```

## Chi Tiết Kiểm Tra

### validate-client-ready.sh (QUAN TRỌNG NHẤT)
- **Bảo mật**: Không chứa credentials, secrets, API keys
- **Thông tin nội bộ**: Không lọt margin, cost price, profit, internal notes
- **Internal IP/URL**: Không chứa localhost, 192.168.x.x, .internal
- **Placeholder**: Không còn [TODO], [TBD], [PLACEHOLDER]
- **Dummy text**: Không còn lorem ipsum, test text
- **Branding**: Có mention Tiên Phong CDS
- **Ngày tháng**: Không có năm cũ/sai

### validate-proposal.sh
Sections bắt buộc: Tổng Quan, Giải Pháp, Timeline, Chi Phí, Đội Ngũ
Kiểm tra thêm: số liệu cụ thể, bảng so sánh, tech stack, rủi ro, CTA

### validate-architecture.sh
Bắt buộc: Overview, Diagram, Tech Stack, Database, API, Security
Khuyến nghị: Deployment, Scalability, Monitoring, DR
