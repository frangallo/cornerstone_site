"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./reveal";

const WEEKS = [
  { num: "Week One", title: "Align", copy: "CEO check-in. Set the priorities for the month.", tasks: [
    { day: "Mon", t: "CEO working session" },
    { day: "Tue", t: "Review last month's shipped systems" },
    { day: "Wed", t: "Refresh 30-day roadmap" },
    { day: "Fri", t: "Align dept leads" },
  ] },
  { num: "Week Two", title: "Discover", copy: "Sit with the people doing the work. Find the highest-leverage builds.", tasks: [
    { day: "Mon", t: "Shadow the team" },
    { day: "Tue", t: "Map the workflows" },
    { day: "Wed", t: "Spot the bottlenecks" },
    { day: "Thu", t: "Shortlist builds" },
  ] },
  { num: "Week Three", title: "Build", copy: "Take the builds from concept to live in your stack.", tasks: [
    { day: "Mon", t: "Design with the team" },
    { day: "Tue", t: "Wire into your stack" },
    { day: "Wed", t: "Validate with real users" },
    { day: "Fri", t: "Deploy and monitor" },
  ] },
  { num: "Week Four", title: "Train + Report", copy: "Hand off the systems. Show what shipped.", tasks: [
    { day: "Mon", t: "Train the team to run it" },
    { day: "Tue", t: "Document the playbook" },
    { day: "Wed", t: "Pull the numbers" },
    { day: "Thu", t: "CEO readout" },
  ] },
];

export function Rhythm() {
  const [week, setWeek] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setWeek((w) => (w + 1) % WEEKS.length), 3500);
    return () => clearInterval(id);
  }, [playing]);

  const cur = WEEKS[week];

  return (
    <section className="section section-cream">
      <div className="wrap">
        <Reveal style={{ textAlign: "center", marginBottom: 24 }}>
          <div className="eyebrow eyebrow-navy" style={{ marginBottom: 18 }}>The monthly rhythm</div>
          <h2 className="bigword">What every month <span className="bigword-orange">looks like.</span></h2>
        </Reveal>
        <div className="rhythm-scrubber">
          {WEEKS.map((w, i) => (
            <button
              key={i}
              className={`rhythm-mark ${i === week ? "active" : i < week ? "past" : ""}`}
              onClick={() => { setWeek(i); setPlaying(false); }}
            >
              <span className="num">0{i + 1}</span>{w.title}
            </button>
          ))}
        </div>
        <div className="rhythm-card">
          <div>
            <div className="rhythm-week-num">{cur.num} · 0{week + 1} / 04</div>
            <div className="rhythm-week-title">{cur.title}.</div>
            <div className="rhythm-week-copy">{cur.copy}</div>
          </div>
          <div className="rhythm-tasks">
            {cur.tasks.map((t, i) => (
              <div
                key={`${week}-${i}`}
                className="rhythm-task"
                style={{ animation: `rhythmSlideIn .4s ease ${i * 60}ms both` }}
              >
                <div className="rhythm-task-check">✓</div>
                <div>{t.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
