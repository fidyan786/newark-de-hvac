export function serviceHref(slug: string) {
  const s = slug.replace(/^\/+|\/+$/g, "").replace(/^services\//, "");
  return `/services/${s}/`;
}

export function areaHref(slug: string) {
  return `/${slug.replace(/^\/+|\/+$/g, "")}/`;
}

const PASSTHROUGH = new Set([
  "about",
  "contact",
  "service-area",
  "services",
  "resources",
  "privacy-policy",
  "terms",
  "reviews",
]);

export function publicHref(href: string) {
  if (!href || href === "/") return "/";
  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) return href;
  const slug = href.replace(/^\/+|\/+$/g, "");
  if (!slug) return "/";
  if (slug.startsWith("services/")) return `/${slug}/`.replace(/\/{2,}/g, "/");
  if (PASSTHROUGH.has(slug) || /-de-hvac$/.test(slug)) return `/${slug}/`;
  return serviceHref(slug);
}

/** Former root-level service URLs that must 301 into /services/. */
export const LEGACY_SERVICE_SLUGS = [
  "ac-repair-newark-de",
  "ac-installation-newark-de",
  "ac-replacement-newark-de",
  "ac-maintenance-newark-de",
  "emergency-ac-repair-newark-de",
  "furnace-repair-newark-de",
  "furnace-installation-newark-de",
  "furnace-replacement-newark-de",
  "furnace-maintenance-newark-de",
  "heating-repair-newark-de",
  "emergency-heating-newark-de",
  "hvac-repair-newark-de",
  "hvac-maintenance-newark-de",
  "hvac-replacement-newark-de",
  "emergency-hvac-newark-de",
  "heat-pump-repair-newark-de",
  "heat-pump-installation-newark-de",
  "heat-pump-maintenance-newark-de",
  "ductless-mini-split-newark-de",
  "mini-split-repair-newark-de",
  "mini-split-installation-newark-de",
  "indoor-air-quality-newark-de",
  "air-filtration-newark-de",
  "humidifiers-dehumidifiers-newark-de",
  "ductwork-newark-de",
  "duct-cleaning-newark-de",
  "commercial-hvac-newark-de",
  "commercial-ac-newark-de",
  "commercial-heating-newark-de",
  "commercial-hvac-maintenance-newark-de",
] as const;

export const PHOTOS = {
  hero: "/images/hero/service.jpg",
  suburban: "/images/hero/suburban-home.jpg",
  ac: "/images/ac/outdoor-unit.jpg",
  acClose: "/images/ac/condenser-close.jpg",
  furnace: "/images/furnace/mechanical-room.jpg",
  furnaceVent: "/images/furnace/industrial-pipes.jpg",
  heatPump: "/images/heat-pump/install.jpg",
  heatPumpOutdoor: "/images/heat-pump/outdoor.jpg",
  iaq: "/images/iaq/vents.jpg",
  ducts: "/images/iaq/ducts.jpg",
  ductless: "/images/ductless/indoor.jpg",
  commercial: "/images/commercial/building.jpg",
  office: "/images/commercial/office.jpg",
  tools: "/images/maintenance/tools.jpg",
  panel: "/images/services/panel.jpg",
  technician: "/images/services/technician.jpg",
  house: "/images/about/house.jpg",
  neighborhood: "/images/local/neighborhood.jpg",
  brick: "/images/local/brick-home.jpg",
  colonial: "/images/local/colonial.jpg",
  ranch: "/images/local/ranch.jpg",
} as const;
