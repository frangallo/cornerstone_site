"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CALENDLY_URL = "https://calendly.com/cornerstoneai/30min?hide_gdpr_banner=1&background_color=f5f0e8&text_color=78716c&primary_color=d97706";

let loadState: "idle" | "loading" | "ready" = "idle";
let loadPromise: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (loadState === "ready") return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadState = "loading";
  loadPromise = new Promise<void>((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      loadState = "ready";
      resolve();
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

function openCalendly() {
  if (document.querySelector(".calendly-overlay")) return;
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
}

export const CalendlyButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pending, setPending] = useState(false);

  const handleClick = useCallback(async () => {
    if (loadState === "ready") {
      openCalendly();
      return;
    }
    setPending(true);
    await loadCalendly();
    setPending(false);
    openCalendly();
  }, []);

  const preload = useCallback(() => {
    if (loadState === "idle") loadCalendly();
  }, []);

  // Mobile: preload when button enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: hover)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          preload();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [preload]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      onMouseEnter={preload}
      className={className}
    >
      {pending ? "Loading..." : children}
    </button>
  );
};
