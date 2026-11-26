# Code phase — rules for every worker

You implement one unit of the design corrections in the site's code. The supervisor (another Claude session) reviews your diff, owns git and commits. Read, in this order, before any edit:

1. `CLAUDE.md` (repository root). Every rule there is binding. The note that `tokens.css` is a placeholder is out of date: it already holds the brand values. The "no UI code until the owner approves the hi-fi" rule is satisfied: the owner approved the Proposed boards on 2026-11-25.
2. `odd/tasks/design-corrections-code.md` until `## Log` (the specs; your task is named in your brief).
3. `openspec/changes/design-audit/reports/phase-2-audit.md`, then the source report of every item your brief names. The source report holds the measurement and the fix.
4. Your brief (`prompts/code-t<N>-*.md`).

## The reference is the approved Figma

File `gq6glEp9QrPOnEyYG9dldh`. Pages: `Design system` `2501:136` (variables, text styles, components), `Proposed · Home` `2536:12`, `Proposed · Work & projects` `2520:22`, `Proposed · Notes & links` `2520:12`. The phase 3 reports (`reports/phase-3-*.md`) map each audit item to the board or component node that shows its corrected form. Read Figma only (`get_design_context`, `get_screenshot`, `get_variable_defs`, `get_metadata`; call `create_session` first). Never write to Figma.

When the Figma and a report disagree, the Figma wins and you note it in your report. When neither says how something should look or behave, do not invent a design: list it under "Open questions" in your report and leave the code as it is.

## Quality bar

- Match the proposal at 1440, 768 and 390, Outside and Inside, and in en, es and pt where the page has those.
- Every user-visible string, including aria labels and live-region text, goes through the `Dictionary` in `src/lib/i18n.ts` with `es.ts` and `pt.ts` entries. Spanish and Portuguese copy must read as written by a native speaker (es neutral, pt-BR), not word-for-word.
- Accessibility is part of done: keyboard path, visible focus, `aria-*` that a screen reader needs, `prefers-reduced-motion`, hit areas.
- Test first where a deterministic test exists: logic you can isolate goes in a pure function under `src/lib/` with a `*.test.ts` beside it (runner: `node --test`, `npm test`); observe it fail, then pass. `src/components/ui/` must not import from `src/lib/` (see CLAUDE.md). For CSS and layout, the check is a capture.
- Reuse existing helpers (`localizedPath`, `getDictionary`, `src/lib/content.ts` functions, existing tokens). No new dependencies.
- Keep the diff to your edit surface and your items. No drive-by refactors, no reformatting of untouched lines.

## Running the site

The supervisor runs the dev server at `http://127.0.0.1:4321/`. Do not start another one and do not stop it. Captures: a Node script with the global `playwright` package and `executablePath: '/usr/bin/chromium'` (see `openspec/changes/design-audit/tools/shot.cjs`), viewports 1440 × 900, 768 × 1024, 390 × 844, remove `astro-dev-toolbar`, `await document.fonts.ready`. Inside is `localStorage` / the `I` key, see `src/components/sections/Lens.astro`.

Scratch files (captures, scripts) go in a `mktemp -d` folder outside the repository. Never write them in the repo. Report their path at the end; do not delete them.

## Before you finish

1. `npm run check` passes (boundaries, tests, `astro check`, build, link rule). If it fails for a reason outside your surface, say so with the output; do not fix it.
2. Before/after captures of every page your change touches, at the three widths, and a look at them. Anything that moved and should not have is a regression to fix.
3. `git diff --stat` shows only files inside your edit surface.
4. Write your report to the path your brief names: per item, what changed (file:line), how you checked it (test name, capture path), and its status (done / partial / open question). Then "Open questions", "Out of scope noticed", "Scratch paths", and the exact commands you ran with their result.
5. Do not commit, stage, stash, switch branches or run repository-wide formatters. Do not end your turn before the report is written. Your last message is exactly `WORKER DONE <report path>`.
