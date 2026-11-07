"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ArrowUpRight, Terminal, Layers, Compass, Mail, User, Palette } from "lucide-react";
import { projectsData } from "@/data/projects";
import { socialsData } from "@/data/socials";
import { OmMonogram } from "@/components/brand/OmMonogram";
import { useTheme, THEMES } from "@/context/ThemeContext";
import { ThemePreviewOption } from "@/components/theme/ThemePreviewOption";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function subscribeEmpty() {
  return () => {};
}

function getClientMounted() {
  return true;
}

function getServerMounted() {
  return false;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const isMounted = useSyncExternalStore(subscribeEmpty, getClientMounted, getServerMounted);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();

  // Keyboard navigation & light dismiss via Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const isCrimson = theme === "crimson-noir";
  const isSignal = theme === "signal-studio";

  const dialogClass = isCrimson
    ? "m-auto w-[94vw] max-w-4xl max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] overflow-y-auto p-0 bg-[#0A0A0C] text-[#CDCBCA] border border-[#D41514]/60 shadow-[0_0_50px_rgba(212,21,20,0.35),0_20px_40px_rgba(0,0,0,0.95)] focus:outline-none rounded-sm"
    : isSignal
    ? "m-auto w-[94vw] max-w-4xl max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] overflow-y-auto p-0 bg-[#1B1020] text-[#FFF0D1] border-3 border-[#6938FF] shadow-[8px_8px_0px_0px_#FF4FA3,12px_12px_0px_0px_#C6FF00] focus:outline-none rounded-sm"
    : "m-auto w-[94vw] max-w-4xl max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] overflow-y-auto p-0 bg-[#0D0D0D] text-[#F4F1EA] border-2 border-[#FF3B00] shadow-[8px_8px_0px_0px_rgba(255,59,0,0.85)] sm:shadow-[12px_12px_0px_0px_rgba(255,59,0,0.85)] focus:outline-none";

  const accentColor = isCrimson ? "text-[#FF453A]" : isSignal ? "text-[#FF4FA3]" : "text-[#FF3B00]";
  const accentBorder = isCrimson ? "border-[#D41514]" : isSignal ? "border-[#6938FF]" : "border-[#FF3B00]";
  const accentBgLight = isCrimson ? "bg-[#D41514]/15" : isSignal ? "bg-[#FF4FA3]/20" : "bg-[#FF3B00]/10";
  const closeBtnHover = isCrimson
    ? "hover:bg-[#D41514] hover:text-white"
    : isSignal
    ? "hover:bg-[#FF4FA3] hover:text-[#1B1020]"
    : "hover:bg-[#FF3B00] hover:text-black";
  const linkHoverBorder = isCrimson
    ? "hover:border-[#FF453A]"
    : isSignal
    ? "hover:border-[#C6FF00]"
    : "hover:border-[#FF3B00]";
  const linkHoverText = isCrimson
    ? "group-hover:text-[#FFFFFF]"
    : isSignal
    ? "group-hover:text-[#C6FF00]"
    : "group-hover:text-[#CCFF00]";
  const linkHoverArrow = isCrimson
    ? "group-hover:text-[#FF453A]"
    : isSignal
    ? "group-hover:text-[#00E5D4]"
    : "group-hover:text-[#FF3B00]";
  const secondaryAccentColor = isCrimson
    ? "text-[#CDCBCA]"
    : isSignal
    ? "text-[#00E5D4]"
    : "text-[#CCFF00]";

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-menu-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={cardRef}
        className={dialogClass}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col p-4 sm:p-7 md:p-10 font-mono">
          {/* Top telemetry bar */}
          <div className="flex items-center justify-between border-b-2 border-[#262626] pb-3 mb-4 sm:mb-8">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <OmMonogram size={30} className={`border ${accentBorder} sm:w-9 sm:h-9`} />
              <div>
                <h2 id="command-menu-title" className="text-xs sm:text-sm font-bold tracking-widest text-inherit">
                  SYSTEM DIRECTORY // COMMAND OVERLAY
                </h2>
                <p className={`text-[10px] sm:text-[11px] ${isSignal ? "text-[#00E5D4] font-bold" : "opacity-70"}`}>
                  HEMANT BHOSALE — AI SYSTEMS ENGINEER
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className={`hidden sm:inline-block text-[10px] px-2 py-0.5 border ${
                  isSignal ? "text-[#D5C5D8] border-[#3F2746]" : "opacity-60 border-[#262626]"
                }`}
              >
                PRESS [ESC] TO DISMISS
              </span>
              <button
                type="button"
                onClick={onClose}
                className={`p-1.5 border ${accentBorder} ${accentBgLight} ${closeBtnHover} transition-colors cursor-pointer`}
                aria-label="Close Command Menu"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Main Navigation Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5 md:gap-8 md:mb-8">
            {/* Primary Routes */}
            <div className="md:col-span-7 space-y-2 sm:space-y-3">
              <div className={`text-[10px] sm:text-[11px] ${accentColor} font-bold tracking-wider mb-1.5 sm:mb-2 flex items-center gap-2`}>
                <Compass className="w-3.5 h-3.5" />
                <span>PRIMARY VECTORS</span>
              </div>

              <nav className="flex flex-col space-y-1.5 sm:space-y-2" aria-label="Main Navigation">
                <Link
                  href="/"
                  onClick={onClose}
                  autoFocus
                  className={`group flex items-center justify-between p-2.5 sm:p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className={`${accentColor} text-xs font-bold`}>01 //</span>
                    <span className={`text-base sm:text-xl md:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                      HOME / INDEX
                    </span>
                  </div>
                  <ArrowUpRight className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6E6A61] ${linkHoverArrow} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                </Link>

                <Link
                  href="/about"
                  onClick={onClose}
                  className={`group flex items-center justify-between p-2.5 sm:p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className={`${accentColor} text-xs font-bold`}>02 //</span>
                    <span className={`text-base sm:text-xl md:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                      ABOUT / ARCHITECTURE
                    </span>
                  </div>
                  <User className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6E6A61] ${linkHoverArrow}`} />
                </Link>

                <Link
                  href="/projects"
                  onClick={onClose}
                  className={`group flex items-center justify-between p-2.5 sm:p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className={`${accentColor} text-xs font-bold`}>03 //</span>
                    <span className={`text-base sm:text-xl md:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                      PROJECTS / CASE STUDIES
                    </span>
                  </div>
                  <Layers className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6E6A61] ${linkHoverArrow}`} />
                </Link>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className={`group flex items-center justify-between p-2.5 sm:p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className={`${accentColor} text-xs font-bold`}>04 //</span>
                    <span className={`text-base sm:text-xl md:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                      CONTACT / DISPATCH
                    </span>
                  </div>
                  <Mail className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6E6A61] ${linkHoverArrow}`} />
                </Link>
              </nav>
            </div>

            {/* Quick Case Study Jumps */}
            <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-8">
              <div>
                <div className={`text-[10px] sm:text-[11px] ${secondaryAccentColor} font-bold tracking-wider mb-2 sm:mb-3 flex items-center gap-2`}>
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CASE STUDY DIRECT ACCESS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-1.5">
                  {projectsData.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      onClick={onClose}
                      className={`block p-2 border transition-all group ${
                        isSignal
                          ? "border-[#3F2746] bg-[#24162B] hover:border-[#C6FF00] hover:bg-[#2F1A38]"
                          : "border-[#1F1F1F] hover:border-[#CCFF00] hover:bg-[#171717]"
                      }`}
                    >
                      <div className={`flex items-center justify-between text-[11px] sm:text-xs font-bold text-inherit ${
                        isSignal ? "group-hover:text-[#C6FF00]" : "group-hover:text-[#CCFF00]"
                      }`}>
                        <span className="truncate mr-1">{project.number} — {project.title}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ${
                          isSignal ? "text-[#D5C5D8] group-hover:text-[#C6FF00]" : "text-[#6E6A61] group-hover:text-[#CCFF00]"
                        }`} />
                      </div>
                      <div className={`text-[9px] sm:text-[10px] truncate mt-0.5 ${
                        isSignal ? "text-[#D5C5D8]" : "opacity-70"
                      }`}>
                        {project.conceptTag}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Theme switcher row */}
              <div className="pt-3 border-t border-[#262626] mt-3 md:pt-4 md:mt-4">
                <div className={`text-[10px] ${accentColor} mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5`}>
                  <Palette className="w-3.5 h-3.5" />
                  <span>VISUAL THEME PRESET</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {THEMES.map((t) => (
                    <ThemePreviewOption
                      key={t.id}
                      themeMeta={t}
                      isSelected={theme === t.id}
                      onSelect={() => setTheme(t.id)}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>

              {/* Socials & telemetry */}
              <div className="pt-3 border-t border-[#262626] mt-3 md:pt-4 md:mt-4">
                <div className={`text-[10px] mb-1.5 font-bold uppercase tracking-wider ${
                  isSignal ? "text-[#00E5D4]" : "text-[#6E6A61]"
                }`}>
                  COMMUNICATION CHANNELS
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                  {socialsData.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-2 py-0.5 sm:py-1 border transition-colors ${
                        isSignal
                          ? "border-[#3F2746] bg-[#24162B] text-[#FFF0D1] hover:text-[#C6FF00] hover:border-[#C6FF00]"
                          : "border-[#262626] text-[#A39F94] hover:text-[#FF3B00] hover:border-[#FF3B00]"
                      }`}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer annotation */}
          <div className={`border-t border-[#262626] pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] gap-1 ${
            isSignal ? "text-[#D5C5D8]" : "text-[#6E6A61]"
          }`}>
            <span>LOC: 18.5204° N, 73.8567° E (IST)</span>
            <span>BRUTALIST SYSTEM ARCHITECTURE // v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
