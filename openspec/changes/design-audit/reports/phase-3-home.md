# Phase 3 — Home (Outside and Inside)

**Status: complete.** All seven boards are built, screenshot-checked and captioned. Figma page: `Proposed · Home` (`2536:12`), right after `As built · Home Inside & chat`. These are proposals, not an approved design.

## Page components (Section `2537:12`)

Each one has a description in Figma naming the findings it addresses.

| ID | Component | Variants | Findings |
|---|---|---|---|
| `2537:19` | Home / Section header | Level Title / Sub | HO-02, HO-17, HI-07, HO-10, HI-18 |
| `2537:26` | Home / Value row | Row / Stacked | HO-10, HI-18 |
| `2537:27` | Home / Proof fact | — | (structure only) |
| `2537:32` | Home / Proof card | — | HO-01, HO-14 |
| `2537:71` | Home / Project fact | Row / Stacked | SY-05, SY-06 |
| `2537:168` | Home / Project card | Featured / Featured stacked / Compact / Mobile | HO-01, HO-14; Inside card collapse (HI-06 family) |
| `2538:75` | Home / Chip | — | — |
| `2538:103` | Home / Experience row | Row / Stacked | HO-11 |
| `2538:104` | Home / Experience group label | — | SY-05 |
| `2538:107` | Home / Carry item | — | date ranges never split (known) |
| `2538:134` | Home / Post featured | Wide / Narrow × Default / Hover | HO-05, HO-10 |
| `2538:135` | Home / Post list row | — | built as the brief asks; **not placed** (the site has one post) |
| `2538:149` | Home / Lens control | Look inside / Back outside / Back outside touch | HO-03, HI-14, HI-13 (proposal) |
| `2540:113` | Home / Annotation (Inside) | right / left / above / below | HI-04, HI-16, HI-17 |
| `2540:114` | Home / Annotation bound | — | HI-03, HI-12 |
| `2540:115` | Home / Annotation pin | — | HI-12 |
| `2540:117` | Home / Annotation list item | — | HI-04, HI-17 |
| `2540:123` | Home / Hero intro | — | HO-14, HO-19 |
| `2540:262` | Home / Hero | Layout Desktop / Tablet / Mobile × Lens Outside / Inside | HI-05, HO-09 (proposals), hero overflow |
| `2555:4007` | Home / Contact · chat open · Desktop | — | HI-03 |

The hero has a Lens variant because Inside adds art layers (dusk overlay, sun mask, darker hill). Colours still come from the Color mode. All other components switch by mode alone.

## Boards

| Board | Node | Width, modes | Check result |
|---|---|---|---|
| Proposed · Home Outside · 1440 | `2541:153` | 1440, Desktop / Outside | Compared with `2449:21`. Fixed: Experience heading orphan, missing section tints, "redone." orphan. |
| Proposed · Home Outside · 768 | `2544:603` | 768, Tablet / Outside | Compared with `2487:61`. Fixed: baked plate artefacts, grey bound-paint fallback, heading breaks. |
| Proposed · Home Outside · 390 | `2547:2030` | 390, Mobile / Outside | Compared with `2487:349`. Fixed: hero headline and post title orphans. |
| Proposed · Home Inside · 1440 | `2549:1779` | 1440, Desktop / Inside | Compared with `2474:12`. Fixed: cards invisible on green-900 sections, lone "made", annotations re-placed after reflow. |
| Proposed · Home Inside · 768 | `2553:3005` | 768, Tablet / Inside | Compared with `2476:14`; hero zoomed (outline shows over the portrait). No further fixes. |
| Proposed · Home Inside · 390 | `2554:3421` | 390, Mobile / Inside | Compared with `2477:14`. Fixed: post title and contact heading orphans. |
| Proposed · Home Inside · chat open · 1440 | `2555:3713` | 1440, Desktop / Inside | Compared with capture `2481:44` (it shows the summary step; this board shows Question, as the brief asks). Fixed: lone "together?", fact rules touching values. |

Structural audit over all seven (run before the last four line-break edits, which changed text only):

- Breakpoint and Color modes read back correct on every board.
- No overlapping top-level nodes.
- No solid paint without a variable, excluding art layers and icon / logo internals, which the check skipped.
- The only text without a text style is the display art: "Jahat" (270 px at 1440, 210 at 768, 130 at 390) and "@trinitybytes".

Screenshots are not a contrast measurement or a browser test.

## Art sources (one deviation)

- **Hero:** the sky, hill and portrait image paints from `2449:23/25/26`. The Inside layers follow approved `2191:503`. The As built Inside hero is a flat plate with the broken outline baked in, so it could not be used.
- **1440 Outside section backgrounds:** layers cloned from `2449:21`.
- **768 / 390 Outside and all Inside section backgrounds, plus the 768 / 390 Outside contact image:** copied from the **approved** boards (`2211:86`, `2210:86`, `2191:503`, `2213:86`, `2212:86`), not from As built. The As built tablet plates have a lens circle, a link rule, dots and a stray line baked in. This departs from rule 4 of the common brief. The As built 390 plates were not tried; the approved art was used at 390 for consistency with 768.
- **Inside contact:** the Outside contact image plus a `color/dusk` paint.
- **Covers, Garden screenshot, choir photo:** the 1440 As built image paints at every width.

## Findings — Home Outside

| ID | Status | Where / why |
|---|---|---|
| HO-01 | fixed | `TextLink` everywhere; one underline (all boards). |
| HO-02 | fixed; contact via DS | Section header `2537:19`, one 12 px gap. The `Contact section` component keeps its own spacing (see requests). |
| HO-03 | **proposal (owner)** | "Look inside" pill with a visible label at every width (`2538:149`). |
| HO-04 | code, **proposal (owner)** | Tab stop right after the hero CTA; noted on the Lens control. |
| HO-05 | fixed (components); code | `Button` and `TextLink` carry hover; post card hover drawn; lens hover documented only. |
| HO-06 | fixed (DS tokens); code | Focus tokens and the Footer mode pin. |
| HO-07 | fixed | DS Footer, 768 and 390. |
| HO-08 | code | `.hit` padding on tablet nav links and language codes; not visible. |
| HO-09 | **proposal (owner)** | Green-950 25 % shadow under the white name (the SY-12 treatment, not the report's 6 %). The 768 / 390 outline over the portrait has no shadow. **Contrast not re-measured.** |
| HO-10 | fixed (boards); code | Manual breaks in headings; `text-wrap: balance` in code. Body copy was not swept for single-word lines. |
| HO-11 | fixed | Curly apostrophes on all boards. |
| HO-12 | fixed (DS) | 1.5 px icon components. |
| HO-13 | fixed (DS) | External arrow follows the text size. |
| HO-14 | fixed | One arrow component in CTA and links. |
| HO-15 | fixed | "All writing" uses the same `TextLink` as "See all projects". |
| HO-16 | fixed | `layout/section-pad` top and bottom. |
| HO-17 | fixed (proposal on size) | One tracking from the text styles. Section titles use H1, as `Contact section` does; Experience uses H2 as the deliberate sub-heading. |
| HO-18 | fixed (DS descriptions); code | Press scale. |
| HO-19 | fixed | Primary `Button`, fill hover. |
| HO-20 | fixed in DS `MobileMenu` `2517:877` | No menu board in this unit. |
| HO-21 | fixed in DS `MobileMenu` | Same. |
| HO-22 | code | Lens cursor; noted on the component. |
| HO-23 | code | Nav motion timing. |
| HO-24 | fixed (layout), code (label) | DS Footer hides the shortcut on touch; label flip is code. |

## Findings — Home Inside and chat

| ID | Status | Where / why |
|---|---|---|
| HI-01 | code | Crash on a double `I` during the reveal. |
| HI-02 | code | `Esc` inside the composer. |
| HI-03 | fixed | Chat-open board has no composer annotation; idle bound inset 8 px. |
| HI-04 | fixed on page (see requests) | Note bound to `annotation/pin` (60 %). Not re-measured on the new pixels. |
| HI-05 | **proposal (owner)** | Outside-aligned stroke removes the inner contours in Figma. Code still needs an overlap-removed outline or SVG path: CSS `-webkit-text-stroke` has no outside alignment. |
| HI-06 | fixed (DS `ChatCard`) | The pencil hover is not visible in the Question state. The same token collapse also hit Home cards (fixed with `color/card-raised`). |
| HI-07 | fixed; **proposal** on copy | One marker style. The Contact suffix changes from "For developers" to "How the chat works" (new copy). |
| HI-08 | fixed (DS `ChatCard`) | — |
| HI-09 | fixed (DS `ChatCard`) | Summary state not placed on a board. |
| HI-10 | fixed (DS) | — |
| HI-11 | fixed (DS `ChatCard`) | Summary state not placed on a board. |
| HI-12 | fixed | Pins inside the gutter at 768 / 390; chip rows have 12 px above. |
| HI-13 | fixed | Hero clips; notes are in the flow; lens pill does not cover the marker. |
| HI-14 | **proposal (owner)** | No magnifier on the way out: label plus Esc cap (cap hidden on touch). |
| HI-15 | code | Reveal duration and easing. |
| HI-16 | fixed | Label edge on the leader for above / below. |
| HI-17 | fixed | 12 px on desktop and in the small-screen list. |
| HI-18 | fixed (boards); code | Manual breaks in headings and the hero lead. |
| HI-19 | not applicable | `/es/` and `/pt/` have no boards. |
| HI-20 | fixed | Curly apostrophes. |

Also corrected from the As built notes (no audit ID):

- The 390 / 768 hero overflow over the notes list.
- Literal backticks in the Tranqui copy (still a content bug in code).
- The `↑` after the Inside hint, which is not a link.
- Date ranges no longer split in experience rows and carry items.
- The "Press Esc or I" hint is dropped on touch hero variants.

Applied for consistency with the Notes proposal (NL-14): the post card shows date before reading time and has no stray arrow, because the whole card is one link.

## Requests for the design system

1. **`annotation/note` alpha 40 % → 60 %** (HI-04). The page binds notes to `annotation/pin` as a stand-in.
2. **Inside token pairs that collapse:** `color/card` = `color/surface` (green-900), and `color/tutorial-chip` = `color/card-raised` = `color/bg` (green-950). The page uses `card-raised` for cards and a `tag-border` stroke on the post tag. The Inside proof highlights are much weaker than As built (dark chip instead of bright green).
3. **`Contact section`:** add a chat-open state, and an Inside suffix / marker colour check. The page component `2555:4007` stands in for the first.
4. **`Footer`:** Inside variant or property for the "@trinitybytes" signature (overridden by hand here, including font and size), and the As built "Press Esc or I to go back outside" row, which the component does not have.
5. **`ChatCard`:** the avatar is "JT" initials; the site shows the profile photo.
6. **Icon for leaving the lens** if the owner wants one instead of the label-only proposal.
7. A light-green tag token for the post "Essay" tag (As built green; the page uses the yellow `tutorial-chip`).

## Open questions

1. HO-03 / HO-04 / HI-14: approve the labelled lens pill, its Tab position and the icon-free way out.
2. HO-09: approve the shadow, then measure contrast on the real pixels.
3. HI-05: approve the clean outline and choose how code produces it.
4. HI-07: approve "How the chat works".
5. The hero lead still says "Press I anywhere" at 390 and 768. Changing it is a copy decision.
6. The layer note says "270 px" at every width, as the site does, but the name is 210 px at 768 and 130 px at 390.
7. "See my work →" points to a section of the same page. Does the link-arrow rule allow `→` there?
8. The Footer component clips the lower part of the signature (including the descenders in "@trinitybytes"). Confirm that is intended Inside.
