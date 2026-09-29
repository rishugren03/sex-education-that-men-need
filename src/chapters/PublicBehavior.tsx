import { ChapterMark, Ladder, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Statement } from '../components/ui/primitives';
import { useChapterCopy } from '../i18n';
import { Rich } from '../i18n/rich';

export function PublicBehavior() {
  const c = useChapterCopy('publicBehavior');

  return (
    <section id="public" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={6} label={c.s('mark1')} accent="amber" />
        <Statement accentColor="amber">{c.s('statement')}</Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            <Rich>{c.s('lede')}</Rich>
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={6} label={c.s('mark2')} accent="amber" />
        <Ladder
          rows={c.ladder('ladder').map((r) => ({
            n: r.n,
            tone: r.tone,
            t: <Rich>{r.t}</Rich>,
          }))}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={6} label={c.s('mark3')} accent="amber" />
        <Statement size="h2" accentColor="amber">
          {c.s('statement3')}
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            <Rich>{c.s('principle1')}</Rich>
          </Body>
          <Body delay={0.05}>
            <Rich>{c.s('principle2')}</Rich>
          </Body>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={6} label={c.s('mark4')} accent="amber" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('askTitle')}
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.6rem' }}>
              {c.l('questions').map((q) => (
                <li key={q}>
                  <Rich>{q}</Rich>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              {c.s('talkTitle')}
            </h3>
            <Body>
              <Rich>{c.s('talk1')}</Rich>
            </Body>
            <Body delay={0.05}>
              <Rich>{c.s('talk2')}</Rich>
            </Body>
          </div>
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
