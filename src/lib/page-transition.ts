/**
 * Page-to-page transition (decision 2026-11-21).
 *
 * Owner: "quedaria bien alguna clase de transicion entre las paginas, para uqe no sea tan brusco el
 * cambio, idealmente que se triggeree desde el boton que lleva a la otra pagina".
 *
 * Uses cross-document View Transitions (`@view-transition { navigation: auto }` in Base.astro), so
 * there is no client router: every page is still a plain document load. The new page opens in a
 * circle that grows from the point where the visitor clicked the link, with the lens switch's curve
 * (Lens.astro), so both reveals speak the same language. Going back plays it in reverse: the page
 * being left shrinks into the link that had led away from the previous one (owner: "considera poner
 * transiciones al volver a una pagina anterior"); going forward again grows from that link. A browser
 * without cross-document View Transitions, or reduced motion, just navigates; a navigation with no
 * stored point keeps the browser's default soft crossfade.
 */

/** sessionStorage key of the click that started the navigation. */
const KEY = 'page-transition-origin';
/** sessionStorage key prefix: the last link point used to leave a page, by its path (for back/forward). */
const FROM = 'page-transition-from:';

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

type Point = { x: number; y: number };

/**
 * A page's stored leaving point, with no expiry (back can come much later).
 * Serialized into the inline script with `toString()`, so it MUST NOT reference anything outside itself.
 */
export function readPoint(stored: string | null): { x: number; y: number } | null {
  if (!stored) return null;
  let data: { x?: unknown; y?: unknown };
  try {
    data = JSON.parse(stored);
  } catch (_) {
    return null;
  }
  return typeof data.x === 'number' && typeof data.y === 'number' ? { x: data.x, y: data.y } : null;
}

type RevealInput = {
  /** Navigation API `navigation.activation.navigationType` (or the fallback): push, replace, reload, traverse. */
  navigationType: string;
  /** For a traversal: whether it goes back in history. */
  back: boolean;
  /** The fresh click that started this navigation, if any. */
  fresh: Point | null;
  /** The point stored for this page (where the visitor left it). */
  currentPoint: Point | null;
  /** The point stored for the page being left (where it was first opened from, for forward). */
  previousPoint: Point | null;
};

/**
 * Which reveal to play, or null for the default crossfade. `grow`: the new page opens in a circle from
 * the point; `shrink`: the page being left closes into it, uncovering the new one.
 * Serialized into the inline script with `toString()`, so it MUST NOT reference anything outside itself.
 */
export function planReveal(input: RevealInput): { mode: 'grow' | 'shrink'; x: number; y: number } | null {
  if (input.navigationType === 'traverse') {
    if (input.back) return input.currentPoint ? { mode: 'shrink', x: input.currentPoint.x, y: input.currentPoint.y } : null;
    return input.previousPoint ? { mode: 'grow', x: input.previousPoint.x, y: input.previousPoint.y } : null;
  }
  if (input.navigationType === 'reload') return null;
  return input.fresh ? { mode: 'grow', x: input.fresh.x, y: input.fresh.y } : null;
}

/**
 * The inline `<head>` script: records link clicks (the fresh point, and the leaving point of this page)
 * and plays the reveal on every `pagereveal`, back-forward cache restores included. Sets
 * `html[data-page-reveal]` early when a reveal is coming (Hero.astro then skips its load choreography so
 * two circles never play at once) and to the mode while it runs (styles in Base.astro).
 */
export function pageTransitionScript(): string {
  return (
    '(function(){try{' +
    "if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('PageRevealEvent' in window))return;" +
    `var KEY=${JSON.stringify(KEY)},FROM=${JSON.stringify(FROM)};` +
    `var record=${shouldRecordOrigin.toString()};` +
    `var read=${readOrigin.toString()};` +
    `var point=${readPoint.toString()};` +
    `var plan=${planReveal.toString()};` +
    'function get(k){try{return sessionStorage.getItem(k)}catch(_){return null}}' +
    "document.addEventListener('click',function(e){" +
    "var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented)return;" +
    "if(!record({href:a.href,current:location.href,target:a.target,download:a.hasAttribute('download'),button:e.button,modified:e.metaKey||e.ctrlKey||e.shiftKey||e.altKey}))return;" +
    // A keyboard activation has no pointer position: start from the link's centre.
    'var x=e.clientX,y=e.clientY;if(e.detail===0){var b=a.getBoundingClientRect();x=b.left+b.width/2;y=b.top+b.height/2}' +
    'var p={x:x/innerWidth,y:y/innerHeight};' +
    'try{sessionStorage.setItem(KEY,JSON.stringify({x:p.x,y:p.y,t:Date.now()}));sessionStorage.setItem(FROM+location.pathname,JSON.stringify(p))}catch(_){}' +
    '});' +
    // How this document was reached: the Navigation API when present, else the navigation timing type.
    'function how(){var a=window.navigation&&navigation.activation,t=a&&a.navigationType;' +
    "if(!t){var n=performance.getEntriesByType('navigation')[0];t=n&&n.type==='back_forward'?'traverse':n&&n.type==='reload'?'reload':'push'}" +
    'var back=true,prev=null;if(a&&a.from&&a.entry){back=a.entry.index<a.from.index;try{prev=new URL(a.from.url).pathname}catch(_){}}' +
    'return{type:t,back:back,prev:prev}}' +
    "var root=document.documentElement,first=how();" +
    "if(first.type==='traverse'||(first.type!=='reload'&&get(KEY)))root.dataset.pageReveal='';" +
    "window.addEventListener('pagereveal',function(e){var vt=e.viewTransition,raw=get(KEY);" +
    'try{sessionStorage.removeItem(KEY)}catch(_){}' +
    'var i=how(),pl=vt&&plan({navigationType:i.type,back:i.back,fresh:read(raw,Date.now()),currentPoint:point(get(FROM+location.pathname)),previousPoint:i.prev?point(get(FROM+i.prev)):null});' +
    'if(!pl){delete root.dataset.pageReveal;return}' +
    'root.dataset.pageReveal=pl.mode;' +
    "var w=innerWidth,h=innerHeight,x=pl.x*w,y=pl.y*h,r=Math.hypot(Math.max(x,w-x),Math.max(y,h-y)),at=' at '+x+'px '+y+'px)';" +
    "var full='circle('+r+'px'+at,none='circle(0px'+at,grow=pl.mode==='grow';" +
    "vt.ready.then(function(){root.animate({clipPath:grow?[none,full]:[full,none]},{duration:grow?800:700,easing:'cubic-bezier(0.87, 0, 0.13, 1)',pseudoElement:grow?'::view-transition-new(root)':'::view-transition-old(root)'})}).catch(function(){});" +
    'vt.finished.finally(function(){delete root.dataset.pageReveal})' +
    '});' +
    '}catch(_){}})();'
  );
}
