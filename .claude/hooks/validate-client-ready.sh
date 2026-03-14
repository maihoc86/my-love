#!/bin/bash
# Hook: Validate Client-Ready Document
# Kiểm tra tổng quát trước khi gửi BẤT KỲ tài liệu nào cho khách hàng
# Sử dụng: bash .claude/hooks/validate-client-ready.sh <file>

set -e

DOC_FILE="$1"

if [ -z "$DOC_FILE" ]; then
    echo "Usage: validate-client-ready.sh <document-file>"
    exit 1
fi

if [ ! -f "$DOC_FILE" ]; then
    echo "❌ File không tồn tại: $DOC_FILE"
    exit 1
fi

echo "📄 Client-Ready Check: $DOC_FILE"
echo "================================================"

ERRORS=0
WARNINGS=0

# === 1. KIỂM TRA BẢO MẬT - KHÔNG LỌT THÔNG TIN NỘI BỘ ===
echo ""
echo "🔒 Kiểm tra bảo mật:"

# Secrets
if grep -iE "(password|api_key|secret_key|private_key|access_token|bearer)\s*[:=]" "$DOC_FILE" >/dev/null 2>&1; then
    echo "  ❌ Chứa credentials/secrets!"
    ((ERRORS++))
else
    echo "  ✅ Không có credentials"
fi

# Thông tin nội bộ
INTERNAL_PATTERNS="margin|markup|nội bộ|internal only|confidential|lợi nhuận ròng|profit margin|cost price|giá gốc|giá vốn"
if grep -iE "$INTERNAL_PATTERNS" "$DOC_FILE" >/dev/null 2>&1; then
    echo "  ❌ Có thể chứa thông tin nội bộ (margin/cost/confidential)"
    echo "     Các dòng nghi vấn:"
    grep -inE "$INTERNAL_PATTERNS" "$DOC_FILE" | head -5
    ((ERRORS++))
else
    echo "  ✅ Không có thông tin nội bộ"
fi

# IP addresses, internal URLs
if grep -oE '(192\.168\.|10\.\d+\.|172\.(1[6-9]|2[0-9]|3[01])\.|localhost|127\.0\.0\.1|\.internal\.|\.local)' "$DOC_FILE" >/dev/null 2>&1; then
    echo "  ⚠️  Chứa internal IP/URL - kiểm tra lại trước khi gửi"
    ((WARNINGS++))
else
    echo "  ✅ Không có internal IP/URL"
fi

# === 2. KIỂM TRA CHẤT LƯỢNG NỘI DUNG ===
echo ""
echo "📝 Kiểm tra chất lượng:"

# Placeholder chưa điền
PLACEHOLDERS=$(grep -cE '\[TODO\]|\[TBD\]|\[PLACEHOLDER\]|\[FILL\]|\[XXX\]|\[___\]|<TÊN>|<SỐ>|<NGÀY>' "$DOC_FILE" 2>/dev/null || true)
if [ "$PLACEHOLDERS" -gt 0 ]; then
    echo "  ❌ Còn $PLACEHOLDERS placeholder chưa điền"
    grep -nE '\[TODO\]|\[TBD\]|\[PLACEHOLDER\]|\[FILL\]|\[XXX\]|\[___\]|<TÊN>|<SỐ>|<NGÀY>' "$DOC_FILE" | head -5
    ((ERRORS++))
else
    echo "  ✅ Không còn placeholder"
fi

# Lorem ipsum / dummy text
if grep -qi "lorem ipsum\|dummy text\|sample text\|test test\|xxx xxx" "$DOC_FILE" 2>/dev/null; then
    echo "  ❌ Chứa dummy text (lorem ipsum / test)"
    ((ERRORS++))
else
    echo "  ✅ Không có dummy text"
fi

# Kiểm tra tên công ty Tiên Phong CDS có xuất hiện (branding)
if grep -qi "Tiên Phong\|TPCDS\|TP CDS" "$DOC_FILE" 2>/dev/null; then
    echo "  ✅ Có branding Tiên Phong CDS"
else
    echo "  ⚠️  Chưa có branding công ty - cân nhắc thêm"
    ((WARNINGS++))
fi

# === 3. KIỂM TRA FORMAT ===
echo ""
echo "🎨 Kiểm tra format:"

# Có tiêu đề
if head -5 "$DOC_FILE" | grep -q "^#\|^Subject:\|^Kính gửi\|^Dear" 2>/dev/null; then
    echo "  ✅ Có tiêu đề/header"
else
    echo "  ⚠️  Thiếu tiêu đề rõ ràng"
    ((WARNINGS++))
fi

# Không quá dài (>500 dòng cho email, ok cho proposal)
LINE_COUNT=$(wc -l < "$DOC_FILE" | tr -d ' ')
if echo "$DOC_FILE" | grep -qi "email"; then
    if [ "$LINE_COUNT" -gt 100 ]; then
        echo "  ⚠️  Email quá dài ($LINE_COUNT dòng) - nên ngắn gọn hơn"
        ((WARNINGS++))
    else
        echo "  ✅ Độ dài phù hợp ($LINE_COUNT dòng)"
    fi
else
    echo "  ℹ️  Tài liệu $LINE_COUNT dòng"
fi

# === 4. KIỂM TRA NGÀY THÁNG ===
echo ""
echo "📅 Kiểm tra ngày tháng:"

# Ngày cũ (>6 tháng trước)
CURRENT_YEAR=$(date +%Y)
LAST_YEAR=$((CURRENT_YEAR - 1))
TWO_YEARS_AGO=$((CURRENT_YEAR - 2))

if grep -qE "(202[0-3]|$TWO_YEARS_AGO)" "$DOC_FILE" 2>/dev/null; then
    echo "  ⚠️  Chứa năm cũ - kiểm tra lại timeline có còn đúng không"
    ((WARNINGS++))
else
    echo "  ✅ Không có ngày tháng quá cũ"
fi

# === KẾT QUẢ ===
echo ""
echo "================================================"
echo "📊 Kết quả: $ERRORS lỗi, $WARNINGS cảnh báo"

if [ "$ERRORS" -gt 0 ]; then
    echo ""
    echo "❌ CHƯA SẴN SÀNG GỬI KHÁCH HÀNG"
    echo "   Cần sửa $ERRORS lỗi nghiêm trọng trước."
    exit 1
elif [ "$WARNINGS" -gt 0 ]; then
    echo ""
    echo "⚠️  GẦN SẴN SÀNG - Nên xem xét $WARNINGS cảnh báo"
    exit 0
else
    echo ""
    echo "✅ SẴN SÀNG GỬI KHÁCH HÀNG"
    exit 0
fi
