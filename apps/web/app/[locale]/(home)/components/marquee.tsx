const STATS = [
  { v: "81%", k: "of leaders know AI can help", src: "BCG · 2025" },
  { v: "88%", k: "want help getting started", src: "McKinsey · 2025" },
  { v: "45%", k: "cite lack of expertise as #1 barrier", src: "Gartner · 2025" },
  { v: "27%", k: "have actually done something", src: "IBM · 2025" },
];

export function Marquee() {
  return (
    <section className="section dark" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="wrap">
        <div
          className="grid stats-grid"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "8px 16px",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                className="tnum"
                style={{
                  fontFamily: "var(--font-display), Archivo, sans-serif",
                  fontSize: "clamp(40px, 4.4vw, 64px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "var(--orange)",
                }}
              >
                {s.v}
              </div>
              <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.4, color: "rgba(245,241,232,0.85)", whiteSpace: "nowrap" }}>
                {s.k}
              </div>
              <div
                className="mono"
                style={{ marginTop: 10, fontSize: 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {s.src}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 0 !important; }
          .stats-grid > div:nth-child(3) { border-left: none !important; }
          .stats-grid > div > div:nth-child(2) { white-space: normal !important; max-width: 24ch !important; }
        }
        @media (max-width: 520px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div { border-left: none !important; padding: 16px 0 !important; }
        }
      `}</style>
    </section>
  );
}
