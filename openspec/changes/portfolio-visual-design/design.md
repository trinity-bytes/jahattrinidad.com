# Design: portfolio-visual-design

> This is the working reference for anyone continuing the visual design. Decisions and their reasons are in `proposal.md`; image files and prompts are in `assets.md`; progress is in `tasks.md`.
> Figma file: `gq6glEp9QrPOnEyYG9dldh` ("Jahat Trinidad - Portfolio"). Last verified against Figma: 2026-11-16.

## 1. Brand foundation (decided 2026-11-08/09)

**Positioning.** Label "Design Engineer", plain descriptor "Design Engineer · Frontend & Product". Signature: curiosity about how systems work inside (logic, optimization) and how they feel outside (design, brand). Rejected labels: "Creative Developer" (reads agency/WebGL), "Software Engineer" (generic).

**Audience.** Companies hiring for an internship or first job; also startups and consulting.

**Messaging rule.** Outside speaks outcomes in plain language for whoever hires. Inside carries the technical decisions for whoever evaluates. No invented metrics; only verifiable proof.

**Fixed copy (approved).**

| Slot | Text |
|---|---|
| Descriptor | DESIGN ENGINEER · FRONTEND & PRODUCT |
| Hero headline | I build products people actually use — designed and built by the same person. |
| Hero sub | So nothing gets lost between design and code: it looks right, it works, and it ships sooner. |
| Primary CTA | See my work → |
| Value 01 | Ideas into working products, fast. Proof: Inspiration Garden, designed and launched solo in under 7 weeks. |
| Value 02 | A bridge between design and engineering. Proof: pending (brand + interface project). |
| Value 03 | Built to grow, not to be redone. Proof: Garden roadmap, four phases on one foundation. |
| Contact headline | Looking for someone who can design it and build it? Let's talk. |

**Rejected aesthetics.** Editorial ("no me representa"). An Inside that is only a different layout and communicates nothing. Serif type. Bricolage Grotesque for the name.

## 2. Type system

| Role | Family | Notes |
|---|---|---|
| Display, name, headings | Epilogue (Medium, SemiBold) | Display name "Jahat" is Epilogue Medium 300 on desktop; logo wordmark is Epilogue SemiBold 22, −2% |
| Body and UI | Hanken Grotesk (Regular, Medium) | |
| Labels, metadata, code | IBM Plex Mono (Regular, Medium) | Section markers, annotations, tags, the "@trinitybytes" logo (Medium 20) |

On the web these must be self-hosted through Astro's Fonts API.

## 3. Color

### 3.1 Primitives (palette v1, unchanged)

| Token | Hex | Source |
|---|---|---|
| green-50 | `#EBFCEB` | palette sheet |
| green-200 | `#B3F3B4` | palette sheet |
| green-300 | `#88E88C` | palette sheet |
| green-700 | `#236C2A` | palette sheet |
| green-900 | `#143A17` | palette sheet |
| green-950 (ink) | `#0A200B` | palette sheet |
| sun | `#F6D653` | palette sheet |
| sun-soft | `#FBEBA0` | palette sheet |

Also used in the boards, step names to confirm on the palette sheet (`2025:130`): `#61D56A`, `#44B34F`, `#318D3A`, `#1A511F`.

### 3.2 Added in v3 (Proposed)

| Name | Hex | Use |
|---|---|---|
| cream | `#FAF6E8` | Outside page surface. Replaces paper `#F2F4F0`. |
| sand | `#F3EDD6` | Outside alternate band (Work, Elsewhere) |
| card | `#FFFDF7` | Outside cards. Replaces pure white. |
| hairline-warm | `#D8D2B6` | Outside dividers in Experience |
| ground | `#010903` | Footer surface, sampled from the rendered bottom edge of the darkened near hill (proposal D17) |
| ground-name | `#0F1F0C` | Closing name in the footer |

### 3.3 Rules still in force from palette v1

- Text on green is white or green-950, never black.
- Sun yellow is for small signals only (status dots, pins, leader lines, highlights). Never a button, never body text.
- Sun yellow is never darkened. On light surfaces it is a fill behind ink.
- No blue, violet, teal, jade, mint or neon.
- "No opacity fades" is currently broken by the Inside hero. See proposal Open Question 4.

### 3.4 What each state uses

| Element | Outside | Inside |
|---|---|---|
| Page surface | cream `#FAF6E8` | green-950 `#0A200B` |
| Alternate band | sand `#F3EDD6` | green-900 `#143A17` |
| Card | `#FFFDF7` | green-900 on 950, or 950 on 900 |
| Heading text | green-950 | white |
| Body text | green-950 or green-900 | green-200 `#B3F3B4` |
| Label, metadata | green-700 `#236C2A` | green-300 `#88E88C` |
| Primary button | green-950 fill, white text | green-300 fill, green-950 text |
| Secondary button | green-950 1px stroke | green-300 1px stroke |
| Dividers | `#D8D2B6` or green-950 hairline | `#236C2A` |
| Tag outline | `#44B34F` | `#236C2A` |
| Proof figure (v3.3) | sun dot + Epilogue Medium 34 green-700, caption green-900 | sun dot + green-300, caption green-200 |
| Annotations | none | neutral cream at low opacity, no backgrounds, 12 px mono (v3.3) |
| Footer | ground `#010903` | ground `#010903` |

## 4. Outside / Inside model

- Outside and Inside are **two states of the same page**, same sections, same order.
- Outside is light and talks about outcomes. Inside is dark and shows how things are built.
- Dark is reserved for Inside. The footer is the one dark element in Outside (the ground).
- Hint text: Outside "press I to look inside anything ↓"; Inside "press I to go back outside ↑". Section marker: "01 — OUTSIDE" / "01 — INSIDE".
- The interaction itself (what happens on "I", per-element vs page-wide, motion) is **not designed yet**.

### Section inventory (home, desktop)

| # | Section | Outside | Inside |
|---|---|---|---|
| 01 | Hero | Golden-hour layers, approved headline, no annotation | Dusk layers, outlined name, four layer annotations, dashed bounds |
| 02 | Values | "How I add value to your team", 3 cards with PROOF chips | "How I actually do it", 3 cards with HOW chips (Draft copy) |
| 03 | Work | Viora featured card without pins, 3 outcome notes (Draft copy); two project cards; "See all projects" | Viora with numbered pins and leader lines to 3 technical decisions, stack line |
| 04 | Experience | Light, same content | Dark, same content |
| 05 | Writing | Light list | Dark list |
| 06 | Elsewhere | Sand band | Dark list |
| — | Contact | Sky image as background, ink text | Dark, mint button |
| — | Footer | Dark | Dark |

### Draft copy added 2026-11-16 (needs owner review)

Outside, Viora notes:
1. "Works where growers already are" — A web platform for planning, a phone app for producers in the field and another for cooperatives. The same data everywhere.
2. "Warnings arrive before the problem" — When something changes on a plot, growers get an alert for their sector without having to go and check.
3. "Explains itself" — A built-in assistant explains each screen and writes a daily summary, so nobody needs training to start.

Inside, hero: "The same page, taken apart — every layer, token and decision." / "Press I anywhere to see how a thing is built: what it is made of, and why." Secondary button: "Back outside".

Inside, values (label "02 — HOW IT WORKS", title "How I actually do it"):
1. "One pipeline, no handoff" — Figma to tokens to components to a static build. The person who drew it is the one who ships it. HOW: Astro · TypeScript · CSS custom properties.
2. "Design decisions live in code" — Color, type and spacing are tokens, so a design change is one edit and not a hunt through files. HOW: One tokens file, light-dark() for themes.
3. "Boundaries a script enforces" — Content is read through one module, and a checker fails the build when anything reaches around it. HOW: check-boundaries.mjs · zero dependencies.

These describe this repository and are true as of 2026-11-16. Card 2 depends on proposal Open Question 3.

### Draft copy on v3.1 (needs owner review)

Values (D12): headline "Faster launches. Fewer handoffs. Nothing rebuilt." Sub "What your team gets from one person who designs and builds. Each point is proven on a product I shipped." Column labels "The value" / "What it means for your team" / "Proof · Inspiration Garden". Proofs: "7 days — from first commit to production. Launched on day 46." / "10 releases — in one day: interface and performance changes, shipped together." / "1 week — after launch: tags and better search, on the same foundation." The value titles and bodies are the approved ones.

Work (D13), rows "The problem / What it does / My part":
- Viora: "A SaaS platform for olive growers in southern Peru." / "Olive harvests swing between good and bad years, and growers plan each season without data." / "A web platform for planning, a phone app for producers in the field and one for cooperatives, all on the same data." / "Full stack on a team of five. [Owner: name the pieces you built.]"
- Mink'a: "A bartering app for neighbours in Lima." / "People have things they no longer use and things they need, but no trusted way to trade them nearby. [Draft]" / "Lets neighbours offer, find and swap goods, on Android and on the web." / "Brand, design system and product design. [Owner: confirm code.]"
- Tranqui (facts from the `trinity-bytes/tranqui` repo): meta "ACADEMIC PROJECT · TEAM OF 5 · 2025–2026" / "Get where you are going with more peace of mind." / "People walk through areas they do not know with no idea of what happened there this week." / "A map of anonymous reports that neighbours validate, with alerts for the zones near you." / "Product and experience for the team, and the landing site, designed and built on my own."

Experience (D14), "What carries over to your team": "Explaining hard things simply" (teaching, 2023); "Brand and visual design" (graphic designer, 2019–2022); "Listening to real users" (municipality community channels, 2022–2023); "Presenting with confidence" (UPC choir, 2024–now).

Contact (D16): facts "An internship in frontend or product design engineering" / "Now" / "Lima, Peru, open to remote" (owner-provided). Chat preview: "Chat · drafts the email for you", "Hi, I'm Jahat. What brings you here?", "I'm hiring" / "I have a project" / "Just saying hi", "A few quick questions, then an email ready to send. You can edit it before it goes."

Footer (D17): "Available for an internship, now. Lima, Peru · remote." / "Designed and built by the same person."

## 5. Hero composition (desktop 1440 × 900)

Paint order, back to front. Positions are the owner's composition and are the reference.

| Order | Layer | Box (x, y, w, h) | Notes |
|---|---|---|---|
| 1 | Sky + far hills | 0, −171, 1606 × 1071 | Not mirrored. Sun lands near (483, 538). |
| 2 | Display name | 64, 552, 807 × 276 | "Jahat" only (proposal D9). White in Outside. **Behind the hill**: the grass edge overlaps the letter bases. Clear of the portrait and about 60 px below the buttons. |
| 3 | Near hill | −86, −13, 1617 × 1152 | Transparent PNG, pre-rotated 5° (see `assets.md`). |
| 4 | Portrait | 900, 190, 520 × 780 | Cropped by the frame bottom at about mid-thigh. |
| 5 | Nav, intro, marker, hint | — | Intro block at 64, 180, 600 wide. |

Rules:
- Sun on the left of the subject. Do not mirror any layer (proposal D4).
- The sky layer must have content behind the near hill, so moving the hill never reveals a hole.
- The hill image is wider than the frame so it can travel horizontally.

Inside differences: a `#0A200B` overlay at 0.8 sits directly above the sky; the name has no fill and a 1.5px green-300 stroke; the hill image has exposure −0.4; annotations and dashed bounds are added on top.

Inside annotations (pin centre, label side):

| Layer | Pin | Label |
|---|---|---|
| 01 sky | (686, 306) | right: "[layer 01 · sky + far hills]" / "bg-back.png · moves slowest" |
| 02 hill | (520, 838) | right: "[layer 02 · near hill]" / "bg-front-hill.png · moves fastest" |
| 03 name | (70, 468) | right: "[layer 03 · display name]" / "Epilogue Medium 300 · sits behind me" |
| 04 portrait | (900, 420) | left: "[layer 04 · portrait]" / "generated from my own reference photos" |

### Logo (proposal D9)

| State | Text | Type | Color |
|---|---|---|---|
| Outside, default | Jahat Trinidad | Epilogue SemiBold 22, −2% | Outside text (dark green) |
| Outside, hover / focus | @trinitybytes | IBM Plex Mono Medium 20, underlined | Outside text |
| Inside | @trinitybytes | IBM Plex Mono Medium 20 | green-300 accent; hover does nothing |

No automatic rotation. Spec frame "Logo — states" `2093:2` sits under the Outside board (x 3200, y 6800).

## 6. Figma map

Pages:

| Page | Id |
|---|---|
| Brand — Identity v1 (palette sheet `2025:130`, type sheet) | `2005:130` |
| Portfolio — Home | `2029:2` |
| Case study — Inspiration Garden (latest board: v6 `2298:2`, x 10000; v4 `2270:2` kept as reference; v5 deleted by the owner) | `2047:13` |
| Work — all projects | `2065:2` |
| Writing — blog | `2066:2` |
| Archive (old portfolio, Home v1) | `0:1` |

Boards on "Portfolio — Home" (as of 2026-11-16, after the owner cleaned the page):

| Board | Id | Position | Status |
|---|---|---|---|
| Lens — states | `2109:103` | x 0, y 0 | Spec: rest, dragging (x-ray), dropped |
| Logo — states | `2093:2` | x 0, y 960 | Spec: the wordmark follows Outside / Inside |
| Annotation (Inside) component set | `2165:10` | x 0, y 1678 | `side=right` `2137:416`, `side=below` `2165:2` |
| Lens — hover / focus component | `2168:10` | x -8, y 1824 | Pill shown on hover and focus |
| Nav — states (holder) | `2185:56` | x 0, y 2000 | Component set "Nav" `2185:122` (D19) + two in-context demos |
| **Home v3.5 · OUTSIDE** | `2191:86` | x 3550, y 0 | **Approved desktop mockup** (2026-11-16) |
| **Home v3.5 · INSIDE** | `2191:503` | x 5190, y 0 | **Approved desktop mockup** (2026-11-16) |

| Home v3.5 · OUTSIDE · MOBILE 390 | `2210:86` | x 6830, y 0 | **Approved** (2026-11-16), task 4.2 |
| Home v3.5 · OUTSIDE · TABLET 768 | `2211:86` | x 7380, y 0 | **Approved** (2026-11-16), task 4.1 |
| Home v3.5 · INSIDE · MOBILE 390 | `2212:86` | x 8388, y 0 | **Approved** (2026-11-16), tasks 4.2 + 4.3 |
| Home v3.5 · INSIDE · TABLET 768 | `2213:86` | x 8938, y 0 | **Approved** (2026-11-16), tasks 4.1 + 4.3 |

Everything else in the history below (v3.1–v3.4 boards, proposal boards) was deleted from the page by the owner on 2026-11-16; Figma version history holds it.

### Home v3.5 responsive (approved 2026-11-16)

Each board is a clone of the approved desktop board of its state, reflowed; same sections, same order, same copy. Gutters 20 (mobile) and 40 (tablet). Type steps down from desktop: 60→34/48, 48→34/40, 44→32/40, 34→26/30, 18→16/17; 16 and below unchanged.

- **Hero.** Intro and CTA on top, then "Jahat" full width (Epilogue Medium 130 on mobile, 210 on tablet) with the sun just above it and the grass covering the letter bases, then the portrait (300 wide on mobile, centred; 360 on tablet, right). The hero is 911 / 991 px tall; the portrait is cropped at 91% of its height, as on desktop. Sky and hill are the same images, scaled and placed so the sun and the grass edge land on the name.
- **Nav, mobile.** Logo, Contact, and a new menu button (Lucide `menu`, 1 px stroke) that holds Work, Experience, Notes and EN / ES / PT. The open state is not designed (task 4.5). Tablet keeps the desktop nav.
- **Marker and hint, mobile.** They move under the CTA. On Outside they turn green-700, because green-300 over the bright sky was unreadable; Inside keeps green-300.
- **Values.** Mobile drops the two column headers and stacks value then text; tablet keeps two columns (value 248 | text). The proof card goes full width below the rows on both.
- **Work.** Viora stacks image over info. Mink'a and Tranqui: one column on mobile, two equal-height cards on tablet. Fact rows stack label over text everywhere except Viora on tablet.
- **Experience.** The left column moves above the list. Entries stack the date on mobile and keep a 112 px date column on tablet.
- **Notes.** Writing and Elsewhere stack. Post rows stack on mobile.
- **Contact.** Facts stack on mobile; on tablet "Looking for" is 320 wide so it stays on two lines. The composer goes full width on mobile.
- **Footer.** Tagline, then the link columns (2 + 1 on mobile, 3 on tablet), then the ghost name sized to the width.
- **Inside annotations (4.3).** Every annotation becomes a numbered pin on its dashed bound plus a numbered note in a stacked list: the hero list is a band right below the hero, the other lists close their section. Numbering restarts per section. Tablet uses the same pattern (agent's choice: the desktop side labels collide with copy at 768).
- **Lens and Back outside** sit at the bottom-right of the first viewport (844 / 1024), since they are fixed to the viewport.
- **Backgrounds (D20).** Lights, gradients and grain are re-fitted per section; the bytes masks were regenerated from the new text boxes (boolean subtract, not flattened: flatten fails on these shapes).

Audit fixes applied the same day: suggestion chips 44 px tall on mobile; Experience role and organisation on two lines on mobile, with the leading "·" dropped (a separator, not copy); the Notes `type` holder hugs its chip (it clipped 2 px; the desktop boards still do); tablet Values value column 290 and the proof shot at its 376:196 ratio; every Inside bound and pin re-snapped to its element. Implementation note: text links ("See the project →", "Copy my email", "LinkedIn", "All writing →") keep their look but get a 44 px hit area through padding.

Owner review round (2026-11-16): "el sujeto de la foto queda muy abajo… no importa que el texto quede un poco más comido por la loma"; the bytes "se pierden"; "hay gaps entre algunas secciones"; on Inside mobile the notes "al estar tan agrupados, llaman más la atención"; "en el hero se ve un gap al inferior de la loma". Applied on all four boards:
- Hero: portrait 40 px higher on mobile (60 on tablet), near hill 40 / 30 px higher so it covers more of the name; heroes are now 871 / 931 px. The hill is scaled ×1.3 around its grass edge so its transparent rotated corner falls below the hero (that corner was the gap).
- The section gaps were stale background layers: gradient, light, grain and bytes kept the old section heights after earlier fixes. Every section's background is now refitted to its height. Rule: after any change that alters a section's height, refit its `bg /` layers and masks.
- Bytes masks on the responsive boards use smaller margins: 12–36 px on mobile, 20–52 px on tablet (desktop keeps 40–120). Step and mask names state the real margin.
- Inside notes are quieter: on-element pins are 14 px outline circles (cream 45% stroke, number 9 px at 75%); list rows use 11 px text, 8 px spacing; the hero notes band has 16 / 24 padding.

Open points for the owner (task 4.4): the annotation notes in the stacked lists measure 3.2–3.6:1 (12 px mono at 40%, inherited from the desktop spec; 60% would pass AA); the hint still says "press I" on phones; mobile hero is taller than the 844 viewport; white "Jahat" on the bright mobile sky (desktop is also white; v2 mobile used green-950 for contrast).

### Home v3.5 (latest, approved 2026-11-16)

Built as clones of v3.4 (which were clones of v3.3 with Values and Contact replaced, D12 and D16 revisions). What v3.5 adds:

- **Backgrounds (D20)** in sections 02–05 of both boards. Layer names inside each section, bottom to top: `bg / gradient into next section (C)`, `bg / light (C)` (a frame holding the radial lights), `bg / grain`, `bg / bytes (kept off text, soft edge)` (five stacked copies of the bytes layer, `step 1…5 · margin 40…120px`, each at 20% opacity and masked by "section minus every text box + margin"). The masks are computed from the current text boxes: if copy changes, regenerate them.
- **Footer fade (D17 revision):** `ground fade` inside `ground edge (hill clipped)` on both boards.
- **Responsive footer spacing (2026-11-16, owner request):** on the mobile 390 (`2210:86`, `2212:86`) and tablet 768 (`2211:86`, `2213:86`) boards, the footer content sat 200 px below the footer top, leaving an empty dark band under the hill ridge. All footer content except `ground edge` moved up (mobile 112 px, tablet 104 px) and the footer frame shrank by the same amount: the statement now starts at 88 px (mobile) / 96 px (tablet). The hill and the Contact bottom padding are unchanged, so the ridge still rises over Contact.
- **Nav (D19):** the hero navs on the boards are still plain frames in the Top state, not instances of the Nav set.
- **Fixes from the 2026-11-16 review:** Values row 2 proof on Outside ("1 person · product, design and code"); Tranqui "[canvas glyph field]" annotation moved off the screenshot headline; Inside Contact "sun mask" re-centred on the real sun, 64 px, blur 16 (it sat about 100 px off, so the sun leaked as a dot).

Page reorganized 2026-11-16 at the owner's request: v3 and the first v3.1 Inside were deleted. The v2 boards (`2038:46`, `2049:2`, `2062:2`) no longer exist in the file (checked the same day), so tasks 4.1 and 4.2 must start from the v3.1 boards instead.

v3.1 nodes: values section `2112:29`; lens dock `2105:651`; Back outside corner button `2105:658`; lang switch `2105:643` / `2105:647`. Work `2115:2` (D13); Experience left-column list `2115:84` (D14); Notes `2116:2` (D15, replaces Writing and Elsewhere). Contact `2105:296` with chat preview `2129:6` (D16); Footer — ground `2126:21` (D17). v3.1 INSIDE (`2105:310`), prepared 2026-11-16: hero from v3 Inside with the EN / ES / PT switch and the "Back outside" corner button `2105:658`; below it, clones of the v3.1 Outside sections recolored with the state table in 3.4 (mechanical pass, no Inside content yet): values `2134:2`, Work `2134:29`, Experience `2134:110`, Notes `2134:226`, Contact `2134:273` (sky replaced by solid green-950), Footer `2134:317` (closing name "@trinitybytes" in IBM Plex Mono). Project covers and screenshots were excluded from the recolor. The v3 Inside board `2084:314` keeps the old "How I actually do it" cards for reference.

### Inside v3.1 — what to design next (task 3.27)

Rule: same sections, same patterns as Outside (scannable, D12 rule), but each one shows **how it is built**. Annotation (pin + leader line + two-line mono label, D6) is the Inside device. Only real facts.

| Section | Outside shows | Inside should show | Facts already known |
|---|---|---|---|
| 02 Values | value / for your team / proof | Third column becomes "How the proof was built"; headline and sub need Inside copy | Garden: Cloudflare Worker API, pnpm monorepo, v0.1.0 on day 7, 34 tags, 10 releases on Oct 29, WebP thumbnails via CF Images |
| 03 Work | problem / what it does / my part | Rows become stack / key decision / what I owned; pins on each cover | Viora: Spring Boot + Angular and ASP.NET Core + Vue, Kotlin app, Flutter app, one API. Tranqui landing: Astro 7, Tailwind 4, canvas glyph field, native `<dialog>`, `<details>` FAQ, reduced motion; app in Flutter. Mink'a: [owner] |
| 04 Experience | roles + what carries over | Tools and methods behind each role (tags already exist: vMix, branding, reporting) | Tags on each row of the list |
| 05 Notes | posts + elsewhere | Annotate the stack of the writing pipeline (MDX, content collections, RSS) | `src/content.config.ts`, `src/lib/content.ts`, boundary checker |
| Contact | facts + chat | Annotate the chat preview as a component; mechanics stay undecided (task 7.7) | — |
| Footer | ground + "Jahat" | "@trinitybytes", "Built with Astro · source on GitHub" carries the Inside link | Already applied |

Resolved 2026-11-16: Contact in Inside carries the landscape. It reuses the hero's sky + far hills image under the same dusk overlay (`#0A200B` at 80%), and the footer's near hill rises over its bottom edge. Owner, verbatim: "yo si queria imagenes del paisaje" (a first reading of the answer as "solid" was wrong and is corrected). The Work covers of Mink'a and Tranqui are viewport captures (1440×716) of the live heroes of minka.jahattrinidad.com and tranqui.jahattrinidad.com, taken 2026-11-16; they replaced the earlier covers on the Inside content board only. Mink'a facts (owner): the owner did all recent work (new landing, app prototypes, app implementation); the key decision was to make it only a native Android app because the product required it. The app is Kotlin + Jetpack Compose, Hilt, hexagonal by feature, Ktor with an in-app mock API, Room + DataStore.

Built 2026-11-16 on board `2137:2` "Home v3.1 · INSIDE content (task 3.27 proposal)", a clone of `2105:310`. Section headlines are [Draft]. Work rows read Stack / Key decision / What I owned. Inside chips in Experience use sun yellow. Every annotation is an instance of the local component "Annotation (Inside)" `2137:416` (properties: title, note), and its label has a dark backing so it stays readable over covers.


Previous boards, deleted 2026-11-16 (task 3.34): **Home v3.3** Outside `2162:74` (x 7045) and Inside `2162:444` (x 8685), clones of v3.2 with three owner-review fixes:

- **Lens hover.** On hover and keyboard focus the lens does not change; a light pill (card `#FFFDF7`, green-950 text and 12% hairline, soft shadow) appears 12 px to its left: "Drag and drop over the page to see how it was built". The I shortcut is not repeated; the hint under the name gives it (owner, 2026-11-16). The state lives outside the mockups as the component `Lens — hover / focus` `2168:10` (above the v3.3 Outside board) and as state 1b in the Lens states spec; the page mockups show only the resting lens. Reason: the bare magnifier read as a search button.
- **Proof column.** No box and no oversized numeral. Each proof reads like the other two columns: a sun status dot, the figure as a short phrase ("7 days") in Epilogue Medium 34 green-700 (Inside green-300) on the same baseline as the value title, and the caption below. Patterns taken from the owner's Inspiration Garden: Waveyu (number and its descriptor on one line, no decoration) and Shaun Scholtz (the figure lives inside a sentence). Rejected first: sun-soft boxes (flat, the only filled block on the cream page) and a 80–96 px numeral with a sun disc behind it (louder than the value it proves).
- **Annotations, anchored and quiet.** The pin sits on the dashed bound of the element it describes; the label sits in free space and never covers copy; an annotation that restates the text beside it is removed. They are a meta layer, secondary to the technical copy, so they leave the green hierarchy: one neutral, cream `#FAF6E8` at low opacity (pin 60%, leader 30%, title 62%, note 40%, bounds 20%), 12 px mono, 6 px pin, 32 px leader, and **no label backgrounds anywhere** (mixed backed and unbacked labels read as noise). No sun yellow. Component set `2165:10` (`side=right` `2137:416`, `side=below` `2165:2`). Removed as redundant: Viora "3 clients · 1 API", Mink'a "one call to action", "scripts/check-boundaries.mjs", Contact "3 facts". Hero: sky pin on the sun, name pin on the name bound, both labels in one lane above the name.

Previous boards (2026-11-16, task 3.32): **Home v3.2** Outside `2149:74` (x 7200) and Inside `2149:463` (x 8840), the audit fixes plus the D18 Inside rewrite. Read `audit.md` "Applied on v3.2" first. The v3.1 boards below stay as the pre-audit reference.

v3.1 boards (2026-11-16): Outside `2105:2`; Inside `2137:2`. Inside section ids: values `2137:71`, work `2137:98`, experience `2137:179`, notes `2137:295`, contact `2137:342`. The v3 boards (`2084:*`) and the first v3.1 Inside (`2105:310`) were deleted; their ids no longer resolve.

Inside hero layer ids: sky `2137:4`, dusk overlay `2137:5`, near hill `2137:7`. Specs, in one column left of the mockups: Lens states `2109:103`, Logo states `2093:2`. Annotation component set: `2165:10` (was the single component `2137:416`, now its `side=right` variant).

Other pages (ids recorded 2026-11-09, not re-verified): case study desktop `2047:14`, mobile `2050:2`, tablet `2063:2`; work index desktop `2065:3`, tablet `2068:2`, mobile `2068:202`; writing index `2066:3`, post template `2066:89`. **None of these has been updated to the v3 direction.**

The file has no Figma variables or styles: colors are raw hex on the nodes. That is the existing convention, not an oversight to fix mid-task.

## 7. Working method for agents

- Before any design, brand, copy or image request: read Engram (project `jahattrinidad.com`) and the Figma file. Then act.
- Build proposals **beside** the current board, never over it. Clone, rename, move right, add a caption.
- If the owner edits a board by hand, their version wins. Read the board again before touching it.
- Make state changes by recoloring a clone, not by redrawing. The v3 boards were made that way, so both states stay structurally identical to v2.
- Every section must be easy to scan: one predictable pattern per section (proposal "Read this first", rule 5). Neighbouring sections use different patterns.
- Sample colours that must match an image from the rendered composite (screenshot), never from the image file: semi-transparent edge pixels give wrong values.
- Check the result with a screenshot before reporting. Several defects in this change were only visible in a screenshot (an image that uploaded but did not render, a label over a dashed line, a low-contrast key cap).

Tooling facts learned the hard way:

| Fact | Consequence |
|---|---|
| Call `page.loadAsync()` or `setCurrentPageAsync` before listing a page's children | Otherwise existing frames are missed |
| Figma asset upload limit is 10 MB | Resize large PNGs first |
| Lossless WebP uploads report success but do not render | Use PNG or JPEG |
| No Python PIL or ImageMagick on the dev machine | Use `sharp` from this repo: `require('sharp')` |
| Children appended to an auto-layout board land at its end | Set `layoutPositioning = 'ABSOLUTE'` for floating elements (lens, chat preview) |
| Mask groups did not clip in screenshots | Use a frame with `cornerRadius` + `clipsContent` (lens x-ray) |
| "↗" renders as an emoji box in Hanken Grotesk and Plex Mono | Use the Lucide `arrow-up-right` SVG |
| A rectangle with blend mode COLOR tints every layer below it, including other sections | Use image filters instead |
| Changing text needs the node's font loaded first | Load Epilogue, Hanken Grotesk and IBM Plex Mono styles before editing |
| Text inside "Screenshot — …" and "Cover — …" frames belongs to the project images | Exclude those frames from any recolor pass |
| A mask does not clip sibling frames that have `clipsContent = true` | Set `clipsContent = false` on frames that a sibling mask must cut |
| A frame with a layer blur ignores the mask inside it; a layer blur on text under a mask does not render | Keep the mask on an outer frame and put the blur on an inner frame |
| A layer blur on a mask does not feather its edge | Fake a soft edge by stacking copies with growing masks at partial opacity |
| `x` / `y` in `use_figma` are relative to the parent | Position children of a section in section coordinates |
| Cloned sections that were FILL collapse inside a HUG auto-layout column | Fix the column width to 1440 and the children to FIXED |
| The `NOISE` effect rejects a `blendMode` key; text has no `setRangeCharacters` | Omit `blendMode`; edit ranges with `setRangeFills` |
| Smoothing a step an agent thinks is a defect can remove an effect the owner chose | Ask before "fixing" something the owner picked from a proposal (the lit section tops of C, D20) |
| Codex agents (launched through Herdr) ended their first turn after about a minute, having only read the sources and saved an Engram summary | The prompt must say: do not end the turn until every board exists in Figma and has been screenshot-checked |
| Codex needs its own Figma MCP login | `codex mcp login figma`, then `codex mcp list` shows `figma` with OAuth |
| A tall board at the default screenshot size is unreadable | `get_screenshot` with a large `maxDimension`, then slice it with `sharp` into side-by-side pairs to review |
| Stacked responsive figures that stretch to the column width keep their desktop content positions, so the content sits left with an empty half | Keep figures at their natural desktop size and centre them in the column; do not fill the width "just because" (owner, 2026-11-17) |

## 8. Implementation notes (not authorized yet)

These are implications to carry into the implementation tasks, not instructions to start.

- The I shortcut must satisfy WCAG 2.1.4 (Character Key Shortcuts): ignore it while any input, textarea or contenteditable has focus (the contact chat), and give people a way to turn it off. Announce the Outside/Inside switch through an `aria-live` region.
- The ghost footer names ("Jahat", "@trinitybytes") are decorative: `aria-hidden="true"`.
- The left column of Experience (title + "what carries over") should be `position: sticky`; at 1440 it ends at y 740 of a 1600 px section.
- Replace the placeholder primitives in `src/styles/tokens.css`; components keep consuming semantic aliases only.
- The hero needs the four layers as separate elements in the paint order of section 5, so depth effects stay possible.
- Outside and Inside copy are both UI strings: they go through `Dictionary` in `src/lib/i18n.ts`.
- Project covers and screenshots are content images: `coverImage` in the projects schema already exists.
- Probable schema additions are listed in the proposal under Affected Areas.
- **Nav (D19):** `position: sticky; top: 0` on a full-width bar; the Scrolled state appears once the hero has left the viewport (IntersectionObserver on the hero). Glass is `backdrop-filter: blur(20px)` over the translucent surface; provide an opaque fallback under `@supports not (backdrop-filter: …)` and under `prefers-reduced-transparency: reduce`. Mark the current section with `aria-current="true"` on its link, not only with the dot.
- **Backgrounds (D20):** decorative only, `aria-hidden="true"`, never real text in the DOM (screen readers and find-in-page must not see the bytes). Render the bytes as a generated SVG or canvas background per section. Keep them off text with a CSS `mask-image` built from the text blocks' boxes, feathered from 40 px to 120 px (one real feathered mask replaces the five stacked copies used in Figma). The lights and the gradient into the next section are CSS radial and linear gradients; the grain is an SVG `feTurbulence` noise at low opacity. Hide the bytes under `prefers-reduced-transparency` and in forced-colors mode. Do not add progressive blur near text: the owner rejected it.
- **Footer (D17):** the fade is a linear gradient over the bottom 240 px of the hill layer.
- ~~`openspec/config.yaml` says syntax highlighting is Shiki while `CLAUDE.md` says code fences render unhighlighted.~~ Resolved 2026-11-17 by "Code theme" below: Shiki with a custom brand theme. `CLAUDE.md` was corrected on 2026-11-18.

## Work index (task 5.2) — project inventory

Decided by the owner on 2026-11-16, from the public repos on GitHub (`trinity-bytes`) plus Viora and the Bionutricel catalog. 12 projects:

| Tier | Project | Notes |
| --- | --- | --- |
| Case study | Viora | Team of 5, 2026; groups the five `viora-*` repos |
| Case study | Mink'a | 2026; groups `minka` (landing) and `minka-android` |
| Case study | Inspiration Garden | Solo, 2026 |
| Case study | Tranqui | Team of 5, 2025–2026 |
| Shipped | Trama | Curriculum prerequisite graphs, 2025 |
| Shipped | ASM8 | 8-bit assembler IDE; the owner's remake and update of an old, abandoned project (the repo is a fork), 2026 |
| Shipped | Grayscale Studio | 2026 |
| Shipped | AllinBand | Landing, UPC course, team, 2025 |
| Shipped | Bionutricel catalog | Client work, solo, 2026. Repo `bionutricel-peru/catalogo-web` is private (no public code link). Design in Figma file `jd2kWdP7un13KLzflDm2Qf` (desktop home `81:4552`, og:image `76:4331`); the cover on the Work index is a 1280×720 crop of that desktop home's first viewport. Live URL pending |
| Shipped | Queens | Logic puzzle game, 2026 |
| Small builds | coursera-clone | C++ console, 2025 |
| Small builds | forest-hero-2 | Pixel-art game, C++, 2024 |

Left out: GitHub Stats Extended and the certificates web service (owner); Green Circuit until the owner reworks it ("lo volvere a agregar cuano le haga un rework"); omarchy-lock-keys-osd, zapa-facil, assembly-scripts, forest-hero (owner kept only two archive entries); private repos and the profile repo.

First draft board: Proposal A · three shelves `2234:2` on the "Work — all projects" page, synced to this table on 2026-11-16. The third tier is named "Small builds" (owner: "que se queden en sall builds"), kept as its own section rather than folded into Shipped. Hanken Grotesk has no "↗" glyph (it falls back to an emoji); link arrows on this board use "→".

Directions A (three shelves), B (one index) and C (by year), built 2026-11-16, were rejected and deleted by the owner, verbatim: "no me convencen para nada. sompelmete horribles. ya las borre." The cloned Home footer was rejected on this page too: "el footer esta horrible."

Hierarchy the owner set for the next attempt: **Featured projects → More projects → Small experiments** ("que l jerarquia sea: proyectos destacados, mas proyectos, pequeños experimentos").

**Work index v2** `2239:17` (2026-11-16), built from clones of Home v3.5 Outside sections so it carries the Home's look:

- Hero `2239:18`: Home hero layers with the portrait removed; the display word "Work" sits between the sky and the near hill. The intro copy is [Draft].
- 01 Featured `2239:46`: the Home Work section (light, grain, bytes) with Viora wide, Mink'a + Tranqui paired, and Inspiration Garden wide and mirrored (image on the right). Years are removed from the meta lines so the page stays timeless (owner: "es importante que sea atemporal").
- 02 More projects + 03 Small experiments `2239:187`: the Home Experience background (light, grain, gradient; its bytes layer is removed because the masks were computed for the old text). There are 6 cards in a 3-column grid, each with a real live-site capture inside a browser frame (captured 2026-11-16 at 1440×900). Small experiments are two dark terminal-style tiles.
- 04 Contact `2239:363` and the footer `2239:401`: Home clones, so the hill rises out of the Contact sky as it does on Home.
- Owner review (2026-11-16): "me gusta mucho mas este diseño". The owner adjusted the hero by hand and deleted every other board on the Work page. They asked for the bytes back, as on Home ("aca no se ven").
- Bytes regenerated on 01 Featured (`2239:51`) and 02/03 (`2242:52`). Each layer covers the full current section. The "where the light falls" fields sit in the open areas: Featured at the top right and around Garden; More projects at the top right, the left middle and beside Small experiments. The seams sit at the top and bottom. Each of the 5 steps (20% opacity) is masked by the section minus the text that sits on the background, expanded by the step margin with rounded corners. The cards are opaque, so they cover the bytes without any mask. If you change copy or layout, regenerate the masks.
- Responsive (2026-11-16): tablet 768 `2247:2` and mobile 390 `2248:2`, to the right of the desktop board. Each is built from that breakpoint's Home v3.5 sections (hero, Work, the Experience background, Contact, footer) plus the desktop v2 content: the hero has no portrait and the word "Work" is right-aligned behind the hill, following the owner's desktop adjustment. Featured: Viora, Mink'a + Tranqui (paired on tablet, stacked on mobile), then Garden. More projects: 2 columns on tablet, 1 on mobile. Small experiments: 2 columns on tablet, stacked on mobile. Bytes were regenerated on all four sections (Featured `2247:44` / `2248:49`, More `2247:355` / `2248:360`).
- Approved 2026-11-16 at all three breakpoints ("de momento queda"). The owner will make manual adjustments on the boards; re-read them before building on them. Possible mobile improvement, not applied: compact horizontal cards for More projects, which would cut about 2,700 px of scroll and make the hierarchy clearer.

## Case study v3 (task 5.1) — desktop proposal, 2026-11-16

Boards on "Case study — Inspiration Garden" (`2047:13`): **Outside `2257:2`** (x 3400) and **Inside `2263:2`** (x 5040). The 2026-11-09 boards (`2047:14`, `2050:2`, `2063:2`) stay to their left as reference. Outside was built from a clone of Work index v2; Inside is a clone of Outside with the Home v3.5 Inside hero overlay, sun mask, hill filter, Nav, section backgrounds, Contact, footer and Viora card cloned in, then a recolor pass by the state table (section 3.4).

Sections, one pattern each, neighbours alternating sand/cream (Inside 900/950):

| # | Section | Pattern | Inside |
|---|---|---|---|
| 01 | Hero | Home landscape; "Garden" between sky and hill (right-aligned); "← All work", meta, name, one-liner, two buttons | Dusk, outlined name, "Read the API docs" |
| 02 | Overview | Real product shot in a browser frame overlapping the hero by 64 px, then four figures on sun-soft markers (46 days · 7 days · 33 releases · 1 person) | Three annotations below the shot (one origin, ⌘K search, three.js canvas); figures v1.0.0 · v0.1.0 · 3 workspaces · 1 origin |
| 03 | The problem | Two columns: headline / body + "The constraint" row | "The requirements" |
| 04 | What it does | Three fixed rows: screenshot left, number/title/text right | "How it works" (FTS5, hybrid model, edge thumbnails) |
| 05 | Decisions | Table: # / The choice / Why / What it cost | Decision / Why / Trade-off (one origin, agents write directly, hybrid model, thumbnails at the edge) |
| 06 | What I got wrong | Headline + text, then before / after pair | Glass vs contrast, PR #1 on day 11 |
| 07 | How it grew | Four milestones on one rule (Day 0, 7, 36, 46) | Tags, plus the release workflow |
| 08 | Next case study | Viora card (Inside: the Home Inside Viora card) + "All work →" | — |
| — | Contact, footer | Home clones | Home Inside clones |

Facts come from the `my-inspiration-garden` repo on 2026-11-16: first commit Sep 23, v0.1.0 Sep 30 (day 7), 10 tags on Oct 29 (v0.5.0 → v0.8.1, day 36), solid cartoon panels merged Oct 4 (PR #1, day 11), v1.0.0 Nov 8 (day 46, 29 earlier tags), 33 tags, 290 commits. Days count elapsed days (first commit = day 0), matching Home's "7 days" and "day 46". Note: Home Inside says "34 tags"; the repo has 33. Screenshots are the repo's `docs/images` (converted to PNG). Years are left out, as on the Work index (timeless).

Open: all new copy is [Draft]; decision 04 trade-off is [Owner: …]; the "before" shot of v0.1.0 is a placeholder; bytes masks were regenerated after the copy pass, so regenerate them again after any copy edit.

### Case study v4 — one version (D21, 2026-11-17)

Board `2270:2` (x 6700), a clone of the v3 Outside board with the technical layer from v3 Inside merged in, section by section: a stack line in the hero; three ink annotations below the product shot (one origin, ⌘K search, three.js canvas) and technical captions on the figures; "Requirements" and "Constraint" rows in the problem; an "Under the hood" row after each feature; a mono technical subtitle under each decision title, with the Why and Trade-off texts from Inside; technical lines in the milestones and the CI release workflow in the footnote. No lens dock. Bytes masks were regenerated on every section.

Owner review of v4 (2026-11-17): "me gusta la dirección", with manual edits on the hero and footer. Read back the same day: the hero is 745 px tall and no longer has the "Garden" display word (sky, near hill, Nav and Intro remain; the sky and hill transforms were changed by hand); the footer is 561 px, its columns start at y 67 and the ghost name sits at y 261. The owner's version wins: re-read both before building tablet and mobile.

### Case study v5 — audit P1 fixes (2026-11-17)

Board `2285:2` (x 8340), a clone of v4 `2270:2` (owner's hero and footer kept). It applies the P1 findings of the v4 audit, which the owner accepted ("dale"):

- **Repetition cut.** The three ink annotations under the product shot are gone. At a glance is now four facts in the Contact pattern (My role / Built with / Status / Who adds to it) instead of 46 days · 7 days · 33 releases · 1 person, which the timeline already carries. The stack line left the hero (it lives in At a glance) and the meta drops "SOLO".
- **One fact, one place.** Under the hood 02 now covers link unfurl, R2 preview copies and colour indexing (the hybrid model stays in decision 03); Under the hood 03 covers the PWA and the sub-480 px bottom sheets (thumbnails stay in decision 04). Sources: Garden `docs/api.md`, `apps/web/src/styles/glass.css`.
- **The agents are shown.** New feature row "AI agents keep it tidy" with a terminal card. The session is illustrative and marked `[Owner: replace with a real agent session]`; tags, endpoints and the 64-tag count come from the live API on 2026-11-17.
- **Numbering.** Only sections are numbered; feature and decision numbers are gone and Contact has no number.
- **Phone vs slow phones.** Decision 04 is renamed "Thumbnails, never originals" (mobile arrived in v1.0.0, so "phones first" was not true).
- **What I got wrong, corrected.** The repo contradicts the v4 copy: PR #1 (day 11) was about the sky going unnoticed, the glass no longer fitting and navigation speed, not contrast; and glass came back on day 35 (v0.3.0) as dark glass at 75% (`--glass-fill`), documented at 5.3:1 over a pure white card. The v0.1.0 placeholder is replaced by three panels rebuilt from each release's tokens (v0.1.0 light glass at 65%; day 11 solid cartoon, ink ~14:1; day 35 to today dark glass). No v0.1.0 build is needed.
- **Closing.** How it grew ends with "Where it is now" (item count is `[Owner: …]`; the API has no total and the garden is not paged) and "What I would do differently" [Draft].

Bytes masks were rebuilt on every edited section. Still open from the audit (P2): repeated canvas look in features 01/02 (only re-cropped), the `&amp;` and doubled titles inside the screenshots, the Viora next-card size and placeholder, Work active state in the nav, availability repeated in the footer, fewer bytes bands, a design-process artifact.

Same day, after checking the `my-inspiration-garden` Engram memory (owner-authorized):

- The terminal now shows the real 2026-11-15 cleanup session, reconstructed from its record (75 → 64 tags, ~35 items translated, 26 titled, a 2-level category tree of 4 roots and 9 leaves, 190 items sorted), marked `[Owner: confirm wording]`. The earlier illustrative session used the tag `inspiration`, which that cleanup deleted.
- Era panels show current tags (design 137 · portfolio 61 · ai 39, live API).
- Decision 04 is filled: originals cost 265 MB per phone session, thumbnails brought media to about 1.2 MB (p99 frame ~600 → ~60 ms in the same benchmark); trade-off is the Cloudflare Images dependency, with a fall-back to the original.
- The item count is filled: about 190 items (Status fact and "Where it is now").
- The dark glass of day 35 was a "Viora-style liquid glass"; its 5.3:1 over white is confirmed by the session record.
- **Second story, applied (owner: "dale").** "What I got wrong" is now "Two things I got wrong.": the sky story, then "An agent wiped the tags of 58 items" (day 53, 2026-11-15): a Zod `.default([])` survived `.partial()`, so a PATCH that omitted `tags` cleared them; restored from a local snapshot; hotfix v1.2.1 (`c6aaead`, "keep stored tags and categories when a patch omits them") the same day. Two code cards (before v1.2.0 / after v1.2.1) show it. Decision 02's cost now names the incident.
- The `&amp;` in the screenshots was already decoded in the data on 2026-11-15, so recapturing the screenshots fixes it.

### Case study v6 — whiter surfaces (2026-11-17)

Board `2298:2` (x 10000), a clone of v5 `2285:2` with only the backgrounds changed. Owner: "me gustaría que el fondo reduzca los tonos amarillos... una tendencia hacia los colores más 'blancos' de la paleta. El amarillentismo queda bien en el home pero no tanto acá."

- Section bands shift one step lighter: cream `#FAF6E8` → card `#FFFDF7`, sand `#F3EDD6` → cream `#FAF6E8`. Sand is no longer used on the case study.
- Each "bg / gradient into next section" now ends in the next section's new fill.
- The sun-soft glows (`bg / light`, sections 03, 05, 07) drop from 55% to 15%; the green glows stay at 22%.
- Hero, Contact and footer are unchanged. The home keeps the warm cream/sand bands.

#### Scannability: claim first (v6, 2026-11-17)

Owner: "no es tan fácil de escanear con la vista... no se identifica al instante qué son cifras relevantes, o por qué son relevantes... revisar cómo se presenta la información y cómo rápidamente el visitante puede entender el valor (de criterio, o aporte mío)". Not a font problem.

Principle: each block leads with what it shows; the figure is the proof; the date is metadata. Reading only the large text must give the value.

Applied to "How it grew" (`2298:955`) as the pilot:
- Day labels drop from Epilogue Medium 34 to IBM Plex Mono Medium 13 (`DAY 0`).
- Milestone titles become claims in Epilogue SemiBold 26: "The foundation came first", "In daily use within a week", "Shipped in small steps", "v1.0 without a rewrite". Bodies carry the facts already on the board.
- The mono footnote is replaced by a proof row in the Home proof pattern (sun dot, "33 releases" in Epilogue Medium 34 green-700, caption). The old footnote stays hidden as `2298:1140`.

Next: owner validates the pattern, then it is applied to the other sections.

## Notes index and post template v3 (task 5.3) — desktop proposal, 2026-11-17

Boards on "Writing — blog" (`2066:2`), to the right of the 2026-11-09 v2 boards (kept as reference). Built from the Work index v2 board (hero, Contact, footer) and the Home v3.5 Notes section, so they share the Home look. The page is "Notes", following the nav label (D15).

**Notes index v3 `2301:86`** (x 3400):
- Hero: Work v2 landscape with the display word "Notes", right-aligned at 64 px from the edge. The intro copy is [Draft].
- 01 Writing `2301:629`: the Home Notes section, extended. "Essays and tutorials" + "RSS feed →"; the latest post featured (the real boundary-checker post, 2 min read, Nov 20, 2024); then rows with type chip, title, a one-line description under it and date · minutes on the right. "Hello, world" is real; the other three rows are placeholders. Elsewhere stays as the right column (placeholders). Background is cream `#FAF6E8` (whiter, as on case study v6), so the `#FFFDF7` featured card still reads.
- 02 Contact and the footer: Work v2 clones.

**Post template v3 `2303:2`** (x 5040), shown with the real post "Why this site enforces its own architecture with a zero-dependency script":
- Compact hero (560): sky and far hills, no display word. Meta line "← ALL NOTES · ESSAY · date · read time", title Epilogue SemiBold 56, the description as the dek.
- 02 Article `2303:25`: reading column 680 (Hanken 19/165), H2 in Epilogue SemiBold 32, inline code in IBM Plex Mono green-700, a plain code block (green-950, file name and Copy, no highlighting), a pull quote with a green-700 rule, a green-50 note, an optional figure with a caption, then "Updated · tags" and "Keep reading" rows. On the right, a sticky "In this post" list and "First published on dev.to ↗" (from `canonicalUrl`).
- Body copy is condensed from the real post; the quote paraphrases its "a lock, not a vault" line.

Open points:
- **Code highlighting.** `openspec/config.yaml` says Shiki; `CLAUDE.md` says code fences render unhighlighted by design. The template follows `CLAUDE.md` (plain). Owner decision still needed before the post page is built.
- **Post type.** The chips show Essay / Tutorial, but the `posts` schema has no type field. Add it at implementation or drop the chips.
- **Bytes.** Not regenerated: the Notes section keeps the Home masks (stretched section), the Article bytes layer is hidden. Regenerate after the owner approves the layout.
- Tutorial blocks (step label) from v2 are not shown on v3; the essay is the example.
- Tablet and mobile: see "Notes v3 responsive" below.
- Owner, 2026-11-17: "ajusta el hero de notes index y footer de ambos para que sean como en el caso de estudio". The index hero is now a clone of the case study v6 hero (`2304:2`): no display word, intro with "NOTES · WRITING AND ELSEWHERE", title "Notes", sub [Draft]; back link and buttons hidden. Both footers are clones of the case study v6 footer (index `2304:29`, post `2304:51`). The post hero is unchanged.
- Owner, same day: "el hero del notes index necesita un rework, eso no va a cambiar así que podemos usar ese factor. En el caso de estudio quité el texto en grande porque el titular cambiaba de acuerdo al nombre del proyecto, en este caso no." The display word "Notes" (`2305:3`) is back between the sky and the near hill, right-aligned at 64 px, on the case study hero layers. Because the word names the page, the intro has no title: marker, headline (Epilogue SemiBold 34) and sub, both [Draft]. **Rule:** use the display word only on pages whose title never changes (Home, Work, Notes); not on case studies.
- **Contact on posts is compact (owner approved, 2026-11-17).** The full Contact section stays on Home, Work, case studies and the Notes index: every page is an entry point and the site has one goal. On a post the reader came to read, so a full "Let's talk" sky reads as a sales pitch. The post ends with an author card `2306:2` between the tags line and "Keep reading": avatar placeholder (JT on green-100, to be replaced by the profile photo), "Written by Jahat Trinidad", "Design engineer, frontend and product. Open to an internship, now.", and a "Write to me →" button that goes to Contact. The full Contact section on the post board is hidden (`2303:128`), so the footer hill rises straight out of the article background. Suggested, not applied: a Contact headline per page context (for example on case studies) so the repeated block does not become invisible.
- Owner: "sin el cta de antes el footer queda horrible". The footer hill needs a sky to rise out of. On the post, the Contact section is kept as a **sky band** `2303:128` (420 px, its content hidden) with a cream-to-transparent fade `2307:2` (220 px) at the top, so the article fades into the sunset and the hill rises from it. Rule: the footer always sits under a sky; a page without the full Contact gets the sky band.

## Case study v6 and Notes v3 responsive — proposals, 2026-11-17

Built by two Codex agents (gpt-6.1-terra, launched through Herdr) and reviewed by the supervising session with full-board screenshots; one correction round each. Same rules as "Home v3.5 responsive" (gutters 20 / 40, type steps, mobile nav with menu button, footer under a sky). Owner closed the design on 2026-11-17 ("listo cerramos el diseño").

| Board | Id | Page | Position |
|---|---|---|---|
| Case study v6 · TABLET 768 | `2312:2` | Case study `2047:13` | x 11640, y 0 |
| Case study v6 · MOBILE 390 | `2312:1330` | Case study `2047:13` | x 12608, y 0 |
| Notes index v3 · TABLET 768 | `2312:2658` | Writing `2066:2` | x 6680, y 0 |
| Notes index v3 · MOBILE 390 | `2312:2850` | Writing `2066:2` | x 7648, y 0 |
| Post template v3 · TABLET 768 | `2312:3042` | Writing `2066:2` | x 8238, y 0 |
| Post template v3 · MOBILE 390 | `2312:3232` | Writing `2066:2` | x 9206, y 0 |

Case study:
- Feature rows, decisions and era figures stack on both widths (figure above text). Fact rows (label | text) span the full content width on tablet and stack on mobile.
- "How it grew" is a vertical timeline on both widths: dots aligned to the DAY labels, line from first to last dot, then the "33 releases" proof row.
- "An agent wiped the tags": BEFORE and AFTER code cards stack on tablet too; code at 13 px, "58 items" moved to its own comment line so no token wraps.
- Terminal card on mobile: IBM Plex Mono 12/18, long lines wrap with a hanging indent.
- Bytes masks rebuilt so bytes never sit behind text.
- Era figures ("The sky I loved went unnoticed", tablet): the tiles stretch to 688 × 300 but their content was left-aligned for the 416 desktop tile, leaving the right half empty. The tiles now keep their desktop size and composition (416 × 300, centred in the column; each caption stays under its card) instead of filling the width (owner, 2026-11-17: "se ve rara esta sección en la vista tablet" / "queda raro rellenar ancho solo porque sí"), and the stacked eras are 40 apart (was 20) so each caption reads as part of its own tile. Section 06 grew 40 px; its `bg /` layers and bytes bands were refitted.

Notes:
- Index: display word "Notes" fitted inside the gutters; Writing and Elsewhere stack on both widths. Post rows keep the desktop three-column row on tablet (chip | title + description | date · min) and stack on mobile (chip, title, description, meta; 12 / 4 / 8 spacing).
- Post: meta split into "← ALL NOTES" (44 px hit area) and "ESSAY · date · read time"; mobile hero 620. "In this post" and "First published on dev.to" move above the article. H2 spacing 40 above / 12 below on mobile, 48 / 16 on tablet. Code block keeps its size and is clipped with a fade at the right (horizontal scroll). "Updated …" and tags on two lines. Author card stacks on mobile. Sky band and fade kept above the footer.

Open points for the owner:
- Mobile Contact fact rows (inherited from the approved Home mobile): the divider sits right under the value text with no breathing room; applies to every page that uses the Contact clone.
- The index bytes masks were stretched, not regenerated around the responsive text.
- Inspiration Garden product screenshots contain doubled text and an encoded "&amp;" from the source images (also on desktop).

## Code theme (Shiki, custom) — approved 2026-11-17

Owner decision: code blocks are highlighted with Shiki using a custom brand theme (task 7.3). One dark theme serves Outside and Inside, because the block is green-950 in both. Figma: post v3.1 clone `2332:2`, highlighted block `2332:82`, roles card `2332:192`. Contrast is WCAG against `#0A200B`.

| Role | Color | Contrast |
|---|---|---|
| Background | green-950 `#0A200B` | — |
| Text, variables | cream `#FAF6E8` | 16.0:1 |
| Keywords | sun `#F6D653` | 12.0:1 |
| Functions, methods | green-300 `#88E88C` | 11.4:1 |
| Strings, regex | `#61D56A` | 9.2:1 |
| Numbers, constants, types | sun-soft `#FBEBA0` | 14.3:1 |
| Comments (italic) | `#7FA882` (new, not in the palette) | 6.4:1 |
| Punctuation, operators | green-200 `#B3F3B4` | 13.4:1 |

Rejected: existing themes (Everforest Dark bg `#2D353B`, Vitesse Dark bg `#121212`) would need their background and most token colors overridden. green-700 for comments fails AA (2.65:1). Known weak spot: strings and functions are both greens and sit close; the owner saw it and kept it (alternative offered: strings in sun-soft).
