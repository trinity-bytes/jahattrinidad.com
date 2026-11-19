/** Types of the chat script. Pure: no DOM and no Astro imports, so the Node test run can load it. */

export type Branch = 'hiring' | 'project' | 'other';
export type Field = 'name' | 'company' | 'detail' | 'email';

export interface Chip {
  /** Branch key, `just-me`, or the answer text itself for detail chips. */
  value: string;
  label: string;
}

export interface NextStep {
  /** Stable id the UI maps to a link: `garden`, `cv`, `work`. */
  id: string;
  label: string;
}

export interface BranchScript {
  askName: string;
  /** `name` is echoed; absent for the branch that skips the company question. */
  askCompany?: (name: string) => string;
  askDetail: string;
  companyChips: Chip[];
  detailChips: Chip[];
  placeholders: { name: string; company: string; detail: string };
}

export interface ChatScript {
  idle: { reply: string; chips: Chip[]; placeholder: string };
  intent: { reply: string; chips: Chip[]; placeholder: string };
  branches: Record<Branch, BranchScript>;
  askEmail: { reply: string; placeholder: string };
  invalidEmail: { reply: string };
  summary: {
    reply: string;
    title: string;
    labels: Record<Field, string>;
    /** Shown instead of an empty value (for example "Just me"). */
    empty: string;
    /** Accessible name of a pencil button, given the field label. */
    edit: (label: string) => string;
    confirm: string;
    sending: string;
  };
  sent: Record<Branch, { reply: (email: string) => string; next: NextStep[] }> & {
    placeholder: string;
  };
  failed: { reply: string; retry: string; copy: string };
  email: {
    subjectPrefix: string;
    branchLabel: string;
    branchNames: Record<Branch, string>;
    nameLabel: string;
    companyLabel: string;
    emailLabel: string;
    empty: string;
    signature: string;
  };
}

/** Everything under `Dictionary.chat`: the original keys plus the conversation script. */
export interface ChatCopy {
  greeting: string;
  hiring: string;
  project: string;
  hello: string;
  composerPlaceholder: string;
  suggestionsLabel: string;
  /** Chrome of the conversation card that is not part of the scripted dialogue. */
  ui: {
    author: string;
    status: string;
    youWrote: string;
    /** One-line note under the composer. */
    privacy: string;
    /** Note under the composer while the failed state is shown. */
    failedNote: string;
    /** Accessible names of the card and of its message log. */
    cardLabel: string;
    logLabel: string;
    /** Read out while the typing indicator is shown. */
    typing: string;
  };
  script: ChatScript;
}
