/// <reference path="../pb_data/types.d.ts" />

// Remplit la collection "projects" avec les 4 projets actuels du portfolio.
// Les images sont lues dans le dossier pocketbase/pb_seed/ : lance PocketBase
// depuis le dossier "pocketbase" (c'est ce que fait `npm run pb`).

const PROJECTS = [
  {
    "slug": "fun-ride",
    "order": 1,
    "published": true,
    "title": "The Fun Ride",
    "discipline": "Campagne événementielle",
    "year": "2026",
    "intro": "Une identité libre et énergique pour un événement de snowboard.",
    "image": "fun-ride.png",
    "image_alt": "Affiche colorée du projet snowboard The Fun Ride",
    "role": "Direction artistique, affiche, déclinaisons",
    "deliverables": [
      "Direction artistique",
      "Affiche",
      "Déclinaisons social media"
    ],
    "context": "The Fun Ride est un concept d’événement autour du snowboard. L’identité devait transmettre la vitesse, la liberté et l’énergie d’une journée en montagne.",
    "objective": "Créer une affiche immédiatement identifiable et un univers capable de vivre sur plusieurs supports.",
    "approach": "Une composition en mouvement, des couleurs franches et des formes inspirées des trajectoires laissées dans la neige.",
    "result": "Un système visuel dynamique, pensé pour l’affichage et les réseaux sociaux.",
    "audience": "Les amateurs de snowboard et les publics attirés par un événement de glisse convivial. La communication doit rendre l’esprit de l’événement perceptible avant même de lire les informations pratiques.",
    "message": "Mettre en avant le plaisir de rider, la liberté et l’énergie collective plutôt qu’une logique de compétition.",
    "choices": [
      {
        "title": "Faire ressentir le mouvement",
        "text": "Le snowboardeur et les formes qui traversent la composition donnent une direction au regard. L’affiche évoque une pratique en action, plutôt qu’une présentation figée de l’événement."
      },
      {
        "title": "Créer un repère mémorable",
        "text": "Les accents colorés contrastent avec l’univers de la montagne. Le nom The Fun Ride devient un point de repère autour duquel se construit la reconnaissance de l’événement."
      },
      {
        "title": "Garder un message cohérent",
        "text": "L’affiche et les déclinaisons social media partagent le même univers. L’enjeu de communication est de rester identifiable d’un support à l’autre, tout en adaptant la hiérarchie au format."
      }
    ],
    "perspective": "Ce projet illustre la façon dont une identité visuelle peut traduire la promesse d’un événement sportif : donner envie de participer avant de détailler le programme.",
    "website": "",
    "website_unavailable": false,
    "gallery": [],
    "gallery_info": []
  },
  {
    "slug": "montbeliard",
    "order": 2,
    "published": true,
    "title": "Le Château de Montbéliard",
    "discipline": "Identité visuelle · Illustration",
    "year": "2025",
    "intro": "Le patrimoine local raconté par une affiche contemporaine.",
    "image": "chateau.png",
    "image_alt": "Illustration du château de Montbéliard",
    "role": "Illustration, composition, système d’affiches",
    "deliverables": [
      "Illustration",
      "Affiche touristique",
      "Système graphique"
    ],
    "context": "Ce projet valorise le château des ducs de Wurtemberg, monument emblématique de Montbéliard, auprès d’un public touristique.",
    "objective": "Moderniser la représentation du patrimoine sans perdre les caractéristiques architecturales du lieu.",
    "approach": "Une illustration géométrique, une palette contrastée et une composition éditoriale déclinable en série.",
    "result": "Une identité touristique contemporaine qui donne au monument une présence forte et reconnaissable.",
    "audience": "Un public touristique qui découvre Montbéliard et son patrimoine. Le visuel doit donner envie de s’intéresser au lieu tout en permettant de reconnaître le monument représenté.",
    "message": "Donner au château une présence contemporaine, sans effacer les éléments architecturaux qui font son identité.",
    "choices": [
      {
        "title": "Identifier le lieu",
        "text": "Le château occupe une place centrale dans l’affiche. Ses volumes et ses tours constituent les repères essentiels : l’illustration simplifie la représentation sans perdre le sujet."
      },
      {
        "title": "Renouveler le regard",
        "text": "Le traitement géométrique et la palette contrastée proposent une autre manière de montrer le patrimoine. Le monument devient le sujet d’une composition graphique, plutôt qu’une simple image documentaire."
      },
      {
        "title": "Penser une série cohérente",
        "text": "La composition éditoriale et le système graphique sont pensés pour être déclinables. Ce principe permet de valoriser un lieu tout en conservant une cohérence avec d’autres supports touristiques."
      }
    ],
    "perspective": "Ce projet montre comment la communication peut rendre un patrimoine plus visible en trouvant un équilibre entre reconnaissance du lieu et renouvellement de sa représentation.",
    "website": "",
    "website_unavailable": false,
    "gallery": [],
    "gallery_info": []
  },
  {
    "slug": "gestons",
    "order": 3,
    "published": true,
    "title": "GESTONS!",
    "discipline": "Communication · UX/UI · Dev",
    "year": "2026",
    "intro": "Un apprentissage de la LSF ludique, accessible et collectif.",
    "image": "gestons.png",
    "image_alt": "Interface turquoise de l’application Gestons",
    "role": "Stratégie de communication, UX/UI, intégration",
    "deliverables": [
      "Stratégie",
      "Identité",
      "UX/UI",
      "Développement web"
    ],
    "context": "Gestons! est une application web conçue en BUT MMI pour découvrir la langue des signes française à travers des mini-jeux.",
    "objective": "Rendre l’apprentissage accessible, intuitif et suffisamment ludique pour donner envie de progresser.",
    "approach": "Une navigation simple, des repères visuels constants et des mécaniques de jeu courtes adaptées à une utilisation régulière.",
    "result": "Une application fonctionnelle accompagnée de plusieurs jeux et d’une stratégie de communication dédiée.",
    "audience": "Les personnes qui souhaitent découvrir la langue des signes française, sans nécessairement connaître ses codes. Le premier contact doit être simple, accueillant et facile à comprendre.",
    "message": "Présenter l’apprentissage de la LSF comme une découverte accessible, ludique et collective, sans minimiser l’importance de cette langue.",
    "choices": [
      {
        "title": "Expliquer la proposition",
        "text": "La communication met en relation un sujet clairement nommé — la LSF — et un mode de découverte concret : les mini-jeux. Cette association aide à comprendre l’intérêt de l’application dès le premier contact."
      },
      {
        "title": "Accompagner les premiers pas",
        "text": "Les repères visuels et la navigation simple soutiennent la prise en main. L’interface sert ici le message : il est possible de commencer à découvrir la LSF sans être déjà initié."
      },
      {
        "title": "Relier discours et expérience",
        "text": "La stratégie de communication et les mécaniques de jeu doivent raconter la même chose. Le caractère ludique annoncé se retrouve dans des activités courtes et une expérience pensée pour revenir régulièrement."
      }
    ],
    "perspective": "GESTONS! relie communication et expérience numérique : une promesse claire doit trouver une réponse concrète dans l’utilisation du service.",
    "website": "https://gestons.fr/",
    "website_unavailable": true,
    "gallery": [
      "gestons-additional.png"
    ],
    "gallery_info": [
      {
        "title": "La page Contact",
        "alt": "Page Contact de GESTONS! : formulaire turquoise, éléments graphiques roses et navigation vers Home, Entraînement, Personnalisation, Battle et Compte"
      }
    ]
  },
  {
    "slug": "olyvia",
    "order": 4,
    "published": true,
    "title": "Olyvia!",
    "discipline": "Stratégie · Webdesign",
    "year": "2025",
    "intro": "Une expérience éditoriale claire, chaleureuse et rassurante.",
    "image": "olyvia.png",
    "image_alt": "Interface du site Olyvia consacré à la ménopause",
    "role": "Benchmark, ligne éditoriale, webdesign",
    "deliverables": [
      "Benchmark",
      "Architecture de contenu",
      "Webdesign"
    ],
    "context": "Olyvia est un site éditorial imaginé pour informer et accompagner les femmes pendant la ménopause.",
    "objective": "Clarifier des informations parfois complexes tout en créant un espace rassurant et facile à consulter.",
    "approach": "Des contenus hiérarchisés, une navigation directe et une identité chaleureuse qui évite les codes médicaux froids.",
    "result": "Une expérience lisible et bienveillante, centrée sur les besoins et les questions des utilisatrices.",
    "audience": "Les femmes qui recherchent des informations et des repères sur la ménopause. Les contenus doivent être faciles à trouver et à lire, dans un cadre qui inspire confiance.",
    "message": "Informer et accompagner avec clarté et bienveillance, en évitant un discours froid ou inutilement complexe.",
    "choices": [
      {
        "title": "Partir des questions du public",
        "text": "L’architecture de contenu donne la priorité aux besoins des utilisatrices. L’enjeu n’est pas seulement de publier des informations, mais de rendre leur consultation compréhensible et directe."
      },
      {
        "title": "Installer un ton rassurant",
        "text": "La ligne éditoriale et l’identité chaleureuse participent à un même objectif : créer un espace d’accompagnement. La forme soutient la lecture sans détourner l’attention du contenu."
      },
      {
        "title": "Hiérarchiser l’information",
        "text": "Le webdesign met en relation titres, contenus et navigation. Cette hiérarchie aide à distinguer les sujets et à parcourir le site sans multiplier les étapes inutiles."
      }
    ],
    "perspective": "Olyvia! illustre une communication centrée sur le public : la pertinence du contenu, le ton et l’organisation du site contribuent ensemble à la qualité de l’expérience.",
    "website": "https://olyvia.sacha-martin.fr/",
    "website_unavailable": false,
    "gallery": [
      "olyvia-additional.png"
    ],
    "gallery_info": [
      {
        "title": "Témoignages et réseaux sociaux",
        "alt": "Section Olyvia présentant les témoignages de Nathalie G. et Ludivine M. sur la ménopause, suivis des liens vers les réseaux sociaux"
      }
    ]
  }
];

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("projects");

    // Cherche une image de départ dans pb_seed/ (renvoie null si introuvable)
    const seedFile = (name) => {
      for (const dir of ["pb_seed", "pocketbase/pb_seed"]) {
        try {
          return $filesystem.fileFromPath(dir + "/" + name);
        } catch {
          // essaie le dossier suivant
        }
      }
      console.log("[seed] image introuvable : " + name);
      return null;
    };

    for (const data of PROJECTS) {
      const record = new Record(collection);
      for (const [key, value] of Object.entries(data)) {
        if (key === "image" || key === "gallery") continue;
        record.set(key, value);
      }

      const image = seedFile(data.image);
      if (image) record.set("image", image);

      const gallery = data.gallery.map(seedFile).filter(Boolean);
      if (gallery.length) record.set("gallery", gallery);

      app.save(record);
    }
  },
  (app) => {
    for (const { slug } of PROJECTS) {
      try {
        app.delete(app.findFirstRecordByData("projects", "slug", slug));
      } catch {
        // déjà supprimé
      }
    }
  },
);
