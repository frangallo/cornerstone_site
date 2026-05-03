import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero hero-cliff">
      <div className="bg-stars hero-stars" />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-cliff-grid">
          <div className="hero-cliff-left">
            <h1 className="hero-title hero-cliff-title">
              <span className="hero-cliff-line-1">AI feels</span>
              <span className="hero-cliff-line-2">
                <span className="word-orange">big</span>
                <span className="hero-cliff-dot">.</span>
              </span>
              <span className="hero-cliff-line-3">
                The first step doesn't<br />have to be.
              </span>
            </h1>
          </div>
          <div className="hero-cliff-right">
            <p className="hero-cliff-sub">
              Your business runs on manual work. You know AI is a thing. You just don't have time to figure out where to start. We help you get AI working where it matters.
            </p>
            <div className="hero-ctas">
              <CalendlyButton className="btn btn-orange btn-lg btn-arrow">
                Book a strategy call
              </CalendlyButton>
              <Link href="#assessment" className="btn btn-cream btn-lg">
                Take Your Free AI Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
