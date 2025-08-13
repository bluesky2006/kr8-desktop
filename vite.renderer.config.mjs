import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src/renderer", // where index.html will live
  base: "./",
  build: {
    outDir: "../../.vite/renderer/main_window", // electron-forge plugin expects this
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
