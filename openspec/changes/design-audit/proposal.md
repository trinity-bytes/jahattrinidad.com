# Design audit: UI/UX, consistency, usability and interactions

> Status: **in progress, phase 1 (as-built baseline) partly done**. Started 2026-11-25. Read this file and `tasks.md` before touching Figma or the audit. Everything needed to continue is in this folder and in the repo; nothing depends on Engram or on a previous session.

## Why

The site was built from the approved Figma boards (`portfolio-visual-design`), then changed a lot during implementation: i18n (en/es/pt), project pages, experiments peek, hero motion, section glow transitions, link arrows, CV download, contact chat, new copy. The approved boards no longer describe the site. The owner, 2026-11-25:

> "vamos a comenzar con la auditoria de diseño ui/ux para empezar necesitamostener en figma una representacion accurate del estado ctual de la web, asi que la primera tarea sera eso, mapear los cambios en la web y actualizar el figma. [...] una vez terminado, reportame para darte las siguientes instrucciones"

The previous session (2026-11-25, 11:58) announced the scope: an audit of "diseño y consistencia asi como usabilidad, interacciones" over the running site.

## What

1. **Phase 1 — As-built baseline (this change, in progress).** Figma pages named `As built · <group>` that show the site exactly as it runs on `develop` at commit `5a0977a`, at 1440, 768 and 390, plus a per-board list of differences against the approved boards. The audit starts from these, not from the approved boards.
2. **Phase 2 — Audit.** Not started. The owner gives the instructions after phase 1 is reported ("una vez terminado, reportame para darte las siguientes instrucciones"). Do not start it on your own.

## Decisions

| # | Decision | Rejected alternative | Why |
|---|---|---|---|
| A1 | The approved boards stay untouched; the as-built picture lives on new pages `As built · Home Outside`, `As built · Home Inside & chat`, `As built · Work & projects`, `As built · Notes & links` (placed just before "Archive") | Editing the approved boards in place | CLAUDE.md: proposals go beside the board, never over it; the approved boards are the record of what was decided |
| A2 | The site wins: defects are copied as they are and listed under "Defects seen", never fixed in the baseline | Tidying while copying | The audit needs the real state |
| A3 | Source of truth is the local dev server `http://127.0.0.1:4321/` on `develop` | Production | Owner: "usa el server que a esta fucnionando para eso. no te fijes en prduccion porque esta desactualiado" |
| A4 | One representative view per page type: Work index, TourBench (project page), Inspiration Garden (case study) | Every project and case study | Owner: "no es necesario replicar todas las vistas de todos los proyectos o casos de estuiod. solo con una representativa es suficiente." |
| A5 | Two build methods are in use (see "Methods"). Home Outside and Notes & links are edited clones of the approved boards; Work and Home Inside are generated from the live DOM | One method everywhere | Clones keep the approved structure; the DOM pipeline was faster and more exact once the agents ran out of usage. Both are pictures for the audit, not a base to keep designing on |
| A6 | Chat steps are placed as site captures (image fills), not rebuilt as layers | Editable chat layers | They are audit references; the approved chat boards (`2353:103` … `2354:320`) remain the editable design |
| A7 | Never press the chat's final send button | Testing the whole flow | It posts to a real form service and emails the owner. Sending, sent and error states come from `src/lib/chat/` (strings in `reports/chat-captures.md`) |

## Methods

**Clone and edit** (Home Outside, Notes & links). Clone the approved board, then edit the clone section by section until a full-page capture of the site and a Figma export match. Keeps auto layout and components where they still fit; many frames became absolute to hit measured coordinates.

**DOM pipeline** (Work, Home Inside). `tools/extract.cjs` renders the page in `/usr/bin/chromium`, captures each section's background as a locked "plate" (the render with content hidden) and records every text, rectangle, icon and image with its box and style. `tools/payload.cjs` packs that as an SVG whose layer name carries the data; it is uploaded to Figma and `tools/builder.js` (run through the Figma plugin API, `use_figma`) builds an editable board from it. Images are uploaded after the build. `tools/diff.cjs` compares the Figma export with the site capture. Step by step: `tools/RUNBOOK.md` (its absolute scratch paths are from the session that wrote it; run the tools from any scratch folder). No auto layout, no component instances. `extract.cjs` takes `home` as the slug for `/` and `LENS=inside` to render the Inside state.

**Pass rule** (proposed by the agent that built the pipeline, used since): same width and height as the site capture, total pixel difference ≤ 3 % (pixels whose summed RGB delta is above 60), no 500 px band above 8 %, and a person looks at side-by-side slices (`tools/sbs.cjs`, `tools/pair.cjs`).

## Continue from another clone

Checked 2026-11-25 by running the tools from a folder outside the repo: `extract.cjs` (Work 390, Home Inside 390), `payload.cjs` and `diff.cjs` all work.

Prerequisites:

1. `npm install` in the repo (the tools load `sharp` from the repo's `node_modules`; set `REPO_ROOT=<repo>` when you run them from another folder).
2. The dev server: `npm run dev -- --host 127.0.0.1 --port 4321` on `develop`. Check that `git log -1` matches the commit in the board captions (`5a0977a`); if the site changed since, the existing boards are out of date for those pages.
3. A full Chromium or Chrome binary (not Playwright's bundled headless shell, which wraps text differently). The tools use `/usr/bin/chromium`; set `CHROMIUM=<path>` otherwise.
4. The `playwright` package on `NODE_PATH`: `npm i -g playwright` (or `@playwright/mcp`), then `NODE_PATH=$(npm root -g)` (or `$(npm root -g)/@playwright/mcp/node_modules`).
5. Figma: an MCP client logged in to Figma with edit access to file `gq6glEp9QrPOnEyYG9dldh`, and the `figma-use` skill (`use_figma` is the Plugin API call `builder.js` runs through; `upload_assets` uploads payloads and images).

Copy `tools/` to a scratch folder outside the repo and work there: the extractor writes large PNGs next to itself. Never commit those outputs.

Known limitation: `extract.cjs` assumes a page with the site nav and footer, so it fails on `/links/` (that page is already done by the clone method).

## Agent tooling facts learned in this change

| Fact | Consequence |
|---|---|
| Playwright's bundled headless shell wraps some lines differently from the system browser | Every site capture uses `chromium.launch({ executablePath: '/usr/bin/chromium' })` |
| The Playwright MCP refuses to write screenshots outside its own folder | Capture with a Node script and the global `playwright` package (`NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules`), see `tools/shot.cjs` |
| The Astro dev toolbar appears in dev captures | Remove `astro-dev-toolbar` before every capture |
| Captures before fonts load wrap differently | `await document.fonts.ready`, scroll the page once so ScrollTrigger settles, use `reducedMotion: 'reduce'` |
| Viewport heights matter (heroes size to the viewport) | 1440 × 900, 768 × 1024, 390 × 844 |
| Copilot CLI has no `figma-use` skill installed | Point it to a local copy, e.g. the Codex plugin cache `~/.codex/plugins/cache/openai-curated-remote/figma/<version>/skills/figma-use/SKILL.md` |
| Copilot blocks on trust prompts and on questions to the user; its idle/done state in Herdr flickers while it works | Watch for output files instead of agent state; answer trust prompts |
| Codex agents end their turn early with partial reports, and hit their usage limit after about 25 minutes of three agents in parallel | Give them one board at a time and a "do not end the turn" rule; budget the limit |
| Claude weekly usage reached 95 % with three Sonnet agents in parallel | Prefer Copilot for mechanical work (captures, measured specs, pixel checks, runbook execution) |

## Audit findings already noticed (input for phase 2, not fixed)

Collected while building the baseline; details and the rest are in `reports/`.

- Chat summary button "Looks good, send it →" carries `→` although it is an in-page action (CLAUDE.md link-arrow rule).
- 390: the contact composer placeholder is truncated ("What are you building, and w…"); "CV (PDF)" wraps alone to a second row; fact dividers sit right under the value text.
- 390: the footer offers "Turn off the I shortcut", a keyboard shortcut, on a phone.
- 768: the fixed lens sits over Values on the first viewport (hero 867 px in a 1024 viewport); the Tranqui meta line breaks inside "2025– / 2026"; the composer is 620 wide in a 688 column.
- "I'm hiring" uses a straight apostrophe; the rest of the copy uses curly ones.
- Contact h2 leaves "talk." alone on a line at 768 and 390.
- Post at 390: the code line is cut at the right edge with no scroll cue.
- Notes index: a single post leaves the desktop right column mostly empty; Elsewhere rows show only network names in 12 px mono.
- `/links/` at 390: the page is 942 px in an 844 viewport, so the Elsewhere buttons sit at the fold; the sun hides behind a card.
- Notes and post heroes: the green sub copy over mid-tone hills has weak contrast (by eye, not measured).

## Open questions

- Phase 2 scope and method: waiting for the owner.
- Whether the DOM-generated boards are enough for the audit or the owner wants editable clones everywhere.
