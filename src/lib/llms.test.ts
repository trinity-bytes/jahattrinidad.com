import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildLlmsTxt, type LlmsInput } from './llms.ts';

const input: LlmsInput = {
  site: new URL('https://jahattrinidad.com'),
  name: 'Jahat Trinidad',
  summary: 'Design engineer in Lima, Peru.',
  facts: ['Open to an internship, now.'],
  pages: [{ title: 'Work', path: '/work/', description: 'Projects.' }],
  projects: [{ title: 'Viora', path: '/work/viora/', description: 'Olive growers platform.' }],
  posts: [],
  profiles: [{ label: 'GitHub', url: 'https://github.com/trinity-bytes' }],
  cv: [{ label: 'CV (English, PDF)', path: '/cv/jahat-trinidad-cv-en.pdf' }],
  email: 'me@example.com',
};

test('llms.txt starts with the H1 name and the blockquote summary the spec requires', () => {
  const lines = buildLlmsTxt(input).split('\n');
  assert.equal(lines[0], '# Jahat Trinidad');
  assert.equal(lines[2], '> Design engineer in Lima, Peru.');
});

test('llms.txt links every page, project, profile and CV with absolute URLs', () => {
  const text = buildLlmsTxt(input);
  assert.match(text, /^- \[Work\]\(https:\/\/jahattrinidad\.com\/work\/\): Projects\.$/m);
  assert.match(text, /^- \[Viora\]\(https:\/\/jahattrinidad\.com\/work\/viora\/\): Olive growers platform\.$/m);
  assert.match(text, /^- \[GitHub\]\(https:\/\/github\.com\/trinity-bytes\)$/m);
  assert.match(text, /^- \[CV \(English, PDF\)\]\(https:\/\/jahattrinidad\.com\/cv\/jahat-trinidad-cv-en\.pdf\)$/m);
  assert.match(text, /^- Email: me@example\.com$/m);
});

test('llms.txt leaves out a section that has no entries', () => {
  assert.doesNotMatch(buildLlmsTxt(input), /^## Notes$/m);
});
