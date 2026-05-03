import { legal } from "@repo/cms";
import { CalendlyButton } from "@/components/calendly-button";
import Link from "next/link";

const Logo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="28" height="28" rx="6" fill="#E8823A" stroke="#0F2A3D" strokeWidth="2" />
    <path d="M8 22 L8 14 L14 14 L14 18 L20 18 L20 22 Z" fill="#0F2A3D" />
    <path d="M8 14 L14 14 L14 9 L8 9 Z" fill="#0F2A3D" opacity="0.5" />
    <path d="M14 18 L20 18 L20 14 L14 14 Z" fill="#0F2A3D" opacity="0.75" />
  </svg>
);

export const Footer = async () => {
  const legalPages = await legal.getPostsMeta();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="nav-logo" style={{ marginBottom: 14 }}>
              <Logo />
              <span>Cornerstone</span>
            </div>
            <div style={{ fontSize: 14, maxWidth: "30ch", lineHeight: 1.55, opacity: 0.85 }}>
              From zero to one in ninety days. Embedded AI operators for mid-market leaders.
            </div>
          </div>
          <div>
            <h5>Sections</h5>
            <div className="foot-links">
              <Link href="/#approach">Approach</Link>
              <Link href="/#promise">Promise</Link>
              <Link href="/#assessment">Assessment</Link>
              <Link href="/#engagement">Engagement</Link>
            </div>
          </div>
          <div>
            <h5>Get in touch</h5>
            <div className="foot-links">
              <CalendlyButton className="foot-link-button">Book a call</CalendlyButton>
              <a href="mailto:frank@cornerstoneai.co">frank@cornerstoneai.co</a>
              <a href="https://www.linkedin.com/in/francescogallo/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              {legalPages.map((post) => (
                <Link key={post._slug} href={`/legal/${post._slug}`}>{post._title}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-copy">
          <div>© {new Date().getFullYear()} Cornerstone · Austin, TX</div>
          <div>Built with intent · v2026.05</div>
        </div>
      </div>
    </footer>
  );
};
