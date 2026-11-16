# Visual Identity Specification

> **Status: Draft.** This capability does not exist in `openspec/specs/` yet. It records only the visual decisions that are settled enough to be testable. It becomes binding when the owner approves the hi-fi (tasks 6.4 and 7.4). Until then no code implements it.

## Purpose

Define the brand palette and type families the site ships with, the rule that keeps sun yellow a signal color, the layer structure of the home hero, and the messaging split between the Outside and Inside states. Exact layout, motion and the Inside interaction are out of scope until the hi-fi is approved.

## Requirements

### Requirement: Brand Palette Replaces Scaffold Placeholders

`src/styles/tokens.css` MUST define the brand primitives: the green ramp (including `#EBFCEB`, `#B3F3B4`, `#88E88C`, `#236C2A`, `#143A17`, `#0A200B`), sun `#F6D653` and sun-soft `#FBEBA0`. The scaffold's blue accent primitives MUST NOT remain in the shipped stylesheet. Components MUST continue to consume semantic aliases only.

#### Scenario: Placeholder accent is gone

- GIVEN the site as built after this capability is implemented
- WHEN `src/styles/tokens.css` is inspected
- THEN it MUST NOT define the scaffold values `#3670f5` or any other `--accent-*` blue primitive
- AND it MUST define `#0A200B`, `#88E88C` and `#F6D653` as primitives

#### Scenario: `color-scheme` survives the palette change

- GIVEN `src/styles/tokens.css` after the palette is replaced
- WHEN `:root` is inspected
- THEN `color-scheme: light dark;` MUST still be declared, unless a later recorded decision removes `light-dark()` from the token system

### Requirement: Self-Hosted Brand Type Families

The site MUST use Epilogue for display and headings, Hanken Grotesk for body and UI text, and IBM Plex Mono for labels, metadata and code. Fonts MUST be loaded through Astro's native Fonts API. `@fontsource/*` packages and Google Fonts CDN links MUST NOT be used.

#### Scenario: No third-party font host in the build output

- GIVEN the site as built
- WHEN the generated HTML and CSS are searched
- THEN they MUST NOT reference `fonts.googleapis.com` or `fonts.gstatic.com`
- AND `package.json` MUST NOT list any `@fontsource/*` dependency

### Requirement: Sun Yellow Is a Signal Color

Sun `#F6D653` MUST be used only for small signals: status dots, annotation pins and leader lines, highlights and short labels. It MUST NOT be the background of a button or the color of body text, and it MUST NOT be darkened to gain contrast.

#### Scenario: No yellow button

- GIVEN any page of the site
- WHEN its buttons and links styled as buttons are inspected
- THEN none MUST use sun `#F6D653` as its background color

### Requirement: Home Hero Is Built From Separate Layers

The home hero MUST render the sky, the display name, the near hill and the portrait as four separate elements, painted in that order from back to front. The layers MUST NOT be flattened into one image, so depth effects remain possible.

#### Scenario: Layer order

- GIVEN the home page as built
- WHEN the hero's paint order is inspected
- THEN the sky MUST be behind the display name
- AND the display name MUST be behind the near hill
- AND the portrait MUST be in front of the near hill

#### Scenario: Images are not mirrored

- GIVEN the hero as built
- WHEN the sky, hill and portrait elements are inspected
- THEN none MUST be horizontally flipped, by CSS transform or by a pre-flipped file

### Requirement: Outside and Inside Messaging

Text shown in the Outside state MUST describe outcomes in plain language. Text shown in the Inside state MUST describe how the thing is built. Neither state MAY state a metric that cannot be verified. All of it MUST be read through the `Dictionary` in `src/lib/i18n.ts` or come from content entries; no UI string may be hardcoded in a component.

#### Scenario: No hardcoded state copy

- GIVEN the components that render Outside and Inside copy
- WHEN their source is inspected
- THEN user-visible strings MUST come from `getDictionary(lang)` or from a content entry
- AND no user-visible string literal MUST appear in the component markup
