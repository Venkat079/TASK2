import { defineConfig } from "vite";

export default defineConfig({
  root: "docs",
  base: "/KeshavSoft_Task_2/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 5173,
  },
});
