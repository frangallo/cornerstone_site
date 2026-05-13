import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";
import { ArrowRight } from "./icons";

export function Hero() {
  return (
    <section
      className="section"
      style={{
        paddingTop: "calc(var(--section-py) + 40px)",
        paddingBottom: "calc(var(--section-py) - 20px)",
        borderTop: 0,
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          className="h1 rise d1"
          style={{ maxWidth: "18ch" }}
        >
          The AI partner for businesses <span className="acc">drowning in manual work</span>
        </h1>

        <p
          className="lede rise d2"
          style={{
            marginTop: 28,
            color: "var(--mute)",
            maxWidth: "62ch",
          }}
        >
          Cornerstone takes the manual work running your business and makes it awesome.
        </p>

        <div
          className="rise d3 hero-ctas"
          style={{
            marginTop: 36,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <CalendlyButton
            className="btn btn-orange"
            style={{
              padding: "20px 32px",
              fontSize: 16,
              gap: 12,
              minWidth: 240,
              justifyContent: "center",
            }}
          >
            Book a call <ArrowRight size={16} />
          </CalendlyButton>
          <Link
            href="#assessment"
            className="btn btn-ghost"
            style={{
              padding: "20px 32px",
              fontSize: 16,
              gap: 12,
              minWidth: 240,
              justifyContent: "center",
            }}
          >
            Free AI assessment <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
