# Code T6 — Notes, posts and /links/

**Status: done, with open questions.** Brief: `prompts/code-t6-notes.md` (specs S5, S6). `npm run check` exits 0 on the shared working tree, which also holds T5's uncommitted edits. Nothing was staged or committed.

## How it was checked

- **Captures** at 1440 × 900, 768 × 1024 and 390 × 844, reduced motion, before and after (`cap.cjs`): `/notes/` (en, es, pt), the post, `/links/` (en, es, pt), Home's Notes section (en, es, pt), and the heroes of `/work/`, TourBench, Viora and Inspiration Garden. No horizontal overflow on any captured page. I looked at a selection against the boards, not at every file.
- **Boards:** Notes, post and `/links/` screenshots at the three widths; design context for the components; Home Notes section `2541:443`, featured card `2538:134`, list row `2538:135`.
- **Only one post is published.** `/notes/coverage-fixture/` is a draft and returns 404, so "two posts" was not possible. List rows ("Keep reading", index rows, Home rows) were checked in a scratch build with a second, temporary post (`rows-*.png`).
- **Behaviour** (`beh.cjs`, `kb.cjs`): three widths, with and without reduced motion.
- No new test: no new isolated logic. The existing `toc` and `flash` tests still pass.

## Items

| Item | Status | What changed (file) | Check |
|---|---|---|---|
| NL-01 | done (kept) | `notes/[...slug].astro`: tracking script unchanged apart from dropping the `data-tracking` styling hook; contents restyled to `2520:102` | all four links: heading at 96 px (one reading of 97 at 390), the clicked item is the only `aria-current`; 3 widths × 2 motion settings |
| NL-02 | done | `[...slug].astro`: block restyled to `2520:35` (ground fill, 12 px padding, white bar). T1-1: "Copy" white at rest, 1 px underline at 0.2em on hover, fine pointers only. The local focus rule is gone; the wrapper has `data-surface="dark"` | button 54 × 48; clipboard filled; "Copied" + check, live text set; "Copy" again after 1.9 s; `code-{rest,copied,focus}-*.png`. The denied-clipboard path was not re-run |
| NL-03 | done | `Notes.astro` rows and "Keep reading" now use `post.readingTime`; `notes.minutes` removed | `es-`/`pt-` captures |
| NL-04 | done, see open question 1 | H1/H2 follow the type tokens (60/48/40 and 48/40/34). Hyphenated words in titles are wrapped in a `nowrap` span (`PostRow.astro`, `[...slug].astro`, `Links.astro`) | post and card captures |
| NL-05 | done | `PageHero.astro`: sub in `--color-heading` on Notes and post | measured with the text transparent, pixels under each line (`contrast.cjs`). Minimum: Notes 8.61 / 10.21 / 10.34, post 5.04 / 5.26 / 5.39 at 1440 / 768 / 390. All pass 4.5 |
| NL-06, NL-07 | done | block code Plex Mono 14/1.6 | captures |
| NL-08, NL-09 | done | the article starts on the hero's left edge: 680 + 40 + 240 at desktop, full width below | captures |
| NL-10, NL-11, NL-20 | done | `--type-meta` / `--type-marker` in my files; labels muted; tags uppercase. `notes.eyebrow`, `essay`, `tutorial` are sentence case in en/es/pt, uppercased by CSS (the OG card already uppercases its label) | captures |
| NL-12 | done | `/links/` cards hover sand; arrow moves `2px 0`, or `2px -2px` for the CV; round buttons hover `--color-current` and press at .97; featured cards underline the title | computed: translate `2px` / `2px -2px` with motion, `none` with reduced motion |
| NL-13 | done | contents links have 4 px block padding (35 px at desktop per the board; about 32 px at 390); BackLink takes its 44 px in the hero layout | captures |
| NL-14 | done | date first everywhere; the `/links/` latest card reads "date · N min read"; `links.latestSub` removed. Index and "Keep reading" rows are `ui/TextLink` plus meta (`2520:155`); Home rows follow `2538:135` (whole row is the link, no arrow) | `rows-*.png` |
| PostRow arrow leftover | done | T3 had already removed the `&nbsp; →` markup; I removed the dead `.arrow` CSS in `Notes.astro` and gave the rows the board patterns | `rows-*.png` |
| NL-15, NL-16 | done | `Notes.astro`: Elsewhere is five external TextLinks, 32 px apart; `NotesIndex.astro` passes every profile | captures |
| NL-18, NL-19 | done | prose solid green-900, headings −0.02em, one 40 px step between blocks; inline code 14 px, weight 400, muted | captures |
| NL-21 | done, see open question 1 | author card rebuilt to `2522:1449` / `2523:1529` | captures |
| NL-22 | done (verified) | DOM order unchanged | Tab: skip link, five cards, five profiles, 3 widths |
| NL-23 | done | 40 px fade below 48rem while there is more line to the right (`data-more`); the scrolling `pre` is a named `region` | Tab reaches the `pre`; 3 px green-300 ring; arrow keys scroll to the end (25 px at 768, 320 px at 390) |
| Notes index layout | done | 32 px steps, RSS under the heading, 680 + 300 columns, index card per `2522:475` | `notes-*.png` |
| Hero offsets | done | Notes and post intros start at `--section-pad` | captures |
| `/links/` layout | done | `2523:2359` / `2486` / `2632`: borderless cards, no avatar border, no availability dot, IconButtons on a cream band (label inside below desktop), LinkedIn and X at 18, board heights 900 / 1120 / 1180 | `links-*.png`, `eslinks-*`, `ptlinks-*` |
| Home Notes section | done | featured card per `2538:134`: card-raised, bordered chip, H3 title, hover underline plus one step; 48 px header gap, 12 px label gap | 1440 section is 628 px tall like the board and matches it by eye (`home-notes-1440.png`). Inside: chip annotation anchor delta 0 on all four box values at 3 widths |
| Note, PullQuote, Figure | done, not rendered | tokens; PullQuote follows `2520:163`. No published entry uses them (only `[...slug].astro` imports them; no project page does) | build only |

### Shared files

- **PageHero:** an isolated pair of builds (same tree, with `HEAD`'s `PageHero.astro` and with mine) gives identical hero screenshots for `/work/`, TourBench, Viora and Inspiration Garden at all three widths (12/12, `iso/a-*`, `iso/b-*`). The project heroes that differ in my live before/after differ because of T5's concurrent edits.
- **Dictionaries:** my edits are inside `notes`, `post` (none needed) and `links`.

## Visible differences from the boards

- The post title breaks as "Why this site enforces / its own architecture with / a zero-dependency script" at 1440 and 768 (`text-wrap: balance`, SY-08); the board breaks after "its".
- "Why not dependency-cruiser" wraps to two lines at 1440. The board forces an 850 px text box over a 680 px column; I kept the column.
- Post meta: the board top-aligns the 16 px meta line with the 44 px BackLink, so the text sits about 7 px high. I centred it.

## Requests for the supervisor

1. `tokens.css`: `--post-card-pad-x/y` should be 20 / 24, then 40 / 32 from 48rem (`2538:134`). I override them locally on `.featured-card` in `Notes.astro`.
2. `Footer.astro` / `Contact.astro` (T4): the Notes boards show uppercase tracked footer heads and contact fact labels, a `send` icon and a curly apostrophe; the site still differs.
3. Optional: the title split `/(\S+-\S+)/` now appears in three files. A small helper in `src/lib/` with a test would remove the repetition; `src/lib/` was outside my surface except for the dictionaries.

## Open questions

1. **NL-04, deviation from the brief.** I tried U+2011 in the post title: the social card rendered an empty box (tofu) in place of the hyphen (`after/og.jpg` showed it before the revert; the file has since been deleted by a re-capture). `fc-query` shows no U+2011 or U+2010 in any site or OG font. I reverted the content and used the `nowrap` span, so title, SEO, RSS and OG card are unchanged. It applies to every hyphenated word in those titles. At 390 "script" is still alone on the last line, as on the board.
2. **Near hill on the Notes hero at 1440.** Board `2520:216` shows no grass hill (its layer is rotated 180° and sits off canvas), while 768 and 390 show it. No item asks to remove it, so I kept it.
3. **Post sky band.** The boards show a hard edge; the site fades cream into the sky (`SkyBand.astro`). No item mentions it, so it is unchanged.
4. **Filled `/links/` card hover.** The component's hover surface in Inside mode equals the filled card's green-900, so no fill change is drawn. Only the arrow moves; with reduced motion this card has no hover feedback. It needs a decision.
5. **Tablet and mobile `/links/` heights.** The boards are 1120 and 1180 tall, so I used them as minimum heights. A 390 × 844 phone starts with about 150 px of sky and scrolls to the profiles.
6. **Home list rows** follow `2538:135`, which no board places. It draws no hover; I underline the title, like the featured card.
7. **Updated date and canonical link** are not drawn on any board. I kept both in the new label style.

## Out of scope noticed

- `astro check`: 0 errors, 0 warnings, 6 hints, in files I did not touch.
- Not tested: screen reader, real touch device, browsers other than Chromium.

## Scratch paths (not deleted)

`/tmp/claude-1000/-mnt-files-Projects-portfolio/f1009a69-45ea-42ed-8158-c933780aab62/scratchpad/t6.UKM9Qf/`

- `figma/` (board screenshots), `before/`, `after/` (captures).
- `cap.cjs`, `beh.cjs`, `kb.cjs`, `inside.cjs`, `iso.cjs`, `rows.cjs`, `contrast.cjs`, `fmt.py`, `sheet.py` (unused, needs PIL), `post1440.txt`, `PageHero.head.astro`.
- `iso/a`, `iso/b` (scratch builds with a `node_modules` symlink; `b` holds the temporary second post), `build-b.log`, `check.log`.

## Commands and results

| Command | Result |
|---|---|
| `NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules node cap.cjs before` / `after` | captures; first `after` run stopped on a dev-server reload mid-edit, later runs complete |
| `npx astro check` | 0 errors, 0 warnings, 6 hints |
| `node beh.cjs after`, `node kb.cjs` | results in the table (one 768 scroll reading of 0 in `beh.cjs` was timing; `kb.cjs` gave 25 in four of four runs) |
| `npx astro build` in `iso/a`, `iso/b`; `node iso.cjs` | exit 0; 12/12 identical |
| `npx astro build` in rebuilt `iso/b`; `node rows.cjs` | exit 0; no overflow |
| `node inside.cjs after`, `node contrast.cjs` | results above |
| `fc-query` on the site and OG fonts | no U+2010 / U+2011 |
| `curl` of the OG image from the dev server (with U+2011) | 200; tofu in the title |
| `npm run check` (last) | exit 0: boundaries clean, 91/91 tests, `astro check` 0 errors, 55 pages, links clean |

Risk: item 6 (CSS and DOM wiring in `.astro` files has no automated regression test).
