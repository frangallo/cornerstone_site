import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";
import { Button } from "@repo/design-system/components/ui/button";
import { Monitor, User, AlertCircle, XCircle, Clock, Search, Wrench, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";
import { CountUp } from "./components/count-up";
import { TechnologyTabs } from "./components/technology-tabs";
import { FAQAccordion } from "./components/faq-accordion";
import { JsonLd } from "@repo/seo/json-ld";

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata({
    title: "Cornerstone AI - AI Strategy & Implementation",
    description: "AI feels big. The first step doesn't have to be. Cornerstone AI helps companies go from 0 to 1. Strategy, implementation, and training, all working together.",
    image: "/opengraph-image.png",
    alternates: {
      canonical: "https://cornerstoneai.co",
    },
  });
};

const weekIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Clock, Search, Wrench, CheckCircle,
};

function WeekIcon({ name, color }: { name: string; color: string }) {
  const Icon = weekIcons[name];
  if (!Icon) return null;
  return <Icon className="h-[18px] w-[18px]" style={{ color }} />;
}

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <main>
      <JsonLd
        code={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Cornerstone AI",
          description: "Fractional AI leadership for mid-market companies. Strategy, implementation, and training.",
          url: "https://cornerstoneai.co",
          areaServed: "US",
          priceRange: "$5,000 - $15,000/month",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Austin",
            addressRegion: "TX",
            addressCountry: "US",
          },
          founder: {
            "@type": "Person",
            name: "Francesco Gallo",
          },
        } as any}
      />

      {/* 1. Hero */}
      <section className="w-full bg-carbon">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-[72px] pb-16 flex flex-col items-center text-center">
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-serif leading-[1.08] text-white mb-1">
            You don't need a digital transformation.
          </h1>
          <p className="text-[32px] md:text-[48px] lg:text-[56px] font-serif leading-[1.08] text-white/80 mb-8">
            You need a blueprint to go from <em className="italic text-amber">0 to 1.</em>
          </p>
          <p className="text-base font-body text-white/50 max-w-[500px] leading-relaxed mb-8">
            We help companies like yours take the first step with AI, see real results fast, and build from there.
          </p>
          <CalendlyButton className="inline-block bg-amber text-white text-lg font-semibold text-center py-5 px-10 rounded-[32px] hover:bg-amber/90 transition-colors">
            Book a free strategy call
          </CalendlyButton>
        </div>
      </section>

      {/* 2. Data Stats */}
      <section className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-12 pb-0 lg:pt-20 lg:pb-0">
          <p className="text-xs tracking-[0.2em] text-warm-gray font-medium text-center mb-8 uppercase">
            The data speaks for itself
          </p>
          {/* Desktop: 3-column with amber dividers */}
          <div className="hidden lg:grid grid-cols-[1fr_1px_1fr_1px_1fr] gap-0 text-center">
            <div className="px-10">
              <div className="text-[64px] font-mono font-bold text-amber leading-none">81%</div>
              <p className="text-[14px] font-body text-warm-gray mt-3 leading-[1.6]">of leaders know AI can help. Only 27% have done anything about it.</p>
            </div>
            <div className="bg-amber/20" />
            <div className="px-10">
              <div className="text-[64px] font-mono font-bold text-amber leading-none">88%</div>
              <p className="text-[14px] font-body text-warm-gray mt-3 leading-[1.6]">of business owners say they want help getting started with AI.</p>
            </div>
            <div className="bg-amber/20" />
            <div className="px-10">
              <div className="text-[64px] font-mono font-bold text-amber leading-none">45%</div>
              <p className="text-[14px] font-body text-warm-gray mt-3 leading-[1.6]">cite lack of technical expertise as the #1 barrier to getting started.</p>
            </div>
          </div>
          {/* Mobile: vertical stack */}
          <div className="flex flex-col items-center gap-8 lg:hidden text-center">
            <div>
              <div className="text-[48px] font-mono font-bold text-amber leading-none">81%</div>
              <p className="text-[14px] font-body text-warm-gray mt-3 leading-[1.6] max-w-[280px]">of leaders know AI can help. Only 27% have done anything about it.</p>
            </div>
            <div className="w-[60px] h-px bg-amber/25" />
            <div>
              <div className="text-[48px] font-mono font-bold text-amber leading-none">88%</div>
              <p className="text-[14px] font-body text-warm-gray mt-3 leading-[1.6] max-w-[280px]">of business owners say they want help getting started with AI.</p>
            </div>
            <div className="w-[60px] h-px bg-amber/25" />
            <div>
              <div className="text-[48px] font-mono font-bold text-amber leading-none">45%</div>
              <p className="text-[14px] font-body text-warm-gray mt-3 leading-[1.6] max-w-[280px]">cite lack of technical expertise as the #1 barrier to getting started.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem */}
      <section className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-10 pb-12 lg:pt-10 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-[40px] md:text-[48px] lg:text-[52px] font-serif leading-[1.12] text-carbon mb-5">
                Every option feels <em className="italic">wrong.</em> And you know you need to do something with AI.
              </h2>
              <p className="text-[19px] font-body text-warm-gray leading-[1.7]">
                But there's no strategy, no system, and nobody driving it. So you look for help. And every option falls short.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5 items-start">
              <div className="flex flex-col gap-8">
                <div className="relative bg-white rounded-2xl p-5 pb-9 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="w-[34px] h-[34px] rounded-[10px] bg-icon-purple-bg flex items-center justify-center mb-3">
                    <Monitor className="h-4 w-4 text-icon-purple" />
                  </div>
                  <p className="text-[15px] font-semibold text-carbon mb-1">Hire a Big 4 firm.</p>
                  <p className="text-[13px] text-warm-gray leading-[1.5]">$100K strategy deck built by junior consultants. Impressive in a board meeting. Collects dust by month two.</p>
                  <div className="absolute left-0 right-0 -bottom-px h-7 bg-white rounded-b-2xl skew-y-[-3deg] origin-bottom-right pointer-events-none" />
                </div>
                <div className="relative bg-white rounded-2xl pt-9 px-5 pb-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="absolute left-0 right-0 -top-px h-7 bg-white rounded-t-2xl skew-y-[-3deg] origin-top-left pointer-events-none" />
                  <div className="relative z-[2]">
                    <div className="w-[34px] h-[34px] rounded-[10px] bg-icon-amber-bg flex items-center justify-center mb-3">
                      <AlertCircle className="h-4 w-4 text-icon-amber" />
                    </div>
                    <p className="text-[15px] font-semibold text-carbon mb-1">Figure it out internally.</p>
                    <p className="text-[13px] text-warm-gray leading-[1.5]">Your best people are already stretched. Nobody has 20 extra hours a week to research AI on top of their actual job.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 mt-10">
                <div className="relative bg-white rounded-2xl p-5 pb-9 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="w-[34px] h-[34px] rounded-[10px] bg-icon-sky-bg flex items-center justify-center mb-3">
                    <User className="h-4 w-4 text-icon-sky" />
                  </div>
                  <p className="text-[15px] font-semibold text-carbon mb-1">Hire a freelancer.</p>
                  <p className="text-[13px] text-warm-gray leading-[1.5]">They'll build a chatbot or wire up a Zapier flow, then move on. Nobody on your team knows how it works, how to fix it, or how to build the next one.</p>
                  <div className="absolute left-0 right-0 -bottom-px h-7 bg-white rounded-b-2xl skew-y-[-3deg] origin-bottom-right pointer-events-none" />
                </div>
                <div className="relative bg-white rounded-2xl pt-9 px-5 pb-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="absolute left-0 right-0 -top-px h-7 bg-white rounded-t-2xl skew-y-[-3deg] origin-top-left pointer-events-none" />
                  <div className="relative z-[2]">
                    <div className="w-[34px] h-[34px] rounded-[10px] bg-icon-red-bg flex items-center justify-center mb-3">
                      <XCircle className="h-4 w-4 text-icon-red" />
                    </div>
                    <p className="text-[15px] font-semibold text-carbon mb-1">Do nothing.</p>
                    <p className="text-[13px] text-warm-gray leading-[1.5]">And hope your competitors are figuring it out just as slowly. Some are. But the ones who aren't are pulling ahead every month.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Embed */}
      <section className="w-full bg-carbon">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 lg:py-20">
          <h2 className="text-[36px] md:text-[48px] lg:text-[52px] font-serif leading-[1.12] text-white text-center max-w-[800px] mx-auto mb-10">
            We don't advise. We <em className="italic text-amber">embed</em> a senior AI leader inside your business every month.
          </h2>
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
                  <path d="M8,8 L24,8 L24,24 L40,24 L40,40 L8,40 Z" fill="#D97706"/>
                </svg>
                <span className="text-[15px] font-semibold text-carbon">Cornerstone OS</span>
              </div>
              <span className="text-xs text-warm-gray">March 2026</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
              <div className="bg-cream rounded-xl p-5">
                <p className="text-[11px] text-warm-gray mb-1.5">Hours saved</p>
                <p className="font-mono text-[36px] lg:text-[40px] font-bold text-amber leading-none">47</p>
                <p className="text-[11px] text-icon-green mt-1.5">↑ 12%</p>
              </div>
              <div className="bg-cream rounded-xl p-5">
                <p className="text-[11px] text-warm-gray mb-1.5">Workflows</p>
                <p className="font-mono text-[36px] lg:text-[40px] font-bold text-icon-purple leading-none">12</p>
                <p className="text-[11px] text-icon-green mt-1.5">↑ 3 new</p>
              </div>
              <div className="bg-cream rounded-xl p-5">
                <p className="text-[11px] text-warm-gray mb-1.5">Adoption</p>
                <p className="font-mono text-[36px] lg:text-[40px] font-bold text-icon-sky leading-none">84%</p>
                <p className="text-[11px] text-icon-green mt-1.5">↑ 8%</p>
              </div>
              <div className="bg-cream rounded-xl p-5">
                <p className="text-[11px] text-warm-gray mb-1.5">Cost saved</p>
                <p className="font-mono text-[36px] lg:text-[40px] font-bold text-icon-green leading-none">$18K</p>
                <p className="text-[11px] text-icon-green mt-1.5">this month</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
              <div>
                <p className="text-[13px] font-semibold text-carbon mb-3.5">Active workflows</p>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Invoice processing", pct: 92, color: "#22C55E" },
                    { name: "Lead scoring", pct: 78, color: "#D97706" },
                    { name: "Report generation", pct: 65, color: "#0284C7" },
                    { name: "Onboarding emails", pct: 45, color: "#7C3AED" },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between">
                      <span className="text-[13px] text-warm-gray">{row.name}</span>
                      <div className="flex items-center gap-2.5">
                        <div className="w-[120px] h-2 bg-cream rounded overflow-hidden">
                          <div className="h-full rounded" style={{ width: `${row.pct}%`, background: row.color }} />
                        </div>
                        <span className="text-[11px] font-semibold min-w-[32px] text-right" style={{ color: row.color }}>{row.pct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-carbon mb-3.5">Monthly impact</p>
                <div className="flex items-end gap-2 h-[120px]">
                  {[
                    { h: "30%", active: false },
                    { h: "42%", active: false },
                    { h: "52%", active: false },
                    { h: "48%", active: false },
                    { h: "65%", active: false },
                    { h: "82%", active: true },
                    { h: "95%", active: true },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 rounded-t-[5px]" style={{ height: bar.h, background: bar.active ? "#0284C7" : "#E0F2FE" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Results Stats Band */}
      <section className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 lg:py-20">
          <h2 className="text-[48px] md:text-[56px] lg:text-[60px] font-serif leading-tight text-carbon text-center mb-12">
            The numbers speak for <em className="italic">themselves.</em>
          </h2>
          {/* Desktop: wavy band */}
          <div className="relative overflow-hidden hidden lg:block">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: '60px' }}>
              <path d="M0,80 L0,40 Q360,0 720,50 Q1080,80 1440,20 L1440,80 Z" fill="#1C1917" />
            </svg>
            <div className="bg-carbon px-10 py-16 -mt-px -mb-px">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {[
                  { num: "40hrs+", desc: "Returned to your team monthly" },
                  { num: "$100K+", desc: "Saved vs. full-time AI hire" },
                  { num: "3.2x", desc: "Average ROI in 90 days" },
                  { num: "2wks", desc: "To first working system" },
                ].map((stat) => (
                  <div key={stat.num} className="text-center">
                    <div className="relative inline-block">
                      <span className="text-[52px] font-mono font-bold text-amber leading-none">{stat.num}</span>
                      <svg className="absolute" style={{ top: '-10px', right: '-16px' }} width="22" height="22" viewBox="0 0 32 30" fill="none"><path d="M8 22 L12 12 L16 18 L20 8 L24 14" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p className="text-[15px] font-body font-medium text-white/60 mt-3">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block rotate-180" style={{ height: '60px', marginTop: '-2px' }}>
              <path d="M0,80 L0,40 Q360,0 720,50 Q1080,80 1440,20 L1440,80 Z" fill="#1C1917" />
            </svg>
          </div>

          {/* Mobile: simple dark rounded box, 2x2 grid */}
          <div className="lg:hidden bg-carbon rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "40hrs+", desc: "Returned to your team monthly" },
                { num: "$100K+", desc: "Saved vs. full-time AI hire" },
                { num: "3.2x", desc: "Average ROI in 90 days" },
                { num: "2wks", desc: "To first working system" },
              ].map((stat) => (
                <div key={stat.num} className="text-center">
                  <div className="relative inline-block">
                    <span className="text-[36px] font-mono font-bold text-amber leading-none">{stat.num}</span>
                    <svg className="absolute" style={{ top: '-8px', right: '-12px' }} width="16" height="16" viewBox="0 0 32 30" fill="none"><path d="M8 22 L12 12 L16 18 L20 8 L24 14" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p className="text-xs font-body font-medium text-white/50 mt-2">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. What Every Month Looks Like */}
      <section className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 lg:py-20">
          <div className="text-center mb-9">
            <h2 className="text-[48px] md:text-[56px] lg:text-[60px] font-serif leading-[1.1] text-carbon mb-2">
              What every month <em className="italic">looks like.</em>
            </h2>
            <p className="text-[17px] font-body text-warm-gray max-w-[480px] mx-auto">
              Every engagement follows the same four-week rhythm.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: "01", numColor: "rgba(217,119,6,0.08)", iconBg: "#FEF3C7", iconColor: "#D97706", icon: "Clock", label: "WEEK ONE", labelColor: "#D97706", title: "Align", desc: "CEO check-in. Review last month's numbers. Adjust the roadmap. Set priorities for this month." },
              { num: "02", numColor: "rgba(124,58,237,0.08)", iconBg: "#EDE8FE", iconColor: "#7C3AED", icon: "Search", label: "WEEK TWO", labelColor: "#7C3AED", title: "Discover", desc: "Sit with the people who do the work. Map their workflows. Find the bottlenecks. Establish baselines." },
              { num: "03", numColor: "rgba(2,132,199,0.08)", iconBg: "#E0F2FE", iconColor: "#0284C7", icon: "Wrench", label: "WEEK THREE", labelColor: "#0284C7", title: "Build", desc: "Build the 1-4 highest-impact automations or workflows. Working systems, not recommendations." },
              { num: "04", numColor: "rgba(22,163,74,0.08)", iconBg: "#DCFCE7", iconColor: "#16A34A", icon: "CheckCircle", label: "WEEK FOUR", labelColor: "#16A34A", title: "Train + Report", desc: "Hands-on team training. Impact report delivered. Next month pre-loaded and ready to go." },
            ].map((card) => (
              <div key={card.num} className="bg-white rounded-[18px] p-7 relative overflow-hidden text-left">
                <span className="absolute top-3 right-4 font-mono text-[64px] font-bold leading-none select-none pointer-events-none" style={{ color: card.numColor }}>{card.num}</span>
                <div className="relative z-[1]">
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3.5" style={{ background: card.iconBg }}>
                    <WeekIcon name={card.icon} color={card.iconColor} />
                  </div>
                  <p className="text-[11px] font-semibold tracking-[0.05em] mb-1" style={{ color: card.labelColor }}>{card.label}</p>
                  <p className="text-[20px] font-semibold text-carbon mb-2">{card.title}</p>
                  <p className="text-sm text-warm-gray leading-[1.55]">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[17px] text-warm-gray text-center mt-7">Then it repeats. Every month. Compounding results.</p>
        </div>
      </section>

      {/* 7. Technology That Stays */}
      <section className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 lg:py-20 text-center">
          <h2 className="text-[48px] md:text-[56px] lg:text-[60px] font-serif leading-[1.1] text-carbon mb-3">
            Technology that stays <em className="italic" >with you</em>
          </h2>
          <p className="text-[17px] font-body text-warm-gray leading-[1.7] max-w-[560px] mx-auto mb-9">
            Every other AI consultant walks away and the value walks with them. We install three things that run inside your business permanently.
          </p>
          <TechnologyTabs />
        </div>
      </section>

      {/* 8. Pricing */}
      <section className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20">
          <h2 className="text-[48px] font-serif leading-tight text-carbon text-center">
            Four steps. One <em className="italic">journey.</em>
          </h2>
          <p className="text-[16px] font-body text-warm-gray text-center max-w-[420px] mx-auto mt-4">
            Each step builds on the last. Start where you are.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10">
            {/* Assess */}
            <div className="bg-white rounded-[16px] p-6 flex flex-col">
              <p className="text-[20px] font-semibold text-carbon mb-1">Assess</p>
              <p className="text-[12px] text-warm-gray italic mb-4">One time diagnostic</p>
              <div className="border-t border-black/[0.06]" />
              <div className="flex flex-col gap-[7px] mt-3.5">
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Executive alignment</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>AI Readiness Assessment</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>90-day strategic roadmap</p>
              </div>
            </div>

            {/* Start */}
            <div className="bg-white rounded-[16px] p-6 flex flex-col">
              <p className="text-[20px] font-semibold text-carbon mb-1">Start</p>
              <p className="text-[12px] text-warm-gray italic mb-4">First implementation</p>
              <div className="border-t border-black/[0.06]" />
              <div className="flex flex-col gap-[7px] mt-3.5">
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Everything in Assess</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>1-2 workflow implementations</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Hands-on team enablement</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Department-level AI rollout</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Custom tool & automation builds</p>
              </div>
            </div>

            {/* Build (Recommended) */}
            <div className="bg-white rounded-[16px] p-6 flex flex-col border-2 border-amber relative">
              <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-amber text-white text-[10px] font-semibold px-3.5 py-[3px] rounded-[10px] whitespace-nowrap">RECOMMENDED</span>
              <p className="text-[20px] font-semibold text-carbon mb-1">Build</p>
              <p className="text-[12px] text-warm-gray italic mb-4">Scale across the business</p>
              <div className="border-t border-black/[0.06]" />
              <div className="flex flex-col gap-[7px] mt-3.5">
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Everything in Start</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>3-4 workflow implementations/month</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Multi-department AI rollout</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>AI monitoring</p>
              </div>
            </div>

            {/* Accelerate */}
            <div className="bg-white rounded-[16px] p-6 flex flex-col">
              <p className="text-[20px] font-semibold text-carbon mb-1">Accelerate</p>
              <p className="text-[12px] text-warm-gray italic mb-4">Company-wide, in parallel</p>
              <div className="border-t border-black/[0.06]" />
              <div className="flex flex-col gap-[7px] mt-3.5">
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Everything in Build</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Company-wide simultaneous rollout</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Embedded operational presence</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Aggressive execution cadence</p>
                <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>AI hiring fluency</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <CalendlyButton className="inline-block bg-amber text-white text-[14px] font-medium px-7 py-3 rounded-[24px] hover:bg-amber/90 transition-colors">
              Book a free strategy call
            </CalendlyButton>
            <p className="text-[13px] text-warm-gray mt-3">
              We'll walk you through the right starting point.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Assessment CTA */}
      <section className="w-full bg-carbon">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-10 lg:py-16 text-center">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-serif text-white mb-3">
            Not sure where you stand with AI? Find out in 5 minutes.
          </h2>
          <p className="text-base font-body text-white/50 mb-5">
            10 questions. Personalized control center. Concrete next steps.
          </p>
          <Button asChild size="lg">
            <Link href="/assessment">Take the Free Assessment</Link>
          </Button>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="w-full bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 lg:py-20">
          <h2 className="text-[48px] md:text-[56px] lg:text-[60px] font-serif leading-[1.1] text-carbon text-center mb-9">
            Common <em className="italic">questions</em>
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="w-full bg-carbon">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-10 pb-12 lg:pt-16 lg:pb-12 text-center">
          <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-serif text-white mb-3">
            Ready to take the first step?
          </h2>
          <p className="text-base font-body text-white/50 mb-5">
            Book a free 30-minute strategy call. No pitch, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <CalendlyButton className="inline-block bg-amber text-white text-base font-semibold py-3.5 px-8 rounded-[28px] hover:bg-amber/90 transition-colors">
              Book a free strategy call
            </CalendlyButton>
            {/* <Link href="/assessment" className="text-[13px] text-white/40 hover:text-white/70 hover:underline font-body transition-colors">
              Or take the free assessment →
            </Link> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
