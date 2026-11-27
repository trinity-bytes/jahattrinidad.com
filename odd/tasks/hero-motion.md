# hero-motion

Objective: Home hero load animation and scroll parallax, then the lens reveal and idle shake. Branch `feat/hero-motion` (from `feat/section-glow-transitions`, which brought GSAP). Built inline by the parent (motion is tuned in the browser). Checks: `npm run check`; Playwright timing samples, CPU throttling ×6.

## Specs

- S1 Load choreography and parallax. Proposal accepted: "a ver. probemos". Depth by lag: sky slowest, name less, hill and portrait with the page; the name rises from behind the hill on load.
- S2 No green frame on load; reveal from the sun. Owner, verbatim: "me chirría un poco que hay un frame en el que la pantalla es verde. qué tal si la transición es un círculo aprox el tamaño del sol que más o menos aparezca desde la ubicación del sol y se agrande con velocidad tipo curva de aceleración/desaceleración estilo After Effects. y que en eso que el círculo va creciendo van apareciendo los elementos a medida que hay espacio en el círculo para que sean visibles".
- S3 The portrait entrance must read. Owner: "me encanta pero no se aprecia la animación de la foto".
- S4 Inside annotations follow the parallax (raised by the parent; owner: "¿qué pasaba con el inside?").
- S5 Outside hero without the marker/hint line; the lens shakes gently every few seconds until clicked so the visitor hovers it and reads its hint; the lens switch reveals circularly from the lens (click or dropped x-ray), "es básicamente repetir la transición inicial solo que para revelar el inside. más elegante". The lens must be revealed by the load, not visible from frame 1.

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T1 | S1 | inline | done | 4cec7ee |
| T2 | S2 | inline | done | bbeda8e |
| T3 | S3 | inline | done | 76fe180 |
| T4 | S4 | inline | done | 80c03c4 |
| T5 | S5 | inline | done | a1893d8, 60b44d2, 821d4aa, 6d6669b |

## Log

- L1: GSAP read the CSS starting translateY(55%) as a px y and kept the name 136px low; fixed with y: 0 explicit.
- L2: the green frame was the hero's own fill shown before the sky decoded; the hero now starts clipped to a sun-sized circle and opens after the sky decodes (≤ 0.7s).
- L3: the portrait went 0 → 0.93 opacity in 300ms with expo.out; now y 160 → 0 over 1.6s power3.out starting when the circle touches it.
- L4: the shake was a pure rotation of a round button (invisible) → side-to-side translate; first shake fired on a fixed 3.8s timer while the lens could still be invisible on the owner's slower machine → starts 1.2s after `hero-intro-done`, each shake restarts the attribute. Owner diagnostic confirmed no hover/focus/stored flag. Owner: "ya está funcionando con normalidad".
- L5 (2026-11-20): merged into develop (`8ad6af3`), shipped in v1.2.0 (`479e169`). Values in portfolio-implementation design.md §7 (`d976f68`).
