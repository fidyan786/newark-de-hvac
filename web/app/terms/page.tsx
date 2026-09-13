import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use | Newark HVAC Pros",
  description: "Terms of use for the Newark HVAC Pros website.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>Terms of use</h1>
        <p>
          This website describes heating and cooling services for Newark, Delaware. Content is informational. It is not
          a bid or a guarantee of dispatch time.
        </p>
        <p>
          Requesting service does not create a contract until the visit is confirmed. Gas odors and carbon monoxide
          alarms are utility / 911 situations.
        </p>
      </div>
    </section>
  );
}
