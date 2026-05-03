"use client";

import { CalendlyButton } from "@/components/calendly-button";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "./reveal";

type Opt = { t: string; s: number; tag?: string; unsure?: boolean; exclusive?: boolean };
type Q = {
  id: string;
  dim: string;
  weight: number;
  eyebrow: string;
  q: string;
  sub: string;
  opts: Opt[];
  multi?: boolean;
  cap?: number;
};

const A_QS: Q[] = [
  {
    id: "data", dim: "Data & Systems", weight: 0.17,
    eyebrow: "Q1 / 06 · Data & Systems",
    q: "What does your team actually run on?",
    sub: "Pick the closest match for the main software your business runs on day to day.",
    opts: [
      { t: "Modern industry-specific platform that ties everything together — operations, customers, financials.", s: 18 },
      { t: "Modern ERP or operating system, plus a few connected tools.", s: 14 },
      { t: "Cloud SaaS tools that mostly work together.", s: 10 },
      { t: "Multiple systems that don't really talk to each other.", s: 6 },
      { t: "Mostly QuickBooks plus spreadsheets and email.", s: 3 },
    ],
  },
  {
    id: "adoption", dim: "Adoption Reality", weight: 0.17,
    eyebrow: "Q2 / 06 · Adoption Reality",
    q: "What's the AI reality today?",
    sub: "When you look honestly at AI in your business right now, what's actually true?",
    opts: [
      { t: "We have at least one AI system in production tied to a tracked metric.", s: 18 },
      { t: "Multiple people use AI tools daily for real work — nothing is formally measured.", s: 12 },
      { t: "We bought tools (ChatGPT Team, Copilot). A few people use them, most don't.", s: 6 },
      { t: "People experiment on their own. The company hasn't done anything official.", s: 4 },
      { t: "Honestly, nothing yet.", s: 2 },
    ],
  },
  {
    id: "owner", dim: "Strategy & Ownership", weight: 0.21,
    eyebrow: "Q3 / 06 · Strategy & Ownership",
    q: "Who owns AI today?",
    sub: "Is there one named person who owns figuring out AI — and have they identified the specific outcome AI should deliver this year, with a number everyone has seen?",
    opts: [
      { t: "Yes — named owner, specific outcome, dollar or KPI target communicated to the team.", s: 18 },
      { t: "Yes — named owner. We're still scoping the specific outcome and target.", s: 11 },
      { t: "Someone is interested in AI but it's not formally anyone's job.", s: 5 },
      { t: "No — we haven't put a name to it.", s: 1 },
    ],
  },
  {
    id: "pain", dim: "Use Case Clarity", weight: 0.17, multi: true, cap: 3,
    eyebrow: "Q4 / 06 · Use Case Clarity",
    q: "Where does the work get stuck?",
    sub: "What's the most painful, repetitive workflow in your business right now? Pick up to 3 — or the last option if you're not sure.",
    opts: [
      { t: "Inbound leads or customer requests slipping through the cracks.", tag: "Voice AI · missed-call recovery", s: 6 },
      { t: "Quoting, proposals, or estimating taking too long.", tag: "Document AI · proposal automation", s: 6 },
      { t: "Manual data entry between systems.", tag: "Workflow automation · integration AI", s: 6 },
      { t: "Customer follow-up and re-engagement.", tag: "CRM AI · outbound automation", s: 6 },
      { t: "Reporting and pulling numbers takes forever.", tag: "Data automation · dashboarding", s: 6 },
      { t: "Onboarding new hires or training the team.", tag: "Knowledge AI · internal copilots", s: 6 },
      { t: "Scheduling, dispatch, or operations coordination.", tag: "Scheduling AI · ops automation", s: 6 },
      { t: "Customer service or inbound questions.", tag: "Support AI · chatbots", s: 6 },
      { t: "Honestly, I'm not sure what the biggest pain is.", tag: "Triggers floor rule.", s: 0, unsure: true, exclusive: true },
    ],
  },
  {
    id: "access", dim: "Data Accessibility", weight: 0.14,
    eyebrow: "Q5 / 06 · Data Accessibility",
    q: "If your CFO asked for a number, how long would it take?",
    sub: "Revenue per team or unit, cost per job or project, margin by product or service — for last month.",
    opts: [
      { t: "Under 5 minutes — it's already on a dashboard.", s: 18 },
      { t: "End of day. Someone can pull it.", s: 13 },
      { t: "End of week. We'd merge a few reports or spreadsheets.", s: 8 },
      { t: "We don't really track it that way.", s: 3 },
    ],
  },
  {
    id: "barrier", dim: "Self-Awareness", weight: 0.14,
    eyebrow: "Q6 / 06 · Self-Awareness",
    q: "What's your biggest barrier?",
    sub: "What's actually stopping you from getting AI working in your business?",
    opts: [
      { t: "Nothing structural — we're moving but want to move smarter.", s: 18 },
      { t: "We have ideas but no time or capacity to execute.", s: 12 },
      { t: "We don't know where to start or what's worth doing.", s: 8 },
      { t: "We've tried things that didn't stick.", s: 6 },
      { t: "We're skeptical AI will work for a business like ours.", s: 3 },
    ],
  },
];

type Tier = {
  key: string;
  name: string;
  range: [number, number];
  headline: string;
  observed: string;
  industry: string;
  next: string;
  eng: string;
  cta: string;
  color: string;
};

const TIERS: Tier[] = [
  { key: "found",  name: "Foundational Gaps", range: [0, 35],
    headline: "Before any AI investment will pay off, you have foundational work to do — across ownership, data, and process.",
    observed: "No one is named as the AI owner with a budget and a target. Your operating data lives in formats AI systems can't read. The workflows AI would touch aren't documented well enough for a new hire to follow.",
    industry: "You are not alone. Cisco's 2025 AI Readiness Index found roughly half of mid-market organizations score in this range, and McKinsey reports only 1% of executives describe their gen-AI rollouts as \"mature.\" This is where the industry actually is.",
    next: "Don't buy AI tools yet. The right next move is a structured Assess engagement to identify the two or three workflows where AI could realistically pay back.",
    eng: "Assess", cta: "Get the 90-day prerequisite roadmap", color: "var(--orange-deep)" },
  { key: "early",  name: "Early Stage", range: [36, 60],
    headline: "You're experimenting with AI, which is the right instinct. The experiments aren't producing measurable business outcomes yet.",
    observed: "Someone on your team is testing AI tools, often without a shared playbook or a budget. Your data is accessible to humans but not yet structured for AI systems. The use cases you've tried are general-purpose rather than tied to specific operating metrics.",
    industry: "Accenture's research puts 63% of organizations in this band — they call it \"Experimenters,\" with a median score of 29 out of 100. RSM's 2025 mid-market survey found 92% of firms experienced challenges during AI rollout. This is the median experience.",
    next: "You don't need more pilots. You need one production-grade use case tied to a P&L metric. The Start engagement is built for this — pick one workflow, build it properly, instrument it, standardize before adding the second.",
    eng: "Start", cta: "Book a strategy call", color: "var(--orange)" },
  { key: "ready",  name: "Ready to Start", range: [61, 80],
    headline: "Your foundations are largely in place. You're ready to deploy AI to a specific, scoped use case — but not yet ready to scale across functions.",
    observed: "Executive ownership of AI is clear and at least partly funded. Core data is accessible. Processes are documented. One or two AI use cases are scoped, but production deployment with measurement and governance is the chasm you haven't crossed yet.",
    industry: "Cisco classifies this band as \"Chasers\" — about 36% of organizations globally. Moderate preparation, but the gap to genuinely AI-mature operators (the top 10–13%) is real.",
    next: "Move one scoped use case into production with proper measurement, governance, and a 90-day review. The Build engagement is designed for exactly this — one production system with full instrumentation.",
    eng: "Build", cta: "Book a strategy call", color: "var(--navy)" },
  { key: "scale",  name: "Ready to Scale", range: [81, 100],
    headline: "You have the strategic, data, and operational foundations to scale AI across functions — and translate it into measurable revenue or margin impact.",
    observed: "Named C-level AI ownership with multi-quarter budget. Data centralized, governed, and accessible. Multiple use cases in production with documented ROI. Workforce upskilling is a strategic priority.",
    industry: "Accenture's \"AI Achievers\" — 12% of firms — attribute over 30% of revenue to AI-influenced workflows and grow 50% faster than peers. Cisco's \"Pacesetters\" are 13%. You are in that population.",
    next: "The risks at your stage are different — governance gaps, model lifecycle, concentration risk. The Accelerate engagement is built for operators ready to scale across multiple functions with proper guardrails.",
    eng: "Accelerate", cta: "Book a strategy call", color: "var(--navy)" },
];

type Answer = { s: number; t?: string; selected?: Opt[] };
type Answers = Record<string, Answer>;

function buildRecs(answers: Answers) {
  const recs: { pri: number; tag: string; t: string }[] = [];
  if ((answers.owner?.s ?? 18) <= 5) {
    recs.push({ pri: 1, tag: "Strategy & Ownership", t: "Name a single executive owner of AI — quarterly accountability, published 12-month roadmap. Most $10–100M operators don't need a Chief AI Officer hire. They need an owner with 4 hours a week and a fractional partner." });
  }
  if ((answers.data?.s ?? 18) <= 6) {
    recs.push({ pri: 2, tag: "Data & Systems", t: "Your data isn't AI-ready — not because it's bad, but because it lives in formats AI systems can't read. The pre-AI work is integration: get critical operating data out of spreadsheets and fragmented tools into your system of record." });
  }
  if ((answers.access?.s ?? 18) <= 8) {
    recs.push({ pri: 3, tag: "Data Accessibility", t: "AI deployed on data you can't query is AI deployed on guesses. The next 60 days of work is building dashboards your team can actually pull numbers from in under a day." });
  }
  if ((answers.adoption?.s ?? 18) <= 6) {
    recs.push({ pri: 2, tag: "Adoption", t: "Buying tools isn't the problem — activation is. Your next move isn't more software. It's picking one team and one workflow and making it stick before adding anything else." });
  }
  if ((answers.barrier?.s ?? 18) <= 6) {
    recs.push({ pri: 4, tag: "Self-Awareness", t: "If you've tried AI tools that didn't stick, diagnose why before the next attempt. Mid-market operators win with embedded vendor AI tied to a tracked KPI — and lose with custom builds." });
  }
  const painSel = answers.pain?.selected || [];
  const unsure = painSel.some((o) => o.unsure);
  if (unsure || painSel.length === 0) {
    recs.push({ pri: 1, tag: "Use Case Clarity", t: "Pick one specific workflow with measurable inputs and outputs. The companies that win pick one and ship. The ones that lose pick five and stall." });
  } else {
    const top = painSel[0];
    recs.push({ pri: 5, tag: top.tag || "Use Case", t: `Your top pain — "${top.t.replace(/\.$/, "")}" — has a known playbook (${top.tag}). The right first build is the one that pays back inside 90 days, not the most ambitious one.` });
  }
  recs.sort((x, y) => x.pri - y.pri);
  if (recs.length < 3) {
    const filler = [
      { pri: 9, tag: "Cadence", t: "Set a monthly rhythm for AI work — even one half-day a month with the team. Without a rhythm, AI lives in someone's spare time and shows up nowhere." },
      { pri: 9, tag: "Measurement", t: "Pick the metric AI is supposed to move before you pick the tool. If you can't say what number should change, you're shopping, not deploying." },
      { pri: 9, tag: "Embed", t: "If you're hiring outside help, hire embedded operators — not a deck-shop. The work that sticks is built next to your team, not handed over the wall." },
    ];
    for (const f of filler) if (recs.length < 3) recs.push(f);
  }
  return recs.slice(0, 3);
}

function capLowest(cur: string | null, next: string) {
  if (!cur) return next;
  const i = TIERS.findIndex((t) => t.key === cur);
  const j = TIERS.findIndex((t) => t.key === next);
  return i <= j ? cur : next;
}

function resolveTier(answers: Answers, composite: number): Tier {
  let cap: string | null = null;
  if ((answers.owner?.s ?? 99) === 1 && (answers.access?.s ?? 99) <= 3) cap = "found";
  else if ((answers.data?.s ?? 99) === 3 && (answers.adoption?.s ?? 99) <= 4) cap = "found";
  if (answers.pain?.selected?.some((o) => o.unsure)) cap = capLowest(cap, "early");
  if ((answers.owner?.s ?? 99) < 11) cap = capLowest(cap, "ready");

  let tier = TIERS.find((t) => composite >= t.range[0] && composite <= t.range[1]) || TIERS[0];
  if (cap) {
    const capIdx = TIERS.findIndex((t) => t.key === cap);
    const tierIdx = TIERS.findIndex((t) => t.key === tier.key);
    if (tierIdx > capIdx) tier = TIERS[capIdx];
  }
  return tier;
}

function dimColor(score: number) {
  if (score <= 40) return "#C44";
  if (score <= 70) return "#E8823A";
  return "#2D8F4E";
}

function useCountUp(target: number, on: boolean, dur = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, on, dur]);
  return v;
}

export function Assessment() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const total = A_QS.length;

  const composite = useMemo(() => {
    let raw = 0;
    for (const q of A_QS) {
      const a = answers[q.id];
      if (!a) continue;
      raw += (a.s || 0) * q.weight;
    }
    return Math.round((raw / 18) * 100);
  }, [answers]);

  const tier = useMemo(() => resolveTier(answers, composite), [answers, composite]);
  const recs = useMemo(() => buildRecs(answers), [answers]);
  const done = step >= total;
  const ringProg = useCountUp(done ? composite : 0, done, 1400);
  const C = 2 * Math.PI * 100;
  const dash = C * (ringProg / 100);

  const dimScores = A_QS.map((q) => {
    const s = answers[q.id]?.s ?? 0;
    return { dim: q.dim, score: Math.round((s / 18) * 100) };
  });

  function pickSingle(q: Q, opt: Opt) {
    setAnswers((prev) => ({ ...prev, [q.id]: { s: opt.s, t: opt.t } }));
    setTimeout(() => setStep((s) => s + 1), 280);
  }

  function toggleMulti(q: Q, opt: Opt) {
    setAnswers((prev) => {
      const cur = prev[q.id]?.selected || [];
      let next: Opt[];
      if (opt.exclusive) {
        const isOn = cur.some((o) => o.t === opt.t);
        next = isOn ? [] : [opt];
      } else {
        const isOn = cur.some((o) => o.t === opt.t);
        if (isOn) next = cur.filter((o) => o.t !== opt.t);
        else {
          const filtered = cur.filter((o) => !o.exclusive);
          if (filtered.length >= (q.cap || 0)) return prev;
          next = [...filtered, opt];
        }
      }
      const score = Math.min((q.cap || 0) * 6, next.reduce((a, o) => a + (o.s || 0), 0));
      return { ...prev, [q.id]: { selected: next, s: score } };
    });
  }

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailSent(true);
  }

  function restart() {
    setStep(-1);
    setAnswers({});
    setEmail("");
    setEmailSent(false);
  }

  const cur = step >= 0 && step < total ? A_QS[step] : null;
  const curAns = cur ? answers[cur.id] : null;
  const canAdvance = cur?.multi ? (curAns?.selected?.length || 0) > 0 : !!curAns;

  return (
    <section className="section section-cream" id="assessment">
      <div className="wrap">
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow eyebrow-navy" style={{ marginBottom: 18 }}>Free AI readiness check</div>
          <h2 className="bigword">
            AI is a thing.<br />
            <span className="bigword-orange">Where do you actually stand?</span>
          </h2>
          <p style={{ marginTop: 20, fontSize: 17, maxWidth: "58ch", margin: "24px auto 0" }}>
            You've been thinking about it. Reading about it. Wondering if you should be doing more, or if half the noise is hype.
          </p>
        </Reveal>

        <div className="assess-card v2">
          {step === -1 && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div className="eyebrow eyebrow-navy" style={{ marginBottom: 14 }}>The 3-minute diagnostic</div>
              <h3 className="stamp" style={{ fontSize: 44, margin: "0 0 24px", color: "var(--navy)", lineHeight: 0.95 }}>
                SEE WHERE YOUR BUSINESS<br />ACTUALLY STANDS WITH AI.
              </h3>
              <p style={{ margin: "0 auto 32px", maxWidth: "56ch" }}>
                Get an instant read on where you are, what's worth your attention first, and one move you can make this month.
              </p>
              <button className="btn btn-orange btn-lg btn-arrow" onClick={() => setStep(0)}>Take Your Free AI Assessment</button>
              <ul className="assess-intro-bullets">
                <li><span className="check">✓</span>3 minutes</li>
                <li><span className="check">✓</span>Answers right away</li>
                <li><span className="check">✓</span>Personalized plan</li>
              </ul>
            </div>
          )}

          {cur && (
            <>
              <div className="assess-steps">
                {A_QS.map((_, i) => (
                  <div key={i} className={`assess-step-bar ${i < step ? "done" : i === step ? "active" : ""}`} />
                ))}
              </div>
              <div className="assess-q-num">{cur.eyebrow}</div>
              <h3 className="assess-q">{cur.q}</h3>
              <p className="assess-sub">{cur.sub}</p>

              {!cur.multi && (
                <div className="assess-opts">
                  {cur.opts.map((o, i) => (
                    <button key={i} className={`assess-opt ${curAns?.t === o.t ? "sel" : ""}`} onClick={() => pickSingle(cur, o)}>
                      <span className="assess-opt-key">{String.fromCharCode(65 + i)}</span>
                      <span className="assess-opt-text">{o.t}</span>
                    </button>
                  ))}
                </div>
              )}

              {cur.multi && (
                <>
                  <div className="assess-multi-help">
                    Pick up to {cur.cap}.
                    <span className="assess-multi-count">
                      {(curAns?.selected?.length || 0)} / {cur.cap} selected
                    </span>
                  </div>
                  <div className="assess-opts">
                    {cur.opts.map((o, i) => {
                      const on = (curAns?.selected || []).some((s) => s.t === o.t);
                      const disabled = !on && (curAns?.selected?.length || 0) >= (cur.cap || 0) && !o.exclusive;
                      return (
                        <button
                          key={i}
                          className={`assess-opt multi ${on ? "sel" : ""} ${o.unsure ? "unsure" : ""}`}
                          onClick={() => toggleMulti(cur, o)}
                          disabled={disabled}
                          style={disabled ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
                        >
                          <span className={`assess-check ${on ? "on" : ""}`}>{on ? "✓" : ""}</span>
                          <span className="assess-opt-text">
                            {o.t}
                            {o.tag && <span className="assess-opt-tag">{o.tag}</span>}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="assess-nav">
                <button className="assess-back" disabled={step === 0} onClick={() => setStep(step - 1)}>← Previous</button>
                <div className="assess-progress-text">Question {step + 1} of {total}</div>
                {cur.multi && (
                  <button className="btn btn-navy btn-sm btn-arrow" disabled={!canAdvance} onClick={() => setStep(step + 1)}>
                    Continue
                  </button>
                )}
              </div>
            </>
          )}

          {done && (
            <div className="assess-result-v2">
              <div className="ar-top">
                <div className="ar-ring-wrap">
                  <div className="assess-score-ring">
                    <svg width="240" height="240" viewBox="0 0 240 240">
                      <circle cx="120" cy="120" r="100" fill="none" stroke="#E0D5C0" strokeWidth="14" />
                      <circle cx="120" cy="120" r="100" fill="none" stroke={tier.color} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${dash} ${C}`} transform="rotate(-90 120 120)" />
                    </svg>
                    <div className="assess-score-num">
                      <b>{Math.round(ringProg)}</b>
                      <small>COMPOSITE / 100</small>
                    </div>
                  </div>
                </div>
                <div className="ar-tier">
                  <div className="eyebrow eyebrow-navy" style={{ marginBottom: 10 }}>Your tier</div>
                  <div className="assess-tier" style={{ color: tier.color === "var(--navy)" ? "var(--navy)" : "var(--orange-deep)" }}>
                    {tier.name}.
                  </div>
                  <div className="assess-tier-sub">{tier.headline}</div>
                </div>
              </div>

              <div className="ar-email-card" id="ar-email">
                {!emailSent ? (
                  <>
                    <div className="ar-email-left">
                      <div className="ar-section-label" style={{ color: "var(--orange-deep)", marginBottom: 8 }}>Optional · unlock the full report</div>
                      <h4 className="ar-email-h">Want the full PDF benchmark and a personalized 90-day roadmap?</h4>
                      <p className="ar-email-p">Drop your email — we'll send it within 30 seconds. Your headline score, heat map, and recommendations stay on this page either way.</p>
                    </div>
                    <form onSubmit={submitEmail} className="ar-email-form">
                      <input
                        type="email"
                        placeholder="you@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="assess-email-input"
                        required
                      />
                      <button type="submit" className="btn btn-orange" disabled={!email.trim()}>Send me the PDF</button>
                    </form>
                  </>
                ) : (
                  <div className="ar-email-success">
                    <div className="ar-email-success-check">✓</div>
                    <div>
                      <div className="ar-email-success-h">PDF benchmark + 90-day roadmap heading your way.</div>
                      <div className="ar-email-success-p">Sending to <b>{email}</b> within 30 seconds. Check spam if you don't see it.</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="ar-divider" />

              <div className="ar-section">
                <div className="ar-section-label">Heat map · six dimensions</div>
                <div className="ar-heatmap">
                  {dimScores.map((d, i) => (
                    <div className="ar-heat-row" key={i}>
                      <div className="ar-heat-name">{d.dim}</div>
                      <div className="ar-heat-bar-wrap">
                        <div className="ar-heat-bar" style={{ width: `${d.score}%`, background: dimColor(d.score) }} />
                      </div>
                      <div className="ar-heat-num" style={{ color: dimColor(d.score) }}>{d.score}</div>
                    </div>
                  ))}
                </div>
                <div className="ar-heat-legend">
                  <span><i style={{ background: "#C44" }} />0–40 Red</span>
                  <span><i style={{ background: "#E8823A" }} />41–70 Amber</span>
                  <span><i style={{ background: "#2D8F4E" }} />71–100 Green</span>
                </div>
              </div>

              <div className="ar-divider" />

              <div className="ar-section">
                <div className="ar-grid-2">
                  <div>
                    <div className="ar-section-label">What we observed</div>
                    <p className="ar-body">{tier.observed}</p>
                  </div>
                  <div>
                    <div className="ar-section-label">Industry context</div>
                    <p className="ar-body">{tier.industry}</p>
                  </div>
                </div>
              </div>

              <div className="ar-divider" />

              <div className="ar-section">
                <div className="ar-section-label">Top 3 recommendations</div>
                <ol className="ar-recs">
                  {recs.map((r, i) => (
                    <li key={i}>
                      <div className="ar-rec-num">{String(i + 1).padStart(2, "0")}</div>
                      <div className="ar-rec-body">
                        <div className="ar-rec-tag">{r.tag}</div>
                        <p>{r.t}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="ar-divider" />

              <div className="ar-section ar-next">
                <div className="ar-section-label">Recommended next step</div>
                <div className="ar-next-eng">
                  <div className="ar-next-eng-tag">{tier.eng} engagement</div>
                  <p className="ar-body">{tier.next}</p>
                </div>
                <div className="assess-cta-row">
                  <CalendlyButton className="btn btn-orange btn-arrow">{tier.cta}</CalendlyButton>
                  {!emailSent && <a href="#ar-email" className="btn btn-navy">Just send me the PDF</a>}
                  <button className="assess-back" onClick={restart}>↻ Restart diagnostic</button>
                </div>
              </div>

              <div className="ar-foot">
                Benchmarks synthesized from Cisco AI Readiness Index 2024 (n=7,985), Accenture Art of AI Maturity (n=1,615), McKinsey State of AI 2025 (n=1,993), MIT NANDA State of AI in Business 2025, and RSM Middle Market AI Survey 2025 (n=966) — calibrated to the $10–100M operator segment.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
