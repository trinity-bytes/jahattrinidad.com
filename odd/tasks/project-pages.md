Objective: implement the approved Figma proposals: a technical page per `tier: project` entry and the experiments "peek" with live GitHub stats.
Branch: feat/projects-content (continues). Delivery: ask-on-risk. Test runner: `npm run check` (boundaries + node --test + astro check + build + check-links).

## Specs

- S1 — Owner: "va. ahora si, aprobado." The project page v1 (Figma `2443:12`) and experiments preview v2 (`2442:12`) are approved, with the link arrow rule (CLAUDE.md).
- S2 — Owner: "respecto a la data de github mejor consultalo a la api en cada build. hacer eso a mano es cuestion de tiempo para que sea olvidado." Repo stats (stars, forks, language, last update) come from the GitHub API at build time; a failed request shows the tile without stats and never fails the build.
- S3 — Owner: "para la implementacion lanza un agente codex y otro copilot con herdr, el agente copilot no es muy inteligente asi que no le des cosas complicadas, el agente codex solo tiene como 20% de uso restante asi que usalo con sabiduria".
- S4 — Every `tier: project` entry gets a page at /work/<slug>/ (en, es, pt) when it has `page`; its card in "More projects" links there with →, and keeps Live/Code ↗.
- S5 — Assumption: Forest Hero has no README capture, so its tile has no peek image (stats only).

## Tasks

- [x] T1 (S4) Schema `page` + peek fields; TourBench reference content en/es/pt. Route: inline. Commit below.
- [x] T2 (S4) Page content for trama, asm8, coursera-clone, forest-hero-2, queens (en/es/pt). Route: delegated, Codex `pages` (owner asked; heaviest research; budget-limited). Commit 689d594.
- [x] T3 (S1, S5) Peek captures + fields for the 4 experiments (en/es/pt). Route: delegated, Copilot `peek` (owner asked; mechanical). Commit e0af64f.
- [x] T4 (S1, S2, S4) ProjectPage view, routes, dictionary, WorkMore links + peek UI, GitHub stats module with fallback and test. Route: inline. Commit 50c36ad (RED: github.test.ts failed on the missing module, then 3/3).
- [x] T5 (S4) Page content for allinband, bionutricel-catalog, grayscale-studio, portfolio. Route: delegated, Codex `pages` (15% left). Commit 2cb5b31; owner's part filled in after L4.

## Log

- L1 (2026-11-25): "va. ahora si, aprobado. respecto  a la data de github ejor consultalo a la api en cada build. hacer eso a mano es cuestion de tiempo oara que sea olvidado. para la implementacion alnza un agente codex y otro copilot con herdr, el agente copilot no es muy inteligente asi que no le des cosas complicadas, el acgente codex solo tiene como 20% de uso restante asi que usalo con sabiduria"
- L2 (2026-11-25): Owner, mid-task: "btw no te olvides e agregar botones en estas cards para poder acceder a la ficha de cada proyecto" — every project card has a "See the project →" button (10 of 10).
- L3 (2026-11-25): npm run check green: 53 tests, 0 errors, 55 pages, links clean. Desktop 1440 and mobile 390 checked (no overflow, no broken images, peek hidden on touch). Live stats in the build (e.g. Lock Keys ★ 2, QML). Open for the owner: "My part" on AllinBand / Grayscale Studio / Forest Hero 2 (commits: 106/106, 137/141, 151/222 by the owner); Codex's plausible rejected alternatives for Bionutricel, Grayscale, Portfolio and the first batch.
- L4 (2026-11-25): Owner: "en allllinband fui parte el team en la etapa e formulacion del proyecto y desarrollo del informe. pero solo yo me encargue de desarrollar la landingpage. en grayscale me encargue yo principalmente de dirigir el proyectoy  mas que nada delegue ciertas partes a algunos compañeros. en forrest hero lo mismo, realice la aprte de gameplay y gestion de estados del juego, asi como el diseño de la interfaz." Written into "My part" (en/es/pt). Check green: 55 pages, links clean.
- L5 (2026-11-25): Session closed by the owner ("vamo a cerrar sesion aqui"). Next session: owner reviews the project pages and Codex's rejected alternatives (plausible, not documented: Bionutricel, Grayscale, Portfolio, and the first batch: Trama, ASM8, Coursera Clone, Forest Hero 2, Queens); then merge/release with git-flow when the owner asks. Still open from projects-content: Garden note "[Owner: confirm wording]", Tranqui heat map shows San Antonio (labelled illustrative).
- L6 (2026-11-25): Owner: "las 'añternativas' redactadas por codex son inexactas y que es mejor que delegues a un subajente de tu preferenvia (codex, copilot o onnet, con herdr) y ue revise las memorias de engram de cada uno de esos proyectos". Delegated to Sonnet `decisions` (Herdr). All 9 projects rewritten en/es/pt from evidence (Engram, odd/ logs, ADRs, commits), max 2 per project (page renders 2); report in session scratchpad. Spot check: Queens 5f34152/777f2c5 match. Check green (53 tests, 55 pages, links clean). Uncommitted, owner to review. Open: AllinBand OLED screen public?, Queens past open-write hole public?; weakest reasons Coursera (1), Forest Hero 2 (2). Out of scope seen: Grayscale `round(...)` vs ties-to-even, Bionutricel lists D1 in stack.
- L7 (2026-11-25): Owner on AllinBand OLED and Queens open-write hole: "me parece bien ambos. al final los proyectos cambian pero queda el historico de decisiones que lo llevaron de un punto a otro". Both stay public; committed.
- L8 (2026-11-25): Fixed the two out-of-scope findings after checking the repos: Grayscale formulas use rint (ties to even, docs/audits/numerical-consistency.md Quantization); Bionutricel stack lists Google Sheets, not D1 (D1 is the complaints book, catalog CLAUDE.md:26,32). Check green.
- L9 (2026-11-25): Merged feat/projects-content into develop locally (5a0977a, no-ff), check green. Session closed by the owner. Next: owner design, consistency, usability, interaction and UX audit; then a last review of the Viora case study; then publish.
