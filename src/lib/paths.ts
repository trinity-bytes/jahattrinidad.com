import { ROUTE_BASE } from './consts';
import type { Locale, TranslatableCollection } from './content';

/** The default locale uses unprefixed paths; locale remains required. */
const DEFAULT_LOCALE: Locale = 'en';

export function collectionPath(collection: TranslatableCollection, lang: Locale): string {
  const prefix = lang === DEFAULT_LOCALE ? '' : `${lang}/`;
  return `/${prefix}${ROUTE_BASE[collection]}/`;
}

export function entryPath(collection: TranslatableCollection, lang: Locale, slug: string): string {
  return `${collectionPath(collection, lang)}${slug}/`;
}

/** Per-page social preview rendered at build time by `src/pages/og/[...route].jpg.ts`. */
export function ogImagePath(collection: TranslatableCollection, lang: Locale, slug: string): string {
  return `/og${entryPath(collection, lang, slug).replace(/\/$/, '')}.jpg`;
}
