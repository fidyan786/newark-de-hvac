/**
 * Conversation-engine QA for Newark HVAC chatbot.
 * Run: node tools/test-chatbot-engine.js
 */
var path = require("path");
var enginePath = path.join(
  __dirname,
  "..",
  "wp-content",
  "themes",
  "newark-hvac-pros",
  "assets",
  "js",
  "chatbot-engine.js"
);
var { createEngine } = require(enginePath);

var cfg = {
  brand: "Newark HVAC Pros",
  pageSlug: "home",
  phoneDisplay: "(302) 555-0147",
  phoneTel: "tel:+13025550147",
  phoneIsPlaceholder: true,
  zipsPrimary: ["19702", "19711", "19713", "19725"],
  zipsExtended: ["19701", "19707", "19720"],
  zipsCampus: ["19712", "19714", "19715", "19716", "19717", "19718"],
  services: {
    ac_repair: { label: "AC Repair", slug: "ac-repair-newark-de", path: "/ac-repair-newark-de/" },
    ac_install: { label: "AC Installation", slug: "ac-installation-newark-de", path: "/ac-installation-newark-de/" },
    furnace_repair: { label: "Furnace Repair", slug: "furnace-repair-newark-de", path: "/furnace-repair-newark-de/" },
    replacement: { label: "HVAC Replacement", slug: "hvac-replacement-newark-de", path: "/hvac-replacement-newark-de/" },
    emergency: { label: "Emergency HVAC", slug: "emergency-hvac-newark-de", path: "/emergency-hvac-newark-de/" },
    commercial: { label: "Commercial HVAC", slug: "commercial-hvac-newark-de", path: "/commercial-hvac-newark-de/" },
  },
  pages: {
    home: { family: "home" },
    "ac-repair-newark-de": { family: "ac", service: "ac_repair" },
    "furnace-repair-newark-de": { family: "heat", service: "furnace_repair" },
  },
};

var failed = 0;

function run(messages, pageSlug) {
  var local = Object.assign({}, cfg, { pageSlug: pageSlug || "home" });
  var e = createEngine(local);
  var opening = e.opening();
  var replies = [];
  messages.forEach(function (m) {
    if (typeof m === "string") replies.push(e.respond(m));
    else replies.push(e.respond(m.text || "", { quickId: m.quickId }));
  });
  return { engine: e, opening: opening, replies: replies, state: e.getState() };
}

function assert(name, cond, extra) {
  if (cond) {
    console.log("  pass  " + name);
    return;
  }
  failed += 1;
  console.log("  FAIL  " + name + (extra ? " — " + extra : ""));
}

function last(replies) {
  return replies[replies.length - 1];
}

console.log("Scenario A — AC stopped cooling");
var a = run(["My AC stopped cooling."]);
assert("AC repair intent", a.state.intent === "ac_repair", a.state.intent);
assert("show call CTA", last(a.replies).showCall === true);
assert("no dollar amounts", !/\$\d/.test(last(a.replies).text));
assert("does not re-ask issue type", !/what type of issue/i.test(last(a.replies).text));

console.log("Scenario B — furnace");
var b = run(["My furnace isn't working."]);
assert("furnace intent", b.state.intent === "furnace_repair", b.state.intent);
assert("call CTA", last(b.replies).showCall === true);

console.log("Scenario C — new AC");
var c = run(["I need a new AC system."]);
assert("install intent", c.state.intent === "ac_install", c.state.intent);
assert("call CTA", last(c.replies).showCall === true);
assert("does not ask if system is down", !/completely down/i.test(last(c.replies).text));

console.log("Scenario D — AC noise");
var d = run(["My AC is making a loud noise."]);
assert("AC intent", d.state.intent === "ac_repair");
assert("acknowledges noise or follow-up", /noise|ZIP|call/i.test(last(d.replies).text));
assert("call CTA", last(d.replies).showCall === true);

console.log("Scenario E — ZIP + today");
var e = run(["I'm in 19711 and need someone today."]);
assert("captured ZIP", e.state.zipCode === "19711", e.state.zipCode);
assert("urgency now", e.state.urgency === "now", e.state.urgency);
assert("does not re-ask ZIP", !/what(?:'s| is) your ZIP/i.test(last(e.replies).text));
assert("mentions 19711 or today", /19711|today/i.test(last(e.replies).text));
assert("call CTA", last(e.replies).showCall === true);

console.log("Scenario F — pricing");
var f = run(["How much does AC repair cost?"]);
assert("no invented price", !/\$\d/.test(last(f.replies).text) && !/\d{3,}/.test(last(f.replies).text.replace(/197\d{2}/g, "")));
assert("variability language", /vary/i.test(last(f.replies).text));
assert("call CTA", last(f.replies).showCall === true);

console.log("Scenario G — gas smell");
var g = run(["There's a gas smell."]);
assert("safety flag", g.state.safety === true);
assert("emergency services", /emergency|gas utility|don't keep operating|do not keep operating/i.test(last(g.replies).text));
assert("no diagnosis certainty", !/definitely|caused by a cracked/i.test(last(g.replies).text));
assert("call still offered", last(g.replies).showCall === true);

console.log("Scenario H — commercial");
var h = run(["Do you service businesses?"]);
assert("commercial intent", h.state.intent === "commercial", h.state.intent);
assert("commercial route", (last(h.replies).links || []).some(function (l) {
  return /commercial-hvac/.test(l.href);
}));
assert("call CTA", last(h.replies).showCall === true);

console.log("Scenario I — all info at once");
var i = run(["My AC stopped working yesterday in 19711. I'm the homeowner and need someone today."]);
assert("AC intent", i.state.intent === "ac_repair");
assert("ZIP kept", i.state.zipCode === "19711");
assert("home property", i.state.propertyType === "home");
assert("today urgency", i.state.urgency === "now");
assert("does not interrogate", !/what type of issue|what(?:'s| is) your ZIP|are you a homeowner|how urgent/i.test(last(i.replies).text));
assert("summarizes", /19711|today|AC/i.test(last(i.replies).text));
assert("call CTA", last(i.replies).showCall === true);

console.log("Opening + memory");
var mem = run(["My AC is leaking.", "It's also making a weird noise."]);
assert("opening is HVAC-specific", /heating or cooling|air conditioner|Need help/i.test(mem.opening.text));
assert("opening is not generic CS", !/how can i help you today/i.test(mem.opening.text));
assert("keeps AC intent", mem.state.intent === "ac_repair");
assert("retains leak + noise", /leak/i.test(mem.state.issue) && /noise/i.test(mem.state.issue));

console.log("Page-aware AC greeting");
var acPage = run([], "ac-repair-newark-de");
assert("AC page greeting", /air conditioner/i.test(acPage.opening.text));

if (failed) {
  console.log("\n" + failed + " failed");
  process.exit(1);
}
console.log("\nAll chatbot engine scenarios passed.");
