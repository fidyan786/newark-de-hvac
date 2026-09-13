import Image from "next/image";
import Link from "next/link";
import { CallLink, SecondaryLink } from "@/components/CallLink";
import { CtaBand } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceCategories } from "@/lib/nav";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "HVAC Service in Newark, DE | Heating & Cooling",
  description:
    "Professional heating and cooling in Newark, Delaware. AC repair, furnace service, heat pumps, maintenance, and commercial HVAC for New Castle County.",
  path: "/",
});

const homeFaqs = [
  {
    q: "What HVAC problems are common in Newark homes?",
    a: "Humid summers overload aging condensers. January cold finds furnaces that sat unused. Older housing around 19711 and 19702 also shows weak airflow and outdoor units buried in debris.",
  },
  {
    q: "Do you service University of Delaware rentals?",
    a: "Yes, with owner or property-manager approval and a working on-site contact.",
  },
  {
    q: "Which communities do you cover?",
    a: "Newark is the home base, including ZIPs 19702, 19711, 19713, and 19725. Nearby work includes Bear, Glasgow, Pike Creek, Hockessin, Christiana, Brookside, Ogletown, and New Castle.",
  },
  {
    q: "What should I do if I smell gas?",
    a: "Leave the building and contact the utility or 911. Do not operate the thermostat or furnace until the home is cleared.",
  },
];

const problems = [
  { href: "/ac-repair-newark-de/", title: "AC blowing warm air?", text: "The system runs, but the house stays humid and uncomfortable." },
  { href: "/emergency-hvac-newark-de/", title: "System won’t turn on?", text: "Silent outdoor unit, a humming start, or a breaker that will not stay on." },
  { href: "/furnace-repair-newark-de/", title: "No heat?", text: "The furnace clicks, ignites and stops, or never starts on a cold night." },
  { href: "/hvac-maintenance-newark-de/", title: "Strange HVAC noise?", text: "Squeal, grind, or rattle that did not used to be there." },
  { href: "/indoor-air-quality-newark-de/", title: "High humidity?", text: "Cooling that never quite dries the air in a Newark summer." },
  { href: "/hvac-replacement-newark-de/", title: "Need a replacement?", text: "Heat and cooling are both tired, or the equipment is mismatched." },
  { href: "/commercial-hvac-newark-de/", title: "Commercial HVAC issue?", text: "A shop, office, or rental that cannot wait on comfort." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="home-hero">
        <div className="wrap hero-grid">
          <div className="reveal">
            <p className="eyebrow">Newark, Delaware HVAC services</p>
            <h1>Reliable heating &amp; cooling for Newark, Delaware</h1>
            <p className="lede">
              Professional HVAC service for homes and light commercial buildings across Newark and surrounding New Castle
              County communities.
            </p>
            <div className="hero-actions">
              <CallLink>Call for Service</CallLink>
              <SecondaryLink className="btn btn-line" />
            </div>
            <p className="hero-note">Serving Newark, Bear, Glasgow, Pike Creek, Hockessin, and nearby towns.</p>
          </div>
          <div className="hero-photo img-hover reveal reveal-d2">
            <Image
              src="/images/hero/service.jpg"
              alt="HVAC technician checking refrigerant lines on an outdoor condenser"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
              className="zoom-img"
            />
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="wrap trust-grid">
          <p>
            Newark &amp; New Castle County<span>Local service area</span>
          </p>
          <p>
            Residential &amp; commercial<span>Homes, shops, and rentals</span>
          </p>
          <p>
            Heating, cooling &amp; heat pumps<span>Year-round HVAC work</span>
          </p>
          <p>
            Major HVAC systems<span>Repair, installation, and maintenance</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Services</p>
            <h2>Heating and cooling for Newark homes</h2>
            <p className="lede">Equipment, airflow, and humidity — handled as one system, not a pile of parts.</p>
          </div>
          {serviceCategories.map((cat, i) => (
            <article className={`ed-row${i % 2 ? " flip" : ""} reveal`} key={cat.id}>
              <div className="ed-photo img-hover">
                <Image src={cat.image} alt={cat.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" className="zoom-img" />
              </div>
              <div className="ed-copy">
                <p className="eyebrow">{cat.label}</p>
                <h3>{cat.title}</h3>
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

      <section className="section paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How can we help</p>
            <h2>What can we help with?</h2>
          </div>
          <div className="problem-grid">
            {problems.map((p) => (
              <Link className="problem-card" href={p.href} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-photo img-hover">
            <Image
              src="/images/hero/service.jpg"
              alt="Technician servicing outdoor HVAC equipment"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="zoom-img"
            />
          </div>
          <div>
            <p className="eyebrow">Why homeowners call</p>
            <h2>Why Newark homeowners choose us</h2>
            <ul className="list-check">
              <li>Professional diagnosis before any recommendation</li>
              <li>Clear communication about what failed and what comes next</li>
              <li>Residential and light commercial expertise</li>
              <li>Modern heating, cooling, and heat-pump systems</li>
              <li>Service across Newark and surrounding communities</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Process</p>
            <h2>How it works</h2>
          </div>
          <div className="process-grid">
            <article className="process-card">
              <span className="process-num">01</span>
              <h3>Tell us what’s happening</h3>
              <p>Share the ZIP and whether it is heat, cooling, water, or a system that will not start.</p>
            </article>
            <article className="process-card">
              <span className="process-num">02</span>
              <h3>We diagnose the system</h3>
              <p>On-site inspection of the equipment, airflow, and the conditions that caused the call.</p>
            </article>
            <article className="process-card">
              <span className="process-num">03</span>
              <h3>We recommend the right solution</h3>
              <p>Repair, maintenance, or replacement — explained before work continues.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Service area</p>
            <h2>HVAC service in Newark, Delaware</h2>
            <p>
              Newark sits in a mixed-humid climate. Summers load the outdoor unit with moisture. Winters still need real
              heat. Housing ranges from 1970s stock near campus to newer streets toward Glasgow and Bear.
            </p>
            <p className="muted">
              We also work in Bear, Glasgow, Pike Creek, Hockessin, Christiana, Brookside, Ogletown, and New Castle —{" "}
              {site.zipsPrimary.join(", ")} and nearby ZIPs.
            </p>
            <p>
              <Link className="btn btn-line" href="/service-area/">
                View service area
              </Link>
            </p>
          </div>
          <div className="split-photo img-hover">
            <Image
              src="/images/local/brick-home.jpg"
              alt="Residential home in a Newark-area neighborhood"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="zoom-img"
            />
          </div>
        </div>
      </section>

      <section className="section char">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p className="eyebrow" style={{ color: "#c9c3ba" }}>
            Emergency HVAC
          </p>
          <h2>No heat? No cooling?</h2>
          <p className="lede">When your HVAC system stops working, we are ready to help.</p>
          <div className="hero-actions">
            <CallLink>Call for Service</CallLink>
            <Link className="btn btn-ghost" href="/emergency-hvac-newark-de/">
              Emergency HVAC
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Questions we hear in Newark</h2>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand title="Ready to talk through the problem?" text="Describe the symptom. We’ll take the next step from there." />
    </>
  );
}
