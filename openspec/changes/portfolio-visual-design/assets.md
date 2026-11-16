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

## Rules for regenerating

- Generate from scratch. Do not ask the model to edit an existing image and keep its details (proposal D5).
- Keep the sun on the left and the rim light on the portrait's right side as seen in the frame (proposal D4).
- After generating a portrait, compare it side by side with a real photo of the owner before using it.
- A generated portrait must not be described as a photograph anywhere on the site.
