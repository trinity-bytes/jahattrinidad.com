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

## Zod 4 string formats are top-level

`astro/zod` is Zod **4**. String format validators moved to the top level:
write `z.url()`, not `z.string().url()`. The chained form still works but is
deprecated, and `astro check` reports a `ts(6385)` hint for every use.

This is worth stating because the archived design and proposal under
`openspec/changes/archive/` were written with the chained form and are
correct as historical records — they are not a style guide. Do not copy
`z.string().url()` out of them.

Same rule for the other formats when they are needed: `z.email()`,
`z.uuid()`, `z.iso.date()`.

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

## D1 is resolved — English-first, Spanish not ruled out

The i18n decision (D1) carried a revisit trigger: reopen it *before* the
first substantial batch of UI copy is written. That trigger fired on
2026-09-18, ahead of the visual-design pass, and D1 was closed:

**English-first. Spanish is expected eventually, so the structure stays.**
No `src/pages/es/` tree and no Spanish dictionary are created until there
is Spanish content to put in them. Do not re-open this decision — it is
settled, not deferred.

What that resolution costs you, from here on, is one standing rule:

**No UI string may be hardcoded into a component.** Every user-visible
string — nav labels, section headings, button text, empty states, aria
labels — goes through the `Dictionary` interface in `src/lib/i18n.ts` and
is read via `getDictionary(lang)`. Every internal link is built with
`localizedPath(lang, path)`, never as a bare string.

This is the entire reason D1 was safe to defer. The expensive,
non-retrofittable parts are already built: `lang` and `translationKey` in
the schemas, the locale-keyed `dictionaries` record, `getDictionary()`
with its `en` fallback, and `prefixDefaultLocale: false` freezing the
English URLs permanently. Adding Spanish later is then one dictionary
object plus content — mechanical. Hardcoding strings during the design
pass is what would turn it back into a refactor of every page.

Prose inside MDX content entries is exempt: that is content, and the
`lang` field on the entry already carries it.

The historical record is `openspec/changes/archive/2026-09-18-portfolio-scaffold/proposal.md`
section D1. Read it for the reasoning, not for the status.

## Visual design lives in Figma — `tokens.css` is a placeholder

The visual design is in progress and is recorded in
`openspec/changes/portfolio-visual-design/`. Read it before any design,
brand, copy, image or UI task:

- `proposal.md` — decisions with the rejected alternatives, and the open
  questions. Start here.
- `design.md` — palette, type, the Outside/Inside model, the hero layer
  composition, and the Figma node map.
- `assets.md` — hero image files and the prompts that generated them.
- `tasks.md` — what is done and what is next.

Three rules follow from it, and they are the ones a session without
context gets wrong:

**`src/styles/tokens.css` is not the brand.** Its neutral and blue values
are scaffold placeholders. The brand is a green ramp plus sun yellow, set
in Epilogue, Hanken Grotesk and IBM Plex Mono. Never derive a color, a
font or an image prompt from `tokens.css`.

**No UI code until the owner approves the hi-fi.** Design proposals are
built in the Figma file (`gq6glEp9QrPOnEyYG9dldh`), beside the current
board, never over it. Do not offer CSS or component code as an
alternative during the design phase.

**`design/` is ignored by git on purpose.** The hero images live in the
Figma file; the local copies are the owner's working files and a fresh
clone does not have them. Do not assume they exist and do not commit
them; `assets.md` says what they are and how to regenerate them.
