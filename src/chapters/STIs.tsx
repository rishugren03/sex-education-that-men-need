import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, DoDont, Sources } from '../components/ui/blocks';
import { Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const TransmissionScene = lazy(() => import('../scenes/TransmissionScene').then((m) => ({ default: m.TransmissionScene })));

export function STIs() {
  const webgl = useWebGL();

  return (
    <section id="stis" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={11} label="STIs" accent="green" />
        <Statement>
          STIs: <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>often invisible, often curable, never a character flaw.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Sexually transmitted infections are exactly what they sound like — infections passed through sexual contact.
            They are common, they are medical conditions, and they do not define your worth.
          </Lede>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-transmission"
              accent="green"
              side="left"
              alt="An animated visualisation showing two abstract human silhouettes with particles representing pathogens moving between them, and a condom barrier blocking the transmission."
              steps={[
                {
                  tag: 'The mechanism',
                  title: 'Invisible does not mean absent',
                  body: <>Most STIs have <strong>no symptoms at all</strong>, or symptoms that look like something else (mild irritation, a rash, a flu-like feeling). You cannot tell by looking. You cannot tell by how someone "seems". The only way to know is testing.</>,
                },
                {
                  tag: 'Transmission',
                  title: 'How they move',
                  body: <>Skin-to-skin contact (HPV, herpes, syphilis), fluid exchange (HIV, gonorrhoea, chlamydia, hepatitis B), or both. Oral, vaginal, anal sex — all can transmit. Some (HPV, herpes) can transmit even with a condom, because they infect skin not covered by the condom. Condoms <strong>substantially reduce</strong> but do not eliminate all risk.</>,
                },
              ]}
              scene={(s) => <TransmissionScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="transmission" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={11} label="The main ones" accent="green" />
        <div className="grid-3">
          <div>
            <h4 className="serif" style={{ fontSize: 'var(--t-h3)', marginBottom: '0.5rem', color: 'var(--cyan)' }}>Bacterial (curable)</h4>
            <p style={{ fontSize: 'var(--t-small)', lineHeight: 1.6, color: 'var(--bone-2)' }}>
              <strong>Chlamydia</strong> — often silent; can cause PID, infertility.<br />
              <strong>Gonorrhoea</strong> — similar; growing antibiotic resistance.<br />
              <strong>Syphilis</strong> — stages: chancre → rash → latent → tertiary (organ damage).<br />
              <strong>All cured with antibiotics</strong> — but damage already done is not always reversible.
            </p>
          </div>
          <div>
            <h4 className="serif" style={{ fontSize: 'var(--t-h3)', marginBottom: '0.5rem', color: 'var(--blue)' }}>Viral (manageable)</h4>
            <p style={{ fontSize: 'var(--t-small)', lineHeight: 1.6, color: 'var(--bone-2)' }}>
              <strong>HIV</strong> — attacks immune system; treatable (ART = undetectable = untransmittable).<br />
              <strong>Herpes (HSV-1/2)</strong> — lifelong; outbreaks manageable; asymptomatic shedding happens.<br />
              <strong>HPV</strong> — most clear spontaneously; high-risk types cause cancer; vaccine prevents.<br />
              <strong>Hepatitis B</strong> — vaccine prevents; chronic infection manageable.
            </p>
          </div>
          <div>
            <h4 className="serif" style={{ fontSize: 'var(--t-h3)', marginBottom: '0.5rem', color: 'var(--amber)' }}>Parasitic / other</h4>
            <p style={{ fontSize: 'var(--t-small)', lineHeight: 1.6, color: 'var(--bone-2)' }}>
              <strong>Trichomoniasis</strong> — curable antibiotic.<br />
              <strong>Pubic lice / scabies</strong> — topical treatment.<br />
              <strong>Mycoplasma genitalium</strong> — emerging, often resistant; needs specific testing.
            </p>
          </div>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={11} label="Testing & treatment" accent="green" />
        <DoDont
          dont={[
            'Assume "I feel fine" means "I am clean". Most STIs are asymptomatic for months or years.',
            'Test too early and assume negative. Window periods: HIV (2–4 weeks for NAT, 3–12 weeks for antibody), chlamydia/gonorrhoea (1–2 weeks), syphilis (3–6 weeks), hepatitis B (4–10 weeks). Ask a doctor when to test.',
            'Self-medicate with antibiotics from a friend. Wrong drug, wrong dose, resistance risk.',
            'Ghost a partner after a positive result. They need to know so they can test and treat.',
          ]}
          do={[
            'Get tested regularly if sexually active — every 3–6 months with new/multiple partners, annually in a monogamous relationship.',
            'Use condoms consistently. They reduce (not eliminate) most STI transmission.',
            'Get vaccinated: HPV (ideally before sexual debut, but useful up to age 45), Hepatitis B (3 doses).',
            'If a condom breaks / slips / you had unprotected sex: consider PEP for HIV (start within 72 hours, ideally ASAP). Go to an ART centre or ER.',
            'If you test positive: take the full course, inform partners (clinics can do anonymous partner notification), retest after treatment if advised.',
          ]}
          accent="green"
        />
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Four myths about STIs
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'Only "promiscuous" people get STIs.',
              truth: 'One partner who has an STI is enough. Many people get an STI from their first or only partner. The number of partners is a risk factor, not a moral filter.',
            },
            {
              claim: 'You can tell by looking.',
              truth: 'You cannot. Asymptomatic carriage is the norm for chlamydia, gonorrhoea, HPV, HIV (early), herpes. The only "look" that matters is a lab result.',
            },
            {
              claim: 'Having an STI means you are dirty.',
              truth: 'An infection is not a moral condition. It is a pathogen doing what pathogens do — replicate and transmit. Stigma delays testing, delays treatment, and increases transmission. That is the actual public health harm.',
            },
            {
              claim: 'Oral sex is safe sex.',
              truth: 'Oral sex transmits gonorrhoea, chlamydia, syphilis, herpes, HPV, HIV (lower risk but documented), hepatitis. Condoms / dental dams reduce risk.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="Where to test in India">
          Government ICTCs (Integrated Counselling & Testing Centres) — free, confidential HIV/STI testing. Find one via
          <a href="https://naco.gov.in/" target="_blank" rel="noopener">naco.gov.in</a>. Private labs (Dr Lal PathLabs, Thyrocare, etc.) offer panels. Sexual health clinics in metros:
          <a href="https://www.cehat.org/" target="_blank" rel="noopener">CEHAT</a> (Mumbai),
          <a href="https://www.shaktifoundation.org/" target="_blank" rel="noopener">Shakti</a> (Delhi),
          <a href="https://www.sangath.in/" target="_blank" rel="noopener">Sangath</a> (Goa).
        </Note>
        <Sources items={['WHO STI fact sheets', 'CDC STI treatment guidelines 2021', 'NACO India guidelines', 'IUSTI Asia-Pacific guidelines']} />
      </div>
    </section>
  );
}