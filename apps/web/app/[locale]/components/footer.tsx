import { legal } from "@repo/cms";
import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";

const Logo = ({ size = 26 }: { size?: number }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      <path d="M0 0 H13 V9 H22 V22 H0 Z" fill="var(--orange)" />
    </svg>
    <span
      style={{
        fontFamily: "var(--font-display), Archivo, sans-serif",
        fontWeight: 700,
        letterSpacing: "0.04em",
        fontSize: 17,
        color: "var(--paper)",
        textTransform: "uppercase",
      }}
    >
      Cornerstone
    </span>
  </span>
);

function FooterCol({ head, items }: { head: string; items: { label: string; href?: string; calendly?: boolean; external?: boolean }[] }) {
  return (
    <div>
      <div
        className="mono"
        style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" }}
      >
        {head}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => (
          <li key={item.label}>
            {item.calendly ? (
              <CalendlyButton className="footer-link">{item.label}</CalendlyButton>
            ) : item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                {item.label}
              </a>
            ) : (
              <Link href={item.href ?? "#"} className="footer-link">{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Footer = async () => {
  const legalPages = await legal.getPostsMeta();

  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", paddingBottom: 36 }}>
      <div className="wrap">
        <div
          className="footer-grid"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 56,
            paddingBottom: 36,
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <Logo />
            <p style={{ marginTop: 20, fontSize: 14.5, lineHeight: 1.55, color: "rgba(245,241,232,0.66)", maxWidth: "32ch" }}>
              From zero to one in ninety days. Embedded AI operators for mid-market leaders.
            </p>
          </div>
          <FooterCol
            head="Sections"
            items={[
              { label: "Approach", href: "/#approach" },
              { label: "Promise", href: "/#promise" },
              { label: "Rhythm", href: "/#rhythm" },
              { label: "Engagement", href: "/#engagement" },
            ]}
          />
          <FooterCol
            head="Get in touch"
            items={[
              { label: "Book a call", calendly: true },
              { label: "frank@cornerstoneai.co", href: "mailto:frank@cornerstoneai.co" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/francescogallo/", external: true },
            ]}
          />
          <FooterCol
            head="Resources"
            items={[
              { label: "AI Assessment", href: "/#assessment" },
              { label: "ROI Calculator", href: "/#roi" },
              { label: "Pricing", href: "/pricing" },
              ...legalPages.map((p) => ({ label: p._title, href: `/legal/${p._slug}` })),
            ]}
          />
        </div>

      </div>

      <style>{`
        .footer-link {
          color: var(--paper);
          text-decoration: none;
          font-size: 14;
          opacity: 0.85;
          background: none;
          border: 0;
          padding: 0;
          font-family: inherit;
          cursor: pointer;
          text-align: left;
        }
        .footer-link:hover { opacity: 1; color: var(--orange); }
        @media (max-width: 880px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};
