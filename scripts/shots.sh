#!/usr/bin/env bash
# Screenshot the site at the viewports that matter.
#
# Uses the system Chrome — not a dependency, nothing to install. Until this
# existed every design pass on this project was done blind, by reading CSS
# and computing values, which is why visual defects survived four of them.
#
#   ./scripts/shots.sh                      # against the dev server
#   ./scripts/shots.sh https://example.com  # against production
#
# Output: .shots/<page>-<width>.png (gitignored)
set -euo pipefail

BASE="${1:-http://localhost:4321}"
OUT="${OUT:-.shots}"
mkdir -p "$OUT"

# The loader holds for 1400ms and slides for 480ms. Virtual time under
# 4000ms captures the loading screen instead of the page; 12000 is safe.
# Note virtual time freezes the typed tagline, so captures cannot be used
# to compare two different rotator terms.
BUDGET=12000

shoot () { # name url width height dpr
  timeout 90 google-chrome --headless --disable-gpu --no-sandbox \
    --hide-scrollbars --force-device-scale-factor="$5" \
    --virtual-time-budget="$BUDGET" --window-size="$3,$4" \
    --screenshot="$OUT/$1-$3.png" "$2" >/dev/null 2>&1 \
    && echo "  $OUT/$1-$3.png" || echo "  FAILED: $1 @ $3"
}

for page in "home:/" "blog:/blog" "post:/blog/first-post/" "notfound:/404"; do
  name="${page%%:*}"; path="${page##*:}"
  echo "$name"
  shoot "$name" "$BASE$path" 390 844 3     # phone, retina — 1x understates it
  shoot "$name" "$BASE$path" 768 1024 1    # tablet
  shoot "$name" "$BASE$path" 1440 900 1    # desktop
done
