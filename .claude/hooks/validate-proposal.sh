#!/bin/bash
# Hook: Validate Technical Proposal
# Kiểm tra proposal có đủ các section bắt buộc trước khi gửi khách hàng
# Sử dụng: bash .claude/hooks/validate-proposal.sh <proposal-file>

set -e

PROPOSAL_FILE="$1"

if [ -z "$PROPOSAL_FILE" ]; then
    echo "Usage: validate-proposal.sh <proposal-file>"
    exit 1
fi

if [ ! -f "$PROPOSAL_FILE" ]; then
    echo "❌ File không tồn tại: $PROPOSAL_FILE"
    exit 1
fi

echo "📋 Validating proposal: $PROPOSAL_FILE"
echo "================================================"

ERRORS=0
WARNINGS=0

# === SECTIONS BẮT BUỘC ===
REQUIRED_SECTIONS=(
    "Tổng Quan\|Executive Summary\|Overview"
    "Giải Pháp\|Solution\|Proposed Solution"
    "Timeline\|Lộ Trình\|Kế Hoạch"
    "Chi Phí\|Cost\|Budget\|Ngân Sách\|Pricing"
    "Đội Ngũ\|Team\|Resource\|Nguồn Lực"
)

SECTION_NAMES=(
    "Tổng Quan / Executive Summary"
    "Giải Pháp Đề Xuất"
    "Timeline / Lộ Trình"
    "Chi Phí / Budget"
    "Đội Ngũ / Resources"
)

echo ""
echo "🔍 Kiểm tra sections bắt buộc:"
for i in "${!REQUIRED_SECTIONS[@]}"; do
    if grep -qi "${REQUIRED_SECTIONS[$i]}" "$PROPOSAL_FILE" 2>/dev/null; then
        echo "  ✅ ${SECTION_NAMES[$i]}"
    else
        echo "  ❌ THIẾU: ${SECTION_NAMES[$i]}"
        ((ERRORS++))
    fi
done

# === KIỂM TRA NỘI DUNG QUAN TRỌNG ===
echo ""
echo "🔍 Kiểm tra nội dung quan trọng:"

# Có số liệu cụ thể (giá, thời gian, số người)?
if grep -qE '[0-9]+\s*(triệu|tỷ|VND|USD|\$|ngày|tuần|tháng|người|FTE)' "$PROPOSAL_FILE" 2>/dev/null; then
    echo "  ✅ Có số liệu cụ thể (giá/thời gian/nhân lực)"
else
    echo "  ⚠️  Thiếu số liệu cụ thể - khách hàng cần thấy con số"
    ((WARNINGS++))
fi

# Có bảng so sánh hoặc alternatives?
if grep -qE '\|.*\|.*\|' "$PROPOSAL_FILE" 2>/dev/null; then
    echo "  ✅ Có bảng dữ liệu/so sánh"
else
    echo "  ⚠️  Nên thêm bảng so sánh để trực quan hơn"
    ((WARNINGS++))
fi

# Có mention technology stack?
if grep -qi "tech.*stack\|công nghệ\|framework\|React\|Node\|Python\|Java\|AWS\|Azure\|GCP" "$PROPOSAL_FILE" 2>/dev/null; then
    echo "  ✅ Có đề cập technology stack"
else
    echo "  ⚠️  Nên đề cập technology stack cụ thể"
    ((WARNINGS++))
fi

# Có phần rủi ro/mitigation?
if grep -qi "rủi ro\|risk\|mitigation\|giảm thiểu" "$PROPOSAL_FILE" 2>/dev/null; then
    echo "  ✅ Có phần đánh giá rủi ro"
else
    echo "  ⚠️  Nên thêm phần đánh giá rủi ro"
    ((WARNINGS++))
fi

# Có next steps / CTA?
if grep -qi "bước tiếp\|next step\|liên hệ\|contact\|hành động" "$PROPOSAL_FILE" 2>/dev/null; then
    echo "  ✅ Có Call-to-Action / Next Steps"
else
    echo "  ⚠️  Thiếu Next Steps - khách hàng không biết bước tiếp theo"
    ((WARNINGS++))
fi

# === KIỂM TRA BẢO MẬT ===
echo ""
echo "🔍 Kiểm tra bảo mật:"
if grep -iE "(password|api_key|secret|private_key|access_token)\s*[:=]" "$PROPOSAL_FILE" >/dev/null 2>&1; then
    echo "  ❌ CẢNH BÁO: Phát hiện thông tin nhạy cảm!"
    ((ERRORS++))
else
    echo "  ✅ Không có thông tin nhạy cảm"
fi

# Kiểm tra giá nội bộ / cost margin
if grep -iE "(margin|lợi nhuận|profit|markup|nội bộ|internal cost)" "$PROPOSAL_FILE" >/dev/null 2>&1; then
    echo "  ❌ CẢNH BÁO: Có thể chứa thông tin giá nội bộ - KHÔNG gửi cho khách!"
    ((ERRORS++))
else
    echo "  ✅ Không có thông tin giá nội bộ"
fi

# === KẾT QUẢ ===
echo ""
echo "================================================"
echo "📊 Kết quả: $ERRORS lỗi, $WARNINGS cảnh báo"

if [ "$ERRORS" -gt 0 ]; then
    echo "❌ KHÔNG ĐẠT - Cần sửa $ERRORS lỗi trước khi gửi khách hàng"
    exit 1
elif [ "$WARNINGS" -gt 0 ]; then
    echo "⚠️  ĐẠT CÓ ĐIỀU KIỆN - Nên xem xét $WARNINGS cảnh báo"
    exit 0
else
    echo "✅ ĐẠT - Proposal sẵn sàng gửi khách hàng"
    exit 0
fi
