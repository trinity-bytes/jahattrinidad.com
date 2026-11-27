# T5 — supervisor feedback, round 1

Your report is honest, thank you, but T5 is not done: most items are partial or open. Continue from the tree as it is (do not revert your edits) and finish every item. Read your report `reports/code-t5-work.md`, this file, then work.

## Fix in what you already wrote

1. `NextCaseStudy.astro`: choosing the heading with `marker === t.caseStudy.nextCaseStudy ? … : …` couples the markup to a string comparison. Replace the `marker` prop with an explicit prop (for example `kind: 'case-study' | 'project'`) and update its callers (`_views/CaseStudy.astro` markup only).
2. Literals where a token exists: `WorkMore.astro` (`12px`, `8px`, `29px`, `16px`, `20px`, `500 12px/1.5 var(--font-mono)`), `ProjectPage.astro` (`min-height: 81px`, `400 16px/1.5 var(--font-sans)`, `32px`, `12px`), `NextCaseStudy.astro`. Use the T2 tokens in `src/styles/tokens.css` (type styles such as `--type-meta`, `--type-marker`, spacing, radius). Keep a literal only where no token exists and say so in a comment of a few words.
3. `TextLink` on the dark experiment tiles: check that text, underline and focus ring read on `green-950` (contrast ≥ 4.5:1 for text, ≥ 3:1 for the ring). Measure it; do not assume.
4. The table fade at 390 must hide when the table is scrolled to its end (or explain why the board does not need it).

## Surface added for this round

src/components/ui/Icon.astro
src/lib/i18n.ts
src/lib/dictionaries/es.ts
src/lib/dictionaries/pt.ts

- `Icon.astro`: add `star` and `git-fork` (Lucide, same 24 grid and stroke as the others) for WK-10, only if the Design system icon section `2501:136` draws them; take the paths from the Figma icon nodes. T6 does not edit this file.
- Dictionaries: you may also edit the `projectPage` object (WK-21 markers 02/03 → 01/02). Same rules: small edits, re-read before each one.

## Captures

The dev toolbar: before each capture run `page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' })` after navigation, and scroll the page to load lazy images. Take a clean before set from `git stash`-free means: for "before" use the committed tree by building it in a scratch copy (`git worktree add <mktemp -d>/base HEAD`, `npm ci`, `npx astro build`, `npx astro preview --port 4330`) and capture there; remove the worktree when done (`git worktree remove`). After set from the dev server at 4321.

Then compare each page with its board at 1440, 768 and 390 (`get_screenshot` of the board nodes listed in `reports/phase-3-work.md`) and fix what differs. In the report, mark an item done only with the evidence that shows it.

Finish with `npm run check` and the updated report at the same path, then `WORKER DONE <report path>`.
