# Phase 3 — Work and projects

## Progress

Complete. All boards in the brief are built, checked and captioned. Page `Proposed · Work & projects` (`2520:22`), immediately after the As built page. `Page components` section: `2520:23`.

## Page components

### Parts and 1440 sections

| ID | Name | Findings |
|---|---|---|
| `2520:29` | Mock browser bar | WK-31 |
| `2520:50` | Project card / More | WK-03 (proposal), WK-04–WK-07, WK-31 |
| `2520:1658` | Project card / Featured | WK-03 (proposal), WK-09 |
| `2523:2246` | Project card / Featured · Reverse | WK-03 (proposal), WK-09 |
| `2522:1506` | Project card / Featured · Paired (also 768) | WK-03 (proposal), WK-09 |
| `2522:1429` | Project card / Featured · Mobile (390 and 768 pair) | WK-03 (proposal) |
| `2522:481` | Project card / More · Mobile (768 and 390) | WK-03 (proposal), WK-04, WK-06, WK-07, WK-31 |
| `2522:39` | Experiment tile (variants Default, Peek) | WK-01, WK-10, WK-11 |
| `2524:2493`, `2524:2500` | Icon / star, Icon / git-fork (page) | WK-10 |
| `2522:1282` | Work hero / Desktop | SY-12 (proposal) |
| `2522:449` | Project hero / Desktop | WK-17, WK-20 |
| `2522:840`, `2522:843` | At a glance fact, Step card | WK-18, WK-21 (proposal), WK-22, WK-26 (proposal) |
| `2522:848` | Next project / Desktop | WK-17, WK-19 (proposal), WK-20 |
| `2524:2688`, `2524:2718`, `2524:2775` | TourBench Overview, How it works, Decision | WK-18, WK-22, WK-23, WK-28, WK-29 |
| `2524:2714`, `2524:2716` | Table cell / Label, Number | WK-23 |
| `2526:1123`, `2526:1146`, `2526:1178`, `2528:1174`, `2530:1188`, `2530:1249`, `2530:1280` | Garden 1440 sections | WK-18, WK-26 (proposal), WK-28 |
| `2526:1159`, `2526:1219`, `2526:1168`, `2528:1168`, `2530:1245`, `2529:1188`, `2529:1198`, `2529:1206` | Garden feature rows, terminal, decision row, milestone, era art | WK-26 (proposal) |

### Responsive sections (derived from the checked 1440 content)

| Group | Tablet 768 | Mobile 390 |
|---|---|---|
| Work: hero, featured, more projects, experiments | `2563:3310`, `2563:3315`, `2563:3491`, `2563:4181` | `2563:4628`, `2563:4633`, `2563:4809`, `2563:5503` |
| TourBench: hero, overview, how it works, decision, next | `2558:1666`, `2558:1736`, `2558:1863`, `2558:1982`, `2558:2027` | `2558:2305`, `2558:2375`, `2558:2502`, `2558:2623`, `2558:2668` |
| Garden: hero, overview, problem, what it does, decisions, mistakes, growth, next | `2560:2446`, `2560:2512`, `2560:2575`, `2560:2638`, `2560:2794`, `2560:2981`, `2560:3113`, `2560:3188` | `2560:3438`, `2560:3504`, `2560:3567`, `2560:3630`, `2560:3786`, `2560:3973`, `2560:4105`, `2560:4180` |

Rows that had to restack (Garden feature and decision rows, TourBench and Garden next cards, the stacked experiment tiles) are plain auto-layout frames inside their section component, not nested instances. Section positions were repacked so nothing overlaps.

## Boards

| Board | Node | Width | Modes | Check result |
|---|---|---:|---|---|
| Work index · 1440 | `2522:1526` | 1440 | Outside / Desktop 1440 | Checked against `2470:870`. Caption `2523:2423`. |
| Work index · 768 | `2563:3278` | 768 | Outside / Tablet 768 | Checked against `2471:12`. Mink'a and Tranqui paired, More in 2 columns with equal heights. Caption `2564:5302`. |
| Work index · 390 | `2563:4581` | 390 | Outside / Mobile 390 | Checked against `2471:428`. Fixed the "Services" orphan. Caption `2564:5303`. |
| Experiments peek · 1440 | `2524:2560` | 1440 | Outside / Desktop 1440 | Checked against `2471:840`. Caption `2524:2686`. |
| TourBench · 1440 | `2524:2790` | 1440 | Outside / Desktop 1440 | Checked against `2471:903`. Caption `2526:1122`. |
| TourBench · 768 | `2558:1614` | 768 | Outside / Tablet 768 | Checked against `2471:1100`. Caption `2561:3278`. |
| TourBench · 390 | `2558:2228` | 390 | Outside / Mobile 390 | Checked against `2471:1297`. Caption `2561:3279`. |
| Inspiration Garden · 1440 | `2530:1307` | 1440 | Outside / Desktop 1440 | Checked against `2471:1541`. Removed As built background plates (baked card shadows showed as ghost boxes), centred the capture, restored the timeline rules. Caption `2557:4732`. |
| Inspiration Garden · 768 | `2560:2394` | 768 | Outside / Tablet 768 | Checked side by side against `2471:1934` (full height); content matches. Caption `2561:3280`. |
| Inspiration Garden · 390 | `2560:3370` | 390 | Outside / Mobile 390 | Checked against `2471:2335`; heading orphans fixed. Caption `2561:3281`. |

### Binding audit

The six 768/390 boards were audited on page-level layers (colour, text style, gap, padding) and for text overflow outside the board: no findings. Exceptions by design: nested design-system instances, hidden layers, the three rebuilt Garden era panels (one-off art), image paints (hero photo at 35% over the surface token on project heroes; cropped sunset art on Contact), and the unbound gradient of the table scroll fade (binding a variable to a gradient stop replaces its alpha with the variable's). Corner radii were not re-audited on the 768/390 boards. The primary button arrows that lost their `color/accent-text` binding after card swaps were rebound.

## Findings

| ID | Result |
|---|---|
| WK-01 | fixed (`2524:2560`, tiles share 300 px) |
| WK-02 | code (focus ring colour on dark tiles; no focus state drawn) |
| WK-03 | proposal (needs owner): one pill on both tiers (all Work and next-project cards) |
| WK-04 | fixed (Work boards, body text styles) |
| WK-05 | fixed (Work 1440, 768) |
| WK-06, WK-07, WK-08 | fixed (Work boards). Featured and More kickers share size and case; their colour still differs |
| WK-09 | fixed (Work 1440, 768) |
| WK-10, WK-11 | fixed (`2524:2560`) |
| WK-12 | code (hover behaviour on the tile without a peek) |
| WK-13 | fixed (Work 768, 390) |
| WK-14 | code (motion) |
| WK-15 | fixed (Work 768, 390) |
| WK-16 | code (hit areas) |
| WK-17 | fixed (TourBench and Garden, all widths) |
| WK-18 | fixed on boards; also needs code (`code { font-family }`) |
| WK-19 | proposal (needs owner) |
| WK-20 | fixed (project boards, design-system BackLink) |
| WK-21 | proposal (needs owner) |
| WK-22 | fixed (TourBench 1440, 768) |
| WK-23 | fixed (TourBench, all widths) |
| WK-24 | proposal and code: right-edge fade drawn at 390, table fits at 768; region, label and keyboard access are code |
| WK-25 | fixed on 768/390 (`layout/section-pad`); 1440 uses 120 |
| WK-26 | proposal (needs owner); page style `Work/At a glance value` |
| WK-27 | fixed (TourBench 390, surface token, no bytes art) |
| WK-28 | fixed (TourBench and Garden) |
| WK-29 | fixed (TourBench) |
| WK-30 | fixed (design-system icon sizes) |
| WK-31 | fixed (one mock browser bar; hostname stays readable at 390, so no hidden-hostname variant was needed) |
| WK-32 | not applicable to these EN boards; ES kicker wording and eyebrow balance are copy and code |

## Requests for the design system

- Promote the page-local 20/30 `Work/At a glance value` text style (WK-26).
- Shared star and git-fork icons (WK-10; page versions `2524:2493`, `2524:2500`).
- A mono heading style for experiment titles; the proposal uses `Heading/H3`.
- Contact section Tablet and Mobile variants default to the marker "06 — CONTACT" and have no sunset art; each board overrides both. The art is cropped per board so the links stay off the dark hills.
- Footer at 390: the decorative "Jahat" art looks clipped at the left edge.
- Binding gaps in shared components: NavLink/Button literal padding (8/14/22), LangSwitch 6/13.5, Footer 152 top padding; the image-filled "Jahat" has no text style.
- Swapping a card's nested primary Button can leave its arrow bound to `color/text` (dark on dark).

## Open questions

- WK-03, WK-19, WK-21, WK-26 and the WK-24 fade need owner approval.
- SY-12: proposal: text-shadow on the display word in code (audit SY-12). The baked art is kept, per supervisor.
- "[Owner: confirm wording]" is still visible in the Garden terminal block, on the live page and on the boards (As built defect 1). Copy was not changed.
- Project heroes at 768/390 wash the photo to 35% for text contrast; this is a visual choice for the owner.
- The Garden era panels still read filter options as plain words (As built defect 12; not a WK finding).
