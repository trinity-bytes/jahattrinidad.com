/**
 * First-visit language redirect (decision 2026-11-20).
 *
 * A phone set to Spanish that opens the English home used to get the
 * browser's machine translation instead of the human `/es/` version. Base.astro
 * now blocks machine translation (`translate="no"`) and runs this redirect as
 * the first thing in `<head>`, before fonts, CSS or the body, so the English
 * page is never painted.
 *
 * Rules: only English pages redirect; a language picked in the nav (stored
 * under `locale`) beats the system language, so choosing EN never loops back;
 * a page with no counterpart in that language stays where it is.
 */

type RedirectInput = {
  /** Language the visitor picked in the nav, if any. */
  stored: string | null;
  /** `navigator.languages`, most preferred first. */
  preferred: readonly string[];
  /** Paths of this page's translations, keyed by locale (`es`, `pt`). */
  counterparts: Record<string, string>;
};

/**
 * Returns the path to redirect to, or null to stay. Serialized into the inline
 * script with `toString()`, so it MUST NOT reference anything outside itself.
 */
export function pickLocaleRedirect({ stored, preferred, counterparts }: RedirectInput): string | null {
  const supported = ['en', 'es', 'pt'];
  let target = stored && supported.indexOf(stored) !== -1 ? stored : null;
  if (!target) {
    for (const tag of preferred) {
      const primary = String(tag).toLowerCase().split('-')[0];
      if (supported.indexOf(primary) !== -1) {
        target = primary;
        break;
      }
    }
  }
  if (!target || target === 'en') return null;
  return counterparts[target] ?? null;
}

/**
 * The inline `<head>` script. Every page remembers nav language choices
 * (`a[data-locale-choice]`); only English pages (`redirect`) also redirect.
 */
export function localeRedirectScript({ redirect, counterparts }: { redirect: boolean; counterparts: Record<string, string> }): string {
  const remember =
    "document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[data-locale-choice]');" +
    "if(a){try{localStorage.setItem('locale',a.dataset.localeChoice)}catch(_){}}});";
  const go = redirect
    ? `var s=null;try{s=localStorage.getItem('locale')}catch(_){}` +
      `var t=(${pickLocaleRedirect.toString()})({stored:s,preferred:navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''],counterparts:${JSON.stringify(counterparts)}});` +
      `if(t){location.replace(t+location.search+location.hash);return}`
    : '';
  return `(function(){try{${go}${remember}}catch(_){}})();`;
}
