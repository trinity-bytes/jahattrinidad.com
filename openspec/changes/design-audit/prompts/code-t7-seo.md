# T7 — SEO in code

Task T7 of `odd/tasks/design-corrections-code.md` (specs S7, S6). Read `prompts/code-common.md` first; every rule there applies (Figma does not matter for this unit). Then `reports/seo-search-results.md` in full: findings F1 and F3–F8 are yours, F2, F9, F10 are owner actions. A second worker (T3, shared controls) works at the same time: respect the shared-file rule below.

## What to build

| Item | What |
|---|---|
| F3 | `WebSite` JSON-LD on each home (`/`, `/es/`, `/pt/`): `name: "Jahat Trinidad"`, `alternateName`, `url`, `inLanguage`, `publisher` → the Person `@id` |
| F4 | Titles `<page> — <what it is> · Jahat Trinidad` on every interior page, from the dictionary, per locale. Project pages use the project name and a short "what it is" from content (`src/lib/content.ts` functions only; add one there if needed). Keep the home title as is unless the report says otherwise. Check lengths (Google cuts around 60 characters): list every title with its length in the report |
| F5 | Meta descriptions of 140–160 characters for every page type in en/es/pt (name, role, what the page holds). Native es (neutral) and pt-BR. `data-nosnippet` on the skip link (`Base.astro`) |
| F6, F7 | `Person` JSON-LD with one `@id` (e.g. `https://jahattrinidad.com/#person`) reused site-wide; `sameAs` every profile from the `links` collection plus the ones the report names that exist there; `knowsAbout`, `alumniOf` only from facts already on the site or in content (never invent); `image` a square portrait (find the portrait asset the home uses; if none is square, say so) |
| F8 | `BreadcrumbList` on every inner page; `BlogPosting` on posts (author = Person `@id`, `datePublished`, `dateModified` when present, `image`, `inLanguage`); `CreativeWork` (or `SoftwareApplication` when the project is an app with a live demo) on project and case-study pages |
| F1 | IndexNow: a key file in `public/` (`<key>.txt` containing the key; generate a random 32-hex key) and a small script `scripts/indexnow.mjs` (only `node:` imports) that reads the built sitemap and posts the URLs to `https://api.indexnow.org/indexnow`; wire it as an npm script `indexnow`, not into `check` or `build`. Do not run it against the network |

Build the JSON-LD with pure functions in `src/lib/seo.ts`, test first in `src/lib/seo.test.ts` (each schema's required fields, the shared `@id`, title format and description length bounds per locale). Base renders one `<script type="application/ld+json">` per graph or one `@graph`, your choice, explained in the report. Validate the output: every page type's JSON-LD parses and its `@id` references resolve within the page.

## Shared-file rule

You edit only the **frontmatter** (between the `---` fences) of `src/pages/_views/*.astro` and `src/pages/notes/[...slug].astro`; T3 edits their markup and styles at the same time. Re-read a file right before each edit. The alt text on the hero portrait and avatar (F7) and `data-nosnippet` on the nav handle (F5) are in component files T3 owns: do not edit them; list each exact change (file, element, attribute) in your report and the supervisor applies it.

## Allowed edit surfaces

src/lib/seo.ts
src/lib/seo.test.ts
src/lib/content.ts
src/lib/i18n.ts
src/lib/dictionaries/es.ts
src/lib/dictionaries/pt.ts
src/layouts/Base.astro
src/pages/_views/*.astro
src/pages/notes/[...slug].astro
src/pages/work/**
src/pages/es/**
src/pages/pt/**
src/pages/index.astro
src/pages/links.astro
public/*.txt
scripts/indexnow.mjs
package.json

## Report

`openspec/changes/design-audit/reports/code-t7-seo.md`: per finding what changed, the JSON-LD of one page per type (pasted, formatted), the title/description table for every page in three locales with lengths, and the component edits for the supervisor.
