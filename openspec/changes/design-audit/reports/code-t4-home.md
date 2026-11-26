# Code T4 — Home (Outside, Inside, chat), nav, footer, page contact

**Status: done inside the edit surface. The Work section of Home (T5 files) and two Notes/content items remain, listed under "Requests for the supervisor".** Specs S5 and S6. `npm run check` exits 0.

## How it was checked

- Full-page captures before and after: Home Outside and Inside at 1440 / 768 / 390, in en, es and pt (`before/`, `after/`).
- Side-by-side against `2541:153`, `2544:603`, `2547:2030`, `2549:1779`, `2553:3005`, `2554:3421`, the chat-open `2555:3713`, `MobileMenu` `2517:877` and the `ChatCard` sheet `2519:1180`. This was a visual comparison of slices, not a pixel diff.
- Page height, site / board: 1440 Outside 7763 / 7751, Inside 7693 / 7850; 768 9144 / 9067, 9818 / 9825; 390 10293 / 10419, 11073 / 11204. The visible 1440 Inside differences are the Work section and the empty band under the board's Inside signature.
- Heroes of `/notes/`, a post and `/links/`: 0 differing pixels at 390; the post and `/links/` are 0 at all widths. `/notes/` and `/work/` differ by under 0.4 % at 1440 / 768: the nav only (looked at for `/notes/` 1440).
- Behaviour scripts: `beh.cjs`, `chat.cjs`, `reg.cjs`, `split.cjs`. `api.web3forms.com` was blocked; 0 requests; no page errors. The chat was walked up to the summary and never confirmed.
- Test first: `src/lib/chat/script.test.ts` (4 tests) failed 4/4 before the edit and passes after. The rest is CSS and DOM wiring, checked by captures and DOM readings.

## Items

Paths are under `src/components/sections/` unless they start with `src/`.

| Item | What changed | Check | Status |
|---|---|---|---|
| HO-01, HO-05, HO-14, HO-15, HO-19 | Shared controls (T3) kept; nav, lens, chat and icon-button hovers added | captures | done |
| HO-02, HO-17, HI-07, SY-05/06 (label system) | Markers use `--type-marker`; column, proof, carry, group and fact labels, footer heads and card labels use `--type-meta`; chips and dates use Mono/Note. Inside Contact suffix "How the chat works" (es, pt) | captures | done, except the Work marker (T5) |
| HO-03, HI-14 | `Lens.astro:30`, styles `:300`: labelled 48px pill; way out is label + Esc cap, no icon; cap hidden on coarse pointers. Hover tooltip and its two dictionary keys removed | captures, `reg.cjs` | done |
| HO-04 | `src/pages/_views/Home.astro:111`: `<Lens>` rendered after the hero; the preview clone drops it (`lens/preview.ts`) | Tab walk: … Contact > See my work > Look inside; preview holds 0 docks | done |
| HO-06 | Local focus rules removed from footer, lens and chat | focus rings seen in captures | done |
| HO-07, HO-24 | `Footer.astro:117,121`: rows `--list-row`; shortcut and Inside hint hidden up to 64rem and on touch; label flips (`:95`), no `aria-pressed` | rows 44px on touch; label flips; `I` ignored while off | done |
| HO-08 | `Nav.astro:268,273` | at 768 touch: links 67–108 × 44, codes 30 × 44 (computed including the `::after` padding) | done |
| HO-09 | `Hero.astro:220`: 25 % green-950 shadow under the white name | captures | done; contrast not re-measured |
| HO-10, HI-18, T2-1 | Headings are phrase arrays in the dictionaries, each an inline-block (`Values.astro:35`, Contact) | captures; SplitText reveal keeps the same height at three moments | done (see Deviations) |
| HO-11, HI-20 | Curly apostrophes in chat scripts and `home.*` | `script.test.ts` | done; two strings in content remain |
| HO-12, HO-13 | Footer arrows are inline-size icons | captures | done |
| HO-16 | Values, Experience and Contact use `--section-pad` | captures | done; Work is T5 |
| HO-18 | Press state on lens, send, pencils, menu and profile buttons, off under reduced motion | CSS read; not recorded | done |
| HO-20, HO-21 | `Nav.astro:323`, `:68`; menu type and colour tokens | `menu*_390.png` beside `2517:877` | done |
| HO-22 | Pointer cursor at rest, grabbing while dragging | CSS read; drag capture | done |
| HO-23 | `Nav.astro:258`: bar 320 ms, pill 260 ms; desktop top offset 25.5 → 20px as the board | capture | done; motion not recorded |
| HI-01, HI-02 | Kept | `I` twice at 200 / 600 / 950 ms: 0 crashes; Esc in a typed composer stays Inside and keeps focus | done |
| HI-03, T1-4 | Composer bound inset 8px | captures | done |
| HI-04 | T2 token | captures | done; contrast not re-measured |
| HI-05 | `lens/OutlinedName.astro` (new): SVG stroke at twice the width with the glyph fill masked out, so only the outer edge of the merged shapes shows. Used for the Inside name and the over-portrait outline in both lenses | captures at three widths; lens preview references renamed | done (Chromium only) |
| HI-06, HI-08–HI-11 | `contact/Chat.astro` styles to `2519:1180`: 16px inset, one label style, 44px pencils with `color-current` hover (`:190`), "Use a pencil…", next steps in a row | pencil 44 × 44, hover fill read in both lenses at 1440; summary captures | done; sending, sent and failed states never triggered |
| HI-12 | Hero, values, chip and composer pins moved inside the gutter (`Hero.astro:143`) | 768 / 390 captures | done, except the two Notes pins |
| HI-13 | `Hero.astro:189`: up to 64rem the Inside hero clips, so it no longer paints over the notes list | 768 had the overlap before the fix | done |
| HI-15 | `Lens.astro:87`: 900 ms once, then 450 ms ease-out; a held `I` is ignored (`:240`) | synthetic repeat did not switch; timing read from code | done |
| HI-16, HI-17 | `ui/Annotation.astro:123`; list at 12px, title opacity removed; hill note moved off the footnote (`Hero.astro:118`) | captures | done |
| HI-19 | No es/pt boards | es/pt captures looked at (top and bottom slices) | not applicable |
| NL-17 | Input and Send precede the chips (`contact/Chat.astro:64,75`). On open, `chat-client.ts:122` moves the chips above the composer, so Tab order still matches the open card | DOM order idle and open, en/es/pt | done |
| `send` icon | Chat uses `Icon name="send"` (already in `Icon.astro` when I started; I did not edit that file). Other hand-built chat SVGs also moved to `Icon` | captures | done |
| Short placeholder (DS Composer) | "What are you building?" and es/pt versions under 48rem (`chat-client.ts:49`) | read at 390 in three locales; test | done |
| Date ranges | The carry source breaks before the range, never inside it (`Experience.astro:59`); ranges use an en dash | captures | done |
| Post card padding | `src/styles/tokens.css:142`: 20/24, then 40/32 from 48rem; override removed from `Notes.astro` | captures | done |
| Project hero title | `PageHero.astro:268`: H1 token (40 / 48 / 60) in `--color-hero-text` | 390 line breaks match `2558:2305` | done |
| `PageContact`, `PageFooter` | No file change needed; they inherit Contact and Footer | `npm run check` | done |

## Deviations (the Figma won, or the brief could not hold)

- **`balance` on two headings.** Values and Contact h2 use `text-wrap: wrap`. With unbreakable phrases, `balance` gave "Faster launches. / Fewer handoffs. Nothing rebuilt." at 1440, the reverse of the board. Contact uses plain flow on phones and in the open chat, which matches those boards.
- **Inside values heading** (en) is two phrases, "How each promise" + "was built.", for the 390 break. At 768 it stays on one line; the board breaks it by hand.
- **Project hero size.** The brief says the boards draw the title smaller than the code. They draw Heading/H1: equal at 1440, and **larger** at 768 (48 vs 44) and 390 (40 vs 34). I followed the boards.
- **Contact marker colour** is `color/text`, as `Contact section` draws it; HI-07 asked for one muted marker colour.
- **Lens shadow.** The component draws none; I kept a soft shadow because the cream pill floats over cream sections.

## Open questions

1. `MobileMenu` describes "200 ms fade and slide" for open and close. The site opens with a 560 ms circle from the menu button. No audit item covers it, so I left it.
2. The lens hover tooltip ("Drag to see my technical side") is gone with the labelled pill. Nothing on screen now says the lens can be dragged. Confirm that is wanted.
3. `ChatCard` draws "JT" initials; the site keeps the photo (phase 3 DS request 5). The board card also hugs its content; the site keeps a fixed 40rem so it does not jump.
4. HO-09 and HI-04 contrast are not re-measured on the new pixels.
5. Project heroes at 768 / 390 are content-height with the photo at 35 % on the boards. Only the title was in scope, so the layout is unchanged.
6. Small line breaks the boards set by hand are not reproduced (hero lead and sub at 768, hero headline at 390, some carry sources). Post card title at 768 wraps narrower than the board (`PostRow.astro`, outside my surface).
7. The Inside footer ends right under "@trinitybytes"; the board has an empty band below it (phase 3 question 8).
8. The lead still says "Press I anywhere" on touch (phase 3 question 5).

## Requests for the supervisor

1. **Work section on Home** (`Work.astro`, `ProjectCard.astro`, T5): the marker is not on the label style; marker → h2 and header → cards gaps differ (about 4–8px at 1440, more at 390, where "See all projects" sits tight under the title); Outside card fill is cream while the board draws `color/card-raised` (white).
2. **`Notes.astro` pins** (HI-12): the "Writing · latest" and type-chip small pins sit on the top-left corner, partly in the gutter. The boards put them top-right: `pinX="calc(100% + 6px)"` and `calc(100% + 4px)`.
3. **Content** (`src/content/`): straight apostrophes in `experience.json:24` and `:89` ("office's", "people's", plus "team's"), and in Viora's and Tranqui's Inside rows; Tranqui's `insideDecision` shows literal backticks.
4. `layouts/Base.astro` still has the `lens` prop and `<Lens>` render; nothing passes it now. Remove it.
5. HO-11's suggested `\w'\w` check on rendered text in `npm run check` is not added (`scripts/` is outside my surface).

## Out of scope noticed

- `astro check`: 0 errors, 0 warnings, 6 hints. The build prints a Vite `MODULE_LEVEL_DIRECTIVE` warning for the MDX post.
- The tree holds uncommitted T5 and T6 work. `ProjectCard.astro`, `ui/Icon.astro` and `ui/KeepHyphenated.astro` show as changed; I did not edit them. `Notes.astro` and `PageHero.astro` also carry T6 changes under mine, so their diff stat is not only T4.
- Not tested: a real touch device, a screen reader, Firefox or Safari.

## Files changed by T4

All inside the edit surface: `Hero`, `Lens`, `lens/preview.ts`, `lens/OutlinedName.astro` (new), `Values`, `Experience`, `Contact`, `contact/Chat.astro`, `contact/chat-client.ts`, `Nav`, `Footer`, `PageHero`, `Notes`, `content/ExperienceRow`, `ui/Annotation`, `ui/annotation/AnnotationList`, `styles/tokens.css`, `lib/chat/script{,.en,.es,.pt}.ts`, `lib/chat/script.test.ts` (new), `lib/i18n.ts`, `lib/dictionaries/{es,pt}.ts`, `pages/_views/Home.astro` (the `<Lens>` markup, its import and the `lens` attribute; SEO frontmatter untouched). Edits to existing files were exact-match scripted replacements; no formatter ran.

## Scratch paths (not deleted)

`/tmp/tmp.n5JvMQtQIU/`: `before/`, `after/` (captures), `states/` (chat, menu, focus, drag, reveal, touch), `figma/` (boards), `cmp/` (side-by-sides), `shot.cjs`, `chat.cjs`, `beh.cjs`, `reg.cjs`, `split.cjs`, `hero.sh`, `rep.cjs`, `e1.cjs`–`e5.cjs`, `check.log`.

## Commands and results

| Command | Result |
|---|---|
| `node --test src/lib/chat/script.test.ts` (before the edit) | 4 fail (RED) |
| `node --test src/lib/chat/*.test.ts` (after) | 21 pass |
| `NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules node shot.cjs before` / `after` (Home, `/es/`, `/pt/`, other pages) | captures; `scrollWidth` equals the viewport on every one, no page errors |
| `node beh.cjs states` | Tab order, menu close returns focus (en/es/pt), lens focus handoff, preview, footer toggle, 44px targets; no errors |
| `node chat.cjs states` | 0 web3forms requests, no errors |
| `node reg.cjs` | HI-01 and HI-02 hold; touch hides the Esc cap and the hero hint |
| `bash hero.sh` | hero pixel counts above |
| `npm run check` (last) | exit 0: boundaries clean, 95/95 tests, `astro check` 0 errors, 55 pages, links clean |

No commit, stage, stash, branch switch or formatter run. The dev server was not touched. No Figma writes.

Risk: item 6 (CSS and `.astro` DOM wiring, including the lens position, chip reorder and SVG outline, have no automated regression test).
