/// <reference path="../pb_data/types.d.ts" />

// Crée les deux collections du portfolio :
//  - messages : les messages envoyés depuis le formulaire de contact
//  - projects : les projets affichés sur le site
// Cette migration s'applique automatiquement au lancement de `pocketbase serve`.

migrate(
  (app) => {
    // ---------- messages ----------
    const messages = new Collection({
      type: "base",
      name: "messages",
      // Tout le monde peut ENVOYER un message (formulaire du site)…
      createRule: "",
      // …mais seul toi (superuser, depuis l'admin) peux les lire, modifier ou supprimer.
      listRule: null,
      viewRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: "text", name: "name", required: true, min: 1, max: 120 },
        { type: "email", name: "email", required: true },
        { type: "text", name: "message", required: true, min: 1, max: 5000 },
        { type: "bool", name: "read" },
        { type: "autodate", name: "created", onCreate: true, onUpdate: false },
        { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
      ],
    });
    app.save(messages);

    // ---------- projects ----------
    const imageTypes = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"];
    const projects = new Collection({
      type: "base",
      name: "projects",
      // Lecture publique (le site en a besoin), écriture réservée à l'admin.
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        // Identification et ordre d'affichage
        { type: "text", name: "slug", required: true, max: 80, pattern: "^[a-z0-9-]+$", presentable: true },
        { type: "number", name: "order", required: true, onlyInt: true },
        { type: "bool", name: "published" },

        // Carte projet
        { type: "text", name: "title", required: true, max: 120 },
        { type: "text", name: "discipline", max: 120 },
        { type: "text", name: "year", max: 10 },
        { type: "text", name: "intro", max: 300 },
        { type: "file", name: "image", required: true, maxSelect: 1, maxSize: 10485760, mimeTypes: imageTypes, thumbs: ["800x0"] },
        { type: "text", name: "image_alt", max: 300 },
        { type: "text", name: "role", max: 300 },
        { type: "json", name: "deliverables", maxSize: 20000 },

        // Page détail
        { type: "text", name: "context", max: 2000 },
        { type: "text", name: "objective", max: 2000 },
        { type: "text", name: "approach", max: 2000 },
        { type: "text", name: "result", max: 2000 },
        { type: "text", name: "audience", max: 2000 },
        { type: "text", name: "message", max: 2000 },
        { type: "json", name: "choices", maxSize: 50000 },
        { type: "text", name: "perspective", max: 2000 },

        // Site du projet et visuels supplémentaires
        { type: "url", name: "website" },
        { type: "bool", name: "website_unavailable" },
        { type: "file", name: "gallery", maxSelect: 10, maxSize: 10485760, mimeTypes: imageTypes, thumbs: ["800x0"] },
        { type: "json", name: "gallery_info", maxSize: 20000 },

        { type: "autodate", name: "created", onCreate: true, onUpdate: false },
        { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
      ],
      indexes: ["CREATE UNIQUE INDEX idx_projects_slug ON projects (slug)"],
    });
    app.save(projects);
  },
  (app) => {
    for (const name of ["projects", "messages"]) {
      try {
        app.delete(app.findCollectionByNameOrId(name));
      } catch {
        // déjà supprimée
      }
    }
  },
);
