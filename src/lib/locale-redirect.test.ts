import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pickLocaleRedirect, localeRedirectScript } from './locale-redirect.ts';

const counterparts = { es: '/es/', pt: '/pt/' };

test('a Spanish-system visitor on an English page goes to the Spanish counterpart', () => {
  assert.equal(pickLocaleRedirect({ stored: null, preferred: ['es-PE', 'en'], counterparts }), '/es/');
});

test('a Brazilian or Portuguese system goes to the Portuguese counterpart', () => {
  assert.equal(pickLocaleRedirect({ stored: null, preferred: ['pt-BR'], counterparts }), '/pt/');
  assert.equal(pickLocaleRedirect({ stored: null, preferred: ['pt-PT'], counterparts }), '/pt/');
});

test('an English-first system stays on the English page', () => {
  assert.equal(pickLocaleRedirect({ stored: null, preferred: ['en-US', 'es'], counterparts }), null);
});

test('the first supported language wins over unsupported ones', () => {
  assert.equal(pickLocaleRedirect({ stored: null, preferred: ['fr-FR', 'es', 'en'], counterparts }), '/es/');
  assert.equal(pickLocaleRedirect({ stored: null, preferred: ['fr-FR', 'de'], counterparts }), null);
});

test('a language chosen in the menu beats the system language', () => {
  assert.equal(pickLocaleRedirect({ stored: 'en', preferred: ['es-PE'], counterparts }), null);
  assert.equal(pickLocaleRedirect({ stored: 'pt', preferred: ['es-PE'], counterparts }), '/pt/');
});

test('a page without a counterpart in that language does not redirect', () => {
  assert.equal(pickLocaleRedirect({ stored: null, preferred: ['es'], counterparts: {} }), null);
});

test('an unknown stored value falls back to the system language', () => {
  assert.equal(pickLocaleRedirect({ stored: 'xx', preferred: ['es'], counterparts }), '/es/');
});

test('the inline script is self-contained and redirects on an English page', () => {
  const replaced: string[] = [];
  const script = localeRedirectScript({ redirect: true, counterparts });
  const run = new Function('navigator', 'localStorage', 'location', 'document', script);
  run(
    { languages: ['es-MX'], language: 'es-MX' },
    { getItem: () => null, setItem: () => {} },
    { search: '?a=1', hash: '#work', replace: (url: string) => replaced.push(url) },
    { addEventListener: () => {} }
  );
  assert.deepEqual(replaced, ['/es/?a=1#work']);
});

test('the inline script on a translated page only remembers menu choices', () => {
  const replaced: string[] = [];
  const stored: Record<string, string> = {};
  let onClick: ((event: unknown) => void) | undefined;
  const script = localeRedirectScript({ redirect: false, counterparts: {} });
  new Function('navigator', 'localStorage', 'location', 'document', script)(
    { languages: ['es'], language: 'es' },
    { getItem: () => null, setItem: (key: string, value: string) => (stored[key] = value) },
    { search: '', hash: '', replace: (url: string) => replaced.push(url) },
    { addEventListener: (_type: string, handler: (event: unknown) => void) => (onClick = handler) }
  );
  const link = { dataset: { localeChoice: 'en' } };
  onClick?.({ target: { closest: () => link } });
  assert.deepEqual(replaced, []);
  assert.deepEqual(stored, { locale: 'en' });
});
