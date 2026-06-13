#!/usr/bin/env bash
# Foundation test — validates structural integrity of the toolchain
# Run: bash tests/00-foundation.sh
#
# If this fails, nothing else matters. Fix the foundation first.

set -euo pipefail

FAILED=0

echo "=== Foundation Test Suite ==="
echo ""

# ---- Test 1: just build runs without error ----
echo "[1/3] just build: jekyll build completes"
BUILD_OUTPUT=$(just build 2>&1)
if echo "$BUILD_OUTPUT" | grep -q "done in"; then
  echo "  PASS: jekyll build completed"
else
  echo "  FAIL: jekyll build output unexpected"
  echo "$BUILD_OUTPUT" | head -10
  FAILED=1
fi

# ---- Test 2: just check passes without false positives ----
echo "[2/3] just check: no false positives"
CHECK_OUTPUT=$(just check 2>&1)
if echo "$CHECK_OUTPUT" | grep -qi "MISSING\|error"; then
  echo "  FAIL: check produced false positives"
  echo "$CHECK_OUTPUT" | grep -i "missing\|error\|fail"
  FAILED=1
else
  echo "  PASS: check ran cleanly"
fi

# ---- Test 3: all registries in sync ----
echo "[3/3] registries: all indexes up to date"
SYNC_OUTPUT=$(just reg-sync 2>&1)
if echo "$SYNC_OUTPUT" | grep -q "MISSING from index"; then
  echo "  FAIL: registry drift detected"
  echo "$SYNC_OUTPUT" | grep "MISSING\|⚠"
  FAILED=1
else
  echo "  PASS: all registries clean"
fi

echo ""
if [ $FAILED -eq 0 ]; then
  echo "ALL 3 FOUNDATION TESTS PASSED"
  exit 0
else
  echo "FOUNDATION TEST FAILURES DETECTED — fix before proceeding"
  exit 1
fi