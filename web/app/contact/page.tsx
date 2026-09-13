import { CallLink } from "@/components/CallLink";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { hasEmail, hasPhone, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Newark HVAC Pros | Newark, DE",
  description:
    "Contact Newark HVAC Pros for heating and cooling in Newark, Delaware. Call or send a short service request.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${site.siteUrl}/` },
          { name: "Contact", url: `${site.siteUrl}/contact/` },
        ])}
      />
      <section className="page-hero">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <p className="eyebrow">Contact</p>
          <h1>Request HVAC service</h1>
          <p className="lede">
            Share your ZIP and what the system is doing. We will take the next step from there.
          </p>
          <div className="hero-actions">
            <CallLink>Call for Service</CallLink>
          </div>
          {hasPhone ? (
            <p style={{ marginTop: "1rem" }}>
              <a href={`tel:${site.phoneTel}`} style={{ fontSize: "1.5rem", fontWeight: 650 }}>
                {site.phoneDisplay}
              </a>
            </p>
          ) : null}
          {hasEmail ? (
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          ) : null}
          {site.hours ? <p>Hours: {site.hours}</p> : null}
          {site.address ? <p>{site.address}</p> : null}
        </div>
      </section>
      <section className="section paper">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <h2>Service request</h2>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
