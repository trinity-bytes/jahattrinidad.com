# Apply Progress: portfolio-scaffold

> Store: hybrid (`openspec/changes/portfolio-scaffold/apply-progress.md` + Engram `sdd/portfolio-scaffold/apply-progress`)
> Mode: Standard (`strict_tdd: false`, no test runner planned)

## Status

**COMPLETE** — all 8 phases, all tasks (`1.1`–`8.14`), done and committed. `npm run check` passes clean end-to-end on the final tree.

## Dependency blocker — RESOLVED (Phase 1)

`npx astro check` required `@astrojs/check` + `typescript`. Apply stopped and reported; user approved both as `devDependencies`. Pinned `typescript@^6.0.3` (unpinned resolved `7.0.2`, incompatible with `astro check`'s programmatic API requirement). Confirmed clean: `0 errors, 0 warnings, 0 hints`.

## Completed Phases

### Phase 1: Scaffold + Config — commits `7d5ed0e`, `5dafcd0`
### Phase 2: Content Contract — commit `802437c`
### Phase 3: Seed Content — commit `aed14b1`

Deviation recorded: `content-model/spec.md` describes `projects.role`/`timeframe` as optional; `design.md` §8 (authority) and `tasks.md` 2.1 mark them required. Followed design.md. See task 3.1's note.

### Phase 4: `src/lib/` — commit `51f80d1`

- `consts.ts` (ROUTE_BASE, BCP47 + mirror-requirement comment), `content.ts` (the seam — all listing/lookup functions, draft gate D4, required-lang D5, `getTranslationGroup()`'s ambiguity throw D9, reading-time algorithm, `renderEntry()` wrapping `render()` D3), `i18n.ts` (en-only dictionary + `localizedPath()`), `seo.ts` (pure `absoluteUrl()`/`buildSeo()` per §7, D8/D9/D10).
- `npx astro check`: 0 errors.

### Phase 5: Layout + Routes — commit `a4207c0`

- **Task 5.0 (D1 gate)**: confirmed — proceeding English-only. Full reasoning recorded inline in `tasks.md` under 5.0: all three grounds from `proposal.md` §D1 still hold; Phase 5's copy volume (headings/labels behind the Phase 4 dictionary) does not meet the "substantial batch" bar the revisit trigger names; that moment is the future visual-design pass, explicitly out of scope here.
- `Base.astro` (document shell), 6 page routes (index, projects list/detail, blog list/detail, links), `rss.xml.ts`. All content access goes through `lib/content.ts` only.
- `src/components/{ui,content,sections}/` created empty (git does not track empty dirs — present on disk, not yet in a commit; Phase 7 will populate/reference them as needed).
- Deviation (minor, non-functional): `rss.xml.ts` extracts `const { site } = context` after the guard instead of the literal snippet's `context.site!` inside `.map()` — avoids the `!` assertion the design's own rationale argues against, same behavior.

### Phase 6: Tokens — commit `9ef2979`

- `tokens.css` per design §9 verbatim structure. Confirmed imported exactly once, from `Base.astro`.
- **Combined Phase 5+6 build verification** (`npx astro build`): 8 pages + `rss.xml` + `sitemap-index.xml` generated cleanly. Only warnings are Astro/MDX's own auto-injected `use astro:head-inject` compiler directive (present in every `.mdx` file's compiled output, not authored by us) — out of scope per the "zero warnings from project-authored code" criterion.
- **Early D3/`renderEntry()` preview** (formal gate is task 8.1): spot-checked `dist/projects/realtime-chat-app/index.html` and `dist/blog/why-a-boundary-checker/index.html` — both contain real rendered MDX body text (decision prose, code fences), not empty shells. Wrapper works correctly through this build.

### Phase 7: Guards — commit `87bb677`

- **7.1** `scripts/check-boundaries.mjs` — `node:fs`/`node:path` only, implements design §5's 8-layer classification, 4 line-anchored regexes, and the full B1–B4 forbidden-import matrix. Runs clean on the shipped tree: `✓ boundaries clean — 17 files, 8 layers, 4 rules.` A manual sanity check (temporary `astro:content` import in `src/components/ui/`, then removed) confirmed it fires rule B3 and reverts clean — the formal N1 introduce-confirm-revert is task 8.4.
  - **Deviation, recorded and reasoned**: design §5's row table omits `astro:content` from the `lib` layer's own deny list, but the seam row states seam "is the only file where astro:content is permitted at all," and the architecture-boundaries spec's Single Call Site requirement is unconditional. Implemented `lib` (non-seam files) as denying `astro:content` under B1, treating the table's omission as a gap rather than an intentional exemption.
  - Resolved `ui`'s `astro:content` violations to rule **B3** (not B1), per the design's own worked report example (`rule B3 — ui/ must not import 'astro:content'`), taken as more authoritative than the row's ambiguous "B1, B3" citation.
- **7.2** `package.json`'s `check` script — already correct from task 1.1, no change needed.
- **7.3** `CLAUDE.md` — created at repo root, covering all 7 points (a)–(g) from the task spec, including the D1 revisit trigger quoted verbatim.

### Phase 8: Verification — commit `128b09b`

- **8.1 (D3 gate)**: confirmed, no fallback needed. First `npx astro build` succeeded; opened `dist/projects/realtime-chat-app/index.html` and `dist/blog/why-a-boundary-checker/index.html` directly and confirmed real rendered MDX body content (headings, decision prose, a syntax-highlighted code fence), not an empty shell. `renderEntry()` works correctly through the wrapper.
- **8.2**: `npx astro check` — 0 errors, 0 warnings, 4 hints (pre-existing `z.string().url()` deprecation notices, non-blocking).
- **8.3**: `node scripts/check-boundaries.mjs` on the shipped tree — exit 0, clean.
- **8.4 (N1, boundary checker)**: real introduce-confirm-revert. Added `import { getCollection } from 'astro:content';` to a throwaway `src/components/ui/__boundary-test.astro` — checker exited 1, reported rule B3 with correct file:line. Deleted the file — checker returned to exit 0. No throwaway file left in the tree.
- **8.5 (N2, decisions forcing function)**: real introduce-confirm-revert. Removed `rejected` from a `decisions[]` item in `realtime-chat-app.mdx` — `astro build` failed with `decisions.0.rejected: Required` (Zod). Restored the field — build succeeded again. Net-zero diff.
- **8.6 (N3, draft visibility)**: real introduce-confirm-revert. Set `why-a-boundary-checker.mdx`'s `draft: true` — confirmed visible under `astro dev` (curl returned 200 on its detail route, listed on `/blog/`), then confirmed absent from `astro build`'s `dist/` (7 pages instead of 8) and from `rss.xml` (0 matches). Reverted `draft: false` — entry reappeared, 8 pages again. Net-zero diff.
- **8.7 (N4, translation collision)**: real introduce-confirm-revert, via the existing `getTranslationGroup()` call site in `src/pages/blog/[...slug].astro` (no scratch script needed). Gave `hello-world.mdx` the same `translationKey`+`lang` as `why-a-boundary-checker.mdx` — `astro build` failed with `getTranslationGroup: ambiguous translationKey "why-a-boundary-checker" ... entries "hello-world" and "why-a-boundary-checker" both declare lang "en"`. Reverted — build succeeded. Net-zero diff.
- **8.8**: `dist/` inspected — zero `/es/` or `/en/`-prefixed routes; all 8 routes unprefixed.
- **8.9**: `dist/sitemap-index.xml` + `dist/sitemap-0.xml` generate clean, zero `xhtml:link` elements.
- **8.10**: `dist/rss.xml` exists at site root, well-formed RSS 2.0 (confirmed via `xmllint`), exactly 2 items (the two non-draft English posts).
- **8.11**: `npm run check` end-to-end on the final, reverted tree — all three gates run in order, combined exit 0. **This is the deliverable the user was waiting for, and it passes.**
- **8.12**: `getCollection(`/`getEntry(` calls found in exactly one file, `src/lib/content.ts` (the other grep hit is prose text in a blog post body describing the rule, not a real call).
- **8.13**: `dependencies` exactly the 4 approved packages, `devDependencies` exactly the 2 approved packages, no forbidden packages present.
- **8.14 (D1 closing gate)**: confirmed still accurate. All page copy routes through the `lib/i18n.ts` dictionary (`t.nav.*`, `t.home.*`, `t.project.*`, `t.post.*`); Phase 7's additions (`check-boundaries.mjs`, `CLAUDE.md`) are not UI copy. Gate closes clean.

## Final State

All 17 tasks in scope for this apply run (`7.1`–`7.3`, `8.1`–`8.14`) are complete. Combined with the prior run's Phases 1–6, all 8 phases and every task in `tasks.md` are `[x]`. `git status --short` is clean (all four negative tests reverted to net-zero diff); the only persistent changes across this run are `scripts/check-boundaries.mjs`, `CLAUDE.md`, and the `tasks.md`/`apply-progress.md` bookkeeping updates. `npm run check` passes end-to-end on the final tree.

## Next Step

Ready for `sdd-archive`. Verification beyond the diagnostics already run in Phase 8 is optional.
