# section-glow-transitions

Objective: golden-hour glow transitions on Home, hero → "02 What you get" and into Contact (CTA), built with GSAP + ScrollTrigger. Branch `feat/section-glow-transitions` from `develop`. Delivery: ask-on-risk. Checks: `npm run check`; visual proof in the browser (dev server 127.0.0.1:4321).

## Specs

- S1 Reference: `docs/transicion gsap.mp4` (a dark planet limb rises and flattens over a light hero, a dark section holds, then the limb leaves as a sunrise glow at the top of a light section). Take the mechanism (a curved edge of light that rises and flattens as you scroll), not the look. Owner: "no copiar exactamente porque quedaría huachafo".
- S2 Hero → "02 What you get": a golden-hour glow, not the hill. Owner, verbatim: "preferiría que en vez de que la loma tome protagonismo, lo sea un resplandor tipo golden hour o algo así… la transición de referencia es rápida y fluida, por eso creo que algo tipo resplandor sirve bien para transicionar porque la siguiente sección tiene colores claros, y la pantalla no se oscurecería innecesariamente." A curved band of light rises from the hero's bottom edge (sun yellow at the rim → amber → transparent), flattens and opens as it rises, and washes into the cream of section 02.
- S3 Entry into Contact (CTA): the same device reversed: a glow descends and dissolves into the Contact sky, like a sunrise arriving at the "let's talk" section. Owner: "me gustaría usarla para la transición del hero a la siguiente sección y para entrar a la sección del cta".
- S4 Fast and fluid: no pinning, no hold; at most about half a viewport of scroll per transition; scrubbed to scroll.
- S5 Inside lens: the glow becomes a cool, more restrained `green-300` rim (no golden hour Inside).
- S6 `prefers-reduced-motion: reduce`: no scroll-driven glow; sections meet with a clean cut. GSAP with ScrollTrigger (owner: "hazlo con gsap, aprovechemos que tenemos herramientas que nos van a facilitar las cosas"); gsap 3.15.1 pinned exactly (307165e).

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T1 | S1–S6 | delegated (Codex agent `glow` in Herdr), then inline by parent (owner: "encárgate tú") | done | see L5 |

## Log

- L1 (2026-11-19, owner, verbatim): "quedó perfecto. mergea la rama en develop. local. y luego ve a docs que te dejé un video de una transición con gsap que vi y quisiera que tengamos nuestra propia versión (no copiar exactamente porque quedaría huachafo). me gustaría usarla para la transición del hero a la siguiente sección y para entrar a la sección del cta"
- L2: the hill-swallows-the-view proposal was rejected (see S2 quote). Agreed: glow, short, light-only.
- L3 (owner): "vava. hazlo con gsap, aprovechemos que tenemos herramientas que nos van a facilitar las cosas". Dependency added: gsap 3.15.1 (published 2026-11-04, Standard no-charge license). Risk item 5 (dependency).
- L4: Codex rounds 1–3 could not see the result (sandbox had no browser/dev server): layer 0×0, layer inside a <script>, then a floating ring over the hero. Owner, verbatim: "pos, más o menos. ya se ve el resplandor, pero no sirve de transición. encárgate tú".
- L5: parent rebuilt it inline. Key idea: what moves is the incoming section's surface (like the planet in the reference), the glow is only its rim. Rise = Values' --color-bg ellipse climbing 80vh over the hero (Values top 85%→35%, yPercent 0→-60, scaleX 1→2.2, scrub 0.3); descend = Notes' --color-surface lifting off Contact (top 100%→50%, yPercent -90→-150, scaleX 2.4→1.1). Seams removed by fading the sections' [data-backgrounds] over 240px at the meeting edge. Browser-checked at 1440×900 (Outside, Inside) and 390×844; no horizontal scroll. `npm run check` passed.
- L6 (owner): "el problema es que la transición se activa recién al estar en ese paso del scroll". Cause: the shape travelled ~360px under the Values mask before its rim showed. Fix: rim starts on the seam, trigger 'top 100%' → 'top 30%', yPercent 0 → -55. Checked at 1855×989 (owner's size): glow at scrollY 120, full cream with no seam at 720.
- L7 (owner): "en el primer paso del scroll se pueden ver en las esquinas inferiores los bordes rectos de las imágenes". Fix: initial scaleX 1.8 (end 3) so the curve spans the corners, shape top 300px above the layer bottom so the bright rim sits on the seam. Checked at 1855×989: rest shows only a faint golden haze on the grass; at scrollY 40 the straight edge is covered across the full width.
- L8 (owner): "pero ahora en el hero aparece el resplandor". Fix: rise shape opacity 0 at rest, 1 by ~6% of the scrub (≈40px at 1855×989; measured 0 / 0.48 / 0.96 / 1 at scrollY 0 / 20 / 40 / 120), same geometry as L7.
- L9 (2026-11-20): closed. Merged into develop (`1848155`) and shipped in v1.2.0 (`479e169`). Values recorded in portfolio-implementation design.md §7 (`d976f68`).
