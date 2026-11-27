# Runbook: As-built boards from the live DOM

> Portable version (2026-11-25): read `../proposal.md` "Continue from another clone" for prerequisites. Set `REPO_ROOT` (sharp) and, if needed, `CHROMIUM`. `<scratch>/work-work2` means any scratch folder where you copied these tools. The extracted images and `site.png` files from the first session are gone: re-run `extract.cjs` before uploading images or checking.


Figma file `gq6glEp9QrPOnEyYG9dldh`, page `As built · Work & projects` = `2446:60`.
Write only to that page. Do not edit the repo. Do not start or stop the dev server (http://127.0.0.1:4321).
Before any Figma call: load skill `figma-use` (`skill://figma/figma-use/SKILL.md`) and call `create_session`.

## Status (2026-11-25, first session — superseded: current state per board is in `../tasks.md` and `../reports/work.md` "Checks")

| Key | Board | Node | Images uploaded | Checked |
|---|---|---|---|---|
| w1440 | Work index 1440 | 2470:870 (caption 2470:1284) | yes | PASS: diff 2.05%, 3 of 6 side-by-side slices viewed (0, 2, 4) |
| w768 | Work index 768 | 2471:12 | yes | NO |
| w390 | Work index 390 | 2471:428 | yes | NO |
| peek | Experiments peek on hover 1440 | 2471:840 | yes | NO |
| t1440 | TourBench 1440 | 2471:903 | yes | NO |
| t768 | TourBench 768 | 2471:1100 | yes | NO |
| t390 | TourBench 390 | 2471:1297 | yes | NO |
| g1440 | Inspiration Garden 1440 | 2471:1541 | NO (grey rectangles) | NO |
| g768 | Inspiration Garden 768 | 2471:1934 | NO | NO |
| g390 | Inspiration Garden 390 | 2471:2335 | NO | NO |

All 10 boards exist, named and captioned. The old WIP clones (2446:*, 2449:*) were deleted.

## Tool fixes 2026-11-25

| Problem | Fix |
|---|---|
| CSS `monospace` became Inter | `builder.js` maps any other monospace family to Cousine; italic runs use the Italic style (`extract.cjs` records `it`) |
| Input placeholder with `text-overflow: ellipsis` came out in full | `extract.cjs` truncates it with "…" to the input's content width (measured on a canvas; textareas are left alone) |
| `<img>` radius and shadow were lost | `extract.cjs` records `r` and `sh` for images that are not clipped; `builder.js` applies them. A radius or shadow on a wrapper, or on a clipped image, is still not applied to the image node |
| 1 px light seam under a section with a fractional y | `builder.js` places each plate on the whole pixel it was cut from (`r.y = pl.y + Math.round(g.y) - g.y`) |
| `adiff.cjs` window too small for environment drift | Offsets −4…+12 px |

The italic flag, placeholder and image radius/shadow fixes were checked on a new extraction of TourBench 390 and Garden 390 (data only). The plate fix and the image radius were used to build Home Outside 768 and 390; Home has no CSS `monospace` text, so the Cousine mapping has not run in a Figma build yet. The Work boards were patched by hand and were not rebuilt.

Still manual:

- **CSS `::before` / `::after` text** is not extracted: `extract.cjs` walks DOM nodes only, and the glyph is not in the plate when its colour follows the element's text fill. Compare side by side and add it by hand (Home 768: seven `.organisation::before` "·" separators, cloned from the organisation text node at the pseudo-element's x).
- **Name outline over the portrait** (Home hero, both lenses): it is drawn above the portrait on the site and ends up under it on the board. Replace the portrait fill with the site's pixels masked to the portrait alpha (`site.png` crop at the image box + the alpha of `i0.png`; transparent below the hero).
- **Confirm an image re-upload**: one `up2.sh` replacement printed `done` but the node kept its old fill. Compare the `imageHash` in the response (or the node's fill hash) with `sha1sum <file>`.
- **Blank images in `site.png`**: it happened once (Garden 768). Capture a second reference with a second screenshot pass before blaming the board.

## Home Outside boards (page `As built · Home Outside` `2449:12`, built 2026-11-25)

`node extract.cjs home <width> ho<width>`, `PAGE_ID = '2449:12'`, `BOARD_Y = 100`.

| Key | Board | Node (caption) | Source | x | Check (`diff.cjs`) |
|---|---|---|---|---|---|
| ho768 | As built · Home v3.5 OUTSIDE · TABLET 768 · 768 | 2487:61 (2487:348) | 2211:86 | 6900 | 2.41 %, worst band 5.1 % |
| ho390 | As built · Home v3.5 OUTSIDE · MOBILE 390 · 390 | 2487:349 (2487:631) | 2210:86 | 7770 | 4.01 %, worst band 7.0 % (provisional 390 rule) |

## Remaining work

1. Upload the Garden images into the EXISTING boards (do not rebuild). Use step 4 with these maps (`key=nodeId`).
   `pN` = `<dir>/pN.jpg`, `iN` = `<dir>/iN.png`.
   - g1440: p0=2471:1543 p1=2471:1560 p2=2471:1561 p3=2471:1562 i0=2471:1567 i1=2471:1575 i2=2471:1578 i3=2471:1581 i4=2471:1591 i5=2471:1592 i6=2471:1597 p4=2471:1823 i7=2471:1825 p5=2471:1845 p6=2471:1882
   - g768: p0=2471:1936 p1=2471:1953 p2=2471:1954 p3=2471:1955 i0=2471:1960 i1=2471:1968 i2=2471:1971 i3=2471:1974 i4=2471:1984 i5=2471:1985 i6=2471:1990 p4=2471:2224 i7=2471:2226 p5=2471:2246 p6=2471:2283
   - g390: p0=2471:2337 p1=2471:2354 p2=2471:2355 p3=2471:2356 i0=2471:2361 i1=2471:2369 i2=2471:2372 i3=2471:2375 i4=2471:2385 i5=2471:2386 i6=2471:2391 p4=2471:2625 i7=2471:2627 p5=2471:2647 p6=2471:2684
2. Run step 6 (check) on the 9 unchecked boards.
3. Write the report `../reports/work2.md` (structure: end of `../prompts/common.md`). See "Report notes" below.

## Build one board from scratch (only if a board must be redone)

```
cd <scratch>/work-work2
export NODE_PATH=<global playwright node_modules, e.g. $(npm root -g)/@playwright/mcp/node_modules>
```

### 1. Capture and extract (one script does both)
`node extract.cjs <slug> <width> <dir>`
- Example: `node extract.cjs work/inspiration-garden 768 g768`
- Slugs: `work`, `work/tourbench`, `work/inspiration-garden`. Widths: 1440, 768, 390.
- It uses /usr/bin/chromium, waits for fonts, removes the Astro toolbar.
- Output in `<dir>/`: `site.png` (reference capture), `plate.png`, `data.json`, `pN.jpg` (background slices), `iN.png` (content images).
- `cap.cjs` and `measure.cjs` are earlier helpers; they are not needed.

Peek only: `node extract.cjs work 1440 peek peek`. The output must then be cropped to the experiments area (done with a one-off script: crop from 80 px above the "03 — SMALL EXPERIMENTS" label, then 30 px more to remove the sticky nav; shift item y values). The current `peek/` is already cropped: files `p0b.jpg`, `i14.png`, reference `site-peek.png`. Do not re-extract unless necessary.

### 2. Make the payload
`node payload.cjs <dir> "<board name>" "<source board>" <x>`

| dir | name | source | x |
|---|---|---|---|
| w1440 | As built · Work index · 1440 | 2239:17 | 0 |
| w768 | As built · Work index · TABLET 768 · 768 | 2247:2 | 1640 |
| w390 | As built · Work index · MOBILE 390 · 390 | 2248:2 | 2608 |
| peek | As built · Small experiments · peek on hover · 1440 | 2442:12 | 3198 |
| t1440 | As built · Project page · TourBench · 1440 | 2443:12 | 4838 |
| t768 | As built · Project page · TourBench · TABLET 768 · 768 | none at this width (desktop 2443:12) | 6478 |
| t390 | As built · Project page · TourBench · MOBILE 390 · 390 | none at this width (desktop 2443:12) | 7446 |
| g1440 | As built · Case study · Inspiration Garden · 1440 | 2298:2 | 8036 |
| g768 | As built · Case study · Inspiration Garden · TABLET 768 · 768 | 2312:2 | 9676 |
| g390 | As built · Case study · Inspiration Garden · MOBILE 390 · 390 | 2312:1330 | 10644 |

Naming and caption are automatic (caption = source, 2026-11-25, commit 5a0977a).

### 3. Send the payload to Figma
a. Call `upload_assets` with `fileKey`, `currentPageId: "2446:60"`, `count: 1` (no nodeIds).
b. POST to the returned submitUrl (expires in 10 minutes, single use):
   `curl -s -F "file=@payload-<dir>.svg;type=image/svg+xml" "<submitUrl>"`
   Expect `"success":true`. Figma keeps the data as a layer name; the builder reads it and deletes the holder.

### 4. Build, then upload images
a. If redoing a board, delete the old board and its caption first (use_figma: `(await figma.getNodeByIdAsync(ID)).remove()`).
b. Call `use_figma` with the full text of `builder.js` as `code`. Change only `KEYS` (e.g. `['g768']`); `PAGE_ID` and `BOARD_Y` stay. Name, x and caption come from the payload. `n` in the result must be 0. At most about 6 keys per call.
c. From the result `imgs`, call `upload_assets` with `fileKey`, `count: <number of pairs, max 60>`, `nodeIds: [ids in a chosen order]`. The returned URLs follow the same order.
d. Feed `path uploadId` lines to `up2.sh` (uploadId = the UUID in the submitUrl), in the work-work2 directory:
```
bash up2.sh <<'EOF'
g768/p0.jpg <uuid for p0's node>
g768/i0.png <uuid for i0's node>
EOF
```
It prints only failures, then `done`. Check that each path matches its targetNodeId before running.

### 6. Check
a. `get_screenshot` of the board node with `maxDimension: 14500`; download: `curl -fsL -o f-<dir>.png "<image_url>"`. The returned width/height must equal the board size (not downscaled).
b. `node diff.cjs f-<dir>.png <dir>/site.png` (peek: `peek/site-peek.png`). Prints both sizes, total diff % (pixels with summed RGB delta > 60) and diff per 500 px band.
c. Pass: same dimensions, total <= 3%, no band above 8%. This threshold is a working proposal; only w1440 has been measured (2.05%, worst band 3.9%). Narrow widths may score higher because text covers more area.
d. Always look too: `node sbs.cjs f-<dir>.png <dir>/site.png s-<dir> 1500` (use a slice height near 1000 for 390). Left = Figma, right = site, files `s-<dir>-N.png`. Read every slice. Look for missing or doubled text, wrong wraps, covered elements, grey rectangles, wrong z-order (items hidden under an image or the next section's plate).
e. Fix small problems directly on the board with use_figma; if systematic, fix `extract.cjs` or `builder.js` and rebuild.

## Report notes (include these)
- Method deviation from common.md: boards are NOT edited clones of the approved boards. Codex's clones were deleted and each board was generated from the live DOM: a locked background "plate" per section (site render with content hidden: gradients, landscape, grain, bytes, display words, footer ghost name, some pseudo-element lines) plus editable text, rectangles, icons and images on top. No component instances and no auto layout.
- Known minor differences on w1440: the "● ● ●" glyphs are scaled to 0.8; the "See the project" underline is slightly lighter.
- Copy differences, approved vs site, seen so far: Work hero lost "[Draft]"; More projects now starts with ASM8 and includes Portfolio and TourBench; Small experiments are Lock Keys OSD, Coursera Clone Web Services, GitHub Profile README, Forest Hero; footer external links have up-right arrows; "More experiments on GitHub" has an external arrow; contact chip reads "I'm hiring". TourBench desktop differs strongly from proposal 2443:12 (other hero image and layout, overview shot over the hero then At a glance, next project is a large ASM8 card, buttons "Open the project" / "Source on GitHub"). The per-section difference table and "Defects seen" still need to be written.
- The measured site spec in `../spec/` can help write the difference tables.
