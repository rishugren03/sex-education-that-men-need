import { ChapterMark, DoDont, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function Masturbation() {
  const c = useChapterCopy('masturbation');

  return (
    <section id="masturbation" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={5} label={c.s('mark1')} accent="blue" />
        <Statement accentColor="blue">{c.s('statement')}</Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={5} label={c.s('mark2')} accent="blue" />
        <Statement size="h2" accentColor="blue">
          {c.s('statement2')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            <Rich>{c.s('what1')}</Rich>
          </Body>
          <Body delay={0.05}>
            <Rich>{c.s('what2')}</Rich>
          </Body>
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

      <div className="shell sect">
        <ChapterMark n={5} label={c.s('mark3')} accent="blue" />
        <Statement size="h2" accentColor="blue">
          {c.s('statement3')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            <Rich>{c.s('problemIntro')}</Rich>
          </Body>
          <ul style={{ margin: '1rem 0 0 1.2rem', display: 'grid', gap: '0.5rem' }}>
            {c.l('problems').map((p) => (
              <li key={p}>
                <Rich>{p}</Rich>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={5} label={c.s('mark4')} accent="blue" />
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
        <Note kind="care" label={c.s('hygieneLabel')}>
          <Rich>{c.s('hygiene')}</Rich>
        </Note>
        <div style={{ height: '1.4rem' }} />
        <Sources items={c.l('sources')} />
      </div>
    </section>
  );
}
