# Déclaration d'usage de l'intelligence artificielle

> Ce fichier répond au point 3 du sujet : pour chaque outil, à quelle étape, pour quoi faire,
> et ce que j'ai modifié, corrigé ou rejeté.

## Figma Make (Figma AI)

- **Étape :** conception, septembre – début octobre.
- **Pour quoi faire :** générer une première maquette du portfolio à partir de mes indications,
  puis la faire évoluer (« Revise design based on feedback »).
- **Ce que j'ai modifié ou rejeté :** La maquette de mon portfolio a beaucoup évolué. J'avais d'abord choisi un bleu foncé, que j'ai abandonné car il est très courant et peu original. Je voulais ensuite un portfolio en forme de casier : j'ai demandé à Figma Make de le faire, mais le rendu ne me satisfaisait pas, donc j'ai réalisé cette version moi-même. Après la soutenance maquette, j'ai demandé à Figma Make de refaire la maquette en gardant tous mes contenus, mais en tenant compte des critiques des professeurs.

## Claude (application Claude, Anthropic)

### Intégration du site (Astro, Tailwind, JavaScript)
- **Étape :** développement, à partir du 9 octobre.
- **Pour quoi faire :** traduire la maquette en code Astro + Tailwind CSS v4 + JavaScript sans
  librairie : gabarit commun, composants (cards, boutons, en-têtes de page), pages, menu mobile,
  visionneuse d'images, version mobile first.
- **Ce que j'ai décidé, corrigé ou rejeté :**
  - J'ai imposé la stack (Astro, Tailwind écrit directement dans les classes, JavaScript vanilla).
  - J'ai fourni mon logo VD et demandé de retirer mon nom à côté pour ne garder que « Communication sportive ».
  - On m'a dit que le site « faisait trop IA » : j'ai demandé une nouvelle direction, choisi
    la piste « varsity » (maillot, écusson, typographie Graduate) et l'orange de mon logo.
  - J'ai **rejeté** une proposition de refonte « plus épurée » : retour à la version varsity.
  - J'ai remplacé l'image d'accueil générée, trop artificielle, par une vraie photo de match de nuit (Unsplash).
  - J'ai demandé de retirer l'effet de survol des cartes de compétences et d'uniformiser leurs couleurs.
  - J'ai corrigé un texte faux : je n'ai pas de licence STAPS complète mais une **L2 validée**.

### Base de données et back-office (PocketBase)
- **Pour quoi faire :** créer les collections `messages` (formulaire de contact) et `projects`
  (projets modifiables sans toucher au code), les migrations, la lecture des projets côté Astro,
  puis le passage des pages projets en rendu à la demande pour que l'ordre et les textes saisis
  dans PocketBase s'affichent sans redéployer.
- **Ce que j'ai décidé :** utiliser PocketBase (vu en cours de Développement Back), gérer moi-même
  l'ordre et la publication des projets dans l'admin, ajouter la page « Affiches sportives » avec
  un diaporama automatique sur la card.

### Mise en ligne
- **Pour quoi faire :** déploiement sur Netlify, sous-domaine `portfolio.valentin-deroo.fr`
  (Infomaniak), PocketBase sur le VPS derrière Apache avec un certificat Let's Encrypt.
- **Ce que j'ai fait moi-même :** toutes les commandes sur le VPS et les réglages DNS / Netlify.
  Pendant le débogage, on a trouvé qu'un de mes anciens fichiers Apache (`clients.conf`) n'avait
  pas de balises `<VirtualHost>` et mettait tout le port 80 en HTTPS : je l'ai corrigé.
- **Ce que j'ai rejeté :** PocketHost (devenu payant) au profit du VPS mis à disposition par l'IUT.

### Contenus
- **Pour quoi faire :** reformuler et structurer les études de cas à partir des informations que je lui ai données, et rédiger les textes de la page « Affiches sportives » à partir de mes affiches.
- **Ce que j'ai fourni :** les affiches (créations personnelles), les informations sur mes projets,
  mon parcours.

### Qualité (16 novembre)
- **Pour quoi faire :** relire le site par rapport au sujet, ajouter le lien d'évitement, l'URL
  canonique, l'image de partage, `robots.txt`, `sitemap.xml`, corriger deux contrastes et un niveau
  de titre, compléter les crédits photo, préparer ce fichier, `JOURNAL.md` et `QUALITE.md`.
- **Ce que j'ai vérifié :** j'ai relu les pages et les fichiers ajoutés pour corriger les erreurs, lancé moi-même Lighthouse, WAVE et EcoIndex, et contrôlé les règles d'accès de PocketBase. WAVE a relevé un contraste insuffisant sur le bandeau de contact, corrigé ensuite.

### Maquette Figma du site (16 novembre)
- **Pour quoi faire :** importer dans Figma les pages du site en ligne (Accueil, Projets, GESTONS!, Affiches sportives, À propos, Contact), en version ordinateur (1440 px) et mobile (390 px), pour que la maquette corresponde au site final.



## Claude Code

- **Étape :** début novembre (commits du 5 novembre).
- **Pour quoi faire :** le « tableau tactique » de la page d'accueil : le ballon qui suit le trait
  au scroll jusqu'au but, puis la célébration (`src/scripts/ball.js`, `board.js`, `play.js`,
  `confetti.js`).
- **Ce que j'ai modifié :** j'ai demandé un but moins rapide et plus lisible (commit « Ballon : but
  moins rapide et plus lisible »). 

## Ce que je sais expliquer

Je suis capable d'expliquer en soutenance : la récupération des projets depuis PocketBase
(`src/lib/projects.js`), le rendu à la demande avec cache (`prerender = false`), le formulaire de
contact, le diaporama (`PosterRotator.astro`), la configuration Apache / Certbot du VPS et le
tableau tactique avec le ballon.
