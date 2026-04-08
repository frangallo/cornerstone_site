"use client";

import { useState } from "react";

const mainQuestions = [
  {
    q: "What size companies do you work with?",
    a: "Mid-market companies doing $10M-$200M in annual revenue. Big enough that AI can meaningfully change how the business runs, but not so big that they'd hire a full-time AI director or drop $500K on a Big 4 engagement. We also work with smaller companies on focused one-time engagements through our Start tier.",
  },
  {
    q: "How is this different from hiring a consulting firm?",
    a: "A consulting firm sends junior analysts to build a strategy deck, presents it to your board, and leaves. You're on your own to implement it. We embed inside your business and actually build the systems. We find the workflows, build the automations, train your team, and measure the impact every month. You get a senior AI leader, not a PowerPoint.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients have their first working workflow within two weeks. By the end of Month 1, you have a full roadmap and your team is already using new tools. By Month 3, your business operates differently. We move fast because we're building systems, not writing reports.",
  },
  {
    q: "What happens when the engagement ends?",
    a: "Three things stay behind: a team that's better at AI, a hiring process that screens for AI proficiency, and a live control center showing what's been built and what it's delivering. The value compounds whether we're there or not. That's the whole point.",
  },
  {
    q: "What if we've never done anything with AI?",
    a: "That's exactly who we work with. Most of our clients start at zero. A few people on the team might use ChatGPT for emails, but there's no strategy, no systems, and no one driving it. We meet you where you are and build from there.",
  },
];

const extraQuestions = [
  {
    q: "Can you just train our team without the full engagement?",
    a: "That's what Start is for. A one-time engagement focused on strategy, training, and one quick win. If you just need your team to get fluent with AI tools and a clear roadmap for what to do next, Start gets you there.",
  },
  {
    q: "Should I hire a full-time AI leader or go fractional?",
    a: "A full-time Head of AI costs $250K+ before benefits, takes months to hire, and you're betting on one person's perspective. Fractional gives you the same strategic leadership at a fraction of the cost, plus you get someone who's seen what works across multiple companies. Most of our clients start fractional and eventually build an internal team with our help.",
  },
  {
    q: "What industries do you work with?",
    a: "We work across industries but we're especially deep in professional services, distribution, construction, and manufacturing. The common thread isn't the industry, it's the company profile: $10M-$200M, no technical AI leadership, and a CEO who knows they need to move.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  const visibleQuestions = showMore
    ? [...mainQuestions, ...extraQuestions]
    : mainQuestions;

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="max-w-[800px] mx-auto text-left">
      {visibleQuestions.map((item, i) => {
        const isOpen = openIndex === i;
        const isLast = i === visibleQuestions.length - 1;

        return (
          <div
            key={item.q}
            className={!isLast ? "border-b border-carbon/[0.08]" : ""}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full py-6 cursor-pointer text-left bg-transparent"
              style={{ display: 'grid', gridTemplateColumns: '1fr 36px', alignItems: 'center', gap: '16px', border: 'none' }}
            >
              <span
                className={`font-serif text-[20px] lg:text-[26px] transition-colors duration-200 ${
                  isOpen ? "text-amber" : "text-carbon"
                }`}
              >
                {item.q}
              </span>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
              >
                <circle cx="18" cy="18" r="18" fill={isOpen ? '#1C1917' : '#D97706'} />
                <line x1="18" y1="11" x2="18" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="11" y1="18" x2="25" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="bg-white rounded-[14px] p-5 mb-6">
                <p className="text-base text-warm-gray leading-[1.7]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="text-center mt-6">
        <button
          onClick={() => {
            setShowMore(!showMore);
            if (showMore && openIndex !== null && openIndex >= mainQuestions.length) {
              setOpenIndex(null);
            }
          }}
          className="text-sm text-amber font-medium hover:underline cursor-pointer"
        >
          {showMore ? "See fewer questions ↑" : "See more questions ↓"}
        </button>
      </div>
    </div>
  );
}
