# Design audit baseline — Figma "As built" boards

Objective: Figma holds an accurate picture of the site as it runs today, the baseline for the UI/UX audit. Branch: develop (no code changes). Delivery: Figma only, plus this log. Runner: none (visual comparison by screenshot).

## Specs

- S1 Owner, verbatim: "para empezar necesitamostener en figma una representacion accurate del estado ctual de la web, asi que la primera tarea sera eso, mapear los cambios en la web y actualizar el figma."
- S2 The approved boards stay untouched (CLAUDE.md: proposals beside the current board, never over it). The as-built picture lives on new pages "As built · <group>" as clones of the latest approved boards, edited until they match the running site (localhost:4321) at 1440, 768 and 390.
- S3 Every difference between the approved board and the site is listed per board in a diff report (what changed, where), so the audit can start from it.
- S4 Agents: Codex, Copilot or Sonnet through Herdr; Copilot only gets simple work.

## Tasks

| ID | Specs | Scope | Route | Status |
|---|---|---|---|---|
| T1 | S4 | Full-page screenshots of every route at 1440/768/390 (reference set) | copilot `shots` | done: 73 captures + index in the session scratchpad |
| T2 | S1–S3 | Home Outside + nav states + mobile menu | codex → sonnet `home-out2` | built (page 2449:12); image crops pending (openspec design-audit 1.1b) |
| T3 | S1–S3 | Home Inside + chat conversation views | codex → sonnet → copilot (DOM pipeline) | 1440 and 768 pass; 390, chat boards, WIP cleanup pending (1.2c–f) |
| T4 | S1–S3 | Work index, project page, case study | codex → sonnet `work2` (DOM pipeline) | 10 boards built (page 2446:60); Garden images and 9 checks pending (1.3b–d) |
| T5 | S1–S3 | Notes index, post, /links/ | sonnet `notes` | done: page 2447:12, 9 boards; pixel check passed (every band ≤ 12 except /links/ 390 at 15.9) |
| T6 | S1–S3 | Supervisor check: screenshots of each as-built board vs the site | parent + copilot pixel check | Home Outside and Notes checked; rest with their tasks |

## Log

- L1 (2026-11-25) Owner: "vamos a comenzar con la auditoria de diseño ui/ux para empezar necesitamostener en figma una representacion accurate del estado ctual de la web, asi que la primera tarea sera eso, mapear los cambios en la web y actualizar el figma. usa agentes codex, copilot o sonnet, con herdr, segun te convenga, recuerda que de todos copilot es el menos inteligente asi que n le asignes cosas complejas. tu encargate de gestionarlos y de asegurarte que el resultado sea bueno. una vez terminado, reportame para darte las siguientes instrucciones"
- L2 Route: four parallel units with disjoint Figma pages (one "As built" page each), so no two agents write the same nodes. Copilot gets the mechanical screenshot capture.
- L3 Codex agents ended their turns early with partial reports (known pattern, design.md §7); each was sent back with a board-by-board pace rule. Playwright MCP cannot write outside its own roots: agents screenshot with a Node script and the global playwright package, and remove the Astro dev toolbar first.
- L4 Wraps differ between Playwright bundled headless shell and /usr/bin/chromium (Notes 1440 title 3 vs 2 lines). Reference browser for every capture: /usr/bin/chromium.
- L5 (2026-11-25) Owner: "no es necesario replicar todas las vistas de todos los proyectos o casos de estuiod. solo con una representativa es suficiente." T4 narrowed to Work index, TourBench and Inspiration Garden.
- L6 Codex hit its usage limit (until 4:48 PM) with T2–T4 unfinished. Re-routed: Sonnet `home-out2`, `home-in2`, `work2` finish the boards on the existing pages; Copilot `spec-home`, `spec-work`, `spec-chat` extract a measured site spec and the chat step captures, read-only (owner: Copilot has plenty of usage, give it work fitted to its level).
- L7 12:56 Claude weekly usage at 95% (shown in the Sonnet panes). Sonnet `home-in2` and `work2` interrupted to protect it; their Figma work is kept. Copilot `spec-home` runs the pixel check (bands, diff) of the finished boards.
- L8 Owner chose "Copilot los termina". Sonnet `work2` left a DOM-to-Figma pipeline (plate + editable layers, Work 1440 at 2.05% pixel diff) and RUNBOOK.md; Copilot `spec-work` finishes Work with it, Copilot `spec-chat` builds Home Inside with it (extractor given LENS=inside and the home slug) and places the chat step captures as image boards.
- L9 (2026-11-25) Owner: "mejor cerramos aca creo. para todo y deeja bien docuemtnado en openspec que se hizo desde su ultima actualziacion que cambio y en que estmos trabajando ahora. con todo el contexto necesario paa que pueda seguir trabajando desde otra instancia del repo pero sin engram." and "deja todo comietado en develop remote". All agents stopped. Source of truth from now on: `openspec/changes/design-audit/` (proposal.md, tasks.md, tools/, reports/). The session scratchpad (captures, measured specs) is not kept; tasks.md says what to re-capture.
