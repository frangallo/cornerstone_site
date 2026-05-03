"use client";

import type { Dictionary } from "@repo/internationalization";
import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  dictionary: Dictionary;
}

const Logo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="28" height="28" rx="6" fill="#E8823A" stroke="#0F2A3D" strokeWidth="2" />
    <path d="M8 22 L8 14 L14 14 L14 18 L20 18 L20 22 Z" fill="#0F2A3D" />
    <path d="M8 14 L14 14 L14 9 L8 9 Z" fill="#0F2A3D" opacity="0.5" />
    <path d="M14 18 L20 18 L20 14 L14 14 Z" fill="#0F2A3D" opacity="0.75" />
  </svg>
);

const NAV_LINKS = [
  { href: "/#approach", label: "Approach" },
  { href: "/#promise", label: "Promise" },
  { href: "/#assessment", label: "Assessment" },
  { href: "/#engagement", label: "Engagement" },
];

export const Header = ({ dictionary: _dictionary }: HeaderProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-logo" onClick={close}>
          <Logo />
          <span>Cornerstone</span>
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>
        <CalendlyButton className="nav-cta btn-arrow">
          Book a Call
        </CalendlyButton>
        <button
          className={`nav-burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={`nav-drawer ${open ? "is-open" : ""}`} onClick={close}>
        <div className="nav-drawer-inner" onClick={(e) => e.stopPropagation()}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={close}>{l.label}</Link>
          ))}
          <CalendlyButton className="nav-drawer-cta btn-arrow">
            Book a Call
          </CalendlyButton>
        </div>
      </div>
    </nav>
  );
};
