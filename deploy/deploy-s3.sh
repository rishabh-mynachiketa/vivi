#!/usr/bin/env bash
# Build and upload dist/ to s3://$S3_BUCKET/$S3_PREFIX with the cache headers netlify.toml used to set.
# Usage: S3_BUCKET=my-bucket [S3_PREFIX=home] [CF_DISTRIBUTION_ID=E123...] bash deploy/deploy-s3.sh
set -euo pipefail

: "${S3_BUCKET:?Set S3_BUCKET}"
PREFIX="${S3_PREFIX:-home}"
DEST="s3://$S3_BUCKET/$PREFIX"

cd "$(dirname "$0")/.."
npm run build

# Build output has hashed file names, so it can be cached forever
aws s3 sync dist/assets "$DEST/assets" --delete \
  --cache-control "public, max-age=31536000, immutable"

# Media keeps its file name: give a replaced file a new name to bust this cache
for dir in videos images benefits background; do
  aws s3 sync "dist/$dir" "$DEST/$dir" --delete \
    --cache-control "public, max-age=604800"
done

# Everything else (index.html, the embedded demo pages) is revalidated on every load.
# Uploaded last so index.html never points at assets that are not there yet.
aws s3 sync dist "$DEST" --delete \
  --exclude "assets/*" --exclude "videos/*" --exclude "images/*" \
  --exclude "benefits/*" --exclude "background/*" \
  --cache-control "public, max-age=0, must-revalidate"

if [ -n "${CF_DISTRIBUTION_ID:-}" ]; then
  aws cloudfront create-invalidation --distribution-id "$CF_DISTRIBUTION_ID" --paths "/*"
fi
