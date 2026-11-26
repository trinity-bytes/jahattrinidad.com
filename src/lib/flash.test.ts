import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createFlash } from './flash.ts';

test('shows the feedback, then restores after the duration', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const calls: string[] = [];
  const flash = createFlash(() => calls.push('show'), () => calls.push('reset'), 1600);

  flash();
  t.mock.timers.tick(1599);
  assert.deepEqual(calls, ['show']);
  t.mock.timers.tick(1);
  assert.deepEqual(calls, ['show', 'reset']);
});

test('a second use restarts the full duration', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const calls: string[] = [];
  const flash = createFlash(() => calls.push('show'), () => calls.push('reset'), 1600);

  flash();
  t.mock.timers.tick(1000);
  flash();
  t.mock.timers.tick(1000);
  assert.deepEqual(calls, ['show', 'show']);
  t.mock.timers.tick(600);
  assert.deepEqual(calls, ['show', 'show', 'reset']);
});
