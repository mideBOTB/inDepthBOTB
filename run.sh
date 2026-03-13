#!/bin/sh

set -eu

PORT="${PORT:-4173}"

echo "Starting inDepth on http://localhost:${PORT}/demo.html"
echo "Press Ctrl+C to stop the server."

exec python3 -m http.server "${PORT}"
