import Link from "next/link";
import { site } from "@/lib/site";

type Tone = "light" | "dark" | "mono";

export function LogoMark({ tone = "light", size = 36 }: { tone?: Tone; size?: number }) {
  const onDark = tone === "dark";
  const ink = tone === "mono" ? "currentColor" : onDark ? "#F4F1EA" : "#161412";
  const rule = tone === "mono" ? "currentColor" : onDark ? "#C4B49A" : "#6E5840";

  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="1.25" y="1.25" width="33.5" height="33.5" stroke={rule} strokeWidth="1.5" />
      <path d="M10 26V10h3.15l7.1 10.4V10H24v16h-3.2L13.65 15.5V26H10Z" fill={ink} />
      <path d="M10 26h14" stroke={rule} strokeWidth="1.25" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: Tone }) {
  return (
    <Link href="/" className={`logo tone-${tone}`} aria-label={`${site.name} home`}>
      <span className="logo-mark">
        <LogoMark tone={tone} />
      </span>
      <span className="logo-text">
        <strong>Newark</strong>
        <em>HVAC Pros</em>
      </span>
    </Link>
  );
}
