import { PHOTOS, serviceHref } from "./paths";

export type Faq = { q: string; a: string };

export type ServiceContent = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lede: string;
  image: string;
  imageAlt: string;
  category: "cooling" | "heating" | "heat-pumps" | "ductless" | "iaq" | "commercial" | "emergency" | "systems";
  problems: string[];
  includes: string[];
  signs: string[];
  why: string;
  local: string;
  process: { title: string; text: string }[];
  faqs: Faq[];
  related: { href: string; label: string; text: string }[];
};

function rel(slug: string, label: string, text: string) {
  return { href: serviceHref(slug), label, text };
}

export const services: ServiceContent[] = [
  {
    slug: "ac-repair-newark-de",
    category: "cooling",
    title: "AC Repair in Newark, DE | Newark HVAC Pros",
    description:
      "Air conditioning repair in Newark, Delaware for systems that blow warm air, freeze up, or will not start. Serving 19702, 19711, 19713, 19725 and nearby New Castle County.",
    h1: "AC Repair in Newark, DE",
    eyebrow: "Cooling service",
    lede: "When a Newark house runs the air conditioner all afternoon and still feels sticky, the problem is rarely “just turn it colder.” Humidity along campus streets and west-facing rooms will expose a weak condenser fast.",
    image: PHOTOS.ac,
    imageAlt: "Outdoor air-conditioning condenser beside a residential wall",
    problems: [
      "Supply air that feels warm or only slightly cool on a humid afternoon",
      "Outdoor unit silent, humming, or clicking without starting",
      "Ice on the copper lines or the indoor coil",
      "Water around the furnace closet, air handler, or ceiling below a drain pan",
      "Rooms on the west side much hotter than the rest of the house",
      "Short cycling — on and off every few minutes",
    ],
    includes: [
      "Electrical checks on capacitors, contactors, and the outdoor fan",
      "Filter and airflow inspection at the indoor cabinet",
      "Condensate drain and pan review",
      "Temperature split across the coil",
      "A plain recommendation: repair, watch, or replace",
    ],
    signs: [
      "Musty smell at startup after the system sat unused",
      "Breaker that trips when the condenser kicks on",
      "Thermostat calling for cool with no outdoor response",
    ],
    why: "A condenser that “kind of cools” still leaves indoor humidity high. In mixed-humid New Castle County that is the difference between a livable house and a sticky one. Repair starts with diagnosis, not a guess from the driveway.",
    local: "Many Newark houses date to the 1970s. Second-generation condensers from the 1990s and 2000s are now in the failure window — especially 19711 campus-area rentals and 19702 family streets toward Glasgow.",
    process: [
      { title: "Describe the symptom", text: "Not cooling, leaking, icing, or will not start — and the ZIP." },
      { title: "Inspect on site", text: "Electrical, airflow, and coil conditions come before any parts talk." },
      { title: "Explain the options", text: "You hear what failed and whether repair still makes sense." },
      { title: "Approve the work", text: "Repair continues only after you say so." },
    ],
    faqs: [
      {
        q: "Why is the AC running if the house still feels humid?",
        a: "Dirty filters, clogged outdoor coils, airflow problems, and failing electrical parts are common. Humidity makes a small temperature miss feel like the system is dead.",
      },
      {
        q: "Do you service rentals near the University of Delaware?",
        a: "Yes, with owner or property-manager approval and a working on-site contact.",
      },
      {
        q: "Should I keep resetting the breaker?",
        a: "No. A breaker that will not stay on is a stop-and-call situation, not a DIY loop.",
      },
    ],
    related: [
      rel("ac-installation-newark-de", "AC Installation", "When repair is no longer the useful path."),
      rel("ac-maintenance-newark-de", "AC Maintenance", "Spring checkups before peak cooling."),
      rel("emergency-ac-repair-newark-de", "Emergency AC Repair", "No cooling during a heat and humidity spike."),
    ],
  },
  {
    slug: "ac-installation-newark-de",
    category: "cooling",
    title: "AC Installation in Newark, DE | Newark HVAC Pros",
    description:
      "Air conditioner installation in Newark, DE. Right-sized cooling for New Castle County homes dealing with humid summers, older ducts, and mixed housing stock.",
    h1: "AC Installation in Newark, DE",
    eyebrow: "New cooling systems",
    lede: "A replacement condenser is not a catalog pick. Newark homes need equipment matched to humidity, ductwork, and how the house is actually used — including student rentals and 1970s ranches.",
    image: PHOTOS.acClose,
    imageAlt: "Close view of outdoor condenser coils during cooling installation",
    problems: [
      "Repair quotes stacking up on an aging outdoor unit",
      "Rooms that never catch up on humid afternoons",
      "A condenser using obsolete refrigerant",
      "Ducts that were never resized after a remodel",
    ],
    includes: [
      "A load-aware equipment discussion — not a one-size outdoor unit",
      "Look at existing ductwork and electrical",
      "Installation of the outdoor unit and matching indoor coil when needed",
      "Startup, charging, and a walkthrough of the thermostat",
    ],
    signs: [
      "The outdoor unit is original to a 1990s or early-2000s install",
      "Ice events keep returning after refrigerant “top-offs”",
      "You are already planning electrical or window work",
    ],
    why: "Oversized cooling short-cycles and leaves humidity behind. Undersized cooling never catches up on a Newark July afternoon. Sizing matters more than a brand name on the cabinet.",
    local: "Christiana-area infill, Pike Creek wooded lots, and Brookside ranches all behave differently. Tree cover, west-facing glass, and leaky returns change the job.",
    process: [
      { title: "Call", text: "Age of the system and the rooms that struggle." },
      { title: "Evaluate", text: "House, ducts, and electrical — not just the old model number." },
      { title: "Propose", text: "You see the recommended system and what it will and will not solve." },
      { title: "Install", text: "Crews set, connect, and start the equipment after you approve." },
    ],
    faqs: [
      {
        q: "Do I need new ducts with a new air conditioner?",
        a: "Not always. Returns and trunks are inspected first. Many Newark homes need sealing or a return upgrade more than a larger outdoor unit.",
      },
      {
        q: "Can you replace only the outdoor unit?",
        a: "Sometimes. Mismatched coils and refrigerants are a common reason a cheap outdoor swap performs poorly.",
      },
    ],
    related: [
      rel("ac-repair-newark-de", "AC Repair", "When the current system can still be saved."),
      rel("ac-replacement-newark-de", "AC Replacement", "Cooling-only changeouts."),
      rel("ductless-mini-split-newark-de", "Ductless Mini Splits", "For rooms the ducts never reached."),
    ],
  },
  {
    slug: "ac-replacement-newark-de",
    category: "cooling",
    title: "AC Replacement in Newark, DE | Newark HVAC Pros",
    description:
      "Air conditioner replacement in Newark, Delaware when the outdoor unit and indoor coil are both due. Cooling changeouts for New Castle County homes — not a warehouse boxed pair.",
    h1: "AC Replacement in Newark, DE",
    eyebrow: "Cooling changeouts",
    lede: "Replacement is the honest conversation when the condenser is tired, the coil is mismatched, or repair would only buy another humid summer. This page is about cooling-only changeouts, not a full furnace-and-AC package unless that is what the house needs.",
    image: PHOTOS.ac,
    imageAlt: "Residential outdoor cooling equipment ready for replacement",
    problems: [
      "Repeated AC repairs in a single cooling season",
      "Indoor coil and outdoor unit that were never a matched pair",
      "Cooling that cannot keep up even after a recent repair",
      "An outdoor cabinet rusted through or noisy enough to bother neighbors",
    ],
    includes: [
      "Inspection of the outdoor unit, indoor coil, and shared ducts",
      "Discussion of whether the furnace or air handler should stay",
      "Replacement of the cooling equipment you approve",
      "Startup and a clear explanation of what changed",
    ],
    signs: [
      "The AC is a generation older than the furnace, or the reverse",
      "Refrigerant leaks that keep coming back",
      "You want cooling addressed now and heat left alone until winter",
    ],
    why: "Replacing cooling without looking at the indoor coil is how Newark houses end up with a new box that still cannot dry the air. The replacement should be a system, even when the furnace stays.",
    local: "19711 rentals often get the cheapest outdoor swap that will “make it through August.” 19702 and Pike Creek owners usually want the coil and condenser treated as one job. Both are valid — they are not the same scope.",
    process: [
      { title: "Call", text: "What failed, how old the outdoor unit is, and whether heat still works." },
      { title: "Inspect", text: "Coil match, ducts, and electrical — not a driveway quote from the model number." },
      { title: "Recommend", text: "Cooling-only replacement, or a paired HVAC changeout if heat is also due." },
      { title: "Replace", text: "After you approve the path." },
    ],
    faqs: [
      {
        q: "Is AC replacement the same as HVAC replacement?",
        a: "No. This page is cooling equipment. Full heating-and-cooling changeouts are a separate conversation when both sides are genuinely due.",
      },
      {
        q: "Will a new AC fix uneven rooms?",
        a: "Only if the ducts and returns can move the air. Replacement will not magically cool a closed-off addition.",
      },
    ],
    related: [
      rel("ac-installation-newark-de", "AC Installation", "New cooling when you are starting from a failed unit."),
      rel("hvac-replacement-newark-de", "HVAC Replacement", "When heat and cooling should come out together."),
      rel("ac-repair-newark-de", "AC Repair", "If the current condenser can still be saved."),
    ],
  },
  {
    slug: "ac-maintenance-newark-de",
    category: "cooling",
    title: "AC Maintenance in Newark, DE | Newark HVAC Pros",
    description:
      "Air conditioning maintenance in Newark, DE — spring cooling checkups for New Castle County homes before humid weather loads the outdoor unit.",
    h1: "AC Maintenance in Newark, DE",
    eyebrow: "Cooling checkups",
    lede: "A cooling checkup is not a promise that nothing will fail in July. It is a chance to catch a weak capacitor, a dirty coil, or a clogged drain before the first stretch of 90-degree weather.",
    image: PHOTOS.tools,
    imageAlt: "Service tools used during an air-conditioning maintenance visit",
    problems: [
      "The outdoor unit has not been opened since last year’s emergency call",
      "Filters ignored through a rental turnover",
      "You want the system looked at before you leave town",
    ],
    includes: [
      "Filter and indoor airflow review",
      "Outdoor coil and fan inspection",
      "Condensate drain check",
      "A punch list of what can wait and what should not",
    ],
    signs: [
      "Last summer’s small noise is now a large noise",
      "The filter is gray and bowed",
      "You cannot remember the last professional cooling visit",
    ],
    why: "Delaware summers are humid, not just hot. A neglected condenser that still “turns on” can run for weeks without actually drying the house.",
    local: "Spring visits matter most in 19711 and 19702, where outdoor units sit in leaf debris and rental filters go untouched between tenants.",
    process: [
      { title: "Request a cooling checkup", text: "Say AC maintenance and the ZIP." },
      { title: "Visit", text: "We inspect, test, and note anything that needs a follow-up." },
      { title: "Review", text: "You get the findings without a scare script." },
    ],
    faqs: [
      {
        q: "Is this a membership club?",
        a: "Not unless a real plan is published later. You can request a cooling checkup as a one-time visit.",
      },
      {
        q: "When should Newark homes schedule AC maintenance?",
        a: "Before cooling season — typically spring — so the outdoor unit is clean and the drain is open before humidity spikes.",
      },
    ],
    related: [
      rel("ac-repair-newark-de", "AC Repair", "When cooling already failed."),
      rel("hvac-maintenance-newark-de", "HVAC Maintenance", "Heating and cooling checkups together."),
      rel("indoor-air-quality-newark-de", "Indoor Air Quality", "Filters and humidity beyond a basic visit."),
    ],
  },
  {
    slug: "emergency-ac-repair-newark-de",
    category: "emergency",
    title: "Emergency AC Repair in Newark, DE | Newark HVAC Pros",
    description:
      "Emergency air conditioning repair in Newark, Delaware when there is no cooling during heat and humidity. Serving New Castle County homes and rentals.",
    h1: "Emergency AC Repair in Newark, DE",
    eyebrow: "No cooling",
    lede: "A silent outdoor unit on a humid Newark afternoon is not a wait-and-see project if older adults, infants, or a packed rental are in the house. Tell us the ZIP and the symptom. We will help you decide what to do next.",
    image: PHOTOS.hero,
    imageAlt: "Technician inspecting refrigerant lines on an outdoor cooling unit",
    problems: [
      "No air conditioning during a heat and humidity spike",
      "The system will not start after several tries",
      "Water around the air handler or ice on the indoor coil",
      "A breaker that will not stay on for the condenser",
    ],
    includes: [
      "A conversation about ZIP, symptoms, and whether the home is safe to occupy",
      "Guidance on what to shut off if you see standing water",
      "Scheduling the next available technician for your Newark-area address",
      "Repair versus replacement explained after inspection",
    ],
    signs: [
      "Outdoor unit silent or humming without starting",
      "No airflow in any room",
      "The house is gaining heat faster than fans can help",
    ],
    why: "Newark summers load both temperature and moisture. A failed AC is a comfort problem and, in extreme heat, a health problem. This page is for cooling emergencies — heating emergencies are a different call.",
    local: "Calls cluster in 19711 near campus, 19702 toward Glasgow, and west-facing rooms that bake after 3 p.m. Timing is confirmed when the team follows up — this site does not publish same-day guarantees.",
    process: [
      { title: "Call", text: "Share the ZIP and that cooling has stopped." },
      { title: "Stay safe", text: "Drink water, use a fan if you have power, and do not keep resetting a tripped breaker." },
      { title: "Inspect", text: "A technician diagnoses the equipment on site." },
      { title: "You decide", text: "You hear the options before work continues." },
    ],
    faqs: [
      {
        q: "Is this a 24-hour dispatch line?",
        a: "Call or request service and we will tell you the next available window. After-hours coverage is listed here only when it is confirmed.",
      },
      {
        q: "What should I do while I wait?",
        a: "Stay hydrated, close blinds on west glass, and avoid ovens. If you smell gas, that is a heating/fuel issue — leave and contact the utility or 911.",
      },
    ],
    related: [
      rel("ac-repair-newark-de", "AC Repair", "Standard cooling diagnosis when it is not an emergency."),
      rel("emergency-hvac-newark-de", "Emergency HVAC", "When heat or cooling — or both — are down."),
      rel("hvac-repair-newark-de", "HVAC Repair", "Whole-system problems that are not cooling-only."),
    ],
  },
  {
    slug: "furnace-repair-newark-de",
    category: "heating",
    title: "Furnace Repair in Newark, DE | Newark HVAC Pros",
    description:
      "Furnace repair in Newark, DE for no-heat calls, short cycling, and ignition problems on gas and oil systems common in New Castle County homes.",
    h1: "Furnace Repair in Newark, DE",
    eyebrow: "Heating service",
    lede: "January nights in Newark are cold enough that a furnace that will not ignite is not a wait-until-Monday inconvenience. Gas and oil systems are both common on older streets.",
    image: PHOTOS.furnace,
    imageAlt: "Mechanical room and electrical inspection during furnace diagnosis",
    problems: [
      "No heat, or heat that dies after a few minutes",
      "Furnace blower running with no flame",
      "Repeated clicking at the ignitor",
      "Unusual dust or a sharp odor at startup",
      "Pilot or ignition issues on older equipment",
    ],
    includes: [
      "Ignition, flame sensor, and safety switch checks",
      "Filter, blower, and limit switch review",
      "Venting and combustion-air look-over on fuel-fired units",
      "A clear next step: repair, further testing, or replacement talk",
    ],
    signs: [
      "Thermostat batteries were replaced and still nothing happens",
      "The furnace starts then shuts down on a limit",
      "You hear the inducer but never get heat",
    ],
    why: "Fuel-fired heat needs respect. Odors, soot, or a carbon monoxide alarm are stop-and-evacuate situations — not internet fixes.",
    local: "Oil heat still shows up in older New Castle County stock. Gas furnaces are the majority on post-1970 streets. Both fail on the coldest nights for the same reason: they finally took a real load.",
    process: [
      { title: "Call", text: "Say no heat, ZIP, and fuel type if you know it (gas or oil)." },
      { title: "Safe shutdown", text: "If you smell gas, leave and call the utility." },
      { title: "Diagnose", text: "Ignition, airflow, and safety circuits come first." },
      { title: "Approve", text: "You choose the repair path before parts go in." },
    ],
    faqs: [
      {
        q: "The blower runs but the house stays cold. What is that?",
        a: "Often ignition, a dirty flame sensor, or a limit trip from airflow. It is a service call, not a thermostat guess.",
      },
      {
        q: "Can I keep pressing reset?",
        a: "No. Repeated resets can lock out the board or hide a venting issue.",
      },
    ],
    related: [
      rel("furnace-installation-newark-de", "Furnace Installation", "When the heat exchanger or cabinet is done."),
      rel("emergency-heating-newark-de", "Emergency Heating", "No heat in cold weather."),
      rel("furnace-maintenance-newark-de", "Furnace Maintenance", "Fall checkups before the first freeze."),
    ],
  },
  {
    slug: "furnace-installation-newark-de",
    category: "heating",
    title: "Furnace Installation in Newark, DE | Newark HVAC Pros",
    description:
      "Furnace installation in Newark, DE for homes replacing aging gas or oil heat. Sized for New Castle County winters, not a generic catalog unit.",
    h1: "Furnace Installation in Newark, DE",
    eyebrow: "New heating systems",
    lede: "A new furnace should match the house: duct size, chimney or PVC venting, and how cold a Newark January actually gets — not the largest cabinet that fits the closet.",
    image: PHOTOS.furnaceVent,
    imageAlt: "Furnace venting and heating equipment in a mechanical space",
    problems: [
      "Repeated no-heat repairs on the same furnace",
      "A cracked heat exchanger concern",
      "Oil-to-gas or efficiency conversations after a failed season",
      "Uneven heat that a “bigger furnace” will not magically fix",
    ],
    includes: [
      "Review of venting, fuel piping or oil accessories, and electrical",
      "Equipment recommendation matched to the home",
      "Installation, startup, and thermostat confirmation",
      "What to watch in the first week of heat",
    ],
    signs: [
      "The furnace is original to a 1990s remodel",
      "Soot, rust-through, or a heat exchanger flag",
      "You are already replacing the AC and the pair should match",
    ],
    why: "Heat and cooling share ducts in most Newark homes. Installing a furnace in isolation from the air conditioner often creates a system that fights itself.",
    local: "Pike Creek and Hockessin homes often have more zone complexity. Brookside and Ogletown ranches are simpler boxes with leakier trunks. The install should reflect that.",
    process: [
      { title: "Call", text: "Age of the furnace, fuel type, and the rooms that stay cold." },
      { title: "Inspect", text: "Closet, venting, and ducts — not just the data plate." },
      { title: "Propose", text: "You see the recommended furnace and any duct notes." },
      { title: "Install", text: "Set, vent, start, and walk through operation." },
    ],
    faqs: [
      {
        q: "Should heating and cooling be replaced together?",
        a: "Often yes if both are near end of life. Not always. We will say so when a furnace-only job is the honest path.",
      },
    ],
    related: [
      rel("furnace-repair-newark-de", "Furnace Repair", "When the current heat plant can still work."),
      rel("furnace-replacement-newark-de", "Furnace Replacement", "Like-for-like heating changeouts."),
      rel("heat-pump-installation-newark-de", "Heat Pump Installation", "Another path for some Newark homes."),
    ],
  },
  {
    slug: "furnace-replacement-newark-de",
    category: "heating",
    title: "Furnace Replacement in Newark, DE | Newark HVAC Pros",
    description:
      "Furnace replacement in Newark, Delaware when the heat plant is at the end of its useful life. Gas and oil systems in New Castle County homes.",
    h1: "Furnace Replacement in Newark, DE",
    eyebrow: "Heating changeouts",
    lede: "Replacement is for furnaces that have had a fair run: cracked heat exchanger concerns, cabinets that will not hold another repair, or equipment so old that parts are a scavenger hunt. It is not an automatic upsell on every no-heat call.",
    image: PHOTOS.furnace,
    imageAlt: "Residential heating equipment in need of replacement evaluation",
    problems: [
      "The furnace has failed more than once in a single winter",
      "Safety controls or a heat exchanger inspection that ends the repair path",
      "An oil furnace the owner wants to leave behind",
      "Heat that never reaches far rooms even when the burner runs",
    ],
    includes: [
      "A clear explanation of why replacement is on the table",
      "Venting, fuel, and electrical notes",
      "Replacement of the furnace you approve",
      "Startup and thermostat confirmation",
    ],
    signs: [
      "Repair invoices stacking on the same cabinet",
      "Visible rust, soot, or a failing inducer that keeps returning",
      "You want heat addressed now and the AC left until spring",
    ],
    why: "A new furnace on old, leaky ducts will still leave bedrooms cold. Replacement includes looking at airflow, not only the box in the closet.",
    local: "Older Newark stock still has oil. Newer streets toward Bear and Glasgow are mostly gas. The replacement conversation follows the fuel that is actually in the house.",
    process: [
      { title: "Call", text: "What failed and how old the furnace is." },
      { title: "Inspect", text: "Cabinet, heat exchanger concerns, venting, and ducts." },
      { title: "Recommend", text: "Repair, furnace-only replacement, or a paired HVAC changeout." },
      { title: "Replace", text: "After you approve." },
    ],
    faqs: [
      {
        q: "Is furnace replacement the same as HVAC replacement?",
        a: "No. This page is the heat plant. Full system changeouts are listed separately when cooling is also due.",
      },
    ],
    related: [
      rel("furnace-installation-newark-de", "Furnace Installation", "New heat when the old unit is finished."),
      rel("hvac-replacement-newark-de", "HVAC Replacement", "Heat and cooling together."),
      rel("heating-repair-newark-de", "Heating Repair", "When the current system can still run."),
    ],
  },
  {
    slug: "furnace-maintenance-newark-de",
    category: "heating",
    title: "Furnace Maintenance in Newark, DE | Newark HVAC Pros",
    description:
      "Furnace and heating maintenance in Newark, DE — fall checkups for gas and oil systems before New Castle County winter loads the heat plant.",
    h1: "Furnace Maintenance in Newark, DE",
    eyebrow: "Heating checkups",
    lede: "Fall furnace maintenance is a look at ignition, airflow, and safeties before the first real freeze. It will not make a failed heat exchanger new. It will often catch the parts that fail on the coldest night.",
    image: PHOTOS.panel,
    imageAlt: "Electrical and control inspection during a heating maintenance visit",
    problems: [
      "The furnace has not been opened since last winter’s no-heat call",
      "A filter that has been in place since last heating season",
      "You want a checkup before leaving town in January",
    ],
    includes: [
      "Filter and blower review",
      "Ignition and safety look-over on fuel-fired equipment",
      "Venting notes when they matter",
      "A written list of what can wait",
    ],
    signs: [
      "Startup odor that did not used to be there",
      "A furnace that short-cycles even on mild nights",
      "You cannot remember the last heating visit",
    ],
    why: "January in Newark does not give you a warmup week. The flame sensor and filter that would have been an October note become a 10 p.m. no-heat call.",
    local: "Gas furnaces dominate post-1970 streets. Oil still appears in older New Castle County mechanical rooms. The checkup follows the fuel.",
    process: [
      { title: "Request a heating checkup", text: "Say furnace maintenance and the ZIP." },
      { title: "Visit", text: "Inspect, test, and note follow-ups." },
      { title: "Review", text: "Findings without a membership pitch unless a real plan exists." },
    ],
    faqs: [
      {
        q: "Is heating maintenance the same as HVAC maintenance?",
        a: "This visit is the heat plant. A full HVAC checkup covers cooling as well and is listed separately.",
      },
    ],
    related: [
      rel("furnace-repair-newark-de", "Furnace Repair", "When heat already failed."),
      rel("hvac-maintenance-newark-de", "HVAC Maintenance", "Seasonal visits for both heat and cooling."),
      rel("emergency-heating-newark-de", "Emergency Heating", "No heat in cold weather."),
    ],
  },
  {
    slug: "heating-repair-newark-de",
    category: "heating",
    title: "Heating Repair in Newark, DE | Newark HVAC Pros",
    description:
      "Heating repair in Newark, Delaware for furnaces, heat-pump heating mode, and no-heat calls across New Castle County — not limited to one brand of cabinet.",
    h1: "Heating Repair in Newark, DE",
    eyebrow: "No-heat diagnosis",
    lede: "Heating repair here means the house is cold and the equipment that is supposed to warm it is not doing the job. That may be a gas furnace, an oil furnace, or a heat pump stuck without heat. The first task is to identify which system you actually have.",
    image: PHOTOS.ranch,
    imageAlt: "Newark-area home that depends on reliable winter heating",
    problems: [
      "No heat from any vents",
      "Heat that dies after a short run",
      "A heat pump that cools in summer but will not heat in fall",
      "Backup heat running constantly",
      "Unusual odors or noises at startup",
    ],
    includes: [
      "Identifying furnace versus heat pump versus dual-fuel",
      "Safety-first screening for fuel odors and alarms",
      "On-site diagnosis of ignition, reversing, airflow, or controls",
      "Repair options explained before parts go in",
    ],
    signs: [
      "The thermostat is set to heat and nothing happens",
      "You are not sure if you have a furnace or a heat pump",
      "One floor is warm and another is not",
    ],
    why: "Homeowners search “heating repair” when they do not want to guess the equipment. Forcing every no-heat call onto a furnace page hides heat-pump and dual-fuel houses that are common on newer Newark-area streets.",
    local: "19711 split-levels and Pike Creek lots often have more than one heat source. Bear infill is more likely to be a heat pump. Older Newark core is still furnace country.",
    process: [
      { title: "Call", text: "ZIP, no heat, and anything you know about the equipment." },
      { title: "Screen", text: "Gas odor or a CO alarm means leave and contact the utility or 911 first." },
      { title: "Diagnose", text: "The technician identifies the system and the failed part of it." },
      { title: "Approve", text: "Repair continues after you agree." },
    ],
    faqs: [
      {
        q: "Is heating repair different from furnace repair?",
        a: "Furnace repair is for fuel-fired cabinets. Heating repair is the wider no-heat path, including heat pumps.",
      },
      {
        q: "Do you work on boilers?",
        a: "Ask when you call. This site is built around forced-air and heat-pump systems common in Newark housing. We will not pretend to be a hydronic specialist on every listing.",
      },
    ],
    related: [
      rel("furnace-repair-newark-de", "Furnace Repair", "Gas and oil furnace diagnosis."),
      rel("heat-pump-repair-newark-de", "Heat Pump Repair", "When one outdoor unit handles heat."),
      rel("emergency-heating-newark-de", "Emergency Heating", "Cold house, heat down."),
    ],
  },
  {
    slug: "emergency-heating-newark-de",
    category: "emergency",
    title: "Emergency Heating in Newark, DE | Newark HVAC Pros",
    description:
      "Emergency heating service in Newark, Delaware when there is no heat on a cold night. Furnaces and heat-pump heating for New Castle County homes.",
    h1: "Emergency Heating in Newark, DE",
    eyebrow: "No heat",
    lede: "A furnace that will not ignite at 11 p.m. in January is a different problem than an AC that can wait until morning. If you smell gas or a carbon monoxide alarm is sounding, leave first. Then contact the utility or 911 from a safe location.",
    image: PHOTOS.hero,
    imageAlt: "Technician working on outdoor HVAC equipment during a service call",
    problems: [
      "No heat when outdoor temperatures drop",
      "Furnace ignites and then shuts down",
      "Heat pump iced over and not defrosting",
      "Fuel odor or a carbon monoxide alarm",
    ],
    includes: [
      "Safety-first screening before any troubleshooting",
      "Scheduling the next available heating visit",
      "On-site diagnosis of the heat plant",
      "Repair or replacement options after inspection",
    ],
    signs: [
      "The house is losing heat and space heaters are not a plan",
      "You hear clicking but never get flame",
      "Pipes are a concern in unused rooms",
    ],
    why: "Newark sits in a mixed-humid climate that still needs real winter heat. Emergency heating is the no-heat path. Emergency cooling is listed separately so the wrong playbook is not applied.",
    local: "Oil and gas furnaces in older 19711 and 19713 stock, heat pumps on newer Bear and Christiana streets. Both fail on the first true cold snap.",
    process: [
      { title: "Get safe", text: "Gas odor or CO alarm: leave, then utility or 911." },
      { title: "Call", text: "ZIP and no heat. Do not keep resetting the furnace." },
      { title: "Inspect", text: "Technician diagnoses on site." },
      { title: "Decide", text: "Repair path after you hear it." },
    ],
    faqs: [
      {
        q: "Can I use the oven for heat?",
        a: "No. It is a carbon monoxide and fire risk. Close unused rooms and wait for service.",
      },
      {
        q: "Do you guarantee same-night arrival?",
        a: "No. Timing is confirmed when the team follows up. This site does not invent dispatch windows.",
      },
    ],
    related: [
      rel("furnace-repair-newark-de", "Furnace Repair", "Standard furnace diagnosis."),
      rel("emergency-hvac-newark-de", "Emergency HVAC", "Heat or cooling down."),
      rel("heating-repair-newark-de", "Heating Repair", "Broader no-heat diagnosis."),
    ],
  },
  {
    slug: "hvac-repair-newark-de",
    category: "systems",
    title: "HVAC Repair in Newark, DE | Newark HVAC Pros",
    description:
      "HVAC repair in Newark, Delaware when the whole comfort system is the problem — heat, cooling, airflow, or a unit that will not start. Serving New Castle County.",
    h1: "HVAC Repair in Newark, DE",
    eyebrow: "Whole-system service",
    lede: "HVAC repair is the right page when you are not trying to guess furnace versus air conditioner. The system that heats and cools the house has stopped doing one of those jobs — or both — and needs a technician, not a parts guess from a chat window.",
    image: PHOTOS.technician,
    imageAlt: "HVAC technician diagnosing outdoor equipment at a residence",
    problems: [
      "The system will not start in either season",
      "Heat and cooling have both been unreliable in the same year",
      "Airflow is weak in every room",
      "Strange noises that started after a storm or a long idle period",
      "A thermostat that does not seem to control anything",
    ],
    includes: [
      "A whole-system look: indoor cabinet, outdoor unit, ducts, and controls",
      "Identifying whether the failure is heat, cooling, airflow, or electrical",
      "Repair options explained before work continues",
      "A note when replacement is the more honest path",
    ],
    signs: [
      "You do not know whether to search furnace or AC",
      "The same equipment serves both seasons and both feel wrong",
      "Multiple rooms are uncomfortable, not just one addition",
    ],
    why: "Split repair pages are useful once the equipment is known. HVAC repair exists so the first visit can be a diagnosis of the system you actually have.",
    local: "Most Newark houses share ducts between the furnace or air handler and the outdoor unit. Treating them as unrelated machines is how mismatched repairs accumulate in 1970s closets.",
    process: [
      { title: "Call", text: "ZIP and what the system is doing — or not doing." },
      { title: "Inspect", text: "Indoor, outdoor, airflow, and controls." },
      { title: "Explain", text: "Which side failed and what it means." },
      { title: "Repair", text: "Approved work only." },
    ],
    faqs: [
      {
        q: "Should I pick AC repair or HVAC repair?",
        a: "If you know it is cooling-only, use AC repair. If the whole system is in play, start here.",
      },
    ],
    related: [
      rel("ac-repair-newark-de", "AC Repair", "Cooling-only diagnosis."),
      rel("furnace-repair-newark-de", "Furnace Repair", "Heat-plant diagnosis."),
      rel("hvac-replacement-newark-de", "HVAC Replacement", "When both sides are due."),
    ],
  },
  {
    slug: "hvac-maintenance-newark-de",
    category: "systems",
    title: "HVAC Maintenance in Newark, DE | Newark HVAC Pros",
    description:
      "HVAC maintenance in Newark, DE — spring cooling checkups and fall heating checkups for New Castle County homes before peak weather arrives.",
    h1: "HVAC Maintenance in Newark, DE",
    eyebrow: "Seasonal checkups",
    lede: "Maintenance is not a magic shield. It is a chance to catch a weak capacitor, a dirty flame sensor, or a clogged drain before the first 90-degree afternoon or the first freeze.",
    image: PHOTOS.tools,
    imageAlt: "Maintenance tools used during a seasonal HVAC checkup",
    problems: [
      "The system has not been opened since the last emergency call",
      "Filters ignored through a rental turnover",
      "You want a checkup before leaving town",
    ],
    includes: [
      "Filter and airflow review",
      "Outdoor coil and drain inspection in cooling season",
      "Ignition and safety look-over in heating season",
      "A punch list of what can wait and what should not",
    ],
    signs: [
      "Last year’s small noise is now a large noise",
      "The filter is gray and bowed",
      "You cannot remember the last professional visit",
    ],
    why: "Peak-season failures in Newark are often the same parts that a quiet April or October visit would have flagged.",
    local: "Spring AC visits matter because Delaware summers are humid, not just hot. Fall furnace visits matter because January does not give you a warmup week.",
    process: [
      { title: "Call", text: "Ask for a cooling checkup, a heating checkup, or both." },
      { title: "Visit", text: "Inspect, test, and note follow-ups." },
      { title: "Review", text: "Findings without a scare script." },
    ],
    faqs: [
      {
        q: "Is this a membership club?",
        a: "Not unless a real plan is published later. You can request a seasonal checkup as a one-time visit.",
      },
    ],
    related: [
      rel("ac-maintenance-newark-de", "AC Maintenance", "Cooling-only spring visits."),
      rel("furnace-maintenance-newark-de", "Furnace Maintenance", "Heating-only fall visits."),
      rel("hvac-repair-newark-de", "HVAC Repair", "When the system already failed."),
    ],
  },
  {
    slug: "hvac-replacement-newark-de",
    category: "systems",
    title: "HVAC Replacement in Newark, DE | Newark HVAC Pros",
    description:
      "HVAC replacement in Newark, DE when heating and cooling both need to come out. Designed for New Castle County homes, not a boxed pair from a warehouse aisle.",
    h1: "HVAC Replacement in Newark, DE",
    eyebrow: "Complete systems",
    lede: "When the furnace and the air conditioner are both tired, replacing them as a pair is often cleaner than stacking one more repair on each.",
    image: PHOTOS.heatPump,
    imageAlt: "Outdoor HVAC equipment installed at a residence",
    problems: [
      "Both heat and cool have failed in the same year",
      "Mismatched indoor and outdoor equipment",
      "A remodel that changed how air needs to move",
    ],
    includes: [
      "Whole-system look: furnace or heat pump, coil, condenser, and ducts",
      "Electrical and venting notes",
      "A written recommendation you can sit with",
      "Installation and startup of the approved system",
    ],
    signs: [
      "Repair invoices on both the furnace and the AC",
      "Comfort complaints in every season",
      "Ducts that whistle, rattle, or skip whole rooms",
    ],
    why: "A matched system is quieter, easier to service, and easier to explain. Piecemeal replacements are how Newark houses end up with three generations of equipment in one closet.",
    local: "Median housing age in Newark means many systems are on their second or third generation. That is normal. Pretending every house needs the same package is not.",
    process: [
      { title: "Call", text: "What failed, and how old heat and cool each are." },
      { title: "Inspect", text: "Equipment, ducts, electrical, and venting." },
      { title: "Recommend", text: "Repair, staged replacement, or full changeout." },
      { title: "Install", text: "After you approve, not before." },
    ],
    faqs: [
      {
        q: "Do I have to replace everything at once?",
        a: "No. If one side is healthy, we will say so. Full replacement is for when both sides are genuinely due.",
      },
    ],
    related: [
      rel("ac-replacement-newark-de", "AC Replacement", "Cooling-only changeouts."),
      rel("furnace-replacement-newark-de", "Furnace Replacement", "Heat-only changeouts."),
      rel("hvac-maintenance-newark-de", "HVAC Maintenance", "Protect a new system after install."),
    ],
  },
  {
    slug: "emergency-hvac-newark-de",
    category: "emergency",
    title: "Emergency HVAC in Newark, DE | Newark HVAC Pros",
    description:
      "Emergency HVAC help in Newark, DE when there is no heat, no cooling, or a system that will not start. Serving New Castle County ZIPs including 19702, 19711, 19713, and 19725.",
    h1: "Emergency HVAC in Newark, DE",
    eyebrow: "Urgent heating & cooling",
    lede: "When a Newark home loses heat on a January night or cooling in a humid July stretch, the next step is a phone call — not a long form. Tell us the ZIP and the symptom. We will help you decide what to do next.",
    image: PHOTOS.hero,
    imageAlt: "HVAC technician checking refrigerant lines on outdoor equipment",
    problems: [
      "No heat when outdoor temperatures drop",
      "No air conditioning during a heat and humidity spike",
      "The system will not start after several tries",
      "Burning, electrical, or strong fuel odors from the equipment",
      "Water around the air handler or ice on the indoor coil",
      "A carbon monoxide alarm related to a fuel-fired furnace",
    ],
    includes: [
      "A conversation about ZIP, symptoms, and whether the home is safe to occupy",
      "Guidance on what to shut off if you smell gas or see standing water",
      "Scheduling the next available technician for your Newark-area address",
      "Repair versus replacement once the system is inspected",
    ],
    signs: [
      "Outdoor unit silent, humming, or clicking without starting",
      "Furnace ignites then shuts down",
      "Breaker will not stay on for the condenser or air handler",
      "No airflow in any room",
    ],
    why: "Newark sits in mixed-humid climate. Homes need both heat and cooling. A failed system is a comfort problem and, in extreme weather, a safety problem for older adults, infants, and campus rentals.",
    local: "Calls cluster in 19711 near the University of Delaware, 19702 toward Glasgow, Pike Creek split-levels, and Bear (19701). Nor’easters and summer humidity both take systems that were “fine in April” offline.",
    process: [
      { title: "Call", text: "Share the ZIP and whether it is no heat, no cooling, water, or an odor." },
      { title: "Safety first", text: "If you smell gas or a CO alarm is sounding, leave and contact the utility or 911, then us." },
      { title: "Inspect", text: "A technician diagnoses the equipment on site." },
      { title: "You decide", text: "You hear the options before work continues." },
    ],
    faqs: [
      {
        q: "Is this a 24-hour dispatch line?",
        a: "Call or request service and we will tell you the next available window. After-hours coverage is listed here only when it is confirmed.",
      },
      {
        q: "What should I do while I wait?",
        a: "For no heat: close unused rooms and do not use ovens as heaters. For no cooling: drink water and use a fan if you have power. If you smell gas, leave the house.",
      },
      {
        q: "Do you serve campus rentals?",
        a: "Yes, with owner approval. We still need a valid on-site contact and ZIP.",
      },
    ],
    related: [
      rel("emergency-ac-repair-newark-de", "Emergency AC Repair", "Cooling down in heat and humidity."),
      rel("emergency-heating-newark-de", "Emergency Heating", "No heat on a cold night."),
      rel("hvac-repair-newark-de", "HVAC Repair", "Non-emergency whole-system diagnosis."),
    ],
  },
  {
    slug: "heat-pump-repair-newark-de",
    category: "heat-pumps",
    title: "Heat Pump Repair in Newark, DE | Newark HVAC Pros",
    description:
      "Heat pump repair in Newark, DE when a dual-mode system will not heat, will not cool, or is stuck in one season. Serving New Castle County.",
    h1: "Heat Pump Repair in Newark, DE",
    eyebrow: "Dual-mode systems",
    lede: "A heat pump that only works in one season is a Newark shoulder-month classic. Reversing valves, defrost boards, and backup heat strips fail just as the weather changes.",
    image: PHOTOS.heatPump,
    imageAlt: "Outdoor heat pump units installed beside a residence",
    problems: [
      "Cools in summer, will not heat in fall",
      "Outdoor unit ices heavily and never defrosts",
      "Emergency heat running constantly",
      "Loud changeover or a system stuck on one mode",
    ],
    includes: [
      "Mode changeover and defrost checks",
      "Backup heat verification",
      "Refrigerant circuit and outdoor fan review",
      "Thermostat configuration for heat-pump operation",
    ],
    signs: [
      "You hear the outdoor unit but the air from vents is lukewarm in winter",
      "The auxiliary heat light never turns off",
      "Ice builds into a block on the outdoor coil",
    ],
    why: "Heat pumps are a good fit for mixed-humid Delaware if they are set up correctly. A misconfigured thermostat makes a healthy unit look dead.",
    local: "Newer infill in Bear and Christiana uses heat pumps more often than 1978 Newark ranches. Dual-fuel setups show up on renovated Pike Creek homes.",
    process: [
      { title: "Call", text: "Tell us which mode failed — heat, cool, or both." },
      { title: "Inspect", text: "Reversing, defrost, and backup heat." },
      { title: "Explain", text: "Control issue versus mechanical failure." },
      { title: "Repair", text: "Approved work only." },
    ],
    faqs: [
      {
        q: "Is lukewarm winter air normal?",
        a: "Heat pump air is often less hot than furnace air. No heat at all, or ice that never clears, is not normal.",
      },
    ],
    related: [
      rel("heat-pump-installation-newark-de", "Heat Pump Installation", "New dual-mode systems."),
      rel("heat-pump-maintenance-newark-de", "Heat Pump Maintenance", "Checkups in both modes."),
      rel("ac-repair-newark-de", "AC Repair", "Cooling-mode failures on straight AC."),
    ],
  },
  {
    slug: "heat-pump-installation-newark-de",
    category: "heat-pumps",
    title: "Heat Pump Installation in Newark, DE | Newark HVAC Pros",
    description:
      "Heat pump installation in Newark, DE for homeowners who want heating and cooling from one outdoor unit, sized for New Castle County winters and humid summers.",
    h1: "Heat Pump Installation in Newark, DE",
    eyebrow: "Year-round comfort",
    lede: "A heat pump can be the right Newark system when ducts, electrical, and expectations are honest. It is not a magic swap for every oil furnace in a 1970s ranch.",
    image: PHOTOS.heatPumpOutdoor,
    imageAlt: "Outdoor heat pump units along a residential wall",
    problems: [
      "Replacing an aging AC and considering heat at the same time",
      "An addition that needs its own heating and cooling",
      "Interest in dual-fuel rather than all-electric",
    ],
    includes: [
      "Conversation about backup heat for Delaware winters",
      "Electrical panel capacity check",
      "Equipment selection and install",
      "Thermostat programming so the system actually changes modes",
    ],
    signs: [
      "You are already replacing the outdoor unit",
      "Natural gas is unavailable or you want to reduce furnace runtime",
      "A ductless head is a better fit than a new trunk line",
    ],
    why: "Zone 4A winters still need a plan for the coldest nights. We will not sell a heat pump as a furnace clone.",
    local: "Utility conversations change over time. We discuss current programs when you call rather than publishing stale rebate numbers.",
    process: [
      { title: "Call", text: "Current fuel type and what you want the new system to do." },
      { title: "Evaluate", text: "Ducts, electrical, and cold-weather backup." },
      { title: "Propose", text: "Heat pump, dual-fuel, or furnace-plus-AC — whichever fits." },
      { title: "Install", text: "Set, start, and confirm both heat and cool." },
    ],
    faqs: [
      {
        q: "Will a heat pump work in a Newark January?",
        a: "Modern systems can, with correctly planned backup heat. That backup is part of the design, not an afterthought.",
      },
    ],
    related: [
      rel("heat-pump-repair-newark-de", "Heat Pump Repair", "Service for existing units."),
      rel("hvac-replacement-newark-de", "HVAC Replacement", "Full changeouts."),
      rel("ductless-mini-split-newark-de", "Ductless Mini Splits", "Room-by-room heat pumps."),
    ],
  },
  {
    slug: "heat-pump-maintenance-newark-de",
    category: "heat-pumps",
    title: "Heat Pump Maintenance in Newark, DE | Newark HVAC Pros",
    description:
      "Heat pump maintenance in Newark, DE — seasonal checkups for heating and cooling mode, defrost, and backup heat in New Castle County homes.",
    h1: "Heat Pump Maintenance in Newark, DE",
    eyebrow: "Both seasons",
    lede: "A heat pump needs a different checkup than a straight air conditioner. Defrost, reversing, and backup heat only show themselves when the weather changes. Maintenance is the time to look at both modes — not after the first ice storm.",
    image: PHOTOS.heatPumpOutdoor,
    imageAlt: "Outdoor heat pump equipment during a maintenance inspection",
    problems: [
      "The unit has only ever been serviced as an air conditioner",
      "Defrost has been noisy or incomplete",
      "You are heading into winter on last year’s cooling visit",
    ],
    includes: [
      "Outdoor coil, fan, and defrost review",
      "Mode changeover check when conditions allow",
      "Backup heat verification",
      "Filter and indoor airflow",
    ],
    signs: [
      "The outdoor coil ices in a sheet every winter",
      "Auxiliary heat seems to run on mild days",
      "No one has looked at the reversing circuit since install",
    ],
    why: "Treating a heat pump like a one-season box is how Newark homeowners discover, in November, that cooling still works and heating does not.",
    local: "Bear, Christiana, and newer 19702 streets are where heat-pump checkups are becoming the default visit instead of a furnace-only fall stop.",
    process: [
      { title: "Request a heat-pump checkup", text: "Say which season you are heading into." },
      { title: "Visit", text: "Inspect both the heating and cooling sides of the machine." },
      { title: "Review", text: "What can wait, and what should not." },
    ],
    faqs: [
      {
        q: "Can this be combined with regular HVAC maintenance?",
        a: "Yes. If you have a heat pump, this is the maintenance that actually matches the equipment.",
      },
    ],
    related: [
      rel("heat-pump-repair-newark-de", "Heat Pump Repair", "When a mode already failed."),
      rel("hvac-maintenance-newark-de", "HVAC Maintenance", "Seasonal visits for mixed systems."),
      rel("heat-pump-installation-newark-de", "Heat Pump Installation", "New dual-mode equipment."),
    ],
  },
  {
    slug: "ductless-mini-split-newark-de",
    category: "ductless",
    title: "Ductless Mini Splits in Newark, DE | Newark HVAC Pros",
    description:
      "Ductless mini split installation and service in Newark, DE for additions, garages, and rooms the original ducts never reached.",
    h1: "Ductless Mini Splits in Newark, DE",
    eyebrow: "Room-by-room comfort",
    lede: "Mini splits solve rooms that central air gave up on: sunrooms, finished attics, campus conversions, and additions on tight Newark lots.",
    image: PHOTOS.ductless,
    imageAlt: "Finished living space that can be served by a ductless indoor head",
    problems: [
      "One room that never matches the rest of the house",
      "An addition with no duct chase",
      "A rental where window units are the current system",
    ],
    includes: [
      "Load talk for the actual room, not the whole house",
      "Line-set routing that respects siding and bedrooms",
      "Indoor head placement for throw and condensate",
      "Startup and remote or thermostat walkthrough",
    ],
    signs: [
      "You are running a window AC in a room with a closed door",
      "Ducting a new space would mean tearing finished ceilings",
      "You want independent control for a home office",
    ],
    why: "A mini split is not a whole-house replacement for every ranch. It is the right tool when ducts cannot get there cleanly.",
    local: "University-area conversions and Pike Creek additions are the two most common Newark mini-split conversations.",
    process: [
      { title: "Call", text: "Which rooms, and whether heat, cool, or both." },
      { title: "Look", text: "Wall space, outdoor pad, and electrical." },
      { title: "Install", text: "After you approve placement and equipment." },
    ],
    faqs: [
      {
        q: "Can one outdoor unit serve several rooms?",
        a: "Often yes, with a multi-zone setup. We will not stack more heads than the outdoor unit can honestly support.",
      },
    ],
    related: [
      rel("mini-split-repair-newark-de", "Mini Split Repair", "When an existing head or outdoor unit fails."),
      rel("mini-split-installation-newark-de", "Mini Split Installation", "New ductless rooms."),
      rel("ac-installation-newark-de", "AC Installation", "Central cooling when ducts already exist."),
    ],
  },
  {
    slug: "mini-split-repair-newark-de",
    category: "ductless",
    title: "Mini Split Repair in Newark, DE | Newark HVAC Pros",
    description:
      "Ductless mini split repair in Newark, DE for indoor heads that leak, freeze, or blow warm air, and outdoor units that will not start.",
    h1: "Mini Split Repair in Newark, DE",
    eyebrow: "Ductless service",
    lede: "A mini split that clicks, drips, or blows room-temperature air is a different repair than a central furnace. Line sets, condensate pumps, and wall heads fail in ways a closet-mounted air handler does not.",
    image: PHOTOS.ductless,
    imageAlt: "Indoor living space served by a wall-mounted comfort system",
    problems: [
      "Indoor head dripping on the wall or floor",
      "One zone dead while others still run",
      "Outdoor unit icing or silent",
      "Remote or wall control that no longer talks to the head",
    ],
    includes: [
      "Diagnosis of the failing zone versus the outdoor unit",
      "Condensate, filters, and coil inspection at the head",
      "Electrical and communication checks",
      "A clear repair-versus-replace note for that zone",
    ],
    signs: [
      "The head smells musty at startup",
      "Error codes on the display",
      "Ice on the line set or the indoor coil",
    ],
    why: "Mini split repairs get mishandled when they are treated like window units. They are still refrigerant systems with safeties.",
    local: "Campus conversions and Pike Creek additions are where we see the most single-zone failures — often after a filter has been ignored for a full UD school year.",
    process: [
      { title: "Call", text: "Which room, and whether it is leaking, warm, or silent." },
      { title: "Inspect", text: "Head, line set, and outdoor unit." },
      { title: "Repair", text: "After you approve." },
    ],
    faqs: [
      {
        q: "Can you repair one head on a multi-zone system?",
        a: "Often yes. Sometimes the outdoor unit is the actual failure. That is what the visit is for.",
      },
    ],
    related: [
      rel("mini-split-installation-newark-de", "Mini Split Installation", "Adding a zone or replacing a failed pair."),
      rel("ductless-mini-split-newark-de", "Ductless Mini Splits", "When ducts never reached the room."),
      rel("heat-pump-repair-newark-de", "Heat Pump Repair", "Ducted dual-mode systems."),
    ],
  },
  {
    slug: "mini-split-installation-newark-de",
    category: "ductless",
    title: "Mini Split Installation in Newark, DE | Newark HVAC Pros",
    description:
      "Mini split installation in Newark, Delaware for rooms, additions, and conversions that need heating and cooling without new ductwork.",
    h1: "Mini Split Installation in Newark, DE",
    eyebrow: "New ductless systems",
    lede: "Installing a mini split is a placement problem as much as an equipment problem. The head has to throw air, drain condensate, and not dump noise into a bedroom. The outdoor unit has to sit where it can be serviced.",
    image: PHOTOS.heatPumpOutdoor,
    imageAlt: "Outdoor equipment pad typical of a ductless installation",
    problems: [
      "A finished attic or sunroom with no duct chase",
      "A home office that overheats with the door closed",
      "A rental conversion that cannot take a full trunk line",
    ],
    includes: [
      "Room-by-room load talk",
      "Line-set routing and condensate plan",
      "Electrical capacity check",
      "Install, vacuum, start, and control walkthrough",
    ],
    signs: [
      "Window units are doing the job poorly",
      "You already know central ducts will not reach",
      "You want heat and cool in one head",
    ],
    why: "A poorly placed head is a permanent regret. Installation here is about the wall, the pad, and the drain — not only the BTU number on the box.",
    local: "Tight Newark lots and brick campus houses limit where line sets can run. The install should respect that, not cut the shortest hole.",
    process: [
      { title: "Call", text: "Rooms, heat and cool, and photos of the walls if you have them." },
      { title: "Walk the space", text: "Head location, outdoor pad, and electrical." },
      { title: "Install", text: "After you approve placement." },
    ],
    faqs: [
      {
        q: "Do mini splits work in a Newark winter?",
        a: "Cold-climate ductless equipment can, when sized for the room. We will not treat a small cooling-only head as winter heat.",
      },
    ],
    related: [
      rel("mini-split-repair-newark-de", "Mini Split Repair", "Service for existing heads."),
      rel("ductless-mini-split-newark-de", "Ductless Mini Splits", "When to choose ductless at all."),
      rel("heat-pump-installation-newark-de", "Heat Pump Installation", "Ducted year-round systems."),
    ],
  },
  {
    slug: "indoor-air-quality-newark-de",
    category: "iaq",
    title: "Indoor Air Quality in Newark, DE | Newark HVAC Pros",
    description:
      "Indoor air quality service in Newark, DE — filtration, humidity, and ventilation conversations for mixed-humid New Castle County homes.",
    h1: "Indoor Air Quality in Newark, DE",
    eyebrow: "Air you actually live in",
    lede: "Sticky summers and tight winter houses both make indoor air worse. IAQ work here is about filtration, humidity, and ventilation — not a miracle cartridge.",
    image: PHOTOS.iaq,
    imageAlt: "Residential kitchen with a ceiling supply vent",
    problems: [
      "Dust that returns a day after cleaning",
      "Musty air at the start of cooling season",
      "Dry winter air that bothers sinuses",
      "A home that feels stale with the windows shut",
    ],
    includes: [
      "Filter slot and cabinet review",
      "Humidity and ventilation conversation",
      "Options that fit the existing system",
      "Honest limits — IAQ does not replace a failed AC",
    ],
    signs: [
      "You upgraded filters and the blower now struggles",
      "Window condensation in winter",
      "Odors that track back to the return",
    ],
    why: "A filter that is too restrictive can freeze a coil. More MERV is not always more comfort.",
    local: "Campus houses with many occupants and Pike Creek homes with finished basements have different air problems. The recommendation should follow the house.",
    process: [
      { title: "Call", text: "Dust, odor, dryness, or stuffiness — be specific." },
      { title: "Inspect", text: "System, filter, and how the house is used." },
      { title: "Recommend", text: "Only what will actually help." },
    ],
    faqs: [
      {
        q: "Will a UV light fix my allergies?",
        a: "We will not promise that. Filtration, humidity, and source control do more for most Newark homes.",
      },
    ],
    related: [
      rel("air-filtration-newark-de", "Air Filtration", "Filters and cabinets that actually fit the blower."),
      rel("humidifiers-dehumidifiers-newark-de", "Humidity Control", "Dry winters and sticky summers."),
      rel("ductwork-newark-de", "Ductwork", "When trunks and returns are the real issue."),
    ],
  },
  {
    slug: "air-filtration-newark-de",
    category: "iaq",
    title: "Air Filtration in Newark, DE | Newark HVAC Pros",
    description:
      "Air filtration for Newark, Delaware HVAC systems — media cabinets, filter fit, and airflow that does not starve the blower.",
    h1: "Air Filtration in Newark, DE",
    eyebrow: "Filters that fit the system",
    lede: "Filtration is not “the thickest filter on the shelf.” Newark systems have a slot, a blower, and a coil. The wrong media will clean the air for a week and then freeze the coil.",
    image: PHOTOS.iaq,
    imageAlt: "Ceiling supply vent in a residential kitchen",
    problems: [
      "Dust on furniture a day after vacuuming",
      "A 1-inch filter that collapses in the rack",
      "A high-MERV filter that made the house less comfortable",
      "Returns that pull air from a dirty basement or crawl",
    ],
    includes: [
      "Measuring the actual cabinet and rack",
      "Talking through media versus one-inch throwaways",
      "Checking static pressure concerns when a thicker filter is proposed",
      "Install of the filtration approach you approve",
    ],
    signs: [
      "The current filter is bowed, wet, or missing",
      "You upgraded MERV and the AC started icing",
      "Allergy complaints line up with a dirty return",
    ],
    why: "Filtration has to leave the blower enough air. Comfort and cleanliness are the same system.",
    local: "UD rentals often run whatever filter was on sale. Owner-occupied Pike Creek homes are more likely to want a media cabinet. Both need a filter that actually fits.",
    process: [
      { title: "Call", text: "Dust, filter size if you know it, and any icing history." },
      { title: "Inspect", text: "Rack, blower, and returns." },
      { title: "Fit", text: "A filtration path the equipment can live with." },
    ],
    faqs: [
      {
        q: "Should I use the highest MERV available?",
        a: "Not if the cabinet and blower cannot move air through it. We will say so.",
      },
    ],
    related: [
      rel("indoor-air-quality-newark-de", "Indoor Air Quality", "Humidity and ventilation as well as filters."),
      rel("hvac-maintenance-newark-de", "HVAC Maintenance", "Filter and coil checkups."),
      rel("ductwork-newark-de", "Ductwork", "When dust is coming from leaky returns."),
    ],
  },
  {
    slug: "humidifiers-dehumidifiers-newark-de",
    category: "iaq",
    title: "Humidity Control in Newark, DE | Newark HVAC Pros",
    description:
      "Humidifiers and dehumidifiers for Newark, Delaware homes — winter dryness and summer moisture in mixed-humid New Castle County housing.",
    h1: "Humidity Control in Newark, DE",
    eyebrow: "Humidifiers & dehumidifiers",
    lede: "Newark air is not one problem. July is sticky. January is dry enough to crack furniture. Humidity control is about which season is actually hurting the house — not adding a gadget for both by default.",
    image: PHOTOS.iaq,
    imageAlt: "Interior living space where humidity shows up on windows and finishes",
    problems: [
      "Windows that sweat in winter",
      "A house that feels damp even when the AC is running",
      "Static, dry sinuses, and shrinking woodwork in January",
      "Musty finished basements in Pike Creek and Hockessin",
    ],
    includes: [
      "Which problem you actually have — too wet, too dry, or both by season",
      "Whether the AC is short-cycling and leaving moisture behind",
      "Whole-home versus portable equipment conversation",
      "Install of the approach you approve, when it fits the existing system",
    ],
    signs: [
      "Cooling that never quite dries the air",
      "Nosebleeds or dry air in heating season",
      "Musty odor that tracks with humidity, not a dirty filter alone",
    ],
    why: "A dehumidifier will not fix a failed condenser. A humidifier will not fix a cracked heat exchanger. Humidity work sits on top of a system that already heats and cools.",
    local: "Mixed-humid climate means both tools exist in the same county. Campus houses tend to be too wet in summer. Tighter newer homes can be too dry in winter.",
    process: [
      { title: "Call", text: "Too wet, too dry, which season, and the ZIP." },
      { title: "Inspect", text: "Equipment, ducts, and how the house is used." },
      { title: "Recommend", text: "Only the humidity path that matches what we saw." },
    ],
    faqs: [
      {
        q: "Will a new air conditioner fix summer humidity?",
        a: "Sometimes, if the old unit was short-cycling or undersized. Sometimes the house still needs dedicated dehumidification. We will not pretend those are the same job.",
      },
    ],
    related: [
      rel("indoor-air-quality-newark-de", "Indoor Air Quality", "The wider air conversation."),
      rel("ac-repair-newark-de", "AC Repair", "When cooling is not drying the house."),
      rel("air-filtration-newark-de", "Air Filtration", "Dust and media cabinets."),
    ],
  },
  {
    slug: "ductwork-newark-de",
    category: "iaq",
    title: "Ductwork in Newark, DE | Newark HVAC Pros",
    description:
      "Ductwork service in Newark, DE — sealing, repairs, returns, and airflow. Cleaning only when it is actually useful, not as a ritual.",
    h1: "Ductwork in Newark, DE",
    eyebrow: "Airflow & ducts",
    lede: "Ducts are how Newark houses actually move air. Cleaning is useful after renovation dust, pests, or packed returns. It is not a substitute for repairing a leaking trunk or an undersized return.",
    image: PHOTOS.ducts,
    imageAlt: "Exposed HVAC ductwork in a mechanical or commercial interior",
    problems: [
      "Visible dust blowing from supplies after construction",
      "Odors that clearly come from the return",
      "Weak airflow in rooms far from the air handler",
      "Whistling, rattling, or disconnected flex",
    ],
    includes: [
      "A look at whether cleaning will help — or whether sealing and repair will",
      "Return and trunk inspection",
      "Cleaning when it is justified",
      "Notes on returns that are undersized or disconnected",
    ],
    signs: [
      "You just finished drywall in a 1970s ranch",
      "A disconnected return in a crawl or attic",
      "Every register is gray within a week of cleaning the house",
    ],
    why: "Selling duct cleaning to every caller is a trust problem. We would rather fix airflow.",
    local: "Crawlspace returns around Brookside and Ogletown are a common Newark airflow story. Cleaning without sealing is a short-lived win.",
    process: [
      { title: "Call", text: "Dust, odor, or weak rooms." },
      { title: "Inspect", text: "We look before we quote a cleaning." },
      { title: "Act", text: "Clean, seal, or repair — whichever matches what we saw." },
    ],
    faqs: [
      {
        q: "How often should ducts be cleaned?",
        a: "There is no honest universal calendar. After construction or a clear contamination event is the usual trigger.",
      },
    ],
    related: [
      rel("indoor-air-quality-newark-de", "Indoor Air Quality", "Filters and humidity."),
      rel("hvac-replacement-newark-de", "HVAC Replacement", "When the system itself is the issue."),
      rel("air-filtration-newark-de", "Air Filtration", "Media that matches the blower."),
    ],
  },
  {
    slug: "commercial-hvac-newark-de",
    category: "commercial",
    title: "Commercial HVAC in Newark, DE | Newark HVAC Pros",
    description:
      "Commercial HVAC service in Newark, DE for small offices, retail, and rental properties in New Castle County — not a nationwide facilities contract.",
    h1: "Commercial HVAC in Newark, DE",
    eyebrow: "Light commercial",
    lede: "Main Street suites, Christiana-area retail, and multi-unit rentals near campus need HVAC that shows up. This is light commercial and rental work — not a promise to run a hospital campus.",
    image: PHOTOS.commercial,
    imageAlt: "Light-commercial interior with exposed HVAC ductwork",
    problems: [
      "A rooftop or split system down during business hours",
      "A rental building with stacked after-hours complaints",
      "An office suite that overheats in the afternoon",
    ],
    includes: [
      "Service for packaged rooftop units and splits common on small commercial",
      "Coordination with owners and property managers",
      "Clear access and after-hours conversation when needed",
    ],
    signs: [
      "Tenants are calling you before they call us",
      "One unit serves several suites poorly",
      "Filters and coils have been ignored between turnovers",
    ],
    why: "Small commercial in Newark is still residential-adjacent equipment most days. We stay in that lane.",
    local: "Ogletown and Christiana commercial strips, plus campus-adjacent rentals in 19711, are the core of this page — not Wilmington high-rises.",
    process: [
      { title: "Call", text: "Property type, access, and the failed equipment." },
      { title: "Site", text: "We inspect with the person who has keys." },
      { title: "Plan", text: "Repair or replacement options for the owner." },
    ],
    faqs: [
      {
        q: "Do you handle large industrial plants?",
        a: "That is outside the focus of this site. Ask when you call; we will not pretend to be a nationwide facilities team.",
      },
    ],
    related: [
      rel("commercial-ac-newark-de", "Commercial AC", "Cooling for shops and offices."),
      rel("commercial-heating-newark-de", "Commercial Heating", "Heat for occupied commercial space."),
      rel("commercial-hvac-maintenance-newark-de", "Commercial Maintenance", "Between tenant turnovers."),
    ],
  },
  {
    slug: "commercial-ac-newark-de",
    category: "commercial",
    title: "Commercial AC in Newark, DE | Newark HVAC Pros",
    description:
      "Commercial air conditioning in Newark, DE for shops, offices, and small retail. Cooling service for light commercial buildings in New Castle County.",
    h1: "Commercial AC in Newark, DE",
    eyebrow: "Business cooling",
    lede: "When a shop or office overheats, the problem is not a residential thermostat trick. Rooftop units, split systems, and after-hours access are the job. This page is cooling for light commercial — not a data-center contract.",
    image: PHOTOS.office,
    imageAlt: "Office interior that depends on commercial cooling",
    problems: [
      "A packaged rooftop that will not cool during business hours",
      "A suite that bakes every afternoon while the rest of the building is fine",
      "Retail space that cannot keep customers comfortable",
    ],
    includes: [
      "Diagnosis of rooftop and split cooling common on small commercial",
      "Coordination for roof access and business hours",
      "Repair or replacement options for the owner",
    ],
    signs: [
      "Staff are running portable units",
      "The outdoor or roof unit is loud, iced, or silent",
      "Cooling complaints stack at the same time every summer",
    ],
    why: "Commercial cooling fails in public. The visit has to respect opening hours and who has keys — not only the refrigerant circuit.",
    local: "Christiana retail, Newark Main Street suites, and campus-adjacent offices are the cooling calls this page is written for.",
    process: [
      { title: "Call", text: "Building type, access, and that cooling is down." },
      { title: "Site", text: "Inspect with the person who can reach the equipment." },
      { title: "Plan", text: "Repair path for the owner or manager." },
    ],
    faqs: [
      {
        q: "Can you work after closing?",
        a: "Ask when you call. After-hours access is a conversation, not a published guarantee.",
      },
    ],
    related: [
      rel("commercial-hvac-newark-de", "Commercial HVAC", "Heating and cooling for light commercial."),
      rel("ac-repair-newark-de", "AC Repair", "Residential cooling."),
      rel("commercial-hvac-maintenance-newark-de", "Commercial Maintenance", "Between seasons and tenants."),
    ],
  },
  {
    slug: "commercial-heating-newark-de",
    category: "commercial",
    title: "Commercial Heating in Newark, DE | Newark HVAC Pros",
    description:
      "Commercial heating in Newark, DE for shops, offices, and small rental buildings. Winter heat for light commercial space in New Castle County.",
    h1: "Commercial Heating in Newark, DE",
    eyebrow: "Business heat",
    lede: "A cold office on a Monday morning is a different call than a house furnace. Occupied commercial space still uses rooftops, unit heaters, and splits. This page is heat for that scale of building.",
    image: PHOTOS.commercial,
    imageAlt: "Commercial interior with exposed heating and cooling infrastructure",
    problems: [
      "Opening a shop to a space that never came up to temperature",
      "One suite cold while another is tolerable",
      "A rooftop that heats poorly after a cold snap",
    ],
    includes: [
      "Diagnosis of packaged heat, splits, and related controls",
      "Access planning with the owner or manager",
      "Repair or replacement options at light-commercial scale",
    ],
    signs: [
      "Staff in coats inside after the system has been “on” for hours",
      "Heat that dies after a short run",
      "Tenant complaints that start every November",
    ],
    why: "Commercial heating still has to be safe. Fuel-fired rooftops and indoor equipment get the same odor and CO respect as a house furnace — then we talk about the occupied space.",
    local: "Christiana and Ogletown strips, plus Newark offices that share a building, are the heating calls this page covers.",
    process: [
      { title: "Call", text: "Property type, access, and no heat." },
      { title: "Safety", text: "Fuel odor: evacuate and contact the utility. Then us." },
      { title: "Inspect", text: "With keys and roof or mechanical access." },
    ],
    faqs: [
      {
        q: "Do you heat warehouses and plants?",
        a: "Large industrial is outside the focus. Ask when you call rather than assuming a match.",
      },
    ],
    related: [
      rel("commercial-hvac-newark-de", "Commercial HVAC", "Year-round light commercial service."),
      rel("furnace-repair-newark-de", "Furnace Repair", "Residential heating."),
      rel("emergency-heating-newark-de", "Emergency Heating", "No heat in occupied space."),
    ],
  },
  {
    slug: "commercial-hvac-maintenance-newark-de",
    category: "commercial",
    title: "Commercial HVAC Maintenance in Newark, DE | Newark HVAC Pros",
    description:
      "Commercial HVAC maintenance in Newark, DE for shops, offices, and rentals — filter, coil, and rooftop checkups between tenant turnovers.",
    h1: "Commercial HVAC Maintenance in Newark, DE",
    eyebrow: "Between tenants and seasons",
    lede: "Light commercial equipment fails in July and January for the same reason houses do: filters, coils, and drains that were ignored between occupancies. Maintenance is a scheduled look, not a membership speech.",
    image: PHOTOS.office,
    imageAlt: "Office interior served by maintained commercial HVAC equipment",
    problems: [
      "No one has opened the rooftop since the last emergency invoice",
      "Filters left in place through a tenant change",
      "You want cooling or heat checked before a busy season",
    ],
    includes: [
      "Filter, coil, and drain review on the equipment you actually have",
      "A punch list for the owner",
      "Notes on access issues that will slow the next repair",
    ],
    signs: [
      "Each turnover brings a new comfort complaint",
      "The unit is loud or icing before peak weather",
      "You cannot remember the last professional visit",
    ],
    why: "Commercial maintenance is how you stop paying emergency rates for a clogged filter. It is not a guarantee that a 15-year rooftop will last another decade.",
    local: "Campus rentals and Christiana retail both go dark between occupants. That is when coils pack with dust and the next tenant inherits the failure.",
    process: [
      { title: "Call", text: "Property type and whether you want a cooling or heating checkup." },
      { title: "Access", text: "Keys, roof, and who meets the technician." },
      { title: "Report", text: "What we saw and what can wait." },
    ],
    faqs: [
      {
        q: "Do you offer a published maintenance contract?",
        a: "Not unless a real plan is listed later. You can request a commercial checkup as a scheduled visit.",
      },
    ],
    related: [
      rel("commercial-hvac-newark-de", "Commercial HVAC", "Repair and replacement for light commercial."),
      rel("hvac-maintenance-newark-de", "HVAC Maintenance", "Residential seasonal checkups."),
      rel("commercial-ac-newark-de", "Commercial AC", "When cooling already failed."),
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

