// Link arrows mean where a link goes, so the visitor knows before clicking:
//   →  another page of this site, same tab
//   ↗  leaves the site (demo, GitHub, LinkedIn, the CV PDF, RSS): new tab + screen-reader note
// This script reads the built HTML in dist/ and fails when a link breaks that rule.
// Zero dependencies on purpose (node:fs and node:path only), like check-boundaries.mjs.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE_HOSTS = new Set(['jahattrinidad.com', 'www.jahattrinidad.com']);
// The arrow-up-right icon path (src/components/ui/Icon.astro and the chat's own copy).
const UP_RIGHT = 'M7 17 17 7';
// The arrow-right icon path, or the → glyph.
const RIGHT = /M5 12h14|→/;
// common.newTab in every dictionary.
const NEW_TAB = ['opens in a new tab', 'se abre en una pestaña nueva', 'abre em uma nova aba'];

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

function kind(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return 'skip';
  if (/^https?:\/\//.test(href)) return SITE_HOSTS.has(new URL(href).host) ? 'self' : 'out';
  if (/\.(pdf|xml)$/.test(href)) return 'out';
  return 'in';
}

const problems = [];
// <template> content is inert until the client fills it in (the chat steps); skip it.
const stripTemplates = (html) => html.replace(/<template[\s\S]*?<\/template>/g, '');

for (const file of htmlFiles(DIST)) {
  const html = stripTemplates(readFileSync(file, 'utf8'));
  const page = relative(DIST, file);
  for (const [, open, inner] of html.matchAll(/(<a\b[^>]*>)([\s\S]*?)<\/a>/g)) {
    const href = attr(open, 'href');
    const type = kind(href);
    if (type === 'skip') continue;
    const blank = attr(open, 'target') === '_blank';
    const label = `${inner} ${attr(open, 'aria-label') ?? ''}`;
    const fail = (message) => problems.push(`${page}: ${message}: ${href}`);
    if (type === 'self') fail('absolute link to this site, use a site path');
    if (type === 'out') {
      if (!blank) fail('leaves the site without opening a new tab');
      if (RIGHT.test(inner)) fail('leaves the site with the → arrow (use ↗)');
      if (!NEW_TAB.some((note) => label.includes(note))) fail('leaves the site without the new-tab screen-reader note');
    }
    if (type === 'in') {
      if (blank) fail('site page opens a new tab');
      if (inner.includes(UP_RIGHT)) fail('site page carries the ↗ arrow (use →)');
    }
  }
}

if (problems.length) {
  console.error([...new Set(problems)].join('\n'));
  console.error(`✗ links: ${problems.length} problem(s). See the arrow rule in CLAUDE.md.`);
  process.exit(1);
}
console.log('✓ links clean — internal →, external ↗ in a new tab.');
