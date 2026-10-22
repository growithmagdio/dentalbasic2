#!/usr/bin/env node
/**
 * Creates lightweight stand-in files at every path the site expects, so the
 * project runs before `npm run assets` has downloaded the real renders.
 * Real files overwrite these; nothing in the code changes.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const media = JSON.parse(await fs.readFile(path.join(root, "content/media.json"), "utf8"));
const PUB = path.join(root, "public");
const WIDTHS = [320, 480, 640, 960, 1280, 1920];

const tones = [
  ["#E4EFEE", "#F7F5F1", "#0E5E63"],
  ["#F7F5F1", "#CFE3E1", "#14202B"],
  ["#EDE7DD", "#E4EFEE", "#0E5E63"],
];

function imageSvg(w, h, label, i) {
  const [a, b, c] = tones[i % tones.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
  <radialGradient id="r" cx="0.7" cy="0.3" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#r)"/>
  <circle cx="${w * 0.28}" cy="${h * 0.72}" r="${Math.min(w, h) * 0.22}" fill="${c}" opacity="0.10"/>
  <text x="${w * 0.06}" y="${h - w * 0.06}" font-family="sans-serif" font-size="${Math.max(12, w * 0.035)}" fill="${c}" opacity="0.6">${label}</text></svg>`;
}

let i = 0;
for (const [id, m] of Object.entries(media.images)) {
  const base = path.join(PUB, m.path).replace(/\.webp$/, "");
  await fs.mkdir(path.dirname(base), { recursive: true });
  for (const w of WIDTHS) {
    const h = Math.round((w * m.height) / m.width);
    await sharp(Buffer.from(imageSvg(w, h, `${id} · placeholder`, i))).webp({ quality: 60 }).toFile(`${base}-${w}.webp`);
  }
  i++;
}

// Hero: a simple procedural "implant assembles" sequence.
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function heroSvg(w, h, t, portrait) {
  const cx = portrait ? w * 0.5 : w * 0.7;
  const baseY = portrait ? h * 0.8 : h * 0.82;
  const s = portrait ? w / 900 : h / 900;
  const k = ease(Math.min(1, t / 0.75));
  const gap = (1 - k) * 120 * s;
  const sweep = Math.max(0, (t - 0.75) / 0.25);
  const screwTop = baseY - 300 * s;
  const abutTop = screwTop - 90 * s - gap;
  const crownBottom = abutTop + 10 * s - gap;
  const threads = Array.from({ length: 9 }, (_, j) => {
    const y = screwTop + 20 * s + j * 30 * s;
    const half = (52 - j * 2.2) * s;
    return `<line x1="${cx - half}" y1="${y}" x2="${cx + half}" y2="${y + 10 * s}" stroke="#8C979E" stroke-width="${5 * s}" stroke-linecap="round"/>`;
  }).join("");
  const crownW = 210 * s, crownH = 190 * s;
  const crown = `M${cx - crownW / 2} ${crownBottom} C${cx - crownW / 2} ${crownBottom - crownH * 0.7} ${cx - crownW * 0.45} ${crownBottom - crownH} ${cx - crownW * 0.22} ${crownBottom - crownH} C${cx - crownW * 0.1} ${crownBottom - crownH} ${cx - crownW * 0.05} ${crownBottom - crownH * 0.88} ${cx} ${crownBottom - crownH * 0.88} C${cx + crownW * 0.05} ${crownBottom - crownH * 0.88} ${cx + crownW * 0.1} ${crownBottom - crownH} ${cx + crownW * 0.22} ${crownBottom - crownH} C${cx + crownW * 0.45} ${crownBottom - crownH} ${cx + crownW / 2} ${crownBottom - crownH * 0.7} ${cx + crownW / 2} ${crownBottom} Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${portrait ? 0 : 1}" y2="${portrait ? 1 : 0}"><stop offset="0" stop-color="#F7F5F1"/><stop offset="1" stop-color="#CFE3E1"/></linearGradient>
    <radialGradient id="halo" cx="${cx / w}" cy="${(baseY - 260 * s) / h}" r="${portrait ? 0.45 : 0.35}"><stop offset="0" stop-color="#fff" stop-opacity="0.95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="ti" x1="0" x2="1"><stop offset="0" stop-color="#9AA5AB"/><stop offset="0.45" stop-color="#E7ECEE"/><stop offset="1" stop-color="#7D888F"/></linearGradient>
    <linearGradient id="por" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E9E4DA"/></linearGradient>
    <linearGradient id="gloss" x1="0" x2="1"><stop offset="${Math.max(0, sweep - 0.15)}" stop-color="#fff" stop-opacity="0"/><stop offset="${sweep}" stop-color="#fff" stop-opacity="${sweep > 0 && sweep < 1 ? 0.9 : 0}"/><stop offset="${Math.min(1, sweep + 0.15)}" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/><rect width="100%" height="100%" fill="url(#halo)"/>
  <ellipse cx="${cx}" cy="${baseY + 6 * s}" rx="${90 * s}" ry="${14 * s}" fill="#14202B" opacity="0.12"/>
  <rect x="${cx - 50 * s}" y="${screwTop}" width="${100 * s}" height="${300 * s}" rx="${30 * s}" fill="url(#ti)"/>${threads}
  <path d="M${cx - 44 * s} ${abutTop + 90 * s} L${cx - 34 * s} ${abutTop} L${cx + 34 * s} ${abutTop} L${cx + 44 * s} ${abutTop + 90 * s} Z" fill="url(#ti)"/>
  <path d="${crown}" fill="url(#por)" stroke="#E2DCD0" stroke-width="${2 * s}"/>
  <path d="${crown}" fill="url(#gloss)"/>
  <path d="${crown}" fill="#fff" opacity="${0.12 * sweep}"/>
  </svg>`;
}

const heroSets = [
  { dir: media.hero.videoDesktop.dir, n: media.hero.videoDesktop.frames, w: 1600, h: 900, portrait: false },
  { dir: media.hero.videoMobile.dir, n: media.hero.videoMobile.frames, w: 900, h: 1600, portrait: true },
];
for (const set of heroSets) {
  const out = path.join(PUB, set.dir);
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(out, { recursive: true });
  for (let f = 0; f < set.n; f++) {
    const t = f / (set.n - 1);
    await sharp(Buffer.from(heroSvg(set.w, set.h, t, set.portrait)))
      .webp({ quality: 70 })
      .toFile(path.join(out, `frame_${String(f + 1).padStart(4, "0")}.webp`));
  }
}
const posters = [
  ["posterDesktop", 1600, 900, 0, false],
  ["finalDesktop", 1600, 900, 1, false],
  ["posterMobile", 900, 1600, 0, true],
  ["finalMobile", 900, 1600, 1, true],
];
for (const [key, w, h, t, portrait] of posters) {
  await sharp(Buffer.from(heroSvg(w, h, t, portrait))).webp({ quality: 78 }).toFile(path.join(PUB, media.hero[key].path));
}
await fs.writeFile(
  path.join(root, "content/hero-frames.json"),
  JSON.stringify({ desktop: heroSets[0].n, mobile: heroSets[1].n, placeholder: true }, null, 2) + "\n",
);
console.log("Placeholders written. Run `npm run assets` to replace them with the real renders.");
