# Exploration: portfolio-scaffold

> Phase: `sdd-explore` · Store: hybrid (Engram `sdd/portfolio-scaffold/explore`, observation #323)
> Independent exploration: the orchestrator deliberately withheld its own recommendations so this phase would reach its conclusions from the requirements and the evidence alone.

## Current State

Greenfield. Branch `remake` is an orphan branch with zero commits; the working tree holds only `.gitignore`, `.atl/` tooling, and `openspec/` (written by `sdd-init`). No `src/`, no `package.json`, no code to read — this exploration reasons from verified Astro 7.3.3 API facts (Engram #313, re-verified this session against docs.astro.build) and the architecture already decided by the user (organization-by-purpose, one dependency rule: `pages -> sections -> content -> ui/lib`), not from existing code.

Verified this session (no contradiction with Engram #313 was found — all facts confirmed):

- `src/content.config.ts` + `defineCollection` from `astro:content` + `glob()`/`file()` from `astro/loaders` is the only supported collection API in Astro 7. The pre-Astro-5 mental model (`src/content/config.ts`, `type: 'content'`) that most training data and older tutorials assume is gone — https://docs.astro.build/en/guides/content-collections/
- `file()` loader requires each JSON entry to carry a unique `id` (array-of-objects form or object-keyed-by-id form) — same URL.
- The `image()` schema helper is used via the function form of `schema`: `schema: ({ image }) => z.object({ cover: image(), ... })` — https://docs.astro.build/en/guides/images/
- Fonts API is stable (top-level `fonts: [...]`, not `experimental.fonts`) — https://docs.astro.build/en/guides/fonts/
- i18n routing: `locales`, `defaultLocale`, `routing.prefixDefaultLocale`, `routing.redirectToDefaultLocale`, `routing.fallbackType`, `fallback` — https://docs.astro.build/en/guides/internationalization/. With `prefixDefaultLocale: false` and no `/es/` pages, Astro generates no empty/stub locale routes — routing is derived per actual page/collection entry, not from a fixed locale x content matrix.

## Affected Areas

Scaffold surface — nothing exists yet; this is what the design phase will create.

- `astro.config.mjs` — `site`, `integrations` (mdx, sitemap), `i18n`, `fonts` (empty placeholder; provider chosen in the design phase, visual design out of scope here)
- `src/content.config.ts` — the content contract (schemas below)
- `src/content/projects/*.mdx`, `src/content/posts/*.mdx`, `src/content/links.json`
- `src/pages/` — English at root (unprefixed, `prefixDefaultLocale: false`), Spanish under `src/pages/es/`
- `src/lib/content.ts` — single centralization for every filter (draft, lang, featured, date ordering) and for computed fields (reading time)
- `src/lib/i18n.ts` — UI-string dictionary + locale-aware link helpers (`astro:i18n`)
- `src/styles/tokens.css` — design-token custom properties

## Approaches

### 1. Styling

| Approach | Pros | Cons | Effort |
|---|---|---|---|
| Tailwind 4 | Fast utility iteration; token system via CSS `@theme` | Two new deps against an explicit "no dependency creep" value; its core ergonomic win (styling colocated with markup, no context switch) is already delivered by Astro's compile-time-scoped `<style>` block in the same `.astro` file, so the strongest Tailwind argument is neutralized in Astro's SFC model | Low |
| Native CSS + design tokens | Zero new dependencies; pairs naturally with Astro's compile-time `<style>` scoping (no specificity fights, no purge step, no runtime); native custom properties + nesting + `@layer` (2026 baseline) deliver token ergonomics without a build tool | More verbose for one-off utility tweaks; the author must self-enforce a spacing/type scale instead of a framework enforcing it | Low |
| Hand-rolled utility-class layer | Some Tailwind-like speed without the dependency | Duplicates what `tokens.css` + scoped styles already give; a second convention to document for no net gain | Medium |

**Recommendation: native CSS + design tokens.** The two things utility-first CSS optimizes for — fast iteration and no separate stylesheet to context-switch to — are already solved by Astro's scoped `<style>` blocks living in the same file as the markup. Tailwind's advantage over plain unscoped CSS (as in React) does not carry over to Astro's component model with equal force.

### 2. i18n strategy

| Approach | Pros | Cons | Effort |
|---|---|---|---|
| (a) Bilingual UI from day 1, per-language content, no parity requirement | i18n is cross-cutting — cheap to build in at genesis, expensive to retrofit (every hardcoded string, every canonical URL, every `<html lang>` would need revisiting); the SEO risk normally attributed to "no parity" (empty/thin stub pages) is verified NOT to occur in Astro's routing model | Real upfront cost: every UI string needs a dictionary lookup from day 1, before any content exists | Medium |
| (b) English only now, routing prepared for later | Less upfront work today | Retrofit later means reconfiguring i18n, backfilling `lang` into existing entries, and converting hardcoded strings into dictionary lookups; `prefixDefaultLocale: false` means committing now costs English's URLs nothing | Low now, high later |

**Recommendation: (a).** The technical risk that normally justifies deferring i18n does not materialize given Astro's per-entry routing, and English's URL is unaffected either way. Route structure: `src/pages/` (English, unprefixed) mirrored under `src/pages/es/`, each dynamic route filtering `getCollection()` by `data.lang` via `lib/content.ts`. Schema cost is one field: `lang: z.enum(['en', 'es'])`.

> **Orchestrator note (recorded for the proposal phase):** the orchestrator's independent analysis reached **(b)** instead. See "Divergence" below. This exploration's own recommendation is left unedited above; the divergence is resolved in `proposal.md`, not by rewriting this artifact.

### 3. Content schemas — frontmatter vs MDX body prose

| Approach | Pros | Cons |
|---|---|---|
| Everything in frontmatter | Fully typed/validated by Zod | Long-form narrative crammed into YAML is unreadable to write, and Zod adds no value beyond `z.string()` for an opaque prose blob |
| Everything in MDX body prose | Natural for narrative | Nothing is queryable/sortable without rendering full MDX — card/list views would need to open every entry's body just to show a teaser |
| **Split (recommended)** | Frontmatter carries only what `lib/content.ts` needs to filter/sort/render cards without a full MDX render; body carries `## Problem`, `## Constraints`, `## Decisions`, `## Alternatives rejected`, `## Outcome` as a documented (not schema-enforced) convention | Body-heading structure is not Zod-validated |

**Recommendation: the split.** Anything that must be filtered, sorted, or shown in a list without opening the full entry belongs in frontmatter; anything read once, in full, on the entry's own page belongs in prose.

## Proposed Schemas

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),        // 1-2 sentence summary — meta description + card teaser
    lang: z.enum(['en', 'es']),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    coverImage: image().optional(),
    coverImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),   // taxonomy: "web app", "cli", "university project"
    stack: z.array(z.string()),              // literal technologies used — distinct from tags
    outcome: z.string().optional(),          // one-line quantified result for cards
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
  }),
});
// MDX body convention (not schema-enforced):
// ## Problem, ## Constraints, ## Decisions, ## Alternatives rejected, ## Outcome

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['en', 'es']),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // NO readingTime field — computed in lib/content.ts from body word count.
    // Same "derive, don't author" principle applied throughout.
  }),
});

const links = defineCollection({
  loader: file('src/content/links.json'),
  schema: z.object({
    id: z.string(),      // required by file() loader as the entry key
    label: z.string(),
    url: z.string().url(),
    icon: z.string(),    // identifier consumed by an inline SVG sprite — no icon-library dep
    order: z.number(),   // explicit sort key — do not rely on fragile JSON array position
  }),
});

export const collections = { projects, posts, links };
```

Field justifications worth calling out:

- `stack` is kept separate from `tags` because tags answer "what kind of project is this" (browsable category) while stack answers "what was it built with" (a distinct badge row a hiring manager scans for).
- `outcome` in frontmatter deliberately duplicates the gist of the body's `## Outcome` section — same rationale as `description`: cards need a teaser without a full render.
- `coverImage` uses the `image()` helper rather than a plain string because it validates the file exists at build time and returns an optimized, type-safe reference; a `z.string()` path would fail later with no Zod-level signal.

## Divergence from the orchestrator's independent analysis

Recorded here because both readings were produced without access to the other, and the proposal phase must resolve them explicitly rather than silently picking one.

| Question | This exploration | Orchestrator | Status |
|---|---|---|---|
| Styling | native CSS + tokens | native CSS + tokens | **agreed** |
| Frontmatter/body split principle | split | split | **agreed** |
| i18n | (a) bilingual day 1 | (b) English now, structure prepared | **open — resolve in proposal** |
| `decisions` / `alternatives rejected` | body prose, documented convention | structured frontmatter array with a required `rejected` field, so Zod fails the build when the alternative is omitted | **open — resolve in proposal** |

Fields present in the orchestrator's schema and absent here, to be considered during `sdd-spec`: `translationKey` (pairs translations, required to emit correct `hreflang`), `canonicalUrl` (cross-posts), `enabled` on links (retire a link without deleting its record), and `role` / `timeframe` / `constraints` on projects.

Also to carry forward: the orchestrator verified in `@astrojs/sitemap@3.7.4` source (`dist/generate-sitemap.js`) that `xhtml:link` alternates are derived from actually-built URLs, not from configured locales, and that a page with no counterpart emits no alternates at all (`if (links.length <= 1) return void 0;`). Enabling the sitemap `i18n` option is therefore a safe no-op until Spanish pages exist. Separately, `i18n.routing.fallback` must NOT be configured: with `fallbackType: 'rewrite'` it serves default-locale content under `/es/` URLs with status 200, which is genuine duplicate content.

## Risks

- **SEO:** any entry that *is* translated should carry `hreflang` alternates. Not needed for routing/schema in this phase — flag for `sdd-design` / `sdd-tasks`. Note this requires a `translationKey`-style field that the schema above does not yet have.
- **Duplication:** mirrored `src/pages/` and `src/pages/es/` route files duplicate `getStaticPaths()` boilerplate per locale — mitigate with a shared path-builder in `lib/content.ts`.
- **Missing tooling:** `node scripts/check-boundaries.mjs` (the dependency-rule checker referenced in `openspec/config.yaml`'s verify gate) does not exist yet. Writing it is real scope, not just a `package.json` script.
- **Contact form (future phase, affects structure):** on a static site every client-side `fetch` exposes any embedded key in the shipped bundle. A private API key requires a server-side function, which the current static-only, no-adapter constraint forbids without a new proposal. The compliant path is a form backend explicitly designed to accept a publishable client key sent from a static page. Never embed a private key client-side under any circumstance.
- **Fonts:** `fonts: []` can be scaffolded empty now; provider selection is a visual-design decision, out of scope for this phase.

## Ready for Proposal

Yes, with two open questions (i18n strategy, decisions-field placement) to be resolved explicitly in `proposal.md`.
