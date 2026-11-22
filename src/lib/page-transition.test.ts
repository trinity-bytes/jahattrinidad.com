import assert from 'node:assert/strict';
import { test } from 'node:test';
import { shouldRecordOrigin, readOrigin, readPoint, planReveal, pageTransitionScript } from './page-transition.ts';

const base = { href: 'https://jahattrinidad.com/work/', current: 'https://jahattrinidad.com/', target: '', download: false, button: 0, modified: false };

test('a plain click on a link to another page of the site records the origin', () => {
  assert.equal(shouldRecordOrigin(base), true);
});

test('links that do not open another page of the site in this tab record nothing', () => {
  assert.equal(shouldRecordOrigin({ ...base, href: 'https://github.com/trinity-bytes' }), false);
  assert.equal(shouldRecordOrigin({ ...base, target: '_blank' }), false);
  assert.equal(shouldRecordOrigin({ ...base, download: true }), false);
  assert.equal(shouldRecordOrigin({ ...base, modified: true }), false);
  assert.equal(shouldRecordOrigin({ ...base, button: 1 }), false);
  assert.equal(shouldRecordOrigin({ ...base, href: 'mailto:hello@example.com' }), false);
});

test('a link to a section of the same page records nothing (it scrolls, it does not navigate)', () => {
  assert.equal(shouldRecordOrigin({ ...base, href: 'https://jahattrinidad.com/#work' }), false);
  assert.equal(shouldRecordOrigin({ ...base, href: 'https://jahattrinidad.com/work/#contact', current: 'https://jahattrinidad.com/work/' }), false);
});

test('a section of another page still records the origin', () => {
  assert.equal(shouldRecordOrigin({ ...base, href: 'https://jahattrinidad.com/#experience', current: 'https://jahattrinidad.com/work/' }), true);
});

test('a recorded origin is used only while fresh', () => {
  const stored = JSON.stringify({ x: 0.9, y: 0.05, t: 1000 });
  assert.deepEqual(readOrigin(stored, 2000), { x: 0.9, y: 0.05 });
  assert.equal(readOrigin(stored, 1000 + 5001), null);
  assert.equal(readOrigin(null, 2000), null);
  assert.equal(readOrigin('not json', 2000), null);
});

test('the inline script opts into cross-document transitions only with motion allowed', () => {
  const script = pageTransitionScript();
  assert.match(script, /prefers-reduced-motion/);
  assert.match(script, /pagereveal/);
  assert.match(script, /data-page-reveal|pageReveal/);
});

test('a stored point of a page is read without expiry, broken values are ignored', () => {
  assert.deepEqual(readPoint(JSON.stringify({ x: 0.2, y: 0.8 })), { x: 0.2, y: 0.8 });
  assert.equal(readPoint(null), null);
  assert.equal(readPoint('{"x":"a"}'), null);
  assert.equal(readPoint('nope'), null);
});

const point = { x: 0.7, y: 0.06 };

test('a click on a link grows the new page from the click', () => {
  assert.deepEqual(planReveal({ navigationType: 'push', back: false, fresh: point, currentPoint: null, previousPoint: null }), { mode: 'grow', ...point });
});

test('a push without a recorded click, or a reload, keeps the default crossfade', () => {
  assert.equal(planReveal({ navigationType: 'push', back: false, fresh: null, currentPoint: point, previousPoint: point }), null);
  assert.equal(planReveal({ navigationType: 'reload', back: false, fresh: point, currentPoint: point, previousPoint: point }), null);
});

test('going back shrinks the page being left into the link that had led away from this one', () => {
  const back = { x: 0.1, y: 0.9 };
  assert.deepEqual(planReveal({ navigationType: 'traverse', back: true, fresh: null, currentPoint: back, previousPoint: point }), { mode: 'shrink', ...back });
});

test('going forward again grows the page from the link it was first opened from', () => {
  assert.deepEqual(planReveal({ navigationType: 'traverse', back: false, fresh: null, currentPoint: null, previousPoint: point }), { mode: 'grow', ...point });
});

test('a traversal with no stored point keeps the default crossfade', () => {
  assert.equal(planReveal({ navigationType: 'traverse', back: true, fresh: null, currentPoint: null, previousPoint: null }), null);
  assert.equal(planReveal({ navigationType: 'traverse', back: false, fresh: null, currentPoint: null, previousPoint: null }), null);
});
