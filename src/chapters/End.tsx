import { ChapterMark, Sources } from '../components/ui/blocks';
import { Reveal, Statement } from '../components/ui/primitives';
import { useChapterCopy } from '../i18n';

export function End() {
  const c = useChapterCopy('end');

  return (
    <section id="end" data-chapter className="sect" style={{ paddingBottom: 'clamp(8rem, 20vw, 14rem)' }}>
      <div className="shell">
        <ChapterMark n={16} label={c.s('mark1')} accent="cyan" />
        <Statement accentColor="cyan">{c.s('statement')}</Statement>
        <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
          {c.l('lines').map((line, i) => (
            <Reveal key={line} delay={0.1 + i * 0.05}>
              <p
                className="serif"
                style={{ fontSize: 'clamp(1.8rem, 7vw, 3.6rem)', lineHeight: 1.15, marginBottom: '1.2rem' }}
              >
                {line}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.5}>
            <hr style={{ border: 'none', borderTop: '1px solid var(--line)', maxWidth: '16rem', margin: '0 auto 2.4rem' }} />
            <p
              className="serif"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)', lineHeight: 1.25, textAlign: 'center', maxWidth: '42ch', margin: '0 auto' }}
            >
              {c.s('closerBefore')}
              <br />
              <span style={{ color: 'var(--cyan)' }}>{c.s('closerAccent')}</span>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell" style={{ textAlign: 'center', marginTop: 'clamp(3rem, 8vw, 6rem)' }}>
        <Reveal delay={0.6}>
          <a className="cta" href="#intro" style={{ display: 'inline-flex' }}>
            {c.s('restart')}
            <span aria-hidden="true"> ↺</span>
          </a>
        </Reveal>
        <Reveal delay={0.7}>
          <p
            className="micro"
            style={{ marginTop: '1.8rem', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto' }}
          >
            {c.s('note')}
          </p>
        </Reveal>
      </div>

      <div
        className="shell sect sect--tight"
        style={{ marginTop: 'clamp(3rem, 8vw, 5rem)', borderTop: '1px solid var(--line-soft)', paddingTop: '2rem' }}
      >
        <Sources items={c.l('sources')} />
      </div>
    </section>
  );
}