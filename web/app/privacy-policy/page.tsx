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
      <div className="wrap-prose">
        <h1>Privacy policy</h1>
        <p>
          {site.name} uses the information you submit on the service-request form — name, phone, ZIP, service type, and
          message — to return your inquiry. Chat messages on this site are used to route you to the right next step.
        </p>
        <p>Form submissions are not sold. Questions about this policy can be sent through the contact page.</p>
        <p>
          If a security researcher needs to report a vulnerability, use the contact page. A machine-readable contact
          file is published at <code>/.well-known/security.txt</code>.
        </p>
      </div>
    </section>
  );
}
