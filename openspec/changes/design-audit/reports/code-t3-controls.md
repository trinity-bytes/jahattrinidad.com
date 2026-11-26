# Code T3 — Shared controls (close-out)

Brief: `prompts/code-t3-controls.md`. A Codex worker built the components and migrated the call
sites, then stopped without a report (WIP commit `832174b`). The supervisor reviewed the work
against `Design system` `2501:136` and closed it on 2026-11-26.

## Components against Figma

| Component | Figma | Checked | Result |
|---|---|---|---|
| `ui/Button.astro` | `2504:54` | `get_design_context` values; computed styles at 1440 on `/work/tourbench/` | Height 44, padding 12/22 (11/21 plus a 1 px border on both styles so primary and secondary share one box), gap 8, icon 18, UI/Control 16/500/20. Hover: accent → accent-hover `rgb(26 81 31)`, secondary card → surface `rgb(243 237 214)`, only on `(hover: hover) and (pointer: fine)`. Pressed: hover colour + `scale .97`. Focus: 3 px ring at 3 px offset from the `Base.astro` default. Matches |
| `ui/TextLink.astro` | `2505:67` | design context; captures at 1440 and 390 | Body 18/1.5, 1 px underline in text-muted at 0.2em, hover 2 px currentColor; Internal `→` icon, External `↗` + new tab + hidden note, In-page no arrow; optional leading glyph. `.hit` gives 27 px at desktop and 44 px at touch widths without moving the layout. Matches |
| `ui/BackLink.astro` | `2505:84` | captures; computed colours | Mono uppercase, `←` 14 px on the left, text-muted `rgb(35 108 42)` → heading on hover, 44 px tall. Matches |

All three stay project-agnostic (no `src/lib/` or `astro:*` imports; `check-boundaries` passes).

## Items

| Item | Control | Call sites | Status |
|---|---|---|---|
| HO-01, HO-05, HO-19 | Button primary | `Hero.astro:92` (CTA), `Nav.astro:47` (Contact), `contact/Chat.astro:105,106,118` | done |
| HI-10 | Button secondary, no icon (chips one height, 44) | `contact/Chat.astro:71,88,95,97,119` | done |
| WK-03 | Button on project cards and project pages | `content/ProjectCard.astro:75`, `WorkMore.astro:42`, `_views/CaseStudy.astro:110,111`, `notes/[...slug].astro:138` | done |
| HO-14, HO-15 | TextLink internal | `Values.astro:89`, `Work.astro:52`, `Notes.astro:62`, `ProjectCard.astro:76` | done |
| NL-14 | TextLink external / in-page | `Notes.astro:61` (RSS), `Contact.astro:70,73,74,75`, `WorkMore.astro:43,44,89`, `notes/[...slug].astro:131` | done |
| WK-20, NL-13 | BackLink | `_views/CaseStudy.astro:104`, `notes/[...slug].astro:114`, `NextCaseStudy.astro` | done |

The temporary `.site-nav .contact { line-height: 1.25rem; }` rule is removed from `Base.astro`.
The nav stays 69 px tall and the Contact control 44 px at 1440, 768 and 390 on `/`, `/es/work/`
and `/pt/notes/`.

## Not migrated (not a Button, TextLink or BackLink variant)

These are their own patterns on the boards and belong to the page units:

- Nav section links, language links, menu toggle, profile icons (`Nav.astro`) → T4.
- Footer link lists and the `.out` external links with a 13 px icon, the shortcut toggle (`Footer.astro`) → T4.
- Notes background cards (`Notes.astro:134`), post rows (`content/PostRow.astro`) → T6.
- `/links/` cards and logo buttons (`_views/Links.astro:88–98`) → T6.
- Post table of contents (`notes/[...slug].astro:130`) → T6.
- `WorkMore.astro:74,75` live/code links in the experiments table (15 px icon) → T5: compare with the board before choosing TextLink.
- `Lens.astro` buttons (pill hint and back) and the chat send/edit icon buttons: not controls of this set.

## Open questions

- `TextLink` carries a `back` prop that `BackLink` uses, and `BackLink` passes `destination="in-page"` only to hide the trailing arrow. It works and is private to `ui/`, but a later cleanup could give `TextLink` an explicit `trailing: false` instead.

## Commands

- `npm run check`: exit 0 (boundaries, tests, `astro check`, 55 pages, link rule).
- Captures and state readings: scratch scripts outside the repo (machine-local, not kept).
