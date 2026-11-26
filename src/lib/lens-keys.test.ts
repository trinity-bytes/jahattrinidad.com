import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EDITABLE, editableTarget, lensKeyAction } from './lens-keys.ts';

/** Stands in for an Element: `closest` finds the editable ancestor, or nothing. */
const field = (props: object = { value: '' }) => ({ closest: (selector: string) => (selector === EDITABLE ? props : null) });
const body = { closest: () => null };
const idle = { inside: true, dragging: false, shortcutDisabled: false };
const press = (key: string, target: unknown = body, extra: object = {}) =>
  ({ key, target, ctrlKey: false, metaKey: false, altKey: false, repeat: false, isComposing: false, ...extra });

test('editableTarget returns the editable ancestor, and nothing for other targets', () => {
  const input = { value: 'x' };
  assert.equal(editableTarget(field(input)), input);
  assert.equal(editableTarget(body), null);
  assert.equal(editableTarget(null), null);
  assert.equal(editableTarget({}), null);
});

test('Escape leaves Inside only from outside an editable field', () => {
  assert.equal(lensKeyAction(press('Escape'), idle), 'leave-inside');
  assert.equal(lensKeyAction(press('Escape'), { ...idle, inside: false }), 'none');
  assert.equal(lensKeyAction(press('Escape', field({ value: 'hello' })), idle), 'none');
});

test('Escape in an empty field blurs it and does nothing else', () => {
  assert.equal(lensKeyAction(press('Escape', field({ value: '' })), idle), 'blur-field');
  assert.equal(lensKeyAction(press('Escape', field({ textContent: '' })), idle), 'blur-field');
  assert.equal(lensKeyAction(press('Escape', field({ textContent: 'draft' })), idle), 'none');
});

test('Escape cancels a drag first, and an IME composition keeps its Escape', () => {
  assert.equal(lensKeyAction(press('Escape', field()), { ...idle, dragging: true }), 'cancel-drag');
  assert.equal(lensKeyAction(press('Escape', body, { isComposing: true }), idle), 'none');
});

test('the I shortcut keeps its previous behaviour', () => {
  assert.equal(lensKeyAction(press('i'), idle), 'toggle');
  assert.equal(lensKeyAction(press('I'), { ...idle, inside: false }), 'toggle');
  assert.equal(lensKeyAction(press('i', field()), idle), 'none');
  assert.equal(lensKeyAction(press('i'), { ...idle, shortcutDisabled: true }), 'none');
  assert.equal(lensKeyAction(press('i'), { ...idle, dragging: true }), 'none');
  for (const modifier of ['ctrlKey', 'metaKey', 'altKey', 'repeat', 'isComposing']) {
    assert.equal(lensKeyAction(press('i', body, { [modifier]: true }), idle), 'none', modifier);
  }
  assert.equal(lensKeyAction(press('a'), idle), 'none');
});
