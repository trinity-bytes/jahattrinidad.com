import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createTransitionGuard } from './transition-guard.ts';

function deferred() {
  let resolve!: () => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<void>((ok, no) => { resolve = ok; reject = no; });
  return { promise, resolve, reject };
}
const settle = () => new Promise((resolve) => setImmediate(resolve));

test('refuses to start a second transition while one is running', async () => {
  const guard = createTransitionGuard();
  const first = deferred();
  let starts = 0;
  const start = () => { starts += 1; return first.promise; };

  assert.equal(guard.run(start), true);
  assert.equal(guard.run(start), false);
  assert.equal(guard.busy, true);
  assert.equal(starts, 1);

  first.resolve();
  await settle();
  assert.equal(guard.busy, false);
  assert.equal(guard.run(() => Promise.resolve()), true);
});

test('frees itself when the transition fails', async () => {
  const guard = createTransitionGuard();
  const first = deferred();
  guard.run(() => first.promise);
  first.reject(new Error('skipped'));
  await settle();
  assert.equal(guard.busy, false);
});

test('frees itself when starting throws', () => {
  const guard = createTransitionGuard();
  assert.throws(() => guard.run(() => { throw new Error('boom'); }));
  assert.equal(guard.busy, false);
});
