"use client";

import { useState } from "react";
import { PlusMinus } from "./icons";

const FAQS = [
  { q: "What size companies do you work with?", a: "Primarily 50–500 person companies where a CEO or COO is the decision-maker. Below that we're overkill; above that you probably already have an internal AI function." },
  { q: "How is this different from a consulting firm?", a: "Consultants deliver slide decks and leave. We embed an operator, ship working systems, and transfer the knowledge to your team — so you're not dependent on us forever." },
  { q: "How fast will I see results?", a: "First working system ships in ~2 weeks. Average ROI crossover is at day 90. Most clients have 10+ workflows live by month 4." },
  { q: "What happens when the engagement ends?", a: "You keep the workflows, the playbooks, the training, and a team that knows how to build the next one. The whole point is to make us unnecessary." },
  { q: "What if we've never done anything with AI?", a: "Perfect. That's where we do our best work — no sunk-cost pilots to unwind, no tool sprawl, just the right first bet." },
  { q: "Can you just train our team without the full engagement?", a: "That's what Start is for. A one-time engagement focused on strategy, training, and one quick win." },
  { q: "Should I hire a full-time AI leader or go fractional?", a: "A full-time Head of AI costs $250K+ before benefits and takes months to hire. Fractional gives you the same strategic leadership at a fraction of the cost — plus someone who's seen what works across multiple companies." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div
          className="grid faq-grid"
          style={{ gridTemplateColumns: "5fr 7fr", gap: 64, alignItems: "start" }}
        >
          <div className="faq-sticky" style={{ position: "sticky", top: 100 }}>
            <span className="tag">Common questions</span>
            <h2 className="h2" style={{ marginTop: 24 }}>
              Things people <span className="acc">ask us.</span>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Don't see yours? Email{" "}
              <a
                href="mailto:frank@cornerstoneai.co"
                style={{ color: "var(--orange-deep)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                frank@cornerstoneai.co
              </a>
              .
            </p>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--rule-strong)" }}>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i} style={{ borderBottom: "1px solid var(--rule-strong)" }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: 0,
                      padding: "22px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 24,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      color: "var(--ink)",
                    }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.005em" }}>{f.q}</span>
                    <span style={{ color: "var(--mute)", flexShrink: 0 }}><PlusMinus open={isOpen} /></span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 240 : 0,
                      overflow: "hidden",
                      transition: "max-height .3s ease, padding .3s ease",
                      paddingBottom: isOpen ? 22 : 0,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "var(--ink)", maxWidth: "62ch" }}>{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .faq-sticky { position: static !important; }
        }
      `}</style>
    </section>
  );
}
