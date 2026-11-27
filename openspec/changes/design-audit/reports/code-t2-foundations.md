# Code T2 — Foundations: tokens, root defaults, Icon

**Status: done, with open questions.** Specs covered: S3 and S6. `npm run check` exits 0 on the shared working tree, which also held T1's uncommitted edits at that time: boundaries clean, 68 tests pass, `astro check` 0 errors / 0 warnings / 6 hints, build and link rule clean. Files changed by T2: `src/styles/tokens.css`, `src/layouts/Base.astro`, `src/components/ui/Icon.astro`. Every other modified or new file in `git status` is not T2's.

## How it was checked

- **Isolated before/after.** Two `git archive HEAD` copies in a scratch folder: `before` = HEAD, `after` = HEAD + the three T2 files. Both were built and served to Chromium through Playwright request routing (no server started), so T1's edits are not in either side. 8 page states × 1440 × 900, 768 × 1024, 390 × 844 = 48 captures, `reducedMotion: reduce`, Inside set through `data-lens`.
- **Element diff** (`diff.cjs`): size, font family, font size and colour per element. No horizontal overflow on any of the 24 after states.
- **Visual pass**: side-by-side crops (sections and page tops, not every pixel of every capture). The Figma board compared side by side was Home Outside 1440 `2541:153`; other verdicts rest on the board variables, component descriptions and phase 3 reports. es and pt pages were not captured.
- **Computed values** (`probe.cjs`): type ramp and layout tokens at the three widths, new colours Outside and Inside, focus rings, icon stroke.
- No test was written: this is CSS and markup, so the check is captures and computed values.

## Where the values come from

`get_variable_defs` returns only variables **bound** on the node it reads, resolved in that node's mode. I read the Design system sections and review frames plus Proposed boards at the three widths, Outside and Inside. `use_figma` is not in the read tool list, so I did not enumerate the collections. These values therefore have **no direct Figma variable read**:

| Token | Source used |
|---|---|
| `--ease-out`, `--ease-in-out`, `--dur-press`, `--dur-ui`, `--dur-reveal` | SY-14 (the Button description names `--dur-press` 120 ms and `--ease-out`) |
| `--focus-offset` 3px | SY patterns §4.3 and the Button description (`--focus-width` was read) |
| `--radius-xl` 20, `--radius-2xl` 24 | values from L5; **the two names are assumed** (`sm`, `md`, `lg`, `full` were read) |
| `--icon-stroke`, `--icon-control`, `--icon-brand` | `icon/stroke` 1.5 was read and has no `var()` code syntax; role sizes come from SY-03 and the icon descriptions; **CSS names are mine** |
| `--font-size-display` 130 / 210 / 300 | L4 (the existing fluid token already hits them) |
| `--color-scrim` Inside (50 %) | the value `Nav.astro:306` already uses; only Outside (32 %) was read |
| `--color-accent-hover`, `--color-current`, `--color-glass`, `--color-control-border`, `--color-highlight`, `--color-essay-chip` | read in the modes where a board binds them; `highlight-text` and `essay-chip-text` read as green-950 |

## Items

| Item | Status | What changed | Check |
|---|---|---|---|
| `check` icon for T1 | done | `Icon.astro` | build |
| S2 type defaults (SY-07, SY-08, SY-13) | done | `Base.astro` `@layer base`: body `line-height: 1.5`, `h1–h4` balance, `p, li, dd` pretty, controls `font` and `color: inherit`, `pre, code` in `--font-mono` | captures; element diff shows `monospace` → Plex Mono and Arial 13.33px → Hanken |
| S3 label tokens (SY-05, SY-06) | done, tokens only | `--type-marker` (500 13/1.3, 0.08em), `--type-meta` (500 12/1.33, 0.04em), each with `-size`, `-weight`, `-leading`, `-tracking`. The shorthand cannot carry tracking, uppercase or colour; call sites set those. The `.t-marker` / `.t-meta` classes SY-05 mentions were not added (the brief says tokens only) | computed at 390 / 768 / 1440 |
| S4 scales (SY-09, SY-10) | done | `--space-2xl-b` 32; `--section-pad` clamp (72 / 86.4 / 120); `--list-row` 44 / 44 / 32; `--radius-sm…full`; `--font-size-h1…h5`, `-small`, `-caption`, `-marker`, stepping at 48rem and 64.0625rem. Body and display keep their fluid clamps, which already equal 16 / 17 / 18 and 130 / 210 / 300. Meta size is the existing `--font-size-label` | computed values match the Breakpoint boards (`2547:2030`, `2544:603`, `2541:153`) |
| S5 focus (HO-06, WK-02) | done at token level | `--focus-width`, `--focus-offset`, one `:focus-visible` default; `[data-surface='dark']` sets `--color-focus: var(--green-300)` | nav link 3px green-700; experiment link green-700 without the hook, green-300 with it; Inside resolves green-300 |
| S8 Icon (SY-03) | done | `sizing` = `inline` (1em), `control` (20), `brand` (20); explicit `size` wins (prop renamed from `role` to `sizing` by the supervisor: `role` reads as the ARIA attribute); default stays 24; stroke 1.5 with `non-scaling-stroke` on each shape (scoped style, the property is not inherited). Added `arrow-left`, `arrow-up`, `pencil`, `alert-circle`, `loader`, `rotate-ccw`, `check`. The section now holds 20 icons, not 15; all 20 names exist | computed 1.5px at 13 / 15 / 18 / 20. Pixel diff against the Figma SVG exports at 240 px (`icons.cjs`): `arrow-left` and `arrow-up` 0 %, `pencil` 0.02 %, `alert-circle` 0.40 %, `rotate-ccw` 0.53 %, `loader` 1.49 % of ink pixels (thin differences; not inspected pixel by pixel). `check` was not exported or diffed. These additions were not captured on a page |
| SY-14 motion | done, tokens only | five tokens. No existing duration or easing was changed | — |
| Logged tokens L5 / L8 / L10 / L20 | done | `--color-accent-hover`, `--color-current`, `--color-glass`, `--color-control-border`, `--color-scrim`, `--color-highlight(-text)`, `--color-essay-chip(-text)`, `--list-row`, `--annotation-note` 40 → 60 %. `type/size/wordmark` became `--font-size-h5` (L10). The L10 text styles (`Mono/Note`, `UI/Control`) have no size of their own beyond existing tokens | computed Outside and Inside |

No existing token was renamed or removed, and no Figma name conflicted with an existing CSS name.

## Visible changes

| Change | Where | Verdict |
|---|---|---|
| Unset line heights go from `normal` to 1.5: card and intro copy, Work "More" descriptions, case-study `dd` and facts (20/30 equals `Work/At a glance value`), post contents list, text links. Pages grow 20–170 px (`/links/` unchanged) | all but `/links/` | matches the proposal (`Body/*` styles are 1.5; WK-04) |
| Nav bar showed a 3 px strip of page above the hero: the Contact pill grew 45 → 48, the bar 69 → 72, and the hero pulls up a fixed 69 px | every page with the nav | **regression, fixed**: `.site-nav .contact { line-height: 1.25rem }` in `Base.astro`. Bar is 69 before and after; pill is now 44, the DS Button height. Remove the rule when `ui/Button` lands |
| Headings rebalance (post title, contact heading, TourBench and Garden headings, hero sub-headline on 390) | all | matches SY-08 and HO-10 ("`text-wrap: balance` in code") |
| Three Home headings break at other points than the board's manual breaks: "Faster launches. Fewer / handoffs. Nothing rebuilt." (board: break after "handoffs."), "A bridge between / design and engineering." (three lines at 768), "Built to grow, not / to be redone." | Home 1440 / 768 / 390 | **differs from the board**; the mandated rule causes it. Not fixed, needs `Values.astro` (open question 1) |
| Body copy wraps differently (`pretty`) | all | matches SY-08 |
| `node --test` now splits as `node -` / `-test` (before: `node --` / `test`, also broken) | TourBench At a glance, 1440 and 768 | **regression in a line that already broke badly**. Needs content (open question 2) |
| `3 628 800` splits as `3 628` / `800 tours` | TourBench At a glance, 390 | **regression**. Needs content (open question 2) |
| Code, formulas, terminal lines render in IBM Plex Mono | TourBench, Garden, post | matches the proposal (SY patterns §4.5, WK-18, NL-06) |
| Icon stroke 2 (scaled) → 1.5 on screen. Most visible: lens magnifier (28 px) is much lighter; the 12 and 13 px arrows are slightly heavier | all | matches the DS icons. The board's lens is a labelled pill, which is a later task |
| Inside annotation notes are brighter (40 → 60 %) | Home Inside | matches HI-04 and L20 |
| Nav, menu and lens buttons and the chat inputs compute Hanken instead of Arial | all | matches SY-13; no label glyph visibly changed |
| Nav items have taller line boxes (links 21 → 24, language codes 28 → 32, wordmark 22 → 33); the wordmark sits about 1 px higher; bar height unchanged | all | no layout effect. The DS line heights (wordmark 1.2, controls 20) belong to the shared-controls and nav tasks |

## Call sites to adopt

**`data-surface="dark"` must be applied** (surfaces that stay dark Outside):

- `src/components/sections/WorkMore.astro:58` `article.experiment` (required: today the ring is green-700 on green-950, WK-02).
- `src/pages/notes/[...slug].astro:164` `.code-block` wrapper, built in script (it holds the Copy button; `:205` sets its own outline).
- `src/components/sections/CaseStudy.astro:27` `.terminal` and `src/components/sections/ProjectPage.astro:44` `.formula`: only if they ever hold something focusable.
- `src/components/sections/Footer.astro:27` already works through its `color-scheme: dark` (`:104`); the hook is optional.

**Local focus rules to delete or move to the tokens:** `Footer.astro:120` (2px, still wins over the default: HO-06 is not closed in the footer until it goes), `Contact.astro:212`, `contact/Chat.astro:142` and `:148`, `Lens.astro:328`, `pages/notes/[...slug].astro:205`.

**Colour tokens:**

- `Nav.astro:252` → `--color-glass`; `:282`, `:319` → `--color-current`; `:292`, `:317`, `:322` → `--color-control-border`; `:306` → `--color-scrim`.
- `content/PostRow.astro:26` (and `:25` chip text) → `--color-essay-chip`, `--color-essay-chip-text`.
- `Values.astro:250` (`--color-light-sun`, with the Inside override below `:254`) → `--color-highlight`, `--color-highlight-text`.
- `annotation-note`: no edit needed (`ui/Annotation.astro` and `AnnotationList.astro` already read the token).

**Labels → `--type-meta` / `--type-marker`:** 11 px literals at `contact/Chat.astro:147`, `:160`, `:167`, `:201` (SY-04, `:147` is the note) and `ui/annotation/AnnotationList.astro:48`. Other raw label sizes are the SY-05 sweep.

**`--section-pad`** (literal 7.5rem / 120px): `Experience.astro:111`, `CaseStudy.astro:44`, `Values.astro:320`, `Work.astro:169`, `ProjectPage.astro:84`, `:95`, `NextCaseStudy.astro:13`, `Notes.astro:178`, `WorkMore.astro:95`, `pages/notes/[...slug].astro:224`. Check each against its board; line numbers can move with T1's edits.

**`--list-row`:** footer link rows in `Footer.astro` (HO-07).

**Icon `size` → `sizing`:** `Footer.astro:41`, `:46` (13); `Notes.astro:60` (16), `:134` (12); `Lens.astro:31` (28), `:38` (20); `Nav.astro:48` (20 ×2), `:67` (17/19, brand); `Hero.astro:91` (18); `Contact.astro:71` (20), `:78`, `:84` (18); `pages/notes/[...slug].astro:94` (15), `:98` (14); `WorkMore.astro:41`, `:42`, `:72`, `:73`, `:87` (15); `_views/Links.astro:72`, `:74`, `:75`, `:82` (20); `_views/CaseStudy.astro:67`, `:68` (18). The DS Button uses an 18 px icon and BackLink 14 px, which no role covers: `ui/Button` and `ui/BackLink` should keep `size`.

**Motion:** 15 lines in `src/` still write a literal `cubic-bezier(...)`.

**`contact/Chat.astro`:** its local `paths` map (`:32`) can move to `Icon`; `:81` should use `send` (L14).

## Open questions

1. The boards break three Home headings by hand; `balance` picks other points. Options for the Home task: accept the balanced breaks, or set `text-wrap: wrap` plus authored breaks per locale in `Values.astro`.
2. TourBench facts need non-breaking characters: U+00A0 in `3 628 800` and U+2011 (or a no-wrap span) in `--test`, in `src/content/projects/{,es/,pt/}tourbench.mdx:23–24`. Check that Plex Mono and Hanken have U+2011. The Garden terminal still shows "[Owner: confirm wording]" (already logged in L22).
3. Confirm the assumed names `--radius-xl`, `--radius-2xl` and `--icon-*`, and the motion values, against the Foundation collection (needs a Plugin API read).
4. The brief says Section `2501:137` has 15 icons; it has 20.

## Out of scope noticed

- Post hero meta, case-study back links and the Work card pill still differ from the DS controls (shared-controls task).
- The Contact chips still read "I'm hiring" with a straight apostrophe, and the send button still draws `arrow-up` (L14 follow-up).
- `get_variable_defs` fails on a page node with "nothing selected"; it works on sections and frames.

## Scratch paths

`/tmp/tmp.RtVxzmytQL/`: `icons.cjs`, `cap.cjs`, `diff.cjs`, `probe.cjs`, `pair.sh`, `sbs.sh`, `before/`, `after/` (each with a `node_modules` symlink to the repo's), `shots/*-{before,after}.{png,json}`, `shots/sbs/`, `figma/home-1440.png`, `svg/`, `build-*.log`, `check.log`.

## Commands and results

- `git archive HEAD | tar -x -C <scratch>/{before,after}`, copy of the three files into `after`, `npx astro build` in each: exit 0, 55 pages.
- `NODE_PATH=~/.npm/_npx/e41f203b7505f1fb/node_modules node cap.cjs` then `node diff.cjs`: 48 captures; overflow 0 on all after states. `playwright` is not installed globally on this machine; this npx cache copy was used.
- `node icons.cjs` (same `NODE_PATH`): the icon percentages above.
- `node probe.cjs` (same `NODE_PATH`): values as in the table above.
- `npm run check` (repository): exit 0.
- No commit, stage, stash, branch switch or formatter run. The dev server was not touched.
