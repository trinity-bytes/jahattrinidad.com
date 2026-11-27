# Round 2 — supervisor feedback

**Round 2 changes complete and checked.** This round was limited to the six requested differences; it does not resolve the unrelated open items in the earlier T5 handoff.

1. **Labels:** `ProjectCard.astro:114–119`, `ProjectPage.astro:180–184` and `CaseStudy.astro:141–145` use `--type-meta`, tracking and uppercase for fact/decision labels. Dictionaries are unchanged. Chromium probe: Featured fact and decision header computed `text-transform: uppercase` (before: `none`).
2. **Titles:** Figma contexts `2520:1658`, `2522:1506`, `2520:50` specify `Heading/H3` / `--font-size-h3`, 34px at 1440. `ProjectCard.astro:124` and `WorkMore.astro:113` use that token; Chromium measured 34px at 1440 (featured previously 48px). Shared ProjectCard also changes Home labels/title; `before-home-*`, `after-home-*`, `home-*` comparisons were inspected at all three widths.
3. **Experiments:** `WorkMore.astro:320–322` keeps the 1440 default links immediately after the chips and places the row with the copy; gap measured 16px, versus 272px before. At 768/390 the links remain below chips (`verify.log`). **Tile outer height remains 300px on desktop**: the Figma component `2522:39` explicitly specifies fixed `h-[300px]` for both default and peek, and WK-01 requires stable height; its contents no longer stretch to the bottom. `after-work-*`, `compare-work-*` and `after-peek.png` inspected.
4. **Browser frame:** `ProjectPage.astro:104` aligns the existing 1152px max-width frame to the left instead of centering it. Figma contexts `2524:2688`, `2558:1736`, `2558:2375` show 1152/688/350px widths. Browser checks: x=64/40/20px and width=1152/688/350px at 1440/768/390 (`verify.log`); `compare-tourbench-*` inspected.
5. **Next card:** `ProjectCard.astro:24,49,156` adds opt-in `flowAction`; only `NextCaseStudy.astro:10` supplies it. The action now follows description/facts rather than consuming the remaining card height; probe reports action wrapper begins immediately after description instead of a 224px gap. Other cards retain their existing bottom-alignment behavior.
6. **WK-10:** `ui/Icon.astro:39,106–107` adds star and git-fork on the 24 grid with the existing 1.5px non-scaling stroke. Shapes follow the Lucide page-local Figma vector geometry (`2524:2493`, `2524:2500`); exported vector evidence is `star.svg`, `git-fork.svg` in scratch. `WorkMore.astro:70,272–273` renders both 12px icons with flex spacing while preserving the single translated screen-reader description; visual icons are aria-hidden. `verify.log` confirms two icons and the accessible text; `peek.log` confirms hidden decorative SVGs, loaded preview and stable 300px height. `after-peek.png` inspected.

## Round 2 checks and scratch

Scratch: `/tmp/t5-round2-0koj36`. Before/after captures at 1440/768/390: `before-{work,tourbench,home}-*.png`, `after-{work,tourbench,home}-*.png`; toolbar hidden, lazy images scrolled/decoded, reduced motion. `compare-{work,tourbench}-*.png` compare to Figma board captures from `/tmp/t5-feedback-WdVGRH/figma-*`; all six were looked at. Home side-by-side `home-*.png` inspected. Existing differences outside these six requested adjustments, including shared hero/footer and broader full-page parity, remain outside this round.

- `NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules node "$D/probe.cjs"`: RED before edits (48px title, mixed-case labels, 272px link gap, centred browser and 224px next-action gap); GREEN afterward (`probe-green.log`). One intermediate retry encountered `net::ERR_ABORTED` during dev-server HMR; the subsequent complete run passed.
- `NODE_PATH=… node "$D/verify.cjs"`: PASS across 1440/768/390: icon count/accessibility, fixed-height focus state, mobile link rows and browser frame measurements (`verify.log`).
- `NODE_PATH=… node "$D/peek.cjs" "$D"`: PASS (`peek.log`); loaded image and focus state captured.
- `npm run check`: exit 0, 91 tests pass, Astro check 0 errors/0 warnings, build and link rule pass (`check.log`). `git diff --check`: exit 0.
- No persistent regression test was added: the brief's edit surface permits these components and the requested report, not new test files. The shared worktree also contains concurrent T6 changes; none were staged, reverted or committed.

Risk: item 6 for visual checks without persistent screenshot/regression tests; independent visual review remains appropriate.

---

# T5 — supervisor feedback round 1

**Status: partial, not ready to close T5.** Round 1 fixed the requested explicit-prop, token, contrast and scroll-fade defects, and implemented further board corrections. The Design system icon section does **not** contain star or git-fork; the feedback permits adding them only if it does, so WK-10 is still open. Some remaining board differences and verification gaps are listed below; no commit or staging was performed. The prior round's report follows for history; this section supersedes its statuses.

## Item status and evidence

| Item | Status / evidence |
|---|---|
| WK-02 | **Done for measured dark tile colors.** `WorkMore.astro` sets the dark surface and overrides TextLink color/underline. Chromium computed text, underline and focus ring `rgb(136,232,140)` on `rgb(10,32,11)`; WCAG contrast is **11.41:1** for each. Before this round the underline was `rgb(35,108,42)`, 2.65:1. `probe-final.log`. |
| WK-03 | Partial: Work cards use pills; Figma `2522:848` uses a text link on the TourBench next card, while Garden's `2530:1280` uses a pill. `NextCaseStudy.astro` now selects this by explicit `kind`, not translated string comparison. Three responsive captures checked. |
| WK-04 | Partial: root/body leading and More cards inherited styles; no complete computed-style audit for every locale. |
| WK-05 | **Done for observed rows**: More actions align at 1440 and 768. `metrics-final.log`: first-row y positions 4193/4193/4193 and 4517/4517. Tablet secondary links share a dedicated row. |
| WK-06–07 | Partial: More card text/capture inset and kicker token/case updated; detailed type and all localized card review remains. |
| WK-08–09 | Partial: index-only heading gap is 48px and index facts use a consistent label width at desktop; Home styles are not changed by these selectors. Full geometry confirmation remains. |
| WK-10 | **Open by explicit condition**: Design system `2501:137` metadata contains no star or git-fork components. Page-local nodes `2524:2493`/`2524:2500` exist, but feedback expressly authorizes adding icons only if the Design system section draws them. No icon paths were guessed; current stats glyphs remain. |
| WK-11 | Partial: localized captions now describe OSD, certificate verifier and profile README in `src/content/projects/{,es/,pt/}`. Peek screenshot `peek.png`; caption baseline has not been measured. |
| WK-12–14 | Partial: no-peek keeps chips and no border change; peek transitions for chips/stats and image use opacity/visibility/transform and motion tokens, with reduced-motion suppression. `peek.log` verifies 300px height under focus and no-peek chip state; a true animation-frame performance audit remains. |
| WK-15–16 | Partial: balanced headings, shared TextLink and tablet/mobile left-aligned link row. Touch/screen-reader device audit not performed. |
| WK-17, WK-20 | Partial: shared BackLink stays left; captures checked, but full keyboard path is not independently audited. |
| WK-18 | Existing global mono code family; no new edit. Verify against code samples before declaring complete. |
| WK-19 | Partial: explicit `kind` prop and callers (`NextCaseStudy.astro`, `_views/CaseStudy.astro`) with Figma's Next project heading, text link for project pages and pill for case studies. `verify-latest.log` checks both English headings; locale and exhaustive layout review remains. |
| WK-21 | **Done for TourBench**: numbered steps removed; `projectPage` markers changed to 01/02 in en/es/pt. `latest-tourbench-*` captures, source content and build validate rendering. |
| WK-22–23 | Partial: formula min-height, balanced titles, numeric right alignment, and tablet padding; 768 table measures 688/688px (`verify-latest.log`). Equal numerical column widths and every project variant need further evidence. |
| WK-24 | **Done for tested behavior**: accessible named focusable region, 390 fade hides at scroll end and returns at start; ResizeObserver also handles resizing/font changes. RED before fix was `end fade display: block`, GREEN `none`; `verify-latest.log` tests start/end/back in en/es/pt. |
| WK-25–26 | Partial: sections use `--section-pad`, glance facts use 20/30 with no rules, meta labels, and readable 40px browser bar; mobile/desktop cards now start below hero. Figma `2558:2375`, `2524:2688`, comparison images. Garden heading/body scale and every exact section gap still need refinement. |
| WK-27 | **Done in code**: TourBench decision hides bytes below 768 (`ProjectPage.astro`, `.decisions :global([data-bytes-mask])`); `latest-tourbench-390.png` compared with `2558:2228`. |
| WK-28 | Partial: TourBench formula and Garden version ranges updated in all locales; other arrows in terminal/captions still exist and have not been adjudicated. |
| WK-29 | **Done for TourBench**: subtitle is sans 16/24 and rejected alternatives lowercase in all locales; `latest-tourbench-*` and translated source. |
| WK-30 | Partial: experiment arrows use shared TextLink; comprehensive icon size comparison remains. |
| WK-31 | Partial: browser bar is 40px high and hostname is 12px even at 390 (`metrics-final.log`); More tiles use drawn circles and available hostnames. Cards without a demo still have no hostname; no approved empty-host variant was found. |
| WK-32 | Partial: Spanish ASM8 kicker shortened, Work eyebrow balances; no native speaker review of all localized pages. |
| T2-2 | Partial: TourBench scale uses NBSP and the test flag includes a non-breaking hyphen; verify behavior across all three locales and font configurations. |
| T1-2/T1-3 | Existing breakpoint and full `title` retained; no persisted regression test. |

## Round 1 comparison and remaining requests

- Compared Work, TourBench and Garden boards at 1440/768/390 (Figma captures `figma-{work,tourbench,garden}-{1440,768,390}.png`) with dev captures `latest-*`. Also captured ASM and Home, en/es/pt Work. Side-by-side `latest-compare-*` files show remaining differences, particularly shared `PageHero` project-photo treatment, some section typography/spacing, and shared contact/footer. `PageHero.astro`, contact and footer are outside this worker's allowed surface; supervisor must own those changes.
- `compare-final-work-768.png` compares the final tablet Work capture after the last action-row fix. Final Home reduced-motion captures `reduced-home-{1440,768,390}.png` avoid reveal-animation invisibility and were compared with `before-home-*`; the Home work-section selectors remain unaffected. The earlier full-motion desktop Home capture was blank after a fast scroll and is not proof.
- No full Inside-lens, screen-reader, real-touch, all-project or all-locale review was made. A peek screenshot had not yet finished loading its image; the DOM interaction passed, but image/caption visual parity needs a fresh settled capture. Thus S5/S6 and full T5 remain open.
- The sandbox baseline is committed `HEAD` 858d385 in an isolated worktree. A separate worker edited Notes/shared files concurrently; overall `git diff --stat` includes those unrelated changes and cannot be attributed to T5. We did not revert, stage, or commit them.

## Round 1 commands and results

Scratch: `/tmp/t5-feedback-WdVGRH` (kept). `git worktree add --detach "$D/base" HEAD`, `npm ci`, `npx astro build`, `npx astro preview --host 127.0.0.1 --port 4330`: baseline build/preview succeeded. Captures use `capture.cjs` with toolbar CSS and page scrolling; 21 `before-*` screenshots saved. `npx astro preview stop` and `git worktree remove "$D/base"` both succeeded; `git worktree list` confirmed removal.

- `NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules node "$D/capture.cjs" 4321 "$D" latest`: first full pass failed when a navigation destroyed the execution context after 12 captures; reran individual home/es/pt passes and final Work and TourBench passes successfully. `latest-*` is the combined set. The last Work pass used reduced motion; other final page captures were normal motion. Some lazy images required the added wait; check any blank against a fresh capture.
- `NODE_PATH=… node "$D/probe.cjs"`: RED initial fade remained visible at end; GREEN after fix, colors recorded in `probe-final.log`.
- `NODE_PATH=… node "$D/verify.cjs"`: PASS start/end/back fade in en/es/pt, 768 table fits, correct project/case headings (`verify-latest.log`).
- `NODE_PATH=… node "$D/peek.cjs" "$D"`: PASS focus peek height/visibility and non-peek state (`peek.log`).
- `NODE_PATH=… node "$D/metrics.cjs"`: PASS observed first-row action alignment and browser-bar metrics (`metrics-final.log`).
- `npm run check`: exit 0 after last code edit; Astro check/build/link rule passed (`check-closed.log`). `git diff --check`: exit 0. The focused probes live in scratch rather than persistent tests because new test files are outside the authorized edit surface.

Risk: item 6 — remaining visual/interaction coverage and a persistent fade regression test need independent verification.

---

# T5 — Work and project pages: partial handoff

Status: **partial; do not mark T5 complete.** The captures and implementation do not yet establish full parity with the approved boards. No commit or staging was performed. S5 and S6 remain open.

## Items

| Item | Status and evidence |
|---|---|
| WK-02 | Partial: dark tile sets `data-surface="dark"` in `src/components/sections/WorkMore.astro:58`; focused links inherit the T2 focus color. Browser DOM check confirms the attribute, not measured focus contrast. |
| WK-03 | Partial: the existing Work More pill is retained. `NextCaseStudy.astro:10` uses a text link because Figma `2522:848` explicitly draws one, contrary to the phase-3 report's statement that next-project cards use a pill. Featured Work parity still needs full checking. |
| WK-04–07 | Partial: More cards flex their body/action rows, align text to capture inset, use the meta token and uppercase (`WorkMore.astro:122,165–179`). Review visual typography and row alignment in all localized cards. |
| WK-08–09 | Open: full marker rhythm and featured facts width not checked or changed. |
| WK-10–11 | Open: stats still use glyphs and caption data is unchanged. The checked-out `ui/Icon.astro` does not expose star or git-fork, despite the T2 brief; see supervisor requests. |
| WK-12–14 | Partial: non-peek tiles retain chips and do not receive peek border; touch links have a separate row; peek uses tokenized opacity/transform and grid resizing no longer animates (`WorkMore.astro:220–360`). Chips/stats still switch via `display`; full motion and peek capture remain outstanding. |
| WK-15–16 | Partial: balance on More/experiment headings and shared `TextLink` on experiment links (`WorkMore.astro:72,179`); touch hit area supplied by shared control. Full keyboard and touch audit outstanding. |
| WK-17, WK-20 | Existing `BackLink` already placed left; not independently revalidated against all boards. |
| WK-18 | Existing global mono code rule; not modified or fully checked. |
| WK-19 | Partial: localized heading replaces repeated name and the next card uses the text link shown in Figma `2522:848` (`NextCaseStudy.astro:10`, `src/lib/i18n.ts:156,485` and locale dictionaries). Check case-study variant and responsive spacing against full boards. |
| WK-21 | Partial: removed step numbers (`ProjectPage.astro:39`), but section marker values remain 02/03; they live in the forbidden `projectPage` dictionary object. |
| WK-22–23 | Partial: balanced step headings, minimum formula height, right-aligned numeric cells (`ProjectPage.astro:196–233`). Equal numeric column widths and 768 board fit still need checking. |
| WK-24 | Partial: localized accessible region, keyboard focus, and mobile right fade (`ProjectPage.astro:50–51,307`; dictionary `caseStudy.scrollableTable`). At 390, browser checks passed keyboard scrolling in en/es/pt. Fade is static and does not disappear at the end of scrolling; board/behavior review outstanding. |
| WK-25–26 | Partial: ProjectPage/CaseStudy section padding adjusted for breakpoints and glance values use 1.5 leading (`ProjectPage.astro:174,282–306`; `CaseStudy.astro:60,134,159,169,435–551`); remaining Next section rhythm and Garden typography not audited. |
| WK-27 | Open: mobile bytes/background masking not addressed. |
| WK-28 | Partial: TourBench formula and Garden day-36 version range corrected in all three locales (`src/content/projects/{,es/,pt/}{tourbench,inspiration-garden}.mdx`); other arrows in terminal/content remain unchanged. |
| WK-29 | Partial: decision subtitle uses sans body styling (`ProjectPage.astro:271`); copy casing still needs review. |
| WK-30 | Partial: experiment links use `TextLink` instead of the 15px hand-built icon (`WorkMore.astro:72–73`); board sizing and all other call sites need checking. |
| WK-31 | Partial: More mock bar uses three circles and available demo hostname (`WorkMore.astro:30,135–154`). Project/case-study mock bar remains untouched and has a 4px minimum hostname at narrow sizes. |
| WK-32 | Partial: Spanish ASM8 kicker says “Herramienta · Rehecha · Individual” (`src/content/projects/es/asm8.mdx:8`); Work eyebrow balances (`WorkIndex.astro`, final style). No complete native-language/layout review. |
| T2-2 | Partial: TourBench scale `3 628 800` and flag use non-breaking characters in all locales. Verify visual wrapping at all widths. |
| T1-2/T1-3 | Existing no-peek at ≤1024 and full title attribute retained; no new regression test. |

## Open questions

- The Next project design component `2522:848` shows a text link, while the phase-3 findings table says one pill on all next-project cards. Figma was followed; confirm whether other approved boards differ.
- More cards without a `demoUrl` now show three dots but no hostname. No approved empty-host variant was identified.
- No complete visual review of the Inside lens, es/pt project pages, focused/hovered peek states, or all 30 findings was made. The phase-2 Work audit says these non-home pages have no Inside lens, but that was not reverified across all locales.

## Requests for the supervisor

- WK-21: update `projectPage.howMarker` and `projectPage.decisionMarker` in all three dictionaries from 02/03 to 01/02; this worker was explicitly restricted to the `work` and `caseStudy` objects.
- WK-10: provide approved shared star and git-fork icons in `ui/Icon.astro`; it is outside this worker's allowed surface and currently lacks those names.
- WK-27 and WK-31: review changes needed to shared background/mocking treatment; do not assume the mobile project hostname and bytes issues are fixed.
- Finish all items marked partial/open, run a new complete before/after visual review and obtain a clean baseline (including all images, no toolbar), plus screen-reader and touch checks.

## Out of scope noticed

- The Astro dev toolbar appeared over some captured project images despite removing `astro-dev-toolbar` before capture; this prevents treating those images as clean proof.
- `.codegraph/` was already untracked at start and was not edited intentionally.

## Scratch paths

`/tmp/t5-work-BcZNTR/`: `before-*`, `after-*`, `final-*`, `contact-*`, `capture.cjs`, `final.cjs`, `capture-final.log`, `check*.log`, `detector.json`. The `before` script did not eagerly load lazy images. Work and TourBench English baselines were captured before their edits; Garden/ASM before their relevant case/next edits; localized Work baselines were captured after Work edits and are not valid baselines. `final-*` eagerly loads images, but some include the toolbar. Images at 1440/768/390 for Work, TourBench, Garden and ASM were looked at in `contact-*.png`; full parity and regression checking is NOT established.

## Commands and results

- `NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules node /tmp/t5-work-BcZNTR/capture.cjs /tmp/t5-work-BcZNTR before` — exit 0; baseline limitations above.
- Same command with `after` — exit 0, but captured while subsequent edits were still being made; superseded by final captures.
- `NODE_PATH=$(npm root -g)/@playwright/mcp/node_modules node /tmp/t5-work-BcZNTR/final.cjs /tmp/t5-work-BcZNTR` — exit 0; 21 final captures, limitations above.
- Focused Playwright checks: initial table region missing role/name/tabindex (RED); after change all three TourBench locales had region/name/tabindex and scrolled via ArrowRight at 390; experiment dark-surface attribute present. These probes were inline Node scripts; no persistent regression test added.
- `npm run check` — exit 0 after the final edit; 0 Astro errors/warnings, build succeeded and link rule passed (`check-final2.log`).
- `git diff --check` — exit 0.
- `git diff --stat` — all tracked source edits were within the allowed surface; report is this requested handoff. `.codegraph/` was pre-existing untracked state.
- `/home/trinitybytes/.codex/skills/impeccable/scripts/impeccable detect --json --changed` — exit 0, `[]`.

Risk: item 6 — visual parity and some responsive behavior lack complete regression coverage. Independent verification is still required.
