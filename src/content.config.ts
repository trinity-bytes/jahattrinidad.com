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
      tier: z.enum(['case-study', 'project', 'experiment']),
      team: z.object({ size: z.number().int().positive(), solo: z.boolean() }).optional(),
      myPart: z.string().optional(),
      role: z.string().optional(),
      timeframe: z.string().optional(),
      constraints: z.array(z.string()).default([]), // short records; narrative in the body
      outcome: z.string().optional(), // one-line quantified result for cards
      repoUrl: z.url().optional(),
      demoUrl: z.url().optional(),
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
    type: z.enum(['essay', 'tutorial']),
    canonicalUrl: z.url().optional(), // cross-post → suppresses alternates (D10)
    // NO readingTime — derived in lib/content.ts (D6)
  }),
});

const links = defineCollection({
  loader: file('src/content/links.json'),
  schema: z.object({
    id: z.string(), // required by the file() loader as the entry key
    label: z.string(),
    url: z.url(),
    icon: z.string(), // key into an inline SVG sprite — no icon dependency
    order: z.number().int(), // explicit sort key, not JSON array position
    enabled: z.boolean().default(true), // retire a link without deleting the record
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience.json'),
  schema: z.object({
    id: z.string(),
    lang: z.enum(LOCALES),
    role: z.string(),
    organisation: z.string(),
    start: z.string(),
    end: z.string().optional(),
    carriesOver: z.string(),
    tools: z.array(z.string()).default([]),
    order: z.number().int(),
  }),
});

export const collections = { projects, posts, links, experience };
