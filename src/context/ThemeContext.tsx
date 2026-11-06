"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

export type Theme = "original" | "crimson-noir" | "signal-studio";

export interface ThemeMeta {
  id: Theme;
  name: string;
  tagline: string;
  bgPreview: string;
  fgPreview: string;
  accentPreview: string;
  secondaryPreview: string;
}

export const THEMES: ThemeMeta[] = [
  {
    id: "original",
    name: "ORIGINAL (DEFAULT)",
    tagline: "Industrial Paper & Electric Orange",
    bgPreview: "#F4F1EA",
    fgPreview: "#0D0D0D",
    accentPreview: "#FF3B00",
    secondaryPreview: "#CCFF00",
  },
  {
    id: "crimson-noir",
    name: "CRIMSON NOIR",
    tagline: "Obsidian Black & Laser Crimson",
    bgPreview: "#080808",
    fgPreview: "#CDCBCA",
    accentPreview: "#D41514",
    secondaryPreview: "#CDCBCA",
  },
  {
    id: "signal-studio",
    name: "SIGNAL STUDIO",
    tagline: "Deep Graphite, Sunshine & Indigo",
    bgPreview: "#F2F4F1",
    fgPreview: "#1C1D20",
    accentPreview: "#FFC928",
    secondaryPreview: "#4E50DE",
  },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "om_theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "original";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "crimson-noir" || saved === "signal-studio" || saved === "original") {
      return saved;
    }
  } catch {
    // Local storage unavailable
  }
  return "original";
}

const listeners = new Set<() => void>();

function emitThemeChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Theme {
  return getStoredTheme();
}

function getServerSnapshot(): Theme {
  return "original";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // noop
    }
    document.documentElement.setAttribute("data-theme", newTheme);
    emitThemeChange();
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
