"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CallLink } from "@/components/CallLink";
import { Logo } from "@/components/Logo";
import { centerNav, serviceGroups } from "@/lib/nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnId = useId();
  const panelId = useId();

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
        <Logo tone="light" />

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
              onClick={() => {
                if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
                  setServicesOpen(true);
                  return;
                }
                setServicesOpen((v) => !v);
              }}
            >
              Services
            </button>
            <div id={panelId} className="mega" role="region" aria-labelledby={btnId}>
              {serviceGroups.map((group) => (
                <div key={group.id} className="mega-col">
                  <p className="mega-label">{group.label}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={`${group.id}-${item.label}`}>
                        <Link href={item.href} onClick={closeAll}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mega-col">
                <p className="mega-label">Emergency</p>
                <ul>
                  <li>
                    <Link href="/emergency-hvac-newark-de/" onClick={closeAll}>
                      Emergency HVAC
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {centerNav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <CallLink className="btn btn-primary header-call">Call for Service</CallLink>
          <Link href="/contact/" className="btn btn-line header-req">
            Request Service
          </Link>
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

      <div id="mobile-drawer" className="mobile-drawer" hidden={!menuOpen} inert={!menuOpen || undefined}>
        <nav aria-label="Mobile">
          <Link href="/emergency-hvac-newark-de/" className="mobile-link" onClick={closeAll}>
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
                  <li key={`${group.id}-${item.label}`}>
                    <Link href={item.href} onClick={closeAll}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {centerNav.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-link" onClick={closeAll}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="mobile-link" onClick={closeAll}>
            Contact
          </Link>
          <CallLink className="btn btn-primary drawer-cta" />
        </nav>
      </div>
    </header>
  );
}
