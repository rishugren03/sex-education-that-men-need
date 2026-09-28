export type Accent = 'cyan' | 'blue' | 'rose' | 'amber' | 'green' | 'violet';

export type ChapterMeta = {
  id: string;
  /** 1-based index */
  n: number;
  /** Big statement title */
  title: string;
  /** Short label used in the progress rail */
  short: string;
  /** One-line "what this chapter is about" */
  kicker: string;
  accent: Accent;
  /** Chapters with a 3D stage get a heavier loader */
  heavy?: boolean;
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'intro',
    n: 0,
    title: 'Nobody properly taught you this.',
    short: 'Start',
    kicker: 'Where most of this actually comes from — and why some of it is wrong.',
    accent: 'cyan',
  },
  {
    id: 'body',
    n: 1,
    title: 'Your body',
    short: 'Your body',
    kicker: 'Anatomy without shame, and the myths that followed you into adulthood.',
    accent: 'cyan',
    heavy: true,
  },
  {
    id: 'her-body',
    n: 2,
    title: 'Her body',
    short: 'Her body',
    kicker: 'Vulva is not vagina. Understanding this changes everything.',
    accent: 'cyan',
    heavy: true,
  },
  {
    id: 'periods',
    n: 3,
    title: 'Periods',
    short: 'Periods',
    kicker: 'What is actually happening, and how to behave during it.',
    accent: 'rose',
    heavy: true,
  },
  {
    id: 'attraction',
    n: 4,
    title: 'Attraction & sexual urges',
    short: 'Urges',
    kicker: 'Feeling something is not the same as doing something.',
    accent: 'blue',
    heavy: true,
  },
  {
    id: 'masturbation',
    n: 5,
    title: 'Masturbation: what is normal?',
    short: 'Masturbation',
    kicker: 'What it is, what it is not, and when it genuinely becomes a problem.',
    accent: 'blue',
  },
  {
    id: 'public',
    n: 6,
    title: 'Your attraction does not give you access to someone.',
    short: 'Public space',
    kicker: 'The six-step escalation almost nobody was warned about.',
    accent: 'amber',
  },
  {
    id: 'sex',
    n: 7,
    title: 'What actually happens during sex',
    short: 'The act',
    kicker: 'Physiology, not performance.',
    accent: 'violet',
  },
  {
    id: 'consent',
    n: 8,
    title: 'Consent',
    short: 'Consent',
    kicker: 'The single most important chapter in this whole thing.',
    accent: 'green',
  },
  {
    id: 'pregnancy',
    n: 9,
    title: 'Pregnancy',
    short: 'Pregnancy',
    kicker: 'Sperm, egg, fertilisation, implantation — and how one time is enough.',
    accent: 'rose',
    heavy: true,
  },
  {
    id: 'contraception',
    n: 10,
    title: 'Contraception & condoms',
    short: 'Contraception',
    kicker: 'How to use one properly, and what to do when it fails.',
    accent: 'green',
  },
  {
    id: 'stis',
    n: 11,
    title: 'STIs',
    short: 'STIs',
    kicker: 'Often invisible. Often curable. Never a character flaw.',
    accent: 'green',
    heavy: true,
  },
  {
    id: 'porn',
    n: 12,
    title: 'Porn is not sex education.',
    short: 'Porn',
    kicker: 'It is a fantasy with editing. Reality does not work like that.',
    accent: 'violet',
  },
  {
    id: 'nudes',
    n: 13,
    title: 'Nudes & digital consent',
    short: 'Nudes',
    kicker: 'She trusted you with her phone. That is the entire permission.',
    accent: 'rose',
  },
  {
    id: 'relationships',
    n: 14,
    title: 'Rejection, jealousy & communication',
    short: 'Relationships',
    kicker: 'The part that actually decides whether you are a decent partner.',
    accent: 'amber',
  },
  {
    id: 'scenarios',
    n: 15,
    title: 'Real-life situations',
    short: 'Scenarios',
    kicker: 'Twelve moments. No marks. Just consequences.',
    accent: 'cyan',
  },
  {
    id: 'end',
    n: 16,
    title: 'You do not need to know everything.',
    short: 'The end',
    kicker: 'Eight things worth carrying out of here.',
    accent: 'cyan',
  },
];

export const CHAPTER_COUNT = CHAPTERS.length;
