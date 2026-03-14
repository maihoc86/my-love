#!/bin/bash
# Hook: Validate draft output
# Kiểm tra format và nội dung của file draft trước khi lưu

set -e

DRAFT_FILE="$1"

if [ -z "$DRAFT_FILE" ]; then
    echo "Usage: validate-draft.sh <draft-file>"
    exit 1
fi

if [ ! -f "$DRAFT_FILE" ]; then
    echo "❌ File không tồn tại: $DRAFT_FILE"
    exit 1
fi

echo "🔍 Validating draft: $DRAFT_FILE"

# Kiểm tra file không rỗng
if [ ! -s "$DRAFT_FILE" ]; then
    echo "❌ File draft rỗng!"
    exit 1
fi

# Kiểm tra không chứa placeholder chưa điền
PLACEHOLDERS=$(grep -c '\[.*TODO.*\]\|\[PLACEHOLDER\]\|\[TBD\]' "$DRAFT_FILE" 2>/dev/null || true)
if [ "$PLACEHOLDERS" -gt 0 ]; then
    echo "⚠️  Còn $PLACEHOLDERS placeholder chưa điền trong draft."
    echo "Các placeholder cần điền:"
    grep -n '\[.*TODO.*\]\|\[PLACEHOLDER\]\|\[TBD\]' "$DRAFT_FILE"
fi

# Kiểm tra không chứa secrets
if grep -i -E "(password|api_key|secret_key|private_key)\s*[:=]" "$DRAFT_FILE" >/dev/null 2>&1; then
    echo "❌ CẢNH BÁO: Phát hiện thông tin nhạy cảm trong draft!"
    exit 1
fi

echo "✅ Draft validation passed."
