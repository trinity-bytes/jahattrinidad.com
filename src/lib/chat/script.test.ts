import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chatEn } from './script.en.ts';
import { chatEs } from './script.es.ts';
import { chatPt } from './script.pt.ts';

const copies = { en: chatEn, es: chatEs, pt: chatPt };

/** Every string a visitor can read, including the ones built from their answers. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (typeof value === 'function') return [String((value as (arg: string) => string)('Sam'))];
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

test('chat copy uses typographic apostrophes', () => {
  for (const [lang, copy] of Object.entries(copies)) {
    const straight = strings(copy).filter((text) => /\p{L}'\p{L}/u.test(text));
    assert.deepEqual(straight, [], lang);
  }
});

test('card labels are sentence case; the card uppercases them in CSS', () => {
  for (const [lang, copy] of Object.entries(copies)) {
    for (const label of [copy.ui.status, copy.ui.youWrote, copy.script.summary.title]) {
      assert.notEqual(label, label.toLocaleUpperCase(lang), `${lang}: ${label}`);
    }
  }
});

test('phones get a short composer placeholder that never truncates', () => {
  for (const [lang, copy] of Object.entries(copies)) {
    assert.ok(copy.composerPlaceholderShort, lang);
    assert.ok(copy.composerPlaceholderShort.length <= 28, `${lang}: ${copy.composerPlaceholderShort}`);
  }
});

test('the summary note does not name a touch gesture', () => {
  assert.equal(chatEn.script.summary.reply, 'Use a pencil to change one answer.');
  assert.doesNotMatch(chatEs.script.summary.reply, /^Toca/);
  assert.doesNotMatch(chatPt.script.summary.reply, /^Toque/);
});
