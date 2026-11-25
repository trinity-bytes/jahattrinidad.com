# Design audit — phase 2 synthesis

Supervisor synthesis of the five phase 2 reports, 2026-11-25. Each source report carries the evidence (measurements, Figma node ids, screenshots) and the full fix for every item; this file only deduplicates, groups and orders them. Read a source report before acting on any item.

| Area | Report | Findings | P1 | P2 | P3 |
|---|---|---|---|---|---|
| Home Outside, nav, mobile menu | `audit-home-outside.md` | 24 | 0 | 9 | 15 |
| Home Inside and chat | `audit-home-inside-chat.md` | 20 | 1 | 5 | 14 |
| Work and projects | `audit-work.md` | 32 | 0 | 6 | 26 |
| Notes and links | `audit-notes-links.md` | 23 | 1 | 6 | 16 |
| Cross-page system | `audit-system.md` | 14 | 0 | 1 | 13 |
| **Total** | | **113** | **2** | **27** | **84** |

No P0. Most P3s, and several P2s, come from eight shared causes (section 2): fixing those causes once closes about 45 page items.

Run note: the first attempt (five auditors in parallel) hit the usage quota and wrote nothing; the rerun went one area at a time, each auditor reading the earlier reports and citing shared items instead of repeating them.

## 1. Behaviour defects — fix first

These are bugs, not design choices. They do not wait on the hi-fi approval rule in `CLAUDE.md` because they change no design; the owner decides whether they go in now.

| Order | ID | Sev | Defect | Fix (summary) |
|---|---|---|---|---|
| 1 | NL-01 | P1 | The post's "In this post" links scroll each heading under the 69 px sticky nav, and at 1440 and 768 the list highlights the next section | `scroll-margin-top: 6rem` on prose headings; compute the active item from the same offset |
| 2 | HI-01 | P1 | Pressing `I` twice during the 900 ms lens reveal crashed the tab. **Reproduced only in headless Chromium 158: confirm in a real browser before treating it as P1** | Ignore or skip a second view transition while one is running |
| 3 | HI-02 | P2 | `Esc` while typing in the chat switches the page back to Outside | Skip the Esc shortcut when focus is in an editable field |
| 4 | NL-03 | P2 | "read" is hardcoded in `src/components/sections/Notes.astro:86`, so `/es/` and `/pt/` show "2 min read" (breaks the i18n rule; confirmed in code by the supervisor) | Use the dictionary's reading-time string |
| 5 | WK-17 | P2 | "← All work" sits at the right edge on project pages (breaks the link-arrow rule: back goes left) | Move it to the left edge |
| 6 | NL-02 | P2 | The code block's Copy button gives no visible feedback, has no hover, and its hit area is 41 × 19 px | Label swaps to "Copied" with a check icon for 1.6 s; padded hit area |
| 7 | HI-03 | P2 | With the chat open at 1440 Inside, the composer annotation runs about 280 px off screen | Hide that annotation while the chat is open |
| 8 | WK-01 | P2 | The experiment peek (hover or focus) reflows the tile from 300 px to 320–341 px and moves the grid | Fixed tile height; clamp the description in the peek state |

## 2. System causes — one fix, many findings

From `audit-system.md` §4, checked against the page reports. Each row is one change that closes the listed items.

| # | Cause | The one fix | Closes |
|---|---|---|---|
| S1 | No shared controls in `src/components/ui/`: the primary pill is built six ways, links have two underline treatments, the back link three | `ui/Button` (SY-01), `ui/TextLink`, `ui/BackLink` (SY-02) | HO-01, HO-05, HO-14, HO-15, HO-19, HI-10, WK-03, WK-20, NL-13, NL-14 |
| S2 | No root type defaults: `body` line-height unset, `text-wrap` never set, form controls do not inherit the font, code falls back to the system monospace | Five declarations in `@layer base` (SY-07, SY-08, SY-13, plus `pre, code { font-family: var(--font-mono) }`) | WK-04, WK-18, NL-06, HO-10, HI-18, WK-15, NL-21, and the 47 single-word last lines SY-08 counted |
| S3 | Label role has about 15 treatments; capitals typed into the dictionary in some places | Two label tokens (`--type-marker`, `--type-meta`) and sentence-case strings with CSS uppercase (SY-05, SY-06, SY-04) | HO-02, HI-07, HI-09, WK-07, NL-11, NL-20 |
| S4 | Spacing and type scales incomplete (no 32 px step, no section padding token, Epilogue at 12 sizes) | Extend the scale and add h1–h4 tokens (SY-09, SY-10) | HO-16, HO-17, WK-08, WK-25, WK-26, NL-04, HI-08 |
| S5 | Three focus-ring styles | Focus width and offset tokens; set `--color-focus` to green-300 locally on dark surfaces | HO-06, WK-02 |
| S6 | No hit-area rule for inline links: every page except `/links/` has 18+ controls under 24 px tall | One `.hit` utility on TextLink and BackLink at touch widths | HO-07, HO-08, WK-16, NL-13 |
| S7 | Four hover vocabularies, none gated to mouse devices, no pressed state anywhere | One hover per control type inside the S1 components, wrapped in `(hover: hover)`; `:active` press state (SY-11) | HO-05, HO-18, NL-12, HI-06, WK-12 |
| S8 | Icon size typed per call site, stroke fixed at 2, so stroke weight varies 1.08–2.33 px | Role-based `Icon` sizes and a non-scaling stroke (SY-03) | HO-12, HO-13, WK-30 |

Motion tokens (SY-14: 12 durations, 7 easings in use) and label greens (`audit-system.md` pattern 8, closes NL-10) are smaller system fixes in the same family.

## 3. Contrast — measured

| ID | Where | Measured | Status |
|---|---|---|---|
| HO-09 | White "Jahat" on the sky, Outside hero | 3.01:1 at 1440, 2.88:1 at 390 | known; owner decision open in `design.md` |
| NL-05 | Page-hero subtitle over the photo (Notes, post) | worst 2.58:1, median 4.40 | known; now measured |
| HI-04 | Second line of every Inside annotation | 2.98–3.61:1 | known by eye; fix is 40 % → 60 % opacity |
| WK-02 | Focus ring on dark experiment tiles | 2.66:1 (needs 3:1) | closes with S5 |
| SY-12 | Big hero word on Work and Notes where it crosses the sun glow, 1440 | under 3:1 | new |
| (detector) | "Elsewhere" label over the hill, `/links/` at 390 | 2.4:1 | new, `audit-system.md` §3 |

## 4. Remaining page items worth a design decision

- **HO-03 / HO-04: the lens control.** "Look inside" is only a magnifier icon: on touch it reads as search, the "press I" hint is gone from the Outside hero, and it is the last Tab stop although it sits in the first screen. Needs a decision on a visible label or hint and its place in the focus order.
- **HI-05:** the outlined "Jahat" shows the font's overlapping contours (a line through the "h", notches in the "a"s). Needs an overlap-removed outline source.
- **HI-14:** the same magnifier is used to go in and to come back out.
- **WK-03:** which card tier gets the pill (part of S1, but the hierarchy is the owner's call).
- **WK-19, WK-21, WK-26:** heading structure on project pages (the "Next project" marker plus h2, the step numbering, h3 at two sizes).
- **NL-16:** "Elsewhere" lists 3 networks, the footer 6 and `/links/` 5.
- **NL-04:** post hierarchy at 390 (title 34 px vs h2 32 px, about 36 characters per line): partly S4, partly a reading-mode decision.
- **(detector) TourBench and Garden mock browser bar at 390:** the address text renders at 4 px (`audit-system.md` §3).

Everything else is P3 polish listed in the source reports with its fix.

## 5. Not checked, across all areas

- A real touch device and browsers other than Chromium (HI-01 depends on this).
- Screen-reader output: accessible names were read from the DOM only.
- Motion was read from CSS and source, not recorded frame by frame.
- The chat's sending, sent and failed states (never triggered, by rule).
- es/pt at 768; Figma text styles and variables.
- Some findings on the 768 and 390 boards, and on the Garden boards, cite the board id and section rather than an element node id (to save quota).

## 6. Next step

Owner review of this list. Then:

1. Section 1 defects can be fixed in code now if the owner agrees: none changes the design.
2. Sections 2–4 are design changes. Under `CLAUDE.md` ("No UI code until the owner approves the hi-fi"), they are proposed in Figma beside the `As built` boards first, starting with S1 (controls) and S3 (labels), which close the most items.
