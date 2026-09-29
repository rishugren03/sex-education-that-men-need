import * as c1 from './copy/en/chapters1';
import * as c2 from './copy/en/chapters2';
import * as c3 from './copy/en/chapters3';
import * as c4 from './copy/en/chapters4';
import { shared as EN_SHARED } from './copy/en/shared';
import { terms as EN_TERMS } from './copy/en/terms';

/**
 * The English chapter blocks are the schema: their keys are the only keys any
 * locale may use, and their shapes are what the accessors in `useChapter`
 * normalise. Adding a key here is the single edit needed to make it available
 * in every chapter component, in every locale.
 */
export type ChapterMap = {
  intro: typeof c1.intro;
  yourBody: typeof c1.yourBody;
  herBody: typeof c1.herBody;
  periods: typeof c1.periods;
  attraction: typeof c2.attraction;
  masturbation: typeof c2.masturbation;
  publicBehavior: typeof c2.publicBehavior;
  sex: typeof c2.sex;
  consent: typeof c3.consent;
  pregnancy: typeof c3.pregnancy;
  contraception: typeof c3.contraception;
  stis: typeof c3.stis;
  porn: typeof c4.porn;
  nudes: typeof c4.nudes;
  relationships: typeof c4.relationships;
  scenariosChapter: typeof c4.scenariosChapter;
  end: typeof c4.end;
};

export type ChapterId = keyof ChapterMap;

export type ChapterKey<K extends ChapterId> = keyof ChapterMap[K] & string;

/** Every UI string in `shared`, and every anatomy term, is key-checked. */
export type SharedKey = keyof typeof EN_SHARED;
export type TermKey = keyof typeof EN_TERMS;

/** Copy ids used in the progress rail, keyed by the section id in CHAPTERS. */
export const META_KEYS = [
  'intro',
  'your-body',
  'her-body',
  'periods',
  'attraction',
  'masturbation',
  'public',
  'sex',
  'consent',
  'pregnancy',
  'contraception',
  'stis',
  'porn',
  'nudes',
  'relationships',
  'scenarios',
  'end',
] as const;

export type MetaKey = (typeof META_KEYS)[number];

export type MetaEntry = { title: string; short: string; kicker: string };
