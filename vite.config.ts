import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    sitemap({
      hostname: "https://marcyovian.my.id",
      dynamicRoutes: ["/", "/about", "/projects", "/achievements", "/contacts"],
      generateRobotsTxt: true,
      robots: [{ userAgent: "*", allow: "/" }],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
