import { CalendlyButton } from "@/components/calendly-button";
import { ArrowRight, CheckIcon } from "./icons";

const TIERS = [
  {
    n: "01",
    name: "Assess",
    sub: "the diagnostic",
    price: "from $25K",
    desc: "Two weeks. Executive alignment, AI-readiness audit, and the roadmap you'll execute against.",
    bullets: [
      "Executive alignment session",
      "AI-Readiness Assessment",
      "90-day strategic roadmap",
      "Final read-out to leadership",
    ],
  },
  {
    n: "02",
    name: "Start",
    sub: "first wins",
    price: "from $60K",
    desc: "30 days. Everything in Assess, plus 1–2 production workflows and a team that knows how to run them.",
    bullets: [
      "Everything in Assess",
      "1–2 workflow builds",
      "Hands-on team training",
      "Department rollout",
    ],
  },
  {
    n: "03",
    name: "Build",
    sub: "the recommended one",
    price: "from $30K / mo",
    desc: "Ongoing. Embedded operator, multi-department rollout, monthly cadence. Most clients live here.",
    bullets: [
      "Everything in Start",
      "3–4 workflows / month",
      "Multi-dept rollout",
      "Live AI monitoring",
    ],
    popular: true,
  },
  {
    n: "04",
    name: "Accelerate",
    sub: "company-wide",
    price: "from $60K / mo",
    desc: "Ongoing. Full embedded presence, simultaneous rollouts across functions, aggressive shipping cadence.",
    bullets: [
      "Everything in Build",
      "Org-wide simultaneous rollout",
      "Embedded presence",
      "Aggressive cadence",
    ],
  },
];

export function Journey() {
  return (
    <section className="section" id="engagement">
      <div className="wrap">
        <div
          className="flex between pricing-head"
          style={{ alignItems: "end", marginBottom: 56, gap: 32, flexWrap: "wrap" }}
        >
          <div>
            <span className="tag">Pick your starting point</span>
            <h2 className="h2" style={{ marginTop: 24, maxWidth: "14ch" }}>
              Four steps. <span className="acc">One journey.</span>
            </h2>
          </div>
          <p className="lede" style={{ maxWidth: "44ch" }}>
            Each step builds on the last. Start where you are; graduate when you're ready.
          </p>
        </div>

        <div
          className="grid pricing-grid"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
        >
          {TIERS.map((t) => {
            const isPop = !!t.popular;
            return (
              <div
                key={t.n}
                className="card"
                style={{
                  padding: 28,
                  position: "relative",
                  background: isPop ? "var(--ink)" : "#fff",
                  color: isPop ? "var(--paper)" : "var(--ink)",
                  borderColor: isPop ? "var(--ink)" : "var(--rule-strong)",
                }}
              >
                {isPop && (
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      left: 24,
                      fontFamily: "var(--font-mono), JetBrains Mono, ui-monospace, monospace",
                      fontSize: 10.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      background: "var(--orange)",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: 4,
                    }}
                  >
                    Most popular
                  </div>
                )}
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: isPop ? "var(--orange)" : "var(--mute)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {t.n}
                </div>
                <h3 className="h3" style={{ marginTop: 18, fontSize: 30 }}>{t.name}</h3>
                <div
                  className="mono"
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: isPop ? "var(--orange)" : "var(--orange-deep)",
                    fontStyle: "italic",
                  }}
                >
                  {t.sub}
                </div>
                <p
                  style={{
                    marginTop: 16,
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: isPop ? "rgba(245,241,232,0.8)" : "var(--ink)",
                    minHeight: 84,
                  }}
                >
                  {t.desc}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "20px 0 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    borderTop: isPop
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "1px solid var(--rule)",
                    paddingTop: 18,
                  }}
                >
                  {t.bullets.map((b) => (
                    <li
                      key={b}
                      style={{ display: "flex", gap: 10, fontSize: 13.5, alignItems: "flex-start" }}
                    >
                      <span style={{ color: "var(--orange)", flexShrink: 0, marginTop: 2 }}>
                        <CheckIcon size={12} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <CalendlyButton className="btn">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              Book a strategy call <ArrowRight />
            </span>
          </CalendlyButton>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
