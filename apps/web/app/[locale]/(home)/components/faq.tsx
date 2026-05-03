"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

const FAQS = [
  { q: "What size companies do you work with?", a: "Primarily 50–500 person companies where a CEO or COO is the decision-maker. Below that we're overkill; above that you probably already have an internal AI function." },
  { q: "How is this different from a consulting firm?", a: "Consultants deliver slide decks and leave. We embed an operator, ship working systems, and transfer the knowledge to your team — so you're not dependent on us forever." },
  { q: "How fast will I see results?", a: "First working system ships in ~2 weeks. Average ROI crossover is at day 90. Most clients have 10+ workflows live by month 4." },
  { q: "What happens when the engagement ends?", a: "You keep the workflows, the playbooks, the training, and a team that knows how to build the next one. The whole point is to make us unnecessary." },
  { q: "What if we've never done anything with AI?", a: "Perfect. That's where we do our best work — no sunk-cost pilots to unwind, no tool sprawl, just the right first bet." },
  { q: "Can you just train our team without the full engagement?", a: "That's what Start is for. A one-time engagement focused on strategy, training, and one quick win. If you just need your team to get fluent with AI tools and a clear roadmap for what to do next, Start gets you there." },
  { q: "Should I hire a full-time AI leader or go fractional?", a: "A full-time Head of AI costs $250K+ before benefits, takes months to hire, and you're betting on one person's perspective. Fractional gives you the same strategic leadership at a fraction of the cost, plus you get someone who's seen what works across multiple companies. Most of our clients start fractional and eventually build an internal team with our help." },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="section section-cream" id="faq">
      <div className="wrap">
        <Reveal style={{ textAlign: "center" }}>
          <div className="eyebrow eyebrow-navy" style={{ marginBottom: 18 }}>Common questions</div>
          <h2 className="bigword">Things people <span className="bigword-orange">ask us.</span></h2>
        </Reveal>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="faq-ico">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
