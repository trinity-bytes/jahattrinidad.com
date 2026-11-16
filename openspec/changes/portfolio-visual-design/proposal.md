# Proposal: portfolio-visual-design

> Phase: design in Figma (pre-implementation). No source code is authorized by this change yet.
> Store: `openspec/changes/portfolio-visual-design/` + Engram project `jahattrinidad.com` (topics `brand/*`, `design/*`).
> Touches, per `openspec/config.yaml` rules.proposal: **nothing yet.** When implementation is authorized it will touch `src/styles/tokens.css`, the Astro Fonts config, page and section components, and the content collections (see "Affected Areas").
> Last updated: 2026-11-16.

Give jahattrinidad.com its visual identity and page designs, and record the decisions so the work can continue across agents and clones of the repo. The scaffold (archived change `2026-09-18-portfolio-scaffold`) shipped structure only: `src/styles/tokens.css` holds neutral and blue placeholder values, not the brand.

## Read this first

1. **Figma is the source of truth for visuals.** File key `gq6glEp9QrPOnEyYG9dldh`. The node map is in `design.md`.
2. **`src/styles/tokens.css` is NOT the brand.** Never derive colors, type or image direction from it.
3. **No UI code until the owner approves the hi-fi.** The owner has pushed back on code proposals during the design phase more than once. Propose in Figma.
4. **Home v3 is the current direction; Home v2 is kept only for comparison.** Do not edit v2.
5. Status words used below: **Accepted** = the owner said so explicitly. **Proposed** = built and well received, exact values still open. **Draft** = written by an agent, not reviewed.

## Intent

On 2026-11-16 the owner reviewed Home v2 and said only the hero looked good: the rest felt "meh" and they had lost faith in the palette. The diagnosis they accepted:

| Symptom | Cause |
|---|---|
| The hero works, the rest does not | The hero is warm light with depth. Below it the page was a cold grey-white and flat dark green. Same palette, wrong proportions. |
| Long dark stretch reads "terminal/fintech" | Work and Experience together were about 3300px of mint text on near-black green. |
| Inside/Outside "declared, not executed" | Dark sections meant nothing: Experience and Contact were dark without being "inside". The only place the concept worked was the annotation language (thin line + mono note pointing at a real thing). |
| Project thumbnails look dirty | Each cover brings its own palette and fought the saturated green container. |

The palette was kept. What changed is how it is used.

## Decisions

Earlier brand decisions (2026-11-08/09) are summarized in `design.md` and remain in force unless a row below supersedes them.

### D1 — Keep the palette, change the proportions ("golden hour") — Accepted (direction), Proposed (exact values)

Green ramp and sun yellow are unchanged. Light surfaces move from the cold paper `#F2F4F0` to a warm cream derived from sun-soft. Warm light dominates, deep green is the ground.

- **Rejected: a new palette.** The owner asked whether the current colors could work. They can: the hero proves it. Hue was never the problem.
- **Rejected: keep `#F2F4F0`.** It is the one color that comes from nowhere in the hero, and it is why the page felt disconnected from it.
- **Supersedes:** the "light surface = paper `#F2F4F0`" rule from palette v1.

### D2 — Outside and Inside are two states of the whole home, mocked separately — Accepted (owner requirement)

The home has one mockup per state. Dark is no longer a section style: **dark means the Inside state is on.** Outside is the light state.

- **Rejected: alternating light and dark sections** (Home v2). Dark carried no meaning, so the concept read as decoration.
- **Supersedes:** "dark surface = green-900" as a general section rule.
- **Open:** the toggle still sits in the Work section header. A page-wide state probably belongs in the nav (see Open Questions).

### D3 — The hero is separate layers, built for depth — Accepted (owner requirement)

Four layers: sky with far hills, display name, near hill, portrait. The near hill is its own transparent image so depth and parallax effects are possible later.

- **The owner's composition is canonical.** An agent first mirrored the background and placed the name in front of the hill. The owner corrected it because it broke realism: the sun no longer matched the highlight on the grass or the rim light on the portrait. See D4.

### D4 — Light direction must agree across layers — Accepted (owner correction)

The sun is on the left. The grass highlight and the portrait's rim light both assume that. **Never mirror these layers** and never move the sun to the other side of the subject.

### D5 — Hero images are generated from scratch, not edited — Accepted

The background layers and the portrait were generated with GPT image models from prompts recorded in `assets.md`. The portrait was generated from several reference photos of the owner.

- **Rejected: editing the existing image** ("remove the near hill, keep everything else"). The owner's experience is that image models do not honor "keep the details" instructions.
- **Rejected: background removal plus recolor on a real photo.** The owner tried it and it damaged the face.
- **Supersedes:** the 2026-11-09 decision to use an AI-relit cutout of a real photo, and the hero note "shot by me, relit with AI", which is no longer true. The owner removed that annotation from the Outside hero.

### D6 — Annotation is the signature of Inside — Proposed

A pin, a thin leader line and a two-line mono label that points at a real thing. Inside uses it everywhere; the Outside hero has none (the owner deleted the one that was there).

### D8 — Image assets stay out of git; Figma holds them — Accepted (2026-11-16)

`design/` is listed in `.gitignore`. The hero images live in the Figma file, which is enough for the design phase. The local files in `design/hero/` are a working copy on the owner's machine.

- **Rejected: committing `design/hero/`** (about 70 MB of PNGs) and **Git LFS.** Not worth the repository weight while the design is still moving.
- **Consequence:** a fresh clone has no image files. Export them from Figma or regenerate them with the prompts in `assets.md`. Implementation will need web-sized exports placed under `src/`; that is an implementation task, not this decision.

### D7 — New copy on the v3 boards — Draft

All text added on 2026-11-16 was written by an agent and must be reviewed by the owner: the three outcome notes on the Viora card (Outside), the Inside hero headline and sub, and the three "How I actually do it" cards. Texts are listed in `design.md`.

## Scope

### In Scope

- Brand identity: positioning, messaging rule, palette, type system (decided 2026-11-08/09, recorded here for continuity).
- Home: Outside and Inside states at desktop 1440, then tablet 768 and mobile 390.
- Bringing the other pages (Case study, Work index, Writing index and post) in line with the v3 direction.
- Hero image assets and the prompts that produced them.

### Out of Scope

- Any change under `src/` until the owner approves the hi-fi. Implementation gets its own tasks at that point.
- Spanish content and a Spanish dictionary (D1 of the scaffold change is settled: English-first).
- Motion and the "Look inside" interaction: named as later steps, not designed yet.

## Affected Areas (when implementation is authorized)

| Area | Change |
|---|---|
| `src/styles/tokens.css` | Replace placeholder primitives with the brand palette. Keep `color-scheme: light dark` on `:root` unless Open Question 3 decides otherwise. |
| Fonts | Epilogue, Hanken Grotesk, IBM Plex Mono through Astro's native Fonts API, self-hosted. `@fontsource` and Google Fonts CDN stay forbidden. |
| `src/lib/i18n.ts` | Every UI string from the designs goes into the `Dictionary`. Outside and Inside copy are both UI strings. |
| `src/content.config.ts` | Likely new fields: posts `type` (essay or tutorial); projects `tier` (case-study, project, archive) and team info (solo or team size, plus "my part"). Not decided here. |
| `src/pages/`, `src/components/` | Home sections, hero layers, Inside/Outside state. |

## Risks

| Risk | Mitigation |
|---|---|
| Hero assets are not in git by decision (D8). A fresh clone has no images. | Export from Figma (image hashes in `assets.md`). The prompts can also regenerate them, but results will differ. |
| Figma node IDs change if boards are rebuilt. | Boards are also findable by name; names are in `design.md`. |
| Draft copy ships as if it were approved. | D7 and the task list keep it flagged. |
| Inside/Outside state collides with OS light/dark through `light-dark()`. | Open Question 3. Do not implement theming before it is answered. |

## Rollback Plan

Nothing in `src/` changes, so there is nothing to roll back in code. In Figma, Home v2 (`2038:46`, tablet `2062:2`, mobile `2049:2`) is untouched and remains a complete fallback. The v3 boards can be deleted without affecting it.

## Open Questions

1. **Name hidden by the portrait.** "Jahat Trinidad" reads "Trinic__d". Shrink the name, move the portrait, or accept it as part of the depth effect?
2. **Experience left column is empty.** Only its colors changed in v3.
3. **Inside/Outside vs OS color scheme.** `tokens.css` uses `light-dark()`, which follows the OS. The design makes dark a user-toggled content state. Are they the same switch, two switches, or does the site ignore the OS preference?
4. **Opacity.** Palette v1 says "no opacity fades". The Inside hero uses a `#0A200B` overlay at 0.8 and an exposure filter on the hill. Keep the rule and bake dark image variants, or relax the rule for image dimming?
5. **Toggle placement.** Section header (today) or nav (page-wide state)?
6. **Sun yellow.** The owner showed slight doubt about yellow on 2026-11-09 ("maybe no es tan mi estilo"). Re-check now that it is on real pages.
7. **Parallax amounts.** Inside labels say "moves slowest / moves fastest". No values are specified.
8. ~~Where do the image assets live?~~ Resolved 2026-11-16: untracked, Figma holds them. See D8.
9. **Placeholders still in the design:** proof for value 02, `[N]` project count, `[CITY / REMOTE]`, post titles, Elsewhere rows.

## Success Criteria

- The owner approves Outside and Inside at desktop, tablet and mobile.
- Every section in Outside holds up next to the hero (the owner's own test: nothing "meh").
- Inside communicates how things are built, not only a darker theme.
- All Draft copy is either approved or replaced.
- Open Questions 3, 4 and 5 are answered before implementation tasks are written.
