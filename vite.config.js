import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // use the port the launcher assigns, so it never collides with another dev server
    port: Number(process.env.PORT) || 5173,
    strictPort: Boolean(process.env.PORT),
  },
});
