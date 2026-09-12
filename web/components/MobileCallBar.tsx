import { primaryCta } from "@/lib/cta";
import { hasPhone, site } from "@/lib/site";

export function MobileCallBar() {
  const cta = primaryCta();
  return (
    <div className="mobile-call">
      <a className="btn btn-call" href={cta.href} style={{ width: "100%", fontSize: "1.05rem" }}>
        {hasPhone ? `Call Now · ${site.phoneDisplay}` : "Request HVAC Service"}
      </a>
    </div>
  );
}
