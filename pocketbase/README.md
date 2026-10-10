# PocketBase du portfolio

PocketBase stocke :

| Collection | Contenu | Qui peut lire / écrire |
| --- | --- | --- |
| `messages` | messages du formulaire de contact (nom, email, message, lu) | tout le monde peut **envoyer**, seul l'admin peut **lire** |
| `projects` | les projets du portfolio (textes, image, galerie) | tout le monde peut **lire**, seul l'admin peut **modifier** |

Les collections et les 4 projets actuels sont créés automatiquement au premier lancement
(fichiers de `pb_migrations/`, images de départ dans `pb_seed/`).

## 1. Installer (une seule fois)

1. Télécharge PocketBase pour Windows : <https://pocketbase.io/docs/> → **Download** → `pocketbase_X.X.X_windows_amd64.zip`.
2. Dézippe et place **`pocketbase.exe` dans ce dossier** (`Portfolio/pocketbase/`).
3. Dans le terminal de VS Code, à la racine du projet :

   ```bash
   npm run pb
   ```

4. Au premier lancement, le terminal affiche un lien du type
   `http://127.0.0.1:8090/_/#/pbinstal/...` : ouvre-le et crée ton compte **superuser** (admin).
5. Dans l'admin (<http://127.0.0.1:8090/_/>), tu vois les collections `messages` et `projects`.

## 2. Brancher le site

À la racine du projet, crée un fichier **`.env`** (copie de `.env.example`) :

```
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

Puis relance `npm run dev` (dans un deuxième terminal, PocketBase doit rester lancé).

- Les projets viennent maintenant de PocketBase.
- Le formulaire de contact enregistre les messages dans la collection `messages`.

Sans `.env` (ou si PocketBase est éteint), le site utilise `src/data/projects.js` et l'envoi par application mail : rien ne casse.

## 3. Modifier un projet

Dans l'admin → `projects` → clique sur un projet.

- `order` : position dans les grilles (1, 2, 3…). Les deux premiers apparaissent sur l'accueil.
- `published` : décoche pour masquer un projet sans le supprimer.
- `deliverables` : liste JSON, ex. `["Affiche", "Réseaux sociaux"]`.
- `choices` : liste JSON de `{ "title": "...", "text": "..." }` (section « Les choix derrière le projet »).
- `gallery` + `gallery_info` : visuels supplémentaires ; `gallery_info` donne pour chacun `{ "title": "...", "alt": "..." }` dans le même ordre.
- `website_unavailable` : affiche le bandeau « Site temporairement indisponible ».

Le site étant statique, une modification apparaît **au prochain `npm run build`** (et tout de suite en `npm run dev`).

## 4. Mettre en ligne

Le site en ligne doit pouvoir joindre PocketBase : héberge-le (par ex. [PocketHost](https://pockethost.io), gratuit pour un petit projet, ou un VPS),
copie-y le dossier `pb_migrations/` (+ `pb_seed/` pour les données de départ), puis mets son URL dans `PUBLIC_POCKETBASE_URL`
sur ton hébergeur du site (Netlify, Vercel…).

## Sauvegarde

Toutes les données sont dans `pb_data/` (non versionné dans Git). Sauvegarde ce dossier, ou utilise **Settings → Backups** dans l'admin.
