import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "MonkeyLite",
        short_name: "MonkeyLite",
        description: "A lite clone of MonkeyType",
        theme_color: "#323437",
        background_color: "#323437",
        display: "standalone",
        icons: [
          {
            src: "/ShortcutMobile.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/ShortcutPC.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/ShortcutPC.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
