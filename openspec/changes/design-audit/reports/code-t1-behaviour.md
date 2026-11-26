# T1 — Behaviour defects: worker report

**Status: partial.** The session was closed before the last verification pass. All eight fixes are written and uncommitted. What is missing is a re-check on the combined tree (T1 + committed T2) and the live "after" captures.

## State

- `npm run check` exit 0, run after the last source edit, with the T2 files already clean in `git status` (T2 is `1bd86ef`): boundaries clean, 68/68 tests, `astro check` 0 errors, 0 warnings, 5 hints (none in T1 files), build complete, link rule clean.
- Nothing staged or committed. No source file edited after that run.
- Modified: `src/components/sections/{Lens,NextCaseStudy,Notes,WorkMore}.astro`, `src/components/sections/contact/Chat.astro`, `src/pages/notes/[...slug].astro`.
- New: `src/lib/{transition-guard,lens-keys,toc,flash}.ts` and a `.test.ts` beside each.
- `odd/tasks/design-corrections-code.md` also shows as modified. T1 did not edit it.
- No new user-visible strings, so no dictionary changes.
- Tests were seen failing first: the four new test files failed with `ERR_MODULE_NOT_FOUND` (53 pass, 4 fail), then 68/68 passed. This RED is "module missing", not a failing assertion against old behaviour; the old behaviour of HI-01, HI-02 and NL-01 was reproduced in the browser instead.

## Exact next step

Run these (the last command of the session, rejected at closing):

```bash
d=/tmp/claude-1000/-mnt-files-Projects-portfolio/471bc4aa-05bc-4ec0-ab4c-3522be863b67/scratchpad/t1.DdDz9x
export NODE_PATH=/home/trinitybytes/.npm/_npx/e41f203b7505f1fb/node_modules
mkdir -p $d/final-peek $d/after
node $d/tiles.cjs $d/final-peek 1440   # every rest and peek height must be 300, page height unchanged, "over" -29
node $d/repro.cjs $d/final-repro       # HI-01, HI-02, HI-03, NL-01
node $d/cap.cjs $d/after               # live after set; look at it
```

The tile run matters most: T2 changed the root line height, and WK-01 relies on a fixed 300 px tile. It was last measured on the tree before the `1bd86ef` commit, while T2 was still editing. Then the supervisor reviews the diff and commits.

## Items

"Verified" below means on the live tree before `1bd86ef` was committed, unless stated otherwise.

### NL-01 — done (re-check pending)
- Changed: `src/pages/notes/[...slug].astro` (prose h2–h4 `scroll-margin-top: 6rem`; the IntersectionObserver is replaced by a rAF-throttled scroll listener; a clicked link gets `aria-current="location"` at once and keeps it while the page travels; wheel, touch, pointer or key input releases it). `src/lib/toc.ts`, `toc.test.ts`.
- Why the observer went: it fires when a heading's bottom crosses the line, not its top, so it cannot track a 97 px line.
- Checked: `repro.cjs`: all four links, 1440/768/390, motion and reduced motion: heading top 96, matching item current (before: top 0, often the next item). `code.cjs`: click and wheel-back sequence correct.

### HI-01 — done
- Changed: `Lens.astro` `switchTo` (requests during a reveal are dropped; a drag preview is still cleaned up; the callback is now `async` to clear an `astro check` hint). `src/lib/transition-guard.ts`, `transition-guard.test.ts`.
- Checked: before, the tab crashed at gaps of 200, 600 and 950 ms and under click spam; after, no crash (spam run done before the `async` rewrite). `final.cjs`, after the rewrite: gaps 200/600/950, drag and drop plus `I`, Enter focus handoff, click then Esc, drag then Esc all correct. Headed Chrome and other browsers not tested.

### HI-02 — done
- Changed: `Lens.astro` keydown now uses `src/lib/lens-keys.ts` (`lens-keys.test.ts` also pins the previous `I` behaviour). Esc in a field never switches the lens; in an empty field it only blurs (source report's fix).
- Checked: `repro.cjs` at 1440/768/390 (before the `async` rewrite, which does not touch keys).

### NL-03 — done
- Changed: `Notes.astro` uses `dictionary.post.readingTime`. Added `.featured-card :global(.meta .arrow) { white-space: nowrap }`: the longer PT string left `→` alone on a line at 390.
- Checked: text on `/`, `/es/`, `/pt/` and their Notes pages; isolated captures. At 390 PT the meta now wraps as "… 18 de set. de / 2026 →" (+17 px height), `s-pt.png`. The nbsp-plus-space source of the break is in `components/content/PostRow.astro` (outside the surface).

### WK-17 — done
- Changed: `NextCaseStudy.astro` header is a left-aligned column, link 24 px under the h2. `ProjectPage.astro` and `CaseStudy.astro` needed no change.
- Checked: link x equals h2 x (64/40/20) on TourBench, Garden and ES TourBench at all three widths. Only position changed; the mono uppercase BackLink style of `2522:848` is T3, and the "Next project" heading is WK-19 (T5).

### NL-02 — done (see open question 1)
- Changed: `[...slug].astro` (`<template data-copied-icon>` with `<Icon name="check" size={14} />`; "Copied" + check for 1.6 s; polite status; a denied clipboard keeps "Copy"; button 48 px tall; hover gated to `(hover: hover)`; green-300 inset focus ring). `src/lib/flash.ts`, `flash.test.ts`.
- Figma `2520:35` wins over the report on bar height: the bar grows from about 37 to 48 px, with no negative margin.
- Checked: `code.cjs` at three widths: 52.8 × 48 hit box, clipboard content, still "Copied" at about 1.3 s, restored by about 1.9 s, live text set then cleared, keyboard activation, denied case. Crops `s-code.png`. Screen reader and real touch not tested.

### HI-03 — done
- Changed: `contact/Chat.astro` style hides the composer annotation (pin, bound, label) and the Contact annotation list once the chat is open, at all widths (the brief names 1440; the report's fix is not width-limited).
- Checked: computed display visible idle and `none` open at 1440/768/390; `s-chat.png`. No request reached web3forms (route blocked, never confirmed).
- Not done on purpose: the report's idle bound "inset 8 px". `Contact.astro` is outside the surface, and the bound is already `-9px` from the padding box (8 px outside the border). T4 should compare it with the Home Inside board.

### WK-01 — partial (re-check on the final tree pending)
- Changed: `WorkMore.astro`: at ≥ 1025 px the tile is `height: 300px`; peek only at `(hover: hover) and (min-width: 1025px)`; peek column `min(268px, 42%)` (250 px at 1440, as on `2524:2560`); h3 one line with ellipsis plus `title`; description clamped to 3 lines; stats, then links on their own row. Below 1025 only the border highlight remains: no peek and no stats swap.
- Checked: `tiles.cjs`, 1025/1100/1199/1280/1440/1920 in en/es/pt: all hover states 300, page height unchanged, no overflow (before: up to about 647 px at 1025). `final.cjs` after the T2 commit and all edits: keyboard focus at 1440 EN keeps 300 and the links stay inside the tile. Crops `s-peek.png`.
- Left: rerun `tiles.cjs` on the final tree. In the peek, the stats line can wrap in the middle of the date ("updated Sep / 5, 2025"); WK-10 (icons, flex row) in T5 should settle it.

## Before/after comparison

Isolated pair, so T2 does not mix in: `HEAD` before T2 versus the same plus the T1 files only (plus the `check` path in that copy's `Icon.astro`), both built in scratch and served through Playwright routes (`cap-iso.cjs`, `cmp.py`); no second server. Captures are at rest with reduced motion.

- Pixel-identical: Home Outside and Inside, EN Notes, Work, at 1440/768/390.
- Changed as intended: ES/PT Notes (reading time; PT 390 +17 px), post (+9/10 px, code bar), TourBench and Garden (about +46 px, back link under the h2).
- `iso-t1/` includes the final `Notes.astro` and `Lens.astro`.
- A live "before" set is in `before/` (taken while T2 was already editing). There is no live "after" set yet.

## Open questions

1. NL-02: `2520:35` draws "Copy" in white (`color/accent-text`) at rest and draws no hover. The rest colour stays green-200 so the report's cream hover is visible. If the T6 restyle makes it white, a hover treatment needs a decision.
2. WK-01: removing the peek and stats swap below 1025 px for mouse users follows the 768 boards and "never moves the grid". Confirm.
3. WK-01: titles truncate in the peek ("GitHub Profile READ…", "Coursera Clone Web …"); this is the report's fix. The full name is in the DOM and in `title`.

## Out of scope noticed

- `components/content/PostRow.astro`: `&nbsp; →` still contains a breakable space (worked around in `Notes.astro` for the featured card).
- `openspec/changes/design-audit/tools/extract.cjs` raises four `astro check` hints; `Experience.astro:66` raises one.

## Scratch paths (not deleted)

`/tmp/claude-1000/-mnt-files-Projects-portfolio/471bc4aa-05bc-4ec0-ab4c-3522be863b67/scratchpad/t1.DdDz9x/`

- Scripts: `cap.cjs`, `cap-iso.cjs`, `cmp.py`, `tiles.cjs`, `repro.cjs`, `code.cjs`, `final.cjs`, `edit.py` (one-time edit script, do not rerun), `sheet.py` (unused).
- Captures: `figma/`, `before/`, `iso-base/`, `iso-t1/`, `s-*.png`, `peek-*.png`, `code-*.png`, `next-*.png`, `before-repro-*`, `after-repro-*`.
- `iso/base`, `iso/t1`: scratch builds, each with a copy of `node_modules`.
- `check.log`: last `npm run check`.

It is on tmpfs, so a reboot clears it.

## Commands and results

| Command | Result |
|---|---|
| `npm test` (RED) | 53 pass, 4 fail (modules missing) |
| `npm test` (GREEN) | 68/68 |
| `node cap.cjs before` | 27 captures |
| `node repro.cjs` before / after | defects reproduced / fixed (the before HI-03 probe was invalid and was corrected before the after run) |
| `node tiles.cjs` before / after | peek up to about 647 px / all 300 (not rerun after the T2 commit) |
| `node code.cjs` | NL-02, NL-01, WK-17, NL-03 checks passed |
| `npx astro build` in `iso/base`, `iso/t1`; `node cap-iso.cjs`; `python3 -I cmp.py` | builds exit 0; results above |
| `node final.cjs` | lens paths, HI-01 and keyboard peek passed |
| `npm run check` (last) | exit 0 |
| `tiles.cjs` + `repro.cjs` + live `cap.cjs` on the final tree | not run (rejected at session close) |

Risk: item 6 (CSS and DOM wiring in `.astro` files has no automated regression test; only the pure helpers do).
