import { CalendlyButton } from "@/components/calendly-button";
import { Reveal } from "./reveal";

const DATA = [
  { num: "01", name: "Assess",     tag: "the diagnostic",       items: ["Executive alignment", "AI-Readiness Assessment", "90-day strategic roadmap"] },
  { num: "02", name: "Start",      tag: "first wins",            items: ["Everything in Assess", "1–2 workflow builds", "Hands-on team training", "Department rollout"] },
  { num: "03", name: "Build",      tag: "the recommended one",  rec: true, items: ["Everything in Start", "3–4 workflows / month", "Multi-dept rollout", "AI monitoring"] },
  { num: "04", name: "Accelerate", tag: "company-wide",         items: ["Everything in Build", "Org-wide simultaneous rollout", "Embedded presence", "Aggressive cadence"] },
];

export function Journey() {
  return (
    <section className="section section-paper" id="engagement">
      <div className="wrap">
        <Reveal style={{ textAlign: "center" }}>
          <div className="eyebrow eyebrow-navy" style={{ marginBottom: 18 }}>Pick your starting point</div>
          <h2 className="bigword">Four steps. <span className="bigword-orange">One journey.</span></h2>
          <p style={{ marginTop: 20, fontSize: 17, maxWidth: "52ch", margin: "24px auto 0", lineHeight: 1.5 }}>
            Each step builds on the last. Start where you are.
          </p>
        </Reveal>
        <div className="journey-grid">
          {DATA.map((j) => (
            <div key={j.num} className={`journey-card ${j.rec ? "rec" : ""}`}>
              {j.rec && <div className="journey-rec">Most popular</div>}
              <div className="journey-num">{j.num}</div>
              <div className="journey-name">{j.name}</div>
              <div className="journey-tag">{j.tag}</div>
              <ul className="journey-list">
                {j.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <CalendlyButton className="btn btn-navy btn-lg btn-arrow">Book a strategy call</CalendlyButton>
        </div>
      </div>
    </section>
  );
}
