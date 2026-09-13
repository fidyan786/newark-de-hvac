import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { areas } from "@/lib/areas";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = pageMeta({
  title: "HVAC Service Area | Newark, DE | Newark HVAC Pros",
  description:
    "Newark HVAC Pros serves Newark, Delaware and nearby Bear, Pike Creek, Glasgow, Hockessin, Christiana, and New Castle.",
  path: "/service-area/",
});

export default function ServiceAreaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/", site.siteUrl) },
          { name: "Service Area", url: absoluteUrl("/service-area/", site.siteUrl) },
        ])}
      />
      <div className="page-top">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/service-area/", label: "Service Area" },
            ]}
          />
        </div>
      </div>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <p className="eyebrow">New Castle County</p>
            <h1>HVAC service in Newark, Delaware</h1>
            <p className="lede">
              Newark is the home base. Nearby communities are on the same service map. Tell us the ZIP when you call.
            </p>
          </div>
          <div className="hero-photo img-hover">
            <Image
              src="/images/local/colonial.jpg"
              alt="Suburban Delaware home typical of the Newark service area"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              fetchPriority="high"
              className="zoom-img"
              priority
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>Communities</h2>
          <div className="problem-grid stack-lg">
            {areas.map((a) => (
              <Link className="problem-card" href={`/${a.slug}/`} key={a.slug}>
                <h3>{a.h1.replace("HVAC Service in ", "")}</h3>
                <p>ZIP {a.zip}</p>
              </Link>
            ))}
          </div>
          <p className="muted stack-xl">
            Primary ZIPs {site.zipsPrimary.join(", ")}. Nearby {site.zipsNearby.join(", ")}.
          </p>
        </div>
      </section>
      <CtaBand title="Serving Newark and nearby towns" text="If you are in New Castle County and the system failed, start with a call." />
    </>
  );
}
