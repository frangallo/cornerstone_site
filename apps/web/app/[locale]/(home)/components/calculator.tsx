"use client";

import { CalendlyButton } from "@/components/calendly-button";
import { useState } from "react";
import { Reveal } from "./reveal";

const fmt$ = (n: number) => {
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + Math.round(n / 1e3) + "K";
  return "$" + Math.round(n);
};

function Slider({
  label, val, setVal, min, max, step, format,
}: {
  label: string; val: number; setVal: (v: number) => void;
  min: number; max: number; step: number; format: (v: number) => string;
}) {
  return (
    <div className="calc-slider-row">
      <div className="calc-slider-head">
        <div className="calc-slider-lbl">{label}</div>
        <div className="calc-slider-val">{format(val)}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        className="calc-slider-input"
        onChange={(e) => setVal(+e.target.value)}
      />
    </div>
  );
}

export function Calculator() {
  const [team, setTeam] = useState(80);
  const [rate, setRate] = useState(85);
  const [hours, setHours] = useState(6);
  const [months, setMonths] = useState(6);
  const monthly = hours * team * 4.33 * rate;
  const total = monthly * months;
  const fee = 18000 * months;
  const roi = total / fee;

  return (
    <section className="section section-paper" id="roi">
      <div className="wrap">
        <Reveal className="calc-grid">
          <div>
            <div className="eyebrow eyebrow-navy" style={{ marginBottom: 18 }}>Run the numbers</div>
            <h2 className="bigword">What it pays<br /><span className="bigword-orange">back, exactly.</span></h2>
            <p style={{ margin: "24px 0 36px", fontSize: 17, maxWidth: "42ch" }}>
              Drag the sliders. Every engagement ships automations that return hours — here's what those hours are worth.
            </p>
            <Slider label="Team size" val={team} setVal={setTeam} min={10} max={500} step={10} format={(v) => `${v} people`} />
            <Slider label="Avg fully-loaded rate" val={rate} setVal={setRate} min={30} max={200} step={5} format={(v) => `$${v}/hr`} />
            <Slider label="Hours saved / person / wk" val={hours} setVal={setHours} min={1} max={15} step={1} format={(v) => `${v} hrs`} />
            <Slider label="Engagement length" val={months} setVal={setMonths} min={3} max={12} step={1} format={(v) => `${v} mo`} />
          </div>
          <div className="calc-result">
            <div className="calc-result-label">Estimated value returned</div>
            <div className="calc-result-val">{fmt$(total)}</div>
            <div className="calc-result-per">over {months} months</div>
            <div className="calc-breakdown">
              <div><div className="calc-bd-label">Monthly value</div><div className="calc-bd-val">{fmt$(monthly)}</div></div>
              <div><div className="calc-bd-label">ROI multiple</div><div className="calc-bd-val">{roi.toFixed(1)}x</div></div>
            </div>
            <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <CalendlyButton className="btn btn-navy">Book a call</CalendlyButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
