"use client";

import { CalendlyButton } from "@/components/calendly-button";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRight, CheckIcon } from "./icons";
import {
  QUESTIONS,
  TIERS,
  DIMENSION_LABELS,
  DIMENSION_ORDER,
  buildRecommendations,
  calculateComposite,
  calculateSubScores,
  dimensionColor,
  resolveTier,
  type Answers,
} from "./assessment-scoring";

function useCountUp(target: number, on: boolean, dur = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) {
      setV(0);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
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
  const [step, setStep] = useState(0); // 0..5 question index, 6 = result
  const [answers, setAnswers] = useState<Answers>({});
  const total = QUESTIONS.length;
  const done = step >= total;
  const cur = step < total ? QUESTIONS[step] : null;
  const answeredCount = Object.values(answers).filter((v) =>
    Array.isArray(v) ? v.length > 0 : !!v
  ).length;
  const progressPct = Math.min(100, (answeredCount / total) * 100);

  const composite = useMemo(() => calculateComposite(answers), [answers]);
  const subScores = useMemo(() => calculateSubScores(answers), [answers]);
  const tierKey = useMemo(() => resolveTier(answers, composite), [answers, composite]);
  const tier = TIERS[tierKey];
  const recs = useMemo(() => buildRecommendations(answers, subScores), [answers, subScores]);

  const ringTarget = done ? composite : 0;
  const ringValue = useCountUp(ringTarget, done, 900);
  const RING_R = 100;
  const RING_C = 2 * Math.PI * RING_R;
  const ringDash = RING_C * (Math.round(ringValue) / 100);

  function pickSingle(qid: keyof Answers, optKey: string) {
    setAnswers((prev) => ({ ...prev, [qid]: optKey }));
    setTimeout(() => setStep((s) => s + 1), 220);
  }

  function toggleMulti(qid: "q4", optKey: string) {
    setAnswers((prev) => {
      const cur = (prev.q4 ?? []) as string[];
      const isUnsure = optKey === "unsure";
      const alreadyOn = cur.includes(optKey);
      let next: string[];
      if (isUnsure) {
        next = alreadyOn ? [] : ["unsure"];
      } else {
        if (alreadyOn) {
          next = cur.filter((k) => k !== optKey);
        } else {
          const filtered = cur.filter((k) => k !== "unsure");
          if (filtered.length >= 3) return prev;
          next = [...filtered, optKey];
        }
      }
      return { ...prev, q4: next };
    });
  }

  function reset() {
    setStep(0);
    setAnswers({});
  }

  const curAnswerSingle = cur && !cur.multi ? (answers[cur.id] as string | undefined) : undefined;
  const curAnswerMulti = cur && cur.multi ? ((answers.q4 ?? []) as string[]) : [];
  const canAdvance = cur?.multi ? curAnswerMulti.length > 0 : !!curAnswerSingle;

  return (
    <section className="section" id="assessment" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div
          className="grid assessment-grid"
          style={{ gridTemplateColumns: "5fr 7fr", gap: 56, alignItems: "start" }}
        >
          {/* Left: marketing pitch */}
          <div className="assessment-pitch" style={{ position: "sticky", top: 100 }}>
            <span className="tag">The 3-minute diagnostic</span>
            <h2 className="h2" style={{ marginTop: 24, maxWidth: "13ch" }}>
              Everyone's talking AI. Where do you{" "}
              <span className="acc">actually stand?</span>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Where you are. What to fix first. One move to make this month.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
              {["3 minutes, no email gate", "Answers right away", "Personalized first move"].map((b) => (
                <li
                  key={b}
                  className="mono"
                  style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12.5, color: "var(--ink)" }}
                >
                  <span style={{ color: "var(--orange)" }}><CheckIcon /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: live diagnostic */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                padding: "18px 28px",
                borderBottom: "1px solid var(--rule)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                Cornerstone AI-Readiness Diagnostic
              </span>
              <span className="mono tnum" style={{ fontSize: 11, color: "var(--mute)" }}>
                {done ? "Complete" : `Question ${step + 1} of ${total}`}
              </span>
            </div>

            <div style={{ height: 3, background: "var(--rule)", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "0 auto 0 0",
                  width: progressPct + "%",
                  background: "var(--orange)",
                  transition: "width .3s ease",
                }}
              />
            </div>

            {/* Quiz body OR result */}
            {cur && !done && (
              <div style={{ padding: 32, minHeight: 380 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Q{cur.number} / {total}
                </div>
                <h3 className="h3" style={{ marginTop: 10, fontSize: 22, maxWidth: "32ch" }}>{cur.prompt}</h3>
                {cur.helper && (
                  <p style={{ marginTop: 10, fontSize: 14, color: "var(--mute)", lineHeight: 1.5, maxWidth: "60ch" }}>
                    {cur.helper}
                  </p>
                )}

                {!cur.multi ? (
                  <div className="grid quiz-options" style={{ gridTemplateColumns: "1fr", gap: 8, marginTop: 24 }}>
                    {cur.options.map((opt) => {
                      const selected = curAnswerSingle === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => pickSingle(cur.id, opt.key)}
                          style={{
                            padding: "14px 18px",
                            textAlign: "left",
                            border: "1px solid " + (selected ? "var(--orange)" : "var(--rule-strong)"),
                            borderRadius: 10,
                            background: selected ? "var(--orange)" : "#fff",
                            color: selected ? "#fff" : "var(--ink)",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            fontSize: 14.5,
                            fontWeight: 500,
                            lineHeight: 1.45,
                            transition: "all .15s ease",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="mono" style={{ marginTop: 24, fontSize: 11, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
                      <span>Pick up to {cur.cap}</span>
                      <span>{curAnswerMulti.length} / {cur.cap} selected</span>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 8, marginTop: 12 }}>
                      {cur.options.map((opt) => {
                        const selected = curAnswerMulti.includes(opt.key);
                        const cap = cur.cap ?? 3;
                        const disabled =
                          !selected &&
                          !opt.unsure &&
                          curAnswerMulti.filter((k) => k !== "unsure").length >= cap;
                        return (
                          <button
                            key={opt.key}
                            onClick={() => toggleMulti("q4", opt.key)}
                            disabled={disabled}
                            style={{
                              padding: "13px 16px",
                              textAlign: "left",
                              border: "1px solid " + (selected ? "var(--orange)" : "var(--rule-strong)"),
                              borderRadius: 10,
                              background: selected ? "var(--orange)" : "#fff",
                              color: selected ? "#fff" : "var(--ink)",
                              cursor: disabled ? "not-allowed" : "pointer",
                              opacity: disabled ? 0.4 : 1,
                              fontFamily: "inherit",
                              fontSize: 14,
                              fontWeight: 500,
                              lineHeight: 1.45,
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              transition: "all .15s ease",
                            }}
                          >
                            <span
                              style={{
                                width: 18,
                                height: 18,
                                flexShrink: 0,
                                borderRadius: 4,
                                border: "1.5px solid " + (selected ? "#fff" : "var(--rule-strong)"),
                                background: selected ? "#fff" : "transparent",
                                color: "var(--orange)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              {selected ? <CheckIcon size={11} /> : null}
                            </span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="flex between" style={{ marginTop: 28, alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    style={{
                      background: "transparent",
                      border: 0,
                      color: step === 0 ? "var(--mute)" : "var(--ink)",
                      cursor: step === 0 ? "default" : "pointer",
                      fontSize: 13,
                      padding: 4,
                    }}
                  >
                    ← Back
                  </button>
                  {cur.multi ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      disabled={!canAdvance}
                      className="btn"
                      style={{
                        padding: "10px 18px",
                        fontSize: 13,
                        opacity: canAdvance ? 1 : 0.4,
                        cursor: canAdvance ? "pointer" : "not-allowed",
                      }}
                    >
                      Continue <ArrowRight size={12} />
                    </button>
                  ) : (
                    <span className="mono" style={{ fontSize: 11, color: "var(--mute)" }}>
                      Auto-advances on select
                    </span>
                  )}
                </div>
              </div>
            )}

            {done && (
              <ResultPanel
                composite={Math.round(ringValue)}
                ringDash={ringDash}
                ringC={RING_C}
                tierKey={tierKey}
                tier={tier}
                subScores={subScores}
                recs={recs}
                onRetake={reset}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .assessment-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .assessment-pitch { position: static !important; top: auto !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Result panel ───────────────────────────────────────────────────────

function ResultPanel({
  composite,
  ringDash,
  ringC,
  tierKey,
  tier,
  subScores,
  recs,
  onRetake,
}: {
  composite: number;
  ringDash: number;
  ringC: number;
  tierKey: ReturnType<typeof resolveTier>;
  tier: typeof TIERS[keyof typeof TIERS];
  subScores: ReturnType<typeof calculateSubScores>;
  recs: ReturnType<typeof buildRecommendations>;
  onRetake: () => void;
}) {
  const isDecoration = tierKey === "decoration";
  return (
    <div style={{ padding: 32 }}>
      {/* Score + tier */}
      <div className="result-top" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center" }}>
        <div style={{ position: "relative", width: 200, height: 200 }}>
          <svg width="200" height="200" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="100" fill="none" stroke="var(--rule-strong)" strokeWidth="14" />
            <circle
              cx="120"
              cy="120"
              r="100"
              fill="none"
              stroke={tier.ringColor}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${ringDash} ${ringC}`}
              transform="rotate(-90 120 120)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <div
              className="tnum"
              style={{
                fontFamily: "var(--font-display), Archivo, sans-serif",
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              {composite}
            </div>
            <div
              className="mono"
              style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              Composite / 100
            </div>
          </div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 11, color: "var(--orange)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Your tier
          </div>
          <h3
            className="h2"
            style={{
              marginTop: 8,
              fontSize: "clamp(28px, 3vw, 40px)",
              color: "var(--ink)",
            }}
          >
            {tier.name}.
          </h3>
          <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.55, color: "var(--ink)" }}>
            {tier.headline}
          </p>
        </div>
      </div>

      <hr className="rule" style={{ margin: "32px 0" }} />

      {/* Heat map */}
      <div>
        <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Heat map · six dimensions
        </div>
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          {DIMENSION_ORDER.map((dim) => {
            const score = subScores[dim];
            const color = dimensionColor(score);
            return (
              <div
                key={dim}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr 36px",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 13, color: "var(--ink)" }}>{DIMENSION_LABELS[dim]}</div>
                <div style={{ height: 8, borderRadius: 999, background: "var(--rule)", overflow: "hidden" }}>
                  <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 999, transition: "width .8s ease" }} />
                </div>
                <div className="mono tnum" style={{ fontSize: 13, fontWeight: 600, color, textAlign: "right" }}>
                  {score}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="mono"
          style={{
            marginTop: 14,
            fontSize: 10.5,
            color: "var(--mute)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#C44" }} />
            0–40 Red
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#E8631C" }} />
            41–70 Amber
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#2D8F4E" }} />
            71–100 Green
          </span>
        </div>
      </div>

      <hr className="rule" style={{ margin: "32px 0" }} />

      {/* Observed + industry */}
      <div className="grid result-context" style={{ gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            What we observed
          </div>
          <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)" }}>
            {tier.observed}
          </p>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Industry context
          </div>
          <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)" }}>
            {tier.industry}
          </p>
        </div>
      </div>

      <hr className="rule" style={{ margin: "32px 0" }} />

      {/* Top 3 recs */}
      <div>
        <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Top 3 recommendations
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
          {recs.map((r, i) => (
            <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16 }}>
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--orange)",
                  letterSpacing: "0.14em",
                  paddingTop: 4,
                  minWidth: 24,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--orange-deep)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {r.tag}
                </div>
                <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)" }}>{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <hr className="rule" style={{ margin: "32px 0" }} />

      {/* Engagement routing */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--rule-strong)",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <div
          className="mono"
          style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Recommended next step
        </div>
        <div
          className="mono"
          style={{ marginTop: 8, fontSize: 12, color: "var(--orange-deep)", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          {tier.engagement} engagement
        </div>
        <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: "var(--ink)" }}>{tier.next}</p>

        <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <CalendlyButton className={isDecoration ? "btn btn-orange" : "btn"}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              {tier.primaryCta} <ArrowRight />
            </span>
          </CalendlyButton>
          <a href="#follow-up" className="btn btn-ghost">
            Get a personal follow-up <ArrowRight />
          </a>
          <button
            onClick={onRetake}
            style={{
              background: "transparent",
              border: 0,
              color: "var(--mute)",
              cursor: "pointer",
              fontSize: 13,
              padding: 8,
            }}
          >
            ↻ Retake
          </button>
        </div>
      </div>

      {/* Email capture (stub) */}
      <FollowUpForm tierKey={tierKey} composite={composite} />

      <p
        className="mono"
        style={{
          marginTop: 28,
          fontSize: 10.5,
          color: "var(--mute)",
          letterSpacing: "0.06em",
          lineHeight: 1.6,
        }}
      >
        Benchmarks synthesized from Cisco AI Readiness Index, Accenture Art of AI Maturity, McKinsey State of AI 2025, MIT NANDA State of AI in Business 2025, and RSM Middle Market AI Survey 2025. Calibrated to the $10M to $100M operator segment.
      </p>

      <style>{`
        @media (max-width: 720px) {
          .result-top { grid-template-columns: 1fr !important; justify-items: center; text-align: center; }
          .result-context { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Email capture stub ────────────────────────────────────────────────

function FollowUpForm({ tierKey, composite }: { tierKey: string; composite: number }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    // TODO: POST to /api/assessment/submit when DB + Resend are wired.
    // For now, capture locally and show confirmation.
    // Payload would be: { email, firstName, company, tier: tierKey, composite, answers, subScores, utm, referrer }
    void tierKey;
    void composite;
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 350);
  }

  return (
    <div
      id="follow-up"
      style={{
        marginTop: 32,
        padding: 28,
        background: "var(--ink)",
        color: "var(--paper)",
        borderRadius: 14,
      }}
    >
      {!submitted ? (
        <>
          <div
            className="mono"
            style={{ fontSize: 11, color: "var(--orange)", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Optional · personal follow-up
          </div>
          <h4
            style={{
              margin: "10px 0 8px",
              fontFamily: "var(--font-display), Archivo, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "-0.015em",
              color: "var(--paper)",
            }}
          >
            Want a personal follow-up?
          </h4>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "rgba(245, 241, 232, 0.8)" }}>
            Drop your email and Francesco will reach out within 24 hours with a specific take on your results and what to do next. No drip sequence, no PDF, no automation. Just a real human response to your real situation.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ marginTop: 20, display: "grid", gap: 10 }}
          >
            <div className="grid follow-up-row" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={inputStyle}
              />
            </div>
            <input
              type="email"
              placeholder="you@yourcompany.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={!email.trim() || submitting}
              className="btn btn-orange"
              style={{
                marginTop: 4,
                justifyContent: "center",
                opacity: email.trim() ? 1 : 0.5,
                cursor: email.trim() && !submitting ? "pointer" : "not-allowed",
              }}
            >
              {submitting ? "Sending…" : "Send it over"}
            </button>
          </form>
        </>
      ) : (
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "var(--orange)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon size={14} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display), Archivo, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--paper)",
              }}
            >
              Got it. Francesco will personally follow up within 24 hours.
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "rgba(245, 241, 232, 0.7)" }}>
              He responds personally to every assessment from this batch. No automation, no drip, no PDF. Just a real take on your situation.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .follow-up-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: "inherit",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  borderRadius: 10,
  color: "var(--paper)",
  outline: "none",
};
