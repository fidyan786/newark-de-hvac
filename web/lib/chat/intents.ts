import { COMMUNITY_PAGES, zipLists } from "./config";
import type { Detected, Intent } from "./types";

export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bisn't\b/g, "is not")
    .replace(/\baren't\b/g, "are not")
    .replace(/\bdoesn't\b/g, "does not")
    .replace(/\bdidn't\b/g, "did not")
    .replace(/\bwasn't\b/g, "was not")
    .replace(/\bit's\b/g, "it is")
    .replace(/\bi'm\b/g, "i am")
    .replace(/\bthere's\b/g, "there is")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

const SAFETY =
  /\b(gas leak|smell gas|smells like gas|natural gas odor|carbon monoxide|\bco alarm\b|co detector|smoke in the|smell smoke|smoke coming|visible smoke|smoke alarm|on fire|house (?:is )?on fire|house fire|\bfire(?!place)\b|electrical (?:spark|fire|danger)|sparking|burning electrical|smell(s)? burnt|burning smell|gas smell|smell of gas|immediate (?:danger|emergency))\b/;

const PRICING =
  /\b(how much|what(?: is|'s) the (?:cost|price)|cost of|price of|pricing|estimate|quote|financing|payment plan|discount|coupon|\$\d)\b/;

const REVIEWS = /\b(reviews?|testimonials?|rating|stars|bbb|nate|licensed|license number|years in business|award|guarantee|warranty)\b/;

const AVAILABILITY =
  /\b(come out today|same day|someone today|available today|24\/7|twenty four|after hours|tonight|right now can you come)\b/;

function score(n: string, tests: { intent: Intent; re: RegExp; w: number }[]) {
  let best: { intent: Intent; w: number } | null = null;
  for (const t of tests) {
    if (t.re.test(n) && (!best || t.w > best.w)) best = { intent: t.intent, w: t.w };
  }
  return best;
}

export function detect(raw: string): Detected {
  const n = normalize(raw);
  const empty: Detected = {
    intent: "UNKNOWN",
    highIntent: false,
    wantsService: false,
    safety: false,
    pricingAsk: false,
    reviewsAsk: false,
    availabilityAsk: false,
    infoAsk: false,
    zip: extractZip(raw),
    phone: extractPhone(raw),
    name: extractName(raw),
    city: null,
    cityKnown: null,
    systemStatus: null,
    scope: null,
    equipment: null,
  };

  if (!n) return empty;

  if (SAFETY.test(n)) {
    return { ...empty, intent: "EMERGENCY", safety: true, highIntent: true, wantsService: true };
  }

  const area = detectArea(n);
  if (area) {
    return { ...empty, intent: "SERVICE_AREA", city: area.city, cityKnown: area.known };
  }

  if (PRICING.test(n)) empty.pricingAsk = true;
  if (REVIEWS.test(n) && /\b(your|do you have|can i see|rating|stars|bbb|nate|licensed|guarantee|warranty|years in)\b/.test(n)) {
    empty.reviewsAsk = true;
  }
  if (AVAILABILITY.test(n) || /\b(can someone come|send (a |someone |a tech)|come out)\b/.test(n)) {
    empty.availabilityAsk = true;
  }

  if (/\b(call (you|now|me)|phone number|what(?: is|'s) your (?:number|phone)|how do i (call|contact)|contact you)\b/.test(n)) {
    return { ...empty, intent: "CONTACT", highIntent: true };
  }
  if (/\b(request service|schedule (a )?(visit|service)|book (a )?(visit|service)|set up (a )?service)\b/.test(n)) {
    return { ...empty, intent: "REQUEST_SERVICE", highIntent: true, wantsService: true };
  }

  empty.systemStatus = detectStatus(n);
  empty.scope = detectScope(n);
  empty.equipment = detectEquipment(n);

  const install = /\b(install|installation|replace|replacement|new system|need a new|looking (at|for) a new)\b/.test(n);
  const maintain = /\b(maintenance|tune-?up|checkup|check-up|filter change|seasonal service)\b/.test(n);

  const ranked = score(n, [
    { intent: "COMMERCIAL_HVAC", re: /\b(commercial|office|retail|shop|storefront|property manager|rental building|rooftop unit)\b/, w: 80 },
    { intent: "MINI_SPLIT", re: /\b(mini ?split|mini-split)\b/, w: 78 },
    { intent: "DUCTLESS", re: /\bductless\b/, w: 76 },
    { intent: "DUCTWORK", re: /\b(ductwork|air duct|duct clean|vents are dirty|disconnected return)\b/, w: 74 },
    { intent: "HUMIDITY", re: /\b(humidit|too dry|too sticky|dehumidifier|humidifier)\b/, w: 70 },
    { intent: "AIR_FILTRATION", re: /\b(air filter|filtration|hepa|air purifier)\b/, w: 70 },
    { intent: "INDOOR_AIR_QUALITY", re: /\b(indoor air|air quality|dusty air|musty air|stale air)\b/, w: 68 },
    { intent: "HEAT_PUMP_INSTALLATION", re: /\bheat pumps?\b/, w: install ? 86 : 0 },
    { intent: "HEAT_PUMP_MAINTENANCE", re: /\bheat pumps?\b/, w: maintain ? 84 : 0 },
    { intent: "HEAT_PUMP_REPAIR", re: /\bheat pumps?\b/, w: 72 },
    { intent: "AC_INSTALLATION", re: /\b(air condition|\bac\b|a\/c|cooling system)\b/, w: install ? 85 : 0 },
    { intent: "AC_MAINTENANCE", re: /\b(air condition|\bac\b|a\/c)\b/, w: maintain ? 83 : 0 },
    { intent: "AC_REPLACEMENT", re: /\b(air condition|\bac\b|a\/c)\b/, w: /\breplace/.test(n) ? 84 : 0 },
    { intent: "AC_REPAIR", re: /\b(air condition|\bac\b|a\/c|not cooling|blowing warm|warm air|no (cool|cold)|condenser|central air|house is not getting cool|is not getting cool)\b/, w: 75 },
    { intent: "FURNACE_INSTALLATION", re: /\bfurnace\b/, w: install ? 85 : 0 },
    { intent: "FURNACE_MAINTENANCE", re: /\bfurnace\b/, w: maintain ? 83 : 0 },
    { intent: "FURNACE_REPLACEMENT", re: /\bfurnace\b/, w: /\breplace/.test(n) ? 84 : 0 },
    { intent: "FURNACE_REPAIR", re: /\b(furnace|no heat|not heating|will not (start|ignite)|heater)\b/, w: 74 },
    { intent: "HEATING_REPAIR", re: /\b(heating|heat is not|no heat|house is cold)\b/, w: 66 },
    { intent: "HVAC_MAINTENANCE", re: /\b(maintenance|tune-?up|seasonal (checkup|check-up))\b/, w: maintain ? 64 : 0 },
    { intent: "HVAC_REPLACEMENT", re: /\b(new hvac|hvac (system|replacement|install)|replace (the )?(system|hvac)|whole system)\b/, w: 82 },
    { intent: "HVAC_REPAIR", re: /\b(hvac|system will not|system is not working)\b/, w: 60 },
    { intent: "EMERGENCY", re: /\b(emergency|no heat and|no cooling and|completely down)\b/, w: 62 },
  ]);

  if (empty.pricingAsk && !ranked) {
    return { ...empty, intent: "PRICING" };
  }

  let intent: Intent = ranked?.intent || (empty.pricingAsk ? "PRICING" : "UNKNOWN");
  if (intent === "UNKNOWN" && /\b(hvac|heating or cooling|my system)\b/.test(n)) intent = "GENERAL_QUESTION";
  if (intent === "UNKNOWN" && /\b(what (do you|services)|help with my)\b/.test(n)) intent = "GENERAL_QUESTION";

  const highIntent =
    /\b(i need someone|need a technician|need a tech|come (out|over)|fix my|send someone|please (come|send|fix)|can you (come|send|fix)|need (it|this) (fixed|repaired))\b/.test(
      n
    ) ||
    empty.systemStatus === "off" ||
    Boolean(empty.availabilityAsk);
  const wantsService =
    highIntent ||
    /\b(request service|schedule|book|i want (service|someone)|need service)\b/.test(n) ||
    install;

  const infoAsk = /\b(do you (service|do|offer|handle|work on|install)|can you (service|do|handle|install))\b/.test(n);
  if (infoAsk) {
    empty.infoAsk = true;
  }

  return {
    ...empty,
    intent,
    highIntent,
    wantsService,
    equipment: empty.equipment || equipmentFromIntent(intent),
  };
}

function equipmentFromIntent(intent: Intent): Detected["equipment"] {
  if (intent.startsWith("AC_")) return "ac";
  if (intent.startsWith("FURNACE") || intent === "HEATING_REPAIR") return "furnace";
  if (intent.startsWith("HEAT_PUMP")) return "heat_pump";
  if (intent === "DUCTLESS" || intent === "MINI_SPLIT") return "ductless";
  if (intent === "COMMERCIAL_HVAC") return "commercial";
  if (intent === "DUCTWORK") return "ducts";
  if (intent === "INDOOR_AIR_QUALITY" || intent === "AIR_FILTRATION" || intent === "HUMIDITY") return "iaq";
  if (intent.startsWith("HVAC")) return "hvac";
  return null;
}

function detectStatus(n: string): Detected["systemStatus"] {
  if (/\b(will not turn on|will not start|not turning on|completely dead|does not start|stopped working)\b/.test(n)) return "off";
  if (/\b(running but|runs but|on but not)\b/.test(n)) return "running_warm";
  if (/\b(still cooling|still heating|cooling normally)\b/.test(n)) return "running_ok";
  return null;
}

function detectScope(n: string): Detected["scope"] {
  if (/\b(throughout|whole (house|home)|every room|all (the )?rooms)\b/.test(n)) return "whole";
  if (/\b(one (room|area|zone)|only (one|the) (room|upstairs|downstairs)|just (the )?(bedroom|office|upstairs))\b/.test(n)) {
    return "one";
  }
  return null;
}

function detectEquipment(n: string): Detected["equipment"] {
  if (/\bheat pumps?\b/.test(n)) return "heat_pump";
  if (/\b(mini ?split|ductless)\b/.test(n)) return "ductless";
  if (/\bfurnace\b/.test(n)) return "furnace";
  if (/\b(air condition|\bac\b|a\/c|condenser)\b/.test(n)) return "ac";
  return null;
}

function detectArea(n: string): { city: string; known: boolean } | null {
  const asks =
    /\b(do you (service|cover|come to|work in)|are you in|service in|come to|out in|near)\b/.test(n) ||
    /\b(service area|in your area)\b/.test(n);
  const lists = zipLists();
  const names = [
    "pike creek",
    "new castle",
    "hockessin",
    "christiana",
    "brookside",
    "ogletown",
    "glasgow",
    "newark",
    "bear",
  ];
  for (const city of names) {
    if (n.includes(city) && (asks || COMMUNITY_PAGES[city])) {
      if (asks || /\b(in|at|from|around|near)\b/.test(n)) {
        const known = lists.communities.some((c) => c.toLowerCase() === city);
        if (asks) return { city, known };
      }
    }
  }
  if (!asks) return null;
  const m = n.match(/\b(?:in|to|around|near)\s+([a-z][a-z\s]{2,24})\b/);
  if (m) {
    const city = m[1].replace(/\bde\b/, "").trim();
    if (!city) return null;
    const known = lists.communities.some((c) => c.toLowerCase() === city);
    return { city, known };
  }
  return null;
}

export function extractZip(text: string) {
  const m = text.match(/\b(197\d{2})\b/) || text.match(/\b(\d{5})\b/);
  return m ? m[1] : null;
}

export function extractPhone(text: string) {
  const m = text.match(/(?:\+?1[-.\s]?)?\(?([2-9]\d{2})\)?[-.\s]?([2-9]\d{2})[-.\s]?(\d{4})/);
  if (!m) return null;
  if (m[2] === "555" && /^01\d{2}$/.test(m[3])) return null;
  return `(${m[1]}) ${m[2]}-${m[3]}`;
}

export function extractName(text: string) {
  const m = text.match(/\b(?:my name is|this is|name[:\s]+)\s*([A-Za-z][A-Za-z.'-]{1,30}(?:\s+[A-Za-z][A-Za-z.'-]{1,30})?)/i);
  return m ? m[1].trim() : null;
}

export function isShortNo(n: string) {
  return /^(no|nope|nah|not really|it is not|it does not|negative)$/.test(n);
}

export function isShortYes(n: string) {
  return /^(yes|yeah|yep|yup|it is|it does|correct|right)$/.test(n);
}

export function isShortUnsure(n: string) {
  return /^(not sure|unsure|i do not know|idk|maybe)$/.test(n);
}
