# Apply Progress: portfolio-scaffold

> Store: hybrid (`openspec/changes/portfolio-scaffold/apply-progress.md` + Engram `sdd/portfolio-scaffold/apply-progress`)
> Mode: Standard (`strict_tdd: false`, no test runner planned)

## Status

**BLOCKED before Phase 2** — a dependency-policy conflict was discovered while validating Phase 1 that needs an explicit user decision before implementation continues. Phase 1 itself is complete and committed.

## Blocker — read before resuming

`npx astro check` (one of the three commands `npm run check` chains, and the command named directly in task 8.2 and the proposal's Success Criteria) **refuses to run at all** unless two additional packages are installed: `@astrojs/check` and `typescript`. This was confirmed interactively — Astro's CLI detects their absence and offers to run `npm i @astrojs/check typescript` (which would add them to `package.json`); declining leaves the command unusable.

Neither package appears anywhere in the design's dependency list, the proposal's allowed-dependency list, or the hard "Dependency policy" in this apply prompt (`astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss` — nothing else, in dependencies or devDependencies).

**What still works without them** (verified): `npx astro build` runs fine with zero extra packages — Astro's build pipeline transpiles TS via esbuild without a full type-checker. Only the separate `astro check` diagnostic CLI needs `typescript` + `@astrojs/check`.

**Per this prompt's hard rule** — "If you believe a task cannot be completed without a new dependency, STOP and report it — do not install it" — I stopped rather than deciding this myself.

**Recommendation for the user**: `typescript` and `@astrojs/check` are official Astro tooling required to run TypeScript diagnostics at all (not a competing/alternative library like the forbidden ones — Tailwind, standalone `zod`, Prism, etc., all have an in-project replacement; there is no replacement for these). Approving them as `devDependencies` (the `dependencies` field stays exactly the four approved runtime packages) would unblock `npx astro check`, task 8.2, and the full `npm run check` gate as specified. Alternative: explicitly descope `astro check` from the verification gate and accept that TypeScript `strict` mode is declared but never mechanically checked in this change.

## Completed Phases

### Phase 1: Scaffold + Config — COMPLETE, committed `7d5ed0e`

- [x] 1.1 `package.json` — 4 approved deps, `npm run check` script chain written as specified. Whether it can *execute* end-to-end is blocked on the dependency decision above.
- [x] 1.2 `tsconfig.json` — `astro/tsconfigs/strict`, no `paths`.
- [x] 1.3 `.gitignore` — appended `node_modules`, `dist`, `.astro`, `.env*` to the pre-existing `.atl/` entry.
- [x] 1.4 `astro.config.mjs` — full config per design §10. Open question resolved: `fonts: []` is accepted by Astro 7.3.3 config validation (confirmed via a successful `astro build` parse pass); no fallback to omitting the key was needed.
- [x] 1.5 `npm install` — clean, 203 packages, 0 vulnerabilities, `dependencies` exactly the 4 approved packages.

**Work Unit Evidence (Phase 1)**

| Evidence | Value |
|---|---|
| Focused test command and result | `npx astro build` (config-parse smoke test, no pages yet) — completed, exit 0, `0 page(s) built`, confirms `astro.config.mjs` (including `fonts: []`) is valid |
| Runtime harness | N/A — no application code exists yet to exercise; `npm install` itself is the runtime evidence for the dependency set |
| Rollback boundary | Delete `package.json`, `package-lock.json`, `tsconfig.json`, `astro.config.mjs`; revert the `.gitignore` append. Nothing else depends on this commit yet |

## Remaining Phases (not started)

- [ ] Phase 2: Content Contract (2.1–2.3)
- [ ] Phase 3: Seed Content (3.1–3.6)
- [ ] Phase 4: `src/lib/` (4.1–4.5)
- [ ] Phase 5: Layout + Routes (5.0–5.9) — includes the D1 revisit gate at 5.0
- [ ] Phase 6: Tokens (6.1–6.2)
- [ ] Phase 7: Guards (7.1–7.3)
- [ ] Phase 8: Verification (8.1–8.14) — includes the `renderEntry()` gate at 8.1, and is where the `astro check` blocker becomes fully load-bearing (8.2, 8.11)

## Next Task on Resume

Resolve the dependency-policy question above, then continue at **task 2.1**.
