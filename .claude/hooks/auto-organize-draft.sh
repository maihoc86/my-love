#!/bin/bash
# Hook: Auto-organize Draft
# Tự động phân loại và đặt tên draft theo quy chuẩn
# Sử dụng: bash .claude/hooks/auto-organize-draft.sh <draft-file> [category]
# Categories: email, proposal, report, architecture, adr, prototype

set -e

DRAFT_FILE="$1"
CATEGORY="${2:-auto}"
DRAFTS_DIR=".claude/drafts"
DATE=$(date +%Y-%m-%d)

if [ -z "$DRAFT_FILE" ]; then
    echo "Usage: auto-organize-draft.sh <draft-file> [email|proposal|report|architecture|adr|prototype]"
    exit 1
fi

if [ ! -f "$DRAFT_FILE" ]; then
    echo "❌ File không tồn tại: $DRAFT_FILE"
    exit 1
fi

# Auto-detect category nếu không chỉ định
if [ "$CATEGORY" = "auto" ]; then
    CONTENT=$(head -20 "$DRAFT_FILE")

    if echo "$CONTENT" | grep -qi "kính gửi\|dear\|subject:\|email"; then
        CATEGORY="email"
    elif echo "$CONTENT" | grep -qi "proposal\|đề xuất\|giải pháp đề xuất"; then
        CATEGORY="proposal"
    elif echo "$CONTENT" | grep -qi "báo cáo\|report\|metrics\|KPI"; then
        CATEGORY="report"
    elif echo "$CONTENT" | grep -qi "kiến trúc\|architecture\|system design\|infrastructure"; then
        CATEGORY="architecture"
    elif echo "$CONTENT" | grep -qi "ADR\|decision record\|quyết định"; then
        CATEGORY="adr"
    elif echo "$CONTENT" | grep -qi "prototype\|demo\|mockup\|POC\|proof of concept"; then
        CATEGORY="prototype"
    else
        CATEGORY="misc"
    fi
    echo "🔍 Auto-detected category: $CATEGORY"
fi

# Tạo thư mục con theo category
TARGET_DIR="$DRAFTS_DIR/$CATEGORY"
mkdir -p "$TARGET_DIR"

# Tạo tên file chuẩn
BASENAME=$(basename "$DRAFT_FILE" | sed 's/\.[^.]*$//')
EXT="${DRAFT_FILE##*.}"
NEW_NAME="${CATEGORY}-${BASENAME}-${DATE}.${EXT}"
TARGET_PATH="$TARGET_DIR/$NEW_NAME"

# Tránh ghi đè
COUNTER=1
while [ -f "$TARGET_PATH" ]; do
    NEW_NAME="${CATEGORY}-${BASENAME}-${DATE}-v${COUNTER}.${EXT}"
    TARGET_PATH="$TARGET_DIR/$NEW_NAME"
    ((COUNTER++))
done

# Di chuyển file
cp "$DRAFT_FILE" "$TARGET_PATH"
echo "✅ Organized: $TARGET_PATH"
echo "   Category: $CATEGORY"
echo "   Date: $DATE"

# Nếu file gốc không nằm trong drafts dir, giữ nguyên
if [[ "$DRAFT_FILE" == "$DRAFTS_DIR"/* ]]; then
    rm "$DRAFT_FILE"
    echo "   (File gốc đã di chuyển)"
else
    echo "   (Giữ file gốc, copy vào drafts)"
fi
