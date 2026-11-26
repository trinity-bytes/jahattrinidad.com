# Owner answers fixes

Objective: implement the owner's answers to the ten post-T4–T6 open questions, as applied to the Figma boards on 2026-11-26.
Branch: `feat/owner-answers-fixes` (from `feat/t3-t7-closeout`). Delivery: ask-on-risk. Test runner: `npm run check` (boundaries, `node --test`, `astro check`, build, link rule) plus Playwright captures at 1440 / 768 / 390.

## Specs

- **S1 — Project hero, tablet and phone.** "hay que corregir ese layout, se ve pesimo en movil. poco espacio y compactado." Approved: "para el hero, opcion A". Below desktop the project hero is text on cream with more air (full-width buttons on phones), and the photo is its own full-strength band under the text. Figma components `2558:1666`, `2558:2305`, `2560:2446`, `2560:3438`.
- **S2 — More project cards.** "esas cardas hay que corregrlas, en mi opinion estan achicadas en vano, la imagen podria ocupar todo ese espacio de los bordes superiores." Approved: "par las cards opcion B". The card is the browser window: the bar with the three dots and the hostname is the card's top edge, the capture fills the full width under it, the body keeps its padding. Figma `2520:50`, `2522:481`.
- **S3 — Small and old projects move to experiments.** "mejor que pase los proectos chicos o iejos a la seccion de experiemtnos". coursera-clone and forest-hero-2 leave More projects and become experiment tiles titled "Coursera Clone" and "Forest Hero 2". Portfolio stays in More projects and shows `jahattrinidad.com` (approved with "aprobado todo").
- **S4 — Notes hero word.** "lo qu eme olesta es justo eso, la palabra notes y cortada innecesariamente. se podria cortar leemente la parte inferiore, pero no todo para uqe siga siendo legible, maas aun en la version movi donde solo se lee NO." The word "Notes" fits the content width at every width, with at most a slight bottom crop. "mejor no usemos la colina cercana": no near hill on the Notes hero. "el resto se ve bien con efecto parallax."
- **S5 — Post sky band.** "en el skyband hay que corregirlo": follows board `2522:1286` (misty sunset with sun and far hills, hard top edge, no dark grass hill, no cream fade).
- **S6 — Keyboard hint.** "en touch no deberia aparecer, en tablet a lo mejor si, porque a veces se usa con teclados pero si se visita solok desdde pantalla touch, no tiene sentido mostrar eso." "Press I anywhere" is hidden on touch-only devices; it shows with a fine pointer, or once a physical key press is seen.
- **S7 — /links/ on phones.** "corregir eso tambien": no ~150 px of empty sky from the board heights used as minimum heights.
- **S8 — Contrast.** "entonces volvamos a medrilos": re-measure HO-09 and HI-04 on the current pixels and report.
- **Pending design (not in this feature):** point 1 lens hint, point 6 filled `/links/` card hover. Each needs a Figma proposal first.

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T1 | S1 | inline | done | fc7daed |
| T2 | S2, S3 | inline | done | 734ecfe |
| T3 | S4, S5 | inline | done | fc7daed |
| T4 | S6, S7 | inline | done | 27fa1df |
| T5 | S8 | inline | done (measured) | docs commit |

## Log

- L1 (2026-11-26, owner): "aprobado todo. procede con el codigo" — after the Figma corrections listed in `openspec/changes/design-audit/tasks.md`, "Owner answers, 2026-11-26".
- L2: S5 correction. The composed post board (`2522:1287`) also shows the footer's dark hill rising over the band; the earlier comparison used the band component alone. The only real difference was the cream fade, now removed. The footer hill stays (it is the footer on every page).
- L3: S3. A live link from the Portfolio card to this site fails the link rule (absolute link to the site) and points at the page the visitor is on, so Portfolio has no `demoUrl`; its bar shows the site hostname, found by the repository name. Experiments keep the `publishDate` order, so Coursera Clone and Forest Hero 2 sit second and third, not last as on the board.
- L4: checks. `npm run check` exit 0 after each commit (95/95 tests, 0 astro errors, links clean). Captures at 390 / 768 / 1440: project hero, Notes hero (en, es), post band, More cards, /links/; no horizontal overflow. S6 checked in two Playwright contexts: desktop shows the "Press I" wording; emulated touch shows the touch wording, and the "Press I" wording after one physical key press.
- L5: S8 measured 2026-11-26 (glyph pixels from a with/without-text capture pair, text colour composited at its effective alpha over the pixel behind; median / p5):
  - HO-09 "Jahat", white on the sky: 1440 3.08 / 2.11, 768 2.96 / 2.64, 390 3.02 / 2.26. Large text needs 3:1: the median sits on the line and fails at 768; p5 fails where the word crosses the sun glow. Still open; the fix is a design decision.
  - HI-04 annotation notes (cream 60 %): every note passes 4.5:1 at every width; lowest p5 4.62 (1440), 5.13 (390), 5.18 (768). Was 2.05–3.61 in the audit. Closed.
