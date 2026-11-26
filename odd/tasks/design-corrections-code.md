# Design corrections — code phase

Objective: the site implements the approved Figma proposals (`Proposed · Home` `2536:12`, `Proposed · Work & projects` `2520:22`, `Proposed · Notes & links` `2520:12`, components on `Design system` `2501:136`) and fixes the audit's behaviour defects. Branch: `feat/design-corrections` (from `develop`). Delivery: ask-on-risk. Runner: `node --test` (`npm test`), full gate `npm run check`.

## Specs

- S1 Owner, verbatim (2026-11-26): "vamos a pasar a la implementacion de las mejoras en el codigo. de momento inicia delegando a agentes sonnet con herdr pero pronto podras usar agentes codex tambien. recuerda que tambien tienes a copilot qu ete puede ayudar con soas sensillas aunque suele usar modelos tipo gpt 6 luna. encargate de mantener los estandares de calidad tanto en diseño, experiencia y codigo"
- S2 Behaviour defects first: the eight items of `openspec/changes/design-audit/reports/phase-2-audit.md` §1 (NL-01, HI-01, HI-02, NL-03, WK-17, NL-02, HI-03, WK-01), each fixed as its source report and the Proposed boards describe.
- S3 Foundations: tokens and root defaults match the Figma variables (collections Primitives, Color, Breakpoint, Foundation) and text styles: system causes S2, S4, S5, S8 and the motion tokens (SY-14) of `phase-2-audit.md` §2, plus the token changes logged in `odd/tasks/figma-design-system.md` (L5, L8, L10, L20: e.g. `annotation/note` 60 %, `color/highlight`, `color/essay-chip`).
- S4 Shared controls: `ui/Button`, `ui/TextLink`, `ui/BackLink` as built on `Design system` (S1, S6, S7 of §2), replacing every hand-built call site.
- S5 Page corrections: every item the phase 3 reports (`reports/phase-3-home.md`, `phase-3-work.md`, `phase-3-notes.md`) mark "code", plus the label system (S3 of §2), so each page matches its Proposed boards at 1440, 768 and 390, Outside and Inside, in en, es and pt.
- S6 Quality bar: `npm run check` passes; no regression in pages the change did not mean to alter (before/after captures); every CLAUDE.md rule holds (content access seam, i18n dictionary for every string in en/es/pt, link-arrow rule, `light-dark()` with `color-scheme`, `ui/` stays project-agnostic, no forbidden libraries).
- S7 Owner, verbatim (2026-11-26): "antes de cerrar sesion quisiera que mejoremos e tema de seo y de la indexacion. quiero que te conectes a mi navegador y usando google y otros buscadores como bing, ecosia, etc. busques mi nombre y analices la primera pagina de resultados. atencion especial en google. quiero qu eveas como muestra la pagina web, que contenido muestra de ella y como podemos mejorar no solo el raking sino el contenido qu ese muestra en la lista de resultados. anotas ensas mejoras y las incluyes en el plakn de implemntacion". Findings F1–F10 and owner actions: `openspec/changes/design-audit/reports/seo-search-results.md`.

## Tasks

| ID | Specs | Scope | Route | Status | Commit |
|---|---|---|---|---|---|
| T1 | S2, S6 | Eight behaviour defects | delegated: Sonnet `fixbugs` (Herdr), parallel with T2, disjoint surfaces | in progress (brief `prompts/code-t1-behaviour.md`) | |
| T2 | S3, S6 | Tokens, `@layer base` defaults, Icon roles and stroke | delegated: Sonnet `tokens` (Herdr), parallel with T1 | in progress (brief `prompts/code-t2-foundations.md`) | |
| T3 | S4, S6 | Button, TextLink, BackLink, hit areas, hover/press; migrate call sites | after T1+T2 | pending | |
| T4 | S5, S6 | Home Outside, Inside, chat, nav, footer | after T3 | pending | |
| T5 | S5, S6 | Work index and project pages | after T3 | pending | |
| T6 | S5, S6 | Notes, post, `/links/` | after T3 | pending | |
| T7 | S7, S6 | SEO in code: F3 `WebSite` JSON-LD, F4 titles, F5 descriptions + `data-nosnippet`, F6/F7 `Person` with one `@id`, full `sameAs`, portrait image, F8 `BreadcrumbList` / `BlogPosting` / project schema, F1 IndexNow key file | after T2 (shares `Base.astro`); independent of T3–T6 | pending | |
| T8 | S7 | Owner actions: deploy and confirm F2 favicon, Bing: submit the 25 URLs, enable Cloudflare Crawler Hints, re-check Site Explorer in a week (F1; site already verified, sitemap submitted 2026-11-22), Search Console indexing (F10), off-site profile alignment | owner | pending | |

Route evidence: T1 and T2 are independent units with disjoint edit surfaces, each several files and 100+ lines, launched together (Writer trigger a). T3 touches the call sites T1 edits, so it waits. T4–T6 depend on T3's components.

## Log

- L1 (2026-11-26) Owner: "vamos a pasar a la implementacion de las mejoras en el codigo. de momento inicia delegando a agentes sonnet con herdr pero pronto podras usar agentes codex tambien. recuerda que tambien tienes a copilot qu ete puede ayudar con soas sensillas aunque suele usar modelos tipo gpt 6 luna. encargate de mantener los estandares de calidad tanto en diseño, experiencia y codigo"
- L2 Branch `feat/design-corrections` from `develop` at `4bdafe0`; the previous session's uncommitted docs committed as `ef15c51`. Workers write; the supervisor owns git, reviews each diff against its surface, runs `npm run check` and looks at the pages before each commit.
- L3 (2026-11-26) T1 and T2 launched: Sonnet `fixbugs` (pane `w1:p19`) and `tokens` (pane `w1:p1A`) in Herdr tab `workers`, briefed by `openspec/changes/design-audit/prompts/code-common.md` plus one brief each. T2 owns `Icon.astro` and adds the `check` icon T1 needs. The dev server already runs at `127.0.0.1:4321` (tab 3); workers must not start another.
- L4 (2026-11-26) Owner: "cuando terminen deten el trabajo." T1 and T2 finish, then work stops: T3 is not launched this session.
- L5 (2026-11-26) SEO check done in the owner's Chrome (Google, Bing, DuckDuckGo, Ecosia; `site:` on Google and Bing): Google ranks the site #1 but shows a globe favicon (production still serves `data:` icons though `main` has the fix), the bare domain as site name, Google-rewritten interior titles; Bing has zero pages indexed. Report `openspec/changes/design-audit/reports/seo-search-results.md`; T7 (code) and T8 (owner) added.
- L6 (2026-11-26) Owner: "va, acabo de abrir webmasters en mi navegador. vuelvete a conectar y revisa que puede estar pasando para qu eno se me hay aindexado". Bing Webmaster Tools: site verified and sitemap submitted 2026-11-22; Bing knows only `/` (indexed 2026-11-22, not served yet) and has not crawled `sitemap-0.xml`; no backlinks, no IndexNow; nothing blocks the crawler. Detail and fix order in the SEO report, section "Bing Webmaster Tools".
- L7 (2026-11-26) Owner: "1sis, dale". Supervisor submitted the 25 production sitemap URLs in Bing Webmaster Tools → URL Submission, 00:29: "Success: 25 URLs submitted". Production sitemap has no TourBench page (production lags `develop`): submit it after the next deploy. Still pending for the owner: Cloudflare Crawler Hints, re-check Site Explorer in a week.
