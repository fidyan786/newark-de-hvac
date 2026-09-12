import { hasAddress, hasPhone, site } from "./site";

export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    name: site.name,
    url: site.siteUrl,
    areaServed: [
      { "@type": "City", name: "Newark, Delaware" },
      { "@type": "AdministrativeArea", name: "New Castle County, Delaware" },
    ],
    description:
      "Heating and cooling service for Newark, Delaware and nearby New Castle County communities.",
  };
  if (hasPhone) data.telephone = site.phoneDisplay;
  if (site.email) data.email = site.email;
  if (hasAddress) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.stateCode,
      addressCountry: "US",
    };
  } else {
    data.address = {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.stateCode,
      addressCountry: "US",
    };
  }
  return data;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.siteUrl,
  };
}

export function serviceJsonLd(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    url,
    description,
    areaServed: { "@type": "City", name: "Newark, Delaware" },
    provider: { "@type": "HVACBusiness", name: site.name, url: site.siteUrl },
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

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data);
}
