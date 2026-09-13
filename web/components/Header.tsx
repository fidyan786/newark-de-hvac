"use client";

import { useEffect, useRef, useState } from "react";
import { CallLink } from "@/components/CallLink";
import { Logo } from "@/components/Logo";
import { SiteLink } from "@/components/SiteLink";
import { centerNav, serviceGroups } from "@/lib/nav";

const SERVICES_MENU_ID = "services-menu";
const SERVICES_BUTTON_ID = "services-menu-button";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const openFromKeyboard = useRef(false);

  function clearHoverTimer() {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }

  function openServices() {
    clearHoverTimer();
    setServicesOpen(true);
  }

  function closeServicesSoon() {
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  }

  function closeAll() {
    setMenuOpen(false);
    setServicesOpen(false);
    setOpenCat(null);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (menuOpen) {
        setMenuOpen(false);
        setOpenCat(null);
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
  }, [menuOpen, servicesOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.body.classList.toggle("drawer-open", menuOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("drawer-open");
    };
  }, [menuOpen]);

  useEffect(() => () => clearHoverTimer(), []);

  useEffect(() => {
    if (!servicesOpen || !openFromKeyboard.current) return;
    openFromKeyboard.current = false;
    const first = panelRef.current?.querySelector<HTMLAnchorElement>("a[href]");
    first?.focus();
  }, [servicesOpen]);

  function onServicesKey(e: React.KeyboardEvent) {
    if (!servicesOpen && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openFromKeyboard.current = true;
      setServicesOpen(true);
      return;
    }
    if (!servicesOpen) return;
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
    if (!links?.length) return;
    const current = document.activeElement;
    const index = [...links].findIndex((el) => el === current);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[(index + 1 + links.length) % links.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      links[(index - 1 + links.length) % links.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1].focus();
    }
  }

  return (
    <header className="site-header" ref={wrapRef}>
      <div className="wrap header-inner">
        <Logo tone="light" />

        <nav className="desktop-nav" aria-label="Primary">
          <div
            className={`services-root${servicesOpen ? " open" : ""}`}
            onMouseEnter={openServices}
            onMouseLeave={closeServicesSoon}
          >
            <button
              ref={btnRef}
              type="button"
              className="nav-link services-btn"
              id={SERVICES_BUTTON_ID}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls={SERVICES_MENU_ID}
              onClick={() => setServicesOpen((v) => !v)}
              onKeyDown={onServicesKey}
            >
              Services
            </button>
          </div>
          {centerNav.map((item) => (
            <SiteLink key={item.href} href={item.href} className="nav-link">
              {item.label}
            </SiteLink>
          ))}
        </nav>

        <div className="header-actions">
          <CallLink className="btn btn-primary header-call">Call</CallLink>
          <SiteLink href="/contact/" className="btn btn-line header-req">
            Request Service
          </SiteLink>
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

      <nav
        id={SERVICES_MENU_ID}
        ref={panelRef}
        className={`mega${servicesOpen ? " is-open" : ""}`}
        aria-label="Services"
        hidden={!servicesOpen}
        inert={!servicesOpen || undefined}
        onMouseEnter={openServices}
        onMouseLeave={closeServicesSoon}
        onKeyDown={onServicesKey}
      >
        <div className="wrap mega-inner">
          {serviceGroups.map((group) => (
            <div key={group.id} className="mega-col">
              <p className="mega-label">{group.label}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={`${group.id}-${item.label}`}>
                    <SiteLink href={item.href} onClick={closeAll}>
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div id="mobile-drawer" className="mobile-drawer" hidden={!menuOpen} inert={!menuOpen || undefined}>
        <nav aria-label="Mobile">
          <p className="mobile-kicker">Services</p>
          {serviceGroups.map((group) => {
            const expanded = openCat === group.id;
            const panelId = `mobile-services-${group.id}`;
            const buttonId = `${panelId}-button`;
            return (
              <div className="mobile-accordion" key={group.id}>
                <button
                  type="button"
                  className="acc-head"
                  id={buttonId}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenCat(expanded ? null : group.id)}
                >
                  {group.label}
                </button>
                <ul id={panelId} className="acc-body" hidden={!expanded} role="list">
                  {group.items.map((item) => (
                    <li key={`${group.id}-${item.label}`}>
                      <SiteLink href={item.href} onClick={closeAll}>
                        {item.label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {centerNav.map((item) => (
            <SiteLink key={item.href} href={item.href} className="mobile-link" onClick={closeAll}>
              {item.label}
            </SiteLink>
          ))}
          <SiteLink href="/contact/" className="mobile-link" onClick={closeAll}>
            Contact
          </SiteLink>
          <CallLink className="btn btn-primary drawer-cta">Call</CallLink>
        </nav>
      </div>
    </header>
  );
}
