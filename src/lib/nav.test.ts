import assert from 'node:assert/strict';
import { test } from 'node:test';
import { navTargets } from './nav.ts';

const paths = { home: '/es/', workPath: '/es/work/', notesPath: '/es/notes/', aboutPath: '/es/about/' };

test('on the Home every link scrolls to its section, except About, which has its own page', () => {
  assert.deepEqual(navTargets({ ...paths, isHome: true, contactOnPage: true }), {
    work: '/es/#work',
    experience: '/es/#experience',
    notes: '/es/#notes',
    about: '/es/about/',
    contact: '/es/#contact',
  });
});

test('About opens its own page from any page', () => {
  assert.equal(navTargets({ ...paths, isHome: false, contactOnPage: true }).about, '/es/about/');
  assert.equal(navTargets({ ...paths, isHome: false, contactOnPage: false }).about, '/es/about/');
});

test('on another page Work and Notes open their pages and Experience goes to the Home section', () => {
  const targets = navTargets({ ...paths, isHome: false, contactOnPage: true });
  assert.equal(targets.work, '/es/work/');
  assert.equal(targets.notes, '/es/notes/');
  assert.equal(targets.experience, '/es/#experience');
});

test('Contact stays on the page when the page has its own Contact section', () => {
  assert.equal(navTargets({ ...paths, isHome: false, contactOnPage: true }).contact, '#contact');
});

test('Contact goes to the Home section when the page has none (a post)', () => {
  assert.equal(navTargets({ ...paths, isHome: false, contactOnPage: false }).contact, '/es/#contact');
});
