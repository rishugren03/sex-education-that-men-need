export const consent = {
  mark1: 'Consent',
  statementBefore: "Consent isn't complicated.",
  statementAccent: 'It is the single most important thing in this whole lesson.',
  lede: 'If you remember only one chapter, make it this one. Everything else — bodies, contraception, STIs, pleasure — depends on this.',
  mark2: 'The rules',
  rulesLeftTitle: 'YES = agreement. Freely given. Enthusiastic is ideal; clear is the minimum.',
  rulesLeft1: '**NO = stop.** Immediately. Without negotiation, without guilt-tripping, without "just a little more".',
  rulesLeft2:
    '**SILENCE ≠ automatic yes.** Freeze, fear, uncertainty, sleep, intoxication — all produce silence. Silence is not consent.',
  rulesLeft3:
    '**PRESSURE ≠ consent.** Asking repeatedly, sulking, guilt-tripping, threatening to leave, "if you loved you would" — these convert a no into a coerced yes. That is not consent.',
  rulesRightTitle: 'RELATIONSHIP ≠ permanent consent.',
  rulesRight1:
    'Being in a relationship, married, or having had sex before does not create a standing permission. Every time is a new conversation — even if that conversation is just a look and a nod.',
  rulesRight2:
    '**PREVIOUS YES ≠ current yes.** Consent can be withdrawn at any moment, including mid-act, for any reason or no reason. A "yes" five minutes ago does not override a "no" right now.',
  rulesRight3:
    '**INTOXICATION:** Someone who is heavily drunk or high may not be capable of giving valid consent. If you have to wonder whether they can consent, they cannot. Do not have sex.',
  mark3: 'Practice',
  statement3: 'Five situations. No trick questions.',
  mark4: 'The bottom line',
  statement4: 'Your sexual urge is your responsibility.',
  bottom1:
    'Nobody else is responsible for managing your arousal. Not your partner, not the person you are attracted to, not the person who said yes yesterday and no today. The urge is yours. The choice is yours. The consequence of ignoring a "no" is yours — legally, morally, and in the life of the person you harmed.',
  bottom2:
    'If this feels heavy, it should. Sexual violence is not an accident. It is a series of choices, each one ignoring a boundary. The only way to never be that person is to treat every "no", every silence, every hesitation, and every withdrawal as a hard stop — every single time.',
  careLabel: 'If something happened to you or someone you know',
  care: 'Sexual violence is never the victim\'s fault — not what they wore, where they were, what they drank, or whether they froze. In India: 112 (police), 181 (women\'s helpline), 1091 (women\'s helpline). For support: [CEHAT](https://www.cehat.org/), [TISS iCall](https://tiss.edu/) (9152987821), [RAHI Foundation](https://www.rahi.org/).',
  sources: [
    'BNS 2023 Sections 63–71 (rape, consent definition)',
    'IPC 376 / BNS 63',
    'CEHAT guidelines',
    'WHO sexual violence prevention',
  ],
} as const;

export const pregnancy = {
  mark1: 'Pregnancy',
  statementBefore: 'Pregnancy:',
  statementAccent: 'sperm, egg, fertilisation, implantation — and how one time is enough.',
  lede: 'The biology is straightforward. The consequences are life-changing. Understanding the mechanics is how you make informed choices.',
  steps: [
    {
      tag: 'The cast',
      title: 'Two cells, one outcome',
      body: 'A single ejaculation contains **100–300 million sperm**. One ovulation releases **one egg** (occasionally two). The egg lives 12–24 hours. Sperm can survive in the reproductive tract **up to 5 days**. That overlap is the fertile window — roughly 6 days per cycle.',
    },
    {
      tag: 'The journey',
      title: 'Sperm: the long swim',
      body: 'Sperm enter the vagina, swim through the cervix, across the uterus, and into the fallopian tube. Of the millions that start, only a few hundred reach the tube. Only **one** (or zero) fertilises the egg. The rest are cleared by the immune system or flow out.',
    },
    {
      tag: 'Fertilisation',
      title: 'The moment of fusion',
      body: 'A sperm penetrates the egg\'s outer layer (zona pellucida). The egg\'s membrane hardens instantly, blocking other sperm. The two nuclei merge — 23 chromosomes from each parent combine into a single cell: the **zygote**. This is fertilisation.',
    },
    {
      tag: 'Division',
      title: 'One becomes many',
      body: 'The zygote divides as it moves down the tube: 2 cells → 4 → 8 → 16 (morula) → blastocyst (about 100 cells) by day 5–6. It is still tiny — smaller than a pinhead.',
    },
    {
      tag: 'Implantation',
      title: 'Landing in the lining',
      body: 'The blastocyst reaches the uterus and burrows into the thickened endometrium. This is **implantation** — the biological beginning of pregnancy. It happens around day 6–10 after fertilisation. Before this, the body has no way to know fertilisation occurred.',
    },
  ],
  mark2: 'The questions',
  onceTitle: 'Can pregnancy happen after one time?',
  once1:
    '**Yes.** One act of unprotected penis-in-vagina sex during the fertile window can result in pregnancy. There is no "safe" number of times, no "first time" immunity, and no position that prevents it.',
  once2:
    'Withdrawal (pulling out) fails about 22% of the time with typical use — pre-ejaculate can contain sperm, and timing is unreliable. It is not a reliable method on its own.',
  windowTitle: 'When is the fertile window?',
  window1:
    'Roughly **5 days before ovulation through the day of ovulation**. Since ovulation timing varies cycle to cycle (and even the same person does not ovulate on the same day every month), calendar-based "safe days" are unreliable. If you do not want pregnancy, use contraception every time.',
  mythsTitle: 'Four myths about pregnancy',
  myths: [
    {
      claim: 'You can\'t get pregnant the first time.',
      truth: 'Fertility has nothing to do with sexual history. If an egg and sperm meet during the fertile window, pregnancy can happen — virginity is not a contraceptive.',
    },
    {
      claim: 'Pregnancy happens instantly after sex.',
      truth: 'Fertilisation can take up to 24 hours after sex. Implantation takes 6–10 days after that. A pregnancy test only becomes positive after implantation (around the time of a missed period). There is no "instant" pregnancy.',
    },
    {
      claim: 'If she has her period, she can\'t be pregnant.',
      truth: 'Some bleeding in early pregnancy is common (implantation bleeding, cervical changes). A period-like bleed does not rule out pregnancy. A test is the only way to know.',
    },
    {
      claim: 'The woman is solely responsible for preventing pregnancy.',
      truth: 'Pregnancy requires sperm. The person producing sperm shares equal responsibility for contraception. Condoms are a male-controlled method that also prevents STIs — using them is the bare minimum of shared responsibility.',
    },
  ],
  careLabel: 'If you think pregnancy might have happened',
  care: 'Emergency contraception (levonorgestrel or ulipristal) works best within 3 days and can work up to 5 days after unprotected sex. The copper IUD is the most effective emergency contraception and works up to 5 days. Go to a pharmacy or doctor **as soon as possible** — earlier is simply better. Do not wait for a missed period.',
  sources: [
    'WHO emergency contraception',
    'NHS pregnancy',
    'CDC reproductive health',
    'FOGSI guidelines India',
  ],
} as const;

export const contraception = {
  mark1: 'Contraception',
  statementBefore: 'Contraception & condoms:',
  statementAccent: 'how to use one properly, and what to do when it fails.',
  lede: 'The best method is the one you will use correctly, every time. This chapter focuses on condoms because they are the only method that also prevents STIs — and they are the method most likely to be in your hands.',
  mark2: 'The options',
  compareLeft: 'Barrier (you control)',
  compareRight: 'Hormonal / long-acting (she controls)',
  compare: [
    { l: 'External condom — 98% perfect, 87% typical', r: 'Combined pill — 99% perfect, 93% typical' },
    { l: 'Internal condom — 95% perfect, 79% typical', r: 'Progestin-only pill — 99% perfect, 93% typical' },
    {
      l: 'Diaphragm + spermicide — 94% perfect, 83% typical',
      r: 'Patch / ring — 99% perfect, 93% typical',
    },
    { l: '—', r: 'Injectable (DMPA) — 99% perfect, 96% typical' },
    { l: '—', r: 'Hormonal IUD — 99.8% (5–8 years)' },
    { l: '—', r: 'Copper IUD — 99.2% (5–10 years)' },
    { l: '—', r: 'Implant — 99.9% (3–5 years)' },
  ],
  mark3: 'Condom: step by step',
  statement3: 'Nine steps. Do all of them, every time.',
  steps9: [
    '**Check expiry and package.** Expired or damaged condoms break. Squeeze the packet — you should feel an air bubble.',
    '**Open carefully.** Push the condom to one side, tear the notch. No teeth, scissors, or nails.',
    '**Check orientation.** The rolled rim should face outwards (like a sombrero). If it is inside out, discard and use a new one — pre-ejaculate may be on the outside.',
    '**Pinch the tip.** Squeeze the reservoir between thumb and forefinger to leave space for semen and avoid air bubbles.',
    '**Roll down fully.** With the tip pinched, roll the condom all the way to the base of the erect penis.',
    '**Use appropriate lubricant.** Water-based or silicone on the outside. No oil, saliva, or lotion with latex.',
    '**During sex, check occasionally.** If it slips or feels loose, stop and adjust.',
    '**After ejaculation, hold the base while withdrawing.** Before the penis softens. This prevents spillage.',
    '**Dispose correctly.** Wrap in tissue, bin it. Never flush. Never reuse.',
  ],
  mark4: 'When it fails',
  dont: [
    'Pretend it didn\'t happen. She is the one who bears the physical consequence.',
    'Wait for a missed period to act. The emergency contraception window closes while you wait.',
    'Blame her ("you should have been on the pill"). Contraception is a shared agreement, not her solo job.',
  ],
  do: [
    'Tell her immediately. "The condom broke / slipped." Calmly. No drama.',
    'Go to a pharmacy or doctor together **the same day**. Emergency contraception is most effective within 72 hours (levonorgestrel) or 120 hours (ulipristal / copper IUD).',
    'Discuss STI testing. If the condom failed, both of you may need testing — timing depends on the infection (HIV has a window period; PEP for HIV must start within 72 hours).',
    'Review what went wrong: wrong size? expired? not pinched? not held on withdrawal? Fix it for next time.',
  ],
  mythsTitle: 'Three condom myths',
  myths: [
    {
      claim: 'Two condoms are safer than one.',
      truth: 'Double-bagging increases friction between the layers and makes breakage **more** likely. One condom, used correctly, is the design spec.',
    },
    {
      claim: 'Condoms ruin sensation.',
      truth: 'Modern ultra-thin condoms (0.04–0.05 mm) transmit heat and pressure well. If sensation is genuinely an issue, try different brands, add a drop of lube inside the tip, or practice with condoms during masturbation to get used to the feel.',
    },
    {
      claim: 'Condoms are only for casual sex.',
      truth: 'Condoms are for anyone who wants to prevent pregnancy and/or STIs — including married couples, long-term partners, and people using other methods who want STI protection. Using condoms is not a trust issue; it is a health decision.',
    },
  ],
  sizingLabel: 'Condom sizing',
  sizing: 'Standard condoms (52–54 mm nominal width) fit most people. If it feels painfully tight or constantly slips off, try a different nominal width — 49 mm (snug) or 56–60 mm (large). Indian pharmacies stock multiple sizes; ask for "small", "regular", "large". A condom that fits is a condom that works.',
  sources: [
    'WHO condom effectiveness',
    'NHS contraception guide',
    'CDC condom use',
    'FOGSI contraception guidelines',
  ],
} as const;

export const stis = {
  mark1: 'STIs',
  statementBefore: 'STIs:',
  statementAccent: 'often invisible, often curable, never a character flaw.',
  lede: 'Sexually transmitted infections are exactly what they sound like — infections passed through sexual contact. They are common, they are medical conditions, and they do not define your worth.',
  steps: [
    {
      tag: 'The mechanism',
      title: 'Invisible does not mean absent',
      body: 'Most STIs have **no symptoms at all**, or symptoms that look like something else (mild irritation, a rash, a flu-like feeling). You cannot tell by looking. You cannot tell by how someone "seems". The only way to know is testing.',
    },
    {
      tag: 'Transmission',
      title: 'How they move',
      body: 'Skin-to-skin contact (HPV, herpes, syphilis), fluid exchange (HIV, gonorrhoea, chlamydia, hepatitis B), or both. Oral, vaginal, anal sex — all can transmit. Some (HPV, herpes) can transmit even with a condom, because they infect skin not covered by the condom. Condoms **substantially reduce** but do not eliminate all risk.',
    },
  ],
  mark2: 'The main ones',
  bacterialTitle: 'Bacterial (curable)',
  bacterial:
    '**Chlamydia** — often silent; can cause PID, infertility.\n**Gonorrhoea** — similar; growing antibiotic resistance.\n**Syphilis** — stages: chancre → rash → latent → tertiary (organ damage).\n**All cured with antibiotics** — but damage already done is not always reversible.',
  viralTitle: 'Viral (manageable)',
  viral:
    '**HIV** — attacks immune system; treatable (ART = undetectable = untransmittable).\n**Herpes (HSV-1/2)** — lifelong; outbreaks manageable; asymptomatic shedding happens.\n**HPV** — most clear spontaneously; high-risk types cause cancer; vaccine prevents.\n**Hepatitis B** — vaccine prevents; chronic infection manageable.',
  parasiticTitle: 'Parasitic / other',
  parasitic:
    '**Trichomoniasis** — curable antibiotic.\n**Pubic lice / scabies** — topical treatment.\n**Mycoplasma genitalium** — emerging, often resistant; needs specific testing.',
  mark3: 'Testing & treatment',
  dont: [
    'Assume "I feel fine" means "I am clean". Most STIs are asymptomatic for months or years.',
    'Test too early and assume negative. Window periods: HIV (2–4 weeks for NAT, 3–12 weeks for antibody), chlamydia/gonorrhoea (1–2 weeks), syphilis (3–6 weeks), hepatitis B (4–10 weeks). Ask a doctor when to test.',
    'Self-medicate with antibiotics from a friend. Wrong drug, wrong dose, resistance risk.',
    'Ghost a partner after a positive result. They need to know so they can test and treat.',
  ],
  do: [
    'Get tested regularly if sexually active — every 3–6 months with new/multiple partners, annually in a monogamous relationship.',
    'Use condoms consistently. They reduce (not eliminate) most STI transmission.',
    'Get vaccinated: HPV (ideally before sexual debut, but useful up to age 45), Hepatitis B (3 doses).',
    'If a condom breaks / slips / you had unprotected sex: consider PEP for HIV (start within 72 hours, ideally ASAP). Go to an ART centre or ER.',
    'If you test positive: take the full course, inform partners (clinics can do anonymous partner notification), retest after treatment if advised.',
  ],
  mythsTitle: 'Four myths about STIs',
  myths: [
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
  ],
  careLabel: 'Where to test in India',
  care: 'Government ICTCs (Integrated Counselling & Testing Centres) — free, confidential HIV/STI testing. Find one via [naco.gov.in](https://naco.gov.in/). Private labs (Dr Lal PathLabs, Thyrocare, etc.) offer panels. Sexual health clinics in metros: [CEHAT](https://www.cehat.org/) (Mumbai), [Shakti](https://www.shaktifoundation.org/) (Delhi), [Sangath](https://www.sangath.in/) (Goa).',
  sources: [
    'WHO STI fact sheets',
    'CDC STI treatment guidelines 2021',
    'NACO India guidelines',
    'IUSTI Asia-Pacific guidelines',
  ],
} as const;
