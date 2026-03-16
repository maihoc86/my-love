# Claude Code Hooks - MyLoveThaiHoc Mobile

Hooks tự động kiểm tra chất lượng code khi Claude Code edit/write files.

## Hooks đang hoạt động

| Hook | Event | Mục đích | Trigger |
|------|-------|----------|---------|
| `typecheck.sh` | PostToolUse (Write\|Edit) | Chạy `tsc --noEmit` sau khi sửa file .ts/.tsx | Tự động |
| `pre-commit-check.sh` | PreToolUse (Bash) | Kiểm tra secrets trước khi chạy git commit | Tự động |
| `lint-check.sh` | Manual | Chạy `expo lint` kiểm tra code style | Chạy tay khi cần |

## Cách hoạt động

- **typecheck.sh**: Sau mỗi lần Claude Code write/edit file TypeScript, hook tự động chạy `tsc --noEmit`. Nếu có lỗi, Claude sẽ thấy output lỗi và tự fix.
- **pre-commit-check.sh**: Trước khi Claude chạy Bash command, kiểm tra không có secrets (password, api_key, token...) bị commit.
- **lint-check.sh**: Chạy `npx expo lint` — dùng khi muốn kiểm tra code style thủ công.

## Exit codes

- `0` — Pass, tiếp tục bình thường
- `2` — Có lỗi, hiển thị cảnh báo cho Claude
