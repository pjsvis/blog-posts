#!/usr/bin/env bash
# Test: .gitignore is committed and _exported/ is properly excluded
# Run: bash tests/05-git-clean.sh

set -euo pipefail

FAILURES=""

# 1. .gitignore must be tracked and up to date in git
if ! git ls-files --error-unmatch .gitignore >/dev/null 2>&1; then
  echo "FAIL: .gitignore is not tracked in git"
  exit 1
fi

if git diff --quiet .gitignore 2>/dev/null; then
  :  # .gitignore is clean
else
  echo "FAIL: .gitignore has uncommitted changes — stage and commit it"
  git diff --stat .gitignore
  exit 1
fi

# 2. _exported/ must be in .gitignore
if ! grep -q "^_exported/$" .gitignore 2>/dev/null; then
  echo "FAIL: _exported/ is not in .gitignore"
  exit 1
fi

# 3. .flox/ must be in .gitignore
if ! grep -q "^\.flox/$" .gitignore 2>/dev/null; then
  echo "FAIL: .flox/ is not in .gitignore"
  exit 1
fi

# 4. Check for any accidentally tracked files in _exported/ or .flox/
EXPORTED_TRACKED=$(git ls-files _exported/ 2>/dev/null | wc -l)
FLOX_TRACKED=$(git ls-files .flox/ 2>/dev/null | wc -l)

if [ "$EXPORTED_TRACKED" -gt 0 ]; then
  echo "FAIL: _exported/ contains tracked files — add to .gitignore"
  git ls-files _exported/
  exit 1
fi

if [ "$FLOX_TRACKED" -gt 0 ]; then
  echo "FAIL: .flox/ contains tracked files — add to .gitignore"
  git ls-files .flox/
  exit 1
fi

echo "PASS: git clean — .gitignore clean, _exported/ and .flox/ excluded"
exit 0