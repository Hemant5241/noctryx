/**
 * =============================================================================
 * PROFILE DATA CONFIGURATION — HEMANT BHOSALE
 * =============================================================================
 * 
 * IMPORTANT NOTE FOR RECRUITERS & REVIEWERS:
 * This data structure centralizes Hemant Bhosale's portfolio identity.
 * Unverified personal specifics are marked as editable placeholders.
 * Hemant can directly edit this file to personalize all portfolio copy.
 * =============================================================================
 */

export interface ProfileData {
  name: string;
  wordmark: string;
  role: string;
  tagline: string;
  headline: string;
  shortBio: string;
  manifesto: string[];
  location: {
    city: string;
    country: string;
    timezone: string;
    utcOffset: string;
    coordinates: string;
    isVerifiedRegion: boolean;
  };
  availability: {
    status: "available" | "limited" | "unavailable";
    statusText: string;
    notice: string;
  };
  stats: Array<{
    label: string;
    value: string;
    unit?: string;
    isSimulated?: boolean;
    description: string;
  }>;
  editorialTags: string[];
}

export const profileData: ProfileData = {
  name: "Hemant Bhosale",
  wordmark: "HEMANT BHOSALE // 01",
  role: "Full Stack Developer",
  tagline: "ENGINEERING MODERN FULL-STACK & INTERACTIVE WEB EXPERIENCES",
  headline: "Building scalable full-stack applications with clean architectures, responsive interfaces, and interactive technical demonstrations.",
  shortBio:
    "Full Stack Developer specializing in responsive web applications, modern React/Next.js architectures, TypeScript, and interactive technical showcases. Passionate about performant user interfaces, robust backend services, and clean systems design.",
  manifesto: [
    "Full-stack engineering requires end-to-end discipline: from responsive, accessible interfaces to reliable backend APIs and clean data architectures.",
    "Performant systems prioritize simplicity and user experience. Every interaction, route transition, and server response should feel immediate, deliberate, and robust.",
    "Technical concepts and architectural demonstrations are designed with rigor to evaluate patterns, test interactive state machines, and explore modern web capabilities.",
  ],
  location: {
    city: "Mumbai / Pune (Candidate Region)",
    country: "India",
    timezone: "Asia/Kolkata",
    utcOffset: "UTC+05:30",
    coordinates: "18.5204° N, 73.8567° E",
    isVerifiedRegion: false,
  },
  availability: {
    status: "available",
    statusText: "AVAILABLE FOR FULL-STACK & WEB ENGINEERING ROLES",
    notice: "Open to full-time Full Stack Developer, Frontend Engineering, and Web Development opportunities.",
  },
  stats: [
    {
      label: "CORE DISCIPLINES",
      value: "05",
      unit: "AREAS",
      description: "Frontend Architecture, Backend APIs, State Management, Responsive UI, Interactive Demos",
    },
    {
      label: "CASE STUDIES",
      value: "05",
      unit: "CONCEPTS",
      isSimulated: true,
      description: "Full-stack architectural demonstration concepts and interactive technical prototypes",
    },
    {
      label: "TARGET LATENCY",
      value: "<50",
      unit: "MS",
      isSimulated: true,
      description: "Client-side interactive state transition and render target across routes",
    },
    {
      label: "DESIGN THEMES",
      value: "03",
      unit: "MODES",
      isSimulated: false,
      description: "Technical Brutalism, Crimson Noir, and Signal Studio fully implemented",
    },
  ],
  editorialTags: [
    "FULL-STACK WEB",
    "NEXT.JS & REACT",
    "TYPESCRIPT",
    "TAILWIND CSS",
    "API DESIGN",
    "INTERACTIVE UI",
    "STATE MACHINES",
    "TECHNICAL DEMOS",
  ],
};
