"use client";

declare const Calendly: any;

const openCalendly = () => {
  if (document.querySelector('.calendly-overlay')) return;
  Calendly.initPopupWidget({ url: 'https://calendly.com/cornerstoneai/30min?hide_gdpr_banner=1&background_color=f5f0e8&text_color=78716c&primary_color=d97706' });
};

export const CalendlyButton = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <button
    type="button"
    onClick={openCalendly}
    className={className}
  >
    {children}
  </button>
);
