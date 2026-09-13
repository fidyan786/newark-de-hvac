import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceHref } from "@/lib/paths";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";
import Image from "next/image";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return pageMeta({ title: service.title, description: service.description, path: serviceHref(slug) });
  return {};
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const url = absoluteUrl(serviceHref(s.slug), site.siteUrl);
  const emergency = s.category === "emergency";
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
      <div className="page-top">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services/", label: "Services" },
              { href: serviceHref(s.slug), label: s.h1 },
            ]}
          />
        </div>
      </div>
      <PageHero eyebrow={s.eyebrow} title={s.h1} lede={s.lede} image={s.image} imageAlt={s.imageAlt} emergency={emergency} />
      <section className="section">
        <div className="wrap prose-narrow">
          {emergency ? (
            <div className="notice">
              <h2 className="notice-title">Gas, carbon monoxide, fire, or electrical danger</h2>
              <p className="muted notice-copy">
                If you smell gas, a carbon monoxide alarm is sounding, you see fire or smoke, or equipment is sparking,
                leave the area and contact the appropriate emergency service or utility from a safe location. Do not
                operate switches, the thermostat, or the furnace until the home is cleared.
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
      <section className="section mist">
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
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Process</p>
            <h2>How the work is handled</h2>
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
      <section className="section paper">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2>Why this service matters</h2>
            <p>{s.why}</p>
            <h3 className="local-h">In Newark and New Castle County</h3>
            <p>{s.local}</p>
          </div>
          <div className="split-photo img-hover">
            <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" className="zoom-img" />
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
              <Link className="problem-card" href={r.href} key={r.href}>
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
