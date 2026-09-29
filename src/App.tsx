import { lazy, Suspense, useEffect } from 'react';
import { Chrome } from './components/shell/Chrome';
import { SmoothScroll } from './components/shell/SmoothScroll';
import { LocaleProvider, useI18n } from './i18n';
import { useScrollRestoration } from './lib/hooks';

const Intro = lazy(() => import('./chapters/Intro').then((m) => ({ default: m.Intro })));
const YourBody = lazy(() => import('./chapters/YourBody').then((m) => ({ default: m.YourBody })));
const HerBody = lazy(() => import('./chapters/HerBody').then((m) => ({ default: m.HerBody })));
const Periods = lazy(() => import('./chapters/Periods').then((m) => ({ default: m.Periods })));
const Attraction = lazy(() => import('./chapters/Attraction').then((m) => ({ default: m.Attraction })));
const Masturbation = lazy(() => import('./chapters/Masturbation').then((m) => ({ default: m.Masturbation })));
const PublicBehavior = lazy(() => import('./chapters/PublicBehavior').then((m) => ({ default: m.PublicBehavior })));
const Sex = lazy(() => import('./chapters/Sex').then((m) => ({ default: m.Sex })));
const Consent = lazy(() => import('./chapters/Consent').then((m) => ({ default: m.Consent })));
const Pregnancy = lazy(() => import('./chapters/Pregnancy').then((m) => ({ default: m.Pregnancy })));
const Contraception = lazy(() => import('./chapters/Contraception').then((m) => ({ default: m.Contraception })));
const STIs = lazy(() => import('./chapters/STIs').then((m) => ({ default: m.STIs })));
const Porn = lazy(() => import('./chapters/Porn').then((m) => ({ default: m.Porn })));
const Nudes = lazy(() => import('./chapters/Nudes').then((m) => ({ default: m.Nudes })));
const Relationships = lazy(() => import('./chapters/Relationships').then((m) => ({ default: m.Relationships })));
const Scenarios = lazy(() => import('./chapters/Scenarios').then((m) => ({ default: m.Scenarios })));
const End = lazy(() => import('./chapters/End').then((m) => ({ default: m.End })));

function Skeleton() {
  return <div style={{ minHeight: '100svh' }} aria-hidden="true" />;
}

/** Keeps the document head in the reader's language, not just the body. */
function DocumentMeta() {
  const { t } = useI18n();
  useEffect(() => {
    document.title = t('docTitle');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('docDescription'));
  }, [t]);
  return null;
}

function Lesson() {
  useScrollRestoration();
  const { t } = useI18n();

  useEffect(() => {
    document.body.classList.add('grain');
    return () => document.body.classList.remove('grain');
  }, []);

  return (
    <SmoothScroll>
      <DocumentMeta />
      <a className="skip-link" href="#your-body">
        {t('skipToLesson')}
      </a>
      <Chrome />
      <main>
        <Suspense fallback={<Skeleton />}>
          <Intro />
          <YourBody />
          <HerBody />
          <Periods />
          <Attraction />
          <Masturbation />
          <PublicBehavior />
          <Sex />
          <Consent />
          <Pregnancy />
          <Contraception />
          <STIs />
          <Porn />
          <Nudes />
          <Relationships />
          <Scenarios />
          <End />
        </Suspense>
      </main>
    </SmoothScroll>
  );
}

export function App() {
  return (
    <LocaleProvider>
      <Lesson />
    </LocaleProvider>
  );
}