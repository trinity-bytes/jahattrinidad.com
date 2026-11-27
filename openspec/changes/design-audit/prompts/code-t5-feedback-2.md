# T5 — supervisor feedback, round 2

Round 1 is good work: tokens, the explicit `kind` prop, measured contrast and the fade are accepted. The supervisor compared full-page captures of `/work/` and `/work/tourbench/` at 1440 with boards `2522:1526` and `2524:2790` side by side. Fix these differences, all inside your surface, then stop. Do not spend this round on anything else.

1. **Labels (S3 label system).** The boards draw every row and fact label in `Label/Meta`: mono, uppercase, tracked (`THE PROBLEM`, `MY PART`, `WHAT IT DOES` on Featured and Next cards; `THE CHOICE`, `WHY`, `WHAT IT COST` in the key decision; `PROBLEM`, `METHOD`… in At a glance). The code renders them mixed case ("The problem"). Use `font: var(--type-meta); letter-spacing: var(--type-meta-tracking); text-transform: uppercase` in `ProjectCard.astro`, `ProjectPage.astro`, `CaseStudy.astro`. Keep the dictionary strings as they are (CSS does the case).
2. **Card title sizes.** Featured card title ("Viora", "Mink'a", "Inspiration Garden") and More card titles ("ASM8"…) render larger than the boards. Read the sizes from the board nodes with `get_design_context` and use the matching heading token.
3. **Small experiments tiles.** On `2522:1526` / `2524:2560` the `Live ↗` / `Code ↗` links sit inline right after the chips on the same row, and the tiles are shorter. The code puts the links on their own right-aligned row. Match the board at 1440; keep the 768/390 behaviour you built if the 768/390 boards show it.
4. **TourBench browser frame.** On `2524:2790` the mock browser starts at the left content edge and is wider (about 1000 px at 1440); the code centres a narrower one. Match it (check `2558:1614` and `2558:2228` too).
5. **Next project card.** `See the project →` sits right under the description on the board; the code pushes it to the bottom of the card.
6. **WK-10.** The supervisor authorizes `star` and `git-fork` in `ui/Icon.astro` from the page-local nodes `2524:2493` and `2524:2500` (they are Lucide icons): use Lucide's own paths for those two names, same 24 grid and stroke as the others, and use them for the stats.

Re-capture `/work/` and TourBench at 1440 / 768 / 390, compare with the boards, `npm run check`, then add a "Round 2" section at the top of `reports/code-t5-work.md` and end with `WORKER DONE <report path>`.
