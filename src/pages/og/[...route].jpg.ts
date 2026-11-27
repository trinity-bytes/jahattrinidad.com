/**
 * One social preview JPEG per note and per case study, rendered at build time
 * from the Figma template (visual-design 8.2). Every other page uses the
 * default image (`OG_DEFAULT_IMAGE` in `src/lib/seo.ts`).
 */
import type { APIRoute } from 'astro';
import { entrySlug, ogImagePath, postRoutes, projectRoutes, type Locale } from '../../lib/content';
import { getDictionary, LOCALES } from '../../lib/i18n';
import { formatDate } from '../../lib/format';
import { renderOgCard, type OgCard } from '../../lib/og';

/** `/og/notes/<slug>.jpg` → `notes/<slug>`, the `[...route]` param. */
const routeOf = (path: string) => path.replace(/^\/og\//, '').replace(/\.jpg$/, '');

async function cardsFor(lang: Locale) {
  const t = getDictionary(lang);
  const signature = t.meta.ogSignature;
  const notes = (await postRoutes(lang)).map(({ props: { entry } }) => {
    const type = entry.data.type === 'essay' ? t.notes.essay : t.notes.tutorial;
    const card: OgCard = { label: `${type} · ${formatDate(entry.data.publishDate, lang)}`, title: entry.data.title, signature };
    return { params: { route: routeOf(ogImagePath('posts', lang, entrySlug(entry))) }, props: { card } };
  });
  const cases = (await projectRoutes(lang)).map(({ props: { entry } }) => {
    // Same eyebrow as the page itself (_views/CaseStudy.astro): project pages are not case studies.
    const label = [entry.data.page ? t.projectPage.eyebrow : t.caseStudy.eyebrow, entry.data.kind].filter(Boolean).join(' · ');
    const card: OgCard = { label, title: entry.data.title, signature };
    return { params: { route: routeOf(ogImagePath('projects', lang, entrySlug(entry))) }, props: { card } };
  });
  return [...notes, ...cases];
}

export async function getStaticPaths() {
  return (await Promise.all(LOCALES.map(cardsFor))).flat();
}

export const GET: APIRoute = async ({ props }) => {
  const image = await renderOgCard((props as { card: OgCard }).card);
  return new Response(new Uint8Array(image), { headers: { 'Content-Type': 'image/jpeg' } });
};
