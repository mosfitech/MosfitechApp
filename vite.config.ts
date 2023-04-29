import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/MosfitechApp/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      devOptions: {
        enabled: false,
      },
      manifest: {
        theme_color: "#417505",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/MosfitechApp/",
        name: "MosfitechApp",
        short_name: "MosfitechApp",
        description: "All In One Rental Apps",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
