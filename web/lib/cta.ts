import { hasPhone, phoneHref, site } from "./site";

export const CONTACT_PATH = "/contact/";
export const SERVICE_REQUEST_ID = "service-request";

export function normalizePath(path: string) {
  const clean = path.split("#")[0].split("?")[0].replace(/\/+$/, "");
  return clean || "/";
}

export function pathsMatch(pathname: string, href: string) {
  return normalizePath(pathname) === normalizePath(href);
}

export function isContactPath(href: string) {
  return normalizePath(href) === "/contact";
}

export function contactActionHref(pathname?: string | null) {
  if (pathname && isContactPath(pathname)) return `#${SERVICE_REQUEST_ID}`;
  return `${CONTACT_PATH}#${SERVICE_REQUEST_ID}`;
}

export function primaryCta(pathname?: string | null) {
  if (hasPhone) {
    return { href: phoneHref(), label: "Call for Service", detail: site.phoneDisplay };
  }
  return { href: contactActionHref(pathname), label: "Call for Service", detail: "Newark & New Castle County" };
}

export function secondaryCta() {
  return { href: "/services/", label: "Explore Services" };
}
