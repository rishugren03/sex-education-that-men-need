import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { EN } from './copy/en';
import { HI } from './copy/hi';
import type { SharedKey, TermKey } from './schema';
import { DEFAULT_LOCALE, LOCALES, type Copy, type Locale } from './types';

const STORAGE_KEY = 'taught:locale';

type I18nValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Look up a shared UI string, falling back to English. */
  t: (key: SharedKey, fallback?: string) => string;
  /** Look up an anatomical term, falling back to English. */
  term: (key: TermKey) => string;
  /** The whole resolved copy tree for the active locale. */
  copy: Copy;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && LOCALES.some((l) => l.code === v);
}

/**
 * localStorage first, then the browser's language preferences. A Hindi browser
 * lands on Hindi, which is the whole point for the target audience; English
 * stays the default so nothing changes for existing readers.
 */
function readInitial(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* private mode — fall through to detection */
  }
  for (const nav of navigator.languages ?? [navigator.language]) {
    if (!nav) continue;
    const base = nav.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

const DICTIONARIES: Record<Locale, Partial<Copy> | Copy> = { en: EN, hi: HI };

/**
 * Resolves a partial locale against English at chapter granularity, so a
 * half-translated chapter never renders as a patchwork. Missing keys inside a
 * translated chapter fall through to English rather than vanishing.
 */
function resolve(locale: Locale): Copy {
  if (locale === 'en') return EN;
  const overlay = DICTIONARIES[locale];

  const chapters: Record<string, Record<string, unknown>> = { ...EN.chapters };
  for (const [id, enChapter] of Object.entries(EN.chapters)) {
    const hiChapter = overlay.chapters?.[id];
    chapters[id] = hiChapter ? { ...enChapter, ...hiChapter } : enChapter;
  }

  return {
    shared: { ...EN.shared, ...(overlay.shared ?? {}) },
    terms: { ...EN.terms, ...(overlay.terms ?? {}) },
    scenarios: overlay.scenarios?.length ? overlay.scenarios : EN.scenarios,
    consentScenarios: overlay.consentScenarios?.length ? overlay.consentScenarios : EN.consentScenarios,
    chapters,
  };
}

function collectMissing(locale: Locale): string[] {
  if (locale === 'en') return [];
  const overlay = DICTIONARIES[locale];
  const missing: string[] = [];

  for (const key of Object.keys(EN.shared)) {
    if (!(key in (overlay.shared ?? {}))) missing.push(`shared.${key}`);
  }
  for (const key of Object.keys(EN.terms)) {
    if (!(key in (overlay.terms ?? {}))) missing.push(`terms.${key}`);
  }
  for (const key of Object.keys(EN.chapters)) {
    const chapter = overlay.chapters?.[key];
    if (!chapter) {
      missing.push(`chapters.${key}`);
      continue;
    }
    for (const field of Object.keys(EN.chapters[key])) {
      if (!(field in chapter)) missing.push(`${key}.${field}`);
    }
  }
  for (const group of ['scenarios', 'consentScenarios'] as const) {
    const en = EN[group];
    const loc = overlay[group];
    if (!loc?.length) continue;
    const enIds = en.map((s) => s.id).join(',');
    const locIds = loc.map((s) => s.id).join(',');
    if (enIds !== locIds) missing.push(`${group} ids/order`);
  }
  return missing;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitial);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* preference simply will not persist */
    }
  }, []);

  useEffect(() => {
    const meta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
    document.documentElement.lang = meta.lang;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const missing = collectMissing(locale);
      if (missing.length) {
        console.warn(`[i18n] ${locale} is missing ${missing.length} key(s):`, missing);
      }
    }
  }, [locale]);

  const copy = useMemo(() => resolve(locale), [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: (key, fallback) => copy.shared[key] ?? EN.shared[key] ?? fallback ?? key,
      term: (key) => copy.terms[key] ?? EN.terms[key] ?? key,
      copy,
    }),
    [locale, setLocale, copy],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LocaleProvider>');
  return ctx;
}

export type { ChapterId, ChapterKey, ChapterMap, MetaEntry, MetaKey, SharedKey, TermKey } from './schema';
export type { ChoiceCopy, ChoiceTone, Copy, ScenarioCopy } from './types';
export { META_KEYS } from './schema';
export { useChapterCopy } from './useChapter';
export type {
  ChapterCopy,
  CompareRowResolved,
  LadderRowResolved,
  MythCopyResolved,
  StageStepCopyResolved,
} from './useChapter';
