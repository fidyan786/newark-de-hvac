import Link from "next/link";
import { site } from "@/lib/site";

type Tone = "light" | "dark" | "mono";

export function Logo({ tone = "light" }: { tone?: Tone }) {
  const onDark = tone === "dark";
  const ink = tone === "mono" ? "currentColor" : onDark ? "#F6F4F1" : "#161616";
  const mark = tone === "mono" ? "currentColor" : onDark ? "#F6F4F1" : "#2F4A63";

  return (
    <Link href="/" className={`logo tone-${tone}`} aria-label={`${site.name} home`}>
      <span className="logo-mark" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke={mark} strokeWidth="1.5" />
          <path d="M9 22V10h3.2l5.2 7.4V10H21v12h-3.1L12.6 14.4V22H9Z" fill={ink} />
        </svg>
      </span>
      <span className="logo-text">
        <strong>Newark</strong>
        <em>HVAC Pros</em>
      </span>
    </Link>
  );
}
