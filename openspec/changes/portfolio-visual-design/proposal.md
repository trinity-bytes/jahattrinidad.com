# Proposal: portfolio-visual-design

> Phase: design in Figma (pre-implementation). No source code is authorized by this change yet.
> Store: `openspec/changes/portfolio-visual-design/` + Engram project `jahattrinidad.com` (topics `brand/*`, `design/*`).
> Touches, per `openspec/config.yaml` rules.proposal: **nothing yet.** When implementation is authorized it will touch `src/styles/tokens.css`, the Astro Fonts config, page and section components, and the content collections (see "Affected Areas").
> Last updated: 2026-11-16 (v3.5, Home desktop mockup approved).

Give jahattrinidad.com its visual identity and page designs, and record the decisions so the work can continue across agents and clones of the repo. The scaffold (archived change `2026-09-18-portfolio-scaffold`) shipped structure only: `src/styles/tokens.css` holds neutral and blue placeholder values, not the brand.

## Read this first

1. **Figma is the source of truth for visuals.** File key `gq6glEp9QrPOnEyYG9dldh`. The node map is in `design.md`.
2. **`src/styles/tokens.css` is NOT the brand.** Never derive colors, type or image direction from it.
3. **No UI code until the owner approves the hi-fi.** The owner has pushed back on code proposals during the design phase more than once. Propose in Figma.
4. **Home v3.5 is the latest Home version and the owner approved it as the finished desktop mockup on 2026-11-16: Outside `2191:86` and Inside `2191:503`** (owner, verbatim: "creo que ya, ya esta el mockup de home"). The owner cleaned the page the same day: only the specs column (Lens, Logo, Annotation, Lens hover, Nav states) and the two v3.5 boards remain. Earlier versions (v3.1–v3.4) and all proposal boards live only in Figma version history; their ids no longer resolve. [Draft] and [Owner: …] copy on the boards is still open (tasks 3.9, 3.14).
5. **Every section must be easy to scan** (owner rule, 2026-11-16, good practice and accessibility). A section uses one predictable pattern: a table, a fixed list of rows, a repeated card structure. A clever layout that the eye cannot follow is rejected even when it is original (see D12).
6. **Speak to the team that hires.** Headlines say what a team or company gets, not what happened in a project (see D12).
7. Status words used below: **Accepted** = the owner said so explicitly. **Proposed** = built and well received, exact values still open. **Draft** = written by an agent, not reviewed.

## Intent

On 2026-11-16 the owner reviewed Home v2 and said only the hero looked good: the rest felt "meh" and they had lost faith in the palette. The diagnosis they accepted:

| Symptom | Cause |
|---|---|
| The hero works, the rest does not | The hero is warm light with depth. Below it the page was a cold grey-white and flat dark green. Same palette, wrong proportions. |
| Long dark stretch reads "terminal/fintech" | Work and Experience together were about 3300px of mint text on near-black green. |
| Inside/Outside "declared, not executed" | Dark sections meant nothing: Experience and Contact were dark without being "inside". The only place the concept worked was the annotation language (thin line + mono note pointing at a real thing). |
| Project thumbnails look dirty | Each cover brings its own palette and fought the saturated green container. |

The palette was kept. What changed is how it is used.

## Decisions

Earlier brand decisions (2026-11-08/09) are summarized in `design.md` and remain in force unless a row below supersedes them.

### D1 — Keep the palette, change the proportions ("golden hour") — Accepted (direction), Proposed (exact values)

Green ramp and sun yellow are unchanged. Light surfaces move from the cold paper `#F2F4F0` to a warm cream derived from sun-soft. Warm light dominates, deep green is the ground.

- **Rejected: a new palette.** The owner asked whether the current colors could work. They can: the hero proves it. Hue was never the problem.
- **Rejected: keep `#F2F4F0`.** It is the one color that comes from nowhere in the hero, and it is why the page felt disconnected from it.
- **Supersedes:** the "light surface = paper `#F2F4F0`" rule from palette v1.

### D2 — Outside and Inside are two states of the whole home, mocked separately — Accepted (owner requirement)

The home has one mockup per state. Dark is no longer a section style: **dark means the Inside state is on.** Outside is the light state.

- **Rejected: alternating light and dark sections** (Home v2). Dark carried no meaning, so the concept read as decoration.
- **Supersedes:** "dark surface = green-900" as a general section rule.
- **Resolved by D11:** the switch is gone; a lens docked bottom-right turns the whole page Inside.

### D3 — The hero is separate layers, built for depth — Accepted (owner requirement)

Four layers: sky with far hills, display name, near hill, portrait. The near hill is its own transparent image so depth and parallax effects are possible later.

- **The owner's composition is canonical.** An agent first mirrored the background and placed the name in front of the hill. The owner corrected it because it broke realism: the sun no longer matched the highlight on the grass or the rim light on the portrait. See D4.

### D4 — Light direction must agree across layers — Accepted (owner correction)

The sun is on the left. The grass highlight and the portrait's rim light both assume that. **Never mirror these layers** and never move the sun to the other side of the subject.

### D5 — Hero images are generated from scratch, not edited — Accepted

The background layers and the portrait were generated with GPT image models from prompts recorded in `assets.md`. The portrait was generated from several reference photos of the owner.

- **Rejected: editing the existing image** ("remove the near hill, keep everything else"). The owner's experience is that image models do not honor "keep the details" instructions.
- **Rejected: background removal plus recolor on a real photo.** The owner tried it and it damaged the face.
- **Supersedes:** the 2026-11-09 decision to use an AI-relit cutout of a real photo, and the hero note "shot by me, relit with AI", which is no longer true. The owner removed that annotation from the Outside hero.

### D6 — Annotation is the signature of Inside — Proposed

A pin, a thin leader line and a two-line mono label that points at a real thing. Inside uses it everywhere; the Outside hero has none (the owner deleted the one that was there).

### D8 — Image assets stay out of git; Figma holds them — Accepted (2026-11-16)

`design/` is listed in `.gitignore`. The hero images live in the Figma file, which is enough for the design phase. The local files in `design/hero/` are a working copy on the owner's machine.

- **Rejected: committing `design/hero/`** (about 70 MB of PNGs) and **Git LFS.** Not worth the repository weight while the design is still moving.
- **Consequence:** a fresh clone has no image files. Export them from Figma or regenerate them with the prompts in `assets.md`. Implementation will need web-sized exports placed under `src/`; that is an implementation task, not this decision.

### D9 — Hero name is "Jahat"; the logo is a wordmark that follows Outside/Inside — Accepted (2026-11-16)

The display name is the first name only, "Jahat", sized to fit whole beside the portrait. The full name moves to the nav as the logo. The logo is a wordmark with two identities: "Jahat Trinidad" in Outside, "@trinitybytes" in Inside. In Outside, hover or keyboard focus also shows "@trinitybytes".

- **Why:** "Jahat Trinidad" at hero size was hidden by the portrait, competed with the headline, and repeated the "JT" monogram.
- **Rejected: a logo that rotates between the two names on its own.** Auto-moving content longer than 5 s needs a pause control (WCAG 2.2.2), it distracts while reading, and an unexplained "trinitybytes" means nothing to a visitor. Tying the swap to Outside/Inside makes it carry meaning.
- **Rejected: keeping the monogram "JT".** Redundant once the name is large in the hero; the wordmark carries the surname instead.
- The handle is written with "@" (owner's call) so it reads unmistakably as a username.
- The swap is user-initiated only: a ~150 ms crossfade, none under `prefers-reduced-motion`. The link's accessible name stays "Jahat Trinidad — home" in every state.

### D10 — Language switch in the nav — Proposed (2026-11-16)

"EN / ES / PT" in IBM Plex Mono 14 sits before the Contact button, current language underlined. The logo lockup stays English in every language. Shown on the v3.1 boards.

- **Consequence:** the switch ships only when Spanish or Portuguese content exists. Portuguese was added by the owner on 2026-11-16 and is a new locale beyond scaffold D1 (scaffold D1 is unchanged: no `src/pages/es/` until there is content). Its labels go through the `Dictionary`.

### D11 — A draggable lens replaces the Outside/Inside switch — Proposed (2026-11-16, owner request)

A round button with the Lucide "search" icon (ISC), docked bottom-right, fixed to the viewport. While it is dragged, a circle about 190 px wide opens around it and shows the Inside state of whatever is under it (owner simplified the first drawn-magnifier version); dropping it turns the whole page Inside. The same corner then holds "Back outside" (with an Esc hint). Click or Enter on the lens and the I key do the same without dragging. Spec frame "Lens — states" `2109:103`.

- **Why bottom-right:** the bottom-left already carries the section marker and hint in the hero, and the right corner is in thumb reach on phones.
- **Supersedes:** the "Outside / Inside" toggle in the Work header (removed on v3.1) and Open Question 5.
- **Open:** whether the hero's "Look inside" secondary button stays now that the lens exists.

### D12 — Values as a scannable table with real proof — Proposed (2026-11-16, revised same day)

Section 02 is a three-row table with fixed columns: the value (approved titles), what it means for your team (approved bodies), and a proof block (sun-soft) with one large figure from Inspiration Garden: "7 days" from first commit to production, "10 releases" in one day across interface and performance, "1 week" after launch to new features on the same foundation. Headline (Draft): "Faster launches. Fewer handoffs. Nothing rebuilt."

- **Rule from the owner:** every section of the portfolio must use a layout or pattern that is easy to scan and read (good practice and accessibility).
- **Rejected: the release-log timeline** (first version of D12). Too hard to read and follow. Also rejected its headline "Idea to launch in 46 days, by one person.": it read as a case study, not as value for a team.
- **Data source:** `git log` and tags of the `my-inspiration-garden` repository on 2026-11-16. Resolves the missing proof for value 02.
- **Revised on v3.4 (owner pick, 2026-11-16): the proof becomes one card.** Two text columns (value / what it means) plus an Inspiration Garden proof card in the third column: screenshot, name, one-liner, three fact rows, link to the case study. Each figure sits on a marker so the important information is found at a glance (owner request): Outside sun-soft `#FBEBA0` behind ink, Inside green-300 behind ink. Supersedes the inline figures of v3.3 and the sun-soft blocks of v3.1. Rejected: proposals A and B of the same round.
- **Row 2 proof replaced (2026-11-16).** "10 releases in a single day" proved speed, not "A bridge between design and engineering". The headline maps one-to-one to the rows (Faster launches / Fewer handoffs / Nothing rebuilt), so the figure changed, not the value: Outside now reads "1 person · product, design and code" (owner: the proof of no handoffs is that they did the product direction and the design as well as the code). Inside keeps "10 releases · tagged on Oct 29", which matches its row "Small, versioned releases".

### D13 — Work: one fixed pattern per project — Proposed (2026-11-16)

Every project shows the same parts in the same order: image, meta line, name, one line of what it is, then a three-row list "The problem / What it does / My part", then one link. Viora is featured (image left, list right); Mink'a and Tranqui sit in two equal cards. Tranqui replaced Inspiration Garden at the owner's request, because Garden already carries the proof in section 02 (D12). Tranqui's cover is its GitHub social image; its "what it does" copy comes from that image. "See all projects" moves to the section header. The per-card "Look inside" buttons are gone: the lens does that now (D11).

- **Rejected:** the v3 featured card with pins and outcome notes, and the two cards with only a title and a line. Not scannable, and the small cards said nothing.
- Draft and placeholder copy is marked in the boards with "[Draft]" or "[Owner: …]".

### D14 — Experience: the left column says what carries over — Proposed (2026-11-16)

Under the title, "What carries over to your team" lists four skills, each with the role it came from (teaching, graphic design, community channels, choir). It fills the empty column (Open Question 2) and speaks to the team, like D12. On the web this column is sticky while the list scrolls. All four lines are Draft.

### D15 — Writing and Elsewhere merge into "Notes" — Proposed (2026-11-16)

One section with two columns: "Writing" (latest post featured large, then rows: type, title, minutes) and "Elsewhere" (rows: platform, date, first line). Background alternates to sand. The featured post is the scaffold sample post, a stand-in.

### D16 — Contact: a guided chat drafts the email — Proposed (2026-11-16)

Approved headline kept on the sky. Below it, three facts in a row: "Looking for: an internship in frontend or product design engineering", "Available: now", "Based in: Lima, Peru, open to remote" (owner, 2026-11-16). Status line: "OPEN TO WORK · LIMA, PERU".

Actions: **"Start a conversation"** is the primary button (Lucide `message-circle`). It opens a guided chat that asks a few quick questions and drafts the email; the visitor edits it before sending. Secondary: "Copy my email" (fallback, copies to clipboard) and "LinkedIn" (Lucide `arrow-up-right`). A preview of the chat's first step sits on the right: "Hi, I'm Jahat. What brings you here?" with the replies "I'm hiring", "I have a project", "Just saying hi".

- **Origin:** the owner's earlier plan. Until now it lived only in the Figma Archive page (frames `2031:55` "Contact — the invitation as display type" and `2032:44` "Chat opener preview"), not in openspec or Engram. Recorded here so it is not lost again.
- **Deferred to implementation (owner, 2026-11-16):** how the chat works (scripted or model-written), its questions and the email template. This change is design only.
- **Placeholder:** the email address is not written in the file yet.
- **Revised on v3.4 (owner pick, 2026-11-16): a composer, not a chat card.** The chat preview card and the "Start a conversation" button are gone. In their place: a text field "Tell me what you're looking for…" with a send button, two suggestions "I'm hiring" / "I have a project", then "Or · Copy my email · LinkedIn" as text links. Inside: green-900 field, green-300 send, placeholder "Tell me about your team and your stack… [Draft]". "Just saying hi" was removed, owner verbatim: "queda generico y si quisiera solo saludar escribiria por otro medio o directamente en el recuadro del chat". Consequence for task 7.7: the chat must accept free text, not only the suggestions.

### D17 — The footer is the ground the page ends on — Proposed (2026-11-16)

The footer surface is `#010903`, the colour the darkened near hill renders at its bottom edge, so the image runs into the solid footer (owner: the transition must not show). Measure it on the rendered composite, not on the image file: the file's semi-transparent edge pixels gave a wrong value (`#0C1103`) the first time. The near-hill image from the hero is reused, darkened, as the ridge. Three columns (Navigate, Elsewhere, This site: language switch, "Built with Astro · source on GitHub", "Press I to look inside"), an availability line, "Jahat" at 300 px in `#0F1F0C` as the closing name (Inside: "@trinitybytes"), and a bottom line "© 2026 Jahat Trinidad" / "Designed and built by the same person."

- **Removed:** the binary easter egg "J 01001010 T 01010100". The name swap carries that role with meaning.
- **Supersedes:** "Footer: green-950" in the state table of `design.md`.
- **Revised 2026-11-16: a soft fade, not a matched edge.** The colour match alone still left a visible line where the clipped hill ends (owner: "me gustaria que la transicion al footer no sea solida sino haya un degradado suave para que no se vea la linea"). A 240 px gradient `#010903` (0 → 55% → 92% → 100%) now covers the bottom of the hill on both states ("ground fade").

### D18 — Two audiences, two versions of every section — Decided (2026-11-16, owner)

Owner, verbatim: "el inside es la version 'tecnica' que demuestra mis capacidades y conocimientos tecnicos para un publico tecnico, el outside es la version amigable para el publico en general, reclutadores y gerentes no tecnicos."

- **Outside** is written for recruiters, non-technical managers and the general public: plain language, outcomes, no jargon.
- **Inside** is written for a technical audience and has to prove technical skill and knowledge. Every section rewrites its copy for that reader, keeping the same structure. Annotations are one device inside it, not the whole difference.
- **Unchanged:** same sections, same order, same layout pattern per section (D12 scan rule), so the lens can compare them element by element.
- **Consequence:** audit finding 15 (`audit.md`) becomes a rewrite of the Inside copy in Values, Experience, Notes and Contact, not just extra annotations. Text that appears word for word in both states is a defect in Inside unless it is a fact, such as a name, a date or a place.

### D19 — Nav: transparent on the hero, a sticky glass bar on scroll — Accepted (2026-11-16, owner)

Component set "Nav" `2185:122` (in "Nav — states" `2185:56`, specs column) with variants `world` (Outside, Inside) × `state` (Top, Scrolled).

- **Top:** transparent, sits on the hero (unchanged).
- **Scrolled:** pinned to the top edge, full width, padding 12 / 64, no radius, frosted glass (Outside `#FAF6E8` at 82%, Inside `#0A200B` at 78%, background blur 20), a 1 px hairline under it, no shadow. The current section is marked with a sun dot before its link (brand: yellow marks the active nav); on Outside the dot gets an ink ring, per the palette rule for small yellow marks on light surfaces.
- **Rejected:** a floating capsule 16 px from the top (owner: "no me gusta el navbar tipo capsula, mejor que se quede fijo arriba como en minka pero con el fondo ese acristalado"). Owner on the result: "bacan el navbar".

### D20 — Backgrounds: the hero's light carried down the page, with the brand bytes where the light falls — Accepted (2026-11-16, owner)

The owner found the section backgrounds flat, Inside most of all, and suggested the 8-bit resource. That resource is the brand "bytes pattern" (type sheet, IBM Plex Mono: "J 01001010 T 01010100"). Sections 02–05 of both states, bottom to top:

1. **Gradient into the next section** (from proposal C): the last 320 px (Outside) / 360 px (Inside) fade into the next section's colour, so no section ends in a hard cut. None into Contact, which starts on the landscape.
2. **Radial light** (from C): Outside sun `#FBEBA0` at 55% from the top on Values and Experience, leaf light `#B3F3B4` at 22% low-left on Work and Notes; Inside dusk `#2E7A33` at 45% top-right plus a sun ember at 6% on Values and Experience, centre light `#2B6E30` at 35% on Work and Notes. **Each section opens with its light already on**; the step this makes under the previous section is wanted (owner pointed at it in C when an agent smoothed it away: "que paso con esto de C? :(").
3. **Grain** (from C): monotone noise, Outside ink at 6%, Inside black at 22%.
4. **Bytes** (from proposal A5): random bytes mixed with the brand's J and T bytes, IBM Plex Mono 12/20, only where the light falls and at the joins between sections. Outside ink, Inside green-300; one byte per section in the lit area is highlighted (Inside sun, Outside green-700). **The bytes never sit under text:** a mask removes them within 40 px of every text block and ramps them back in by 120 px. Owner rule, verbatim: "tienes que cuidar mucho que los patrones sean muy sutiles y casi inexistentes en las zonas con texto. para nada el fondo debe quitar protagonismo al texto".

- **Rejected, same day:** B "8-bit light" (dithered pixel transitions and glow; strong as a gesture, tiring when repeated); C alone (no identity); A1 bytes down the right margin (reads as Matrix rain); A3 bytes spelling the section label in ASCII (meaning invisible at that opacity); A4 a faint bytes field everywhere (muddies body text); bytes that blur progressively toward the text (built and working, owner: "va demasiado lejos… buscando que el fondo no haga confuso leer los textos").
- Implementation notes are in `design.md` section 8.

### D7 — New copy on the v3 boards — Draft

All text added on 2026-11-16 was written by an agent and must be reviewed by the owner. On v3: the three outcome notes on the Viora card (Outside, now replaced on v3.1 by D13), the Inside hero headline and sub, and the three "How I actually do it" cards. On v3.1: the values headline and sub (D12), the Work rows (D13), the four "What carries over" lines (D14), the chat preview note (D16) and the footer lines (D17). Texts are listed in `design.md` section 4.

## Scope

### In Scope

- Brand identity: positioning, messaging rule, palette, type system (decided 2026-11-08/09, recorded here for continuity).
- Home: Outside and Inside states at desktop 1440, then tablet 768 and mobile 390.
- Bringing the other pages (Case study, Work index, Writing index and post) in line with the v3 direction.
- Hero image assets and the prompts that produced them.

### Out of Scope

- Any change under `src/` until the owner approves the hi-fi. Implementation gets its own tasks at that point.
- Spanish content and a Spanish dictionary (D1 of the scaffold change is settled: English-first).
- Motion and the "Look inside" interaction: named as later steps, not designed yet.

## Affected Areas (when implementation is authorized)

| Area | Change |
|---|---|
| `src/styles/tokens.css` | Replace placeholder primitives with the brand palette. Set `color-scheme: light` on `:root` and `dark` under `[data-lens="inside"]` (Open Question 3, resolved 2026-11-17). |
| Fonts | Epilogue, Hanken Grotesk, IBM Plex Mono through Astro's native Fonts API, self-hosted. `@fontsource` and Google Fonts CDN stay forbidden. |
| `src/lib/i18n.ts` | Every UI string from the designs goes into the `Dictionary`. Outside and Inside copy are both UI strings. |
| `src/content.config.ts` | Likely new fields: posts `type` (essay or tutorial); projects `tier` (case-study, project, archive) and team info (solo or team size, plus "my part"). Not decided here. |
| `src/pages/`, `src/components/` | Home sections, hero layers, Inside/Outside state. |

## Risks

| Risk | Mitigation |
|---|---|
| Hero assets are not in git by decision (D8). A fresh clone has no images. | Export from Figma (image hashes in `assets.md`). The prompts can also regenerate them, but results will differ. |
| Figma node IDs change if boards are rebuilt. | Boards are also findable by name; names are in `design.md`. |
| Draft copy ships as if it were approved. | D7 and the task list keep it flagged. |
| Inside/Outside state collides with OS light/dark through `light-dark()`. | Resolved by Open Question 3 (2026-11-17): the lens drives `color-scheme`, the OS preference is ignored. |

## Rollback Plan

Nothing in `src/` changes, so there is nothing to roll back in code. In Figma, every earlier Home version (v2 to v3.4) is recoverable from the file's version history; the boards themselves were deleted from the page on 2026-11-16.

## Open Questions

1. ~~Name hidden by the portrait.~~ Resolved 2026-11-16: the hero shows "Jahat" only, the full name is the nav logo. See D9.
2. ~~Experience left column is empty.~~ Resolved on v3.1 by D14.
3. ~~**Inside/Outside vs OS color scheme.** `tokens.css` uses `light-dark()`, which follows the OS. The design makes dark a user-toggled content state. Are they the same switch, two switches, or does the site ignore the OS preference?~~ Resolved 2026-11-17: **the site ignores the OS preference; the lens is the only source of truth** (owner, verbatim: "el 3 debe seri, de otro modo estariamos contradiciendo el diseño"). Outside is always light, Inside always dark. `light-dark()` stays: it resolves against the element's used `color-scheme`, so `:root { color-scheme: light }` plus `:root[data-lens="inside"] { color-scheme: dark }` drives every token from the lens, and the drag preview circle can mark only its own subtree. Rejected: the OS decides (a dark-OS recruiter would land on the technical copy, breaking the Outside/Inside messaging rule); two switches (four states, two of them never designed). When `tokens.css` changes, rewrite the `CLAUDE.md` rule about `color-scheme: light dark`.
4. ~~**Opacity.** Palette v1 says "no opacity fades". The Inside hero uses a `#0A200B` overlay at 0.8 and an exposure filter on the hill. Keep the rule and bake dark image variants, or relax the rule for image dimming? (The footer now uses a fade, D17, and the backgrounds use translucent light layers, D20.)~~ Resolved 2026-11-17: relaxed for image dimming (task 3.13).
5. ~~Toggle placement.~~ Resolved 2026-11-16: the lens, D11.
6. ~~**Sun yellow.** The owner showed slight doubt about yellow on 2026-11-09 ("maybe no es tan mi estilo"). Re-check now that it is on real pages.~~ Resolved 2026-11-17: accepted (task 1.5).
7. ~~**Parallax amounts.** Inside labels say "moves slowest / moves fastest". No values are specified.~~ Resolved 2026-11-20 on the running site: sky and sun lag 35 % of the hero height, the name 18 %, the near hill and the portrait move with the page (the portrait is cropped by the hero bottom, so depth comes from lagging the far layers, not from speeding up the near ones). Values in portfolio-implementation design.md §7.
8. ~~Where do the image assets live?~~ Resolved 2026-11-16: untracked, Figma holds them. See D8.
9. **Placeholders still in the design:** `[N]` project count, the email address, post titles, Elsewhere rows, Viora "My part", Mink'a problem and code part. (Value 02 proof resolved by D12; city resolved by D16.)
10. ~~Hero "Look inside" button.~~ Resolved 2026-11-16: it does not come back (task 3.25).

## Success Criteria

- The owner approves Outside and Inside at desktop, tablet and mobile.
- Every section in Outside holds up next to the hero (the owner's own test: nothing "meh").
- Inside communicates how things are built, not only a darker theme.
- All Draft copy is either approved or replaced.
- Open Questions 3, 4 and 5 are answered before implementation tasks are written.

### D21 — The case study is one version: story and technique together — Accepted (2026-11-17, owner)

Owner, verbatim: "creo que en el caso de estudio no tienen mucho sentido dividirlo en inside y outside. ya que el caso de estudio es justamente el momento en el que puedo combinar ambos: habilidades comunicativas y conocimiento técnico. creo que ambos deberían convivir ahí".

- Case study pages have no Outside/Inside states. They use the light palette, and each section pairs a plain-language lead with a technical layer: an "Under the hood" row (mono label, Hanken 15 text) after each feature, "Requirements" and "Constraint" rows in the problem, a mono subtitle under each decision title, technical lines in the milestones, and annotations in ink (the Inside opacities) below the product shot.
- **Supersedes** D2 and D18 for case study pages only; Home and other pages keep both states.
- No lens and no I shortcut on case study pages (owner, 2026-11-17: "quitalas"): the lens dock and the footer line "Press I to look inside" are removed on these pages. Implementation: the footer's "This site" column omits that line on case study routes, and the I key handler is not mounted there.
- Rejected: the v3 Outside `2257:2` and Inside `2263:2` pair (kept on the page as reference).

### D22 — URLs follow the nav: `/work/` and `/notes/`; `/links/` stays — Accepted (2026-11-17, owner)

Routes are renamed before anything is public: `/projects/` → `/work/` (and `/work/<slug>/`), `/blog/` → `/notes/` (and `/notes/<slug>/`). Owner: "va, renombreamos y links se queda como pagina de enlaces tipo linktree".

- **Why now:** nothing is published, so renaming is free. Later, every rename needs a permanent redirect, and a static site with no server can only redirect with `meta refresh` pages.
- **Why these names:** the URL says what the nav says. A visitor who clicks "Notes" should not land on `/blog/`.
- **Unchanged:** collection names `projects` and `posts` (internal), `/rss.xml`.
- **`/links/` stays** as a link-in-bio page (linktree style). It has no design in Figma yet (see task 7.10).
- **Implementation touches:** `src/pages/` folders, `projectRoutes`/`postRoutes` and any route helper in `src/lib/content.ts`, every `localizedPath` call, the RSS item links, the sitemap output.
