import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react({
      babel: { babelrc: true },
    }),
  ],
  build: {
    sourcemap: false,
    outDir: "dist",
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/",
});
