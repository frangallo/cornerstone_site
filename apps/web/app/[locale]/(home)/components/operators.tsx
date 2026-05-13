import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";
import { ArrowRight } from "./icons";

function OrgDiagram() {
  const roles = [
    { label: "CEO", angle: -90 },
    { label: "COO", angle: -30 },
    { label: "Ops", angle: 30 },
    { label: "Sales", angle: 90 },
    { label: "Finance", angle: 150 },
    { label: "People", angle: 210 },
  ];
  const r = 38;

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible" }}>
      {roles.map((role, i) => {
        const rad = (role.angle * Math.PI) / 180;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <line
            key={`line-${i}`}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="var(--rule-strong)"
            strokeWidth="0.3"
            strokeDasharray="0.8 0.8"
          />
        );
      })}
      <circle cx="50" cy="50" r="13" fill="var(--ink)" />
      <g transform="translate(43.5 43.5)">
        <path d="M0 0 H7.7 V5.3 H13 V13 H0 Z" fill="var(--orange)" />
      </g>
      {roles.map((role, i) => {
        const rad = (role.angle * Math.PI) / 180;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <g key={`node-${i}`}>
            <circle cx={x} cy={y} r="8" fill="var(--paper)" stroke="var(--rule-strong)" strokeWidth="0.3" />
            <text
              x={x}
              y={y + 0.9}
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="2.6"
              fontFamily="var(--font-mono), JetBrains Mono, ui-monospace, monospace"
              fontWeight="500"
            >
              {role.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Operators() {
  return (
    <section
      className="section"
      id="embedded"
      style={{
        paddingTop: "calc(var(--section-py) * 0.7)",
        paddingBottom: "calc(var(--section-py) * 0.7)",
      }}
    >
      <div className="wrap">
        <div
          className="grid embedded-grid"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
        >
          <div>
            <span className="tag">Who actually shows up</span>
            <h2 className="h2" style={{ marginTop: 24 }}>
              One team.<br />
              One system,<br />
              <span className="acc">embedded</span> in yours.
            </h2>
            <p className="lede" style={{ marginTop: 28 }}>
              Plug into Cornerstone's system and see what happens when your business runs on AI.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <CalendlyButton className="btn">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  Book a call <ArrowRight />
                </span>
              </CalendlyButton>
              <Link href="#engagement" className="btn btn-ghost">
                See engagement tiers <ArrowRight />
              </Link>
            </div>
          </div>

          <div
            className="org-diagram-wrap"
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              maxWidth: 540,
              justifySelf: "end",
              width: "100%",
            }}
          >
            <OrgDiagram />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .embedded-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .org-diagram-wrap { justify-self: center !important; max-width: 420px !important; }
        }
      `}</style>
    </section>
  );
}
