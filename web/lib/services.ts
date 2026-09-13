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
  problems: string[];
  includes: string[];
  signs: string[];
  why: string;
  local: string;
  process: { title: string; text: string }[];
  faqs: Faq[];
  related: { href: string; label: string; text: string }[];
};

export const services: ServiceContent[] = [
  {
    slug: "emergency-hvac-newark-de",
    title: "Emergency HVAC Newark, DE | No Heat or No Cooling",
    description:
      "Emergency HVAC help in Newark, DE when there is no heat, no cooling, or a system that will not start. Serving New Castle County ZIPs including 19702, 19711, 19713, and 19725.",
    h1: "Emergency HVAC in Newark, DE",
    eyebrow: "Urgent heating & cooling",
    lede: "When a Newark home loses heat on a January night or cooling in a humid July stretch, the next step is a phone call — not a long form. Tell us the ZIP and the symptom. We will help you decide what to do next.",
    image: "/images/hero/service.jpg",
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
      "A clear explanation of repair vs. replacement once the system is inspected",
    ],
    signs: [
      "Outdoor unit silent, humming, or clicking without starting",
      "Furnace ignites then shuts down",
      "Breaker will not stay on for the condenser or air handler",
      "No airflow in any room",
    ],
    why: "Newark sits in IECC Climate Zone 4A — mixed-humid. Homes need both heat and cooling. A failed system is a comfort problem and, in extreme weather, a safety problem for older adults, infants, and campus rentals.",
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
        a: "Yes, with owner or property-manager approval. We still need a valid on-site contact and ZIP.",
      },
    ],
    related: [
      { href: "/furnace-repair-newark-de/", label: "Furnace Repair", text: "No-heat diagnosis for gas and oil systems." },
      { href: "/ac-repair-newark-de/", label: "AC Repair", text: "Warm air, ice, and condensers that will not start." },
      { href: "/heat-pump-repair-newark-de/", label: "Heat Pump Repair", text: "When one machine handles both seasons." },
    ],
  },
  {
    slug: "ac-repair-newark-de",
    title: "AC Repair Newark, DE | Air Conditioning Service",
    description:
      "AC repair in Newark, DE for homes that are not cooling, freezing up, or leaking. Serving 19702, 19711, 19713, 19725 and nearby New Castle County communities.",
    h1: "AC Repair in Newark, DE",
    eyebrow: "Cooling service",
    lede: "Central air that runs but will not drop the temperature is a classic Newark summer call. Humidity along the Christina River and around campus makes a weak condenser feel like a total failure.",
    image: "/images/ac/outdoor-unit.jpg",
    imageAlt: "Outdoor heat-pump and air-conditioning units at a residence",
    problems: [
      "AC blowing warm air on a humid afternoon",
      "Outdoor unit silent, humming, or clicking",
      "Ice on copper lines or the indoor coil",
      "Water around the furnace closet or ceiling stains",
      "Rooms on the west side much hotter than others",
      "Short cycling — on and off every few minutes",
    ],
    includes: [
      "Electrical checks on capacitors, contactors, and the outdoor fan",
      "Airflow and filter inspection",
      "Condensate drain and pan review",
      "Temperature split across the coil",
      "A straightforward recommendation: repair, watch, or replace",
    ],
    signs: [
      "Musty smell at startup after the system sat unused",
      "Breaker tripping when the condenser kicks on",
      "Thermostat calling for cool with no outdoor response",
    ],
    why: "A condenser that “kind of cools” still leaves indoor humidity high. In mixed-humid Zone 4A that is the difference between a livable house and a sticky one.",
    local: "Many Newark houses date to the 1970s. Second-generation condensers from the 1990s and 2000s are now in the failure window — especially in 19711 campus-area rentals and 19702 family streets toward Glasgow.",
    process: [
      { title: "Call", text: "Describe the symptom: not cooling, leaking, or will not start." },
      { title: "Inspect", text: "We check electrical, airflow, and coil conditions." },
      { title: "Explain", text: "You hear what failed and what the options are." },
      { title: "Repair", text: "Work continues only after you approve the path." },
    ],
    faqs: [
      {
        q: "Why is my AC running but the house still feels humid?",
        a: "Dirty filters, clogged outdoor coils, low refrigerant, and failing capacitors are the usual four. Humidity makes a small temperature miss feel like the system is dead.",
      },
      {
        q: "Do you service rental properties near UD?",
        a: "Yes, with owner approval and a valid on-site contact.",
      },
      {
        q: "Should I keep resetting the breaker?",
        a: "No. A breaker that will not stay on is a stop-and-call situation, not a DIY loop.",
      },
    ],
    related: [
      { href: "/ac-installation-newark-de/", label: "AC Installation", text: "When repair is no longer the useful path." },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance", text: "Spring checkups before peak cooling." },
      { href: "/emergency-hvac-newark-de/", label: "Emergency HVAC", text: "No cooling during a heat spike." },
    ],
  },
  {
    slug: "ac-installation-newark-de",
    title: "AC Installation Newark, DE | Replacement Cooling Systems",
    description:
      "AC installation and replacement in Newark, DE. Right-sized cooling for New Castle County homes dealing with humid summers and older housing stock.",
    h1: "AC Installation in Newark, DE",
    eyebrow: "New cooling systems",
    lede: "A replacement condenser is not a catalog pick. Newark homes need equipment matched to humidity, ductwork, and how the house is actually used — including student rentals and 1970s ranches.",
    image: "/images/ac/condenser-close.jpg",
    imageAlt: "Technician checking condenser coils on outdoor HVAC equipment",
    problems: [
      "Repair quotes stacking up on an aging outdoor unit",
      "Rooms that never catch up on humid afternoons",
      "A condenser using obsolete refrigerant",
      "Ducts that were never resized after a remodel",
    ],
    includes: [
      "Load-aware equipment discussion (not a one-size outdoor unit)",
      "Look at existing ductwork and electrical",
      "Installation of the outdoor unit and matching indoor coil when needed",
      "Startup, charging, and a walkthrough of the thermostat",
    ],
    signs: [
      "The outdoor unit is original to a 1990s or early-2000s install",
      "Ice events keep returning after “top-offs”",
      "You are planning a major electrical or window project anyway",
    ],
    why: "Oversized cooling short-cycles and leaves humidity behind. Undersized cooling never catches up on a Newark July afternoon. Sizing matters more than a brand name on the cabinet.",
    local: "Christiana-area infill, Pike Creek wooded lots, and Brookside ranches all behave differently. Tree cover, west-facing glass, and leaky returns change the job.",
    process: [
      { title: "Call", text: "Tell us the age of the system and the rooms that struggle." },
      { title: "Evaluate", text: "We look at the house, ducts, and electrical — not just the old model number." },
      { title: "Propose", text: "You see the recommended system and what it will and will not solve." },
      { title: "Install", text: "Crews set, connect, and start the equipment after you approve." },
    ],
    faqs: [
      {
        q: "Do I need new ducts with a new AC?",
        a: "Not always. We inspect returns and trunks first. Many Newark homes need sealing or a return upgrade more than a larger outdoor unit.",
      },
      {
        q: "Can you replace only the outdoor unit?",
        a: "Sometimes. Mismatched coils and refrigerants are a common reason a “cheap outdoor swap” performs poorly.",
      },
    ],
    related: [
      { href: "/ac-repair-newark-de/", label: "AC Repair", text: "When the current system can still be saved." },
      { href: "/hvac-replacement-newark-de/", label: "HVAC Replacement", text: "Heat and cool together." },
      { href: "/ductless-mini-split-newark-de/", label: "Mini Splits", text: "For rooms the ducts never reached." },
    ],
  },
  {
    slug: "furnace-repair-newark-de",
    title: "Furnace Repair Newark, DE | Heating Service",
    description:
      "Furnace repair in Newark, DE for no-heat calls, short cycling, and ignition problems on gas and oil systems common in New Castle County homes.",
    h1: "Furnace Repair in Newark, DE",
    eyebrow: "Heating service",
    lede: "January nights in Newark are cold enough that a furnace that will not ignite is not a wait-until-Monday inconvenience. Gas and oil systems are both common on older streets.",
    image: "/images/furnace/mechanical-room.jpg",
    imageAlt: "Electrical panel inspection during a heating-system diagnosis",
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
    why: "Fuel-fired heat needs respect. Odors, soot, or a CO alarm are stop-and-evacuate situations — not YouTube fixes.",
    local: "Oil heat still shows up in older New Castle County stock. Gas furnaces are the majority on post-1970 streets. Both fail on the coldest nights for the same reason: they finally got a real load.",
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
      { href: "/furnace-installation-newark-de/", label: "Furnace Installation", text: "When the heat exchanger or cabinet is done." },
      { href: "/emergency-hvac-newark-de/", label: "Emergency HVAC", text: "No heat in cold weather." },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance", text: "Fall checkups before the first freeze." },
    ],
  },
  {
    slug: "furnace-installation-newark-de",
    title: "Furnace Installation Newark, DE | Replacement Heating",
    description:
      "Furnace installation in Newark, DE for homes replacing aging gas or oil heat. Sized for New Castle County winters, not a generic catalog unit.",
    h1: "Furnace Installation in Newark, DE",
    eyebrow: "New heating systems",
    lede: "A new furnace should match the house: duct size, chimney or PVC venting, and how cold a Newark January actually gets — not the largest cabinet that fits the closet.",
    image: "/images/furnace/industrial-pipes.jpg",
    imageAlt: "Commercial interior with exposed heating and cooling ducts",
    problems: [
      "Repeated no-heat repairs on the same furnace",
      "A cracked heat exchanger concern",
      "Oil-to-gas or efficiency conversations after a failed season",
      "Uneven heat that a “bigger furnace” will not magically fix",
    ],
    includes: [
      "Review of venting, gas line or oil accessories, and electrical",
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
      { href: "/furnace-repair-newark-de/", label: "Furnace Repair", text: "When the current heat plant can still work." },
      { href: "/hvac-replacement-newark-de/", label: "HVAC Replacement", text: "Paired heating and cooling." },
      { href: "/heat-pump-installation-newark-de/", label: "Heat Pumps", text: "Another path for some Newark homes." },
    ],
  },
  {
    slug: "heat-pump-repair-newark-de",
    title: "Heat Pump Repair Newark, DE | Heating and Cooling",
    description:
      "Heat pump repair in Newark, DE when a dual-mode system will not heat, will not cool, or is stuck in one season. Serving New Castle County.",
    h1: "Heat Pump Repair in Newark, DE",
    eyebrow: "Dual-mode systems",
    lede: "A heat pump that only works in one season is a Newark shoulder-month classic. Reversing valves, defrost boards, and backup heat strips fail just as the weather changes.",
    image: "/images/heat-pump/install.jpg",
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
      { title: "Inspect", text: "We check reversing, defrost, and backup heat." },
      { title: "Explain", text: "Control issue vs. mechanical failure." },
      { title: "Repair", text: "Approved work only." },
    ],
    faqs: [
      {
        q: "Is lukewarm winter air normal?",
        a: "Heat pump air is often less hot than furnace air. No heat at all, or ice that never clears, is not normal.",
      },
    ],
    related: [
      { href: "/heat-pump-installation-newark-de/", label: "Heat Pump Installation", text: "New dual-mode systems." },
      { href: "/ac-repair-newark-de/", label: "AC Repair", text: "Cooling-mode failures." },
      { href: "/furnace-repair-newark-de/", label: "Furnace Repair", text: "Backup or dual-fuel heat." },
    ],
  },
  {
    slug: "heat-pump-installation-newark-de",
    title: "Heat Pump Installation Newark, DE | Year-Round HVAC",
    description:
      "Heat pump installation in Newark, DE for homeowners who want heating and cooling from one outdoor unit, sized for New Castle County winters and humid summers.",
    h1: "Heat Pump Installation in Newark, DE",
    eyebrow: "Year-round comfort",
    lede: "A heat pump can be the right Newark system when ducts, electrical, and expectations are honest. It is not a magic swap for every oil furnace in a 1970s ranch.",
    image: "/images/heat-pump/outdoor.jpg",
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
    local: "Energize Delaware and utility conversations change over time. We discuss current programs when you call rather than publishing stale rebate numbers.",
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
      { href: "/heat-pump-repair-newark-de/", label: "Heat Pump Repair", text: "Service for existing units." },
      { href: "/hvac-replacement-newark-de/", label: "HVAC Replacement", text: "Full changeouts." },
      { href: "/ductless-mini-split-newark-de/", label: "Mini Splits", text: "Room-by-room heat pumps." },
    ],
  },
  {
    slug: "hvac-replacement-newark-de",
    title: "HVAC Replacement Newark, DE | Full System Changeouts",
    description:
      "HVAC replacement in Newark, DE when heating and cooling both need to come out. Designed for New Castle County homes, not a boxed pair from a warehouse aisle.",
    h1: "HVAC Replacement in Newark, DE",
    eyebrow: "Complete systems",
    lede: "When the furnace and the air conditioner are both tired, replacing them as a pair is often cleaner than stacking one more repair on each.",
    image: "/images/heat-pump/install.jpg",
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
      { href: "/ac-installation-newark-de/", label: "AC Installation", text: "Cooling-only replacements." },
      { href: "/furnace-installation-newark-de/", label: "Furnace Installation", text: "Heat-only replacements." },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance", text: "Protect a new system after install." },
    ],
  },
  {
    slug: "hvac-maintenance-newark-de",
    title: "HVAC Maintenance Newark, DE | Seasonal Checkups",
    description:
      "HVAC maintenance in Newark, DE — spring cooling checkups and fall heating checkups for New Castle County homes before peak weather arrives.",
    h1: "HVAC Maintenance in Newark, DE",
    eyebrow: "Seasonal checkups",
    lede: "Maintenance is not a magic shield. It is a chance to catch a weak capacitor, a dirty flame sensor, or a clogged drain before the first 90-degree afternoon or the first freeze.",
    image: "/images/maintenance/tools.jpg",
    imageAlt: "Electrical work during an HVAC maintenance visit",
    problems: [
      "The system has not been opened since the last emergency call",
      "Filters have been ignored through a UD rental turnover",
      "You want a checkup before leaving town",
    ],
    includes: [
      "Filter and airflow review",
      "Outdoor coil and drain inspection in cooling season",
      "Ignition and safety look-over in heating season",
      "A punch list of what can wait and what should not",
    ],
    signs: [
      "Last year’s “small noise” is now a large noise",
      "The filter is gray and bowed",
      "You cannot remember the last professional visit",
    ],
    why: "Peak-season failures in Newark are often the same parts that a quiet April visit would have flagged.",
    local: "Spring AC visits matter because Delaware summers are humid, not just hot. Fall furnace visits matter because January does not give you a warmup week.",
    process: [
      { title: "Call", text: "Ask for a cooling checkup or a heating checkup." },
      { title: "Visit", text: "We inspect, test, and note anything that needs a follow-up." },
      { title: "Review", text: "You get the findings without a scare script." },
    ],
    faqs: [
      {
        q: "Is this a membership club?",
        a: "Not unless we publish a real plan later. Right now you can request a seasonal checkup as a one-time visit.",
      },
    ],
    related: [
      { href: "/ac-repair-newark-de/", label: "AC Repair", text: "When cooling already failed." },
      { href: "/furnace-repair-newark-de/", label: "Furnace Repair", text: "When heat already failed." },
    ],
  },
  {
    slug: "ductless-mini-split-newark-de",
    title: "Ductless Mini Splits Newark, DE | Room Heating and Cooling",
    description:
      "Ductless mini split installation and service in Newark, DE for additions, garages, and rooms the original ducts never reached.",
    h1: "Ductless Mini Splits in Newark, DE",
    eyebrow: "Room-by-room comfort",
    lede: "Mini splits solve rooms that central air gave up on: sunrooms, finished attics, campus conversions, and additions on tight Newark lots.",
    image: "/images/ductless/indoor.jpg",
    imageAlt: "Finished living room served by a central air system",
    problems: [
      "One room that never matches the rest of the house",
      "An addition with no duct chase",
      "A rental where window units are the current “system”",
    ],
    includes: [
      "Load talk for the actual room, not the whole house",
      "Line-set routing that respects siding and bedrooms",
      "Indoor head placement for throw and condensate",
      "Startup and remote/thermostat walkthrough",
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
      { href: "/ac-installation-newark-de/", label: "AC Installation", text: "Central cooling when ducts already exist." },
      { href: "/heat-pump-installation-newark-de/", label: "Heat Pumps", text: "Ducted year-round systems." },
    ],
  },
  {
    slug: "indoor-air-quality-newark-de",
    title: "Indoor Air Quality Newark, DE | Filtration and Humidity",
    description:
      "Indoor air quality service in Newark, DE — filtration, humidity, and ventilation conversations for mixed-humid New Castle County homes.",
    h1: "Indoor Air Quality in Newark, DE",
    eyebrow: "Air you actually live in",
    lede: "Sticky summers and tight winter houses both make indoor air worse. IAQ work here is about filtration, humidity, and ventilation — not a miracle cartridge.",
    image: "/images/iaq/vents.jpg",
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
      { href: "/duct-cleaning-newark-de/", label: "Duct Cleaning", text: "When trunks are actually dirty." },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance", text: "Filters and coils first." },
    ],
  },
  {
    slug: "duct-cleaning-newark-de",
    title: "Duct Cleaning Newark, DE | Airflow and Dust",
    description:
      "Duct cleaning and ductwork conversations in Newark, DE for homes with dust, odor, or weak airflow — recommended only when it is actually useful.",
    h1: "Duct Cleaning in Newark, DE",
    eyebrow: "Ducts & airflow",
    lede: "Duct cleaning is not an annual ritual. It is useful after renovation dust, pest issues, or when returns are packed. It is not a substitute for repairing a leaking trunk.",
    image: "/images/iaq/ducts.jpg",
    imageAlt: "Exposed ductwork in a commercial interior",
    problems: [
      "Visible dust blowing from supplies after construction",
      "Odors that clearly come from the return",
      "Weak airflow in rooms far from the air handler",
    ],
    includes: [
      "A look at whether cleaning will help — or whether sealing/repair will",
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
      { href: "/indoor-air-quality-newark-de/", label: "Indoor Air Quality", text: "Filters and humidity." },
      { href: "/hvac-replacement-newark-de/", label: "HVAC Replacement", text: "When the system itself is the issue." },
    ],
  },
  {
    slug: "commercial-hvac-newark-de",
    title: "Commercial HVAC Newark, DE | Shops, Offices, Rentals",
    description:
      "Commercial HVAC service in Newark, DE for small offices, retail, and rental properties in New Castle County — not a nationwide facilities contract.",
    h1: "Commercial HVAC in Newark, DE",
    eyebrow: "Light commercial",
    lede: "Main Street suites, Christiana-area retail, and multi-unit rentals near campus need HVAC that shows up. This is light commercial and rental work — not a promise to run a hospital campus.",
    image: "/images/commercial/building.jpg",
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
      { href: "/ac-repair-newark-de/", label: "AC Repair", text: "Cooling for smaller buildings." },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance", text: "Between tenant turnovers." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
