import { ChapterMark, Ladder, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Statement } from '../components/ui/primitives';

export function PublicBehavior() {
  return (
    <section id="public" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={6} label="Public space" accent="amber" />
        <Statement>
          Your attraction doesn&apos;t give you access to someone.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Noticing someone is involuntary. Staring, following, blocking, touching — those are choices. This is the
            escalation almost nobody was warned about.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={6} label="The ladder" accent="amber" />
        <Ladder
          rows={[
            { n: '01', t: 'NOTICE — You see someone attractive. A glance. It lasts a second. This is normal.', tone: 'ok' },
            { n: '02', t: 'LOOK — You keep looking. Your eyes track her body. She notices. She feels watched.', tone: 'warn' },
            { n: '03', t: 'STARE — You hold the gaze. You do not look away when she catches you. This is intimidation.', tone: 'bad' },
            { n: '04', t: 'FOLLOW — You change your path to stay near her. You get off at her stop. You walk behind her. This is stalking.', tone: 'bad' },
            { n: '05', t: 'APPROACH — You block her path, tap her shoulder, whistle, comment on her body. She did not invite this.', tone: 'bad' },
            { n: '06', t: 'TOUCH — Any non-consensual contact. This is sexual assault. Not a mistake. A crime.', tone: 'bad' },
          ]}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={6} label="The principle" accent="amber" />
        <Statement size="h2">
          Sexual attraction does not make a public space private.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            A street, a metro, a campus, a market — these are shared spaces. Everyone in them has the right to move
            without being tracked, assessed, commented on, or touched. Your internal experience does not rewrite that
            right.
          </Body>
          <Body delay={0.05}>
            <strong>Briefly noticing someone is normal.</strong> Repeatedly staring can make someone uncomfortable.
            Following someone is inappropriate. Blocking someone&apos;s path is unacceptable. Touching without consent is
            never acceptable. Sexual comments toward strangers can be intimidating and unwanted.
          </Body>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={6} label="Practical check" accent="amber" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Before you act, ask yourself
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.6rem' }}>
              <li>Would I do this if a camera were on me?</li>
              <li>Would I want a stranger doing this to my sister / friend / mother?</li>
              <li>Does this person have any way to say &ldquo;no&rdquo; or leave?</li>
              <li>Am I making this space smaller for her?</li>
            </ul>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              If you want to talk to someone
            </h3>
            <Body>
              Wait for a natural, social context where she can freely engage or walk away. A bookshop queue, a mutual
              friend&apos;s party, a shared activity. Not a dark street, not an empty carriage, not when she has
              headphones on, not when she is walking fast.
            </Body>
            <Body delay={0.05}>
              And if she gives one-word answers, looks away, steps back, or says she has to go — <strong>that is the
              end of the interaction</strong>. Not the beginning of persuasion.
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="If you are being followed or harassed">
          Trust your instinct. Move toward people. Enter a shop. Call 112 (police) or 181 (women&apos;s helpline). If
          someone touches you without consent, shout, make a scene, attract attention — the social cost of making a
          scene is far lower than the cost of freezing.
        </Note>
        <Sources items={['IPC/BNS 2023 Sections 74–79 (sexual harassment, stalking, voyeurism)', 'Delhi Police safety guidelines']} />
      </div>
    </section>
  );
}