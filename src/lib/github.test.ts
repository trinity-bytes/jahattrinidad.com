import assert from 'node:assert/strict';
import { test } from 'node:test';
import { repoStats } from './github.ts';

const ok = (body: unknown) => async () => new Response(JSON.stringify(body), { status: 200 });

test('reads stars, forks, language and last push of a GitHub repository', async () => {
  const calls: string[] = [];
  const fetcher = async (url: string | URL | Request) => {
    calls.push(String(url));
    return ok({ stargazers_count: 2, forks_count: 0, language: 'QML', pushed_at: '2026-10-15T12:00:00Z' })();
  };
  const stats = await repoStats('https://github.com/trinity-bytes/omarchy-lock-keys-osd', fetcher);
  assert.deepEqual(stats, { stars: 2, forks: 0, language: 'QML', pushedAt: new Date('2026-10-15T12:00:00Z') });
  assert.deepEqual(calls, ['https://api.github.com/repos/trinity-bytes/omarchy-lock-keys-osd']);
});

test('a failed or rate-limited request gives no stats instead of failing the build', async () => {
  const limited = async () => new Response('rate limited', { status: 403 });
  const offline = async () => {
    throw new Error('network down');
  };
  assert.equal(await repoStats('https://github.com/trinity-bytes/forest-hero', limited), null);
  assert.equal(await repoStats('https://github.com/trinity-bytes/forest-hero', offline), null);
});

test('a URL that is not a GitHub repository gives no stats and makes no request', async () => {
  let called = false;
  const fetcher = async () => {
    called = true;
    return ok({})();
  };
  assert.equal(await repoStats('https://trama.jahattrinidad.com/', fetcher), null);
  assert.equal(await repoStats(undefined, fetcher), null);
  assert.equal(called, false);
});
