# Home Inside and chat — WORK IN PROGRESS, NOT VERIFIED

## Boards built
Figma page `As built · Home Inside & chat` (`2449:3558`). The following are clones. Chat 01, 02 and 03 have been adapted and visually compared; the other boards remain **work in progress** and are not audit-ready.

| Clone | Width | Approved source |
|---|---:|---|
| `2449:3559` Home Inside desktop | 1440 | `2191:503` |
| `2449:4195` Home Inside tablet | 768 | `2213:86` |
| `2449:5702` Home Inside mobile | 390 | `2212:86` |
| `2449:7204` Chat 01 | 390 | `2353:103` |
| `2449:7244` Chat 02 | 390 | `2353:135` |
| `2449:7283` Chat 03 | 390 | `2354:132` |
| `2449:7346` Chat 04 | 390 | `2354:194` |
| `2449:7408` Chat 05 | 390 | `2354:245` |
| `2449:7465` Chat 06 | 390 | `2354:320` |
| `2449:7534` Chat 02 desktop | 1440 | `2358:226` |
| `2449:7610` Chat 02 tablet | 768 | `2358:302` |

Home clones have 57 text replacements based on site DOM, but need layout, imagery and complete copy reconciled. Chat 01, 02 and 03 mobile were adapted with Inside colors, profile photo, landscape and conversation content, then screenshot-compared and captioned. Typing was captured live without reduced motion; fixed-navigation position differed during the transient capture. Chat 04–06 and the desktop/tablet conversation clones are unchanged. The originals were not modified.

## Preliminary differences (not a complete per-board inventory)
| Section | Approved board | Site now |
|---|---|---|
| Home values heading | The same three promises, traced to the repo. [Draft] | How each promise was built. |
| Work link | See all projects · [N] → | See all projects · 17 → |
| Viora / Mink’a / Tranqui | Draft technical descriptions | Substantially expanded verified ownership, stack and decision copy |
| Experience heading | The skills under each role [Draft] | What each job left in my toolkit |
| Notes heading | How a post gets here [Draft] | Notes on building things |
| Contact heading | Read the source, then let’s talk about your team. [Draft] | You've seen how I build. What should we build together? |
| Chat mobile | Outside colors and JT avatar | Inside palette, profile photograph and different conversation history; sticky nav and Inside annotation visible |

## Screens with no previous board
Not fully inventoried. The live mobile hiring flow was walked from idle composer through intent, name, company, detail, email and summary. Screenshots and DOM logs are under `scratchpad/work-home-in/`. Sending, sent and error states have not been drawn from code. **The final send button was not pressed.**

## Defects seen (not fixed)
Not assessed comprehensively.

## Anything not matched and why
The task remains incomplete: complete per-board inventory, Home responsive layouts and assets, remaining chat states, captions and screenshot checks are outstanding. Captures use `/usr/bin/chromium`, wait for `document.fonts.ready`, remove the Astro toolbar and use requested viewport heights. Node Playwright screenshot workaround works; the prior screenshot-path blocker is resolved. Current site and Figma images are in `scratchpad/work-home-in/`, including `chat-detail.png` and `figma-chat-detail-v5.png`. Do not treat the working page as an audit-ready baseline.
