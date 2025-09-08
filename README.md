# KickStream Frontend (User App)

This is the frontend of **KickStream**, a TikTok-style PWA for football content. It allows users to browse, like, comment, and upload short videos in a vertical infinite scroll format.

---

## 🔧 Tech Stack

- Vite.js + Javascript (Migration in progress to TypeScript)
- React components
- PWA support (installable on mobile)

---

## 📱 Features

- Infinite vertical scroll for videos (TikTok-style)
- User authentication: signup, email verification, login, logout, forgot password
- Video upload (authenticated users only)
- Likes (for both guests and logged-in users)
- Comments (only for authenticated users)
- Responsive layout (mobile-first)
- Progressive Web App (PWA): installable on supported devices

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/garywillcodeit/kick-stream-frontend
cd kick-stream-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file in the root folder with the following content:

```bash
VITE_SERVER_URL="http://your-local-ip-here:5000"
VITE_FRONTEND_URL="http://your-local-ip-here:5173"
VITE_ENV="development"
```

## 4. 🧠 Notes

- This frontend interacts with the KickStream backend API (Node.js)
- The video scroll, upload, and user interactions rely on the backend being live
- The default port is 5173 for local development

## 5. 📂 Project Structure (simplified)

public/ # Public assets
src/
├── assets/ # Static assets
├── components/ # Reusable UI components
├── pages/ # Main views (Home, Upload, Auth, etc.)
├── utils/ # API requests, credential config, helper functions, validators, static data
├── App.jsx # Main component
└── main.jsx # App initialization

## 6. 📝 Known Limitations

- No server-side rendering
- Accessibility (a11y) not fully optimized
- Content moderation is handled via the admin dashboard (not included here)

## 7. ✅ Project Status

- Stable MVP version
- Tested locally and deployed to AWS (via CloudFront + S3 and Route 53)
