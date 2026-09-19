# Content Model Specification

## Purpose

Define the three content collections (`projects`, `posts`, `links`), their schemas and loaders, the frontmatter/body split rule, the `decisions[].rejected` forcing function that structurally requires every recorded project decision to name its rejected alternative, the derived-field policy (compute, never author), and the minimum seed-content requirement that proves every schema field round-trips through a real build.

## Requirements

### Requirement: Three Typed Content Collections

The system MUST define exactly three content collections in `src/content.config.ts` — `projects`, `posts`, `links` — using `defineCollection` from `astro:content`, `glob()`/`file()` loaders from `astro/loaders`, and schemas built with `z` from `astro/zod`.

#### Scenario: Collections load without error

- GIVEN `src/content.config.ts` as shipped
- WHEN `npx astro build` or `npx astro check` is run
- THEN the `projects`, `posts`, and `links` collections MUST each load without a loader or schema error

#### Scenario: Projects and posts use the glob loader, links uses the file loader

- GIVEN `src/content.config.ts` as shipped
- WHEN the loader configuration of each collection is inspected
- THEN `projects` MUST use `glob()` over `src/content/projects/**/*.mdx`
- AND `posts` MUST use `glob()` over `src/content/posts/**/*.mdx`
- AND `links` MUST use `file()` over `src/content/links.json`, with each entry carrying a unique `id`

### Requirement: Projects Collection Schema

The `projects` collection schema MUST define: `title` (string, required), `description` (string, required), `lang` (`'en' | 'es'`, required), `translationKey` (string, optional), `publishDate` (date, required), `updatedDate` (date, optional), `draft` (boolean, default `false`), `featured` (boolean, default `false`), `coverImage` (image, optional, via the `image()` schema helper), `coverImageAlt` (string, optional), `tags` (string array, default `[]`), `stack` (string array, required), `outcome` (string, optional), `repoUrl` (URL string, optional), `demoUrl` (URL string, optional), `role` (string, optional), `timeframe` (string, optional), `constraints` (string array, default `[]` — a case study has several constraints, and a single string would force comma-cramming and defeat rendering them as discrete items), and `decisions` (array, default `[]`, see the rejected-alternative forcing-function requirement below).

#### Scenario: A minimal valid entry builds

- GIVEN a `projects` entry that sets only the required fields (`title`, `description`, `lang`, `publishDate`, `stack`)
- WHEN the site is built
- THEN the entry MUST validate successfully
- AND `draft` MUST default to `false`, `featured` MUST default to `false`, `tags` MUST default to `[]`, and `decisions` MUST default to `[]`

#### Scenario: An entry with an unresolvable cover image fails at build time

- GIVEN a `projects` entry whose `coverImage` path does not resolve to an existing file
- WHEN the site is built
- THEN the build MUST fail with a Zod-level image-resolution error, not a runtime 404

### Requirement: Posts Collection Schema

The `posts` collection schema MUST define: `title` (string, required), `description` (string, required), `lang` (`'en' | 'es'`, required), `translationKey` (string, optional), `publishDate` (date, required), `updatedDate` (date, optional), `draft` (boolean, default `false`), `tags` (string array, default `[]`), and `canonicalUrl` (URL string, optional). It MUST NOT define a `readingTime` field.

#### Scenario: A minimal valid entry builds

- GIVEN a `posts` entry that sets only the required fields (`title`, `description`, `lang`, `publishDate`)
- WHEN the site is built
- THEN the entry MUST validate successfully

#### Scenario: Reading time is never authored in frontmatter

- GIVEN the `posts` schema as shipped
- WHEN its field list is inspected
- THEN no field named `readingTime` (or an equivalent authored duration/word-count field) MUST be present

### Requirement: Links Collection Schema

The `links` collection schema MUST define: `id` (string, required, the `file()` loader entry key), `label` (string, required), `url` (URL string, required), `icon` (string, required), `order` (number, required), and `enabled` (boolean, default `true`).

#### Scenario: A disabled link still loads but is marked inactive

- GIVEN a `links.json` entry with `enabled: false`
- WHEN the site is built
- THEN the entry MUST still load and validate successfully
- AND its `enabled` field MUST read as `false` to any consumer

### Requirement: Frontmatter/Body Split

Frontmatter MUST carry only fields needed to filter, sort, or render a card/list view without rendering the full entry body. Multi-paragraph narrative content MUST live in the MDX body, not in a frontmatter field.

#### Scenario: No narrative field exists in frontmatter

- GIVEN the `projects` and `posts` schemas as shipped
- WHEN their field list is inspected
- THEN no field MUST be designed to hold multi-paragraph prose (fields such as `description` and `outcome` are single-sentence teasers only)

#### Scenario: Project narrative sections live in the MDX body

- GIVEN a `projects` entry's MDX body
- WHEN it is inspected
- THEN it SHOULD structure its narrative under the documented convention headings (`## Problem`, `## Constraints`, `## Decisions`, `## Outcome`), since this convention is documented, not Zod-enforced

### Requirement: Rejected-Alternative Forcing Function on `decisions[]`

Each item in a `projects` entry's `decisions` array MUST require `choice` (string), `rejected` (string), and `because` (string). The build MUST fail if any decision item omits `rejected`. The `decisions` field itself MUST default to an empty array, so an entry with no decisions still builds — the enforced rule is "no decision without its rejected alternative," not "every project must record a decision."

#### Scenario: A decision item missing `rejected` fails the build

- GIVEN a `projects` entry whose `decisions` array contains an item with `choice` and `because` but no `rejected`
- WHEN the site is built
- THEN the build MUST fail with a Zod schema validation error attributable to the missing `rejected` field

#### Scenario: A fully specified decision item builds successfully

- GIVEN a `projects` entry whose `decisions` array contains an item with `choice`, `rejected`, and `because` all present
- WHEN the site is built
- THEN the entry MUST validate successfully

#### Scenario: An entry with zero decisions still builds

- GIVEN a `projects` entry that omits the `decisions` field entirely
- WHEN the site is built
- THEN `decisions` MUST default to `[]`
- AND the entry MUST validate successfully — the forcing function applies only to decisions that are recorded, not to whether any are recorded

### Requirement: Derived Fields Are Computed, Never Authored

Any field whose value can be mechanically derived from other content (e.g. reading time from body word count) MUST be computed at read time in `src/lib/content.ts` and MUST NOT be an authorable frontmatter field.

#### Scenario: Reading time is computed, not read from frontmatter

- GIVEN a `posts` entry with no `readingTime` field in its frontmatter
- WHEN a consumer requests that post through `src/lib/content.ts`
- THEN the returned data MUST include a computed reading-time value derived from the body's word count
- AND that value MUST NOT be sourced from any frontmatter field

### Requirement: Two Seed Entries Per Collection Covering Every Field

Each of the three collections MUST ship with exactly two seed entries. Within each collection, the two entries together MUST exercise every schema field, including every optional field, `translationKey`, and (for `projects`) `decisions[]`.

#### Scenario: Projects seed entries cover every field between them

- GIVEN the two shipped `projects` seed entries
- WHEN their combined field coverage is inspected
- THEN every field in the `projects` schema (including `translationKey`, `coverImage`, `coverImageAlt`, `outcome`, `repoUrl`, `demoUrl`, `role`, `timeframe`, `constraints`, and at least one fully specified `decisions[]` item) MUST be set by at least one of the two entries

#### Scenario: Posts seed entries cover every field between them

- GIVEN the two shipped `posts` seed entries
- WHEN their combined field coverage is inspected
- THEN every field in the `posts` schema (including `translationKey`, `updatedDate`, and `canonicalUrl`) MUST be set by at least one of the two entries

#### Scenario: Links seed entries cover every field between them

- GIVEN the two shipped `links` entries
- WHEN their combined field coverage is inspected
- THEN every field in the `links` schema MUST be set by at least one of the two entries
- AND at least one entry MUST set `enabled: false` to exercise the retirement path
