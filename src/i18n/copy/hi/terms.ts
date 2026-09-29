/**
 * Hindi anatomical terms. Keys match the English file exactly — only the
 * values differ. Transliterations follow standard Indian medical usage.
 */
export const terms = {
  // ── पुरुष ──
  'term.testes': 'अंडकोष',
  'term.epididymis': 'एपिडिडिमिस',
  'term.vas': 'शुक्रवाहिनी',
  'term.bladder': 'मूत्राशय',
  'term.vesicles': 'शुक्राशय',
  'term.prostate': 'प्रोस्टेट',
  'term.urethra': 'मूत्रमार्ग',
  'term.penis': 'शुंआ',

  // ── महिला ──
  'term.ovaries': 'अंडाशय',
  'term.tubes': 'फैलोपियन नलिकाएँ',
  'term.uterus': 'गर्भाशय',
  'term.cervix': 'गर्भाशय मुख',
  'term.vagina': 'योनि',
  'term.vulva': 'वल्वा (बाहरी)',
  'term.clitoris': 'क्लिटोरिस',

  // ── निषेचन ──
  'term.sperm': 'शुक्राणु',
  'term.egg': 'अंडाणु',
  'term.embryo': 'भ्रूण',
  'term.uterineWall': 'गर्भाशय की भित्ति',

  // ── संचरण ──
  'term.transmission': 'संचरण का रास्ता',
  'term.barrier': 'कंडोम की बाधा',

  // ── चक्र के चरण ──
  'term.phasePeriod': 'मासिक धर्म',
  'term.phaseFollicular': 'फॉलिक्युलर',
  'term.phaseOvulation': 'ओव्यूलेशन',
  'term.phaseLuteal': 'ल्यूटियल',

  // ── फॉलबैक डायग्राम शीर्षक ──
  'frame.male': 'पुरुष प्रजनन शरीरक्रिया — योजनाबद्ध',
  'frame.female': 'महिला प्रजनन शरीरक्रिया — योजनाबद्ध',
  'frame.cycle': 'चक्र — योजनाबद्ध',
  'frame.journey': 'निषेचन से स्थापन तक — योजनाबद्ध',
  'frame.transmission': 'यौन संक्रमण का संचरण — योजनाबद्ध',
  'frame.arousal': 'इच्छा का वक्र — योजनाबद्ध',

  // ── डायग्राम में लिखे शब्द ──
  'svg.maleBladder': 'मूत्राशय',
  'svg.maleVesicles': 'शुक्राशय',
  'svg.maleVas': 'शुक्रवाहिनी',
  'svg.maleProstate': 'प्रोस्टेट',
  'svg.maleUrethra': 'मूत्रमार्ग',
  'svg.maleTestes': 'अंडकोष',
  'svg.maleEpididymis': 'एपिडिडिमिस',
  'svg.malePenis': 'शुंआ',

  'svg.femaleUterus': 'गर्भाशय',
  'svg.femaleOvary': 'अंडाशय',
  'svg.femaleTube': 'फैलोपियन नलिका',
  'svg.femaleCervix': 'गर्भाशय मुख',
  'svg.femaleVagina': 'योनि',
  'svg.femaleVulva': 'वल्वा (बाहरी)',
  'svg.femaleNotSame': 'यह एक ही चीज़ नहीं है',

  'svg.cycleLinear': 'सरलीकृत — असली चक्र बदलते हैं',

  'svg.journeyEgg': 'अंड',
  'svg.journeyOvum': 'अंडाणु',
  'svg.journeySpermLife': 'शुक्राणु ~5 दिन तक जीवित रहते हैं',
  'svg.journeyFertilisation': 'निषेचन',
  'svg.journeyImplants': 'भ्रूण स्थापित होता है',
  'svg.journeyInLining': 'गर्भाशय की परत में',

  'svg.transUnprotected': 'बिना सुरक्षा के संबंध — संचरण संभव',
  'svg.transCondom': 'कंडोम — जोखिम बहुत घटाता है',

  'svg.arousalPeak': 'शिखर',
  'svg.arousalTrigger': 'प्रेरक',
  'svg.arousalFalls': 'अपने आप गिर जाती है',

  // ── डायग्राम के aria-लेबल ──
  'alt.maleDiagram': 'पुरुष प्रजनन तंत्र का सरलीकृत लेबलयुक्त डायग्राम',
  'alt.femaleDiagram': 'महिला प्रजनन तंत्र का सरलीकृत लेबलयुक्त डायग्राम',
  'alt.cycleDiagram': 'मासिक धर्म चक्र के चरणों का सरलीकृत डायग्राम',
  'alt.journeyDiagram': 'शुक्राणु का अंड तक पहुँचना, निषेचन और स्थापन का डायग्राम',
  'alt.transmissionDiagram':
    'डायग्राम जिसमें संक्रमण दो लोगों के बीच जाता दिखता है और एक बाधा उसे रोकती है',
  'alt.arousalDiagram': 'ग्राफ जिसमें यौन इच्छा ऊपर उठती, शिखर पर पहुँचती और गिरती दिखती है',
} as const;
