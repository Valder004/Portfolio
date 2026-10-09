# Portfolio — Valentin Deroo

Portfolio de communication sportive, construit avec **Astro**, **Tailwind CSS v4** et du **JavaScript** vanilla.
Design d'origine : maquette Figma Make.

## Démarrer

```bash
npm install     # une seule fois
npm run dev     # site en local sur http://localhost:4321
npm run build   # version de production dans dist/
npm run preview # tester la version de production
```

## Où modifier quoi

| Je veux changer…                       | Fichier                         |
| -------------------------------------- | ------------------------------- |
| Email, téléphone, liens réseaux        | `src/data/site.js`              |
| Textes et images des projets           | `src/data/projects.js`          |
| L'ordre des projets                    | `gridOrder` dans `projects.js`  |
| Les pages                              | `src/pages/`                    |
| En-tête, menu, pied de page            | `src/layouts/Layout.astro`      |
| Couleurs, polices, styles              | `src/styles/global.css`         |
| Images                                 | `src/assets/` (optimisées automatiquement) |

Les couleurs de la maquette sont aussi disponibles en classes Tailwind :
`bg-paper`, `bg-ink`, `text-orange`, `bg-sand`, `font-display`, `font-mono`…

## Structure

```
src/
├── assets/        images (converties en WebP et redimensionnées au build)
├── components/    ProjectCard, ProjectImage (avec visionneuse)
├── data/          contenus : site.js, projects.js
├── layouts/       Layout.astro
├── lib/           contact.js (envoi du formulaire)
├── pages/         une page = une URL
├── scripts/       menu mobile, visionneuse d'images
└── styles/        global.css
```

## PocketBase (plus tard)

Le formulaire de contact ouvre pour l'instant l'application mail du visiteur.
Pour l'envoyer vers PocketBase, suis les étapes en haut de `src/lib/contact.js`,
puis copie `.env.example` en `.env` et renseigne `PUBLIC_POCKETBASE_URL`.

Les projets pourront aussi être stockés dans PocketBase : il suffira de remplacer
le contenu de `src/data/projects.js` par une requête à l'API.
