"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { ThemeMeta, Theme } from "@/context/ThemeContext";

export interface ThemePreviewOptionProps {
  themeMeta: ThemeMeta;
  isSelected: boolean;
  onSelect: () => void;
  variant: "dropdown" | "compact";
  className?: string;
}

/**
 * Shared styling configuration per theme identity.
 * Governs the visual personality in both ThemeSelector (dropdown) and CommandMenu (compact).
 */
const THEME_STYLES: Record<
  Theme,
  {
    shortName: string;
    compactPill: string;
    preview: {
      containerClass: string;
      containerStyle?: React.CSSProperties;
      titleClass: string;
      taglineClass: string;
      badgeClass: string;
      badgeLabel: string;
      checkClass: string;
      swatchBorderClass: string;
      previewTag: string;
    };
    selected: {
      containerClass: string;
      containerStyle?: React.CSSProperties;
      titleClass: string;
      taglineClass: string;
      badgeClass: string;
      checkClass: string;
      swatchBorderClass: string;
    };
    inactive: {
      dropdown: {
        containerClass: string;
        titleClass: string;
        taglineClass: string;
        badgeClass: string;
        swatchBorderClass: string;
      };
      compact: {
        containerClass: string;
        titleClass: string;
        badgeClass: string;
        swatchBorderClass: string;
      };
    };
  }
> = {
  original: {
    shortName: "ORIGINAL",
    compactPill: "BRUTAL",
    preview: {
      // Technical Brutalism: blueprint paper #F4F1EA, black ink #0D0D0D, electric orange #FF3B00 drop shadow
      containerClass:
        "bg-[#F4F1EA] text-[#0D0D0D] border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_#FF3B00] rounded-none -translate-y-0.5 motion-reduce:translate-none",
      titleClass: "text-[#0D0D0D] font-mono font-black uppercase tracking-tight",
      taglineClass: "text-[#0D0D0D]/85 font-mono",
      badgeClass:
        "bg-[#0D0D0D] text-[#CCFF00] border-2 border-[#0D0D0D] font-mono font-black",
      badgeLabel: "BRUTALISM",
      checkClass: "text-[#FF3B00]",
      swatchBorderClass: "border-2 border-[#0D0D0D]",
      previewTag: "// SYS-01: BRUTALIST GRID",
    },
    selected: {
      containerClass:
        "bg-[#0D0D0D] text-[#F4F1EA] border-2 border-[#0D0D0D] shadow-[3px_3px_0px_0px_#FF3B00] rounded-none",
      titleClass: "text-[#F4F1EA] font-mono font-black uppercase tracking-tight",
      taglineClass: "text-[#A39F94] font-mono",
      badgeClass:
        "text-[#CCFF00] border border-[#FF3B00] bg-[#FF3B00]/20 font-mono font-bold",
      checkClass: "text-[#CCFF00]",
      swatchBorderClass: "border border-[#F4F1EA]/60",
    },
    inactive: {
      dropdown: {
        containerClass:
          "bg-[#F4F1EA]/90 text-[#0D0D0D] border-2 border-[#0D0D0D]/25 hover:border-[#0D0D0D] rounded-none",
        titleClass: "text-[#0D0D0D] font-mono font-black uppercase tracking-tight",
        taglineClass: "text-[#0D0D0D]/70 font-mono",
        badgeClass:
          "text-[#FF3B00] border border-[#FF3B00]/40 bg-[#FF3B00]/10 font-mono font-bold",
        swatchBorderClass: "border border-[#0D0D0D]/40",
      },
      compact: {
        containerClass:
          "border border-[#262626] bg-[#141414] text-[#A39F94] rounded-none",
        titleClass: "text-[#DCDAD8] font-mono font-bold uppercase",
        badgeClass: "text-[#888888] bg-white/5 border border-white/10 font-mono",
        swatchBorderClass: "border border-black/40",
      },
    },
  },
  "crimson-noir": {
    shortName: "CRIMSON",
    compactPill: "NOIR",
    preview: {
      // Cinematic Luxury: Obsidian #0C0C0E, chrome white #FFFFFF, laser crimson #D41514 glow & spotlight
      containerClass:
        "bg-[#0C0C0E] text-[#FFFFFF] border border-[#D41514] shadow-[0_0_20px_rgba(212,21,20,0.45),inset_0_0_12px_rgba(212,21,20,0.15)] rounded-[2px] -translate-y-0.5 motion-reduce:translate-none",
      containerStyle: {
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(212,21,20,0.32) 0%, rgba(12,12,14,0.95) 75%)",
      },
      titleClass: "text-[#FFFFFF] font-mono font-bold uppercase tracking-wider",
      taglineClass: "text-[#CDCBCA] font-mono",
      badgeClass:
        "text-[#FF453A] border border-[#D41514] bg-[#D41514]/25 shadow-[0_0_12px_rgba(212,21,20,0.45)] font-mono font-bold",
      badgeLabel: "CINEMATIC",
      checkClass: "text-[#FF453A]",
      swatchBorderClass: "border border-[#D41514]/70",
      previewTag: "// SYS-02: LASER CRIMSON",
    },
    selected: {
      containerClass:
        "bg-[#141418] text-[#FFFFFF] border border-[#D41514] shadow-[0_0_16px_rgba(212,21,20,0.35)] rounded-[2px]",
      containerStyle: {
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(212,21,20,0.18) 0%, rgba(20,20,24,0.95) 75%)",
      },
      titleClass: "text-[#FFFFFF] font-mono font-bold uppercase tracking-wider",
      taglineClass: "text-[#DCDAD8] font-mono",
      badgeClass:
        "text-[#FF453A] border border-[#D41514]/50 bg-[#D41514]/15 shadow-[0_0_8px_rgba(212,21,20,0.3)] font-mono font-bold",
      checkClass: "text-[#FF453A]",
      swatchBorderClass: "border border-[#D41514]/50",
    },
    inactive: {
      dropdown: {
        containerClass:
          "bg-[#0C0C0E] text-[#CDCBCA] border border-[#26262c] rounded-[2px]",
        titleClass: "text-[#CDCBCA] font-mono font-bold uppercase tracking-wider",
        taglineClass: "text-[#9E9C9A] font-mono",
        badgeClass:
          "text-[#FF453A] border border-[#D41514]/40 bg-[#D41514]/10 font-mono font-bold",
        swatchBorderClass: "border border-black/40",
      },
      compact: {
        containerClass:
          "border border-[#262626] bg-[#141414] text-[#A39F94] rounded-[2px]",
        titleClass: "text-[#CDCBCA] font-mono font-bold uppercase",
        badgeClass: "text-[#888888] bg-white/5 border border-white/10 font-mono",
        swatchBorderClass: "border border-black/40",
      },
    },
  },
  "signal-studio": {
    shortName: "SIGNAL",
    compactPill: "ACID POP",
    preview: {
      // Experimental Acid Pop: Warm vanilla #FFF0D1, deep ink #1B1020, dual-tone pop shadow, acid lime #C6FF00
      containerClass:
        "bg-[#FFF0D1] text-[#1B1020] border-2 border-[#1B1020] shadow-[3px_3px_0px_0px_#6938FF,5px_5px_0px_0px_#FF4FA3] rounded-sm -translate-y-0.5 motion-reduce:translate-none",
      titleClass: "text-[#1B1020] font-mono font-black uppercase tracking-tight",
      taglineClass: "text-[#3D2644] font-mono font-medium",
      badgeClass:
        "bg-[#C6FF00] text-[#1B1020] border-2 border-[#1B1020] shadow-[1.5px_1.5px_0px_0px_#1B1020] font-mono font-black",
      badgeLabel: "ACID POP",
      checkClass: "text-[#FF4FA3]",
      swatchBorderClass:
        "border-2 border-[#1B1020] shadow-[1px_1px_0px_0px_#1B1020]",
      previewTag: "// SYS-03: EXPERIMENTAL ATELIER",
    },
    selected: {
      containerClass:
        "bg-[#1B1020] text-[#FFF0D1] border-2 border-[#6938FF] shadow-[4px_4px_0px_0px_#FF4FA3] rounded-sm",
      titleClass: "text-[#FFF0D1] font-mono font-black uppercase tracking-tight",
      taglineClass: "text-[#D5C5D8] font-mono",
      badgeClass:
        "bg-[#C6FF00] text-[#1B1020] border border-[#1B1020] font-mono font-black",
      checkClass: "text-[#C6FF00]",
      swatchBorderClass: "border border-[#C6FF00]/80",
    },
    inactive: {
      dropdown: {
        containerClass:
          "bg-[#FFF0D1]/90 text-[#1B1020] border-2 border-[#1B1020]/30 rounded-sm",
        titleClass: "text-[#1B1020] font-mono font-black uppercase tracking-tight",
        taglineClass: "text-[#543D5B] font-mono",
        badgeClass:
          "text-[#1B1020] bg-[#C6FF00] border border-[#1B1020] font-mono font-black",
        swatchBorderClass: "border border-black/40",
      },
      compact: {
        containerClass:
          "border border-[#262626] bg-[#141414] text-[#A39F94] rounded-sm",
        titleClass: "text-[#FFF0D1] font-mono font-bold uppercase",
        badgeClass: "text-[#888888] bg-white/5 border border-white/10 font-mono",
        swatchBorderClass: "border border-black/40",
      },
    },
  },
};

/**
 * ThemePreviewOption
 * Unified interactive theme preview option for both Navbar ThemeSelector and CommandMenu.
 *
 * Hover & Focus Behavior:
 * - Hovering or focusing transforms this individual card to preview the corresponding theme's
 *   authentic colors, borders, shadows, and typography.
 * - Local isolated state: the website's global theme and other cards are NEVER altered on hover.
 * - Moving the pointer away smoothly restores default appearance via CSS transitions.
 * - Clicking firmly activates the theme globally.
 */
export function ThemePreviewOption({
  themeMeta,
  isSelected,
  onSelect,
  variant,
  className = "",
}: ThemePreviewOptionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPreviewing = isHovered || isFocused;
  const config = THEME_STYLES[themeMeta.id];

  const handleClick = () => {
    setIsHovered(false);
    setIsFocused(false);
    onSelect();
  };

  // Determine active visual styles based on preview -> selected -> inactive hierarchy
  let containerClasses = "";
  let containerStyle: React.CSSProperties | undefined = undefined;
  let titleClass = "";
  let taglineClass = "";
  let badgeClass = "";
  let badgeLabel = themeMeta.pill;
  let checkClass = config.preview.checkClass;
  let swatchBorderClass = "border border-black/40";
  const previewTag = config.preview.previewTag;

  if (isPreviewing) {
    containerClasses = config.preview.containerClass;
    containerStyle = config.preview.containerStyle;
    titleClass = config.preview.titleClass;
    taglineClass = config.preview.taglineClass;
    badgeClass = config.preview.badgeClass;
    badgeLabel = config.preview.badgeLabel;
    checkClass = config.preview.checkClass;
    swatchBorderClass = config.preview.swatchBorderClass;
  } else if (isSelected) {
    containerClasses = config.selected.containerClass;
    containerStyle = config.selected.containerStyle;
    titleClass = config.selected.titleClass;
    taglineClass = config.selected.taglineClass;
    badgeClass = config.selected.badgeClass;
    checkClass = config.selected.checkClass;
    swatchBorderClass = config.selected.swatchBorderClass;
  } else if (variant === "dropdown") {
    const inactiveStyle = config.inactive.dropdown;
    containerClasses = inactiveStyle.containerClass;
    titleClass = inactiveStyle.titleClass;
    taglineClass = inactiveStyle.taglineClass;
    badgeClass = inactiveStyle.badgeClass;
    swatchBorderClass = inactiveStyle.swatchBorderClass;
  } else {
    const inactiveStyle = config.inactive.compact;
    containerClasses = inactiveStyle.containerClass;
    titleClass = inactiveStyle.titleClass;
    taglineClass = "";
    badgeClass = inactiveStyle.badgeClass;
    swatchBorderClass = inactiveStyle.swatchBorderClass;
  }

  // --- Variant 1: Compact (CommandMenu 3-column matrix) ---
  if (variant === "compact") {
    return (
      <button
        type="button"
        role="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label={`Theme preset ${themeMeta.name}${
          isSelected ? " (Currently active)" : ""
        }`}
        className={`p-2.5 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B00] relative overflow-hidden select-none ${containerClasses} ${className}`}
        style={containerStyle}
      >
        {/* Header row: Short name + Selected check */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className={`text-[10px] font-black uppercase tracking-tight truncate ${titleClass}`}>
            {config.shortName}
          </span>
          {isSelected ? (
            <Check className={`w-3.5 h-3.5 shrink-0 ${checkClass}`} />
          ) : isPreviewing ? (
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                themeMeta.id === "signal-studio"
                  ? "bg-[#FF4FA3]"
                  : themeMeta.id === "crimson-noir"
                  ? "bg-[#FF453A]"
                  : "bg-[#FF3B00]"
              }`}
            />
          ) : null}
        </div>

        {/* Pill descriptor */}
        <div className="mb-2">
          <span
            className={`text-[8px] font-bold px-1 py-0.2 tracking-wider uppercase inline-block ${badgeClass}`}
          >
            {config.compactPill}
          </span>
        </div>

        {/* Swatch palette preview */}
        <div className="flex items-center gap-1">
          <span
            className={`w-2 h-2 ${swatchBorderClass}`}
            style={{ backgroundColor: themeMeta.bgPreview }}
            aria-hidden="true"
            title="Background"
          />
          <span
            className={`w-2 h-2 ${swatchBorderClass}`}
            style={{ backgroundColor: themeMeta.accentPreview }}
            aria-hidden="true"
            title="Accent"
          />
          <span
            className={`w-2 h-2 ${swatchBorderClass}`}
            style={{ backgroundColor: themeMeta.secondaryPreview }}
            aria-hidden="true"
            title="Secondary"
          />
        </div>
      </button>
    );
  }

  // --- Variant 2: Dropdown (Navbar ThemeSelector listbox) ---
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={`Visual theme: ${themeMeta.name}. ${themeMeta.tagline}${
        isSelected ? " (Currently active)" : ""
      }`}
      className={`w-full text-left p-3 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B00] relative overflow-hidden select-none ${containerClasses} ${className}`}
      style={containerStyle}
    >
      <div className="space-y-1.5">
        {/* Top Header: Theme Name + Check Icon + Pill Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-xs font-black uppercase tracking-tight truncate ${titleClass}`}>
              {themeMeta.name}
            </span>
            {isSelected && (
              <Check className={`w-3.5 h-3.5 shrink-0 ${checkClass}`} />
            )}
          </div>
          <span
            className={`text-[9px] px-1.5 py-0.5 tracking-wider shrink-0 uppercase ${badgeClass}`}
          >
            {badgeLabel}
          </span>
        </div>

        {/* Tagline Description */}
        <div className={`text-[10px] leading-snug ${taglineClass}`}>
          {themeMeta.tagline}
        </div>

        {/* Bottom Bar: 4-Color Swatch Palette + Live Status Indicator */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-3.5 h-3.5 shadow-xs ${swatchBorderClass}`}
              style={{ backgroundColor: themeMeta.bgPreview }}
              title="Canvas Background"
            />
            <span
              className={`w-3.5 h-3.5 shadow-xs ${swatchBorderClass}`}
              style={{ backgroundColor: themeMeta.fgPreview }}
              title="Primary Ink"
            />
            <span
              className={`w-3.5 h-3.5 shadow-xs ${swatchBorderClass}`}
              style={{ backgroundColor: themeMeta.accentPreview }}
              title="Primary Accent"
            />
            <span
              className={`w-3.5 h-3.5 shadow-xs ${swatchBorderClass}`}
              style={{ backgroundColor: themeMeta.secondaryPreview }}
              title="Secondary Accent"
            />
          </div>

          {/* Right Status Label */}
          {isPreviewing ? (
            <span className={`text-[8.5px] font-mono font-bold tracking-wider opacity-90 ${titleClass}`}>
              {previewTag}
            </span>
          ) : isSelected ? (
            <span className={`text-[8.5px] font-mono font-bold tracking-wider opacity-75 ${titleClass}`}>
              [ACTIVE PRESET]
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
