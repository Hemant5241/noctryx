"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, ChevronDown } from "lucide-react";
import { useTheme, THEMES, Theme } from "@/context/ThemeContext";
import { ThemePreviewOption } from "@/components/theme/ThemePreviewOption";

interface ThemeSelectorProps {
  compact?: boolean;
  className?: string;
}

export function ThemeSelector({ compact = false, className = "" }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeThemeMeta = THEMES.find((t) => t.id === theme) || THEMES[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (themeId: Theme) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // Theme-tailored toggle trigger styles
  let triggerBtnClass = "border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  let triggerIconClass = "text-[#FF3B00]";
  let dropdownClass = "border-2 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
  let dropdownTitleClass = "border-b border-black/15 text-black/60";
  let dropdownTagClass = "text-[#FF3B00]";
  let footerNoteClass = "border-t border-black/15 text-black/50";

  if (theme === "crimson-noir") {
    triggerBtnClass = "border border-[#33333d] bg-[#121216] text-[#CDCBCA] hover:border-[#D41514] hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.6)] rounded-[2px]";
    triggerIconClass = "text-[#FF453A]";
    dropdownClass = "border border-[#2a2a34] bg-[#0E0E12] text-[#CDCBCA] shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(212,21,20,0.15)] rounded-[2px]";
    dropdownTitleClass = "border-b border-[#202028] text-[#9A9896]";
    dropdownTagClass = "text-[#FF453A]";
    footerNoteClass = "border-t border-[#202028] text-[#9A9896]";
  } else if (theme === "signal-studio") {
    triggerBtnClass = "border-2 border-[#1B1020] bg-[#FFFAEC] text-[#1B1020] hover:bg-[#C6FF00] hover:text-[#1B1020] shadow-[3px_3px_0px_0px_#6938FF] rounded-sm font-black";
    triggerIconClass = "text-[#FF4FA3]";
    dropdownClass = "border-3 border-[#1B1020] bg-[#FFFAEC] text-[#1B1020] shadow-[8px_8px_0px_0px_#6938FF,12px_12px_0px_0px_#FF4FA3] rounded-md";
    dropdownTitleClass = "border-b-2 border-[#1B1020]/20 text-[#543D5B]";
    dropdownTagClass = "text-[#6938FF] font-black";
    footerNoteClass = "border-t border-[#1B1020]/20 text-[#543D5B]";
  }

  return (
    <div ref={containerRef} className={`relative font-mono select-none ${className}`}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Theme selector. Current theme: ${activeThemeMeta.name}`}
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 transition-all text-xs font-bold active:translate-x-0.5 active:translate-y-0.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF3B00] ${triggerBtnClass}`}
      >
        <Palette className={`w-3.5 h-3.5 ${triggerIconClass}`} />

        {/* Color preview swatch dots */}
        <span className="flex items-center gap-1 border border-black/30 p-0.5 bg-[#F4F1EA]">
          <span
            className="w-2.5 h-2.5 border border-black/40"
            style={{ backgroundColor: activeThemeMeta.bgPreview }}
            aria-hidden="true"
          />
          <span
            className="w-2.5 h-2.5 border border-black/40"
            style={{ backgroundColor: activeThemeMeta.accentPreview }}
            aria-hidden="true"
          />
        </span>

        {!compact && (
          <span className="hidden lg:inline text-[10px] font-bold tracking-tight text-inherit">
            THEME: {activeThemeMeta.name}
          </span>
        )}

        <ChevronDown
          className={`w-3 h-3 text-inherit opacity-75 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Available visual themes"
          className={`absolute right-0 mt-2 w-76 z-50 p-2 space-y-1.5 focus:outline-none ${dropdownClass}`}
        >
          <div className={`px-2 py-1.5 text-[10px] font-bold uppercase flex items-center justify-between ${dropdownTitleClass}`}>
            <span>SELECT THEME PRESET</span>
            <span className={dropdownTagClass}>[03 THEMES]</span>
          </div>

          {THEMES.map((t) => (
            <ThemePreviewOption
              key={t.id}
              themeMeta={t}
              isSelected={t.id === theme}
              onSelect={() => handleSelect(t.id)}
              variant="dropdown"
            />
          ))}

          <div className={`pt-1 px-2 text-[9px] font-mono ${footerNoteClass}`}>
            PERSISTED IN LOCALSTORAGE // ZERO FOUC
          </div>
        </div>
      )}
    </div>
  );
}
