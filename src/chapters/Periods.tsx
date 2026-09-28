import { lazy, Suspense } from 'react';
import { PinnedStage } from '../components/ui/PinnedStage';
import { ChapterMark, MythGrid, DoDont, Sources } from '../components/ui/blocks';
import { Body, Lede, Reveal, Statement } from '../components/ui/primitives';
import { useWebGL } from '../lib/hooks';
import { AnatomyFallback } from './AnatomyFallback';

const CycleScene = lazy(() => import('../scenes/CycleScene').then((m) => ({ default: m.CycleScene })));

export function Periods() {
  const webgl = useWebGL();

  return (
    <section id="periods" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={3} label="Periods" accent="rose" />
        <Statement accentWord="normal">
          Periods are normal. <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>Bleeding is not dirty.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Roughly half the human population menstruates for decades of their life. Most men were taught almost nothing
            about it. This chapter covers what happens, why it matters, and how to behave.
          </Lede>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2rem, 6vw, 4rem)' }}>
        {webgl ? (
          <Suspense fallback={<div style={{ minHeight: '60svh' }} />}>
            <PinnedStage
              id="stage-cycle"
              accent="rose"
              side="left"
              alt="An animated three-dimensional model of the uterus and ovaries showing the menstrual cycle phases — menstruation, follicular phase, ovulation, and luteal phase — with the endometrial lining building up and shedding, and a follicle growing and releasing an egg."
              steps={[
                {
                  tag: 'Overview',
                  title: 'A cycle, not a calendar date',
                  body: <>The menstrual cycle is a repeating hormonal conversation between the brain, the ovaries and the uterus. A <strong>typical</strong> cycle is 21–35 days; &ldquo;28 days&rdquo; is just an average. Ovulation usually happens about 14 days before the next period — not on day 14 of a fixed calendar.</>,
                },
                {
                  tag: 'Menstruation',
                  title: 'Days 1–5: The period',
                  body: <>Oestrogen and progesterone drop. The thickened uterine lining (endometrium) breaks down and exits through the vagina as blood, mucus and tissue. Bleeding typically lasts 3–7 days. Cramps happen because the uterus contracts to shed the lining. Not everyone gets cramps; some get severe pain.</>,
                },
                {
                  tag: 'Follicular',
                  title: 'Days 6–13: The follicular phase',
                  body: <>The pituitary releases FSH, stimulating a cohort of follicles in one ovary. One becomes dominant and produces rising oestrogen. The endometrium rebuilds. Cervical mucus becomes clearer and stretchier — a sign the fertile window is approaching.</>,
                },
                {
                  tag: 'Ovulation',
                  title: 'Around day 14: Ovulation',
                  body: <>A surge of luteinising hormone (LH) triggers the dominant follicle to rupture and release an egg. The egg lives 12–24 hours. This is the peak of the fertile window. Some people feel a brief twinge (mittelschmerz); most feel nothing.</>,
                },
                {
                  tag: 'Luteal',
                  title: 'Days 15–28: The luteal phase',
                  body: <>The empty follicle becomes the corpus luteum, pumping progesterone to maintain the lining. If no pregnancy, the corpus luteum degenerates, progesterone falls, and the cycle restarts. PMS symptoms (mood shifts, bloating, breast tenderness, fatigue) are real and vary wildly — some feel nothing, some feel flattened.</>,
                },
              ]}
              scene={(s) => <CycleScene {...s} />}
            />
          </Suspense>
        ) : (
          <div className="shell">
            <AnatomyFallback kind="cycle" />
          </div>
        )}
      </div>

      <div className="shell sect">
        <ChapterMark n={3} label="How to behave" accent="rose" />
        <Statement size="h2">
          Every person experiences periods differently. <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>Don&apos;t assume. Ask.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <DoDont
            dont={[
              'Assume she is &ldquo;irrational&rdquo; or &ldquo;emotional&rdquo; because of her period.',
              'Dismiss pain or fatigue as &ldquo;just PMS&rdquo; without asking.',
              'Make period jokes that shame a normal bodily function.',
              'Assume she cannot have sex, exercise, or think clearly.',
              'Treat a period as a contraceptive method — pregnancy <strong>can</strong> happen around menstruation depending on cycle length and ovulation timing.',
            ]}
            do={[
              'Ask: &ldquo;How are you feeling? Do you need anything?&rdquo;',
              'Believe her if she says she is in pain — severe cramps can be as painful as a heart attack (per clinical studies).',
              'Offer practical help: heat pad, water, pain relief she prefers, space if she wants it, company if she wants that.',
              'Keep period products accessible if you share a space — it is a trivial cost that signals basic respect.',
              'If her periods are severely painful, very heavy, irregular, or absent — encourage a doctor visit. That is not &ldquo;being difficult&rdquo;; it is health care.',
            ]}
            accent="green"
          />
        </div>
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Four myths about periods
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'Period blood is dirty or impure.',
              truth: 'Menstrual blood is the same blood that runs through your veins, plus endometrial tissue and mucus. It is not toxic, cursed, or spiritually unclean. Cultural taboos that treat it as such have no basis in biology.',
            },
            {
              claim: 'You cannot get pregnant during your period.',
              truth: 'Sperm survive up to ~5 days. If you have a short cycle (e.g., 22 days) and ovulate early, sex at the end of a period can lead to pregnancy. Period ≠ contraception.',
            },
            {
              claim: 'PMS is just an excuse for bad moods.',
              truth: 'Premenstrual syndrome involves real hormonal shifts affecting serotonin and GABA. Some people experience PMDD (premenstrual dysphoric disorder), a recognised clinical condition. Dismissing it is not scepticism — it is ignorance.',
            },
            {
              claim: 'All women sync up when they live together.',
              truth: 'The McClintock effect (cycle synchrony) has not replicated in rigorous studies. Overlap happens by chance because cycles vary in length. It is a persistent myth, not a documented phenomenon.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <div className="grid-2">
          <div>
            <h3 className="serif" style={{ fontSize: 'var(--t-h2)', marginBottom: '1rem' }}>
              When it is a medical conversation, not a mood conversation
            </h3>
            <Body>
              <strong>Red flags worth a doctor visit:</strong> periods so heavy you soak through a pad/tampon in under two hours;
              bleeding between periods; periods that stop for 3+ months (and you are not pregnant); cycles shorter than 21
              days or longer than 35 consistently; pain that stops you from normal life; passing clots larger than a
              10-rupee coin.
            </Body>
            <Body delay={0.05}>
              These are not &ldquo;women&rsquo;s problems&rdquo; to suffer through. They are clinical signs. Endometriosis,
              adenomyosis, fibroids, PCOS, thyroid disorders — all are treatable, but only if diagnosed.
            </Body>
          </div>
          <div>
            <Sources
              items={['WHO menstrual health', 'NHS periods', 'ACOG menstrual cycle', 'Mayo Clinic PMS/PMDD']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}