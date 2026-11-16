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
| Case study — Inspiration Garden | `2047:13` |
| Work — all projects | `2065:2` |
| Writing — blog | `2066:2` |
| Archive (old portfolio, Home v1) | `0:1` |

Boards on "Portfolio — Home":

| Board | Id | Position | Status |
|---|---|---|---|
| Lens — states | `2109:103` | x 0, y 0 | Spec column: rest, dragging (x-ray), dropped |
| Logo — states | `2093:2` | x 0, y 960 | Spec column: the wordmark follows Outside / Inside |
| **Home v3.1 · OUTSIDE** (current) | `2105:2` | x 3480 | Under audit |
| **Home v3.1 · INSIDE** (current, task 3.27) | `2137:2` | x 5120 | Under audit |
| Annotation (Inside) component | `2137:416` | right of Inside | Source of every annotation |

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


Latest boards (2026-11-16, task 3.34): **Home v3.3** Outside `2162:74` (x 7045) and Inside `2162:444` (x 8685), clones of v3.2 with three owner-review fixes:

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
- `openspec/config.yaml` says syntax highlighting is Shiki while `CLAUDE.md` says code fences render unhighlighted. The post template in Figma shows a plain unhighlighted block. This contradiction predates this change and needs an owner decision before the post page is built.
