export const attraction = {
  mark1: 'Urges',
  statementBefore: 'Being attracted to someone is normal.',
  statementAccent: 'What you do with that feeling is your responsibility.',
  lede: 'Nobody chooses who they find attractive. The feeling arrives uninvited. The choice is entirely in what happens next.',
  steps: [
    {
      tag: 'The feeling',
      title: 'Attraction ≠ arousal ≠ consent',
      body: 'You see someone. Your brain registers **attraction**. Your body may respond with **arousal** — blood flow, heart rate, an erection. Neither of those is a decision, and neither of them is consent. Consent is a separate, conscious, verbal agreement between people.',
    },
    {
      tag: 'The wave',
      title: 'An urge is a wave, not a command',
      body: 'Physiologically, an urge builds, peaks, and subsides — usually within minutes. You do not have to act on it. You do not have to fight it. You just have to **outlast it**. Fighting creates tension; feeding creates habit; noticing and letting it pass creates freedom.',
    },
    {
      tag: 'Biology',
      title: 'What is actually happening',
      body: 'Visual or mental stimulus → amygdala and hypothalamus activate → dopamine and norepinephrine spike → sympathetic nervous system engages → arteries dilate, smooth muscle relaxes → erection (or lubrication). This is a reflex arc older than language. It is not a moral event.',
    },
    {
      tag: 'Control',
      title: 'The gap between feeling and action',
      body: 'The prefrontal cortex — the part of the brain that plans, inhibits, and decides — is what separates an urge from a behaviour. That gap is where all sexual ethics live. Strengthening the gap is not repression; it is maturity.',
    },
  ],
  mark2: 'Practical',
  loudTitle: 'When the urge is loud',
  loud1: '**Change your environment.** Move rooms. Step outside. Splash cold water on your face. The physical shift interrupts the loop.',
  loud2:
    '**Don\'t keep the phone beside the bed.** If late-night scrolling triggers the urge, charge the phone across the room. Use an actual alarm clock.',
  loud3:
    '**Name it.** "I am feeling a strong sexual urge right now." Labelling reduces the amygdala\'s grip and brings the prefrontal cortex online.',
  notWorkTitle: 'What does not work',
  notWork1: '**White-knuckling.** "I will not think about it" makes you think about it more (ironic process theory).',
  notWork2:
    '**Shaming yourself.** "I am weak/bad/dirty" adds stress, and stress often increases the urge as a coping mechanism.',
  notWork3:
    '**Arbitrary rules.** "Only on Tuesdays" or "three times a week max" turn a physiological signal into a moral scoreboard.',
  mythsTitle: 'Three myths about urges',
  myths: [
    {
      claim: 'A strong urge means you have to act on it.',
      truth: 'Urges are physiological events. They do not come with a mandatory action clause. People resist urges to eat junk food, to yell, to check their phone — sexual urges are not uniquely powerful.',
    },
    {
      claim: 'If you don\'t release it, it will hurt you (blue balls).',
      truth: '"Blue balls" (epididymal hypertension) is a temporary ache from prolonged arousal without ejaculation. It is uncomfortable, not dangerous, and it resolves on its own. It is not a medical emergency and it is not a partner\'s obligation to fix.',
    },
    {
      claim: 'Thinking about someone sexually means you disrespect them.',
      truth: 'Thoughts are involuntary. Respect is shown in behaviour — whether you stare, comment, touch, or pressure. A fleeting thought is not a moral failing; acting on it without consent is.',
    },
  ],
  careLabel: 'If urges feel unmanageable',
  care: 'If sexual urges feel compulsive — you cannot stop, they interfere with sleep/work/relationships, you use them to numb every difficult emotion, or you are escalating to riskier content or situations — that is worth talking to a mental-health professional. Not because sex is bad, but because **loss of agency** over any behaviour deserves support. Therapists who work with compulsive sexual behaviour exist in India (look for "CBT for compulsive sexual behaviour" or "sex addiction therapy").',
  sources: ['NIH sexual arousal physiology', 'APA compulsive sexual behaviour', 'Mayo Clinic sexual health'],
} as const;

export const masturbation = {
  mark1: 'Masturbation',
  statement: 'Masturbation: what\'s normal?',
  lede: 'Almost everyone does it. Almost nobody talks about it honestly. Let\'s separate the myths from the medicine.',
  mark2: 'What it is',
  statement2: 'Masturbation is touching your own body for sexual pleasure.',
  what1:
    'It is a normal sexual behaviour across cultures, ages and genders. It is not a disorder, a sin, a weakness or a medical condition. Major medical bodies (WHO, APA, AMA) classify it as a normal part of human sexuality.',
  what2:
    'People do it for pleasure, stress relief, sleep, to learn their own responses, or simply because the urge arises. All of those are valid reasons.',
  mythsTitle: 'Six myths that refuse to die',
  myths: [
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
      claim: 'If you masturbate, you won\'t enjoy sex with a partner.',
      truth: 'Knowing your own response usually *improves* partnered sex because you can communicate what you like. The problem arises only if a specific grip/speed/porn context conditions a response that a partner cannot replicate — and that is reversible.',
    },
    {
      claim: 'There is a "normal" number of times per week.',
      truth: 'No such number exists. Frequency varies enormously between people and across the lifespan. The only meaningful metric is **interference** — see below.',
    },
  ],
  mark3: 'When it is a problem',
  statement3: 'The number is not the problem. What it has replaced in your life is the question.',
  problemIntro: 'Masturbation becomes worth addressing when it **functionally interferes**:',
  problems: [
    'it disrupts sleep (late-night sessions you cannot stop)',
    'it replaces study, work, exercise or social time',
    'it is the primary way you cope with every negative emotion',
    'it is tied to compulsive porn use that is escalating',
    'it causes significant distress or shame',
    'you have tried to cut down and cannot',
  ],
  mark4: 'If you want to reduce it',
  dont: [
    'Set an arbitrary weekly quota and feel guilty when you miss it.',
    'Use willpower alone ("I will just stop").',
    'Shame yourself — shame increases stress, stress increases the urge.',
    'Swap one compulsion for another (e.g., gaming, doom-scrolling).',
  ],
  do: [
    'Track triggers for two weeks: time of day, mood, preceding activity, content consumed.',
    'Remove the easiest access: phone out of bedroom, block triggering sites, log out of accounts.',
    'Build a non-sexual wind-down routine: reading, stretching, breathing, journaling — something that shifts state.',
    'Exercise daily — even 20 minutes of moderate cardio reduces baseline arousal and improves impulse control.',
    'Improve sleep: 7–8 hours, consistent wake time, no screens 30 min before bed.',
    'When an urge hits: change rooms, splash cold water, do 20 push-ups, call a friend, write three things you are grateful for. The urge will peak and fall in ~3–7 minutes.',
    'Treat a slip as data, not failure. "I slipped at 11 pm after doom-scrolling" → adjust the 10:30 pm routine.',
    'If it still feels unmanageable after 4–6 weeks of consistent effort, see a therapist (CBT for compulsive sexual behaviour works well).',
  ],
  hygieneLabel: 'Hygiene & practical notes',
  hygiene:
    'Wash hands before and after. Use a lubricant if there is friction — water-based is fine. Clean any toy you use (soap and warm water, or toy cleaner). Do not use household objects, food items, or anything without a flared base anally. Privacy is normal; secrecy with shame is not.',
  sources: ['WHO sexual health', 'NHS masturbation', 'Mayo Clinic', 'APA compulsive sexual behaviour'],
} as const;

export const publicBehavior = {
  mark1: 'Public space',
  statement: 'Your attraction doesn\'t give you access to someone.',
  lede: 'Noticing someone is involuntary. Staring, following, blocking, touching — those are choices. This is the escalation almost nobody was warned about.',
  mark2: 'The ladder',
  ladder: [
    {
      n: '01',
      t: 'NOTICE — You see someone attractive. A glance. It lasts a second. This is normal.',
      tone: 'ok',
    },
    {
      n: '02',
      t: 'LOOK — You keep looking. Your eyes track her body. She notices. She feels watched.',
      tone: 'warn',
    },
    {
      n: '03',
      t: 'STARE — You hold the gaze. You do not look away when she catches you. This is intimidation.',
      tone: 'bad',
    },
    {
      n: '04',
      t: 'FOLLOW — You change your path to stay near her. You get off at her stop. You walk behind her. This is stalking.',
      tone: 'bad',
    },
    {
      n: '05',
      t: 'APPROACH — You block her path, tap her shoulder, whistle, comment on her body. She did not invite this.',
      tone: 'bad',
    },
    {
      n: '06',
      t: 'TOUCH — Any non-consensual contact. This is sexual assault. Not a mistake. A crime.',
      tone: 'bad',
    },
  ],
  mark3: 'The principle',
  statement3: 'Sexual attraction does not make a public space private.',
  principle1:
    'A street, a metro, a campus, a market — these are shared spaces. Everyone in them has the right to move without being tracked, assessed, commented on, or touched. Your internal experience does not rewrite that right.',
  principle2:
    '**Briefly noticing someone is normal.** Repeatedly staring can make someone uncomfortable. Following someone is inappropriate. Blocking someone\'s path is unacceptable. Touching without consent is never acceptable. Sexual comments toward strangers can be intimidating and unwanted.',
  mark4: 'Practical check',
  askTitle: 'Before you act, ask yourself',
  questions: [
    'Would I do this if a camera were on me?',
    'Would I want a stranger doing this to my sister / friend / mother?',
    'Does this person have any way to say "no" or leave?',
    'Am I making this space smaller for her?',
  ],
  talkTitle: 'If you want to talk to someone',
  talk1:
    'Wait for a natural, social context where she can freely engage or walk away. A bookshop queue, a mutual friend\'s party, a shared activity. Not a dark street, not an empty carriage, not when she has headphones on, not when she is walking fast.',
  talk2:
    'And if she gives one-word answers, looks away, steps back, or says she has to go — **that is the end of the interaction**. Not the beginning of persuasion.',
  careLabel: 'If you are being followed or harassed',
  care: 'Trust your instinct. Move toward people. Enter a shop. Call 112 (police) or 181 (women\'s helpline). If someone touches you without consent, shout, make a scene, attract attention — the social cost of making a scene is far lower than the cost of freezing.',
  sources: [
    'IPC/BNS 2023 Sections 74–79 (sexual harassment, stalking, voyeurism)',
    'Delhi Police safety guidelines',
  ],
} as const;

export const sex = {
  mark1: 'The act',
  statementBefore: 'What actually happens during sex —',
  statementAccent: 'physiology, not performance.',
  lede: 'Porn teaches a script. Bodies do something else. Understanding the actual physiology removes the pressure to perform and makes room for communication.',
  mark2: 'The sequence',
  compareLeft: 'What porn shows',
  compareRight: 'What bodies actually do',
  compare: [
    {
      l: 'Instant, rock-hard erection',
      r: 'Erections come and go; they can soften and return — that is normal',
    },
    {
      l: 'Instant, dripping lubrication',
      r: 'Arousal builds gradually; lubrication varies; lube is normal and recommended',
    },
    {
      l: 'Penetration starts immediately',
      r: 'Most people need warm-up: kissing, touching, oral, time',
    },
    {
      l: 'Rhythmic pounding to simultaneous orgasm',
      r: 'Rhythms vary; most women need clitoral stimulation; simultaneous orgasm is rare',
    },
    {
      l: 'No talking, just knowing',
      r: 'Communication is the skill: "slower", "there", "not that", "yes"',
    },
    {
      l: 'Performance ends at male ejaculation',
      r: 'Sex ends when both people are done — or when either wants to stop',
    },
  ],
  mark3: 'Key facts',
  erectionTitle: 'Erections are not a binary switch',
  erectionBody:
    'Losing an erection during sex is common — especially with a new partner, when nervous, tired, drunk, or distracted. It does not mean you are broken, unattracted, or "not a man". It means your sympathetic nervous system (fight/flight) briefly overrode the parasympathetic (arousal). Breathing, slowing down, switching to hands/mouth, or taking a break usually brings it back.',
  orgasmTitle: 'Orgasm is not guaranteed, and that is fine',
  orgasmBody:
    'Anorgasmia (difficulty reaching orgasm) affects people of all genders. It can be situational, medication-related, stress-related, or just how your body works today. Treating orgasm as the only "success" metric creates the anxiety that prevents it. Pleasure ≠ orgasm.',
  mark4: 'Lubrication',
  dont: [
    'Assume wetness = desire. Lubrication is a physiological response that can happen without desire, and desire can exist without lubrication.',
    'Use saliva as lube — it dries fast and can introduce bacteria.',
    'Use oil-based products (coconut oil, baby oil, Vaseline) with latex condoms — they degrade latex in seconds.',
    'Treat needing lube as a failure. Post-menopausal women, people on certain medications, and people who are just not that wet today all need lube. It is a tool, not a verdict.',
  ],
  do: [
    'Keep water-based or silicone lube by the bed. It is the single cheapest upgrade to comfort and safety.',
    'Reapply as needed. Silicone lasts longer; water-based is easier to clean.',
    'Communicate: "Can we add some lube?" is a normal sentence, not a criticism.',
    'For anal sex, lube is non-negotiable — the anus does not self-lubricate and tissue tears easily.',
  ],
  careLabel: 'When to see a doctor',
  care: 'Persistent erectile difficulty (more than a few weeks), pain during sex, bleeding after sex, inability to ejaculate, or a sudden change in sexual function — these are medical conversations, not performance conversations. A urologist or sexual health clinic can help.',
  sources: ['NHS sexual health', 'Mayo Clinic sexual response', 'ISSM (International Society for Sexual Medicine)'],
} as const;
