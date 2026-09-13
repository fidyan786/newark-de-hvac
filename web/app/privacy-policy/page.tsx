import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy | Newark HVAC Pros",
  description: "Privacy policy for Newark HVAC Pros in Newark, Delaware.",
  path: "/privacy-policy/",
});

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h1>Privacy policy</h1>
        <p>
          {site.name} uses the information you submit on the service-request form — name, phone, ZIP, service type, and
          message — to return your inquiry.
        </p>
        <p>Form submissions are not sold. Questions about this policy can be sent through the contact page.</p>
      </div>
    </section>
  );
}
