import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? `${site.siteUrl}/` : `${site.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const canonical = url.endsWith("/") ? url : `${url}/`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}
