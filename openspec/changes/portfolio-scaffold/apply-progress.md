# Apply Progress: portfolio-scaffold

> Store: hybrid (`openspec/changes/portfolio-scaffold/apply-progress.md` + Engram `sdd/portfolio-scaffold/apply-progress`)
> Mode: Standard (`strict_tdd: false`, no test runner planned)

## Status

**IN PROGRESS** — Phases 1–3 complete and committed. Resuming at Phase 4.

## Dependency blocker — RESOLVED

`npx astro check` required `@astrojs/check` + `typescript`, outside the original approved list. Apply stopped and reported per the hard dependency-policy rule. User approved both as `devDependencies` (`openspec/config.yaml` + new spec scenario, commit `cb5c15d`). Installed and pinned `typescript@^6.0.3` (unpinned resolved `7.0.2`, whose native compiler doesn't yet expose the programmatic API `astro check` needs). Confirmed `npx astro check` now runs clean: `0 errors, 0 warnings, 0 hints`. `package.json` `devDependencies` is exactly `{ "@astrojs/check": "^0.9.10", "typescript": "^6.0.3" }`, matching the new spec scenario.

## Completed Phases

### Phase 1: Scaffold + Config — commits `7d5ed0e`, `5dafcd0`

- [x] 1.1–1.5 all complete. See tasks.md for full outcome notes. `fonts: []` open question resolved (accepted by Astro 7.3.3 config validation).

**Work Unit Evidence**: `npx astro check` — 0 errors/warnings/hints. `npx astro build` — config parses, 0 pages (none exist yet), confirms `astro.config.mjs` valid. Rollback: delete `package.json`, `package-lock.json`, `tsconfig.json`, `astro.config.mjs`, revert `.gitignore` append.

### Phase 2: Content Contract — commit `802437c`

- [x] 2.1 `src/content.config.ts` — three collections per design §8.
- [x] 2.2 Confirmed no `readingTime` field (grep — only appears in a comment).
- [x] 2.3 Confirmed `decisions[].rejected` has no `.optional()`/`.default()` at item level.

**Work Unit Evidence**: `npx astro check` type-checks the schema file cleanly (verified as part of the Phase 1 check run + later full builds). Rollback: revert `src/content.config.ts`; nothing imports it yet.

### Phase 3: Seed Content — commit `aed14b1`

- [x] 3.1–3.6 all complete. Two entries per collection, covering every schema field between them.

**Spec/design deviation recorded**: `content-model/spec.md`'s prose describes `projects.role`/`timeframe` as optional; `design.md` §8 and `tasks.md` 2.1's own field list (no `?` suffix) both mark them required, and the actual schema (written per design authority) makes them required. Followed `design.md` as implementation authority per the apply brief. Task 3.1's "minimal entry" now includes `role`/`timeframe` so it is a true minimum. Flagged, not silently resolved — see task 3.1's note in `tasks.md`.

**Work Unit Evidence**: `npx astro build` — all six seed entries (2 projects, 2 posts, 2 links) validate successfully against their Zod schemas, including the cover image resolving via `image()`. Rollback: delete `src/content/projects/*.mdx`, `posts/*.mdx`, `links.json`, `cover.jpg`.

## Remaining Phases

- [ ] Phase 4: `src/lib/` (4.1–4.5)
- [ ] Phase 5: Layout + Routes (5.0–5.9) — includes the D1 revisit gate at 5.0
- [ ] Phase 6: Tokens (6.1–6.2)
- [ ] Phase 7: Guards (7.1–7.3)
- [ ] Phase 8: Verification (8.1–8.14) — includes the `renderEntry()` gate at 8.1, and N1–N4 negative tests

## Next Task on Resume

Task **4.1** (`src/lib/consts.ts`).
