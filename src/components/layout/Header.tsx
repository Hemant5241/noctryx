"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { LiveClock } from "./LiveClock";
import { SystemStatusBadge } from "./SystemStatusBadge";
import { CommandMenu } from "./CommandMenu";
import { OmMonogram } from "@/components/brand/OmMonogram";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F4F1EA]/95 backdrop-blur-md border-b-2 border-black">
        {/* Top industrial telemetry strip */}
        <div className="hidden lg:flex items-center justify-between px-6 py-1 border-b border-black/15 bg-black/[0.02] text-[10px] font-mono text-black/60 tracking-wider">
          <div className="flex items-center gap-4">
            <span>SYS_ID: OM-SHINDE-AI-SYS</span>
            <span>{"//"}</span>
            <span>SPEC: NEURAL ARCHITECTURES & VECTOR SYSTEMS</span>
          </div>
          <div className="flex items-center gap-4">
            <LiveClock />
            <SystemStatusBadge />
          </div>
        </div>

        {/* Main navigation row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand mark */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
          >
            <OmMonogram
              size={42}
              className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(255,59,0,1)] transition-all"
            />
            <div>
              <div className="font-mono font-black text-base sm:text-lg tracking-tight text-black flex items-center gap-2">
                <span>OM SHINDE</span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 bg-[#FF3B00] text-white tracking-widest">
                  AI.ENG
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-widest text-black/60 uppercase">
                RESEARCH & SYSTEMS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs font-bold" aria-label="Desktop Navigation">
            <Link
              href="/about"
              className="px-3.5 py-2 border border-transparent hover:border-black hover:bg-black hover:text-[#F4F1EA] transition-all"
            >
              <span className="text-[#FF3B00] mr-1.5">01</span> ABOUT
            </Link>
            <Link
              href="/projects"
              className="px-3.5 py-2 border border-transparent hover:border-black hover:bg-black hover:text-[#F4F1EA] transition-all"
            >
              <span className="text-[#FF3B00] mr-1.5">02</span> PROJECTS
            </Link>
            <Link
              href="/contact"
              className="px-3.5 py-2 border border-transparent hover:border-black hover:bg-black hover:text-[#F4F1EA] transition-all"
            >
              <span className="text-[#FF3B00] mr-1.5">03</span> CONTACT
            </Link>
          </nav>

          {/* Action triggers */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="lg:hidden">
              <LiveClock />
            </div>

            {/* Menu trigger button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              aria-label="Open System Command Menu"
            >
              <Menu className="w-4 h-4 text-[#FF3B00]" />
              <span className="tracking-wider">COMMAND</span>
              <span className="hidden sm:inline-block text-[10px] bg-black/10 px-1 py-0.2 text-black/70">
                [MENU]
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Command Menu Modal Overlay */}
      <CommandMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
