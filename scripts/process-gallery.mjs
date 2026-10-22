import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const galleryDir = path.join(root, "public/gallery");
await fs.mkdir(galleryDir, { recursive: true });

const artifactDir = "C:\\Users\\sazan\\.gemini\\antigravity-ide\\brain\\edec572d-0736-4ee3-9f5b-a325fccb0349";

const files = [
  { src: "whitening_before_1792650632788.jpg", dest: "whitening-before.webp" },
  { src: "whitening_after_1792650675639.jpg", dest: "whitening-after.webp" },
  { src: "aligners_before_1792650705208.jpg", dest: "aligners-before.webp" },
  { src: "aligners_after_1792650753636.jpg", dest: "aligners-after.webp" },
  { src: "implant_before_1792650783839.jpg", dest: "implant-before.webp" },
  { src: "implant_after_1792650818378.jpg", dest: "implant-after.webp" },
  { src: "veneers_before_1792650852444.jpg", dest: "veneers-before.webp" },
  { src: "veneers_after_1792650890816.jpg", dest: "veneers-after.webp" },
];

for (const f of files) {
  const inPath = path.join(artifactDir, f.src);
  const outPath = path.join(galleryDir, f.dest);
  await sharp(inPath)
    .resize({ width: 1200, height: 900, fit: "cover" })
    .webp({ quality: 85 })
    .toFile(outPath);
  console.log(`Saved: ${f.dest}`);
}

console.log("Gallery conversion complete.");
