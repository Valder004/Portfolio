# Journal de bord

> Une entrée par semaine : ce que j'ai fait, ce qui a coincé, ce que j'ai décidé.

## Septembre — positionnement et maquette
- Note de positionnement : je vise les services communication de clubs, d'événements et de marques sportives, pour un stage puis une alternance en 3eme année.
- Recherche graphique, moodboard, pistes écartées, maquette Figma Make.
- Soutenance maquette (octobre).

## Semaine du 5 au 11 octobre — de la maquette au code
- Création du dépôt GitHub, intégration de la maquette en Astro + Tailwind CSS v4, version mobile first.
- Ajout de mon logo VD dans l'en-tête et le pied de page.
- PocketBase en local : formulaire de contact enregistré en base, puis projets gérés en base.
- Coincé : la photo de portrait s'affichait couchée (orientation EXIF), corrigé.
- Décidé : garder « Communication sportive » à côté du logo, sans mon nom.

## Semaine du 12 au 18 octobre — direction artistique et mise en ligne
- Retour reçu : le site « faisait trop IA ». Nouvelle direction « varsity » (maillot, écusson,
  Graduate + Archivo, orange du logo), vraie photo de match de nuit en accueil.
- Essai d'une version plus épurée : rejetée, retour à la version varsity avec finitions.
- Mise en ligne sur Netlify, sous-domaine `portfolio.valentin-deroo.fr` (Infomaniak).
- PocketHost devenu payant : PocketBase installé sur mon VPS (service systemd, Apache en reverse
  proxy, Certbot) sur `api.valentin-deroo.fr`.
- Coincé : Certbot échouait. Cause trouvée : `clients.conf` sans balises `<VirtualHost>` mettait tout
  le port 80 en HTTPS. Corrigé, ce qui a aussi réparé le renouvellement de mes autres certificats.
- Décidé : pages projets générées à la demande (cache 60 s) pour que l'ordre saisi dans PocketBase
  s'applique sans redéployer. Correction du parcours (L2 STAPS validée).

## Semaine du 19 au 25 octobre — affiches sportives
- Nouvelle page « Affiches sportives » qui regroupe PSG – FC Barcelone, Champions d'Europe et
  Octobre Rose FCSM, avec un diaporama automatique sur la card.
- Coincé : la card affichait un bloc noir (conflit `relative` / `absolute`), corrigé.

## Semaine du 26 octobre au 1er novembre 
- Durant les vacances je n'ai pas fait grand choses

## Semaine du 2 au 8 novembre — interactions et juridique
- « Tableau tactique » en page d'accueil : le ballon suit la page jusqu'au but (fait avec Claude Code), puis but ralenti pour être plus lisible.
- Mentions légales et information sur les données du formulaire (RGPD).

## Semaine du 9 au 15 novembre — préparation de la soutenance
- Relecture du code pour pouvoir l'expliquer (récupération des projets, rendu à la demande,
  formulaire, diaporama, serveur).

## Semaine du 16 novembre — qualité et livrables
- Lien d'évitement, URL canonique, image de partage, `robots.txt`, `sitemap.xml`.
- Contrastes corrigés sur la page À propos, niveau de titre corrigé sur la page Projets.
- Crédit de la photo d'accueil ajouté, dépendances inutilisées retirées.
- Rédaction de `IA.md`, `QUALITE.md` et de ce journal ; maquettes Figma des pages GESTONS! et
  Affiches sportives en desktop et mobile.

## Présence professionnelle — pourquoi LinkedIn et Instagram
> Proposition à reformuler avec mes mots (5 lignes demandées).

LinkedIn, parce que c'est là que les responsables communication des clubs et des agences recrutent.
Instagram, parce que c'est le réseau principal de la communication des clubs : mes affiches sont pensées pour ce format (1080 × 1350 px) et montrent directement ce que je sais produire.

