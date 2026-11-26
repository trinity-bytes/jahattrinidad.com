# Phase 3 — Work and projects

## Progress

In progress. Page `Proposed · Work & projects` (`2520:22`) is immediately after the As built page. `Page components` section: `2520:23`.

### Page components

| ID | Name | Variants | Findings | Status |
|---|---|---|---|---|
| `2520:29` | Mock browser bar | None yet | WK-31 (intended); mobile legibility | Draft; used in the card. Mobile hostname hiding still needs a variant; not verified at 390. |
| `2520:50` | Project card / More | None yet | WK-03, WK-04, WK-06, WK-07, WK-31 (intended) | Draft; desktop screenshot inspected after the hostname and action-row correction. Needs adaptive sizing and a baseline comparison. |
| `2520:1658` | Project card / Featured | None yet | WK-03 proposal, WK-09 (intended) | Draft; Viora desktop screenshot inspected. Text properties added afterward; responsive layout and baseline comparison remain. |
| `2522:481` | Project card / More · Mobile | None yet | WK-03 proposal, WK-04, WK-06, WK-07, WK-31 (intended) | Draft; mobile screenshot inspected after applying breakpoint and grouping external links. Still needs baseline comparison and integration. |
| `2522:39` | Experiment tile | Default, Peek | WK-01, WK-11 (intended) | Draft; both 300 px states screenshotted. Default and Peek states inspected; stats use page-local vector icons and action/caption share a row. Used on checked Work and peek boards. |
| `2522:449` | Project hero / Desktop | None yet | WK-20 (intended) | Draft; TourBench screenshot inspected. Responsive variants and baseline comparison remain. |
| `2522:840` | At a glance fact | None | WK-26 proposal | Checked in TourBench 1440; page-local 20/30 text style `Work/At a glance value`. |
| `2522:843` | Step card | None | WK-18, WK-21 proposal, WK-22 | Checked in TourBench 1440 with equal-height dark formula cards. |
| `2522:848` | Next project / Desktop | None yet | WK-17, WK-19 proposal, WK-20 (intended) | Draft; screenshot inspected. Responsive variants and baseline comparison remain. |
| `2522:1282` | Work hero / Desktop | None yet | SY-12 outstanding | Draft; uses baseline art and text. Compared as part of the WIP desktop board. |
| `2522:1429` | Project card / Featured · Mobile | None yet | WK-03 proposal | Draft; mobile screenshot inspected. |
| `2522:1506` | Project card / Featured · Paired | None yet | WK-03 proposal, WK-09 intended | Draft; screenshot inspected and used on the WIP desktop board. |
| `2523:2246` | Project card / Featured · Reverse | None yet | WK-03 proposal, WK-09 intended | Draft; restores Garden’s image-right layout on the WIP board; final screenshot remains. |

### Boards

| Board | Node | Width | Modes | Check result |
|---|---|---:|---|---|
| Proposed · Work index · 1440 | `2522:1526` | 1440 | Outside / Desktop 1440 | **Checked**, screenshot compared with `2470:870`; narrow card titles fixed, Garden’s reversed layout and baseline artwork restored, contact marker corrected. Page-level solid colors, nonzero auto-layout gaps/padding and four corner bindings were audited; no page-level gaps except inherited Footer geometry. Shared design-system binding exceptions are listed below. SY-12: proposal: text-shadow on the display word in code (audit SY-12); baseline art retained per supervisor. Caption `2523:2423`. |

| Proposed · Experiments peek · 1440 | `2524:2560` | 1440 | Outside / Desktop 1440 (tiles use dark surface) | **Checked** against `2471:840`: side-by-side states both 300 px; three-line peek clamp; vector star and git-fork; image caption and action on one baseline. No page-level binding gaps found. Caption `2524:2686`. |

| Proposed · TourBench · 1440 | `2524:2790` | 1440 | Outside / Desktop 1440 | **Checked** against `2471:903`; screenshot rechecked after balancing the third step heading, restoring dark formula cards and applying 20/30 facts. WK-19/21/26 are proposals. Page-level bindings verified with the existing shared Footer geometry exception. Caption `2526:1122`. |

Seven boards remain unbuilt: Inspiration Garden 1440/768/390, TourBench 768/390, and Work index 768/390. Next: Inspiration Garden 1440.

### Findings

WK-01, WK-03–WK-09, WK-15, WK-30 and WK-31 have draft treatments on the WIP desktop board, not yet signed off; WK-03 is a proposal. WK-10 and WK-11 are drawn on the checked peek board (`2524:2560`). WK-02, WK-12–WK-14 and WK-16 need state/behavior classification and verification; WK-17–WK-23 and WK-28/29 are drawn on TourBench 1440; WK-19/21/26 remain proposals. WK-18 and WK-24 also require code. Remaining WK-24–WK-32 cases need board-by-board classification. Consult `audit-work.md`; behavior-only items must be reported as code and owner decisions as proposals.

### Requests for the design system

A page-local 20/30 `Work/At a glance value` text style was created for WK-26; request promotion to the shared system. WK-10 uses page-local vector star and git-fork icons (`2524:2493`, `2524:2500`); request shared equivalents. The original experiment title is mono, while the existing design system has no matching mono heading style; this proposal uses Heading/H3 and requests system-owner review. SY-12: proposal: text-shadow on the display word in code (audit SY-12). Keep the baked baseline art per supervisor. Binding audit: shared NavLink/Button use some literal padding (8/14/22), LangSwitch uses 6/13.5, and Footer has 152 px top padding; no exact tokens exist for several values. Footer’s image-filled Jahat is decorative artwork with no text style. Request system-owner review; do not edit the shared Design system page from this unit.

### Open questions

WK-03, WK-19, WK-21 and WK-26 require owner decisions; draw the audit recommendations as proposals.
