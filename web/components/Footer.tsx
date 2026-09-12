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
          <Logo light />
          <p className="footer-tag">{site.tagline}</p>
          {hasPhone ? (
            <p>
              <a className="footer-phone" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </p>
          ) : (
            <p className="muted">Call tracking number posts here once assigned.</p>
          )}
          {hasEmail ? <p><a href={`mailto:${site.email}`}>{site.email}</a></p> : null}
          <CallLink className="btn btn-call" />
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            {footerServices.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Service areas</h2>
          <ul>
            <li>
              <Link href="/service-area/">Newark, DE</Link>
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
              <Link href="/reviews/">Reviews</Link>
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
          © {new Date().getFullYear()} {site.legalName}. Heating and cooling service for Newark, Delaware and nearby New
          Castle County communities.
        </p>
      </div>
    </footer>
  );
}
