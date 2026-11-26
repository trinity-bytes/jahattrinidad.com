import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { test } from 'node:test';
import {
  blogPostingNode, breadcrumbNode, buildSeo, isLiveApp, jsonLdGraph, metaDescription, OG_DEFAULT_IMAGE,
  pageTitle, personId, personNode, projectNode, websiteNode, whatItIs,
} from './seo.ts';

// The dictionaries import each other without extensions and i18n.ts imports a virtual Astro
// module: resolve both here so the real en/es/pt copy is what gets measured.
registerHooks({
  resolve(specifier, context, next) {
    if (specifier === 'astro:i18n') {
      return { url: 'data:text/javascript,export const getRelativeLocaleUrl = () => "/";', shortCircuit: true };
    }
    if (/^\.\.?\//.test(specifier) && !/\.(ts|js|mjs|json)$/.test(specifier) && context.parentURL?.endsWith('.ts')) {
      return next(`${specifier}.ts`, context);
    }
    return next(specifier, context);
  },
});
const { getDictionary, LOCALES } = await import('./i18n.ts');

const site = new URL('https://jahattrinidad.com');
const base = { title: 'Work', description: 'Projects', path: '/work', lang: 'en' as const, site };

test('every page gets the default Open Graph image as an absolute URL with its size', () => {
  const seo = buildSeo(base);
  assert.equal(seo.openGraph['og:image'], 'https://jahattrinidad.com/og/default.jpg');
  assert.equal(seo.openGraph['og:image:width'], String(OG_DEFAULT_IMAGE.width));
  assert.equal(seo.openGraph['og:image:height'], String(OG_DEFAULT_IMAGE.height));
});

test('the existing Open Graph fields keep their values', () => {
  const seo = buildSeo(base);
  assert.equal(seo.openGraph['og:title'], 'Work');
  assert.equal(seo.openGraph['og:description'], 'Projects');
  assert.equal(seo.openGraph['og:url'], 'https://jahattrinidad.com/work/');
  assert.equal(seo.openGraph['og:type'], 'website');
});

test('a page with its own image points og:image at it and carries its alt', () => {
  const seo = buildSeo({ ...base, image: { path: '/og/notes/boundaries.jpg', alt: 'Boundaries' } });
  assert.equal(seo.openGraph['og:image'], 'https://jahattrinidad.com/og/notes/boundaries.jpg');
  assert.equal(seo.imageAlt, 'Boundaries');
});

const inRange = (text: string) => assert.ok(text.length >= 140 && text.length <= 160, `${text.length}: ${text}`);

const person = personNode({
  site,
  description: 'Jahat Trinidad, design engineer in Lima, Peru.',
  sameAs: ['https://github.com/trinity-bytes', 'https://x.com/trinitybytes'],
  image: '/_astro/jahat.abc.jpg',
});

test('the person has one site-wide @id, a square portrait and only sourced facts', () => {
  assert.equal(personId(site), 'https://jahattrinidad.com/#person');
  assert.equal(person['@type'], 'Person');
  assert.equal(person['@id'], personId(site));
  assert.equal(person.name, 'Jahat Trinidad');
  assert.deepEqual(person.alternateName, ['trinitybytes', '@trinitybytes']);
  assert.equal(person.jobTitle, 'Design Engineer');
  assert.equal(person.url, 'https://jahattrinidad.com/');
  assert.deepEqual(person.image, { '@type': 'ImageObject', url: 'https://jahattrinidad.com/_astro/jahat.abc.jpg', width: 600, height: 600 });
  assert.equal(person.alumniOf.name, 'Universidad Peruana de Ciencias Aplicadas');
  assert.equal(person.address.addressLocality, 'Lima');
  assert.ok(person.knowsAbout.length > 0);
  assert.deepEqual(person.sameAs, ['https://github.com/trinity-bytes', 'https://x.com/trinitybytes']);
});

test('the website node names the site and is published by the person', () => {
  const node = websiteNode({ site, path: '/pt/', lang: 'pt' });
  assert.equal(node['@type'], 'WebSite');
  assert.equal(node.name, 'Jahat Trinidad');
  assert.ok(node.alternateName.includes('trinitybytes'));
  assert.equal(node.url, 'https://jahattrinidad.com/pt/');
  assert.equal(node.inLanguage, 'pt-BR');
  assert.deepEqual(node.publisher, { '@id': personId(site) });
});

test('breadcrumbs are numbered from 1 with absolute URLs', () => {
  const node = breadcrumbNode(site, [{ name: 'Home', path: '/' }, { name: 'Work', path: '/work/' }]);
  assert.equal(node['@type'], 'BreadcrumbList');
  assert.deepEqual(node.itemListElement, [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jahattrinidad.com/' },
    { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://jahattrinidad.com/work/' },
  ]);
});

const entry = {
  site, url: 'https://jahattrinidad.com/notes/a/', lang: 'en' as const, name: 'A', description: 'About A',
  image: '/og/notes/a.jpg', datePublished: new Date('2026-09-18T00:00:00Z'),
};

test('a post is a BlogPosting by the person, with dates, image and language', () => {
  const node = blogPostingNode(entry);
  assert.equal(node['@type'], 'BlogPosting');
  assert.equal(node.headline, 'A');
  assert.equal(node.url, entry.url);
  assert.equal(node.datePublished, '2026-09-18');
  assert.equal(node.inLanguage, 'en-US');
  assert.equal(node.image, 'https://jahattrinidad.com/og/notes/a.jpg');
  assert.deepEqual(node.author, { '@id': personId(site) });
  assert.ok(!('dateModified' in node));
  assert.equal(blogPostingNode({ ...entry, dateModified: new Date('2026-10-01T00:00:00Z') }).dateModified, '2026-10-01');
});

test('a project is a CreativeWork; the person is author only when it was solo work', () => {
  const solo = projectNode({ ...entry, app: false, solo: true });
  assert.equal(solo['@type'], 'CreativeWork');
  assert.deepEqual(solo.author, { '@id': personId(site) });
  assert.ok(!('contributor' in solo));
  const team = projectNode({ ...entry, app: false, solo: false });
  assert.deepEqual(team.contributor, { '@id': personId(site) });
  assert.ok(!('author' in team));
});

test('a project whose live demo is the app itself is a SoftwareApplication', () => {
  const node = projectNode({ ...entry, app: true, solo: true, demoUrl: 'https://trama.jahattrinidad.com/' });
  assert.equal(node['@type'], 'SoftwareApplication');
  assert.equal(node.operatingSystem, 'Web');
  assert.equal(node.sameAs, 'https://trama.jahattrinidad.com/');
  assert.ok(isLiveApp('trama', 'https://trama.jahattrinidad.com/'));
  assert.ok(!isLiveApp('trama', undefined));
  assert.ok(!isLiveApp('minka', 'https://minka.jahattrinidad.com/')); // its demo is a landing page
});

test('the graph is one script-safe JSON document', () => {
  const json = jsonLdGraph([person, blogPostingNode({ ...entry, name: '</script><b>' })]);
  assert.ok(!json.includes('</'));
  const data = JSON.parse(json);
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(data['@graph'].length, 2);
  assert.equal(data['@graph'][1].headline, '</script><b>');
});

test('titles read "page — what it is · Jahat Trinidad"', () => {
  assert.equal(pageTitle('Viora', 'University SaaS'), 'Viora — University SaaS · Jahat Trinidad');
});

test('a title that is already too long drops what it is, never the page name or the brand', () => {
  const name = 'Why this site enforces its own architecture with a script';
  assert.equal(pageTitle(name, 'Essay', { max: 60 }), `${name} · Jahat Trinidad`);
});

test('what a project is: the first part of its kind, never a repeat of its name', () => {
  assert.equal(whatItIs('Viora', 'University SaaS', 'Project'), 'University SaaS');
  assert.equal(whatItIs('AllinBand', 'Landing · Team of 4', 'Project'), 'Landing');
  assert.equal(whatItIs('Portfolio', 'Portfolio · Solo', 'Web project'), 'Web project');
  assert.equal(whatItIs('X', undefined, 'Project'), 'Project');
});

test('a description gets the signature that brings it into 140–160 characters', () => {
  const lead = 'a'.repeat(100);
  const out = metaDescription(lead, ['Short.', 'b'.repeat(45)]);
  assert.equal(out, `${lead} ${'b'.repeat(45)}`);
});

test('a short description borrows the extra sentence, a long one is cut at a word, and both keep the signature', () => {
  const sig = 'By Jahat Trinidad, design engineer.';
  const short = metaDescription('Short claim.', [sig], 'More about it, told in plain words. '.repeat(6));
  inRange(short);
  assert.ok(short.startsWith('Short claim. More'));
  assert.ok(short.endsWith(`… ${sig}`));
  const long = metaDescription('several ordinary words '.repeat(12), [sig]);
  inRange(long);
  assert.ok(long.endsWith(`… ${sig}`));
  assert.ok(!/ …|[,;:.]…/.test(long));
});

test('a subtitle that opens with the description is not repeated', () => {
  const out = metaDescription('A library of ideas.', ['By Jahat Trinidad.'], 'A library of ideas. I designed and built all of it. '.repeat(3));
  assert.equal(out.split('A library of ideas. I designed').length - 1 > 0, true);
  assert.ok(!out.startsWith('A library of ideas. A library of ideas.'), out);
});

for (const lang of LOCALES) {
  const t = getDictionary(lang);

  test(`${lang}: static page descriptions are 140–160 characters and name the owner`, () => {
    for (const text of [t.meta.homeDescription, t.meta.workDescription, t.meta.notesDescription, t.meta.linksDescription]) {
      inRange(text);
      assert.ok(text.includes('Jahat Trinidad'), text);
    }
  });

  test(`${lang}: index page titles fit in 60 characters`, () => {
    for (const [name, what] of [[t.nav.work, t.meta.workWhat], [t.nav.notes, t.meta.notesWhat], [t.nav.links, t.meta.linksWhat]]) {
      const title = pageTitle(name, what);
      assert.equal(title, `${name} — ${what} · Jahat Trinidad`);
      assert.ok(title.length <= 60, `${title.length}: ${title}`);
    }
  });

  test(`${lang}: a description of 36 to 124 characters is never cut`, () => {
    for (const signatures of [t.meta.projectSignatures, t.meta.postSignatures]) {
      for (let length = 36; length <= 123; length += 1) {
        const out = metaDescription('word '.repeat(50).slice(0, length - 1) + '.', signatures);
        assert.ok(!out.includes('…') && out.length >= 140, `${length} → ${out.length}: ${out}`);
      }
    }
  });

  test(`${lang}: project and post signatures land entry descriptions of any usual length in range`, () => {
    for (const signatures of [t.meta.projectSignatures, t.meta.postSignatures]) {
      assert.ok(signatures.every((signature) => signature.includes('Jahat Trinidad')));
      for (let length = 40; length <= 200; length += 1) {
        inRange(metaDescription('word '.repeat(50).slice(0, length - 1) + '.', signatures, 'extra '.repeat(30)));
      }
    }
  });
}
