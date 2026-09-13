import { Logo } from "@/components/Logo";
import { CallLink } from "@/components/CallLink";
import { SiteLink } from "@/components/SiteLink";
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
          <p className="stack-lg">
            <CallLink className="btn btn-primary" />
          </p>
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            {footerServices.map((s) => (
              <li key={s.href + s.label}>
                <SiteLink href={s.href}>{s.label}</SiteLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Service areas</h2>
          <ul>
            <li>
              <SiteLink href="/service-area/">Newark</SiteLink>
            </li>
            {locationLinks.map((s) => (
              <li key={s.href}>
                <SiteLink href={s.href}>{s.label}</SiteLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>
              <SiteLink href="/about/">About</SiteLink>
            </li>
            <li>
              <SiteLink href="/contact/">Contact</SiteLink>
            </li>
            <li>
              <SiteLink href="/contact/#service-request">Request Service</SiteLink>
            </li>
            <li>
              <SiteLink href="/resources/">Resources</SiteLink>
            </li>
            <li>
              <SiteLink href="/privacy-policy/">Privacy</SiteLink>
            </li>
            <li>
              <SiteLink href="/terms/">Terms</SiteLink>
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
