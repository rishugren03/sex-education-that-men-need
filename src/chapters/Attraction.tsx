import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const ArousalScene = lazy(() => import('../scenes/ArousalScene').then((m) => ({ default: m.ArousalScene })));

export function Attraction() {
  const webgl = useWebGL();

  return (
    <section id="attraction" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={4} label="Urges" accent="blue" />
        <Statement>
          Being attracted to someone is normal. <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>What you do with that feeling is your responsibility.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Nobody chooses who they find attractive. The feeling arrives uninvited. The choice is entirely in what happens next.
          </Lede>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-arousal"
              accent="blue"
              side="left"
              alt="An abstract visualisation of an urge as a wave — it rises, peaks, and falls on its own, with a neural network representation in the background."
              steps={[
                {
                  tag: 'The feeling',
                  title: 'Attraction ≠ arousal ≠ consent',
                  body: <>You see someone. Your brain registers <strong>attraction</strong>. Your body may respond with <strong>arousal</strong> — blood flow, heart rate, an erection. Neither of those is a decision, and neither of them is consent. Consent is a separate, conscious, verbal agreement between people.</>,
                },
                {
                  tag: 'The wave',
                  title: 'An urge is a wave, not a command',
                  body: <>Physiologically, an urge builds, peaks, and subsides — usually within minutes. You do not have to act on it. You do not have to fight it. You just have to <strong>outlast it</strong>. Fighting creates tension; feeding creates habit; noticing and letting it pass creates freedom.</>,
                },
                {
                  tag: 'Biology',
                  title: 'What is actually happening',
                  body: <>Visual or mental stimulus → amygdala and hypothalamus activate → dopamine and norepinephrine spike → sympathetic nervous system engages → arteries dilate, smooth muscle relaxes → erection (or lubrication). This is a reflex arc older than language. It is not a moral event.</>,
                },
                {
                  tag: 'Control',
                  title: 'The gap between feeling and action',
                  body: <>The prefrontal cortex — the part of the brain that plans, inhibits, and decides — is what separates an urge from a behaviour. That gap is where all sexual ethics live. Strengthening the gap is not repression; it is maturity.</>,
                },
              ]}
              scene={(s) => <ArousalScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="arousal" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={4} label="Practical" accent="blue" />
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              When the urge is loud
            </h3>
            <Body>
              <strong>Change your environment.</strong> Move rooms. Step outside. Splash cold water on your face. The physical shift interrupts the loop.
            </Body>
            <Body delay={0.05}>
              <strong>Don&apos;t keep the phone beside the bed.</strong> If late-night scrolling triggers the urge, charge the phone across the room. Use an actual alarm clock.
            </Body>
            <Body delay={0.05}>
              <strong>Name it.</strong> &ldquo;I am feeling a strong sexual urge right now.&rdquo; Labelling reduces the amygdala&rsquo;s grip and brings the prefrontal cortex online.
            </Body>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              What does not work
            </h3>
            <Body>
              <strong>White-knuckling.</strong> &ldquo;I will not think about it&rdquo; makes you think about it more (ironic process theory).
            </Body>
            <Body delay={0.05}>
              <strong>Shaming yourself.</strong> &ldquo;I am weak/bad/dirty&rdquo; adds stress, and stress often increases the urge as a coping mechanism.
            </Body>
            <Body delay={0.05}>
              <strong>Arbitrary rules.</strong> &ldquo;Only on Tuesdays&rdquo; or &ldquo;three times a week max&rdquo; turn a physiological signal into a moral scoreboard.
            </Body>
          </div>
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Three myths about urges
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'A strong urge means you have to act on it.',
              truth: 'Urges are physiological events. They do not come with a mandatory action clause. People resist urges to eat junk food, to yell, to check their phone — sexual urges are not uniquely powerful.',
            },
            {
              claim: 'If you don&apos;t release it, it will hurt you (blue balls).',
              truth: '&ldquo;Blue balls&rdquo; (epididymal hypertension) is a temporary ache from prolonged arousal without ejaculation. It is uncomfortable, not dangerous, and it resolves on its own. It is not a medical emergency and it is not a partner&rsquo;s obligation to fix.',
            },
            {
              claim: 'Thinking about someone sexually means you disrespect them.',
              truth: 'Thoughts are involuntary. Respect is shown in behaviour — whether you stare, comment, touch, or pressure. A fleeting thought is not a moral failing; acting on it without consent is.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="If urges feel unmanageable">
          If sexual urges feel compulsive — you cannot stop, they interfere with sleep/work/relationships, you use them to
          numb every difficult emotion, or you are escalating to riskier content or situations — that is worth talking to a
          mental-health professional. Not because sex is bad, but because <strong>loss of agency</strong> over any behaviour
          deserves support. Therapists who work with compulsive sexual behaviour exist in India (look for &ldquo;CBT for
          compulsive sexual behaviour&rdquo; or &ldquo;sex addiction therapy&rdquo;).
        </Note>
        <Sources items={['NIH sexual arousal physiology', 'APA compulsive sexual behaviour', 'Mayo Clinic sexual health']} />
      </div>
    </section>
  );
}