import type { Metadata } from "next";
import { site } from "./site";
import { absoluteUrl } from "./site-url";

/** Existing hero photograph used for Open Graph / Twitter cards. */
export const OG_IMAGE_PATH = "/images/hero/service.jpg";
export const OG_IMAGE_WIDTH = 1600;
export const OG_IMAGE_HEIGHT = 1066;
export const OG_IMAGE_ALT = "HVAC technician checking refrigerant lines on an outdoor condenser";

export function ogImageAbsolute(origin = site.siteUrl) {
  return absoluteUrl(OG_IMAGE_PATH, origin);
}

export function pageMeta({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path, site.siteUrl);
  const image = ogImageAbsolute();
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
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index, follow: true },
  };
}
