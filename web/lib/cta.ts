import { hasPhone, phoneHref, site } from "./site";

export function primaryCta() {
  if (hasPhone) {
    return { href: phoneHref(), label: "Call Now", detail: site.phoneDisplay };
  }
  return { href: "/contact/", label: "Request Service", detail: "Share the ZIP and the problem" };
}

export function secondaryCta() {
  return hasPhone
    ? { href: "/contact/", label: "Request Service" }
    : { href: "/services/", label: "View Services" };
}
