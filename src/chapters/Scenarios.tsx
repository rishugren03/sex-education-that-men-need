import { ChapterMark, Sources } from '../components/ui/blocks';
import { Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function Scenarios() {
  const c = useChapterCopy('scenariosChapter');
  const scenarios = c.allScenarios();

  return (
    <section id="scenarios" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={15} label={c.s('mark1')} accent="cyan" />
        <Statement accent={c.s('statementAccent')} accentColor="cyan">
          {c.s('statementBefore')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {scenarios.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label={c.s('noteLabel')}>
          <Rich>{c.s('note')}</Rich>
        </Note>
        <div style={{ height: '1.4rem' }} />
        <Sources items={c.l('sources')} />
      </div>
    </section>
  );
}