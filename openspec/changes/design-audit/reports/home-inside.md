# Home Inside and chat: as-built report

Figma file `gq6glEp9QrPOnEyYG9dldh`, page `As built · Home Inside & chat` (`2449:3558`). Site: `http://127.0.0.1:4321/` with `data-lens="inside"`, `/usr/bin/chromium` 156, reduced motion, 2026-11-25. Figma was only read for this report. It replaces `home-inside-preliminary.md`.

## Boards built

All three were made with the DOM pipeline (`tools/extract.cjs`, `builder.js`): a locked background plate per section plus editable layers; no auto layout and no components. Numbers below are from after the 2026-11-25 fixes (see "Fixed 2026-11-25"). "Plain" is `diff.cjs`, "aligned" is `adiff.cjs`.

| Board | Node | Size (site) | Source (approved) | Plain total / worst 500 px band | Aligned total / worst band | Against the pass rule |
|---|---|---|---|---|---|---|
| As built · Home v3.5 INSIDE · 1440 | `2474:12` | 1440 × 8066 (8066) | `2191:503` | 1.72 % / 2.9 % | 1.58 % / 2.9 % | Meets 3 % / 8 % |
| As built · Home v3.5 INSIDE · TABLET 768 · 768 | `2476:14` | 768 × 10059 (10059) | `2213:86` | 2.41 % / 4.5 % | 1.99 % / 3.3 % | Meets 3 % / 8 % |
| As built · Home v3.5 INSIDE · MOBILE 390 · 390 | `2477:14` | 390 × 11017 (11017) | `2212:86` | 3.97 % / 6.9 % | 3.27 % / 5.0 % | Meets the numbers of the provisional 390 rule (every band ≤ 8 %); owner review pending |

At 390 the difference mask after the fixes shows text edges, image resampling and 1 px rules and outlines. The numbers do not detect small local errors: see "What does not match exactly" (for example the "·" separators at 1440 and 768, fixed later by task F).

Chat captures (image fills, decision A6): frames `2481:14`–`2481:44`, caption `2481:12`.

## Differences found (approved board → site)

### All widths

| Section | Approved board | Site now |
|---|---|---|
| Hero copy and layers | Eyebrow, headline, sub, button, name outline, "01 — INSIDE" and the Esc hint | Same copy and structure |
| Hero annotations | Files `bg-back.png`, `bg-front-hill.png` | `sky.png`, `near-hill.png` |
| Values heading | "The same three promises, traced to the repo. [Draft]" | "How each promise was built." |
| Values sub | "…its tags, its releases and the services it runs on. [Draft]" | "…its releases and the services it runs on." |
| Values table | Green rules | White rules |
| Garden card | "…34 tags so far. [Draft]" | "…33 releases so far, from v0.1.0 to v1.2.1."; title in a lighter weight |
| Work link | "See all projects · [N] →" | "See all projects · 17 →" |
| Viora | Draft stack; "[Owner: name the pieces you built.]"; "[Owner: one technical decision you would defend.]" | Real stack, ownership and key decision (Spring Boot over ASP.NET Core) |
| Mink'a | Stack includes "Room + DataStore"; owned "app prototypes and the app's implementation"; decision "no web version" | "DataStore" without Room; "the app's design and its build"; "A native Android app replaced the earlier web prototype; the website is now a landing." |
| Tranqui | "App: Flutter."; short decision ending in "[Draft]" | "A Flutter app is planned separately."; longer ownership and decision copy |
| Work annotation | "[canvas glyph field] paused under reduced motion" on the Tranqui cover | Absent |
| Experience heading and sub | "The skills under each role [Draft]"; "Not all of it was software…[Draft]" | "What each job left in my toolkit"; "Brand work taught me systems, teaching taught me to explain, and running community channels taught me to listen to users…" |
| Experience lists and annotations | Four "carries into how I build" items, roles, chips; course design and vMix annotations | Same text |
| Notes heading | "How a post gets here [Draft]" | "Notes on building things" |
| Notes list | Featured card, two placeholder rows, "ELSEWHERE · LATEST POSTS" with three rows | Featured card only; no rows, no Elsewhere |
| Notes meta | "[N] min read · [date] →" | "2 min read · Sep 18, 2026 →" |
| Notes annotations | Feed, MDX and "[one call site · both rows]" | Feed and MDX only |
| Contact heading | "Read the source, then let's talk about your team. [Draft]" | "You've seen how I build. What should we build together?" |
| Contact facts | Same three facts, dim green rules | Same facts, white rules |
| Composer | "Tell me about your team and your stack… [Draft]" | "What are you building, and where could I help?" |
| Composer annotation | "free text or a suggestion, drafts the email" | "free text or a chip · scripted, no AI model" |
| Chips and note | "I’m hiring", "I have a project"; no note | "I'm hiring" (straight apostrophe), light outlines; note "Goes straight to my inbox." |
| Fallback links | Copy my email, LinkedIn ↗ | Also "CV (PDF)" ↗ |
| Footer links | No X; no arrows | X added; ↗ on GitHub, LinkedIn, Instagram, YouTube, X, RSS and the source link |
| Footer "This site" | "EN / ES / PT", source, "Press Esc or I to go back outside" | No language row; adds "Turn off the I shortcut" |
| Footer closing | Flat dark-green "@trinitybytes"; copyright below it | Image-filled "@trinitybytes", cut by the page end; copyright above it |
| Lens toggle | "Back outside · Esc" pill at the bottom right of the first screen | Same label and corner; fixed |

### Width specific

Approved → site section heights:

| Section | 1440 | 768 | 390 |
|---|---|---|---|
| Hero | 900 → 900 | 867 → 867 | 862 → 862 |
| Hero layer notes | in the hero | 184 → 184 | 184 → 184 |
| Values | 1232 → 1174 | 1728 → 1750 | 1629 → 1601 |
| Work | 1762 → 2084 | 2119 → 2326 | 2688 → 2877 |
| Experience | 1613 → 1676 | 2461 → 2605 | 2826 → 2999 |
| Notes | 865 → 706 | 1330 → 862 | 1560 → 824 |
| Contact | 864 → 890 | 811 → 863 | 881 → 988 |
| Footer | 740 → 636 | 562 → 603 | 641 → 683 |
| Page | 7976 → 8066 | 10062 → 10059 | 11271 → 11017 |

| Width | Section | Approved board | Site now |
|---|---|---|---|
| 1440 | Nav | Green-tinted links, smaller language codes | White links, larger language codes |
| 1440 | Values heading | Two lines | One line; table starts about 56 px higher |
| 1440 | Hero portrait | Narrower portrait box; ends above the hero edge with the legs visible | Larger portrait, cut by the hero edge |
| 768, 390 | Hero annotation | "Epilogue Medium · 300 px" | "270 px" (as on 1440) |
| 768, 390 | Hero portrait | Box about 360 wide at 768 and 300 at 390 (measured on the export); contained in the hero | 440 × 660 at 768 and 380 × 570 at 390; runs 120 px past the hero (defect 1) |
| 768 | Annotation pins | Several dashed boxes sit away from their targets (values sub, one across "Video Surveillance Officer", an empty one under vMix, Notes) | Boxes sit on their targets |
| 768 | Work header | One-line heading, link below it | Heading on two lines, link at the right |
| 768 | "Turning user feedback into reports" | Two lines | One line |
| 390 | Viora cover | About 310 × 189 | 310 × 141 |
| 390 | Choir photo | About 320 wide | 350 × 240 |
| 390 | Composer | Placeholder wraps to two lines | One line, truncated |
| 390 | Fallback links | One row | "CV (PDF)" on a second row |

The nav holds the same items at each width (links, language switch and Contact at 1440 and 768; Contact and menu at 390). The scrolled Inside bar shows the "@trinitybytes" wordmark; the Home boards show only the top state, without it, and no approved scrolled Inside bar was compared.

### Preliminary notes

- Confirmed: values, experience, notes and contact headings; "See all projects · 17"; expanded Viora, Mink'a and Tranqui copy.
- Chat: profile photo, Inside palette and a different conversation history confirmed. "Sticky nav and Inside annotation visible" is also true of the captures.
- Dropped: everything about the superseded clones (`2449:3559` and the rest), including their 57 text replacements. They are not the as-built boards.

## Chat (approved → site)

Approved: `2353:103`, `2353:135`, `2354:132`, `2354:194`, `2354:245`, `2354:320`, tablet `2358:302`, desktop `2358:226`. All are in the Outside palette; no approved Inside chat board was among them. The captures walk the hiring flow up to the summary in both lenses.

| Item | Approved board | Site captures |
|---|---|---|
| Avatar | "JT" circle | Profile photo |
| First message | Free text: "We're hiring a frontend intern for our design system team." | The "I'm hiring" chip |
| Test data | Sam Rivera, Alder, sam@alder.dev | Sam Rivera, Acme Studio, sam@example.com |
| Footer note | "Goes straight to my inbox. [Draft]" | Without "[Draft]" |
| Summary note | "Tap a pencil to change one answer. [Draft]" | Without "[Draft]" |
| Summary third row | "Message", with a composed sentence | "Details", with the detail answer only ("Remote is fine") |
| Summary button | "Looks good, send it →" | Same, arrow included |
| Typing step | Dots and a disabled composer (board 01) | Not captured; the captures show settled steps |
| Focus | No focus ring drawn | Ring on the composer, and on the first pencil at the summary |
| Page around the card | "06 — CONTACT" and the sunset background, no nav | Sticky nav over the page ("Jahat Trinidad" Outside, "@trinitybytes" Inside); the label is cut under it in the 390 conversation steps |
| Inside lens | — | Dark green card, light green visitor bubbles, "06 — CONTACT · FOR DEVELOPERS", composer annotation pin 1 |
| 1440 layout | Heading and facts left, card right (board 02) | Same two columns; the compared capture is the summary step |
| 768 layout | Heading, facts, then the card (board 02) | Same order; the capture is the summary step |
| Sending, sent, failed | Boards 04, 05, 06 | Not captured (the final button is never pressed) |

Sending, sent and failed, board text against `src/lib/chat/script.en.ts` and `Chat.astro` (source only, not seen running):

- "Sending…", the sent sentence, "See the Garden case study", "Download my CV", "Send another message", "That didn't go through. Your message is still here.", "Nothing was lost.", "Try again" and "Copy my email" match, apart from "[Draft]".
- Board 05 gives "Download my CV" a `→`; the code renders that step as external (`↗`, new tab).

## Defects seen (not fixed)

1. **Hero overflow at 390 and 768.** The hero (862 / 867) does not clip (`overflow: clip visible`); the portrait ends at 982 / 987 and the hill goes further. They paint over the layer-note list: pins 1–3 and the second line of notes 1–3 are hidden. Measured with and without reduced motion; seen in a scrolled viewport at 768 and 390 without reduced motion. `proposal.md` records it for 390 only; **768 is also affected**. At 1440 the portrait box also extends past the hero (to 1020 of 900); no covered content was seen there.
2. **Literal backticks** in the Tranqui key decision: "`<dialog>`" and "`<details>`" show the Markdown marks (confirmed in the live DOM text).
3. 390: the "Back outside" toggle covers part of "01 — INSIDE" and the Esc hint on the first screen.
4. 390: in the idle composer capture the toggle covers the "I have a project" chip.
5. 390: the composer placeholder is truncated ("What are you building, and w…").
6. 390: "CV (PDF)" wraps alone to a second row; fact rules sit directly under the values.
7. 390: keyboard instructions on a phone width: "Press I anywhere…", "press Esc or I to go back outside", "Press Esc or I to go back outside", "Turn off the I shortcut", and the "Esc" key cap on the toggle.
8. 768: the Tranqui meta line breaks inside the date range ("2025– / 2026"). 390: the same kind of break in two "carries" lines ("2019– / 2022", "2024– / now").
9. 768: "How each one is made" wraps, leaving "made" alone beside the link.
10. 768 (by eye): the composer is narrower than the facts column, so its right edge does not line up with the rule.
11. Link-arrow rule (`CLAUDE.md`): "Looks good, send it →" is an in-page action. "press Esc or I to go back outside ↑" ends in an arrow that is not a link. "See my work →" points to `/#work`, a section of the same page; whether the rule allows `→` there is for the owner.
12. Straight apostrophes ("You've", "Garden's", "I'm hiring", "browser's", "apps'") next to curly ones ("Mink’a", "Garden’s build log", "IT’S MADE").
13. By eye, not measured: the layer and component annotations (small grey mono on dark green or over the hill) are very hard to read; the second lines are the faintest.

## Fixed 2026-11-25

All checked against the site captures by eye (zoomed) and re-measured.

| Board | Fix | Nodes |
|---|---|---|
| 1440 `2474:12` | A site crop of the "Back outside" toggle (1170, 815, 206 × 45) now sits above the portrait. The name outline does not overlap the portrait at this width and needed no change | new `2495:12` |
| 768 `2476:14` | The portrait fill is the site's pixels masked to the portrait alpha and transparent below the hero, so the name outline shows over it | `2476:18` (renamed) |
| 768 `2476:14` | The hero overflow (defect 1) is copied: the note-list plate is a site crop of y 867–1051, which also holds the toggle. Its editable items are hidden and named "(hidden: …)" | plate `2476:39`; hidden `2476:40`–`2476:55` |
| 390 `2477:14` | The composer placeholder is the site's truncated text, "What are you building, and w…" | `2477:311` |
| All three | Thin light lines at section joins. Cause: plates at offset 0 inside sections with a fractional y, which left a sub-pixel gap over the board's cream fill. Each plate now sits on a whole pixel; no content moved | 1440 `2474:82`, `136`, `227`, `249`, `291`; 768 `2476:100`, `154`, `251`, `279`, `324`; 390 `2477:98`, `152`, `249`, `277`, `322` |
| 1440 `2474:12`, 768 `2476:14` | Later fix (task F): the 14 missing CSS `::before` "·" separators before the organisation names were added (this closes the separator row under "What does not match exactly"; the site has none at 390) | 1440 new `2497:12`–`2497:18`; 768 new `2497:19`–`2497:25` |

The last 17 px band at 390 went from 11.8 % to 0.0 %.

## What does not match exactly

No open items: the last one, the missing CSS `::before` "·" separators at 1440 and 768, was fixed by task F (see "Fixed 2026-11-25"). The separator is not read by `extract.cjs` (RUNBOOK, "Still manual"). General limits are below.

Hand fixes already on the 390 board before this round (`tasks.md` §1.2c):

- The portrait fill is the site's pixels masked to the portrait alpha, because the name outline is drawn over the portrait on the site and had ended up in the plate under it.
- A site crop of the fixed "Back outside" toggle sits on top, because it had been baked into the hero plate.
- The layer-note list under the hero is a site crop (to copy the overflow); its editable items are hidden and named as such.

General limits: no auto layout or components; small antialiasing, image resampling and 1–2 px text offsets. The site crops (toggle, 768 note list) are flat images and not editable. Hover states, the lens transition, motion and parallax are not represented.
