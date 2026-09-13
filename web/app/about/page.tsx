import Image from "next/image";
import { CtaBand } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Newark HVAC Pros | Newark, Delaware",
  description:
    "Newark HVAC Pros provides heating and cooling service for Newark, Delaware and nearby New Castle County communities.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <p className="eyebrow">Company</p>
            <h1>About {site.name}</h1>
            <p className="lede">
              We provide heating and cooling service for Newark, Delaware — homes, rentals, and light commercial
              buildings across New Castle County.
            </p>
          </div>
          <div className="hero-photo img-hover">
            <Image
              src="/images/about/house.jpg"
              alt="Residential home in a Newark-area neighborhood"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className="zoom-img"
              priority
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h2>The work we do</h2>
          <p>
            Newark housing is a mix of older stock, campus-area rentals, and newer streets toward Glasgow and Bear.
            Outdoor units fight humidity all summer. Oil and gas heat still show up in mechanical rooms. That is the
            work: diagnose the system, explain the options, and complete the job that actually fits the house.
          </p>
          <ul className="list-check">
            <li>Residential heating and cooling</li>
            <li>Light commercial HVAC</li>
            <li>Repair, replacement, and maintenance</li>
            <li>Service across Newark and surrounding communities</li>
          </ul>
        </div>
      </section>
      <CtaBand title="Talk with Newark HVAC Pros" text="Tell us the ZIP and what the system is doing." />
    </>
  );
}
