/**
 * Anatomical terms, keyed by the stable ids used in the 3D scenes and the
 * WebGL-less fallback diagrams. Keep the English keys — only the values change.
 */
export const terms = {
  // ── Male ──
  'term.testes': 'Testes',
  'term.epididymis': 'Epididymis',
  'term.vas': 'Vas deferens',
  'term.bladder': 'Bladder',
  'term.vesicles': 'Seminal vesicles',
  'term.prostate': 'Prostate',
  'term.urethra': 'Urethra',
  'term.penis': 'Penis',

  // ── Female ──
  'term.ovaries': 'Ovaries',
  'term.tubes': 'Fallopian tubes',
  'term.uterus': 'Uterus',
  'term.cervix': 'Cervix',
  'term.vagina': 'Vagina',
  'term.vulva': 'Vulva (external)',
  'term.clitoris': 'Clitoris',

  // ── Fertilisation ──
  'term.sperm': 'Sperm',
  'term.egg': 'Egg (ovum)',
  'term.embryo': 'Embryo',
  'term.uterineWall': 'Uterine wall',

  // ── Transmission ──
  'term.transmission': 'Transmission path',
  'term.barrier': 'Condom barrier',

  // ── Cycle phases ──
  'term.phasePeriod': 'Menstruation',
  'term.phaseFollicular': 'Follicular',
  'term.phaseOvulation': 'Ovulation',
  'term.phaseLuteal': 'Luteal',

  // ── Fallback diagram frame titles ──
  'frame.male': 'Male reproductive anatomy — schematic',
  'frame.female': 'Female reproductive anatomy — schematic',
  'frame.cycle': 'The cycle — schematic',
  'frame.journey': 'Fertilisation to implantation — schematic',
  'frame.transmission': 'STI transmission — schematic',
  'frame.arousal': 'The urge curve — schematic',

  // ── Fallback diagram body text ──
  'svg.maleBladder': 'BLADDER',
  'svg.maleVesicles': 'VESICLES',
  'svg.maleVas': 'VAS DEFERENS',
  'svg.maleProstate': 'PROSTATE',
  'svg.maleUrethra': 'URETHRA',
  'svg.maleTestes': 'TESTES',
  'svg.maleEpididymis': 'EPIDIDYMIS',
  'svg.malePenis': 'PENIS',

  'svg.femaleUterus': 'UTERUS',
  'svg.femaleOvary': 'OVARY',
  'svg.femaleTube': 'FALLOPIAN TUBE',
  'svg.femaleCervix': 'CERVIX',
  'svg.femaleVagina': 'VAGINA',
  'svg.femaleVulva': 'VULVA (EXTERNAL)',
  'svg.femaleNotSame': 'NOT THE SAME THING',

  'svg.cycleLinear': 'LINEARISED — REAL CYCLES VARY',

  'svg.journeyEgg': 'EGG',
  'svg.journeyOvum': 'OVUM',
  'svg.journeySpermLife': 'SPERM SURVIVE UP TO ~5 DAYS',
  'svg.journeyFertilisation': 'FERTILISATION',
  'svg.journeyImplants': 'EMBRYO IMPLANTS',
  'svg.journeyInLining': 'IN UTERINE LINING',

  'svg.transUnprotected': 'UNPROTECTED SEX — TRANSMISSION POSSIBLE',
  'svg.transCondom': 'CONDOM — SUBSTANTIALLY REDUCES RISK',

  'svg.arousalPeak': 'PEAK',
  'svg.arousalTrigger': 'TRIGGER',
  'svg.arousalFalls': 'FALLS ON ITS OWN',

  // ── Fallback svg aria-labels ──
  'alt.maleDiagram': 'Simplified labelled diagram of the male reproductive system',
  'alt.femaleDiagram': 'Simplified labelled diagram of the female reproductive system',
  'alt.cycleDiagram': 'Simplified diagram of the menstrual cycle phases',
  'alt.journeyDiagram': 'Diagram of sperm travelling to the egg, fertilisation and implantation',
  'alt.transmissionDiagram':
    'Diagram showing an infection passing between two people and a barrier blocking it',
  'alt.arousalDiagram': 'Graph showing a sexual urge rising, peaking and falling on its own',
} as const;
