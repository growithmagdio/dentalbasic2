# Jerush Dental Clinic — image and hero-animation prompts

Save this file in the project as `docs/asset-prompts.md`. Every image has an exact output path, so dropping a file in needs no code change.

**Best tools:** Nano Banana Pro or Higgsfield Soul for stills; Kling (start + end frame), Seedance 2.0 or Veo for the hero clip. Antigravity's built-in image generation also works for the stills.

**Demo notice:** the clinic, doctor and treatment-room images are AI-generated stand-ins for the demo. Swap them for real photos of the actual clinic and doctor before going live.

---

## 1. Style suffix (paste at the end of every still prompt)

```
Photorealistic editorial photography for a premium modern dental clinic in South India. Palette: warm porcelain white (#F7F5F1), clean white, deep teal accents (#0E5E63), soft ink-navy shadows (#14202B). Soft north-window daylight from camera left, 5000K, gentle falloff, soft natural shadows. Calm, uncluttered, precise, hygienic. Full-frame camera, true-to-life materials, natural skin texture, subtle fine film grain, no HDR look, no plastic CGI sheen.
```

**Negative / avoid** (use the tool's negative field if it has one):

```
text, letters, logos, signage, watermarks, brand names, stock-photo grins, people looking straight at camera with exaggerated smiles, blood, needles in focus, gloomy clinical blue light, neon, glowing holograms, clutter, warped hands, extra fingers, distorted teeth, oversaturated colours
```

**Consistency rules**
- Light always comes from camera left.
- Use a 35 mm lens for rooms, 85 mm for people, 100 mm macro for details.
- Generate 3–4 variants of the first image (the doctor portrait). Then use the winner as the style reference for every other image.

---

## 2. Hero scroll animation — "the tooth assembles and gets polished"

The hero is an image sequence scrubbed by scroll. A porcelain crown, abutment and titanium implant post sit apart, then come together into one complete, glossy tooth. A soft light sweep then polishes the enamel. The finished tooth rests in the right third of the frame, leaving the left side clear for the headline.

### Step A — End frame (make this first)

**Desktop:** 16:9, 2560×1440, save as `assets-src/hero/end-desktop.png`

```
Studio product photograph of a single dental implant restoration, fully assembled: a flawless natural-looking porcelain molar crown seated on a satin titanium abutment and threaded titanium implant post, standing upright, viewed from a low three-quarter angle. The crown's enamel has a soft pearly gloss with a gentle highlight along its upper cusps. The object sits in the right third of the frame on a seamless warm porcelain-white sweep (#F7F5F1), with a soft contact shadow beneath. The left 55% of the frame is clean, empty background for a headline. 100 mm macro lens, f/8, entire object sharp, background falling off smoothly. Large soft key light from upper left, white bounce fill from right, thin cool rim light outlining the crown edge. Clean, clinical, premium, calm.
[STYLE SUFFIX]
```

**Mobile:** 9:16, 1440×2560, save as `assets-src/hero/end-mobile.png`. Use the same prompt, but replace the composition sentence with:

```
The object sits centred in the lower half of the frame; the top 45% is clean, empty background for a headline.
```

### Step B — Start frame (use the end frame as the reference image)

Make one for each aspect ratio and save as `assets-src/hero/start-desktop.png` and `assets-src/hero/start-mobile.png`.

```
Same scene, same camera, same lighting, same background and same position as the reference image. The three parts are now separated vertically in a clean exploded view, aligned on one vertical axis: the porcelain molar crown floats highest, the titanium abutment floats in the middle, and the threaded implant post stands lowest, with even gaps between them. The crown's enamel is slightly matte, with no highlight yet. Nothing else changes.
[STYLE SUFFIX]
```

### Step C — Clip between the two frames

Use image-to-video with a **start and end frame**. Set it to 5 seconds and 24 fps, and make one 16:9 clip and one 9:16 clip.

```
Locked-off camera, no camera movement at all. The three separated parts of the dental implant glide smoothly together along one vertical axis at a constant, unhurried speed: the abutment rises onto the implant post, then the porcelain crown descends and seats precisely on top. Once assembled, the tooth rotates slowly about 20 degrees to the right. A soft band of white light then sweeps once across the crown from left to right, leaving the enamel with a pearly gloss. Lighting and background stay identical throughout. Rigid metal and porcelain: no morphing, no bending, no extra parts, no motion blur, no cuts, no text.
```

Save the clips as `assets-src/hero/hero-desktop.mp4` and `assets-src/hero/hero-mobile.mp4`.

**Before accepting a clip, check:**
- No part warps or melts.
- The screw threads stay rigid.
- The last frame matches the end frame.
- Playback speed feels even when scrubbed.

### Step D — Export the frames

The desktop set is 120 frames, 1600 px wide. The mobile set is 72 frames, 900 px wide.

```bash
mkdir -p public/hero/desktop public/hero/mobile
ffmpeg -i assets-src/hero/hero-desktop.mp4 -vf "fps=24,scale=1600:-2" -c:v libwebp -quality 78 public/hero/desktop/frame_%04d.webp
ffmpeg -i assets-src/hero/hero-mobile.mp4  -vf "fps=14.4,scale=900:-2" -c:v libwebp -quality 75 public/hero/mobile/frame_%04d.webp
# Posters: first frame (shown instantly) and last frame (reduced motion / fallback)
cp public/hero/desktop/frame_0001.webp public/hero/hero-poster-desktop.webp
cp public/hero/mobile/frame_0001.webp  public/hero/hero-poster-mobile.webp
cp "$(ls public/hero/desktop/frame_*.webp | tail -1)" public/hero/hero-final-desktop.webp
cp "$(ls public/hero/mobile/frame_*.webp | tail -1)"  public/hero/hero-final-mobile.webp
```

Budget: about 4 MB in total for desktop frames and 1.5 MB for mobile frames. If a set is heavier, lower the quality setting to 70.

---

## 3. Section images

Each image below gets the style suffix appended. Export as WebP, quality 80, at the size given.

| # | Output path | Aspect / size | Used in |
|---|---|---|---|
| 1 | `public/images/doctor-portrait.webp` | 4:5 · 1200×1500 | Home doctor intro, About page |
| 2 | `public/images/clinic-reception.webp` | 3:2 · 1800×1200 | Clinic tour |
| 3 | `public/images/clinic-treatment-room.webp` | 3:2 · 1800×1200 | Clinic tour, About |
| 4 | `public/images/clinic-sterilisation.webp` | 4:5 · 1200×1500 | Clinic tour, "Why Jerush" |
| 5 | `public/images/treatments/checkup-cleaning.webp` | 4:5 · 1000×1250 | Treatment card + page |
| 6 | `public/images/treatments/root-canal.webp` | 4:5 · 1000×1250 | Treatment card + page |
| 7 | `public/images/treatments/implants.webp` | 4:5 · 1000×1250 | Treatment card + page |
| 8 | `public/images/treatments/braces-aligners.webp` | 4:5 · 1000×1250 | Treatment card + page |
| 9 | `public/images/treatments/whitening-veneers.webp` | 4:5 · 1000×1250 | Treatment card + page |
| 10 | `public/images/treatments/kids-dentistry.webp` | 4:5 · 1000×1250 | Treatment card + page |
| 11 | `public/images/visit-consultation.webp` | 3:2 · 1800×1200 | "How a visit works" |

### 1 — Doctor portrait (generate this first; it becomes the style reference)
```
Environmental portrait of a South Indian woman dentist in her late thirties, warm and composed, wearing a crisp white coat over a deep teal top, hair neatly tied back, standing in a bright modern treatment room. Three-quarter body turn, looking slightly off camera with a gentle, natural closed-mouth smile. Behind her, softly out of focus: a white dental chair and pale wooden cabinetry. 85 mm lens, f/2.2, eye level, subject in the centre-right of frame. Soft window light from camera left, gentle fill.
[STYLE SUFFIX]
```

### 2 — Reception
```
Wide interior photograph of a small premium dental clinic reception in Madurai: pale oak reception counter, warm white walls, one deep teal upholstered bench, a large potted areca palm, linen roman blinds diffusing morning light, polished terrazzo floor. Empty of people. Calm, spacious, spotless. 35 mm lens, f/5.6, eye level, one-point perspective slightly off-centre.
[STYLE SUFFIX]
```

### 3 — Treatment room
```
Interior photograph of a modern dental treatment room: a white and deep-teal dental chair with the overhead LED light switched off, a neat instrument tray covered in a sealed sterile pouch, pale oak cabinetry, a large window with diffused daylight on the left. No people. Minimal, bright, reassuring. 35 mm lens, f/5.6, chair in the right third.
[STYLE SUFFIX]
```

### 4 — Sterilisation area
```
Close-medium photograph of a clean sterilisation corner in a dental clinic: a stainless-steel autoclave with its door closed, sealed sterilisation pouches with instruments stacked neatly in a steel tray, a box of nitrile gloves, white quartz counter. Gloved hands of an assistant (no face visible) placing a sealed pouch into a drawer. 50 mm lens, f/4, soft side light from left.
[STYLE SUFFIX]
```

### 5 — Check-up and cleaning
```
Overhead still life on a white quartz surface: a polished dental mirror and a fine scaler laid parallel on a folded deep-teal cotton cloth, beside a single small paper cup. Precise, minimal arrangement with generous space. 100 mm macro, f/5.6, soft raking light from left showing fine steel texture.
[STYLE SUFFIX]
```

### 6 — Root canal
```
Macro still life: a row of fine stainless-steel endodontic files with colour-coded handles in muted tones, arranged in a neat fan on a white ceramic tray, one file in sharp focus, the rest softly falling off. 100 mm macro, f/4, soft light from upper left, clean shadows.
[STYLE SUFFIX]
```

### 7 — Implants
```
Product still life: a single titanium dental implant post and a porcelain crown standing beside each other on a small block of pale honed travertine, soft contact shadows. Clean warm-white background. 100 mm macro, f/8, both objects sharp, large soft key from upper left, thin rim light.
[STYLE SUFFIX]
```

### 8 — Braces and aligners
```
Still life: a pair of transparent clear dental aligners resting on an open matte white aligner case, on warm linen paper, a small sprig of mint leaf beside it. Crystal-clear plastic with soft caustic highlights. 100 mm macro, f/5.6, side light from left.
[STYLE SUFFIX]
```

### 9 — Whitening and veneers
```
Still life: a dental shade guide with porcelain tooth tabs fanned out in a gentle arc on a white quartz surface, the lightest shades in front and in focus. Soft pearly reflections on the porcelain. 100 mm macro, f/4, soft window light from left.
[STYLE SUFFIX]
```

### 10 — Kids dentistry
```
Cheerful but calm still life: a small child's toothbrush with soft bristles, a tiny hourglass timer and a plush toy tooth with a gentle stitched face, on a pale teal-tinted paper backdrop with warm white highlights. Playful yet clean and premium. 85 mm, f/4, soft light from left.
[STYLE SUFFIX]
```

### 11 — Consultation
```
Photograph of a dentist and an adult patient seated across a small pale-oak desk in a bright consultation room, the dentist pointing to a dental model with a pen while explaining, patient listening attentively. Faces in three-quarter profile, neither looking at camera, natural relaxed expressions. 50 mm lens, f/2.8, window light from left.
[STYLE SUFFIX]
```

---

## 4. Images we do not generate

- **Before/after smile gallery.** Generated "results" would mislead patients. The gallery shows tasteful "Real patient cases coming soon" placeholders until the clinic supplies consented cases.
- **Review avatars.** Reviews show initials only.
- **Logo.** Supplied as SVG files in `public/brand/` (see the build prompt).
