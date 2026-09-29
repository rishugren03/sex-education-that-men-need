import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy, useI18n } from '../i18n';
import { Rich } from '../i18n/rich';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const MaleScene = lazy(() => import('../scenes/MaleScene').then((m) => ({ default: m.MaleScene })));

export function YourBody() {
  const webgl = useWebGL();
  const { t } = useI18n();
  const c = useChapterCopy('yourBody');

  return (
    <section id="your-body" data-chapter className="sect" style={{ paddingTop: 'clamp(4rem,12vw,8rem)' }}>
      <div className="shell">
        <ChapterMark n={1} label={c.s('mark1')} />
        <Statement>{c.s('statement')}</Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      {/* ── Pinned 3D anatomy ── */}
      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-male"
              accent="cyan"
              side="left"
              alt={t('altMale')}
              steps={c.steps('steps').map((s) => ({
                tag: s.tag,
                title: s.title,
                body: <Rich>{s.body}</Rich>,
              }))}
              scene={(s) => <MaleScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="male" />
          </div>
        )}
      </div>

      {/* ── Puberty / testosterone ── */}
      <div className="shell sect">
        <ChapterMark n={1} label={c.s('mark2')} />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('pubertyTitle')}
            </h3>
            <Body>
              <Rich>{c.s('puberty1')}</Rich>
            </Body>
            <Body delay={0.06}>
              <Rich>{c.s('puberty2')}</Rich>
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('testosteroneTitle')}
            </h3>
            <Body>
              <Rich>{c.s('testosterone1')}</Rich>
            </Body>
            <Body delay={0.06}>
              <Rich>{c.s('testosterone2')}</Rich>
            </Body>
          </div>
        </div>
      </div>

      {/* ── Myths ── */}
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

      {/* ── Ejaculation & orgasm ── */}
      <div className="shell sect sect--tight">
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('orgasmTitle')}
            </h3>
            <Body>
              <Rich>{c.s('orgasm1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('orgasm2')}</Rich>
            </Body>
          </div>
          <div>
            <Note kind="care" label={c.s('doctorNoteLabel')}>
              <Rich>{c.s('doctorNote')}</Rich>
            </Note>
            <div style={{ height: '1.4rem' }} />
            <Sources items={c.l('sources')} />
          </div>
        </div>
      </div>
    </section>
  );
}
