# I18n Routing Specification

## Purpose

Define the locale configuration, the guarantee that English URLs stay unprefixed and permanent, the explicit prohibition of Astro's `fallback` rewrite behavior, how `translationKey` pairs a translation with its counterpart, when `hreflang` alternates are emitted, how the sitemap's i18n option behaves before any Spanish content exists, and the English-only RSS feed. Spanish content itself is out of scope for this change; this capability only guarantees the structure is safe to extend later without moving a single English URL.

## Requirements

### Requirement: Locale Configuration

The system MUST configure `i18n.locales: ['en', 'es']` and `i18n.defaultLocale: 'en'` in `astro.config.mjs`, even though no Spanish content or `src/pages/es/` tree exists in this change.

#### Scenario: Locale configuration is present

- GIVEN `astro.config.mjs` as shipped
- WHEN its `i18n` configuration is inspected
- THEN `locales` MUST include `'en'` and `'es'`
- AND `defaultLocale` MUST be `'en'`

### Requirement: Frozen English URL Guarantee

The system MUST set `i18n.routing.prefixDefaultLocale: false`, so that default-locale (English) routes are never prefixed with `/en/`, now or after Spanish content is added.

#### Scenario: English routes are unprefixed in the build

- GIVEN the scaffold as shipped
- WHEN `npx astro build` is run
- THEN the output MUST contain routes such as `/projects/<slug>` and `/blog/<slug>`
- AND it MUST NOT contain any `/en/`-prefixed equivalent (e.g. `/en/projects/<slug>` MUST NOT exist)

#### Scenario: No Spanish routes are generated when no Spanish content exists

- GIVEN no entries with `lang: 'es'` exist in any collection and no `src/pages/es/` tree exists
- WHEN `npx astro build` is run
- THEN the build output MUST contain no `/es/` route of any kind

### Requirement: `fallback` MUST NOT Be Configured

`astro.config.mjs`'s `i18n.routing` MUST NOT set a `fallback` key. With `fallbackType: 'rewrite'`, Astro serves default-locale content under the missing locale's URLs with HTTP 200, which is duplicate content; a missing locale route MUST 404 instead.

#### Scenario: No fallback key exists in the shipped config

- GIVEN `astro.config.mjs` as shipped
- WHEN its `i18n.routing` object is inspected
- THEN it MUST NOT contain a `fallback` key
- AND it MUST NOT set `fallbackType`

#### Scenario: A missing locale route is a real 404, not a served default-locale page

- GIVEN no `/es/` content exists
- WHEN a request is made for an `/es/` URL after the build
- THEN the response MUST be a 404
- AND it MUST NOT silently serve the English page's content under that URL

### Requirement: `translationKey` Pairing

`projects` and `posts` entries MAY set an optional `translationKey` string field. Two entries within the same collection that share the same `translationKey` value are considered translations of one another for the purpose of `hreflang` resolution.

#### Scenario: Two entries sharing a translationKey are recognized as a pair

- GIVEN two entries in the same collection with `translationKey: 'about-me'` and different `lang` values
- WHEN a consumer resolves the translation counterpart of one entry via `src/lib/content.ts`
- THEN the other entry MUST be returned as its counterpart

#### Scenario: An entry with no matching translationKey has no counterpart

- GIVEN an entry with a `translationKey` value that no other entry in its collection shares (or with `translationKey` unset)
- WHEN a consumer resolves its translation counterpart
- THEN no counterpart MUST be returned

### Requirement: `hreflang` Emission Rule

`hreflang` alternates MUST be emitted only for a page whose counterpart entry (resolved via `translationKey`) actually exists and was actually built. A page with no counterpart MUST emit no `hreflang` alternate at all.

#### Scenario: No counterpart exists, so no alternate is emitted

- GIVEN an English entry with no matching-`translationKey` Spanish counterpart (the state of every seed entry in this change, since no Spanish content exists yet)
- WHEN that entry's page is built
- THEN it MUST emit zero `hreflang` alternates

#### Scenario: A counterpart exists, so an alternate is emitted

- GIVEN two entries sharing a `translationKey`, both built
- WHEN either entry's page is built
- THEN it MUST emit an `hreflang` alternate pointing at the other entry's URL

### Requirement: Sitemap I18n Behavior

The system MUST enable `@astrojs/sitemap`'s `i18n` option in `astro.config.mjs`. Because `createGetI18nLinks()` in `@astrojs/sitemap@3.7.4` (`dist/generate-sitemap.js`) derives alternates from actually-built URLs rather than configured locales, and returns no alternate block when fewer than two URLs exist for a page (`if (links.length <= 1) return void 0;`), enabling it now MUST be a safe no-op until Spanish pages exist.

#### Scenario: No xhtml:link alternates exist while no Spanish content exists

- GIVEN the scaffold as shipped, with zero entries carrying `lang: 'es'`
- WHEN `npx astro build` is run and `sitemap-index.xml` (and any per-page sitemap XML) is inspected
- THEN it MUST contain zero `xhtml:link` alternate elements

#### Scenario: Sitemap still generates successfully with i18n enabled

- GIVEN the scaffold as shipped
- WHEN `npx astro build` is run
- THEN `sitemap-index.xml` MUST be generated without error

### Requirement: English-Only RSS Feed

The system MUST generate `/rss.xml` via `@astrojs/rss`, listing only non-draft `posts` entries with `lang: 'en'`, sourced exclusively through `src/lib/content.ts` — never by calling `getCollection()` directly from the RSS route.

#### Scenario: RSS feed is generated and valid

- GIVEN the scaffold as shipped, with its two seed `posts` entries
- WHEN `npx astro build` is run
- THEN `rss.xml` MUST be generated at the site root
- AND it MUST validate as well-formed RSS 2.0 XML

#### Scenario: Feed lists only non-draft English posts

- GIVEN a `posts` entry with `draft: true` and an English `posts` entry with `draft: false`
- WHEN `/rss.xml` is generated
- THEN the draft entry MUST NOT appear in the feed
- AND the non-draft English entry MUST appear in the feed

#### Scenario: RSS route never calls getCollection directly

- GIVEN `src/pages/rss.xml.ts` as shipped
- WHEN its imports and function calls are inspected
- THEN it MUST NOT call `getCollection()` or `getEntry()` directly
- AND it MUST obtain its post data through an exported function from `src/lib/content.ts`
