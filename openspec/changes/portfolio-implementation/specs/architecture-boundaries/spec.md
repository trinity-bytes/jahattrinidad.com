# Delta for Architecture Boundaries

## ADDED Requirements

### Requirement: Client Islands Are Framework-Free and Data-Fed

Interactive behavior (the lens, the nav's scrolled state, the mobile menu, the Copy button, the contact chat) MUST run as `<script>` blocks inside the Astro component that owns the markup. No UI framework integration (React, Preact, Svelte, Solid, Vue) MAY be added. A client script MUST NOT import `astro:content` or anything from `src/lib/` that reaches it; the data it needs MUST arrive from the server as props serialized into the markup (attributes or a JSON `<script type="application/json">` block). The only network request a client script MAY make is the contact form submission.

#### Scenario: No framework integration

- GIVEN `package.json` and `astro.config.mjs`
- WHEN dependencies and integrations are inspected
- THEN no `@astrojs/react`, `@astrojs/preact`, `@astrojs/svelte`, `@astrojs/solid-js` or `@astrojs/vue` MUST be present

#### Scenario: Islands don't reach content

- GIVEN every client `<script>` block and every module it imports
- WHEN their imports are inspected
- THEN none MUST import `astro:content` or `src/lib/content.ts`

### Requirement: The Chat Engine Is a Pure Module

The contact chat's logic MUST live in one TypeScript module with no DOM, network or global access, exposing pure functions (`next`, `detect`). The chat script, its questions and copy MUST be passed in as arguments, so the module can run under `node --test` without Astro. Its tests MUST be part of `npm run check`.

#### Scenario: The engine runs without a browser

- GIVEN the chat engine module
- WHEN `node --test` runs its test file
- THEN the tests MUST execute without a DOM, a bundler or Astro

#### Scenario: The engine is checked on every build

- GIVEN `package.json`
- WHEN the `check` script is inspected
- THEN it MUST run the chat engine tests
