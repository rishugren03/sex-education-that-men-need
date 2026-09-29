import { ChapterMark, DoDont, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function Nudes() {
  const c = useChapterCopy('nudes');
  const scenarios = c.scenarios('Nudes');

  return (
    <section id="nudes" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={13} label={c.s('mark1')} accent="rose" />
        <Statement accent={c.s('statementAccent')} accentColor="rose">
          {c.s('statementBefore')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={13} label={c.s('mark2')} accent="rose" />
        <Statement size="h2" accentColor="rose">
          {c.s('statement2')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            <Rich>{c.s('ruleBody')}</Rich>
          </Body>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={13} label={c.s('mark3')} accent="rose" />
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {scenarios.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={13} label={c.s('mark4')} accent="rose" />
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
        <Note kind="care" label={c.s('careLabel')}>
          <Rich>{c.s('care')}</Rich>
        </Note>
        <div style={{ height: '1.4rem' }} />
        <Sources items={c.l('sources')} />
      </div>
    </section>
  );
}