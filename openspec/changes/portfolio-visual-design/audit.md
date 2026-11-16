# Audit: Home v3.1 desktop, Outside `2105:2` and Inside `2137:2` (task 3.28)

> Date: 2026-11-16. Read-only: nothing in Figma was changed.
> Method: single-context review (the Impeccable detector reads web markup and does not apply to Figma boards). Three passes: (1) visual, section by section, both states at 1:1; (2) mechanical scan of every text node through the Plugin API (contrast against the nearest solid fill, pixel-sampled contrast over images, font sizes, gutter overflow, text box overlaps, placeholders); (3) whole-board view for section seams, floating controls, and the two spec frames (`2109:103`, `2093:2`).
> Scope: the two Home boards and their specs. Responsive, motion and other pages are out of scope (not designed yet).

## Score (Nielsen, 0–4)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | No "copied" state for Copy my email; the Inside state is clear |
| 2 | Match with the real world | 2 | A magnifier means search; nav labels do not match section names |
| 3 | User control and freedom | 3 | Esc, I and "Back outside" all return; good |
| 4 | Consistency and standards | 2 | Mink'a differs between states; Inside footer says "look inside"; two keys for "Back outside" |
| 5 | Error prevention | 3 | The chat lets people edit the email before sending |
| 6 | Recognition over recall | 3 | Labels on every row; the I key is hinted |
| 7 | Flexibility and efficiency | 3 | Drag, click, I and Esc all work |
| 8 | Aesthetic and minimalist design | 2 | Five triggers for one action; availability said three times |
| 9 | Error recovery | n/a | No error states exist yet (chat mechanics deferred, task 7.7) |
| 10 | Help and documentation | n/a | Portfolio; the hints cover it |
| | **Total** | **20/32** | Solid concept, held back by consistency and Inside depth |

## Verdict

The design is authored, not generic. The name behind the hill, the sun repeated at Contact, and Inside annotations that say "counted from the repo, not estimated" belong to this person and nobody else. The 64 px gutter and the section marker rhythm hold across all six sections.

What holds it back:

1. Inside is mostly a recolor. In Values, Experience, Notes and Contact, about two thirds of the text is the same as Outside. A reviewer who presses I expects to learn something new on every screen.
2. The two states disagree on facts: Mink'a platform, covers, and the footer hint.
3. The hero has five ways into the same action.

## Findings

Severity: P1 = fix before owner verdict, P2 = fix before hi-fi, P3 = polish.

### P1

| # | Where | Finding | Fix |
|---|---|---|---|
| 1 | Inside Notes, ESSAY chips `2137:307`, `2137:321` | White text on `#B3F3B4`: **1.28:1**. Unreadable. The recolor pass turned the chip text white. | Chip text green-950 (13.4:1, same as Outside) |
| 2 | Inside Contact, "Start a conversation" `2137:361` | `#FAF6E8` text on green-300: **1.39:1**. The table in design.md 3.4 says the Inside primary button uses green-950 text. The Copy and LinkedIn icons stayed dark green on dark. | Text and icon green-950; secondary icons green-300 |
| 3 | Inside footer `2137:403` | Says "Press I to look inside" while the visitor is already inside. | "Press I to go back outside" |
| 4 | Inside hero, annotation layer 03 | "Epilogue Medium 300 · sits behind me" is no longer true: since D9 the name sits behind the **hill**, clear of the portrait. "Medium 300" also reads as weight 300 (Light). | "Epilogue Medium · 300 px · sits behind the hill" |
| 5 | Inside Notes | The annotation says "293 lines" next to a post titled "…with a 200-line script". The page contradicts itself where an evaluator reads most closely (task 3.30). | Fix the title |
| 6 | Mink'a, both states | Outside: "ANDROID + WEB" and "on Android and on the web". Inside: "NATIVE ANDROID", "no web app". The covers also differ between states (design deck vs landing capture). Same page, two sets of facts (task 3.29). | Outside to native Android; one cover in both states |
| 7 | Hero, both states | Five triggers for "look inside": lens, "Look inside" button, its I key cap, the hint line, and "Press I" in the footer. In Inside, two "Back outside" buttons sit 400 px apart with different keys (I in the hero, Esc in the corner). | Keep the lens and the hint; drop the hero button (closes 3.25). One "Back outside", showing both keys |
| 8 | Lens, keyboard | A single-letter shortcut (I) fails WCAG 2.1.4 (Character Key Shortcuts) unless people can turn it off or remap it, or it only works while a control has focus. It also clashes with typing in the contact chat. | Ignore I while any input is focused, and add an off switch (or only listen while the lens has focus). Note it for implementation |

### P2

| # | Where | Finding | Fix |
|---|---|---|---|
| 9 | Lens icon | The Lucide "search" magnifier reads as site search. People will click it expecting a search field (D11 chose it, so this is a risk to weigh, not a defect). | Test an eye or layers icon, or add a "Look inside" label on first visit |
| 10 | Inside hero annotations | The dashed portrait bound runs through the layer 01 label ("far hills", "slowest"). The dashed name bound runs through "[layer 02 · near hill]" (overlap found by the scan). | Move the labels off the dashed lines |
| 11 | Inside Work, Mink'a | The annotation box covers the Google Play button it describes ("Ver cómo f…" is cut off). | Put the box beside the button; keep the pin on it |
| 12 | Inside Notes and Contact | Three pins point at empty space: "[one call site · both rows]" under the list, "[feed · /rss.xml]" under Elsewhere (Elsewhere is social posts, not the RSS feed), and "[3 facts · one list]" under the buttons. An annotation that points at nothing teaches nothing. | Pin each one to its element; move the RSS one next to "All writing" |
| 13 | Inside hero and Contact | The sun disc shows through the dusk overlay as a grey smudge: behind the "h" of the name, and behind "Copy my email". | Mask the sun in the Inside sky, or lower its exposure |
| 14 | Values, Outside | "7 days from first commit to production. Launched on day 46." reads as a contradiction to anyone outside the project. "10 releases in one day" does not prove "a bridge between design and engineering". The approved copy left that proof pending. | Say what was live on day 7; find a design-to-code proof for value 02 or mark it [Owner] |
| 15 | Inside Values, Experience, Contact | Inside differs from Outside only in one column (Values), two annotations over seven roles (Experience, whose headline promises "the tools behind each role"), and one annotation (Contact). | Values: replace column 2 with the how. Experience: one tool or method line per role, or narrow the headline. Contact: an Inside sub that explains the chat |
| 16 | Navigation | The nav reads Work / Writing / Links. The page has Selected work, Experience, and Notes (Writing + Elsewhere). Experience cannot be reached from the nav, and "Links" has no section on the home page. | Use the section names: Work · Experience · Notes · Contact |
| 17 | Contact and footer | "Open to work · Lima", the facts row (now, Lima, remote) and the footer statement repeat the same facts within about 700 px. "Designed and built by the same person" appears word for word in the hero and the footer, and the same idea is in the Values sub and the Contact headline. | Keep the facts row; cut the status line or the footer statement. Keep the hero line, and replace the footer line with something new (the source link) |
| 18 | Contact → footer seam | A straight horizontal edge on the left where the Contact landscape ends and the footer hill starts low. It shows in both states. | Extend the footer hill's left edge, or fade the Contact image into the ground |
| 19 | Outside Contact, status line | "OPEN TO WORK · LIMA, PERU" `#236C2A` on the sky measures **3.79:1** at 13 px (pixel-sampled), below AA 4.5. | green-900 or green-950 |
| 20 | Work and Values | Two neighbouring sections use the same pattern: a mono label plus hairline rows. Work adds nine label/value rows across three cards. This breaks the rule "neighbouring sections use different patterns". "My part" comes last, but it is the first thing a recruiter asks about a team project. | Move "My part" up to the second row; vary one of the two patterns |
| 21 | Type scale | Hanken uses 14/15/16/17/18/19/20, Epilogue 22/24/34/36/44/48/56/60, Plex Mono 11/12/13/14. Sizes this close look like mistakes, not steps. 16 nodes are 11 px (tags, chips, column labels). | Pick about 6 steps per family; 12 px minimum for mono |
| 22 | Footer, both states | The statement runs to x 1418, past the 1376 gutter. In Outside, "RSS" touches the ascender of the ghost "Jahat". | Wrap it within the gutter; move the ghost name down 24 px |
| 23 | Inside Work | The two "See the project" links sit at different heights (y 1601 vs 1577). In Outside they align. | Pin the links to the card bottom |

### P3

- Dashes are inconsistent. The hero uses " – " (spaced en dash), body copy uses "—", date ranges appear as "2019 – 2022" and "2019-2022", and the specs title "Lens – states" vs "LOGO — STATES". Pick one dash style for asides and one for ranges.
- The hero headline breaks badly: line 2 starts with the dash and "person." sits alone on line 3. Balance the lines.
- Leftover layers "PHOTO PLACEHOLDER — subject" (`2105:19/20`, `2137:20/21`) are visible under the portrait in both heroes. Delete them.
- The lens spec frames show "EN / ES" with no PT. They are stale next to the boards.
- The Inside hint "press Esc or I to go back outside ↘" uses ↘, but design.md says ↑.
- Experience: the left column ends at y 740 of 1600. In code it should be sticky. The choir photo is the only image in the section, so the strongest visual sits on the one non-tech role. A stray hairline runs along the top edge of the section.
- The contact headline's text box overlaps the chat card's box. It is fine at 1440, but the two will collide at narrower widths.
- The Tranqui cover is the only navy block on the page. Allowed as project content, but it pulls the eye in Outside.
- "Elsewhere · latest posts" (LinkedIn, Instagram, YouTube) is a maintenance cost for a static site. Is Instagram worth a recruiter's attention?
- Placeholders still open: 15 in Outside, 20 in Inside (`[N]`, `[date]`, `[Post title …]`, `[First line …]`, `[Owner: …]`, `[Draft]`). Task 3.14.

## Accessibility measurements

| Pair | Ratio | Needs |
|---|---|---|
| Inside ESSAY chip, white on `#B3F3B4` | 1.28 | 4.5 ✗ |
| Inside primary button, cream on green-300 | 1.39 | 4.5 ✗ |
| Outside contact status, `#236C2A` on sky | 3.79 | 4.5 ✗ |
| Outside hint `#88E88C` on grass (average) | 7.0 | 4.5 ✓, but the grass texture behind it is busy |
| Outside hero eyebrow and sub, `#1A511F` on sky | 5.1 / 5.7 | ✓ |
| Inside annotation sun on dark | 11.1 | ✓ |
| Tag outline `#44B34F` on cream, Inside divider `#236C2A` | 2.5 / 2.65 | 3 for non-text; decorative only, the text carries the meaning |
| Ghost footer names | 1.17 / 1.58 | Decorative; mark them `aria-hidden` |

## What works

- **Layered hero.** The name behind the hill and the portrait in front give real depth. The Inside x-ray of that same stack is the best explanation of the concept on the page.
- **Evidence over adjectives.** Values proofs are numbers taken from the repo, and Inside says where they come from. Work rows use the same three questions for every project.
- **Rhythm.** A 64 px gutter, the same marker → headline → content order in every section, and alternating cream and sand. Easy to scan, as the owner's rule asks.

## Personas

- **Recruiter, 30 seconds:** reads the hero and the Values numbers, then reaches Work and hits "[Owner: name the pieces you built.]" in the featured card. "My part" is the last row. The proof project (Garden) is not among the selected work.
- **Engineer evaluating:** presses I and finds the Values text nearly identical, with one changed column. Spots 200 vs 293 lines. The x-ray hero and the stack rows land well.
- **Keyboard and screen reader user:** the I shortcut fires while typing in the chat. When the state changes, the page needs an announcement (`aria-live`) that the content switched. The drag has a click alternative (good, WCAG 2.5.7).

## Applied on v3.2 (task 3.32, 2026-11-16)

New boards beside v3.1, which stays untouched: Outside `2149:74` (x 7200), Inside `2149:463` (x 8840). After the fixes, a re-scan of both boards finds no contrast failures, no text under 12 px, no gutter overflow and no text boxes that overlap. The only hit is the decorative ghost "@trinitybytes". A full screenshot pass showed the problems below and was rechecked after the fixes.

| # | Status | What changed |
|---|---|---|
| 1, 2 | Fixed | ESSAY chip text green-950. "Start a conversation" text and icon green-950. Copy and LinkedIn icons green-300 |
| 3 | Fixed | Inside footer: "Press Esc or I to go back outside" |
| 4 | Fixed | "Epilogue Medium · 300 px · sits behind the hill" |
| 5 | Fixed | Post title in both states: "…with a zero-dependency script" (closes 3.30). The annotation keeps "293 lines" |
| 6 | Fixed | Outside Mink'a: "NATIVE ANDROID", native app copy, "My part" filled from owner facts. Both states now use the live-hero captures as the Mink'a and Tranqui covers (closes 3.29 and the cover question in 3.28) |
| 7 | Fixed, owner verdict pending | Hero "Look inside" button removed (proposes closing 3.25). Inside has one "Back outside", in the corner. The lens and the hint stay |
| 8 | Noted for implementation | design.md section 8 |
| 9 | Not applied | The lens icon is an owner decision (D11). The risk is recorded here |
| 10, 11, 12 | Fixed | Hero labels moved off the dashed bounds. The Mink'a pin sits beside the Google Play badge. Notes pins sit on their elements: RSS on "Writing · latest", MDX on the chip, the script note on the post meta, the call-site note on the list's bottom edge. The facts pin sits on the facts divider |
| 13 | Fixed | A blurred mask over the dimmed sun in the Inside hero and Contact |
| 14 | Fixed, owner to confirm | "from first commit to the first release. Public launch came on day 46." / "in one day: interface and performance changes, all by one person." |
| 15 | Fixed (D18), [Draft] | Inside rewritten for a technical reader. Values: headline, column labels ("The practice" / "How I work"), all three practices and bodies. Experience: marker, headline, sub, left label, all four skills. Contact: marker "06 — CONTACT · FOR DEVELOPERS" and headline. Experience gives no tool per role: only two tools are known facts, so the headline was narrowed instead |
| 16 | Fixed | Nav and footer: Work · Experience · Notes · Contact |
| 17 | Fixed | The Contact status line became the section marker "06 — CONTACT". The footer bottom line "Designed and built by the same person." was removed. The footer statement is now "Open to an internship, now. / Lima, Peru · remote." |
| 18 | Fixed | Footer hill raised 64 px in both states; the edge is gone |
| 19 | Fixed | The marker on the sky is green-900 |
| 20 | Partly | "My part" / "What I owned" is now the second row in every card. Values and Work still share the hairline-row pattern: changing one is a design choice for the owner |
| 21 | Fixed | 11 px to 12 px. Hanken 15/17/19 to 16/18. Epilogue 24/36/56 to 22/34/60. The Experience headlines stay 44 (48 broke them into three lines). Scale: Hanken 14/16/18/20, Epilogue 22/34/44/60/300, Plex Mono 12/13/14/20 |
| 22 | Fixed | The footer statement wraps inside the gutter. The ghost name moved down 24 px |
| 23 | Fixed | "See the project" aligned in both card pairs |
| P3 | Fixed | Date ranges use a closed en dash ("2022–2023"). Hidden leftover layers deleted (they were hidden, so the earlier "visible" note was wrong: hygiene only). Stray top hairline in Experience removed. Inside hint arrow is ↑. The Outside headline breaks into two lines (intro 660 wide). The contact headline box is 900 wide |
| P3 | Not applied | Lens spec frames still show "EN / ES". Choir photo, Elsewhere social posts and the Tranqui navy cover are owner content questions. Placeholders stay in task 3.14 |

Correction to the audit: the hero dash is an em dash in the source. Epilogue simply draws it short, so the finding about dashes in the hero was wrong.

## Open questions for the owner

1. ~~Should Inside rewrite every section, or only add a layer of annotations?~~ Resolved 2026-11-16 (proposal D18): Inside is the technical version for a technical audience, and every section rewrites its copy. This makes finding 15 a copy rewrite.
2. ~~Does Inspiration Garden belong in Selected work (D13 removed it) when Values cites it three times?~~ No (owner, 2026-11-16).

## Owner answers and v3.3 (2026-11-16)

The owner answered **no** to every question left open above. That settles:

| # | Question | Outcome |
|---|---|---|
| 7 / task 3.25 | Bring the hero "Look inside" button back? | No. It stays removed; the lens and the hint are the only triggers |
| 9 | Change the lens icon? | No. The magnifier stays; the hover pill (v3.3) says what it does |
| 14 | Replace the value 02 proof? | No. The current proofs stay |
| 15 | Add a tool per role in Experience? | No. The narrowed headline stays |
| 20 | Vary the Values or Work pattern? | No. Both keep the hairline rows |
| P3 | Replace the choir photo, drop Elsewhere, change the Tranqui cover? | No. All stay |
| Q2 | Inspiration Garden back in Selected work? | No |

Applied on v3.3 (Outside `2162:74`, Inside `2162:444`) after re-reading this audit:

- P3 "Lens spec frames still show EN / ES": fixed. The three state mocks in `2109:103` now show EN / ES / PT, the nav Work · Experience · Notes, and no "Look inside" button.
- The v3.3 annotation restyle had dropped labels to 11 px, against finding 21 (12 px minimum for mono). Back to 12 px; a scan of the Inside board finds no text under 12 px.
- Findings 10–12 are superseded by the v3.3 rule in `design.md` (pin on the target's bound, label in free space, redundant annotations removed).

Still open, not design decisions: placeholders (task 3.14), the [Draft] Inside copy and the [Owner] Viora rows (both need the owner's content), and finding 8 (WCAG 2.1.4, for implementation). The state mocks inside the Lens spec are illustrations: their hero headline still breaks into three lines and their Inside annotations use the old sun style; the boards are the reference.
