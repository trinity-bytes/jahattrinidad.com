/**
 * Client of the Contact chat (task 7.3 and 7.4). It renders `view(state)` and dispatches events to the
 * engine in src/lib/chat/engine.ts; it holds no conversation logic of its own. The only network request
 * is the POST to the form service. Markup comes from the <template>s in Chat.astro.
 */
import { initialState, next, typingDelay, view } from '../../../lib/chat/engine';
import type { ChatEvent, ChatState, ChatView, Field } from '../../../lib/chat/engine';
import { buildEmail } from '../../../lib/chat/email';
import { chatEn } from '../../../lib/chat/script.en';
import { chatEs } from '../../../lib/chat/script.es';
import { chatPt } from '../../../lib/chat/script.pt';
import type { ChatCopy } from '../../../lib/chat/script';
import { copyText } from './copy';

/** Web3Forms JSON endpoint: https://docs.web3forms.com/getting-started/api-reference */
const SUBMIT_URL = 'https://api.web3forms.com/submit';
/** One entry per language that has a script; D1 keeps English the only one for now. */
const copies: Record<string, ChatCopy> = { en: chatEn, es: chatEs, pt: chatPt };

export function initChat(): void {
  const root = document.querySelector<HTMLElement>('[data-chat]');
  if (root) new Chat(root);
}

class Chat {
  private state: ChatState = initialState();
  private busy = false;
  private readonly copy: ChatCopy;
  private readonly section: HTMLElement | null;
  private readonly log: HTMLElement;
  private readonly input: HTMLInputElement;
  private readonly chips: HTMLElement;
  private readonly note: HTMLElement;
  private readonly pinned: HTMLElement;
  private readonly reduced = matchMedia('(prefers-reduced-motion: reduce)');
  private resetCopy = 0;

  constructor(private readonly root: HTMLElement) {
    this.copy = copies[root.dataset.lang ?? 'en'] ?? chatEn;
    this.section = root.closest<HTMLElement>('#contact');
    this.log = this.one('[data-log]');
    this.input = this.one<HTMLInputElement>('[data-input]');
    this.chips = this.one('[data-chips]');
    this.note = this.one('[data-note]');
    this.pinned = this.one('[data-pinned]');

    // Progressive enhancement: the controls ship disabled and come alive with the script.
    root.querySelectorAll<HTMLButtonElement | HTMLInputElement>(':disabled').forEach((el) => (el.disabled = false));

    this.one('[data-form]').addEventListener('submit', (event) => {
      event.preventDefault();
      const text = this.input.value;
      if (this.busy || !text.trim()) return;
      this.input.value = '';
      void this.apply({ type: 'submit', text }, text.trim());
    });
    root.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const button = target?.closest<HTMLElement>('button');
      if (!button || this.busy || !root.contains(button)) return;
      if (button.matches('[data-chip]')) {
        void this.apply({ type: 'chip', value: button.dataset.chip ?? '' }, button.textContent ?? '');
      } else if (button.matches('[data-edit]')) {
        void this.apply({ type: 'edit', field: button.dataset.edit as Field });
      } else if (button.matches('[data-confirm]')) void this.apply({ type: 'confirm' });
      else if (button.matches('[data-retry]')) void this.apply({ type: 'retry' });
      else if (button.matches('[data-copy]')) void this.copyEmail(button);
    });
  }

  private one<T extends HTMLElement = HTMLElement>(selector: string): T {
    return this.root.querySelector<T>(selector)!;
  }

  private clone(name: string): HTMLElement {
    const template = this.one<HTMLTemplateElement>(`[data-tpl="${name}"]`);
    return template.content.firstElementChild!.cloneNode(true) as HTMLElement;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private setBusy(busy: boolean): void {
    this.busy = busy;
    if (busy) this.root.dataset.busy = '';
    else delete this.root.dataset.busy;
    this.input.readOnly = busy;
  }

  private append(node: HTMLElement): void {
    this.log.append(node);
    this.toEnd();
  }

  /** Keeps the newest message in view; the composer area changes height, so this runs again after it. */
  private toEnd(): void {
    this.log.scrollTop = this.log.scrollHeight;
  }

  private message(kind: 'bot' | 'visitor' | 'error' | 'sent', text: string): HTMLElement {
    const node = this.clone(kind);
    node.querySelector('p')!.textContent = text;
    this.append(node);
    return node;
  }

  /** The card grows out of the composer: 240 ms height and opacity, none under reduced motion. */
  private open(): void {
    const before = this.root.getBoundingClientRect().height;
    this.root.dataset.open = '';
    if (this.section) {
      this.section.dataset.chatting = '';
      // The lens dock is fixed bottom-right and would cover the composer: hide it while the
      // open conversation is on screen (Lens.astro reads this attribute).
      const root = document.documentElement;
      new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) root.dataset.chatInView = '';
        else delete root.dataset.chatInView;
      }).observe(this.section);
    }
    if (!this.reduced.matches) {
      const after = this.root.getBoundingClientRect().height;
      const options = { duration: 240, easing: 'ease-out' };
      this.root.animate({ height: [`${before}px`, `${after}px`] }, options);
      this.root.querySelectorAll('[data-card-part]').forEach((part) => part.animate({ opacity: [0, 1] }, options));
    }
    // On phones the headline and facts give way, so bring the card to the top of the screen.
    if (matchMedia('(max-width: 47.9375rem)').matches) {
      this.section?.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else {
      this.root.scrollIntoView({ block: 'nearest', behavior: this.reduced.matches ? 'instant' : 'smooth' });
    }
  }

  private clear(): void {
    this.log.replaceChildren();
  }

  private block(): HTMLElement | null {
    return this.log.querySelector<HTMLElement>('[data-block]');
  }

  /** Runs one engine event and renders its result. */
  private async apply(event: ChatEvent, visitorText?: string): Promise<void> {
    const before = this.state;
    const after = next(before, event, this.copy.script);
    if (after === before) return;
    this.state = after;

    const opening = before.step === 'idle' || before.step === 'sent';
    if (opening) {
      this.clear();
      this.pinned.textContent = after.first ?? '';
      if (before.step === 'idle') this.open();
    } else if (visitorText && (event.type === 'submit' || event.type === 'chip')) {
      this.message('visitor', visitorText);
    }
    if (before.step === 'failed' && after.step !== 'failed') {
      this.log.querySelectorAll('[data-transient]').forEach((node) => node.remove());
    }
    await this.present(event, view(after, this.copy.script));
  }

  private async present(event: ChatEvent, v: ChatView): Promise<void> {
    const { step } = this.state;
    this.chips.replaceChildren();

    if (step === 'sending') {
      this.mode('sending');
      this.note.textContent = this.copy.ui.privacy;
      this.block()!.dataset.state = 'sending';
      this.setBusy(true);
      await this.send();
      return;
    }
    if (step === 'failed') {
      this.fail(v);
      return;
    }

    this.setBusy(true);
    const delay = typingDelay(v.reply, this.reduced.matches);
    if (delay > 0) {
      const typing = this.clone('typing');
      this.append(typing);
      await this.sleep(delay);
      typing.remove();
    }

    if (step === 'summary') {
      this.log.querySelectorAll('[data-block]').forEach((node) => node.remove());
      this.append(this.summary(v));
      this.mode('summary');
      this.note.textContent = v.reply;
      this.toEnd();
      this.setBusy(false);
      this.log.querySelector<HTMLElement>('.pencil')?.focus();
      return;
    }
    if (step === 'sent') {
      const block = this.block();
      if (block) block.dataset.state = 'sent';
      this.message('sent', v.reply);
      this.steps(v);
    } else {
      this.message('bot', v.reply);
    }
    this.mode(step === 'sent' ? 'sent' : 'ask');
    this.note.textContent = this.copy.ui.privacy;
    this.input.placeholder = v.placeholder;
    this.renderChips(v);
    this.toEnd();
    this.setBusy(false);
    if (event.type === 'edit') this.prefill(event.field);
    this.input.focus();
  }

  /** Reopening a question shows the current answer, ready to be changed. */
  private prefill(field: Field): void {
    const value = this.state.fields[field];
    if (!value) return;
    this.input.value = value;
    this.input.select();
  }

  private mode(mode: string): void {
    this.root.dataset.mode = mode;
  }

  private renderChips(v: ChatView): void {
    for (const chip of v.chips) {
      const item = this.clone('chip');
      const button = item.querySelector<HTMLElement>('button')!;
      button.dataset.chip = chip.value;
      button.textContent = chip.label;
      this.chips.append(item);
    }
  }

  private summary(v: ChatView): HTMLElement {
    const block = this.clone('summary');
    const rows = block.querySelector('.rows')!;
    for (const row of v.rows) {
      const node = this.clone('row');
      node.querySelector('.key')!.textContent = row.label;
      node.querySelector('.value')!.textContent = row.value;
      const edit = node.querySelector<HTMLElement>('[data-edit]')!;
      edit.dataset.edit = row.field;
      edit.setAttribute('aria-label', this.copy.script.summary.edit(row.label));
      rows.append(node);
    }
    return block;
  }

  private steps(v: ChatView): void {
    const hrefs: Record<string, string | undefined> = {
      garden: this.root.dataset.garden,
      work: this.root.dataset.work,
      cv: this.root.dataset.cv,
    };
    const list = this.clone('next');
    for (const step of v.next) {
      const href = hrefs[step.id];
      // A step without a destination is left out rather than rendered as a dead link.
      if (!href) continue;
      const item = this.clone('step');
      item.querySelector('span')!.textContent = step.label;
      item.querySelector('a')!.href = href;
      list.append(item);
    }
    if (list.children.length) this.append(list);
  }

  private fail(v: ChatView): void {
    const block = this.block();
    if (block) block.dataset.state = 'failed';
    this.message('error', v.reply);
    const actions = this.clone('actions');
    actions.querySelector('[data-copy-label]')!.textContent = v.actions.find((a) => a.id === 'copy')?.label ?? '';
    this.append(actions);
    this.mode('failed');
    this.note.textContent = this.copy.ui.failedNote;
    this.toEnd();
    this.setBusy(false);
    actions.querySelector<HTMLElement>('[data-retry]')?.focus();
  }

  /** POST to Web3Forms; 2xx with `success: true` is Sent, anything else is Failed with the fields kept. */
  private async send(): Promise<void> {
    const { subject, body } = buildEmail(this.state, this.copy.script);
    const { name = '', company = '', email = '' } = this.state.fields;
    let event: ChatEvent;
    try {
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: this.root.dataset.key,
          subject,
          from_name: name,
          name,
          email,
          company,
          branch: this.state.branch ?? 'other',
          message: body,
          botcheck: this.one<HTMLInputElement>('[data-botcheck]').checked,
        }),
      });
      const data: { success?: boolean } | null = await response.json().catch(() => null);
      event =
        response.ok && data?.success === true
          ? { type: 'sent' }
          : { type: 'failed', reason: `http ${response.status}` };
    } catch {
      event = { type: 'failed', reason: 'network' };
    }
    this.setBusy(false);
    await this.apply(event);
  }

  private async copyEmail(button: HTMLElement): Promise<void> {
    const email = this.root.dataset.email ?? '';
    const label = button.querySelector<HTMLElement>('[data-copy-label]')!;
    const idle = this.copy.script.failed.copy;
    const copied = (await copyText(email)) ? (this.root.dataset.copied ?? email) : email;
    label.textContent = copied;
    const announcements = document.getElementById('announcements');
    if (announcements) announcements.textContent = copied;
    clearTimeout(this.resetCopy);
    this.resetCopy = window.setTimeout(() => {
      label.textContent = idle;
      if (announcements) announcements.textContent = '';
    }, 2500);
  }
}
