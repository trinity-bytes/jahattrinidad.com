import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cvPath } from './cv.ts';

test('each locale links to the CV written in its own language', () => {
  assert.equal(cvPath('en'), '/cv/jahat-trinidad-cv-en.pdf');
  assert.equal(cvPath('es'), '/cv/jahat-trinidad-cv-es.pdf');
  assert.equal(cvPath('pt'), '/cv/jahat-trinidad-cv-pt.pdf');
});
