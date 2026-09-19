# Proposal: portfolio-scaffold

> Phase: `sdd-propose` · Store: hybrid (`openspec/changes/portfolio-scaffold/proposal.md` + Engram `sdd/portfolio-scaffold/proposal`)
> Inputs: `exploration.md` (Engram #323), verified API facts (#313), architecture decisions (#314), project context (#315)
> Touches, per `openspec/config.yaml` rules.proposal: **the Astro scaffold, the content collections, and the build config — all three.**

Stand up the Astro 7.3.3 skeleton for jahattrinidad.com: build config, typed content contract, locale routing, and a mechanized dependency rule. No visual design, no page copy, no feature work.

## Intent

Branch `remake` is an orphan branch with zero commits. Every later decision — how a case study is authored, whether Spanish can be added without breaking English URLs, whether a component may reach into `astro:content` — is cheaper to fix now than after content exists. This phase settles those contracts and nothing else.

Three problems this solves, in order of retrofit cost:

| Problem | Why now | Cost if deferred |
|---|---|---|
| No content contract | Schemas decide how every entry is authored | Every existing entry must be rewritten |
| No locale guarantee | `prefixDefaultLocale: false` freezes English URLs permanently | Published URLs move; external links and search rankings break |
| No enforced dependency rule | The repo is built across AI sessions with partial context; only what breaks the build survives | The rule is documented, silently violated, and unwound later |

Success is a project that builds clean, validates its own content, refuses to compile a boundary violation, and can accept Spanish later without moving a single English URL.

## Decisions resolved here

The exploration phase ran without access to the orchestrator's independent analysis. Two questions came back with two answers. Both are resolved below, and the **losing argument is recorded** rather than dropped — it is the part that will matter when these decisions are revisited.

### D1 — i18n: ship English now, with the structure already in place

**Decided: option (b).** `locales: ['en', 'es']`, `defaultLocale: 'en'`, `routing.prefixDefaultLocale: false`. `lang` and `translationKey` live in the schemas from day 1. No `src/pages/es/` tree is created in this phase.

The exploration recommended (a) — bilingual UI from day 1. Its argument, preserved in full:

> i18n is cross-cutting. Retrofitting it means revisiting every hardcoded string, every canonical URL, and every `<html lang>` — the exact kind of refactor that is cheapest to avoid by never creating it.

That argument is correct in general and was rejected on three specific grounds:

1. **The retrofit cost is proportional to UI copy that does not exist yet.** This phase ships minimal HTML with no design and no page copy. Converting hardcoded strings to dictionary lookups is expensive when there are hundreds of strings; there are currently none.
2. **It priced a weaker (b) than the one accepted.** The exploration counted "backfilling `lang` into existing entries" as part of the retrofit. The accepted (b) carries `lang` **and** `translationKey` in the schemas from day 1, so that cost is already zero. Engram #314 names exactly these two fields as "the expensive, non-retrofittable part"; everything else is mechanical refactor.
3. **(a) requires mirroring `src/pages/es/` today**, and the exploration lists the resulting duplicated `getStaticPaths()` boilerplate as a risk *in the same document*. (a) pays duplication now for content that does not exist.

What makes (b) safe is verified, not assumed: with `prefixDefaultLocale: false`, `/blog/post` never becomes `/en/blog/post` when Spanish arrives. English URLs are frozen on day 1 either way, so committing to bilingual UI today buys no URL stability that (b) does not already have.

**Revisit trigger — record this:** reopen D1 **before** the first substantial batch of UI copy is written, not after. That is the moment (a)'s cross-cutting argument acquires real force, and it is the last cheap moment to act on it.

### D2 — `decisions` / alternatives-rejected: structured in frontmatter

**Decided: a required, Zod-validated `decisions` array on `projects`.**

```ts
decisions: z.array(z.object({
  choice:   z.string(),   // what was done
  rejected: z.string(),   // what was discarded — REQUIRED
  because:  z.string(),   // the deciding constraint, one line
})).default([]),
```

The exploration recommended prose in the MDX body under a `## Alternatives rejected` heading, governed by a documented convention. Its underlying principle is accepted: **queryable or sortable → frontmatter; read once, in full, on the entry's own page → prose.** That principle is right, and it does not decide this field. Here is why:

1. **The reason to structure `decisions` is not queryability — it is a forcing function.** With `rejected` required by Zod, the build fails when a decision is recorded without its discarded alternative. That is precisely the part most portfolios omit, and the part that distinguishes engineering judgment from a feature list. A documented convention has no such teeth.
2. **Consistency with a rule already accepted.** The same argument — mechanize when the cost of violation is high and review-based detection is unreliable — is what justifies `scripts/check-boundaries.mjs` over a written convention (#314). Accepting it for the dependency rule and rejecting it here would be inconsistent.
3. **Frontmatter holds short records, not narrative.** One line per field. This is an index, not prose in YAML. The MDX body still expands each decision under `## Decisions`; the frontmatter entry is its stub. The exploration's objection — "long-form narrative crammed into YAML is unreadable" — applies to narrative, and narrative stays in the body.

Honest limit: `.default([])` means an entry with no decisions still builds. The rule enforced is "no decision without its rejected alternative", not "every project must have decisions".

**Reversibility:** additive field, cheap to remove. **Revisit if** authoring two real case studies proves the structured form burdensome — at that point the evidence beats the argument.

## Scope

### In Scope

- **Astro project skeleton** — `package.json`, `tsconfig.json` (`strict`), `.gitignore`, `astro.config.mjs` with `site: 'https://jahattrinidad.com'`, static output, no adapter.
- **Integrations** — `@astrojs/mdx@8.0.1`, `@astrojs/sitemap@3.7.4` and `@astrojs/rss@4.0.19` only, all three official.
- **Content contract** — `src/content.config.ts` with three collections (`projects`, `posts`, `links`) using `glob()` / `file()` loaders and `astro/zod`, plus **two seed entries per collection** that between them exercise every field, including the optional ones.
- **i18n configuration** — locales, default locale, `prefixDefaultLocale: false`. `fallback` deliberately left undefined.
- **Sitemap i18n** — enabled now (verified inert until Spanish pages exist; see Approach).
- **Content access seam** — `src/lib/content.ts` as the single file allowed to call `getCollection()` / `getEntry()`, holding every filter (draft, lang, featured, ordering) and every derived field (reading time).
- **i18n helpers** — `src/lib/i18n.ts`: UI-string dictionary shape and locale-aware link helpers via `astro:i18n`, populated for `en` only.
- **Dependency-rule enforcement** — `scripts/check-boundaries.mjs`, ~40 lines, zero dependencies.
- **Base design tokens** — `src/styles/tokens.css`: custom properties only (colour, spacing, type scale). No components, no layout, no theme.
- **Route skeleton** — unstyled, minimal HTML, but the full set: `/` (home), `/projects` (list), `/projects/[...slug]` (detail), `/blog` (list), `/blog/[...slug]` (detail), and `/links` (reading `links.json`). Enough to prove the build, the collections and the boundaries work end to end.
- **RSS feed** — `src/pages/rss.xml.ts` via `@astrojs/rss`, English-only. D1 already settles the per-locale question: one feed now, split per locale when `/es/` exists. Deferring it would leave the blog half-delivered.
- **Project instructions** — `CLAUDE.md` at the repository root, documenting the dependency rule and its invariant, the library restrictions, and the no-DDD decision, so future sessions that never touch SDD cannot silently break them.
- **`npm run check`** — wiring `astro check`, `astro build`, and `check-boundaries.mjs`.

### Out of Scope

| Deferred | Why |
|---|---|
| Visual design, layout, components | Tokens are the contract; design is a separate decision with its own iteration loop |
| `src/pages/es/` and Spanish content | D1 — structure prepared, tree not created |
| Per-locale RSS feeds | One English feed ships now. The `/es/` feed arrives with `/es/` content, under D1 |
| Font provider selection | `fonts: []` is scaffolded empty; `local()` vs `fontsource()` is a visual-design decision |
| Contact form | On static output, any client-side `fetch` exposes an embedded key. A private key needs a server function, which the no-adapter constraint forbids. Requires its own proposal |
| Test runner | `strict_tdd: false`; `astro check` + `astro build` + the boundary script are the verification gate |
| Deployment, CI, analytics | Not required to prove the scaffold |

## Capabilities

> Contract with `sdd-spec`. Each new capability gets a full spec at `openspec/changes/portfolio-scaffold/specs/<name>/spec.md`.

### New Capabilities

- `project-scaffold`: Astro 7 project skeleton, build config, TypeScript strict, allowed-dependency policy, `npm run check` gate, base design tokens, empty Fonts API placeholder.
- `content-model`: the three collections, their schemas and loaders, the frontmatter/body split rule, the required `decisions[].rejected` forcing function, and derived-field policy (compute, do not author).
- `i18n-routing`: locale configuration, the frozen-English-URL guarantee, the forbidden `fallback` setting, `translationKey` pairing, `hreflang` emission rule, and sitemap i18n behaviour.
- `architecture-boundaries`: the dependency rule `pages → sections → content → ui/lib`, the single-call-site invariant for `astro:content`, the `import type` exception, and mechanized enforcement.

### Modified Capabilities

None. `openspec/specs/` is empty; this is the first change.

## Approach

### Build config — three verified constraints

| Setting | Decision | Why |
|---|---|---|
| `i18n.routing.prefixDefaultLocale` | `false` | Freezes English URLs. `/blog/post` never becomes `/en/blog/post`. This is the load-bearing guarantee behind D1 |
| `i18n.routing.fallback` | **MUST NOT be configured** | With `fallbackType: 'rewrite'` Astro serves default-locale content under `/es/` URLs with status 200 — genuine duplicate content. A missing `/es/` route must 404 |
| `sitemap({ i18n: {...} })` | Enabled now | Verified in `@astrojs/sitemap@3.7.4` source (`dist/generate-sitemap.js`): `createGetI18nLinks()` iterates actually-built URLs, not configured locales, and `if (links.length <= 1) return void 0;` means a page with no counterpart emits no `xhtml:link` at all. Enabling it today is an inert no-op that self-activates when Spanish pages appear. The published docs imply otherwise; **the source is authoritative** |

### Content model

The exploration's schemas, plus the fields it identified as missing:

| Collection | Added field | Purpose |
|---|---|---|
| `projects`, `posts` | `translationKey: z.string().optional()` | Pairs an ES entry with its EN counterpart. Without it the exploration's own `hreflang` requirement is unimplementable |
| `projects` | `decisions[]` (see D2) | Forcing function for the rejected alternative |
| `projects` | `role`, `timeframe`, `constraints` | What a hiring manager scans for; short records, narrative stays in the body |
| `posts` | `canonicalUrl: z.string().url().optional()` | Cross-posts point at the original |
| `links` | `enabled: z.boolean().default(true)` | Retire a link without deleting its record |

Unchanged from the exploration: `stack` stays separate from `tags` (what it was built with vs. what kind of thing it is), `coverImage` uses the `image()` helper so a missing file fails at build with a Zod-level signal, and `readingTime` is computed in `lib/content.ts` rather than authored.

`hreflang` follows the sitemap's own logic: emit an alternate **only when the counterpart entry actually exists**, resolved through `translationKey`. Never emit an alternate for a page that was not built.

### Architecture — no DDD, one enforced rule

There are no business rules, no invariants, and no entity lifecycles here. A repository wrapping `getCollection()` would be indirection without benefit; `src/lib/content.ts` is already the seam that would absorb a future content-source change.

The dependency rule is `pages → sections → content → ui/lib`, never reversed. Its operative, checkable form:

- `getCollection()` / `getEntry()` are called in **exactly one file**: `src/lib/content.ts`.
- `import type` is not `import`. `content/` may `import type { CollectionEntry }`; `ui/` may not import `astro:content` at all, not even as a type — if it needs that type, it is misclassified.
- `sections/` receive props and do not fetch. Container/presentational, with `pages/` as the containers.
- Classification heuristic: "could this be copied to another project and still work?" Yes → `ui/`. No → `content/`.

Enforcement is `scripts/check-boundaries.mjs`, ~40 lines, zero dependencies, wired into `npm run check`. **ESLint was rejected** (~4 devDependencies for a single rule). **`dependency-cruiser` was rejected** (cannot parse `.astro`). Mechanization is justified because this repo is built across AI sessions with partial context, where only what breaks the build reliably survives.

### Styling

Native CSS + design tokens. **Tailwind was rejected**, independently by both analyses: its strongest ergonomic argument — styling colocated with markup, no context switch — is already delivered by Astro's compile-time-scoped `<style>` block in the same `.astro` file. The advantage Tailwind holds over plain unscoped CSS does not carry over to Astro's component model with equal force. Accepted cost: the author self-enforces the spacing and type scale that a framework would otherwise enforce.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `package.json`, `tsconfig.json`, `.gitignore` | New | Project skeleton, TS `strict`, `npm run check` |
| `astro.config.mjs` | New | `site`, static output, mdx + sitemap, `i18n`, empty `fonts: []` |
| `src/content.config.ts` | New | Three collections, `glob()`/`file()` loaders, `astro/zod` schemas |
| `src/content/projects/*.mdx`, `posts/*.mdx`, `links.json` | New | Two seed entries per collection, together exercising every field |
| `src/lib/content.ts` | New | Sole `astro:content` call site; filters, ordering, derived fields |
| `src/lib/i18n.ts` | New | UI dictionary (`en` only) + locale-aware link helpers |
| `src/pages/**` | New | `/`, `/projects`, `/projects/[...slug]`, `/blog`, `/blog/[...slug]`, `/links` — unstyled |
| `src/pages/rss.xml.ts` | New | English feed via `@astrojs/rss`, sourced through `lib/content.ts` |
| `src/styles/tokens.css` | New | Design-token custom properties only |
| `scripts/check-boundaries.mjs` | New | Dependency-rule checker, zero deps |
| `CLAUDE.md` | New | Dependency rule, library restrictions, no-DDD decision |
| `openspec/config.yaml` | Unchanged | Verify gate already references all three check commands |
| `main` branch | Untouched | Holds the legacy portfolio; must not be modified |

## Delivery

`delivery_strategy` is **`single-pr`**, pre-accepted by the user.

This scaffold is expected to exceed the 400-changed-line review budget: it creates a project from zero, and the files above are not separable into independently shippable slices without shipping a repo that does not build. The user has already accepted this and chose **not** to split it. `sdd-tasks` must therefore **stop and record `size:exception`** rather than recommending chained or stacked PRs. This is settled — do not re-litigate it at the tasks phase.

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| `i18n.routing.fallback` gets added later by a well-meaning session, creating duplicate content under `/es/` | Med | Spec it as a MUST NOT in `i18n-routing` with the reason attached, so the prohibition travels with the config |
| Sitemap i18n docs contradict the verified source behaviour, prompting someone to "fix" it | Med | Record the source-level evidence (file, function, exact line) in the spec, not just the conclusion |
| Boundary script produces false positives on `.astro` frontmatter or `import type` | Med | Seed entries and skeleton pages exercise both cases; the script must pass clean on the scaffold it ships with |
| D1 is never revisited and UI copy accumulates hardcoded | Med | The revisit trigger is recorded above and must survive into `tasks.md` as an explicit note, not a memory |
| `decisions[]` proves burdensome to author | Low | Additive field, cheap to remove; explicit revisit condition recorded in D2 |
| Scaffold exceeds the review budget | High | Accepted: `single-pr` + `size:exception` at `sdd-tasks` |
| A dependency outside the allowed list gets pulled in | Low | `project-scaffold` spec states the allowed list; anything else needs explicit user approval per `config.yaml` |

## Rollback Plan

Rollback is unusually cheap and should stay that way.

1. **Branch isolation.** All work lands on `remake`, an orphan branch with zero commits. `main` — the live legacy portfolio — is never touched. Nothing is deployed by this change.
2. **Nothing published.** No site is built or released from this phase, so there is no cache, no URL, and no index entry to unwind.
3. **Full revert.** `git reset --hard` to the pre-scaffold state (or delete and recreate the orphan branch). Since `remake` starts at zero commits, this restores the exact starting tree.
4. **Partial revert.** Each area is independently removable: dropping `scripts/check-boundaries.mjs` and its `npm run check` entry leaves a working build; removing the sitemap integration leaves routing intact; removing the `decisions` field is a schema edit plus the seed entry.
5. **Irreversible by design.** Only one thing: **published URLs**. Nothing is published in this phase, so `prefixDefaultLocale: false` can still be changed freely until the first deploy. After that first deploy it is effectively permanent — which is the whole reason it is being fixed now.

## Dependencies

- Node >= 22.12 (local: v26.8.1, npm 11.19.0).
- `astro@7.3.3`, `@astrojs/mdx@8.0.1`, `@astrojs/sitemap@3.7.4`, `@astrojs/rss@4.0.19` — official integrations only, all four installed in this phase.
- Zod comes bundled: `import { z } from 'astro/zod'`. Standalone `zod` must never be installed.
- Forbidden: Tailwind, `@fontsource`, Google Fonts CDN, Prism, `@astrojs/markdown-remark`, any adapter.
- No external services, no API keys, no CMS.

## Success Criteria

- [ ] `npx astro build` completes clean with zero warnings from our own code.
- [ ] `npx astro check` reports zero errors under TypeScript `strict`.
- [ ] `node scripts/check-boundaries.mjs` passes on the shipped scaffold and **fails** on a deliberately introduced violation (verified once, then reverted).
- [ ] `getCollection()` / `getEntry()` appear in exactly one file: `src/lib/content.ts`.
- [ ] Each collection has **two** seed entries; between them they exercise every schema field, including the optional ones, `translationKey` and `decisions[]`.
- [ ] A `projects` entry with a `decisions` item missing `rejected` **fails the build** (verified once, then reverted).
- [ ] The built output contains no `/es/` route and no `xhtml:link` alternates in `sitemap-index.xml`.
- [ ] English routes are unprefixed: `/projects/<slug>`, not `/en/projects/<slug>`.
- [ ] `astro.config.mjs` contains no `i18n.routing.fallback` key.
- [ ] `package.json` dependencies are exactly `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss` — nothing else.
- [ ] `npm run check` runs all three gates in sequence.
- [ ] No CSS beyond `src/styles/tokens.css` custom properties.
- [ ] All six routes build and render: `/`, `/projects`, `/projects/[...slug]`, `/blog`, `/blog/[...slug]`, `/links`.
- [ ] `/rss.xml` is generated, validates as RSS 2.0, and lists the non-draft English posts.
- [ ] `CLAUDE.md` exists at the repository root and states the `getCollection()`-in-one-file invariant, the forbidden libraries, and the no-DDD decision.
