# Design: portfolio-visual-design

> This is the working reference for anyone continuing the visual design. Decisions and their reasons are in `proposal.md`; image files and prompts are in `assets.md`; progress is in `tasks.md`.
> Figma file: `gq6glEp9QrPOnEyYG9dldh` ("Jahat Trinidad - Portfolio"). Last verified against Figma: 2026-11-16.

## 1. Brand foundation (decided 2026-11-08/09)

**Positioning.** Label "Design Engineer", plain descriptor "Design Engineer · Frontend & Product". Signature: curiosity about how systems work inside (logic, optimization) and how they feel outside (design, brand). Rejected labels: "Creative Developer" (reads agency/WebGL), "Software Engineer" (generic).

**Audience.** Companies hiring for an internship or first job; also startups and consulting.

**Messaging rule.** Outside speaks outcomes in plain language for whoever hires. Inside carries the technical decisions for whoever evaluates. No invented metrics; only verifiable proof.

**Fixed copy (approved).**

| Slot | Text |
|---|---|
| Descriptor | DESIGN ENGINEER · FRONTEND & PRODUCT |
| Hero headline | I build products people actually use — designed and built by the same person. |
| Hero sub | So nothing gets lost between design and code: it looks right, it works, and it ships sooner. |
| Primary CTA | See my work → |
| Value 01 | Ideas into working products, fast. Proof: Inspiration Garden, designed and launched solo in under 7 weeks. |
| Value 02 | A bridge between design and engineering. Proof: pending (brand + interface project). |
| Value 03 | Built to grow, not to be redone. Proof: Garden roadmap, four phases on one foundation. |
| Contact headline | Looking for someone who can design it and build it? Let's talk. |

**Rejected aesthetics.** Editorial ("no me representa"). An Inside that is only a different layout and communicates nothing. Serif type. Bricolage Grotesque for the name.

## 2. Type system

| Role | Family | Notes |
|---|---|---|
| Display, name, headings | Epilogue (Medium, SemiBold) | Display name is Epilogue Medium 176 on desktop |
| Body and UI | Hanken Grotesk (Regular, Medium) | |
| Labels, metadata, code | IBM Plex Mono (Regular, Medium) | Section markers, annotations, tags |

On the web these must be self-hosted through Astro's Fonts API.

## 3. Color

### 3.1 Primitives (palette v1, unchanged)

| Token | Hex | Source |
|---|---|---|
| green-50 | `#EBFCEB` | palette sheet |
| green-200 | `#B3F3B4` | palette sheet |
| green-300 | `#88E88C` | palette sheet |
| green-700 | `#236C2A` | palette sheet |
| green-900 | `#143A17` | palette sheet |
| green-950 (ink) | `#0A200B` | palette sheet |
| sun | `#F6D653` | palette sheet |
| sun-soft | `#FBEBA0` | palette sheet |

Also used in the boards, step names to confirm on the palette sheet (`2025:130`): `#61D56A`, `#44B34F`, `#318D3A`, `#1A511F`.

### 3.2 Added in v3 (Proposed)

| Name | Hex | Use |
|---|---|---|
| cream | `#FAF6E8` | Outside page surface. Replaces paper `#F2F4F0`. |
| sand | `#F3EDD6` | Outside alternate band (Work, Elsewhere) |
| card | `#FFFDF7` | Outside cards. Replaces pure white. |
| hairline-warm | `#D8D2B6` | Outside dividers in Experience |

### 3.3 Rules still in force from palette v1

- Text on green is white or green-950, never black.
- Sun yellow is for small signals only (status dots, pins, leader lines, highlights). Never a button, never body text.
- Sun yellow is never darkened. On light surfaces it is a fill behind ink.
- No blue, violet, teal, jade, mint or neon.
- "No opacity fades" is currently broken by the Inside hero. See proposal Open Question 4.

### 3.4 What each state uses

| Element | Outside | Inside |
|---|---|---|
| Page surface | cream `#FAF6E8` | green-950 `#0A200B` |
| Alternate band | sand `#F3EDD6` | green-900 `#143A17` |
| Card | `#FFFDF7` | green-900 on 950, or 950 on 900 |
| Heading text | green-950 | white |
| Body text | green-950 or green-900 | green-200 `#B3F3B4` |
| Label, metadata | green-700 `#236C2A` | green-300 `#88E88C` |
| Primary button | green-950 fill, white text | green-300 fill, green-950 text |
| Secondary button | green-950 1px stroke | green-300 1px stroke |
| Dividers | `#D8D2B6` or green-950 hairline | `#236C2A` |
| Tag outline | `#44B34F` | `#236C2A` |
| Proof / How chip | sun-soft fill, ink text | `#1A511F` fill, green-200 text |
| Annotations | none in hero | sun pin and line, sun label, green-200 second line |
| Footer | green-950 | green-950 |

## 4. Outside / Inside model

- Outside and Inside are **two states of the same page**, same sections, same order.
- Outside is light and talks about outcomes. Inside is dark and shows how things are built.
- Dark is reserved for Inside. The footer is the one dark element in Outside (the ground).
- Hint text: Outside "press I to look inside anything ↓"; Inside "press I to go back outside ↑". Section marker: "01 — OUTSIDE" / "01 — INSIDE".
- The interaction itself (what happens on "I", per-element vs page-wide, motion) is **not designed yet**.

### Section inventory (home, desktop)

| # | Section | Outside | Inside |
|---|---|---|---|
| 01 | Hero | Golden-hour layers, approved headline, no annotation | Dusk layers, outlined name, four layer annotations, dashed bounds |
| 02 | Values | "How I add value to your team", 3 cards with PROOF chips | "How I actually do it", 3 cards with HOW chips (Draft copy) |
| 03 | Work | Viora featured card without pins, 3 outcome notes (Draft copy); two project cards; "See all projects" | Viora with numbered pins and leader lines to 3 technical decisions, stack line |
| 04 | Experience | Light, same content | Dark, same content |
| 05 | Writing | Light list | Dark list |
| 06 | Elsewhere | Sand band | Dark list |
| — | Contact | Sky image as background, ink text | Dark, mint button |
| — | Footer | Dark | Dark |

### Draft copy added 2026-11-16 (needs owner review)

Outside, Viora notes:
1. "Works where growers already are" — A web platform for planning, a phone app for producers in the field and another for cooperatives. The same data everywhere.
2. "Warnings arrive before the problem" — When something changes on a plot, growers get an alert for their sector without having to go and check.
3. "Explains itself" — A built-in assistant explains each screen and writes a daily summary, so nobody needs training to start.

Inside, hero: "The same page, taken apart — every layer, token and decision." / "Press I anywhere to see how a thing is built: what it is made of, and why." Secondary button: "Back outside".

Inside, values (label "02 — HOW IT WORKS", title "How I actually do it"):
1. "One pipeline, no handoff" — Figma to tokens to components to a static build. The person who drew it is the one who ships it. HOW: Astro · TypeScript · CSS custom properties.
2. "Design decisions live in code" — Color, type and spacing are tokens, so a design change is one edit and not a hunt through files. HOW: One tokens file, light-dark() for themes.
3. "Boundaries a script enforces" — Content is read through one module, and a checker fails the build when anything reaches around it. HOW: check-boundaries.mjs · zero dependencies.

These describe this repository and are true as of 2026-11-16. Card 2 depends on proposal Open Question 3.

## 5. Hero composition (desktop 1440 × 900)

Paint order, back to front. Positions are the owner's composition and are the reference.

| Order | Layer | Box (x, y, w, h) | Notes |
|---|---|---|---|
| 1 | Sky + far hills | 0, −171, 1606 × 1071 | Not mirrored. Sun lands near (483, 538). |
| 2 | Display name | 64, 612, 1279 × 180 | White in Outside. **Behind the hill**: the grass edge overlaps the letter bases. |
| 3 | Near hill | −86, −13, 1617 × 1152 | Transparent PNG, pre-rotated 5° (see `assets.md`). |
| 4 | Portrait | 900, 190, 520 × 780 | Cropped by the frame bottom at about mid-thigh. |
| 5 | Nav, intro, marker, hint | — | Intro block at 64, 180, 600 wide. |

Rules:
- Sun on the left of the subject. Do not mirror any layer (proposal D4).
- The sky layer must have content behind the near hill, so moving the hill never reveals a hole.
- The hill image is wider than the frame so it can travel horizontally.

Inside differences: a `#0A200B` overlay at 0.8 sits directly above the sky; the name has no fill and a 1.5px green-300 stroke; the hill image has exposure −0.4; annotations and dashed bounds are added on top.

Inside annotations (pin centre, label side):

| Layer | Pin | Label |
|---|---|---|
| 01 sky | (505, 536) | right: "[layer 01 · sky + far hills]" / "bg-back.png · moves slowest" |
| 02 hill | (520, 838) | right: "[layer 02 · near hill]" / "bg-front-hill.png · moves fastest" |
| 03 name | (70, 586) | right: "[layer 03 · display name]" / "Epilogue Medium 176 · sits behind me" |
| 04 portrait | (900, 420) | left: "[layer 04 · portrait]" / "generated from my own reference photos" |

## 6. Figma map

Pages:

| Page | Id |
|---|---|
| Brand — Identity v1 (palette sheet `2025:130`, type sheet) | `2005:130` |
| Portfolio — Home | `2029:2` |
| Case study — Inspiration Garden | `2047:13` |
| Work — all projects | `2065:2` |
| Writing — blog | `2066:2` |
| Archive (old portfolio, Home v1) | `0:1` |

Boards on "Portfolio — Home":

| Board | Id | Position | Status |
|---|---|---|---|
| Home v2 desktop 1440 | `2038:46` | x 0 | Reference only. Do not edit. |
| Home v2 mobile 390 | `2049:2` | x 1600 | Still v2 |
| Home v2 tablet 768 | `2062:2` | x 2150 | Still v2 |
| **Home v3 · OUTSIDE** desktop | `2084:2` | x 3200 | Current |
| **Home v3 · INSIDE** desktop | `2084:314` | x 4840 | Current |

v3 section ids (Outside / Inside): hero `2084:3` / `2084:315`; values `2084:46` / `2084:358`; work `2084:72` / `2084:384`; experience `2084:154` / `2084:466`; writing `2084:255` / `2084:567`; elsewhere `2084:280` / `2084:592`; contact `2084:300` / `2084:612`; footer `2084:307` / `2084:619`.

v3 hero layer ids (Outside / Inside): sky `2084:627` / `2084:631`; hill `2084:628` / `2084:632`; portrait `2084:629` / `2084:633`; name `2084:11` / `2084:323`; Inside overlay `2086:2`.

Other pages (ids recorded 2026-11-09, not re-verified): case study desktop `2047:14`, mobile `2050:2`, tablet `2063:2`; work index desktop `2065:3`, tablet `2068:2`, mobile `2068:202`; writing index `2066:3`, post template `2066:89`. **None of these has been updated to the v3 direction.**

The file has no Figma variables or styles: colors are raw hex on the nodes. That is the existing convention, not an oversight to fix mid-task.

## 7. Working method for agents

- Before any design, brand, copy or image request: read Engram (project `jahattrinidad.com`) and the Figma file. Then act.
- Build proposals **beside** the current board, never over it. Clone, rename, move right, add a caption.
- If the owner edits a board by hand, their version wins. Read the board again before touching it.
- Make state changes by recoloring a clone, not by redrawing. The v3 boards were made that way, so both states stay structurally identical to v2.
- Check the result with a screenshot before reporting. Several defects in this change were only visible in a screenshot (an image that uploaded but did not render, a label over a dashed line, a low-contrast key cap).

Tooling facts learned the hard way:

| Fact | Consequence |
|---|---|
| Call `page.loadAsync()` or `setCurrentPageAsync` before listing a page's children | Otherwise existing frames are missed |
| Figma asset upload limit is 10 MB | Resize large PNGs first |
| Lossless WebP uploads report success but do not render | Use PNG or JPEG |
| No Python PIL or ImageMagick on the dev machine | Use `sharp` from this repo: `require('sharp')` |
| Changing text needs the node's font loaded first | Load Epilogue, Hanken Grotesk and IBM Plex Mono styles before editing |
| Text inside "Screenshot — …" and "Cover — …" frames belongs to the project images | Exclude those frames from any recolor pass |

## 8. Implementation notes (not authorized yet)

These are implications to carry into the implementation tasks, not instructions to start.

- Replace the placeholder primitives in `src/styles/tokens.css`; components keep consuming semantic aliases only.
- The hero needs the four layers as separate elements in the paint order of section 5, so depth effects stay possible.
- Outside and Inside copy are both UI strings: they go through `Dictionary` in `src/lib/i18n.ts`.
- Project covers and screenshots are content images: `coverImage` in the projects schema already exists.
- Probable schema additions are listed in the proposal under Affected Areas.
- `openspec/config.yaml` says syntax highlighting is Shiki while `CLAUDE.md` says code fences render unhighlighted. The post template in Figma shows a plain unhighlighted block. This contradiction predates this change and needs an owner decision before the post page is built.
