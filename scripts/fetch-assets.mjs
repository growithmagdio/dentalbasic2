#!/usr/bin/env node
/**
 * Downloads every source image and hero clip listed in content/media.json,
 * then writes web-ready files into /public:
 *   - images:  public/images/<name>-{320,480,640,960,1280,1920}.webp
 *   - posters: public/hero/{poster,final}-{desktop,mobile}.webp
 *   - frames:  public/hero/desktop/frame_0001.webp …  public/hero/mobile/frame_0001.webp …
 * Raw downloads are cached in assets-src/ (git-ignored), so re-runs are fast.
 *
 *   npm run assets            # download + optimise everything
 *   npm run assets -- --force # re-download even if cached
 */
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const media = JSON.parse(await fs.readFile(path.join(root, "content/media.json"), "utf8"));
const SRC = path.join(root, "assets-src");
const PUB = path.join(root, "public");
const WIDTHS = [320, 480, 640, 960, 1280, 1920];
const force = process.argv.includes("--force");

await fs.mkdir(SRC, { recursive: true });

async function download(url, file) {
  if (!url) throw new Error(`No source URL for ${file}`);
  const dest = path.join(SRC, file);
  if (!force && existsSync(dest)) return dest;
  process.stdout.write(`  ↓ ${file} … `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log("ok");
  return dest;
}

const ext = (url) => (url.match(/\.(png|jpe?g|webp|mp4)(\?|$)/i)?.[1] ?? "png").toLowerCase();

// 1) Section images → responsive WebP set
console.log("Images");
for (const [id, m] of Object.entries(media.images)) {
  const raw = await download(m.source, `${id}.${ext(m.source)}`);
  const base = path.join(PUB, m.path).replace(/\.webp$/, "");
  await fs.mkdir(path.dirname(base), { recursive: true });
  const meta = await sharp(raw).metadata();
  for (const w of WIDTHS) {
    await sharp(raw)
      .resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true })
      .webp({ quality: w <= 640 ? 74 : 78, effort: 5 })
      .toFile(`${base}-${w}.webp`);
  }
  console.log(`  ✓ ${id}`);
}

// 2) Hero posters (first + last frame stills, higher quality than the video frames)
console.log("Hero posters");
for (const key of ["posterDesktop", "finalDesktop", "posterMobile", "finalMobile"]) {
  const m = media.hero[key];
  const raw = await download(m.source, `hero-${key}.${ext(m.source)}`);
  const width = key.endsWith("Desktop") ? 1600 : 900;
  await fs.mkdir(path.join(PUB, "hero"), { recursive: true });
  await sharp(raw).resize({ width }).webp({ quality: 76, effort: 6 }).toFile(path.join(PUB, m.path));
  console.log(`  ✓ ${m.path}`);
}

// 3) Hero clips → frame sequences
console.log("Hero frames");
const counts = {};
for (const [key, label] of [["videoDesktop", "desktop"], ["videoMobile", "mobile"]]) {
  const m = media.hero[key];
  const raw = await download(m.source, `hero-${label}.mp4`);
  const outDir = path.join(PUB, m.dir);
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });
  // Spread the wanted number of frames evenly across the clip.
  const { stderr } = await run(ffmpegPath, ["-i", raw], { encoding: "utf8" }).catch((e) => e);
  const dur = /Duration: (\d+):(\d+):([\d.]+)/.exec(stderr ?? "");
  const seconds = dur ? +dur[1] * 3600 + +dur[2] * 60 + +dur[3] : 5;
  const fps = (m.frames / seconds).toFixed(4);
  await run(ffmpegPath, [
    "-y", "-i", raw,
    "-vf", `fps=${fps},scale=${m.width}:-2:flags=lanczos`,
    "-c:v", "libwebp", "-quality", label === "desktop" ? "76" : "72", "-compression_level", "5",
    path.join(outDir, "frame_%04d.webp"),
  ]);
  const n = (await fs.readdir(outDir)).filter((f) => f.endsWith(".webp")).length;
  counts[label] = n;
  console.log(`  ✓ ${label}: ${n} frames`);
}
await fs.writeFile(
  path.join(root, "content/hero-frames.json"),
  JSON.stringify({ desktop: counts.desktop, mobile: counts.mobile, placeholder: false }, null, 2) + "\n",
);

console.log("\nDone. Restart `npm run dev` (or rebuild) to pick up the new frame counts.");
