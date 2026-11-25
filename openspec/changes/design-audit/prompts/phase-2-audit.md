# Brief — design audit, phase 2 (detailed UI/UX and interaction audit)

You are one of five auditors. A supervisor gives you one area (below). Work until your area is fully audited; do not end your turn with partial work. Read-only: you change no Figma node and no repository file except your own report.

## Goal

The owner, 2026-11-25 (verbatim):

> "quiero auditar la ui/ux del figma, ahora debes usar las skills que tienes de diseño, euristicas y esas cosas, y las debes usar para auditar el diseñño, la ux e interacciones. la revision debe ser minuciosaya que la ui y ux en general ya ha sido auditada antes, el objetivo es encontrar detalles mas pequeos, como uso de iconos, alineacion, espacio, layout etc. para este caso encargate tu porque necesitamos el mejor criterio posible"

The broad UI/UX was audited before. Your value is the small, precise detail a design director catches on a second pass: an icon 1 px off its text's optical centre, two stroke weights in one icon family, a 28 px gap where every sibling uses 32, a baseline that does not line up across two columns, a hover that changes layout, a focus ring that is clipped, a tap target of 30 px, a label whose case differs from its siblings, an orphan word, a divider that touches text. Measure; do not guess. "Looks a bit off" is not a finding; "`h3` cap height sits 3 px above the icon centre (icon y 412–428, text 409–425)" is.

## Read first

Repo: `/mnt/files/Projects/portfolio` (branch `develop`, commit `5a0977a`; `src/` unchanged since).

1. `CLAUDE.md` (repo root): the project rules. The link-arrow rule (`→` internal, `←` back, `↗` external in a new tab, no arrow on in-page actions) and the i18n rule are binding design rules; a violation is a finding.
2. `openspec/changes/design-audit/proposal.md`, especially "Audit findings already noticed". Those are KNOWN: do not re-report them as new; you may add measurements or a sharper fix to one, marked "known".
3. `openspec/changes/design-audit/reports/phase-1-summary.md` and the report of your area (named below): they list differences and defects already found.
4. `openspec/changes/portfolio-visual-design/design.md`: the intended system (type ramp §2, colour §3, Outside/Inside model §4, hero §5, the later sections for your pages). Judge against the intent: drift from the system is a finding.
5. The design skills (read them, then apply them): `/home/trinitybytes/.claude/skills/impeccable/reference/critique-rubric.md` (heuristics, cognitive load, personas), `.../reference/polish.md`, `.../reference/layout.md`, `.../reference/typeset.md`, `.../reference/craft-floor.md`, and `/home/trinitybytes/.claude/skills/emil-design-eng/SKILL.md` (interaction and motion detail). The surface is a personal portfolio: Experience mode on Home and project pages, Read mode on notes and posts.

## Evidence: Figma and the live site

- **Figma** file `gq6glEp9QrPOnEyYG9dldh`. Load the Figma tools with ToolSearch (`create_session`, `get_metadata`, `get_screenshot`, `get_design_context` are the useful ones). Call `create_session` once with the file key and reuse the session id. Read only: never call `use_figma`, `upload_assets` or anything that writes. `get_metadata` gives exact x/y/w/h for every layer, which is your ruler for alignment and spacing. `get_screenshot` on a section-sized node (not the whole 10 000 px board) gives a readable image; download with `curl -fsL -o <file> "<image_url>"` into your scratch folder and look at it with Read. Every finding names the board and the Figma node id of the element.
- **Live site** `http://127.0.0.1:4321/` (dev server already running; never start, stop or restart it). The boards are pictures of the site at this commit, so the site is the ground truth for what a board cannot show: hover, focus-visible, active, keyboard order, scroll-linked motion, the lens switch, the chat, the mobile menu, real tap targets, contrast. Use the Playwright MCP tools (load with ToolSearch, `mcp__playwright__*`) or a Node script with the global `playwright` package: `NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules`, `chromium.launch({ executablePath: '/usr/bin/chromium' })` (never the bundled headless shell, it wraps text differently). Viewports 1440×900, 768×1024, 390×844. Remove `astro-dev-toolbar` before every screenshot. `getBoundingClientRect()` and `getComputedStyle()` are the measuring tools; prefer them for spacing and alignment numbers. The Inside lens: click the lens toggle, or see `openspec/changes/design-audit/tools/extract.cjs` (`LENS=inside`) for how the tools set it.
- **Scratch**: your own folder, given below. Generated files go there only, never in the repo. List their paths in your report.

## Hard rules

- Never press the chat's "Looks good, send it" button; never send any request to web3forms (block `**/api.web3forms.com/**` in any script that walks the chat).
- No git command that changes state. No package installs. No Figma writes. No edits outside your report file.
- Write the report in English.

## What to check (every item, at 1440, 768 and 390, both lenses where your area has both)

1. **Icons**: one family, one stroke weight, one size per role; optical alignment with the adjacent text (centre vs cap height vs x-height); spacing icon↔label consistent; meaning unambiguous; arrows follow the link-arrow rule; icons with no label have an accessible name.
2. **Alignment**: shared left edges and the grid; baselines across columns; optical vs mathematical centring (circles, arrows, play glyphs); hanging punctuation; numbers in tabular contexts.
3. **Spacing**: list every distinct gap in a section and check it maps to a scale; sibling groups use the same value; proximity groups related items; section rhythm (top vs bottom padding, section-to-section gaps) consistent across the page and across widths.
4. **Layout**: measure/line length; widows, orphans, single-word last lines in headings; wrap points per width; empty or unbalanced columns; elements that crowd the viewport edge (side padding per width); overlaps; fixed elements covering content.
5. **Typography**: same role, same style across the area (size, weight, line height, tracking, case); hierarchy reads in the squint test; mono usage consistent; curly quotes, apostrophes, en dashes, ellipses, non-breaking spaces where needed.
6. **Colour and contrast**: text, icon and focus contrast per lens (measure WCAG ratios on the real pixels or computed colours); colour meaning consistent (one colour for links, one for accents).
7. **Interaction**: hover, focus-visible, active and disabled states exist and are consistent per control type; hover never shifts layout; focus order matches visual order; focus never hidden behind fixed elements; tap targets ≥ 24 px (WCAG 2.5.8) and ideally 44 px on touch; cursor types; external links open in a new tab.
8. **Motion**: purpose, easing, duration, interruptibility; what `prefers-reduced-motion` keeps; nothing animates on keyboard-repeated actions.
9. **Copy details** that are visual: label case consistency, punctuation, truncation, the i18n rule (es/pt layouts at 390 are the stress test for length; check one page in each when your area has a localized route: `/es/...`, `/pt/...`).
10. **Heuristics**: score your area on Nielsen's 10 (0–4, `n/a` allowed per the rubric's mode rule) in one short table; the findings list matters more than the scores.

## Report

Path given below. Markdown, in this order:

1. **Header**: area, boards and node ids covered, widths and lenses covered, what you could not check and why.
2. **Findings**: one table, ordered by severity then by page position. Columns: `ID` (your prefix + number, e.g. `HO-07`), `Sev` (P0–P3, the rubric's definitions), `Category` (icon, alignment, spacing, layout, type, colour, interaction, motion, copy, a11y, responsive), `Where` (page, width, lens, board node, element node), `Evidence` (measured numbers, computed values, or the screenshot path), `Why it matters` (one line, the principle or heuristic), `Fix` (concrete, in design terms: values, not "consider"). Mark known items `known` in the ID cell's suffix.
3. **Patterns**: findings that share one cause (a missing token, a component used two ways), so the fix is made once.
4. **Heuristics table**.
5. **Strengths**: 2–4 details that are right and should be kept.
6. **Scratch files**: paths.

End your final message with `AUDITOR DONE` and the report path.

## Areas

| Area | Report | Prefix | Figma (page → boards) | Area report from phase 1 | Routes |
|---|---|---|---|---|---|
| 1 Home Outside, nav, mobile menu | `reports/audit-home-outside.md` | `HO` | `As built · Home Outside` `2449:12` → 1440 `2449:21`, 768 `2487:61`, 390 `2487:349`, nav states `2449:3181`, mobile menu 390 `2449:3415` | `reports/home-outside.md` | `/` (Outside), mobile menu at 390 and 768, nav at all widths, footer |
| 2 Home Inside and chat | `reports/audit-home-inside-chat.md` | `HI` | `As built · Home Inside & chat` `2449:3558` → 1440 `2474:12`, 768 `2476:14`, 390 `2477:14`, chat frames `2481:14`–`2481:44` | `reports/home-inside.md`, `reports/chat-captures.md` | `/` Inside lens, lens switch both ways, the contact chat in both lenses up to the summary card (never send) |
| 3 Work and projects | `reports/audit-work.md` | `WK` | `As built · Work & projects` `2446:60` → Work 1440 `2470:870`, 768 `2471:12`, 390 `2471:428`, peek `2471:840`, TourBench `2471:903` / `2471:1100` / `2471:1297`, Inspiration Garden `2471:1541` / `2471:1934` / `2471:2335` | `reports/work.md` | `/work/`, `/work/tourbench/`, `/work/inspiration-garden/` (check exact routes in `src/pages/`), experiments peek hover and keyboard |
| 4 Notes and links | `reports/audit-notes-links.md` | `NL` | `As built · Notes & links` `2447:12` → Notes `2447:13` / `2447:206` / `2447:393`, post `2447:593` / `2447:784` / `2447:980`, links `2447:1188` / `2447:1250` / `2447:1311` | `reports/notes-and-links.md` | `/notes/` (check `src/pages/`), the one post, `/links/` |
| 5 Cross-page system | `reports/audit-system.md` | `SY` | all four `As built` pages above | all of them | every route above. Build inventories from the DOM at the three widths: every icon (source, size, stroke, colour, adjacent text), every button and link style (padding, radius, font, states), every distinct font-size/line-height/weight/tracking combination, every distinct gap and padding value, every colour in use per lens. Report where one role has two treatments and where the values fall off a scale. Also run the Impeccable detector once: `/home/trinitybytes/.claude/skills/impeccable/scripts/impeccable detect --json src/` from the repo root, and report its findings with your verdict on each (true or false positive). Do not repeat page-local findings the other four areas own; own the cross-page ones |

Report paths are relative to `openspec/changes/design-audit/`.
