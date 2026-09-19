# Apply Progress: portfolio-scaffold

> Store: hybrid (`openspec/changes/portfolio-scaffold/apply-progress.md` + Engram `sdd/portfolio-scaffold/apply-progress`)
> Mode: Standard (`strict_tdd: false`, no test runner planned)

## Status

**IN PROGRESS** — Phases 1–6 complete and committed. Resuming at Phase 7 (Guards).

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

## Remaining Phases

- [ ] Phase 7: Guards (7.1–7.3) — `check-boundaries.mjs`, `CLAUDE.md`
- [ ] Phase 8: Verification (8.1–8.14) — formal D3 gate, `astro check`/`build`/boundary-checker runs, N1–N4 negative tests, dist/ inspections

## Next Task on Resume

Task **7.1** (`scripts/check-boundaries.mjs`).
