"use client";

import { useState } from "react";
import { fmtCurrency } from "./icons";

function Slider({
  label,
  unit,
  value,
  setValue,
  min,
  max,
  step = 1,
  prefix = "",
}: {
  label: string;
  unit: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
      <div className="flex between" style={{ alignItems: "baseline", marginBottom: 10 }}>
        <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--paper)" }}>{label}</span>
        <span className="mono tnum" style={{ fontSize: 14, fontWeight: 600, color: "var(--paper)" }}>
          {prefix}
          {value}
          <span style={{ color: "rgba(245,241,232,0.6)", marginLeft: 4 }}>{unit}</span>
        </span>
      </div>
      <div style={{ position: "relative", height: 22, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.18)" }} />
        <div style={{ position: "absolute", left: 0, height: 2, background: "var(--orange)", width: pct + "%" }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          className="cs-slider"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            appearance: "none",
            background: "transparent",
            outline: "none",
            margin: 0,
          }}
        />
      </div>
    </div>
  );
}

function ROIStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div
        className="mono"
        style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em", textTransform: "uppercase" }}
      >
        {label}
      </div>
      <div
        className="tnum"
        style={{
          fontFamily: "var(--font-display), Archivo, sans-serif",
          fontSize: 30,
          fontWeight: 700,
          marginTop: 6,
          color: accent ? "var(--orange)" : "var(--paper)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function Calculator() {
  const [team, setTeam] = useState(80);
  const [rate, setRate] = useState(85);
  const [hrs, setHrs] = useState(6);
  const [months, setMonths] = useState(6);

  const weekly = team * hrs * rate;
  const monthly = weekly * 4.33;
  const total = monthly * months;
  const cornerstoneCost = months * 30000;
  const roi = total / cornerstoneCost;

  return (
    <section className="section dark" id="roi">
      <div className="wrap">
        <div className="roi-head" style={{ marginBottom: 48 }}>
          <span className="eyebrow">Run the numbers</span>
          <h2 className="h2" style={{ marginTop: 24, maxWidth: "14ch" }}>
            What it pays back, <span className="acc">exactly.</span>
          </h2>
        </div>

        <div
          className="grid roi-grid"
          style={{ gridTemplateColumns: "5fr 7fr", gap: 32, alignItems: "stretch" }}
        >
          <div className="card" style={{ padding: 32 }}>
            <Slider label="Team size" unit="people" value={team} setValue={setTeam} min={20} max={500} step={10} />
            <Slider label="Avg fully-loaded rate" unit="/hr" value={rate} setValue={setRate} min={40} max={250} step={5} prefix="$" />
            <Slider label="Hours saved / person / wk" unit="hrs" value={hrs} setValue={setHrs} min={1} max={20} step={1} />
            <Slider label="Engagement length" unit="mo" value={months} setValue={setMonths} min={1} max={24} step={1} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div
              className="mono"
              style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Estimated value returned
            </div>
            <div
              className="tnum"
              style={{
                fontFamily: "var(--font-display), Archivo, sans-serif",
                fontSize: "clamp(80px, 11vw, 168px)",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                marginTop: 8,
              }}
            >
              {fmtCurrency(total)}
            </div>
            <div style={{ fontSize: 16, color: "rgba(245,241,232,0.8)", marginTop: 8 }}>
              over {months} {months === 1 ? "month" : "months"}
            </div>

            <div
              className="roi-stats"
              style={{
                marginTop: 40,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
                paddingTop: 28,
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <ROIStat label="Monthly value" value={fmtCurrency(monthly)} />
              <ROIStat label="Cornerstone investment" value={fmtCurrency(cornerstoneCost)} />
              <ROIStat label="ROI multiple" value={roi.toFixed(1) + "x"} accent />
            </div>
            <div
              className="mono"
              style={{ marginTop: 24, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}
            >
              Modeled on Build-tier baseline ($30K/mo). Real ROI varies by workflow mix · numbers are illustrative.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .roi-grid { grid-template-columns: 1fr !important; }
          .roi-stats { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
