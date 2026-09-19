/**
 * UI-string dictionary and locale-aware link helpers. This is NOT the
 * content seam — this file has no `astro:content` access of any kind.
 */
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './content';

export interface Dictionary {
  nav: {
    home: string;
    projects: string;
    blog: string;
    links: string;
  };
  home: {
    featuredProjects: string;
    recentPosts: string;
  };
  project: {
    role: string;
    timeframe: string;
    stack: string;
  };
  post: {
    readingTime: (minutes: number) => string;
  };
  common: {
    readMore: string;
  };
}

/** Populated for `en` only — D1 creates no Spanish UI strings in this change. */
const en: Dictionary = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
    links: 'Links',
  },
  home: {
    featuredProjects: 'Featured projects',
    recentPosts: 'Recent posts',
  },
  project: {
    role: 'Role',
    timeframe: 'Timeframe',
    stack: 'Stack',
  },
  post: {
    readingTime: (minutes) => `${minutes} min read`,
  },
  common: {
    readMore: 'Read more',
  },
};

const dictionaries: Partial<Record<Locale, Dictionary>> = { en };

/** Falls back to `en` until Spanish strings exist — matches D1's current scope. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

/** Locale-aware, prefix-correct link builder over `astro:i18n`. */
export function localizedPath(locale: Locale, path: string): string {
  return getRelativeLocaleUrl(locale, path);
}
