import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label={`${site.name} home`}>
      <span className="logo-mark" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill={light ? "#E8A23A" : "#C97812"} />
          <path d="M8 18c4-8 12-8 16 0" stroke={light ? "#0B1F3A" : "#0B1F3A"} strokeWidth="2" strokeLinecap="round" />
          <path d="M10 22h12" stroke={light ? "#0B1F3A" : "#0B1F3A"} strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="12" r="2.2" fill={light ? "#0B1F3A" : "#0B1F3A"} />
        </svg>
      </span>
      <span className="logo-text">
        <strong>{site.name}</strong>
        <em>Newark, Delaware</em>
      </span>
    </Link>
  );
}
