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
- [ ] 3.5 Corrected boards beside the As built boards, built from instances
