// Contenu des projets.
// Plus tard, ces données pourront venir de PocketBase (collection "projects") :
// il suffira de remplacer l'export `projects` par un fetch au moment du build.

import funRide from "../assets/fun-ride.png";
import gestons from "../assets/gestons.png";
import gestonsAdditional from "../assets/gestons-additional.png";
import chateau from "../assets/chateau.png";
import olyvia from "../assets/olyvia.png";
import olyviaAdditional from "../assets/olyvia-additional.png";

export const projects = [
  {
    slug: "fun-ride",
    title: "The Fun Ride",
    discipline: "Campagne événementielle",
    year: "2026",
    image: funRide,
    alt: "Affiche colorée du projet snowboard The Fun Ride",
    intro: "Une identité libre et énergique pour un événement de snowboard.",
    role: "Direction artistique, affiche, déclinaisons",
    context:
      "The Fun Ride est un concept d’événement autour du snowboard. L’identité devait transmettre la vitesse, la liberté et l’énergie d’une journée en montagne.",
    objective:
      "Créer une affiche immédiatement identifiable et un univers capable de vivre sur plusieurs supports.",
    approach:
      "Une composition en mouvement, des couleurs franches et des formes inspirées des trajectoires laissées dans la neige.",
    result:
      "Un système visuel dynamique, pensé pour l’affichage et les réseaux sociaux.",
    deliverables: ["Direction artistique", "Affiche", "Déclinaisons social media"],
    audience:
      "Les amateurs de snowboard et les publics attirés par un événement de glisse convivial. La communication doit rendre l’esprit de l’événement perceptible avant même de lire les informations pratiques.",
    message:
      "Mettre en avant le plaisir de rider, la liberté et l’énergie collective plutôt qu’une logique de compétition.",
    choices: [
      {
        title: "Faire ressentir le mouvement",
        text: "Le snowboardeur et les formes qui traversent la composition donnent une direction au regard. L’affiche évoque une pratique en action, plutôt qu’une présentation figée de l’événement.",
      },
      {
        title: "Créer un repère mémorable",
        text: "Les accents colorés contrastent avec l’univers de la montagne. Le nom The Fun Ride devient un point de repère autour duquel se construit la reconnaissance de l’événement.",
      },
      {
        title: "Garder un message cohérent",
        text: "L’affiche et les déclinaisons social media partagent le même univers. L’enjeu de communication est de rester identifiable d’un support à l’autre, tout en adaptant la hiérarchie au format.",
      },
    ],
    perspective:
      "Ce projet illustre la façon dont une identité visuelle peut traduire la promesse d’un événement sportif : donner envie de participer avant de détailler le programme.",
  },
  {
    slug: "gestons",
    website: "https://gestons.fr/",
    websiteUnavailable: true,
    gallery: [
      {
        image: gestonsAdditional,
        alt: "Page Contact de GESTONS! : formulaire turquoise, éléments graphiques roses et navigation vers Home, Entraînement, Personnalisation, Battle et Compte",
        title: "La page Contact",
      },
    ],
    title: "GESTONS!",
    discipline: "Communication · UX/UI · Dev",
    year: "2026",
    image: gestons,
    alt: "Interface turquoise de l’application Gestons",
    intro: "Un apprentissage de la LSF ludique, accessible et collectif.",
    role: "Stratégie de communication, UX/UI, intégration",
    context:
      "Gestons! est une application web conçue en BUT MMI pour découvrir la langue des signes française à travers des mini-jeux.",
    objective:
      "Rendre l’apprentissage accessible, intuitif et suffisamment ludique pour donner envie de progresser.",
    approach:
      "Une navigation simple, des repères visuels constants et des mécaniques de jeu courtes adaptées à une utilisation régulière.",
    result:
      "Une application fonctionnelle accompagnée de plusieurs jeux et d’une stratégie de communication dédiée.",
    deliverables: ["Stratégie", "Identité", "UX/UI", "Développement web"],
    audience:
      "Les personnes qui souhaitent découvrir la langue des signes française, sans nécessairement connaître ses codes. Le premier contact doit être simple, accueillant et facile à comprendre.",
    message:
      "Présenter l’apprentissage de la LSF comme une découverte accessible, ludique et collective, sans minimiser l’importance de cette langue.",
    choices: [
      {
        title: "Expliquer la proposition",
        text: "La communication met en relation un sujet clairement nommé — la LSF — et un mode de découverte concret : les mini-jeux. Cette association aide à comprendre l’intérêt de l’application dès le premier contact.",
      },
      {
        title: "Accompagner les premiers pas",
        text: "Les repères visuels et la navigation simple soutiennent la prise en main. L’interface sert ici le message : il est possible de commencer à découvrir la LSF sans être déjà initié.",
      },
      {
        title: "Relier discours et expérience",
        text: "La stratégie de communication et les mécaniques de jeu doivent raconter la même chose. Le caractère ludique annoncé se retrouve dans des activités courtes et une expérience pensée pour revenir régulièrement.",
      },
    ],
    perspective:
      "GESTONS! relie communication et expérience numérique : une promesse claire doit trouver une réponse concrète dans l’utilisation du service.",
  },
  {
    slug: "montbeliard",
    title: "Le Château de Montbéliard",
    discipline: "Identité visuelle · Illustration",
    year: "2025",
    image: chateau,
    alt: "Illustration du château de Montbéliard",
    intro: "Le patrimoine local raconté par une affiche contemporaine.",
    role: "Illustration, composition, système d’affiches",
    context:
      "Ce projet valorise le château des ducs de Wurtemberg, monument emblématique de Montbéliard, auprès d’un public touristique.",
    objective:
      "Moderniser la représentation du patrimoine sans perdre les caractéristiques architecturales du lieu.",
    approach:
      "Une illustration géométrique, une palette contrastée et une composition éditoriale déclinable en série.",
    result:
      "Une identité touristique contemporaine qui donne au monument une présence forte et reconnaissable.",
    deliverables: ["Illustration", "Affiche touristique", "Système graphique"],
    audience:
      "Un public touristique qui découvre Montbéliard et son patrimoine. Le visuel doit donner envie de s’intéresser au lieu tout en permettant de reconnaître le monument représenté.",
    message:
      "Donner au château une présence contemporaine, sans effacer les éléments architecturaux qui font son identité.",
    choices: [
      {
        title: "Identifier le lieu",
        text: "Le château occupe une place centrale dans l’affiche. Ses volumes et ses tours constituent les repères essentiels : l’illustration simplifie la représentation sans perdre le sujet.",
      },
      {
        title: "Renouveler le regard",
        text: "Le traitement géométrique et la palette contrastée proposent une autre manière de montrer le patrimoine. Le monument devient le sujet d’une composition graphique, plutôt qu’une simple image documentaire.",
      },
      {
        title: "Penser une série cohérente",
        text: "La composition éditoriale et le système graphique sont pensés pour être déclinables. Ce principe permet de valoriser un lieu tout en conservant une cohérence avec d’autres supports touristiques.",
      },
    ],
    perspective:
      "Ce projet montre comment la communication peut rendre un patrimoine plus visible en trouvant un équilibre entre reconnaissance du lieu et renouvellement de sa représentation.",
  },
  {
    slug: "olyvia",
    website: "https://olyvia.sacha-martin.fr/",
    gallery: [
      {
        image: olyviaAdditional,
        alt: "Section Olyvia présentant les témoignages de Nathalie G. et Ludivine M. sur la ménopause, suivis des liens vers les réseaux sociaux",
        title: "Témoignages et réseaux sociaux",
      },
    ],
    title: "Olyvia!",
    discipline: "Stratégie · Webdesign",
    year: "2025",
    image: olyvia,
    alt: "Interface du site Olyvia consacré à la ménopause",
    intro: "Une expérience éditoriale claire, chaleureuse et rassurante.",
    role: "Benchmark, ligne éditoriale, webdesign",
    context:
      "Olyvia est un site éditorial imaginé pour informer et accompagner les femmes pendant la ménopause.",
    objective:
      "Clarifier des informations parfois complexes tout en créant un espace rassurant et facile à consulter.",
    approach:
      "Des contenus hiérarchisés, une navigation directe et une identité chaleureuse qui évite les codes médicaux froids.",
    result:
      "Une expérience lisible et bienveillante, centrée sur les besoins et les questions des utilisatrices.",
    deliverables: ["Benchmark", "Architecture de contenu", "Webdesign"],
    audience:
      "Les femmes qui recherchent des informations et des repères sur la ménopause. Les contenus doivent être faciles à trouver et à lire, dans un cadre qui inspire confiance.",
    message:
      "Informer et accompagner avec clarté et bienveillance, en évitant un discours froid ou inutilement complexe.",
    choices: [
      {
        title: "Partir des questions du public",
        text: "L’architecture de contenu donne la priorité aux besoins des utilisatrices. L’enjeu n’est pas seulement de publier des informations, mais de rendre leur consultation compréhensible et directe.",
      },
      {
        title: "Installer un ton rassurant",
        text: "La ligne éditoriale et l’identité chaleureuse participent à un même objectif : créer un espace d’accompagnement. La forme soutient la lecture sans détourner l’attention du contenu.",
      },
      {
        title: "Hiérarchiser l’information",
        text: "Le webdesign met en relation titres, contenus et navigation. Cette hiérarchie aide à distinguer les sujets et à parcourir le site sans multiplier les étapes inutiles.",
      },
    ],
    perspective:
      "Olyvia! illustre une communication centrée sur le public : la pertinence du contenu, le ton et l’organisation du site contribuent ensemble à la qualité de l’expérience.",
  },
];

// Ordre d'affichage dans les grilles (et numérotation 01, 02…)
const gridOrder = ["fun-ride", "montbeliard", "gestons", "olyvia"];

export const orderedProjects = gridOrder.map((slug, index) => ({
  ...projects.find((project) => project.slug === slug),
  number: String(index + 1).padStart(2, "0"),
}));

export const expertises = [
  ["Stratégie de communication", "Comprendre les publics, définir un positionnement et construire un message"],
  ["Contenus & réseaux sociaux", "Raconter le sport avec des contenus adaptés à chaque communauté"],
  ["Communication événementielle", "Donner de la visibilité aux événements et faire vivre leur identité"],
  ["Création de supports", "Mettre le design et les outils numériques au service de la communication"],
];
