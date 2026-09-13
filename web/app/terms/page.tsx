import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use | Newark HVAC Pros",
  description: "Terms of use for the Newark HVAC Pros website.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <section className="section">
      <div className="wrap-prose">
        <h1>Terms of use</h1>
        <p>
          This website describes heating and cooling services for Newark, Delaware. Content is informational. It is not
          a bid or a guarantee of dispatch time.
        </p>
        <p>
          Requesting service does not create a contract until the visit is confirmed. Gas odors, carbon monoxide alarms,
          fire, smoke, and electrical danger are utility or emergency-service situations — leave the area first.
        </p>
      </div>
    </section>
  );
}
