"use client";

import type { Dictionary } from "@repo/internationalization";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  dictionary: Dictionary;
}

export const Header = ({ dictionary }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 left-0 w-full bg-carbon z-40">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 md:px-8 py-4 md:py-5">
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
              <path d="M8,8 L24,8 L24,24 L40,24 L40,40 L8,40 Z" fill="#D97706"/>
            </svg>
            <span className="text-base font-sans font-semibold text-white">Cornerstone AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/contact" className="text-sm font-medium text-white bg-amber hover:bg-amber/90 px-5 rounded-[20px] transition-colors leading-[40px]">
              Book a Call
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!isOpen)}
            className="lg:hidden text-white/70 hover:text-white p-2"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu — full screen overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-carbon z-[9999] flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
                <path d="M8,8 L24,8 L24,24 L40,24 L40,40 L8,40 Z" fill="#D97706"/>
              </svg>
              <span className="text-base font-sans font-semibold text-white">Cornerstone AI</span>
            </Link>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 mt-4">
            <Link href="/contact" className="block w-full bg-amber text-white text-base font-semibold text-center py-3.5 rounded-[24px] mt-6 hover:bg-amber/90 transition-colors" onClick={() => setOpen(false)}>
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
