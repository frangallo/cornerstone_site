"use client";

import { useState } from "react";

const RHYTHM = [
  {
    key: "align",
    n: "01",
    label: "Align",
    week: "Week One",
    h: "Align.",
    sub: "CEO check-in. Set the priorities for the month.",
    items: [
      { t: "CEO working session", d: "60 minutes. What's on fire? What moves the number?" },
      { t: "Review last month's shipped systems", d: "Honest read: what landed, what's drifting." },
      { t: "Refresh the 30-day roadmap", d: "1 must-ship, 2 should-ships, 1 stretch." },
      { t: "Align department leads", d: "Everyone hears the priority from the same voice." },
    ],
  },
  {
    key: "discover",
    n: "02",
    label: "Discover",
    week: "Week Two",
    h: "Discover.",
    sub: "Sit inside the work. Find what to actually automate.",
    items: [
      { t: "Shadow the people doing the work", d: "The actual screens, tabs, and copy-pastes." },
      { t: "Map the workflow end-to-end", d: "Inputs, decisions, handoffs, dead time." },
      { t: "Score the opportunity", d: "Hours saved · error rate · how often it runs." },
      { t: "Pick the bets for this month", d: "The ones with the cleanest payback." },
    ],
  },
  {
    key: "build",
    n: "03",
    label: "Build",
    week: "Week Three",
    h: "Build.",
    sub: "Ship the systems. In your stack, on your data.",
    items: [
      { t: "Prototype on Day 1", d: "An ugly working version beats a clean spec sheet." },
      { t: "Wire into your tools", d: "Salesforce, Notion, NetSuite, Slack, wherever the work already lives." },
      { t: "Real data, real users", d: "Three operators try it on Friday. We watch where it fails." },
      { t: "Harden, deploy, document", d: "Failure modes, owners, on-call. Treat it like infra." },
    ],
  },
  {
    key: "train",
    n: "04",
    label: "Train + Report",
    week: "Week Four",
    h: "Train + Report.",
    sub: "Hand it over. Show the receipts.",
    items: [
      { t: "Live workshop with the team", d: "Not a recorded course. The people who'll run it, in a room." },
      { t: "Internal playbook", d: "How it works, how to break it, what to do when it does." },
      { t: "ROI report to the CEO", d: "Hours returned, dollars saved, what shipped, what's next." },
      { t: "Set next month's bets", d: "Loop closes. Cycle restarts." },
    ],
  },
];

export function Rhythm() {
  const [active, setActive] = useState("align");
  const data = RHYTHM.find((r) => r.key === active) ?? RHYTHM[0];

  return (
    <section className="section" id="rhythm">
      <div className="wrap">
        <div style={{ marginBottom: 56 }}>
          <span className="tag">The monthly rhythm</span>
          <h2 className="h2" style={{ marginTop: 24, maxWidth: "16ch" }}>
            What every month <span className="acc">looks like.</span>
          </h2>
          <p className="lede" style={{ marginTop: 24, maxWidth: "62ch" }}>
            Same shape every month, fresh content every month. Predictability for your team, compounding wins for your business.
          </p>
        </div>

        <div
          role="tablist"
          className="rhythm-tabs"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            border: "1px solid var(--rule-strong)",
            borderRadius: 12,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {RHYTHM.map((r, i) => {
            const isActive = r.key === active;
            return (
              <button
                key={r.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(r.key)}
                style={{
                  padding: "20px 22px",
                  textAlign: "left",
                  background: isActive ? "var(--ink)" : "transparent",
                  color: isActive ? "var(--paper)" : "var(--ink)",
                  border: 0,
                  borderLeft: i === 0 ? "none" : "1px solid var(--rule-strong)",
                  cursor: "pointer",
                  transition: "background .2s ease, color .2s ease",
                  fontFamily: "inherit",
                }}
              >
                <div className="mono" style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.12em" }}>
                  {r.n}
                </div>
                <div className="h3" style={{ marginTop: 8, fontSize: 22 }}>
                  {r.label}
                </div>
              </button>
            );
          })}
        </div>

        <div className="card" style={{ marginTop: 16, padding: 0, overflow: "hidden" }}>
          <div
            className="grid rhythm-panel"
            style={{ gridTemplateColumns: "5fr 7fr", minHeight: 360 }}
          >
            <div style={{ padding: 40, borderRight: "1px solid var(--rule)" }}>
              <div
                className="mono"
                style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                {data.week} · {data.n} / 04
              </div>
              <h3 className="h2" style={{ marginTop: 18, fontSize: "clamp(40px, 4vw, 56px)" }}>{data.h}</h3>
              <p className="lede" style={{ marginTop: 18, fontSize: 17 }}>{data.sub}</p>
            </div>
            <div style={{ padding: 28 }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {data.items.map((it, i) => (
                  <li
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 16,
                      padding: "18px 12px",
                      borderTop: i === 0 ? "0" : "1px solid var(--rule)",
                    }}
                  >
                    <span
                      className="mono"
                      style={{ fontSize: 11, color: "var(--orange)", letterSpacing: "0.1em", paddingTop: 4, minWidth: 28 }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15.5 }}>{it.t}</div>
                      <div className="muted" style={{ fontSize: 14, marginTop: 4 }}>{it.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .rhythm-tabs { grid-template-columns: repeat(2, 1fr) !important; }
          .rhythm-tabs button:nth-child(3) { border-left: none !important; border-top: 1px solid var(--rule-strong); }
          .rhythm-tabs button:nth-child(4) { border-top: 1px solid var(--rule-strong); }
          .rhythm-panel { grid-template-columns: 1fr !important; }
          .rhythm-panel > div:first-child { border-right: none !important; border-bottom: 1px solid var(--rule); }
        }
      `}</style>
    </section>
  );
}
