# Phase 3 unit: Home (Outside and Inside)

Read `phase-3-common.md` first. Unit name for the report: `home` → `reports/phase-3-home.md`.

- Area reports: `openspec/changes/design-audit/reports/audit-home-outside.md` (HO-01 … HO-24) and `audit-home-inside-chat.md` (HI-01 … HI-20); As built notes `reports/home-outside.md`, `reports/home-inside.md`.
- As built pages: `As built · Home Outside` `2449:12` — boards `2449:21` (1440), `2487:61` (768), `2487:349` (390), nav states `2449:3181`, mobile menu `2449:3415`. `As built · Home Inside & chat` `2449:3558` — boards `2474:12` (1440), `2476:14` (768), `2477:14` (390); chat captures `2481:14` … `2481:44`.
- The approved Inside annotation component is `Annotation (Inside)` `2165:10` on page `Portfolio`: rebuild it as a page component with the colour tokens `annotation/*` of the `Color` collection; do not edit the original.
- Your page: `Proposed · Home`, right after `As built · Home Inside & chat`.

Order:

1. Page components: hero content block (intro, CTA as Button Primary), Values row, featured work card, Experience row with chips, Notes list row and featured card, Inside annotation (pin, leader, bound, title, note; note opacity raised so it reaches 4.5:1 — HI-04), section marker + heading pair (one marker → h2 gap, HO-02; one h2 tracking, HO-17).
2. Home Outside 1440, 768, 390.
3. Home Inside 1440, 768, 390: the same boards with the Color mode set to Inside, Logo swapped to Lens=Inside, and the annotations layer. Fix the 390 / 768 hero overflow over the notes list (known defect), pins inside the gutter (HI-12), one marker suffix treatment (HI-07).
4. One board, Home 1440 Inside with the chat open: `ChatCard` State=Question at 620 wide in the Contact section, the composer annotation hidden (HI-03).

Owner decisions — draw the report's recommended fix, mark it **proposal**, keep the As built hero art:

- HO-03 / HO-04 / HI-14: the lens control ("Look inside" is a magnifier only; tab order; same icon in and out).
- HO-09: contrast of the white "Jahat" over the sky.
- HI-05: overlapping contours in the outlined "Jahat".

HI-01, HI-02 and other keyboard or crash items are code: list them, do not draw them.
