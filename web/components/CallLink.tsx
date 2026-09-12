import { primaryCta, secondaryCta } from "@/lib/cta";

export function CallLink({
  className = "btn btn-call",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const cta = primaryCta();
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
