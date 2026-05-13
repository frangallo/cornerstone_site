import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";
import { ArrowRight } from "./icons";

export function FinalCTA() {
  return (
    <section className="section dark" id="contact">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Start here</span>
        <h2
          className="h1"
          style={{ marginTop: 24, fontSize: "clamp(60px, 10vw, 160px)", maxWidth: "16ch", marginInline: "auto" }}
        >
          Ready to<br />
          <span className="acc">build?</span>
        </h2>
        <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <CalendlyButton className="btn btn-orange" >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "2px 0" }}>
              Book a free call <ArrowRight />
            </span>
          </CalendlyButton>
          <Link
            href="#assessment"
            className="btn btn-ghost"
            style={{ padding: "16px 26px", fontSize: 15 }}
          >
            Take the assessment <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
