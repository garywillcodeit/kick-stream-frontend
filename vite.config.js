import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      VitePWA({
        includeAssets: [
          "favicon.ico",
          "img/logo/apple-touch-icon.png",
          "img/logo/mask-icon.svg",
        ],
        manifest: {
          name: "TizMe App",
          short_name: "TizMe",
          description:
            "The #1 adult scrolling content app, offering personalized, immersive, high-quality adult videos anytime, anywhere.",
          theme_color: "#000000",
          background_color: "#000000",
          display: "standalone",
          orientation: "portrait",
          icons: [
            {
              src: "img/logo/logo-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "img/logo/logo-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
          screenshots: [
            {
              src: "img/screenshots/shot1.jpeg",
              sizes: "1080x1920",
              type: "image/jpeg",
              form_factor: "narrow",
            },
            {
              src: "img/screenshots/shot2.jpeg",
              sizes: "1080x1920",
              type: "image/jpeg",
              form_factor: "narrow",
            },
            {
              src: "img/screenshots/shot3.jpeg",
              sizes: "1080x1920",
              type: "image/jpeg",
              form_factor: "narrow",
            },
            {
              src: "img/screenshots/shot4.jpeg",
              sizes: "1920x1080",
              type: "image/jpeg",
              form_factor: "wide",
            },
            {
              src: "img/screenshots/shot5.jpeg",
              sizes: "1920x1080",
              type: "image/jpeg",
              form_factor: "wide",
            },
            {
              src: "img/screenshots/shot6.jpeg",
              sizes: "1920x1080",
              type: "image/jpeg",
              form_factor: "wide",
            },
          ],
        },
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg}"],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /.*\.(?:png|jpg|jpeg|svg|webp|avif)/,
              handler: "CacheFirst",
              options: {
                cacheName: "images-cache",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
            {
              urlPattern: /.*\.(?:js|css|html)/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "static-resources",
              },
            },
          ],
        },
      }),
    ],
    server: {
      // https: {
      //   key: fs.readFileSync("../../192.168.1.31-key.pem"),
      //   cert: fs.readFileSync("../../192.168.1.31.pem"),
      // },
      host: "0.0.0.0",
      port: 5173,
    },
    define: {
      "process.env": env,
    },
  };
});
