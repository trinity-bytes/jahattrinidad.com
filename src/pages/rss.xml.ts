import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { entryPath, listPosts, type Locale } from '../lib/content';
import { absoluteUrl } from '../lib/seo';

// ── every locale-dependent value lives in this one block ──
const LOCALE: Locale = 'en';
const FEED = {
  title: 'Jahat Trinidad — Notes',
  description: "Essays on how I think through decisions, and tutorials you can follow step by step.",
  language: 'en-us',
} as const;
// ──────────────────────────────────────────────────────────

export async function GET(context: APIContext) {
  const { site } = context;
  if (!site) {
    throw new Error('astro.config.mjs must define `site` before RSS can be generated.');
  }

  const posts = await listPosts({ lang: LOCALE });

  return rss({
    title: FEED.title,
    description: FEED.description,
    site,
    customData: `<language>${FEED.language}</language>`,
    items: posts.map(({ entry }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: absoluteUrl(entryPath('posts', LOCALE, entry.id), site).pathname,
      categories: entry.data.tags,
    })),
  });
}
