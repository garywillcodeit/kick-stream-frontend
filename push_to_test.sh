# CREATE PRODUCTION ENV
if [ ! -f ".env.test" ]; then
  # Crée le fichier s'il n'existe pas
  touch .env.test
  echo "VITE_FRONTEND_URL='https://test.tiz-me.com'" >> .env.test
  echo "VITE_SERVER_URL='https://test.tiz-me.com'" >> .env.test
  echo "VITE_ENV='test'" >> .env.test
fi


# BUILD PROJECT
npm run build:test

# PUSH FILES TO S3
aws s3 sync dist/. s3://tizme-frontend-test --delete

# INVALIDATE DISTRIBUTOR
aws cloudfront create-invalidation --distribution-id E23LRPDPMGQHCX --paths "/index.html"