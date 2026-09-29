import { ChapterMark, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function Consent() {
  const c = useChapterCopy('consent');
  const scenarios = c.consentScenarios();

  return (
    <section id="consent" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={8} label={c.s('mark1')} accent="green" />
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
        <ChapterMark n={8} label={c.s('mark2')} accent="green" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('rulesLeftTitle')}
            </h3>
            <Body>
              <Rich>{c.s('rulesLeft1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('rulesLeft2')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('rulesLeft3')}</Rich>
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('rulesRightTitle')}
            </h3>
            <Body>
              <Rich>{c.s('rulesRight1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('rulesRight2')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('rulesRight3')}</Rich>
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={8} label={c.s('mark3')} accent="green" />
        <Statement size="h2" accentColor="green">
          {c.s('statement3')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {scenarios.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={8} label={c.s('mark4')} accent="green" />
        <Statement size="h2" accentColor="green">
          {c.s('statement4')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            <Rich>{c.s('bottom1')}</Rich>
          </Body>
          <Body delay={0.05}>
            <Rich>{c.s('bottom2')}</Rich>
          </Body>
        </div>
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
