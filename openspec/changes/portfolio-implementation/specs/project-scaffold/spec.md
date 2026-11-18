# Delta for Project Scaffold

## RENAMED Requirements

- FROM: `### Requirement: Empty Fonts API Placeholder`
- TO: `### Requirement: Self-Hosted Brand Fonts`

## MODIFIED Requirements

### Requirement: Route Inventory

The system MUST build and render these routes: `/` (home), `/work/` (project index), `/work/[...slug]/` (project detail or case study), `/notes/` (post index), `/notes/[...slug]/` (post), and `/links/` (link-in-bio page rendered from `links.json`). Pages MUST obtain their data only through `src/lib/content.ts`, and every internal link MUST be built by its path builder or by `localizedPath`, never as a hardcoded string.
(Previously: `/projects` and `/blog` routes, unstyled markup.)

#### Scenario: Every route is present in the build output

- GIVEN the site with its content entries
- WHEN `npx astro build` is run
- THEN the output MUST contain `index.html` for `/`, `/work/`, `/notes/` and `/links/`
- AND one detail page per non-draft `projects` entry under `/work/<slug>/`
- AND one detail page per non-draft `posts` entry under `/notes/<slug>/`

#### Scenario: The links page is driven by the JSON file

- GIVEN `src/content/links.json` with an entry set to `enabled: false`
- WHEN `/links/` is rendered
- THEN that entry MUST NOT appear
- AND the entries MUST be ordered by their `order` field, not by array position

#### Scenario: No hardcoded route segments in pages

- GIVEN every file under `src/pages/` and `src/components/`
- WHEN they are searched for the string literals `/work/` and `/notes/`
- THEN no match MUST be found outside `src/lib/consts.ts`

#### Scenario: Routes obtain data only through the content seam

- GIVEN every file under `src/pages/`
- WHEN their import statements are inspected
- THEN none MUST import `getCollection` or `getEntry` from `astro:content`

### Requirement: Base Design Tokens Only

The system MUST keep every design token in `src/styles/tokens.css`: brand primitives, semantic aliases built with `light-dark()`, spacing and type scale. The file MUST set `color-scheme: light` on `:root` and `color-scheme: dark` on `:root[data-lens="inside"]`, so the lens state, not the operating system preference, decides which value of every `light-dark()` token applies. Component styles live in component-scoped `<style>` blocks and MUST consume semantic aliases only, never primitives.
(Previously: tokens only, no theme system, `color-scheme: light dark` on `:root`.)

#### Scenario: The lens drives the color scheme

- GIVEN `src/styles/tokens.css`
- WHEN `:root` and `:root[data-lens="inside"]` are inspected
- THEN `:root` MUST declare `color-scheme: light`
- AND `:root[data-lens="inside"]` MUST declare `color-scheme: dark`
- AND no rule in the project MUST read `prefers-color-scheme`

#### Scenario: Components use aliases only

- GIVEN every component-scoped `<style>` block under `src/components/` and `src/layouts/`
- WHEN its color values are inspected
- THEN it MUST reference semantic alias custom properties
- AND it MUST NOT contain a hex color literal or reference a primitive custom property

### Requirement: Self-Hosted Brand Fonts

The system MUST register Epilogue, Hanken Grotesk and IBM Plex Mono with Astro's native Fonts API using `fontProviders.local()`, from `.woff2` files committed under `src/assets/fonts/`. No `@fontsource/*` package and no third-party font host MAY be used.
(Previously: "Empty Fonts API Placeholder", `fonts: []`.)

#### Scenario: Fonts are local

- GIVEN `astro.config.mjs`
- WHEN its `fonts` key is inspected
- THEN it MUST declare the three families with the local provider
- AND every `src` MUST point inside `src/assets/fonts/`

#### Scenario: No third-party font host in the build output

- GIVEN the site as built
- WHEN the generated HTML and CSS are searched
- THEN they MUST NOT reference `fonts.googleapis.com`, `fonts.gstatic.com` or any other external font URL
- AND `package.json` MUST NOT list any `@fontsource/*` dependency

### Requirement: Root `CLAUDE.md` Project Instructions

The system MUST include a `CLAUDE.md` file at the repository root documenting the dependency rule and its single-call-site invariant, the allowed/forbidden library list, the decision not to use DDD/repository patterns, that code fences are highlighted by Shiki with the custom brand theme, and that the lens (`data-lens`) drives `color-scheme`.
(Previously: CLAUDE.md said code fences render unhighlighted and required `color-scheme: light dark` on `:root`.)

#### Scenario: CLAUDE.md matches the shipped behavior

- GIVEN the repository root
- WHEN `CLAUDE.md` is read
- THEN it MUST state that `getCollection()` / `getEntry()` are called only from `src/lib/content.ts`
- AND it MUST list the forbidden libraries
- AND it MUST state the no-DDD / no-repository-pattern decision
- AND it MUST NOT claim that code fences render unhighlighted
- AND it MUST describe `color-scheme` as driven by `data-lens`, not by the operating system

## ADDED Requirements

### Requirement: Custom Shiki Theme

Markdown and MDX code fences MUST be highlighted by Astro's bundled Shiki with one custom theme, a JSON file in the repository passed to `markdown.shikiConfig.theme`. The theme MUST use the roles and colors of the approved code theme (visual-design `design.md`, "Code theme"), with background `#0A200B`. Prism or any other highlighter MUST NOT be used.

#### Scenario: Code blocks use the brand theme

- GIVEN a post containing a fenced code block
- WHEN the site is built
- THEN the rendered block MUST have background `#0A200B`
- AND keywords MUST render in `#F6D653` and comments in `#7FA882`

#### Scenario: Every role meets AA

- GIVEN the theme file
- WHEN each foreground color is measured against `#0A200B`
- THEN every contrast ratio MUST be at least 4.5:1
