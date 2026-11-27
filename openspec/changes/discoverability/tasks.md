# Tasks: discoverability (search engines and AI agents)

Goal set by the owner on 2026-11-27: rank better for "Jahat Trinidad" (plus keywords) and be as easy as
possible to find and describe for AI agents. Resume from "Pending" below.

## Findings (SERP audit, 2026-11-27)

Queries: "Jahat Trinidad", "+ design engineer", "+ cv", "+ frontend Lima", "trinitybytes".

- Google, Bing, DuckDuckGo: jahattrinidad.com ranks 1st. Google's AI Overview described the owner
  from the old LinkedIn copy (student, C++/SQL/Oracle), not from the site.
- Brave: `site:jahattrinidad.com` returned 0 results (not indexed). Its first page was filled with old
  Deepin forum comments (`@l3o_117`), X replies, and noise from "jahat" (Indonesian for "evil") and
  "Trinidad" (Trinidad and Tobago). The owner submitted the site to Brave on 2026-11-26; submit once only.
- Google noise: X threads where the owner replied (@freddier, @G_Programming, @SoyITPro), an Instagram
  post, a Facebook reaction list. Only outranked by more own content.
- "trinitybytes" loses to TrinityByte/TrinityBits companies; GitHub handle is `trinity-bytes`. Not a usable
  brand query; the name is.
- "Jahat Trinidad cv" shows "Missing: cv" for the site. The owner decided the current CV setup is enough.

## Done

- [x] LinkedIn headline, About and projects rewritten to match the site (owner, 2026-11-27).
- [x] Site submitted to Brave Search (owner, 2026-11-26).
- [x] `/llms.txt` generated at build from the content (`src/lib/llms.ts`, `src/pages/llms.txt.ts`), released in v1.12.0.
- [x] `sameAs` in the Person JSON-LD reviewed: kept as is (comes from `links.json`; @jahat.trinidad is a
      personal photo account, left out on purpose).

## Pending

- [ ] **About page proposal in Figma.** A page that says in more detail who the owner is (story, how he
      works, education, before software, languages, availability). Per CLAUDE.md: propose it in Figma
      file `gq6glEp9QrPOnEyYG9dldh` beside the approved `Proposed · …` boards, built from the `Design
      system` page, and wait for the owner's approval before any code. Then: route in three locales
      (`src/pages/_views/About.astro` + wrappers), nav/links entry, `ProfilePage`/`AboutPage` JSON-LD,
      add it to `llms.txt` pages.
- [ ] **LinkedIn, as part of the content strategy** (owner decided 2026-11-27):
  1. Location says "Peru" and contact address says Oxapampa; the site says Lima. Make both Lima, Peru.
  2. Featured holds only an old certificate post; pin a link to jahattrinidad.com (or the Inspiration Garden case study) first.
  3. Experience lists only past jobs; the Design Engineer work sits in Projects. Consider an Experience entry for it.
  4. The Spanish profile version may still carry the old headline ("Aspiring Software Engineer | Seeking…"); check it.
  5. The GitHub link in Contact info shows as `github.com`; confirm it points to `github.com/trinity-bytes`.
- [ ] **CV headline**: the PDFs say "Software Engineering Intern · Frontend & Full Stack"; the site and
      LinkedIn say "Design Engineer". Align when the CV is next edited.
- [ ] **Content strategy**: more notes on the site and LinkedIn posts that link to them, to push the X/
      Instagram/Facebook noise off the first page.
- [ ] **Re-check Brave** around 2026-12-10: `site:jahattrinidad.com` and "Jahat Trinidad". If still 0, look
      for backlinks rather than resubmitting.
- [ ] **Re-run the SERP audit** after the About page and LinkedIn changes, and compare with the findings above.
