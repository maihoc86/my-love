#!/bin/bash
# Hook: Kiểm tra trước khi commit
# Đảm bảo không có secrets hay thông tin nhạy cảm trong staged files

set -e

# Kiểm tra các pattern nhạy cảm
SENSITIVE_PATTERNS=(
    "password\s*="
    "api_key\s*="
    "secret\s*="
    "token\s*="
    "private_key"
    "AWS_ACCESS_KEY"
    "AWS_SECRET_KEY"
)

echo "🔍 Kiểm tra thông tin nhạy cảm trong staged files..."

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
    if git diff --cached --name-only -z | xargs -0 grep -l -i "$pattern" 2>/dev/null; then
        echo "⚠️  CẢNH BÁO: Phát hiện pattern nhạy cảm '$pattern' trong staged files!"
        echo "Vui lòng kiểm tra lại trước khi commit."
        exit 1
    fi
done

echo "✅ Không phát hiện thông tin nhạy cảm."
