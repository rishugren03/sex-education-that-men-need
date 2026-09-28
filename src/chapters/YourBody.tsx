import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const MaleScene = lazy(() => import('../scenes/MaleScene').then((m) => ({ default: m.MaleScene })));

export function YourBody() {
  const webgl = useWebGL();

  return (
    <section id="your-body" data-chapter className="sect" style={{ paddingTop: 'clamp(4rem,12vw,8rem)' }}>
      <div className="shell">
        <ChapterMark n={1} label="Your body" />
        <Statement>
          You have a body that was built for something nobody ever explained to you.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            This is the part you should have been taught at fourteen and were not. No shame in it, no jokes — just how it
            actually works.
          </Lede>
        </div>
      </div>

      {/* ── Pinned 3D anatomy ── */}
      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-male"
              accent="cyan"
              side="left"
              alt="A rotating three-dimensional anatomical model of the male reproductive system, with the testes, epididymis, vas deferens, bladder, seminal vesicles, prostate, urethra and penis highlighted one at a time as you scroll."
              steps={[
                {
                  tag: 'Overview',
                  title: 'One system, one shared tube',
                  body: 'Sperm production, semen production and urine removal are three jobs sharing a small amount of space in the pelvis. Understanding how they fit together makes the rest of this chapter obvious.',
                },
                {
                  tag: 'Testes',
                  title: 'Two factories, outside the body',
                  body: <>The testes sit in the scrotum rather than inside the body because sperm production needs a temperature slightly below core body temperature. From puberty onward they work continuously — <strong>hundreds of millions of sperm every day</strong> — and they also produce testosterone.</>,
                },
                {
                  tag: 'Route',
                  title: 'Epididymis and vas deferens',
                  body: <>Sperm leave the testis and spend roughly two weeks maturing and being stored in the <strong>epididymis</strong>, a coiled tube on the back of each testis. The <strong>vas deferens</strong> are the two tubes that carry them up into the pelvis. They are longer than you think, because the route runs up, around the bladder, and back down.</>,
                },
                {
                  tag: 'Fluid',
                  title: 'Where semen actually comes from',
                  body: <>Most of the fluid is made by the <strong>seminal vesicles</strong> — a pair of small organs behind the bladder — and a smaller amount by the <strong>prostate</strong>. This matters for the biggest myth on the internet: semen is mostly water, with fructose, protein and minerals. Losing it does not cost you strength, focus or masculinity.</>,
                },
                {
                  tag: 'Urethra',
                  title: 'One tube, two very different jobs',
                  body: <>The urethra carries urine out of the bladder and semen out of the pelvis. They cannot happen at the same time: a ring of muscle at the bladder neck closes during ejaculation so urine cannot mix in. This is the actual reason you cannot do both simultaneously.</>,
                },
                {
                  tag: 'Erection',
                  title: 'An erection is blood flow, not willpower',
                  body: <>An erection is arteries widening and smooth muscle relaxing so that blood fills the tissue — repeated thousands of times over a night. That is why <strong>morning erections and random daytime erections</strong> are a good sign that blood flow, nerves and hormones are working normally. They are not a message about how turned on you are.</>,
                },
                {
                  tag: 'Variation',
                  title: 'All of it is different on every man',
                  body: <>Size, shape, how easily you get hard, how long it lasts, how much you produce, how often you think about sex. The ranges are enormous and none of it defines you. A large share of the anxiety men carry about their bodies comes from a single false idea — that there is one correct body, and it is not yours.</>,
                },
              ]}
              scene={(s) => <MaleScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="male" />
          </div>
        )}
      </div>

      {/* ── Puberty / testosterone ── */}
      <div className="shell sect">
        <ChapterMark n={1} label="Still on you" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Puberty is not a deadline
            </h3>
            <Body>
              Puberty in boys typically starts somewhere between about nine and fourteen, and that spread is normal. Voice
              change, body hair, muscle, growth spurts and a sudden interest in your own body are all part of it, and all
              of it runs on its own schedule. Some people finish by sixteen. Some are still changing at twenty-two.
            </Body>
            <Body delay={0.06}>
              It is a common Indian family joke that a boy becomes a man on a particular day. Nothing in biology cooperates
              with that. Sexual development is continuous, and it varies enormously between people who grew up in the same
              household.
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Testosterone is not a fuel tank
            </h3>
            <Body>
              Testosterone rises steeply during puberty and drives the changes above. In adulthood it sits in a range, and
              it declines slowly and gradually with age. That decline is normal biology, not a breakdown.
            </Body>
            <Body delay={0.06}>
              The idea that you can &ldquo;run out&rdquo; of testosterone through sexual activity is a myth with no basis
              in physiology. What genuinely lowers testosterone is poor sleep, chronic stress, very low body fat, and
              certain medications — all worth discussing with a doctor if you are worried, rather than a WhatsApp forward.
            </Body>
          </div>
        </div>
      </div>

      {/* ── Myths ── */}
      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Six things you were told, and what is actually true
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'Masturbating makes you weak.',
              truth: 'There is no good evidence that ejaculation causes weakness, lower testosterone, infertility or loss of masculinity. What actually makes you feel flat is bad sleep, poor food, no exercise, and sitting for twelve hours.',
            },
            {
              claim: 'Semen is your body’s stored energy.',
              truth: 'Semen is around two-thirds water. The body replaces what is lost easily, and the amount involved is nutritionally trivial. Losing semen is not losing strength.',
            },
            {
              claim: 'Random erections mean something is wrong.',
              truth: 'Spontaneous erections are common and normal, especially during deep sleep. They are a sign that blood flow, nerves and hormones are working. They do not mean you are secretly turned on by somebody.',
            },
            {
              claim: 'Wet dreams are abnormal.',
              truth: 'Nocturnal emissions — ejaculating during sleep, sometimes with an erotic dream, sometimes without — are a documented normal occurrence, most common in younger people and during longer periods without sex.',
            },
            {
              claim: 'Size decides who is a real man.',
              truth: 'There is no established link between penile size, sexual function, partner satisfaction or masculinity. A lot of the size talk online is also measuring the wrong thing in a dishonest way.',
            },
            {
              claim: 'If I am not thinking about sex constantly, something is wrong.',
              truth: 'Desire varies enormously between people and shifts with sleep, stress, health, medication and season. Wanting sex a lot, a little, or nowhere near as much as a friend does, are all normal.',
            },
          ]}
        />
      </div>

      {/* ── Ejaculation & orgasm ── */}
      <div className="shell sect sect--tight">
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              Orgasm and ejaculation are not the same event
            </h3>
            <Body>
              They usually happen together, and most people assume they always do. They do not. You can ejaculate without
              much pleasure, and you can have an orgasm without ejaculating. Wet dreams are the most common example of the
              first.
            </Body>
            <Body delay={0.05}>
              Ejaculation is a reflex: rhythmic contractions push semen out through the urethra. The pleasure is a separate
              system layered on top. Separating them is genuinely useful, because performance anxiety almost always comes
              from treating them as one thing you can fail at.
            </Body>
          </div>
          <div>
            <Note kind="care" label="When to actually see a doctor">
              Testicular pain that does not settle, a lump, swelling that stays, blood in semen, pain during ejaculation,
              a change in size that worries you, or difficulty with erections lasting more than a few weeks — those deserve
              a doctor&apos;s appointment. Not because something is necessarily wrong, but because a doctor can actually
              check, and guessing from the internet cannot.
            </Note>
            <div style={{ height: '1.4rem' }} />
            <Sources
              items={['WHO reproductive health fact sheets', 'NHS sexual health', 'Mayo Clinic', 'CDC male reproductive health']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
