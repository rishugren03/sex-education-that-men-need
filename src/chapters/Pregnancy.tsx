import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const JourneyScene = lazy(() => import('../scenes/JourneyScene').then((m) => ({ default: m.JourneyScene })));

export function Pregnancy() {
  const webgl = useWebGL();

  return (
    <section id="pregnancy" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={9} label="Pregnancy" accent="rose" />
        <Statement>
          Pregnancy: <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>sperm, egg, fertilisation, implantation — and how one time is enough.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            The biology is straightforward. The consequences are life-changing. Understanding the mechanics is how you make
            informed choices.
          </Lede>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-journey"
              accent="rose"
              side="left"
              alt="An animated three-dimensional visualisation of the fertilisation journey — sperm travelling through the fallopian tube, meeting the egg, fertilisation, the embryo dividing, and implanting in the uterine wall."
              steps={[
                {
                  tag: 'The cast',
                  title: 'Two cells, one outcome',
                  body: <>A single ejaculation contains <strong>100–300 million sperm</strong>. One ovulation releases <strong>one egg</strong> (occasionally two). The egg lives 12–24 hours. Sperm can survive in the reproductive tract <strong>up to 5 days</strong>. That overlap is the fertile window — roughly 6 days per cycle.</>,
                },
                {
                  tag: 'The journey',
                  title: 'Sperm: the long swim',
                  body: <>Sperm enter the vagina, swim through the cervix, across the uterus, and into the fallopian tube. Of the millions that start, only a few hundred reach the tube. Only <strong>one</strong> (or zero) fertilises the egg. The rest are cleared by the immune system or flow out.</>,
                },
                {
                  tag: 'Fertilisation',
                  title: 'The moment of fusion',
                  body: <>A sperm penetrates the egg&apos;s outer layer (zona pellucida). The egg&apos;s membrane hardens instantly, blocking other sperm. The two nuclei merge — 23 chromosomes from each parent combine into a single cell: the <strong>zygote</strong>. This is fertilisation.</>,
                },
                {
                  tag: 'Division',
                  title: 'One becomes many',
                  body: <>The zygote divides as it moves down the tube: 2 cells → 4 → 8 → 16 (morula) → blastocyst (about 100 cells) by day 5–6. It is still tiny — smaller than a pinhead.</>,
                },
                {
                  tag: 'Implantation',
                  title: 'Landing in the lining',
                  body: <>The blastocyst reaches the uterus and burrows into the thickened endometrium. This is <strong>implantation</strong> — the biological beginning of pregnancy. It happens around day 6–10 after fertilisation. Before this, the body has no way to know fertilisation occurred.</>,
                },
              ]}
              scene={(s) => <JourneyScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="journey" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={9} label="The questions" accent="rose" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Can pregnancy happen after one time?
            </h3>
            <Body>
              <strong>Yes.</strong> One act of unprotected penis-in-vagina sex during the fertile window can result in
              pregnancy. There is no "safe" number of times, no "first time" immunity, and no position that prevents it.
            </Body>
            <Body delay={0.05}>
              Withdrawal (pulling out) fails about 22% of the time with typical use — pre-ejaculate can contain sperm,
              and timing is unreliable. It is not a reliable method on its own.
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              When is the fertile window?
            </h3>
            <Body>
              Roughly <strong>5 days before ovulation through the day of ovulation</strong>. Since ovulation timing
              varies cycle to cycle (and even the same person does not ovulate on the same day every month), calendar-
              based "safe days" are unreliable. If you do not want pregnancy, use contraception every time.
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Four myths about pregnancy
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'You can&apos;t get pregnant the first time.',
              truth: 'Fertility has nothing to do with sexual history. If an egg and sperm meet during the fertile window, pregnancy can happen — virginity is not a contraceptive.',
            },
            {
              claim: 'Pregnancy happens instantly after sex.',
              truth: 'Fertilisation can take up to 24 hours after sex. Implantation takes 6–10 days after that. A pregnancy test only becomes positive after implantation (around the time of a missed period). There is no "instant" pregnancy.',
            },
            {
              claim: 'If she has her period, she can&apos;t be pregnant.',
              truth: 'Some bleeding in early pregnancy is common (implantation bleeding, cervical changes). A period-like bleed does not rule out pregnancy. A test is the only way to know.',
            },
            {
              claim: 'The woman is solely responsible for preventing pregnancy.',
              truth: 'Pregnancy requires sperm. The person producing sperm shares equal responsibility for contraception. Condoms are a male-controlled method that also prevents STIs — using them is the bare minimum of shared responsibility.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="If you think pregnancy might have happened">
          Emergency contraception (levonorgestrel or ulipristal) works best within 3 days and can work up to 5 days after unprotected sex. The copper IUD is the most effective emergency contraception and works up to 5 days. Go to a pharmacy or doctor <strong>as soon as possible</strong> — earlier is simply better. Do not wait for a missed period.
        </Note>
        <Sources items={['WHO emergency contraception', 'NHS pregnancy', 'CDC reproductive health', 'FOGSI guidelines India']} />
      </div>
    </section>
  );
}