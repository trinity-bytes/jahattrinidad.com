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
- Prism, or any syntax highlighter other than Astro's built-in Shiki. Code
  fences are highlighted by Shiki with the custom brand theme passed to
  `markdown.shikiConfig.theme` (visual-design "Code theme").
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
This function only resolves against the `color-scheme` set on the element,
so deleting that declaration silently breaks every color token — no build
error, no lint warning, just colors that stop switching.

The lens is the only source of truth for the scheme, not the OS: `:root`
sets `color-scheme: light` (Outside) and `:root[data-lens="inside"]` sets
`color-scheme: dark` (Inside). Do not reintroduce `light dark` or a
`[data-theme]` hook. If you ever touch `:root` in `tokens.css`, confirm both
declarations survive. (Until task 1.1 of `portfolio-implementation` lands,
the scaffold `tokens.css` still has `color-scheme: light dark`.)

## `lang` is a required parameter in `src/lib/content.ts`

Every function in `src/lib/content.ts` takes `lang` as a required parameter,
except `listLinks()` (the `links` collection is language-agnostic) and
`entrySlug()` (it reads the entry's own `lang`). There is
no default locale value anywhere in that module, on purpose: a default
would let `/es/blog/` silently render English content when the Spanish
counterpart doesn't exist, with no build-time signal that anything is
wrong. Do not add a default value for `lang` to "make the call site
shorter" — the missing argument is meant to be a compile error, not a
silent fallback.

## Languages: en, es, pt (D1 superseded by I7, 2026-11-19)

The site ships in English (unprefixed), Spanish (`/es/`, `es`) and
Portuguese (`/pt/`, `pt-BR`). The record is decision I7 in
`openspec/changes/portfolio-implementation/proposal.md`; the old D1
(English-first) is history.

**No UI string may be hardcoded into a component.** Every user-visible
string — nav labels, section headings, button text, empty states, aria
labels, meta descriptions — goes through the `Dictionary` interface in
`src/lib/i18n.ts` and is read via `getDictionary(lang)`. A new key must be
added to `en` in `i18n.ts` AND to `src/lib/dictionaries/es.ts` and `pt.ts`;
there is no fallback, so a missing one is a type error. Every internal link
is built with `localizedPath(lang, path)` or the path helpers, never as a
bare string.

- Translated entries live in a folder named after their locale
  (`src/content/projects/es/<slug>.mdx`), carry `translationKey: <slug>`,
  and are routed by `entrySlug()`. Never route or link with `entry.id`.
- Page bodies live in `src/pages/_views/`; each locale route is a thin
  wrapper. Add a page once there and three wrappers.
- Posts are English-only for now: every locale's Notes lists the English
  posts (`postsLang`). Chat copy lives in `src/lib/chat/script.<lang>.ts`.

**Do not remove `translate="no"` from `<html>` or the `notranslate` meta in
`Base.astro`.** They stop phones set to Spanish or Portuguese from
machine-translating the English page; the inline locale redirect
(`src/lib/locale-redirect.ts`) sends those visitors to the human
translation instead. Every language link in the nav needs
`data-locale-choice`, or a visitor who picks EN gets redirected back.

Prose inside MDX content entries is exempt from the Dictionary rule: that
is content, and the `lang` field on the entry already carries it.

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

The approved boards no longer match the running site. The **design audit**
in progress (`openspec/changes/design-audit/`, start with `proposal.md`)
keeps an as-built copy of the site on the Figma pages `As built · …`; read
it before any audit, UI review or Figma sync task.

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

## Link arrows say where a link goes

A visitor must know before clicking whether a link stays on the site. The
owner set this on 2026-11-25 after `→` had been used for everything:

- `→` — another page of this site, same tab.
- `←` — back to a listing (All work, All notes). Back goes on the left,
  forward on the right; never put a `←` and a `→` side by side facing each
  other.
- `↗` — leaves the site: a live demo, GitHub, LinkedIn, the CV PDF, RSS.
  Always `target="_blank" rel="noopener noreferrer"` and the
  `common.newTab` note in a `.visually-hidden` span (or in the
  `aria-label` of a logo-only button, which carries no arrow).
- No arrow on in-page actions (copy email, chat buttons, submit) and no
  decorative arrows anywhere.

Hanken Grotesk has no `↗` glyph: use `<Icon name="arrow-up-right" />`.
`scripts/check-links.mjs` reads the built HTML at the end of
`npm run check` and fails on a link that breaks this rule.
