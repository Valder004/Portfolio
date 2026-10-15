// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Lit le fichier .env pour autoriser Astro à optimiser les images venant de PocketBase
const { PUBLIC_POCKETBASE_URL } = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

const remotePatterns = [];
if (PUBLIC_POCKETBASE_URL) {
  const url = new URL(PUBLIC_POCKETBASE_URL);
  remotePatterns.push({
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
    ...(url.port && { port: url.port }),
  });
}

// https://astro.build/config
export default defineConfig({
  // Adresse finale du site (utile pour le référencement)
  site: site: "https://portfolio.valentin-deroo.fr",,
  image: {
    remotePatterns,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Autorise le partage du serveur de dev via le transfert de ports de VS Code (Azure Dev Tunnels)
      allowedHosts: [".devtunnels.ms"],
    },
  },
});
