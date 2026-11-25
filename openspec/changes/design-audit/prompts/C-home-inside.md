# Task C — 1.2f: Home Inside, difference table (read-only in Figma)

Read `common.md` (same folder) first; it applies in full. This task writes NO Figma nodes: Figma is read-only here (`get_screenshot`, `get_metadata`, read-only `use_figma`).

- Scratch folder: `<scratchpad>/C` (create it; copy `openspec/changes/design-audit/tools/*` into it).
- Report file: `<scratch>/C-report.md` (short: what you wrote, what you could not verify).

## Allowed edit surfaces

openspec/changes/design-audit/reports/home-inside.md

(new file; create it)

## Inputs

- Approved boards (page with the Home v3.5 boards): INSIDE 1440 `2191:503`, 768 `2213:86`, 390 `2212:86`. Outside counterparts for context only: `2191:86`, `2211:86`, `2210:86`.
- As-built boards (page `As built · Home Inside & chat` `2449:3558`): 1440 `2474:12`, 768 `2476:14`, 390 `2477:14`. They match the site; the site is the truth (decision A2). Live site: `http://127.0.0.1:4321/` with `document.documentElement.dataset.lens = 'inside'` (see `extract.cjs`, `LENS=inside`).
- Chat captures on the same page: frames `2481:14`–`2481:44`, caption `2481:12`. Approved chat boards: `2353:103` … `2354:320`, tablet `2358:302`, desktop `2358:226`.
- Preliminary notes: `reports/home-inside-preliminary.md`. Model for structure and tone: `reports/home-outside.md` and `reports/notes-and-links.md`.
- Known defect already recorded in `proposal.md`: at 390 Inside the hero overflows 120 px over the notes list.

## What to write in `reports/home-inside.md`

1. `## Boards built` — table: board, node, size, method (DOM pipeline), check numbers from `tasks.md` §1.2.
2. `## Differences found (approved board → site)` — section by section (hero, annotation list, values, work, experience, notes, contact + chat, footer, nav, lens toggle), first "All widths", then "Width specific". Copy, structure, components, images, annotations/pins, links and arrows. Verify every item against the as-built board or the live site; drop preliminary items you cannot confirm and say so.
3. `## Chat (approved → site)` — differences between the approved chat boards and the captures.
4. `## Defects seen (not fixed)` — site problems you notice (layout, contrast by eye, wrapping, overlap, rule breaks from `CLAUDE.md` such as the link-arrow rule). Mark "by eye" when not measured.
5. `## What does not match exactly` — known board-vs-site gaps (see `tasks.md` §1.2c for the hand fixes on the 390 board).

Keep it factual and short per item. English.
