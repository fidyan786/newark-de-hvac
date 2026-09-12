import { CallLink } from "@/components/CallLink";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { hasEmail, hasPhone, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Newark HVAC Pros | Newark, DE",
  description:
    "Contact Newark HVAC Pros for heating and cooling service in Newark, Delaware. Call or send a short service request with your ZIP and the problem.",
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
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Contact</p>
          <h1>Call for HVAC service in Newark, DE</h1>
          <p className="lede">
            Phone first. The form is four fields if you cannot call right now. You do not need a ten-field questionnaire
            to say the AC stopped.
          </p>
          <div className="hero-actions">
            <CallLink />
          </div>
          {hasPhone ? (
            <p style={{ marginTop: "1rem" }}>
              <a href={`tel:${site.phoneTel}`} style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)" }}>
                {site.phoneDisplay}
              </a>
            </p>
          ) : (
            <p className="muted">A public call-tracking number will appear here once it is assigned.</p>
          )}
          {hasEmail ? (
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          ) : null}
          {site.hours ? <p>Hours: {site.hours}</p> : null}
          {site.address ? <p>{site.address}</p> : null}
        </div>
      </section>
      <section className="section mist">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <h2>Request service</h2>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
