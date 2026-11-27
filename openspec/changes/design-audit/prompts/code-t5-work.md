# T5 — Work index and project pages

Task T5 of `odd/tasks/design-corrections-code.md` (specs S5, S6). Read `prompts/code-common.md` first; every rule there applies. A second worker (T6, Notes and `/links/`) works at the same time: stay inside your edit surface and respect the shared-file rules below.

## What to build

Make `/work/` (and `/es/work/`, `/pt/work/`) and every project page match their boards on `Proposed · Work & projects` `2520:22` at 1440, 768 and 390, Outside and Inside, in en, es and pt. `reports/phase-3-work.md` maps each WK item to its board node; every item there is yours:

- Marked **fixed** (on the boards): the board shows the corrected form and the code does not have it yet. Implement it (WK-04 to WK-11, WK-13, WK-15, WK-17, WK-18 code part, WK-22, WK-23, WK-25, WK-27 to WK-31).
- Marked **code**: WK-02 (focus ring on dark tiles, `--focus-*` and `[data-surface="dark"]` from T2), WK-12 (hover on the tile without a peek), WK-14 (motion, with the T2 motion tokens and reduced motion), WK-16 (hit areas), WK-24 (table region: `role="region"`, label from the dictionary, `tabindex="0"`, right-edge fade at 390).
- Marked **proposal (needs owner)**: WK-03, WK-19, WK-21, WK-26. The owner approved the Proposed boards on 2026-11-25, so implement what the boards draw.
- WK-32: es kicker wording and eyebrow balance (copy in the dictionary, native es).
- Open question T2-2 (decided): TourBench facts get non-breaking characters: U+00A0 in `3 628 800`, a no-wrap span (or U+2011) in `--test`, in `src/content/projects/{,es/,pt/}tourbench.mdx`.
- Open questions T1-2 and T1-3 are accepted as built (no peek swap below 1025 px; long peek titles truncate with the full name in `title`).

Use the shared controls (`ui/Button`, `ui/TextLink`, `ui/BackLink`) and T2's tokens; no new literals where a token exists. `WorkMore.astro:74,75` (live/code links in the experiments table, hand-built with a 15 px icon): match the board; use `TextLink` if the board draws its variant, otherwise list it under "Open questions".

## Shared-file rules

- `Work.astro` and `ProjectCard.astro` also render on Home (`/`). Any change there must leave Home matching `Proposed · Home` `2536:12`: capture Home's Work section before and after at the three widths.
- `PageHero.astro`, `PageContact.astro`, `PageFooter.astro`, `content/Figure.astro`, `content/Note.astro`, `content/PullQuote.astro`, `tokens.css`, `Base.astro`: not yours. If the Work boards need a change there, stop that item and list the exact change under "Requests for the supervisor".
- Dictionaries (`src/lib/i18n.ts`, `src/lib/dictionaries/es.ts`, `pt.ts`): T6 edits them too. Add or change keys only inside the `work` and `caseStudy` objects (create a sub-object if you need one), with small targeted edits, re-reading the file right before each edit. Never rewrite or reformat the file.
- View files: in `src/pages/_views/WorkIndex.astro` and `CaseStudy.astro` change the frontmatter only to add imports or data the markup needs; do not touch the SEO lines (titles, descriptions, JSON-LD).

## Allowed edit surfaces

src/pages/_views/WorkIndex.astro
src/pages/_views/CaseStudy.astro
src/components/sections/Work.astro
src/components/sections/WorkMore.astro
src/components/sections/CaseStudy.astro
src/components/sections/ProjectPage.astro
src/components/sections/NextCaseStudy.astro
src/components/content/ProjectCard.astro
src/content/projects/**
src/lib/i18n.ts
src/lib/dictionaries/es.ts
src/lib/dictionaries/pt.ts

## Report

`openspec/changes/design-audit/reports/code-t5-work.md` in the `code-common.md` format, plus "Requests for the supervisor". Captures before/after of `/work/`, TourBench, Inspiration Garden and one more project page at 1440 / 768 / 390, en plus one es and one pt pass, and Home's Work section.
