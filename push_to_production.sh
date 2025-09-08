
# BUILD PROJECT
npm run build

# PUSH FILES TO S3
aws s3 sync dist/. s3://kick-stream-frontend --delete

# INVALIDATE DISTRIBUTOR
aws cloudfront create-invalidation --distribution-id EGLPQQTBTNE4Q --paths "/index.html"

# aws cloudfront get-invalidation --distribution-id EGLPQQTBTNE4Q --id I1MO0CBVIK1GTH8F10696ROA5U

