import Image from "next/image";
import { CtaBand } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Newark HVAC Pros | Newark, Delaware",
  description:
    "About Newark HVAC Pros — heating and cooling service focused on Newark, Delaware and nearby New Castle County communities.",
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
              {site.name} is a heating and cooling service built around Newark, Delaware. This page will list verified
              ownership, licensing, and shop details as they are confirmed — not invented history.
            </p>
          </div>
          <div className="hero-photo img-hover">
            <Image
              src="/images/about/house.jpg"
              alt="Residential home similar to Newark, Delaware housing"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className="zoom-img"
              priority
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <h2>What is true today</h2>
          <ul className="list-check">
            <li>Market: Newark, Delaware and nearby New Castle County communities</li>
            <li>Work: heating, cooling, repair, replacement, maintenance, and light commercial HVAC</li>
            <li>Climate: IECC Zone 4A mixed-humid — both heat and cooling matter</li>
            <li>Conversion path: describe the problem, then call or request service</li>
          </ul>
          <h2>What is not published yet</h2>
          <p>
            Founder names, years in business, license numbers, physical shop address, and after-hours guarantees appear
            only when they belong to the operating contractor. Empty claims do not help anyone in a no-heat house.
          </p>
          <h2>How we talk about the work</h2>
          <p>
            Newark housing is a mix of 1970s stock, campus rentals, and newer infill toward Glasgow and Bear. Outdoor
            units fight humidity. Oil and gas heat still show up in older mechanical rooms. That is the work — not a
            slogan.
          </p>
        </div>
      </section>
      <CtaBand title="Talk to the Newark HVAC desk" text="Share the ZIP and the symptom. We will tell you the next step." />
    </>
  );
}
