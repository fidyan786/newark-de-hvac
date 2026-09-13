import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, CtaBand } from "@/components/PageHero";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceHref } from "@/lib/paths";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export const metadata = pageMeta({
  title: "HVAC Resources | Newark HVAC Pros",
  description:
    "Practical heating and cooling guidance for Newark, Delaware homeowners — seasonal maintenance, humidity, and when to call for service.",
  path: "/resources/",
});

const articles = [
  {
    href: serviceHref("hvac-maintenance-newark-de"),
    title: "Seasonal HVAC maintenance",
    text: "What a checkup actually covers before Newark’s cooling and heating seasons.",
  },
  {
    href: serviceHref("indoor-air-quality-newark-de"),
    title: "Humidity and indoor air",
    text: "Why mixed-humid summers make “almost cool” feel like the system failed.",
  },
  {
    href: serviceHref("emergency-hvac-newark-de"),
    title: "When the system stops",
    text: "No heat, no cooling, or a carbon monoxide alarm — what to do first.",
  },
  {
    href: serviceHref("heat-pump-repair-newark-de"),
    title: "Heat pumps in Delaware",
    text: "One machine for both seasons, and why winter capacity still matters here.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/", site.siteUrl) },
          { name: "Resources", url: absoluteUrl("/resources/", site.siteUrl) },
        ])}
      />
      <div className="page-top">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/resources/", label: "Resources" },
            ]}
          />
        </div>
      </div>
      <section className="page-hero">
        <div className="wrap-prose">
          <p className="eyebrow">Resources</p>
          <h1>Heating and cooling notes for Newark homes</h1>
          <p className="lede">
            Short, practical pages for Newark homeowners. Start here if you want to understand the problem before you
            call.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap problem-grid">
          {articles.map((a) => (
            <Link className="problem-card" href={a.href} key={a.href}>
              <h2 className="local-h">{a.title}</h2>
              <p>{a.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand title="Need a visit instead?" text="Describe the symptom. We’ll take it from there." />
    </>
  );
}
