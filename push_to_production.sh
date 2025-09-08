#!/bin/bash
set -e  # stop on error

# Load env vars
source .env

# BUILD PROJECT
npm run build

# PUSH FILES TO S3
aws s3 sync dist/. s3://$FRONTEND_S3_BUCKET --delete

# INVALIDATE DISTRIBUTOR
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/index.html"

echo "✅ Deployment complete!"