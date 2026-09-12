import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy | Newark HVAC Pros",
  description: "Privacy policy for the Newark HVAC Pros website serving Newark, Delaware.",
  path: "/privacy-policy/",
});

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>Privacy policy</h1>
        <p>
          {site.name} collects the information you type into the service-request form (name, phone, ZIP, and message)
          so we can return the call. If a call-tracking number or analytics ID is configured, those vendors process
          the related data under their own terms.
        </p>
        <p>
          We do not sell form submissions. We do not publish reviews or addresses you did not provide for that purpose.
        </p>
        <p>Questions about this policy can be sent through the contact page.</p>
      </div>
    </section>
  );
}
