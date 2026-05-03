"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: any;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) el.classList.add("in");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    const t = window.setTimeout(() => el.classList.add("in"), 1200);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
  return (
    <Tag ref={ref as any} id={id} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
