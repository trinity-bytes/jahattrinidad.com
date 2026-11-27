import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod'; // Zod 4, bundled with astro. NEVER standalone zod.

const LOCALES = ['en', 'es', 'pt'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // meta description + card teaser
      lang: z.enum(LOCALES),
      translationKey: z.string().optional(), // pairs an ES/PT entry with its EN counterpart
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      homeFeatured: z.boolean().default(true), // Garden appears in Home Values, not Home Work
      coverImage: image().optional(), // validated at build; missing file = Zod error
      coverImageAlt: z.string().optional(),
      // Experiments: the "peek" shown inside the tile on hover/focus (design.md "Experiments preview v2"),
      // a real capture from the repo's README. Repo stats come from the GitHub API at build time.
      peekImage: image().optional(),
      peekCaption: z.string().optional(), // short mono line under the capture, e.g. "300+ installs"
      tags: z.array(z.string()).default([]), // what KIND of thing it is
      stack: z.array(z.string()), // what it was BUILT WITH
      tier: z.enum(['case-study', 'project', 'experiment']),
      team: z.object({ size: z.number().int().positive(), solo: z.boolean() }).optional(),
      myPart: z.string().optional(),
      kind: z.string().optional(), // card meta, e.g. 'University SaaS'
      problem: z.string().optional(), // one line for the card's "The problem"
      whatItDoes: z.string().optional(), // one line for the card's "What it does"
      insideStack: z.string().optional(), // Inside card "Stack" line; falls back to `stack` joined
      insideDecision: z.string().optional(), // Inside card "Key decision" line
      role: z.string().optional(),
      timeframe: z.string().optional(),
      constraints: z.array(z.string()).default([]), // short records; narrative in the body
      outcome: z.string().optional(), // one-line quantified result for cards
      repoUrl: z.url().optional(),
      demoUrl: z.url().optional(),
      demoLabel: z.string().optional(), // project-specific primary action
      heroDescription: z.string().optional(), // longer case-study hero copy
      // tier: project — the lighter technical page (design.md "Project page v1"). Without it the
      // project is a card only. Its key decision is `decisions[0]` (one or two rows are shown).
      page: z
        .object({
          headline: z.string(), // hero claim, one sentence
          sub: z.string(), // plain-language line under it
          glance: z.array(z.object({ label: z.string(), value: z.string() })).min(3).max(7),
          how: z.object({
            headline: z.string(),
            sub: z.string().optional(),
            steps: z
              .array(
                z.object({
                  title: z.string(),
                  text: z.string(),
                  formula: z.string().optional(), // mono card; "\n" separates lines
                })
              )
              .min(2)
              .max(4),
            table: z
              .object({
                title: z.string(),
                rows: z.array(z.array(z.string())).min(2), // first row is the header
                note: z.string().optional(),
              })
              .optional(),
          }),
          decisionHeadline: z.string(),
        })
        .optional(),
      caseStudy: z
        .object({
          headlines: z.object({
            problem: z.string(),
            features: z.string(),
            decisions: z.string(),
            mistakes: z.string(),
            growth: z.string(),
          }),
          glance: z.array(z.object({
            label: z.string(),
            value: z.string(),
          })),
          problem: z.array(z.string()),
          requirements: z.string(),
          constraint: z.string(),
          features: z.array(z.object({
            title: z.string(),
            description: z.string(),
            detail: z.string(), // technical explanation shown under the feature
            image: image().optional(),
            imageAlt: z.string().optional(),
            imagePresentation: z.enum(['screenshot', 'phone']).optional(), // phone image is centred at its natural aspect ratio
            terminal: z.string().optional(), // alternative to an image for agent activity
            note: z.string().optional(), // source or owner note below the terminal
          })),
          closing: z.array(z.object({
            title: z.string(),
            text: z.string(),
          })).optional(),
          proof: z.object({
            title: z.string(),
            text: z.string(),
          }).optional(),
          milestones: z.array(z.object({
            day: z.string(),
            title: z.string(),
            description: z.string(),
          })),
        })
        .optional(),
      decisions: z
        .array(
          z.object({
            choice: z.string(), // what was done
            rejected: z.string(), // what was discarded — REQUIRED, this is the forcing function (D2)
            because: z.string(), // the deciding constraint, one line
            subtitle: z.string().optional(), // technical summary under the choice
            cost: z.string().optional(), // tradeoff shown in the case-study table
          })
        )
        .default([]),
    })
    // Only `tier: project` entries are routed to a project page (content.ts projectRoutes); a `page`
    // anywhere else is copy that never renders, so the build says so instead of dropping it silently.
    .refine((data) => !data.page || data.tier === 'project', {
      message: '`page` is only rendered for `tier: project` entries',
      path: ['page'],
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
    icon: z.enum(['brand-github', 'brand-linkedin', 'brand-instagram', 'brand-youtube', 'brand-x']), // explicit key into ui/Icon.astro — no icon dependency
    order: z.number().int(), // explicit sort key, not JSON array position
    enabled: z.boolean().default(true), // retire a link without deleting the record
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      lang: z.enum(LOCALES),
      group: z.enum(['work', 'volunteering', 'beyond-class']),
      role: z.string(),
      organisation: z.string(),
      start: z.string(), // 'YYYY' or 'YYYY-MM'
      end: z.string().optional(), // absent means "now"
      description: z.string(),
      tags: z.array(z.string()).default([]), // visible Outside tags
      tools: z.array(z.string()).default([]), // Inside tags
      // The "what carries over to your team" item this role produced, if any.
      // `insideTitle` is the Inside lens's own line ("What carries into how I build").
      carriesOver: z
        .object({ title: z.string(), insideTitle: z.string().optional(), from: z.string(), order: z.number().int() })
        .optional(),
      // Inside annotation on one of this role's tags: `tag` names the chip it points at.
      toolNote: z.object({ tag: z.string(), title: z.string(), note: z.string() }).optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      order: z.number().int(),
    }),
});

export const collections = { projects, posts, links, experience };
