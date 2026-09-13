import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/PageHero";

export const metadata = pageMeta({
  title: "Customer Feedback | Newark HVAC Pros",
  description: "Share feedback after HVAC service with Newark HVAC Pros in Newark, Delaware.",
  path: "/reviews/",
  index: false,
});

export default function ReviewsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap" style={{ maxWidth: 680 }}>
          <p className="eyebrow">Feedback</p>
          <h1>After your visit</h1>
          <p className="lede">
            If we recently completed work at your Newark-area home or building, we welcome a note about the experience.
          </p>
        </div>
      </section>
      <CtaBand title="Send a note" text="Use the contact form and mention that it is feedback from a completed job." />
    </>
  );
}
