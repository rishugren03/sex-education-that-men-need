import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy, useI18n } from '../i18n';
import { Rich } from '../i18n/rich';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const ArousalScene = lazy(() => import('../scenes/ArousalScene').then((m) => ({ default: m.ArousalScene })));

export function Attraction() {
  const webgl = useWebGL();
  const { t } = useI18n();
  const c = useChapterCopy('attraction');

  return (
    <section id="attraction" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={4} label={c.s('mark1')} accent="blue" />
        <Statement accent={c.s('statementAccent')} accentColor="blue">
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
              id="stage-arousal"
              accent="blue"
              side="left"
              alt={t('altArousal')}
              steps={c.steps('steps').map((s) => ({
                tag: s.tag,
                title: s.title,
                body: <Rich>{s.body}</Rich>,
              }))}
              scene={(s) => <ArousalScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="arousal" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={4} label={c.s('mark2')} accent="blue" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('loudTitle')}
            </h3>
            <Body>
              <Rich>{c.s('loud1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('loud2')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('loud3')}</Rich>
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('notWorkTitle')}
            </h3>
            <Body>
              <Rich>{c.s('notWork1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('notWork2')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('notWork3')}</Rich>
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
