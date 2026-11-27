# Common brief — design audit, phase 1 (as-built Figma baseline)

You are a worker agent. A supervisor (another Claude session) gave you one task in a separate brief. Work until that task is fully done; do not end your turn with partial work or to ask for permission to continue. If you are truly blocked (missing access, a decision that is not yours), write the blocker into your report file and stop.

## Read first (in this order)

Repo: `<repo>` (branch `develop`).

1. `openspec/changes/design-audit/proposal.md` — why, decisions A1–A7, methods, the pass rule (including the provisional 390 rule), tooling facts.
2. `openspec/changes/design-audit/tasks.md` — your task's section.
3. `openspec/changes/design-audit/tools/RUNBOOK.md` — how the DOM pipeline tools work.
4. The report files your task brief names.

## Environment (already set up — do not change it)

- Dev server is running at `http://127.0.0.1:4321/`. Do not start, stop or restart it.
- Chromium: `/usr/bin/chromium` (Chromium 156, headless works; there is no display).
- Run node tools with: `export REPO_ROOT=<repo> NODE_PATH=$(npm root -g)`.
- Your scratch folder is given in your task brief. `tools/` is already copied there. Work only there for generated files (PNGs, payloads). Never write generated files into the repo.
- **Environment drift:** the existing boards were built on another machine. A new capture here renders some pages a few px taller (about 1 px per card row). To re-check an EXISTING board use `node adiff.cjs <figma.png> <site.png>` (row-aligned diff) besides `diff.cjs`; report both numbers. Boards you build from scratch here use plain `diff.cjs`.
- Captures: viewports 1440×900, 768×1024, 390×844; `reducedMotion: 'reduce'`; wait for `document.fonts.ready`; scroll the page once; remove `astro-dev-toolbar`. `extract.cjs` already does this and writes `<dir>/site.png`.

## Figma

- File key `gq6glEp9QrPOnEyYG9dldh`. Call `create_session` once before any Figma call, reuse the session id.
- Before any `use_figma` call, read the `figma-use` skill (MCP resource `skill://figma/figma-use/SKILL.md`), pass `skillNames: "resource:figma-use"`.
- Write ONLY on the page your brief names. Never touch the approved boards or other pages. Never delete a board unless the brief says so.
- Screenshot a board with `get_screenshot` (`maxDimension: 14500`), download with `curl -fsL -o <file> "<image_url>"`; its width/height must equal the board size.
- Images into existing nodes: `upload_assets` with `nodeIds`, then POST bytes (see `tools/up2.sh`). Check every path ↔ node pair before posting.

## Hard rules

- Never press the chat's "Looks good, send it" button; never send any request to web3forms.
- Do not edit repository files except the ones listed under "Allowed edit surfaces" in your brief. No git commands that change state (no add, commit, checkout, stash, reset).
- The site wins (decision A2): copy defects as they are; list them, never fix them in the board.
- Do not install packages, do not run formatters.
- Write technical artifacts in English.
- Do not delete your scratch files; list their paths in your report.

## Report

Write your final report to the report path in your brief (Markdown): what you did, per board the node id, before/after numbers (`diff.cjs` and `adiff.cjs`), every Figma node you changed, everything you found but did not fix and why, defects seen on the site, open questions. Then print `WORKER DONE` as the last line of your final message.
