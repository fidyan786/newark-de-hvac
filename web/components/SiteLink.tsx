"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactActionHref, isContactPath, pathsMatch } from "@/lib/cta";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function SiteLink({ href, children, className, onClick }: Props) {
  const pathname = usePathname() || "/";
  const current = pathsMatch(pathname, href);
  const resolved = isContactPath(href) ? contactActionHref(pathname) : href;

  if (resolved.startsWith("#")) {
    return (
      <a href={resolved} className={className} onClick={onClick} aria-current={current ? "page" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={resolved} className={className} onClick={onClick} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}
