import Image from "next/image";
import Link from "next/link";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceCategories } from "@/lib/nav";
import { PHOTOS, serviceHref } from "@/lib/paths";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "HVAC Service in Newark, DE | Newark HVAC Pros",
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
  { href: serviceHref("ac-repair-newark-de"), title: "AC blowing warm air?", text: "The system runs, but the house stays humid and uncomfortable." },
  { href: serviceHref("emergency-hvac-newark-de"), title: "System won’t turn on?", text: "Silent outdoor unit, a humming start, or a breaker that will not stay on." },
  { href: serviceHref("furnace-repair-newark-de"), title: "No heat?", text: "The furnace clicks, ignites and stops, or never starts on a cold night." },
  { href: serviceHref("hvac-maintenance-newark-de"), title: "Strange HVAC noise?", text: "Squeal, grind, or rattle that did not used to be there." },
  { href: serviceHref("humidifiers-dehumidifiers-newark-de"), title: "High humidity?", text: "Cooling that never quite dries the air in a Newark summer." },
  { href: serviceHref("hvac-replacement-newark-de"), title: "Need a replacement?", text: "Heat and cooling are both tired, or the equipment is mismatched." },
  { href: serviceHref("commercial-hvac-newark-de"), title: "Commercial HVAC issue?", text: "A shop, office, or rental that cannot wait on comfort." },
  { href: serviceHref("ductwork-newark-de"), title: "Weak airflow?", text: "Some rooms never catch up. Ducts and returns are often the missing piece." },
];

export default function HomePage() {
  const cooling = serviceCategories[0];
  const heating = serviceCategories[1];
  const heatPumps = serviceCategories[2];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="home-hero">
        <div className="wrap hero-grid">
          <div className="reveal">
            <p className="eyebrow">Newark, Delaware</p>
            <h1>Reliable heating &amp; cooling for Newark, Delaware</h1>
            <p className="lede">
              Professional HVAC service for homes and light commercial buildings across Newark and surrounding New Castle
              County communities.
            </p>
            <div className="hero-actions">
              <CallLink>Call for Service</CallLink>
              <Link className="btn btn-line" href="/services/">
                Explore Services
              </Link>
            </div>
            <p className="hero-note">Serving Newark, Bear, Glasgow, Pike Creek, Hockessin, and nearby towns.</p>
          </div>
          <div className="hero-photo img-hover reveal reveal-d2">
            <Image
              src={PHOTOS.hero}
              alt="HVAC technician checking refrigerant lines on an outdoor condenser"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
              fetchPriority="high"
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
            Repair through replacement<span>Diagnosis before any recommendation</span>
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
          <div className="service-tiles">
            {serviceCategories
              .filter((cat) => cat.id !== "emergency")
              .map((cat) => (
                <article className="service-tile" key={cat.id}>
                  <Link href={cat.href} className="service-tile-photo img-hover">
                    <Image src={cat.image} alt={cat.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" className="zoom-img" />
                  </Link>
                  <div className="service-tile-copy">
                    <p className="eyebrow">{cat.label}</p>
                    <h3>
                      <Link href={cat.href}>{cat.title}</Link>
                    </h3>
                    <p>{cat.text}</p>
                    <div className="ed-links">
                      {cat.links.map((l) => (
                        <Link key={l.href + l.label} href={l.href}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                    <p className="tile-cta">
                      <Link href={cat.href}>View {cat.label.toLowerCase()}</Link>
                    </p>
                  </div>
                </article>
              ))}
          </div>
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
            <Image src={cooling.image} alt={cooling.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" className="zoom-img" />
          </div>
          <div>
            <p className="eyebrow">{cooling.label}</p>
            <h2>{cooling.title}</h2>
            <p>{cooling.text}</p>
            <div className="ed-links">
              {cooling.links.map((l) => (
                <Link key={l.href + l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap split">
          <div>
            <p className="eyebrow">{heating.label}</p>
            <h2>{heating.title}</h2>
            <p>{heating.text}</p>
            <div className="ed-links">
              {heating.links.map((l) => (
                <Link key={l.href + l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="split-photo img-hover">
            <Image src={heating.image} alt={heating.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" className="zoom-img" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-photo img-hover">
            <Image src={heatPumps.image} alt={heatPumps.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" className="zoom-img" />
          </div>
          <div>
            <p className="eyebrow">{heatPumps.label}</p>
            <h2>{heatPumps.title}</h2>
            <p>{heatPumps.text}</p>
            <div className="ed-links">
              {heatPumps.links.map((l) => (
                <Link key={l.href + l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap split">
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
          <div className="split-photo img-hover">
            <Image
              src={PHOTOS.technician}
              alt="Technician servicing outdoor HVAC equipment"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="zoom-img"
            />
          </div>
        </div>
      </section>

      <section className="section">
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

      <section className="section paper">
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
              src={PHOTOS.brick}
              alt="Residential home in a Newark-area neighborhood"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="zoom-img"
            />
          </div>
        </div>
      </section>

      <section className="section char">
        <div className="wrap emergency-band">
          <p className="eyebrow eyebrow-on-dark">Emergency HVAC</p>
          <h2>No heat? No cooling?</h2>
          <p className="lede">
            When the system stops, request service and describe the symptom. Gas, carbon monoxide, fire, or electrical
            danger is a public-safety situation — leave the area first and contact emergency services or the utility
            from a safe location.
          </p>
          <div className="hero-actions">
            <CallLink>Call for Service</CallLink>
            <Link className="btn btn-ghost" href={serviceHref("emergency-hvac-newark-de")}>
              Emergency HVAC
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-wrap">
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
