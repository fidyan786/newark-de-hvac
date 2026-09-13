"use client";

import { primaryCta, secondaryCta } from "@/lib/cta";
import { usePathname } from "next/navigation";

export function CallLink({
  className = "btn btn-primary",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const cta = primaryCta(pathname);
  return (
    <a className={className} href={cta.href}>
      {children || cta.label}
    </a>
  );
}

export function SecondaryLink({ className = "btn btn-ghost" }: { className?: string }) {
  const cta = secondaryCta();
  return (
    <a className={className} href={cta.href}>
      {cta.label}
    </a>
  );
}
