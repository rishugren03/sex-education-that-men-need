import { ChapterMark, Compare, DoDont, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Statement } from '../components/ui/primitives';

export function Sex() {
  return (
    <section id="sex" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={7} label="The act" accent="violet" />
        <Statement>
          What actually happens during sex — <em style={{ fontStyle: 'italic', color: 'var(--violet)' }}>physiology, not performance.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Porn teaches a script. Bodies do something else. Understanding the actual physiology removes the pressure to
            perform and makes room for communication.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={7} label="The sequence" accent="violet" />
        <Compare
          left={{ title: 'What porn shows', color: 'var(--violet)' }}
          right={{ title: 'What bodies actually do', color: 'var(--green)' }}
          rows={[
            { l: 'Instant, rock-hard erection', r: 'Erections come and go; they can soften and return — that is normal' },
            { l: 'Instant, dripping lubrication', r: 'Arousal builds gradually; lubrication varies; lube is normal and recommended' },
            { l: 'Penetration starts immediately', r: 'Most people need warm-up: kissing, touching, oral, time' },
            { l: 'Rhythmic pounding to simultaneous orgasm', r: 'Rhythms vary; most women need clitoral stimulation; simultaneous orgasm is rare' },
            { l: 'No talking, just knowing', r: 'Communication is the skill: "slower", "there", "not that", "yes"' },
            { l: 'Performance ends at male ejaculation', r: 'Sex ends when both people are done — or when either wants to stop' },
          ]}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={7} label="Key facts" accent="violet" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Erections are not a binary switch
            </h3>
            <Body>
              Losing an erection during sex is common — especially with a new partner, when nervous, tired, drunk, or
              distracted. It does not mean you are broken, unattracted, or "not a man". It means your sympathetic nervous
              system (fight/flight) briefly overrode the parasympathetic (arousal). Breathing, slowing down, switching to
              hands/mouth, or taking a break usually brings it back.
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Orgasm is not guaranteed, and that is fine
            </h3>
            <Body>
              Anorgasmia (difficulty reaching orgasm) affects people of all genders. It can be situational, medication-
              related, stress-related, or just how your body works today. Treating orgasm as the only "success" metric
              creates the anxiety that prevents it. Pleasure ≠ orgasm.
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={7} label="Lubrication" accent="violet" />
        <DoDont
          dont={[
            'Assume wetness = desire. Lubrication is a physiological response that can happen without desire, and desire can exist without lubrication.',
            'Use saliva as lube — it dries fast and can introduce bacteria.',
            'Use oil-based products (coconut oil, baby oil, Vaseline) with latex condoms — they degrade latex in seconds.',
            'Treat needing lube as a failure. Post-menopausal women, people on certain medications, and people who are just not that wet today all need lube. It is a tool, not a verdict.',
          ]}
          do={[
            'Keep water-based or silicone lube by the bed. It is the single cheapest upgrade to comfort and safety.',
            'Reapply as needed. Silicone lasts longer; water-based is easier to clean.',
            'Communicate: "Can we add some lube?" is a normal sentence, not a criticism.',
            'For anal sex, lube is non-negotiable — the anus does not self-lubricate and tissue tears easily.',
          ]}
          accent="green"
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="When to see a doctor">
          Persistent erectile difficulty (more than a few weeks), pain during sex, bleeding after sex, inability to
          ejaculate, or a sudden change in sexual function — these are medical conversations, not performance conversations.
          A urologist or sexual health clinic can help.
        </Note>
        <Sources items={['NHS sexual health', 'Mayo Clinic sexual response', 'ISSM (International Society for Sexual Medicine)']} />
      </div>
    </section>
  );
}