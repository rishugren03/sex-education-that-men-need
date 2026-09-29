import { useMemo } from 'react';
import type { ScenarioCopy } from './types';
import { useI18n } from './index';
import type { ChapterId, ChapterKey } from './schema';

export type StageStepCopyResolved = { tag: string; title: string; body: string };
export type MythCopyResolved = { claim: string; truth: string };
export type CompareRowResolved = { l: string; r: string };
export type LadderRowResolved = { n: string; t: string; tone?: 'ok' | 'warn' | 'bad' };

export type ChapterCopy<K extends ChapterId> = {
  /** The whole block, for anything the accessors do not cover. */
  raw: (key: ChapterKey<K>) => unknown;
  /** A single string. */
  s: (key: ChapterKey<K>) => string;
  /** A list of strings. */
  l: (key: ChapterKey<K>) => string[];
  /** A statement pair: `key` plus `key + "Accent"`. */
  p: (key: ChapterKey<K>) => [string, string];
  /** Pinned-stage steps. */
  steps: (key: ChapterKey<K>) => StageStepCopyResolved[];
  /** Claim / truth pairs. */
  myths: (key: ChapterKey<K>) => MythCopyResolved[];
  /** Two-column comparison rows. */
  rows: (key: ChapterKey<K>) => CompareRowResolved[];
  /** Escalation ladder rows. */
  ladder: (key: ChapterKey<K>) => LadderRowResolved[];
  /** The five consent scenarios, in their fixed order. */
  consentScenarios: () => ScenarioCopy[];
  /** The scenarios whose `chapter` grouping key matches, in their fixed order. */
  scenarios: (chapter: string) => ScenarioCopy[];
  /** Every non-consent scenario, in their fixed order. */
  allScenarios: () => ScenarioCopy[];
};

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function list(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

/** Keeps only the named string fields, so copy shape changes cannot leak junk. */
function rows(v: unknown, fields: string[]): Record<string, string>[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === 'object')
    .map((row) => {
      const out: Record<string, string> = {};
      for (const f of fields) out[f] = str(row[f]);
      return out;
    });
}

/**
 * One chapter's copy for the active locale. The English block defines the keys,
 * so a key that does not exist is a compile error rather than a blank line.
 */
export function useChapterCopy<K extends ChapterId>(id: K): ChapterCopy<K> {
  const { copy, locale } = useI18n();
  const block = (copy.chapters[id] ?? {}) as Record<string, unknown>;
  const { consentScenarios, scenarios } = copy;

  return useMemo<ChapterCopy<K>>(() => {
    const get = (key: string): unknown => block[key];

    return {
      raw: get,
      s: (key) => str(get(key)),
      l: (key) => list(get(key)),
      p: (key) => [str(get(key)), str(get(`${key}Accent`))],
      steps: (key) => rows(get(key), ['tag', 'title', 'body']) as StageStepCopyResolved[],
      myths: (key) => rows(get(key), ['claim', 'truth']) as MythCopyResolved[],
      rows: (key) => rows(get(key), ['l', 'r']) as CompareRowResolved[],
      ladder: (key) => {
        const all = Array.isArray(get(key)) ? (get(key) as Record<string, unknown>[]) : [];
        return all.map((r) => {
          const tone = r.tone;
          return {
            n: str(r.n),
            t: str(r.t),
            tone: tone === 'ok' || tone === 'warn' || tone === 'bad' ? tone : undefined,
          };
        });
      },
      consentScenarios: () => consentScenarios,
      scenarios: (chapter) => scenarios.filter((s) => s.chapter === chapter),
      allScenarios: () => scenarios,
    };
  }, [block, locale, consentScenarios, scenarios]);
}
