import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildEmail } from './email.ts';
import { detect, initialState, next, typingDelay, view } from './engine.ts';
import type { ChatEvent, ChatState } from './engine.ts';
import { chatEn } from './script.en.ts';

const script = chatEn.script;

const run = (state: ChatState, ...events: ChatEvent[]): ChatState =>
  events.reduce((s, e) => next(s, e, script), state);
const say = (text: string): ChatEvent => ({ type: 'submit', text });

test('detect: finds an email address in free text', () => {
  assert.equal(detect('write me at sam@alder.dev please').email, 'sam@alder.dev');
  assert.equal(detect('no address here').email, undefined);
});

test('detect: picks the branch from keywords', () => {
  assert.equal(detect("We're hiring a frontend intern").branch, 'hiring');
  assert.equal(detect('I want to build a small app').branch, 'project');
  assert.equal(detect('freelance work?').branch, 'project');
  assert.equal(detect('hello there').branch, undefined);
});

test('hiring branch end to end', () => {
  let s = run(initialState(), say("We're hiring a frontend intern"));
  assert.equal(s.branch, 'hiring');
  assert.equal(s.step, 'askName');
  assert.equal(view(s, script).reply, script.branches.hiring.askName);
  s = run(s, say('Sam'));
  assert.equal(s.step, 'askCompany');
  assert.equal(view(s, script).reply, script.branches.hiring.askCompany?.('Sam'));
  s = run(s, say('Alder'));
  assert.equal(s.step, 'askDetail');
  assert.equal(view(s, script).placeholder, script.branches.hiring.placeholders.detail);
  s = run(s, say('Starts in January'));
  assert.equal(s.step, 'askEmail');
  assert.equal(view(s, script).placeholder, script.askEmail.placeholder);
  s = run(s, say('sam@alder.dev'));
  assert.equal(s.step, 'summary');
  assert.deepEqual(s.fields, {
    name: 'Sam',
    company: 'Alder',
    detail: 'Starts in January',
    email: 'sam@alder.dev',
  });
  s = run(s, { type: 'confirm' });
  assert.equal(s.step, 'sending');
  s = run(s, { type: 'sent' });
  assert.equal(s.step, 'sent');
  const v = view(s, script);
  assert.equal(v.reply, script.sent.hiring.reply('sam@alder.dev'));
  assert.deepEqual(
    v.next.map((n) => n.id),
    ['garden', 'cv'],
  );
});

test('project branch from a chip: "Just me" leaves the company empty', () => {
  let s = run(initialState(), { type: 'chip', value: 'project' });
  assert.equal(s.branch, 'project');
  assert.equal(s.step, 'askName');
  s = run(s, say('Ana'));
  assert.equal(s.step, 'askCompany');
  assert.ok(view(s, script).chips.some((c) => c.value === 'just-me'));
  s = run(s, { type: 'chip', value: 'just-me' });
  assert.equal(s.fields.company, '');
  assert.equal(s.step, 'askDetail');
  s = run(s, say('A tiny shop'), say('ana@mail.com'));
  assert.equal(s.step, 'summary');
  assert.equal(s.fields.company, '');
  s = run(s, { type: 'confirm' }, { type: 'sent' });
  assert.deepEqual(
    view(s, script).next.map((n) => n.id),
    ['work'],
  );
});

test('other branch skips the company question', () => {
  let s = run(initialState(), { type: 'chip', value: 'other' });
  s = run(s, say('Lu'));
  assert.equal(s.step, 'askDetail');
  assert.equal(s.fields.company, undefined);
  s = run(s, say('Just saying hi'), say('lu@mail.com'));
  assert.equal(s.step, 'summary');
  s = run(s, { type: 'confirm' }, { type: 'sent' });
  assert.equal(view(s, script).reply, script.sent.other.reply('lu@mail.com'));
  assert.deepEqual(view(s, script).next, []);
});

test('no branch detected goes through the intent question', () => {
  let s = run(initialState(), say('Hello there'));
  assert.equal(s.step, 'intent');
  assert.equal(view(s, script).reply, script.intent.reply);
  assert.equal(view(s, script).chips.length, 3);
  s = run(s, { type: 'chip', value: 'hiring' });
  assert.equal(s.branch, 'hiring');
  assert.equal(s.step, 'askName');
});

test('email in the first message skips the email question and shows in the summary', () => {
  let s = run(initialState(), say('Hi, I want to build a site. sam@alder.dev'));
  assert.equal(s.fields.email, 'sam@alder.dev');
  s = run(s, say('Sam'), say('Alder'), say('A portfolio'));
  assert.equal(s.step, 'summary');
  const email = view(s, script).rows.find((r) => r.field === 'email');
  assert.equal(email?.value, 'sam@alder.dev');
});

test('"We\'re hiring a frontend intern" picks hiring with no question', () => {
  const s = run(initialState(), say("We're hiring a frontend intern"));
  assert.equal(s.branch, 'hiring');
  assert.notEqual(s.step, 'intent');
});

test('invalid email is asked again', () => {
  let s = run(initialState(), { type: 'chip', value: 'other' }, say('Lu'), say('hi'));
  assert.equal(s.step, 'askEmail');
  s = run(s, say('not-an-email'));
  assert.equal(s.step, 'askEmail');
  assert.equal(view(s, script).reply, script.invalidEmail.reply);
  s = run(s, say('lu@mail.com'));
  assert.equal(s.step, 'summary');
  assert.equal(s.fields.email, 'lu@mail.com');
});

const atSummary = (): ChatState =>
  run(
    initialState(),
    say("We're hiring a frontend intern"),
    say('Sam'),
    say('Alder'),
    say('Remote is fine'),
    say('sam@alder.dev'),
  );

test('editing company returns to the summary with the others unchanged', () => {
  let s = atSummary();
  const before = { ...s.fields };
  s = run(s, { type: 'edit', field: 'company' });
  assert.equal(s.step, 'askCompany');
  assert.equal(view(s, script).placeholder, script.branches.hiring.placeholders.company);
  s = run(s, say('Birch'));
  assert.equal(s.step, 'summary');
  assert.deepEqual(s.fields, { ...before, company: 'Birch' });
});

test('nothing is sent until the visitor confirms', () => {
  const s = atSummary();
  assert.equal(s.step, 'summary');
  assert.equal(run(s, say('anything')).step, 'summary');
});

test('a failed send keeps every field and offers retry and copy', () => {
  let s = run(atSummary(), { type: 'confirm' }, { type: 'failed', reason: 'HTTP 500' });
  assert.equal(s.step, 'failed');
  assert.equal(s.error, 'HTTP 500');
  assert.equal(s.fields.name, 'Sam');
  assert.equal(s.fields.email, 'sam@alder.dev');
  const v = view(s, script);
  assert.equal(v.reply, script.failed.reply);
  assert.deepEqual(
    v.actions.map((a) => a.id),
    ['retry', 'copy'],
  );
  s = run(s, { type: 'retry' });
  assert.equal(s.step, 'sending');
  assert.equal(s.fields.name, 'Sam');
  s = run(s, { type: 'sent' });
  assert.equal(s.step, 'sent');
});

test('typing delay grows with length, is capped at 1.4 s, and is 0 under reduced motion', () => {
  assert.equal(typingDelay('x'.repeat(10), false), 400 + 18 * 10);
  assert.equal(typingDelay('x'.repeat(400), false), 1400);
  assert.equal(typingDelay('x'.repeat(400), true), 0);
});

test('email builder: subject and plain-text body for the hiring branch', () => {
  const s = run(
    initialState(),
    say("We're hiring a frontend intern"),
    say('Sam'),
    say('Alder'),
    say('Remote is fine'),
    say('sam@alder.dev'),
  );
  const { subject, body } = buildEmail(s, script);
  assert.equal(subject, '[jahattrinidad.com] Hiring — Sam, Alder');
  assert.equal(
    body,
    [
      'Branch: hiring',
      'Name: Sam',
      'Company: Alder',
      'Email: sam@alder.dev',
      '',
      "We're hiring a frontend intern",
      '',
      'Remote is fine',
      '',
      '— Sent from the Contact chat on jahattrinidad.com',
    ].join('\n'),
  );
});

test('email builder: empty company shows a dash and drops out of the subject', () => {
  const s = run(
    initialState(),
    { type: 'chip', value: 'project' },
    say('Ana'),
    { type: 'chip', value: 'just-me' },
    say('A tiny shop'),
    say('ana@mail.com'),
  );
  const { subject, body } = buildEmail(s, script);
  assert.equal(subject, '[jahattrinidad.com] Project — Ana');
  assert.ok(body.includes('Company: —'));
});

test('replies echo the first name only', () => {
  const s = run(initialState(), say("We're hiring a frontend intern"), say('Sam Rivera'));
  assert.equal(view(s, script).reply, 'Thanks, Sam. Which company is it?');
});
