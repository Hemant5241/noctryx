"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Terminal, Layers, Compass, Mail, User } from "lucide-react";
import { projectsData } from "@/data/projects";
import { socialsData } from "@/data/socials";
import { OmMonogram } from "@/components/brand/OmMonogram";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

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

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      aria-labelledby="command-menu-title"
      className="m-auto w-[92vw] max-w-4xl p-0 bg-[#0D0D0D] text-[#F4F1EA] border-2 border-[#FF3B00] shadow-[12px_12px_0px_0px_rgba(255,59,0,0.85)] backdrop:bg-black/75 backdrop:backdrop-blur-sm focus:outline-none"
      {...({ closedby: "any" } as Record<string, unknown>)}
    >
      <div className="relative flex flex-col p-6 sm:p-10 font-mono">
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between border-b-2 border-[#262626] pb-4 mb-8">
          <div className="flex items-center gap-3">
            <OmMonogram size={36} className="border border-[#FF3B00]" />
            <div>
              <h2 id="command-menu-title" className="text-sm font-bold tracking-widest text-[#F4F1EA]">
                SYSTEM DIRECTORY // COMMAND OVERLAY
              </h2>
              <p className="text-[11px] text-[#A39F94]">OM SHINDE — AI SYSTEMS ENGINEER</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[10px] text-[#6E6A61] border border-[#262626] px-2 py-0.5">
              PRESS [ESC] TO DISMISS
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-[#FF3B00] bg-[#FF3B00]/10 hover:bg-[#FF3B00] hover:text-black transition-colors"
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
            <div className="text-[11px] text-[#FF3B00] font-bold tracking-wider mb-2 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>PRIMARY VECTORS</span>
            </div>

            <nav className="flex flex-col space-y-2" aria-label="Main Navigation">
              <Link
                href="/"
                onClick={onClose}
                autoFocus
                className="group flex items-center justify-between p-3.5 border border-[#262626] hover:border-[#FF3B00] hover:bg-[#1A1A1A] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#FF3B00] text-xs font-bold">01 //</span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-[#CCFF00] transition-colors">
                    HOME / INDEX
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#6E6A61] group-hover:text-[#FF3B00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/about"
                onClick={onClose}
                className="group flex items-center justify-between p-3.5 border border-[#262626] hover:border-[#FF3B00] hover:bg-[#1A1A1A] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#FF3B00] text-xs font-bold">02 //</span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-[#CCFF00] transition-colors">
                    ABOUT / ARCHITECTURE
                  </span>
                </div>
                <User className="w-5 h-5 text-[#6E6A61] group-hover:text-[#FF3B00]" />
              </Link>

              <Link
                href="/projects"
                onClick={onClose}
                className="group flex items-center justify-between p-3.5 border border-[#262626] hover:border-[#FF3B00] hover:bg-[#1A1A1A] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#FF3B00] text-xs font-bold">03 //</span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-[#CCFF00] transition-colors">
                    PROJECTS / CASE STUDIES
                  </span>
                </div>
                <Layers className="w-5 h-5 text-[#6E6A61] group-hover:text-[#FF3B00]" />
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className="group flex items-center justify-between p-3.5 border border-[#262626] hover:border-[#FF3B00] hover:bg-[#1A1A1A] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#FF3B00] text-xs font-bold">04 //</span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-[#CCFF00] transition-colors">
                    CONTACT / DISPATCH
                  </span>
                </div>
                <Mail className="w-5 h-5 text-[#6E6A61] group-hover:text-[#FF3B00]" />
              </Link>
            </nav>
          </div>

          {/* Quick Case Study Jumps */}
          <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#262626] pt-6 md:pt-0 md:pl-8">
            <div>
              <div className="text-[11px] text-[#CCFF00] font-bold tracking-wider mb-3 flex items-center gap-2">
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
                    <div className="flex items-center justify-between text-xs font-bold text-[#F4F1EA] group-hover:text-[#CCFF00]">
                      <span>{project.number} — {project.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6E6A61] group-hover:text-[#CCFF00]" />
                    </div>
                    <div className="text-[10px] text-[#A39F94] truncate mt-0.5">
                      {project.conceptTag}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Socials & telemetry */}
            <div className="pt-4 border-t border-[#262626] mt-6">
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
