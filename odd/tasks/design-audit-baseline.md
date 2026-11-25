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
| T2 | S1–S3 | Home Outside + nav states + mobile menu | codex → sonnet `home-out2`; second clone: sonnet `wa` (1.1b), `wb` (768/390 rebuilt by DOM pipeline) | done (page 2449:12) |
| T3 | S1–S3 | Home Inside + chat conversation views | codex → sonnet → copilot (DOM pipeline); second clone: parent (390, chat, WIP), sonnet `wa` (1.2f, fixes), `wb` (separators) | done (page 2449:3558) |
| T4 | S1–S3 | Work index, project page, case study | codex → sonnet `work2` (DOM pipeline); second clone: sonnet `wb` | done (page 2446:60) |
| T5 | S1–S3 | Notes index, post, /links/ | sonnet `notes` | done: page 2447:12, 9 boards; pixel check passed (every band ≤ 12 except /links/ 390 at 15.9) |
| T6 | S1–S3 | Supervisor check: screenshots of each as-built board vs the site | parent + copilot pixel check; second clone: parent re-measured Work 1440, Garden 390, Outside 768, Inside 768 | done |

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
- L10 (2026-11-25, second clone, Claude Code in Herdr) Owner: "vamos a continuar con elntrabajo que se dejo pendiente. esto no corresponnde a una sesion previa oocal, sino a un trabajonrealizsdo en otra instancia delnrepo, los cambios ua estan en oocal y openspec ya esta al dia, leelo para que tengas eo contexto. estabamos aun en la fase 1." Resumed from openspec only. `/usr/bin/chromium` was missing; the owner installed Chromium 156 (headless). Work 1440 re-captured 4 px taller (row rounding): row-aligned diff `tools/adiff.cjs` added for boards built on the other machine.
- L11 Owner on the 390 pass rule (total above 3 % when every band ≤ 8 % and the mask shows only antialiasing): "pos si, pero no lo puedo revisar ahora. seria para revisarlo mas adelante." Recorded as provisional in proposal.md.
- L12 Owner: "va  avanzancon lo demasnhasta terminsrnla fade 1, spoyste de agentes sonnet o haiku para el trabajo mas manual, de acuerdo a la necesidad y cspacidad requerida. tu encargstende gestionarlos y manetenr el estandar de caludad final. usa herdr pars orquestsrlos." Two Sonnet workers (`wa`, `wb`) in a Herdr tab, briefs in `openspec/changes/design-audit/prompts/`; Haiku not used (the remaining work needed visual judgement). The parent built Home Inside 390 and the chat boards, checked every worker result and re-measured four boards.
- L13 Decision A5b: Home Outside 768 and 390 clones still failed after the band fixes; rebuilt with the DOM pipeline, clones kept in a Superseded section. Tool fixes carried into `tools/`.
- L14 Phase 1 closed: `openspec/changes/design-audit/reports/phase-1-summary.md`. Phase 2 waits for the owner. Owner: "si, deja todo en remote. incluye tamvien la actualizacion de openspec para que se tenga todo el contexto necesario ahi"
