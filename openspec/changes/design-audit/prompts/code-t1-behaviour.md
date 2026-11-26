# T1 — Behaviour defects

Task T1 of `odd/tasks/design-corrections-code.md` (specs S2, S6). Fix the eight defects of `reports/phase-2-audit.md` §1, in that order. A second worker (T2) is editing tokens, `src/layouts/Base.astro` and `src/components/ui/Icon.astro` at the same time: do not touch those files.

| ID | Source | Corrected form |
|---|---|---|
| NL-01 | `reports/audit-notes-links.md`, `phase-3-notes.md` | Headings land below the sticky nav; the "In this post" list marks the section being read, with `aria-current`; drawn on `2520:102` |
| HI-01 | `reports/audit-home-inside-chat.md` | A second `I` (or lens click) during the reveal never crashes or stacks transitions |
| HI-02 | same | `Esc` in an editable field (chat composer, any input/textarea/contenteditable) does not switch the lens |
| NL-03 | `audit-notes-links.md` | Notes list uses `dictionary.readingTime` (or the existing equivalent) in every locale |
| WK-17 | `reports/audit-work.md`, `phase-3-work.md` | "← All work" on project and case-study pages sits on the left edge, as on the Proposed project boards |
| NL-02 | `audit-notes-links.md`, `phase-3-notes.md` | Code block Copy: label swaps to "Copied" with a check icon for 1.6 s, announced in a polite live region, hover state, padded hit area; component `2520:35` |
| HI-03 | `audit-home-inside-chat.md`, `phase-3-home.md` | The composer annotation is hidden while the chat is open at 1440 Inside; board `2555:3713` |
| WK-01 | `audit-work.md`, `phase-3-work.md` | The experiment peek never changes the tile's height or moves the grid; description clamped in the peek state |

Pure logic worth a unit test (examples, not a list to fill): "is this event target editable", "which heading is active for this scroll offset", a transition guard.

The check icon: T2 adds `check` (Lucide) to `Icon.astro` first thing. Use `<Icon name="check" />`; if it is not there yet when you need it, carry on and check again before you finish. Do not add it yourself.

## Allowed edit surfaces

src/components/sections/Lens.astro
src/components/sections/lens/**
src/components/sections/Nav.astro
src/components/sections/contact/**
src/components/ui/Annotation.astro
src/components/ui/annotation/**
src/components/sections/Notes.astro
src/pages/notes/[...slug].astro
src/pages/_views/CaseStudy.astro
src/components/sections/ProjectPage.astro
src/components/sections/NextCaseStudy.astro
src/components/sections/WorkMore.astro
src/components/sections/Work.astro
src/lib/i18n.ts
src/lib/dictionaries/es.ts
src/lib/dictionaries/pt.ts
src/lib/*.ts
src/lib/*.test.ts

## Report

`openspec/changes/design-audit/reports/code-t1-behaviour.md`
