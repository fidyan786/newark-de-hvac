import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { areas, getArea } from "@/lib/areas";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...services.map((s) => ({ slug: s.slug })), ...areas.map((a) => ({ slug: a.slug }))];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return pageMeta({ title: service.title, description: service.description, path: `/${slug}/` });
  const area = getArea(slug);
  if (area) return pageMeta({ title: area.title, description: area.description, path: `/${slug}/` });
  return {};
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return <ServicePage slug={slug} />;
  const area = getArea(slug);
  if (area) return <AreaPage slug={slug} />;
  notFound();
}

function ServicePage({ slug }: { slug: string }) {
  const s = getService(slug)!;
  const url = `${site.siteUrl}/${s.slug}/`;
  const emergency = s.slug.startsWith("emergency");
  return (
    <>
      <JsonLd data={serviceJsonLd(s.h1, url, s.description)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${site.siteUrl}/` },
          { name: "Services", url: `${site.siteUrl}/services/` },
          { name: s.h1, url },
        ])}
      />
      <JsonLd data={faqJsonLd(s.faqs)} />
      <PageHero eyebrow={s.eyebrow} title={s.h1} lede={s.lede} image={s.image} imageAlt={s.imageAlt} emergency={emergency} />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services/", label: "Services" },
              { href: `/${s.slug}/`, label: s.h1 },
            ]}
          />
          {emergency ? (
            <div className="card" style={{ padding: "1.2rem 1.3rem", marginBottom: "2rem", borderColor: "#e8c48a" }}>
              <h2 style={{ marginTop: 0 }}>Gas or carbon monoxide</h2>
              <p className="muted" style={{ margin: 0 }}>
                If you smell gas or a CO alarm is sounding, leave the building and contact the utility or 911. Do not
                operate light switches, the thermostat, or the furnace until the home is cleared.
              </p>
            </div>
          ) : null}
          <h2>Why people call for this</h2>
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
        <div className="wrap split">
          <div>
            <p className="eyebrow">Why a professional</p>
            <h2>Why this is not a weekend experiment</h2>
            <p>{s.why}</p>
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
            <h2>After you call</h2>
          </div>
          <div className="process-grid">
            {s.process.map((step) => (
              <article className="process-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section mist">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Related</p>
            <h2>Other HVAC pages</h2>
          </div>
          <div className="problem-grid">
            {s.related.map((r) => (
              <Link className="problem-card card" href={r.href} key={r.href}>
                <h3>{r.label}</h3>
                <p>{r.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2>Questions</h2>
          <FaqList items={s.faqs} />
        </div>
      </section>
      <CtaBand title={`Need ${s.h1.replace(" in Newark, DE", "")} in Newark?`} text="Call or request service with the ZIP and the symptom." />
    </>
  );
}

function AreaPage({ slug }: { slug: string }) {
  const a = getArea(slug)!;
  const url = `${site.siteUrl}/${a.slug}/`;
  return (
    <>
      <JsonLd data={serviceJsonLd(a.h1, url, a.description)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${site.siteUrl}/` },
          { name: "Service Area", url: `${site.siteUrl}/service-area/` },
          { name: a.h1, url },
        ])}
      />
      <JsonLd data={faqJsonLd(a.faqs)} />
      <PageHero eyebrow={`ZIP ${a.zip}`} title={a.h1} lede={a.lede} image={a.image} imageAlt={a.imageAlt} />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/service-area/", label: "Service Area" },
              { href: `/${a.slug}/`, label: a.h1 },
            ]}
          />
          {a.body.map((block) => (
            <div key={block.h}>
              <h2>{block.h}</h2>
              <p>{block.p}</p>
            </div>
          ))}
          <FaqList items={a.faqs} />
        </div>
      </section>
      <CtaBand title={`Need HVAC help in ${a.h1.replace("HVAC Service in ", "")}?`} text="Same Newark dispatch. Tell us the ZIP and the problem." />
    </>
  );
}
