import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

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
          a bid, a license, or a guarantee of dispatch time.
        </p>
        <p>
          Requesting service does not create a contract until the operating contractor confirms the visit. Safety
          guidance on this site is general: gas odors and carbon monoxide alarms are emergency-utility / 911 situations.
        </p>
        <p>{site.legalName} may update these terms as the operating business details are completed.</p>
      </div>
    </section>
  );
}
