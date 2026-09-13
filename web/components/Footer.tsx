import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CallLink } from "@/components/CallLink";
import { footerServices, locationLinks } from "@/lib/nav";
import { hasEmail, hasPhone, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Logo tone="dark" />
          <p className="footer-tag">
            Heating and cooling service for homes and light commercial buildings in Newark, Delaware and nearby New
            Castle County communities.
          </p>
          {hasPhone ? (
            <p>
              <a className="footer-phone" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </p>
          ) : null}
          {hasEmail ? (
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          ) : null}
          <p style={{ marginTop: "1rem" }}>
            <CallLink className="btn btn-primary" />
          </p>
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            {footerServices.map((s) => (
              <li key={s.href + s.label}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Service areas</h2>
          <ul>
            <li>
              <Link href="/service-area/">Newark</Link>
            </li>
            {locationLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>
              <Link href="/about/">About</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
            <li>
              <Link href="/resources/">Resources</Link>
            </li>
            <li>
              <Link href="/privacy-policy/">Privacy</Link>
            </li>
            <li>
              <Link href="/terms/">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </div>
    </footer>
  );
}
