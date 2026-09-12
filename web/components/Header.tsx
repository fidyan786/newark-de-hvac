"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CallLink } from "@/components/CallLink";
import { Logo } from "@/components/Logo";
import { primaryCta } from "@/lib/cta";
import { serviceGroups } from "@/lib/nav";
import { hasPhone, site } from "@/lib/site";

const barLinks = [
  { href: "/emergency-hvac-newark-de/", label: "Emergency HVAC", extra: false },
  { href: "/furnace-repair-newark-de/", label: "Heating", extra: true },
  { href: "/ac-repair-newark-de/", label: "Cooling", extra: true },
  { href: "/heat-pump-repair-newark-de/", label: "Heat Pumps", extra: true },
  { href: "/hvac-maintenance-newark-de/", label: "Maintenance", extra: true },
  { href: "/commercial-hvac-newark-de/", label: "Commercial", extra: true },
  { href: "/service-area/", label: "Service Areas", extra: false },
  { href: "/about/", label: "About", extra: false },
  { href: "/contact/", label: "Contact", extra: false },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnId = useId();
  const panelId = useId();
  const cta = primaryCta();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setServicesOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeAll() {
    setMenuOpen(false);
    setServicesOpen(false);
    setOpenCat(null);
  }

  return (
    <header className="site-header">
      <div className="wrap header-inner" ref={wrapRef}>
        <Logo light />

        <nav className="desktop-nav" aria-label="Primary">
          <div
            className={`services-root${servicesOpen ? " open" : ""}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="nav-link services-btn"
              id={btnId}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls={panelId}
              onClick={() => setServicesOpen((v) => !v)}
              onFocus={() => setServicesOpen(true)}
            >
              Services
              <span aria-hidden="true">▾</span>
            </button>
            <div id={panelId} className="mega" role="region" aria-labelledby={btnId} hidden={!servicesOpen}>
              {serviceGroups.map((group) => (
                <div key={group.id} className="mega-col">
                  <p className="mega-label">{group.label}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={closeAll}>
                          <strong>{item.label}</strong>
                          <span>{item.hint}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {barLinks.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link${item.extra ? " nav-extra" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <CallLink className="btn btn-call header-call">
            {hasPhone ? `Call ${site.phoneDisplay}` : cta.label}
          </CallLink>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id="mobile-drawer" className={`mobile-drawer${menuOpen ? " open" : ""}`} hidden={!menuOpen}>
        <nav aria-label="Mobile">
          <Link href="/emergency-hvac-newark-de/" className="mobile-link emergency" onClick={closeAll}>
            Emergency HVAC
          </Link>

          <p className="mobile-kicker">Services</p>
          {serviceGroups.map((group) => (
            <div className="mobile-accordion" key={group.id}>
              <button
                type="button"
                className="acc-head"
                aria-expanded={openCat === group.id}
                onClick={() => setOpenCat(openCat === group.id ? null : group.id)}
              >
                {group.label}
                <span aria-hidden="true">{openCat === group.id ? "–" : "+"}</span>
              </button>
              <ul className="acc-body" hidden={openCat !== group.id}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeAll}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link href="/service-area/" className="mobile-link" onClick={closeAll}>
            Service Areas
          </Link>
          <Link href="/about/" className="mobile-link" onClick={closeAll}>
            About
          </Link>
          <Link href="/contact/" className="mobile-link" onClick={closeAll}>
            Contact
          </Link>
          <CallLink className="btn btn-call drawer-cta" />
        </nav>
      </div>
    </header>
  );
}
