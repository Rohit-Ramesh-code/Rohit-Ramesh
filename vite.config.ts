import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // When deploying to GitHub Pages under a repo (e.g. https://<user>.github.io/Rohit-Ramesh/)
  // set base to the repo name. For local dev this will be '/'.
  base: mode === 'production' ? '/Rohit-Ramesh/' : '/',
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

