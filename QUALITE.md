# Contrôle qualité

> Point 6 du sujet : pour chaque critère retenu, ce que j'ai vérifié, comment, et ce que j'ai corrigé.
> Mesures faites le 16 novembre 2026 sur le site en ligne (`https://portfolio.valentin-deroo.fr`),
> par un script dans le navigateur (analyse du HTML de chaque page et API Performance).

## Pourquoi ces critères
Mon site a quatre particularités qui orientent les contrôles :
1. il est **très visuel** (affiches, photos, diaporama) : textes alternatifs et poids des images comptent ;
2. il contient des **animations** (tableau tactique, diaporama) : elles doivent respecter le réglage
   « réduire les animations » et ne pas gêner la navigation au clavier ;
3. les projets viennent d'une **base de données** (PocketBase) : le référencement doit voir des pages
   HTML complètes, et le formulaire collecte des **données personnelles** ;
4. j'utilise des **images de tiers** (photo Unsplash, logos et joueurs de clubs) : les crédits et
   droits doivent être indiqués.

## 1. Accessibilité

| Critère | Comment je l'ai vérifié | Résultat | Correction |
|---|---|---|---|
| Langue de la page | `lang` de `<html>` sur les 8 pages | `fr` partout | — |
| Un seul `h1` par page | comptage sur les 8 pages | 1 `h1` par page | — |
| Pas de saut de niveau de titre | ordre des `h1`→`h4` | page Projets : `h1` puis `h3` | les cards utilisent `h2` sur la page Projets (`headingLevel` dans `ProjectCard.astro`) |
| Textes alternatifs | images sans attribut `alt` | 0 image sans `alt` ; les `alt=""` sont les images 2 et 3 du diaporama (décoratives, la 1re porte la description) | — |
| Liens et boutons nommés | liens/boutons sans texte ni `aria-label` | 0 | — |
| Champs du formulaire étiquetés | champs sans `<label>` | 0 (nom, e-mail, message dans des `<label>`) | — |
| Contrastes (WCAG AA, 4,5:1) | calcul des rapports de la palette | encre/blanc 18,1 · gris/blanc 6,5 · gris/craie 5,7 · orange/blanc 4,66 · **orange/craie 4,12** | petit texte orange sur fond craie passé en orange foncé (page À propos : statut du parcours, titres des cartes) |
| Navigation au clavier | — | il manquait un moyen de sauter le menu | lien « Aller au contenu » (visible au focus) vers `<main id="contenu">` |
| Focus visible | style `:focus-visible` dans `global.css` | contour orange sur tous les éléments | — |
| Animations | `prefers-reduced-motion` dans `play.js`, `board.js`, `confetti.js`, `PosterRotator.astro`, `global.css` | animations coupées si le réglage est actif | — |
| Messages du formulaire | zone `role="status"` `aria-live="polite"` | confirmation annoncée par les lecteurs d'écran | — |
| Audit automatique | Lighthouse « Accessibilité » et WAVE sur l'accueil (16 novembre) | Lighthouse : **100/100** ; WAVE : **0 erreur**, 5 alertes, **1 erreur de contraste** : le texte du bandeau orange « Une alternance, un stage… » en blanc à 90 % d'opacité (4,23:1 au lieu de 4,5:1) | texte passé en blanc plein (4,66:1) dans `ContactBanner.astro` |

## 2. Sobriété et performance

| Critère | Comment je l'ai vérifié | Résultat | Correction |
|---|---|---|---|
| Poids de la page d'accueil | API Performance (somme des `transferSize`) | ≈ 180 Ko transférés, 23 requêtes (hors polices Google, non mesurables) | — |
| Poids du HTML | taille du document de chaque page | 11 à 31 Ko | — |
| Images | format et taille servis | WebP via le CDN d'images de Netlify, plusieurs largeurs (`srcset`) : un téléphone télécharge la version 480 px ; la plus lourde de l'accueil pèse 42 Ko | — |
| JavaScript envoyé | scripts chargés | ≈ 8 Ko ; pas de framework côté navigateur (Astro n'envoie que les petits scripts nécessaires) | — |
| Mise en page mobile | largeur de défilement à 360 px sur 7 pages | 360 px partout : aucun défilement horizontal | — |
| Requêtes vers la base | cache Netlify de 60 s sur les pages projets | PocketBase n'est interrogé qu'une fois par minute au maximum, pas à chaque visite | — |
| Dépendances inutiles | lecture de `package.json` | 3 paquets de polices `@fontsource` non utilisés | supprimés |
| Score global | Lighthouse « Performance » et « Bonnes pratiques » sur l'accueil (16 novembre) ; EcoIndex | Lighthouse : Performance **99/100**, Bonnes pratiques **100/100** ; EcoIndex : **A (84/100)**, 0,341 Mo, 210 éléments, 19 requêtes | — |

## 3. Référencement

| Critère | Comment je l'ai vérifié | Résultat | Correction |
|---|---|---|---|
| Titre unique par page | `<title>` des 8 pages | tous différents (« Projets \| Valentin Deroo »…) | — |
| Meta description | longueur sur les 8 pages | 65 à 160 caractères ; GESTONS! (71) et Contact (65) un peu courtes |
| Contenu lisible sans JavaScript | HTML reçu par le navigateur | les projets sont dans le HTML (rendu côté serveur), pas chargés après coup | — |
| URL canonique | balise `link rel="canonical"` | absente | ajoutée dans `Layout.astro` |
| Partage sur les réseaux | balises Open Graph | titre et description présents, image absente | `og:image` (1200 × 630), `og:url`, `og:locale`, carte Twitter |
| `robots.txt` et plan du site | `/robots.txt`, `/sitemap.xml` | 404 | `public/robots.txt` et `src/pages/sitemap.xml.js` (liste aussi les projets de PocketBase) |
| Page 404 | adresse inexistante | vrai code 404, page « Hors-jeu. » | — |
| Vérification après mise en ligne | Lighthouse « SEO » sur l'accueil (16 novembre) | **100/100** | |

## 4. Conformité juridique

| Critère | Comment je l'ai vérifié | Résultat | Correction |
|---|---|---|---|
| Mentions légales (LCEN) | page `/mentions-legales` | éditeur, directeur de publication, contact, hébergeurs (Netlify ; Serverd pour le VPS) | — |
| Données du formulaire (RGPD) | même page, section « Données personnelles » | données collectées, finalité, base légale, accès, durée (12 mois), droits, recours CNIL | — |
| Cookies | outils du navigateur | aucun cookie, aucune mesure d'audience ; Google Fonts signalé | — |
| Droits sur les images | origine de chaque visuel | photo d'accueil Unsplash non créditée | crédit « Abigail Keenan, Unsplash » ajouté ; mention des logos et photos de joueurs utilisés dans un cadre personnel et non commercial |
| Projets non officiels | textes des projets | « visuels non officiels » dans le contexte des affiches | — |
| Accès à la base | règles d'API de la collection `messages` dans l'admin PocketBase en ligne, et migration `1791550000_create_collections.js` | création ouverte à tous (le formulaire peut enregistrer un message) ; lecture, modification et suppression réservées au compte administrateur (« Superusers only ») : personne ne peut lire les messages des autres par l'API | — |
