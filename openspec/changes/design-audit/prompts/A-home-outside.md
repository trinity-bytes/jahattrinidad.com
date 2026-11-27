# Task A — 1.1b: Home Outside, fix the flagged bands

Read `common.md` (same folder) first; it applies in full.

- Scratch folder: `<scratchpad>/A` (tools already copied).
- Figma page: `As built · Home Outside` `2449:12`. Write only there.
- Boards: 1440 `2449:21`, 768 `2449:608`, 390 `2449:1897`. These are edited clones (not DOM-pipeline boards): auto layout and components may be present; do not restructure them.
- Report file: `<scratch>/A-report.md`.

## Allowed edit surfaces

openspec/changes/design-audit/reports/home-outside.md
openspec/changes/design-audit/reports/pixel-check.md

## What to do

1. Read `tasks.md` §1.1b, `reports/home-outside.md`, `reports/pixel-check.md`.
2. For each board: capture the site at that width (outside lens: `node extract.cjs home <width> ho<width>` gives `ho<width>/site.png`; ignore its other outputs), screenshot the board, run `diff.cjs`, `adiff.cjs`, and `sbs.cjs` (slice 1000 for 390, 1500 otherwise). Look at every slice that covers a flagged band in `pixel-check.md` and every 500 px band above 8 % in `adiff.cjs`.
3. Classify each flagged area: (a) photo/screenshot with a different crop or scale; (b) anything else (layout, text, z-order, missing element).
4. Fix only (a): replace the node's image fill with an element screenshot of the same `<img>` (or element) taken from the site at the same width and the same rendered size (Playwright `locator.screenshot()` with the same capture settings as `extract.cjs`). Do not move or resize nodes. If the node box differs from the site's element box, report it instead of fixing.
5. Report (b) with the band, what differs and a proposed fix; do not fix it blindly. If a (b) item is obviously a small, safe text or color correction where the board is wrong and the site is right, you may fix it, and list it.
6. After the fixes, re-screenshot, re-run both diffs and look at the slices again.
7. Update `reports/home-outside.md`: add a section `## Band fixes (2026-11-25, second clone)` with per-board before/after numbers, the nodes whose fills you replaced, and the (b) items. Add one line under the table in `reports/pixel-check.md` pointing to that section.
8. Pass target: the pass rule in `proposal.md` (with the provisional 390 rule). Say per board whether it passes and why.
