# Code T7 — SEO in code (close-out)

Brief: `prompts/code-t7-seo.md`. Findings: `reports/seo-search-results.md` F1, F3–F8.
The Sonnet worker wrote the code and stopped without a report (WIP commit `832174b`).
The supervisor finished the component edits and reviewed the build on 2026-11-26.

## Items

| Finding | What changed | How checked | Status |
|---|---|---|---|
| F3 `WebSite` JSON-LD | `src/lib/seo.ts`, home views | `dist/index.html`, `es/`, `pt/`: `WebSite` with `@id` `/#website`, `/es/#website`, `/pt/#website` | done |
| F4 titles | `pageTitle()` in `seo.ts`: `<page> — <what it is> · Jahat Trinidad`; a post title longer than 60 characters drops "what it is" | titles of Home, Work, Notes, Links and a project in en/es/pt: 46–58 characters | done |
| F5 descriptions | dictionaries `meta` keys, view frontmatter | 146–157 characters on every page type in en/es/pt, written natively in each locale | done |
| F5 `data-nosnippet` | skip link (`Base.astro`), nav brand (`Nav.astro:39`) | both present in `dist/index.html` | done |
| F6/F7 `Person` | one `@id` `/#person` on every page, `sameAs`, `alternateName`, portrait `ImageObject` 600×600 | JSON-LD parsed on 7 pages of every type | done |
| F7 portrait alt | `Hero.astro` portrait layer `alt={OWNER_NAME}`; new `OWNER_NAME` in `src/lib/consts.ts`, also used by `seo.ts` | `dist/index.html`: one `alt="Jahat Trinidad"` | done |
| F8 schema per page | `BreadcrumbList` on Work, Notes, Links, projects and posts; `BlogPosting` (author and publisher `@id` `/#person`); `CreativeWork` / `SoftwareApplication` on projects | parsed in `dist/` | done |
| F1 IndexNow | `public/e362ae8d0a623331ac836ab1a538ec2b.txt`, `scripts/indexnow.mjs` (`npm run indexnow`, `-- --dry-run`) | not run: it uses the network and only makes sense after the deploy (T8) | done, run pending |

## Decision

- The chat avatar (`contact/Chat.astro:57`) keeps `alt=""`. The owner's name is the visible text right after it, so an alt would make screen readers read the name twice, and a 34 px avatar adds nothing to image search. The brief asked for the alt; the hero portrait carries it instead.

## Open questions

- es writes "Design Engineer" capitalised and en/pt "design engineer" in the descriptions. Both read fine; unify if the owner prefers one.
- Validate one page of each type in Google's Rich Results Test after the deploy (T8): it cannot run against `127.0.0.1`.

## Commands

- `npm run check`: exit 0 (boundaries, tests, `astro check`, 55 pages, link rule).
