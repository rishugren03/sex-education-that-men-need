import { ChapterMark, Compare, DoDont, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function Porn() {
  const c = useChapterCopy('porn');

  return (
    <section id="porn" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={12} label={c.s('mark1')} accent="violet" />
        <Statement accent={c.s('statementAccent')} accentColor="violet">
          {c.s('statementBefore')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={12} label={c.s('mark2')} accent="violet" />
        <Compare
          left={{ title: c.s('compareLeft'), color: 'var(--violet)' }}
          right={{ title: c.s('compareRight'), color: 'var(--green)' }}
          rows={c.rows('compare').map((r) => ({ l: r.l, r: r.r }))}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={12} label={c.s('mark3')} accent="violet" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('bodyImageTitle')}
            </h3>
            <Body>
              <Rich>{c.s('bodyImageBody')}</Rich>
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('anxietyTitle')}
            </h3>
            <Body>
              <Rich>{c.s('anxietyBody')}</Rich>
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={12} label={c.s('mark4')} accent="violet" />
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