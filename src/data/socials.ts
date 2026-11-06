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
  verificationStatus: "placeholder" | "verified";
}

export const socialsData: SocialLink[] = [
  {
    id: "github",
    label: "GITHUB",
    handle: "[AWAITING USER CONFIGURATION]",
    url: "https://github.com",
    isPlaceholder: true,
    verificationStatus: "placeholder",
    category: "code",
    iconName: "Github",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: "[AWAITING USER CONFIGURATION]",
    url: "https://linkedin.com",
    isPlaceholder: true,
    verificationStatus: "placeholder",
    category: "professional",
    iconName: "Linkedin",
  },
  {
    id: "email",
    label: "EMAIL DIRECT",
    handle: "omshinde.ai.engineer@example.com (Placeholder)",
    url: "mailto:omshinde.ai.engineer@example.com",
    isPlaceholder: true,
    verificationStatus: "placeholder",
    category: "contact",
    iconName: "Mail",
  },
  {
    id: "resume",
    label: "CURRICULUM VITAE",
    handle: "OM_SHINDE_AI_RESUME.PDF (Specimen)",
    url: "#contact",
    isPlaceholder: true,
    verificationStatus: "placeholder",
    category: "research",
    iconName: "FileText",
  },
];

export const contactDetails = {
  primaryEmail: "omshinde.ai.engineer@example.com",
  isEmailVerified: false,
  secondaryContact: "Available via Client-Side Contact Terminal",
  gpgKeyFingerprint: "AWAITING VERIFIED KEY // NO GPG KEY REGISTERED",
  isGpgVerified: false,
  responseExpectation: "Standard engineering inbox — Inquiries reviewed periodically (Specimen Policy)",
  currentLocation: "Mumbai / Pune, Maharashtra, India (Candidate Region)",
  timezone: "IST (UTC +5:30)",
};

/**
 * Verified Public GitHub Configuration
 * 
 * IMPORTANT:
 * Never assume developer / repository owner accounts (such as Hemant5241)
 * are Om Shinde.
 * When Om's verified username is provided, set verifiedUsername below
 * or configure NEXT_PUBLIC_GITHUB_USERNAME in environment variables.
 */
export const gitHubIntegrationConfig = {
  verifiedUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || null,
  isVerified: false,
  requiresManualVerification: true,
  documentationNotice:
    "To display live public repositories and open-source commit telemetry, provide Om's verified GitHub username in NEXT_PUBLIC_GITHUB_USERNAME or src/data/socials.ts.",
};
