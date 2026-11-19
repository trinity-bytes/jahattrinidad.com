import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildSeo, OG_DEFAULT_IMAGE } from './seo.ts';

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
