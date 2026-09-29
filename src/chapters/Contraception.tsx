import { ChapterMark, Compare, DoDont, MythGrid, Sources } from '../components/ui/blocks';
import { Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function Contraception() {
  const c = useChapterCopy('contraception');

  return (
    <section id="contraception" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={10} label={c.s('mark1')} accent="green" />
        <Statement accent={c.s('statementAccent')} accentColor="green">
          {c.s('statementBefore')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={10} label={c.s('mark2')} accent="green" />
        <Compare
          left={{ title: c.s('compareLeft'), color: 'var(--green)' }}
          right={{ title: c.s('compareRight'), color: 'var(--blue)' }}
          rows={c.rows('compare').map((r) => ({ l: r.l, r: r.r }))}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={10} label={c.s('mark3')} accent="green" />
        <Statement size="h2" accentColor="green">
          {c.s('statement3')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.7rem' }}>
            {c.l('steps9').map((s, i) => (
              <li key={i}>
                <Rich>{s}</Rich>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={10} label={c.s('mark4')} accent="green" />
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
        <Note kind="care" label={c.s('sizingLabel')}>
          <Rich>{c.s('sizing')}</Rich>
        </Note>
        <div style={{ height: '1.4rem' }} />
        <Sources items={c.l('sources')} />
      </div>
    </section>
  );
}