# BUILD PROJECT
npm run build:test

# PUSH FILES TO S3
aws s3 sync dist/. s3://kick-stream-frontend-test --delete

# INVALIDATE DISTRIBUTOR
aws cloudfront create-invalidation --distribution-id E23LRPDPMGQHCX --paths "/index.html"