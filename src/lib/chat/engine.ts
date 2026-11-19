/** Pure state machine of the Contact chat. No DOM, no Astro, no network, no language model. */
import type { Branch, Chip, ChatScript, Field, NextStep } from './script.ts';

export type { Branch, Field } from './script.ts';

export type Step =
  | 'idle'
  | 'intent'
  | 'askName'
  | 'askCompany'
  | 'askDetail'
  | 'askEmail'
  | 'summary'
  | 'sending'
  | 'sent'
  | 'failed';

export type Fields = Record<Field, string>;

export interface ChatState {
  step: Step;
  fields: Partial<Fields>;
  branch?: Branch;
  /** The visitor's first message, pinned at the top of the card and sent in the email body. */
  first?: string;
  /** Set while one question is reopened from the summary; answering returns to the summary. */
  editing?: Field;
  /** The last email answer was rejected; the "invalid email" reply is shown. */
  invalid?: boolean;
  /** Reason of the last failed send. */
  error?: string;
}

export type ChatEvent =
  | { type: 'submit'; text: string }
  | { type: 'chip'; value: string }
  | { type: 'edit'; field: Field }
  | { type: 'confirm' }
  | { type: 'sent' }
  | { type: 'failed'; reason: string }
  | { type: 'retry' };

export interface SummaryRow {
  field: Field;
  label: string;
  value: string;
}

export interface ChatView {
  /** The reply to show for this state (empty while sending). */
  reply: string;
  chips: Chip[];
  placeholder: string;
  /** Summary card rows, present from the summary through sent. */
  rows: SummaryRow[];
  /** Failed state buttons. */
  actions: { id: 'retry' | 'copy'; label: string }[];
  /** Sent state next steps. */
  next: NextStep[];
}

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,}/i;
const KEYWORDS: [Branch, RegExp][] = [
  ['hiring', /\b(?:intern(?:ship)?|hiring|hire|role|job)\b/i],
  ['project', /\b(?:project|build|freelance)\b/i],
];
const BRANCHES: readonly Branch[] = ['hiring', 'project', 'other'];
const ORDER: Field[] = ['name', 'company', 'detail', 'email'];
const ASK: Record<Field, Step> = {
  name: 'askName',
  company: 'askCompany',
  detail: 'askDetail',
  email: 'askEmail',
};

export const initialState = (): ChatState => ({ step: 'idle', fields: {} });

/** Scans free text for an email address and branch keywords (the earliest keyword wins). */
export function detect(text: string): { email?: string; branch?: Branch } {
  const email = text.match(EMAIL)?.[0];
  let branch: Branch | undefined;
  let at = Infinity;
  for (const [b, re] of KEYWORDS) {
    const i = text.search(re);
    if (i !== -1 && i < at) {
      branch = b;
      at = i;
    }
  }
  return { ...(email && { email }), ...(branch && { branch }) };
}

/** `min(400 + 18 ms x characters, 1400)`; zero under reduced motion. */
export function typingDelay(reply: string, reducedMotion: boolean): number {
  return reducedMotion ? 0 : Math.min(400 + 18 * reply.length, 1400);
}

const isBranch = (v: string): v is Branch => (BRANCHES as readonly string[]).includes(v);

/** Moves to the first question whose field is still unknown, or to the summary. */
function advance(state: ChatState): ChatState {
  const { editing: _e, invalid: _i, ...rest } = state;
  const missing = ORDER.find(
    (f) => rest.fields[f] === undefined && !(f === 'company' && rest.branch === 'other'),
  );
  return { ...rest, step: missing ? ASK[missing] : 'summary' };
}

/** First message, from free text or a chip: detect, then branch or intent question. */
function start(text: string, forced?: Branch): ChatState {
  const found = detect(text);
  const branch = forced ?? found.branch;
  const state: ChatState = {
    step: 'intent',
    fields: found.email ? { email: found.email } : {},
    first: text,
    ...(branch && { branch }),
  };
  return branch ? advance(state) : state;
}

function answer(state: ChatState, field: Field, text: string): ChatState {
  if (field === 'email') {
    const email = text.match(EMAIL)?.[0];
    if (!email) return { ...state, invalid: true };
    return advance({ ...state, fields: { ...state.fields, email } });
  }
  const next = { ...state, fields: { ...state.fields, [field]: text } };
  return state.editing ? { ...advance(next), step: 'summary' } : advance(next);
}

export function next(state: ChatState, event: ChatEvent, script: ChatScript): ChatState {
  switch (event.type) {
    case 'submit': {
      const text = event.text.trim();
      if (!text) return state;
      if (state.step === 'idle' || state.step === 'sent') return start(text);
      if (state.step === 'intent') {
        const found = detect(text);
        return advance({
          ...state,
          branch: found.branch ?? 'other',
          fields: found.email ? { ...state.fields, email: found.email } : state.fields,
        });
      }
      const field = ORDER.find((f) => ASK[f] === state.step);
      return field ? answer(state, field, text) : state;
    }
    case 'chip': {
      const { step } = state;
      if (step === 'idle' && isBranch(event.value)) {
        const label = script.idle.chips.find((c) => c.value === event.value)?.label ?? event.value;
        return start(label, event.value);
      }
      if (step === 'intent' && isBranch(event.value)) {
        return advance({ ...state, branch: event.value });
      }
      if (step === 'askCompany' && event.value === 'just-me') return answer(state, 'company', '');
      return next(state, { type: 'submit', text: event.value }, script);
    }
    case 'edit':
      if (state.step !== 'summary' && state.step !== 'failed') return state;
      if (event.field === 'company' && state.branch === 'other') return state;
      return { ...state, step: ASK[event.field], editing: event.field, invalid: false };
    case 'confirm':
      return state.step === 'summary' ? { ...state, step: 'sending' } : state;
    case 'retry':
      return state.step === 'failed' ? { ...state, step: 'sending', error: undefined } : state;
    case 'sent':
      return state.step === 'sending' ? { ...state, step: 'sent' } : state;
    case 'failed':
      return state.step === 'sending' ? { ...state, step: 'failed', error: event.reason } : state;
  }
}

/** What to render for a state: reply, chips, composer placeholder, summary rows and actions. */
export function view(state: ChatState, script: ChatScript): ChatView {
  const branch = state.branch ?? 'other';
  const b = script.branches[branch];
  const name = state.fields.name ?? '';
  const empty: ChatView = { reply: '', chips: [], placeholder: '', rows: [], actions: [], next: [] };
  const rows: SummaryRow[] = ORDER.filter((f) => !(f === 'company' && branch === 'other')).map(
    (field) => ({
      field,
      label: script.summary.labels[field],
      value: state.fields[field] || script.summary.empty,
    }),
  );
  switch (state.step) {
    case 'idle':
      return { ...empty, ...script.idle };
    case 'intent':
      return { ...empty, ...script.intent };
    case 'askName':
      return { ...empty, reply: b.askName, placeholder: b.placeholders.name };
    case 'askCompany':
      return {
        ...empty,
        reply: b.askCompany?.(name) ?? '',
        chips: b.companyChips,
        placeholder: b.placeholders.company,
      };
    case 'askDetail':
      return {
        ...empty,
        reply: b.askDetail,
        chips: b.detailChips,
        placeholder: b.placeholders.detail,
      };
    case 'askEmail':
      return {
        ...empty,
        reply: state.invalid ? script.invalidEmail.reply : script.askEmail.reply,
        placeholder: script.askEmail.placeholder,
      };
    case 'summary':
      return { ...empty, reply: script.summary.reply, rows };
    case 'sending':
      return { ...empty, rows };
    case 'sent':
      return {
        ...empty,
        reply: script.sent[branch].reply(state.fields.email ?? ''),
        placeholder: script.sent.placeholder,
        rows,
        next: script.sent[branch].next,
      };
    case 'failed':
      return {
        ...empty,
        reply: script.failed.reply,
        rows,
        actions: [
          { id: 'retry', label: script.failed.retry },
          { id: 'copy', label: script.failed.copy },
        ],
      };
  }
}
