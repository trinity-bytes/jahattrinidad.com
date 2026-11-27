# Task E — fix the Home Inside boards you found wrong

`common.md` applies in full. This continues your task C findings (`reports/home-inside.md`, "What does not match exactly").

- Scratch folder: `<scratchpad>/C` (your own; reuse your captures there).
- Figma page: `As built · Home Inside & chat` `2449:3558`. Write only on boards `2474:12`, `2476:14`, `2477:14`.
- Report file: `<scratchpad>/E-report.md`.

## Allowed edit surfaces

openspec/changes/design-audit/reports/home-inside.md

## Fixes (the site wins, decision A2)

1. **1440 `2474:12`**: the "Back outside" toggle must be on top of the portrait. Use a site crop of the toggle on top (same as the 390 fix in `tasks.md` §1.2c), or move existing toggle nodes above the portrait if they exist as layers. Check the name outline the same way.
2. **768 `2476:14`**: portrait fill = site pixels masked to the portrait alpha (so the outline is drawn over it); reproduce the hero overflow over the note list the same way as on 390 (list plate = site crop of that band, the editable list items it covers hidden and named "(hidden: …)"), and the toggle if it is under the portrait.
3. **390 `2477:14`**: composer placeholder truncated with "…" at the site's width (the site's text, not invented).
4. **Section-join lines** on all three: find the cause (plate placement on fractional y — the builder now rounds plates to whole pixels, see `tools/builder.js` and RUNBOOK "Tool fixes 2026-11-25"). Fix on the boards by snapping the affected plates, without moving content.
5. Re-screenshot, `diff.cjs` + `adiff.cjs`, view every slice that covers a changed area and the joins zoomed.
6. Update `reports/home-inside.md`: move the fixed rows from "What does not match exactly" into a short "Fixed 2026-11-25" list with the node ids; keep what stays unfixed. Update the "Boards built" numbers.
