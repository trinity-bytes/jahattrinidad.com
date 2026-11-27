/**
 * Pure module: no `await`, no `astro:content` import of any kind (D8).
 * `lib/content.ts` does all fetching; this module only turns already-
 * resolved values into canonical/alternate descriptors.
 */
import type { Locale, TranslationLink } from './content';
import { BCP47, OWNER_NAME } from './consts.ts';

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
  /** Serialized schema.org graph (jsonLdGraph), carried to <head> by the layout. */
  jsonLd?: string;
}

export interface SeoResult {
  canonical: string;
  alternates: Alternate[];
  title: string;
  description: string;
  openGraph: Record<string, string>;
  /** Alt text of a per-page image; undefined means the default image, whose alt is in the Dictionary. */
  imageAlt?: string;
  jsonLd?: string;
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
    jsonLd: input.jsonLd,
  };
}

// ── Titles and descriptions ──

const OWNER = OWNER_NAME;
/** Google cuts titles at about this many characters and descriptions at about 160. */
const TITLE_MAX = 60;
const DESCRIPTION = { min: 140, max: 160 } as const;

/**
 * `<page> — <what it is> · Jahat Trinidad`. With `max`, a title that does not
 * fit drops "what it is" (long post titles); the page name and the owner stay.
 */
export function pageTitle(page: string, what: string, options: { max?: number } = {}): string {
  const full = `${page} — ${what} · ${OWNER}`;
  return full.length <= (options.max ?? Infinity) ? full : `${page} · ${OWNER}`;
}

export const POST_TITLE_MAX = TITLE_MAX;

/** A project's short "what it is": the first part of its `kind` ("Landing · Team of 4" → "Landing"). */
export function whatItIs(name: string, kind: string | undefined, fallback: string): string {
  const what = kind?.split(' · ')[0];
  return what && what.toLowerCase() !== name.toLowerCase() ? what : fallback;
}

/** Cuts at a word boundary and ends with an ellipsis, `max` characters at most. */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max); // one character is left for the ellipsis
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.—–-]+$/, '')}…`;
}

/**
 * Meta description for an entry: its own description plus the signature (name
 * and role, from the Dictionary) that brings it into 140–160 characters. A
 * short one borrows `extra` (the entry's subtitle); one that fits no
 * signature is cut at a word so the signature always survives.
 */
export function metaDescription(text: string, signatures: readonly string[], extra?: string): string {
  // A subtitle often opens with the description itself; then it replaces it instead of repeating it.
  const leads = extra ? [text, extra.startsWith(text) ? extra : `${text} ${extra}`] : [text];
  for (const lead of leads) {
    for (const signature of signatures) {
      const candidate = `${lead} ${signature}`;
      if (candidate.length >= DESCRIPTION.min && candidate.length <= DESCRIPTION.max) return candidate;
    }
  }
  const signature = signatures.reduce((a, b) => (b.length < a.length ? b : a));
  return `${clamp(leads[leads.length - 1], DESCRIPTION.max - signature.length - 1)} ${signature}`;
}

// ── schema.org ──
// Every page renders one @graph. Each @id a node points at (the Person) is a
// node of that same graph, so a crawler never has to fetch another page.

export type SchemaNode = Record<string, any>;

export function personId(site: URL): string {
  return `${absoluteUrl('/', site).href}#person`;
}

export interface PersonInput {
  site: URL;
  description: string;
  /** Profile URLs from the links collection. */
  sameAs: string[];
  /** Site-relative path of the square 600 px portrait. */
  image: string;
}

/**
 * The one Person of the site, so search engines read who it is about (name,
 * role, school, place) from us instead of from third-party profiles.
 */
export function personNode(input: PersonInput): SchemaNode {
  return {
    '@type': 'Person',
    '@id': personId(input.site),
    name: OWNER,
    alternateName: ['trinitybytes', '@trinitybytes'],
    jobTitle: 'Design Engineer',
    url: absoluteUrl('/', input.site).href,
    image: { '@type': 'ImageObject', url: absoluteUrl(input.image, input.site).href, width: 600, height: 600 },
    description: input.description,
    address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Peruana de Ciencias Aplicadas' },
    // Each one is on the site already: the hero eyebrow and the experience entries.
    knowsAbout: ['Frontend development', 'Product design', 'Web development', 'Graphic design', 'Branding'],
    sameAs: input.sameAs,
  };
}

/** The site's name for search results. One per locale Home. */
export function websiteNode(input: { site: URL; path: string; lang: Locale }): SchemaNode {
  const url = absoluteUrl(input.path, input.site).href;
  return {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name: OWNER,
    alternateName: ['trinitybytes', 'jahattrinidad.com'],
    url,
    inLanguage: BCP47[input.lang],
    publisher: { '@id': personId(input.site) },
  };
}

/**
 * The Home as the person's profile page. `primaryImageOfPage` names the portrait as the
 * page's image, so search results pick it over the hero's larger decorative layers.
 */
export function profilePageNode(input: { site: URL; path: string; lang: Locale; image: string }): SchemaNode {
  const url = absoluteUrl(input.path, input.site).href;
  return {
    '@type': 'ProfilePage',
    '@id': `${url}#profilepage`,
    url,
    inLanguage: BCP47[input.lang],
    isPartOf: { '@id': `${url}#website` },
    mainEntity: { '@id': personId(input.site) },
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(input.image, input.site).href, width: 600, height: 600 },
  };
}

/**
 * The About page: about the same Person, and part of the locale Home's WebSite node (that node
 * lives on the Home, so its id is built from `homePath`, not from this page's URL).
 */
export function aboutPageNode(input: { site: URL; path: string; homePath: string; lang: Locale; image: string }): SchemaNode {
  const url = absoluteUrl(input.path, input.site).href;
  return {
    '@type': 'AboutPage',
    '@id': `${url}#aboutpage`,
    url,
    inLanguage: BCP47[input.lang],
    isPartOf: { '@id': `${absoluteUrl(input.homePath, input.site).href}#website` },
    mainEntity: { '@id': personId(input.site) },
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(input.image, input.site).href },
  };
}

export function breadcrumbNode(site: URL, trail: { name: string; path: string }[]): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path, site).href,
    })),
  };
}

export interface EntrySchemaInput {
  site: URL;
  /** The page's canonical URL. */
  url: string;
  lang: Locale;
  name: string;
  description: string;
  /** Site-relative path of the page's social card. */
  image: string;
  datePublished: Date;
  dateModified?: Date;
}

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

function entryFields(input: EntrySchemaInput): SchemaNode {
  return {
    url: input.url,
    mainEntityOfPage: input.url,
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image, input.site).href,
    inLanguage: BCP47[input.lang],
    datePublished: isoDay(input.datePublished),
    ...(input.dateModified && { dateModified: isoDay(input.dateModified) }),
  };
}

export function blogPostingNode(input: EntrySchemaInput): SchemaNode {
  const person = { '@id': personId(input.site) };
  return { '@type': 'BlogPosting', headline: input.name, ...entryFields(input), author: person, publisher: person };
}

/** A project is a SoftwareApplication when its live demo is the app itself (`demoIsApp` in content). */
export function isLiveApp(data: { demoUrl?: string; demoIsApp: boolean }): boolean {
  return Boolean(data.demoUrl) && data.demoIsApp;
}

export function projectNode(
  input: EntrySchemaInput & { app: boolean; solo: boolean; demoUrl?: string }
): SchemaNode {
  const person = { '@id': personId(input.site) };
  return {
    '@type': input.app ? 'SoftwareApplication' : 'CreativeWork',
    ...entryFields(input),
    ...(input.app && { operatingSystem: 'Web', sameAs: input.demoUrl }),
    // Team work is not claimed as authored by one person.
    ...(input.solo ? { author: person } : { contributor: person }),
  };
}

/** Ready for `<script type="application/ld+json">`; `<` is escaped so no value can close the tag. */
export function jsonLdGraph(nodes: SchemaNode[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
