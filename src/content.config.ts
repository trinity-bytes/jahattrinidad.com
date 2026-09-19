import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod'; // Zod 4, bundled with astro. NEVER standalone zod.

const LOCALES = ['en', 'es'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // meta description + card teaser
      lang: z.enum(LOCALES),
      translationKey: z.string().optional(), // pairs an ES entry with its EN counterpart
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      coverImage: image().optional(), // validated at build; missing file = Zod error
      coverImageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]), // what KIND of thing it is
      stack: z.array(z.string()), // what it was BUILT WITH
      role: z.string(), // required — see design.md §8
      timeframe: z.string(), // required — e.g. '2025 Q1-Q3'
      constraints: z.array(z.string()).default([]), // short records; narrative in the body
      outcome: z.string().optional(), // one-line quantified result for cards
      repoUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      decisions: z
        .array(
          z.object({
            choice: z.string(), // what was done
            rejected: z.string(), // what was discarded — REQUIRED, this is the forcing function (D2)
            because: z.string(), // the deciding constraint, one line
          })
        )
        .default([]),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(LOCALES),
    translationKey: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    canonicalUrl: z.string().url().optional(), // cross-post → suppresses alternates (D10)
    // NO readingTime — derived in lib/content.ts (D6)
  }),
});

const links = defineCollection({
  loader: file('src/content/links.json'),
  schema: z.object({
    id: z.string(), // required by the file() loader as the entry key
    label: z.string(),
    url: z.string().url(),
    icon: z.string(), // key into an inline SVG sprite — no icon dependency
    order: z.number().int(), // explicit sort key, not JSON array position
    enabled: z.boolean().default(true), // retire a link without deleting the record
  }),
});

export const collections = { projects, posts, links };
