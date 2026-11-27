# Task F — missing "·" separators on Home Inside 1440 and 768

`common.md` applies in full. Same problem you fixed on Home Outside 768 (`2491:57`–`2491:63`, your `pseudo.cjs`): CSS `::before` "·" separators are not extracted.

- Figma page `2449:3558`; write only inside boards `2474:12` (1440) and `2476:14` (768). Also check `2477:14` (390): add them there too if the site shows them at 390.
- Worker A counted 14 missing on 1440 + 768 before the organisation names.
- Inside lens: `document.documentElement.dataset.lens = 'inside'`.
- Add them as text nodes matching the site's position, font and colour, the same way you did on Outside 768. Do not move anything else.
- Check: zoomed board/site pairs of each place, and `diff.cjs` before/after per board.
- Allowed edit surfaces: openspec/changes/design-audit/reports/home-inside.md (one line under "Fixed 2026-11-25" listing the new nodes).
- Report: `<scratchpad>/F-report.md`. End with WORKER DONE.
