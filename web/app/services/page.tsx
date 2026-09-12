import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/PageHero";
import { CallLink } from "@/components/CallLink";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = pageMeta({
  title: "HVAC Services in Newark, DE | Heating & Cooling",
  description:
    "Full HVAC service list for Newark, Delaware: AC repair, furnace repair, heat pumps, maintenance, ductless, indoor air quality, and commercial HVAC.",
  path: "/services/",
});

export default function ServicesHub() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Newark, Delaware</p>
          <h1>HVAC services</h1>
          <p className="lede">
            Choose the job that matches the problem. Every page is written for Newark and nearby New Castle County homes
            — not a national template with the city name swapped in.
          </p>
          <div className="hero-actions">
            <CallLink />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap svc-grid">
          {services.map((s) => (
            <article className="card svc-card" key={s.slug}>
              <div className="thumb">
                <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" className="zoom-img" />
              </div>
              <div className="body">
                <h2 style={{ fontSize: "1.2rem" }}>{s.h1.replace(" in Newark, DE", "")}</h2>
                <p>{s.lede.slice(0, 110)}…</p>
                <Link href={`/${s.slug}/`}>Learn more</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Not sure which service you need?" text="Describe the symptom. We will point you to the right visit." />
    </>
  );
}
