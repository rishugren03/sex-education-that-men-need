import { ChapterMark, DoDont, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function Relationships() {
  const c = useChapterCopy('relationships');
  const rejectionScenarios = c.scenarios('Rejection');

  return (
    <section id="relationships" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={14} label={c.s('mark1')} accent="amber" />
        <Statement accent={c.s('statementAccent')} accentColor="amber">
          {c.s('statementBefore')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={14} label={c.s('mark2')} accent="amber" />
        <Statement size="h2" accentColor="amber">
          {c.s('statement2')}
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

      <div className="shell sect">
        <ChapterMark n={14} label={c.s('mark3')} accent="amber" />
        <Statement size="h2" accentColor="amber">
          {c.s('statement3')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            <Rich>{c.s('jealousy1')}</Rich>
          </Body>
          <Body delay={0.05}>
            <Rich>{c.s('jealousy2')}</Rich>
          </Body>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={14} label={c.s('mark4')} accent="amber" />
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {rejectionScenarios.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={14} label={c.s('mark5')} accent="amber" />
        <DoDont
          dont={c.l('dont2').map((d) => (
            <Rich key={d}>{d}</Rich>
          ))}
          do={c.l('do2').map((d) => (
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