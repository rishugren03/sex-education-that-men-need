import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Reveal, Statement } from '../components/ui/primitives';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const FemaleScene = lazy(() => import('../scenes/FemaleScene').then((m) => ({ default: m.FemaleScene })));

export function HerBody() {
  const webgl = useWebGL();

  return (
    <section id="her-body" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={2} label="Her body" />
        <Statement>
          Vulva is not vagina. <em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>Understanding this changes everything.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            The external parts have names. The internal parts have names. Most of us learned neither. Let&apos;s fix that
            now.
          </Lede>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-female"
              accent="cyan"
              side="left"
              alt="A rotating three-dimensional anatomical model of the female reproductive system, with the external vulva, clitoris, ovaries, fallopian tubes, uterus, cervix and vagina highlighted one at a time as you scroll."
              steps={[
                {
                  tag: 'External first',
                  title: 'What you can see — the vulva',
                  body: <>The <strong>vulva</strong> is everything on the outside: the mons, the outer and inner labia, the clitoral hood, the clitoris, the urethral opening and the vaginal opening. <strong>Vulva ≠ vagina.</strong> The vagina is the internal canal; the vulva is the external structure. This distinction matters for anatomy, for hygiene, for pleasure and for communication.</>,
                },
                {
                  tag: 'The clitoris',
                  title: 'The only organ whose only job is pleasure',
                  body: <>The <strong>clitoris</strong> is a wishbone-shaped structure with roughly 8,000 nerve endings — more than any other part of a woman&apos;s body. What you see externally is just the glans (about the size of a pea). The crura and bulbs extend internally alongside the vaginal walls. It is not a &ldquo;small penis&rdquo;; it is a distinct organ with a distinct purpose.</>,
                },
                {
                  tag: 'Ovaries',
                  title: 'Two ovaries, monthly guests',
                  body: <>The ovaries sit on either side of the uterus, each about the size of an almond. They hold the lifetime supply of eggs (immature oocytes) and produce oestrogen and progesterone. Roughly once per cycle, one ovary releases a mature egg — <strong>ovulation</strong>. The other ovary takes the next turn, but it is not strictly alternating.</>,
                },
                {
                  tag: 'Tubes',
                  title: 'Fallopian tubes — the highway',
                  body: <>The fimbriae (finger-like fringes) sweep the released egg into the tube. Fertilisation, if it happens, usually occurs in the ampulla (the wider outer third). The tube is not a passive pipe — cilia and muscular contractions move the egg toward the uterus over several days.</>,
                },
                {
                  tag: 'Uterus',
                  title: 'The uterus — a muscular pear',
                  body: <>The uterus is a thick-walled muscular organ, roughly the size of a small pear when not pregnant. Its lining (endometrium) builds up each cycle under oestrogen, then is shed if pregnancy does not occur. During pregnancy it expands enormously. The uterus is <strong>not</strong> the vagina — they are connected but completely different structures.</>,
                },
                {
                  tag: 'Cervix',
                  title: 'The cervix — the gatekeeper',
                  body: <>The cervix is the lower neck of the uterus, projecting into the vagina. It produces cervical mucus that changes through the cycle — sometimes blocking sperm, sometimes helping them swim through. It dilates during labour. It is also where HPV-related changes are screened (Pap smear / HPV test).</>,
                },
                {
                  tag: 'Vagina',
                  title: 'The vagina — a collapsed potential space',
                  body: <>The vagina is a muscular canal, typically 7–10 cm long when unaroused, that expands and lubricates during arousal. It is self-cleaning (lactobacilli maintain an acidic pH). It does not need douches, washes or &ldquo;tightening&rdquo; products — those disrupt the microbiome and cause problems.</>,
                },
              ]}
              scene={(s) => <FemaleScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="female" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={2} label="Key distinctions" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Vulva and vagina are not synonyms
            </h3>
            <Body>
              Using &ldquo;vagina&rdquo; for everything external erases the clitoris, the labia, the urethra and the vaginal opening
              as distinct structures. That erasure shows up in hygiene advice, in pleasure conversations, in medical
              communication and in how women describe their own bodies.
            </Body>
            <Body delay={0.05}>
              <strong>Vulva</strong> = everything you can see on the outside. <strong>Vagina</strong> = the internal canal
              connecting the cervix to the outside. Two words, two structures, two functions.
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Female sexual response is not &ldquo;male response mirrored&rdquo;
            </h3>
            <Body>
              Arousal in women is not a simple on/off switch, and it does not always follow desire. The dual-control model
              (excitation and inhibition systems) means context, stress, safety, relationship quality and hormonal phase all
              shape whether arousal happens. Lubrication is not a reliable proxy for desire. Orgasm is not the only metric of
              a satisfying experience.
            </Body>
            <Body delay={0.05}>
              The clitoris is the primary pleasure organ for most women. Vaginal penetration alone does not reliably produce
              orgasm for the majority. This is normal anatomy, not dysfunction.
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Three things you were told, and what is actually true
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'The vagina is the whole thing down there.',
              truth: 'Vulva = external. Vagina = internal canal. They are different structures with different names. Using the right word is not pedantry — it is how you communicate clearly with a partner and a doctor.',
            },
            {
              claim: 'The clitoris is just a little button.',
              truth: 'The visible glans is the tip of a wishbone-shaped structure that extends internally along the vaginal walls. It contains roughly 8,000 nerve endings. It is not a minor detail.',
            },
            {
              claim: 'Women always bleed the first time.',
              truth: 'Some do, many do not. Bleeding can come from the hymen stretching, from insufficient lubrication, or from minor tears — none of it is a &ldquo;test&rdquo; of anything. The hymen is a thin membrane with an opening; it does not seal the vagina shut.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              When to see a doctor
            </h3>
            <Body>
              Persistent pelvic pain, bleeding between periods, very heavy periods (soaking through in under two hours),
              unusual discharge with odour or colour change, pain during sex that does not go away with lubrication, or a
              lump you can feel — these deserve a clinical check. Not because they are definitely serious, but because a
              doctor can actually tell you.
            </Body>
          </div>
          <div>
            <Sources
              items={['WHO reproductive health', 'NHS female reproductive anatomy', 'Mayo Clinic', 'ACOG patient education']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}