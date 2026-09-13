import { hasPhone, site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";

export function MobileCallBar() {
  return (
    <div className="mobile-call">
      <CallLink className="btn btn-primary">
        {hasPhone ? `Call for Service · ${site.phoneDisplay}` : "Call for Service"}
      </CallLink>
    </div>
  );
}
