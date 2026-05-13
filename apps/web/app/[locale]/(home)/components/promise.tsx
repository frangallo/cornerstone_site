import { CheckIcon } from "./icons";

const PROMISES = [
  {
    n: "01",
    h: "We Strategize",
    lede: "We sit down with you to where your business actually needs help.",
    p: "We map where AI fits across your business, then prioritize the use cases that move revenue.",
    bullets: ["Executive alignment", "Workflow audit", "90-day roadmap"],
  },
  {
    n: "02",
    h: "We Build",
    lede: "We design what to build, how it fits together, and the path to get there.",
    p: "We architect the stack and redesign the workflow so AI fits the work, not the other way around.",
    bullets: ["1–4 workflows / month", "Your stack, your data", "Owned by you"],
  },
  {
    n: "03",
    h: "We Train",
    lede: "Your team learns to run it, build on it, and ship the next thing without us.",
    p: "We run hands-on enablement for the people doing the work and build AI fluency across your team.",
    bullets: ["Hands-on workshops", "Internal playbooks", "Knowledge transfer"],
  },
];

export function Promise() {
  return (
    <section className="section dark" id="promise">
      <div className="wrap">
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">The Cornerstone promise</span>
          <h2 className="h2" style={{ marginTop: 24, maxWidth: "26ch" }}>
            We find the work draining your team's time and revenue, then <span className="acc">build the systems that fix it.</span>
          </h2>
        </div>

        <div
          className="grid promise-grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {PROMISES.map((p) => (
            <div key={p.n} style={{ background: "var(--ink)", padding: 32 }}>
              <div
                className="mono"
                style={{ fontSize: 11, color: "var(--orange)", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                .{p.n}
              </div>
              <h3 className="h3" style={{ marginTop: 16, color: "var(--paper)" }}>{p.h}</h3>
              <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.5, color: "var(--paper)", fontWeight: 500 }}>{p.lede}</p>
              <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.55, color: "rgba(245,241,232,0.7)" }}>{p.p}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="mono"
                    style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}
                  >
                    <span style={{ color: "var(--orange)" }}><CheckIcon size={12} /></span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .promise-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
