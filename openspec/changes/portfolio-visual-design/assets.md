# Assets: portfolio-visual-design

> Hero image files, how they were made, and how they were prepared for Figma.
> **`design/` is ignored by git on purpose** (proposal D8). A fresh clone does not have these files: the copies in Figma are the shared source. The table below describes the owner's local working copy.

## Files in `design/hero/`

| File | Size | Role | Status |
|---|---|---|---|
| `bg-back.png` | 3072 × 2048 | Sky + far hills | Source, generated |
| `bg-back-2X.png` | 6144 × 4096 | Upscaled sky, made by the owner | **Used in Figma** |
| `bg-front-hill.png` | 3072 × 2048, alpha | Near hill on transparent | Source, generated |
| `portrait-v2.png` | 2048 × 3072, alpha | Portrait cutout | **Used in Figma** |
| `Golden Sunrise Over Emerald Hills_upscayl_2x_remacri-4x.png` | 3172 × 1984 | Single-image background of Home v2 | Superseded |
| `retrato sin bkg_upscayl_2x_remacri-4x.png` | 2048 × 3072, alpha | AI-relit real photo, Home v2 | Superseded. Shows a third-party logo on the polo. |
| `preview-composite.jpg` | 1440 × 900 | Old preview of the v2 hero | Superseded |

## What is actually in Figma

The Figma layers do not hold the source files byte for byte. Each was prepared with `sharp`:

| Layer | Prepared from | Transform | Figma image hash |
|---|---|---|---|
| Sky | `bg-back-2X.png` | Resize to 3400 wide, PNG. Not mirrored. | `20abf6de3929a7d38986d94de831ed60dc477332` |
| Near hill | `bg-front-hill.png` | Resize to 2800 wide, then rotate 5° clockwise on a transparent background (result 2952 × 2104) | `17462f6ceb50a631f3be3581928ce20ae88dd7ec` |
| Portrait | `portrait-v2.png` | Resize to 1400 wide (source is 11 MB, over the 10 MB upload limit) | `c3e633c17f968684eff5c90b0905da687c776d76` |

Why the hill is rotated: in the source the slope rises about 8° to the right. At hero scale that put the crest above the sun on the right side. Rotating 5° leaves a gentle slope. On the web the same rotation can be applied with a CSS transform on the original file.

The prepared files were temporary and are not saved. To recreate the hill:

```js
const sharp = require('sharp');
const hill = await sharp('design/hero/bg-front-hill.png').resize(2800).png().toBuffer();
await sharp(hill)
  .rotate(5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('hill-rotated.png');
```

## Prompts

These are the prompts given to the owner on 2026-11-16. The owner ran them in GPT image models. The exact model, the number of attempts and any edits the owner made to the wording are not recorded.

### Sky + far hills (`bg-back.png`)

```
Photorealistic landscape at golden hour, wide 3:2. A vast, calm, empty sky
fills the upper two thirds: pale warm cream-yellow at the top, deepening to
soft glowing gold near the horizon. A small, low sun sits just above the
horizon, slightly left of center, with a gentle soft glow and no lens flare.
Below it, several layers of smooth, rolling green hills recede into warm
morning mist, each layer lighter and hazier than the one in front: soft
sage and muted green, never dark. The hills continue all the way to the
bottom edge of the frame. No foreground at all: no close grass, no trees,
no buildings, no fences, no people, no clouds, no text. Clean, minimal,
serene, soft atmospheric perspective, natural colors, no heavy saturation.
```

### Near hill (`bg-front-hill.png`)

```
Photorealistic isolated foreground element on a fully transparent
background, wide 3:2. A single smooth grassy hill slope seen at golden
hour, backlit by a low sun that is behind it and slightly left of center.
The slope rises gently from the lower left to the upper right and occupies
only the bottom 40% of the frame. Its body is deep emerald green in soft
shadow, darkest at the bottom. Its top edge is crisp and natural, with
individual short grass blades catching a thin line of warm golden rim
light. The hill extends past the left and right edges and fills the bottom
edge completely. Above the hill there is nothing: fully transparent, no
sky, no haze, no sun, no glow. No trees, no flowers, no rocks, no text.
Transparent PNG.
```

Fallback if the model ignores transparency: replace "fully transparent background" with "flat pure magenta (#FF00FF) background" and key it out.

### Portrait (`portrait-v2.png`)

Attach three or four reference photos (sharp, glasses on, even light, one frontal, one three-quarter, one showing the body; no wide-angle selfies).

```
Create a photorealistic three-quarter portrait (head to mid-thigh) of the
man in the reference photos, on a fully transparent background. Preserve
his identity exactly: same face shape, eyes, nose, smile, skin tone, hair
and the same glasses. Keep real skin texture with visible pores and natural
imperfections; no smoothing, no beautification, no change of age.

Pose: standing relaxed, body turned slightly to his right, both hands in
his pockets, a small confident closed-mouth smile, looking at the camera.

Clothing: a light heather-grey short-sleeve polo with navy trim on the
collar and sleeve cuffs, no logo or brand mark anywhere, and khaki chino
shorts.

Lighting: outdoor golden hour. A low warm sun behind him on the left of the
frame gives a soft golden rim light along his hair, shoulder and arm on
that side; the face is lit by soft, even, slightly warm fill with no hard
shadows. Shot on a 85mm lens at eye level, sharp focus on the eyes.

Clean cut-out edges, including hair. No background, no ground, no shadow
on the floor, no text. Vertical 2:3, transparent PNG.
```

## Footer name fill (`src/assets/footer/blue-hour.png`)

Added 2026-11-21. The closing name in the footer is filled with this image (`background-clip: text`), so the page walks through the day: sunset in the hero, golden hour in Contact, blue hour in the footer. It replaced a third reuse of `sky.png`.

- Generated in Figma with `gpt-image-2.5-flare` (node `2417:12` in `gq6glEp9QrPOnEyYG9dldh`), 1536 × 1024. Unlike the hero, this file IS committed under `src/assets/footer/`; the owner's working copy is `design/footer/blue-hour.png`.
- 1536 px wide is soft on 2x screens at desktop width. Upscale it (as was done for the sky) before release if it shows.

```
Photorealistic landscape at blue hour, just after sunset, wide 3:2. A vast,
calm, empty sky fills the upper two thirds: deep indigo and dark teal-green
at the top, fading to a soft muted sage-blue band, with a thin last warm
amber-gold glow sitting right on the horizon, slightly left of center, where
the sun has just set. A few small, faint stars are beginning to appear in
the upper sky. Below the horizon, several layers of smooth, rolling green
hills recede into cool evening mist, each layer lighter and hazier than the
one in front: deep emerald and muted blue-green, the farthest catching a
faint warm rim from the afterglow. The hills continue all the way to the
bottom edge of the frame. No foreground at all: no close grass, no trees,
no buildings, no fences, no people, no moon, no clouds, no text. Clean,
minimal, serene, soft atmospheric perspective, natural colors, no heavy
saturation, light film grain.
```

## Page covers v1 (proposal, 2026-11-21)

Owner: "tenemos que dejar de sobreutilizar la imagen del atardecer ... en los casos de estudio me gustaria una imagen mas de estudio u know, algo ams academico, y en las demas secciones algo que vaya con ellas pero tampoco que corten el rollo ni la paleta de colores pero qu e tapoc imite la paleta del home exactamente porque sino no se cre jerarquia".

Rule proposed: the Home keeps the sunset; each inner page takes another hour or place of the same world, paler and calmer, so it reads one step below. Work and Notes keep the near hill and the display word, with a new sky layer and the hill cooled with image filters; case studies move indoors (single layer, near hill hidden, cream scrims on the text side and under the nav). A post inherits the Notes cover. All generated in Figma with `gpt-image-2.5-flare`, 1536 × 1024; not upscaled, not in the repo yet.

| Page | Option | Figma node (image layer) | Board |
|---|---|---|---|
| Work index | A · Andean terraces, morning (sky y −130) | `2426:42` | `2426:12` on "Work — all projects" |
| Work index | B · farmland crop rows, late morning (sky y −20) | `2426:66` | `2426:12` |
| Case study | A · university reading room, green banker's lamps | `2426:122` | `2426:87` on "Case study — Inspiration Garden" |
| Case study | B · drafting desk by the window, wireframe sketchbook | `2426:151` | `2426:87` |
| Notes index + post | A · early morning mist (sky unmirrored; post copies the hash) | `2426:213`, `2426:267` | `2426:177` on "Writing — blog" |
| Notes index | B · morning mist, one lone tree on a near ridge (added on request) | `2430:15` | `2426:177` |
| Notes index | C · mist along a valley from a height, faint path (mirrored, y −120, so the dark slope sits behind the word) | `2430:45` | `2426:177` |

Hill filters: Work exposure 0.05, saturation −0.15, temperature −0.25, highlights 0.05, shadows 0.1; Notes exposure 0.08, contrast −0.05, saturation −0.3, temperature −0.3, highlights 0.1, shadows 0.1. Every prompt keeps the upper left plain and light for the dark intro text, and asks for no blue and no sunset tones.

```
Work A — Photorealistic landscape, wide 3:2, early morning in the Peruvian Andes. Ancient green agricultural terraces step down the far hillsides in soft curved lines, layer after layer, receding into light morning haze; each farther layer paler and hazier. The upper half of the frame is a calm, empty, bright sky in pale cream and very soft warm ivory, fading to a faint pale sage near the horizon — not blue at all, no blue sky. Clean, fresh daylight, the sun is out of frame high on the right, no visible sun disc, no sunset colours, no orange. The left upper third stays very light and plain so dark text can sit on it. Greens are natural and muted: sage, moss, soft emerald. No people, no animals, no buildings, no roads, no trees in the foreground, no text. Soft atmospheric perspective, minimal, serene, light film grain.
```

```
Work B — Photorealistic landscape, wide 3:2, late morning over gently rolling farmland. Long, orderly rows of young green crops curve over the far hills in parallel lines, like a precise drawing laid on the land, receding into soft haze. The upper half of the frame is a calm, empty, bright sky in pale ivory and soft cream, a faint pale sage near the horizon — not blue, no blue sky, no clouds. Even, clear daylight, the sun out of frame, no sun disc, no sunset or orange tones. The left upper third stays very light and plain so dark text can sit on it. Greens are natural and fresh but not saturated: sage, leaf green, soft emerald, with a touch of warm straw in the distance. No people, no machines, no buildings, no fences, no roads, no foreground trees, no text. Minimal, structured, serene, soft atmospheric perspective, light film grain.
```

```
Case study A — Photorealistic interior, wide 3:2, a quiet university reading room in soft morning daylight. Long dark wooden reading tables with classic green-glass banker's lamps, a few open books and notebooks with handwritten notes and small sketches, wooden bookshelves along the walls. Tall arched windows on the right side let in soft daylight and show green rolling hills outside, slightly overexposed and hazy. The left half of the frame, especially the upper left, is a calm, bright, softly out-of-focus cream wall and light so dark text can sit on it. Palette: warm cream, ivory, aged paper, dark walnut wood, deep forest green and emerald from the lamps and book covers, a small warm touch of sun-yellow light. No blue, no cold tones. Shallow depth of field, focus on the nearest table at the lower right. No people, no readable text, no logos. Academic, calm, timeless, editorial photography, light film grain.
```

```
Case study B — Photorealistic still life, wide 3:2, a designer-engineer's drafting desk by a large window in soft morning daylight. On a light oak desk at the lower right: an open sketchbook with hand-drawn interface wireframes and arrows, printed diagrams and flow charts, graphite pencils, a metal ruler, a few index cards, a small potted plant, a cup of coffee. Through the window on the right, green rolling hills, bright and hazy. The left half of the frame, especially the upper left, is a calm, bright, softly out-of-focus cream wall so dark text can sit on it. Palette: cream, ivory, warm paper, light oak, deep forest green and soft emerald accents (plant, a green notebook cover), a small warm sun-yellow highlight. No blue, no cold tones, no screens turned on. Shallow depth of field, focus on the sketchbook. No people, no readable text, no logos. Studious, precise, calm, editorial photography, light film grain.
```

```
Notes A — Photorealistic landscape, wide 3:2, very early morning just after dawn. Smooth rolling green hills recede in many soft layers, half dissolved in low white morning mist that fills the valleys; each layer paler than the one in front. The upper half of the frame is a calm, empty, pale sky in soft cream and warm ivory with a gentle peach-cream glow low near the horizon on the right, where the sun has not yet risen — no sun disc visible, not blue, no blue sky, no clouds. Low contrast, quiet, almost paper-like. The left upper third stays very light and plain so dark text can sit on it. Greens are muted and soft: sage, grey-green, pale moss, deeper muted emerald only on the nearest hills at the bottom. No people, no buildings, no trees, no roads, no text. Minimal, serene, contemplative, soft atmospheric perspective, light film grain.
```

```
Notes B — Notes A prompt with: "On a gentle ridge in the middle distance, right of center, stands one single lone tree with a rounded crown, softened by the mist — the only focal point."
```

```
Notes C — Photorealistic landscape, wide 3:2, early morning seen from a gentle height. A soft river of white mist flows along a wide green valley between rolling hills; a faint narrow footpath winds through the grass and disappears into the mist toward the right. Calm, empty, pale cream and ivory sky, faint pale sage near the horizon; no sun disc, not blue, no clouds, no sunset tones. Upper left very light and plain for dark text. Greens a little deeper than a pastel: sage, moss, muted emerald. No people, buildings, fences, foreground trees or text. Minimal, serene, soft atmospheric perspective, light film grain.
```

Open: desktop only (no tablet or mobile crops yet); 1536 px is soft at 2x, upscale whichever is picked; the near hill is still the sunset-lit file under a filter, a cooler hill could be generated if the filter is not enough.

## Rules for regenerating

- Generate from scratch. Do not ask the model to edit an existing image and keep its details (proposal D5).
- Keep the sun on the left and the rim light on the portrait's right side as seen in the frame (proposal D4).
- After generating a portrait, compare it side by side with a real photo of the owner before using it.
- A generated portrait must not be described as a photograph anywhere on the site.

## Profile photos (LinkedIn and social networks)

Added 2026-11-16. These images are for the owner's profiles outside the site, not for the site itself. Like the hero, they were generated by the owner with GPT image models; the files are not in the repository.

### Direction

- **One session.** Every photo should look like the same golden-hour afternoon in the same park. The sun is on the left of the frame with a gold rim light on the hair and shoulder, the same as the hero (proposal D4). The colors are muted emerald and sage with warm gold and cream highlights, with no heavy saturation. Use the warmth of the palette, not its hex values: the minty green-300 looks artificial in a photograph. Shot as if on an 85 mm lens with shallow depth of field and light film grain. Skin keeps its real texture and the owner's identity and glasses are kept exactly.
- **LinkedIn.** Square 1:1, from the chest up, with the face filling about 60% of the height, because LinkedIn shows it small and circular. The background is a mid-tone sage and gold bokeh, never dark, so the shirt stands out from it.
- **Social networks.** Vertical 4:5, in a real park with recognizable trees, lawn and path, never the hero landscape. The poses are candid and relaxed, so the photo looks taken by a friend.
- **Clothing.** A plain cotton crew-neck t-shirt. When the owner says "polo" he means this collarless t-shirt (the Peruvian usage). Image models read "polo shirt" as a collared shirt with buttons, so always write "crew-neck t-shirt… no collar, no buttons". The direction chose black for LinkedIn and light grey for social networks; in the end the owner used dark green for all of them.
- **Smile.** The smile is always closed-mouth, lips together with no teeth, never a laugh, including in the relaxed photos. Owner: "no quiero tener una sonrisa en la que se muestren los dientes".

### Prompts as used

These are the prompts the owner ran, recorded verbatim. Attach the same 3–4 reference photos to each one (see Portrait above).

**LinkedIn, 1:1**

```
Create a photorealistic head-and-shoulders portrait of the man in the
reference photos, square 1:1. Preserve his identity exactly: same face
shape, eyes, nose, smile, skin tone, hair and the same glasses. Real skin
texture with visible pores and natural imperfections; no smoothing, no
beautification, no change of age.

Framing: chest up, centered, his face filling about 60% of the frame
height, with a little space above the head. Shoulders turned slightly to
his right, face toward the camera.

Expression: a calm, subtle closed-mouth smile, looking directly at the
camera, relaxed and approachable.

Clothing: a plain dark green cotton crew-neck t-shirt with a ribbed round
neckband, soft matte jersey texture. No collar, no buttons, no logo, no
print anywhere.

Setting: an outdoor park at golden hour, fully out of focus behind him:
soft mid-tone bokeh of sage and muted emerald foliage with warm golden
light, never dark green, so the black polo separates clearly from it.

Lighting: a low warm sun behind him on the left of the frame gives a soft
golden rim light along his hair and left shoulder. His face is lit by
soft, even, slightly warm fill with no hard shadows. Shot on an 85mm lens
at f/2, eye level, sharp focus on the eyes, subtle natural film grain.
Natural colors, no heavy saturation, no text, no watermark.
```

**Social, seated on the grass, 4:5**

```
Create a photorealistic candid portrait of the man in the reference
photos, vertical 4:5. Preserve his identity exactly: same face shape, eyes, nose, smile, skin tone, hair and the same glasses. Real skin texture with visible pores; no smoothing, no beautification, no change of age.

Scene: he sits on the grass in a real city park at golden hour, one knee up with his forearm resting on it, relaxed. Behind him, recognizable but softly blurred: trees, open lawn and a footpath. It looks like a friend took the photo, not a studio shoot.

Expression: a soft, relaxed closed-mouth smile, lips together, no teeth showing, slightly asymmetric and natural, looking at the camera.

Clothing: a plain light heather dark green cotton crew-neck t-shirt with a ribbed round neckband, soft jersey texture. No collar, no buttons, no logo, no print anywhere.
Lighting: a low warm sun behind him on the left of the frame, golden rim light on his hair and shoulder, warm soft light on his face, long soft shadows on the grass. Palette of muted emerald and sage greens with warm gold and cream highlights. Shot on an 85mm lens at f/2.2, waist-up to full seated figure, subtle natural film grain. Natural colors, no heavy saturation, no text, no watermark.
```

**Social, leaning on a tree, 4:5**

```
Create a photorealistic candid portrait of the man in the reference photos, vertical 4:5. Preserve his identity exactly: same face shape, eyes, nose, smile, skin tone, hair and the same glasses. Real skin texture with visible pores; no smoothing, no beautification, no change of age.

Scene: he leans one shoulder against a tree trunk in a real park at golden hour, hands relaxed in his pockets, framed from the waist up. Grass and more trees behind him, softly blurred, sunlight filtering through leaves.

Expression: a quiet, amused closed-mouth smile, lips together, no teeth showing, looking slightly off camera to his left, as if he just heard something funny. Spontaneous, not posed.

Clothing: a plain light heather dark green cotton crew-neck t-shirt with a ribbed round neckband, soft jersey texture. No collar, no buttons, no logo, no print anywhere.

Lighting: a low warm sun behind him on the left of the frame, golden rim light on his hair and shoulder, warm dappled light on the tree bark.
Palette of muted emerald and sage greens with warm gold and cream highlights. Shot on an 85mm lens at f/2, subtle natural film grain.
Natural colors, no heavy saturation, no text, no watermark.
```

### Notes for the next run

- The LinkedIn prompt still says "so the black polo separates clearly from it", left over from when the shirt was black. Change it to "so the dark green t-shirt separates clearly from it".
- "light heather dark green" contradicts itself; write "heather dark green".
- The LinkedIn expression does not say "lips together, no teeth showing", unlike the social prompts. Add it if a result shows teeth.
- A dark green shirt against green foliage can blend in. The rim light and the mid-tone background are what separate them, so check the edge of the shoulders in each result.
