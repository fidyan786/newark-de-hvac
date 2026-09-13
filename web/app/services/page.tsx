import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/PageHero";
import { CallLink } from "@/components/CallLink";
import { pageMeta } from "@/lib/seo";
import { serviceCategories } from "@/lib/nav";

export const metadata = pageMeta({
  title: "HVAC Services in Newark, DE | Heating & Cooling",
  description:
    "HVAC services in Newark, Delaware: AC repair and installation, furnace service, heat pumps, indoor air quality, and commercial HVAC.",
  path: "/services/",
});

export default function ServicesHub() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Newark, Delaware</p>
          <h1>HVAC services</h1>
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
