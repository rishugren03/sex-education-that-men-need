import { ChapterMark, Sources } from '../components/ui/blocks';
import { Reveal, Statement } from '../components/ui/primitives';

export function End() {
  return (
    <section id="end" data-chapter className="sect" style={{ paddingBottom: 'clamp(8rem, 20vw, 14rem)' }}>
      <div className="shell">
        <ChapterMark n={16} label="The end" accent="cyan" />
        <Statement>
          You don&apos;t need to know everything.
        </Statement>
        <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
          <Reveal delay={0.1}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
              Know your body.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
              Understand theirs.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
              Protect both.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
              Ask.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
              Listen.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
              Respect boundaries.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '2.4rem' }}>
              Take responsibility.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <hr style={{ border: 'none', borderTop: '1px solid var(--line)', maxWidth: '16rem', margin: '0 auto 2.4rem' }} />
            <p className="serif" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)', lineHeight: 1.25, textAlign: 'center', maxWidth: '42ch', margin: '0 auto' }}>
              Sexual maturity isn&apos;t about having more sex.
              <br />
              <span style={{ color: 'var(--cyan)' }}>
                It&apos;s about understanding more, respecting more, and taking responsibility for your choices.
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell" style={{ textAlign: 'center', marginTop: 'clamp(3rem, 8vw, 6rem)' }}>
        <Reveal delay={0.6}>
          <a className="cta" href="#intro" style={{ display: 'inline-flex' }}>
            Start over
            <span aria-hidden="true"> ↺</span>
          </a>
        </Reveal>
        <Reveal delay={0.7}>
          <p className="micro" style={{ marginTop: '1.8rem', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto' }}>
            No account. No tracking. No data leaves this page. Just you and the information.
          </p>
        </Reveal>
      </div>

      <div className="shell sect sect--tight" style={{ marginTop: 'clamp(3rem, 8vw, 5rem)', borderTop: '1px solid var(--line-soft)', paddingTop: '2rem' }}>
        <Sources items={['WHO sexual and reproductive health', 'NHS sexual health A–Z', 'CDC reproductive health', 'NACO / FOGSI India guidelines', 'APA / ICD-11', 'Peer-reviewed literature cited in-text']} />
      </div>
    </section>
  );
}