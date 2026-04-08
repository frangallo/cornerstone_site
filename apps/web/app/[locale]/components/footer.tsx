import { legal } from "@repo/cms";
import Link from "next/link";

export const Footer = async () => {
  const legalPages = await legal.getPostsMeta();

  return (
    <footer className="bg-carbon text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-amber rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white">C</span>
              </div>
              <span className="text-base font-semibold text-white">Cornerstone AI</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] tracking-[0.15em] text-amber mb-3 font-medium">SERVICES</p>
            <div className="space-y-1.5">
              <Link href="/services#start" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                Start
              </Link>
              <Link href="/services#build" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                Build
              </Link>
              <Link href="/services#accelerate" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                Accelerate
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[11px] tracking-[0.15em] text-amber mb-3 font-medium">RESOURCES</p>
            <div className="space-y-1.5">
              <Link href="/blog" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                Blog
              </Link>
              <Link href="/assessment" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                Free Assessment
              </Link>
              <Link href="/about" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                About
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] tracking-[0.15em] text-amber mb-3 font-medium">CONTACT</p>
            <div className="space-y-1.5">
              <Link href="/contact" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                Book a Call
              </Link>
              <a href="mailto:hello@cornerstoneai.co" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                hello@cornerstoneai.co
              </a>
              <a href="https://www.linkedin.com/in/francescogallo/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white/80 transition-colors block">
                LinkedIn
              </a>
            </div>
            {legalPages.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {legalPages.map((post) => (
                  <Link
                    key={post._slug}
                    href={`/legal/${post._slug}`}
                    className="text-sm text-white/50 hover:text-white/80 transition-colors block"
                  >
                    {post._title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 mt-8">
          <p className="text-[11px] text-white/20 text-center">
            © {new Date().getFullYear()} Cornerstone AI. Austin, TX.
          </p>
        </div>
      </div>
    </footer>
  );
};
