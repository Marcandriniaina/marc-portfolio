# Portfolio · Marc Floris Andriniaina

Portfolio personnel bilingue (FR/EN), thème sombre et clair, construit avec **Next.js 16**, **React 19** et **Tailwind CSS 4**.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Modifier le contenu

Tous les textes (FR et EN) sont dans un seul fichier : [`src/lib/content.ts`](src/lib/content.ts).

- **Coordonnées et liens** : objet `profile`. Ajoute ton lien GitHub dans `github` : l'icône apparaîtra automatiquement.
- **Projets** : tableau `projects`. `featured: true` affiche le projet en grand ; `url` ajoute un bouton « Voir le site ».
- **Expériences, formation, compétences** : `experiences`, `education`, `skills`.

## Images

Les images optimisées sont dans `public/images/`. Pour en ajouter ou en remplacer une :

1. Place la capture brute dans le dossier parent (`Downloads/Portfolio`).
2. Ajoute-la dans [`scripts/prepare-images.mjs`](scripts/prepare-images.mjs).
3. Lance `node scripts/prepare-images.mjs ..`.

Le projet **DRSP** est une application locale (non déployée) : sa carte affiche le logo du ministère de la Santé (`logo` dans `content.ts`) au lieu d'une capture.

Le CV téléchargeable est `public/cv-marc-floris-andriniaina.pdf`. Remplace ce fichier quand ton CV change.

## Mettre en ligne (gratuit, avec Vercel)

1. Crée un dépôt sur GitHub et pousse le projet :
   ```bash
   git add -A
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/portfolio.git
   git push -u origin main
   ```
2. Va sur https://vercel.com, connecte-toi avec GitHub, clique sur **Add New → Project** et importe le dépôt.
3. Laisse les réglages par défaut et clique sur **Deploy**. Ton site sera en ligne sur `https://<nom>.vercel.app`.

Chaque `git push` redéploie ensuite le site automatiquement.
