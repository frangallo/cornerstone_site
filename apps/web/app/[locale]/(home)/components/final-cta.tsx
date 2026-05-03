import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="final-cta" id="cta">
      <div className="bg-stars" style={{ opacity: 0.25 }} />
      <div className="wrap-narrow" style={{ position: "relative" }}>
        <div className="eyebrow eyebrow-navy" style={{ marginBottom: 24 }}>Start here</div>
        <div className="final-cta-title">
          Ready to build<br />
          something <span className="accent">real?</span>
        </div>
        <div className="final-cta-script">— Let's talk.</div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "stretch",
            maxWidth: 420,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CalendlyButton className="btn btn-navy btn-lg btn-arrow">Book a free call</CalendlyButton>
          <Link href="#assessment" className="btn btn-cream btn-lg">Take Your Free AI Assessment</Link>
        </div>
      </div>
    </section>
  );
}
