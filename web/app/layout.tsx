import type { Metadata } from "next";
import { headers } from "next/headers";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { googleSiteVerification } from "@/lib/gsc";
import { OG_IMAGE_ALT, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, ogImageAbsolute } from "@/lib/seo";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const googleVerification = googleSiteVerification();

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  title: {
    default: "HVAC Service in Newark, DE | Newark HVAC Pros",
    template: "%s",
  },
  description:
    "Heating and cooling service for Newark, Delaware and nearby New Castle County. AC repair, furnace service, heat pumps, and commercial HVAC.",
  openGraph: {
    title: "HVAC Service in Newark, DE | Newark HVAC Pros",
    description:
      "Heating and cooling service for Newark, Delaware and nearby New Castle County. AC repair, furnace service, heat pumps, and commercial HVAC.",
    url: absoluteUrl("/", site.siteUrl),
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: ogImageAbsolute(), width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Service in Newark, DE | Newark HVAC Pros",
    description:
      "Heating and cooling service for Newark, Delaware and nearby New Castle County. AC repair, furnace service, heat pumps, and commercial HVAC.",
    images: [ogImageAbsolute()],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className={sans.className}>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallBar />
        <ChatWidget />
        {site.ga4 ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4}`}
              strategy="afterInteractive"
              nonce={nonce}
            />
            <Script id="ga4" strategy="afterInteractive" nonce={nonce}>
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ga4}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
