/**
 * The seam. This is the ONLY file in the project allowed to value-import
 * `astro:content` — including `render()` (D3). No page, layout, or
 * component may import `getCollection`, `getEntry`, or `render` directly;
 * `scripts/check-boundaries.mjs` enforces this mechanically.
 */
import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { entryPath } from './paths';
export { collectionPath, entryPath, ogImagePath } from './paths';

export type Locale = 'en' | 'es' | 'pt';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'posts'>;
export type Link = CollectionEntry<'links'>;
export type Experience = CollectionEntry<'experience'>;

/** Collections that are translatable. `links` is not. */
export type TranslatableCollection = 'projects' | 'posts';

export interface ListOptions {
  /** REQUIRED by design — see D5. There is no default locale in this module. */
  lang: Locale;
  /** Default 'newest'. Ordering key is publishDate. */
  order?: 'newest' | 'oldest';
  /** Applied after filtering and ordering. */
  limit?: number;
}

export interface ProjectListOptions extends ListOptions {
  /** Default false. true = only entries with featured: true. */
  featuredOnly?: boolean;
}

/** Derived data is composed, never attached to the entry — see D6. */
export interface PostListItem {
  entry: Post;
  readingTime: number;
}

export interface TranslationLink {
  lang: Locale;
  slug: string;
  /** Site-relative, locale-aware, trailing slash. e.g. '/es/notes/hola-mundo/' */
  path: string;
}

export interface EntryRoute<E> {
  params: { slug: string };
  props: { entry: E };
}

// ── Coverage fixture — validated by the schemas, never listed or routed ──
// Entries whose id starts with this prefix exist only so every optional
// schema field is set at least once (content-model spec, "Real Entries and a
// Coverage Fixture"). Every function below drops them, in dev too.
const FIXTURE_PREFIX = 'coverage-fixture';
const isFixture = (entry: { id: string }) => entry.id.startsWith(FIXTURE_PREFIX);

// ── Draft gate (D4) — applied by every function below ──
const INCLUDE_DRAFTS = import.meta.env.DEV;
const isVisible = (entry: { id: string; data: { draft: boolean } }) =>
  !isFixture(entry) && (INCLUDE_DRAFTS || !entry.data.draft);

function sortByPublishDate<E extends { data: { publishDate: Date } }>(
  entries: E[],
  order: 'newest' | 'oldest' = 'newest'
): E[] {
  const sorted = [...entries].sort(
    (a, b) => a.data.publishDate.getTime() - b.data.publishDate.getTime()
  );
  return order === 'newest' ? sorted.reverse() : sorted;
}

export async function listProjects(o: ProjectListOptions): Promise<Project[]> {
  const entries = await getCollection(
    'projects',
    (e) => isVisible(e) && e.data.lang === o.lang && (!o.featuredOnly || e.data.featured)
  );
  const sorted = sortByPublishDate(entries, o.order);
  return typeof o.limit === 'number' ? sorted.slice(0, o.limit) : sorted;
}

export async function listPosts(o: ListOptions): Promise<PostListItem[]> {
  const entries = await getCollection(
    'posts',
    (e) => isVisible(e) && e.data.lang === o.lang
  );
  const sorted = sortByPublishDate(entries, o.order);
  const limited = typeof o.limit === 'number' ? sorted.slice(0, o.limit) : sorted;
  return limited.map((entry) => ({ entry, readingTime: getReadingTime(entry) }));
}

/** No `lang` parameter — the `links` collection is language-agnostic (D5 exception). */
export async function listLinks(): Promise<Link[]> {
  const entries = await getCollection('links', (e) => !isFixture(e) && e.data.enabled);
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

export async function listExperience(lang: Locale): Promise<Experience[]> {
  const entries = await getCollection('experience', (entry) => !isFixture(entry) && entry.data.lang === lang);
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

// ── Locale folders ──
// English entries sit at the collection root; every other locale lives in a
// folder named after it (`projects/es/viora.mdx`), so its id is `es/viora`.
// Routes and translation links use the slug without that folder.
const DEFAULT_LOCALE: Locale = 'en';
const entryId = (lang: Locale, slug: string) => (lang === DEFAULT_LOCALE ? slug : `${lang}/${slug}`);

/** URL slug of an entry: its id without the locale folder. */
export function entrySlug(entry: { id: string; data: { lang: Locale } }): string {
  const folder = `${entry.data.lang}/`;
  return entry.data.lang !== DEFAULT_LOCALE && entry.id.startsWith(folder) ? entry.id.slice(folder.length) : entry.id;
}

export async function getProject(slug: string, lang: Locale): Promise<Project | undefined> {
  const entry = await getEntry('projects', entryId(lang, slug));
  if (!entry || entry.data.lang !== lang || !isVisible(entry)) return undefined;
  return entry;
}

export async function getPost(slug: string, lang: Locale): Promise<Post | undefined> {
  const entry = await getEntry('posts', entryId(lang, slug));
  if (!entry || entry.data.lang !== lang || !isVisible(entry)) return undefined;
  return entry;
}

/** Whether a project entry is routed to a page (see projectRoutes). The one rule for routes and hreflang. */
function hasProjectPage(entry: Project): boolean {
  return entry.data.tier === 'case-study' || (entry.data.tier === 'project' && Boolean(entry.data.page));
}

/**
 * The projects that get a page: every `case-study`, and the `project` entries
 * that carry a `page` (the lighter project page). The other `project` entries
 * and every `experiment` are cards on the Work index that link straight to
 * Live and Code, so a page for them would be an orphan in the sitemap.
 */
export async function projectRoutes(lang: Locale): Promise<EntryRoute<Project>[]> {
  const entries = (await listProjects({ lang })).filter(hasProjectPage);
  return entries.map((entry) => ({ params: { slug: entrySlug(entry) }, props: { entry } }));
}

export async function postRoutes(lang: Locale): Promise<EntryRoute<Post>[]> {
  const items = await listPosts({ lang });
  return items.map(({ entry }) => ({ params: { slug: entrySlug(entry) }, props: { entry } }));
}

/**
 * Returns the full translation group INCLUDING the entry itself, so length
 * 1 means "no counterpart" — one uniform predicate instead of a two-branch
 * "no key" / "key but no counterpart" special case (D9, mirrors
 * `@astrojs/sitemap`'s `createGetI18nLinks()`).
 *
 * Throws when two members of the same group share a `lang`: Zod cannot
 * express cross-entry uniqueness, so this is the only place the
 * constraint can live (D9).
 */
export async function getTranslationGroup(
  collection: TranslatableCollection,
  entry: Project | Post
): Promise<TranslationLink[]> {
  const key = entry.data.translationKey;
  const toLink = (lang: Locale, slug: string): TranslationLink => ({
    lang,
    slug,
    path: entryPath(collection, lang, slug),
  });

  if (!key) return [toLink(entry.data.lang, entrySlug(entry))];

  const members =
    collection === 'projects'
      ? await getCollection(
          'projects',
          // Only translations that have a page: an hreflang to an unrouted one would point at a 404.
          (e) => isVisible(e) && e.data.translationKey === key && hasProjectPage(e)
        )
      : await getCollection(
          'posts',
          (e) => isVisible(e) && e.data.translationKey === key
        );

  const seenLang = new Map<Locale, string>();
  for (const member of members) {
    const prior = seenLang.get(member.data.lang);
    if (prior && prior !== member.id) {
      throw new Error(
        `getTranslationGroup: ambiguous translationKey "${key}" in collection "${collection}" — ` +
          `entries "${prior}" and "${member.id}" both declare lang "${member.data.lang}"`
      );
    }
    seenLang.set(member.data.lang, member.id);
  }

  return members.map((m) => toLink(m.data.lang, entrySlug(m)));
}

const WORDS_PER_MINUTE = 200;

/** Pure. Whole minutes, minimum 1. */
export function getReadingTime(entry: Post | Project): number {
  const prose = (entry.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ') // fenced code: not read at prose speed
    .replace(/`[^`\n]*`/g, ' ') // inline code
    .replace(/^\s*(?:import|export)\s.*$/gm, ' ') // MDX module statements
    .replace(/<[^>]+>/g, ' ') // HTML / JSX tags
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1'); // links & images: keep the label
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Wraps `render()` from `astro:content` (D3). Asserted correct by design,
 * not verified until the first successful `astro build` — see task 8.1.
 * If `render()` misbehaves through this wrapper, the documented fallback
 * is a `render`-only allow-list entry in `scripts/check-boundaries.mjs`.
 */
export async function renderEntry(entry: Project | Post) {
  return render(entry);
}
