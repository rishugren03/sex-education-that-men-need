import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, DoDont, MythGrid, Sources } from '../components/ui/blocks';
import { Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy, useI18n } from '../i18n';
import { Rich } from '../i18n/rich';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const TransmissionScene = lazy(() => import('../scenes/TransmissionScene').then((m) => ({ default: m.TransmissionScene })));

function RichLines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i}>
          <Rich>{line}</Rich>
          {i < text.split('\n').length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

export function STIs() {
  const webgl = useWebGL();
  const { t } = useI18n();
  const c = useChapterCopy('stis');

  return (
    <section id="stis" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={11} label={c.s('mark1')} accent="green" />
        <Statement accent={c.s('statementAccent')} accentColor="green">
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
              id="stage-transmission"
              accent="green"
              side="left"
              alt={t('altTransmission')}
              steps={c.steps('steps').map((s) => ({
                tag: s.tag,
                title: s.title,
                body: <Rich>{s.body}</Rich>,
              }))}
              scene={(s) => <TransmissionScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="transmission" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={11} label={c.s('mark2')} accent="green" />
        <div className="grid-3">
          <div>
            <h4 className="serif" style={{ fontSize: 'var(--t-h3)', marginBottom: '0.5rem', color: 'var(--cyan)' }}>
              {c.s('bacterialTitle')}
            </h4>
            <p style={{ fontSize: 'var(--t-small)', lineHeight: 1.6, color: 'var(--bone-2)' }}>
              <RichLines text={c.s('bacterial')} />
            </p>
          </div>
          <div>
            <h4 className="serif" style={{ fontSize: 'var(--t-h3)', marginBottom: '0.5rem', color: 'var(--blue)' }}>
              {c.s('viralTitle')}
            </h4>
            <p style={{ fontSize: 'var(--t-small)', lineHeight: 1.6, color: 'var(--bone-2)' }}>
              <RichLines text={c.s('viral')} />
            </p>
          </div>
          <div>
            <h4 className="serif" style={{ fontSize: 'var(--t-h3)', marginBottom: '0.5rem', color: 'var(--amber)' }}>
              {c.s('parasiticTitle')}
            </h4>
            <p style={{ fontSize: 'var(--t-small)', lineHeight: 1.6, color: 'var(--bone-2)' }}>
              <RichLines text={c.s('parasitic')} />
            </p>
          </div>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={11} label={c.s('mark3')} accent="green" />
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