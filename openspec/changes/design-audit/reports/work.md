# As built · Work & projects: differences, defects and checks

Figma page `As built · Work & projects` `2446:60`. Site `http://127.0.0.1:4321/` on `develop`, boards captioned commit `5a0977a` (HEAD `9a3ca48` has no change under `src/` or `public/` against it). Compared 2026-11-25.

Boards are generated from the live DOM (`tools/RUNBOOK.md`), not edited clones of the approved boards: a locked background plate per section plus editable text, rectangles, icons and images. No component instances, no auto layout.

## Differences: approved board → site

Approved boards: Work index `2239:17` (1440), `2247:2` (768), `2248:2` (390); experiments peek `2442:12`; TourBench `2443:12` (1440 only); Inspiration Garden `2298:2`, `2312:2`, `2312:1330`. "All" means every width that has an approved board.

### Shared by all page types

| Section | Kind | Difference | Widths |
|---|---|---|---|
| Nav | Components | The current section has a pill ("Work"); ES and PT are a stronger green. At 390 the nav matches (Contact and menu button) | 1440, 768 |
| Contact | Copy | Placeholder "Tell me what you're looking for…" → "What are you building, and where could I help?"; new line "Goes straight to my inbox."; chip "I’m hiring" now has a straight apostrophe | All |
| Contact | Links | New "CV (PDF) ↗" beside LinkedIn | All |
| Footer | Copy, links | Elsewhere adds X; every external link carries ↗ | All |
| Footer | Structure | "This site" keeps only "Built with Astro · source on GitHub ↗": the "EN / ES / PT" row is gone, and so is "Press I to look inside" where the approved board had it (Work, TourBench) | All |
| Footer | Images | The "Jahat" ghost name was a faint flat dark word above ©; it is now filled with the sunset landscape, sits below © and is cut by the page end | All |
| Section backgrounds | Structure | The site shows a flat colour step at several section boundaries where the approved boards blend (by eye, full-page captures with reduced motion) | All |

### Work index

| Section | Kind | Difference | Widths |
|---|---|---|---|
| Hero | Copy | "[Draft]" removed; the rest is the same | All |
| Featured · Viora | Copy | "My part" now names the pieces (Vue web app, Spring Boot backend with an in-app AI assistant, offline harvest settlements on Android, Flutter alerts); "What it does" → "A web platform for planning, plus mobile apps for producers in the field and cooperatives." | All |
| Featured · Mink’a | Copy | New "The problem" (clothes, books and furniture finding another life); "What it does" now says prototype, exchanges still planned | All |
| Featured · Tranqui | Copy | "What it does" → "A proposed map of anonymous reports, community validation and nearby alerts." | All |
| Featured · Inspiration Garden | Copy | Both "[Draft]" tags removed | All |
| Featured · Viora, Inspiration Garden | Images | At 390 the image box is 310 × 141 with `object-fit: cover`, so the capture is cropped; the approved board shows it whole. The Garden title wraps to two lines | 390 |
| More projects | Structure | Six cards → ten. Order: ASM8, Bionutricel catalog, Grayscale Studio, AllinBand, Queens, trama, coursera-clone, forest-hero-2, Portfolio, TourBench. coursera-clone and forest-hero-2 moved here from Small experiments. At 1440 TourBench is alone on the last row. Columns stay 3 / 2 / 1 | All |
| More projects | Components | Every card gains a filled "See the project →" button; at 768 and 390 "Code ↗" can wrap to a second row. Browser dots grey → green. Kickers are mixed case ("Tool · Remake · Solo") instead of capitals | All |
| More projects | Copy | ASM8 credits Marco Schweighauser’s simulator; Grayscale Studio "Solo" → "Team of 3"; AllinBand "Team" → "Team of 4" and "concept smart band"; Queens loses "daily" and adds "without letting queens touch"; "Trama" → "trama" with new text | All |
| More projects | Images | ASM8 shows the light-theme capture (approved: dark); AllinBand and Queens have new captures; coursera-clone, forest-hero-2 and Portfolio captures are new | All |
| More projects | Links | "Live →", "Code →", "Play →" → ↗; Bionutricel "[Live URL] →" → "Live ↗", no Code link | All |
| Small experiments | Structure, copy | Intro "Course projects where I learned the basics the hard way." removed. Two tiles (coursera-clone, forest-hero-2) → four: Lock Keys OSD, Coursera Clone Web Services, GitHub Profile README, Forest Hero, with new text and chips | All |
| Small experiments | Links | "Code →" → "Code ↗" (and "Live ↗"); "More experiments on GitHub →" → ↗ | All |
| Contact | Structure | Same, "04 — CONTACT" kept; shared contact changes apply | All |

### Small experiments, peek on hover (1440)

| Section | Kind | Difference |
|---|---|---|
| Header | Copy | Proposal intro "Hover a tile to peek inside the repo… [Draft copy]" does not exist on the site; the title is larger |
| Grid | Structure | The proposal's "HOVER / FOCUS" and "DEFAULT" labels and its notes box are board annotations, not site content. The proposal draws two tiles hovered at once; the as-built board shows Lock Keys OSD hovered. On the site, Coursera Clone Web Services and GitHub Profile README also have a peek; Forest Hero has none |
| Hovered tile | Copy | Caption "README capture · 300+ installs" → "300+ installs"; stats date "updated 15 Oct 2026" → "updated Sep 27, 2026" (build-time GitHub data and another format) |
| Hovered tile | Components | Green border on the hovered tile; "Code ↗" sits on its own row under the stats |
| Default tiles | Components | Forest Hero chips "C++, CLI" → "C++"; links are underlined |
| Below grid | Links | "More experiments on GitHub ↗" (not in the proposal) |

### TourBench (project page)

Approved at 1440 only. The implementation chose the case-study pattern on purpose (`portfolio-visual-design/design.md`, "Project page v1").

| Section | Kind | Difference (1440) |
|---|---|---|
| Hero | Images | Terraced-hills landscape → desk, plant and notebook photo |
| Hero | Structure | "← WORK · PROJECT · VISUALIZATION · SOLO" → "← All work" on its own line, then the kicker; the heading is much larger (two lines → four); the product shot now overlaps the hero |
| Hero | Copy, links | "Open the app ↗" → "Open the project ↗"; "Code ↗" → "Source on GitHub ↗" |
| Overview | Structure | Shot left with the facts in a right column → wide centred shot, then "At a glance" as a row of columns with rules |
| Overview | Copy | Window address "tourbench.jahattrinidad.com/app" → without "/app"; the "Status: Live at …" fact is gone (six facts → five) |
| How it works | Copy | "~0.007 s on a laptop" removed; footnote → "Each extra point multiplies the work: 12 points would mean eleven times the tours of 11." (no "[Draft]") |
| How it works | Components | Larger step titles; "From kilometres to impact" wraps to two lines; "WHY IT STOPS AT 11 POINTS" → sentence case; the table's 12 column is no longer red |
| Key decision | Copy, structure | "can’t" → "cannot"; the comma before "and lets" is gone; "instead of nearest neighbour" → "instead of Nearest neighbour"; same three columns |
| Next project | Components, links | One-line bar for Trama with "← All work" at the left → heading "ASM8", "← All work" at the right and a large card with image and "See the project →" |
| Contact | Copy | Label "04 — CONTACT" → "CONTACT"; shared contact changes apply |

768 and 390 have no approved board. As built: the shot overlaps the hero; "At a glance" is 3 columns at 768 (3 + 2) and one column at 390; the three steps are 2 + 1 at 768 and stacked at 390; hero buttons stack at 390; the key decision stacks with "The choice / Why / What it cost" labels; the next-project card stacks.

### Inspiration Garden (case study)

| Section | Kind | Difference | Widths |
|---|---|---|---|
| Hero | Links | "Open the garden →" and "Source on GitHub →" → ↗ | All |
| Hero product shot | Components | Window dots grey → green; larger corner radius at 390 | All |
| At a glance | Components | Labels dark → green; values lighter in weight | All |
| The problem | Copy, type | Both "[Draft]" tags removed; Requirements and Constraint text is larger | All |
| What it does | Type | "Under the hood" text is larger, so the rows are taller | All |
| What it does · terminal | Copy, components | Same words; line breaks differ (they also depend on the visitor’s `monospace` font); commands and numbers are coloured; the "Reconstructed from the 15 Nov cleanup session [Owner: confirm wording]" line went from faint to bright bold | All |
| Decisions | Copy, components | Same copy and structure; the apostrophe in "58 items’" is now curly; the rule under the column headings is lighter at 1440; at 768 and 390 the gaps between choice, "Why" and "What it cost" are larger | All |
| What I got wrong · panels | Components, images | The three rebuilt panels show "Image Link Video Font" as plain words (approved: chips); different tile art behind panels 1 and 3; captions are all dark mono (approved: green mono and dark sans); "Panels rebuilt…" went from small green mono to body text, and a rule follows it | All |
| What I got wrong | Copy, components | "[Draft]" tags removed; code blocks are syntax coloured and "58 items" moved; at 390 `tags: tagListSchema.optional(),` stays on one line (approved: three) | All |
| How it grew | Copy, structure | "[Draft]" removed. "33 releases" sits beside its text at 768 (approved: above it); stacked at 390 on both; "Shipped in small steps" fits one line at 1440 | All |
| Next case study | Links | "All work →" → "← All work" | All |
| Next case study · Viora | Copy | Kicker loses "· TEAM OF 5" (the Work index card keeps it); new "My part" and "What it does"; the "[Owner: name the pieces you built.]" placeholder is gone | All |
| Next case study · Viora | Images | At 390 the image is cropped to 310 × 141 | 390 |
| Contact | Copy | No section number on both; shared contact changes apply | All |

Heights, approved → site: 1440 11421 → 11764, 768 13377 → 13957, 390 14183 → 14486. Work index: 6810 → 8726, 7541 → 9370, 9685 → 13133. TourBench 1440: 4634 → 5979.

## Defects seen (not fixed)

1. Inspiration Garden, all widths: the placeholder "[Owner: confirm wording]" is visible on the page, in the terminal block. It was the only `[Draft]`, `[Owner…]` or `[Live URL]` string found on the three English pages.
2. TourBench, "At a glance": `node --test` breaks after the dashes at 1440 and 768 ("node --" / "test").
3. TourBench: "instead of Nearest neighbour or 2-opt" has a stray capital.
4. TourBench, 768 and 390: the "Why it stops at 11 points" table is cut at the right edge with no scroll cue (768 cuts "39 916 800"; 390 shows only N = 4 to 8).
5. Work index and next-case-study card, 390: the Viora capture (and on the index the Garden capture) is cropped by a 310 × 141 box and loses its own headline text.
6. Contact, 390: the placeholder is truncated ("What are you building, and w…") and "CV (PDF)" wraps alone to a second row.
7. Contact: "I'm hiring" uses a straight apostrophe.
8. Contact h2, 768 and 390: "talk." is alone on the last line.
9. Work index: "trama", "coursera-clone" and "forest-hero-2" are lowercase beside title-case names; TourBench is alone on the last row at 1440.
10. Work index, 768 and 390: card actions wrap, leaving "Code ↗" alone on a second row.
11. Hero subtitle over the photo has weak contrast on Garden and TourBench at 768, and "Source on GitHub" on TourBench 390 sits on a busy part of the image (by eye, not measured).
12. Garden "What I got wrong": the filter options in the rebuilt panels read as plain words, not controls.

## Checks

`diff` = `tools/diff.cjs` (plain). `adiff` = `tools/adiff.cjs` (row aligned, offsets −2…+6 px). Final values, against a reference captured on this machine. "Before" is the value found at the start of this session (Garden: right after the image upload).

| Key | Board | Size (site height) | diff before → final | adiff before → final | Worst band, diff / adiff | Result |
|---|---|---|---|---|---|---|
| w1440 | `2470:870` | 1440 × 8722 (8726) | 4.14 (not changed) | 1.91 | 10.9 / 3.6 | Pass by adiff (environment drift). Not edited |
| w768 | `2471:12` | 768 × 9365 (9370) | 6.14 → 6.09 | 2.14 → 2.12 | 17.0 / 3.4 | Pass by adiff; plain diff fails from the 5 px drift |
| w390 | `2471:428` | 390 × 13123 (13133) | 10.07 → 10.05 | 4.89 → 4.86 (2.74 with offsets up to +12) | 25.1 / 10.5 (4.3 wide) | **Provisional 390 rule, owner review pending.** The drift reaches 10 px, past the stock tool's +6 window; with +12 it passes outright |
| peek | `2471:840` | 1440 × 1041 (1041) | 2.40 → 2.18 | 2.03 → 1.97 | 2.7 / 2.4 | Pass |
| t1440 | `2471:903` | 1440 × 5977 (5979) | 2.36 → 2.30 | 1.02 → 1.00 | 4.9 / 3.2 | Pass |
| t768 | `2471:1100` | 768 × 6077 (6080) | 4.43 → 4.37 | 1.89 → 1.88 | 8.7 / 4.0 | Pass by adiff (drift) |
| t390 | `2471:1297` | 390 × 6250 (6255) | 7.60 → 7.55 | 3.28 → 3.25 | 12.6 / 4.6 | **Provisional 390 rule, owner review pending** |
| g1440 | `2471:1541` | 1440 × 11764 (11764) | 1.83 → 1.79 | 1.66 → 1.62 | 3.8 / 3.2 | Pass |
| g768 | `2471:1934` | 768 × 13957 (13957) | 2.67 → 2.60 | 2.23 → 2.16 | 6.0 / 3.9 | Pass |
| g390 | `2471:2335` | 390 × 14486 (14486) | 4.46 → 4.41 | 3.72 → 3.66 | 9.3 / 7.3 | **Provisional 390 rule, owner review pending.** One plain band is above 8 % (4500 px, the terminal block); aligned, every band is ≤ 8 % |

Board width equals the capture width on every row; height differences are the known environment drift (g boards have none).

For the 390 boards, side-by-side slices were viewed and a difference mask was made for selected regions (two on w390, two on t390, three on g390), not for the whole height. They show text-edge antialiasing, 1 px rules, image resampling and, on g390 before the font fix, the monospace blocks. Terminal and code blocks (CSS `monospace`) still differ from the local capture: on this machine `fc-match monospace` gives WenQuanYi Zen Hei Mono, which is narrower, while the boards keep the positions and line breaks of their original capture and use Cousine. So on g390 some terminal lines wrap at another word than in the local capture. This is environment drift, not a site change.

## Fixes made on the boards

| Fix | Cause | Boards and nodes |
|---|---|---|
| Garden images uploaded (45) into the mapped nodes after keys and sizes matched | Pending from the build | g1440, g768, g390; node map in `tools/RUNBOOK.md` |
| Lock Keys capture uploaded | The image node had no picture of the capture on the board | peek `2471:847` |
| Code and terminal text set to Cousine (Regular, Italic): 336 nodes | **Systematic:** `builder.js` maps any unknown family, including CSS `monospace`, to Inter | t1440, t768, t390 (3 each); g1440, g768, g390 (109 each) |
| Composer placeholder set to "What are you building, and w…" | **Systematic:** `extract.cjs` ignores `text-overflow: ellipsis` on placeholders | `2471:785`, `2471:1426`, `2471:2677` |
| Space widths restored in "Image Link Video Font" | The builder dropped the extra width between the words | `2471:1719`, `1726`, `1733`, `2120`, `2127`, `2134`, `2521`, `2528`, `2535` |
| Radius 24 and drop shadow on the phone capture | **Systematic:** `extract.cjs` records no radius or shadow on `<img>` | `2471:1581`, `2471:1974`, `2471:2375` |
| Contact background plate 1 px taller, closing a light line above the footer | **Systematic:** integer plate heights on fractional section positions | `2471:339`, `755`, `1011`, `1208`, `1396`, `1845`, `2246`, `2647` |

`builder.js` and `extract.cjs` were not changed while these boards were checked, and no board was rebuilt. The four systematic problems were fixed in the tools later the same day (RUNBOOK, "Tool fixes 2026-11-25"); the boards keep their hand fixes.

## Tooling notes

- The reference `site.png` that `extract.cjs` wrote for Garden 768 had blank images, which read as 65 % bands against a correct board. A second capture with a second screenshot pass fixed it (scratch `ref.cjs`).
- The peek reference was re-created by cropping a full 1440 capture from 50 px above the "03 — SMALL EXPERIMENTS" label, 1041 px tall.
- RUNBOOK said no Garden image had been uploaded; g1440, g768 and two g390 plates already had image fills. All 45 were uploaded again.
- RUNBOOK "Status" and `tasks.md` 1.3 still show the old state; they were outside this task's edit surface.
