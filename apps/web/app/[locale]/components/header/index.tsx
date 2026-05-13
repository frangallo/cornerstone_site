"use client";

import type { Dictionary } from "@repo/internationalization";
import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  dictionary: Dictionary;
}

const Logo = ({ size = 22 }: { size?: number }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      <path d="M0 0 H13 V9 H22 V22 H0 Z" fill="var(--orange)" />
    </svg>
    <span
      style={{
        fontFamily: "var(--font-display), Archivo, sans-serif",
        fontWeight: 700,
        letterSpacing: "0.04em",
        fontSize: 15,
        color: "var(--ink)",
        textTransform: "uppercase",
      }}
    >
      Cornerstone
    </span>
  </span>
);

const ArrowRight = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" className="arrow" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_LINKS: [string, string][] = [
  ["Approach", "/#approach"],
  ["Promise", "/#promise"],
  ["Rhythm", "/#rhythm"],
  ["Engagement", "/#engagement"],
  ["FAQ", "/#faq"],
];

export const Header = ({ dictionary: _dictionary }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 0",
        backdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
        background: scrolled ? "rgba(245, 241, 232, 0.78)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "background .25s ease, border-color .25s ease",
      }}
    >
      <div className="wrap flex between center" style={{ gap: 24 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>

        <nav className="flex gap-32 nav-desktop" style={{ alignItems: "center" }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: "none",
                color: "var(--ink)",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.005em",
                opacity: 0.78,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-desktop">
          <CalendlyButton className="btn">
            <span>Book a call</span>
            <ArrowRight size={12} />
          </CalendlyButton>
        </div>

        <button
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "none",
            width: 36,
            height: 36,
            background: "transparent",
            border: "1px solid var(--rule-strong)",
            borderRadius: 999,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{
            display: "block",
            width: 14,
            height: 1.5,
            background: "var(--ink)",
            position: "relative",
            transition: "transform .15s ease",
          }}>
            <span style={{ position: "absolute", left: 0, right: 0, top: -5, height: 1.5, background: "var(--ink)" }} />
            <span style={{ position: "absolute", left: 0, right: 0, top: 5, height: 1.5, background: "var(--ink)" }} />
          </span>
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(245, 241, 232, 0.96)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            padding: "80px 24px 24px",
          }}
        >
          <nav onClick={(e) => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "var(--ink)",
                  fontSize: 24,
                  fontWeight: 600,
                  fontFamily: "var(--font-display), Archivo, sans-serif",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ marginTop: 24 }}>
              <CalendlyButton className="btn" >
                <span>Book a call</span>
                <ArrowRight size={12} />
              </CalendlyButton>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
