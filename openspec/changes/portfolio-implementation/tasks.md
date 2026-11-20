# Tasks: portfolio-implementation

> Authority: `proposal.md` (scope, decisions I1–I6), `design.md` (structure, lens, chat), `specs/` (requirements). Values and boards: `openspec/changes/portfolio-visual-design/design.md`. Final copy: `docs/draft-copy.md`.
> Check for every task: `npm run check` green. Page tasks also get a side-by-side check against their Figma board at 390, 768 and 1440. Chat tasks also run `node --test`.
> Work on a feature branch off `develop`, one commit per task or per ~400 changed lines, Conventional Commits.
> Last updated: 2026-11-18 (phases 0–4 done; spike 4.1 kept the full-page clone: 16.7 ms frames at 390 with 4× CPU throttle).

## Phase 0 — Close the loose ends

- [x] 0.1 Fix `CLAUDE.md`: code fences are highlighted by Shiki with the brand theme; `color-scheme` is driven by `data-lens`, not the OS (project-scaffold delta)
- [x] 0.2 Fix `design.md` §8 of visual-design: the Shiki note is outdated (resolved by "Code theme")
- [x] 0.3 Confirm `node --test` runs `.ts` files on the Node version in `engines` (`>=22.12.0`); if not, raise the floor to the first version that strips types without a flag. Result: 22.12.0 fails with `ERR_UNKNOWN_FILE_EXTENSION`, 22.18.0 passes; floor raised to `>=22.18.0`

## Phase 1 — Foundations

- [x] 1.1 Tokens: replace the placeholder primitives with the brand palette and warm neutrals; semantic aliases with `light-dark()`; `:root { color-scheme: light }` and `:root[data-lens="inside"] { color-scheme: dark }`; remove the `[data-theme]` hook; spacing and type scale from the boards
- [x] 1.2 Fonts: commit Epilogue, Hanken Grotesk and IBM Plex Mono `.woff2` (only the weights the boards use) under `src/assets/fonts/`, register them with `fontProviders.local()`, wire the CSS variables into the tokens
- [x] 1.3 Routes: `ROUTE_BASE` → `work` / `notes`; rename `src/pages/projects/` → `work/` and `blog/` → `notes/`; expose the path builder from `src/lib/content.ts`; replace every hardcoded `/projects/`, `/blog/` (pages, RSS, SEO)
- [x] 1.4 Shiki theme: write the JSON theme from the approved roles table, pass it to `markdown.shikiConfig.theme`; verify contrast of every role in the built output
- [x] 1.5 Schemas: projects `tier`, `team`, `myPart`, `role`/`timeframe` back to optional; posts `type`; new `experience` collection and `listExperience(lang)`
- [x] 1.6 Icons: one `ui/Icon.astro` with the Lucide paths the boards use (`search`, `menu`, `x`, `arrow-up-right`, `message-circle`, `copy`, `send`), ISC notice kept
- [x] 1.7 Hero assets: export the web-sized sky, near hill and portrait from Figma into `src/assets/hero/` (visual-design `assets.md`), check sizes and alpha
- [x] 1.8 Dictionary skeleton: the section groups for Home (Outside and Inside), Work, case study, Notes, Contact, chat, nav and footer, typed so a missing Inside string is a compile error

## Phase 2 — Shell

- [x] 2.1 `Base.astro`: fonts, tokens, `data-lens="outside"` on `<html>`, skip link, `aria-live` region
- [x] 2.2 Nav: Top and Scrolled states (IntersectionObserver on the hero), sticky glass bar with the opaque fallbacks, `aria-current` on the active section; language switch hidden until a second locale exists (D10)
- [x] 2.3 Footer: ground, the soft fade over the hill (D17), ghost name `aria-hidden`, the I-shortcut toggle
- [x] 2.4 Backgrounds: bytes generated as SVG at build, light gradients, grain; masks off text (40 → 120 px); hidden under reduced transparency and forced colors

## Phase 3 — Home, Outside

- [x] 3.1 Hero: four layers in paint order, live display name, intro and CTAs; responsive compositions from the tablet and mobile boards
- [x] 3.2 Values: the scannable table with the Garden proof column
- [x] 3.3 Work: Viora wide, Mink'a and Tranqui paired, "See all projects" with the count from content
- [x] 3.4 Experience: sticky left column, list from `listExperience('en')`
- [x] 3.5 Notes: featured latest post and rows from `listPosts`
- [x] 3.6 Contact: facts, the composer (static for now), chips, "Copy my email" and LinkedIn

## Phase 4 — Inside and the lens

- [x] 4.1 Spike: preview layer as an `aria-hidden` Inside clone clipped by `circle()`; measure on a mid-range phone; pick the full-page clone or the per-section fallback (design.md §2)
- [x] 4.2 Inside copy for every Home section (`data-show` pairs), annotations as `ui/Annotation`, note opacity 60%
- [x] 4.3 Lens control: drag, click, Enter, I (ignored in text inputs), Esc, "Back outside", announcement, touch hint
- [x] 4.4 Inside on tablet and mobile: numbered pins plus the stacked list (visual-design 4.3)

## Phase 5 — Other pages

- [x] 5.1 Work index: Featured, More projects, Small experiments, driven by `featured` and `tier`
- [x] 5.2 Case study template (D21: one version, no lens) and the Inspiration Garden entry as its first content
- [x] 5.3 Notes index: hero, featured post, rows with type chip
- [x] 5.4 Post template: reading column, headings, code block chrome with file name and Copy, pull quote, note, figure

## Phase 6 — Designs still owed in Figma (visual-design tasks)

- [x] 6.1 Mobile menu open state (visual-design 4.5), then implement it
- [x] 6.2 `/links/` page (visual-design 7.10), then implement it
- [x] 6.3 Chat conversation view, questions and email template (visual-design 7.11)

## Phase 7 — Contact chat

- [x] 7.1 Engine: `chat-engine.ts` with `next` and `detect`, tests under `node --test` for every scenario in the contact-chat spec; add the tests to `npm run check`
- [x] 7.2 Script: the questions, chips, placeholders and replies from 6.3 into the `Dictionary`
- [x] 7.3 UI: composer → conversation view, typing indicator, chips, editable summary, sent and failed states, live region, focus management
- [x] 7.4 Form service: Web3Forms (open question 2, resolved), wire the POST, honeypot, privacy note, retry and "Copy my email" fallback; send a real test message end to end Real end-to-end send confirmed by the owner from a browser on 2026-11-18 (headless sends are blocked by Cloudflare in front of Web3Forms).

## Phase 8 — Content

- [x] 8.1 Projects: Viora, Mink'a, Tranqui, Inspiration Garden and the Work index "More projects" and "Small experiments", with covers, `tier`, `team`, `myPart` and the approved copy. Done 2026-11-18: covers exported from Work index v2 `2239:17`; facts checked against each repo. Owner-approved corrections to the board copy: Grayscale Studio "Team of 3", AllinBand "Team of 4", ASM8 credits Marco Schweighauser's original instead of calling it abandoned, Mink'a Inside stack drops Room (only planned), Trama moved to Small experiments as a discrete mathematics course demo. Tranqui's repo is `trinity-bytes/tranqui` (not `safe-map`). Bionutricel has no Code link (private repo). Only `case-study` projects get a page; the other tiers link straight to Live and Code. Home now limits featured projects after dropping the Garden, so it always shows three
- [x] 8.2 Experience entries (already real since phase 3; 2026-11-18 adds only the coverage fixture entry)
- [x] 8.3 Posts: the boundary-checker post with `type`; remove `hello-world`. 2026-11-18: title fixed to "…with a zero-dependency script" (visual-design 3.30), the dev.to `canonicalUrl` removed (it returned 404), dates set to the day the script landed (2026-09-18)
- [x] 8.4 Links: the real `links.json` (already real, checked 2026-11-18)
- [x] 8.5 Remove the scaffold samples and add the coverage fixture (content-model delta). Fixture entries have ids starting with `coverage-fixture` (projects, posts, experience); `src/lib/content.ts` drops them from every list and route, in dev too

## Phase 9 — Motion

- [x] 9.1 Hero parallax per layer, tuned in the browser: sky slowest, near hill fastest (owner confirmed 2026-11-18; the Inside annotations "moves slowest" / "moves fastest" describe it). Done 2026-11-20 (`4cec7ee`, `80c03c4`): sky 35 %, name 18 %, hill and portrait with the page; Inside annotations follow. Plus the hero load "sun reveal" (`bbeda8e`, `76fe180`, `60b44d2`). Values in design.md §7
- [x] 9.2 Lens switch transition and nav state transitions. Done: nav glass from first scroll, Home logo after the name, smooth state transitions (`e2561ff`); circular lens reveal from the gesture's origin and the idle shake (`a1893d8`, `821d4aa`, `6d6669b`). Section glow transitions hero → What you get and Notes → Contact (`74333fb` … `7bddefb`). Values in design.md §7
- [ ] 9.3 Reduced-motion pass over everything in this phase. Every piece is gated in code (`gsap.matchMedia`, CSS media queries, an early check in the hero's inline script); a browser walk-through with reduced motion emulated is still pending
- [x] 9.4 Owner approves the motion on the running site (closes visual-design 6.1, 6.2, 6.4). Approved piece by piece 2026-11-19/20 ("va. queda", "me encanta", "genial", "ya está funcionando con normalidad"); shipped in v1.2.0 (`479e169`)

## Phase 10 — Launch

- [ ] 10.1 Configure the Cloudflare deploy for the static build (open question 1, resolved: Cloudflare)
  - 2026-11-19: repo side done: `wrangler.jsonc` (Workers Static Assets, the type Cloudflare recommends over Pages for new projects; `dist/` only, no Worker script) and `.node-version` 24.18.0 (preinstalled in the Workers Builds image, satisfies `engines >=22.18`). Pending, owner in the dashboard: connect the repo with build `npm run check` and deploy `npx wrangler deploy`, add `jahattrinidad.com` as a Custom Domain, redirect `www` to the apex
  - 2026-11-19: live at https://jahattrinidad.com. Worker `jahattrinidad-com` created by a manual `wrangler deploy` (the Git connect form refuses a Worker that does not exist yet); the apex had two stale proxied A records (`54.149.79.189`, `34.216.117.25`, answering 522) that blocked the Custom Domain and were deleted. First release merged to `main` (`94c541c`). Still open: `www` redirect (no DNS record yet), "Always Use HTTPS" (plain http answers 200), a 404 page
- [ ] 10.2 Responsive pass at 390, 768 and 1440 against every board
- [ ] 10.3 Accessibility: Lighthouse 100 on Home, Work, a case study and a post; keyboard and screen reader walk-through of the lens, menu and chat
- [ ] 10.4 SEO: titles, descriptions, Open Graph images, canonical, sitemap, RSS
  - 2026-11-19: favicon set, `site.webmanifest`, theme-color and the default Open Graph image (`public/og/default.jpg`, from Figma `2374:231`) with width, height and alt in every page head; `buildSeo` emits `og:image`, pinned by `src/lib/seo.test.ts`. Still open: the review of titles, descriptions, sitemap and RSS
  - 2026-11-19, per-page OG (owner: "vamos por la generacion propia"): every note and case study gets `/og/<route>.jpg`, rendered at build time by `src/pages/og/[...route].jpg.ts` through `src/lib/og.ts` from the Figma template `2374:241` (background exported without text to `src/assets/og/page-background.jpg`). New direct dependencies: `satori` 0.63.2 (text layout to SVG) and `sharp` 0.35.4 (already installed by Astro, now declared). satori does not read woff2, so `src/assets/og/` holds TTF copies of Epilogue 600 and IBM Plex Mono 500 with their OFL licenses. Titles clamp at three lines. Rejected: exporting each card by hand from Figma (no dependencies, but one export per new note). Independent verification 2026-11-19: no blockers. Follow-ups: the endpoint renders `en` only, so it must loop over locales when Spanish lands (7.8); glyphs missing from the two fonts render as nothing, without a warning
- [ ] 10.5 Performance: image sizes, font subsets, no layout shift from the hero
- [ ] 10.6 Owner sign-off, then archive this change and visual-design, merging the spec deltas into `openspec/specs/`
