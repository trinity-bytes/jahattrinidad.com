# As built · Notes & links: report

Date: 2026-11-25. Site: http://127.0.0.1:4321, commit 5a0977a. Figma file `gq6glEp9QrPOnEyYG9dldh`, page **"As built · Notes & links"** (`2447:12`), placed before "Archive". The source boards were only cloned, never edited. Each board has a caption. Each was compared side by side with a full-page capture at the same width from the system `/usr/bin/chromium` 158 (reduced motion, `document.fonts.ready` awaited, dev toolbar removed, viewport heights 900 / 1024 / 844).

## Correction after the supervisor check
The first pass used Playwright's bundled headless shell, which wraps some text differently from the system Chromium. The cause was not font loading: the shell still gave 3 lines (3118 tall) with `document.fonts.ready` awaited and the same font faces loaded. The system Chromium gives 2 lines (3080). Fixed against the system browser:
- Notes 1440: featured title on 2 lines, card 343 → 305, everything below moved up, board 3118 → 3080, 1440 background raster recaptured.
- Notes 390: featured description wrap.
- Post 1440 and 768: wraps in four body paragraphs; 768 also the hero description.
- Post 390: wraps in two body paragraphs.
- Post, all widths (missed in the first pass, not a wrap issue): the active contents item "The rule" is now indented, with its dot to the left.
- /links/ (all widths): the two browsers wrap identically; no change.

## Boards built

| Board | Node | Width × height (site height) | Source |
|---|---|---|---|
| As built · Notes index v3 · 1440 | 2447:13 | 1440 × 3080 (3080) | 2301:86 (hero 2304:2) |
| As built · Notes index v3 · 768 | 2447:206 | 768 × 3202 (3202) | 2312:2658 |
| As built · Notes index v3 · 390 | 2447:393 | 390 × 3222 (3222) | 2312:2850 |
| As built · Post template · 1440 | 2447:593 | 1440 × 3785 (3784) | 2332:2 (code theme clone of 2303:2) |
| As built · Post template v3 · 768 | 2447:784 | 768 × 3914 (3914) | 2312:3042 |
| As built · Post template v3 · 390 | 2447:980 | 390 × 4985 (4984) | 2312:3232 |
| As built · /links/ · 1440 | 2447:1188 | 1440 × 900 (900) | 2358:162 |
| As built · /links/ · 768 | 2447:1250 | 768 × 1040 (1040) | 2358:101 |
| As built · /links/ · 390 | 2447:1311 | 390 × 942 (942) | 2356:86 |

`coverage-fixture` is a test fixture. It is not listed on /notes/ (no match in the HTML) and `/notes/coverage-fixture/` returns 404.

## Differences: Notes index (all three widths)

| Section | Approved board | Site now |
|---|---|---|
| Hero copy | Headline and sub end in "[Draft]" | Same copy without "[Draft]" |
| Nav (1440, 768) | No active state; EN/ES/PT 14 px | Pill behind "Notes"; language switch 16 px, 100 wide |
| Hero near hill | Different colour treatment | CSS filter `brightness(1.06) contrast(.95) saturate(.7) hue-rotate(8deg)`; display word moved a few px |
| RSS link | "RSS feed →" | "RSS feed" + arrow-up-right (new tab) |
| Post list | Featured card + 4 rows ("Hello, world" and 3 placeholders) | Featured card only |
| Featured card | "Nov 20, 2024"; title on 2 lines at 1440 | "Sep 18, 2026"; title on 2 lines at 1440 |
| Elsewhere | "ELSEWHERE · LATEST POSTS", rows with date and post excerpt placeholders | "ELSEWHERE", rows with only the network name and ↗ |
| Contact placeholder | "Tell me what you’re looking for…" | "What are you building, and where could I help?" (cut to "…and w..." at 390) |
| Contact chips and note | 41 px chips on 1440/768, "I’m hiring", no note | 44 px chips, "I'm hiring", note "Goes straight to my inbox." |
| Contact fallback | Copy my email, LinkedIn | Also "CV (PDF)" ↗; links underlined; wraps to two rows at 390 |
| Contact sky and layout | No haze | Pale sun haze behind the content column; section 890 / 819 / 930 tall (was 864 / 795 / 855) |
| Footer links | No X, no arrows; "This site" has "EN / ES / PT" | X added; ↗ on every external link; language row removed |
| Footer closing | Flat dark-green "Jahat", partial width; copyright at the bottom | "Jahat" spans the content width, filled with the blue-hour image and cut by the page end; copyright above it |
| Footer height | 561 / 730 / 729 | 720 / 692 / 668 |

## Differences: post (all three widths)

| Section | Approved board | Site now |
|---|---|---|
| Hero sky | 2332:2 (1440) uses the sunset sky | Morning-mist sky with a cooled near hill (almost entirely below the 1440 crop) |
| Nav | No active state | "Notes" pill (1440/768) |
| Meta date | "NOV 20, 2024" | "SEP 18, 2026" |
| Article copy | Condensed and paraphrased version | Full real post (4 H2s, 7 paragraphs) |
| Code block | Multi-line `resolveKey` sample | One line, `const FROM_RE = …`; clipped at the right on 390 with no fade |
| Pull quote, Note, Figure placeholder | Present | Absent |
| "First published on dev.to ↗" | Present | Absent (the post has no `canonicalUrl`) |
| End of article | "Updated Dec 1, 2024 · tags" | Tags only |
| "Keep reading" | Two rows | Absent |
| Author card | "JT" placeholder in 2303:2 family (1440 source) | Profile photo |
| Sky band | Contact sky, 420 | 420; the same sky mirrored, with the cream fade |
| Footer | Old footer | Same new footer as Notes |

## Differences: /links/

| Section | Approved board | Site now |
|---|---|---|
| Work card | "12 PROJECTS · 4 CASE STUDIES" | "18 PROJECTS · 4 CASE STUDIES" |
| Cards | 4 | 5: new "Download my CV" / "PDF · English" ↗ between the latest note and "Write to me" |
| Backgrounds | Sky/hill x: 768 -1102 / -1276; 390 -541 / -734 | 768 -1142 / -1316; 390 -561 / -754; 1440 unchanged |
| Page height | 900 / 1040 / 940 | 900 / 1040 / 942 |
| Positions | Four-card layout | Column re-flowed for five cards; at 390 Elsewhere starts at y 777 |

## Screens with no previous board
- None among the three routes at the three widths.
- No Inside state exists on these routes: pressing I leaves `data-lens="outside"`, and the DOM check found no lens control.

## Defects seen (not fixed)
1. Notes and post heroes: the green sub copy sits over mid-tone hills and fog, so its last line has weak contrast (judged by eye, not measured).
2. Contact h2: leaves "talk." alone on a line at 768 and 390.
3. Contact 390: the placeholder is truncated ("What are you building, and w...").
4. Contact 390: fact dividers sit directly under the value text, with no space.
5. Contact 390: "CV (PDF)" wraps alone to a second row.
6. Contact 768: the composer is 620 wide inside a 688 column, so its right edge does not align with the facts rule.
7. Post 390: the code line is cut hard at the right edge, with no fade or other scroll cue.
8. Notes index: Elsewhere rows show only network names, in 12 px mono; with a single post the desktop right column is mostly empty.
9. Notes 390: the near hill covers the bottom of the "Notes" display word (part of the depth effect, but it cuts the letters noticeably).
10. /links/ 390: the page is 942 tall in an 844 viewport, so the Elsewhere buttons (y 802–854) are cut at the fold. The sun is almost hidden behind the latest-note card.

## What could not be matched exactly
- **Notes section background** (gradient, light, grain, bytes): a raster captured from the site, in the layer "bg / as rendered on site". The old vector layers are kept hidden underneath.
- **Hero near hills:** the CSS filter is baked into uploaded PNGs (Figma has no equivalent filter).
- **Line breaks:** forced with manual newlines to match the browser, so these texts will not reflow naturally.
- **Inline code:** SemiBold in Figma although the CSS says 500, because Figma Medium looked clearly lighter than the browser render.
- **Rebuilt layers:** many edited auto-layout frames, plus the post body, now use absolute positioning. They are an accurate picture, not a reusable template.
- **Small residuals:** about 1 px of text offset and antialiasing differences. The final pass shows no line-wrap or structural difference. Post 1440 and 390 are 1 px taller than the site.
- **Browser dependence:** line wraps follow the system Chromium; other browser builds can wrap some lines differently.
- **Motion:** boards show scroll 0 for the heroes and the resting reduced-motion state for the footer; parallax is not represented.
- **States not captured:** hover, focus, "Copy" feedback, contents highlight while scrolling. The mobile menu and the chat steps were not built here (not among the routes listed for this scope). The /es/ and /pt/ variants were not checked.

## Note for the supervisor
- `git status` shows an untracked `.playwright-mcp/` folder in the repo. This agent did not use the Playwright MCP and did not create or edit any repository file.
