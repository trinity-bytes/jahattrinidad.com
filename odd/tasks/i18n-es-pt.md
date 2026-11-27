Objective: Spanish and Portuguese versions of the site (UI, projects, experience); posts stay English for now.
Branch: feat/i18n-es-pt (from main). Delivery: ask-on-risk. Test runner: `npm run check` (boundaries + node --test + astro check + build).

## Specs

- S1 — L1: "quiero que imlementemos las traudcciones en español y portugues."
- S2 — Content scope, owner: "proyectos y experiencia si, pero post no todavia." Projects and experience get ES and PT versions; posts do not.
- S3 — Owner: "el figma va a estar siemrpe en ingles, la traduccion va en la web". Figma stays English; translations live only in the site.
- S4 — Owner: "el selector de idioma ya esta diseñado en el figma. en el navbar". Implement the `EN / ES / PT` switch of Nav set `2185:122` (IBM Plex Mono, current locale underlined, all four Nav states). The mobile menu board `2349:86` does not show it; assumption: place it in the menu sheet with the same style.
- S5 — Routes: English stays unprefixed; `/es/` and `/pt/` mirror Home, Work, case studies, Notes index and Links. Each page has hreflang alternates to its counterparts.
- S6 — Assumption: Spanish is neutral Latin American (tú); Portuguese is Brazilian (você). Proper nouns, product names, code, file paths and tech names stay as-is.
- S7 — Assumption (posts not translated): `/es/notes/` and `/pt/notes/` and the Home Notes section list the English posts, linking to their English pages. No `/es/notes/<slug>/` pages.
- S8 — Per-page OG images are rendered for every locale's case studies.

## Tasks

- [x] T1 (S1, S5, S6) Foundation: `pt` locale in config, schema, types, BCP47, sitemap; slug helpers for locale-foldered entries; dictionary registry; chat copy registry. Route: inline (parent). Commit 669c155.
- [x] T2 (S1, S6) ES and PT dictionaries + chat scripts. Route: delegated, Codex `dict` (parallel unit, disjoint surface, user asked for Codex via Herdr).
- [x] T3 (S2, S6) ES and PT project MDX + experience entries + `translationKey` on EN projects. Route: delegated, Codex `content` (parallel unit, disjoint surface).
- [x] T4 (S4, S5, S7, S8) Routes for es/pt, language switch, alternates, OG per locale. Route: inline (parent).
- [x] T5 Record the decision in openspec and update CLAUDE.md (D1 superseded). Route: inline.

## Log

- L1 (2026-11-19): "quiero que imlementemos las traudcciones en español y portugues. revisa que se necesita y puedes lanzar agntes codex con herdr para que te ayuden a implementarlo"
- L2 (2026-11-19): "proyectos y experiencia si, pero post no todavia."
- L3 (2026-11-19): "nono, el figma va a estar siemrpe en ingles, la traduccion va en la web"
- L4 (2026-11-19): "el selector de idioma ya esta diseñado en el figma. en el navbar"
- L5 (2026-11-19): T1–T4 in 669c155, T5 in 56b55b2. `npm run check` green (22 tests, 0 errors, 25 pages). Fixes found on the way: `@astrojs/sitemap` rejects `es-419` and silently skipped the sitemap, so the Spanish tag is `es`; the chat engine matched English keywords only (added es/pt, with test); es/pt detail chips now submit their translated text. Differential check against main: English pages differ only by the switch, hreflang alternates and CSS chunk order; the sitemap loses no URL. Visual check: /es/work/viora/ at 1440 and the /pt/ mobile menu at 390.
