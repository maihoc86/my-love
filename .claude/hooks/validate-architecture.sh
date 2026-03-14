#!/bin/bash
# Hook: Validate Architecture Document
# Kiểm tra tài liệu kiến trúc có đủ các thành phần quan trọng
# Sử dụng: bash .claude/hooks/validate-architecture.sh <architecture-file>

set -e

ARCH_FILE="$1"

if [ -z "$ARCH_FILE" ]; then
    echo "Usage: validate-architecture.sh <architecture-file>"
    exit 1
fi

if [ ! -f "$ARCH_FILE" ]; then
    echo "❌ File không tồn tại: $ARCH_FILE"
    exit 1
fi

echo "🏗️  Validating architecture document: $ARCH_FILE"
echo "================================================"

ERRORS=0
WARNINGS=0

# === SECTIONS BẮT BUỘC CHO ARCHITECTURE DOC ===
echo ""
echo "🔍 Kiểm tra sections kiến trúc:"

check_section() {
    local pattern="$1"
    local name="$2"
    local required="$3"

    if grep -qi "$pattern" "$ARCH_FILE" 2>/dev/null; then
        echo "  ✅ $name"
        return 0
    else
        if [ "$required" = "required" ]; then
            echo "  ❌ THIẾU: $name"
            ((ERRORS++))
        else
            echo "  ⚠️  Nên có: $name"
            ((WARNINGS++))
        fi
        return 1
    fi
}

check_section "tổng quan\|overview\|system overview\|giới thiệu" "System Overview" "required"
check_section "kiến trúc\|architecture.*diagram\|sơ đồ\|component" "Architecture Diagram / Components" "required"
check_section "tech.*stack\|công nghệ\|technology" "Technology Stack" "required"
check_section "database\|cơ sở dữ liệu\|data.*model\|storage" "Data Layer / Database" "required"
check_section "api\|endpoint\|interface\|giao diện" "API / Interfaces" "required"
check_section "security\|bảo mật\|authentication\|authorization" "Security" "required"
check_section "deploy\|triển khai\|infrastructure\|hạ tầng" "Deployment / Infrastructure" "optional"
check_section "scale\|mở rộng\|performance\|hiệu năng" "Scalability / Performance" "optional"
check_section "monitor\|giám sát\|logging\|observability" "Monitoring / Observability" "optional"
check_section "disaster\|backup\|recovery\|DR" "Disaster Recovery" "optional"

# === KIỂM TRA DIAGRAM ===
echo ""
echo "🔍 Kiểm tra diagrams:"

# ASCII diagram hoặc mermaid
if grep -qE '(┌|└|├|│|─|→|←|↑|↓|\+--|```mermaid|graph |flowchart |sequenceDiagram)' "$ARCH_FILE" 2>/dev/null; then
    echo "  ✅ Có architecture diagram"
else
    echo "  ⚠️  Thiếu diagram - rất cần cho demo với khách hàng"
    ((WARNINGS++))
fi

# === KIỂM TRA NFRs (Non-Functional Requirements) ===
echo ""
echo "🔍 Kiểm tra Non-Functional Requirements:"

if grep -qE '(concurrent.*user|RPS|latency|response.*time|uptime|SLA|99\.[0-9]|millisecond|ms)' "$ARCH_FILE" 2>/dev/null; then
    echo "  ✅ Có performance targets cụ thể"
else
    echo "  ⚠️  Thiếu performance targets (concurrent users, latency, uptime)"
    ((WARNINGS++))
fi

if grep -qE '(cost|chi phí|monthly|tháng|USD|VND|\$/month)' "$ARCH_FILE" 2>/dev/null; then
    echo "  ✅ Có ước tính chi phí infrastructure"
else
    echo "  ⚠️  Thiếu ước tính chi phí infrastructure"
    ((WARNINGS++))
fi

# === KẾT QUẢ ===
echo ""
echo "================================================"
echo "📊 Kết quả: $ERRORS lỗi, $WARNINGS cảnh báo"

if [ "$ERRORS" -gt 0 ]; then
    echo "❌ KHÔNG ĐẠT - Cần bổ sung $ERRORS phần thiếu"
    exit 1
elif [ "$WARNINGS" -gt 0 ]; then
    echo "⚠️  ĐẠT CÓ ĐIỀU KIỆN - Nên bổ sung $WARNINGS phần"
    exit 0
else
    echo "✅ ĐẠT - Architecture document đầy đủ"
    exit 0
fi
