import Link from "next/link";
import { CallLink } from "@/components/CallLink";

export const metadata = {
  title: "Page not found | Newark HVAC Pros",
  description: "That page is not on the Newark HVAC Pros website. HVAC services for Newark, Delaware are listed under Services.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap-narrow">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lede">The page may have moved. HVAC services for Newark, Delaware are listed under Services.</p>
        <div className="hero-actions">
          <CallLink>Call for Service</CallLink>
          <Link className="btn btn-line" href="/">
            Home
          </Link>
          <Link className="btn btn-line" href="/services/">
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}
