import { ChapterMark, MythGrid, DoDont, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';

export function Masturbation() {
  return (
    <section id="masturbation" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={5} label="Masturbation" accent="blue" />
        <Statement>
          Masturbation: what&apos;s normal?
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Almost everyone does it. Almost nobody talks about it honestly. Let&apos;s separate the myths from the medicine.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={5} label="What it is" accent="blue" />
        <Statement size="h2">
          Masturbation is touching your own body for sexual pleasure.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            It is a normal sexual behaviour across cultures, ages and genders. It is not a disorder, a sin, a weakness or a
            medical condition. Major medical bodies (WHO, APA, AMA) classify it as a normal part of human sexuality.
          </Body>
          <Body delay={0.05}>
            People do it for pleasure, stress relief, sleep, to learn their own responses, or simply because the urge
            arises. All of those are valid reasons.
          </Body>
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Six myths that refuse to die
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'Masturbation makes you weak / lowers testosterone.',
              truth: 'No credible study shows that ejaculation reduces serum testosterone in any meaningful way. A 2003 study found a transient spike on day 7 of abstinence, returning to baseline by day 8. Chronic abstinence does not build "superpowers".',
            },
            {
              claim: 'Semen is your vital energy / life force.',
              truth: 'Semen is ~65–70% water, with fructose, proteins, enzymes and trace minerals. The volume per ejaculation is 1.5–5 ml. The nutritional loss is trivial and instantly replaced by a normal diet.',
            },
            {
              claim: 'Masturbation causes infertility / erectile dysfunction.',
              truth: 'There is no epidemiological link. What causes ED is vascular disease, diabetes, smoking, alcohol, certain medications, anxiety and porn-induced conditioning — not masturbation itself.',
            },
            {
              claim: 'It causes blindness / hairy palms / insanity.',
              truth: 'These are 18th- and 19th-century moral panic inventions with zero biological basis. They were used to control behaviour, not to describe reality.',
            },
            {
              claim: 'If you masturbate, you won&apos;t enjoy sex with a partner.',
              truth: 'Knowing your own response usually *improves* partnered sex because you can communicate what you like. The problem arises only if a specific grip/speed/porn context conditions a response that a partner cannot replicate — and that is reversible.',
            },
            {
              claim: 'There is a "normal" number of times per week.',
              truth: 'No such number exists. Frequency varies enormously between people and across the lifespan. The only meaningful metric is <strong>interference</strong> — see below.',
            },
          ]}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={5} label="When it is a problem" accent="blue" />
        <Statement size="h2">
          The number is not the problem. What it has replaced in your life is the question.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            Masturbation becomes worth addressing when it <strong>functionally interferes</strong>:
          </Body>
          <ul style={{ margin: '1rem 0 0 1.2rem', display: 'grid', gap: '0.5rem' }}>
            <li>it disrupts sleep (late-night sessions you cannot stop)</li>
            <li>it replaces study, work, exercise or social time</li>
            <li>it is the primary way you cope with every negative emotion</li>
            <li>it is tied to compulsive porn use that is escalating</li>
            <li>it causes significant distress or shame</li>
            <li>you have tried to cut down and cannot</li>
          </ul>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={5} label="If you want to reduce it" accent="blue" />
        <DoDont
          dont={[
            'Set an arbitrary weekly quota and feel guilty when you miss it.',
            'Use willpower alone ("I will just stop").',
            'Shame yourself — shame increases stress, stress increases the urge.',
            'Swap one compulsion for another (e.g., gaming, doom-scrolling).',
          ]}
          do={[
            'Track triggers for two weeks: time of day, mood, preceding activity, content consumed.',
            'Remove the easiest access: phone out of bedroom, block triggering sites, log out of accounts.',
            'Build a non-sexual wind-down routine: reading, stretching, breathing, journaling — something that shifts state.',
            'Exercise daily — even 20 minutes of moderate cardio reduces baseline arousal and improves impulse control.',
            'Improve sleep: 7–8 hours, consistent wake time, no screens 30 min before bed.',
            'When an urge hits: change rooms, splash cold water, do 20 push-ups, call a friend, write three things you are grateful for. The urge will peak and fall in ~3–7 minutes.',
            'Treat a slip as data, not failure. "I slipped at 11 pm after doom-scrolling" → adjust the 10:30 pm routine.',
            'If it still feels unmanageable after 4–6 weeks of consistent effort, see a therapist (CBT for compulsive sexual behaviour works well).',
          ]}
          accent="green"
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="Hygiene & practical notes">
          Wash hands before and after. Use a lubricant if there is friction — water-based is fine. Clean any toy you use
          (soap and warm water, or toy cleaner). Do not use household objects, food items, or anything without a flared
          base anally. Privacy is normal; secrecy with shame is not.
        </Note>
        <Sources
          items={['WHO sexual health', 'NHS masturbation', 'Mayo Clinic', 'APA compulsive sexual behaviour']}
        />
      </div>
    </section>
  );
}