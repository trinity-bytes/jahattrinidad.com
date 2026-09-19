# Architecture Boundaries Specification

## Purpose

Define and mechanically enforce the one architectural rule this project relies on: `pages → sections → content → ui/lib`, never reversed. This includes the single-call-site invariant for `astro:content`, the `import type` exception that lets `content/` reference Astro's content types without importing runtime values, the container/presentational split between `sections/` and `pages/`, and the zero-dependency script that checks all of it on every `npm run check`.

## Requirements

### Requirement: Single Call Site for Content Access

`getCollection()` and `getEntry()` (from `astro:content`) MUST be called from exactly one file in the project: `src/lib/content.ts`. No other file MUST call either function.

#### Scenario: Only content.ts calls getCollection/getEntry

- GIVEN the full project source tree as shipped
- WHEN every file is searched for calls to `getCollection(` or `getEntry(`
- THEN exactly one file, `src/lib/content.ts`, MUST contain such calls

#### Scenario: A page calling getCollection directly fails the boundary check

- GIVEN a hypothetical file under `src/pages/` that calls `getCollection()` directly instead of going through `src/lib/content.ts`
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN it MUST exit non-zero and report the offending file and line

### Requirement: Directional Dependency Rule

Modules MUST depend only in the direction `pages → sections → content → ui/lib`. A module in a given layer MUST NOT import from a layer to its right in that chain being treated as "more central," i.e. `ui/` and `lib/` MUST NOT import from `content/`, `sections/`, or `pages/`; `content/` MUST NOT import from `sections/` or `pages/`; `sections/` MUST NOT import from `pages/`.

#### Scenario: A reversed-direction import fails the boundary check

- GIVEN a hypothetical file under `src/ui/` that imports a module from `src/content/`
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN it MUST exit non-zero and identify the reversed-direction import

#### Scenario: A correctly directed import passes

- GIVEN a file under `src/pages/` that imports a module from `src/sections/`
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN this import MUST NOT be reported as a violation

### Requirement: `ui/` MUST NOT Reference `astro:content`, Not Even as a Type

Files under `src/ui/` MUST NOT import anything from `astro:content`, including a type-only import. If a `ui/` component needs a content-derived type, it is misclassified and belongs under `src/content/` instead.

#### Scenario: A ui/ file with a type-only astro:content import fails the check

- GIVEN a hypothetical file under `src/ui/` containing `import type { CollectionEntry } from 'astro:content';`
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN it MUST exit non-zero, even though the import is type-only

### Requirement: `content/` MAY `import type`, MUST NOT Import Runtime Values

Files under `src/content/` MAY use `import type { CollectionEntry } from 'astro:content'` (or an equivalent type-only import) but MUST NOT import `getCollection`, `getEntry`, or any other runtime value from `astro:content`.

#### Scenario: A content/ file with a type-only import passes

- GIVEN a file under `src/content/` (outside `src/lib/content.ts`) containing only `import type { CollectionEntry } from 'astro:content';`
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN this file MUST NOT be reported as a violation

#### Scenario: A content/ file with a runtime import fails the check

- GIVEN a hypothetical file under `src/content/` (other than `src/lib/content.ts`) containing `import { getCollection } from 'astro:content';`
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN it MUST exit non-zero and identify the disallowed runtime import

### Requirement: `sections/` Receive Props and MUST NOT Fetch

Files under `src/sections/` MUST receive their data as component props from a `pages/` caller and MUST NOT call `getCollection()`, `getEntry()`, or any other data-fetching function themselves.

#### Scenario: A section calling getCollection directly fails the boundary check

- GIVEN a hypothetical file under `src/sections/` that calls `getCollection()` inside its own frontmatter
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN it MUST exit non-zero and identify the section as fetching data itself

#### Scenario: A section receiving props only passes

- GIVEN a file under `src/sections/` that declares typed `Props` and renders only from those props
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN this file MUST NOT be reported as a violation

### Requirement: Mechanized Enforcement via `scripts/check-boundaries.mjs`

The system MUST provide `scripts/check-boundaries.mjs`, a zero-runtime-dependency Node script, wired into `npm run check`, that statically checks every rule above and exits non-zero on any violation.

#### Scenario: The script passes clean on the shipped scaffold

- GIVEN the scaffold as shipped, with no boundary violations
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN it MUST exit with code 0

#### Scenario: The script fails on a deliberately introduced violation

- GIVEN a deliberately introduced violation (e.g. a `ui/` file importing `astro:content`)
- WHEN `node scripts/check-boundaries.mjs` is run
- THEN it MUST exit non-zero
- AND after the violation is reverted, the script MUST again exit with code 0

#### Scenario: The script has zero runtime dependencies

- GIVEN `scripts/check-boundaries.mjs` as shipped
- WHEN its imports are inspected
- THEN it MUST import only Node.js built-in modules, no `package.json` dependency
