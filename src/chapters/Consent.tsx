import { ChapterMark, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { CONSENT_SCENARIOS } from '../content/scenarios';

export function Consent() {
  return (
    <section id="consent" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={8} label="Consent" accent="green" />
        <Statement>
          Consent isn&apos;t complicated. <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>It is the single most important thing in this whole lesson.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            If you remember only one chapter, make it this one. Everything else — bodies, contraception, STIs, pleasure —
            depends on this.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={8} label="The rules" accent="green" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              YES = agreement. Freely given. Enthusiastic is ideal; clear is the minimum.
            </h3>
            <Body>
              <strong>NO = stop.</strong> Immediately. Without negotiation, without guilt-tripping, without "just a little
              more".
            </Body>
            <Body delay={0.05}>
              <strong>SILENCE ≠ automatic yes.</strong> Freeze, fear, uncertainty, sleep, intoxication — all produce
              silence. Silence is not consent.
            </Body>
            <Body delay={0.05}>
              <strong>PRESSURE ≠ consent.</strong> Asking repeatedly, sulking, guilt-tripping, threatening to leave,
              "if you loved you would" — these convert a no into a coerced yes. That is not consent.
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              RELATIONSHIP ≠ permanent consent.
            </h3>
            <Body>
              Being in a relationship, married, or having had sex before does not create a standing permission. Every
              time is a new conversation — even if that conversation is just a look and a nod.
            </Body>
            <Body delay={0.05}>
              <strong>PREVIOUS YES ≠ current yes.</strong> Consent can be withdrawn at any moment, including mid-act,
              for any reason or no reason. A "yes" five minutes ago does not override a "no" right now.
            </Body>
            <Body delay={0.05}>
              <strong>INTOXICATION:</strong> Someone who is heavily drunk or high may not be capable of giving valid
              consent. If you have to wonder whether they can consent, they cannot. Do not have sex.
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={8} label="Practice" accent="green" />
        <Statement size="h2">
          Five situations. No trick questions.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {CONSENT_SCENARIOS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={8} label="The bottom line" accent="green" />
        <Statement size="h2">
          Your sexual urge is your responsibility.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            Nobody else is responsible for managing your arousal. Not your partner, not the person you are attracted to,
            not the person who said yes yesterday and no today. The urge is yours. The choice is yours. The
            consequence of ignoring a "no" is yours — legally, morally, and in the life of the person you harmed.
          </Body>
          <Body delay={0.05}>
            If this feels heavy, it should. Sexual violence is not an accident. It is a series of choices, each one
            ignoring a boundary. The only way to never be that person is to treat every "no", every silence, every
            hesitation, and every withdrawal as a hard stop — every single time.
          </Body>
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="If something happened to you or someone you know">
          Sexual violence is never the victim&apos;s fault — not what they wore, where they were, what they drank, or
          whether they froze. In India: 112 (police), 181 (women&apos;s helpline), 1091 (women&apos;s helpline). For
          support: <a href="https://www.cehat.org/" target="_blank" rel="noopener">CEHAT</a>, <a href="https://tiss.edu/" target="_blank" rel="noopener">TISS iCall</a> (9152987821), <a href="https://www.rahi.org/" target="_blank" rel="noopener">RAHI Foundation</a>.
        </Note>
        <Sources
          items={['BNS 2023 Sections 63–71 (rape, consent definition)', 'IPC 376 / BNS 63', 'CEHAT guidelines', 'WHO sexual violence prevention']}
        />
      </div>
    </section>
  );
}