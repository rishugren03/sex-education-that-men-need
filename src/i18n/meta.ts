import { useCallback, useMemo } from 'react';
import { meta as EN_META } from './copy/en/meta';
import { meta as HI_META } from './copy/hi/meta';
import { useI18n } from './index';
import type { MetaEntry, MetaKey } from './schema';
import type { Locale } from './types';

const META: Record<Locale, Record<string, MetaEntry>> = { en: EN_META, hi: HI_META };

const FALLBACK: MetaEntry = { title: '', short: '', kicker: '' };

/**
 * Rail labels and chapter kickers. Missing translations fall back to the
 * English entry key by key, so a partial meta dictionary still renders.
 */
export function useChapterMeta(): (id: string) => MetaEntry {
  const { locale } = useI18n();

  const table = useMemo(() => {
    const own = META[locale] ?? {};
    const merged: Record<string, MetaEntry> = {};
    for (const key of Object.keys(EN_META) as MetaKey[]) {
      merged[key] = { ...EN_META[key], ...(own[key] ?? {}) } as MetaEntry;
    }
    return merged;
  }, [locale]);

  return useCallback((id: string) => table[id] ?? FALLBACK, [table]);
}
