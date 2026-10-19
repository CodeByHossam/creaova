import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  // Order matters: Tailwind first so its output is available to the RR pipeline.
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    // `~/foo` -> `app/foo`. Mirrored in tsconfig.json paths.
    alias: {
      "~": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
});
