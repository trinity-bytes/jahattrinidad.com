# Visual Identity Specification

> New capability. It promotes the Draft in `openspec/changes/portfolio-visual-design/specs/visual-identity/spec.md` to binding, with the decisions taken on 2026-11-17 (lens drives the color scheme, code theme, motion tuned in code). Values live in visual-design `design.md`.

## Purpose

Define the brand palette and type families the site ships with, the rule that keeps sun yellow a signal color, the layer structure of the home hero, the Outside/Inside states and the lens that switches them, and the accessibility rules every visual layer must keep.

## Requirements

### Requirement: Brand Palette Replaces Scaffold Placeholders

`src/styles/tokens.css` MUST define the brand primitives: the green ramp (including `#EBFCEB`, `#B3F3B4`, `#88E88C`, `#236C2A`, `#143A17`, `#0A200B`), sun `#F6D653`, sun-soft `#FBEBA0`, and the warm Outside neutrals (cream `#FAF6E8`, sand `#F3EDD6`, card `#FFFDF7`, hairline `#D8D2B6`, ground `#010903`). The scaffold's blue primitives MUST NOT remain.

#### Scenario: Placeholder accent is gone

- GIVEN `src/styles/tokens.css`
- WHEN it is inspected
- THEN it MUST NOT define `#3670f5` or any `--accent-*` blue primitive
- AND it MUST define `#0A200B`, `#88E88C`, `#F6D653` and `#FAF6E8` as primitives

### Requirement: Self-Hosted Brand Type Families

The site MUST use Epilogue for display and headings, Hanken Grotesk for body and UI text, and IBM Plex Mono for labels, metadata and code, loaded as specified in the project-scaffold requirement "Self-Hosted Brand Fonts".

#### Scenario: Families are applied by role

- GIVEN the home page as built
- WHEN the computed font family of the hero name, a body paragraph and a section label is inspected
- THEN they MUST resolve to Epilogue, Hanken Grotesk and IBM Plex Mono respectively

### Requirement: Sun Yellow Is a Signal Color

Sun `#F6D653` MUST be used only for small signals: status dots, annotation pins and leader lines, highlights, short labels and code keywords. It MUST NOT be the background of a button or the color of body text, and it MUST NOT be darkened to gain contrast.

#### Scenario: No yellow button

- GIVEN any page of the site
- WHEN its buttons and links styled as buttons are inspected
- THEN none MUST use sun `#F6D653` as its background color

### Requirement: Home Hero Is Built From Separate Layers

The home hero MUST render the sky, the display name, the near hill and the portrait as four separate elements, painted in that order from back to front. The display name MUST be live text, not an image. No layer MAY be mirrored.

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

Text shown in the Outside state MUST describe outcomes in plain language. Text shown in the Inside state MUST describe how the thing is built. Neither state MAY state a metric that cannot be verified. All of it MUST come from the `Dictionary` in `src/lib/i18n.ts` or from content entries; no user-visible string MAY be hardcoded in a component.

#### Scenario: No hardcoded state copy

- GIVEN the components that render Outside and Inside copy
- WHEN their source is inspected
- THEN user-visible strings MUST come from `getDictionary(lang)` or from a content entry

#### Scenario: Inactive copy is hidden from assistive technology

- GIVEN the home page in the Outside state
- WHEN the accessibility tree is inspected
- THEN no Inside-only text MUST be exposed

### Requirement: The Lens Switches Outside and Inside

The home page MUST offer a lens control, docked bottom-right, that switches the page between Outside and Inside by setting `data-lens` on the root element. Dragging it MUST preview the Inside state inside a circle that follows the pointer; dropping it, clicking it, pressing Enter on it or pressing the I key MUST switch to Inside; Esc and the "Back outside" control MUST switch back. Every visit MUST start Outside. Case study, Work index and Notes pages MUST NOT show the lens.

#### Scenario: Keyboard switch

- GIVEN the home page in the Outside state with focus on the lens
- WHEN the visitor presses Enter
- THEN `data-lens` on the root element MUST become `inside`
- AND an `aria-live` region MUST announce the change
- AND pressing Esc MUST set `data-lens` back to `outside`

#### Scenario: The I shortcut respects text input (WCAG 2.1.4)

- GIVEN focus inside the contact composer
- WHEN the visitor types the letter I
- THEN the state MUST NOT change
- AND a footer control MUST allow turning the shortcut off

#### Scenario: Touch hint

- GIVEN a device whose primary pointer is coarse
- WHEN the lens hint is shown
- THEN it MUST read "Tap the lens" (from the `Dictionary`), not a keyboard instruction

#### Scenario: No lens on case studies

- GIVEN any `/work/<slug>/` page
- WHEN it is rendered
- THEN no lens control and no "Press I" hint MUST be present

### Requirement: Decorative Layers Stay Out of the Way

Backgrounds (bytes, light gradients, grain) and the ghost footer names MUST be decorative only: `aria-hidden="true"`, no real text in the DOM, and the bytes MUST be masked away from every text block (fully hidden within 40 px, back at full strength by 120 px). They MUST be hidden under `prefers-reduced-transparency: reduce` and `forced-colors: active`. Inside annotation notes MUST be rendered at an opacity that keeps them at or above 4.5:1.

#### Scenario: Bytes are invisible to assistive technology and search

- GIVEN any page with a bytes background
- WHEN the accessibility tree and the page text are inspected
- THEN no byte string MUST appear in either

#### Scenario: Annotation notes meet AA

- GIVEN an Inside annotation note
- WHEN its contrast against its background is measured
- THEN it MUST be at least 4.5:1

### Requirement: Motion Respects Reduced Motion

Hero parallax, the lens switch transition, nav state changes and the chat typing delay MUST be disabled or reduced to an instant change under `prefers-reduced-motion: reduce`. Motion values are tuned on the running site and approved by the owner there.

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce`
- WHEN the visitor scrolls the hero and switches the lens
- THEN no layer MUST move at a different speed from the page
- AND the switch MUST happen without a transition
