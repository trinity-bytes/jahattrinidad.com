/** UI strings and locale-aware link helpers, not a content access seam. */
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale, TranslationLink } from './content';
export type { Locale } from './content';
import { chatEn } from './chat/script.en';
import type { ChatCopy } from './chat/script';
import { es } from './dictionaries/es';
import { pt } from './dictionaries/pt';

interface HeroCopy {
  name: string;
  eyebrow: string;
  cta: string;
  hint: string;
  marker: string;
  headline: string;
  sub: string;
}

/** Inside annotations of the hero, in list order (the number shown on small screens). */
interface InsideHeroCopy extends HeroCopy {
  notesLabel: string;
  annotations: Record<'sky' | 'hill' | 'name' | 'portrait', { title: string; note: string }>;
}

interface InsideNote {
  title: string;
  note: string;
}

/** Inside-only copy of the lower sections: what differs from HomeLensCopy, plus their annotations. */
interface InsideLowerCopy {
  experience: { carriesOver: string; notesLabel: string };
  notes: { notesLabel: string; annotations: Record<'feed' | 'collection' | 'callSite', InsideNote> };
  contact: { notesLabel: string; annotations: Record<'composer', InsideNote> };
}

interface HomeLensCopy {
  hero: HeroCopy;
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
  meta: {
    /** Alt text of the site-wide social preview image (og:image:alt). */
    ogImageAlt: string;
    /** Bottom line of the per-page social preview cards. */
    ogSignature: string;
    /** Home <title> and meta description: name and role first, so search results lead with them. */
    homeTitle: string;
    homeDescription: string;
    /** Meta descriptions of the index pages. */
    workDescription: string;
    notesDescription: string;
    linksDescription: string;
  };
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
    /** Mobile menu sheet (board 2349:86). */
    elsewhere: string;
    availability: string;
    menuLinks: string;
    /** Accessible name of the EN / ES / PT switch. */
    language: string;
  };
  home: {
    workHeadline: string;
    notesHeadline: string;
    outside: HomeLensCopy;
    inside: Omit<HomeLensCopy, 'hero' | 'values' | 'work' | 'experience' | 'notes' | 'contact'> & {
      hero: InsideHeroCopy;
      values: HomeLensCopy['values'] & { notesLabel: string; annotations: { source: InsideNote } };
      work: HomeLensCopy['work'] & {
        headline: string;
        /** Labels of the Inside card rows; the row text is project content. */
        rowLabels: { stack: string; owned: string; decision: string };
      };
      experience: HomeLensCopy['experience'] & InsideLowerCopy['experience'];
      notes: HomeLensCopy['notes'] & InsideLowerCopy['notes'];
      contact: HomeLensCopy['contact'] & InsideLowerCopy['contact'];
    };
  };
  work: {
    eyebrow: string;
    headline: string;
    sub: string;
    featuredMarker: string;
    moreMarker: string;
    moreHeading: string;
    featuredHeading: string;
    solo: string;
    moreSub: string;
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
    contactMarker: string;
    openProject: string;
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
    problemHeading: string;
    featuresHeading: string;
    decisionsHeading: string;
    mistakesHeading: string;
    growthHeading: string;
  };
  notes: {
    headline: string;
    sub: string;
    eyebrow: string;
    allNotes: string;
    writingMarker: string;
    writingHeading: string;
    contactMarker: string;
    essay: string;
    tutorial: string;
    writingLatest: string;
    elsewhereLatest: string;
    allWriting: string;
    rssFeed: string;
    latest: string;
    minutes: (minutes: number) => string;
  };
  experience: {
    carriesOver: string;
    now: string;
    groups: Record<'work' | 'volunteering' | 'beyond-class', string>;
  };
  lens: {
    lookInside: string;
    pointerHint: string;
    touchHint: string;
    backOutside: string;
    escapeKey: string;
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
  chat: ChatCopy;
  footer: {
    navigate: string;
    elsewhere: string;
    thisSite: string;
    shortcut: string;
    /** Inside only: how to leave the lens. */
    insideHint: string;
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
    inThisPost: string; published: string; updated: string; author: string; authorRole: string; write: string; keepReading: string; copy: string; copied: string; code: string; note: string;
  };
  links: {
    description: string;
    availability: string;
    workTitle: string;
    workSub: (projects: number, caseStudies: number) => string;
    notesTitle: string;
    notesSub: string;
    latestSub: (minutes: number) => string;
    writeTitle: string;
    writeSub: string;
    elsewhere: string;
  };
  common: {
    readMore: string;
    problem: string;
    myPart: string;
    whatItDoes: string;
    teamOf: (size: number) => string;
  };
}

export const en: Dictionary = {
  meta: {
    ogImageAlt: 'Jahat Trinidad on a hill at sunset, beside the line "I build products people actually use."',
    ogSignature: 'Jahat Trinidad · jahattrinidad.com',
    homeTitle: 'Jahat Trinidad · Design Engineer — Frontend and product',
    homeDescription: 'Jahat Trinidad, design engineer in Lima, Peru. I design and build web products end to end, from the first sketch to the live site.',
    workDescription: 'Selected projects and case studies.',
    notesDescription: 'Posts about building and shipping this site.',
    linksDescription: 'Where to find me elsewhere.',
  },
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
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    // Mobile menu open state: boards 2349:86 / 2349:159.
    elsewhere: 'Elsewhere',
    availability: 'Open to an internship, now.',
    menuLinks: 'Profiles',
    language: 'Language',
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
        name: 'Jahat',
        eyebrow: 'DESIGN ENGINEER · FRONTEND & PRODUCT',
        cta: 'See my work',
        hint: 'press Esc or I to go back outside',
        marker: '01 — INSIDE',
        headline:
          'The same page, taken apart — every layer, token and decision.',
        sub: 'Press I anywhere to see how a thing is built: what it is made of, and why.',
        notesLabel: 'Hero layer notes',
        annotations: {
          sky: { title: '[layer 01 · sky + far hills]', note: 'sky.png · moves slowest' },
          hill: { title: '[layer 02 · near hill]', note: 'near-hill.png · moves fastest' },
          name: { title: '[layer 03 · display name]', note: 'Epilogue Medium · 270 px · sits behind the hill' },
          portrait: { title: '[layer 04 · portrait]', note: 'generated from my own reference photos' },
        },
      },
      values: {
        marker: '02 — WHAT YOU GET · HOW IT WAS BUILT',
        headline: 'How each promise was built.',
        sub: "Every number below comes from the Garden's repository: its releases and the services it runs on.",
        valueLabel: 'The practice',
        teamLabel: 'How I work',
        proofLabel: 'How the proof was built · Inspiration Garden',
        rows: [
          { title: 'A working slice in the first week.', description: 'A deployable first version early, then small tagged releases on top of it, instead of a long build nobody sees.' },
          { title: 'Small, versioned releases.', description: 'Interface and performance work ship as small tagged versions, many in a single day, never one big drop.' },
          { title: 'Extend the foundation, never fork it.', description: 'New features land on the same Worker API, so the first version is never thrown away.' },
        ],
        gardenTitle: 'Inspiration Garden',
        // Approved copy: docs/draft-copy.md, "Values proof".
        gardenDescription: 'A pnpm monorepo: a Cloudflare Worker API and a static front end. 33 releases so far, from v0.1.0 to v1.2.1.',
        facts: [
          { figure: '7 days', description: 'to v0.1.0, tagged on day 7' },
          { figure: '10 releases', description: 'tagged on Oct 29' },
          { figure: '1 week', description: 'to tags + search, same API' },
        ],
        gardenLink: 'Read the Garden’s build log',
        notesLabel: 'Values notes',
        annotations: {
          source: { title: '[source · git tags]', note: 'counted from the repo, not estimated' },
        },
      },
      work: {
        marker: '03 — SELECTED WORK · HOW IT’S MADE',
        headline: 'How each one is made',
        seeAll: (count) => `See all projects · ${count}`,
        rowLabels: { stack: 'Stack', owned: 'What I owned', decision: 'Key decision' },
      },
      experience: {
        marker: '04 — EXPERIENCE · WHAT IT TRAINED',
        headline: 'What each job left in my toolkit',
        sub: 'Brand work taught me systems, teaching taught me to explain, and running community channels taught me to listen to users. I use all three every time I build.',
        carriesOver: 'What carries into how I build',
        notesLabel: 'Experience tool notes',
      },
      notes: {
        marker: '05 — NOTES · HOW A POST GETS PUBLISHED',
        notesLabel: 'Notes pipeline notes',
        // Facts: src/pages/rss.xml.ts, the posts collection in src/content.config.ts, listPosts in src/lib/content.ts.
        annotations: {
          feed: { title: '[feed · /rss.xml]', note: '@astrojs/rss · generated at build' },
          collection: { title: '[MDX · content collection]', note: 'src/content/posts/*.mdx, glob loader' },
          callSite: { title: '[one call site · both rows]', note: 'src/lib/content.ts · boundary-checked' },
        },
      },
      contact: {
        marker: '06 — CONTACT · FOR DEVELOPERS',
        headline: "You've seen how I build. What should we build together?",
        notesLabel: 'Contact notes',
        // Chat design: openspec/changes/portfolio-implementation/design.md §3 (scripted, no language model).
        annotations: {
          composer: { title: '[component · composer]', note: 'free text or a chip · scripted, no AI model' },
        },
      },
    },
  },
  // Work board 2239:17 (hero copy is the board's approved draft).
  work: {
    eyebrow: 'WORK · PRODUCTS, TOOLS AND EXPERIMENTS',
    headline: 'Things I designed and built, from the first sketch to the live site.',
    sub: 'The featured ones come with the whole story. After them, more projects, and at the end the small experiments where I try things out.',
    featuredMarker: '01 — FEATURED',
    moreMarker: '02 — MORE PROJECTS',
    moreHeading: 'More projects',
    featuredHeading: 'Featured projects',
    solo: 'Solo',
    moreSub: 'Tools, landings and games that are live. Smaller in scope, built with the same care.',
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
    // The project's `kind` follows it on the hero: "CASE STUDY · PERSONAL PRODUCT".
    eyebrow: 'CASE STUDY',
    contactMarker: 'CONTACT',
    openProject: 'Open the project',
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
    problemHeading: 'The problem',
    featuresHeading: 'What it does',
    decisionsHeading: 'Decisions',
    mistakesHeading: 'What I got wrong',
    growthHeading: 'How it grew',
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
    rssFeed: 'RSS feed',
    latest: 'Latest',
    minutes: (minutes) => `${minutes} min`,
    headline: 'What I learn while building, written down so it sticks.',
    sub: 'Essays on how I decide, and tutorials you can follow step by step.',
    allNotes: 'All notes',
  },
  // Experience board 2191:236; the "carries over" label is the approved D14 copy.
  experience: {
    carriesOver: 'What carries over to your team',
    now: 'now',
    groups: { work: 'Work', volunteering: 'Volunteering', 'beyond-class': 'Beyond class' },
  },
  // Pointer hint: lens component 2168:10. Remaining text: implementation design §2.
  lens: {
    lookInside: 'Look inside',
    pointerHint: 'Drag to see my technical side',
    touchHint: 'Tap to see my technical side',
    backOutside: 'Back outside',
    escapeKey: 'Esc',
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
  // Greeting, chips and the conversation script live in chat/script.en.ts (pure, testable under node --test).
  chat: chatEn,
  // Footer labels: Home board 2191:86; shortcut label describes the required control.
  footer: {
    navigate: 'Navigate',
    elsewhere: 'Elsewhere',
    thisSite: 'This site',
    shortcut: 'Turn off the I shortcut',
    insideHint: 'Press Esc or I to go back outside',
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
    inThisPost: 'In this post', published: 'First published on dev.to', updated: 'Updated', author: 'Written by Jahat Trinidad', authorRole: 'Design engineer, frontend and product. Open to an internship, now.', write: 'Write to me', keepReading: 'Keep reading', copy: 'Copy', copied: 'Copied', code: 'Code', note: 'Note',
  },
  // Labels reused by Work and case-study cards (boards 2239:17 and 2298:2).
  links: {
    description: 'I design and build products, from the first sketch to the live site.',
    availability: 'Open to an internship · Lima, Peru',
    workTitle: 'See my work',
    workSub: (projects, caseStudies) =>
      `${projects} ${projects === 1 ? 'project' : 'projects'} · ${caseStudies} ${caseStudies === 1 ? 'case study' : 'case studies'}`,
    notesTitle: 'Read my notes',
    notesSub: 'Essays and tutorials',
    latestSub: (minutes) => `Latest note · ${minutes} min read`,
    writeTitle: 'Write to me',
    writeSub: 'A short chat, straight to my inbox',
    elsewhere: 'Elsewhere',
  },
  common: {
    readMore: 'Read more',
    problem: 'The problem',
    myPart: 'My part',
    whatItDoes: 'What it does',
    teamOf: (size) => (size === 1 ? 'Solo' : `Team of ${size}`),
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es, pt };

/** Every locale, in switch order (EN / ES / PT). */
export const LOCALES: readonly Locale[] = ['en', 'es', 'pt'];

/** Each language's own name, for the switch's accessible labels; never translated. */
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', es: 'Español', pt: 'Português' };

/** No fallback: every locale has a complete Dictionary, so a missing one is a type error. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Locale-aware, prefix-correct link builder over `astro:i18n`. */
export function localizedPath(locale: Locale, path: string): string {
  return getRelativeLocaleUrl(locale, path);
}

/**
 * Translation group of a page that exists in every locale (Home, Work, Notes,
 * Links), for hreflang alternates and the language switch. `path` is the
 * English (unprefixed) path.
 */
export function localeGroup(path: string): TranslationLink[] {
  return LOCALES.map((lang) => ({ lang, slug: '', path: localizedPath(lang, path) }));
}
