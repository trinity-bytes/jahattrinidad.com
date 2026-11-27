/**
 * Live repository numbers for the experiment tiles, read from the GitHub API at build time
 * (owner, 2026-11-25: "consultalo a la api en cada build. hacer eso a mano es cuestion de
 * tiempo para que sea olvidado").
 *
 * A build must never fail because GitHub is slow, offline or rate-limited: any problem
 * returns `null` and the tile simply shows no stats. Set `GITHUB_TOKEN` in the build
 * environment to raise the anonymous limit (60 requests an hour per IP).
 */
export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: Date;
}

type Fetcher = (url: string) => Promise<Response>;

const TIMEOUT_MS = 5000;
// One request per repository per build, shared by the en, es and pt pages.
const cache = new Map<string, Promise<RepoStats | null>>();

function repoPath(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)\/?$/);
  return match ? `${match[1]}/${match[2]}` : null;
}

const defaultFetch: Fetcher = (url) => {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-build' };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
};

async function load(path: string, fetcher: Fetcher): Promise<RepoStats | null> {
  try {
    const response = await fetcher(`https://api.github.com/repos/${path}`);
    if (!response.ok) {
      console.warn(`[github] ${path}: HTTP ${response.status}, showing no stats`);
      return null;
    }
    const body = await response.json();
    // `new Date(null)` is 1970 and `new Date('junk')` throws later in formatDate: both mean no stats.
    const pushedAt = typeof body.pushed_at === 'string' ? new Date(body.pushed_at) : null;
    if (!pushedAt || Number.isNaN(pushedAt.getTime())) {
      console.warn(`[github] ${path}: no valid pushed_at, showing no stats`);
      return null;
    }
    return {
      stars: Number(body.stargazers_count) || 0,
      forks: Number(body.forks_count) || 0,
      language: typeof body.language === 'string' ? body.language : null,
      pushedAt,
    };
  } catch (error) {
    console.warn(`[github] ${path}: ${(error as Error).message}, showing no stats`);
    return null;
  }
}

/** Stats for a `https://github.com/<owner>/<repo>` URL, or `null` for any other URL or any failure. */
export function repoStats(url: string | undefined, fetcher?: Fetcher): Promise<RepoStats | null> {
  const path = repoPath(url);
  if (!path) return Promise.resolve(null);
  if (fetcher) return load(path, fetcher);
  if (!cache.has(path)) cache.set(path, load(path, defaultFetch));
  return cache.get(path)!;
}
