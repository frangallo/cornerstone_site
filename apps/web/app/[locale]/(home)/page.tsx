import type { Metadata } from "next";
import { createMetadata } from "@repo/seo/metadata";
import { JsonLd } from "@repo/seo/json-ld";
import { Hero } from "./components/hero";
import { Promise as PromiseSection } from "./components/promise";
import { Operators } from "./components/operators";
import { Rhythm } from "./components/rhythm";
import { Assessment } from "./components/assessment";
import { Journey } from "./components/journey";
import { Calculator } from "./components/calculator";
import { FAQ } from "./components/faq";
import { FinalCTA } from "./components/final-cta";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async (_props: HomeProps): Promise<Metadata> => {
  return createMetadata({
    title: "Cornerstone AI - From 0 to 1, embedded.",
    description:
      "AI feels big. The first step doesn't have to be. Cornerstone AI helps companies go from 0 to 1. Strategy, implementation, and training, all working together.",
    image: "/og-image.png",
    alternates: { canonical: "https://cornerstoneai.co" },
  });
};

const Home = async (_props: HomeProps) => {
  return (
    <>
      <JsonLd
        code={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Cornerstone AI",
          description:
            "Fractional AI leadership for mid-market companies. Strategy, implementation, and training.",
          url: "https://cornerstoneai.co",
          areaServed: "US",
          priceRange: "$5,000 - $15,000/month",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Austin",
            addressRegion: "TX",
            addressCountry: "US",
          },
          founder: { "@type": "Person", name: "Francesco Gallo" },
        } as any}
      />
      <main>
        <Hero />
        <PromiseSection />
        <Operators />
        <Rhythm />
        <Assessment />
        <Journey />
        <Calculator />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
};

export default Home;
