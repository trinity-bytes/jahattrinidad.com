# Copy approved by the owner

Every text that was marked `[Draft]` or `[Owner: …]` on the current Figma boards, now approved. Approved copy goes into the `Dictionary` (`src/lib/i18n.ts`) or the content MDX at implementation.

Tablet and mobile boards repeat the desktop copy, so each text is listed once. Source boards: Home v3.5 Outside `2191:86`, Inside `2191:503`; Work index v2 `2239:17`; case study v6 `2298:2`; Notes index v3 `2301:86`.

- Round 1: 2026-11-17, owner verdicts on the Figma drafts.
- Round 2: 2026-11-17, rewrites R1–R21, facts checked against the `my-inspiration-garden`, `ma-viora-platform` and `minka-landing` repos.
- Round 3: 2026-11-17, all approved. R9 resolved by dropping the Inside-only Notes headline: Inside keeps "Notes on building things" (the eyebrow carries the Inside framing).

Review closed: every text below is final.

---

## Approved (final)

### Home — Outside

**Values proof (Inspiration Garden)**
> A tool for saving the design references, tools, libraries, articles and tutorials I find on the web. Designed, built and launched by me.

**Work, Mink'a problem** (also on the Work index)
> In Lima, clothes, books and furniture that still work end up in the trash, because there is no trusted way to swap them with neighbours.

**Work, Viora "My part"** (also Inside, the Work index Featured, and the case study "Next case study" card)
> Full stack on a team of five: the Vue web app, a Spring Boot backend with an in-app AI assistant, offline harvest settlements on Android, and alerts for cooperatives in Flutter.

### Home — Inside

**Values sub**
> Every number below comes from the Garden's repository: its releases and the services it runs on.

**Values headline**
> How each promise was built.

**Values proof**
> A pnpm monorepo: a Cloudflare Worker API and a static front end. 33 releases so far, from v0.1.0 to v1.2.1.

**Work, Viora key decision**
> For the mobile apps' API we picked Spring Boot over ASP.NET Core. The team already knew it, and Spring Data, Spring Security and Spring AI gave us storage, sign-in and the in-app assistant without building them from scratch.

**Work, Tranqui key decision**
> The landing uses the browser's own `<dialog>` for pop-ups and `<details>` for the FAQ, so they work with a keyboard and a screen reader without extra JavaScript. Animations stop for anyone who asks for reduced motion.

**Experience headline**
> What each job left in my toolkit

**Experience sub**
> Brand work taught me systems, teaching taught me to explain, and running community channels taught me to listen to users. I use all three every time I build.

**Contact headline**
> You've seen how I build. What should we build together?

**Composer placeholder**
> What are you building, and where could I help?

### Work index

**Hero intro**
> Products I've designed and built, from client work to small experiments.

**Inspiration Garden, problem**
> I kept losing references: a font in a bookmark, a layout in a screenshot, a library somewhere in a chat. When a project needed them, I spent longer hunting than designing.

**Inspiration Garden, what it does**
> My library of references, open for anyone to browse. My AI agents and I save, tag and sort it through the same API.

### Case study — Inspiration Garden

**Problem, first paragraph**
> A font in a bookmark, a layout in a screenshot, a library in a chat, a tutorial in one of a hundred open tabs. When a project needed them, I couldn't find any of them.

**Problem, second paragraph**
> I wanted one place that is quick to fill and easy to search, and that an AI assistant can help keep in order, not only me.

**What it does, terminal caption**
> A real session from 15 Nov: an AI agent tidied the garden through the API. 75 tags became 64, and 190 items were sorted into categories.

**What I got wrong, the sky**
> The first version had a sky behind the canvas and light frosted glass panels. Until v1.0 I was the only user, and as I adjusted the rest and the garden filled with content, the sky faded into the background and the glass no longer fit. On day 11 (PR #1) I cleared the canvas to a solid dark colour, swapped the glass for solid cartoon panels and made navigation faster. Glass came back on day 35: dark, 75% opaque, and tuned so text stays at WCAG AA even over a pure white card.

**What I got wrong, lost tags**
> On day 53 an agent cleaned up the garden for me, and 58 items lost every tag. The API read a missing tags field as an empty list: a Zod default survives `.partial()`, so a patch that only fixed a title also cleared the tags. I restored them from a local snapshot, and hotfix v1.2.1 shipped the same day: an omitted list now keeps the stored one. That day was also the first real test of working with an agent, and it is where the inspiration-garden skill came from: the instructions that teach an agent how to use the garden.

**How it grew, lesson**
> Use the product with real content before you polish it. The sky was polish: it took days to build, and once the garden filled up, it faded behind everything else.

### Notes index

**Hero intro**
> Notes from building things: what worked, what broke, what I'd do again.

**Hero sub**
> Essays on how I think through decisions, and tutorials you can follow step by step.

### Viora project page

**What it is**
> A platform that helps olive growers in southern Peru run their season: web planning, a phone app for producers in the field and one for cooperatives, all on the same data. Team of five.

**My part, full version**
> My part, across the whole product:
> - Web (Vue): shared layout and navigation, English/Spanish, alerts, the sign-in redesign, onboarding, and the releases that connected it to the real backend.
> - Web (Angular, first version): the alerts module.
> - Backend (Spring Boot): an in-app assistant built with Spring AI, cooperative membership codes and harvest settlements.
> - Android (Kotlin): harvest settlements that work offline and sync later.
> - Cooperative app (Flutter): manager alerts and member plot dossiers.

---

## Not in this list

These are calculated at build time from the content, so they need no copy: the project count `[N]`, reading time `[N] min`, and post dates `[date]`.
