import { legal } from "@repo/cms";
import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";

export const Footer = async () => {
  const legalPages = await legal.getPostsMeta();

  return (
    <footer className="bg-carbon text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
            <path d="M8,8 L24,8 L24,24 L40,24 L40,40 L8,40 Z" fill="#D97706"/>
          </svg>
          <span className="text-base font-semibold text-white">Cornerstone AI</span>
        </div>
        <p className="text-[13px] text-white/35">From zero to AI in 90 days.</p>

        <div className="flex items-center justify-center gap-0 mt-5 flex-wrap">
          <CalendlyButton className="text-[13px] text-white/50 hover:text-white/80 transition-colors">
            Book a Call
          </CalendlyButton>
          <span className="text-[13px] text-white/50 mx-2">·</span>
          <a href="mailto:hello@cornerstoneai.co" className="text-[13px] text-white/50 hover:text-white/80 transition-colors">
            hello@cornerstoneai.co
          </a>
          <span className="text-[13px] text-white/50 mx-2">·</span>
          <a href="https://www.linkedin.com/in/francescogallo/" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/50 hover:text-white/80 transition-colors">
            LinkedIn
          </a>
        </div>

        {legalPages.length > 0 && (
          <div className="flex items-center justify-center gap-0 mt-3 flex-wrap">
            {legalPages.map((post, i) => (
              <span key={post._slug}>
                {i > 0 && <span className="text-[13px] text-white/50 mx-2">·</span>}
                <Link
                  href={`/legal/${post._slug}`}
                  className="text-[13px] text-white/50 hover:text-white/80 transition-colors"
                >
                  {post._title}
                </Link>
              </span>
            ))}
          </div>
        )}

        <p className="text-[11px] text-white/20 mt-6">
          © {new Date().getFullYear()} Cornerstone AI. Austin, TX.
        </p>
      </div>
    </footer>
  );
};
