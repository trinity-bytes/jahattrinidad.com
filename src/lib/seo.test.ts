import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildSeo, OG_DEFAULT_IMAGE, personJsonLd } from './seo.ts';

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

test('the person schema names the owner, role, school and profiles on the page URL', () => {
  const json = personJsonLd({
    site,
    path: '/es/',
    description: 'Jahat Trinidad, Design Engineer en Lima, Perú.',
    sameAs: ['https://github.com/trinity-bytes', 'https://www.linkedin.com/in/trinitybytes'],
  });
  const data = JSON.parse(json);
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(data['@type'], 'Person');
  assert.equal(data.name, 'Jahat Trinidad');
  assert.equal(data.jobTitle, 'Design Engineer');
  assert.equal(data.url, 'https://jahattrinidad.com/es/');
  assert.equal(data.description, 'Jahat Trinidad, Design Engineer en Lima, Perú.');
  assert.equal(data.alumniOf.name, 'Universidad Peruana de Ciencias Aplicadas');
  assert.equal(data.address.addressLocality, 'Lima');
  assert.deepEqual(data.sameAs, ['https://github.com/trinity-bytes', 'https://www.linkedin.com/in/trinitybytes']);
});

test('the person schema cannot close its script tag', () => {
  const json = personJsonLd({ site, path: '/', description: '</script><b>', sameAs: [] });
  assert.ok(!json.includes('</'));
  assert.equal(JSON.parse(json).description, '</script><b>');
});
