# Delta for I18n Routing

## MODIFIED Requirements

### Requirement: Frozen English URL Guarantee

The system MUST set `i18n.routing.prefixDefaultLocale: false`, so that default-locale (English) routes are never prefixed with `/en/`, now or after Spanish content is added. English routes MUST use the segments `/work/` for projects and `/notes/` for posts (D22). The collection names `projects` and `posts` stay internal and MUST NOT appear as URL segments.
(Previously: the routes were `/projects/<slug>` and `/blog/<slug>`.)

#### Scenario: English routes are unprefixed in the build

- GIVEN the site as built
- WHEN `npx astro build` is run
- THEN the output MUST contain routes such as `/work/<slug>/` and `/notes/<slug>/`
- AND it MUST NOT contain any `/en/`-prefixed equivalent (e.g. `/en/work/<slug>/` MUST NOT exist)

#### Scenario: The old segments are gone

- GIVEN the site as built
- WHEN the output directory and every internal link in the generated HTML are inspected
- THEN no route MUST exist under `/projects/` or `/blog/`
- AND no internal link MUST point to `/projects/` or `/blog/`

#### Scenario: No Spanish routes are generated when no Spanish content exists

- GIVEN no entries with `lang: 'es'` exist in any collection and no `src/pages/es/` tree exists
- WHEN `npx astro build` is run
- THEN the build output MUST contain no `/es/` route of any kind

### Requirement: English-Only RSS Feed

The system MUST generate `/rss.xml` via `@astrojs/rss`, listing only non-draft `posts` entries with `lang: 'en'`, sourced exclusively through `src/lib/content.ts`, never by calling `getCollection()` directly from the RSS route. Item links MUST be built by the same path builder the pages use, so they point to `/notes/<slug>/`.
(Previously: item links used a hardcoded `/blog` base.)

#### Scenario: RSS feed is generated and valid

- GIVEN the site as built, with at least one non-draft English post
- WHEN `npx astro build` is run
- THEN `rss.xml` MUST be generated at the site root
- AND it MUST validate as well-formed RSS 2.0 XML

#### Scenario: Feed lists only non-draft English posts

- GIVEN a `posts` entry with `draft: true` and an English `posts` entry with `draft: false`
- WHEN `/rss.xml` is generated
- THEN the draft entry MUST NOT appear in the feed
- AND the non-draft English entry MUST appear in the feed

#### Scenario: Feed links match the page routes

- GIVEN a non-draft English post with id `<slug>`
- WHEN `/rss.xml` is generated
- THEN its item link MUST end in `/notes/<slug>/`
- AND `src/pages/rss.xml.ts` MUST NOT contain the string literal `/blog`

#### Scenario: RSS route never calls getCollection directly

- GIVEN `src/pages/rss.xml.ts`
- WHEN its imports and function calls are inspected
- THEN it MUST NOT call `getCollection()` or `getEntry()` directly
- AND it MUST obtain its post data through an exported function from `src/lib/content.ts`
