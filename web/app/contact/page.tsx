import { CallLink } from "@/components/CallLink";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { SERVICE_REQUEST_ID } from "@/lib/cta";
import { hasEmail, hasPhone, site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = pageMeta({
  title: "Contact Newark HVAC Pros | Newark, DE",
  description:
    "Contact Newark HVAC Pros for heating and cooling in Newark, Delaware. Call or send a short service request.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/", site.siteUrl) },
          { name: "Contact", url: absoluteUrl("/contact/", site.siteUrl) },
        ])}
      />
      <div className="page-top">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/contact/", label: "Contact" },
            ]}
          />
        </div>
      </div>
      <section className="page-hero">
        <div className="wrap-narrow">
          <p className="eyebrow">Contact</p>
          <h1>Request HVAC service</h1>
          <p className="lede">
            Share your ZIP and what the system is doing. We will take the next step from there.
          </p>
          <div className="hero-actions">
            <CallLink>Call for Service</CallLink>
          </div>
          {hasPhone ? (
            <p>
              <a className="footer-phone" href={`tel:${site.phoneTel}`}>
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
      <section className="section paper" id={SERVICE_REQUEST_ID}>
        <div className="wrap-narrow">
          <h2>Service request</h2>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
