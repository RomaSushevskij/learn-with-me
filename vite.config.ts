import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path";

import { fileURLToPath } from "url";
import { VitePWA } from "vite-plugin-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Learn With Me",
        short_name: "Learn With Me",
        theme_color: "#7E96FF",
        background_color: "#7E96FF",
        display: "standalone",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // 100 MB
        // runtimeCaching: [
        //   // Кэширование модели Vosk
        //   {
        //     urlPattern: /^\/models\/.*$/,
        //     handler: "CacheFirst",
        //     options: {
        //       cacheName: "models-cache",
        //       expiration: {
        //         maxEntries: 2000, // запас на все файлы модели
        //         maxAgeSeconds: 60 * 60 * 24 * 30, // месяц
        //       },
        //     },
        //   },
        //   // Статические ассеты (картинки, mp3 и т.д.)
        //   {
        //     urlPattern: /\.(?:png|jpg|jpeg|svg|gif|mp3)$/,
        //     handler: "CacheFirst",
        //     options: {
        //       cacheName: "static-assets",
        //       expiration: {
        //         maxEntries: 500,
        //         maxAgeSeconds: 60 * 60 * 24 * 30, // месяц
        //       },
        //     },
        //   },
        // ],
        globPatterns: [
          "**/*", // закэширует все файлы из dist, включая вложенные папки
        ],
        globDirectory: "dist", // указывает директорию для поиска файлов
        runtimeCaching: [
          {
            urlPattern: /^\/.*$/, // на случай динамических запросов
            handler: "CacheFirst",
            options: {
              cacheName: "runtime-cache",
              expiration: {
                maxEntries: 2000,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|mp3)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      node_modules: "./node_modules",
      public: "./public",
    },
  },
});
