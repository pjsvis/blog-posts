#!/usr/bin/env bash
# Foundation test — validates structural integrity of the toolchain
# Run: bash tests/00-foundation.sh
#
# If this fails, nothing else matters. Fix the foundation first.

set -euo pipefail

FAILED=0

echo "=== Foundation Test Suite ==="
echo ""

# ---- Test 1: env-guard detects flox Ruby correctly ----
echo "[1/5] env-guard: require-ruby-env passes with flox active"
. scripts/env-guard.sh 2>/dev/null || true
if require_ruby_env 2>&1; then
  echo "  PASS"
else
  echo "  FAIL: require-ruby-env exited non-zero with flox available"
  FAILED=1
fi

# ---- Test 2: just build uses flox-managed Ruby (not system 2.6) ----
echo "[2/5] just build: runs without system Ruby contamination"
BUILD_OUTPUT=$(just build 2>&1)
if echo "$BUILD_OUTPUT" | grep -q "done in"; then
  echo "  PASS: jekyll build completed"
else
  echo "  FAIL: jekyll build output unexpected"
  echo "$BUILD_OUTPUT" | head -10
  FAILED=1
fi

# ---- Test 3: just check passes with empty _posts/ (no false positive) ----
echo "[3/5] just check: clean pass with empty posts directory"
CHECK_OUTPUT=$(just check 2>&1)
if echo "$CHECK_OUTPUT" | grep -q "no posts to validate"; then
  echo "  PASS: empty posts handled correctly"
else
  echo "  FAIL: check produced false positive with no posts"
  echo "$CHECK_OUTPUT" | grep -i "missing\|error\|fail"
  FAILED=1
fi

# ---- Test 4: all registries in sync ----
echo "[4/5] registries: all indexes up to date"
SYNC_OUTPUT=$(just reg-sync 2>&1)
if echo "$SYNC_OUTPUT" | grep -q "MISSING from index"; then
  echo "  FAIL: registry drift detected"
  echo "$SYNC_OUTPUT" | grep "MISSING\|⚠"
  FAILED=1
else
  echo "  PASS: all registries clean"
fi

# ---- Test 5: flox ruby on PATH (not system 2.6) ----
echo "[5/5] flox ruby: version >= 3.0 on PATH"
eval "$(just activate 2>/dev/null)" 2>/dev/null
RUBY_VER=$(ruby --version 2>/dev/null)
if echo "$RUBY_VER" | grep -q "ruby 2\.6"; then
  echo "  FAIL: system ruby 2.6 still on PATH after activation"
  echo "  Found: $RUBY_VER"
  FAILED=1
elif echo "$RUBY_VER" | grep -qE "ruby (3\.|4\.)"; then
  echo "  PASS: flox ruby active — $RUBY_VER"
else
  echo "  FAIL: unexpected ruby version — $RUBY_VER"
  FAILED=1
fi

echo ""
if [ $FAILED -eq 0 ]; then
  echo "ALL 5 FOUNDATION TESTS PASSED"
  exit 0
else
  echo "FOUNDATION TEST FAILURES DETECTED — fix before proceeding"
  exit 1
fi