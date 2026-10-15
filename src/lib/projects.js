// Récupère les projets à afficher.
//
// - Si PUBLIC_POCKETBASE_URL est renseigné (fichier .env), les projets viennent de
//   PocketBase (collection "projects", uniquement ceux cochés "published").
// - Sinon, ou si PocketBase ne répond pas, le site utilise src/data/projects.js.
//
// Le site est statique : les projets sont lus au moment du `npm run build`
// (et à chaque rechargement de page en `npm run dev`).

import { orderedProjects as localProjects } from "../data/projects.js";

const POCKETBASE_URL = (import.meta.env.PUBLIC_POCKETBASE_URL ?? "").replace(/\/+$/, "");

/** URL publique d'un fichier PocketBase */
function fileUrl(record, filename) {
  return `${POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${encodeURIComponent(filename)}`;
}

/** Convertit un enregistrement PocketBase au format utilisé par les composants */
export function toProject(record, index) {
  const galleryInfo = Array.isArray(record.gallery_info) ? record.gallery_info : [];
  return {
    slug: record.slug,
    number: String(index + 1).padStart(2, "0"),
    title: record.title,
    discipline: record.discipline,
    year: record.year,
    intro: record.intro,
    image: record.image ? fileUrl(record, record.image) : undefined,
    alt: record.image_alt ?? "",
    role: record.role,
    deliverables: Array.isArray(record.deliverables) ? record.deliverables : [],
    context: record.context,
    objective: record.objective,
    approach: record.approach,
    result: record.result,
    audience: record.audience,
    message: record.message,
    choices: Array.isArray(record.choices) ? record.choices : [],
    perspective: record.perspective,
    website: record.website || undefined,
    websiteUnavailable: Boolean(record.website_unavailable),
    gallery: (record.gallery ?? []).map((filename, i) => ({
      image: fileUrl(record, filename),
      alt: galleryInfo[i]?.alt ?? "",
      title: galleryInfo[i]?.title ?? `Visuel ${i + 1}`,
    })),
  };
}

let cache;

/** @returns {Promise<Array>} les projets triés et numérotés (01, 02…) */
export async function getProjects() {
  // En production (build) on ne charge qu'une fois ; en dev on relit à chaque page.
  if (cache && import.meta.env.PROD) return cache;
  if (!POCKETBASE_URL) return (cache = localProjects);

  try {
    const params = new URLSearchParams({ sort: "order", perPage: "100", filter: "published = true" });
    const response = await fetch(`${POCKETBASE_URL}/api/collections/projects/records?${params}`);
    if (!response.ok) throw new Error(`réponse ${response.status}`);
    const { items } = await response.json();
    if (!items?.length) throw new Error("aucun projet publié");
    cache = items.filter((record) => record.image).map(toProject);
    return cache;
  } catch (error) {
    console.warn(`[projets] PocketBase indisponible (${error.message}) → projets locaux utilisés.`);
    return localProjects;
  }
}

/** Discipline + année pour l'affichage, ex. « Communication, UX/UI, Dev (2026) » */
export function projectMeta(project) {
  const discipline = (project.discipline ?? "").split(/\s*·\s*/).filter(Boolean).join(", ");
  return project.year ? `${discipline} (${project.year})` : discipline;
}
