import assert from 'node:assert/strict';
import { test } from 'node:test';
import sharp from 'sharp';
import { renderOgCard } from './og.ts';

const card = {
  label: 'Essay · Sep 18, 2026',
  title: 'Why this site enforces its own architecture with a zero-dependency script',
  signature: 'Jahat Trinidad · jahattrinidad.com',
};

test('a page card is a 1200 × 630 JPEG', async () => {
  const image = await renderOgCard(card);
  const meta = await sharp(image).metadata();
  assert.equal(meta.format, 'jpeg');
  assert.equal(meta.width, 1200);
  assert.equal(meta.height, 630);
});

test('a title too long for three lines still renders at the same size', async () => {
  const image = await renderOgCard({ ...card, title: card.title.repeat(4) });
  const meta = await sharp(image).metadata();
  assert.equal(meta.width, 1200);
  assert.equal(meta.height, 630);
});
