# Proposal: portfolio-implementation

> Status: Proposed (2026-11-17). Written from the approved design in `openspec/changes/portfolio-visual-design/`, which stays the authority for values (palette, type, layout, Figma node map). This change turns that design into code.

## Read this first

1. **Design authority:** `portfolio-visual-design/design.md` (values, Figma map), `proposal.md` (decisions D1–D22), `assets.md` (images). Approved copy: `docs/draft-copy.md`.
2. **Copy on the Figma boards is stale.** The final texts live in `docs/draft-copy.md`; the boards still show the old drafts.
3. **This change touches the Astro scaffold, the content collections and the build config** (fonts, Shiki theme, routes).
4. **No new runtime dependency.** Islands are vanilla TypeScript in Astro `<script>` blocks, icons are inline SVG, the contact form uses `fetch`. Anything else needs an explicit owner decision (`openspec/config.yaml`, allowed dependencies).

## Intent

The design phase closed on 2026-11-17: Home v3.5, Work index, case study v6 and Notes are approved at desktop, tablet and mobile, the copy is final, and the open questions that blocked code are answered. The site still renders the scaffold: placeholder tokens, system fonts, sample content, and routes that don't match the nav. This change builds the real site.

## Decisions carried in from the design phase

| Topic | Decision | Source |
|---|---|---|
| Color scheme | The lens is the only source of truth. Outside is light, Inside is dark, the OS preference is ignored. `light-dark()` stays, driven by `:root { color-scheme: light }` and `:root[data-lens="inside"] { color-scheme: dark }`. | visual-design OQ3 |
| Code blocks | Highlighted with Shiki and a custom brand theme (one dark theme for both states). | visual-design task 7.3, design.md "Code theme" |
| URLs | `/work/`, `/notes/`; `/links/` stays as a link-in-bio page. | D22 |
| Contact | A scripted chat (state machine, no language model) made to feel conversational. It sends through a third-party form service. | task 7.7 |
| Case studies | One version, no Outside/Inside split, no lens on case study pages. | D21 |
| Motion | Tuned in the browser on the running site, not in Figma. | tasks 6.1–6.3 |
| Small defaults | Inside note opacity 60%; touch hint "Tap the lens"; opacity allowed for image dimming; sun yellow accepted. | tasks 1.5, 3.13, 4.6 |

## New decisions in this change

### I1 — Islands are vanilla TypeScript, no UI framework

The lens, the nav's scrolled state, the mobile menu, the Copy button and the contact chat run as `<script>` blocks inside their Astro components. No React, Preact, Svelte or Solid integration.

- **Why:** each island is a few event handlers over server-rendered markup. A framework adds a dependency and hydration cost for no behavior gained, and the allowed-dependency policy would need an exception.
- **Rejected:** Preact islands for the chat (the chat is the most stateful piece, but a state machine plus DOM rendering is small enough without a virtual DOM).

### I2 — The chat engine is a pure module with zero-dependency tests

The chat's state machine lives in one TypeScript module with no DOM access: `(state, event) → state`. It is tested with Node's built-in `node:test`, which runs `.ts` files directly on the project's Node version (type stripping). No test runner dependency.

- **Why:** the chat is the only piece of real logic on the site, with branches and keyword detection. It is the one place a regression would not be visible in `astro check` or a build.
- **Rejected:** Vitest (a new devDependency for one module); no tests (branch bugs only appear in a manual walk-through).

### I3 — Icons are inline SVG copied from Lucide

Lucide icons (`search`, `menu`, `arrow-up-right`, `message-circle`, `copy`, `x`, `send`) are copied as SVG paths into one icon component. No `lucide` package. Lucide is ISC-licensed; the license notice is kept with the component.

- **Why:** seven icons don't justify a dependency, and the links collection already set the precedent ("inline SVG sprite, no icon dependency").

### I4 — Fonts are local files through the Fonts API

Epilogue, Hanken Grotesk and IBM Plex Mono (all SIL OFL) are committed as `.woff2` under `src/assets/fonts/` and registered with `fontProviders.local()`.

- **Why:** the build never depends on a font CDN being reachable, and nothing in the output references a third-party font host.
- **Rejected:** the Fonts API's remote providers. They also self-host at build time, but they fetch from a third party on every build, and the `@fontsource` ban makes that line hard to read.

### I5 — Experience becomes a content collection

The Experience list (role, organisation, dates, what carries over, Inside tools) moves into a new `experience` collection, loaded from one JSON file like `links`.

- **Why:** roles are content, not UI strings. Putting them in the `Dictionary` would mix data with labels and make a Spanish version translate data rows inside the dictionary.

### I6 — Real content replaces the scaffold samples

The sample entries (`realtime-chat-app`, `task-tracker-cli`, `hello-world`) are removed and replaced with the real projects (Viora, Mink'a, Tranqui, Inspiration Garden, and the Work index "More projects" and "Small experiments") and the real posts. The content-model rule "two seed entries per collection covering every field" is replaced by a fixture rule (see the content-model delta).

### I7 — Spanish and Portuguese ship; D1 is superseded (2026-11-19)

The owner asked for Spanish and Portuguese ("quiero que imlementemos las traudcciones en español y portugues"). D1 (English-first, no `/es/` tree until there is Spanish content) is superseded: `pt` joins `en` and `es`, and both get full UI dictionaries, a chat script, and translated projects and experience. Posts stay English for now ("proyectos y experiencia si, pero post no todavia"), so `/es/notes/` and `/pt/notes/` list the English posts and link to their English pages. Figma stays in English; translations live only in the site.

- **Structure:** English stays unprefixed. Non-default-locale entries live in a folder named after the locale (`src/content/projects/es/viora.mdx`, id `es/viora`); `entrySlug()` in `content.ts` strips the folder for routes and translation links. Page bodies live in `src/pages/_views/` (not routed, still the `pages` layer) and each locale's route is a thin wrapper.
- **Locale tags:** `es` (neutral Latin American Spanish, "tú"; `@astrojs/sitemap` rejects `es-419` and silently skips the sitemap) and `pt-BR` ("você"), mirrored in `astro.config.mjs`.
- **Switch:** the `EN / ES / PT` switch of Nav set `2185:122` goes to the page's counterpart, or to that locale's Home when there is none. In the mobile menu it sits under Elsewhere.
- **No fallback:** `getDictionary()` no longer falls back to `en`; every locale has a complete `Dictionary`, so a missing string is a type error.
- **Rejected:** a `[...locale]` rest parameter over one route tree (one file per page, but two rest parameters in the case-study path and less obvious routing); machine fallback to English for untranslated projects (would hide missing content).

## Scope

**In scope**

- Brand tokens, fonts, Shiki theme, icons.
- Route rename to `/work/` and `/notes/`, with RSS, sitemap and every internal link.
- Schema additions: projects `tier`, `team`, `myPart`; posts `type`; new `experience` collection.
- Base layout: nav (top and scrolled), language switch hidden until a second locale exists (D10), footer (ground and fade), backgrounds (bytes, light, grain).
- Home: hero layers, Values, Work, Experience, Notes, Contact, in both Outside and Inside.
- The lens: drag preview, click, Enter, the I shortcut, Esc, "Back outside", `aria-live` announcement.
- Work index, case study template (Inspiration Garden first), Notes index, post template with the Copy button.
- Contact chat: engine, UI, form service, fallbacks.
- Mobile menu and `/links/` page, after their Figma boards exist.
- Motion tuned on the running site, with reduced-motion support.
- Responsive at 390, 768 and 1440; accessibility pass; SEO and Open Graph.

**Out of scope**

- Spanish and Portuguese content and routes (task 7.8 of visual-design, D10).
- A language model in the chat.
- Analytics.
- Hosting and deploy configuration (open question 1).

## Affected areas

| Area | Change |
|---|---|
| `astro.config.mjs` | `fonts` (local provider), `markdown.shikiConfig.theme` (custom JSON theme) |
| `src/styles/tokens.css` | Brand primitives, semantic aliases, `color-scheme` driven by `data-lens`; the `[data-theme]` hook is removed |
| `src/content.config.ts` | `tier`, `team`, `myPart` on projects; `type` on posts; new `experience` collection |
| `src/lib/consts.ts` | `ROUTE_BASE` becomes `{ projects: 'work', posts: 'notes' }` |
| `src/lib/content.ts` | `listExperience()`; a public `entryPath()` (or equivalent) so pages stop hardcoding URLs |
| `src/lib/i18n.ts` | Every UI string from the designs, Outside and Inside |
| `src/pages/` | `projects/` → `work/`, `blog/` → `notes/`; RSS base |
| `src/components/` | New: `ui/`, `content/`, `sections/` (layers already known to the boundary checker) |
| `src/content/` | Real entries replace the samples; `experience.json` |
| `CLAUDE.md` | Code fences are highlighted; `color-scheme` rule rewritten for the lens |
| `openspec/specs/` | Deltas in this change: i18n-routing, project-scaffold, content-model, architecture-boundaries; new: visual-identity, contact-chat |

## Risks

| Risk | Mitigation |
|---|---|
| The lens preview (a circle showing Inside over Outside) needs two renderings of the area under the cursor. | Design spike first (task 4.1): render the Inside layer once, clipped with `clip-path: circle()` that follows the pointer, and measure the cost on a mid-range phone before building the rest of Inside. |
| The form service sees every contact message. | A one-line privacy note under the composer; no data beyond what the visitor types; "Copy my email" stays as the fallback. |
| Spam through the form. | The service's honeypot or captcha option; if volume grows, move to an own Worker with Turnstile (only the endpoint URL changes). |
| Hero images are large (3400 px sky, 2952 px hill). | `astro:assets` with responsive `srcset` and AVIF/WebP; the portrait and hill as WebP with alpha. |
| Backgrounds (bytes, grain) cost paint time on long pages. | Generated once at build as SVG, `aria-hidden`, disabled under `prefers-reduced-transparency` and `forced-colors`. |
| Inside copy and Outside copy drift apart in the `Dictionary`. | One key per string per state under the same section group, so a missing Inside string is a type error. |

## Rollback plan

Work happens on a feature branch off `develop`, in commits of about 400 changed lines. Each phase leaves `npm run check` green, so any commit is a safe point to stop or revert. The route rename (task 1.3) is the only change that breaks URLs, and nothing is public yet.

## Open questions

1. **Hosting.** Resolved 2026-11-18: Cloudflare, where the domain already lives. The static build is served as-is; no Astro adapter.
2. **Form service.** Resolved 2026-11-18: Web3Forms (free tier, 250 submissions a month), until a more capable or more private option is needed. The fallback path is a Cloudflare Worker that emails the owner's verified inbox; the endpoint lives in one constant, so the switch is local.
3. **Chat questions and email template.** Designed with the chat view in Figma (visual-design task 7.11). Needed before task 7.2.

## Success criteria

- Every approved board has a matching page at 390, 768 and 1440, checked side by side against Figma.
- `npm run check` passes, and the chat engine tests pass.
- No hardcoded UI string: every user-visible string comes from the `Dictionary` or a content entry.
- Lighthouse accessibility 100 on Home, Work, a case study and a post; keyboard-only walk-through of the lens and the chat.
- No reference to a third-party font host or a removed sample entry in the build output.
- The owner approves the motion on the running site.
