// Prépare les images du portfolio à partir des fichiers bruts du dossier parent.
// Usage : node scripts/prepare-images.mjs [dossier-source]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] ?? path.resolve("..");
const OUT = path.resolve("public/images");
fs.mkdirSync(OUT, { recursive: true });

const src = (f) => path.join(SRC, f);
const out = (f) => path.join(OUT, f);

// Captures pleine page (site web) : une vignette (haut de page) + la page entière
// `cover` = zone du haut de page gardée pour la vignette (centrée sur le contenu)
const fullPages = [
  { file: "ticket-ci.png", name: "ticket-ci", cover: { left: 150, top: 0, width: 1620, height: 1350 } },
  { file: "lebonplan-ci.png", name: "lebonplan-ci", cover: { left: 110, top: 0, width: 1700, height: 1416 } },
  { file: "costm-app.png", name: "costm", cover: { left: 0, top: 0, width: 1920, height: 1200 } },
];

for (const { file, name, cover } of fullPages) {
  await sharp(src(file))
    .extract(cover)
    .resize(1440)
    .webp({ quality: 82 })
    .toFile(out(`${name}-cover.webp`));
  await sharp(src(file)).resize(1280).webp({ quality: 78 }).toFile(out(`${name}-full.webp`));
  console.log("ok", name);
}

// DREN : on floute l'adresse email visible dans le champ de connexion
{
  const box = { left: 185, top: 396, width: 420, height: 34 };
  const blurred = await sharp(src("dren-app.png")).extract(box).blur(9).toBuffer();
  // sharp applique composite() après resize() : on compose d'abord, puis on redimensionne
  const masked = await sharp(src("dren-app.png"))
    .composite([{ input: blurred, left: box.left, top: box.top }])
    .toBuffer();
  await sharp(masked)
    .resize(1440)
    .webp({ quality: 85 })
    .toFile(out("dren-cover.webp"));
  console.log("ok dren");
}

// ATE Connect : fiche Play Store, sans la barre de navigation du téléphone
await sharp(src("ATE-connect.jpg"))
  .extract({ left: 0, top: 0, width: 719, height: 1225 })
  .webp({ quality: 85 })
  .toFile(out("ate-connect.webp"));
console.log("ok ate");

// Photo de profil (image-marc.jpg, 1663 × 1604) : recadrage carré visage + épaules,
// exportée en 800 px pour rester nette sur les écrans haute densité
await sharp(src("image-marc.jpg"))
  .rotate()
  .extract({ left: 330, top: 360, width: 1000, height: 1000 })
  .resize(800)
  .sharpen({ sigma: 0.6 })
  .webp({ quality: 92 })
  .toFile(out("profile.webp"));
console.log("ok profile");
