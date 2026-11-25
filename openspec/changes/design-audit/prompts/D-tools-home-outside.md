# Task D — tool fixes, then rebuild Home Outside 768 and 390 with the DOM pipeline

Read `common.md` (same folder) first; it applies in full. You already know the pipeline from task B.

- Scratch folder: `<scratchpad>/D` (create it; copy the repo `tools/` into it AFTER step 1).
- Figma page: `As built · Home Outside` `2449:12`. Write only there.
- Report file: `<scratch>/D-report.md`.

## Allowed edit surfaces

openspec/changes/design-audit/tools/builder.js
openspec/changes/design-audit/tools/extract.cjs
openspec/changes/design-audit/tools/adiff.cjs
openspec/changes/design-audit/tools/RUNBOOK.md
openspec/changes/design-audit/reports/home-outside.md

## Why

Worker A's report (`scratchpad/A/A-report.md`, and `reports/home-outside.md` "Band fixes") shows that the cloned boards 768 `2449:608` and 390 `2449:1897` do not pass even after fixes: layout offsets and section backgrounds differ. The supervisor decided to replace those two boards with DOM-pipeline boards (as Work and Home Inside were made). 1440 `2449:21` stays (passes by adiff).

## Steps

1. **Tool fixes in the repo `tools/`** — the four systematic problems you patched by hand on the Work boards: CSS `monospace` → Cousine (not Inter) in `builder.js`; placeholder ellipsis; img radius/shadow recorded and applied; the 1 px plate seam above the footer. Fix them in the tools only where the fix is general and you understand it; otherwise leave the tool and document the manual step in RUNBOOK. In `adiff.cjs` widen the search window to −4…+12 px (you saw +10 px drift). Keep the tools' interfaces unchanged. Update RUNBOOK (a short "Tool fixes 2026-11-25" note and the new board table rows). Re-run `adiff.cjs` once on a Work board you already have, to show it still works.
2. **Rebuild** Home Outside 768 and 390: `node extract.cjs home <width> ho<width>` (outside lens, no `LENS`), payload with name `As built · Home v3.5 OUTSIDE · TABLET 768 · 768` / `As built · Home v3.5 OUTSIDE · MOBILE 390 · 390`, sources `2211:86` / `2210:86`. Before building, read the existing page with a read-only `use_figma` and place the new boards to the right of everything on the page (same y as the existing boards' top). `builder.js`: set `PAGE_ID = '2449:12'` and `BOARD_Y` to that y. Upload the images.
3. **Hero hand fixes** — the Inside 390 build (`tasks.md` §1.2c) needed three; check whether Outside needs the same: name drawn over the portrait (Outside has a solid name masked by the portrait plus an outline over it, see `portfolio-visual-design/design.md` "Name behind the portrait"), the fixed lens toggle baked into the hero plate under the portrait, hero overflow over the next section. Fix only what the side-by-side shows, the same way (site pixels masked to the portrait alpha; a site crop of the toggle on top; a site crop as plate).
4. **Check** with plain `diff.cjs` (same environment): pass rule in `proposal.md` (provisional 390 rule for 390). View every side-by-side slice.
5. **Old clones**: move `2449:608`, `2449:1897` and their captions (find captions by position/name above each board) into a Section named `Superseded — clone boards (replaced by DOM pipeline boards 2026-11-25)` placed below everything on the page. Do not delete. Do not touch `2449:21`, the nav states `2449:3181` or the mobile menu `2449:3415`.
6. **Report** in `reports/home-outside.md`: update the "Boards built" table (new node ids, sizes, method, numbers) and add one line in "Band fixes" saying 768 and 390 were replaced and why. Keep worker A's content otherwise.
