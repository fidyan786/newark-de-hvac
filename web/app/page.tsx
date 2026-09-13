import Image from "next/image";
import Link from "next/link";
import { CallLink, SecondaryLink } from "@/components/CallLink";
import { CtaBand } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { primaryCta } from "@/lib/cta";
import { faqJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "HVAC Service in Newark, DE | Heating & Cooling",
  description:
    "Professional heating and cooling service in Newark, Delaware. AC repair, furnace repair, heat pumps, maintenance, and emergency HVAC help for New Castle County homes.",
  path: "/",
});

const homeFaqs = [
  {
    q: "What HVAC problems do Newark homes run into most?",
    a: "Humid summers overload aging condensers. January cold finds furnaces that were “fine in April.” Older housing stock around 19711 and 19702 also shows weak airflow, short cycling, and outdoor units buried in debris.",
  },
  {
    q: "Do you serve University of Delaware rentals?",
    a: "Yes, with owner or property-manager approval and a working on-site contact. Campus ZIPs 19712 and 19716–19718 are on the map.",
  },
  {
    q: "Is this a 24/7 company?",
    a: "After-hours coverage is only claimed here when it is confirmed for the operating contractor. Until then, call or request service and we will tell you the next available window.",
  },
  {
    q: "Which ZIP codes do you cover?",
    a: "Primary Newark-area ZIPs include 19702, 19711, 19713, and 19725, plus nearby Bear (19701), Hockessin (19707), and New Castle (19720).",
  },
  {
    q: "Should I try to fix a gas furnace myself?",
    a: "No. If you smell gas or a carbon monoxide alarm is sounding, leave and contact the utility or 911. Do not open the burner compartment or bypass safety switches.",
  },
];

const featured = [
  "emergency-hvac-newark-de",
  "ac-repair-newark-de",
  "furnace-repair-newark-de",
  "heat-pump-repair-newark-de",
  "hvac-maintenance-newark-de",
  "commercial-hvac-newark-de",
].map((slug) => getService(slug)!);

const problems = [
  { href: "/furnace-repair-newark-de/", title: "No heat", text: "Furnace runs, clicks, or stays silent on a cold Newark night." },
  { href: "/ac-repair-newark-de/", title: "No cooling", text: "Indoor air is warm and sticky while the outdoor unit sits still." },
  { href: "/duct-cleaning-newark-de/", title: "Weak airflow", text: "Rooms far from the air handler never catch up." },
  { href: "/hvac-maintenance-newark-de/", title: "Strange noises", text: "Squeal, grind, or rattle that did not used to be there." },
  { href: "/emergency-hvac-newark-de/", title: "System won’t start", text: "Breaker trips, thermostat is blank, or the unit only hums." },
  { href: "/hvac-replacement-newark-de/", title: "Uneven temperatures", text: "Upstairs swampy, downstairs cold — often ducts or a tired system." },
];

export default function HomePage() {
  const cta = primaryCta();
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="home-hero">
        <div className="wrap hero-grid">
          <div className="reveal">
            <p className="eyebrow">Newark, Delaware HVAC service</p>
            <h1>Reliable heating &amp; cooling service in Newark, DE</h1>
            <p className="lede">
              Professional HVAC help for heating, cooling, repairs, replacements, and maintenance across Newark and
              surrounding New Castle County communities — {site.zipsPrimary.join(", ")}.
            </p>
            <div className="hero-actions">
              <CallLink />
              <SecondaryLink />
            </div>
          </div>
          <div className="hero-photo img-hover reveal reveal-d2">
            <Image
              src="/images/ac/outdoor-unit.jpg"
              alt="Outdoor air conditioning condenser at a residence"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              priority
              className="zoom-img"
            />
            <div className="hero-badge">
              <strong>Newark &amp; New Castle County</strong>
              Heating, cooling, and system service
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="wrap trust-grid">
          <p>
            Newark, Delaware<span>Local service focus</span>
          </p>
          <p>
            New Castle County<span>Homes and light commercial</span>
          </p>
          <p>
            Heating &amp; cooling<span>Climate Zone 4A, mixed-humid</span>
          </p>
          <p>
            Phone-first<span>{cta.detail}</span>
          </p>
        </div>
      </div>

      <section className="section navy">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow">Emergency HVAC</p>
            <h2>No heat? No AC? System stopped working?</h2>
            <p>
              Newark sits in a mixed-humid climate. Summers are sticky. January nights are cold. When a system fails,
              the next useful step is a conversation — ZIP, symptom, and whether anyone is at risk.
            </p>
            <ul className="list-check">
              <li>No heat on a winter night</li>
              <li>No cooling during a humidity spike</li>
              <li>Water, ice, or a system that will not start</li>
            </ul>
            <div className="hero-actions">
              <CallLink />
              <Link className="btn btn-ghost" href="/emergency-hvac-newark-de/">
                Emergency HVAC
              </Link>
            </div>
          </div>
          <div className="split-photo img-hover reveal reveal-d2">
            <Image
              src="/images/furnace/mechanical-room.jpg"
              alt="Mechanical room with heating and cooling equipment"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="zoom-img"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Services</p>
            <h2>Heating, cooling, and the jobs in between</h2>
            <p className="muted">
              Every page is written for Newark-area homes — older stock, humid summers, and campus rentals included.
            </p>
          </div>
          <div className="svc-grid">
            {featured.map((s, i) => (
              <article className={`card svc-card reveal reveal-d${(i % 4) + 1}`} key={s.slug}>
                <div className="thumb">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" className="zoom-img" />
                </div>
                <div className="body">
                  <h3>{s.h1.replace(" in Newark, DE", "")}</h3>
                  <p>{s.lede.slice(0, 120)}…</p>
                  <div className="svc-links">
                    <Link href={`/${s.slug}/`}>Learn more</Link>
                    <CallLink className="svc-call" />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: "1.4rem" }}>
            <Link className="btn btn-line" href="/services/">
              All HVAC services
            </Link>
          </p>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap split">
          <div className="split-photo img-hover reveal">
            <Image
              src="/images/local/brick-home.jpg"
              alt="Brick home typical of New Castle County residential streets"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="zoom-img"
            />
          </div>
          <div className="reveal reveal-d2">
            <p className="eyebrow">Why this site exists</p>
            <h2>A Newark HVAC company you can actually call</h2>
            <p>
              This is a local heating and cooling service for Newark, Delaware — not a national directory and not a
              price catalog. We explain the problem, the service, and the next step.
            </p>
            <ul className="list-check">
              <li>Written for Newark, Bear, Pike Creek, Glasgow, and nearby towns</li>
              <li>No invented years-in-business, star ratings, or “15-minute” promises</li>
              <li>Safety first on gas and carbon monoxide situations</li>
              <li>Residential work plus light commercial</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">HVAC problems</p>
            <h2>What are you dealing with?</h2>
          </div>
          <div className="problem-grid">
            {problems.map((p) => (
              <Link className="problem-card card" href={p.href} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Process</p>
            <h2>What happens after you reach out</h2>
          </div>
          <div className="process-grid">
            <article className="process-card">
              <h3>Call or request</h3>
              <p>Share the ZIP and whether it is heat, cooling, water, or a system that will not start.</p>
            </article>
            <article className="process-card">
              <h3>Discuss the problem</h3>
              <p>We sort emergency vs. scheduled work and whether the home is safe to occupy.</p>
            </article>
            <article className="process-card">
              <h3>Schedule service</h3>
              <p>A visit is booked for the next available window for your Newark-area address.</p>
            </article>
            <article className="process-card">
              <h3>Get HVAC help</h3>
              <p>On-site diagnosis, a clear recommendation, and work only after you approve it.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow">Service area</p>
            <h2>Newark first. New Castle County next.</h2>
            <p>
              Primary coverage is Newark ZIPs {site.zipsPrimary.join(", ")}. Nearby communities include Bear, Glasgow,
              Pike Creek, Hockessin, Christiana, Brookside, Ogletown, and New Castle.
            </p>
            <p>
              <Link className="btn btn-navy" href="/service-area/">
                Full service area
              </Link>
            </p>
          </div>
          <div className="split-photo img-hover reveal reveal-d2">
            <Image
              src="/images/local/neighborhood.jpg"
              alt="Tree-lined neighborhood similar to Newark, Delaware residential streets"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="zoom-img"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Reviews</p>
            <h2>Customer reviews coming soon</h2>
            <p className="muted">
              Live reviews will appear here once they are collected from real Newark-area jobs. We will not publish
              placeholder stars or invented testimonials.
            </p>
            <Link href="/reviews/">Review policy</Link>
          </div>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="section-head reveal">
            <p className="eyebrow">FAQ</p>
            <h2>Newark HVAC questions</h2>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand
        title="Need heating or cooling help in Newark?"
        text="Tell us the ZIP and the symptom. We will take it from there."
      />
    </>
  );
}
