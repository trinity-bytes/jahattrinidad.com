/**
 * Build-time renderer for the per-page social preview (visual-design 8.2,
 * Figma template `2374:241`). satori lays the text out as SVG paths, sharp
 * rasterizes it and composites it over the template's background, which was
 * exported from Figma without its text (`src/assets/og/page-background.jpg`).
 *
 * The fonts are TTF copies of the site's own woff2 files, because satori
 * does not read woff2. Paths resolve from the project root: the build and
 * `node --test` both run there, while `import.meta.url` would point into the
 * bundled output during `astro build`.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export interface OgCard {
  /** Type and date, e.g. "Essay · Sep 18, 2026". Rendered upper-case. */
  label: string;
  title: string;
  signature: string;
}

const WIDTH = 1200;
const HEIGHT = 630;
const INK = '#0A200B';
const CREAM = '#FAF6E8';

const asset = (file: string) => readFileSync(resolve('src/assets/og', file));

let fonts: { name: string; data: Buffer; weight: 500 | 600; style: 'normal' }[] | undefined;
function loadFonts() {
  fonts ??= [
    { name: 'Epilogue', data: asset('epilogue-600.ttf'), weight: 600, style: 'normal' },
    { name: 'IBM Plex Mono', data: asset('ibmplexmono-500.ttf'), weight: 500, style: 'normal' },
  ];
  return fonts;
}

/** Plain element objects instead of JSX: this module runs under `node --test` too. */
const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, children },
});

export async function renderOgCard(card: OgCard): Promise<Buffer> {
  const tree = el('div', { width: WIDTH, height: HEIGHT, display: 'flex', position: 'relative' }, [
    el('div', { position: 'absolute', left: 64, top: 64, width: 1000, display: 'flex', flexDirection: 'column', gap: 24 }, [
      el('div', { fontFamily: 'IBM Plex Mono', fontWeight: 500, fontSize: 18, color: INK, textTransform: 'uppercase' }, card.label),
      el(
        'div',
        { fontFamily: 'Epilogue', fontWeight: 600, fontSize: 60, lineHeight: 1.05, letterSpacing: -1.2, color: INK, lineClamp: 3 },
        card.title
      ),
    ]),
    el('div', { position: 'absolute', left: 64, top: 566, fontFamily: 'IBM Plex Mono', fontWeight: 500, fontSize: 20, color: CREAM }, card.signature),
  ]);

  // satori's typings expect a ReactNode; the element objects above are that shape.
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: WIDTH, height: HEIGHT, fonts: loadFonts() });

  return sharp(asset('page-background.jpg'))
    .resize(WIDTH, HEIGHT)
    .composite([{ input: Buffer.from(svg) }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
}
