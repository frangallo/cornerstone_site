const PROBLEMS = [
  {
    n: "01",
    h: "Buy more tools.",
    p: "Sign up for ChatGPT. Let your software vendor turn on their AI features. Half the seats sit unused. You're not sure what's working.",
  },
  {
    n: "02",
    h: "Hire a freelancer.",
    p: "They'll build a chatbot or wire up a Zapier flow, then move on. Nobody on your team knows how it works.",
  },
  {
    n: "03",
    h: "Figure it out internally.",
    p: "Your best people are already stretched thin. Nobody has 20 hours a week to research AI on top of their actual job.",
  },
  {
    n: "04",
    h: "Do nothing.",
    p: "Many aren't and they're pulling ahead every month.",
  },
];

export function Options() {
  return (
    <section className="section" id="approach">
      <div className="wrap">
        <div
          className="grid problem-grid"
          style={{ gridTemplateColumns: "5fr 7fr", gap: 64, alignItems: "start" }}
        >
          <div className="problem-sticky" style={{ position: "sticky", top: 100 }}>
            <span className="tag">The problem</span>
            <h2 className="h2" style={{ marginTop: 24, maxWidth: "12ch" }}>
              Every option <span className="acc">feels wrong.</span>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              And you know you need to do something. Here's what most teams are dealing with.
            </p>
          </div>
          <div
            className="grid problem-cards"
            style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {PROBLEMS.map((p) => (
              <div key={p.n} className="card" style={{ padding: 24 }}>
                <div
                  className="mono"
                  style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.12em" }}
                >
                  {p.n}
                </div>
                <h3 className="h3" style={{ marginTop: 12, fontSize: 22 }}>{p.h}</h3>
                <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.5, color: "var(--ink)" }}>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .problem-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .problem-sticky { position: static !important; }
        }
        @media (max-width: 520px) {
          .problem-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
