export type Intent =
  | "AC_REPAIR"
  | "AC_INSTALLATION"
  | "AC_REPLACEMENT"
  | "AC_MAINTENANCE"
  | "FURNACE_REPAIR"
  | "FURNACE_INSTALLATION"
  | "FURNACE_REPLACEMENT"
  | "FURNACE_MAINTENANCE"
  | "HEATING_REPAIR"
  | "HVAC_REPAIR"
  | "HVAC_REPLACEMENT"
  | "HVAC_MAINTENANCE"
  | "HEAT_PUMP_REPAIR"
  | "HEAT_PUMP_INSTALLATION"
  | "HEAT_PUMP_MAINTENANCE"
  | "DUCTLESS"
  | "MINI_SPLIT"
  | "INDOOR_AIR_QUALITY"
  | "AIR_FILTRATION"
  | "HUMIDITY"
  | "DUCTWORK"
  | "COMMERCIAL_HVAC"
  | "EMERGENCY"
  | "SERVICE_AREA"
  | "CONTACT"
  | "REQUEST_SERVICE"
  | "CALL_NOW"
  | "PRICING"
  | "GENERAL_QUESTION"
  | "UNKNOWN";

export type ChatBoot = {
  brand: string;
  city: string;
  state: string;
  county: string;
  hasPhone: boolean;
  phoneDisplay: string;
  phoneTel: string;
  leadEnabled: boolean;
  aiEnabled: boolean;
  emergencyDispatch: boolean;
  hours: string;
};

export type ActionKind = "quick" | "link" | "call" | "request";

export type ChatAction = {
  id: string;
  label: string;
  kind: ActionKind;
  href?: string;
};

export type ChatLink = { href: string; label: string };

export type PendingQuestion = {
  id: string;
  yes?: Partial<ChatFacts>;
  no?: Partial<ChatFacts>;
};

export type ChatFacts = {
  intent: Intent | null;
  service: string | null;
  problem: string | null;
  urgency: "now" | "soon" | "planning" | null;
  location: string | null;
  zip: string | null;
  zipStatus: "primary" | "campus" | "nearby" | "unknown" | null;
  name: string | null;
  phone: string | null;
  description: string | null;
  systemStatus: "running_warm" | "running_ok" | "off" | "unsure" | null;
  scope: "whole" | "one" | "unsure" | null;
  equipment: "ac" | "furnace" | "heat_pump" | "hvac" | "ductless" | "iaq" | "ducts" | "commercial" | null;
  safety: boolean;
  highIntent: boolean;
  wantsService: boolean;
  pricingAsk: boolean;
  reviewsAsk: boolean;
  availabilityAsk: boolean;
  infoAsk: boolean;
};

export type ChatSession = ChatFacts & {
  pageSlug: string;
  asked: string[];
  pending: PendingQuestion | null;
};

export type EngineReply = {
  text: string;
  actions: ChatAction[];
  links: ChatLink[];
  emergency?: boolean;
  showForm?: boolean;
  intent: Intent;
};

export type Detected = {
  intent: Intent;
  highIntent: boolean;
  wantsService: boolean;
  safety: boolean;
  pricingAsk: boolean;
  reviewsAsk: boolean;
  availabilityAsk: boolean;
  infoAsk: boolean;
  zip: string | null;
  phone: string | null;
  name: string | null;
  city: string | null;
  cityKnown: boolean | null;
  systemStatus: ChatFacts["systemStatus"];
  scope: ChatFacts["scope"];
  equipment: ChatFacts["equipment"];
};

export const ALL_INTENTS: Intent[] = [
  "AC_REPAIR",
  "AC_INSTALLATION",
  "AC_REPLACEMENT",
  "AC_MAINTENANCE",
  "FURNACE_REPAIR",
  "FURNACE_INSTALLATION",
  "FURNACE_REPLACEMENT",
  "FURNACE_MAINTENANCE",
  "HEATING_REPAIR",
  "HVAC_REPAIR",
  "HVAC_REPLACEMENT",
  "HVAC_MAINTENANCE",
  "HEAT_PUMP_REPAIR",
  "HEAT_PUMP_INSTALLATION",
  "HEAT_PUMP_MAINTENANCE",
  "DUCTLESS",
  "MINI_SPLIT",
  "INDOOR_AIR_QUALITY",
  "AIR_FILTRATION",
  "HUMIDITY",
  "DUCTWORK",
  "COMMERCIAL_HVAC",
  "EMERGENCY",
  "SERVICE_AREA",
  "CONTACT",
  "REQUEST_SERVICE",
  "CALL_NOW",
  "PRICING",
  "GENERAL_QUESTION",
  "UNKNOWN",
];
