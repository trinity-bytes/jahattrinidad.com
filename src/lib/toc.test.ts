import assert from 'node:assert/strict';
import { test } from 'node:test';
import { activeHeadingIndex, readingLine } from './toc.ts';

test('the section being read is the last heading at or above the reading line', () => {
  assert.equal(activeHeadingIndex([-400, 96, 324], 97), 1);
  assert.equal(activeHeadingIndex([-900, -400, -20], 97), 2);
});

test('a heading further down, still below the line, is not current yet', () => {
  assert.equal(activeHeadingIndex([96, 228], 97), 0);
});

test('before the first heading reaches the line, the first one is current', () => {
  assert.equal(activeHeadingIndex([680, 900], 97), 0);
});

test('no headings means no current one', () => {
  assert.equal(activeHeadingIndex([], 97), -1);
});

test('the reading line sits just under the heading scroll offset, tolerating subpixels', () => {
  assert.equal(readingLine('96px'), 97);
  assert.equal(readingLine(''), 1);
  assert.equal(activeHeadingIndex([96.4], readingLine('96px')), 0);
});
