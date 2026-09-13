import Image from "next/image";
import Link from "next/link";
import { CallLink, SecondaryLink } from "@/components/CallLink";

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.href} aria-current={i === items.length - 1 ? "page" : undefined}>
            {i === items.length - 1 ? item.label : <Link href={item.href}>{item.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  emergency = false,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  emergency?: boolean;
}) {
  return (
    <section className={`page-hero${emergency ? " emergency" : ""}`}>
      <div className="wrap page-hero-grid">
        <div className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
          <div className="hero-actions">
            <CallLink>Call for Service</CallLink>
            <SecondaryLink className={emergency ? "btn btn-ghost" : "btn btn-line"} />
          </div>
        </div>
        <div className="hero-photo img-hover reveal reveal-d2">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 900px) 100vw, 48vw" priority fetchPriority="high" className="zoom-img" />
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner reveal">
        <div>
          <p className="eyebrow eyebrow-on-dark">Newark, Delaware</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <CallLink>Call for Service</CallLink>
      </div>
    </section>
  );
}
