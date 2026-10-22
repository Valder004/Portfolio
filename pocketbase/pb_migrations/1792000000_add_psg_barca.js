/// <reference path="../pb_data/types.d.ts" />

// Ajoute le projet « PSG – FC Barcelone » (affiche de match).
// L'image est lue dans pb_seed/psg-barca.jpg. Si le projet existe déjà ou si
// l'image est introuvable, la migration ne fait rien (PocketBase démarre quand même).

const PROJECT = {
  slug: "psg-barca",
  order: 5,
  published: true,
  title: "PSG – FC Barcelone",
  discipline: "Direction artistique · Design graphique",
  year: "2026",
  intro: "Une affiche de match pour annoncer un grand rendez-vous européen au Parc des Princes, pensée pour Instagram.",
  image_alt: "Affiche du match PSG – FC Barcelone en Ligue des champions, mardi 20 octobre à 21h00 au Parc des Princes",
  role: "Direction artistique, design graphique",
  deliverables: ["Affiche de match", "Format réseaux sociaux (Instagram, 1080 × 1350 px)"],
  objective: "Annoncer un grand match européen avec un visuel qui transmet l’ambiance d’une soirée de Ligue des champions à Paris.",
  context: "Affiche réalisée dans le cadre d’un projet personnel, pour annoncer la rencontre PSG – FC Barcelone en Ligue des champions, le mardi 20 octobre à 21h00 au Parc des Princes.",
  audience: "Les supporters et les abonnés aux réseaux sociaux du club, qui découvrent le visuel en faisant défiler leur fil. L’information doit être captée en quelques secondes.",
  message: "Faire d’un match européen au Parc des Princes un événement : une soirée de gala dans la Ville Lumière.",
  approach: "Une affiche lumineuse, une hiérarchie claire et des informations lisibles au premier coup d’œil.",
  choices: [
    {
      title: "Mettre en scène l’identité du club",
      text: "Le blason passe en filigrane derrière l’entraîneur, au centre de la composition. Il affirme l’identité parisienne et crée de la profondeur, sans entrer en concurrence avec les personnages.",
    },
    {
      title: "Traduire la Ville Lumière en images",
      text: "Des faisceaux de projecteurs, des points lumineux et des scintillements évoquent à la fois l’éclairage d’un stade un soir de match et les lumières de Paris. Le visuel raconte l’ambiance avant même que l’on lise le texte.",
    },
    {
      title: "Hiérarchiser l’information",
      text: "La lecture suit un ordre précis : la compétition, le duel, la date, puis le lieu. Le bas de l’affiche, plus sombre, accueille ces informations pour garantir leur lisibilité sur un écran de téléphone.",
    },
  ],
  result: "Une affiche de match prête à être publiée sur Instagram, qui associe identité du club, ambiance européenne et information claire.",
  perspective: "Une affiche sportive ne se contente pas d’annoncer une date : elle doit faire ressentir l’événement. Ce projet relie l’identité d’un club, l’émotion d’un grand match et une information immédiatement lisible.",
};

migrate(
  (app) => {
    // Déjà présent, ou déjà transformé en page « Affiches sportives » : rien à faire
    for (const slug of [PROJECT.slug, "affiches-sportives"]) {
      try {
        app.findFirstRecordByData("projects", "slug", slug);
        console.log("[psg-barca] projet déjà présent, rien à faire");
        return;
      } catch {
        // pas encore créé
      }
    }

    let image = null;
    for (const dir of ["pb_seed", "pocketbase/pb_seed", "/opt/pocketbase/pb_seed"]) {
      try {
        image = $filesystem.fileFromPath(dir + "/psg-barca.jpg");
        break;
      } catch {
        // essaie le dossier suivant
      }
    }
    if (!image) {
      console.log("[psg-barca] image pb_seed/psg-barca.jpg introuvable, projet non créé");
      return;
    }

    const record = new Record(app.findCollectionByNameOrId("projects"));
    for (const [key, value] of Object.entries(PROJECT)) record.set(key, value);
    record.set("image", image);
    app.save(record);
  },
  (app) => {
    try {
      app.delete(app.findFirstRecordByData("projects", "slug", PROJECT.slug));
    } catch {
      // déjà supprimé
    }
  },
);
