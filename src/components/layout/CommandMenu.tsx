"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Terminal, Layers, Compass, Mail, User, Palette } from "lucide-react";
import { projectsData } from "@/data/projects";
import { socialsData } from "@/data/socials";
import { OmMonogram } from "@/components/brand/OmMonogram";
import { useTheme, THEMES } from "@/context/ThemeContext";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native cancel / close
  const handleDialogClose = () => {
    onClose();
  };

  // Light dismiss fallback for click outside dialog content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const isCrimson = theme === "crimson-noir";
  const isSignal = theme === "signal-studio";

  const dialogClass = isCrimson
    ? "m-auto w-[92vw] max-w-4xl p-0 bg-[#0A0A0C] text-[#CDCBCA] border border-[#D41514]/60 shadow-[0_0_50px_rgba(212,21,20,0.35),0_20px_40px_rgba(0,0,0,0.95)] backdrop:bg-black/80 backdrop:backdrop-blur-md focus:outline-none rounded-sm"
    : isSignal
    ? "m-auto w-[92vw] max-w-4xl p-0 bg-[#1B1020] text-[#FFF0D1] border-3 border-[#6938FF] shadow-[10px_10px_0px_0px_#FF4FA3,14px_14px_0px_0px_#C6FF00] backdrop:bg-black/80 backdrop:backdrop-blur-md focus:outline-none rounded-sm"
    : "m-auto w-[92vw] max-w-4xl p-0 bg-[#0D0D0D] text-[#F4F1EA] border-2 border-[#FF3B00] shadow-[12px_12px_0px_0px_rgba(255,59,0,0.85)] backdrop:bg-black/75 backdrop:backdrop-blur-sm focus:outline-none";

  const accentColor = isCrimson ? "text-[#FF453A]" : isSignal ? "text-[#FF4FA3]" : "text-[#FF3B00]";
  const accentBorder = isCrimson ? "border-[#D41514]" : isSignal ? "border-[#6938FF]" : "border-[#FF3B00]";
  const accentBgLight = isCrimson ? "bg-[#D41514]/15" : isSignal ? "bg-[#FF4FA3]/20" : "bg-[#FF3B00]/10";
  const closeBtnHover = isCrimson ? "hover:bg-[#D41514] hover:text-white" : isSignal ? "hover:bg-[#FF4FA3] hover:text-[#1B1020]" : "hover:bg-[#FF3B00] hover:text-black";
  const linkHoverBorder = isCrimson ? "hover:border-[#FF453A]" : isSignal ? "hover:border-[#C6FF00]" : "hover:border-[#FF3B00]";
  const linkHoverText = isCrimson ? "group-hover:text-[#FFFFFF]" : isSignal ? "group-hover:text-[#C6FF00]" : "group-hover:text-[#CCFF00]";
  const linkHoverArrow = isCrimson ? "group-hover:text-[#FF453A]" : isSignal ? "group-hover:text-[#00E5D4]" : "group-hover:text-[#FF3B00]";
  const secondaryAccentColor = isCrimson ? "text-[#CDCBCA]" : isSignal ? "text-[#00E5D4]" : "text-[#CCFF00]";

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      aria-labelledby="command-menu-title"
      className={dialogClass}
      {...({ closedby: "any" } as Record<string, unknown>)}
    >
      <div className="relative flex flex-col p-6 sm:p-10 font-mono">
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between border-b-2 border-[#262626] pb-4 mb-8">
          <div className="flex items-center gap-3">
            <OmMonogram size={36} className={`border ${accentBorder}`} />
            <div>
              <h2 id="command-menu-title" className="text-sm font-bold tracking-widest text-inherit">
                SYSTEM DIRECTORY // COMMAND OVERLAY
              </h2>
              <p className="text-[11px] opacity-70">OM SHINDE — AI SYSTEMS ENGINEER</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[10px] opacity-60 border border-[#262626] px-2 py-0.5">
              PRESS [ESC] TO DISMISS
            </span>
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 border ${accentBorder} ${accentBgLight} ${closeBtnHover} transition-colors cursor-pointer`}
              aria-label="Close Command Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Navigation Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Primary Routes */}
          <div className="md:col-span-7 space-y-3">
            <div className={`text-[11px] ${accentColor} font-bold tracking-wider mb-2 flex items-center gap-2`}>
              <Compass className="w-3.5 h-3.5" />
              <span>PRIMARY VECTORS</span>
            </div>

            <nav className="flex flex-col space-y-2" aria-label="Main Navigation">
              <Link
                href="/"
                onClick={onClose}
                autoFocus
                className={`group flex items-center justify-between p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${accentColor} text-xs font-bold`}>01 //</span>
                  <span className={`text-xl sm:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                    HOME / INDEX
                  </span>
                </div>
                <ArrowUpRight className={`w-5 h-5 text-[#6E6A61] ${linkHoverArrow} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
              </Link>

              <Link
                href="/about"
                onClick={onClose}
                className={`group flex items-center justify-between p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${accentColor} text-xs font-bold`}>02 //</span>
                  <span className={`text-xl sm:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                    ABOUT / ARCHITECTURE
                  </span>
                </div>
                <User className={`w-5 h-5 text-[#6E6A61] ${linkHoverArrow}`} />
              </Link>

              <Link
                href="/projects"
                onClick={onClose}
                className={`group flex items-center justify-between p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${accentColor} text-xs font-bold`}>03 //</span>
                  <span className={`text-xl sm:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                    PROJECTS / CASE STUDIES
                  </span>
                </div>
                <Layers className={`w-5 h-5 text-[#6E6A61] ${linkHoverArrow}`} />
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className={`group flex items-center justify-between p-3.5 border border-[#262626] ${linkHoverBorder} hover:bg-[#1A1A1A] transition-all`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${accentColor} text-xs font-bold`}>04 //</span>
                  <span className={`text-xl sm:text-2xl font-black tracking-tight ${linkHoverText} transition-colors`}>
                    CONTACT / DISPATCH
                  </span>
                </div>
                <Mail className={`w-5 h-5 text-[#6E6A61] ${linkHoverArrow}`} />
              </Link>
            </nav>
          </div>

          {/* Quick Case Study Jumps */}
          <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#262626] pt-6 md:pt-0 md:pl-8">
            <div>
              <div className={`text-[11px] ${secondaryAccentColor} font-bold tracking-wider mb-3 flex items-center gap-2`}>
                <Terminal className="w-3.5 h-3.5" />
                <span>CASE STUDY DIRECT ACCESS</span>
              </div>
              <div className="space-y-2">
                {projectsData.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    onClick={onClose}
                    className="block p-2 border border-[#1F1F1F] hover:border-[#CCFF00] hover:bg-[#171717] transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-inherit group-hover:text-[#CCFF00]">
                      <span>{project.number} — {project.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6E6A61] group-hover:text-[#CCFF00]" />
                    </div>
                    <div className="text-[10px] opacity-70 truncate mt-0.5">
                      {project.conceptTag}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Theme switcher row */}
            <div className="pt-4 border-t border-[#262626] mt-4">
              <div className={`text-[10px] ${accentColor} mb-2 font-bold uppercase tracking-wider flex items-center gap-1.5`}>
                <Palette className="w-3.5 h-3.5" />
                <span>VISUAL THEME PRESET</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {THEMES.map((t) => {
                  const isCurrent = theme === t.id;
                  const activeClass = isCrimson
                    ? "bg-[#D41514] text-white border-[#D41514]"
                    : isSignal
                    ? "bg-[#FF4FA3] text-[#1B1020] border-[#FF4FA3] font-black shadow-[2px_2px_0px_0px_#C6FF00]"
                    : "bg-[#FF3B00] text-white border-[#FF3B00]";
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`p-2 border text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? activeClass
                          : "border-[#262626] bg-[#141414] text-[#A39F94] hover:text-white"
                      }`}
                    >
                      <div className="text-[9px] font-black uppercase truncate">{t.name.split(" ")[0]}</div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="w-2 h-2 border border-black/40" style={{ backgroundColor: t.bgPreview }} />
                        <span className="w-2 h-2 border border-black/40" style={{ backgroundColor: t.accentPreview }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Socials & telemetry */}
            <div className="pt-4 border-t border-[#262626] mt-4">
              <div className="text-[10px] text-[#6E6A61] mb-2 font-bold uppercase tracking-wider">
                COMMUNICATION CHANNELS
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {socialsData.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 border border-[#262626] text-[#A39F94] hover:text-[#FF3B00] hover:border-[#FF3B00] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer annotation */}
        <div className="border-t border-[#262626] pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6E6A61]">
          <span>LOC: 18.5204° N, 73.8567° E (IST)</span>
          <span>BRUTALIST SYSTEM ARCHITECTURE // v1.0.0</span>
        </div>
      </div>
    </dialog>
  );
}
