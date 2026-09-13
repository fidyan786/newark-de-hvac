import { areas } from "../areas";
import { services } from "../services";
import { site } from "../site";
import type { ChatAction, ChatBoot, ChatLink, Intent } from "./types";

const serviceExists = new Set(services.map((s) => s.slug));
const areaExists = new Set(areas.map((a) => a.slug));

function page(slug: string, label: string): ChatLink | null {
  if (serviceExists.has(slug) || areaExists.has(slug) || slug === "service-area" || slug === "contact" || slug === "services") {
    return { href: `/${slug}/`, label };
  }
  return null;
}

export const SERVICE_FOR_INTENT: Record<Intent, ChatLink | null> = {
  AC_REPAIR: page("ac-repair-newark-de", "View AC Repair"),
  AC_INSTALLATION: page("ac-installation-newark-de", "AC Installation"),
  AC_REPLACEMENT: page("hvac-replacement-newark-de", "HVAC Replacement"),
  AC_MAINTENANCE: page("hvac-maintenance-newark-de", "HVAC Maintenance"),
  FURNACE_REPAIR: page("furnace-repair-newark-de", "View Furnace Repair"),
  FURNACE_INSTALLATION: page("furnace-installation-newark-de", "Furnace Installation"),
  FURNACE_REPLACEMENT: page("hvac-replacement-newark-de", "HVAC Replacement"),
  FURNACE_MAINTENANCE: page("hvac-maintenance-newark-de", "HVAC Maintenance"),
  HEATING_REPAIR: page("furnace-repair-newark-de", "View Heating Repair"),
  HVAC_REPAIR: page("emergency-hvac-newark-de", "HVAC Repair"),
  HVAC_REPLACEMENT: page("hvac-replacement-newark-de", "HVAC Replacement"),
  HVAC_MAINTENANCE: page("hvac-maintenance-newark-de", "View Maintenance"),
  HEAT_PUMP_REPAIR: page("heat-pump-repair-newark-de", "Heat Pump Repair"),
  HEAT_PUMP_INSTALLATION: page("heat-pump-installation-newark-de", "Heat Pump Installation"),
  HEAT_PUMP_MAINTENANCE: page("hvac-maintenance-newark-de", "Heat Pump Maintenance"),
  DUCTLESS: page("ductless-mini-split-newark-de", "Ductless Mini Splits"),
  MINI_SPLIT: page("ductless-mini-split-newark-de", "Ductless Mini Splits"),
  INDOOR_AIR_QUALITY: page("indoor-air-quality-newark-de", "Indoor Air Quality"),
  AIR_FILTRATION: page("indoor-air-quality-newark-de", "Air Filtration"),
  HUMIDITY: page("indoor-air-quality-newark-de", "Indoor Air Quality"),
  DUCTWORK: page("duct-cleaning-newark-de", "Ductwork"),
  COMMERCIAL_HVAC: page("commercial-hvac-newark-de", "Commercial HVAC"),
  EMERGENCY: page("emergency-hvac-newark-de", "Emergency HVAC"),
  SERVICE_AREA: page("service-area", "Service Area"),
  CONTACT: page("contact", "Contact"),
  REQUEST_SERVICE: page("contact", "Request Service"),
  CALL_NOW: null,
  PRICING: null,
  GENERAL_QUESTION: page("services", "View Services"),
  UNKNOWN: null,
};

export const SERVICE_OPTIONS = [
  "AC Repair",
  "AC Installation",
  "Furnace Repair",
  "Furnace Installation",
  "Heat Pump Repair",
  "Heat Pump Installation",
  "HVAC Replacement",
  "HVAC Maintenance",
  "Ductless Mini Split",
  "Indoor Air Quality",
  "Ductwork",
  "Commercial HVAC",
  "Emergency HVAC",
  "Not sure",
] as const;

export const COMMUNITY_PAGES: Record<string, { href: string; label: string; zip?: string }> = {
  newark: { href: "/service-area/", label: "Newark service area" },
  bear: { href: "/bear-de-hvac/", label: "HVAC in Bear" },
  glasgow: { href: "/glasgow-de-hvac/", label: "HVAC in Glasgow" },
  "pike creek": { href: "/pike-creek-de-hvac/", label: "HVAC in Pike Creek" },
  hockessin: { href: "/hockessin-de-hvac/", label: "HVAC in Hockessin" },
  christiana: { href: "/christiana-de-hvac/", label: "HVAC in Christiana" },
  brookside: { href: "/service-area/", label: "Service area" },
  ogletown: { href: "/service-area/", label: "Service area" },
  "new castle": { href: "/service-area/", label: "Service area" },
};

export const PAGE_OPENINGS: Record<string, { greeting: string; intent?: Intent; actions: string[] }> = {
  home: {
    greeting: "How can we help with your HVAC system?",
    actions: [
      "ac_problem",
      "heating_problem",
      "hvac_repair",
      "installation",
      "maintenance",
      "heat_pump",
      "iaq",
      "commercial",
      "emergency",
      "call_now",
    ],
  },
  "ac-repair-newark-de": {
    greeting: "Looking for AC repair in Newark?",
    intent: "AC_REPAIR",
    actions: ["running_warm", "wont_turn_on", "ac_leak", "request_service", "call_now"],
  },
  "ac-installation-newark-de": {
    greeting: "Looking at a new air conditioner for your Newark home?",
    intent: "AC_INSTALLATION",
    actions: ["installation", "ac_problem", "request_service", "call_now"],
  },
  "furnace-repair-newark-de": {
    greeting: "Need help with a furnace problem?",
    intent: "FURNACE_REPAIR",
    actions: ["not_turning_on", "no_heat", "furnace_noise", "request_service", "call_now"],
  },
  "furnace-installation-newark-de": {
    greeting: "Looking at furnace installation in Newark?",
    intent: "FURNACE_INSTALLATION",
    actions: ["installation", "heating_problem", "request_service", "call_now"],
  },
  "heat-pump-repair-newark-de": {
    greeting: "Need help with a heat pump?",
    intent: "HEAT_PUMP_REPAIR",
    actions: ["hp_repair", "hp_install", "request_service", "call_now"],
  },
  "heat-pump-installation-newark-de": {
    greeting: "Looking at heat pump installation?",
    intent: "HEAT_PUMP_INSTALLATION",
    actions: ["hp_install", "hp_repair", "request_service", "call_now"],
  },
  "hvac-replacement-newark-de": {
    greeting: "Considering an HVAC replacement in Newark?",
    intent: "HVAC_REPLACEMENT",
    actions: ["installation", "hvac_repair", "request_service", "call_now"],
  },
  "hvac-maintenance-newark-de": {
    greeting: "Need HVAC maintenance in Newark?",
    intent: "HVAC_MAINTENANCE",
    actions: ["maintenance", "ac_problem", "heating_problem", "request_service", "call_now"],
  },
  "emergency-hvac-newark-de": {
    greeting: "If heating or cooling is down, we can help you take the next step.",
    intent: "EMERGENCY",
    actions: ["ac_problem", "heating_problem", "request_service", "call_now"],
  },
  "ductless-mini-split-newark-de": {
    greeting: "Looking for ductless mini split help?",
    intent: "DUCTLESS",
    actions: ["mini_split", "request_service", "call_now"],
  },
  "indoor-air-quality-newark-de": {
    greeting: "Looking for indoor air quality help in Newark?",
    intent: "INDOOR_AIR_QUALITY",
    actions: ["iaq", "ductwork", "request_service", "call_now"],
  },
  "duct-cleaning-newark-de": {
    greeting: "Need help with ducts or airflow?",
    intent: "DUCTWORK",
    actions: ["ductwork", "iaq", "request_service", "call_now"],
  },
  "commercial-hvac-newark-de": {
    greeting: "Looking for commercial HVAC service?",
    intent: "COMMERCIAL_HVAC",
    actions: ["commercial", "request_service", "call_now"],
  },
  "service-area": {
    greeting: "Wondering if we cover your town?",
    intent: "SERVICE_AREA",
    actions: ["request_service", "call_now"],
  },
  contact: {
    greeting: "Need to reach Newark HVAC Pros?",
    intent: "CONTACT",
    actions: ["request_service", "call_now", "ac_problem", "heating_problem"],
  },
  services: {
    greeting: "Which HVAC service can we help with?",
    actions: [
      "ac_problem",
      "heating_problem",
      "installation",
      "maintenance",
      "heat_pump",
      "commercial",
      "request_service",
      "call_now",
    ],
  },
  "bear-de-hvac": {
    greeting: "Looking for HVAC service in Bear?",
    actions: ["ac_problem", "heating_problem", "request_service", "call_now"],
  },
  "pike-creek-de-hvac": {
    greeting: "Looking for HVAC service in Pike Creek?",
    actions: ["ac_problem", "heating_problem", "request_service", "call_now"],
  },
  "glasgow-de-hvac": {
    greeting: "Looking for HVAC service in Glasgow?",
    actions: ["ac_problem", "heating_problem", "request_service", "call_now"],
  },
  "hockessin-de-hvac": {
    greeting: "Looking for HVAC service in Hockessin?",
    actions: ["ac_problem", "heating_problem", "request_service", "call_now"],
  },
  "christiana-de-hvac": {
    greeting: "Looking for HVAC service in Christiana?",
    actions: ["ac_problem", "heating_problem", "commercial", "request_service", "call_now"],
  },
};

export const ACTION_META: Record<string, { label: string; intent?: Intent; problem?: string; patch?: Record<string, unknown> }> = {
  ac_problem: { label: "AC Problem", intent: "AC_REPAIR", problem: "AC / cooling problem", patch: { equipment: "ac" } },
  heating_problem: { label: "Heating Problem", intent: "HEATING_REPAIR", problem: "Heating problem", patch: { equipment: "furnace" } },
  hvac_repair: { label: "HVAC Repair", intent: "HVAC_REPAIR", problem: "HVAC repair" },
  installation: { label: "Installation / Replacement", intent: "HVAC_REPLACEMENT", problem: "Installation / replacement" },
  maintenance: { label: "Maintenance", intent: "HVAC_MAINTENANCE", problem: "Maintenance" },
  heat_pump: { label: "Heat Pump", intent: "HEAT_PUMP_REPAIR", problem: "Heat pump", patch: { equipment: "heat_pump" } },
  iaq: { label: "Indoor Air Quality", intent: "INDOOR_AIR_QUALITY", problem: "Indoor air quality", patch: { equipment: "iaq" } },
  commercial: { label: "Commercial HVAC", intent: "COMMERCIAL_HVAC", problem: "Commercial HVAC", patch: { equipment: "commercial" } },
  emergency: { label: "Emergency", intent: "EMERGENCY", problem: "Urgent HVAC problem", patch: { highIntent: true, urgency: "now" } },
  call_now: { label: "Call Now", intent: "CALL_NOW" },
  request_service: { label: "Request Service", intent: "REQUEST_SERVICE", patch: { wantsService: true, highIntent: true } },
  running_warm: { label: "Running but warm", intent: "AC_REPAIR", problem: "Running but blowing warm air", patch: { systemStatus: "running_warm", equipment: "ac" } },
  wont_turn_on: { label: "Won't turn on", patch: { systemStatus: "off" } },
  not_sure: { label: "Not sure", patch: { systemStatus: "unsure" } },
  whole_home: { label: "Throughout the home", patch: { scope: "whole" } },
  one_area: { label: "One area", patch: { scope: "one" } },
  ac_leak: { label: "Water around the AC", intent: "AC_REPAIR", problem: "Water around the AC", patch: { equipment: "ac" } },
  not_turning_on: { label: "Won't start", intent: "FURNACE_REPAIR", problem: "Furnace will not start", patch: { systemStatus: "off", equipment: "furnace" } },
  no_heat: { label: "No heat", intent: "FURNACE_REPAIR", problem: "No heat", patch: { equipment: "furnace" } },
  furnace_noise: { label: "Strange noise", intent: "FURNACE_REPAIR", problem: "Furnace making noise", patch: { equipment: "furnace" } },
  turning_on: { label: "It turns on", patch: { systemStatus: "running_ok" } },
  still_cooling: { label: "Still cooling", patch: { systemStatus: "running_ok" } },
  not_cooling: { label: "Cooling has stopped", patch: { systemStatus: "running_warm", equipment: "ac" } },
  hp_repair: { label: "Heat pump repair", intent: "HEAT_PUMP_REPAIR", patch: { equipment: "heat_pump" } },
  hp_install: { label: "New heat pump", intent: "HEAT_PUMP_INSTALLATION", patch: { equipment: "heat_pump", highIntent: true } },
  mini_split: { label: "Mini split", intent: "MINI_SPLIT", patch: { equipment: "ductless" } },
  ductwork: { label: "Ductwork", intent: "DUCTWORK", patch: { equipment: "ducts" } },
  install_ac: { label: "New AC", intent: "AC_INSTALLATION", patch: { equipment: "ac", highIntent: true } },
  install_furnace: { label: "New furnace", intent: "FURNACE_INSTALLATION", patch: { equipment: "furnace", highIntent: true } },
  install_full: { label: "Full HVAC system", intent: "HVAC_REPLACEMENT", patch: { highIntent: true } },
};

export function slugFromPath(pathname: string) {
  const clean = pathname.replace(/\/+$/, "").replace(/^\//, "");
  if (!clean) return "home";
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "services" && parts[1]) return parts[1];
  return parts[parts.length - 1] || "home";
}

export function openingFor(slug: string) {
  return PAGE_OPENINGS[slug] || PAGE_OPENINGS.home;
}

export function callAction(boot: ChatBoot): ChatAction {
  if (boot.hasPhone) {
    return {
      id: "call_now",
      kind: "call",
      label: "Call for Service",
      href: `tel:${boot.phoneTel}`,
    };
  }
  return { id: "contact", kind: "link", label: "Call for Service", href: "/contact/" };
}

export function requestAction(): ChatAction {
  return { id: "request_service", kind: "request", label: "Request Service" };
}

export function zipLists() {
  return {
    primary: site.zipsPrimary as readonly string[],
    campus: site.zipsCampus as readonly string[],
    nearby: site.zipsNearby as readonly string[],
    communities: site.communities as readonly string[],
  };
}

export function classifyZip(zip: string) {
  const lists = zipLists();
  if (lists.primary.includes(zip)) return "primary" as const;
  if (lists.campus.includes(zip)) return "campus" as const;
  if (lists.nearby.includes(zip)) return "nearby" as const;
  return "unknown" as const;
}

export function serviceLabelFor(intent: Intent | null) {
  if (!intent) return "";
  return SERVICE_FOR_INTENT[intent]?.label.replace(/^View /, "") || "";
}
