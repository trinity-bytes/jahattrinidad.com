# About page

Objective: build the About page approved in Figma on 2026-11-27, in en/es/pt, with its nav, footer, structured data and `llms.txt` entry.
Branch: `feat/about-page` (from `develop`). Delivery: ask-on-risk. Test runner: `npm run check` (boundaries, `node --test`, `astro check`, build, link rule) plus Playwright captures at 1440 / 768 / 390.

## Specs

- **S1 — The page follows the approved boards.** Owner: "va. diseño aprobado." Figma file `gq6glEp9QrPOnEyYG9dldh`, page `Proposed · About` (`2594:12`): desktop board `2596:13`, mobile board `2600:285`, local components in `Page components` (`2594:13`). Sections in order: hero (Notes hero layout, display word "About", own cover, cream scrim under the nav), 01 The short version (portrait + four facts), 02 How I got here ("Why I build" chapters, "The path so far" chapters, closing quote with avatar), 03 How I work (three principles + notes link), 04 Education and languages (UPC, Platzi, Universidad Peruana Unión; Spanish, English, Portuguese), Contact (05), Footer. English copy exactly as on the boards.
- **S2 — Scope chosen by the owner.** Answer: "Build it in code (Recommended)" — "On a feature branch: the page in en/es/pt (ES built from your own Spanish story), About in the nav and footer, AboutPage JSON-LD, llms.txt, the photos and the cover. Tablet follows the other pages' pattern and Inside is just the recolor from the tokens."
- **S3 — Spanish story.** The ES "Why I build" chapters start from the owner's own words (Log L2), with typos fixed and nothing added. Portuguese is translated by the agent (assumption: the owner reviews it).
- **S4 — Navigation.** "About" sits after Notes in the nav, in the mobile menu and in the footer's Navigate column (approved boards). Internal links use `→`, external `↗` (CLAUDE.md link rule).
- **S5 — Discoverability.** From `openspec/changes/discoverability/tasks.md`: "route in three locales (`src/pages/_views/About.astro` + wrappers), nav/links entry, `ProfilePage`/`AboutPage` JSON-LD, add it to `llms.txt` pages."
- **S7 — No Inside version; same motion as the rest of the site.** Owner: "no inside version is needed. aplica los efectos y trnasiciones presentes en el reto de la pagina." No Inside content for About; it reuses the site's existing effects and transitions (hero, section transitions, reveals) the way the other pages do.
- **S8 — Home links to About.** Owner: "adapta el home para agregar una breve seccion 'about' o similar para enlazar a esta pagina tambien". Per CLAUDE.md, a change no approved board shows is proposed in Figma beside the Home board first and waits for the owner's approval before any code.
- **S6 — Images.** Portrait card: `docs/arbol.png`; quote avatar: `docs/linkedin.png` (owner's AI photos: "te deje 2 fotos ias para que no andes reciclando la misma foto"); hero cover: the image generated in Figma (hash `dd230db2…`). No image is described as a photograph. ONPE stays out (owner decision).

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T0 | — | inline | done, not committed | docs: approval record (CLAUDE.md, openspec) and this document |
| T1 | S1, S2, S3, S6 | inline | done, not committed | page view, wrappers, dictionary en/es/pt, education entries, images |
| T2 | S4 | inline | blocked: tablet nav overflow, owner decision | nav, mobile menu, footer |
| T3 | S5 | inline | done, not committed (RED/GREEN: nav.test, seo.test) | JSON-LD, `llms.txt` |
| T4 | S7 | inline | done, not committed | Backgrounds, Reveal, descend glow, hero parallax |
| T5 | S8 | inline | done, not committed (approved 2026-11-27) | Home About band, Notes 06, Contact 07 |

Route evidence: one behavior delivered in dependent steps (T2 and T3 link to the page T1 creates), so no parallel writers; the parent writes inline.

## Log

- L1 (2026-11-27, owner): "va. diseño aprobado." Then, asked what next: "Build it in code (Recommended)".
- L2 (2026-11-27, owner, verbatim): "sobre software: desde niño siepre fu curioso, todos mis seres cercanos recuerdan que desde teprana edad desarmaba todo loo u e encontrara para ver como estaba hecho por dentro. conforme fui creciendo empece a entender mejor, desde juguetes hasta perfumes, empece a entender como volver a armarlos y empece a reparar mis juguetes averiados. desde siempre he mostrado aptitudes creativas, desde musica, tetro, debate, siempre he tenido acercameinto a elo. eso sumado a mi  gusto por el buen diseño me encamino a aprender sobre diseño, produccion audioisual y temas afines, mas adelante conoci la programacion y quede enamorado de ello, para mi era casi un superpoder, ya que era como construir lo que sea qu emi imaginacion pueda crear. y basicamente pr eso me fui por el lado del desarrollo, porque ahi conlfluyen mis pasione sque tuve toda la vida."
- L3: studies and experience on the boards come from the CV, `src/content/experience.json` and the owner's LinkedIn (read 2026-11-27, nothing edited there).
- L4: next step — map the code (page pattern, nav, footer, SEO, dictionary, tests) before T1.
- L6 (2026-11-27): Home band proposed in Figma (`2608:3228`) and approved by the owner ("Approved"). Education rows live in the `experience` collection as group `education` (Home's Experience lists its own groups, so it does not show them). Rise glow not used on About: it depends on the Home hero's seam; the descend glow into Contact is.
- L7: checks. RED seen for `nav.test.ts` (about target undefined) and `seo.test.ts` (no `aboutPageNode` export); GREEN after. `npm run check` exit 0 (105 tests, 0 astro errors, 52 pages, links clean). Captures 1440/768/390 of /about/ and the Home band. Found: at 768 the nav no longer fits (Contact right edge 789 en, 812 pt, 833 es; before About: 728, 738, 758 against a 728 limit). Owner asked for the options.
- L5 (2026-11-27, owner, verbatim): "no inside version is needed. aplica los efectos y trnasiciones presentes en el reto de la pagina. adapta el home para agregar una breve seccion 'about' o similar para enlazar a esta pagina tambien"
