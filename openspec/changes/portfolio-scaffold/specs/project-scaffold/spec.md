# Project Scaffold Specification

## Purpose

Define the Astro 7 project skeleton for jahattrinidad.com: build configuration, TypeScript strictness, the allowed-dependency policy, the mechanized `npm run check` verification gate, base design tokens, and the project's root-level operating instructions (`CLAUDE.md`). This capability establishes the ground every other capability builds on; it does not define content, routing, or component boundaries.

## Requirements

### Requirement: Astro Static Project Skeleton

The system MUST provide a static-output Astro 7 project with no server adapter, rooted at `site: 'https://jahattrinidad.com'`.

#### Scenario: Clean production build

- GIVEN the scaffold as shipped by this change
- WHEN `npx astro build` is run
- THEN the build MUST complete with exit code 0
- AND the build output MUST contain zero warnings originating from project-authored code (third-party/dependency warnings are out of scope)

#### Scenario: No server adapter configured

- GIVEN `astro.config.mjs` as shipped
- WHEN its `output` and `adapter` settings are inspected
- THEN no adapter MUST be configured
- AND the build output MUST be static files only, with no server entry point

### Requirement: Route Inventory

The system MUST build and render all six routes of the scaffold skeleton: `/` (home), `/projects` (list), `/projects/[...slug]` (detail), `/blog` (list), `/blog/[...slug]` (detail), and `/links` (rendered from `links.json`). Markup MUST be minimal and unstyled; this requirement covers existence and correct data binding, not presentation.

#### Scenario: Every route is present in the build output

- GIVEN the scaffold as shipped, with two seed entries in each collection
- WHEN `npx astro build` is run
- THEN the output MUST contain `index.html` for `/`, `/projects`, `/blog`, and `/links`
- AND the output MUST contain one detail page per non-draft `projects` entry under `/projects/<slug>/`
- AND the output MUST contain one detail page per non-draft `posts` entry under `/blog/<slug>/`

#### Scenario: List routes reflect their collections

- GIVEN two non-draft seed entries in `projects` and two in `posts`
- WHEN `/projects` and `/blog` are rendered
- THEN `/projects` MUST list both `projects` entries
- AND `/blog` MUST list both `posts` entries
- AND each listed item MUST link to its own detail route

#### Scenario: The links page is driven by the JSON file

- GIVEN `src/content/links.json` with two entries, one of them `enabled: false`
- WHEN `/links` is rendered
- THEN only the `enabled` entry MUST appear
- AND the entries MUST be ordered by their `order` field, not by array position

#### Scenario: Routes obtain data only through the content seam

- GIVEN every file under `src/pages/`
- WHEN their import statements are inspected
- THEN none MUST import `getCollection` or `getEntry` from `astro:content`
- AND every content read MUST go through `src/lib/content.ts`

### Requirement: TypeScript Strict Mode

The system MUST enable TypeScript `strict` mode across the project via `tsconfig.json`.

#### Scenario: Strict diagnostics pass clean

- GIVEN the scaffold as shipped
- WHEN `npx astro check` is run
- THEN it MUST report zero errors

#### Scenario: Strict mode is not weakened

- GIVEN `tsconfig.json` as shipped
- WHEN its compiler options are inspected
- THEN `strict` MUST be `true`
- AND no individual strict sub-flag (e.g. `noImplicitAny`, `strictNullChecks`) MUST be explicitly disabled

### Requirement: Allowed-Dependency Policy

The system's `package.json` dependencies MUST be exactly `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, and `@astrojs/rss` — no other runtime dependency is permitted without explicit user approval per `openspec/config.yaml`.

#### Scenario: Dependency list matches exactly

- GIVEN `package.json` as shipped
- WHEN its `dependencies` field is inspected
- THEN it MUST contain exactly `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, and `@astrojs/rss`
- AND no other package MUST appear under `dependencies`

#### Scenario: Forbidden packages are absent

- GIVEN `package.json` as shipped
- WHEN its dependencies are inspected
- THEN standalone `zod`, `tailwindcss`, `@fontsource/*`, `prismjs`, `@astrojs/markdown-remark`, and any `@astrojs/*-adapter` package MUST be absent
- AND Zod usage in project code MUST import from `astro/zod`, never from a standalone `zod` package

### Requirement: `npm run check` Verification Gate

The system MUST provide an `npm run check` script that runs, in sequence, `astro check`, `astro build`, and `node scripts/check-boundaries.mjs`, and that fails if any of the three fails.

#### Scenario: All three gates run in order

- GIVEN the scaffold as shipped
- WHEN `npm run check` is run
- THEN `astro check`, then `astro build`, then `node scripts/check-boundaries.mjs` MUST each execute
- AND the overall script MUST exit non-zero if any individual command exits non-zero

#### Scenario: Gate passes clean on the shipped scaffold

- GIVEN the scaffold as shipped, with no boundary violations introduced
- WHEN `npm run check` is run
- THEN it MUST complete with exit code 0

### Requirement: Base Design Tokens Only

The system MUST ship exactly one stylesheet of design-token custom properties, `src/styles/tokens.css`, containing only CSS custom properties for color, spacing, and type scale. It MUST NOT contain component styles, layout rules, or a theme system.

#### Scenario: No CSS beyond tokens

- GIVEN the scaffold as shipped
- WHEN all CSS content in the project (excluding `.astro` component-scoped `<style>` blocks, which do not exist yet in this phase) is inspected
- THEN the only stylesheet MUST be `src/styles/tokens.css`
- AND its contents MUST consist solely of `:root`-scoped custom property declarations (color, spacing, type scale)

### Requirement: Empty Fonts API Placeholder

The system MUST declare Astro's native Fonts API integration point with an empty configuration, deferring provider selection to a future visual-design decision.

#### Scenario: Fonts array is present and empty

- GIVEN `astro.config.mjs` as shipped
- WHEN its top-level `fonts` key is inspected
- THEN it MUST be present and MUST be an empty array (`fonts: []`)
- AND no `@fontsource/*` package and no Google Fonts CDN reference MUST exist anywhere in the project

### Requirement: Root `CLAUDE.md` Project Instructions

The system MUST include a `CLAUDE.md` file at the repository root documenting the dependency rule and its single-call-site invariant, the allowed/forbidden library list, and the decision not to use DDD/repository patterns in this project.

#### Scenario: CLAUDE.md exists and covers the required topics

- GIVEN the repository root
- WHEN `CLAUDE.md` is read
- THEN the file MUST exist
- AND it MUST state that `getCollection()` / `getEntry()` are called from exactly one file, `src/lib/content.ts`
- AND it MUST list the forbidden libraries (standalone `zod`, Tailwind, `@fontsource`, Google Fonts CDN, Prism, `@astrojs/markdown-remark`, any adapter)
- AND it MUST state the no-DDD / no-repository-pattern decision and its rationale
