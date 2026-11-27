# Home Outside — as-built boards (home-out2)

Figma file `gq6glEp9QrPOnEyYG9dldh`, page `2449:12` "As built · Home Outside" (reused from `home-out`). Reference: 127.0.0.1:4321 at commit `5a0977a`, captured with /usr/bin/chromium, reduced motion, 2026-11-25. All edits are on this page. No repository files edited, nothing committed.

## Boards built

| Name | Node | Width | Figma height / site height | Source | Method and check |
|---|---|---:|---|---|---|
| As built · Home v3.5 OUTSIDE · 1440 | `2449:21` | 1440 | 8136 / 8135 | `2191:86` | Edited clone; 3.09 % plain, 1.80 % aligned (see "Band fixes") |
| As built · Home v3.5 OUTSIDE · TABLET 768 · 768 | `2487:61` | 768 | 9326 / 9326 | `2211:86` | DOM pipeline; plain diff 2.41 %, worst 500 px band 5.1 % (aligned 2.06 %, 4.3 %). Pass |
| As built · Home v3.5 OUTSIDE · MOBILE 390 · 390 | `2487:349` | 390 | 10317 / 10317 | `2210:86` | DOM pipeline; plain diff 4.01 %, worst band 7.0 % (aligned 3.29 %, 6.3 %). Passes the provisional 390 rule; owner review pending |
| As built · Nav — states · 1440 | `2449:3181` | 2920 holder | components + two scrolled demos | `2185:56` | Edited clone; unchanged |
| As built · Mobile menu open · 390 | `2449:3415` | 390 × 844 | sheet 594 / 594 | `2391:122` | Edited clone; unchanged |

Captions: `2470:1489`, `2470:1492`, `2470:1493`; new boards 768 `2487:348`, 390 `2487:631`. The replaced clones `2449:608` and `2449:1897` and their captions (`2470:1490`, `2470:1491`) are in the Section "Superseded — clone boards (replaced by DOM pipeline boards 2026-11-25)" below everything on the page; nothing was deleted. The 1440, nav and menu boards were each compared side by side with the site capture when built.

The 768 and 390 boards have a locked background plate per section with editable text, rectangles, icons and images on top; no components and no auto layout. Hand fixes: on both, the portrait fill is the site's pixels masked to the portrait alpha, so it includes the name outline drawn over it (`2487:64`, `2487:352`); on 768, the seven CSS `::before` separators before the organisation names were added (`2491:57`–`2491:63`; the site has none at 390). The lens toggle and the hero's lower edge needed no fix. The 390 difference mask, over the full height, shows text-edge antialiasing, 1 px rules, pill and image-edge resampling and a 1 px fringe around the portrait cut-out, with no layout offset.

## Differences found (approved board → site)

### All Home widths

| Section | Approved board | Site now |
|---|---|---|
| Values | Draft Garden description; tighter paragraph leading | Longer description (design references, tools, libraries, articles, tutorials); paragraphs at line-height 1.6; "Inspiration Garden" title weight 500; fact captions 15/21 |
| Work | Placeholder project count, draft project facts | "See all projects · 17"; new Viora, Mink'a and Tranqui copy |
| Notes | Featured post, two placeholder rows, Elsewhere column | One featured post only ("2 min read · Sep 18, 2026"); rows and Elsewhere gone |
| Contact | Earlier composer placeholder, no CV | "What are you building, and where could I help?", "I'm hiring" / "I have a project", "Goes straight to my inbox.", Copy my email / LinkedIn / CV (PDF); landscape with a light wash on the left |
| Footer | Ghost "Jahat" wordmark, earlier links | Landscape-filled wordmark; Elsewhere adds X and RSS with arrows; This site: source link and "Turn off the I shortcut" |
| Nav language switch | Smaller EN / ES / PT | 16 px codes, 14 px separators |

### Width specific

| Width | Section | Approved board | Site now |
|---|---|---|---|
| 1440 | Hero | name and portrait | Matches; 900 tall at a 900 viewport |
| 1440 | Experience "carries over" | 83 px rows | 88 px rows (27.5 / 23.2 leading) |
| 768 | Hero | name outline over the portrait | Same device; intro sits at y 136 / 169 / 258 / 337 |
| 390 | Hero | portrait 300 × 450 | 380 × 570 at (17, 412); new intro spacing; lens at y 740 |
| 390 | Work | Viora cover 310 × 189 | 310 × 141; card 829 tall |
| 390 | Experience | choir photo 320 × 200 | 350 × 240 |
| 390 | Contact | 18 px facts, one links row | 20/27 facts; placeholder truncated; CV (PDF) on a second row |
| 390 | Footer | EN / ES / PT and "Press I to look inside" | No language list; "Turn off the I shortcut" |

### Nav and menu

| Item | Approved board | Site now |
|---|---|---|
| Current section | 6 px dot | 67 × 36 pill behind the link (green-950 8% Outside, white 12% Inside) |
| Scrolled bar | earlier glass | surface 82% Outside / 78% Inside, blur 20, 1 px bottom rule, 69 px |
| Top state on Home | logo in component | Logo hidden while the display name is on screen (hidden on the Home boards; the components keep it for other pages) |
| Menu sheet | about 596, earlier hero crop behind | 594; hero behind replaced by the as-built mobile hero; footer rows 2 px higher |

## /es/ and /pt/ (no boards)

Same structure as English at all three widths: same section order and identical element counts (1 h1, 8 h2, 16 h3, 42 links, 8 buttons, 12 images, 63 li, 27 dt, 90 p). Differences are translated copy, a localized CV PDF (`-es`, `-pt`), the current language in the switch, and height reflow. The Notes card shows the English post on all three (posts are English only, by design).

| Section height | EN | ES | PT |
|---|---|---|---|
| 1440 values / work / experience / contact | 1237 / 1922 / 1676 / 890 | 1263 / 1949 / 1748 / 917 | 1263 / 1976 / 1748 / 980 |
| 768 values / work / experience / contact | 1709 / 2097 / 2404 / 819 | 1781 / 2173 / 2408 / 796 | 1792 / 2198 / 2410 / 846 |
| 390 values / work / experience / contact | 1661 / 2650 / 2817 / 930 | 1746 / 2727 / 2857 / 930 | 1746 / 2757 / 2857 / 930 |
| Page height 1440 / 768 / 390 | 8135 / 9326 / 10317 | 8287 / 9454 / 10519 | 8377 / 9544 / 10549 |

Locale screenshots were viewed at 1440 only; 390 was captured but not visually inspected. 768 was measured only.

## Screens with no previous board

None built as new boards. `/es/` and `/pt/` have none (recorded above). Hover states, chat steps and the lens hover pill were not captured here (chat belongs to the Home Inside scope).

## Defects seen (not fixed)

- 390: the composer placeholder is cut off ("What are you building, and w…").
- 390: "CV (PDF)" wraps alone onto a second row of fallback links.
- "I'm hiring" uses a straight apostrophe; other copy ("Let’s talk", "I’ve") uses the curly one.
- 768: the Tranqui meta line breaks inside the date range ("2025– / 2026").
- 768: the fixed lens sits over the Values section at the first viewport, because the hero (867) is shorter than the 1024 viewport.
- 390: the footer offers "Turn off the I shortcut", a keyboard shortcut, on a phone width.

## What does not match exactly

- **Contact and footer backgrounds** are flat captures from the site with text and controls hidden, set as image fills. This gives the exact landscape, wash and wordmark, but they are no longer editable layers. The old hill and wordmark layers are hidden, not deleted.
- **Section backgrounds in Values to Notes** (binary pattern, lights, grain) are the approved board's layers refitted. Pattern placement and tint differ slightly from the live render.
- **Link underlines:** Figma draws one thinner underline across text and arrow; the site underlines them as two separate, heavier segments.
- **Small rendering differences:** about 1–3 px in places, a heavier outline on the suggestion chips and tablet lens, and a heavier mobile menu icon. Name outline contours differ slightly.
- **Layout structure:** many frames in the clones, mostly at 390, were changed from auto-layout to absolute positioning to match measured coordinates. They are accurate pictures but will not reflow if edited.
- **Nav demos:** the cloned instances now point at the cloned Nav components, not the originals. The Outside backdrop is the as-built Work section; the Inside backdrop is a site capture, because this page has no Inside Work section. The component set's preview fill tints the translucent bars; the in-context demos show the real result.

Captures and scripts: `<scratch>/work-home-out2/`.

## Band fixes (2026-11-25, second clone)

**Replaced later on 2026-11-25:** 768 `2449:608` and 390 `2449:1897` were replaced by the DOM pipeline boards `2487:61` and `2487:349`, because the clones still did not pass after these fixes (layout offsets and section backgrounds). What follows about 768 and 390, and the clone notes under "What does not match exactly", describes the superseded boards.

Task 1.1b. Same site commit (`develop`, last commit `9a3ca48`, docs only on top of `5a0977a`), captured with `/usr/bin/chromium` (Chromium 156) through `tools/extract.cjs`. These boards were built on another machine, so both numbers are given: plain (`diff.cjs`) and row-aligned (`adiff.cjs`).

### Numbers

| Board | Node | Plain total, before → after | Plain bands above 8 % after (500 px, y) | Aligned total, before → after | Worst aligned band, before → after | Verdict |
|---|---|---|---|---|---|---|
| 1440 | `2449:21` | 3.13 → 3.09 % | none (worst 7.2) | 1.86 → 1.80 % | 4.5 → 4.5 % | Passes on the aligned diff; plain total is 0.09 over 3 % |
| 768 | `2449:608` | 5.59 → 5.59 % | 2000: 8.8, 3000: 12.2, 4000: 10.6 | 3.55 → 3.57 % | 6.7 → 6.7 % | **Does not pass** (aligned total above 3 %; the 390 rule does not apply) |
| 390 | `2449:1897` | 7.59 → 5.40 % | 1000: 9.1, 2000: 11.7, 9000: 8.2 | 4.79 → 2.80 % | 19.5 → 4.7 % | Passes on the aligned diff only; see below |

- 390 does **not** meet the provisional 390 rule as written. That rule needs every plain band at 8 % or less and a mask with only text-edge antialiasing and resampling; three plain bands are above 8 % and the mask also shows real vertical offsets (items 4 to 6 below). It meets the desktop thresholds (3 % total, 8 % per band) on the aligned diff.
- 200 px mean RGB difference (the `pixel-check.md` metric, flag above 12). Before → after: 1440 worst 15.2 → 15.3, flags at 1400 / 1600 / 4600 remain (12.5 / 15.3 / 13.1). 768 worst 20.7 → 21.4, the same eight bands remain. 390 worst 50.2 → 17.1; the bands at 1800 and 7400 are cleared, 2000 went from 25.7 to 16.3 (still flagged), and nine others stay between 12 and 17.

### (a) Image fills replaced

| Node | Board | Layer | Crop from the site capture (x, y, size) | Image difference, before → after (mean RGB, 8 px inset) |
|---|---|---|---|---|
| `2449:2105` | 390 | `[Owner: Garden screenshot]` (fill mode CROP → FILL) | 20, 1856, 350 × 182 | 55.7 → 0.0 |
| `2449:2883` | 390 | `Photo — UPC Polyphonic Choir` | 20, 7410, 350 × 240 | 32.5 → 0.0 |
| `2449:112` | 1440 | `[Owner: Garden screenshot]` | 1000, 1382, 376 × 196 | 7.8 → 0.0 |

The new fills are 1x crops of the full-page site capture at each node's own size (the same pixels an element screenshot gives, with no risk of the fixed lens or nav being painted over them). No node was moved or resized. The 1440 Garden node sits 1 px above the site's image box (1381 against 1382.09); it was left there.

The other photos and screenshots show the same crop and differ by resampling or by a 1 to 3 px position offset (Viora, Mink'a and Tranqui at all widths; the choir at 1440 and 768; the Garden at 768, mean 5.8). They were not replaced.

### Text corrections applied (board wrong, site right)

- **Text colour, all three boards.** The site has no opaque text in these three board colours. `#143a17` → `#0a200b`: 38 nodes on each board (body copy, company names, contact labels). `#ebfceb` → `#ffffff` (footer links, 12 per board) and `#faf6e8` → `#ffffff` (footer statement, 1 per board).
  - 1440: `2449:97, 103, 106, 109, 116, 122, 127, 132, 224, 227, 230, 246, 249, 252, 266, 269, 272, 339, 365, 366, 377, 378, 389, 390, 401, 402, 417, 418, 433, 434, 446, 447, 509, 544, 548, 551, 554, 569`; footer `2449:585`–`588`, `590`–`594`, `597`–`599`, `2457:125`.
  - 768: `2449:806, 812, 815, 818, 825, 831, 836, 841, 1103, 1106, 1109, 1125, 1128, 1131, 1145, 1148, 1151, 1503, 1529, 1530, 1541, 1542, 1553, 1554, 1565, 1566, 1581, 1582, 1597, 1598, 1610, 1611, 1798, 1833, 1837, 1840, 1843, 1858`; footer `2449:1874`–`1877`, `1879`–`1883`, `1886`–`1888`, `2463:277`.
  - 390: `2449:2090, 2096, 2099, 2102, 2109, 2115, 2120, 2125, 2387, 2390, 2393, 2409, 2412, 2415, 2429, 2432, 2435, 2787, 2813, 2814, 2825, 2826, 2837, 2838, 2849, 2850, 2865, 2866, 2881, 2882, 2894, 2895, 3082, 3117, 3121, 3124, 3127, 3142`; footer `2449:3158`–`3161`, `3163`–`3167`, `3170`–`3172`, `2468:550`.
- **Wrap at 768**, `2449:1530`: the teacher description now breaks before "content creation tools.", as on the site (a line separator replaces that space).
- The colour change barely moves the numbers. Where text is also offset, darker text raises the mean a little (768, y 3400: 20.7 → 21.4).

### (b) Not fixed

| # | Width, band (y) | What differs | Proposed fix |
|---|---|---|---|
| 1 | 768, hero, y 337–386 | "See my work" is cut flat at the bottom: `Intro` `2449:641` ends at y 382 with clipping on, the button ends at 386. The site shows the full pill | Turn off "Clip content" on `2449:641` |
| 2 | 768, y ≈ 4535 | The Mink'a "See the project" link renders without its underline, although `2449:1133` has text decoration UNDERLINE. The site underlines it. Cause not checked | Check what covers or clips the bottom of `2449:1133` |
| 3 | 768, hero | The name outline over the portrait is fainter than on the site | Raise the opacity of the outline layer to match |
| 4 | 390 y ≈ 2040–2450; 768 y ≈ 2180–2470 | Garden proof card: ends 12 px higher at 390 and 6 px higher at 768; description and fact rows sit about 5 px higher | Re-measure the card's rows from the site and reposition them |
| 5 | 390 y ≈ 2730–3580 | Viora card: fact rows 2 to 3 px lower, card ends about 8 px lower. The cover's corners are also visibly squarer (`2449:2364`, radius 3.4) | Reposition the rows, shorten the card, match the cover radius to the site |
| 6 | 768 y 3000–4600 | Work cards: Viora facts about 7 px lower; Mink'a and Tranqui text 1 to 6 px off; Tranqui's two-line meta uses a 16 px line pitch against about 18. This is the main cause of the 3000 and 4000 plain bands | Re-measure the three cards and reposition |
| 7 | 768 y 5000–5300 | "What carries over" green subtitles sit about 4 px higher than on the site | Move the four subtitles down |
| 8 | All widths, section joins (1440: 1400–1800, 4600; 768: 1200–1600, 3000–3600, 4400, 5000–5400, 6800–7800; 390: 1000–1800, 6000–6400, 9200) | The binary pattern is placed and masked differently, and the yellow and green section glows are weaker or shifted (already noted under "What does not match exactly"). It accounts for much of the mean-RGB flags, which `diff.cjs` barely counts | Replace the section backgrounds with site plates, as the DOM pipeline does |
| 9 | All widths | Thinner single link underlines, heavier chip outlines, 1 to 2 px text offsets | Already listed above; no change proposed |

Items 4 to 7 may be partly environment drift (the boards were built on another machine); that was not separated.

