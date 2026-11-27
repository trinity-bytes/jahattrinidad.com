# Task B — 1.3b, 1.3c, 1.3d: Work & projects

Read `common.md` (same folder) first; it applies in full.

- Scratch folder: `<scratchpad>/B` (tools already copied).
- Figma page: `As built · Work & projects` `2446:60`. Write only there.
- Report file: `<scratch>/B-report.md`.

## Allowed edit surfaces

openspec/changes/design-audit/reports/work.md

(new file; create it)

## What to do

Read `tasks.md` §1.3 and `tools/RUNBOOK.md` ("Status", "Remaining work", steps 1, 4 and 6, "Report notes").

1. **1.3b Garden images.** For each of g1440, g768, g390: `node extract.cjs work/inspiration-garden <width> g<width>`. Before uploading, confirm the extracted `pN.jpg` / `iN.png` set matches the node map in RUNBOOK "Remaining work" step 1 (same keys, and each node's size in Figma matches the image's rendered size in `data.json`). If they do not match, stop for that board and report. Upload into the EXISTING nodes (do not rebuild).
2. **1.3c Check** the nine boards w768, w390, peek, t1440, t768, t390, g1440, g768, g390 (RUNBOOK step 6). Extract each page at its width (peek: `peek/site-peek.png` is gone; re-create it as the RUNBOOK describes, or report that you could not). Report `diff.cjs` and `adiff.cjs` numbers; look at every side-by-side slice. Fix small problems directly on the board; anything systematic: report it with the cause, do not rebuild boards without saying why.
3. **1.3d Difference table** in `reports/work.md`: for each page type (Work index, Small experiments peek, TourBench, Inspiration Garden) and width, approved board (sources in RUNBOOK step 2 table) vs the site, section by section: copy, structure, components, images, links/arrows. Start from the "Known so far" list in `tasks.md` §1.3d and RUNBOOK "Report notes"; verify each item against the site before writing it. Then a `## Defects seen (not fixed)` section and a `## Checks` table (board, node, size, diff %, adiff %, worst band, pass/fail and why). To read an approved board, use `get_screenshot` on its node (read-only).
4. Pass target: the pass rule in `proposal.md` (with the provisional 390 rule).
