# env-guard.sh — Environment readiness checks with clear escalation on failure
# Source this in justfile recipes that require the flox-managed toolchain
# Usage: . scripts/env-guard.sh  (POSIX-compatible, works in /bin/sh)

# ---- Guard: require_ruby_env ----
# Verifies Jekyll can run in the flox-managed environment.
# Escalates with a clear message if the environment doesn't meet requirements.
# Uses underscores (POSIX) not hyphens for function name compatibility.
require_ruby_env() {
  # Try flox-managed Ruby first (preferred)
  flox_check=$(flox activate -c "bundle exec jekyll --version 2>&1" 2>/dev/null) || flox_check=""

  if echo "$flox_check" | grep -qi "jekyll\|Routing\|Server" 2>/dev/null; then
    return 0
  fi

  # Try brew Ruby as fallback
  if [ -x "/opt/homebrew/opt/ruby/bin/bundle" ]; then
    brew_check=$(/opt/homebrew/opt/ruby/bin/bundle exec jekyll --version 2>&1) || brew_check=""
    if echo "$brew_check" | grep -qi "jekyll\|Routing\|Server" 2>/dev/null; then
      echo "WARN: using brew Ruby (flox not fully configured)" >&2
      return 0
    fi
  fi

  # Escalate
  echo "ERROR: Jekyll toolchain not available." >&2
  echo "" >&2
  echo "  Run:  eval \"\$(just activate 2>/dev/null)\"  to activate flox environment" >&2
  echo "  Or:   eval \"\$(flox activate 2>/dev/null)\"   for direct activation" >&2
  echo "  Then: just build  (or just preview)" >&2
  return 1
}