"use client";

declare const Calendly: any;

export const CalendlyButton = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <button
    type="button"
    onClick={() => { Calendly.initPopupWidget({ url: 'https://calendly.com/cescogallo10/30min?hide_gdpr_banner=1&background_color=f5f0e8&text_color=78716c&primary_color=d97809&padding_left=30' }); }}
    className={className}
  >
    {children}
  </button>
);
