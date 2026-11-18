/** UI strings and locale-aware link helpers, not a content access seam. */
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './content';

interface HomeLensCopy {
  hero: {
    name: string;
    eyebrow: string;
    cta: string;
    hint: string;
    marker: string;
    headline: string;
    sub: string;
  };
  values: {
    marker: string;
    headline: string;
    sub: string;
    valueLabel: string;
    teamLabel: string;
    proofLabel: string;
    rows: { title: string; description: string }[];
    gardenTitle: string;
    gardenDescription: string;
    facts: { figure: string; description: string }[];
    gardenLink: string;
  };
  work: {
    marker: string;
    seeAll: (count: number) => string;
  };
  experience: {
    marker: string;
    headline: string;
    sub: string;
  };
  notes: {
    marker: string;
  };
  contact: {
    marker: string;
    headline: string;
  };
}

export interface Dictionary {
  nav: {
    home: string;
    brand: string;
    brandInside: string;
    navigation: string;
    skipToContent: string;
    links: string;
    work: string;
    experience: string;
    notes: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  home: {
    workHeadline: string;
    notesHeadline: string;
    outside: HomeLensCopy;
    inside: HomeLensCopy;
  };
  work: {
    intro: string;
    featuredMarker: string;
    moreMarker: string;
    moreHeading: string;
    experimentsMarker: string;
    experimentsHeading: string;
    contactMarker: string;
    seeProject: string;
    live: string;
    code: string;
    play: string;
    moreExperiments: string;
  };
  caseStudy: {
    allWork: string;
    eyebrow: string;
    openGarden: string;
    source: string;
    atAGlance: string;
    myRole: string;
    builtWith: string;
    status: string;
    contributors: string;
    problemMarker: string;
    requirements: string;
    constraint: string;
    featuresMarker: string;
    underTheHood: string;
    decisionsMarker: string;
    choice: string;
    why: string;
    cost: string;
    mistakesMarker: string;
    growthMarker: string;
    nextCaseStudy: string;
  };
  notes: {
    intro: string;
    sub: string;
    eyebrow: string;
    writingMarker: string;
    writingHeading: string;
    contactMarker: string;
    essay: string;
    tutorial: string;
    writingLatest: string;
    elsewhereLatest: string;
    allWriting: string;
    minutes: (minutes: number) => string;
  };
  experience: {
    carriesOver: string;
    now: string;
    groups: Record<'work' | 'volunteering' | 'beyond-class', string>;
  };
  lens: {
    pointerHint: string;
    touchHint: string;
    backOutside: string;
    insideAnnouncement: string;
    outsideAnnouncement: string;
  };
  contact: {
    startConversation: string;
    copyEmail: string;
    linkedIn: string;
    lookingFor: string;
    available: string;
    basedIn: string;
    or: string;
    lookingForValue: string;
    availableValue: string;
    basedInValue: string;
    composerLabel: string;
    send: string;
    copied: string;
  };
  chat: {
    greeting: string;
    hiring: string;
    project: string;
    hello: string;
    composerPlaceholder: string;
    suggestionsLabel: string;
  };
  footer: {
    navigate: string;
    elsewhere: string;
    thisSite: string;
    shortcut: string;
    builtWith: string;
    availability: string;
    github: string;
    instagram: string;
    youtube: string;
    rss: string;
    copyright: (year: number) => string;
  };
  project: {
    role: string;
    timeframe: string;
    stack: string;
  };
  post: {
    readingTime: (minutes: number) => string;
  };
  common: {
    readMore: string;
    problem: string;
    myPart: string;
    whatItDoes: string;
    teamOf: (size: number) => string;
  };
}

/** Populated for `en` only — D1 creates no Spanish UI strings in this change. */
const en: Dictionary = {
  nav: {
    home: 'Home',
    brand: 'Jahat Trinidad',
    brandInside: '@trinitybytes',
    navigation: 'Main navigation',
    skipToContent: 'Skip to content',
    links: 'Links',
    work: 'Work',
    experience: 'Experience',
    notes: 'Notes',
    contact: 'Contact',
    // The mobile menu open state has not yet been designed.
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  home: {
    // Shared across both views; board 2191:86 and approved R9.
    workHeadline: 'Selected work',
    notesHeadline: 'Notes on building things',
    // Markers and non-draft-copy text follow the Home boards 2191:86 and 2191:503.
    outside: {
      hero: {
        name: 'Jahat',
        eyebrow: 'DESIGN ENGINEER · FRONTEND & PRODUCT',
        cta: 'See my work',
        hint: 'drag the lens, or press I, to look inside',
        marker: '01 — OUTSIDE',
        headline:
          'I build products people actually use — designed and built by the same person.',
        sub: 'So nothing gets lost between design and code: it looks right, it works, and it ships sooner.',
      },
      values: {
        marker: '02 — WHAT YOU GET',
        headline: 'Faster launches. Fewer handoffs. Nothing rebuilt.',
        sub: 'What your team gets from one person who designs and builds. Each point is proven on a product I shipped.',
        valueLabel: 'The value',
        teamLabel: 'What it means for your team',
        proofLabel: 'Proof · Inspiration Garden',
        rows: [
          { title: 'Ideas into working products, fast.', description: 'I take something from a rough idea to a product people can use — without waiting on a separate designer and developer.' },
          { title: 'A bridge between design and engineering.', description: 'I speak both languages: designs your engineers can build, and code your designers recognize as theirs.' },
          { title: 'Built to grow, not to be redone.', description: 'I plan for what comes next, so new features plug into what exists instead of starting over.' },
        ],
        gardenTitle: 'Inspiration Garden',
        gardenDescription: 'A tool for saving the design references, tools, libraries, articles and tutorials I find on the web. Designed, built and launched by me.',
        facts: [
          { figure: '7 days', description: 'first commit to first release' },
          { figure: '1 person', description: 'product, design and code' },
          { figure: '1 week', description: 'from launch to new features' },
        ],
        gardenLink: 'Read how the Garden was built',
      },
      work: {
        marker: '03 — SELECTED WORK',
        seeAll: (count) => `See all projects · ${count}`,
      },
      experience: {
        marker: '04 — EXPERIENCE',
        headline: 'Where I’ve already shown up',
        sub: 'Work, volunteering and what I do beyond class — and what each one left behind.',
      },
      notes: {
        marker: '05 — NOTES',
      },
      contact: {
        marker: '06 — CONTACT',
        headline:
          'Looking for someone who can design it and build it? Let’s talk.',
      },
    },
    inside: {
      hero: {
        // TODO(phase 4): confirm the Inside hero labels.
        name: 'Jahat',
        eyebrow: 'DESIGN ENGINEER · FRONTEND & PRODUCT',
        cta: 'See my work',
        hint: 'drag the lens, or press I, to look inside',
        marker: '01 — INSIDE',
        headline:
          'The same page, taken apart — every layer, token and decision.',
        sub: 'Press I anywhere to see how a thing is built: what it is made of, and why.',
      },
      values: {
        marker: '02 — WHAT YOU GET · HOW IT WAS BUILT',
        headline: 'How each promise was built.',
        sub: "Every number below comes from the Garden's repository: its releases and the services it runs on.",
        // TODO(phase 4): Replace these Outside details with Inside copy.
        valueLabel: 'The value',
        teamLabel: 'What it means for your team',
        proofLabel: 'Proof · Inspiration Garden',
        rows: [
          { title: 'Ideas into working products, fast.', description: 'I take something from a rough idea to a product people can use — without waiting on a separate designer and developer.' },
          { title: 'A bridge between design and engineering.', description: 'I speak both languages: designs your engineers can build, and code your designers recognize as theirs.' },
          { title: 'Built to grow, not to be redone.', description: 'I plan for what comes next, so new features plug into what exists instead of starting over.' },
        ],
        gardenTitle: 'Inspiration Garden',
        gardenDescription: 'A tool for saving the design references, tools, libraries, articles and tutorials I find on the web. Designed, built and launched by me.',
        facts: [
          { figure: '7 days', description: 'first commit to first release' },
          { figure: '1 person', description: 'product, design and code' },
          { figure: '1 week', description: 'from launch to new features' },
        ],
        gardenLink: 'Read how the Garden was built',
      },
      work: {
        marker: '03 — SELECTED WORK · HOW IT’S MADE',
        // TODO(phase 4): Replace if the Inside label changes.
        seeAll: (count) => `See all projects · ${count}`,
      },
      experience: {
        marker: '04 — EXPERIENCE · WHAT IT TRAINED',
        headline: 'What each job left in my toolkit',
        sub: 'Brand work taught me systems, teaching taught me to explain, and running community channels taught me to listen to users. I use all three every time I build.',
      },
      notes: {
        marker: '05 — NOTES · HOW A POST GETS PUBLISHED',
      },
      contact: {
        marker: '06 — CONTACT · FOR DEVELOPERS',
        headline: "You've seen how I build. What should we build together?",
      },
    },
  },
  // Work board 2239:17; intro is approved in draft-copy.md.
  work: {
    intro:
      "Products I've designed and built, from client work to small experiments.",
    featuredMarker: '01 — FEATURED',
    moreMarker: '02 — MORE PROJECTS',
    moreHeading: 'More projects',
    experimentsMarker: '03 — SMALL EXPERIMENTS',
    experimentsHeading: 'Small experiments',
    contactMarker: '04 — CONTACT',
    seeProject: 'See the project',
    live: 'Live',
    code: 'Code',
    play: 'Play',
    moreExperiments: 'More experiments on GitHub',
  },
  // Case study board 2298:2; project-specific prose belongs in content entries.
  caseStudy: {
    allWork: 'All work',
    eyebrow: 'CASE STUDY · PERSONAL PRODUCT',
    openGarden: 'Open the garden',
    source: 'Source on GitHub',
    atAGlance: 'AT A GLANCE',
    myRole: 'My role',
    builtWith: 'Built with',
    status: 'Status',
    contributors: 'Who adds to it',
    problemMarker: '01 — THE PROBLEM',
    requirements: 'Requirements',
    constraint: 'Constraint',
    featuresMarker: '02 — WHAT IT DOES',
    underTheHood: 'Under the hood',
    decisionsMarker: '03 — DECISIONS',
    choice: 'The choice',
    why: 'Why',
    cost: 'What it cost',
    mistakesMarker: '04 — WHAT I GOT WRONG',
    growthMarker: '05 — HOW IT GREW',
    nextCaseStudy: 'NEXT CASE STUDY',
  },
  // Notes index board 2301:86; intro and sub are approved draft copy.
  notes: {
    eyebrow: 'NOTES · WRITING AND ELSEWHERE',
    writingMarker: '01 — WRITING',
    writingHeading: 'Essays and tutorials',
    contactMarker: '02 — CONTACT',
    essay: 'ESSAY',
    tutorial: 'TUTORIAL',
    writingLatest: 'Writing · Latest',
    elsewhereLatest: 'Elsewhere · Latest posts',
    allWriting: 'All writing',
    minutes: (minutes) => `${minutes} min`,
    intro:
      "Notes from building things: what worked, what broke, what I'd do again.",
    sub: 'Essays on how I think through decisions, and tutorials you can follow step by step.',
  },
  // Experience board 2191:236; the "carries over" label is the approved D14 copy.
  experience: {
    carriesOver: 'What carries over to your team',
    now: 'now',
    groups: { work: 'Work', volunteering: 'Volunteering', 'beyond-class': 'Beyond class' },
  },
  // Pointer hint: lens component 2168:10. Remaining text: implementation design §2.
  lens: {
    pointerHint: 'Drag and drop over the page to see how it was built',
    touchHint: 'Tap the lens',
    backOutside: 'Back outside',
    insideAnnouncement: 'Inside view: how each part is built',
    outsideAnnouncement: 'Outside view',
  },
  // Contact labels: Home board 2191:86. CTA supplied in the implementation brief.
  contact: {
    startConversation: 'Start a conversation',
    copyEmail: 'Copy my email',
    linkedIn: 'LinkedIn',
    lookingFor: 'Looking for',
    available: 'Available',
    basedIn: 'Based in',
    or: 'Or',
    // Facts: owner-provided (D16). The line break follows the board.
    lookingForValue: 'An internship in frontend\nor product design engineering',
    availableValue: 'Now',
    basedInValue: 'Lima, Peru\nopen to remote',
    composerLabel: 'Your message',
    send: 'Send',
    copied: 'Email copied',
  },
  // Greeting and chips: visual-design design.md §4. Composer: approved draft copy.
  chat: {
    greeting: "Hi, I'm Jahat. What brings you here?",
    hiring: "I'm hiring",
    project: 'I have a project',
    hello: 'Just saying hi',
    composerPlaceholder: 'What are you building, and where could I help?',
    suggestionsLabel: 'Suggestions',
  },
  // Footer labels: Home board 2191:86; shortcut label describes the required control.
  footer: {
    navigate: 'Navigate',
    elsewhere: 'Elsewhere',
    thisSite: 'This site',
    shortcut: 'Turn off the I shortcut',
    builtWith: 'Built with Astro · source on GitHub',
    availability: 'Open to an internship, now.\nLima, Peru · remote.',
    github: 'GitHub',
    instagram: 'Instagram',
    youtube: 'YouTube',
    rss: 'RSS',
    copyright: (year) => `© ${year} Jahat Trinidad`,
  },
  project: {
    role: 'Role',
    timeframe: 'Timeframe',
    stack: 'Stack',
  },
  post: {
    readingTime: (minutes) => `${minutes} min read`,
  },
  // Labels reused by Work and case-study cards (boards 2239:17 and 2298:2).
  common: {
    readMore: 'Read more',
    problem: 'The problem',
    myPart: 'My part',
    whatItDoes: 'What it does',
    teamOf: (size) => (size === 1 ? 'Solo' : `Team of ${size}`),
  },
};

const dictionaries: Partial<Record<Locale, Dictionary>> = {
  en,
};

/** Falls back to `en` until Spanish strings exist — matches D1's current scope. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

/** Locale-aware, prefix-correct link builder over `astro:i18n`. */
export function localizedPath(locale: Locale, path: string): string {
  return getRelativeLocaleUrl(locale, path);
}
