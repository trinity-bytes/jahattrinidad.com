# T3 — Shared controls: Button, TextLink, BackLink

Task T3 of `odd/tasks/design-corrections-code.md` (specs S4, S6). Read `prompts/code-common.md` first; every rule there applies. A second worker (T7, SEO) works at the same time: stay inside your edit surface and respect the shared-file rule below.

## What to build

Three project-agnostic components in `src/components/ui/`, built as the `Design system` page (`2501:136`) draws them. Read each component set with `get_design_context` and `get_screenshot` (all variants, Outside and Inside modes):

| Component | Figma | Variants and props |
|---|---|---|
| `Button.astro` | `2504:54` | Style Primary / Secondary × State (rest, hover, pressed, focus); props Label, Show icon, Icon. Renders `<a>` when given `href`, otherwise `<button>` (pass `type`). Icon at 18 px through `Icon`'s `size` prop |
| `TextLink.astro` | `2505:67` | Destination Internal `→` / External `↗` / In-page (no arrow); props Label, Leading icon, Leading glyph. External always gets `target="_blank" rel="noopener noreferrer"`, `<Icon name="arrow-up-right" />` and a `.visually-hidden` new-tab note passed in as a prop (the component cannot read the dictionary: `ui/` must not import `src/lib/`) |
| `BackLink.astro` | `2505:84` | Mono uppercase back link, `←` on the left, 14 px icon (keep `size`) |

System causes this closes (`reports/phase-2-audit.md` §2): S1 (one control per kind), S6 (hit area: one `.hit` treatment on TextLink and BackLink that gives at least 24 × 24 px, and 44 px tall touch targets at touch widths, without shifting layout), S7 (one hover per control type, inside `@media (hover: hover)`, plus an `:active` pressed state; `prefers-reduced-motion` drops the transitions). Use the tokens from T2 (`src/styles/tokens.css`: colours, `--focus-*`, motion, radius, type); no new literals where a token exists. The focus ring comes from the `:focus-visible` default in `Base.astro` unless the Figma focus variant differs.

Then migrate every hand-built call site to these components. The items and their source reports: HO-01, HO-05, HO-14, HO-15, HO-19, HI-10, WK-03, WK-20, NL-13, NL-14 (each in its `reports/` file; the phase 3 reports map them to board nodes). Also `reports/code-t2-foundations.md` "Call sites to adopt" for the icon sizes on the controls you migrate. Find the call sites with a search for the primary pill, the underline link treatments and the back links; list every one you migrated (file:line, before → after) in your report. A call site that does not fit a variant without inventing a design goes under "Open questions", unchanged.

Link-arrow rule (CLAUDE.md) holds everywhere: `scripts/check-links.mjs` must still pass.

## Shared-file rule

T7 edits the **frontmatter** (the code between the `---` fences) of `src/pages/_views/*.astro` and `src/pages/notes/[...slug].astro`. In those files you edit only the markup and `<style>` below the frontmatter, plus import lines (add your imports as new lines at the top of the frontmatter, touching nothing else there). Re-read a file right before each edit.

You do not edit `src/layouts/Base.astro` (T7 owns it): the temporary `.site-nav .contact` line-height rule there is removed by the supervisor after you finish; tell in your report whether the Nav Contact control renders right without it. You do not edit the dictionaries: if a control needs a new string, stop and list the key and its en/es/pt text in your report.

## Allowed edit surfaces

src/components/ui/Button.astro
src/components/ui/TextLink.astro
src/components/ui/BackLink.astro
src/components/sections/**
src/components/content/**
src/pages/_views/*.astro
src/pages/notes/[...slug].astro

## Report

`openspec/changes/design-audit/reports/code-t3-controls.md`. Captures before/after of every page you touched at 1440 / 768 / 390, Outside and Inside for Home, plus a states sheet (rest, hover, pressed, focus) of each component compared with its Figma variants.
