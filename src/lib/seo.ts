/**
 * Pure module: no `await`, no `astro:content` import of any kind (D8).
 * `lib/content.ts` does all fetching; this module only turns already-
 * resolved values into canonical/alternate descriptors.
 */
import type { Locale, TranslationLink } from './content';
import { BCP47 } from './consts.ts';

/**
 * The site-wide social preview (visual-design 8.2, Figma `2374:231`). Pages
 * without their own image share it; its alt text lives in the Dictionary.
 */
/** Per-page cards (`src/pages/og/`) share this size. */
export const OG_DEFAULT_IMAGE = { path: '/og/default.jpg', width: 1200, height: 630 } as const;

export interface Alternate {
  hrefLang: string;
  href: string;
}

export interface SeoInput {
  title: string;
  description: string;
  /** Site-relative path of THIS page, e.g. '/notes/hello-world' */
  path: string;
  lang: Locale;
  site: URL;
  /** Frontmatter override for cross-posted articles. Suppresses alternates (D10). */
  canonicalOverride?: string;
  /** From getTranslationGroup(); includes self; length 1 means "no counterpart". */
  group?: TranslationLink[];
  type?: 'website' | 'article';
  publishDate?: Date;
  updatedDate?: Date;
  /** Per-page social preview: site-relative path and alt text. Omitted → OG_DEFAULT_IMAGE. */
  image?: { path: string; alt: string };
}

export interface SeoResult {
  canonical: string;
  alternates: Alternate[];
  title: string;
  description: string;
  openGraph: Record<string, string>;
  /** Alt text of a per-page image; undefined means the default image, whose alt is in the Dictionary. */
  imageAlt?: string;
}

/**
 * The one URL normalizer. Every absolute URL the project emits — canonical,
 * alternates, `og:url`, RSS item links — goes through this function, so
 * trailing-slash drift between them (a classic duplicate-content source)
 * is prevented structurally rather than by review (D11).
 */
export function absoluteUrl(path: string, site: URL): URL {
  // 1. Ensure a single leading '/'.
  let normalized = path.startsWith('/') ? path : `/${path}`;
  // 2. Collapse any repeated '/'.
  normalized = normalized.replace(/\/{2,}/g, '/');
  // 3. If the final segment contains a '.', it is a file — leave it alone.
  const lastSegment = normalized.slice(normalized.lastIndexOf('/') + 1);
  const isFile = lastSegment.includes('.');
  // 4. Otherwise ensure exactly one trailing '/' (matches build.format:
  //    'directory' + trailingSlash: 'always', D11).
  if (!isFile && !normalized.endsWith('/')) {
    normalized = `${normalized}/`;
  }
  // 5. Return the resolved absolute URL.
  return new URL(normalized, site);
}

export function buildSeo(input: SeoInput): SeoResult {
  const canonical = input.canonicalOverride ?? absoluteUrl(input.path, input.site).href;

  const alternates: Alternate[] = input.canonicalOverride
    ? [] // D10 — a canonical override is a hard stop for alternates
    : !input.group || input.group.length <= 1
      ? [] // D9 — mirrors @astrojs/sitemap's createGetI18nLinks()
      : [
          ...input.group.map((member) => ({
            hrefLang: BCP47[member.lang],
            href: absoluteUrl(member.path, input.site).href,
          })),
          {
            hrefLang: 'x-default',
            href: absoluteUrl(
              input.group.find((member) => member.lang === 'en')?.path ?? input.path,
              input.site
            ).href,
          },
        ];

  return {
    canonical,
    alternates,
    title: input.title,
    description: input.description,
    openGraph: {
      'og:title': input.title,
      'og:description': input.description,
      'og:url': canonical,
      'og:type': input.type ?? 'website',
      'og:image': absoluteUrl(input.image?.path ?? OG_DEFAULT_IMAGE.path, input.site).href,
      'og:image:width': String(OG_DEFAULT_IMAGE.width),
      'og:image:height': String(OG_DEFAULT_IMAGE.height),
    },
    imageAlt: input.image?.alt,
  };
}

export interface PersonInput {
  site: URL;
  /** Site-relative path of the page that carries the schema (the Home of its locale). */
  path: string;
  description: string;
  /** Profile URLs (GitHub, LinkedIn…) from the links collection. */
  sameAs: string[];
}

/**
 * schema.org Person for the Home, so search engines read who the site is
 * about (name, role, school, place) instead of guessing from page text.
 * Returned as a string ready for `<script type="application/ld+json">`;
 * `<` is escaped so no value can close the script tag.
 */
export function personJsonLd(input: PersonInput): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jahat Trinidad',
    jobTitle: 'Design Engineer',
    url: absoluteUrl(input.path, input.site).href,
    image: absoluteUrl(OG_DEFAULT_IMAGE.path, input.site).href,
    description: input.description,
    address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Peruana de Ciencias Aplicadas' },
    sameAs: input.sameAs,
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
