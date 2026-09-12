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
    "Newark HVAC Pros covers Newark, Delaware ZIPs 19702, 19711, 19713, 19725 and nearby Bear, Pike Creek, Glasgow, Hockessin, Christiana, and New Castle.",
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
            <h1>HVAC service area: Newark, DE</h1>
            <p className="lede">
              Newark is the home base. Nearby communities are on the same dispatch map. Tell us the ZIP when you call —
              19711 near campus is not the same routing conversation as 19701 in Bear.
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
          <h2>Primary ZIPs</h2>
          <p>{site.zipsPrimary.join(" · ")}</p>
          <h2>Campus / university ZIPs</h2>
          <p>{site.zipsCampus.join(" · ")}</p>
          <h2>Nearby ZIPs</h2>
          <p>{site.zipsNearby.join(" · ")}</p>
          <div className="area-grid" style={{ marginTop: "2rem" }}>
            {areas.map((a) => (
              <article className="card area-card" key={a.slug}>
                <div className="thumb">
                  <Image src={a.image} alt={a.imageAlt} fill sizes="50vw" className="zoom-img" />
                </div>
                <div className="body">
                  <h3>{a.h1.replace("HVAC Service in ", "")}</h3>
                  <p>ZIP {a.zip}</p>
                  <Link href={`/${a.slug}/`}>Local HVAC page</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Serving Newark and nearby towns" text="If you are in New Castle County and the system failed, start with a call." />
    </>
  );
}
