# Delta for Content Model

## RENAMED Requirements

- FROM: `### Requirement: Three Typed Content Collections`
- TO: `### Requirement: Typed Content Collections`

- FROM: `### Requirement: Two Seed Entries Per Collection Covering Every Field`
- TO: `### Requirement: Real Entries and a Coverage Fixture`

## MODIFIED Requirements

### Requirement: Typed Content Collections

The system MUST define exactly four content collections in `src/content.config.ts`: `projects`, `posts`, `links` and `experience`, using `defineCollection` from `astro:content`, `glob()`/`file()` loaders from `astro/loaders`, and schemas built with `z` from `astro/zod`.
(Previously: "Three Typed Content Collections", without `experience`.)

#### Scenario: Collections load without error

- GIVEN `src/content.config.ts`
- WHEN `npx astro build` or `npx astro check` is run
- THEN the four collections MUST each load without a loader or schema error

#### Scenario: Loaders

- GIVEN `src/content.config.ts`
- WHEN the loader configuration of each collection is inspected
- THEN `projects` MUST use `glob()` over `src/content/projects/**/*.mdx`
- AND `posts` MUST use `glob()` over `src/content/posts/**/*.mdx`
- AND `links` MUST use `file()` over `src/content/links.json`
- AND `experience` MUST use `file()` over `src/content/experience.json`, each entry carrying a unique `id`

### Requirement: Projects Collection Schema

The `projects` collection schema MUST define every field it defined before, plus: `tier` (`'case-study' | 'project' | 'experiment'`, required), `team` (object, optional: `size` positive integer, `solo` boolean), and `myPart` (string, optional, the short "My part" line shown on cards). `role` and `timeframe` MUST be optional, as originally specified. Whether a project appears in the Featured group (`featured`) MUST stay independent of whether it has a case study (`tier`): the owner decided case studies are not limited to featured projects.
(Previously: no `tier`, `team` or `myPart`; the code had drifted to make `role` and `timeframe` required.)

#### Scenario: A minimal valid entry builds

- GIVEN a `projects` entry that sets only `title`, `description`, `lang`, `publishDate`, `stack` and `tier`
- WHEN the site is built
- THEN the entry MUST validate successfully

#### Scenario: Featured and case study are independent

- GIVEN a `projects` entry with `featured: false` and `tier: 'case-study'`
- WHEN the site is built
- THEN the entry MUST validate
- AND its detail page MUST render with the case study template

#### Scenario: An unknown tier fails the build

- GIVEN a `projects` entry with `tier: 'featured'`
- WHEN the site is built
- THEN the build MUST fail with a schema error naming the `tier` field

### Requirement: Posts Collection Schema

The `posts` collection schema MUST define every field it defined before, plus `type` (`'essay' | 'tutorial'`, required). It MUST NOT define a `readingTime` field.
(Previously: no `type`.)

#### Scenario: A post without a type fails the build

- GIVEN a `posts` entry with no `type`
- WHEN the site is built
- THEN the build MUST fail with a schema error naming the `type` field

#### Scenario: Reading time is never authored in frontmatter

- GIVEN the `posts` schema
- WHEN its field list is inspected
- THEN no field named `readingTime` (or an equivalent authored duration or word-count field) MUST be present

### Requirement: Real Entries and a Coverage Fixture

The shipped collections MUST contain only real content: the scaffold samples (`realtime-chat-app`, `task-tracker-cli`, `hello-world`) MUST be removed. Schema coverage that the samples used to provide MUST move to a fixture that is excluded from the build output: every optional field of every collection MUST be set by at least one real entry or by the fixture.
(Previously: "Two Seed Entries Per Collection Covering Every Field", with sample entries shipped on the site.)

#### Scenario: No sample entry ships

- GIVEN the site as built
- WHEN the output directory is searched
- THEN no page MUST exist for `realtime-chat-app`, `task-tracker-cli` or `hello-world`

#### Scenario: Every field is still exercised

- GIVEN the real entries and the fixture together
- WHEN their combined field coverage is inspected
- THEN every field of every collection schema MUST be set at least once

## ADDED Requirements

### Requirement: Experience Collection Schema

The `experience` collection schema MUST define: `id` (string, required), `lang` (`'en' | 'es'`, required), `role` (string, required), `organisation` (string, required), `start` (string, required, year or year-month), `end` (string, optional; absent means "now"), `carriesOver` (string, required, the "what carries over to your team" line), `tools` (string array, default `[]`, the Inside tags) and `order` (integer, required). It MUST be read through `listExperience(lang)` in `src/lib/content.ts`.

#### Scenario: Experience is ordered by its field

- GIVEN two `experience` entries whose array order differs from their `order` values
- WHEN `listExperience('en')` is called
- THEN the entries MUST be returned sorted by `order`

#### Scenario: Experience requires a language

- GIVEN `listExperience` in `src/lib/content.ts`
- WHEN its signature is inspected
- THEN `lang` MUST be a required parameter with no default value
