/// <reference path="../pb_data/types.d.ts" />

// Transforme le projet « PSG – FC Barcelone » en page « Affiches sportives »
// qui regroupe toutes les affiches (images lues dans pb_seed/).
// - ajoute le champ "gallery_grid" : galerie affichée en grille + image animée sur la card
// - met à jour le projet existant (ou le crée s'il n'existe pas)
// En cas de problème, la migration écrit un message et laisse PocketBase démarrer.

const POSTERS = [
  {
    file: "psg-barca.jpg",
    title: "PSG – FC Barcelone",
    text: "Annoncer un match de Ligue des champions au Parc des Princes comme une soirée de gala dans la Ville Lumière.",
    alt: "Affiche du match PSG – FC Barcelone en Ligue des champions, mardi 20 octobre à 21h00 au Parc des Princes",
  },
  {
    file: "back-to-back.jpg",
    title: "Champions d’Europe",
    text: "Célébrer un second titre européen consécutif : le « 2 » géant et le « Back to Back » racontent l’exploit, l’or et les confettis la fête.",
    alt: "Affiche « Back to Back, Champions d’Europe 2025 · 2026 » : un joueur du PSG crie sa joie devant un grand chiffre 2 rouge et or",
  },
  {
    file: "octobre-rose.jpg",
    title: "Octobre Rose au FCSM",
    text: "Mettre la visibilité d’un club au service du dépistage du cancer du sein : un chiffre fort, « 1 femme sur 8 », et un appel simple à en parler.",
    alt: "Affiche Octobre Rose du FC Sochaux-Montbéliard au stade Bonal : trois joueurs en maillot rose, « 1 femme sur 8 » et « Le dépistage, parlons-en »",
  },
];

const PROJECT = {
  slug: "affiches-sportives",
  published: true,
  title: "Affiches sportives",
  discipline: "Direction artistique · Design graphique",
  year: "2026",
  intro: "Une série d’affiches pour les réseaux sociaux de clubs de football : annonce de match, célébration de titre et campagne de sensibilisation.",
  image_alt: POSTERS[0].alt,
  role: "Direction artistique, design graphique",
  deliverables: [
    "Affiche de match",
    "Affiche de célébration",
    "Affiche de sensibilisation",
    "Formats réseaux sociaux (Instagram, 1080 × 1350 px)",
  ],
  objective: "Concevoir des visuels qui font ressentir un moment de sport (l’avant-match, la victoire, un engagement) et qui transmettent leur information en quelques secondes.",
  context: "Une série d’affiches réalisées dans le cadre de projets personnels (visuels non officiels), autour de trois situations que vit la communication d’un club : annoncer un match, célébrer un titre et porter une cause.",
  audience: "Les supporters et les abonnés aux réseaux sociaux des clubs, qui découvrent les visuels en faisant défiler leur fil. L’information doit être captée en quelques secondes, sur un écran de téléphone.",
  message: "Faire de chaque moment de sport un événement : une soirée de gala, une victoire historique, un engagement collectif.",
  approach: "Une même méthode d’une affiche à l’autre : une ambiance forte, une hiérarchie claire et des informations lisibles au premier coup d’œil.",
  choices: [
    {
      title: "Mettre en scène l’identité du club",
      text: "Le blason, les couleurs et les maillots structurent chaque composition. Placé en filigrane, le blason affirme l’identité du club et crée de la profondeur, sans entrer en concurrence avec les joueurs.",
    },
    {
      title: "Faire ressentir l’émotion",
      text: "Projecteurs et scintillements pour une soirée de Ligue des champions, or et confettis pour un titre, rose et lumière douce pour Octobre Rose : l’ambiance raconte le moment avant même que l’on lise le texte.",
    },
    {
      title: "Hiérarchiser l’information",
      text: "La lecture suit un ordre précis : le titre, l’information clé, puis la date ou le lieu. Le bas des affiches, plus sombre, accueille le texte pour garantir sa lisibilité sur un écran de téléphone.",
    },
  ],
  result: "Une série d’affiches prêtes à être publiées sur Instagram, qui associent identité de club, émotion et information claire.",
  perspective: "Une affiche sportive ne se contente pas d’annoncer une information : elle doit faire ressentir l’événement. Ces projets relient l’identité d’un club, l’émotion d’un moment et un message immédiatement lisible.",
  gallery_grid: true,
  gallery_info: POSTERS.map(({ title, text, alt }) => ({ title, text, alt })),
};

migrate(
  (app) => {
    try {
      // 1. Nouveau champ "gallery_grid"
      const collection = app.findCollectionByNameOrId("projects");
      if (!collection.fields.getByName("gallery_grid")) {
        collection.fields.add(new BoolField({ name: "gallery_grid" }));
        app.save(collection);
      }

      // 2. Les images
      const seedFile = (name) => {
        for (const dir of ["pb_seed", "pocketbase/pb_seed", "/opt/pocketbase/pb_seed"]) {
          try {
            return $filesystem.fileFromPath(dir + "/" + name);
          } catch {
            // essaie le dossier suivant
          }
        }
        return null;
      };
      const files = POSTERS.map((poster) => seedFile(poster.file));
      if (files.some((file) => !file)) {
        console.log("[affiches] images introuvables dans pb_seed/, projet non modifié");
        return;
      }

      // 3. Projet existant (PSG – FC Barcelone) ou nouveau projet
      let record = null;
      for (const slug of ["psg-barca", "affiches-sportives"]) {
        try {
          record = app.findFirstRecordByData("projects", "slug", slug);
          break;
        } catch {
          // essaie le slug suivant
        }
      }
      if (!record) {
        record = new Record(app.findCollectionByNameOrId("projects"));
        record.set("order", 5);
      }

      for (const [key, value] of Object.entries(PROJECT)) record.set(key, value);
      record.set("image", seedFile(POSTERS[0].file));
      record.set("gallery", files);
      app.save(record);
    } catch (error) {
      console.log("[affiches] migration ignorée : " + error);
    }
  },
  (app) => {
    // Pas de retour en arrière automatique : le projet peut être modifié dans l'admin.
  },
);
