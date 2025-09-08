# KickStream Frontend (User App)

**KickStream** is a TikTok-style PWA for football content. Users can browse, like, comment, and upload short videos in a vertical infinite scroll format.

---

## 🔧 Tech Stack

- Vite.js + React (JavaScript → migration in progress to TypeScript)
- Sass for styling
- PWA support (installable on mobile)
- Deployed on AWS (S3 + CloudFront + Route 53)

---

## 📱 Features

- Infinite vertical video scroll (TikTok-style UX)
- User authentication (signup, email verification, login, password reset)
- Video upload (authenticated users only)
- Likes (for guests & logged-in users)
- Comments (authenticated users only)
- Responsive design (mobile-first)
- Installable as a PWA on supported devices

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/username/kick-stream-frontend
cd kick-stream-frontend
```

### 2. Install dependencies

```bash
npm install

```

### 3. Create a .env file in the root folder with the following content:

```bash
VITE_SERVER_URL="http://<your-local-ip-here>:<your-api-port-here>"
VITE_FRONTEND_URL="http://<your-local-ip-here>:5173"
VITE_ENV="development"
```

### 4. Start the dev server

```bash
npm run dev
```

## 🏗️ Architecture (simplified)

- Frontend → React + Vite → S3 + CloudFront
- Backend API → Node.js (Express) on EC2 with Nginx
- Storage → S3 (videos, assets)
- Distribution → CloudFront + Route 53 (custom domain)

## 📂 Project Structure (simplified)

```bash
public/ # Public assets
src/
├── assets/ # Static assets
├── components/ # Reusable UI components
├── pages/ # Main views (Home, Upload, Auth, etc.)
├── utils/ # Helpers, validators, API client
├── App.jsx # Root component
└── main.jsx # App initialization
```

## 🧠 Notes

- This frontend relies on the [KickStream backend API](https://github.com/garywillcodeit/kick-stream-backend) (Node.js).
- The scroll, upload, and auth flows require the backend to be live.
- Default dev port is 5173.

## ⚠️ Known Limitations

- No server-side rendering (CSR only)
- Accessibility (a11y) improvements needed
- Content moderation handled via the admin dashboard (not included here)

## ✅ Project Status

- Stable MVP version
- Tested locally & deployed to AWS (CloudFront + S3 + Route 53)
- 🔗 [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)] available at [https://kick-stream.agence-gvam.fr](https://kick-stream.agence-gvam.fr) 7/24
- ⚠️ To keep cloud costs under control, the video & image processing pipeline (python + FFmpeg + ClamAV) is currently run locally.  
  For demo purposes, it is usually online during French daytime hours (approx. 9am – 8pm CET).

## 🔮 Future Improvements

- Full migration to TypeScript
- Add server-side rendering (SEO, performance)
- Improve accessibility (a11y)
- Integrate content moderation in the main app
- Deploy media pipeline fully to AWS (Lambda or Fargate)
