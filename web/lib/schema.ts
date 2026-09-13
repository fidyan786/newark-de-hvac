import { hasAddress, hasEmail, hasPhone, site } from "./site";

const BUSINESS_ID = `${site.siteUrl}/#hvacbusiness`;
const WEBSITE_ID = `${site.siteUrl}/#website`;

/** Schema.org openingHours tokens only. Freeform copy is omitted rather than guessed. */
const OPENING_HOURS_TOKEN =
  /^(Mo|Tu|We|Th|Fr|Sa|Su)(-(Mo|Tu|We|Th|Fr|Sa|Su))? \d{2}:\d{2}-\d{2}:\d{2}$/;

export function parseOpeningHours(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length || !parts.every((part) => OPENING_HOURS_TOKEN.test(part))) return undefined;
  return parts;
}

export function serviceTypeFromTitle(name: string) {
  return name.replace(/\s+in Newark,\s*DE\s*$/i, "").trim() || name;
}

function areaServed() {
  const cities = site.communities.map((name) => ({
    "@type": "City",
    name: name === "Newark" ? "Newark, Delaware" : `${name}, Delaware`,
  }));
  return [
    ...cities,
    { "@type": "AdministrativeArea", name: "New Castle County, Delaware" },
  ];
}

export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.siteUrl,
    areaServed: areaServed(),
    description:
      "Heating and cooling service for Newark, Delaware and nearby New Castle County communities.",
  };
  if (hasPhone) data.telephone = site.phoneDisplay;
  if (hasEmail) data.email = site.email;
  const hours = parseOpeningHours(site.hours);
  if (hours) data.openingHours = hours;
  data.address = hasAddress
    ? {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressLocality: site.city,
        addressRegion: site.stateCode,
        addressCountry: "US",
      }
    : {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.stateCode,
        addressCountry: "US",
      };
  return data;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.siteUrl,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceJsonLd(name: string, url: string, description: string) {
  const serviceType = serviceTypeFromTitle(name);
  const provider: Record<string, unknown> = {
    "@type": "HVACBusiness",
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.siteUrl,
  };
  if (hasPhone) provider.telephone = site.phoneDisplay;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceType,
    serviceType,
    url,
    description,
    areaServed: { "@type": "City", name: "Newark, Delaware" },
    provider,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
