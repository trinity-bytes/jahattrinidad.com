// Tells IndexNow engines (Bing and those on its index) which URLs the site has.
// Run by hand after a deploy: `npm run build && npm run indexnow` (`-- --dry-run` only prints).
// Not part of `check` or `build`: it talks to the network. node: imports only.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const dryRun = process.argv.includes('--dry-run');

// The key file is public/<key>.txt and contains the key; the engines fetch it to verify ownership.
const keyFile = readdirSync('public').find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
const key = keyFile?.slice(0, -'.txt'.length);
if (!key || readFileSync(join('public', keyFile), 'utf8').trim() !== key) {
  throw new Error('public/ needs a <32 hex>.txt file that contains its own name.');
}

const sitemaps = readdirSync('dist').filter((name) => /^sitemap-\d+\.xml$/.test(name));
const urlList = sitemaps.flatMap((name) =>
  Array.from(readFileSync(join('dist', name), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1])
);
if (urlList.length === 0) throw new Error('No URLs in dist/sitemap-*.xml. Run `npm run build` first.');

const { host, origin } = new URL(urlList[0]);
const payload = { host, key, keyLocation: `${origin}/${keyFile}`, urlList };

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
} else {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  // 200: accepted; 202: accepted, key still to be verified.
  if (!response.ok) throw new Error(`IndexNow answered ${response.status}: ${await response.text()}`);
  console.log(`IndexNow accepted ${urlList.length} URLs (${response.status}).`);
}
