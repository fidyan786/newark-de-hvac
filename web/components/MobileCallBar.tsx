import { hasPhone, site } from "@/lib/site";
import { primaryCta } from "@/lib/cta";

export function MobileCallBar() {
  const cta = primaryCta();
  return (
    <div className="mobile-call">
      <a className="btn btn-primary" href={cta.href}>
        {hasPhone ? `Call for Service · ${site.phoneDisplay}` : "Call for Service"}
      </a>
    </div>
  );
}
