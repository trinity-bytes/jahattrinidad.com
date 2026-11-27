import assert from 'node:assert/strict';
import { test } from 'node:test';
import { nextInCycle } from './cycle.ts';

const items = ['a', 'b', 'c', 'd'].map((id) => ({ id }));

test('every item leads to the one after it, and the last wraps to the first', () => {
  assert.deepEqual(items.map((item) => nextInCycle(items, item.id)?.id), ['b', 'c', 'd', 'a']);
});

test('a list of one, or an id not in the list, has no next item', () => {
  assert.equal(nextInCycle([{ id: 'a' }], 'a'), undefined);
  assert.equal(nextInCycle(items, 'z'), undefined);
  assert.equal(nextInCycle([], 'a'), undefined);
});
