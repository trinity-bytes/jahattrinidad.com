# T6 — Notes, posts and /links/

Task T6 of `odd/tasks/design-corrections-code.md` (specs S5, S6). Read `prompts/code-common.md` first; every rule there applies. A second worker (T5, Work and project pages) works at the same time: stay inside your edit surface and respect the shared-file rules below.

## What to build

Make `/notes/`, every post and `/links/` (with their `/es/` and `/pt/` routes) match their boards on `Proposed · Notes & links` `2520:12` at 1440, 768 and 390, Outside and Inside where the page has them, in en, es and pt. `reports/phase-3-notes.md` maps each NL item to its board node; every item there is yours except NL-17 (chat, T4):

- Marked **fixed** (on the boards): the board shows the corrected form and the code does not have it yet. Implement it (NL-06 to NL-11, NL-13 to NL-15, NL-18, NL-20).
- Marked **code**: NL-01 (already fixed in T1, `a4abdf0`: keep it working; check the contents `aria-current`), NL-02 (copy button: clipboard, 1.6 s, live region; already partly in T1), NL-03 (reading time from the dictionary; done in T1, verify), NL-12 (directional hover translation with reduced motion), NL-22 (keyboard order), NL-23 (keyboard focus and horizontal scroll of the wide element at 390).
- Marked **proposal**: NL-04, NL-05, NL-16, NL-19, NL-21. The owner approved the Proposed boards on 2026-11-25, so implement what the boards draw. NL-04's last-word break: use the non-breaking hyphen the board names; leave the rest as the board shows.
- Open question T1-1 (decided by the supervisor): the code-block "Copy" control is white at rest as the Figma draws it; its hover adds a 1 px underline at 0.2em (the TextLink grammar), only under `(hover: hover) and (pointer: fine)`.
- Known leftover: `content/PostRow.astro` `&nbsp; →` still has a breakable space: replace the hand-built arrow with the shared pattern the board shows.

Use the shared controls (`ui/Button`, `ui/TextLink`, `ui/BackLink`) and T2's tokens; no new literals where a token exists.

## Shared-file rules

- `Notes.astro` also renders on Home (`/`). Any change there must leave Home matching `Proposed · Home` `2536:12`: capture Home's Notes section before and after at the three widths.
- `PageHero.astro` is yours, but `/work/` and project pages use it too (T5 does not edit it): capture `/work/` and one project page hero before and after; any change there must match their boards on `Proposed · Work & projects` `2520:22`.
- `content/Figure.astro`, `Note.astro`, `PullQuote.astro` are yours; project pages may use them: check one project page that does.
- `PageContact.astro`, `PageFooter.astro`, `Footer.astro`, `Nav.astro`, `tokens.css`, `Base.astro`: not yours. List any change the boards need there under "Requests for the supervisor".
- Dictionaries (`src/lib/i18n.ts`, `src/lib/dictionaries/es.ts`, `pt.ts`): T5 edits them too. Add or change keys only inside the `notes`, `post` and `links` objects (create a sub-object if you need one), with small targeted edits, re-reading the file right before each edit. Never rewrite or reformat the file.
- View files: in `src/pages/_views/NotesIndex.astro`, `Links.astro` and `src/pages/notes/[...slug].astro` change the frontmatter only to add imports or data the markup needs; do not touch the SEO lines (titles, descriptions, JSON-LD).

## Allowed edit surfaces

src/pages/_views/NotesIndex.astro
src/pages/_views/Links.astro
src/pages/notes/[...slug].astro
src/components/sections/Notes.astro
src/components/sections/PageHero.astro
src/components/sections/SkyBand.astro
src/components/content/PostRow.astro
src/components/content/Figure.astro
src/components/content/Note.astro
src/components/content/PullQuote.astro
src/content/posts/**
src/lib/i18n.ts
src/lib/dictionaries/es.ts
src/lib/dictionaries/pt.ts

## Report

`openspec/changes/design-audit/reports/code-t6-notes.md` in the `code-common.md` format, plus "Requests for the supervisor". Captures before/after of `/notes/`, two posts (one with code blocks), `/links/` at 1440 / 768 / 390, en plus one es and one pt pass, Home's Notes section, and the `/work/` and project page heroes.
