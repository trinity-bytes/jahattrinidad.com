/**
 * Where the rising glow transition (GlowTransition, direction "rise") covers the page: the top of its
 * opaque body at a given x, in viewport px. Other parts of the page use it to know what the glow hides
 * (the nav shows the brand once the hero's name is covered).
 *
 * Geometry, from GlowTransition's styles: the shape's gradient is an ellipse filling the shape's box,
 * whose body (the incoming surface) fills 75% of its radii; the layer clips everything above its top.
 * The box from getBoundingClientRect already includes the scroll transforms (yPercent, scaleX).
 */
const BODY = 0.75;

/** Fired on window whenever the rising glow moves, scroll smoothing included (it keeps moving after the scroll stops). */
export const GLOW_COVER_CHANGE = 'glow-cover-change';

/** The y (viewport px) above which the glow covers nothing at `x`, or null while it covers nothing at all. */
export function glowCoverTop(x: number): number | null {
  const layer = document.querySelector<HTMLElement>('[data-glow-transition="rise"][data-ready]');
  const shape = layer?.querySelector<HTMLElement>('.glow-shape');
  if (!layer || !shape || Number(getComputedStyle(shape).opacity) < 0.5) return null;
  const box = shape.getBoundingClientRect();
  const rx = (box.width / 2) * BODY;
  const ry = (box.height / 2) * BODY;
  const dx = (x - (box.left + box.width / 2)) / rx;
  if (Math.abs(dx) >= 1) return null;
  const top = box.top + box.height / 2 - ry * Math.sqrt(1 - dx * dx);
  return Math.max(top, layer.getBoundingClientRect().top);
}
