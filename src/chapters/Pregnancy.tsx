import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy, useI18n } from '../i18n';
import { Rich } from '../i18n/rich';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const JourneyScene = lazy(() => import('../scenes/JourneyScene').then((m) => ({ default: m.JourneyScene })));

export function Pregnancy() {
  const webgl = useWebGL();
  const { t } = useI18n();
  const c = useChapterCopy('pregnancy');

  return (
    <section id="pregnancy" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={9} label={c.s('mark1')} accent="rose" />
        <Statement accent={c.s('statementAccent')} accentColor="rose">
          {c.s('statementBefore')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-journey"
              accent="rose"
              side="left"
              alt={t('altJourney')}
              steps={c.steps('steps').map((s) => ({
                tag: s.tag,
                title: s.title,
                body: <Rich>{s.body}</Rich>,
              }))}
              scene={(s) => <JourneyScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="journey" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={9} label={c.s('mark2')} accent="rose" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('onceTitle')}
            </h3>
            <Body>
              <Rich>{c.s('once1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('once2')}</Rich>
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('windowTitle')}
            </h3>
            <Body>
              <Rich>{c.s('window1')}</Rich>
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            {c.s('mythsTitle')}
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={c.myths('myths').map((m) => ({
            claim: m.claim,
            truth: <Rich>{m.truth}</Rich>,
          }))}
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label={c.s('careLabel')}>
          <Rich>{c.s('care')}</Rich>
        </Note>
        <div style={{ height: '1.4rem' }} />
        <Sources items={c.l('sources')} />
      </div>
    </section>
  );
}