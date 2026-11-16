# Tasks: portfolio-visual-design

> Authority: `proposal.md` (decisions, open questions), `design.md` (values, Figma map), `assets.md` (images).
> This change is design work in Figma. There is no test runner and nothing to build: the check for a design task is a screenshot reviewed against `design.md`, then the owner's verdict.
> Last updated: 2026-11-16.

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
- [ ] 3.7 Owner verdict on Outside, section by section
- [ ] 3.8 Owner verdict on Inside
- [ ] 3.9 Owner reviews all Draft copy (proposal D7, texts in `design.md` section 4)
- [ ] 3.10 Resolve the name hidden by the portrait (Open Question 1)
- [ ] 3.11 Design the empty left column of Experience (Open Question 2)
- [ ] 3.12 Decide toggle placement and update both boards (Open Question 5)
- [ ] 3.13 Decide the opacity rule for Inside image dimming (Open Question 4)
- [ ] 3.14 Fill remaining placeholders: value 02 proof, `[N]`, `[CITY / REMOTE]`, post titles, Elsewhere rows

## Phase 4 — Home v3, responsive

Blocked on 3.7 and 3.8.

- [ ] 4.1 Tablet 768, Outside and Inside. Start from `2062:2`; the tablet hero uses vertical depth with the name on one line.
- [ ] 4.2 Mobile 390, Outside and Inside. Start from `2049:2`. The owner rejected name and photo side by side on mobile: intro and CTAs on top, then the name full width, then the subject.
- [ ] 4.3 Mobile annotation pattern for Inside: numbered pins on the image plus a stacked numbered list below.

## Phase 5 — Other pages in the v3 direction

Blocked on Phase 3 approval.

- [ ] 5.1 Case study — Inspiration Garden, Outside and Inside
- [ ] 5.2 Work index
- [ ] 5.3 Writing index and post template

## Phase 6 — Hi-fi

- [ ] 6.1 Motion and depth: parallax amounts per hero layer (Open Question 7)
- [ ] 6.2 The "Look inside" interaction: trigger, scope (element or page), transition
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
