import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { areas } from "@/lib/areas";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "HVAC Service Area | Newark, DE & New Castle County",
  description:
    "Newark HVAC Pros serves Newark, Delaware and nearby Bear, Pike Creek, Glasgow, Hockessin, Christiana, and New Castle.",
  path: "/service-area/",
});

export default function ServiceAreaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${site.siteUrl}/` },
          { name: "Service Area", url: `${site.siteUrl}/service-area/` },
        ])}
      />
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
              className="zoom-img"
              priority
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>Communities</h2>
          <div className="problem-grid" style={{ marginTop: "1.5rem" }}>
            {areas.map((a) => (
              <Link className="problem-card" href={`/${a.slug}/`} key={a.slug}>
                <h3>{a.h1.replace("HVAC Service in ", "")}</h3>
                <p>ZIP {a.zip}</p>
              </Link>
            ))}
          </div>
          <p className="muted" style={{ marginTop: "2rem" }}>
            Primary ZIPs {site.zipsPrimary.join(", ")}. Nearby {site.zipsNearby.join(", ")}.
          </p>
        </div>
      </section>
      <CtaBand title="Serving Newark and nearby towns" text="If you are in New Castle County and the system failed, start with a call." />
    </>
  );
}
