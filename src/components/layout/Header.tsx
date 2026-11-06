"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { LiveClock } from "./LiveClock";
import { SystemStatusBadge } from "./SystemStatusBadge";
import { CommandMenu } from "./CommandMenu";
import { OmMonogram } from "@/components/brand/OmMonogram";
import { ThemeSelector } from "./ThemeSelector";
import { useTheme } from "@/context/ThemeContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Theme-tailored styling for 100% contrast & zero inheritance conflicts
  let headerClass = "bg-[#F4F1EA]/95 border-black text-[#0D0D0D]";
  let topStripClass = "bg-black/[0.02] border-black/15 text-black/60";
  let brandTitleClass = "text-black";
  let brandSubClass = "text-black/60";
  let badgeClass = "bg-[#FF3B00] text-white";
  let navLinkClass = "text-black hover:border-black hover:bg-black hover:text-[#F4F1EA]";
  let navNumClass = "text-[#FF3B00]";
  let commandBtnClass = "border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  let commandIconClass = "text-[#FF3B00]";
  let commandTagClass = "bg-black/10 text-black/70";

  if (theme === "crimson-noir") {
    headerClass = "bg-[#080808]/95 border-[#22222a] text-[#CDCBCA] shadow-[0_4px_25px_rgba(0,0,0,0.9),0_1px_0_rgba(212,21,20,0.35)]";
    topStripClass = "bg-[#0b0b0e] border-[#1e1e24] text-[#9A9896]";
    brandTitleClass = "text-white";
    brandSubClass = "text-[#9A9896]";
    badgeClass = "bg-[#D41514] text-white shadow-[0_0_8px_rgba(212,21,20,0.5)]";
    navLinkClass = "text-[#CDCBCA] hover:border-[#D41514] hover:bg-[#141418] hover:text-white";
    navNumClass = "text-[#FF453A]";
    commandBtnClass = "border border-[#33333d] bg-[#141418] text-[#CDCBCA] hover:border-[#D41514] hover:text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)] rounded-[2px]";
    commandIconClass = "text-[#FF453A]";
    commandTagClass = "bg-[#D41514]/15 text-[#FF453A] border border-[#D41514]/30";
  } else if (theme === "signal-studio") {
    headerClass = "bg-[#1B1020] border-[#6938FF] text-[#FFF0D1] shadow-[0_4px_0px_0px_#FF4FA3]";
    topStripClass = "bg-[#24162B] border-[#3F2746] text-[#D5C5D8]";
    brandTitleClass = "text-[#FFF0D1]";
    brandSubClass = "text-[#00E5D4]";
    badgeClass = "bg-[#C6FF00] text-[#1B1020] font-black border border-[#1B1020]";
    navLinkClass = "text-[#FFF0D1] hover:border-[#FF4FA3] hover:bg-[#FF4FA3] hover:text-[#1B1020] rounded-sm font-black";
    navNumClass = "text-[#C6FF00]";
    commandBtnClass = "border-2 border-[#1B1020] bg-[#FF4FA3] text-[#1B1020] hover:bg-[#C6FF00] hover:text-[#1B1020] shadow-[3px_3px_0px_0px_#C6FF00] rounded-sm font-black";
    commandIconClass = "text-[#1B1020]";
    commandTagClass = "bg-[#1B1020]/20 text-[#1B1020] font-mono";
  }

  return (
    <>
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b-2 transition-colors ${headerClass}`}>
        {/* Top industrial telemetry strip */}
        <div className={`hidden lg:flex items-center justify-between px-6 py-1 border-b text-[10px] font-mono tracking-wider ${topStripClass}`}>
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
              <div className={`font-mono font-black text-base sm:text-lg tracking-tight flex items-center gap-2 ${brandTitleClass}`}>
                <span>OM SHINDE</span>
                <span className={`hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 tracking-widest ${badgeClass}`}>
                  AI.ENG
                </span>
              </div>
              <p className={`font-mono text-[10px] tracking-widest uppercase ${brandSubClass}`}>
                RESEARCH & SYSTEMS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs font-bold" aria-label="Desktop Navigation">
            <Link
              href="/about"
              className={`px-3.5 py-2 border border-transparent transition-all ${navLinkClass}`}
            >
              <span className={`mr-1.5 ${navNumClass}`}>01</span> ABOUT
            </Link>
            <Link
              href="/projects"
              className={`px-3.5 py-2 border border-transparent transition-all ${navLinkClass}`}
            >
              <span className={`mr-1.5 ${navNumClass}`}>02</span> PROJECTS
            </Link>
            <Link
              href="/contact"
              className={`px-3.5 py-2 border border-transparent transition-all ${navLinkClass}`}
            >
              <span className={`mr-1.5 ${navNumClass}`}>03</span> CONTACT
            </Link>
          </nav>

          {/* Action triggers */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="lg:hidden">
              <LiveClock />
            </div>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* Menu trigger button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`inline-flex items-center gap-2 font-mono text-xs font-bold px-3 py-2 border-2 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:ring-2 focus-visible:ring-[#FF3B00] cursor-pointer ${commandBtnClass}`}
              aria-label="Open System Command Menu"
            >
              <Menu className={`w-4 h-4 ${commandIconClass}`} />
              <span className="tracking-wider">COMMAND</span>
              <span className={`hidden sm:inline-block text-[10px] px-1 py-0.2 ${commandTagClass}`}>
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
