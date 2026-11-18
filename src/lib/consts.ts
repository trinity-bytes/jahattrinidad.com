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

export const BCP47 = { en: 'en-US', es: 'es-ES' } as const;

/** Public contact address, shown by Contact and used by the chat fallback. */
export const CONTACT_EMAIL = 'jahatjassiel@outlook.com';
