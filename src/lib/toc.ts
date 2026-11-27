/** "In this post": which section is being read. */

/** The viewport y a heading must reach to be current: its scroll-margin-top, plus 1px for subpixels. */
export function readingLine(scrollMarginTop: string): number {
  return (Number.parseFloat(scrollMarginTop) || 0) + 1;
}

/** Index of the last heading whose top is at or above the line; the first one before any gets there. */
export function activeHeadingIndex(tops: number[], line: number): number {
  if (tops.length === 0) return -1;
  return Math.max(0, tops.findLastIndex((top) => top <= line));
}
