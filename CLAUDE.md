# CLAUDE.md — jahattrinidad.com

Project instructions for any AI session working in this repository. This
project is built across sessions with partial context, so the rules below
are the ones that must survive a session that does not remember why they
exist.

## The single call site for content access

`getCollection()`, `getEntry()`, and `render()` from `astro:content` MUST be
called from exactly one file: `src/lib/content.ts`. No page, layout, or
component may import any of them directly. `scripts/check-boundaries.mjs`
enforces this mechanically on every `npm run check` and fails the build on
a violation.

If you need data from a collection, call one of the exported functions in
`src/lib/content.ts` (`listProjects`, `listPosts`, `listLinks`, `getProject`,
`getPost`, `projectRoutes`, `postRoutes`, `getTranslationGroup`,
`getReadingTime`, `renderEntry`). If the function you need does not exist
yet, add it there — do not reach around it.

## Forbidden libraries

Do not add any of the following as a dependency, for any reason, without an
explicit new decision recorded in `openspec/`:

- Standalone `zod` — use `astro/zod` (re-exported by Astro, already covers
  every schema need in `src/content.config.ts`).
- Tailwind CSS.
- `@fontsource/*` or any Google Fonts CDN link.
- Prism (or any other syntax highlighter) — MDX code fences render as plain
  `<pre><code>`, unhighlighted, by design.
- `@astrojs/markdown-remark` as a direct dependency.
- Any `@astrojs/*-adapter` (Node, Vercel, Cloudflare, etc.) — this project
  is `output: 'static'`, no server runtime.

`scripts/check-boundaries.mjs` itself imports only `node:fs` and
`node:path` — zero dependencies. Keep it that way.

## No DDD, no repository pattern

This project deliberately does not use Domain-Driven Design layering or a
repository-pattern abstraction over content access. There are no invariants
to protect beyond what Zod schemas in `src/content.config.ts` already
enforce, and `src/lib/content.ts` is already the seam a future content-source
change (e.g. a headless CMS) would absorb into. Adding a repository
interface on top of it would wrap one seam in another for no behavior
gained — do not introduce one.

## `src/lib/` vs `src/components/ui/`

- `src/lib/` is **project-aware**: `content.ts` knows this project's
  collections, `i18n.ts` knows this project's dictionary, `seo.ts` knows
  this project's URL shape.
- `src/components/ui/` is **project-agnostic**: a component there must stay
  portable. The test is literal: *could this be copied into another project
  and still work?* If a `ui/` component needs anything from `src/lib/`, it
  is misclassified — either the helper belongs beside the component in
  `ui/`, or the component belongs in `src/components/content/`.

`scripts/check-boundaries.mjs` enforces this: `src/components/ui/` MUST NOT
import `astro:content` (in any form, including `import type`), `astro:i18n`,
or anything from `src/lib/`.

## `light-dark()` requires `color-scheme` on `:root`

`src/styles/tokens.css` uses `light-dark()` for every semantic color alias.
This function only resolves against the light/dark values the browser
actually offers, which requires `color-scheme: light dark;` to be set on
`:root`. Deleting that one declaration silently breaks every color token —
no build error, no lint warning, just colors that stop switching with the
user's OS/browser preference. If you ever touch `:root` in `tokens.css`,
confirm that line survives.

## `lang` is a required parameter in `src/lib/content.ts`

Every function in `src/lib/content.ts` takes `lang` as a required parameter,
except `listLinks()` (the `links` collection is language-agnostic). There is
no default locale value anywhere in that module, on purpose: a default
would let `/es/blog/` silently render English content when the Spanish
counterpart doesn't exist, with no build-time signal that anything is
wrong. Do not add a default value for `lang` to "make the call site
shorter" — the missing argument is meant to be a compile error, not a
silent fallback.

## The D1 revisit trigger

The English-only-for-now i18n decision (D1) was made with an explicit
condition attached, not as a closed decision:

> Reopen the English-only-now i18n decision (D1) before the first
> substantial batch of UI copy is written, not after — that is the moment
> the cross-cutting i18n argument acquires real force, and the last cheap
> moment to act on it.

If you are about to write a meaningful volume of new UI copy (page titles,
nav labels, marketing/narrative text — not a handful of structural
headings), stop and re-read `openspec/changes/portfolio-scaffold/proposal.md`
section D1 first. This most plausibly applies to a future visual-design
pass, which is explicitly out of scope for the current scaffold.
