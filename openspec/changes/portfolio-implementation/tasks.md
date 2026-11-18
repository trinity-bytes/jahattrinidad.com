# Tasks: portfolio-implementation

> Authority: `proposal.md` (scope, decisions I1–I6), `design.md` (structure, lens, chat), `specs/` (requirements). Values and boards: `openspec/changes/portfolio-visual-design/design.md`. Final copy: `docs/draft-copy.md`.
> Check for every task: `npm run check` green. Page tasks also get a side-by-side check against their Figma board at 390, 768 and 1440. Chat tasks also run `node --test`.
> Work on a feature branch off `develop`, one commit per task or per ~400 changed lines, Conventional Commits.
> Last updated: 2026-11-18 (phases 0–2 done; Footer and Backgrounds are built but wired into pages in phase 3).

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

- [ ] 3.1 Hero: four layers in paint order, live display name, intro and CTAs; responsive compositions from the tablet and mobile boards
- [ ] 3.2 Values: the scannable table with the Garden proof column
- [ ] 3.3 Work: Viora wide, Mink'a and Tranqui paired, "See all projects" with the count from content
- [ ] 3.4 Experience: sticky left column, list from `listExperience('en')`
- [ ] 3.5 Notes: featured latest post and rows from `listPosts`
- [ ] 3.6 Contact: facts, the composer (static for now), chips, "Copy my email" and LinkedIn

## Phase 4 — Inside and the lens

- [ ] 4.1 Spike: preview layer as an `aria-hidden` Inside clone clipped by `circle()`; measure on a mid-range phone; pick the full-page clone or the per-section fallback (design.md §2)
- [ ] 4.2 Inside copy for every Home section (`data-show` pairs), annotations as `ui/Annotation`, note opacity 60%
- [ ] 4.3 Lens control: drag, click, Enter, I (ignored in text inputs), Esc, "Back outside", announcement, touch hint
- [ ] 4.4 Inside on tablet and mobile: numbered pins plus the stacked list (visual-design 4.3)

## Phase 5 — Other pages

- [ ] 5.1 Work index: Featured, More projects, Small experiments, driven by `featured` and `tier`
- [ ] 5.2 Case study template (D21: one version, no lens) and the Inspiration Garden entry as its first content
- [ ] 5.3 Notes index: hero, featured post, rows with type chip
- [ ] 5.4 Post template: reading column, headings, code block chrome with file name and Copy, pull quote, note, figure

## Phase 6 — Designs still owed in Figma (visual-design tasks)

- [ ] 6.1 Mobile menu open state (visual-design 4.5), then implement it
- [ ] 6.2 `/links/` page (visual-design 7.10), then implement it
- [ ] 6.3 Chat conversation view, questions and email template (visual-design 7.11)

## Phase 7 — Contact chat

- [ ] 7.1 Engine: `chat-engine.ts` with `next` and `detect`, tests under `node --test` for every scenario in the contact-chat spec; add the tests to `npm run check`
- [ ] 7.2 Script: the questions, chips, placeholders and replies from 6.3 into the `Dictionary`
- [ ] 7.3 UI: composer → conversation view, typing indicator, chips, editable summary, sent and failed states, live region, focus management
- [ ] 7.4 Form service: Web3Forms (open question 2, resolved), wire the POST, honeypot, privacy note, retry and "Copy my email" fallback; send a real test message end to end

## Phase 8 — Content

- [ ] 8.1 Projects: Viora, Mink'a, Tranqui, Inspiration Garden and the Work index "More projects" and "Small experiments", with covers, `tier`, `team`, `myPart` and the approved copy
- [ ] 8.2 Experience entries
- [ ] 8.3 Posts: the boundary-checker post with `type`; remove `hello-world`
- [ ] 8.4 Links: the real `links.json`
- [ ] 8.5 Remove the scaffold samples and add the coverage fixture (content-model delta)

## Phase 9 — Motion

- [ ] 9.1 Hero parallax per layer, tuned in the browser
- [ ] 9.2 Lens switch transition and nav state transitions
- [ ] 9.3 Reduced-motion pass over everything in this phase
- [ ] 9.4 Owner approves the motion on the running site (closes visual-design 6.1, 6.2, 6.4)

## Phase 10 — Launch

- [ ] 10.1 Configure the Cloudflare deploy for the static build (open question 1, resolved: Cloudflare)
- [ ] 10.2 Responsive pass at 390, 768 and 1440 against every board
- [ ] 10.3 Accessibility: Lighthouse 100 on Home, Work, a case study and a post; keyboard and screen reader walk-through of the lens, menu and chat
- [ ] 10.4 SEO: titles, descriptions, Open Graph images, canonical, sitemap, RSS
- [ ] 10.5 Performance: image sizes, font subsets, no layout shift from the hero
- [ ] 10.6 Owner sign-off, then archive this change and visual-design, merging the spec deltas into `openspec/specs/`
