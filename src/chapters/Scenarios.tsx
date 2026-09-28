import { ChapterMark, Sources } from '../components/ui/blocks';
import { Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { SCENARIOS } from '../content/scenarios';

export function Scenarios() {
  return (
    <section id="scenarios" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={15} label="Scenarios" accent="cyan" />
        <Statement>
          Real-life situations: <em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>twelve moments. No marks. Just consequences.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            This is not a test. It is a chance to think through moments before they happen. Tap a choice, see what
            follows, try another. The goal is not a perfect score — it is a faster, clearer instinct when the moment
            arrives.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="The pattern behind every scenario">
          Notice the thread: <strong>pause → assess → choose the option that respects the other person&apos;s autonomy</strong>.
          The "right" answer is almost always the one that treats the other person as a subject, not an object. That is
          the entire sexual ethics curriculum in one sentence.
        </Note>
        <Sources items={['Consent education frameworks', 'Bystander intervention research', 'Indian cyber law (IT Act, BNS 2023)']} />
      </div>
    </section>
  );
}