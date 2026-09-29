import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, DoDont, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy, useI18n } from '../i18n';
import { Rich } from '../i18n/rich';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const CycleScene = lazy(() => import('../scenes/CycleScene').then((m) => ({ default: m.CycleScene })));

export function Periods() {
  const webgl = useWebGL();
  const { t } = useI18n();
  const c = useChapterCopy('periods');

  return (
    <section id="periods" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={3} label={c.s('mark1')} accent="rose" />
        <Statement accent={c.s('statementAccent')}>{c.s('statementBefore')}</Statement>
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
              id="stage-cycle"
              accent="rose"
              side="left"
              alt={t('altCycle')}
              steps={c.steps('steps').map((s) => ({
                tag: s.tag,
                title: s.title,
                body: <Rich>{s.body}</Rich>,
              }))}
              scene={(s) => <CycleScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="cycle" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={3} label={c.s('mark2')} accent="rose" />
        <Statement size="h2" accent={c.s('statement2Accent')}>
          {c.s('statement2Before')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <DoDont
            dont={c.l('dont').map((d) => (
              <Rich key={d}>{d}</Rich>
            ))}
            do={c.l('do').map((d) => (
              <Rich key={d}>{d}</Rich>
            ))}
            accent="green"
          />
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
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('doctorTitle')}
            </h3>
            <Body>
              <Rich>{c.s('doctor1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('doctor2')}</Rich>
            </Body>
          </div>
          <div>
            <Sources items={c.l('sources')} />
          </div>
        </div>
      </div>
    </section>
  );
}
