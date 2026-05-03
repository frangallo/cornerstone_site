const STATS = [
  { num: "81%", lbl: "of leaders know AI can help", src: "BCG · 2025" },
  { num: "88%", lbl: "want help getting started", src: "McKinsey · 2025" },
  { num: "45%", lbl: "cite lack of expertise as #1 barrier", src: "Gartner · 2025" },
  { num: "27%", lbl: "have actually done something", src: "IBM · 2025" },
];

export function Marquee() {
  return (
    <div className="stats-band">
      <div className="wrap">
        <div className="stats-band-grid">
          {STATS.map((s, i) => (
            <div className="stats-band-item" key={i}>
              <div className="stats-band-num">{s.num}</div>
              <div className="stats-band-lbl">{s.lbl}</div>
              <div className="stats-band-src">{s.src}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
