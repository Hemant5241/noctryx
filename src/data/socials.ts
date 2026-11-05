/**
 * =============================================================================
 * SOCIAL & CONTACT COORDINATES — OM SHINDE PORTFOLIO
 * =============================================================================
 * 
 * Centralized contact links and social channels.
 * Replace placeholder URLs with Om's verified social profiles when available.
 * =============================================================================
 */

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  isPlaceholder: boolean;
  category: "code" | "professional" | "contact" | "research";
  iconName: "Github" | "Linkedin" | "Mail" | "Twitter" | "Terminal" | "FileText";
}

export const socialsData: SocialLink[] = [
  {
    id: "github",
    label: "GITHUB",
    handle: "@omshinde-ai (Placeholder)",
    url: "https://github.com/placeholder-om-shinde",
    isPlaceholder: true,
    category: "code",
    iconName: "Github",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: "in/om-shinde (Placeholder)",
    url: "https://linkedin.com/in/placeholder-om-shinde",
    isPlaceholder: true,
    category: "professional",
    iconName: "Linkedin",
  },
  {
    id: "email",
    label: "EMAIL DIRECT",
    handle: "omshinde.ai.engineer@example.com",
    url: "mailto:omshinde.ai.engineer@example.com",
    isPlaceholder: true,
    category: "contact",
    iconName: "Mail",
  },
  {
    id: "resume",
    label: "CURRICULUM VITAE",
    handle: "OM_SHINDE_AI_RESUME.PDF",
    url: "#contact",
    isPlaceholder: true,
    category: "research",
    iconName: "FileText",
  },
];

export const contactDetails = {
  primaryEmail: "omshinde.ai.engineer@example.com",
  secondaryContact: "Available via Contact Terminal",
  gpgKeyFingerprint: "4A9F 1B2C 3D4E 5F60 7A8B 9C0D 1E2F 3A4B 5C6D 7E8F (Simulated)",
  responseExpectation: "Typical response time: < 24 hours for engineering inquiries",
  currentLocation: "Mumbai / Pune, Maharashtra, India",
  timezone: "IST (UTC +5:30)",
};
