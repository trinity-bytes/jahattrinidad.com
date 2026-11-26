# SEO — how search engines show "Jahat Trinidad"

Checked 2026-11-26 in the owner's Chrome (signed-in Google, region Peru) by the supervisor. Query: `Jahat Trinidad`, plus `site:jahattrinidad.com` on Google and Bing. Production `https://jahattrinidad.com` was read the same day; it lags `develop` (see F2).

## What each engine shows

**Google, first page**

1. AI Overview: "design engineer and software engineering student based in Lima, Peru". Its facts (UPC, Minka, CourseraClone, C++/SQL) are cited to LinkedIn and GitHub; the site appears only under "Links & Profiles". Side cards: LinkedIn (with photo), Instagram.
2. **jahattrinidad.com** (#1 web result): title "Jahat Trinidad · Design Engineer — Frontend and product", our meta description verbatim. Site name shown as `jahattrinidad.com`, **generic globe instead of the favicon**, no sitelinks.
3. LinkedIn "Jahat Trinidad - Aspiring Software Engineer".
4. jahattrinidad.com/es/ as a separate result (Spanish, in an English query), title rewritten by Google to "Design Engineer — Frontend y producto - Jahat Trinidad".
5. GitHub, Instagram, image pack (LinkedIn photos only), `/es/links/` "Enlaces - Jahat Trinidad", an X post, a YouTube video.

`site:jahattrinidad.com`: 20 results across two pages: the three homes, Work, Notes and Links in three locales, Viora, Tranqui and Mink'a project pages, and the subdomains (tranqui., minka., queens., inspo.). Interior pages are titled "Notes - jahattrinidad.com", "Viora - jahattrinidad.com", "Proyectos - jahattrinidad.com": Google appends the domain because our titles are bare. TourBench, Inspiration Garden and the posts did not show up.

**Bing**: the site is **not indexed at all**. `site:jahattrinidad.com` returns "There are no results". First page: LinkedIn (two locales), GitHub, Instagram ×2, YouTube, X, Spotify. Copilot summary leads with a YouTube video ("Testimonio de premio").

**DuckDuckGo** (Bing index): same, no jahattrinidad.com in the top 10.

**Ecosia** (region Peru): `/es/` with a snippet taken from body text ("Presentarme ante grandes públicos convirtió los nervios en confianza…") and `/es/work/` as "Proyectos - jahattrinidad.com" with the snippet "Ir al contenido. Jahat Trinidad@trinitybytes." (the skip link and the nav handle). Favicon shown correctly.

## Findings

| # | Finding | Evidence | Fix |
|---|---|---|---|
| F1 | Bing, DuckDuckGo and Yahoo do not have the site | Bing `site:` empty | Owner: verify the site in Bing Webmaster Tools (import from Search Console), submit `sitemap-index.xml`. Code: IndexNow key file in `public/` and a ping after each deploy |
| F2 | Google shows a globe: production declares three `data:image/svg+xml` icons | Production `<head>`; local `develop` build links `/favicon.ico`, `/favicon.svg`, `/icon-192.png` (fix `a0906f8`, in `main`) | Deploy, then confirm production serves the file links. The icon refreshes in Google over days to weeks |
| F3 | Site name shown as `jahattrinidad.com` | No `WebSite` structured data | `WebSite` JSON-LD on each home (`name: "Jahat Trinidad"`, `alternateName`, `url`, `inLanguage`) |
| F4 | Interior titles are bare ("Notes", "Viora", "Proyectos"), so Google rewrites them | Production `<title>` | Titles `<page> — <what it is> · Jahat Trinidad` from the dictionary, per locale (e.g. "Viora — SaaS for olive growers · Jahat Trinidad") |
| F5 | Interior descriptions are thin ("Selected projects and case studies.", "Where to find me elsewhere.") and Ecosia falls back to body text, including the skip link | Production meta; Ecosia snippets | 140–160 character descriptions with the name, role and the page's content, in en/es/pt; `data-nosnippet` on the skip link and the nav handle |
| F6 | Search engines and AI answers take the facts from LinkedIn, not the site | AI Overview citations | Richer `Person` JSON-LD with one `@id` reused site-wide: `sameAs` for every profile (GitHub, LinkedIn, YouTube `@jahattrinidad`, X `trinitybytes`, Instagram), `knowsAbout`, `alumniOf`, a portrait `image`. The home states the same facts in crawlable text |
| F7 | Image results show only LinkedIn photos | Google image pack | `Person.image` points to a square portrait photo, not the OG card; the home portrait is an `<img>` with `alt="Jahat Trinidad"` |
| F8 | Project pages and posts carry no structured data | `ld+json` count 0 off the home | `BreadcrumbList` on every inner page; `BlogPosting` (author = Person `@id`, dates, image) on posts; `CreativeWork` or `SoftwareApplication` on project pages |
| F9 | Sitelinks absent; the es home and es `/links/` take result slots instead | Google page 1 | Cannot be forced. F4, F5, F8 and a clear nav make them likelier. Check hreflang reciprocity in Search Console (tags look right: `en-US`, `es`, `pt-BR`, `x-default`, also in the sitemap) |
| F10 | Not every sitemap URL is indexed (20 seen of 25) | `site:` vs `sitemap-0.xml` | Owner: Search Console → Pages report, request indexing of TourBench, Inspiration Garden and the posts |

## Bing Webmaster Tools (checked 2026-11-26, owner's account)

The site was already verified and `sitemap-index.xml` submitted on 2026-11-22. What Bing knows:

- **Only two URLs on the domain**: `/` (indexed, last crawl 2026-11-22, 200, 204.9 KB, first discovered 2022-06-20) and the subdomains (minka., grayscale.), excluded. None of the other 24 sitemap URLs is known.
- Sitemaps: the index shows "Success" but "URLs discovered: 1", i.e. the child `sitemap-0.xml`, not its 25 URLs. Bing has not crawled the child yet. Production serves both files correctly (`application/xml`, 200, valid `urlset` with `xhtml:link` alternates); robots.txt allows all and lists the index; no `X-Robots-Tag`; a request with the bingbot user agent gets 200.
- URL Inspection on `/`: "Indexed successfully, URL can appear on Bing", yet `site:` returns nothing and Search Performance shows 0 impressions: the page entered the index four days ago and is not served yet.
- Backlinks: none. IndexNow: not set up. Recommendations: none.
- One notice: "Alt attribute for images is missing, 7 instances". Five are decorative layers with an empty `alt` (correct); the hero portrait and the 34 px avatar also have empty `alt` and should say "Jahat Trinidad" (F7).

Diagnosis: nothing blocks Bing. The sitemap is four days old, Bing crawls new low-authority sites slowly, and with no backlinks and no IndexNow it has no other way to find the inner pages. Fix, fastest first:

1. Submit the URLs directly: Webmaster Tools → URL Submission (or "Request indexing" per URL in URL Inspection), the 25 sitemap URLs.
2. IndexNow: turn on Cloudflare **Crawler Hints** (Caching → Configuration), which sends IndexNow pings for changed pages with no code, or ship a key file (T7).
3. Backlinks from every profile (see below).
4. Re-check in a week: Site Explorer should list the sitemap URLs.

## Off-site (owner actions, outside the repository)

- LinkedIn headline says "Aspiring Software Engineer" / "C++, SQL, UI/UX"; the site says "Design Engineer". Align the headline, and put `https://jahattrinidad.com` in the website field of LinkedIn, GitHub, X, Instagram and YouTube: backlinks and one consistent entity.
- Two Instagram accounts (`trinitybytes`, `jahat.trinidad`) both rank. Pick one for `sameAs`.
- The subdomain apps (Tranqui, Mink'a, Queens, Inspiration Garden) are indexed: each should link back to jahattrinidad.com and name its author.
- The YouTube channel (Oracle tutorials, 21K views) ranks on Bing and Ecosia: link it from `/links/` only if the owner wants it associated.
