# Portfolio — Valentin Deroo

Portfolio de communication sportive, construit avec **Astro**, **Tailwind CSS v4** et du **JavaScript** vanilla.
Design d'origine : maquette Figma Make.

- **Site en ligne :** https://portfolio.valentin-deroo.fr
- **Livrables :** [journal de bord](JOURNAL.md) · [déclaration IA](IA.md) · [contrôle qualité](QUALITE.md)

## Technologies et librairies déclarées

| Outil | Rôle | Pourquoi |
|---|---|---|
| Astro 5 | framework, pages et composants | HTML léger, peu de JavaScript envoyé, pages statiques et pages à la demande dans le même projet |
| Tailwind CSS v4 | styles (classes dans le HTML, thème dans `@theme`) | adapté à ma direction artistique : couleurs du logo, Graduate + Archivo, aucun thème tout fait |
| @astrojs/netlify | adaptateur de déploiement | rendu à la demande des pages projets et optimisation des images |
| JavaScript sans librairie | menu, visionneuse, diaporama, tableau tactique | interactions légères, écrites pour le site |
| PocketBase 0.40 | base de données et back-office (projets, messages) | API REST + administration, hébergé sur mon VPS |
| Apache + Certbot | reverse proxy et HTTPS sur le VPS | `api.valentin-deroo.fr` |
| Netlify | hébergement du site | déploiement automatique à chaque `git push` |

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
| Textes et images des projets           | l'admin PocketBase (ou `src/data/projects.js` sans PocketBase) |
| L'ordre des projets                    | `gridOrder` dans `projects.js`  |
| Les pages                              | `src/pages/`                    |
| En-tête, menu, pied de page            | `src/layouts/Layout.astro`      |
| Mise en page, tailles, espacements     | les classes Tailwind dans chaque `.astro` |
| Couleurs, polices (thème)              | `@theme` dans `src/styles/global.css` |
| Images                                 | `src/assets/` (optimisées automatiquement) |

Tout le style est écrit en **classes Tailwind**, directement dans le HTML des fichiers `.astro`,
en *mobile first* : les classes sans préfixe s'appliquent au téléphone, puis `sm:` (≥ 640 px),
`md:` (≥ 768 px, menu horizontal), `lg:` (≥ 1024 px) et `xl:` (≥ 1280 px) adaptent l'affichage
aux écrans plus grands.

Couleurs du thème (celles du logo) : `white`, `chalk`, `ink`, `orange`, `orange-dark`, `slate`
(ex. `bg-chalk`, `text-orange`, `border-ink`). Polices : `font-varsity` (Graduate, titres) et `font-sans` (Archivo, texte).
Le liseré rayé façon maillot est le composant `Stripes.astro`.

## Structure

```
pocketbase/        migrations + images de départ (voir pocketbase/README.md)
src/
├── assets/        images (converties en WebP et redimensionnées au build)
├── components/    ProjectCard, ProjectImage, PageHeading, ContactBanner, Portrait, Button, Stripes, Logo
├── data/          contenus : site.js, projects.js
├── layouts/       Layout.astro
├── lib/           contact.js (formulaire) et projects.js (lecture des projets, PocketBase ou local)
├── pages/         une page = une URL
├── scripts/       menu mobile, visionneuse d'images
└── styles/        global.css (thème Tailwind + base)
```

## PocketBase

Le formulaire de contact et les projets peuvent être gérés avec **PocketBase** :
tout est prêt dans le dossier [`pocketbase/`](pocketbase/README.md) (collections, données de départ, mode d'emploi).

```bash
npm run pb      # lance PocketBase (admin sur http://127.0.0.1:8090/_/)
```

Puis crée un fichier `.env` avec `PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090`.
Sans `.env`, le site fonctionne avec `src/data/projects.js` et l'envoi par application mail.
