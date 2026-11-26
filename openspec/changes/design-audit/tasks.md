# Tasks: design audit

Figma file `gq6glEp9QrPOnEyYG9dldh`. Site: `http://127.0.0.1:4321/` (`npm run dev` on `develop`), commit `5a0977a` for every board built so far. If `develop` moves before phase 1 closes, re-check the boards against the new commit.

## Phase 1 — As-built baseline

### 1.1 Home Outside — page `As built · Home Outside` `2449:12` — done

| Board | Node | Width | Source (approved) | Check |
|---|---|---|---|---|
| As built · Home v3.5 OUTSIDE · 1440 | `2449:21` | 1440 × 8136 (site 8135) | `2191:86` | Edited clone. After the 2026-11-25 band fixes: aligned diff 1.80 % (pass), plain 3.09 % |
| As built · Home v3.5 OUTSIDE · TABLET 768 · 768 | `2487:61` (caption `2487:348`) | 768 × 9326 (= site) | `2211:86` | DOM pipeline, 2026-11-25: diff 2.41 %, worst band 5.1 %. Pass (supervisor re-measured 2.41 %) |
| As built · Home v3.5 OUTSIDE · MOBILE 390 · 390 | `2487:349` (caption `2487:631`) | 390 × 10317 (= site) | `2210:86` | DOM pipeline, 2026-11-25: diff 4.01 %, worst band 7.0 %. Provisional 390 rule, owner review pending |
| As built · Nav — states | `2449:3181` | holder | `2185:56` | Built and compared by the builder |
| As built · Mobile menu open · 390 | `2449:3415` | 390 × 844 | `2391:122` | Built and compared by the builder |

Captions `2470:1489`–`2470:1493`. Differences and defects: `reports/home-outside.md`. Pixel numbers: `reports/pixel-check.md` (mean RGB difference per 200 px band; above 12 is flagged).

- [x] 1.1a Build and compare the five boards (Codex started, Sonnet finished)
- [x] 1.1b (2026-11-25, worker A: 3 image fills replaced, 153 text nodes recoloured to the site's green-950, one wrap fixed; 1440 passes by adiff (1.80 %); 768 (adiff 3.57 %) and 390 still fail on layout offsets and backgrounds, see `reports/home-outside.md` "Band fixes". 768 and 390 rebuilt with the DOM pipeline (decision A5b), the clones `2449:608`, `2449:1897` and their captions are in Section `2492:57`; tool fixes in `tools/`, RUNBOOK "Tool fixes 2026-11-25") Fix the flagged bands. The supervisor looked at the two worst on 390: both are photos with a different crop or scale (the "Proof · Inspiration Garden" screenshot and the choir photo in Experience); the layout is right. Fix: replace each image fill with an element screenshot of the same `<img>` from the site at that width, without moving nodes. Look at every other flagged band first; anything that is not a crop gets reported, not fixed blindly. A Copilot agent was doing this when the session closed; it had only made comparison images, check the boards before assuming anything changed.

### 1.2 Home Inside and chat — page `As built · Home Inside & chat` `2449:3558` — done

- [x] 1.2a `As built · Home v3.5 INSIDE · 1440` (DOM pipeline, source `2191:503`): 1440 × 8066, diff 1.84 %, worst band 2.9 %. Pass.
- [x] 1.2b `As built · Home v3.5 INSIDE · TABLET 768 · 768` (source `2213:86`): 768 × 10059, diff 2.70 %, worst band 5.7 %. Pass.
  - Nodes: 1440 `2474:12` (caption `2474:342`), 768 `2476:14` (caption `2476:375`).
- [x] 1.2c `As built · Home v3.5 INSIDE · MOBILE 390 · 390` `2477:14` (caption `2477:370`, source `2212:86`), built 2026-11-25 in the second clone (Chromium 156). 390 × 11017, same as the site. Diff 4.04 %, bands ≤ 6.9 % except the last 17 px strip (11.8 %). Passes the provisional 390 rule (`proposal.md`, "Pass rule"; owner review pending): the mask shows only text-edge antialiasing and image resampling, and side-by-side slices 0, 2, 6 and 10 match. Three hand fixes after the build: (1) the portrait fill is the site's pixels masked to the portrait alpha, because the name outline is drawn over the portrait on the site and was in the plate under it; (2) the fixed "Back outside" toggle was baked into the hero plate under the portrait, so a site crop of it sits on top; (3) the hero overflows 120 px over the notes list (a site defect, below), so the list plate is a site crop and its editable items are hidden, named as such.
- [x] 1.2d (done 2026-11-25, second clone: 16 frames `2481:14`–`2481:44` at x 6168, y 11700 / 12780 / 13860, caption `2481:12`; hiring flow with test data, requests to web3forms blocked by the capture script, 0 attempted) Chat boards: one row per lens of 390 × 844 frames with the site captures of steps 01–06 as image fills, a third row with the 768 and 1440 summary captures, and one caption (commit, date, "final send never pressed", the sending/sent/error strings from `reports/chat-captures.md`). The captures were in the session scratchpad and are gone: re-capture by walking the chat (`src/lib/chat/script.en.ts` lists the steps; the "I'm hiring" chip, then name, company, detail, email, until the summary card). Never press "Looks good, send it".
- [x] 1.2e (done 2026-11-25: Section `2480:12` at y 15884, 19 nodes moved with their captions, relative layout kept; nothing else from a Sonnet agent was on the page) Move the older work-in-progress clones on this page (Codex: Home Inside `2449:3559`, `2449:4195`, `2449:5702`; chat `2449:7204`, `2449:7244`, `2449:7283`, `2449:7346`, `2449:7408`, `2449:7465`, `2449:7534`, `2449:7610`, of which chat 01–03 were adapted to the site; plus whatever a Sonnet agent added before it was stopped) into a Section "Superseded WIP — not as built" below everything. Do not delete.
- [x] 1.2f (2026-11-25, worker A: `reports/home-inside.md`; it found board errors the pixel numbers missed on 1440, 768 and 390; fixed the same day by worker A, task E: toggle crop over the 1440 portrait `2495:12`, 768 portrait and overflowed list as site pixels, 390 placeholder truncated, plates snapped to whole pixels at the joins. After: 1440 1.72 %, 768 2.41 % (supervisor re-measured 2.41 %), 390 3.97 % with worst band 6.9 %. Missing CSS "·" separators on 1440/768 added by worker B, task F: `2497:12`–`2497:25`) Difference table approved board vs site for Home Inside. Preliminary copy differences: `reports/home-inside-preliminary.md`.

### 1.3 Work and projects — page `As built · Work & projects` `2446:60` — done

All ten boards exist, named and captioned, generated by the DOM pipeline. Codex's earlier clones on this page were deleted.

| Key | Board | Node | Source | State |
|---|---|---|---|---|
| w1440 | Work index · 1440 | `2470:870` | `2239:17` | Pass (aligned 1.91 % in the second clone) |
| w768 | Work index · 768 | `2471:12` | `2247:2` | Pass (aligned) |
| w390 | Work index · 390 | `2471:428` | `2248:2` | Provisional 390 rule on the aligned diff (plain bands up to 25.1 %, ~10 px drift) |
| peek | Small experiments · peek on hover · 1440 | `2471:840` | `2442:12` | Pass |
| t1440 | TourBench · 1440 | `2471:903` | `2443:12` | Pass |
| t768 | TourBench · 768 | `2471:1100` | none at this width | Pass (aligned) |
| t390 | TourBench · 390 | `2471:1297` | none at this width | Provisional 390 rule on the aligned diff |
| g1440 | Inspiration Garden · 1440 | `2471:1541` | `2298:2` | Pass |
| g768 | Inspiration Garden · 768 | `2471:1934` | `2312:2` | Pass |
| g390 | Inspiration Garden · 390 | `2471:2335` | `2312:1330` | Provisional 390 rule on the aligned diff (one plain band 9.3 %; supervisor re-measured 4.41 / 3.65 %) |

- [x] 1.3a Build the ten boards
- [x] 1.3b (2026-11-25, worker B: 45 images, keys and sizes matched the map) Upload the Garden images into the existing boards: `tools/RUNBOOK.md`, "Remaining work" step 1, has the node map per image. The extracted image files were in the scratchpad: re-run `node extract.cjs work/inspiration-garden <width> g<width>` first (it writes `pN.jpg` and `iN.png` in the same order, but confirm the count matches the map before uploading).
- [x] 1.3c (2026-11-25, worker B: all nine pass, w390/t390/g390 under the provisional 390 rule on the aligned diff, masks of selected regions only; numbers and every changed node in `reports/work.md` "Checks") Check the nine unchecked boards (runbook step 6) and fix what fails
- [x] 1.3d (2026-11-25, worker B: `reports/work.md`) Difference table approved board vs site. Known so far: the Work hero lost "[Draft]"; More projects starts with ASM8 and includes Portfolio and TourBench; Small experiments are Lock Keys OSD, Coursera Clone Web Services, GitHub Profile README and Forest Hero; external links carry ↗; "More experiments on GitHub" is external. TourBench differs strongly from proposal `2443:12`: another hero image and layout, the overview capture over the hero then "At a glance", the next project is a large ASM8 card, buttons "Open the project" / "Source on GitHub" (the implementation chose the case-study pattern on purpose, see `portfolio-visual-design/design.md`, "Project page v1").

### 1.4 Notes and links — page `As built · Notes & links` `2447:12` — done

Nine boards: Notes index `2447:13` / `2447:206` / `2447:393`, post `2447:593` / `2447:784` / `2447:980`, `/links/` `2447:1188` / `2447:1250` / `2447:1311` (1440 / 768 / 390). Heights match the site to 1 px; every pixel-check band ≤ 12 except `/links/` 390 at 15.9 (accepted). Differences and defects: `reports/notes-and-links.md`.

- [x] 1.4a Build, compare, fix the wrap mismatch found by the supervisor (bundled headless shell vs `/usr/bin/chromium`)

### 1.5 Close phase 1

- [x] 1.5a (2026-11-25: `reports/phase-1-summary.md`, drafted by worker A, reviewed and corrected by the supervisor) One summary for the owner: what changed between the approved boards and the site, per page, and the defects list (`proposal.md` "Audit findings already noticed" plus the reports). Then wait for the phase 2 instructions.

## Phase 2 — Audit

Owner, 2026-11-25:

> "quiero auditar la ui/ux del figma, ahora debes usar las skills que tienes de diseño, euristicas y esas cosas, y las debes usar para auditar el diseñño, la ux e interacciones. la revision debe ser minuciosaya que la ui y ux en general ya ha sido auditada antes, el objetivo es encontrar detalles mas pequeos, como uso de iconos, alineacion, espacio, layout etc. para este caso encargate tu porque necesitamos el mejor criterio posible"

Method: five Claude Opus auditors in parallel, one per area, briefed by `prompts/phase-2-audit.md`. Each audits the `As built` boards (Figma node ids are the reference for every finding) and the live site for what a board cannot show (hover, focus, keyboard, motion, chat). Read-only: no Figma edits, no code edits. The supervisor synthesizes `reports/phase-2-audit.md`.

- [x] 2.1 (2026-11-25: 24 findings, 9 P2 / 15 P3) Home Outside, nav, mobile menu → `reports/audit-home-outside.md`
- [x] 2.2 (2026-11-25: 20 findings, 1 P1 / 5 P2 / 14 P3) Home Inside and chat → `reports/audit-home-inside-chat.md`
- [x] 2.3 (2026-11-25: 32 findings, 6 P2 / 26 P3) Work and projects → `reports/audit-work.md`
- [x] 2.4 (2026-11-25: 23 findings, 1 P1 / 6 P2 / 16 P3) Notes and links → `reports/audit-notes-links.md`
- [x] 2.5 (2026-11-25: 14 findings, 1 P2 / 13 P3; detector on src/ returned [], live-URL scan 111 findings with verdicts) Cross-page system (icons, arrows, buttons, type ramp, spacing scale, colour, states, touch targets, motion) plus the Impeccable detector → `reports/audit-system.md`
- [x] 2.6 (2026-11-25: 113 findings, 2 P1 / 27 P2 / 84 P3; 8 behaviour defects first, 8 system causes) Synthesis: one deduplicated, prioritized findings list for the owner → `reports/phase-2-audit.md`

## Phase 3 — Corrections

Owner, 2026-11-25: "vamos a pasar a la fase de correcion del diseño y comprotamiento. tenemos cosas que corregir en figma y otrs en el codigo. empezaremos por figma". First step: Figma foundations and components in their corrected form, tracked in `odd/tasks/figma-design-system.md` (page `Design system` `2501:136`, variable collections Primitives / Color / Breakpoint / Foundation).

- [x] 3.1 Variables and text styles from `tokens.css` plus the audit's new tokens
- [x] 3.2 Controls: Icon, Button, TextLink, BackLink (SY-01, SY-02, SY-03, §4 patterns)
- [x] 3.3 Nav (Desktop / Mobile × Top / Scrolled)
- [x] 3.4 Footer, Contact, mobile menu sheet, chat card
- [x] 3.5 Corrected boards beside the As built boards, built from instances: pages `Proposed · Home` `2536:12`, `Proposed · Work & projects` `2520:22`, `Proposed · Notes & links` `2520:12` (26 boards; reports `reports/phase-3-home.md`, `phase-3-work.md`, `phase-3-notes.md`)
- [x] 3.6 Clean up and organise the Figma file (owner, 2026-11-25: "para la proxima sesion limpiaremos y ordenaremos el figma"). Done 2026-11-25:
  - Page order: Brand, Design system, `---`, then per area As built → Proposed (Home Outside, Home Inside & chat, Proposed · Home; Work; Notes), `---`, the approved v3.5 pages (Portfolio, Case study, Work, Writing) as reference, `---` (new `2567:11130`), Archive.
  - The two Superseded sections moved to `Archive` (node ids unchanged): Home Outside clones `2492:57`, Home Inside & chat WIP `2480:12`. Nothing deleted.
  - `As built · Home Inside & chat`: content shifted to x 0; the 16 chat boards, their labels and caption are in Section `As built · Contact chat` `2568:9885`.
  - Every board caption is named `Caption — <board name>` and sits above its board; Proposed pages lay out one row per page (1440 / 768 / 390, 200 px gaps) to the right of `Page components`.
  - `Proposed · Notes & links`: `Page components` `2520:13` was 496 × 496 with its components spilling under the boards and three overlapping; reflowed in columns (shared pieces, then Notes / Post / Links per breakpoint) and refitted.
  - Brand `2417:12` renamed `Footer image · blue hour · source (assets.md)`.
- [x] 3.7 Owner review of the proposals (2026-11-25, owner: "ya lo he revisado y estan aprobados"); then the code phase
- [x] 3.8 Remove deprecated designs and organise every page (owner, 2026-11-25: "ahora que da limpiar los diseños deprecados y dejar bien ordenada y orgaizadaa cada pagina"). Owner chose: delete Archive and the approved v3.5 pages (Portfolio, Case study, Work, Writing); keep As built until the code phase ends.
  - [x] Organise (2026-11-25): page order Brand, Design system, `---`, Proposed · Home / Work / Notes (approved), `---`, As built × 4 (baseline), `---`, pages to delete. One Section per screen on every Proposed and As built page (`Proposed · Home Outside` `2573:9840` … `As built · /links/` `2573:9901`), boards 1440 → 768 → 390 with captions above, nothing loose. Brand: `Brand foundations v1` `2573:9902`, `Banners and images` `2573:9903`.
  - [x] Delete the five pages (2026-11-25, after the owner saved the version "Before removing deprecated pages" by hand; the Plugin API cannot, `saveVersionHistoryAsync` is not supported). The `Nav` instance on `As built · Nav — states` was detached first (now frame `2575:57`). Deleted one page per call: all five in one script failed and rolled back. After: 11 pages, 0 orphan instances on the pages that hold instances. Before deleting Portfolio, detach the one `Nav` instance on `As built · Nav — states`. No component on the other four has instances elsewhere.
- [x] 3.9 (2026-11-25) The owner deleted the four `As built · …` pages by hand ("eliminé las apginas de as built. no son necesarioas ahora"). The file now holds Brand, Design system, `---`, Proposed · Home / Work & projects / Notes & links. Node ids cited in `reports/` for As built boards are history. Next: the code phase.

## Phase 4 — Code (started 2026-11-26)

Owner, 2026-11-26:

> "vamos a pasar a la implementacion de las mejoras en el codigo. de momento inicia delegando a agentes sonnet con herdr pero pronto podras usar agentes codex tambien. recuerda que tambien tienes a copilot qu ete puede ayudar con soas sensillas aunque suele usar modelos tipo gpt 6 luna. encargate de mantener los estandares de calidad tanto en diseño, experiencia y codigo"

Goal: the site implements the approved Proposed boards (Figma `gq6glEp9QrPOnEyYG9dldh`: `Proposed · Home` `2536:12`, `Proposed · Work & projects` `2520:22`, `Proposed · Notes & links` `2520:12`, components on `Design system` `2501:136`) and fixes the audit's behaviour defects. Work lands on `develop` (merged from `feat/design-corrections` at `7ffea98`); start the next unit on a new feature branch from `develop`. `odd/tasks/design-corrections-code.md` is the running logbook of the same plan; this section is enough to continue without it.

### How the work is run

- One supervisor session owns git, reviews every diff against the worker's edit surface, runs `npm run check`, looks at the pages and commits. Workers never commit.
- Workers: Claude Sonnet in a separate Herdr tab: `herdr agent start <name> --kind claude --pane <id> -- --model sonnet --permission-mode bypassPermissions`, then `herdr agent prompt <name> "<one line pointing to the briefs>"` (no `--timeout` without `--wait`). Two at a time with disjoint edit surfaces; one owner per shared file. Codex and Copilot may join later (Copilot for mechanical work: captures, pixel checks).
- Briefs: `prompts/code-common.md` (rules every worker follows: Figma is the reference and is read only, i18n in en/es/pt, accessibility, test first for isolable logic in `src/lib/`, before/after captures, report format, `WORKER DONE <report>`), plus one brief per unit (`prompts/code-t1-behaviour.md`, `prompts/code-t2-foundations.md`). Write the next brief in the same shape.
- The dev server runs at `http://127.0.0.1:4321/` (`npm run dev -- --host 127.0.0.1 --port 4321`); workers must not start another. Captures need a full Chromium (`/usr/bin/chromium`) and `playwright` on `NODE_PATH` (see "Continue from another clone" in `proposal.md`). Worker scratch lives outside the repo and does not survive the session.
- Gate before every commit: `npm run check` exit 0, diff only inside the surface, captures looked at.

### Tasks

| ID | Scope | Status | Commit / report |
|---|---|---|---|
| T1 | The eight behaviour defects of `reports/phase-2-audit.md` §1 (NL-01, HI-01, HI-02, NL-03, WK-17, NL-02, HI-03, WK-01) | done: live re-check passed 2026-11-26 (WK-01 54/54 tiles at 300 px, HI-01/02/03, NL-01 heading at 96 px at 1440/768/390 with and without reduced motion) | `a4abdf0`, `reports/code-t1-behaviour.md` |
| T2 | Foundations: tokens from the Figma variables, `@layer base` defaults (line height, `text-wrap`, form fonts, mono), focus tokens and `[data-surface="dark"]`, `Icon` `sizing` prop (`inline` / `control` / `brand`) with a 1.5 px non-scaling stroke, motion tokens | done | `1bd86ef`, `reports/code-t2-foundations.md` |
| T3 | Shared controls `ui/Button`, `ui/TextLink`, `ui/BackLink` as on `Design system` (system causes S1, S6 hit areas, S7 hover/press of `phase-2-audit.md` §2); migrate every hand-built call site; remove the temporary `.site-nav .contact` line-height rule in `src/layouts/Base.astro` | **partial, uncommitted work committed as WIP** (Codex worker interrupted 2026-11-26, no report): components built, 12 files migrated; audit and close-out pending, see "T3 and T7 — state at interruption" | brief `prompts/code-t3-controls.md`; input: T2 report "Call sites to adopt" |
| T4 | Home Outside, Inside, chat, nav, footer: every item `reports/phase-3-home.md` marks "code", plus the label sweep (S3) and adopting T2's tokens | after T3 | |
| T5 | Work index and project pages: items marked "code" in `reports/phase-3-work.md` | after T3 | |
| T6 | Notes, post, `/links/`: items marked "code" in `reports/phase-3-notes.md` | after T3 | |
| T7 | SEO in code, findings F3–F8 and F1's IndexNow key of `reports/seo-search-results.md`: `WebSite` JSON-LD; titles `<page> — <what it is> · Jahat Trinidad` and 140–160 character descriptions in en/es/pt via the dictionary; `data-nosnippet` on the skip link and nav handle; `Person` with one `@id`, full `sameAs`, portrait `image`; `alt="Jahat Trinidad"` on the hero portrait and avatar; `BreadcrumbList`, `BlogPosting`, project schema | **code mostly done, uncommitted work committed as WIP** (Sonnet worker idle 2026-11-26, no report); 3 component edits for the supervisor and a review pending, see "T3 and T7 — state at interruption" | brief `prompts/code-t7-seo.md` |
| T8 | Owner actions (outside the repo): deploy, then confirm production links `/favicon.ico` and `/favicon.svg` instead of `data:` icons; Cloudflare Crawler Hints; submit TourBench to Bing after the deploy (it is missing from the production sitemap); Search Console indexing of TourBench, Inspiration Garden and the posts; re-check Bing Site Explorer around 2026-12-03; LinkedIn headline and website links on every profile | owner | |

### T3 and T7 — state at interruption (2026-11-26)

The session stopped while T3 (Codex `controls`) and T7 (Sonnet `seo`) were both writing in the same tree. Neither wrote its report (`reports/code-t3-controls.md` and `reports/code-t7-seo.md` do not exist). The whole tree was committed **as is** to `develop` in one WIP commit (`wip(code): T3 controls and T7 SEO at interruption`) so another machine can continue. It was not reviewed line by line. What was verified on that tree:

- `npm run check` exit 0 (boundaries, tests including the new `seo.test.ts` cases, `astro check`, build of 55 pages, link-arrow rule).
- Nothing else: no captures, no look at the pages, no diff check against each brief's edit surface.

**T3 — what exists**

- New `src/components/ui/Button.astro` (76 lines), `TextLink.astro` (86), `BackLink.astro` (10).
- Call sites already using them (count of `<Button|TextLink|BackLink`): `content/ProjectCard` 2, `sections/Contact` 4, `contact/Chat` 8, `Hero` 1, `Nav` 1, `NextCaseStudy` 1, `Notes` 2, `Values` 1, `Work` 1, `WorkMore` 4, `pages/notes/[...slug]` 3, `_views/CaseStudy` 3. `PostRow`, `PageHero` and `contact/chat-client.ts` were also edited (markup or styles removed).
- Not done: the temporary `.site-nav .contact { line-height: 1.25rem; }` rule is still in `src/layouts/Base.astro:141`. There is no list of which brief items (HO-01, HO-05, HO-14, HO-15, HO-19, HI-10, WK-03, WK-20, NL-13, NL-14) are covered, and no "Open questions".

**T3 — to finish**

1. Read `prompts/code-t3-controls.md` and `prompts/code-common.md`. Open each component in the three `ui/` files against `Design system` `2501:136` (variants, hit areas S6, hover/press S7). They must stay project-agnostic: no `src/lib/` or `astro:*` imports (the check enforces it).
2. Search for hand-built controls that remain: primary pills, underline links and back links outside `components/ui/` (for example `rg -n "←|class=\"(cta|pill|btn)" src`). `Lens.astro` `.pill` and the `Nav` `data-nav-pill` are not buttons (hint and nav indicator). Migrate the rest, or list them as open questions.
3. Make the per-item list (file:line, before → after) for the ten items and write `reports/code-t3-controls.md` in the `code-common.md` report format.
4. Remove the temporary `.site-nav .contact` rule in `Base.astro` once the nav Contact uses `ui/Button`, then check the nav height at 1440/768/390.
5. Take before/after captures of Home (Outside and Inside, chat open), `/work/`, a project page, `/notes/`, a post and `/links/` in en, es and pt. Compare them with the Proposed boards.

**T7 — what exists** (checked in `dist/` after the build)

- `src/lib/seo.ts` +179 lines with tests in `src/lib/seo.test.ts` (+205): `WebSite` on each home, `Person` with `@id`, `sameAs` and `ImageObject`, `BreadcrumbList` on posts and project pages, `BlogPosting` on posts, `SoftwareApplication`/`CreativeWork` on project pages.
- Titles follow `<page> — <what it is> · Jahat Trinidad`. Descriptions are 151–157 characters on Home, Work, Notes and Links (en checked, es Home 156). Wired through `src/lib/i18n.ts`, the dictionaries and the frontmatter of `_views/*.astro`.
- `data-nosnippet` on the skip link in `Base.astro`.
- F1: IndexNow key file `public/e362ae8d0a623331ac836ab1a538ec2b.txt` (public by design: the engines fetch it) and `scripts/indexnow.mjs` (`npm run build && npm run indexnow`, `-- --dry-run` prints only; it uses the network, so it is not part of `check`).

**T7 — to finish** (component edits the brief left to the supervisor)

1. `src/components/sections/Hero.astro`: hero portrait `alt=""` → `alt="Jahat Trinidad"` (the portrait image, not the decorative layers at lines 56/69/78; check which one is the portrait).
2. `src/components/sections/contact/Chat.astro:57`: avatar `alt=""` → `alt="Jahat Trinidad"`.
3. `src/components/sections/Nav.astro`: `data-nosnippet` on the handle element (the name/brand link).
4. Review: descriptions in es and pt on every page type are native and 140–160 characters; validate the JSON-LD of one page of each type (Home, Work, project, Notes, post, Links) in the Rich Results Test or schema.org validator after deploy; write `reports/code-t7-seo.md`.

### Resume here

1. On the other machine: `git switch develop && git pull`, `npm install`, `npm run dev -- --host 127.0.0.1 --port 4321`. Captures need a full Chromium and `playwright` on `NODE_PATH` (`proposal.md`, "Continue from another clone").
2. New branch from `develop` (for example `feat/t3-t7-closeout`). Finish **T7** first (four small items above, supervisor inline), then **T3** steps 1–5. `npm run check` before each commit. One commit per unit (`feat(seo): …`, `feat(ui): …`).
3. Settle the open questions below that block T4–T6, then T4–T6 (two workers at a time where surfaces are disjoint, briefs in the shape of `prompts/code-t3-controls.md`).
4. T8 stays with the owner (deploy, favicon check, Bing after the deploy, run `npm run indexnow` after the deploy).

Engram is not needed: this file, `proposal.md`, `design.md`, the `prompts/` briefs and the `reports/` files hold the full state. `odd/tasks/design-corrections-code.md` is the same plan as a logbook (L1–L14).

### Open questions (owner or the next unit decides)

- T1-1 NL-02: Figma `2520:35` draws "Copy" white at rest with no hover; the code keeps green-200 so a cream hover shows. If T6 makes it white, the hover needs a decision.
- T1-2 WK-01: below 1025 px the peek and stats swap are removed for mouse users too (follows the 768 boards). Confirm.
- T1-3 WK-01: long titles truncate in the peek ("GitHub Profile READ…"); full name in `title`.
- T1-4 HI-03: the report's idle bound "inset 8 px" was not applied (`Contact.astro` was outside T1's surface); compare with the Home Inside board in T4.
- T2-1: `text-wrap: balance` breaks three Home headings at other points than the boards' manual breaks ("Faster launches. Fewer / handoffs. Nothing rebuilt.", "A bridge between / design and engineering.", "Built to grow, not / to be redone."). Accept, or authored breaks per locale in `Values.astro` (T4).
- T2-2: TourBench facts need non-breaking characters: U+00A0 in `3 628 800`, U+2011 or a no-wrap span in `--test` (`src/content/projects/{,es/,pt/}tourbench.mdx`) (T5).
- T2-3: token names assumed without a direct Figma read: `--radius-xl`, `--radius-2xl`, `--icon-*`, the motion durations and easings. Confirm against the Foundation collection with a Plugin API read.
- T2-4: the Design system icon section holds 20 icons, not 15.
- Known leftovers: `components/content/PostRow.astro` `&nbsp; →` still has a breakable space; Contact chips "I'm hiring" with a straight apostrophe; the send button still draws `arrow-up` instead of a paper plane (owner asked for a typical send icon, `odd/tasks/figma-design-system.md` L14).

### SEO and indexing (2026-11-26)

Owner: "antes de cerrar sesion quisiera que mejoremos e tema de seo y de la indexacion. [...] atencion especial en google. quiero qu eveas como muestra la pagina web, que contenido muestra de ella y como podemos mejorar no solo el raking sino el contenido qu ese muestra en la lista de resultados. anotas ensas mejoras y las incluyes en el plakn de implemntacion"

- [x] Search results for the owner's name on Google, Bing, DuckDuckGo and Ecosia, and Bing Webmaster Tools → `reports/seo-search-results.md` (F1–F10, owner actions). Google ranks the site first; Bing knew only `/`.
- [x] The 25 production sitemap URLs submitted in Bing Webmaster Tools → URL Submission (2026-11-26, "Success: 25 URLs submitted").
- [ ] T7 (code: mostly done, close-out in "T3 and T7 — state at interruption") and T8 (owner), table above.
