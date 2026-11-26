# T4 — Home (Outside, Inside, chat), nav, footer, page contact

Task T4 of `odd/tasks/design-corrections-code.md` (specs S5, S6). Read `prompts/code-common.md` first; every rule there applies. T5 (Work and project pages) may still be finishing in the same tree: stay inside your edit surface and respect the shared-file rules below.

## What to build

Make Home (`/`, `/es/`, `/pt/`) match its boards on `Proposed · Home` `2536:12` at 1440, 768 and 390, Outside and Inside, plus the chat-open board: Outside `2541:153`, `2544:603`, `2547:2030`; Inside `2549:1779`, `2553:3005`, `2554:3421`; chat open `2555:3713`. Components on `Design system` `2501:136` (`ChatCard`, `MobileMenu` `2517:877`, Footer, `Contact section`). `reports/phase-3-home.md` maps each HO and HI item to its node; every item there is yours:

- **fixed** (on the boards or the Design system) and **code**: implement them (HO-02 to HO-24, HI-03 to HI-20; HI-01 and HI-02 were fixed in T1, keep them working).
- **proposal (owner)**: HO-03, HO-04, HO-09, HI-05, HI-07 (copy), HI-14. The owner approved the Proposed boards on 2026-11-25: implement what the boards draw. HI-05 (outside-aligned outline): if an SVG outline without inner contours is not feasible cleanly, keep the current outline and say why under "Open questions".
- **Label system (S3 of `phase-2-audit.md` §2).** Every label the boards draw in `Label/Meta` or `Label/Marker` is mono, uppercase and tracked. The site still renders some in mixed case: Contact facts (`Looking for`, `Available`, `Based in`), Footer heads (`Navigate`, `Elsewhere`, `This site`), and any other on Home. Use `--type-meta` / `--type-marker` with their tracking and `text-transform: uppercase`; keep the dictionary strings as they are.
- **Known leftovers:** the chat send button draws `arrow-up`; the boards draw a send (paper plane) icon: add Lucide `send` to `ui/Icon.astro` and use it. Chips "I'm hiring" with a curly apostrophe (HO-11/HI-20) in en and the matching typographic quotes in es/pt. The Footer "Turn off the I shortcut" line the boards show at 1440 (HO-24).
- **NL-17** (from the Notes unit): put the composer input and Send before the chips in DOM order (`reports/phase-3-notes.md`).
- **Open questions decided by the supervisor:** T1-4: apply the 8 px idle inset of the composer annotation bound as the Home Inside board shows. T2-1: heading breaks: the boards break by phrase ("Faster launches. / Fewer handoffs. / Nothing rebuilt."). Keep `text-wrap: balance` and wrap each phrase in a no-wrap span, so lines break only between phrases at 1440 and 768 and can still wrap inside a phrase at 390 if one does not fit. Do it from the dictionary data without putting markup in strings (for example an array of phrases).
- **Project page hero title** (`PageHero.astro`, project variant only): boards `2524:2790` and `2530:1307` draw the project title in the green heading colour and smaller than the code. Match them without changing the Notes, post, Work and Links heroes (the T6 unit just matched those: capture them before and after).
- **Requests from the other units:** `--post-card-pad-x/y` tokens 20/24, then 40/32 from 48rem (`2538:134`), then remove the local override on `.featured-card` in `Notes.astro`.

Use the shared controls (`ui/Button`, `ui/TextLink`, `ui/BackLink`) and T2's tokens; no new literals where a token exists.

## Shared-file rules

- `Work.astro`, `ProjectCard.astro`, `WorkMore.astro` belong to T5 until the supervisor tells you otherwise. If Home's Work section differs from the board, list the change under "Requests for the supervisor".
- `Notes.astro`: only the `.featured-card` override removal above.
- `ui/Icon.astro`: T5 may be adding `star` and `git-fork` at the same time. Make your `send` addition one small edit, re-reading the file right before it.
- Dictionaries (`src/lib/i18n.ts`, `src/lib/dictionaries/es.ts`, `pt.ts`): add or change keys only inside `home`, `contact`, `nav`, `footer`, `common`, `lens` (and the chat scripts `src/lib/chat/script.*.ts`), with small targeted edits, re-reading the file right before each edit. Never rewrite or reformat the file.
- `src/pages/_views/Home.astro`: markup only; do not touch its SEO frontmatter lines.

## Allowed edit surfaces

src/pages/_views/Home.astro
src/components/sections/Hero.astro
src/components/sections/Lens.astro
src/components/sections/lens/**
src/components/sections/Values.astro
src/components/sections/Experience.astro
src/components/sections/Contact.astro
src/components/sections/contact/**
src/components/sections/Nav.astro
src/components/sections/Footer.astro
src/components/sections/PageContact.astro
src/components/sections/PageFooter.astro
src/components/sections/PageHero.astro
src/components/sections/Notes.astro
src/components/sections/GlowTransition.astro
src/components/sections/glow/**
src/components/sections/reveal/**
src/components/sections/Reveal.astro
src/components/content/ExperienceRow.astro
src/components/ui/Icon.astro
src/components/ui/Annotation.astro
src/components/ui/annotation/**
src/styles/tokens.css
src/lib/chat/**
src/lib/i18n.ts
src/lib/dictionaries/es.ts
src/lib/dictionaries/pt.ts

## Report

`openspec/changes/design-audit/reports/code-t4-home.md` in the `code-common.md` format, plus "Requests for the supervisor". Captures before/after of Home at 1440 / 768 / 390, Outside and Inside, the chat open (question and summary states), the mobile menu, en plus one es and one pt pass; and the heroes of `/notes/`, a post, `/work/`, TourBench and Garden. Compare every Home board side by side with your capture (scale both to the same width) and fix what differs before you write the report.
