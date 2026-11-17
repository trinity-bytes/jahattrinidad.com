# Tasks: portfolio-visual-design

> Authority: `proposal.md` (decisions, open questions), `design.md` (values, Figma map), `assets.md` (images).
> This change is design work in Figma. There is no test runner and nothing to build: the check for a design task is a screenshot reviewed against `design.md`, then the owner's verdict.
> Last updated: 2026-11-17 (case study v6 `2298:2` whiter surfaces + claim-first "How it grew"; Notes index v3 `2301:86` and post template v3 `2303:2` desktop built; next: owner review of the Notes boards, then tablet and mobile).

## Phase 1 — Brand foundation

- [x] 1.1 Positioning: "Design Engineer · Frontend & Product" (2026-11-08)
- [x] 1.2 Type system: Epilogue, Hanken Grotesk, IBM Plex Mono (2026-11-09)
- [x] 1.3 Palette v1: green ramp + sun yellow (2026-11-09)
- [x] 1.4 Messaging rule: Outside = outcomes, Inside = technical how (2026-11-09)
- [ ] 1.5 Re-check sun yellow with the owner now that it is on real pages (Open Question 6)

## Phase 2 — Page designs, v2 (2026-11-09)

- [x] 2.1 Home v2 at desktop, tablet, mobile
- [x] 2.2 Case study — Inspiration Garden at desktop, tablet, mobile
- [x] 2.3 Work index at desktop, tablet, mobile
- [x] 2.4 Writing index and post template at desktop, tablet, mobile
- [x] 2.5 Real background and portrait in the v2 desktop hero (2026-11-16, now superseded by 3.2)

## Phase 3 — Home v3, desktop (2026-11-16)

- [x] 3.1 Owner review of v2; diagnosis accepted (proposal Intent)
- [x] 3.2 Hero as separate layers: sky, name, near hill, portrait
- [x] 3.3 Owner corrected the hero composition for light realism; applied to both states
- [x] 3.4 Upscaled sky (`bg-back-2X.png`) in both heroes
- [x] 3.5 Outside board `2084:2`: warm neutrals, light Work and Experience, Viora without pins, sky on Contact
- [x] 3.6 Inside board `2084:314`: dark state, layer annotations, "How I actually do it"
- [x] 3.7 Owner verdict on Outside, section by section (approved on v3.5 `2191:86`, 2026-11-16)
- [x] 3.8 Owner verdict on Inside (approved on v3.5 `2191:503`, 2026-11-16)
- [ ] 3.9 Owner reviews all Draft copy (proposal D7, texts in `design.md` section 4)
- [x] 3.10 Resolve the name hidden by the portrait (Open Question 1): hero shows "Jahat", full name is the logo (proposal D9, 2026-11-16)
- [x] 3.10a Logo: wordmark "Jahat Trinidad" / "@trinitybytes" tied to Outside/Inside, states spec `2093:2` (proposal D9)
- [x] 3.11 Design the empty left column of Experience (Open Question 2): D14
- [x] 3.12 Decide toggle placement (Open Question 5): superseded by the lens, proposal D11
- [ ] 3.13 Decide the opacity rule for Inside image dimming (Open Question 4). The footer no longer needs a fade (D17).
- [x] 3.15 Language switch "EN / ES / PT" in the nav of both v3.1 boards (proposal D10)
- [x] 3.16 Lens replaces the Work toggle; "Back outside" in the same corner; states spec `2109:103` (proposal D11, supersedes 3.12)
- [x] 3.17 Values section as a scannable table with Garden proof `2112:29` (proposal D12; timeline version rejected)
- [x] 3.18 Owner verdict on 3.15–3.17 (covered by the v3.5 approval)
- [x] 3.19 Rebuild Work, Experience, Writing, Elsewhere as scannable patterns on v3.1 Outside (D13–D15)
- [x] 3.23 Work: Tranqui replaces Inspiration Garden (D13)
- [x] 3.24 Contact with availability facts and copy-email action (D16); footer as ground (D17)
- [x] 3.21 Owner verdict on D13–D17 (covered by the v3.5 approval; their Draft copy stays under 3.9)
- [x] 3.22 Prepare v3.1 Inside `2105:310`: recolored clones of the v3.1 Outside sections, footer name "@trinitybytes" (2026-11-16)
- [x] 3.27 Design the Inside content of each v3.1 section, following the table "Inside v3.1 — what to design next" in `design.md`. Proposal on board `2137:2` (clone of `2105:310`, original untouched), annotation component `2137:416` (2026-11-16)
- [ ] 3.28 Audit and owner verdict on the Inside content board `2137:2`. Audit done 2026-11-16 on both boards: `audit.md` (8 P1, 15 P2); owner verdict pending. Checklist:
  - Only real facts: every annotation and Work row traces to a repo or to the owner (sources in `design.md`, Inside v3.1 table and the "Resolved 2026-11-16" note below it)
  - [Draft] text: section headlines 02/03/04/05, sub of 02/04, Tranqui key decision
  - [Owner: …] text: Viora key decision and pieces built
  - Annotations: all are instances of `2137:416`; none clipped or covering content (screenshots checked 2026-11-16)
  - Contact `2137:342`: landscape under the dusk overlay, text contrast still readable
  - Covers `2137:139` (Mink'a) and `2137:160` (Tranqui): hero captures; decide whether Outside v3.1 gets them too
- [x] 3.31 Contact Inside gets the dusk landscape; Mink'a and Tranqui covers become captures of their live heroes (2026-11-16)
- [x] 3.32 Apply the `audit.md` corrections on v3.2 clones placed beside the v3.1 boards (owner, 2026-11-16: "luego te dejo aplicando todas las correcciones"). Includes the D18 rewrite of the Inside copy. Findings that need owner content or a product decision are listed in `audit.md` under "Applied on v3.2". Done 2026-11-16: Outside `2149:74`, Inside `2149:463`.
- [x] 3.34 Owner review fixes on v3.3 clones (2026-11-16): lens hover pill, proof column as inline figures, Inside annotations anchored and made quiet (two owner rounds). Outside `2162:74`, Inside `2162:444`
- [x] 3.33 Owner verdict on v3.2/v3.3 (superseded by the v3.5 approval; the [Draft] copy stays under 3.9)
- [x] 3.29 (done on v3.2 `2149:74`, 2026-11-16) Outside v3.1 Mink'a card still says "Android + web": correct it to native Android only (owner decision, 2026-11-16)
- [x] 3.30 (done on v3.2: title now "…with a zero-dependency script") Featured post title says "200-line script"; `scripts/check-boundaries.mjs` has 293 lines. Fix the title or the claim
- [x] 3.35 Values and Contact proposal round (A/B/C for each); owner picked C for both with two changes (markers on the proof figures, "Just saying hi" removed). Built as v3.4 (D12 and D16 revisions, 2026-11-16)
- [x] 3.36 Review of v3.4: Outside Values row 2 proof replaced ("1 person · product, design and code"); Tranqui annotation moved off the screenshot; Inside Contact sun mask re-centred (2026-11-16)
- [x] 3.37 Nav states component, Top and Scrolled for both states (D19); capsule rejected, sticky glass bar accepted (2026-11-16)
- [x] 3.38 Footer transition as a soft fade (D17 revision, 2026-11-16)
- [x] 3.39 Backgrounds: proposals A/B/C, A1–A5 iteration, then A5 bytes + C light on v3.5, kept off text with a soft edge (D20, 2026-11-16)
- [x] 3.40 Owner approves Home v3.5 as the finished desktop mockup (2026-11-16)
- [ ] 3.41 Replace the hero navs on the v3.5 boards with instances of the Nav set (Top state)
- [x] 3.25 (owner, 2026-11-16: the button does not come back) Decide whether the hero "Look inside" button stays now that the lens exists (D11 open point)
- [ ] 3.26 Promote v3.1 over v3 once the owner approves it (rename boards, keep v3 as reference)
- [x] 3.20 Inside version of the values table (D12): the third column shows how each proof was built (done within 3.27, board `2137:2`)
- [ ] 3.14 Fill remaining placeholders: `[N]` project count, email address, post titles, Elsewhere rows, Viora "My part", Mink'a problem and code part (value 02 proof and city are done)

## Phase 4 — Home v3, responsive

Unblocked 2026-11-16 (3.7 and 3.8 done). Start from the v3.5 boards; the v2 tablet and mobile boards no longer exist.

- [x] 4.1 Tablet 768, Outside and Inside. Start from v3.5; the tablet hero uses vertical depth with the name on one line. Built 2026-11-16 as proposals: Outside `2211:86`, Inside `2213:86` (design.md "Home v3.5 responsive").
- [x] 4.2 Mobile 390, Outside and Inside. Start from v3.5. The owner rejected name and photo side by side on mobile: intro and CTAs on top, then the name full width, then the subject. Built 2026-11-16 as proposals: Outside `2210:86`, Inside `2212:86`.
- [x] 4.3 Mobile annotation pattern for Inside: numbered pins on the image plus a stacked numbered list below. Applied on both Inside boards, tablet included (2026-11-16).
- [x] 4.4 Owner verdict on the four responsive boards: approved after one review round (owner, 2026-11-16: "queda. de momento no tengo observaciones").
- [ ] 4.6 Still undecided, carried forward (owner raised no objection, but did not decide): note opacity in the Inside lists (40%, fails AA; 60% would pass) and a touch variant of the hero hint ("press I" on phones). See design.md "Home v3.5 responsive".
- [ ] 4.5 Design the open state of the mobile menu (links + EN / ES / PT); only the closed button exists.

## Phase 5 — Other pages in the v3 direction

Unblocked: Home v3.5 approved at desktop, tablet and mobile (2026-11-16). The owner chose this as the next session's work: "diseñar las 3 vistas faltantes, los casos de estudio, proyectos y el blog". Start from the v3.5 boards (patterns, backgrounds D20, nav D19, lens D11, Outside/Inside D18); the 2026-11-09 v2 pages listed in design.md §6 are reference only. 5.2 Work index approved the same day. **Next session: 5.1 Case study** (owner, 2026-11-16).

- [ ] 5.1 Case study — Inspiration Garden, Outside and Inside. Desktop proposal built 2026-11-16: Outside `2257:2`, Inside `2263:2` on the case study page (design.md "Case study v3"). Owner rejected the Outside/Inside split for case studies (D21, 2026-11-17); one-version board v4 `2270:2` (x 6700). Lens and I shortcut removed from case study pages (D21). Owner likes the direction and edited the hero (no display word) and footer by hand (2026-11-17). v4 audited the same day (audit.md "Case study v4"). v5 `2285:2` (x 8340) applies the P1 fixes, the Garden facts from Engram and the "Two things I got wrong" section (design.md "Case study v5"). **Next session** (owner, 2026-11-17: "continuamos en la próxima"): owner reviews v5 in Figma; then either the audit's P2 list or tablet 768 and mobile 390. Owner content still needed: [Draft] copy (problem, both wrong-section stories, closing), terminal wording `[Owner: confirm wording]`, Viora "My part".
- [x] 5.2 Work index (v2: desktop `2239:17`, tablet `2247:2`, mobile `2248:2`; approved by the owner 2026-11-16, "de momento queda"; the owner will make some manual adjustments)
- [ ] 5.3 Writing index and post template. Desktop proposal built 2026-11-17: Notes index v3 `2301:86`, post template v3 `2303:2` (design.md "Notes index and post template v3"). Next: owner review; then tablet and mobile.

## Phase 6 — Hi-fi

- [ ] 6.1 Motion and depth: parallax amounts per hero layer (Open Question 7)
- [ ] 6.2 The "Look inside" interaction: trigger, scope (element or page), transition. Designed as the lens (D11); motion values still open.
- [ ] 6.3 Prototype
- [ ] 6.4 Owner approves the hi-fi

## Phase 7 — Hand-off to implementation

Blocked on 6.4. Code starts only after this phase.

- [ ] 7.1 Answer Open Question 3 (Inside/Outside vs OS color scheme)
- [x] 7.2 Answer Open Question 8 (where image assets live): untracked, Figma holds them (proposal D8, 2026-11-16)
- [ ] 7.3 Resolve the Shiki vs unhighlighted contradiction between `openspec/config.yaml` and `CLAUDE.md`
- [ ] 7.4 Promote `specs/visual-identity/spec.md` from Draft, add the specs the final design needs
- [ ] 7.5 Write implementation tasks (tokens, fonts, dictionary strings, schema fields, sections)
- [ ] 7.6 Export web-sized hero images from Figma into `src/` when implementation starts
- [ ] 7.7 Decide how the contact chat works (scripted or model-written), its questions and the email template. Since v3.4 it must accept free text from the composer, not only the two suggestions. Deferred by the owner on 2026-11-16: do not raise during the design phase (D16).
- [ ] 7.8 Spanish and Portuguese dictionaries and routes, only when there is content in those languages (D10)
