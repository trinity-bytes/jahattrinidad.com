/**
 * Page-to-page transition (decision 2026-11-21).
 *
 * Owner: "quedaria bien alguna clase de transicion entre las paginas, para uqe no sea tan brusco el
 * cambio, idealmente que se triggeree desde el boton que lleva a la otra pagina".
 *
 * Uses cross-document View Transitions (`@view-transition { navigation: auto }` in Base.astro), so
 * there is no client router: every page is still a plain document load. The new page opens in a
 * circle that grows from the point where the visitor clicked the link, with the lens switch's curve
 * (Lens.astro), so both reveals speak the same language. A browser without cross-document View
 * Transitions, or reduced motion, just navigates. Back/forward and links without a recorded click
 * keep the browser's default soft crossfade.
 */

/** sessionStorage key of the click that started the navigation. */
const KEY = 'page-transition-origin';

type LinkClick = {
  /** The link's resolved href. */
  href: string;
  /** The current page's URL. */
  current: string;
  target: string;
  download: boolean;
  /** MouseEvent.button. */
  button: number;
  /** Any of Meta, Ctrl, Shift or Alt held (a new tab or window). */
  modified: boolean;
};

/**
 * Whether a click opens another page of this site in this tab, so its point should start the reveal.
 * Serialized into the inline script with `toString()`, so it MUST NOT reference anything outside itself.
 */
export function shouldRecordOrigin(click: LinkClick): boolean {
  if (click.button !== 0 || click.modified || click.download) return false;
  if (click.target && click.target !== '_self') return false;
  let to: URL;
  let from: URL;
  try {
    to = new URL(click.href);
    from = new URL(click.current);
  } catch (_) {
    return false;
  }
  if (to.protocol !== 'http:' && to.protocol !== 'https:') return false;
  if (to.origin !== from.origin) return false;
  // Same document, only a hash: the page scrolls, there is no navigation to reveal.
  return !(to.pathname === from.pathname && to.search === from.search);
}

/**
 * The stored click as viewport fractions, or null when missing, broken or stale (older than 5s: a
 * slow page or an abandoned navigation must not reveal from an old point later).
 * Serialized into the inline script with `toString()`, so it MUST NOT reference anything outside itself.
 */
export function readOrigin(stored: string | null, now: number): { x: number; y: number } | null {
  if (!stored) return null;
  let data: { x?: unknown; y?: unknown; t?: unknown };
  try {
    data = JSON.parse(stored);
  } catch (_) {
    return null;
  }
  if (typeof data.x !== 'number' || typeof data.y !== 'number' || typeof data.t !== 'number') return null;
  if (now - data.t > 5000) return null;
  return { x: data.x, y: data.y };
}

/**
 * The inline `<head>` script: records link clicks and, on the next page, animates the reveal from the
 * recorded point. Sets `html[data-page-reveal]` while it runs (styles in Base.astro turn the default
 * crossfade off; Hero.astro skips its load choreography so two circles never play at once).
 */
export function pageTransitionScript(): string {
  return (
    '(function(){try{' +
    "if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('PageRevealEvent' in window))return;" +
    `var KEY=${JSON.stringify(KEY)};` +
    `var record=${shouldRecordOrigin.toString()};` +
    `var read=${readOrigin.toString()};` +
    "document.addEventListener('click',function(e){" +
    "var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented)return;" +
    "if(!record({href:a.href,current:location.href,target:a.target,download:a.hasAttribute('download'),button:e.button,modified:e.metaKey||e.ctrlKey||e.shiftKey||e.altKey}))return;" +
    // A keyboard activation has no pointer position: start from the link's centre.
    'var x=e.clientX,y=e.clientY;if(e.detail===0){var b=a.getBoundingClientRect();x=b.left+b.width/2;y=b.top+b.height/2}' +
    'try{sessionStorage.setItem(KEY,JSON.stringify({x:x/innerWidth,y:y/innerHeight,t:Date.now()}))}catch(_){}' +
    '});' +
    'var s=null;try{s=sessionStorage.getItem(KEY);sessionStorage.removeItem(KEY)}catch(_){}' +
    'var o=read(s,Date.now());if(!o)return;' +
    "var root=document.documentElement;root.dataset.pageReveal='';" +
    "window.addEventListener('pagereveal',function(e){var vt=e.viewTransition;" +
    'if(!vt){delete root.dataset.pageReveal;return}' +
    'var w=innerWidth,h=innerHeight,x=o.x*w,y=o.y*h,r=Math.hypot(Math.max(x,w-x),Math.max(y,h-y));' +
    "var at=' at '+x+'px '+y+'px)';" +
    "vt.ready.then(function(){root.animate({clipPath:['circle(0px'+at,'circle('+r+'px'+at]},{duration:800,easing:'cubic-bezier(0.87, 0, 0.13, 1)',pseudoElement:'::view-transition-new(root)'})});" +
    'vt.finished.finally(function(){delete root.dataset.pageReveal})' +
    '},{once:true});' +
    '}catch(_){}})();'
  );
}
