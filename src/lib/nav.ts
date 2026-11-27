/**
 * Where each nav link goes. On the Home the nav is a table of contents: every link scrolls to its
 * section. On any other page it moves between pages: Work and Notes open their own pages, Experience
 * (no page of its own) goes to the Home section, and Contact stays on the page when the page has its
 * own Contact section (Work index, case studies, Notes index), else goes to the Home one (posts).
 */
export interface NavTargetsInput {
  /** Localized Home path, e.g. '/es/'. */
  home: string;
  workPath: string;
  notesPath: string;
  /** About has its own page and no Home section: it always opens the page. */
  aboutPath: string;
  isHome: boolean;
  /** The page renders its own `#contact` section. */
  contactOnPage: boolean;
}

export interface NavTargets {
  work: string;
  experience: string;
  notes: string;
  about: string;
  contact: string;
}

export function navTargets(input: NavTargetsInput): NavTargets {
  const section = (id: string) => `${input.home}#${id}`;
  return {
    work: input.isHome ? section('work') : input.workPath,
    experience: section('experience'),
    notes: input.isHome ? section('notes') : input.notesPath,
    about: input.aboutPath,
    contact: input.isHome ? section('contact') : input.contactOnPage ? '#contact' : section('contact'),
  };
}
