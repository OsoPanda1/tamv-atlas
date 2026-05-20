#!/usr/bin/env bash
set -euo pipefail
mkdir -p data/bookpi
COMMIT_HASH="${1:-$(git rev-parse HEAD)}"
TS="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
PAYLOAD_FILE="data/bookpi/bookpi-block-latest.json"
PREV_HASH="$(jq -r '.blockHash // "0"' "$PAYLOAD_FILE" 2>/dev/null || echo 0)"
CONTENT=$(jq -nc --arg commit "$COMMIT_HASH" --arg ts "$TS" --arg prev "$PREV_HASH" '{commit:$commit,timestamp:$ts,previousHash:$prev}')
BLOCK_HASH="sha256:$(printf '%s' "$CONTENT" | sha256sum | awk '{print $1}')"
jq -nc --argjson c "$CONTENT" --arg h "$BLOCK_HASH" '{version:"5.0.0",content:$c,blockHash:$h,ipfs:"pending"}' > "$PAYLOAD_FILE"
echo "BookPI block generated: $BLOCK_HASH"
