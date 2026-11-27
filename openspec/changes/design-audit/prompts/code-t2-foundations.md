# T2 — Foundations: tokens, root defaults, Icon

Task T2 of `odd/tasks/design-corrections-code.md` (specs S3, S6). A second worker (T1) is fixing behaviour defects in section components at the same time: stay inside your edit surface.

First thing, before anything else: add the Lucide `check` icon to `src/components/ui/Icon.astro` (T1 needs it), in the same shape as the existing Lucide entries.

## What to build

Make `src/styles/tokens.css` and the `@layer base` block in `src/layouts/Base.astro` carry what the Figma variables and text styles on `Design system` `2501:136` define. Read the variables with `get_variable_defs` (collections Primitives `2501:12`, Color `2501:36` with modes Outside / Inside, Breakpoint `2501:76` with Desktop 1440 / Tablet 768 / Mobile 390, Foundation `2501:91`). Every Figma variable has a WEB code syntax `var(--name)`: that is the CSS name to use. Keep every existing token name that the code uses; add, never rename, unless the Figma name differs from an existing CSS name for the same value, in which case keep the CSS name and note it in the report.

| Item | Source | What |
|---|---|---|
| S2 type defaults | `reports/audit-system.md` SY-07, SY-08, SY-13; `phase-2-audit.md` §2 S2 | `body` line-height, `text-wrap: balance` on headings and `pretty` on body copy, form controls inherit the font, `pre, code` in `var(--font-mono)` |
| S3 label tokens | SY-05, SY-06 | `--type-marker`, `--type-meta` (and their size/tracking/weight parts) as the Figma `Label/Marker` and `Label/Meta` styles define. Tokens only: moving call sites and dictionary strings to them is a later task |
| S4 scales | SY-09, SY-10; `odd/tasks/figma-design-system.md` L4 | Missing space steps (32 px), section padding token, the type ramp per breakpoint (display, h1–h4, body, small, caption, marker, meta; L4 lists the sizes) as custom properties that switch at the Breakpoint widths |
| S5 focus | `audit-system.md`, HO-06, WK-02 | Focus width and offset tokens; one `:focus-visible` default in `@layer base` using them; `--color-focus` resolves to green-300 on dark surfaces (Inside, and the dark surfaces Outside such as the footer and the experiment tiles: give those a scoped hook, e.g. `[data-surface="dark"]`, and list where it must be applied) |
| S8 Icon | SY-03 | Role-based sizes (the Foundation `icon/*` variables), `vector-effect: non-scaling-stroke` and the 1.5 px stroke of the DS icons. Keep the `size` prop working so no call site breaks; add the role prop beside it. Match the 15 icons of Section `2501:137`: add any the DS has and the code lacks |
| SY-14 motion | `audit-system.md` SY-14 | Duration and easing tokens from the Foundation `motion/*` variables. Tokens only |
| Logged tokens | `figma-design-system.md` L5, L8, L10, L20 | Every token added there (e.g. `color/current`, `color/glass`, `color/control-border`, `color/scrim`, `type/size/wordmark`, `layout/list-row`, `annotation/note` at 60 %, `color/highlight`, `color/highlight-text`, `color/essay-chip`, `color/essay-chip-text`) |

Where a token replaces a value a component hardcodes (for example the annotation note opacity), do not edit the component: list the call site, file:line and the token, under "Call sites to adopt" in your report. That list is the next task's input.

The root defaults (line-height, `text-wrap`) change rendering site-wide. That is intended, but every visible change must be one the Proposed boards show. Capture every page type before and after (Home Outside and Inside, Work index, one project page, the Inspiration Garden case study, Notes index, one post, `/links/`; 1440 / 768 / 390), compare, and list each visible change in the report with a verdict: matches the proposal, or regression (fix it).

## Allowed edit surfaces

src/styles/tokens.css
src/layouts/Base.astro
src/components/ui/Icon.astro

## Report

`openspec/changes/design-audit/reports/code-t2-foundations.md`
