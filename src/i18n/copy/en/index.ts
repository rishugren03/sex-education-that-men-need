import * as c1 from './chapters1';
import * as c2 from './chapters2';
import * as c3 from './chapters3';
import * as c4 from './chapters4';
import { meta } from './meta';
import { consentScenarios, scenarios } from './scenarios';
import { shared } from './shared';
import { terms } from './terms';
import type { Copy } from '../../types';

/** Source of truth. Every other locale is a partial overlay on this. */
export const EN: Copy = {
  shared,
  terms: terms as unknown as Record<string, string>,
  scenarios,
  consentScenarios,
  chapters: {
    intro: c1.intro,
    yourBody: c1.yourBody,
    herBody: c1.herBody,
    periods: c1.periods,
    attraction: c2.attraction,
    masturbation: c2.masturbation,
    publicBehavior: c2.publicBehavior,
    sex: c2.sex,
    consent: c3.consent,
    pregnancy: c3.pregnancy,
    contraception: c3.contraception,
    stis: c3.stis,
    porn: c4.porn,
    nudes: c4.nudes,
    relationships: c4.relationships,
    scenariosChapter: c4.scenariosChapter,
    end: c4.end,
  },
};

export { meta, shared, terms, scenarios, consentScenarios };
