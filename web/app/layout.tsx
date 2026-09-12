import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileCallBar } from "@/components/MobileCallBar";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "HVAC Service in Newark, DE | Newark HVAC Pros",
    template: "%s",
  },
  description:
    "Heating and cooling service for Newark, Delaware and nearby New Castle County communities. Call for AC, furnace, heat pump, and emergency HVAC help.",
  openGraph: {
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/hero/suburban-home.jpg", width: 1600, height: 1066 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <body className={outfit.className}>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallBar />
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {site.ga4 ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ga4}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
