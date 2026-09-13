import Image from "next/image";
import Link from "next/link";
import { CallLink } from "@/components/CallLink";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, CtaBand } from "@/components/PageHero";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceCategories } from "@/lib/nav";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = pageMeta({
  title: "Heating, Cooling & HVAC Services | Newark HVAC Pros",
  description:
    "HVAC services in Newark, Delaware: AC repair and installation, furnace service, heat pumps, indoor air quality, and commercial HVAC.",
  path: "/services/",
});

export default function ServicesHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/", site.siteUrl) },
          { name: "Services", url: absoluteUrl("/services/", site.siteUrl) },
        ])}
      />
      <div className="page-top">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services/", label: "Services" },
            ]}
          />
        </div>
      </div>
      <section className="page-hero">
        <div className="wrap-prose">
          <p className="eyebrow">Newark, Delaware</p>
          <h1>HVAC services in Newark, DE</h1>
          <p className="lede">
            Cooling, heating, heat pumps, indoor air, and light commercial work — organized the way homeowners actually
            look for help.
          </p>
          <div className="hero-actions">
            <CallLink>Call for Service</CallLink>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {serviceCategories.map((cat, i) => (
            <article className={`ed-row${i % 2 ? " flip" : ""}`} key={cat.id}>
              <div className="ed-photo img-hover">
                <Image src={cat.image} alt={cat.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" className="zoom-img" />
              </div>
              <div className="ed-copy">
                <p className="eyebrow">{cat.label}</p>
                <h2>{cat.title}</h2>
                <p className="muted">{cat.text}</p>
                <div className="ed-links">
                  {cat.links.map((l) => (
                    <Link key={l.href + l.label} href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Not sure which service you need?" text="Describe the symptom. We’ll point you to the right visit." />
    </>
  );
}
