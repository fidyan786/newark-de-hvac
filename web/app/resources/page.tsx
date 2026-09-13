import Link from "next/link";
import { CtaBand } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "HVAC Resources | Newark HVAC Pros",
  description:
    "Practical heating and cooling guidance for Newark, Delaware homeowners — seasonal maintenance, humidity, and when to call for service.",
  path: "/resources/",
});

const articles = [
  {
    href: "/hvac-maintenance-newark-de/",
    title: "Seasonal HVAC maintenance",
    text: "What a checkup actually covers before Newark’s cooling and heating seasons.",
  },
  {
    href: "/indoor-air-quality-newark-de/",
    title: "Humidity and indoor air",
    text: "Why mixed-humid summers make “almost cool” feel like the system failed.",
  },
  {
    href: "/emergency-hvac-newark-de/",
    title: "When the system stops",
    text: "No heat, no cooling, or a carbon monoxide alarm — what to do first.",
  },
  {
    href: "/heat-pump-repair-newark-de/",
    title: "Heat pumps in Delaware",
    text: "One machine for both seasons, and why winter capacity still matters here.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap" style={{ maxWidth: 720 }}>
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
              <h2 style={{ fontSize: "1.35rem" }}>{a.title}</h2>
              <p>{a.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand title="Need a visit instead?" text="Describe the symptom. We’ll take it from there." />
    </>
  );
}
