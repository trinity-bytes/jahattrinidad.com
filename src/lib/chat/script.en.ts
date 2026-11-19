import type { ChatCopy } from './script.ts';

// Greeting and chips: visual-design design.md section 4. Script: approved table of the
// chat conversation view (task 7.11). `{name}`, `{company}` and `{email}` are echo functions.
const hiring = "I'm hiring";
const project = 'I have a project';
const hello = 'Just saying hi';
const composerPlaceholder = 'What are you building, and where could I help?';
const greeting = "Hi, I'm Jahat. What brings you here?";

/** Echoes address the visitor by first name, as people do in a chat ("Thanks, Sam."). */
const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

const emailAsk = 'you@company.com';
const sentTail = (email: string) => `Sent. I'll write back to ${email} soon. While you wait:`;

export const chatEn: ChatCopy = {
  greeting,
  hiring,
  project,
  hello,
  composerPlaceholder,
  suggestionsLabel: 'Suggestions',
  // Card chrome: boards 2353:103 to 2354:320 (visual-design task 7.11).
  ui: {
    author: 'Jahat Trinidad',
    status: 'OPEN TO AN INTERNSHIP',
    youWrote: 'YOU WROTE',
    privacy: 'Goes straight to my inbox.',
    failedNote: 'Nothing was lost.',
    cardLabel: 'Conversation with Jahat',
    logLabel: 'Messages',
    typing: 'Jahat is typing',
  },
  script: {
    idle: {
      reply: greeting,
      chips: [
        { value: 'hiring', label: hiring },
        { value: 'project', label: project },
      ],
      placeholder: composerPlaceholder,
    },
    intent: {
      reply: 'Happy to help. Is this about a role, a project, or something else?',
      chips: [
        { value: 'hiring', label: hiring },
        { value: 'project', label: project },
        { value: 'other', label: hello },
      ],
      placeholder: 'Tell me a bit more',
    },
    branches: {
      hiring: {
        askName: "Nice, I'm open to an internship right now. Who am I talking to?",
        askCompany: (name) => `Thanks, ${firstName(name)}. Which company is it?`,
        askDetail: 'Got it. Anything I should know before I reply? Dates, stack, how you found me.',
        companyChips: [],
        detailChips: [
          { value: 'Starts in January', label: 'Starts in January' },
          { value: 'Remote is fine', label: 'Remote is fine' },
          { value: 'Nothing else', label: 'Nothing else' },
        ],
        placeholders: {
          name: 'Your name',
          company: 'Your company',
          detail: 'Dates, stack, anything else',
        },
      },
      project: {
        askName: 'Sounds fun. Who am I talking to?',
        askCompany: (name) => `Thanks, ${firstName(name)}. Is this for a company, or for you?`,
        askDetail: 'What are you building, and when would you like it ready?',
        companyChips: [{ value: 'just-me', label: 'Just me' }],
        detailChips: [],
        placeholders: {
          name: 'Your name',
          company: 'Your company',
          detail: "What you're building",
        },
      },
      other: {
        askName: 'Hi! Who am I talking to?',
        askDetail: "What's on your mind?",
        companyChips: [],
        detailChips: [],
        placeholders: { name: 'Your name', company: 'Your company', detail: 'Your message' },
      },
    },
    askEmail: { reply: 'Last one: where should I write back?', placeholder: emailAsk },
    invalidEmail: { reply: "That address doesn't look right. Could you check it?" },
    summary: {
      reply: 'Tap a pencil to change one answer.',
      title: "HERE'S WHAT I'LL SEND",
      labels: { name: 'Name', company: 'Company', detail: 'Details', email: 'Reply to' },
      empty: 'Just me',
      edit: (label) => `Edit ${label}`,
      confirm: 'Looks good, send it',
      sending: 'Sending…',
    },
    sent: {
      hiring: {
        reply: sentTail,
        next: [
          { id: 'garden', label: 'See the Garden case study' },
          { id: 'cv', label: 'Download my CV' },
        ],
      },
      project: { reply: sentTail, next: [{ id: 'work', label: 'See my work' }] },
      other: { reply: () => 'Sent. Thanks for saying hi.', next: [] },
      placeholder: 'Send another message',
    },
    failed: {
      reply: "That didn't go through. Your message is still here.",
      retry: 'Try again',
      copy: 'Copy my email',
    },
    email: {
      subjectPrefix: '[jahattrinidad.com]',
      branchLabel: 'Branch',
      branchNames: { hiring: 'Hiring', project: 'Project', other: 'Other' },
      nameLabel: 'Name',
      companyLabel: 'Company',
      emailLabel: 'Email',
      empty: '—',
      signature: '— Sent from the Contact chat on jahattrinidad.com',
    },
  },
};
