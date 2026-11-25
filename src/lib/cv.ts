import type { Locale } from './content';

/**
 * The CV PDF for a locale, served from `public/cv/`. This URL stays fixed; the name the browser saves it
 * under (and so the role it advertises) is set in `public/_headers`. The source lives in the separate trinity-cv repo;
 * rebuild the PDF there and copy it here under the same name, so links already sent keep working.
 */
export function cvPath(lang: Locale): string {
  return `/cv/jahat-trinidad-cv-${lang}.pdf`;
}
