import type { APIContext } from 'astro';
import { collectionPath, entryPath, entrySlug, listLinks, listPosts, listProjects, type Locale } from '../lib/content';
import { CONTACT_EMAIL, OWNER_NAME } from '../lib/consts';
import { cvPath } from '../lib/cv';
import { getDictionary, LOCALE_NAMES } from '../lib/i18n';
import { buildLlmsTxt } from '../lib/llms';

// /llms.txt (https://llmstxt.org) — a map of the site for AI agents, in English.
// ── every value that is not read from the content lives in this one block ──
const LOCALE: Locale = 'en';
const FACTS = [
  'Role: design engineer (frontend and product). Designs and builds web products end to end, from the first sketch to the live site.',
  'Education: Software Engineering student at Universidad Peruana de Ciencias Aplicadas (UPC), Lima, Peru.',
  'Availability: open to an internship in frontend or product design engineering, now. Based in Lima, Peru; open to remote.',
  'Languages: Spanish (native), English, Portuguese. The site is published in English, Spanish (/es/) and Portuguese (/pt/).',
  'Also known as: trinitybytes (X, Instagram, LinkedIn), trinity-bytes (GitHub).',
];
const CV_LOCALES: readonly Locale[] = ['en', 'es', 'pt'];
// ──────────────────────────────────────────────────────────────────────────

export async function GET(context: APIContext) {
  const { site } = context;
  if (!site) {
    throw new Error('astro.config.mjs must define `site` before llms.txt can be generated.');
  }
  const t = getDictionary(LOCALE);
  const [projects, posts, links] = await Promise.all([
    listProjects({ lang: LOCALE }),
    listPosts({ lang: LOCALE }),
    listLinks(),
  ]);

  const body = buildLlmsTxt({
    site,
    name: OWNER_NAME,
    summary: t.meta.homeDescription,
    facts: FACTS,
    pages: [
      { title: 'Home', path: '/', description: t.meta.homeDescription },
      { title: 'Work', path: collectionPath('projects', LOCALE), description: t.meta.workDescription },
      { title: 'Notes', path: collectionPath('posts', LOCALE), description: t.meta.notesDescription },
      { title: 'Links', path: '/links/', description: t.meta.linksDescription },
    ],
    projects: projects.map((p) => ({
      title: p.data.title,
      path: entryPath('projects', LOCALE, entrySlug(p)),
      description: p.data.description,
    })),
    posts: posts.map(({ entry }) => ({
      title: entry.data.title,
      path: entryPath('posts', LOCALE, entrySlug(entry)),
      description: entry.data.description,
    })),
    profiles: links.map((l) => ({ label: l.data.label, url: l.data.url })),
    cv: CV_LOCALES.map((lang) => ({ label: `CV (${LOCALE_NAMES[lang]}, PDF)`, path: cvPath(lang) })),
    email: CONTACT_EMAIL,
  });

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
