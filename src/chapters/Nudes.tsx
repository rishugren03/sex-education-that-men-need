import { ChapterMark, DoDont, Sources } from '../components/ui/blocks';
import { Body, Lede, Note, Reveal, Statement } from '../components/ui/primitives';
import { ScenarioCard } from '../components/ui/ScenarioCard';
import { SCENARIOS } from '../content/scenarios';

const nudeScenarios = SCENARIOS.filter((s) => s.chapter === 'Nudes');

export function Nudes() {
  return (
    <section id="nudes" data-chapter className="sect">
      <div className="shell">
        <ChapterMark n={13} label="Nudes" accent="rose" />
        <Statement>
          Nudes & digital consent: <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>she trusted you with her phone. That is the entire permission.</em>
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Lede delay={0.1}>
            Intimate images are the most common way trust is broken in digital India. This chapter is short because the
            rule is simple.
          </Lede>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={13} label="The rule" accent="rose" />
        <Statement size="h2">
          If someone sends you something privately, that does not give you permission to share it.
        </Statement>
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          <Body>
            Not to your best friend. Not to the group chat. Not "just one person". Not after a breakup. Not as a joke.
            Not because "everyone else has seen it". The image belongs to the person in it. Your access is a privilege,
            not ownership.
          </Body>
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={13} label="Practice" accent="rose" />
        <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
          {nudeScenarios.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <ScenarioCard scenario={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell sect">
        <ChapterMark n={13} label="The law (India)" accent="rose" />
        <DoDont
          dont={[
            'Forward an intimate image of someone without their consent — Section 66E IT Act (violation of privacy) and Sections 67/67A (transmission of obscene/sexually explicit material) apply.',
            'Threaten to share ("sextortion") — this is extortion plus IT Act offences, punishable with imprisonment.',
            'Store intimate images on cloud backups you do not control, or on devices others can access.',
            'Take screenshots of disappearing messages / view-once media — that is a deliberate violation of the sender&apos;s intent.',
          ]}
          do={[
            'Delete the image after viewing. Yes, delete it. A photo you keep is leverage, and you do not want to be that kind of person.',
            'If you receive an intimate image you did not ask for: delete it, do not forward, tell the sender "please don&apos;t send this".',
            'If your image is shared without consent: screenshot the evidence (URL, profile, chat), report on <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener">cybercrime.gov.in</a>, call <strong>1930</strong> (National Cyber Crime Helpline, 24x7), and file a police complaint. You can also contact <a href="https://www.cehat.org/" target="_blank" rel="noopener">CEHAT</a> or <a href="https://tiss.edu/" target="_blank" rel="noopener">TISS iCall</a> (9152987821) for support.',
            'Use disappearing messages / view-once features for anything intimate, and only send to people you genuinely trust — but remember, technology cannot enforce ethics.',
          ]}
          accent="green"
        />
      </div>

      <div className="shell sect sect--tight">
        <Note kind="care" label="If it happened to you">
          You are not the one who did something wrong. The person who shared it broke the law and broke trust. You
          deserve support, not shame. <strong>1930</strong> (cybercrime helpline), <strong>181</strong> (women&apos;s helpline),
          <strong>112</strong> (police). Organisations: <a href="https://www.cyberpeace.org/" target="_blank" rel="noopener">CyberPeace Foundation</a>, <a href="https://www.digitalsecurityhelpline.org/" target="_blank" rel="noopener">Digital Security Helpline</a>.
        </Note>
        <Sources items={['IT Act 2000 Sections 66E, 67, 67A', 'BNS 2023', 'National Cyber Crime Reporting Portal (cybercrime.gov.in)', 'CyberPeace Foundation resources']} />
      </div>
    </section>
  );
}