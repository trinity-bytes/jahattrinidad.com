# hero-nav-refresh

Objective: implement the 2026-11-19 approved design changes (Home desktop hero viewport fit, mobile menu v2, nav state triggers and transitions). Branch `feat/hero-nav-refresh` from `develop`. Delivery: ask-on-risk. Checks: `npm run check` (boundaries, `node --test`, `astro check`, build).

## Specs

Source of truth for values: `openspec/changes/portfolio-visual-design/design.md` (§5 Hero composition, "Nav (D19)" + "Logo on Home" implementation notes, "Mobile menu open state (task 4.5)" section). Figma file `gq6glEp9QrPOnEyYG9dldh`.

- S1 Home desktop hero (≥ 64.0625rem) matches the approved 1440 × 900 geometry in design.md §5 on both lenses: sky, display name (Epilogue Medium 270, −4%), near hill (−38, −120, 1774 × 1264), portrait (877, 85, 543 × 815), intro 660 wide; the hero is 900 tall at 1440 × 900. Inside annotations follow the layers. The name annotation note says 270 px in en, es and pt. Owner: "lo ajuste para que pueda ocupar todo el viewport".
- S2 Nav Scrolled (glass) state starts as soon as the page scrolls, not when the hero leaves. Owner: "necesito que el navbar se ancle al momento de empezar el scroll. esto es porque al bajar aún por el hero, el contraste es pésimo".
- S3 On Home only, the nav logo is hidden while the display name `#hero-name` is on screen and appears once it leaves; every other page keeps the logo; same in Outside and Inside; hidden with `visibility: hidden` (out of tab order). Owner: "siento que es muy redundante tener mi nombre 2 veces en la interfaz".
- S4 The nav state transitions are very smooth. Owner: "quiero esa transición de estados del navbar muy smoooooooth". Reduced motion: no movement, short fade only.
- S5 Mobile menu sheet v2: links → language segmented control (English / Español / Português, 44 tall) right after Notes → footer (availability, then five 44 px circular brand-icon buttons with aria-labels; no "ELSEWHERE" label); spacing 108 / 20 / 40 padding, 40 links→language, 56 language→footer, 20 inside the footer. Owner: "cambiar los nombres de las redes sociales por botones con sus iconos. y el selector de idioma hacerlo más accesible… luego de 'notes' y antes del 'open to internships'".
- S6 The desktop hero fills the viewport height: `clamp(840px, 100svh, 1250px)`, ground layers anchored to the bottom, intro to the top; no regression of the sky at wide screens. Owner: "pero el hero aún no ocupa todo el viewport".

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T1 | S1 | delegated (Codex writer A, parallel unit: Hero.astro + dictionaries) | done | 538439c |
| T2 | S2, S3, S4, S5 | delegated (Codex writer B, parallel unit: Nav.astro) | done | e2561ff |
| T3 | S1, S6 | delegated (Codex agent `hero-fix` in Herdr) + parent fixes | done | see L8 |

## Log

- L1 (2026-11-19, owner, verbatim): "va. si. luego aplicas los cambios usando subagentes de codex y levantas un server local para ir viendo los cambios. jito: quiero esa transicion de estados del navbar muy smoooooooth, entiendes: B)"
- L2: route — the owner asked for Codex subagents; two independent units with disjoint edit surfaces (hero vs nav) run in parallel. T2 observes `#hero-name` (already in Hero.astro), so it needs no hero edit.
- L3: design decisions committed in 8b71618.
- L4: both writers passed boundaries + `npm test`. Parent seam check: `npm run check` passed (22 tests, 0 astro check errors, 25 pages built).
- L5: parent browser check at 1440×900 and 390×844 (dev server 127.0.0.1:4321): hero matches the board; glass at scrollY 8; Home logo hidden until #hero-name leaves (visible at 820, hidden again at 0); logo visible with the menu open; sheet matches v2. Fix by parent: the Inside portrait annotation pin followed the portrait up to y 315 and overlapped the sub; desktop pin now at y 420 (`--portrait-label-y`).
- L6: transitions — 240 ms in / 180 ms out, one ease-out curve, opacity + transform only; reduced motion fades only. Feel to be judged by the owner.
- L7 (2026-11-19, owner, verbatim): "va. peor el hero aun no ocupa todo el viewport". Reproduced at 1920 × 1080: hero 900 tall. Also found a regression from 538439c: at 1920 the sky is 2657 wide at y −643, the sun and far hills are hidden (8b71618 shows them). Floor 840 keeps a 55 px CTA → name gap; cap 1250 is what the sky image covers at 1440.
- L8: T3 committed. First headless `codex exec` hung on stdin; owner: "en adelante lanza agentes codex solo a través de herdr". Rerun as Herdr agent `hero-fix` (sandbox could not reach the dev server, so no browser proof from it). Parent browser check: 1920×1080 and 2560×1440 fill the viewport with sun and far hills back; 1440×780 showed the head under the nav links → portrait top clamped at max(85px, H − 815px), which also made the label transform workaround unnecessary; Inside hill label overlapped the hint at 1920 → pin x anchored to the edge (edge + 419). `npm run check` passed. Open: at 2560×1440 the portrait looks small in a 1250 hero (owner to judge).
- L9 (2026-11-20): closed. Merged into develop (`d20fe5d`) and shipped in v1.2.0 (`479e169`). Values recorded in openspec portfolio-visual-design design.md §5 and portfolio-implementation design.md §7 (`d976f68`).
