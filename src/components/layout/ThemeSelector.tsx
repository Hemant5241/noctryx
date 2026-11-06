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

  return (
    <div ref={containerRef} className={`relative font-mono select-none ${className}`}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Theme selector. Current theme: ${activeThemeMeta.name}`}
        className="inline-flex items-center gap-2 px-2.5 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-all text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
      >
        <Palette className="w-3.5 h-3.5 text-[#FF3B00]" />

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
          <span className="hidden lg:inline text-[10px] font-bold tracking-tight">
            THEME: {activeThemeMeta.name}
          </span>
        )}

        <ChevronDown
          className={`w-3 h-3 text-black/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Available visual themes"
          className="absolute right-0 mt-2 w-72 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50 p-2 space-y-1.5 focus:outline-none"
        >
          <div className="px-2 py-1.5 border-b border-black/15 text-[10px] font-bold text-black/60 uppercase flex items-center justify-between">
            <span>SELECT THEME PRESET</span>
            <span className="text-[#FF3B00]">[03 THEMES]</span>
          </div>

          {THEMES.map((t) => {
            const isSelected = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(t.id)}
                className={`w-full text-left p-2.5 border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-black text-[#F4F1EA] border-black shadow-[2px_2px_0px_0px_rgba(255,59,0,1)]"
                    : "bg-[#F4F1EA] text-black border-black/20 hover:border-black hover:bg-white"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-tight">
                      {t.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#CCFF00]" />}
                  </div>
                  <div
                    className={`text-[10px] ${
                      isSelected ? "text-[#A39F94]" : "text-black/60"
                    }`}
                  >
                    {t.tagline}
                  </div>

                  {/* Swatch palette row */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span
                      className="w-3 h-3 border border-black/50"
                      style={{ backgroundColor: t.bgPreview }}
                      title="Canvas Background"
                    />
                    <span
                      className="w-3 h-3 border border-black/50"
                      style={{ backgroundColor: t.fgPreview }}
                      title="Primary Ink"
                    />
                    <span
                      className="w-3 h-3 border border-black/50"
                      style={{ backgroundColor: t.accentPreview }}
                      title="Primary Accent"
                    />
                    <span
                      className="w-3 h-3 border border-black/50"
                      style={{ backgroundColor: t.secondaryPreview }}
                      title="Secondary Accent"
                    />
                  </div>
                </div>

                <div className="text-[9px] font-mono font-bold shrink-0">
                  {t.id === "original" && (
                    <span className="text-[#FF3B00] border border-[#FF3B00]/40 px-1 py-0.2">
                      DEFAULT
                    </span>
                  )}
                  {t.id === "crimson-noir" && (
                    <span className="text-[#D41514] border border-[#D41514]/40 px-1 py-0.2">
                      DARK
                    </span>
                  )}
                  {t.id === "signal-studio" && (
                    <span className="text-[#4E50DE] border border-[#4E50DE]/40 px-1 py-0.2">
                      STUDIO
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-1 border-t border-black/15 px-2 text-[9px] text-black/50 font-mono">
            PERSISTED IN LOCALSTORAGE // ZERO FOUC
          </div>
        </div>
      )}
    </div>
  );
}
