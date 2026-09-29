export type Locale = 'en' | 'hi';

export type LocaleMeta = {
  code: Locale;
  /** Name in English, for the switcher. */
  label: string;
  /** Name in the language itself, for the switcher. */
  native: string;
  /** Value for <html lang>. Drives screen-reader pronunciation and shaping. */
  lang: string;
  /** BCP 47 tag used for font matching. */
  bcp47: string;
};

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', native: 'English', lang: 'en', bcp47: 'en' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', lang: 'hi', bcp47: 'hi-IN' },
];

export const DEFAULT_LOCALE: Locale = 'en';

export type ChoiceTone = 'good' | 'risky' | 'harmful';

export type ChoiceCopy = {
  id: string;
  label: string;
  tone: ChoiceTone;
  outcome: string;
  better?: string;
};

export type ScenarioCopy = {
  id: string;
  /** Stable grouping key. Never translated — components filter on it. */
  chapter: string;
  where: string;
  prompt: string;
  choices: ChoiceCopy[];
  takeaway: string;
};

/** A chapter's pinned-3D steps. */
export type StageStepCopy = {
  tag: string;
  title: string;
  body: string;
};

export type MythCopy = { claim: string; truth: string };

export type StageAltCopy = { id: string; alt: string; steps: StageStepCopy[] };

export type Copy = {
  shared: Record<string, string>;
  terms: Record<string, string>;
  scenarios: ScenarioCopy[];
  consentScenarios: ScenarioCopy[];
  chapters: Record<string, Record<string, unknown>>;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

