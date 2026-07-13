import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.widget.tsx"),
      name: "CaasWidget",
      formats: ["iife"],
      fileName: () => "payment_widget.js",
    },
    rollupOptions: {
      external: [],
    },
    minify: true,
  },
  define: {
    // Replace process.env with empty object
    "process.env": {},
  },
});
