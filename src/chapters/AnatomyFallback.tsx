/**
 * 2D schematic diagrams used when WebGL is unavailable (old devices, blocked
 * GPUs, hard-refresh quirks). Deliberately plain — clarity over spectacle.
 */

const L = {
  font: '600 9px "JetBrains Mono", ui-monospace, monospace',
  letter: '0.12em',
};

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="fallback">
      <p className="eyebrow" style={{ fontSize: '0.64rem' }}>
        {title}
      </p>
      {children}
      <p className="micro" style={{ lineHeight: 1.6 }}>
        3D is unavailable on this device, so this is a simplified diagram. The information is identical.
      </p>
    </div>
  );
}

export function AnatomyFallback({ kind }: { kind: 'male' | 'female' | 'cycle' | 'journey' | 'transmission' | 'arousal' }) {
  if (kind === 'male') return <MaleDiagram />;
  if (kind === 'female') return <FemaleDiagram />;
  if (kind === 'cycle') return <CycleDiagram />;
  if (kind === 'journey') return <JourneyDiagram />;
  if (kind === 'transmission') return <TransmissionDiagram />;
  return <ArousalDiagram />;
}

function MaleDiagram() {
  return (
    <Frame title="Male reproductive anatomy — schematic">
      <svg viewBox="0 0 300 400" role="img" aria-label="Simplified labelled diagram of the male reproductive system">
        <g stroke="var(--line-strong)" fill="none" strokeWidth="1">
          <path d="M150 20c14 0 22 12 22 27 0 16-9 28-22 28s-22-12-22-28c0-15 8-27 22-27z" />
          <path d="M118 190h64l-6-46a18 18 0 0 0-18-15h-16a18 18 0 0 0-18 15z" />
        </g>
        <ellipse cx="150" cy="95" rx="26" ry="21" fill="rgba(95,211,232,.14)" stroke="var(--cyan)" />
        <text x="182" y="92" fill="var(--bone-3)" style={L}>BLADDER</text>
        <ellipse cx="128" cy="150" rx="11" ry="8" fill="rgba(95,211,232,.14)" stroke="var(--cyan)" />
        <ellipse cx="172" cy="150" rx="11" ry="8" fill="rgba(95,211,232,.14)" stroke="var(--cyan)" />
        <text x="188" y="148" fill="var(--bone-3)" style={L}>VESICLES</text>
        <path d="M139 160c-14 4-18 22-12 44" stroke="var(--cyan)" strokeWidth="1.2" fill="none" />
        <path d="M161 160c14 4 18 22 12 44" stroke="var(--cyan)" strokeWidth="1.2" fill="none" />
        <text x="188" y="188" fill="var(--bone-3)" style={L}>VAS DEFERENS</text>
        <ellipse cx="150" cy="178" rx="14" ry="10" fill="rgba(95,211,232,.2)" stroke="var(--cyan)" />
        <text x="172" y="176" fill="var(--bone-3)" style={L}>PROSTATE</text>
        <path d="M150 120v58" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="42" y="200" fill="var(--bone-3)" style={L}>URETHRA</text>
        <path d="M150 186c0 26 0 44 0 60" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx="150" cy="268" rx="34" ry="36" fill="rgba(95,211,232,.06)" stroke="var(--line-strong)" />
        <ellipse cx="134" cy="268" rx="15" ry="19" fill="rgba(95,211,232,.22)" stroke="var(--cyan)" />
        <ellipse cx="166" cy="268" rx="15" ry="19" fill="rgba(95,211,232,.22)" stroke="var(--cyan)" />
        <text x="30" y="246" fill="var(--bone-3)" style={L}>TESTES</text>
        <path d="M139 244c-6 2-8 8-7 14" stroke="var(--cyan)" strokeWidth="1.2" fill="none" />
        <path d="M161 244c6 2 8 8 7 14" stroke="var(--cyan)" strokeWidth="1.2" fill="none" />
        <text x="196" y="300" fill="var(--bone-3)" style={L}>EPIDIDYMIS</text>
        <path d="M150 246v58c0 16 0 30 0 44" stroke="var(--cyan)" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".5" />
        <path d="M150 246v58c0 16 0 30 0 44" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <text x="196" y="330" fill="var(--bone-3)" style={L}>PENIS</text>
      </svg>
    </Frame>
  );
}

function FemaleDiagram() {
  return (
    <Frame title="Female reproductive anatomy — schematic">
      <svg viewBox="0 0 300 400" role="img" aria-label="Simplified labelled diagram of the female reproductive system">
        <path
          d="M150 130c-28 0-46 18-46 42 0 20 16 34 34 40l6 26h12l6-26c18-6 34-20 34-40 0-24-18-42-46-42z"
          fill="rgba(95,211,232,.12)"
          stroke="var(--cyan)"
        />
        <text x="206" y="164" fill="var(--bone-3)" style={L}>UTERUS</text>
        <path d="M104 152c-18-8-30-2-34 10" stroke="var(--cyan)" strokeWidth="1.4" fill="none" />
        <path d="M196 152c18-8 30-2 34 10" stroke="var(--cyan)" strokeWidth="1.4" fill="none" />
        <ellipse cx="66" cy="176" rx="12" ry="9" fill="rgba(95,211,232,.2)" stroke="var(--cyan)" />
        <ellipse cx="234" cy="176" rx="12" ry="9" fill="rgba(95,211,232,.2)" stroke="var(--cyan)" />
        <text x="10" y="200" fill="var(--bone-3)" style={L}>OVARY</text>
        <text x="240" y="200" fill="var(--bone-3)" style={L}>OVARY</text>
        <text x="30" y="140" fill="var(--bone-3)" style={L}>FALLOPIAN TUBE</text>
        <path d="M150 212v24" stroke="var(--cyan)" strokeWidth="6" fill="none" />
        <text x="162" y="228" fill="var(--bone-3)" style={L}>CERVIX</text>
        <path d="M150 236v40" stroke="var(--cyan)" strokeWidth="9" fill="none" opacity=".45" />
        <path d="M150 236v40" stroke="var(--cyan)" strokeWidth="2" fill="none" />
        <text x="164" y="262" fill="var(--bone-3)" style={L}>VAGINA</text>
        <ellipse cx="150" cy="300" rx="20" ry="8" fill="none" stroke="var(--rose)" strokeWidth="1.2" />
        <text x="178" y="304" fill="var(--bone-3)" style={L}>VULVA (EXTERNAL)</text>
        <text x="178" y="316" fill="var(--bone-4)" style={L}>NOT THE SAME THING</text>
      </svg>
    </Frame>
  );
}

function CycleDiagram() {
  const stages = [
    ['DAY 1–5', 'PERIOD', 'var(--rose)'],
    ['DAY 6–13', 'FOLLICULAR', 'var(--cyan)'],
    ['~DAY 14', 'OVULATION', 'var(--amber)'],
    ['DAY 15–28', 'LUTEAL', 'var(--blue)'],
  ];
  return (
    <Frame title="The cycle — schematic">
      <svg viewBox="0 0 300 260" role="img" aria-label="Simplified diagram of the menstrual cycle phases">
        {stages.map(([d, label, c], i) => {
          const y = 40 + i * 50;
          return (
            <g key={label}>
              <rect x="14" y={y} width="272" height="38" rx="7" fill="rgba(255,255,255,.02)" stroke="var(--line-soft)" />
              <rect x="14" y={y} width="6" height="38" rx="3" fill={c} />
              <text x="32" y={y + 16} fill="var(--bone-4)" style={L}>{d}</text>
              <text x="32" y={y + 30} fill="var(--bone)" style={{ ...L, fontSize: '11px', letterSpacing: '0.16em' }}>{label}</text>
            </g>
          );
        })}
        <path
          d="M28 20c60-14 190 14 244 0"
          stroke="var(--rose)"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="4 4"
          opacity=".7"
        />
        <text x="120" y="14" fill="var(--bone-4)" style={L}>LINEARISED — REAL CYCLES VARY</text>
      </svg>
    </Frame>
  );
}

function JourneyDiagram() {
  return (
    <Frame title="Fertilisation to implantation — schematic">
      <svg viewBox="0 0 300 200" role="img" aria-label="Diagram of sperm travelling to the egg, fertilisation and implantation">
        <path d="M12 100h120" stroke="var(--cyan)" strokeWidth="1" opacity=".4" />
        <circle cx="160" cy="100" r="14" fill="rgba(224,160,95,.3)" stroke="var(--amber)" />
        <text x="180" y="96" fill="var(--bone-3)" style={L}>EGG</text>
        <text x="180" y="110" fill="var(--bone-4)" style={L}>OVUM</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${34 + i * 26} ${82 + (i % 2) * 24})`}>
            <ellipse cx="0" cy="0" rx="4" ry="2.4" fill="var(--cyan)" />
            <path d="M-4 0c-5 1-7 4-5 5" stroke="var(--cyan)" strokeWidth="1" fill="none" />
          </g>
        ))}
        <text x="30" y="140" fill="var(--bone-4)" style={L}>SPERM SURVIVE UP TO ~5 DAYS</text>
        <circle cx="160" cy="100" r="26" fill="none" stroke="var(--amber)" strokeWidth="1" opacity=".4" />
        <text x="118" y="52" fill="var(--amber)" style={L}>FERTILISATION</text>
        <path d="M232 84c14 0 22 8 22 18 0 12-10 20-24 20" fill="rgba(95,211,232,.14)" stroke="var(--cyan)" />
        <text x="212" y="140" fill="var(--bone-3)" style={L}>EMBRYO IMPLANTS</text>
        <text x="212" y="154" fill="var(--bone-4)" style={L}>IN UTERINE LINING</text>
      </svg>
    </Frame>
  );
}

function TransmissionDiagram() {
  return (
    <Frame title="STI transmission — schematic">
      <svg viewBox="0 0 300 200" role="img" aria-label="Diagram showing an infection passing between two people and a barrier blocking it">
        <circle cx="70" cy="100" r="34" fill="none" stroke="var(--line-strong)" />
        <circle cx="230" cy="100" r="34" fill="none" stroke="var(--line-strong)" />
        <path d="M104 100h92" stroke="var(--rose)" strokeWidth="1.2" strokeDasharray="5 6" />
        <circle cx="130" cy="100" r="2.6" fill="var(--rose)" />
        <circle cx="150" cy="100" r="2.6" fill="var(--rose)" />
        <circle cx="170" cy="100" r="2.6" fill="var(--rose)" />
        <text x="106" y="152" fill="var(--bone-3)" style={L}>UNPROTECTED SEX — TRANSMISSION POSSIBLE</text>
        <path d="M104 40h92" stroke="var(--green)" strokeWidth="1.2" />
        <path d="M146 32l14 8-14 8z" fill="var(--green)" opacity=".8" />
        <circle cx="130" cy="40" r="2.6" fill="var(--green)" />
        <circle cx="120" cy="40" r="2.2" fill="var(--green)" opacity=".5" />
        <text x="106" y="24" fill="var(--green)" style={L}>CONDOM — SUBSTANTIALLY REDUCES RISK</text>
      </svg>
    </Frame>
  );
}

function ArousalDiagram() {
  return (
    <Frame title="The urge curve — schematic">
      <svg viewBox="0 0 300 160" role="img" aria-label="Graph showing a sexual urge rising, peaking and falling on its own">
        <path d="M10 130h280" stroke="var(--line)" />
        <path
          d="M10 128C60 128 90 124 120 96S160 30 185 40s40 62 75 80 20 8 30 8"
          stroke="var(--cyan)"
          strokeWidth="2"
          fill="none"
        />
        <text x="120" y="22" fill="var(--bone-4)" style={L}>PEAK</text>
        <text x="16" y="150" fill="var(--bone-4)" style={L}>TRIGGER</text>
        <text x="228" y="150" fill="var(--bone-4)" style={L}>FALLS ON ITS OWN</text>
      </svg>
    </Frame>
  );
}
