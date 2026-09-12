/**
 * Newark HVAC chatbot conversation engine.
 * Works in the browser and in Node tests. No DOM, no secrets.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.NHPChatEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var QUICK = {
    "intent-ac": { intent: "ac_repair", issue: "AC / cooling problem" },
    "intent-heat": { intent: "furnace_repair", issue: "Heating problem" },
    "intent-install": { intent: "replacement", issue: "Installation / replacement" },
    "intent-maintenance": { intent: "maintenance", issue: "Maintenance" },
    "intent-emergency": { intent: "emergency", issue: "Urgent HVAC problem", urgency: "now" },
    "intent-general": { intent: "general", issue: "General question" },
    "intent-commercial": { intent: "commercial", issue: "Commercial HVAC", propertyType: "business" },
    "ac-not-cooling": { intent: "ac_repair", issue: "AC not cooling", systemStatus: "running_poorly" },
    "ac-leaking": { intent: "ac_repair", issue: "AC leaking", systemStatus: "running_poorly" },
    "ac-noise": { intent: "ac_repair", issue: "AC making noise", systemStatus: "running_poorly" },
    "ac-no-start": { intent: "ac_repair", issue: "AC will not turn on", systemStatus: "down" },
    "heat-no-heat": { intent: "furnace_repair", issue: "Furnace not heating", systemStatus: "running_poorly" },
    "heat-noise": { intent: "furnace_repair", issue: "Furnace making noise", systemStatus: "running_poorly" },
    "heat-no-start": { intent: "furnace_repair", issue: "Furnace will not start", systemStatus: "down" },
    "status-down": { systemStatus: "down" },
    "status-running": { systemStatus: "running_poorly" },
    "property-home": { propertyType: "home" },
    "property-business": { propertyType: "business" },
    "property-other": { propertyType: "other" },
    "urgency-now": { urgency: "now" },
    "urgency-asap": { urgency: "asap" },
    "urgency-week": { urgency: "week" },
    "urgency-planning": { urgency: "planning" },
    call: { showCall: true },
  };

  var INTENT_LABELS = {
    ac_repair: "an AC issue",
    ac_install: "a new AC system",
    furnace_repair: "a heating issue",
    furnace_install: "a furnace installation",
    heatpump_repair: "a heat pump issue",
    heatpump_install: "a heat pump installation",
    replacement: "an HVAC replacement",
    emergency: "an urgent HVAC problem",
    maintenance: "maintenance",
    minisplit: "a ductless mini split",
    iaq: "indoor air quality",
    duct_cleaning: "duct cleaning",
    commercial: "commercial HVAC",
    general: "an HVAC question",
  };

  var SERVICE_FOR_INTENT = {
    ac_repair: "ac_repair",
    ac_install: "ac_install",
    furnace_repair: "furnace_repair",
    furnace_install: "furnace_install",
    heatpump_repair: "heatpump_repair",
    heatpump_install: "heatpump_install",
    replacement: "replacement",
    emergency: "emergency",
    maintenance: "maintenance",
    minisplit: "minisplit",
    iaq: "iaq",
    duct_cleaning: "duct_cleaning",
    commercial: "commercial",
  };

  function createEngine(config) {
    config = config || {};
    var state = blankState(config);

    function opening() {
      var page = pageMeta(config);
      var pack = greetingFor(page, config);
      state.qualificationStatus = "started";
      return pack;
    }

    function respond(raw, options) {
      options = options || {};
      var text = String(raw || "").replace(/\s+/g, " ").trim();
      var quickId = options.quickId || null;
      var askedBefore = snapshotAsked();

      if (quickId && /^zip-\d{5}$/.test(quickId)) {
        setZip(quickId.slice(4));
        quickId = null;
      }
      if (quickId && QUICK[quickId]) {
        applyPatch(QUICK[quickId]);
      }
      if (text) {
        extractAll(text);
        if (!state.issue || state.issue === "General question") {
          if (!quickId) state.issue = text.slice(0, 180);
        } else if (text.length > 8 && state.issue.indexOf(text.slice(0, 24)) === -1) {
          state.issue = (state.issue + "; " + text).slice(0, 240);
        }
      }

      var reply;
      if (state.safety) {
        reply = safetyReply();
      } else if (state.pricingAsk) {
        reply = pricingReply();
      } else {
        reply = qualifyReply(askedBefore, text, quickId);
      }

      if (isHighIntent() || state.showCall || (reply && reply.showCall)) {
        state.showCall = true;
        reply.showCall = true;
      }

      reply.quickReplies = reply.quickReplies || [];
      reply.links = reply.links || serviceLinks();
      reply.repeatQuestion = !!reply.repeatQuestion;
      state.qualificationStatus = state.safety ? "safety" : state.showCall ? "handoff" : "qualifying";
      state.conversationSummary = summarize();
      return reply;
    }

    function snapshotAsked() {
      return {
        intent: !!state.intent,
        zip: !!state.zipCode,
        status: !!state.systemStatus,
        property: !!state.propertyType,
        urgency: !!state.urgency,
        name: !!state.name,
        phone: !!state.phone,
      };
    }

    function pageMeta(cfg) {
      var slug = cfg.pageSlug || "home";
      var pages = cfg.pages || {};
      return pages[slug] || { family: "home" };
    }

    function greetingFor(page) {
      var family = page.family || "home";
      if (family === "ac") {
        return msg(
          "Need help with an air conditioner in Newark?",
          ["ac-not-cooling", "ac-leaking", "ac-noise", "ac-no-start", "call"]
        );
      }
      if (family === "heat") {
        return msg(
          "Need help with a furnace or heating issue?",
          ["heat-no-heat", "heat-noise", "heat-no-start", "call"]
        );
      }
      if (family === "heatpump") {
        return msg("Need help with a heat pump?", ["intent-heat", "intent-ac", "intent-install", "call"]);
      }
      if (family === "ac_install" || family === "replace" || family === "heat_install" || family === "heatpump_install") {
        return msg(
          "Looking at a new system or a replacement in Newark?",
          ["intent-install", "intent-ac", "intent-heat", "call"]
        );
      }
      if (family === "emergency") {
        return msg(
          "If heating or cooling is down in Newark, the fastest path is a phone call.",
          ["intent-ac", "intent-heat", "intent-emergency", "call"]
        );
      }
      if (family === "maintenance") {
        return msg("Need a tune-up or have a system that is already acting up?", ["intent-maintenance", "intent-ac", "intent-heat", "call"]);
      }
      if (family === "minisplit") {
        return msg("Need help with a ductless mini split?", ["intent-ac", "intent-heat", "intent-install", "call"]);
      }
      if (family === "iaq") {
        return msg("Looking for indoor air quality help in Newark?", ["intent-general", "intent-maintenance", "call"]);
      }
      if (family === "ducts") {
        return msg("Need help with ducts or airflow?", ["intent-general", "intent-ac", "call"]);
      }
      if (family === "commercial") {
        return msg("Need commercial HVAC help in Newark or New Castle County?", ["intent-commercial", "intent-emergency", "call"]);
      }
      return msg("Need help with your heating or cooling system?", [
        "intent-ac",
        "intent-heat",
        "intent-install",
        "intent-maintenance",
        "intent-emergency",
        "intent-general",
      ]);
    }

    function extractAll(text) {
      var lower = text.toLowerCase();
      extractSafety(lower);
      extractPricing(lower);
      extractZip(text);
      extractPhone(text);
      extractName(text);
      extractProperty(lower);
      extractUrgency(lower);
      extractStatus(lower);
      extractIntent(lower);
    }

    function extractSafety(lower) {
      if (
        /gas leak|smell gas|smells like gas|natural gas|carbon monoxide|\bco alarm\b|smoke in the|on fire|house is on fire|burning electrical|electrical smell|smell(s)? burnt|burning smell|smell gas|gas smell/.test(
          lower
        )
      ) {
        state.safety = true;
        if (!state.urgency) state.urgency = "now";
        if (!state.intent) state.intent = "emergency";
      }
    }

    function extractPricing(lower) {
      if (
        /how much|what(?:'s| is) the (?:cost|price)|cost of|price of|pricing|estimate for|quote for \$?|financing|payment plan|\$\d/.test(
          lower
        )
      ) {
        state.pricingAsk = true;
      }
    }

    function extractZip(text) {
      if (state.zipCode) return;
      var m = text.match(/\b(197\d{2})\b/);
      if (!m) m = text.match(/\b(\d{5})\b/);
      if (!m) return;
      setZip(m[1]);
    }

    function setZip(zip) {
      state.zipCode = zip;
      var primary = config.zipsPrimary || [];
      var extended = config.zipsExtended || [];
      var campus = config.zipsCampus || [];
      if (primary.indexOf(zip) !== -1) state.zipStatus = "primary";
      else if (extended.indexOf(zip) !== -1) state.zipStatus = "extended";
      else if (campus.indexOf(zip) !== -1) state.zipStatus = "campus";
      else state.zipStatus = "unknown";
    }

    function extractPhone(text) {
      if (state.phone) return;
      var m = text.match(/(?:\+?1[-.\s]?)?\(?([2-9]\d{2})\)?[-.\s]?([2-9]\d{2})[-.\s]?(\d{4})/);
      if (!m) return;
      if (m[2] === "555" && /^01\d{2}$/.test(m[3])) return;
      state.phone = "(" + m[1] + ") " + m[2] + "-" + m[3];
    }

    function extractName(text) {
      if (state.name) return;
      var m = text.match(/\b(?:my name is|this is|name[:\s]+)\s*([A-Za-z][A-Za-z.'-]{1,30}(?:\s+[A-Za-z][A-Za-z.'-]{1,30})?)/i);
      if (m) state.name = m[1].trim();
    }

    function extractProperty(lower) {
      if (state.propertyType) return;
      if (/\b(homeowner|at home|my house|residential|my home)\b/.test(lower)) state.propertyType = "home";
      else if (/\b(business|commercial|office|retail|warehouse|company building)\b/.test(lower)) {
        state.propertyType = "business";
        if (!state.intent || state.intent === "general") state.intent = "commercial";
      }
    }

    function extractUrgency(lower) {
      if (state.urgency === "now") return;
      if (
        /\b(today|right now|emergency|urgent|need someone|come out|this afternoon|this evening|immediately|asap|as soon as possible|completely dead)\b/.test(
          lower
        )
      ) {
        state.urgency = /planning|this week|next week/.test(lower) && !/today|right now|emergency/.test(lower) ? state.urgency : "now";
      }
      if (state.urgency) return;
      if (/\bthis week\b/.test(lower)) state.urgency = "week";
      else if (/\b(planning|not urgent|just looking|quote only)\b/.test(lower)) state.urgency = "planning";
    }

    function extractStatus(lower) {
      if (state.systemStatus) return;
      if (/\b(completely dead|completely down|won't turn on|wont turn on|will not start|won't start|not turning on|stopped working|isn't working|isnt working|not working)\b/.test(lower)) {
        state.systemStatus = "down";
      } else if (/\b(stopped cooling|not cooling|not heating|leaking|making (a )?(loud |weird )?noise|running but)\b/.test(lower)) {
        state.systemStatus = "running_poorly";
      }
    }

    function extractIntent(lower) {
      if (/\b(commercial|service businesses|do you (?:do|service|handle) business)/.test(lower)) {
        state.intent = "commercial";
        state.propertyType = state.propertyType || "business";
        return;
      }
      if (/\b(new ac|new air conditioner|new system|replace(?:ment| the)?|install(?:ation| a new)?|need a new)\b/.test(lower)) {
        if (/\bfurnace|heat(?:ing)?\b/.test(lower) && !/\bac\b|air condition/.test(lower)) state.intent = "furnace_install";
        else if (/heat pump/.test(lower)) state.intent = "heatpump_install";
        else if (/\bac\b|air condition|cooling/.test(lower) || /new system/.test(lower)) state.intent = "ac_install";
        else state.intent = "replacement";
        return;
      }
      if (/heat pump/.test(lower)) {
        state.intent = /install|new|replace/.test(lower) ? "heatpump_install" : "heatpump_repair";
        return;
      }
      if (/\b(mini ?split|ductless)\b/.test(lower)) {
        state.intent = "minisplit";
        return;
      }
      if (/\b(maintenance|tune-?up|filter change|yearly service|regular service)\b/.test(lower)) {
        state.intent = "maintenance";
        return;
      }
      if (/\b(indoor air|air quality|humidifier|air purifier)\b/.test(lower)) {
        state.intent = "iaq";
        return;
      }
      if (/\b(duct clean|air duct)\b/.test(lower)) {
        state.intent = "duct_cleaning";
        return;
      }
      if (/\b(furnace|no heat|not heating|heater|boiler|heat(?:ing)? (?:is |isn't |isnt |won't|wont|not ))\b/.test(lower)) {
        state.intent = "furnace_repair";
        return;
      }
      if (/\b(ac|air condition|air conditioner|not cooling|no (?:cool|a\/c)|a\/c|condenser|central air)\b/.test(lower)) {
        state.intent = "ac_repair";
        return;
      }
      if (/\b(hvac company|need (an )?hvac|hvac (tech|technician|service))\b/.test(lower)) {
        if (!state.intent) state.intent = "emergency";
      }
    }

    function applyPatch(patch) {
      Object.keys(patch).forEach(function (k) {
        if (k === "showCall") {
          state.showCall = true;
          return;
        }
        if (!state[k]) state[k] = patch[k];
      });
      if (state.intent && SERVICE_FOR_INTENT[state.intent]) {
        state.serviceType = SERVICE_FOR_INTENT[state.intent];
      }
    }

    function isHighIntent() {
      if (state.safety) return true;
      if (state.urgency === "now" || state.urgency === "asap") return true;
      if (state.systemStatus === "down") return true;
      if (state.intent === "emergency") return true;
      return false;
    }

    function isInstall(intent) {
      return /install|replacement/.test(intent || "");
    }

    function qualifyReply(askedBefore, text, quickId) {
      if (state.intent && SERVICE_FOR_INTENT[state.intent]) {
        state.serviceType = SERVICE_FOR_INTENT[state.intent];
      }

      if (state.intent === "commercial") {
        return wrapup(null, true);
      }

      if (quickId === "call") {
        return wrapup("The HVAC team can take it from here by phone.", true);
      }

      if (state.phone && !askedBefore.phone) {
        state.showCall = true;
        return wrapup("Thanks — if you want a callback, the team can use that number. Calling is still the fastest option.", true);
      }

      if (!state.intent) {
        if (isHighIntent() && state.zipCode) {
          return {
            text:
              "Got it — you're in " +
              state.zipCode +
              (state.urgency === "now" ? " and need someone today" : "") +
              ". What's going on with the system — cooling, heat, or something else?",
            quickReplies: ids(["intent-ac", "intent-heat", "intent-install", "call"]),
            showCall: true,
            links: [],
          };
        }
        return {
          text: "What seems to be going on with your HVAC system?",
          quickReplies: ids(["intent-ac", "intent-heat", "intent-install", "intent-maintenance", "intent-emergency"]),
          showCall: isHighIntent(),
          links: [],
        };
      }

      if (shouldWrapUp(askedBefore)) {
        return wrapup(null, true);
      }

      var ack = shortAck();

      if (needsStatusQuestion(askedBefore)) {
        state.askedStatus = true;
        return {
          text: ack + "Is the system completely down, or is it still running but not working properly?",
          quickReplies: ids(["status-down", "status-running", "call"]),
          showCall: isHighIntent() || isRepair(state.intent),
          links: serviceLinks(),
        };
      }

      if (!state.zipCode) {
        if (state.askedZip) {
          return wrapup("If you share a ZIP, the team can confirm the Newark-area coverage. In the meantime, calling is the fastest next step.", true);
        }
        state.askedZip = true;
        return {
          text:
            ack +
            (isHighIntent()
              ? "What's your ZIP code? You can also call now if you need someone sooner."
              : "What's your ZIP code?"),
          quickReplies: zipQuick(),
          showCall: true,
          links: serviceLinks(),
        };
      }

      if (!state.propertyType && !isHighIntent() && !state.askedProperty && state.intent !== "commercial") {
        if (state.askedProperty) {
          return wrapup(null, true);
        }
        state.askedProperty = true;
        return {
          text: "Is this for a home or a business?",
          quickReplies: ids(["property-home", "property-business", "call"]),
          showCall: true,
          links: serviceLinks(),
        };
      }

      if (!state.urgency && !isHighIntent() && !state.askedUrgency) {
        state.askedUrgency = true;
        return {
          text: "When do you need help?",
          quickReplies: ids(["urgency-now", "urgency-asap", "urgency-week", "urgency-planning", "call"]),
          showCall: true,
          links: serviceLinks(),
        };
      }

      return wrapup(null, true);
    }

    function needsStatusQuestion(askedBefore) {
      if (askedBefore.status || state.systemStatus || state.askedStatus) return false;
      if (isHighIntent()) return false;
      if (isInstall(state.intent) || state.intent === "maintenance" || state.intent === "commercial" || state.intent === "general" || state.intent === "iaq") {
        return false;
      }
      return isRepair(state.intent);
    }

    function isRepair(intent) {
      return /repair|emergency/.test(intent || "");
    }

    function shouldWrapUp(askedBefore) {
      if (askedBefore.intent && askedBefore.zip && askedBefore.urgency) return true;
      if (askedBefore.intent && isHighIntent()) return true;
      if (state.intent && state.zipCode && (state.urgency || state.systemStatus || isInstall(state.intent) || state.intent === "commercial" || state.intent === "maintenance")) {
        return true;
      }
      if (state.intent && isHighIntent() && (state.zipCode || state.systemStatus || state.issue)) return true;
      return false;
    }

    function shortAck() {
      var label = INTENT_LABELS[state.intent] || "an HVAC issue";
      if (state.intent === "ac_repair" && /leak/.test(state.issue || "")) {
        return "An AC leak can come from a few different issues. ";
      }
      if (state.intent === "ac_repair" && /noise/.test(state.issue || "")) {
        return "Unusual AC noise is worth having a technician check. ";
      }
      if (state.intent === "ac_install") {
        return "A new AC or replacement is a good next step to talk through with the team. ";
      }
      return "That sounds like " + label + ". ";
    }

    function wrapup(extra, showCall) {
      var parts = [];
      if (state.intent && INTENT_LABELS[state.intent]) parts.push(INTENT_LABELS[state.intent]);
      if (state.zipCode) parts.push("in " + state.zipCode);
      if (state.urgency === "now") parts.push("and you need help today");
      else if (state.urgency === "asap") parts.push("and you need help as soon as possible");
      else if (state.propertyType === "home") parts.push("for your home");
      else if (state.propertyType === "business") parts.push("for a business");

      var text;
      if (parts.length >= 2) {
        text = "Got it — you're dealing with " + parts.join(" ") + ". The fastest next step is to call the HVAC team.";
      } else if (extra) {
        text = extra + " The fastest next step is to call the HVAC team.";
      } else {
        text = "The HVAC team can take a closer look. The fastest next step is to call.";
      }

      if (state.zipStatus === "unknown" && state.zipCode) {
        text += " I can't automatically confirm coverage for " + state.zipCode + " from the configured Newark / New Castle County list — the team can check when you call.";
      } else if (state.zipStatus === "primary" || state.zipStatus === "campus" || state.zipStatus === "extended") {
        text += " That ZIP is in the Newark-area coverage listed on this site.";
      }

      if (state.intent === "commercial") {
        text = "Yes — commercial HVAC is one of the services on this site. The team can talk through a business call when you phone in.";
        if (state.zipCode) text += " You're in " + state.zipCode + ".";
      }

      var replies = ids(["call"]);
      if (!state.zipCode) replies = zipQuick().concat(replies);
      return {
        text: text,
        quickReplies: replies,
        showCall: !!showCall,
        links: serviceLinks(),
      };
    }

    function safetyReply() {
      state.showCall = true;
      return {
        text:
          "If you smell gas, notice smoke, or have a carbon monoxide concern, treat that as a safety issue first. Leave the area if you need to and contact emergency services or your gas utility. Don't keep operating the equipment. Once you're safe, the HVAC team can inspect the system.",
        quickReplies: ids(["call"]),
        showCall: true,
        emergency: true,
        links: serviceLinks("emergency"),
      };
    }

    function pricingReply() {
      state.pricingAsk = false;
      state.showCall = true;
      return {
        text: "That can vary quite a bit depending on what's wrong with the system. The quickest way to get help with your specific situation is to call and speak with the HVAC team.",
        quickReplies: ids(["call", "intent-ac", "intent-heat"]),
        showCall: true,
        links: [],
      };
    }

    function serviceLinks(forceKey) {
      var key = forceKey || state.serviceType || SERVICE_FOR_INTENT[state.intent];
      var services = config.services || {};
      var pageSlug = config.pageSlug || "";
      if (!key || !services[key]) return [];
      if (services[key].slug && services[key].slug === pageSlug) return [];
      return [{ href: services[key].path, label: services[key].label }];
    }

    function zipQuick() {
      var zips = (config.zipsPrimary || []).slice(0, 4);
      return zips.map(function (z) {
        return { id: "zip-" + z, label: z };
      }).concat(ids(["call"]));
    }

    function ids(list) {
      return list.map(function (id) {
        return { id: id, label: labelFor(id) };
      });
    }

    function labelFor(id) {
      var labels = {
        "intent-ac": "🔧 AC / Cooling Problem",
        "intent-heat": "🔥 Heating Problem",
        "intent-install": "🏠 Installation / Replacement",
        "intent-maintenance": "🛠 Maintenance",
        "intent-emergency": "🚨 Urgent HVAC Problem",
        "intent-general": "❓ General Question",
        "intent-commercial": "Commercial HVAC",
        "ac-not-cooling": "AC Not Cooling",
        "ac-leaking": "AC Leaking",
        "ac-noise": "AC Making Noise",
        "ac-no-start": "AC Won't Turn On",
        "heat-no-heat": "Furnace Not Heating",
        "heat-noise": "Furnace Making Noise",
        "heat-no-start": "Furnace Won't Start",
        "status-down": "Completely down",
        "status-running": "Running, but not right",
        "property-home": "Home",
        "property-business": "Business",
        "property-other": "Other",
        "urgency-now": "Need help now",
        "urgency-asap": "As soon as possible",
        "urgency-week": "This week",
        "urgency-planning": "Planning ahead",
        call: "Call Now",
      };
      return labels[id] || id;
    }

    function msg(text, quick) {
      return {
        text: text,
        quickReplies: ids(quick),
        showCall: false,
        links: [],
      };
    }

    function summarize() {
      var bits = [];
      if (state.intent) bits.push("intent=" + state.intent);
      if (state.issue) bits.push("issue=" + state.issue);
      if (state.zipCode) bits.push("zip=" + state.zipCode);
      if (state.urgency) bits.push("urgency=" + state.urgency);
      if (state.systemStatus) bits.push("status=" + state.systemStatus);
      if (state.propertyType) bits.push("property=" + state.propertyType);
      if (state.safety) bits.push("safety=1");
      return bits.join("; ").slice(0, 500);
    }

    function getState() {
      return {
        sessionId: state.sessionId,
        timestamp: state.timestamp,
        sourcePage: state.sourcePage,
        intent: state.intent,
        serviceType: state.serviceType,
        issue: state.issue,
        systemStatus: state.systemStatus,
        propertyType: state.propertyType,
        zipCode: state.zipCode,
        zipStatus: state.zipStatus,
        urgency: state.urgency,
        name: state.name,
        phone: state.phone,
        qualificationStatus: state.qualificationStatus,
        conversationSummary: state.conversationSummary,
        safety: state.safety,
        showCall: state.showCall,
      };
    }

    function handleZipQuick(id) {
      var m = String(id || "").match(/^zip-(\d{5})$/);
      if (!m) return null;
      setZip(m[1]);
      return respond("", { quickId: null });
    }

    return {
      opening: opening,
      respond: respond,
      handleZipQuick: handleZipQuick,
      getState: getState,
      isHighIntent: isHighIntent,
      labelFor: labelFor,
    };
  }

  function blankState(config) {
    return {
      sessionId: makeId(),
      timestamp: new Date().toISOString(),
      sourcePage: config.pageSlug || "home",
      intent: null,
      serviceType: null,
      issue: null,
      systemStatus: null,
      propertyType: null,
      zipCode: null,
      zipStatus: null,
      urgency: null,
      name: null,
      phone: null,
      qualificationStatus: "new",
      conversationSummary: "",
      safety: false,
      pricingAsk: false,
      showCall: false,
      askedStatus: false,
      askedZip: false,
      askedProperty: false,
      askedUrgency: false,
    };
  }

  function makeId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return "nhp-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }

  return { createEngine: createEngine, QUICK: QUICK };
});
