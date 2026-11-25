# Home Outside — as-built boards (home-out2)

Figma file `gq6glEp9QrPOnEyYG9dldh`, page `2449:12` "As built · Home Outside" (reused from `home-out`). Reference: 127.0.0.1:4321 at commit `5a0977a`, captured with /usr/bin/chromium, reduced motion, 2026-11-25. All edits are on this page. No repository files edited, nothing committed.

## Boards built

| Name | Node | Width | Figma height / site height | Source |
|---|---|---:|---|---|
| As built · Home v3.5 OUTSIDE · 1440 | `2449:21` | 1440 | 8136 / 8135 | `2191:86` |
| As built · Home v3.5 OUTSIDE · 768 | `2449:608` | 768 | 9326 / 9326 | `2211:86` |
| As built · Home v3.5 OUTSIDE · 390 | `2449:1897` | 390 | 10318 / 10317 | `2210:86` |
| As built · Nav — states · 1440 | `2449:3181` | 2920 holder | components + two scrolled demos | `2185:56` |
| As built · Mobile menu open · 390 | `2449:3415` | 390 × 844 | sheet 594 / 594 | `2391:122` |

Captions: `2470:1489`–`2470:1493`. Each board was compared side by side with the site capture. The last two changes (tablet Contact snap, then un-clipping its inbox note) were checked by a full export and by a render of the edited frame respectively.

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
