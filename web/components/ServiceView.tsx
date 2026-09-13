import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { publicHref, serviceHref } from "@/lib/paths";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";
import type { ServiceContent } from "@/lib/services";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export function ServiceView({ s }: { s: ServiceContent }) {
  const path = serviceHref(s.slug);
  const url = absoluteUrl(path, site.siteUrl);
  const emergency = s.slug.startsWith("emergency");

  return (
    <>
      <JsonLd data={serviceJsonLd(s.h1, url, s.description)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/", site.siteUrl) },
          { name: "Services", url: absoluteUrl("/services/", site.siteUrl) },
          { name: s.h1, url },
        ])}
      />
      <JsonLd data={faqJsonLd(s.faqs)} />
      <PageHero eyebrow={s.eyebrow} title={s.h1} lede={s.lede} image={s.image} imageAlt={s.imageAlt} emergency={emergency} />
      <section className="section">
        <div className="wrap prose-narrow">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services/", label: "Services" },
              { href: path, label: s.h1 },
            ]}
          />
          {emergency ? (
            <div className="notice">
              <h2 className="notice-title">Gas or carbon monoxide</h2>
              <p className="muted notice-copy">
                If you smell gas or a CO alarm is sounding, leave the building and contact the utility or 911. Do not
                operate light switches, the thermostat, or the furnace until the home is cleared.
              </p>
            </div>
          ) : null}
          <h2>Common problems</h2>
          <ul className="list-check">
            {s.problems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section paper">
        <div className="wrap split">
          <div>
            <p className="eyebrow">What’s included</p>
            <h2>What this service covers</h2>
            <ul className="list-check">
              {s.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Signs it is time</h2>
            <ul className="list-check">
              {s.signs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2>Why this service matters in Newark</h2>
            <p>{s.why}</p>
            <h3 className="local-h">Local to New Castle County</h3>
            <p>{s.local}</p>
          </div>
          <div className="split-photo img-hover">
            <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" className="zoom-img" />
          </div>
        </div>
      </section>
      <section className="section paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Process</p>
            <h2>How the visit works</h2>
          </div>
          <div className="process-grid">
            {s.process.map((step, i) => (
              <article className="process-card" key={step.title}>
                <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Related</p>
            <h2>Related services</h2>
          </div>
          <div className="problem-grid">
            {s.related.map((r) => (
              <Link className="problem-card" href={publicHref(r.href)} key={r.href}>
                <h3>{r.label}</h3>
                <p>{r.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section paper">
        <div className="wrap faq-wrap">
          <h2>Questions</h2>
          <FaqList items={s.faqs} />
        </div>
      </section>
      <CtaBand
        title={`Need ${s.h1.replace(" in Newark, DE", "")} in Newark?`}
        text="Call or request service with the ZIP and the symptom."
      />
    </>
  );
}
