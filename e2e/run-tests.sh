#!/bin/bash
# ============================================================
# MyLoveThaiHoc - E2E Test Runner
# Usage:
#   ./e2e/run-tests.sh              # Run all tests
#   ./e2e/run-tests.sh smoke        # Run smoke tests only
#   ./e2e/run-tests.sh auth         # Run auth tests only
#   ./e2e/run-tests.sh tabs         # Run tab tests only
#   ./e2e/run-tests.sh features     # Run feature tests only
# ============================================================

set -e

# Ensure Java 17 and Maestro are in PATH
export PATH="/usr/local/opt/openjdk@17/bin:$HOME/.maestro/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FLOWS_DIR="$SCRIPT_DIR/flows"
REPORTS_DIR="$SCRIPT_DIR/reports"

# Create reports directory
mkdir -p "$REPORTS_DIR"

# Determine which tag to filter
TAG="${1:-}"

echo "╔══════════════════════════════════════════════════╗"
echo "║  MyLoveThaiHoc E2E Tests (Maestro)              ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Check prerequisites
if ! command -v maestro &>/dev/null; then
    echo "❌ Maestro not found. Install: curl -Ls https://get.maestro.mobile.dev | bash"
    exit 1
fi

echo "✅ Maestro $(maestro --version 2>/dev/null | head -1)"
echo "📁 Flows: $FLOWS_DIR"
echo ""

if [ -n "$TAG" ]; then
    echo "🏷️  Running tests with tag: $TAG"
    echo "─────────────────────────────────────────"
    maestro test "$FLOWS_DIR" \
        --include-tags="$TAG" \
        --output "$REPORTS_DIR/report-$TAG.xml" \
        --format junit \
        2>&1
else
    echo "🧪 Running ALL test flows..."
    echo "─────────────────────────────────────────"
    maestro test "$FLOWS_DIR" \
        --output "$REPORTS_DIR/report-all.xml" \
        --format junit \
        2>&1
fi

echo ""
echo "─────────────────────────────────────────"
echo "📊 Reports saved to: $REPORTS_DIR/"
echo "📸 Screenshots saved to: ~/.maestro/tests/"
echo "✅ Done!"
