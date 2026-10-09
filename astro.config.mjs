// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Remplace par l'URL finale du site une fois en ligne (utile pour le SEO).
  site: "https://example.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
