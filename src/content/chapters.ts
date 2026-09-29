export type Accent = 'cyan' | 'blue' | 'rose' | 'amber' | 'green' | 'violet';

export type ChapterMeta = {
  /** Matches a key in the locale `meta` dictionaries, and the section id. */
  id: string;
  /** 1-based index */
  n: number;
  accent: Accent;
  /** Chapters with a 3D stage get a heavier loader */
  heavy?: boolean;
};

/**
 * Structure only. Titles, rail labels and kickers live in `i18n/copy/*\/meta`,
 * keyed by `id`, so translating the rail never means touching this file.
 */
export const CHAPTERS: ChapterMeta[] = [
  { id: 'intro', n: 0, accent: 'cyan' },
  { id: 'your-body', n: 1, accent: 'cyan', heavy: true },
  { id: 'her-body', n: 2, accent: 'cyan', heavy: true },
  { id: 'periods', n: 3, accent: 'rose', heavy: true },
  { id: 'attraction', n: 4, accent: 'blue', heavy: true },
  { id: 'masturbation', n: 5, accent: 'blue' },
  { id: 'public', n: 6, accent: 'amber' },
  { id: 'sex', n: 7, accent: 'violet' },
  { id: 'consent', n: 8, accent: 'green' },
  { id: 'pregnancy', n: 9, accent: 'rose', heavy: true },
  { id: 'contraception', n: 10, accent: 'green' },
  { id: 'stis', n: 11, accent: 'green', heavy: true },
  { id: 'porn', n: 12, accent: 'violet' },
  { id: 'nudes', n: 13, accent: 'rose' },
  { id: 'relationships', n: 14, accent: 'amber' },
  { id: 'scenarios', n: 15, accent: 'cyan' },
  { id: 'end', n: 16, accent: 'cyan' },
];

export const CHAPTER_COUNT = CHAPTERS.length;
