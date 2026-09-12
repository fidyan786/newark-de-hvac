import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/PageHero";

export const metadata = pageMeta({
  title: "Customer Reviews | Newark HVAC Pros",
  description:
    "Reviews for Newark HVAC Pros will be published here when they come from real Newark, Delaware jobs. No placeholder ratings.",
  path: "/reviews/",
});

export default function ReviewsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Reviews</p>
          <h1>Customer reviews coming soon</h1>
          <p className="lede">
            When homeowners leave real feedback from Newark-area jobs, it will show here. Until then this page stays
            empty on purpose — invented five-star copy is worse than none.
          </p>
        </div>
      </section>
      <CtaBand title="Been a customer?" text="If you already had a visit, the public review links will be added once the operating profile is live." />
    </>
  );
}
