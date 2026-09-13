import { ChatEngine } from "./engine";
import { detect } from "./intents";
import { sanitizeAssistantText } from "./sanitize";
import type { ChatBoot } from "./types";

const boot: ChatBoot = {
  brand: "Newark HVAC Pros",
  city: "Newark",
  state: "Delaware",
  county: "New Castle County",
  hasPhone: false,
  phoneDisplay: "",
  phoneTel: "",
  leadEnabled: true,
  aiEnabled: false,
  emergencyDispatch: false,
  hours: "",
};

const phoneBoot: ChatBoot = { ...boot, hasPhone: true, phoneDisplay: "(302) 555-0199", phoneTel: "+13025550199" };

let failed = 0;
function assert(name: string, cond: boolean, extra?: string) {
  if (cond) console.log("  pass  " + name);
  else {
    failed += 1;
    console.log("  FAIL  " + name + (extra ? " — " + extra : ""));
  }
}

function run(messages: Array<string | { text?: string; actionId?: string }>, page = "home", b = boot) {
  const e = new ChatEngine({ pageSlug: page, boot: b });
  const opening = e.opening();
  const replies = messages.map((m) => (typeof m === "string" ? e.respond(m) : e.respond(m.text || "", m.actionId)));
  return { e, opening, replies, last: replies[replies.length - 1], state: e.snapshot() };
}

console.log("Opening / page context");
assert("home greeting", /how can we help/i.test(run([]).opening.text));
assert("ac page greeting", run([], "ac-repair-newark-de").opening.text.includes("your AC"));
assert("furnace page greeting", run([], "furnace-repair-newark-de").opening.text.includes("furnace"));
assert("commercial page greeting", run([], "commercial-hvac-newark-de").opening.text.includes("commercial"));

console.log("Natural language intents");
assert("warm air", detect("My AC is blowing warm air").intent === "AC_REPAIR");
assert("furnace start", detect("My furnace won't start").intent === "FURNACE_REPAIR");
assert("house not cool", detect("My house isn't getting cool").intent === "AC_REPAIR");
assert("water around AC", detect("There's water around my AC").intent === "AC_REPAIR");
assert("furnace noise", detect("My furnace is making a weird noise").intent === "FURNACE_REPAIR");
assert("new system", detect("I need a new HVAC system").intent === "HVAC_REPLACEMENT");
assert("maintenance", detect("I want maintenance").intent === "HVAC_MAINTENANCE");
assert("heat pumps offered", detect("Do you service heat pumps?").intent === "HEAT_PUMP_REPAIR");
assert("heat pumps info", detect("Do you service heat pumps?").infoAsk === true);
assert("contact", detect("How do I contact you?").intent === "CONTACT");

console.log("Diagnosis flow");
const warm = run(["My AC is blowing warm air."]);
assert("asks running vs off", /running but blowing warm|not turning on/i.test(warm.last.text), warm.last.text);
const warm2 = run(["My AC is blowing warm air.", { actionId: "running_warm", text: "Running but warm" }]);
assert("asks scope", /throughout the home|one area/i.test(warm2.last.text), warm2.last.text);
const warm3 = run([
  "My AC is blowing warm air.",
  { actionId: "running_warm", text: "Running but warm" },
  { actionId: "whole_home", text: "Throughout the home" },
]);
assert("technician language", /technician/i.test(warm3.last.text), warm3.last.text);
assert("has request CTA", warm3.last.actions.some((a) => a.kind === "request"));
assert("links to ac repair", warm3.last.links.some((l) => l.href.includes("ac-repair")));
assert("no fake diagnosis", !/capacitor failed|low on refrigerant for sure|the compressor is/i.test(warm3.last.text));

console.log("Furnace context");
const furn = run(["My furnace isn't working."]);
assert("asks if turning on", /turning on/i.test(furn.last.text), furn.last.text);
const furn2 = run(["My furnace isn't working.", "No"]);
assert("understands no", furn2.state.systemStatus === "off", String(furn2.state.systemStatus));

console.log("High intent skips interrogation");
const hi = run(["I need someone to fix my furnace."]);
assert("high intent convert", /get that started|technician|request/i.test(hi.last.text), hi.last.text);
assert("does not ask zip first", !/what(?:'s| is) your zip/i.test(hi.last.text));

console.log("Safety");
const gas = run(["I smell gas near the furnace"]);
assert("emergency", gas.last.emergency === true);
assert("leave the area", /leave the area|emergency service|gas utility/i.test(gas.last.text));
assert("no troubleshooting", !/check the filter|reset the breaker|try turning/i.test(gas.last.text));

console.log("Service area");
const bear = run(["Do you service Bear?"]);
assert("bear covered", /Bear/i.test(bear.last.text) && /service area/i.test(bear.last.text), bear.last.text);
const other = run(["Do you come to Philadelphia?"]);
assert("unknown town honest", /may depend on the exact location/i.test(other.last.text), other.last.text);

console.log("Pricing / claims");
const price = run(["How much is an AC repair?"]);
assert("no dollar amounts", !/\$\d/.test(price.last.text));
assert("depends wording", /depend/i.test(price.last.text));
assert("sanitize dollars", sanitizeAssistantText("Repairs start at $99") === null);

console.log("Call number");
const call = run(["How do I contact you?"], "home", phoneBoot);
assert("uses configured number", call.last.text.includes("(302) 555-0199"));
const nocall = run(["How do I contact you?"]);
assert("no fake number", !/555-0147/.test(nocall.last.text) && /contact/i.test(nocall.last.text));

console.log("Request service form");
const req = run([{ actionId: "request_service", text: "Request Service" }]);
assert("shows form when backend on", req.last.showForm === true);

if (failed) {
  console.error("\n" + failed + " failed");
  process.exit(1);
}
console.log("\nAll chatbot engine checks passed.");
