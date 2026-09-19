# Tasks: portfolio-scaffold

> Phase: `sdd-tasks` · Store: hybrid (`openspec/changes/portfolio-scaffold/tasks.md` + Engram `sdd/portfolio-scaffold/tasks`)
> Authority: `design.md` (implementation authority, function signatures, checker algorithm, token system), `specs/*/spec.md` (four capabilities, every scenario traced below), `proposal.md` (scope, Success Criteria, Delivery).
> Verification gate (`strict_tdd: false`, no test runner planned): `npx astro check`, `npx astro build`, `node scripts/check-boundaries.mjs`, wired as `npm run check`.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1100–1300 (additions + deletions, authored; excludes `package-lock.json`, `.astro/` generated types, `dist/`) |
| 400-line budget risk | High |
| Chained PRs recommended | No |
| Suggested split | Single PR (`size:exception`) — 8 work-unit commits inside it |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High

**Why High is honest, not padded.** This is a from-zero project scaffold (proposal Delivery section, pre-accepted `single-pr`). None of the 8 phases below produce a working, buildable site in isolation — config without content doesn't validate, content without `lib/` can't be read, routes without `lib/` don't exist, and the boundary checker has nothing to check without the rest of the tree. The proposal already commits to `size:exception` rather than chaining; this forecast confirms the number that decision was made against.

### Per-phase line estimate

| Phase | Files | Est. lines |
|---|---|---|
| 1. Scaffold + config | `package.json`, `tsconfig.json`, `.gitignore`, `astro.config.mjs` | ~60 |
| 2. Content contract | `src/content.config.ts` | ~70 |
| 3. Seed content | 2× `projects/*.mdx`, 2× `posts/*.mdx`, `links.json`, 1 placeholder cover image reference | ~160 |
| 4. `lib/` | `content.ts` (~150), `i18n.ts` (~40), `seo.ts` (~90), `consts.ts` (~20) | ~300 |
| 5. Layout + routes | `Base.astro`, 6 pages, `rss.xml.ts` | ~285 |
| 6. Tokens | `src/styles/tokens.css` | ~90 |
| 7. Guards | `check-boundaries.mjs` (~180, real implementation of the §5 algorithm — the design's "~40 lines" is a contract statement, not a line-count ceiling), `CLAUDE.md` (~60) | ~240 |
| 8. Verification | Negative tests (N1–N4) are introduced and reverted — net zero persistent diff, unless the `renderEntry()` fallback (8.1) is triggered, in which case it folds into Phase 7's commit | ~0 (contingent) |
| **Total** | | **~1100–1300** |

### Suggested Work Units

All units land in the same single PR (`size:exception`, pre-accepted in the proposal). They are commit boundaries for reviewability (per `work-unit-commits`), not PR boundaries — do not open separate PRs for them.

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Scaffold + config (Phase 1) | Single PR, commit 1 | `npx astro check` (config parses) | N/A — no application code exists yet to exercise | Delete `package.json`, `tsconfig.json`, `.gitignore`, `astro.config.mjs`; nothing depends on this unit yet |
| 2 | Content contract (Phase 2) | Single PR, commit 2 | `npx astro check` (schema types compile) | N/A — no content or readers exist yet | Revert `src/content.config.ts`; no other file imports it yet |
| 3 | Seed content (Phase 3) | Single PR, commit 3 | `npx astro build` (Zod validates all seed entries) | N/A — no page reads content yet, entries only validate | Delete `src/content/projects/*.mdx`, `posts/*.mdx`, `links.json`, cover image |
| 4 | `src/lib/` (Phase 4) | Single PR, commit 4 | `npx astro check` (all functions type-check) | N/A — no caller exists yet; exercised once Unit 5 lands | Delete `src/lib/content.ts`, `i18n.ts`, `seo.ts`, `consts.ts` |
| 5 | Layout + routes (Phase 5) | Single PR, commit 5 | `npx astro build` (all 6 routes + RSS render) | `npx astro dev` — manually browse `/`, `/projects`, `/projects/<slug>`, `/blog`, `/blog/<slug>`, `/links` | Delete `src/layouts/Base.astro`, `src/pages/**`, `src/pages/rss.xml.ts` |
| 6 | Tokens (Phase 6) | Single PR, commit 6 | `npx astro build` (no CSS errors) | N/A — custom properties only, nothing to exercise beyond compilation | Delete `src/styles/tokens.css` and its one `import` line in `Base.astro` |
| 7 | Guards (Phase 7) | Single PR, commit 7 | `node scripts/check-boundaries.mjs` (exit 0 on shipped tree) | N/A — static analysis script has no runtime scenario | Delete `scripts/check-boundaries.mjs`, revert the `check` script in `package.json`, delete `CLAUDE.md` |
| 8 | Full gate + negative verifications (Phase 8) | Single PR, commit 8 (verification-only; folds in the `renderEntry()` fallback from 8.1 if triggered) | `npm run check` (all three gates, exit 0) | `npx astro dev` + the four introduce-confirm-revert negative tests (N1–N4) | N/A — this unit is verification; any persistent diff it produces (the D3 fallback) is a one-line addition to Phase 7's checker file |

---

## Important Decision Checkpoint — carried forward from design.md, not a footnote

**D1 revisit trigger.** The proposal decided (b) — English-only now, i18n structure already in place — with an explicit condition: *reopen D1 before the first substantial batch of UI copy is written, not after.* Task **5.0** below is that checkpoint. It is a real gate, not a comment: do not write page titles, labels, or nav text in Phase 5 until 5.0 is checked off with its outcome recorded. This same trigger is restated in `CLAUDE.md` (task 7.4) so it survives past this file into the running project.

---

## Phase 1: Scaffold + Config

- [x] 1.1 Create `package.json` — `"type": "module"`, `engines.node: ">=22.12.0"`, scripts `dev`/`build`/`preview`/`check` (the `check` script chains `node scripts/check-boundaries.mjs && astro check && astro build`, cheapest-first per design §3), dependencies exactly `astro@7.3.3`, `@astrojs/mdx@8.0.1`, `@astrojs/sitemap@3.7.4`, `@astrojs/rss@4.0.19` — nothing else. Traces: `project-scaffold` — Allowed-Dependency Policy, `npm run check` Verification Gate. **Outcome**: created as specified. **Blocker discovered** (see apply-progress and phase report): `npx astro check` — one of the three commands this script chains — hard-requires the packages `@astrojs/check` and `typescript` to be installed; it refuses to run at all without them (confirmed interactively, see 8.2 note). Neither package is in the approved dependency list. The script text is written per spec; whether it can actually execute end-to-end is blocked pending a dependency-policy decision.
- [x] 1.2 Create `tsconfig.json` — `"extends": "astro/tsconfigs/strict"` (D13, not `strictest`), `"include": [".astro/types.d.ts", "**/*"]`, `"exclude": ["dist"]`, no `paths` entry (D12). Traces: `project-scaffold` — TypeScript Strict Mode.
- [x] 1.3 Create `.gitignore` — `node_modules`, `dist`, `.astro`, `.env*`. **Outcome**: appended to the existing file (which already had `.atl/` from tooling); did not remove the pre-existing entry.
- [x] 1.4 Create `astro.config.mjs` — `site: 'https://jahattrinidad.com'`, `output: 'static'`, no adapter, `trailingSlash: 'always'` + `build: { format: 'directory' }` (D11, explicit not inferred), `i18n: { locales: ['en','es'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } }` with **no `fallback` key** (spec-mandated absence), `integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-ES' } } })]`, `fonts: []`. Traces: `project-scaffold` — Static Project Skeleton, No Server Adapter, Empty Fonts Placeholder; `i18n-routing` — Locale Configuration, Frozen English URL Guarantee, `fallback` MUST NOT Be Configured, Sitemap I18n Behavior. **Open question resolved**: ran `npx astro build` (which parses/validates the full config) with `fonts: []` present — it completed without any config-validation error, confirming Astro 7.3.3 accepts an empty `fonts: []` array. Kept the key as specified; no fallback needed.
- [x] 1.5 Run `npm install` to materialize `node_modules` and generate `package-lock.json` (generated file, excluded from the review-budget line count). **Outcome**: ran clean — 203 packages added, 0 vulnerabilities. `package.json` `dependencies` contains exactly the four approved packages, nothing else. One informational npm warning about `esbuild@0.28.2`'s postinstall script not yet covered by `allowScripts` (npm's new install-scripts gate) — no action taken, does not affect the dependency list. Confirmed no extraneous top-level `dependencies` entries.

## Phase 2: Content Contract

- [ ] 2.1 Create `src/content.config.ts` — `const LOCALES = ['en','es'] as const`; three `defineCollection` blocks per design §8: `projects` (`glob()` over `src/content/projects/**/*.mdx`, function-form schema using `image()`, fields `title, description, lang, translationKey?, publishDate, updatedDate?, draft(default false), featured(default false), coverImage?(image()), coverImageAlt?, tags(default []), stack, role, timeframe, constraints(default []), outcome?, repoUrl?, demoUrl?, decisions(default [])` with each `decisions[]` item requiring `choice, rejected, because`); `posts` (`glob()` over `src/content/posts/**/*.mdx`, fields `title, description, lang, translationKey?, publishDate, updatedDate?, draft(default false), tags(default []), canonicalUrl?`, explicitly **no** `readingTime` field); `links` (`file('src/content/links.json')`, fields `id, label, url, icon, order, enabled(default true)`). All schemas import `z` from `astro/zod`, never standalone `zod`. Traces: `content-model` — Three Typed Content Collections, Projects Collection Schema, Posts Collection Schema, Links Collection Schema, Rejected-Alternative Forcing Function on `decisions[]`.
- [ ] 2.2 Verify by inspection that no field named `readingTime` (or equivalent authored duration/word-count field) exists anywhere in the `posts` schema written in 2.1. Traces: `content-model` — Reading Time Is Never Authored In Frontmatter (this is a static self-check against the file just written, cheaper than deferring it to Phase 8).
- [ ] 2.3 Verify by inspection that `decisions[].rejected` has no `.optional()` or default applied at the item level (only the outer array has `.default([])`). Traces: `content-model` — Rejected-Alternative Forcing Function (D2); this is the field the negative test in task 8.5 exercises at build time.

## Phase 3: Seed Content

- [ ] 3.1 Create `src/content/projects/<entry-a>.mdx` — sets only the required minimum: `title, description, lang: 'en', publishDate, stack`. MDX body may be short/placeholder prose. Traces: `content-model` — A Minimal Valid Entry Builds (projects).
- [ ] 3.2 Create `src/content/projects/<entry-b>.mdx` — sets **every remaining field**: `translationKey`, `updatedDate`, `draft: false`, `featured: true`, `coverImage` (path to the asset created in 3.3), `coverImageAlt`, `tags`, `role`, `timeframe`, `constraints`, `outcome`, `repoUrl`, `demoUrl`, and at least one fully specified `decisions[]` item (`choice`, `rejected`, `because` all present). MDX body structured under `## Problem`, `## Constraints`, `## Decisions`, `## Outcome` per the documented (not schema-enforced) convention. Traces: `content-model` — Projects Seed Entries Cover Every Field Between Them; D2.
- [ ] 3.3 Add the cover image asset referenced by entry-b's `coverImage` path (e.g. `src/content/projects/cover.jpg`, any small placeholder image) so the `image()` helper resolves it at build time. Traces: `content-model` — An Entry With An Unresolvable Cover Image Fails At Build Time (this task is what makes the *positive* case pass; the negative case is exercised separately if desired, not required by proposal Success Criteria).
- [ ] 3.4 Create `src/content/posts/<entry-a>.mdx` — sets only the required minimum: `title, description, lang: 'en', publishDate`. Traces: `content-model` — A Minimal Valid Entry Builds (posts).
- [ ] 3.5 Create `src/content/posts/<entry-b>.mdx` — sets every remaining field: `translationKey`, `updatedDate`, `tags`, `canonicalUrl`, `draft: false`. MDX body long enough to produce a non-trivial reading-time computation (exercises `getReadingTime()` from task 4.2 meaningfully). Traces: `content-model` — Posts Seed Entries Cover Every Field Between Them.
- [ ] 3.6 Create `src/content/links.json` — two entries with unique `id` values, all fields set (`label, url, icon, order, enabled`); at least one entry sets `enabled: false` to exercise the retirement path; `order` values distinct so ordering-by-field (not array position) is actually observable. Traces: `content-model` — Links Seed Entries Cover Every Field Between Them, A Disabled Link Still Loads But Is Marked Inactive.

## Phase 4: `src/lib/`

- [ ] 4.1 Create `src/lib/consts.ts` — shared constants consumed by `content.ts` and `seo.ts`: `ROUTE_BASE = { projects: 'projects', posts: 'blog' } as const` (design §4, the one place `posts`/`blog` divergence lives), `BCP47 = { en: 'en-US', es: 'es-ES' } as const`. Add a code comment stating that `astro.config.mjs`'s `sitemap({ i18n: { locales } })` must mirror this `BCP47` map **literally** because `astro.config.mjs` cannot import from `src/` (design §16 risk: "BCP-47 locale tags drift between `seo.ts` and `astro.config.mjs`") — this task reduces that risk from two independent copies to one shared copy plus one unavoidable literal mirror, and the comment is what keeps a future session from missing the mirror requirement.
- [ ] 4.2 Create `src/lib/content.ts` — the seam. Export types `Locale`, `Project`, `Post`, `Link`, `TranslatableCollection`, `ListOptions`, `ProjectListOptions`, `PostListItem`, `TranslationLink`, `EntryRoute<E>` per design §4. Implement the draft gate `const INCLUDE_DRAFTS = import.meta.env.DEV` and `isVisible()` (D4), applied by every listing/lookup function. Implement `listProjects`, `listPosts`, `listLinks`, `getProject`, `getPost`, `projectRoutes`, `postRoutes`, `getTranslationGroup`, `getReadingTime`, `renderEntry` with the exact signatures in design §4's function table. `lang` is a **required** parameter everywhere except `listLinks()` (D5; no default value anywhere in the module). `getTranslationGroup()` returns the full group including self (length 1 = no counterpart, D9) and **throws** naming both entry ids when two members share a `lang` (D9). `getReadingTime()` uses the exact regex-strip algorithm from design §4 (fenced code, inline code, MDX import/export lines, HTML/JSX tags, link/image syntax stripped before the word count; `Math.max(1, Math.round(words / 200))`). This is the **only** file in the project that value-imports `getCollection`, `getEntry`, or `render` from `astro:content`. Traces: `architecture-boundaries` — Single Call Site for Content Access; `content-model` — Derived Fields Are Computed, Never Authored; `i18n-routing` — `translationKey` Pairing.
- [ ] 4.3 Implement `renderEntry()` as a thin wrapper around `render()` imported from `astro:content` (D3), inside `content.ts` from 4.2 — do not implement it as a separate file. **Flag explicitly**: this is asserted correct by design, not verified, because no scaffold existed at design time to test `render()` behind a wrapper in a different module. Verification happens at task **8.1**, at the first successful `astro build`; if it fails, the fallback (allow-list `render` in `check-boundaries.mjs`, see 8.1) is applied there, not here.
- [ ] 4.4 Create `src/lib/i18n.ts` — the UI-string dictionary shape (populated for `en` only; D1 creates no Spanish strings) and locale-aware link helper(s) built over `astro:i18n`. No collection access in this file (it is not the seam).
- [ ] 4.5 Create `src/lib/seo.ts` — pure module, no `await`, no `astro:content` import of any kind (D8). Export `absoluteUrl(path, site)` (single leading slash, collapsed repeats, file-segment detection by `.` in the last path segment, trailing slash otherwise per D11) and `buildSeo(input)` per design §7: `canonicalOverride` present → canonical = override verbatim, alternates = `[]` (D10, hard stop); otherwise canonical = `absoluteUrl(path, site)`; alternates = `[]` when `canonicalOverride` is set or `!group || group.length <= 1` (D9, mirrors `@astrojs/sitemap`'s `createGetI18nLinks()`), else one `{hrefLang, href}` per group member plus `x-default` pointing at the `en` member's href, using the `BCP47` map from `consts.ts` (task 4.1). Traces: `i18n-routing` — `hreflang` Emission Rule, all three scenarios.

## Phase 5: Layout + Routes

- [ ] 5.0 **D1 REVISIT CHECKPOINT — do this before writing any page title, label, or nav string below.** Re-read `proposal.md` §D1. Confirm whether the English-only-now / structure-in-place decision still holds now that this phase is about to produce the first UI copy in the project. Record the outcome inline in this checkbox (`confirmed — proceeding English-only` or `reopened — see <note>`). If reopened, **stop this phase** and route back through `sdd-propose` for a D1 amendment before writing 5.1 onward; do not silently proceed past a reopened decision.
- [ ] 5.1 Create `src/layouts/Base.astro` — document shell only: `<!doctype html>`, `<html lang={...}>`, `<head>` fed by a `SeoResult` prop from `seo.ts` (canonical `<link>`, mapped `alternates` as `<link rel="alternate" hreflang>`), imports `../styles/tokens.css` (the **only** file that imports it), one `<slot />`. Zero visual styling beyond the tokens import. Traces: `i18n-routing` — `hreflang` alternate emission is centralized in one file (design §7 "Emission site"); Orchestrator Decision #1 (`Base.astro` approved as document shell, not visual layout).
- [ ] 5.2 Create `src/pages/index.astro` — home page: featured projects (`listProjects({ lang: 'en', featuredOnly: true })`) + recent posts (`listPosts({ lang: 'en', order: 'newest', limit: ... })`), both via `lib/content.ts` only. Traces: `project-scaffold` — Every Route Is Present In The Build Output.
- [ ] 5.3 Create `src/pages/projects/index.astro` — full project list via `listProjects({ lang: 'en' })`; each listed item links to its own detail route. Traces: `project-scaffold` — List Routes Reflect Their Collections (projects half).
- [ ] 5.4 Create `src/pages/projects/[...slug].astro` — `getStaticPaths()` returns `projectRoutes('en')`; the page calls `getReadingTime` is **not** applicable here (projects don't have reading time — posts do; do not import it), calls `getTranslationGroup('projects', entry)`, `buildSeo(...)`, and `renderEntry(entry)`, then renders through `<Base seo={...}><Content /></Base>`. Traces: `project-scaffold` — one detail page per non-draft `projects` entry; `i18n-routing` — `hreflang` emitted only when a counterpart exists.
- [ ] 5.5 Create `src/pages/blog/index.astro` — full post list via `listPosts({ lang: 'en' })`, rendering each `PostListItem`'s `readingTime` alongside its entry. Traces: `project-scaffold` — List Routes Reflect Their Collections (posts half).
- [ ] 5.6 Create `src/pages/blog/[...slug].astro` — `getStaticPaths()` returns `postRoutes('en')`; calls `getReadingTime(entry)`, `getTranslationGroup('posts', entry)`, `buildSeo(...)` (passing `canonicalOverride: entry.data.canonicalUrl` when present, D10), and `renderEntry(entry)`. Traces: `project-scaffold` — one detail page per non-draft `posts` entry; `i18n-routing` — `hreflang` rule, `canonicalUrl` override suppresses alternates (D10).
- [ ] 5.7 Create `src/pages/links.astro` — `listLinks()` only (no `lang` argument, D5 exception); renders only `enabled: true` entries, ordered by `data.order` ascending, not array position. Traces: `project-scaffold` — The Links Page Is Driven By The JSON File.
- [ ] 5.8 Create `src/pages/rss.xml.ts` — per design §6 verbatim structure: locale-dependent values isolated in one `LOCALE`/`FEED` block, `GET(context)` throws if `context.site` is undefined (no `!` assertion), calls `listPosts({ lang: 'en' })` from `lib/content.ts` (never `getCollection` directly — B1 catches it if violated), builds item links via `absoluteUrl()` from `seo.ts`, description-only feed (no sanitized full content, per design §6's rejected-dependency rationale). Traces: `i18n-routing` — English-Only RSS Feed, all three scenarios; `architecture-boundaries` — a page (this file) may call `lib/content.ts` but not `getCollection`/`getEntry` directly.
- [ ] 5.9 Create `src/components/{ui,content,sections}/` as empty directories (no files yet) so the boundary checker's layer table has real paths to point at, per design §11's file list. This does not create any component; it is directory scaffolding for Phase 7's checker to classify against.

## Phase 6: Tokens

- [ ] 6.1 Create `src/styles/tokens.css` per design §9 verbatim structure: `@layer tokens, base, components, utilities;` (empty, cascade order reserved), `:root { color-scheme: light dark; ... }` with the neutral + accent primitive ramps, semantic aliases using `light-dark()` for every color token (D14), the static spacing scale (`--space-3xs` … `--space-3xl`), the fluid type scale via `clamp()` (`--font-size-xs` … `--font-size-3xl`), line-height tokens, structural tokens (`--measure`, `--radius-*`, `--border-width`), font-family placeholders (`--font-sans`, `--font-mono`), and the `[data-theme='light'|'dark']` manual-override hooks. No selectors beyond `:root` and the two theme hooks — no component styles, no layout, no chosen palette identity beyond the raw ramps. Traces: `project-scaffold` — Base Design Tokens Only.
- [ ] 6.2 Confirm by inspection that `tokens.css` is imported exactly once, from `src/layouts/Base.astro` (task 5.1) and nowhere else in the project. Traces: `project-scaffold` — No CSS Beyond Tokens.

## Phase 7: Guards

- [ ] 7.1 Create `scripts/check-boundaries.mjs` — `node:fs` + `node:path` only, zero dependencies. Implement design §5 exactly: **Step 1** enumerate `src/**` files with `.astro/.ts/.tsx/.mjs/.js/.mdx` extensions using `readdirSync('src', { recursive: true, withFileTypes: true })`; **Step 2** classify each file into one of the 8 layers (`seam`, `lib`, `ui`, `content`, `sections`, `layouts`, `pages`, `entry`) by longest-prefix-first match, with `src/lib/content.ts` (exact file) overriding the general `lib` prefix; **Step 3** extract imports with the four line-anchored regexes (`FROM_RE`, `BARE_RE`, `DYNAMIC_RE`, `GLOB_RE`), scanning `.astro` files frontmatter-only (between the leading `---` fences, with line-offset tracking for accurate error reporting), treating a statement as type-only only when it literally starts with `import type`/`export type` (the mixed inline form is a deliberate false positive, per design); **Step 4** resolve each specifier to an extension-insensitive repo-relative key, skipping `.css` specifiers unconditionally; **Step 5** apply the full forbidden-import matrix from design §5 (rules B1–B4, all 9 layer rows including the "any layer except seam" bypass-closer row for `import('astro:content')` and `import.meta.glob(`); **Step 6** report every violation (not short-circuited after the first) with `rule id / file:line / stmt / fix`, and exit `0` (clean), `1` (violations found), or `2` (checker itself failed — unreadable `src/`, bad invocation — written to `stderr`, kept distinct from exit `1`). Traces: `architecture-boundaries` — every requirement in the spec (Single Call Site, Directional Dependency Rule, `ui/` No `astro:content` Even As Type, `content/` May `import type`, `sections/` Receive Props Only, Mechanized Enforcement, Zero Runtime Dependencies).
- [ ] 7.2 Confirm `package.json`'s `check` script (written in 1.1) runs `node scripts/check-boundaries.mjs && astro check && astro build` in that exact order — boundary check first because it is the fastest signal (no build required), so a violation is caught in milliseconds instead of after a full type-check and build. Traces: `project-scaffold` — `npm run check` Verification Gate, All Three Gates Run In Order.
- [ ] 7.3 Create `CLAUDE.md` at the repository root covering, verbatim as testable statements: (a) `getCollection()`/`getEntry()`/`render()` from `astro:content` are called from exactly one file, `src/lib/content.ts`; (b) the forbidden library list — standalone `zod`, Tailwind, `@fontsource`, Google Fonts CDN, Prism, `@astrojs/markdown-remark`, any adapter; (c) the no-DDD / no-repository-pattern decision and its rationale (no invariants to protect, `content.ts` is already the seam a future content-source change would absorb); (d) the `src/lib/` (project-aware) vs `src/components/ui/` (project-agnostic, portable) classification heuristic — "could this be copied into another project and still work?"; (e) `light-dark()` requires `color-scheme` set on `:root` — deleting that line silently breaks every color token; (f) `lang` is a required parameter in every `lib/content.ts` function except `listLinks()`, with the specific failure mode named (a default value would let `/es/blog/` render English content silently, with no build-time signal) — D5's rationale, not just its rule; (g) **the D1 revisit trigger, verbatim**: "Reopen the English-only-now i18n decision (D1) before the first substantial batch of UI copy is written, not after — that is the moment the cross-cutting i18n argument acquires real force, and the last cheap moment to act on it." Traces: `project-scaffold` — Root `CLAUDE.md` Project Instructions.

## Phase 8: Verification

- [ ] 8.1 Run `npx astro build` for the **first time** in this project. This is the checkpoint named in design §2 (D3) and carried forward by the orchestrator: `renderEntry()` wrapping `render()` from `astro:content` inside `lib/content.ts` is asserted correct, not verified, until this exact moment. **If the build succeeds and detail pages render their MDX content correctly** (spot-check `/projects/<slug>` and `/blog/<slug>` output HTML for rendered body content, not empty), record this task as confirming D3's assertion. **If `render()` misbehaves through the wrapper**, apply the documented fallback immediately: add one allow-list entry to `scripts/check-boundaries.mjs` (task 7.1) permitting `render` — and only `render` — to be imported directly from `astro:content` in `pages/` and `src/components/content/`, update `lib/content.ts` accordingly, and re-run this task until it passes. Either outcome must be recorded in this checkbox before Phase 8 continues.
- [ ] 8.2 Run `npx astro check` — confirm it reports zero errors under TypeScript `strict`. Traces: `project-scaffold` — Strict Diagnostics Pass Clean.
- [ ] 8.3 Run `node scripts/check-boundaries.mjs` on the shipped tree as-is — confirm exit code `0`. Traces: `architecture-boundaries` — The Script Passes Clean On The Shipped Scaffold (first of the checker's **two** success criteria — the second is task 8.4).
- [ ] 8.4 **Boundary checker negative test (N1) — mandatory second success criterion, introduce-confirm-revert.** Temporarily add `import { getCollection } from 'astro:content';` to a file under `src/components/ui/` (create a throwaway file there if none exists yet, e.g. `src/components/ui/__boundary-test.astro` with that one import line). Run `node scripts/check-boundaries.mjs` and confirm it **exits non-zero**, reports rule **B3**, and names the correct file and line. Then **revert** the change (delete the throwaway file or the added line) and run the checker again to confirm it returns to exit `0`. Do not leave the violation or the throwaway file in the shipped tree. Traces: `architecture-boundaries` — The Script Fails On A Deliberately Introduced Violation; proposal Success Criteria ("fails on a deliberately introduced violation, verified once, then reverted").
- [ ] 8.5 **Decisions forcing-function negative test (N2) — mandatory, introduce-confirm-revert.** Temporarily add a `decisions[]` item to a `projects` seed entry (task 3.2) that sets `choice` and `because` but omits `rejected`. Run `npx astro build` and confirm it **fails** with a Zod validation error naming the offending path (the `decisions` array / missing `rejected` field). Then **revert** the change and run `npx astro build` again to confirm it succeeds. Traces: `content-model` — A Decision Item Missing `rejected` Fails The Build; proposal Success Criteria (identical wording: "verified once, then reverted").
- [ ] 8.6 Draft-visibility negative test (N3) — introduce-confirm-revert. Temporarily set one seed post's `draft` to `true`. Confirm it is **visible** under `npx astro dev` (D4 — drafts visible in dev). Run `npx astro build` and confirm the same entry is **absent** from `dist/` and from the generated `rss.xml`. Revert `draft` to its original value and re-run `npx astro build` to confirm the entry reappears. Traces: `i18n-routing`/`content-model` draft-gate behavior (D4); this is the direction "usually left untested" per design §12 — dev visibility, not just build exclusion.
- [ ] 8.7 Translation-collision negative test (N4) — introduce-confirm-revert. Temporarily give two entries in the same collection the same `translationKey` **and** the same `lang`. Exercise `getTranslationGroup()` against one of them (a scratch script invoking the exported function is sufficient, or a temporary log statement in a route already calling it) and confirm it **throws**, naming both entry ids. Revert the temporary `lang`/`translationKey` collision. Traces: `i18n-routing` — `translationKey` Pairing (the ambiguity-is-an-error branch); D9.
- [ ] 8.8 Inspect the `dist/` output of a clean build — confirm zero `/es/` routes of any kind exist, confirm no `/en/`-prefixed route exists (e.g. `/en/projects/<slug>` must not exist), confirm English routes are unprefixed (`/projects/<slug>`, `/blog/<slug>`). Traces: `i18n-routing` — English Routes Are Unprefixed In The Build, No Spanish Routes Are Generated When No Spanish Content Exists.
- [ ] 8.9 Inspect `dist/sitemap-index.xml` (and any per-page sitemap XML) — confirm it generates without error and contains **zero** `xhtml:link` alternate elements, since no `lang: 'es'` entries exist yet. Traces: `i18n-routing` — Sitemap I18n Behavior, both scenarios.
- [ ] 8.10 Inspect `dist/rss.xml` — confirm it exists at the site root, validates as well-formed RSS 2.0, and lists only the non-draft English `posts` entries (cross-check against task 8.6's revert state). Traces: `i18n-routing` — English-Only RSS Feed, RSS Feed Is Generated And Valid.
- [ ] 8.11 Run `npm run check` end-to-end on the final, reverted tree — confirm all three gates (`check-boundaries.mjs` → `astro check` → `astro build`) execute in sequence and the combined script exits `0`. Traces: `project-scaffold` — `npm run check` Verification Gate, Gate Passes Clean On The Shipped Scaffold.
- [ ] 8.12 Grep the full `src/` tree for calls to `getCollection(` and `getEntry(` — confirm exactly one file, `src/lib/content.ts`, contains such calls. Traces: `architecture-boundaries` — Only `content.ts` Calls `getCollection`/`getEntry`; proposal Success Criteria.
- [ ] 8.13 Inspect `package.json`'s `dependencies` field — confirm it contains exactly `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`, and that none of the forbidden packages (standalone `zod`, `tailwindcss`, `@fontsource/*`, `prismjs`, `@astrojs/markdown-remark`, any `@astrojs/*-adapter`) are present anywhere in the dependency tree's direct dependencies. Traces: `project-scaffold` — Dependency List Matches Exactly, Forbidden Packages Are Absent.
- [ ] 8.14 **Final D1 checkpoint confirmation.** Re-read task 5.0's recorded outcome now that all page copy (Phase 5) and `CLAUDE.md` (task 7.3) exist. Confirm the outcome recorded in 5.0 is still accurate — i.e. no UI copy was added anywhere in Phases 5–7 without 5.0 having been checked first. Record this confirmation here; this is the closing half of the D1 revisit-trigger gate opened in task 5.0.

---

## Traceability Summary

Every task above traces to at least one requirement in `specs/{project-scaffold,content-model,i18n-routing,architecture-boundaries}/spec.md`. The three risks the orchestrator flagged as mandatory explicit tasks, not footnotes, are covered as follows:

| Risk | Task(s) |
|---|---|
| `renderEntry()` asserted, not verified, until the first successful `astro build` | 4.3 (flags it), 8.1 (verifies it, with the allow-list fallback inline) |
| Boundary checker has two success criteria (pass clean **and** fail on a violation) | 8.3 (pass clean), 8.4 (fail-then-revert, N1) |
| D1 revisit trigger must survive into `tasks.md` itself, not just the proposal | Standalone callout above Phase 1; task 5.0 (gate before UI copy); task 7.3(g) (verbatim in `CLAUDE.md`); task 8.14 (closing confirmation) |
| `decisions[].rejected` forcing-function test (N2) | 2.3 (static check), 8.5 (build-time fail-then-revert) |

## Next Step

Ready for `sdd-apply`, with the recorded `size:exception` from this forecast carried forward — do not re-litigate chained PRs at apply time; the proposal, this forecast, and the `work-unit-commits`/`commit-convention` skills already settle commit granularity within the single PR.

---

## Review Budget Exception — RECORDED

**`size:exception` is recorded for this change.** Required by the Review Workload Guard before `sdd-apply` may run, because the forecast (~1100–1300 authored lines) exceeds the 400-line review budget by roughly 3x under `delivery_strategy: single-pr`.

### Why no chained split was taken

The user selected `single-pr` at session preflight, and `sdd-tasks` independently found no honest split: the eight phases are interdependent, and every cut produces a pull request that cannot stand on its own. Phases 1–3 alone would build a site with schemas and seed content but no pages — green, and delivering nothing reviewable. A split whose slices cannot be evaluated separately is ceremony, not review protection.

A project scaffold is an atomic unit. It is the one change in a project's life where "smallest coherent behaviour" legitimately means the whole thing.

### How review burden is actually mitigated

Not by pretending the diff is small. By making the **commit** the review unit rather than the pull request:

- Eight work-unit commits, one per phase, each independently legible and each leaving the tree in a state where `npm run check` has a defined outcome.
- Every task traces to a named requirement in `specs/*/spec.md`, so a reviewer checks a commit against a requirement rather than against taste.
- Four negative tests (N1–N4) prove the guards actually fire, rather than asserting that they would.

The 400-line budget exists to protect reviewer attention. Reviewing eight focused commits in sequence spends that attention better than reviewing one 1300-line diff, and better than reviewing four artificial pull requests that each deliver nothing.

### Recorded parameters

| Field | Value |
|---|---|
| `delivery_strategy` | `single-pr` |
| `chain_strategy` | `size-exception` |
| Exception | `size:exception` — recorded, pre-accepted by the user at session preflight |
| Review unit | work-unit commit (8), not the pull request |
| Forecast | ~1100–1300 authored lines, High risk |

### Two sequencing gates `sdd-apply` must honour

These are not advisory. If either trips its fallback branch, apply **pauses and records the outcome** before continuing — it does not push forward silently.

- **Task 5.0** — the D1 i18n revisit checkpoint. No page title, label, or nav string may be written in Phase 5 until 5.0 is checked off with its outcome recorded. If D1 is reopened, Phase 5 stops and routes back through `sdd-propose`.
- **Task 8.1** — `renderEntry()` verification at the first successful `astro build`. D3 is asserted, not verified, until this task runs. If `render()` misbehaves through the wrapper, the documented allow-list fallback is applied and recorded there.
