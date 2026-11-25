# Phase 1 summary: the as-built baseline

For the owner, to decide phase 2. Figma file `gq6glEp9QrPOnEyYG9dldh`. The approved boards were not edited ([decision A1](../proposal.md#decisions)).

## 1. Where the baseline is

The site is `develop` at commit `5a0977a`, captured 2026-11-25 on the local dev server (`src/` and `public/` have no later change).

"Pass" is the [pass rule](../proposal.md#methods): total difference ≤ 3 % and every 500 px band ≤ 8 %. "Aligned" is the row-aligned diff, used where a board was built on another machine and new captures drift a few px. "390 rule" is the provisional rule in section 5. Full numbers: [Outside](home-outside.md#boards-built), [Inside](home-inside.md#boards-built), [Work](work.md#checks), [Notes](notes-and-links.md#boards-built).

| Figma page | Boards (width → node) | Method | Check |
|---|---|---|---|
| `As built · Home Outside` `2449:12` | 1440 → `2449:21` | Edited clone | Aligned pass (1.80 %); plain total 3.09 %; older mean-colour flags remain ([band fixes](home-outside.md#band-fixes-2026-11-25-second-clone)) |
| | 768 → `2487:61` | DOM pipeline | Pass |
| | 390 → `2487:349` | DOM pipeline | **390 rule** |
| | Nav states → `2449:3181`; mobile menu 390 → `2449:3415` | Edited clones | Compared when built; no numbers in the reports |
| `As built · Home Inside & chat` `2449:3558` | 1440 → `2474:12`; 768 → `2476:14` | DOM pipeline | Pass (1.72 % / 2.40 %) |
| | 390 → `2477:14` | DOM pipeline | **390 rule** |
| | Chat → 16 frames `2481:14`–`2481:44`: steps 01–06 at 390 and the summary at 768 and 1440, both lenses | Site captures | Reference images, no diff check |
| `As built · Work & projects` `2446:60` | Work index: 1440 → `2470:870`; 768 → `2471:12` | DOM pipeline | Aligned pass (both) |
| | Work index 390 → `2471:428` | DOM pipeline | **390 rule, with a caveat** (section 5) |
| | Experiments peek 1440 → `2471:840` | DOM pipeline | Pass |
| | TourBench: 1440 → `2471:903`; 768 → `2471:1100`; 390 → `2471:1297` | DOM pipeline | 1440 pass; 768 aligned pass; 390 **390 rule, with a caveat** |
| | Inspiration Garden: 1440 → `2471:1541`; 768 → `2471:1934`; 390 → `2471:2335` | DOM pipeline | 1440 and 768 pass; 390 **390 rule, with a caveat** |
| `As built · Notes & links` `2447:12` | Notes index: `2447:13` / `2447:206` / `2447:393` (1440 / 768 / 390) | Edited clones | A different check: mean colour difference per 200 px band, limit 12 ([pixel check](pixel-check.md)). Within it |
| | Post: `2447:593` / `2447:784` / `2447:980` | Edited clones | Same check, within it |
| | `/links/`: `2447:1188` / `2447:1250` / `2447:1311` | Edited clones | 1440 and 768 within it; 390 at 15.9, recorded as accepted |

Old boards on the Home Outside and Home Inside pages were moved into "Superseded" sections, not deleted. Status per task: [`tasks.md`](../tasks.md).

## 2. What changed from the approved boards to the site

Biggest first. "[Draft]" and placeholder copy was replaced with real copy in most places.

### Home Outside ([full table](home-outside.md#differences-found-approved-board--site))

1. Notes now shows one featured post; the other rows and the Elsewhere column are gone.
2. Contact has new composer copy and chips, an inbox note and a CV download.
3. The footer has a landscape-filled wordmark, new links (X, RSS), arrows on external links and a shortcut switch; at 390 the language list is gone.
4. Work and Values carry real project facts, a project count and a longer Garden description.
5. At 390 the portrait is much larger, the choir photo larger and the Viora cover shorter.
6. The nav marks the current section with a pill; the scrolled bar and language switch changed.

### Home Inside and chat ([full table](home-inside.md#differences-found-approved-board--site), [chat](home-inside.md#chat-approved--site))

1. All draft headings are rewritten (values, experience, notes, contact).
2. Work cards replace placeholders with real stack, ownership and decisions; the copy is much longer.
3. Notes lost the extra rows, the Elsewhere column and two annotations (one in Work, one in Notes).
4. Contact and footer changed as on Outside.
5. At 768 and 390 the portrait is larger and now runs past the hero.
6. The chat uses a profile photo instead of "JT", opens from a chip, and its summary shows "Details" instead of a composed "Message".
7. Inside has a dark chat palette; none of the approved chat boards compared is Inside.

### Work and projects ([full tables](work.md#differences-approved-board--site))

1. Work index: More projects grew from six cards to ten, in a new order, each with a "See the project" button.
2. Work index: Small experiments went from two tiles to four.
3. TourBench differs strongly from its 1440 proposal: new hero image and layout, "At a glance" under a wide product shot, and a large next-project card. The implementation chose this on purpose. 768 and 390 had no approved board.
4. Inspiration Garden keeps its structure; the changes are mainly drafts removed, restyled rebuilt panels and terminal, and a new next-case-study card.
5. Real project copy, credits and captures replace earlier ones on the index.
6. All page types: external links use `↗`; Contact and footer are updated.

### Notes and links ([index](notes-and-links.md#differences-notes-index-all-three-widths), [post](notes-and-links.md#differences-post-all-three-widths), [links](notes-and-links.md#differences-links))

1. The post is now the full real article; the pull quote, note, figure placeholder, "First published" line and "Keep reading" are gone.
2. The Notes index shows one post instead of five, and Elsewhere lists only network names.
3. `/links/` has a fifth card, "Download my CV", and an updated project count.
4. Contact and footer are updated; the footer is a different height.
5. Hero imagery changed: cooled near hill on the index, morning-mist sky on the post.

## 3. Defects seen on the site (not fixed)

Merged across reports, most visible first within each group. Source keys: **P** [proposal](../proposal.md#audit-findings-already-noticed-input-for-phase-2-not-fixed), **O** [Outside](home-outside.md#defects-seen-not-fixed), **I** [Inside](home-inside.md#defects-seen-not-fixed), **W** [Work](work.md#defects-seen-not-fixed), **N** [Notes](notes-and-links.md#defects-seen-not-fixed). "By eye" means judged, not measured.

### Content placeholders

| Where | Defect | Source |
|---|---|---|
| Inspiration Garden, all widths | "[Owner: confirm wording]" is visible in the terminal block. It was the only such string found on the three English Work pages | W |

### Layout and overflow

| Where | Defect | Source |
|---|---|---|
| Home Inside, 768 and 390 | The hero overflows by 120 px and paints over the layer notes, hiding pins 1–3 and the second lines of notes 1–3 | I, P |
| TourBench, 768 and 390 | The "Why it stops at 11 points" table is cut at the right, with no scroll cue | W |
| Post, 390 | The code line is cut at the right, with no scroll cue | N, P |
| Work index and Garden's next-case-study card, 390 | The Viora capture (and the Garden capture on the index) is cropped and loses its own headline text | W |
| Home Outside, 768 | The fixed lens sits over Values on the first screen | O, P |
| `/links/`, 390 | The Elsewhere buttons are cut at the fold; the sun hides behind a card | N, P |
| Contact, 390 | The composer placeholder is truncated | O, I, W, N, P |
| Contact, 390 | "CV (PDF)" wraps alone to a second row | O, I, W, N, P |
| Contact, 390 | Fact rules sit directly under the value text | I, N, P |
| Contact, 768 | The composer is narrower than the facts column (measured 620 in 688 in N and P; by eye in I) | N, P, I |
| Work index, 768 and 390 | Card actions wrap, leaving "Code ↗" alone | W |
| Work index, 1440 | TourBench is alone on the last row | W |
| Notes index, 1440 | With one post, the right column is mostly empty; Elsewhere rows are only network names in 12 px mono | N, P |
| Notes, 390 | The near hill noticeably cuts the "Notes" display word (part of the depth effect) | N |

### Copy and typography

| Where | Defect | Source |
|---|---|---|
| Home Inside, Tranqui card | Literal backticks around `<dialog>` and `<details>` | I |
| TourBench | "Nearest neighbour" has a stray capital mid-sentence | W |
| TourBench, 1440 and 768 | `node --test` breaks into "node --" / "test" | W |
| Contact h2, 768 and 390 | "talk." is alone on the last line | W, N, P |
| Home, 768 (Outside and Inside) | The Tranqui date range breaks at "2025– / 2026" | O, I, P |
| Home Inside, 390 | "2019– / 2022" and "2024– / now" break the same way | I |
| Home Inside, 768 | "How each one is made" leaves "made" alone | I |
| Contact and Inside copy | Straight apostrophes ("I'm hiring", "You've" and others) next to curly ones | O, I, W, P |
| Work index | "trama", "coursera-clone" and "forest-hero-2" are lowercase beside title-case names | W |
| Garden, "What I got wrong" | Filter options in the rebuilt panels read as plain words, not controls | W |

### CLAUDE.md link-arrow rule

| Where | Defect | Source |
|---|---|---|
| Chat summary | "Looks good, send it →" is an in-page action but has an arrow | P, I |
| Home Inside hero | "press Esc or I to go back outside ↑" ends in an arrow that is not a link | I |
| Home Inside hero | "See my work →" goes to a section of the same page; whether the rule allows it is open (section 5) | I |

### Mobile and keyboard

| Where | Defect | Source |
|---|---|---|
| Home Inside, 390 | The "Back outside" toggle covers part of "01 — INSIDE" and the Esc hint | I |
| Home Inside, 390 chat composer | The toggle covers the "I have a project" chip | I |
| Home footer, 390 | "Turn off the I shortcut" is offered on a phone | O, I, P |
| Home Inside, 390 | Also "Press I anywhere…", two Esc or I instructions and an "Esc" key cap | I |

### Contrast (all by eye)

| Where | Defect | Source |
|---|---|---|
| Notes and post heroes | The green sub copy is weak over mid-tone hills and fog | N, P |
| Garden and TourBench heroes, 768 | The subtitle is weak over the photo | W |
| TourBench hero, 390 | "Source on GitHub" sits on a busy part of the image | W |
| Home Inside | The small grey annotations are very hard to read, mostly the second lines | I |

## 4. What the baseline does not show

- **Interaction and motion:** no hover or focus states apart from the experiments peek, the nav states and the focus rings in chat captures. No motion, parallax, lens transition, "Copy" feedback or contents highlight while scrolling.
- **Languages:** no es or pt boards. For Home Outside, structure and heights were compared ([report](home-outside.md#es-and-pt-no-boards)); screenshots were viewed at 1440 only. The Notes report did not check es or pt.
- **Chat:** sending, sent and failed states were not captured; their text was checked in source only ([strings](chat-captures.md#sending-sent-and-error-strings-source)). The typing step is not captured. The final send button was never pressed.
- **Menus and nav:** the menu board is Outside. The Inside report did not compare an Inside menu, or its scrolled bar against an approved board.
- **Pages:** one Work project page and one case study stand for the rest ([decision A4](../proposal.md#decisions)).
- **Editing:** DOM-pipeline boards have no auto layout or components; several clone frames use absolute positioning. None is a base to keep designing on.
- **Known board-to-site gaps:**
  - Home Outside 1440: some backgrounds are flat captures or refitted layers; underlines, outlines and a few px differ ([details](home-outside.md#what-does-not-match-exactly); the clone notes about 768 and 390 describe superseded boards).
  - Home Inside: some hand fixes are flat, non-editable site crops (portrait, toggle, the list under the hero); the "·" separators are hand-added text ([details](home-inside.md#what-does-not-match-exactly)).
  - Work: new captures drift a few px, and terminal and code blocks wrap differently with this machine's monospace font. The 390 masks covered selected regions only ([checks](work.md#checks)).
  - Notes and links: raster backgrounds, forced line breaks and small offsets ([details](notes-and-links.md#what-could-not-be-matched-exactly)).

## 5. Decisions waiting for you

1. **The provisional 390 rule.** You accepted it on 2026-11-25, to review later. It lets a 390 board exceed 3 % in total if every 500 px band is ≤ 8 % and the difference mask shows only text-edge and image-resampling noise ([rule](../proposal.md#methods)). Do you confirm it? These boards rely on it:

   | Board | Node | Note |
   |---|---|---|
   | Home Outside 390 | `2487:349` | Full-height mask reviewed |
   | Home Inside 390 | `2477:14` | Mask also shows 1 px rules and outlines |
   | TourBench 390 | `2471:1297` | Caveat: plain bands reach 12.6 % (machine drift); aligned, the worst is 4.6 %. Selected-region mask |
   | Work index 390 | `2471:428` | Caveat: plain bands reach 25.1 % (machine drift of about 10 px); with `adiff.cjs` (its window is now −4…+12 px) the worst band is 4.3 %. Selected-region mask |
   | Inspiration Garden 390 | `2471:2335` | Caveat: one plain band is above 8 % (terminal block); aligned, all are within it. Selected-region mask |

2. **Phase 2 scope and method.** The audit has not started and waits for your instructions ([open questions](../proposal.md#open-questions)).
3. **Board type.** Are the DOM-generated boards enough for the audit, or do you want editable clones everywhere? ([open questions](../proposal.md#open-questions))
4. **Link-arrow rule.** May "See my work", a link to a section of the same page, use `→`? ([Inside, defect 11](home-inside.md#defects-seen-not-fixed))
