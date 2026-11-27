# Task G — draft the phase 1 summary for the owner (1.5a)

`common.md` applies (no Figma writes in this task; read-only Figma only if you must check a fact).

## Allowed edit surfaces

openspec/changes/design-audit/reports/phase-1-summary.md

(new file)

## Sources (read all, in full)

- `proposal.md` ("Audit findings already noticed", decisions, pass rule incl. the provisional 390 rule)
- `tasks.md` (every board, node, numbers)
- `reports/home-outside.md`, `reports/home-inside.md`, `reports/work.md`, `reports/notes-and-links.md`, `reports/chat-captures.md`

## What to write

The owner reads this to decide phase 2. English, short, scannable; every claim traceable to a report (link the report section, do not copy it).

1. **Where the baseline is** — one table: Figma page (name + id), boards (width → node), method (clone / DOM pipeline / captures), check result (pass / provisional 390 rule / note). One line on the commit (`5a0977a`) and date.
2. **What changed between the approved boards and the site** — per page group (Home Outside, Home Inside & chat, Work & projects, Notes & links): the 3–7 most important changes, biggest first. Structure and content changes, not pixel nits. Link to the full table.
3. **Defects seen on the site (not fixed)** — ONE deduplicated list across all reports, grouped by kind (layout/overflow, copy and typography, rule breaks from CLAUDE.md such as link arrows, mobile/keyboard, contrast by eye, content placeholders). Each item: where (page, width), what, source report. Mark "by eye" where not measured. Put the most visible first (e.g. the "[Owner: confirm wording]" text on the Garden page, the hero overflow at 768/390).
4. **What the baseline does not show** — hover/motion/parallax, es/pt, states not captured, known board-vs-site gaps.
5. **Decisions waiting for the owner** — the provisional 390 rule (which boards rely on it), and the open questions from the reports. No phase 2 proposals beyond listing the questions.

Report: `<scratchpad>/G-report.md` (short). End with WORKER DONE.
