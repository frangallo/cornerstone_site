import Link from "next/link";

const Pricing = () => (
  <div className="w-full bg-cream">
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
          <p className="text-[10px] font-medium text-warm-gray tracking-[0.05em] mb-1.5">ONE-TIME</p>
          <p className="text-[20px] font-semibold text-carbon mb-1">Assess</p>
          <p className="text-[12px] text-warm-gray italic mb-4">Time-boxed diagnostic</p>
          <div className="border-t border-black/[0.06]" />
          <div className="flex flex-col gap-[7px] mt-3.5">
            <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>Executive alignment</p>
            <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>AI Readiness Assessment</p>
            <p className="text-[13px] text-warm-gray leading-[1.6]"><span className="text-amber mr-2">✓</span>90-day strategic roadmap</p>
          </div>
        </div>

        {/* Start */}
        <div className="bg-white rounded-[16px] p-6 flex flex-col">
          <p className="text-[10px] font-medium text-warm-gray tracking-[0.05em] mb-1.5">RECURRING</p>
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
          <p className="text-[10px] font-medium text-warm-gray tracking-[0.05em] mb-1.5">RECURRING</p>
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
          <p className="text-[10px] font-medium text-warm-gray tracking-[0.05em] mb-1.5">RECURRING</p>
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
        <Link href="/contact" className="inline-block bg-amber text-white text-[14px] font-medium px-7 py-3 rounded-[24px] hover:bg-amber/90 transition-colors">
          Book a free strategy call
        </Link>
        <p className="text-[13px] text-warm-gray mt-3">
          We'll walk you through the right starting point.
        </p>
      </div>
    </div>
  </div>
);

export default Pricing;
