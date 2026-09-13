import assert from "node:assert/strict";
import { localBusinessJsonLd, parseOpeningHours, serviceJsonLd, serviceTypeFromTitle, websiteJsonLd } from "./schema";

assert.deepEqual(parseOpeningHours("Mo-Fr 08:00-17:00"), ["Mo-Fr 08:00-17:00"]);
assert.equal(parseOpeningHours("Monday–Friday 8am–5pm"), undefined);
assert.equal(parseOpeningHours("24/7"), undefined);
assert.equal(parseOpeningHours(""), undefined);

assert.equal(serviceTypeFromTitle("AC Repair in Newark, DE"), "AC Repair");

const business = localBusinessJsonLd();
assert.equal(Array.isArray(business["@type"]), true);
assert.ok((business["@type"] as string[]).includes("HVACBusiness"));
assert.equal(business.name, "Newark HVAC Pros");
assert.equal(typeof business.url, "string");
assert.match(String(business.url), /^https:\/\/newark-de-hvac\.vercel\.app$/);
assert.equal("telephone" in business, false);
assert.equal("priceRange" in business, false);
assert.equal("geo" in business, false);
assert.equal("aggregateRating" in business, false);
assert.equal("openingHours" in business, false);
const address = business.address as { streetAddress?: string; addressLocality?: string };
assert.equal(address.streetAddress, undefined);
assert.equal(address.addressLocality, "Newark");

const website = websiteJsonLd();
assert.equal(website["@type"], "WebSite");
assert.match(String(website.url), /^https:\/\/newark-de-hvac\.vercel\.app$/);

const service = serviceJsonLd(
  "AC Repair in Newark, DE",
  "https://newark-de-hvac.vercel.app/services/ac-repair-newark-de/",
  "Air conditioning repair in Newark, Delaware.",
);
assert.equal(service.serviceType, "AC Repair");
assert.equal("offers" in service, false);
assert.match(JSON.stringify(service), /newark-de-hvac\.vercel\.app/);
assert.doesNotMatch(JSON.stringify(service), /localhost|555-|Your City|priceRange/);

console.log("schema tests passed");
