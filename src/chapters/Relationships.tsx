import { ChapterMark, DoDont, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { SCENARIOS } from '../content/scenarios';

const relScenarios = SCENARIOS.filter((s) => s.chapter === 'Relationships' || s.chapter === 'Rejection' || s.chapter === 'Contraception');

export function Relationships() {
  return (
    <section id="relationships" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={14} label="Relationships" accent="amber" />
        <Statement>
          Rejection, jealousy & communication: <em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>the part that actually decides whether you are a decent partner.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Biology is the easy part. Emotional maturity — how you handle desire mismatch, rejection, jealousy, and
            boundaries — is what makes a relationship work or not.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={14} label="Desire mismatch" accent="amber" />
        <Statement size="h2">
          "She doesn&apos;t want sex" is not a problem to solve.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <DoDont
            dont={[
              'Guilt-trip: "If you loved me, you would."',
              'Repeatedly ask after she has said no.',
              'Threaten to leave / cheat / watch porn instead.',
              'Compare her to exes, to porn, to "other girls".',
              'Assume she doesn&apos;t love you because she doesn&apos;t want sex right now.',
              'Sulk, give the silent treatment, or make her feel bad for having a boundary.',
            ]}
            do={[
              'Accept the answer the first time. "No worries. Want to watch something / play something / just talk?"',
              'Understand that desire is not constant — stress, fatigue, hormones, medication, relationship dynamics all affect it.',
              'If desire mismatch is chronic: talk about it <strong>outside the bedroom</strong>, not in the moment. "I feel unwanted when we don&apos;t connect physically. Can we talk about what intimacy looks like for us?"',
              'Recognise that pressure kills desire. The fastest way to less sex is making every "no" a negotiation.',
            ]}
            accent="green"
          />
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={14} label="Jealousy" accent="amber" />
        <Statement size="h2">
          Jealousy is a signal, not a command.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            Feeling jealous does not make you toxic. Acting on it without thinking does. Jealousy usually means: "I am
            afraid of losing something I value" or "I feel inadequate". Neither of those is your partner&apos;s fault.
          </Body>
          <Body delay={0.05}>
            <strong>Do:</strong> name it ("I&apos;m feeling jealous right now"), self-soothe (breathe, walk, write), then
            communicate the underlying need ("I need reassurance that we&apos;re solid").
            <strong>Don&apos;t:</strong> check her phone, demand location sharing, forbid friendships, accuse without
            evidence, make her responsible for your insecurity.
          </Body>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={14} label="Rejection" accent="amber" />
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {relScenarios.filter((s) => s.chapter === 'Rejection').map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={14} label="Communication" accent="amber" />
        <DoDont
          dont={[
            'Expect mind-reading. "You should just know."',
            'Bring up grievances in the middle of sex or right before sleep.',
            'Use absolutes: "You always...", "You never...".',
            'Stonewall (go silent for days) instead of saying "I need time to think".',
            'Vent to friends instead of talking to your partner.',
          ]}
          do={[
            'Use "I" statements: "I feel X when Y happens, and I would like Z."',
            'Schedule a weekly 20-minute check-in: what worked, what didn&apos;t, what do we need.',
            'Ask: "What does support look like for you right now?"',
            'Apologise specifically: "I snapped earlier. That was unfair. I am sorry."',
            'Celebrate the small things. Gratitude builds the buffer for the hard conversations.',
          ]}
          accent="green"
        />
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Three myths about relationships
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'If we love each other, we shouldn&apos;t have to work at it.',
              truth: 'Every long-term relationship requires maintenance. The "work" is not suffering — it is attention, repair, and choice. The couples who last are the ones who keep choosing each other, especially when it is inconvenient.',
            },
            {
              claim: 'Jealousy proves love.',
              truth: 'Jealousy proves attachment and fear. Love is shown in trust, freedom, and security. Confusing the two keeps people in controlling dynamics they call "passion".',
            },
            {
              claim: 'A relationship means you always have access to each other&apos;s bodies.',
              truth: 'A relationship means you have a standing invitation to *ask*. Consent is still required every time. Marriage, cohabitation, or three years together do not change that.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="If the relationship feels unsafe">
          Controlling behaviour, isolation from friends/family, threats, physical intimidation, gaslighting — these are
          not "relationship problems". They are abuse. In India: 181 / 1091 (women&apos;s helpline), 112 (police),
          <a href="https://www.ncw.gov.in/" target="_blank" rel="noopener">NCW</a>, <a href="https://www.cehat.org/" target="_blank" rel="noopener">CEHAT</a>.
        </Note>
        <Sources items={['Gottman Institute research', 'Attachment theory (Bowlby, Ainsworth)', 'NCADV relationship red flags', 'Indian Domestic Violence Act 2005']} />
      </div>
    </section>
  );
}