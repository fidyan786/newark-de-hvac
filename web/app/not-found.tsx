import Link from "next/link";
import { CallLink } from "@/components/CallLink";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <p className="eyebrow">404</p>
        <h1>That page is not here</h1>
        <p className="lede">
          The link may be from an older cost-guide URL. HVAC service pages for Newark, DE still live under Services.
        </p>
        <div className="hero-actions">
          <CallLink />
          <Link className="btn btn-line" href="/">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
