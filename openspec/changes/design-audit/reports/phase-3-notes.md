# Phase 3 — Notes and links

Figma page: `Proposed · Notes & links` (`2520:12`), immediately after `As built · Notes & links`. Page components: section `2520:13`. The page is a proposal, not an approved implementation.

## Page components

| ID | Component / variants | Findings addressed |
|---|---|---|
| `2522:475` | Featured post card: Default / Hover (`2520:24`, `2522:476`) | NL-12, NL-14, NL-21. The whole card links to the post; `PostRow.astro:18–22` confirms the site's entire card is one anchor. The isolated arrow was removed. |
| `2520:155` | Post row | NL-14; uses shared internal TextLink. |
| `2520:35` | Code block: Copy / Copied (`2520:36`, `2520:42`) | NL-02, NL-06, NL-07. Copied uses a contrasting check; each control has 48 px vertical padding area. Syntax colours are bound to existing primitives. |
| `2522:2318` | Mobile code block, Copy with edge fade | NL-23; Copied is shown in the shared set above, not a separate mobile variant. |
| `2520:68` | Elsewhere list, five profiles | NL-15; NL-16 is a **proposal**. |
| `2520:102` | In this post, first current | NL-01 visual state; NL-13 hit areas 35 px (`2524:2622`–`2524:2625`). Runtime tracking is code. |
| `2520:163` | Pull quote | Reusable; existing post text, not placed on a board. |
| `2523:1706` | Links card: Internal / External × Default / Hover | NL-11, NL-12, NL-14; hover uses sand, directional movement is documented for code. |
| `2520:151`, `2522:510`, `2522:871` | Notes hero: desktop / tablet / mobile components | NL-05, NL-10, NL-21. |
| `2520:167`, `2522:517`, `2522:878` | Notes writing section: desktop / tablet / mobile | NL-10–16, NL-21. |
| `2522:1212`, `2522:1641`, `2522:2234` | Post hero: desktop / tablet / mobile | NL-04, NL-05, NL-08, NL-10, NL-13. |
| `2522:1246`, `2522:1649`, `2522:2242` | Post article: desktop / tablet / mobile | NL-04, NL-06–09, NL-18–21, NL-23. |
| `2522:1449`, `2523:1529` | Post author card: desktop/tablet, mobile | NL-13, NL-21; shared primary Button. |
| `2523:2285`, `2523:2424`, `2523:2569` | Links page: desktop / tablet / mobile | NL-10–12, NL-14, NL-22; mobile Elsewhere contrast band addresses the additional system-audit finding. |

## Boards

Each board was screenshot-compared with its matching As built board; after targeted fixes, screenshots were taken again. Modes were read back on all nine. Product font families were checked on Notes and post boards, and the links screens use the same local styles. Images use the matching As built paints. Footer signature clipping is intentional in the shared Footer component. A screenshot comparison is not a measured contrast test or a functional browser test.

| Board | Node | Width / modes | Check result |
|---|---|---|---|
| Proposed · Notes index · 1440 | `2520:216` | 1440, Outside / Desktop | Checked against `2447:13`; caption `2522:448`. |
| Proposed · Notes index · 768 | `2522:589` | 768, Outside / Tablet | Checked against `2447:206`; title balanced; caption `2522:839`. |
| Proposed · Notes index · 390 | `2522:972` | 390, Outside / Mobile | Checked against `2447:393`; display-word clipping corrected; caption `2522:1211`. |
| Proposed · Post · 1440 | `2522:1287` | 1440, Outside / Desktop | Checked against `2447:593`; article and author clipping corrected; caption `2522:1421`. |
| Proposed · Post · 768 | `2522:1713` | 768, Outside / Tablet | Checked against `2447:784`; reading width, current indicator, code and author action checked; caption `2522:1850`. |
| Proposed · Post · 390 | `2522:2326` | 390, Outside / Mobile | Checked against `2447:980`; H1 40 / H2 34 verified, author clipping corrected; caption `2522:2454`. **Open proposal:** the mandated 40 px H1 and non-breaking hyphen leave “script” alone on the final line. |
| Proposed · /links/ · 1440 | `2523:2359` | 1440, Outside / Desktop | Checked against `2447:1188`; caption `2523:2422`. No site nav or footer. |
| Proposed · /links/ · 768 | `2523:2486` | 768, Outside / Tablet | Checked against `2447:1250`; label on cream band; caption `2523:2549`. No site nav or footer. |
| Proposed · /links/ · 390 | `2523:2632` | 390, Outside / Mobile | Checked against `2447:1311`; card height and title wrap fixed; cream Elsewhere band; caption `2523:2696`. No site nav or footer. |

## Findings

| ID | Status | Evidence / remaining work |
|---|---|---|
| NL-01 | code | Scroll offset, active-item calculation and `aria-current` require implementation. Current dot is drawn in `2520:102`. |
| NL-02 | fixed (component `2520:35`); code | Copy / Copied plus check and enlarged target are drawn and screenshot-checked; clipboard, 1.6 s timing and live region are code. Mobile Copied variant is not separately drawn. |
| NL-03 | code | Replace hardcoded “read” with the dictionary's reading-time string. |
| NL-04 | proposal (owner) | `2522:2326` uses H1 40 / H2 34, with the required non-breaking hyphen. Body follows the system's 16 px mobile style rather than the report's 18 px suggestion. The title still leaves “script” alone; owner decision needed on the tradeoff. |
| NL-05 | proposal | Notes and post heroes use heading-colour subtitles (`2520:151`, `2522:1212` and responsive counterparts). No new pixel-sampled contrast measurement was made. |
| NL-06 | fixed (component `2520:35`) | `Mono/Code` uses IBM Plex Mono. |
| NL-07 | fixed (component `2520:35`) | `Mono/Code` resolves to 14 px; bar label uses `Mono/Note`. |
| NL-08 | fixed (`2522:1287`) | Reading column moved to the hero's left grid rather than moving the hero to the old article grid. |
| NL-09 | fixed (`2522:1713`) | Stacked reading column is 688 px. |
| NL-10 | fixed (Notes, post and links components) | Shared muted label colour is used; hero subtitle is heading colour. |
| NL-11 | fixed (page components) | Meta labels use `Label/Meta`; markers use `Label/Marker`. |
| NL-12 | fixed (components `2522:475`, `2523:1706`); code | Featured card has underline hover; link-card hover uses sand and was screenshot-checked. Directional translation and reduced-motion handling remain code. Shared IconButton owns profile hover. |
| NL-13 | fixed (`2520:102`, `2522:1449`, `2523:1529`) | BackLink and author Button use shared 44 px controls; contents rows measure 35 px. |
| NL-14 | fixed (`2522:475`, `2523:1706`) | Date precedes reading time in mono metadata; link destinations use correct arrow components. |
| NL-15 | fixed (`2520:68`) | Profile names use shared body-sized external TextLinks with adjacent ↗; spacing follows a token and is approximately the requested row pitch. |
| NL-16 | proposal (owner) | Five-profile `/links/` set used in Notes Elsewhere. |
| NL-17 | code | Place the composer input and Send before chips in DOM order. |
| NL-18 | fixed (`2522:1246`, `2522:1649`, `2522:2242`) | Prose uses solid green-900; heading styles provide the shared tracking. |
| NL-19 | proposal | Inline code uses regular `Mono/Code` at 14 px and muted green; this is a shared fixed size, not the exact 0.85em requested. |
| NL-20 | fixed (post article components) | Tags use uppercase `Label/Meta`. |
| NL-21 | proposal | Notes subtitle and author copy reflowed; mobile post title's last-word issue remains the NL-04 owner decision. |
| NL-22 | proposal | Retained card-first order; desktop visual order remains two columns. Implement and verify keyboard order in code. |
| NL-23 | fixed (mobile component `2522:2318`); code | Right-edge fade drawn; keyboard focus and horizontal scrolling remain code. |

## Requests for the design system

- Consider a semantic code-syntax palette and a profile-button surface variant; this page currently binds the existing primitive syntax colours and uses a page-level cream band around shared IconButtons.
- Consider a token for the 57 px Elsewhere row if exact pitch is required. The current token-based pitch is approximately 59 px.
- A responsive inline-code style would permit the exact 0.85em sizing of NL-19 without overriding a shared text style.

## Open questions

1. NL-04: approve the 40/34 hierarchy and decide how to resolve the lone “script” without breaking the requested non-breaking hyphen or changing the title.
2. NL-16: approve the unified five-profile Elsewhere set.
3. NL-22: confirm card-first keyboard order for the desktop two-column layout.
4. Re-measure subtitle contrast against the final hero pixels before approval; Figma screenshots alone do not establish WCAG contrast.
