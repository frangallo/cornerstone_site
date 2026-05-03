import { Reveal } from "./reveal";

const ICON = {
  strategize: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="20" r="9" stroke="currentColor" strokeWidth="3" />
      <path d="M10 48 C10 36, 18 32, 28 32 C38 32, 46 36, 46 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  build: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M10 14 L28 6 L46 14 L46 42 L28 50 L10 42 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M10 14 L28 22 L46 14" stroke="currentColor" strokeWidth="3" />
      <path d="M28 22 L28 50" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  train: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M14 28 L42 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 18 L42 28 L32 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 12 L14 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
};

const PROMISES = [
  { n: ".01", title: "We Strategize", body: "We sit down with you to figure out where AI actually helps your business.", icon: ICON.strategize },
  { n: ".02", title: "We Build", body: "We design what to build, how it fits together, and the path to get there.", icon: ICON.build },
  { n: ".03", title: "We Train", body: "Your team learns to run it, build on it, and ship the next thing without us.", icon: ICON.train },
];

export function Promise() {
  return (
    <section className="section section-navy" id="promise" style={{ position: "relative" }}>
      <div className="bg-stars bg-stars-cream" />
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal className="promise-head">
          <div className="eyebrow" style={{ marginBottom: 18 }}>The Cornerstone Promise</div>
          <h2 className="bigword" style={{ color: "var(--cream)" }}>
            Three things<br />
            <span className="bigword-orange">we always do.</span>
          </h2>
        </Reveal>
        <div className="promise-grid">
          {PROMISES.map((p) => (
            <div key={p.n} className="promise-card">
              <div className="promise-num">{p.n}</div>
              <div className="promise-badge">{p.icon}</div>
              <div className="promise-title">{p.title}</div>
              <p className="promise-copy">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
