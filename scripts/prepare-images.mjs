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

// Remplace le fond gris uni de la photo par le bleu-violet du CV.
// Seul le fond relié aux bords est modifié (la chemise blanche ou les ombres du
// costume ne bougent pas), et les pixels de contour sont « démélangés » pour
// garder des bords doux autour des cheveux et des épaules.
async function recolorBackground(input, from, to) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const n = w * h;
  const dist = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const r = data[i * 3] - from[0], g = data[i * 3 + 1] - from[1], b = data[i * 3 + 2] - from[2];
    dist[i] = Math.sqrt(r * r + g * g + b * b);
  }

  // Remplissage depuis les bords : pixels très proches du gris
  const NEAR = 14;
  const bg = new Uint8Array(n);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const i = stack.pop();
    if (bg[i] || dist[i] > NEAR) continue;
    bg[i] = 1;
    const x = i % w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (i >= w) stack.push(i - w);
    if (i < n - w) stack.push(i + w);
  }

  // Bande de contour (3 px autour du fond) pour le démélange
  const RING = 3;
  const near = new Uint8Array(n);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (!bg[y * w + x]) continue;
      for (let dy = -RING; dy <= RING; dy++)
        for (let dx = -RING; dx <= RING; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && xx < w && yy >= 0 && yy < h) near[yy * w + xx] = 1;
        }
    }

  const FAR = 70; // au-delà, le pixel est entièrement du premier plan
  const out = Buffer.from(data);
  for (let i = 0; i < n; i++) {
    let bgShare = 0;
    if (bg[i]) bgShare = 1;
    else if (near[i]) bgShare = Math.max(0, Math.min(1, (FAR - dist[i]) / (FAR - NEAR)));
    if (!bgShare) continue;
    for (let c = 0; c < 3; c++) {
      const v = data[i * 3 + c] + bgShare * (to[c] - from[c]);
      out[i * 3 + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
  }
  return sharp(out, { raw: { width: w, height: h, channels: 3 } });
}

// Photo de profil (image-marc.jpg, 1663 × 1604) : fond bleu-violet, recadrage carré
// visage + épaules, exportée en 800 px pour rester nette sur les écrans haute densité
const recolored = await recolorBackground(src("image-marc.jpg"), [158, 158, 158], [140, 158, 255]);
await sharp(await recolored.png().toBuffer())
  .extract({ left: 330, top: 360, width: 1000, height: 1000 })
  .resize(800)
  .sharpen({ sigma: 0.6 })
  .webp({ quality: 92 })
  .toFile(out("profile.webp"));
console.log("ok profile");
