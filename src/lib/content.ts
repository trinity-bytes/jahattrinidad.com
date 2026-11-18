/**
 * The seam. This is the ONLY file in the project allowed to value-import
 * `astro:content` — including `render()` (D3). No page, layout, or
 * component may import `getCollection`, `getEntry`, or `render` directly;
 * `scripts/check-boundaries.mjs` enforces this mechanically.
 */
import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { entryPath } from './paths';
export { collectionPath, entryPath } from './paths';

export type Locale = 'en' | 'es';

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

// ── Draft gate (D4) — applied by every function below ──
const INCLUDE_DRAFTS = import.meta.env.DEV;
const isVisible = (data: { draft: boolean }) => INCLUDE_DRAFTS || !data.draft;

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
    (e) => isVisible(e.data) && e.data.lang === o.lang && (!o.featuredOnly || e.data.featured)
  );
  const sorted = sortByPublishDate(entries, o.order);
  return typeof o.limit === 'number' ? sorted.slice(0, o.limit) : sorted;
}

export async function listPosts(o: ListOptions): Promise<PostListItem[]> {
  const entries = await getCollection(
    'posts',
    (e) => isVisible(e.data) && e.data.lang === o.lang
  );
  const sorted = sortByPublishDate(entries, o.order);
  const limited = typeof o.limit === 'number' ? sorted.slice(0, o.limit) : sorted;
  return limited.map((entry) => ({ entry, readingTime: getReadingTime(entry) }));
}

/** No `lang` parameter — the `links` collection is language-agnostic (D5 exception). */
export async function listLinks(): Promise<Link[]> {
  const entries = await getCollection('links', (e) => e.data.enabled);
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

export async function listExperience(lang: Locale): Promise<Experience[]> {
  const entries = await getCollection('experience', (entry) => entry.data.lang === lang);
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

export async function getProject(slug: string, lang: Locale): Promise<Project | undefined> {
  const entry = await getEntry('projects', slug);
  if (!entry || entry.data.lang !== lang || !isVisible(entry.data)) return undefined;
  return entry;
}

export async function getPost(slug: string, lang: Locale): Promise<Post | undefined> {
  const entry = await getEntry('posts', slug);
  if (!entry || entry.data.lang !== lang || !isVisible(entry.data)) return undefined;
  return entry;
}

export async function projectRoutes(lang: Locale): Promise<EntryRoute<Project>[]> {
  const entries = await listProjects({ lang });
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export async function postRoutes(lang: Locale): Promise<EntryRoute<Post>[]> {
  const items = await listPosts({ lang });
  return items.map(({ entry }) => ({ params: { slug: entry.id }, props: { entry } }));
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

  if (!key) return [toLink(entry.data.lang, entry.id)];

  const members =
    collection === 'projects'
      ? await getCollection(
          'projects',
          (e) => isVisible(e.data) && e.data.translationKey === key
        )
      : await getCollection(
          'posts',
          (e) => isVisible(e.data) && e.data.translationKey === key
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

  return members.map((m) => toLink(m.data.lang, m.id));
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
