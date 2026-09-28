import { ChapterMark, Compare, MythGrid, DoDont, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';

export function Porn() {
  return (
    <section id="porn" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={12} label="Porn" accent="violet" />
        <Statement>
          Porn is not sex education. <em style={{ fontStyle: 'italic', color: 'var(--violet)' }}>It is a fantasy with editing, lighting, scripts and viagra.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Most young men in India learn about sex from porn. That is not a moral judgement — it is a fact. The problem
            is that porn teaches a script that real bodies do not follow, and real partners do not enjoy.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={12} label="The split" accent="violet" />
        <Compare
          left={{ title: 'PORN', color: 'var(--violet)' }}
          right={{ title: 'REAL LIFE', color: 'var(--green)' }}
          rows={[
            { l: 'Performers are cast for specific bodies', r: 'Bodies vary enormously — size, shape, hair, colour, scars, asymmetry' },
            { l: 'Erections are maintained chemically / edited', r: 'Erections come and go; softening is normal; breaks are normal' },
            { l: 'Lubrication is instant and abundant', r: 'Arousal builds gradually; lube is standard, not optional' },
            { l: 'Penetration is the main event', r: 'Most women need clitoral stimulation; penetration alone often does not lead to orgasm' },
            { l: 'Positions change every 30 seconds', r: 'Comfortable positions last longer; switching constantly breaks rhythm' },
            { l: 'No talking, just moaning on cue', r: 'Communication is the skill: "slower", "there", "not that", "yes"' },
            { l: 'Male orgasm = the end', r: 'Sex ends when both people are done — or when either wants to stop' },
            { l: 'Aggression is default', r: 'Consent, check-ins, and mutual pleasure are the default' },
            { l: 'Every act is performative', r: 'Real sex has awkward moments, laughter, farts, lost condoms, cramps — and that is fine' },
          ]}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={12} label="What porn does to expectations" accent="violet" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Body image
            </h3>
            <Body>
              Porn selects for statistical outliers — large penises, hairless bodies, specific breast shapes. Comparing
              yourself to that sample creates needless anxiety. Your body is normal. Your partner&apos;s body is normal.
              The actors are the outliers.
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Performance anxiety
            </h3>
            <Body>
              If your mental script is "I must stay hard for 40 minutes, change positions 8 times, make her orgasm
              twice from penetration alone, and finish on her face", you will fail — because that script is fiction.
              Real sex is slower, messier, more communicative, and far more satisfying when you drop the script.
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={12} label="Compulsive use" accent="violet" />
        <DoDont
          dont={[
            'Use porn as your only source of sexual education.',
            'Need increasingly extreme content to get aroused (escalation).',
            'Watch when you are bored, anxious, lonely, or trying to sleep — that is coping, not desire.',
            'Let it replace real intimacy, real relationships, or real sleep.',
          ]}
          do={[
            'Notice your patterns: time of day, trigger, duration, content type, how you feel after.',
            'If it feels compulsive: install a blocker, keep phone out of bedroom, add a 10-minute friction (walk, water, journal) before opening.',
            'Diversify your sexual imagination: read erotica, use your own fantasy, focus on sensation without visual input.',
            'If you cannot cut back after 4–6 weeks of consistent effort, see a therapist (CBT for compulsive sexual behaviour works).',
          ]}
          accent="green"
        />
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Three myths about porn
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'Porn shows what women actually want.',
              truth: 'Porn shows what sells to a predominantly male audience. Studies consistently show a gap between what porn depicts and what women report enjoying. The only way to know what a specific woman wants is to ask her.',
            },
            {
              claim: 'Watching porn means you are addicted.',
              truth: 'Most people who watch porn are not addicted. Compulsive sexual behaviour disorder (ICD-11) has specific criteria: loss of control, escalation, negative consequences, persistence despite harm. Frequency alone is not the diagnosis.',
            },
            {
              claim: 'Ethical / feminist porn solves the problem.',
              truth: 'Better production ethics (fair pay, consent, safer sex on set) are important, but they do not change the core issue: it is still a curated, edited, performative product — not a documentary of real sex.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="If you want to talk to someone">
          Therapists who work with porn-related concerns exist in India. Look for "CBT for compulsive sexual behaviour"
          or "sex-positive therapy". <a href="https://tiss.edu/" target="_blank" rel="noopener">TISS iCall</a> (9152987821)
          and <a href="https://www.cehat.org/" target="_blank" rel="noopener">CEHAT</a> can refer.
        </Note>
        <Sources items={['APA pornography research', 'Journal of Sex Research', 'ICD-11 compulsive sexual behaviour disorder', 'Your Brain On Porn (Gary Wilson)']} />
      </div>
    </section>
  );
}