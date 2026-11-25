/**
 * Shared constants consumed by `content.ts` and `seo.ts`.
 *
 * `ROUTE_BASE` maps internal collection names to their public URL segments (design.md §4).
 *
 * `BCP47` MUST be mirrored literally in `astro.config.mjs`'s
 * `sitemap({ i18n: { locales } })` option, because `astro.config.mjs` cannot
 * import from `src/` — it runs before the Vite/Astro module graph exists.
 * If this map ever changes, the mirror in `astro.config.mjs` must change
 * with it, by hand, in the same commit (design.md §16 risk: "BCP-47 locale
 * tags drift between `seo.ts` and `astro.config.mjs`"). This comment is
 * what keeps a future session — one that may never read `design.md` —
 * from missing that mirror requirement.
 */
export const ROUTE_BASE = { projects: 'work', posts: 'notes' } as const;

export const BCP47 = { en: 'en-US', es: 'es', pt: 'pt-BR' } as const;

/** Public contact address, shown by Contact and used by the chat fallback. */
export const CONTACT_EMAIL = 'jahatjassiel@outlook.com';
/** Web3Forms access key for the Contact chat. Public by design: it ships in the browser. */
export const WEB3FORMS_ACCESS_KEY = '016fe820-1be9-49e5-b050-0f92b4598891';

/** This site's source repository, linked from the footer. */
export const SOURCE_URL = 'https://github.com/trinity-bytes/jahattrinidad.com';

/** Slug of the case study the hiring branch links to after a message is sent. */
export const GARDEN_CASE_STUDY = 'inspiration-garden';
