// Plan du site pour les moteurs de recherche : /sitemap.xml
// Généré à la demande pour inclure les projets publiés dans PocketBase.
import { getProjects } from "../lib/projects.js";

export const prerender = false;

const staticPages = ["/", "/projets", "/a-propos", "/contact", "/mentions-legales"];

export async function GET({ site }) {
  const projects = await getProjects();
  const urls = [...staticPages, ...projects.map((project) => `/projets/${project.slug}`)];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Netlify-CDN-Cache-Control": "public, durable, s-maxage=3600",
    },
  });
}
