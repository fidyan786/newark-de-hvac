import { hasPhone, phoneHref, site } from "./site";

export function primaryCta() {
  if (hasPhone) {
    return { href: phoneHref(), label: "Call for Service", detail: site.phoneDisplay };
  }
  return { href: "/contact/", label: "Call for Service", detail: "Newark & New Castle County" };
}

export function secondaryCta() {
  return { href: "/services/", label: "Explore HVAC Services" };
}
