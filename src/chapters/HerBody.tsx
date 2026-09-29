import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy, useI18n } from '../i18n';
import { Rich } from '../i18n/rich';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const FemaleScene = lazy(() => import('../scenes/FemaleScene').then((m) => ({ default: m.FemaleScene })));

export function HerBody() {
  const webgl = useWebGL();
  const { t } = useI18n();
  const c = useChapterCopy('herBody');

  return (
    <section id="her-body" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={2} label={c.s('mark1')} />
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
              id="stage-female"
              accent="cyan"
              side="left"
              alt={t('altFemale')}
              steps={c.steps('steps').map((s) => ({
                tag: s.tag,
                title: s.title,
                body: <Rich>{s.body}</Rich>,
              }))}
              scene={(s) => <FemaleScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="female" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={2} label={c.s('mark2')} />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('distinction1Title')}
            </h3>
            <Body>
              <Rich>{c.s('distinction1a')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('distinction1b')}</Rich>
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('distinction2Title')}
            </h3>
            <Body>
              <Rich>{c.s('distinction2a')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('distinction2b')}</Rich>
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
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('doctorTitle')}
            </h3>
            <Body>
              <Rich>{c.s('doctorBody')}</Rich>
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
