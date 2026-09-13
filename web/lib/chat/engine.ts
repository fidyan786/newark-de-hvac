import {
  ACTION_META,
  COMMUNITY_PAGES,
  SERVICE_FOR_INTENT,
  callAction,
  classifyZip,
  openingFor,
  requestAction,
  serviceLabelFor,
  zipLists,
} from "./config";
import { nextStep } from "./flows";
import { detect, isShortNo, isShortUnsure, isShortYes, normalize } from "./intents";
import type { ChatAction, ChatBoot, ChatFacts, ChatLink, ChatSession, EngineReply, Intent } from "./types";

function blank(pageSlug: string): ChatSession {
  return {
    pageSlug,
    intent: null,
    service: null,
    problem: null,
    urgency: null,
    location: null,
    zip: null,
    zipStatus: null,
    name: null,
    phone: null,
    description: null,
    systemStatus: null,
    scope: null,
    equipment: null,
    safety: false,
    highIntent: false,
    wantsService: false,
    pricingAsk: false,
    reviewsAsk: false,
    availabilityAsk: false,
    infoAsk: false,
    asked: [],
    pending: null,
  };
}

function merge(session: ChatSession, patch: Partial<ChatFacts>) {
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined || v === null || v === "") continue;
    const key = k as keyof ChatFacts;
    if (key === "safety" || key === "highIntent" || key === "wantsService" || key === "pricingAsk") {
      session[key] = Boolean(v) || session[key];
      continue;
    }
    if (session[key] == null || key === "intent" || key === "systemStatus" || key === "scope") {
      (session as unknown as Record<string, unknown>)[key] = v;
    }
  }
  if (session.intent) session.service = serviceLabelFor(session.intent) || session.service;
}

export class ChatEngine {
  session: ChatSession;
  boot: ChatBoot;

  constructor(opts: { pageSlug: string; boot: ChatBoot }) {
    this.boot = opts.boot;
    this.session = blank(opts.pageSlug);
  }

  snapshot() {
    return { ...this.session, asked: [...this.session.asked] };
  }

  opening(): EngineReply {
    const pack = openingFor(this.session.pageSlug);
    if (pack.intent && !this.session.intent) {
      this.session.intent = pack.intent;
      this.session.service = serviceLabelFor(pack.intent);
    }
    return {
      text: pack.greeting,
      actions: this.actionsFromIds(pack.actions),
      links: [],
      intent: this.session.intent || "GENERAL_QUESTION",
    };
  }

  respond(raw: string, actionId?: string): EngineReply {
    const text = String(raw || "").replace(/\s+/g, " ").trim();
    this.applyAction(actionId);
    if (text) this.ingest(text);

    if (this.session.safety) return this.safetyReply();
    if (actionId === "call_now" || this.session.intent === "CALL_NOW") return this.callReply();
    if (actionId === "request_service" || this.session.intent === "REQUEST_SERVICE" || (this.session.wantsService && this.session.highIntent && this.readyToConvert())) {
      if (this.session.intent === "REQUEST_SERVICE" || actionId === "request_service") return this.formReply();
    }
    if (this.session.pricingAsk) return this.pricingReply();
    if (this.session.reviewsAsk) return this.reviewsReply();
    if (this.session.intent === "SERVICE_AREA") return this.areaReply();
    if (this.session.intent === "CONTACT") return this.contactReply();
    if (this.session.availabilityAsk && this.session.highIntent) return this.availabilityReply();

    if (this.session.infoAsk && this.session.intent && this.session.intent !== "UNKNOWN") return this.convertReply();
    if (this.shouldConvert()) return this.convertReply();

    const step = nextStep(this.session);
    if (step) {
      this.session.asked.push(step.id);
      this.session.pending = step.pending ? { id: step.id, yes: step.pending.yes, no: step.pending.no } : null;
      return {
        text: step.prompt(this.session),
        actions: [
          ...step.options.map((o) => ({ id: o.id, label: o.label, kind: "quick" as const })),
          this.convertCtas()[0],
        ].filter(Boolean),
        links: this.serviceLinks(),
        intent: this.session.intent || "UNKNOWN",
      };
    }

    if (this.session.intent && this.session.intent !== "UNKNOWN") return this.convertReply();
    return this.unknownReply();
  }

  private ingest(text: string) {
    const n = normalize(text);
    if (this.session.pending) {
      if (isShortYes(n) && this.session.pending.yes) merge(this.session, this.session.pending.yes);
      else if (isShortNo(n) && this.session.pending.no) merge(this.session, this.session.pending.no);
      else if (isShortUnsure(n)) merge(this.session, { systemStatus: "unsure" });
      this.session.pending = null;
    }

    const found = detect(text);
    if (found.safety) this.session.safety = true;
    if (found.pricingAsk) this.session.pricingAsk = true;
    if (found.reviewsAsk) this.session.reviewsAsk = true;
    if (found.availabilityAsk) this.session.availabilityAsk = true;
    if (found.infoAsk) this.session.infoAsk = true;
    if (found.highIntent) this.session.highIntent = true;
    if (found.wantsService) this.session.wantsService = true;
    if (found.zip) {
      this.session.zip = found.zip;
      this.session.zipStatus = classifyZip(found.zip);
      this.session.location = found.zip;
    }
    if (found.phone) this.session.phone = found.phone;
    if (found.name) this.session.name = found.name;
    if (found.city) this.session.location = found.city;
    if (found.systemStatus) this.session.systemStatus = found.systemStatus;
    if (found.scope) this.session.scope = found.scope;
    if (found.equipment) this.session.equipment = found.equipment;
    if (found.intent !== "UNKNOWN") this.session.intent = found.intent;
    if (text.length > 8) {
      this.session.problem = this.session.problem ? `${this.session.problem}; ${text}`.slice(0, 240) : text.slice(0, 180);
      this.session.description = this.session.problem;
    }
  }

  private applyAction(actionId?: string) {
    if (!actionId) return;
    const meta = ACTION_META[actionId];
    if (!meta) return;
    if (meta.intent) this.session.intent = meta.intent;
    if (meta.problem) this.session.problem = meta.problem;
    if (meta.patch) merge(this.session, meta.patch as Partial<ChatFacts>);
    this.session.pending = null;
  }

  private shouldConvert() {
    if (this.session.highIntent && this.session.intent && this.session.intent !== "UNKNOWN") return true;
    if (this.session.wantsService && this.session.intent) return true;
    if (this.session.intent && !nextStep(this.session)) {
      const diagnostic = [
        "AC_REPAIR",
        "FURNACE_REPAIR",
        "HEATING_REPAIR",
        "HEAT_PUMP_REPAIR",
        "HVAC_REPAIR",
      ].includes(this.session.intent);
      if (!diagnostic) return true;
      if (this.session.systemStatus || this.session.asked.length > 0) return true;
    }
    return false;
  }

  private readyToConvert() {
    return this.shouldConvert();
  }

  private convertReply(): EngineReply {
    const intent = this.session.intent || "UNKNOWN";
    const text = this.convertText(intent);
    return {
      text,
      actions: this.convertCtas(),
      links: this.serviceLinks(),
      showForm: false,
      intent,
    };
  }

  private convertText(intent: Intent) {
    if (this.session.infoAsk) {
      if (intent === "HEAT_PUMP_REPAIR" || intent === "HEAT_PUMP_INSTALLATION" || intent === "HEAT_PUMP_MAINTENANCE") {
        return "Yes — we service heat pumps. Repair, installation, and maintenance are listed on this site.";
      }
      if (intent === "COMMERCIAL_HVAC") {
        return "Yes — light commercial HVAC is one of the services on this site.";
      }
      const label = serviceLabelFor(intent);
      return label
        ? `Yes — ${label.toLowerCase()} is listed on this site. I can help you request service or open the page.`
        : "Yes — that work is in our service list. I can help you request service or find the right page.";
    }
    if (this.session.highIntent && this.session.wantsService) {
      return "I can help you get that started.";
    }
    if (intent === "AC_REPAIR") {
      if (this.session.scope === "one") {
        return "Thanks — that sounds like something a technician should take a closer look at. If one area is warm while others are fine, it may indicate a duct or airflow issue rather than a total system failure.";
      }
      return "Thanks — that sounds like something a technician should take a closer look at. Warm air can be related to airflow, refrigerant, or an outdoor unit that needs inspection.";
    }
    if (intent === "FURNACE_REPAIR" || intent === "HEATING_REPAIR") {
      return "Thanks — that sounds like something a technician should take a closer look at. A furnace that will not heat usually needs an on-site inspection rather than a guess from here.";
    }
    if (intent === "HEAT_PUMP_REPAIR") {
      return "Heat pump repair may be the right place to start. A technician can inspect mode changeover, defrost, and backup heat.";
    }
    if (intent === "HEAT_PUMP_INSTALLATION") {
      return "Take a look at our heat pump installation service. The right next step is a conversation about the house and the existing equipment.";
    }
    if (intent === "AC_INSTALLATION") {
      return "AC installation may be the right page to review. Equipment still needs to be matched to the house — not picked from a catalog guess.";
    }
    if (intent === "HVAC_REPLACEMENT" || intent === "FURNACE_INSTALLATION" || intent === "AC_REPLACEMENT" || intent === "FURNACE_REPLACEMENT") {
      return "Replacement is a good conversation to have with the team. They will look at what failed and whether repair is still useful.";
    }
    if (intent === "HVAC_MAINTENANCE" || intent === "AC_MAINTENANCE" || intent === "FURNACE_MAINTENANCE" || intent === "HEAT_PUMP_MAINTENANCE") {
      return "Maintenance visits are seasonal checkups — filters, coils, and safeties — not a promise that nothing will fail. I can help you request one.";
    }
    if (intent === "DUCTLESS" || intent === "MINI_SPLIT") {
      return "Ductless mini splits are a good fit for rooms the original ducts never reached. The team can look at placement and electrical.";
    }
    if (intent === "INDOOR_AIR_QUALITY" || intent === "AIR_FILTRATION" || intent === "HUMIDITY") {
      return "Indoor air quality work here is about filtration, humidity, and ventilation — not a miracle cartridge. Share what you are noticing and we can take the next step.";
    }
    if (intent === "DUCTWORK") {
      return "Ductwork and airflow issues usually need a look at the actual trunks and returns. Cleaning is useful when it is justified — not as a routine upsell.";
    }
    if (intent === "COMMERCIAL_HVAC") {
      return "Yes — light commercial HVAC is one of the services on this site. Share the building type and the equipment issue when you request service.";
    }
    if (intent === "EMERGENCY") {
      return "If heating or cooling is down, the fastest next step is to contact the team. If you smell gas or a carbon monoxide alarm is sounding, leave and contact the utility or 911 first.";
    }
    if (/heat pump/.test(this.session.problem || "")) {
      return "Yes — heat pump service is listed on this site. Repair and installation are both available as next steps.";
    }
    return "I can help you get the right next step — a service page, a request, or a call.";
  }

  private formReply(): EngineReply {
    if (!this.boot.leadEnabled) {
      const extra = this.boot.hasPhone
        ? "Please call us directly to request service."
        : "Please use the contact page to request service, or try again in a moment.";
      return {
        text: extra,
        actions: this.convertCtas(),
        links: [{ href: "/contact/", label: "Contact" }],
        intent: "REQUEST_SERVICE",
      };
    }
    return {
      text: "I can take a short service request here — name, phone, ZIP, and a brief description.",
      actions: this.boot.hasPhone ? [callAction(this.boot)] : [],
      links: [],
      showForm: true,
      intent: "REQUEST_SERVICE",
    };
  }

  private callReply(): EngineReply {
    if (this.boot.hasPhone) {
      return {
        text: `You can reach Newark HVAC Pros at ${this.boot.phoneDisplay}.`,
        actions: [callAction(this.boot), requestAction()],
        links: [],
        intent: "CALL_NOW",
      };
    }
    return {
      text: "A public phone number is not posted on this site yet. You can request service from the contact page.",
      actions: [{ id: "contact", kind: "link", label: "Contact", href: "/contact/" }, requestAction()],
      links: [],
      intent: "CONTACT",
    };
  }

  private contactReply(): EngineReply {
    return this.callReply();
  }

  private pricingReply(): EngineReply {
    this.session.pricingAsk = false;
    return {
      text: "HVAC repair costs depend on the system and the problem. The best way to know what your system needs is to have it assessed.",
      actions: this.convertCtas(),
      links: this.serviceLinks(),
      intent: "PRICING",
    };
  }

  private reviewsReply(): EngineReply {
    this.session.reviewsAsk = false;
    return {
      text: "We do not publish ratings, licenses, or guarantees here unless they are verified. Real reviews will appear on the reviews page when they exist.",
      actions: this.convertCtas(),
      links: [{ href: "/reviews/", label: "Reviews" }],
      intent: "GENERAL_QUESTION",
    };
  }

  private availabilityReply(): EngineReply {
    this.session.availabilityAsk = false;
    this.session.wantsService = true;
    const hours = this.boot.hours ? ` Posted hours: ${this.boot.hours}.` : "";
    const dispatch = this.boot.emergencyDispatch
      ? " Urgent HVAC calls are accepted through the posted contact path."
      : " Timing is confirmed when the team follows up — we do not publish same-day or after-hours guarantees here.";
    return {
      text: `I can help you get that started.${hours}${dispatch}`,
      actions: this.convertCtas(),
      links: this.serviceLinks(),
      intent: this.session.intent || "REQUEST_SERVICE",
    };
  }

  private areaReply(): EngineReply {
    const loc = (this.session.location || "").toLowerCase();
    const lists = zipLists();
    const knownTown = lists.communities.some((c) => c.toLowerCase() === loc);
    const page = COMMUNITY_PAGES[loc];
    if (this.session.zip && this.session.zipStatus && this.session.zipStatus !== "unknown") {
      return {
        text: `ZIP ${this.session.zip} is on the Newark / New Castle County list used on this site.`,
        actions: this.convertCtas(),
        links: [{ href: "/service-area/", label: "Service Area" }, ...(page ? [{ href: page.href, label: page.label }] : [])],
        intent: "SERVICE_AREA",
      };
    }
    if (knownTown) {
      const nice = lists.communities.find((c) => c.toLowerCase() === loc) || this.session.location;
      return {
        text: `Yes — ${nice} is in our Newark / New Castle County service area.`,
        actions: this.convertCtas(),
        links: [page ? { href: page.href, label: page.label } : { href: "/service-area/", label: "Service Area" }],
        intent: "SERVICE_AREA",
      };
    }
    return {
      text: "Service availability may depend on the exact location. You can contact us and we'll confirm.",
      actions: this.convertCtas(),
      links: [{ href: "/service-area/", label: "Service Area" }],
      intent: "SERVICE_AREA",
    };
  }

  private safetyReply(): EngineReply {
    return {
      text: "If you smell gas or believe there may be an immediate safety hazard, leave the area and contact the appropriate emergency service or gas utility from a safe location. Do not use switches, flames, or electrical equipment near a suspected gas leak. Once you are safe, you can contact us about the equipment.",
      actions: this.boot.hasPhone ? [callAction(this.boot)] : [{ id: "contact", kind: "link", label: "Contact", href: "/contact/" }],
      links: SERVICE_FOR_INTENT.EMERGENCY ? [SERVICE_FOR_INTENT.EMERGENCY] : [],
      emergency: true,
      intent: "EMERGENCY",
    };
  }

  private unknownReply(): EngineReply {
    return {
      text: "I can help with cooling, heating, heat pumps, maintenance, or a service request. What is going on with the system?",
      actions: this.actionsFromIds(["ac_problem", "heating_problem", "maintenance", "request_service", "call_now"]),
      links: [],
      intent: "UNKNOWN",
    };
  }

  private serviceLinks(): ChatLink[] {
    const link = this.session.intent ? SERVICE_FOR_INTENT[this.session.intent] : null;
    if (!link) return [];
    if (`/${this.session.pageSlug}/` === link.href) return [];
    return [link];
  }

  private convertCtas(): ChatAction[] {
    const items: ChatAction[] = [requestAction()];
    items.push(callAction(this.boot));
    return items;
  }

  private actionsFromIds(ids: string[]): ChatAction[] {
    return ids
      .map((id) => {
        if (id === "call_now") return callAction(this.boot);
        if (id === "request_service") return requestAction();
        const meta = ACTION_META[id];
        if (!meta) return null;
        return { id, label: meta.label, kind: "quick" as const };
      })
      .filter((x): x is ChatAction => Boolean(x));
  }
}

export function createChatEngine(opts: { pageSlug: string; boot: ChatBoot }) {
  return new ChatEngine(opts);
}
