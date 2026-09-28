export type Choice = {
  id: string;
  /** The option text the reader taps. */
  label: string;
  /** short tag: 'good' | 'risky' | 'harmful' */
  tone: 'good' | 'risky' | 'harmful';
  /** What actually happens because of this choice. */
  outcome: string;
  /** The better move, plainly stated. */
  better?: string;
};

export type Scenario = {
  id: string;
  chapter: string;
  /** "Metro, 8:40 pm" — the setting, set in small mono caps. */
  where: string;
  /** The situation, written in second person. */
  prompt: string;
  choices: Choice[];
  /** One-line takeaway that appears after the reader engages. */
  takeaway: string;
};

export const SCENARIOS: Scenario[] = [
  {
    id: 'metro',
    chapter: 'Public space',
    where: 'Metro, 8:40 pm',
    prompt: 'A girl you find really attractive is in the same coach. She gets off at the next station.',
    takeaway: 'Noticing is involuntary. Staring, following and blocking are choices — and only one of those is yours to make freely.',
    choices: [
      {
        id: 'a',
        label: 'Look once, then get back to your phone and let her go.',
        tone: 'good',
        outcome:
          'This is completely normal and it is the end of it. She will never know, nothing is owed to you, and you walk away with your dignity intact.',
      },
      {
        id: 'b',
        label: 'Keep looking at her body until she gets off.',
        tone: 'risky',
        outcome:
          'People notice being watched, and it lands badly on almost everyone. If she clocks it, she spends the rest of the journey feeling watched, not admired. You got nothing out of it.',
        better: 'One glance is fine. A sustained look is a small thing that makes someone feel unsafe, and "I didn\'t do anything" is not the point.',
      },
      {
        id: 'c',
        label: 'Get off at her station and walk behind her.',
        tone: 'harmful',
        outcome:
          'This is following a stranger, and it is exactly how harassment starts. It is not romance and it is not a coincidence — she did not agree to be followed, and the fear it creates is the harm.',
        better: 'Attraction does not make a public space private. If you want to talk to someone, that requires a normal social situation where she can say no.',
      },
    ],
  },
  {
    id: 'not-in-mood',
    chapter: 'Relationships',
    where: 'Her room, 11 pm',
    prompt: 'You two have been dating for two months. She says she is not in the mood tonight.',
    takeaway: 'A no is a complete sentence, and it is not a negotiation.',
    choices: [
      {
        id: 'a',
        label: '"No worries. Want to watch something / play something / just talk?"',
        tone: 'good',
        outcome:
          'This is the response that builds trust fastest. She now knows she can say no without a fight, which means she can say yes honestly. That is the whole game.',
      },
      {
        id: 'b',
        label: 'Ask again in ten minutes, then again after that.',
        tone: 'harmful',
        outcome:
          'Repeated asking teaches her that a "no" is negotiable. Even if she eventually says yes out of exhaustion to end the pressure, that is not consent — it is pressure with a different name.',
        better: 'Ask once. Hear the answer. Move on to something else. The question can be asked again on another day.',
      },
      {
        id: 'c',
        label: '"So you don\'t actually like me then."',
        tone: 'harmful',
        outcome:
          'This is guilt-tripping. It makes her responsible for your feelings and her own sexuality at the same time, which is unfair and manipulative. It is also, quietly, quite common — and a reason a lot of relationships end badly.',
        better: 'Separate the two things: she can love you and not want sex tonight. Both can be true.',
      },
    ],
  },
  {
    id: 'condom-breaks',
    chapter: 'Contraception',
    where: 'Afterwards, 1 am',
    prompt: 'The condom broke near the end. There is semen on her sheets and on you.',
    takeaway: 'This is a medical situation, not a catastrophe and not something to hide.',
    choices: [
      {
        id: 'a',
        label: 'Tell her immediately, and go to a pharmacy or doctor together.',
        tone: 'good',
        outcome:
          'Emergency contraception works best the sooner it is taken — most effectively within 3 days, and it can still help up to 5 days depending on the option. Earlier is simply better. A doctor or pharmacist will tell you honestly what your options are at that hour.',
      },
      {
        id: 'b',
        label: 'Say nothing, in case it turns out to be fine.',
        tone: 'risky',
        outcome:
          'She is the one taking on the risk, and she is the one who would be carrying a pregnancy. Not telling her removes her ability to make her own decision about her own body. That is not protecting her.',
        better: 'Tell her first. Costs of talking: thirty seconds. Costs of not telling her: potentially everything.',
      },
      {
        id: 'c',
        label: 'Wait and see if she gets her period on time.',
        tone: 'risky',
        outcome:
          'A late period is a weak and late signal — cycles vary month to month on their own, and stress alone can shift it. By the time you have "waited and seen", the useful window for emergency contraception may already be closed.',
        better: 'Act in the same hour. Waiting for symptoms is not a plan.',
      },
    ],
  },
  {
    id: 'nude-sent',
    chapter: 'Nudes',
    where: 'Group chat, 6 pm',
    prompt: 'Your girlfriend sends you a nude photo. You are in a group chat with four of your friends.',
    takeaway: 'Private means private. It never meant "eventually everyone".',
    choices: [
      {
        id: 'a',
        label: 'Keep it to yourself. Nobody hears about this.',
        tone: 'good',
        outcome:
          'Correct, and the rule is absolute. You are now the only other person who has seen it. Sharing it — even once, even "just" to your closest friend — turns a private act of trust into a crime against her.',
      },
      {
        id: 'b',
        label: 'Share it in the group. They are going to find out anyway.',
        tone: 'harmful',
        outcome:
          'The moment it leaves your phone, you cannot get it back. It will be screenshotted, cropped, mocked, and very possibly end up somewhere you will both regret. Forwarding or sharing an intimate image of someone without consent is an offence in India, and a relationship is not a licence.',
        better: 'If she sent it, she sent it to you. Nobody else.',
      },
      {
        id: 'c',
        label: 'Save it forever, in case you break up later.',
        tone: 'harmful',
        outcome:
          'Holding a nude "as insurance" is keeping a weapon. It changes you from someone she chose into someone she is now quietly managing. It is also revenge porn waiting to happen — to her, and to your own reputation if it ever leaks.',
        better: 'Delete it. Yes, delete it. A photo you keep is leverage, and you do not want to be that kind of person.',
      },
    ],
  },
  {
    id: 'first-time-bleeding',
    chapter: 'Periods',
    where: 'A group chat',
    prompt: 'Your friend says: "Bro, girls always bleed the first time. That\'s how you know it\'s real."',
    takeaway: 'This is one of the most damaging myths still circulating, and it comes from people who were never taught anything either.',
    choices: [
      {
        id: 'a',
        label: 'Correct him — that is not how it works.',
        tone: 'good',
        outcome:
          'Correct. Bleeding during first-time sex can happen, especially if there is friction or not enough lubrication, but it absolutely can also not happen at all, and plenty of women have bled for other reasons entirely. It is not a test of anything.',
      },
      {
        id: 'b',
        label: 'Let it go. It is just a joke between friends.',
        tone: 'harmful',
        outcome:
          'It is not a joke to the woman in the conversation. This is how a myth that reduces women to a checklist survives for generations — because the people who know better stay quiet and laugh along.',
        better: 'You do not have to make a speech. One line is enough: "That\'s not actually true."',
      },
      {
        id: 'c',
        label: 'Agree with him, it is how it works right?',
        tone: 'risky',
        outcome:
          'Repeating it makes it more likely someone believes it, and more likely it gets said to a woman as a "joke" later. You are not required to be the person who explains, but you are also not helping by agreeing.',
      },
    ],
  },
  {
    id: 'her-period',
    chapter: 'Periods',
    where: 'Weekend, at home',
    prompt: 'She tells you she has her period and seems low-energy and irritable.',
    takeaway: 'Ask. Do not assume. Do not diagnose her body for her.',
    choices: [
      {
        id: 'a',
        label: 'Ask what she needs — rest, food, quiet, or company.',
        tone: 'good',
        outcome:
          'This is the whole skill. Everyone experiences it differently: some have bad cramps, some feel almost nothing, some get irritable, some get tearful. You cannot know which unless you ask, and asking costs you eight words.',
      },
      {
        id: 'b',
        label: 'Tell her she is being irrational and should relax.',
        tone: 'harmful',
        outcome:
          'Cramping, hormone shifts, disrupted sleep and genuine pain are not a personality defect. "You are being irrational" is the fastest way to make her stop telling you things.',
        better: 'Pain is not irrationality. If her pain is severe enough to stop her functioning, that is a doctor conversation, not an attitude conversation.',
      },
      {
        id: 'c',
        label: 'Assume she wants to be alone and disappear for three days.',
        tone: 'risky',
        outcome:
          'Sometimes that is right, and sometimes she is telling you about it because she wants you to be around. Silence is a valid preference, but you could not have known — so you chose the version that suits you.',
        better: 'Ask. "Do you want me around or would you rather I give you space?" is a complete sentence.',
      },
    ],
  },
  {
    id: 'stressed',
    chapter: 'Masturbation',
    where: '2 am, deadline on Monday',
    prompt: 'You have been masturbating more over the last month. It is the easiest thing to do when stressed.',
    takeaway: 'The number is not the problem. What it has replaced in your life is the question.',
    choices: [
      {
        id: 'a',
        label: 'Look at what it is doing for me, and swap it for something else that works.',
        tone: 'good',
        outcome:
          'Right frame. It is a coping mechanism, and coping mechanisms can be replaced by better ones: sleep, a walk, training, calling someone, changing rooms, putting the phone across the house. Not because sex is bad — because being unable to stop is.',
      },
      {
        id: 'b',
        label: 'Start counting and set a hard weekly limit.',
        tone: 'risky',
        outcome:
          'Arbitrary numbers do not map onto real life and they turn into a guilt loop that ends in the same place. What actually matters is whether it is interfering with sleep, study, work, or people — and whether you can steer it.',
        better: 'Judge it by interference, not by a number you invented.',
      },
      {
        id: 'c',
        label: 'Add porn to make it more efficient, and spend more time on it.',
        tone: 'risky',
        outcome:
          'For a lot of guys, the problem is not the act — it is that it is bundled with hours of escalating content that makes the next session need more. That escalation is worth noticing, because it changes what you find attractive and what you expect.',
        better: 'Notice whether the content is escalating. That is the real signal, not the frequency.',
      },
    ],
  },
  {
    id: 'rejected',
    chapter: 'Rejection',
    where: 'Two weeks after she said no to coffee',
    prompt: 'A girl you liked said she was not interested. You have replayed it about forty times.',
    takeaway: 'A "no" is information about her interest. It is not a verdict on your worth.',
    choices: [
      {
        id: 'a',
        label: 'Feel bad for a while, then stop putting her on a pedestal.',
        tone: 'good',
        outcome:
          'Healthy and boring, which is exactly right. Rejection is an extremely common part of meeting people, and it says almost nothing about your character or your future. Most people have been rejected many times and are fine.',
      },
      {
        id: 'b',
        label: 'Conclude that something is fundamentally wrong with me.',
        tone: 'risky',
        outcome:
          'One person saying no is a data point about compatibility, not a diagnosis of you. This is also the thought that turns a bad week into months of low confidence, and it is extremely common in young men who never learned rejection is normal.',
        better: 'She was not saying "no one will ever want you." She was saying "not me."',
      },
      {
        id: 'c',
        label: 'Try to win her over by being more intense and persistent.',
        tone: 'harmful',
        outcome:
          'Persistence after a clear no is pressure, and it reads as a warning sign rather than effort. It is one of the fastest ways to make someone avoid you, and in many women it is something they are specifically trained to fear.',
        better: 'Accept it, wish them well, and move on. That is the whole graceful version.',
      },
    ],
  },
  {
    id: 'changes-mind',
    chapter: 'Consent',
    where: 'Thirty seconds in',
    prompt: 'You start having sex. Halfway through she says: "Actually, let\'s stop."',
    takeaway: 'This is the single easiest moment to get right, and the easiest to get catastrophically wrong.',
    choices: [
      {
        id: 'a',
        label: 'Stop immediately. No argument, no sulking.',
        tone: 'good',
        outcome:
          'This is correct, and it costs you nothing that actually matters. Consent can be withdrawn at any moment, including mid-act, for any reason or no reason at all. Stopping immediately is the entire obligation.',
      },
      {
        id: 'b',
        label: 'Ask why, and try to talk her into finishing.',
        tone: 'harmful',
        outcome:
          'Whatever the reason — pain, fear, embarrassment, pregnancy, a text she saw, or simply changing her mind — that reason is hers to share or keep. Arguing with a withdrawal of consent is not negotiation; it is coercion with a delay.',
        better: 'You do not get a reason. You get compliance with the stop.',
      },
      {
        id: 'c',
        label: 'Finish quickly before she changes her mind again.',
        tone: 'harmful',
        outcome:
          'This is consent withdrawal being ignored, which is a sexual offence. "We were already doing it" is not a defence anywhere, and the speed only makes the violation smaller in duration, not in kind.',
        better: 'The rule is absolute because it is the only rule that protects you from your own worst moment.',
      },
    ],
  },
  {
    id: 'think-sti',
    chapter: 'STIs',
    where: 'Three weeks later',
    prompt: 'You had unprotected sex with someone you met at a party. Nothing feels wrong.',
    takeaway: 'Almost every STI either has no symptoms at all, or symptoms that look like something else.',
    choices: [
      {
        id: 'a',
        label: 'Get tested, and tell her so she can too.',
        tone: 'good',
        outcome:
          'This is the correct, boring, responsible move. Most STIs are curable and treatable, many have no symptoms for months, and testing is the only way to actually know. Being tested is a normal thing adults do.',
      },
      {
        id: 'b',
        label: 'Nothing feels wrong, so there is nothing to worry about.',
        tone: 'risky',
        outcome:
          'Feeling fine is not evidence. Chlamydia, gonorrhoea, HPV and herpes frequently produce no symptoms at all, and HIV can be symptomless for years. "I feel fine" is not a test result.',
        better: 'Get tested. Tell her. Use condoms from now on.',
      },
      {
        id: 'c',
        label: 'Ask her to get tested and skip it myself.',
        tone: 'risky',
        outcome:
          'You are half of a sexual relationship, including the health consequences. Shifting testing onto the other person is not chivalry — it is outsourcing a risk you both took.',
        better: 'Both of you test. Both of you use condoms. That is the deal.',
      },
    ],
  },
  {
    id: 'friend-pressures',
    chapter: 'Nudes',
    where: 'A friend\'s house',
    prompt: 'Your friend says: "Bro, just forward that photo. Everyone\'s already seen it."',
    takeaway: 'The only person who decides where an intimate image goes is the person in it.',
    choices: [
      {
        id: 'a',
        label: 'Refuse, and tell him plainly why.',
        tone: 'good',
        outcome:
          'Correct. You are not obligated to be the link in a chain that harms someone. One clear sentence — "That\'s not mine to share" — is enough, and you do not need to argue about it.',
      },
      {
        id: 'b',
        label: 'Send it to one person, since it is already out there.',
        tone: 'harmful',
        outcome:
          'It is not out there — you are the only reason it would be. Each person you send it to becomes another person who can screenshot it, and "one person" is always more than one person.',
        better: 'Not forwarding is the whole job. "Everyone has seen it" is never actually true.',
      },
      {
        id: 'c',
        label: 'Send it, since she sent it to me in the first place.',
        tone: 'harmful',
        outcome:
          'She sent it to you, not to the internet. Sharing an intimate image of someone without consent is an offence under the IT Act in India, and it is a betrayal of exactly the kind of trust a relationship is built on.',
        better: 'Consent to receive is not consent to distribute. Those are completely different permissions.',
      },
    ],
  },
  {
    id: 'horny-alone',
    chapter: 'Urges',
    where: 'Sunday night, no plans',
    prompt: 'You are extremely horny and you do not have a partner. It will not go away on its own.',
    takeaway: 'The urge is real, temporary, and not an emergency. It also does not get to decide anything.',
    choices: [
      {
        id: 'a',
        label: 'Masturbate, or do something else that takes my mind off it — both fine.',
        tone: 'good',
        outcome:
          'Both of these are legitimate. Masturbating is a normal sexual behaviour and not a moral event. Doing something else is also fine. What is not fine is letting the urge make decisions for you, or deciding it defines you.',
      },
      {
        id: 'b',
        label: 'Get on a video call with a random person, or message someone I like intensely.',
        tone: 'harmful',
        outcome:
          'An intense hookup with someone who did not choose you, or pressuring someone you like into something she has not agreed to, turns a private urge into someone else\'s problem. Heres the test: would you be comfortable if she did the exact same thing to you?',
        better: 'Release the pressure somewhere that involves nobody else\'s consent.',
      },
      {
        id: 'c',
        label: 'Sit with it, get out of the house, and go to sleep.',
        tone: 'good',
        outcome:
          'Also a completely reasonable answer. Urges are a physiological wave — they build, they peak, and they come down on their own, usually in minutes rather than hours. You do not have to fight one or feed one. You just have to outlast it.',
      },
    ],
  },
];

export const CONSENT_SCENARIOS: Scenario[] = [
  {
    id: 'stop-now',
    chapter: 'Consent',
    where: 'Scenario 01',
    prompt: 'You are kissing. She pulls back and says: "I don\'t want to go further."',
    takeaway: 'A clear "no" needs no interpretation. It needs a stop.',
    choices: [
      {
        id: 'a',
        label: 'Stop. Immediately, and without making it a big moment.',
        tone: 'good',
        outcome:
          'Correct. And doing it without sulking, bargaining or making her feel guilty is what separates a decent person from a nervous one. She will remember how you handled this far more than she will remember the kiss.',
      },
      {
        id: 'b',
        label: 'Ask why not, and see if I can change her mind.',
        tone: 'harmful',
        outcome:
          'You are not negotiating a contract. She does not owe you a reason, an explanation, or a second chance at the same moment. Pushing past a "no" is not persistence — it is pressure.',
        better: 'Stop. Later, in a normal conversation, you can ask if you did something wrong. Not mid-moment.',
      },
      {
        id: 'c',
        label: 'Keep going slowly, in case she changes her mind.',
        tone: 'harmful',
        outcome:
          'Continuing after a refusal is ignoring a refusal. There is no version of this where "she did not say stop again" counts as agreement, and silence after a no is not permission.',
        better: 'No means stop. It has never meant "keep trying quietly".',
      },
    ],
  },
  {
    id: 'withdrawn',
    chapter: 'Consent',
    where: 'Scenario 02',
    prompt: 'She said yes earlier tonight. Now, halfway through, she says: "Actually, I want to stop."',
    takeaway: 'Consent is a live signal, not a permanent contract signed once.',
    choices: [
      {
        id: 'a',
        label: 'Stop straight away.',
        tone: 'good',
        outcome:
          'Correct, with no caveats. Consent can be withdrawn at any time, for any reason, and it can be withdrawn after previously agreeing. A previous yes never overrides a current no.',
      },
      {
        id: 'b',
        label: 'Finish up quickly before she gets cold.',
        tone: 'harmful',
        outcome:
          'This is consent withdrawal being disregarded, which is a sexual offence. The "quickly" part changes the duration of the act, not whether it was permitted.',
        better: 'The current answer is the only answer that counts.',
      },
      {
        id: 'c',
        label: 'Get upset, because it feels like she is rejecting me.',
        tone: 'risky',
        outcome:
          'Your feelings are real and they are not her responsibility. Using them to make someone feel guilty for changing her mind is manipulation, and it makes the next time she is afraid to say no.',
        better: 'Take the stop cleanly. Talk about it later, separately, like adults.',
      },
    ],
  },
  {
    id: 'in-relationship',
    chapter: 'Consent',
    where: 'Scenario 03',
    prompt: 'You have been seeing each other for eight months. You have had sex many times.',
    takeaway: 'A relationship is not a subscription. It has to be renewed every single time.',
    choices: [
      {
        id: 'a',
        label: 'Still ask, every time, and treat "no" as a complete answer.',
        tone: 'good',
        outcome:
          'This is what a secure, mature relationship looks like. Being known does not create permanent permission. Comfort, history and trust are good reasons to ask — never substitutes for asking.',
      },
      {
        id: 'b',
        label: 'Assume it is fine now, since we are together.',
        tone: 'risky',
        outcome:
          'Long-term couples get into this trap constantly, and it is the reason many relationships quietly end badly. Assuming is not consent; it is just a habit you have not examined.',
        better: 'Ask anyway. It costs one sentence and keeps the trust that got you here.',
      },
      {
        id: 'c',
        label: 'Ask, but be annoyed if the answer is no.',
        tone: 'risky',
        outcome:
          'Asking and then being visibly upset still makes the other person responsible for your mood, which quietly pressures them into agreeing next time. Consent has to be *free* to be real.',
        better: 'Ask neutrally, accept the answer warmly, and move on.',
      },
    ],
  },
  {
    id: 'silence',
    chapter: 'Consent',
    where: 'Scenario 04',
    prompt: 'She does not say anything. She does not move away either. It is ambiguous.',
    takeaway: 'Silence is not agreement. If you have to ask, it was not a yes.',
    choices: [
      {
        id: 'a',
        label: 'Stop and ask out loud.',
        tone: 'good',
        outcome:
          'Exactly right. If the moment was ambiguous to you, it was ambiguous to her too. Asking is not awkward, it is competent, and it is what separates adults from people guessing.',
        better: '"Is this okay?" is a complete question. It does not need to be dressed up.',
      },
      {
        id: 'b',
        label: 'Take the lack of resistance as consent and continue.',
        tone: 'harmful',
        outcome:
          'This is the single most common misunderstanding in the whole subject. Not resisting is not the same as agreeing — people freeze, go blank, feel afraid, or simply do not know what to say. Guessing is how serious harm happens to good people.',
        better: 'Silence ≠ yes. If you are reading the situation, you are already too unsure to proceed.',
      },
      {
        id: 'c',
        label: 'Assume yes, but stay gentle and go slowly.',
        tone: 'harmful',
        outcome:
          'Being gentle does not convert a guess into consent. The care is real, but the permission is still missing, and pace is not the issue here — agreement is.',
        better: 'Stop. Ask. Wait for a clear answer.',
      },
    ],
  },
  {
    id: 'drunk',
    chapter: 'Consent',
    where: 'Scenario 05',
    prompt: 'You are at a party. She has had a lot to drink and is slurring, and she says yes.',
    takeaway: '"Yes" from someone who cannot meaningfully say yes is not consent.',
    choices: [
      {
        id: 'a',
        label: 'Do not have sex. Get her water, a seat, and help her get home safely.',
        tone: 'good',
        outcome:
          'Correct, and this is real work, not a lost opportunity. Someone who is heavily intoxicated cannot meaningfully give or withdraw consent, even if they appear enthusiastic. Helping them get home safely is the actual job tonight.',
      },
      {
        id: 'b',
        label: 'She said yes, so it is fine.',
        tone: 'harmful',
        outcome:
          'A "yes" from someone significantly intoxicated is not valid consent, and neither is taking advantage of it. This is one of the most serious things on this page, and it is also a situation where "she was drunk" is never a defence — for either of you.',
        better: 'Look after the person. That is the whole decision.',
      },
      {
        id: 'c',
        label: 'Wait until she seems more sober, then ask again.',
        tone: 'risky',
        outcome:
          'Better instinct, but it is still you making the call about how sober is sober enough. The clean rule is simpler: if you have to wonder whether she can give real consent, she cannot. Do not have sex.',
        better: 'Get her home. Ask again tomorrow, if you are still both interested.',
      },
    ],
  },
];
