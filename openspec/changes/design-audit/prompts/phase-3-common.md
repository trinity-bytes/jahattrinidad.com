# Phase 3 — corrected boards: rules for every worker

You build **proposed, corrected boards** in Figma for one page group of the portfolio site, from the design system that already exists in the file. You are a worker under a supervising session. Read this file fully, then your unit brief, then start.

## Context

- Figma file: `gq6glEp9QrPOnEyYG9dldh`. Call `create_session` first with that key.
- Repo: `/mnt/files/Projects/portfolio` (read-only for you, except your report file).
- Read before working: `CLAUDE.md` (project rules: link arrows, i18n, the Figma rules), `openspec/changes/design-audit/reports/phase-2-audit.md` (synthesis), your area report (named in the unit brief), `openspec/changes/design-audit/reports/audit-system.md` §2 and §4, and `odd/tasks/figma-design-system.md` (what the design system contains and why).
- Figma skills: load `figma-use` before any `use_figma` call (Codex: `~/.codex/plugins/cache/openai-curated-remote/figma/21.0.0/skills/figma-use/SKILL.md`; also `figma-generate-design` in the same `skills/` folder for composing screens).

## The design system (page `Design system`, `2501:136`)

Use these; never restyle a layer by hand when a component, variable or text style covers it.

- **Variable collections.** `Color` `VariableCollectionId:2501:36`, modes `Outside` / `Inside` (the lens). `Breakpoint` `VariableCollectionId:2501:76`, modes `Desktop 1440` / `Tablet 768` / `Mobile 390` (type sizes, gutter, section padding, list rows). `Foundation` `VariableCollectionId:2501:91` (space, radius, focus, icon, motion, font families). `Primitives` `VariableCollectionId:2501:12` (hidden; semantic tokens alias it).
- **Modes are set on the board frame** with `setExplicitVariableModeForCollection`: every board sets both its Breakpoint mode and its Color mode. Inside is a mode switch, never a recoloured copy.
- **Text styles:** `Display`, `Heading/H1`–`H5`, `Body/Regular`, `Body/Medium`, `Body/Small`, `Body/Caption`, `Body/Link`, `UI/Control`, `UI/Control Underlined`, `Label/Marker` (13, uppercase), `Label/Meta` (12, uppercase), `Mono/Note` (12, sentence case), `Mono/Code`, `Brand/Wordmark`, `Brand/Handle`. Heading sizes follow the Breakpoint mode: H1 60/48/40, H2 48/40/34, H3 34/30/26, H4 26/24/22, H5 22/22/20, body 18/17/16.
- **Components** (node ids):
  - Icons (Section `2501:137`): `Icon/arrow-right` `2501:141`, `Icon/arrow-left` `2501:145`, `Icon/arrow-up-right` `2501:149`, `Icon/check` `2501:152`, `Icon/search` `2501:156`, `Icon/menu` `2501:161`, `Icon/x` `2501:165`, `Icon/message-circle` `2501:168`, `Icon/copy` `2501:172`, `Icon/send` `2501:176`, `Icon/arrow-up` `2514:512`, `Icon/pencil` `2514:516`, `Icon/alert-circle` `2514:521`, `Icon/loader` `2514:524`, `Icon/rotate-ccw` `2514:528`, brands `2502:14` github, `2502:17` linkedin, `2502:20` youtube, `2502:23` x, `2502:26` instagram. 1.5 px stroke at any size; inline icons are 1em of their text, controls 20.
  - Controls: `Button` `2504:54` (Style Primary / Secondary × State; props Label, Show icon, Icon), `TextLink` `2505:67` (Destination Internal → / External ↗ / In-page; props Label, Leading icon, Leading glyph), `BackLink` `2505:84`.
  - Navigation: `Nav` `2508:370` (Layout Desktop / Mobile × State Top / Scrolled; Desktop is also the 768 nav, resized), `Logo` `2508:232` (swap to Lens=Inside on Inside boards), `NavLink` `2508:242`, `LangSwitch` `2508:270`, `MenuToggle` `2508:291`, `ListLink` `2512:431`, `IconButton` `2517:816`, `LanguageSegment` `2517:838`, `MenuRow` `2517:845`, `MobileMenu` `2517:877`.
  - `Footer` `2513:607` (Layout Desktop / Tablet / Mobile; always dark).
  - Contact: `Contact section` `2516:702` (Layout Desktop / Tablet / Mobile), `Composer` `2515:570`, `Fact` `2515:571`, `ChatCard` `2519:1180` and its parts.
- Each component's description says which audit findings it closes. Read them.

## Rules

1. **Never edit** the `Design system` page, the `As built · …` pages, the approved pages (`Portfolio`, `Case study — …`, `Work — all projects`, `Writing — blog`, `Brand`) or `Archive`. If a design-system component is missing something you need, do not change it: build a page-level component on your page and write the request in your report under "Requests for the design system".
2. **Your page only.** Create the page named in your unit brief, placed right after its `As built · …` page. Put page-specific components (cards, rows, heroes, section shells) in a Section `Page components` on that page, built with auto layout, variables and text styles, with variants for states, and a `description` naming the findings they close. Boards go to the right of it.
3. **Boards** are named `Proposed · <board> · <width>`, one frame per width, vertical auto layout, built from instances top to bottom: Nav, sections, Contact section, Footer. Width 1440 / 768 / 390; the frame sets the matching Breakpoint mode and the Color mode. Under each board a caption text: what changed against the As built board, finding ids, and open decisions.
4. **Images and section art** (sky, hills, photos, captures) are not redrawn: copy the image paints (`fills` with the `imageHash`, scale mode and transform) from the matching node on the As built board. Read the As built board first (`get_metadata` / a read-only `use_figma`) to find them.
5. **Every colour, gap, padding and radius is bound to a variable; every text uses a text style.** Raw values only for image paints and one-off art geometry. Variable scopes are already set: bind with `setBoundVariable` / `setBoundVariableForPaint`.
6. **Corrections.** Apply every design finding (P1–P3) of your area report that is visible in a board, using the fix the report proposes, plus the system causes in `phase-2-audit.md` §2. Behaviour-only findings (scroll offsets, keyboard, crash, JS) are code work: list them as "code" in your report, do not draw them. When a finding needs an owner decision (`phase-2-audit.md` §4 and anything marked so), draw the report's recommended fix, mark it **proposal** in the caption and the report, and move on.
7. **Copy** stays as on the site unless a finding changes it (curly apostrophes, sentence-case labels with uppercase from the style, etc.). Never invent content. Link arrows follow `CLAUDE.md`: `→` internal, `←` back (left side), `↗` external, none for in-page actions.
8. **Plugin API gotchas already found here** (`odd/tasks/figma-design-system.md`, L12): styling a text bound to a shared TEXT component property propagates to every variant (unbind state labels before styling them); setting `characters` renames the layer, so name it after; `resize()` fixes auto-layout sizing, so set HUG after it; a failed script rolls back entirely; `setProperties` on an INSTANCE_SWAP renames the nested instance (find it by type).
9. **Check your work.** After each board: screenshot it, and compare it with its As built board side by side. Look for clipped or truncated text, overlaps, wrong mode, hard-coded colours, missing images, single-word last lines in headings (fix with a deliberate width). Fix before moving on.
10. **Pace.** One board at a time, 1440 first, then 768, then 390. Do not end your turn until every board in your brief is built, checked and reported, or you hit a usage limit. If you hit a limit, write what is done and what is left to your report first.
11. No git commands, no code edits, no edits to repo files other than your report.

## Report

Write `openspec/changes/design-audit/reports/phase-3-<unit>.md` (unit name in your brief), in English:

- Page id, the Page components (id, name, variants, findings closed).
- Boards table: name, node id, width, mode(s), check result.
- Findings table: every finding id of your area report → `fixed (board/node)`, `proposal (needs owner)`, `code`, or `not applicable` with one line why.
- Requests for the design system.
- Open questions.

End your final message with the line `WORKER DONE`.
