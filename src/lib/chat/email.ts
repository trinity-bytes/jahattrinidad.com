import type { ChatState } from './engine.ts';
import type { ChatScript } from './script.ts';

/** Subject and plain-text body of the message, following the approved email template. */
export function buildEmail(state: ChatState, script: ChatScript): { subject: string; body: string } {
  const t = script.email;
  const branch = state.branch ?? 'other';
  const { name = '', company = '', detail = '', email = '' } = state.fields;
  const subject = `${t.subjectPrefix} ${t.branchNames[branch]} — ${name}${company ? `, ${company}` : ''}`;
  const body = [
    `${t.branchLabel}: ${branch}`,
    `${t.nameLabel}: ${name}`,
    `${t.companyLabel}: ${company || t.empty}`,
    `${t.emailLabel}: ${email}`,
    '',
    state.first ?? '',
    '',
    detail,
    '',
    t.signature,
  ].join('\n');
  return { subject, body };
}
