import { ChapterMark, Compare, MythGrid, DoDont, Sources } from '../components/ui/blocks';
import { Lede, Note, Reveal, Statement } from '../components/ui/primitives';

export function Contraception() {
  return (
    <section id="contraception" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={10} label="Contraception" accent="green" />
        <Statement>
          Contraception & condoms: <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>how to use one properly, and what to do when it fails.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            The best method is the one you will use correctly, every time. This chapter focuses on condoms because they
            are the only method that also prevents STIs — and they are the method most likely to be in your hands.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={10} label="The options" accent="green" />
        <Compare
          left={{ title: 'Barrier (you control)', color: 'var(--green)' }}
          right={{ title: 'Hormonal / long-acting (she controls)', color: 'var(--blue)' }}
          rows={[
            { l: 'External condom — 98% perfect, 87% typical', r: 'Combined pill — 99% perfect, 93% typical' },
            { l: 'Internal condom — 95% perfect, 79% typical', r: 'Progestin-only pill — 99% perfect, 93% typical' },
            { l: 'Diaphragm + spermicide — 94% perfect, 83% typical', r: 'Patch / ring — 99% perfect, 93% typical' },
            { l: '—', r: 'Injectable (DMPA) — 99% perfect, 96% typical' },
            { l: '—', r: 'Hormonal IUD — 99.8% (5–8 years)' },
            { l: '—', r: 'Copper IUD — 99.2% (5–10 years)' },
            { l: '—', r: 'Implant — 99.9% (3–5 years)' },
          ]}
        />
      </div>

      <div className="shell sect">
        <ChapterMark n={10} label="Condom: step by step" accent="green" />
        <Statement size="h2">
          Nine steps. Do all of them, every time.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.7rem' }}>
            <li><strong>Check expiry and package.</strong> Expired or damaged condoms break. Squeeze the packet — you should feel an air bubble.</li>
            <li><strong>Open carefully.</strong> Push the condom to one side, tear the notch. No teeth, scissors, or nails.</li>
            <li><strong>Check orientation.</strong> The rolled rim should face outwards (like a sombrero). If it is inside out, discard and use a new one — pre-ejaculate may be on the outside.</li>
            <li><strong>Pinch the tip.</strong> Squeeze the reservoir between thumb and forefinger to leave space for semen and avoid air bubbles.</li>
            <li><strong>Roll down fully.</strong> With the tip pinched, roll the condom all the way to the base of the erect penis.</li>
            <li><strong>Use appropriate lubricant.</strong> Water-based or silicone on the outside. No oil, saliva, or lotion with latex.</li>
            <li><strong>During sex, check occasionally.</strong> If it slips or feels loose, stop and adjust.</li>
            <li><strong>After ejaculation, hold the base while withdrawing.</strong> Before the penis softens. This prevents spillage.</li>
            <li><strong>Dispose correctly.</strong> Wrap in tissue, bin it. Never flush. Never reuse.</li>
          </ol>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={10} label="When it fails" accent="green" />
        <DoDont
          dont={[
            'Pretend it didn&apos;t happen. She is the one who bears the physical consequence.',
            'Wait for a missed period to act. The emergency contraception window closes while you wait.',
            'Blame her ("you should have been on the pill"). Contraception is a shared agreement, not her solo job.',
          ]}
          do={[
            'Tell her immediately. "The condom broke / slipped." Calmly. No drama.',
            'Go to a pharmacy or doctor together <strong>the same day</strong>. Emergency contraception is most effective within 72 hours (levonorgestrel) or 120 hours (ulipristal / copper IUD).',
            'Discuss STI testing. If the condom failed, both of you may need testing — timing depends on the infection (HIV has a window period; PEP for HIV must start within 72 hours).',
            'Review what went wrong: wrong size? expired? not pinched? not held on withdrawal? Fix it for next time.',
          ]}
          accent="green"
        />
      </div>

      <div className="shell sect sect--tight">
        <Reveal>
          <h2 className="serif" style={{ fontSize: 'var(--t-h2)', maxWidth: '18ch', marginBottom: '0.8rem' }}>
            Three condom myths
          </h2>
        </Reveal>
        <div style={{ height: 'clamp(1rem,3vw,1.8rem)' }} />
        <MythGrid
          items={[
            {
              claim: 'Two condoms are safer than one.',
              truth: 'Double-bagging increases friction between the layers and makes breakage <strong>more</strong> likely. One condom, used correctly, is the design spec.',
            },
            {
              claim: 'Condoms ruin sensation.',
              truth: 'Modern ultra-thin condoms (0.04–0.05 mm) transmit heat and pressure well. If sensation is genuinely an issue, try different brands, add a drop of lube inside the tip, or practice with condoms during masturbation to get used to the feel.',
            },
            {
              claim: 'Condoms are only for casual sex.',
              truth: 'Condoms are for anyone who wants to prevent pregnancy and/or STIs — including married couples, long-term partners, and people using other methods who want STI protection. Using condoms is not a trust issue; it is a health decision.',
            },
          ]}
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="Condom sizing">
          Standard condoms (52–54 mm nominal width) fit most people. If it feels painfully tight or constantly slips off,
          try a different nominal width — 49 mm (snug) or 56–60 mm (large). Indian pharmacies stock multiple sizes; ask
          for "small", "regular", "large". A condom that fits is a condom that works.
        </Note>
        <Sources items={['WHO condom effectiveness', 'NHS contraception guide', 'CDC condom use', 'FOGSI contraception guidelines']} />
      </div>
    </section>
  );
}