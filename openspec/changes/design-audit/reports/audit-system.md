# Design audit phase 2 — Area 5: Cross-page system (`SY`)

## 1. Header

- **Area**: the cross-page system. Covers icons, buttons and links, type, spacing, colour, focus, hover and motion across every route. Page-local symptoms belong to areas 1–4 (`HO`, `HI`, `WK`, `NL`). This report cites them by id and adds only cross-page findings.
- **Routes walked** (live dev server, `src/` at 5a0977a): `/`, `/work/`, `/work/tourbench/`, `/work/inspiration-garden/`, `/notes/`, `/notes/why-a-boundary-checker/`, `/links/`, plus `/es/` and `/pt/work/` for i18n length. Each route was walked at **1440×900, 768×1024 and 390×844**. Routes with Inside content (Home, Work, Notes, post) were also walked with the **Inside** lens (`data-lens="inside"`), for 39 page states in all.
- **Inventories** (one Playwright walk, `reducedMotion: reduce`, dev toolbar removed, web3forms blocked):
  - every SVG icon of 64 px or less: size, viewBox, stroke, colour, host text and the vertical offset between the icon centre and its text centre
  - every arrow glyph in text
  - every `a`/`button`/`input`: box, font, colour, background, border, radius, padding, decoration, cursor and transition
  - every distinct font family × size × weight × line-height × tracking × case
  - every flex/grid gap, padding and margin value
  - every text, background and border colour per lens
  - the real Tab order with the computed focus outline of each stop
  - a reading-measure pass at 1440
- **Figma boards**: all four `As built` pages:
  - Home Outside: `2449:21`, `2487:61`, `2487:349`
  - Home Inside: `2474:12`, `2476:14`, `2477:14`
  - Work: `2470:870`, `2471:12`, `2471:428`; TourBench `2471:903`; Garden `2471:1541`
  - Notes and post: `2447:13`, `2447:593`
  - Links: `2447:1188`

  System findings cite the element node ids the area reports already measured. One new metadata read was made: the Contact section frame `2449:542`.
- **Impeccable detector**: run as the brief asks (`detect --json src/` from the repo root). It returned `[]`. The CLI explains why: on `.astro`, `.css` and `.ts` files it runs regex rules only, and the element rules (contrast, tiny text, stragglers and others) do not run. To get a verdict worth having, I also ran it read-only against the dev server: all seven routes, at its default 1280×800 and at 390×844 (§3).
- **Not checked**:
  - hover screenshots per control (the area reports cover hover with a real mouse; this report works from the CSS rules and their counts)
  - es/pt at 768
  - Figma text styles and variables (the boards are as-built pictures, not a component library, so the DOM is the inventory source)
  - a pixel-level contrast pass for every colour pair (computed colours were enough for the system view, except the two pixel samples cited)

## 2. Findings

Ordered by severity, then by how widely each one reaches. Each row is a cross-page item that no single area owns, or the root cause behind several area items.

| ID | Sev | Category | Where | Evidence | Why it matters | Fix |
|---|---|---|---|---|---|---|
| SY-01 | P2 | interaction / type | Every page with a filled pill. Home: hero CTA (1440 board `2449:21`) and nav Contact (`2449:3181`). Work: card "See the project →" (`2470:909`…). TourBench and Garden: hero "Open the project / Open the garden" (`2471:903`, `2471:1541`). Post: "Write to me →" (`2447:593`) | One role, the primary filled pill, is built six ways:<br>• Nav Contact: 97.6×**45**, 16/500, pad 12/20, white text, no hover<br>• Hero CTA: 166.7×**49**, 16/500, line-height 20.8, pad 14/24, hover adds an underline<br>• Project hero buttons: 193×**48**, 16/500, line-height 16, pad 14/22, 1 px border, hover adds an underline<br>• Work card pill: 186.6×**43** (42 at 768, **41** at 390), 18/500 (fluid body size), pad 10/18, **cream** text, hover darkens the background to green-800<br>• Post pill: 139.7×**43.5**, **15**/500, pad 12/20, no hover<br>• Chat pills: 46 (HI-10)<br>So there are five heights between 41 and 49 px, three font sizes, four paddings, two text colours and three hover treatments. `src/components/ui/` holds only `Annotation`, `Icon` and `Magnetic`: there is no Button component | Consistency and standards: one action type should look and react the same on every page. A visitor reads the pill size as importance, so a 41 px pill next to a 49 px one implies a hierarchy that does not exist | Add `ui/Button.astro` with two variants:<br>• `primary`: green-950 fill, white text (Inside: green-300 fill, green-950 text)<br>• `secondary`: 1 px stroke<br>Both: Hanken 16/500, line-height 20, padding 12/22, height 44, gap 8, icon 18. Hover: background green-800 (Inside: green-200), never an underline. Pressed: `scale(.97)` over 120 ms. Replace the six pills. This also closes HO-19 and HI-10 |
| SY-02 | P3 | type / interaction | Back links on three templates: TourBench and Garden hero "← All work" (`2471:914`), their next section (`2471:1003`), post "← ALL NOTES" (`2455:33`) | Three treatments for "back to the listing":<br>• Case-study hero: Hanken 14/500, green-800, no underline, 75.7×21<br>• Case-study next section: Hanken 18/400, underlined, 90.9×23<br>• Post hero: Plex Mono 13/500, uppercase, tracking 1.04, green-800, 97.3×**16.9**<br>WK-20 and NL-13 each see half of this | The same navigation, styled per page, has to be relearned on each one | One `BackLink`: Plex Mono 13/500, uppercase, tracking 0.08em, green-700, with `←` from the Icon set at 14 px. Pad it to a 44 px hit area (`padding-block: 13.5px; margin-block: -13.5px`). Use it in all three places |
| SY-03 | P3 | icon | Every page, the external-link icon `arrow-up-right` | Six sizes for one role, all with `stroke-width="2"`:<br>• **12** px, Notes Elsewhere rows (renders as a 1.0 px stroke)<br>• **13**, footer (1.08)<br>• **15**, Work cards and tiles (1.25)<br>• **16**, Notes RSS (1.33)<br>• **18**, Contact and project hero (1.5)<br>• **20**, `/links/` cards (1.67)<br>The adjacent text is 16–18 px in every case. Every size is a literal number at its call site (`Icon size={15}` ×6, `{18}` ×4, `{13}` ×2, `{12}`, `{16}`, `{20}`). Four more sizes are used for other icons: 20 (menu, copy, search, send), 19/17 (brand), 28 and 64 (lens). Vertical alignment is fine everywhere: icon centre within 0.0–0.9 px of the text centre | One family should carry one stroke weight and one size per role. HO-12, HO-13 and WK-30 each saw two or three of these sizes | Give `Icon` a role-based size: `inline` = `1em` (it follows the text), `control` = 20, `brand` = 20. Draw the stroke with `vector-effect: non-scaling-stroke` at 1.5 px, so every size renders the same weight. Delete the literal sizes |
| SY-04 | P3 | type / a11y | Contact on every page that has it: `/`, `/work/`, both case studies, `/notes/`, `/es/`, `/pt/work/`, all widths. Board section `2449:542` | The note under the composer, "Goes straight to my inbox." (ES "Llega directo a mi correo.", PT "Vai direto para minha caixa…"), is Plex Mono **11**/500, line-height 14.3, tracking 0.22 (`font: 500 0.6875rem/1.3`). That is below the system's own label floor, `--font-size-label` 12 px (design.md §3.4 annotations: 12 px). The detector flags it as `tiny-text` on every route | Readability, and drift from the label token. It is the only 11 px text Outside | Use the label token: `font: 500 var(--font-size-label)/1.33 var(--font-mono)` |
| SY-05 | P3 | type | Every page, the mono label role (markers, eyebrows, kickers, chips, sub-labels, footer column heads) | Non-code Plex Mono labels at 1440 come in:<br>• **5 sizes**: 10, 11, 12, 13, 14<br>• **8 trackings**: 0, 0.22, 0.36, 0.48, 0.72, 0.845, 0.96, 1.04 px<br>• **7 line heights**: 13, 15.6, 15.96, 16.9, 18, 19.5, normal<br>• **5 colours**: green-700, green-800, green-950, green-300, green-900<br>In source, the token `var(--font-size-label)` is used 16 times. The same role is written raw about 30 times: `13px` ×10, `12px` ×7, `.8125rem` ×3, `.75rem` ×4, `0.6875rem` ×4, `10px` ×2, `9px` ×1 | One label role, about fifteen treatments. HO-02, HI-07, WK-07, WK-08, NL-10, NL-11 and NL-20 are all symptoms of this | Define two label tokens and use nothing else:<br>• `--type-marker`: Plex 500 13/1.3, uppercase, tracking 0.08em, `--color-text-muted`<br>• `--type-meta`: Plex 500 12/1.33, uppercase, tracking 0.04em, `--color-text-muted`<br>Ship them as utility classes `.t-marker` and `.t-meta` in the `utilities` layer |
| SY-06 | P3 | copy / i18n | Every page: section markers vs eyebrows, kickers and subs | Uppercase is applied two ways:<br>• Typed as capitals in the dictionary: `marker: '02 — WHAT YOU GET'`, `'04 — EXPERIENCE'`, `'01 — FEATURED'` (`src/lib/i18n.ts:320–447`, and the same in es/pt)<br>• Set by CSS `text-transform: uppercase`: eyebrows "Case study · Personal product", Work `.meta`, `/links/` subs, "In this post"<br>The post tags stay lowercase (NL-20) | Case is style, not content. Typed capitals make translators type capitals, and the text cannot follow the label token. Some screen readers spell all-caps words letter by letter | Store every label in sentence case ("02 — What you get") and let the SY-05 label token set `text-transform: uppercase` |
| SY-07 | P3 | type | Every page, body and UI text | `body` has no `line-height` (`Base.astro`: only `font-family`, `font-size`, `background`, `color`), so every element without its own value falls back to `normal`, which is about 1.28–1.31 for Hanken. 8 text combinations at 1440 render at `normal`, including:<br>• Work and More descriptions (WK-04)<br>• Garden `dd` 20 px<br>• Text links 18/400, nav links, skip link<br>• The 34 px "33 releases" figure<br>• Mono markers on the case studies | A root default that the type ramp never sets. It explains WK-04 and the "unset line heights" symptom in every area | `body { line-height: 1.5 }` in `@layer base`. Headings already set their own value |
| SY-08 | P3 | type / layout | Every page, every width: headings and short paragraphs | `text-wrap` appears **once** in `src/` (`Links.astro:128`, `balance`). The detector counts **47 stragglers** (one-word last lines) and **13 unbalanced headings** across 14 route × width scans (§3). This is the single cause of HO-10, HI-18, WK-15 and NL-21 | Typographic polish on every page, fixed with two declarations | In `@layer base`: `h1, h2, h3, h4 { text-wrap: balance }` and `p, li, dd { text-wrap: pretty }` |
| SY-09 | P3 | spacing | Every page | **21 distinct gap values**: 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 30, 32, 40, 48, 56, 60, 64, 80 and 96 px, plus fluid ones (2.4/4.8/8 px on the browser bar).<br>The scale in `tokens.css` is 4, 8, 12, 16, 20, 24, 40, 48, 64. It has **no 32 or 28**, which are among the most used values (padding 28 px ×385, 32 px ×193). Off-scale values: 3, 6, 10, 14, 18, 22, 30, 36, 56, 60, 80, 96, 104, 120 and up.<br>In source, `var(--space-*)` appears 97 times; raw rem/px spacing appears **284** times. Section padding is written as `7.5rem` ×11, `5rem` ×11, `6rem` ×9 and `4rem` ×17, with no section token | Drift from the scale is what HO-16, WK-08, WK-25 and HI-08 measured page by page | Extend the scale with `--space-2xl-b: 2rem` (32), and choose 28 or 32 for card padding (pick 32). Add `--section-pad: clamp(4.5rem, 3rem + 5vw, 7.5rem)` for both top and bottom padding. Snap 10 → 8 or 12, 14 → 16, 18 → 16 or 20, 56/60 → 64, 80/96 → `--section-pad` |
| SY-10 | P3 | type | Every page, 1440 Outside | Sizes in use per family:<br>• Epilogue, 12: 22, 24, 26, 28, 32, 34, 44, 48, 56, 60, 270, 300<br>• Hanken, 8: 12, 14, 15, 16, 17, 18, 19, 20<br>• Plex, 8: 10, 11, 12, 13, 14, 16, 17.1, 26 (code excluded)<br>Tokens cover 12, 18, 34, 44, 48, 60 and the display size. Off-token sizes: Epilogue 22, 24, 26, 28, 32, 56; Hanken 14, 15, 16, 17, 19, 20. One heading level spans several sizes: page h1 is 56 on Links and the post but 60 on Garden; h3 on the case studies is 26, 28, 32 or 34 (WK-26). Tracking for one size varies: 34 px at −0.34, −0.51, −0.68 or 0; 60 px at −1.2, −1.8 or 0 (HO-17) | Hierarchy should come from a ramp, not from each page | Fold the ramp into tokens: display, h1 60, h2 48, h3 34, h4 26 (one tracking each: −0.02em, and −0.04em for display), body 18, small 16, caption 14, label 12/13. Map 56 → h1, 28/32 → h3 or h4, 15/17/19/20 → body or small |
| SY-11 | P3 | interaction | Every page at 390 and 768 (touch) | 21 of 22 `:hover` rules are outside `@media (hover: hover)`. Only `WorkMore.astro:287` is guarded. Examples:<br>• `/links/` card hover changes the background<br>• The Work card pill hover darkens to green-800<br>• The Footer underline<br>• The chat pencil sets `--color-bg`<br>After a tap on a touch screen, these styles stay on until the next tap elsewhere | A hover that sticks after a tap looks like a selected state (emil-design-eng: gate hover on touch) | Wrap every `:hover` rule in `@media (hover: hover) and (pointer: fine)`. Touch feedback goes in the `:active` state that SY-01 adds (none exists today: `grep :active` returns 0, see HO-18) |
| SY-12 | P3 | colour | Display word on Work and Notes heroes, 1440 (`2470:870`, `2447:13`) | Same cause as HO-09 (Home "Jahat"). White Epilogue 300 sampled with the word hidden:<br>• `/work/`: median 4.25:1, **p5 2.02**:1<br>• `/notes/`: median 5.33:1, **p5 1.75**:1 where it crosses the sun glow<br>At 390 it passes (p5 3.17 and 4.23) | Large text needs 3:1. Each page fails only where the word crosses the sun | Give all three hero words one treatment: a soft `text-shadow: 0 0 40px color-mix(in srgb, var(--green-950) 25%, transparent)`, or move the sun glow outside the word box in the hero composition (design.md §5) |
| SY-13 | P3 | type | Icon-only buttons: Send, lens toggle, mobile menu toggle (every page) | These buttons compute `font: 400 13.333px Arial`. There is no `button { font: inherit }` reset, so each text button sets its font locally (chips Hanken 15, Copy Plex 12, footer toggle Hanken 16) | Latent: no glyph shows today, but any label or `kbd` added to these buttons renders in Arial | Add `button, input, textarea, select { font: inherit; color: inherit }` to `@layer base` |
| SY-14 | P3 | motion | Every page | No motion tokens:<br>• **12 durations**: 80, 120, 150, 180, 200, 240, 420, 480, 560, 900 ms, 0.15 s, 0.2 s<br>• **7 easings**: `ease` ×41, `linear` ×29, `cubic-bezier(.23,1,.32,1)` ×12, `(.25,1,.5,1)` ×2, `(.87,0,.13,1)`, `(.55,0,1,.45)`, `(.36,.07,.19,.97)`<br>Reduced motion is handled (24 `prefers-reduced-motion` sites) | HI-15, HO-23 and WK-14 are timing choices made one at a time | Add tokens: `--ease-out: cubic-bezier(.23,1,.32,1)`, `--ease-in-out: cubic-bezier(.77,0,.18,1)`, `--dur-press: 120ms`, `--dur-ui: 200ms`, `--dur-reveal: 420ms`. Keep `linear` only for scroll-linked motion; `ease` should not remain anywhere |

## 3. Impeccable detector — findings and verdicts

**Command as briefed**, `impeccable detect --json src/` from the repo root: it scanned 93 files and returned `[]`. The same result with `--no-config`. The CLI warns that `.astro` files only get regex rules, so this empty result does not mean the site is clean. Verdict: **not informative**.

**URL scans** (`detect --json http://127.0.0.1:4321/<route>` at 1280×800 and `--viewport 390x844`, 14 scans, 111 findings). Grouped below:

| Rule | Count | Where | Verdict | Note / owner |
|---|---|---|---|---|
| `straggler` | 47 | all routes, both widths | **True** | One cause, SY-08 |
| `unbalanced-heading` | 13 | Home, TourBench, Garden | **True** | SY-08 |
| `tiny-text` 11 px `p.note` | 12 | every route with Contact | **True** | SY-04 |
| `tiny-text` 4 px `div.browser-bar > span` | 2 | TourBench and Garden at 390 | **True** (page-local, WK) | The fake address bar uses `font: clamp(4px, 1.042cqw, 12px)`, so at 390 the URL renders at **4 px**. Floor the clamp at 9 px, or hide the address text under 480 px. Related to WK-31 |
| `low-contrast` `#links-elsewhere` | 1 | `/links/` 390 | **True** (page-local, NL; not reported by NL) | "ELSEWHERE" (Plex 12, green-900 `#143A17`) sits over the hill image at y 777, not on cream: 2.4:1 measured by the detector. Screenshot `links-390-elsewhere.png`. Put the label on a cream band, or switch it to white with the hero-text scrim |
| `low-contrast` `#hero-word` | 1 | `/notes/` 1280 | **Partly true** | The detector compared against the `#FBEBA0` fallback colour (1.2:1). The real pixels give a median of 5.3:1 and a p5 of 1.75:1 where the word crosses the sun. SY-12 |
| `line-length` | 2 | Garden "What I got wrong" `p` | **True** (page-local, WK) | `max-width: 720px` at 18 px gives 80–86 characters per line at 1440. Every other body column on the site runs 30–57 characters (post: 41–72). Use `max-width: 62ch` |
| `tight-leading` | 2 | `/links/` card title 17/22 | **False positive** | 1.29 against a 1.3 threshold, on a balanced two-line 17 px title. Fine |
| `undersized-ui-text` "KIND/TAGS" 10 px | 12 | Garden era comparison | **False positive** | A reconstruction of the historical Garden UI (`--garden-era-*`, "shown only in the case study's era comparison"). It is a picture of old UI, not working UI |
| `nested-cards`, `hard-offset-shadow` | 8 | Garden era comparison | **False positive** | Same reason: these are the old app's own styles, shown on purpose |
| `cream-palette` | 14 | every route | **False positive** | A recorded brand decision (design.md §3.2, cream `#FAF6E8`) |
| `numbered-section-labels` | 18 | Work, TourBench, Garden | **False positive** as a defect | Markers are part of the system (design.md §2). Their inconsistency is real (SY-05), and TourBench's numbering starting at 02 is WK-21 |
| `hero-eyebrow-chip` | 2 | TourBench, Garden | **False positive** | Intended eyebrow; its style falls under SY-05 |

## 4. Patterns (root cause → the one fix → page items it closes)

1. **No `ui/` controls.** Only `Annotation`, `Icon` and `Magnetic` exist, so every section restyles buttons, links and labels locally.
   - Fix: `ui/Button` (SY-01), `ui/TextLink` (one underline treatment: 1 px, offset 0.2em, `--color-text-muted` at rest and `currentColor` on hover, plus the `→`/`↗` icon slot), `ui/BackLink` (SY-02), and label utilities (SY-05).
   - Closes: HO-01, HO-05, HO-14, HO-15, HO-19, HI-10, WK-03, WK-20, NL-13, NL-14.
2. **Icon size is a literal per call site, and the stroke is fixed at 2.** Fix: SY-03. Closes HO-12, HO-13, WK-30. HO-14 (forward arrow drawn as a glyph in text links and as an SVG in buttons) closes when TextLink uses `Icon name="arrow-right"` at `1em`.
3. **No focus tokens.** There are three rings:
   - global 3 px `--color-focus`, offset 3 (237 stops at 1440 Outside)
   - footer 2 px green-300, offset 3 (135 stops)
   - lens 3 px green-950 with a card halo

   Fix: `--focus-width: 3px; --focus-offset: 3px`, and on dark surfaces (footer, experiment tiles, chat Inside) set `--color-focus: var(--green-300)` locally instead of a new outline rule. Closes HO-06, WK-02.
4. **No hit-area rule for inline links.** Measured across the site:
   - At 1440, 40 of 62 controls on `/work/` are under 24 px tall, and every page has at least 18 (nav 21, language codes 19.2×28, footer 21, card links 21–23, contents 21, "← ALL NOTES" 16.9).
   - `/links/` is the only page with none under 44.

   Fix: a `.hit` utility (`padding-block: max(0px, (44px - 1lh) / 2); margin-block: calc(-1 * that)`) on TextLink and BackLink, used on touch widths. Closes HO-07, HO-08, WK-16, NL-13.
5. **No root type defaults.** Body line-height is unset (SY-07), `text-wrap` is never set (SY-08), there is no `font: inherit` on form controls (SY-13), and Shiki `pre` falls back to the generic `monospace` (the glyph inventory shows the code `→` in `monospace`, not Plex). Fix: four declarations in `@layer base`, plus `pre, code { font-family: var(--font-mono) }`. Closes WK-04, WK-18, NL-06, HO-10, HI-18, WK-15, NL-21.
6. **The spacing and type scales are incomplete, so pages invent values** (SY-09, SY-10). Missing 32 px step, no section padding token, no h1–h4 tokens. Closes HO-16, HO-17, WK-08, WK-25, WK-26, NL-04 (at 390 the h1 token should be 40, which keeps h1 > h2), HI-08.
7. **Hover has four vocabularies**:
   - underline added (Hero CTA, PageHero buttons, Footer, PostRow, contents)
   - underline colour shift (Base `a:hover`, green-700 → green-950, hard to see)
   - background change (`/links/`, Work pill, pencil)
   - border plus peek (experiments)

   None is gated for touch (SY-11), and there is no `:active` anywhere. Fix: hover belongs to the component (pattern 1), with one rule per type:
   - text link: underline colour → `currentColor` and thickness 1 → 2 px
   - button: background one step
   - card: border `--color-tag-border` plus a 2 px lift

   Wrap every hover rule in `(hover: hover)`. Closes HO-05, HO-18, NL-12, HI-06, WK-12.
8. **Label greens.** The label role uses green-700 (`--color-text-muted`) on cream but green-800 (`--color-hero-text`) on page heroes, and green-950 or green-900 on `/links/`. green-800 is justified only over the sky. Fix: labels take `--color-text-muted`, except labels placed over the sky image, which take `--color-hero-text`. Closes NL-10 and part of NL-11.

## 5. Heuristics (system view)

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Copy and lens feedback exist; the code-copy label never changes (NL-02) |
| 2 | Match with the real world | 3 | Arrow rule is honoured; "search" icon for the lens (HO-03) |
| 3 | User control and freedom | 3 | Back links exist on every detail page but look different on each (SY-02) |
| 4 | Consistency and standards | **2** | One role, many treatments: pill ×6, external icon ×6 sizes, label ×15, focus ×3, hover ×4 |
| 5 | Error prevention | 3 | Chat confirmation before sending |
| 6 | Recognition rather than recall | 3 | Clear nav and markers |
| 7 | Flexibility and efficiency | 3 | `I` shortcut, skip link, contents list |
| 8 | Aesthetic and minimalist design | 3 | Strong brand. Drift is in small values, not in composition |
| 9 | Error recovery | n/a | Only the chat has errors; HI owns it |
| 10 | Help and documentation | n/a | Portfolio |

## 6. Strengths (keep)

- **The link-arrow rule holds site-wide.** All external links across 39 page states have `target="_blank"`, `rel="noopener noreferrer"`, the `arrow-up-right` icon and the hidden new-tab note. No internal link opens a new tab. No ↗ is drawn as a glyph.
- **Icons sit on the text's optical centre.** Measured offset between icon centre and text centre is 0.0–0.9 px for every icon–label pair on every route.
- **The Inside lens follows design.md §3.4 through `light-dark()`.** Primary buttons become green-300 with green-950 text, focus becomes green-300, labels green-300, body green-200, with no per-component overrides. The token architecture is right; it only needs the missing tokens above.
- **No horizontal overflow** on any route at any width (`scrollWidth` equals the viewport in all 39 states).

## 7. Scratch files

All files are in `/tmp/claude-1000/-mnt-files-Projects-portfolio/8aad2e9e-ce0a-45f8-9c35-c1eaf0247b15/scratchpad/audit-SY/`.

- Scripts: `inv.cjs` (inventory walker), `an.cjs` (analysis: `icons`, `iconalign`, `glyphs`, `ctrls`, `targets`, `type`, `gaps`, `pads`, `colors`, `labels`, `focus`), `probe.cjs`, `word.cjs`, `el.cjs`, `measure.cjs`
- Inventories: `inv-<route>-<width>-<lens>.json`, 39 files
- Detector output:
  - `impeccable.json` and `impeccable-noconfig.json` (the src scans, both empty)
  - `imp-url-*.json` and `imp-url390-*.json` (URL scans)
  - `imp-url-summary.txt`
- Screenshots: `links-390-elsewhere.png`, `garden-390-browserbar.png`, `links-1440-title.png`
