# CREATE PRODUCTION ENV
# if [ ! -f ".env.production" ]; then
#   # Crée le fichier s'il n'existe pas
#   touch .env.production
#  echo "VITE_FRONTEND_URL='https://tiz-me.com'" >> .env.production
#   echo "VITE_SERVER_URL='https://tiz-me.com'" >> .env.production
# fi


# BUILD PROJECT
npm run build

# PUSH FILES TO S3
aws s3 sync dist/. s3://tizme-frontend --delete

# INVALIDATE DISTRIBUTOR
aws cloudfront create-invalidation --distribution-id EGLPQQTBTNE4Q --paths "/index.html"

# aws cloudfront get-invalidation --distribution-id EGLPQQTBTNE4Q --id I1MO0CBVIK1GTH8F10696ROA5U

