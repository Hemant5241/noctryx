"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check, ChevronDown } from "lucide-react";
import { useTheme, THEMES, Theme } from "@/context/ThemeContext";

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

          {THEMES.map((t) => {
            const isSelected = t.id === theme;

            // Distinctive styling per theme personality
            let cardClass = "";
            let checkColor = "text-[#CCFF00]";
            let badgeClass = "";
            let taglineClass = "text-black/70";

            if (t.id === "original") {
              cardClass = isSelected
                ? "bg-[#0D0D0D] text-[#F4F1EA] border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,59,0,1)]"
                : "bg-[#F4F1EA] text-[#0D0D0D] border-2 border-black/25 hover:border-black hover:bg-white";
              checkColor = "text-[#CCFF00]";
              badgeClass = "text-[#FF3B00] border border-[#FF3B00]/40 bg-[#FF3B00]/10";
              taglineClass = isSelected ? "text-[#A39F94]" : "text-black/70";
            } else if (t.id === "crimson-noir") {
              cardClass = isSelected
                ? "bg-[#141418] text-[#FFFFFF] border border-[#D41514] shadow-[0_0_18px_rgba(212,21,20,0.35)]"
                : "bg-[#0C0C0E] text-[#CDCBCA] border border-[#26262c] hover:border-[#D41514]/60 hover:bg-[#121216]";
              checkColor = "text-[#FF453A]";
              badgeClass = "text-[#FF453A] border border-[#D41514]/50 bg-[#D41514]/15 shadow-[0_0_8px_rgba(212,21,20,0.3)]";
              taglineClass = isSelected ? "text-[#DCDAD8]" : "text-[#9E9C9A]";
            } else if (t.id === "signal-studio") {
              cardClass = isSelected
                ? "bg-[#1B1020] text-[#FFF0D1] border-2 border-[#6938FF] shadow-[4px_4px_0px_0px_#FF4FA3] rounded-sm"
                : "bg-[#FFF0D1] text-[#1B1020] border-2 border-[#1B1020]/30 hover:border-[#1B1020] hover:bg-white rounded-sm";
              checkColor = "text-[#C6FF00]";
              badgeClass = "text-[#1B1020] bg-[#C6FF00] border border-[#1B1020] rounded-sm font-black";
              taglineClass = isSelected ? "text-[#D5C5D8]" : "text-[#543D5B]";
            }

            return (
              <button
                key={t.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(t.id)}
                className={`w-full text-left p-2.5 transition-all flex items-start justify-between gap-3 cursor-pointer ${cardClass}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-tight">
                      {t.name}
                    </span>
                    {isSelected && <Check className={`w-3.5 h-3.5 ${checkColor}`} />}
                  </div>
                  <div className={`text-[10px] ${taglineClass}`}>
                    {t.tagline}
                  </div>

                  {/* Swatch palette row */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span
                      className="w-3.5 h-3.5 border border-black/40 shadow-xs"
                      style={{ backgroundColor: t.bgPreview }}
                      title="Canvas Background"
                    />
                    <span
                      className="w-3.5 h-3.5 border border-black/40 shadow-xs"
                      style={{ backgroundColor: t.fgPreview }}
                      title="Primary Ink"
                    />
                    <span
                      className="w-3.5 h-3.5 border border-black/40 shadow-xs"
                      style={{ backgroundColor: t.accentPreview }}
                      title="Primary Accent"
                    />
                    <span
                      className="w-3.5 h-3.5 border border-black/40 shadow-xs"
                      style={{ backgroundColor: t.secondaryPreview }}
                      title="Secondary Accent"
                    />
                  </div>
                </div>

                <div className="text-[9px] font-mono font-bold shrink-0">
                  <span className={`px-1.5 py-0.5 tracking-wider ${badgeClass}`}>
                    {t.pill}
                  </span>
                </div>
              </button>
            );
          })}

          <div className={`pt-1 px-2 text-[9px] font-mono ${footerNoteClass}`}>
            PERSISTED IN LOCALSTORAGE // ZERO FOUC
          </div>
        </div>
      )}
    </div>
  );
}
