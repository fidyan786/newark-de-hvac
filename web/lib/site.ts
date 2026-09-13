import { resolveCanonicalSiteUrl } from "./site-url";

export const site = {
  name: "Newark HVAC Pros",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Newark HVAC Pros",
  tagline: "Heating & cooling service for Newark, Delaware",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
  hours: process.env.NEXT_PUBLIC_HOURS || "",
  emergencyAvailable: process.env.NEXT_PUBLIC_EMERGENCY === "true",
  ga4: process.env.NEXT_PUBLIC_GA4 || "",
  city: "Newark",
  state: "Delaware",
  stateCode: "DE",
  county: "New Castle County",
  siteUrl: resolveCanonicalSiteUrl(),
  zipsPrimary: ["19702", "19711", "19713", "19725"],
  zipsCampus: ["19712", "19714", "19715", "19716", "19717", "19718"],
  zipsNearby: ["19701", "19707", "19720"],
  communities: [
    "Newark",
    "Bear",
    "Glasgow",
    "Pike Creek",
    "Hockessin",
    "Christiana",
    "Brookside",
    "Ogletown",
    "New Castle",
  ],
} as const;

export const hasPhone = Boolean(site.phoneTel && site.phoneDisplay);
export const hasEmail = Boolean(site.email);
export const hasAddress = Boolean(site.address);

export { absoluteUrl } from "./site-url";

export function phoneHref() {
  return hasPhone ? `tel:${site.phoneTel}` : "/contact/#service-request";
}

export function phoneLabel(fallback = "Request Service") {
  return hasPhone ? `Call ${site.phoneDisplay}` : fallback;
}
