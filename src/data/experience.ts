/**
 * =============================================================================
 * CAREER & EDUCATION TIMELINE — HEMANT BHOSALE PORTFOLIO
 * =============================================================================
 * 
 * IMPORTANT VERIFICATION NOTICE:
 * Because verified historical employment and university credentials for Hemant Bhosale
 * have not yet been provided, the entries below are clearly marked as EDITABLE
 * DEMO CONTENT.
 * 
 * Hemant Bhosale can easily replace these entries with his actual background,
 * dates, universities, degrees, and companies.
 * =============================================================================
 */

export interface TimelineEntry {
  id: string;
  period: string;
  roleOrDegree: string;
  institutionOrCompany: string;
  location: string;
  type: "experience" | "education";
  isEditablePlaceholder: true;
  verificationStatus: "specimen_placeholder";
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experienceData: TimelineEntry[] = [
  {
    id: "exp-01",
    period: "2024 — PRESENT",
    roleOrDegree: "Full Stack Developer (Demonstration Specimen)",
    institutionOrCompany: "Software Engineering Lab (Demonstration Placeholder)",
    location: "Pune / Remote",
    type: "experience",
    isEditablePlaceholder: true,
    verificationStatus: "specimen_placeholder",
    summary:
      "Building end-to-end full-stack web applications, interactive technical prototypes, and API services with Next.js, TypeScript, and modern backend frameworks.",
    highlights: [
      "Developed responsive Next.js frontends integrated with REST and streaming APIs.",
      "Constructed interactive state machines and data visualization tools with strict TypeScript typing.",
      "Created automated testing, deployment configurations, and modular UI component libraries.",
    ],
    technologies: ["TypeScript", "Next.js", "React", "Node.js", "Tailwind CSS", "FastAPI", "PostgreSQL"],
  },
  {
    id: "exp-02",
    period: "2023 — 2024",
    roleOrDegree: "Web & Application Developer (Demonstration Specimen)",
    institutionOrCompany: "Digital Products Studio (Demonstration Placeholder)",
    location: "Mumbai, India",
    type: "experience",
    isEditablePlaceholder: true,
    verificationStatus: "specimen_placeholder",
    summary:
      "Developed full-stack web interfaces, responsive client layouts, and backend data services for dynamic web applications.",
    highlights: [
      "Built responsive user interfaces with Tailwind CSS and React component architectures.",
      "Implemented RESTful API endpoints and integrated client-side data fetching with caching.",
      "Structured relational schemas and optimized queries for performant web interactions.",
    ],
    technologies: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "exp-03",
    period: "2022 — 2023",
    roleOrDegree: "Frontend Developer (Demonstration Specimen)",
    institutionOrCompany: "Web Engineering Studio (Demonstration Placeholder)",
    location: "Pune, India",
    type: "experience",
    isEditablePlaceholder: true,
    verificationStatus: "specimen_placeholder",
    summary:
      "Crafted high-fidelity web interfaces, interactive components, and clean CSS design systems.",
    highlights: [
      "Engineered accessible, responsive layouts optimized for mobile, tablet, and desktop viewports.",
      "Collaborated on UI design implementations using modern CSS, SVG animations, and semantic HTML.",
      "Maintained modular component codebases and ensured cross-browser compatibility.",
    ],
    technologies: ["JavaScript", "TypeScript", "React", "HTML5/CSS3", "Tailwind CSS", "Git"],
  },
];

export const educationData: TimelineEntry[] = [
  {
    id: "edu-01",
    period: "2020 — 2024",
    roleOrDegree: "Bachelor of Technology in Computer Science (Demonstration Placeholder)",
    institutionOrCompany: "University Engineering Institute (Awaiting Verified Institution)",
    location: "Maharashtra, India",
    type: "education",
    isEditablePlaceholder: true,
    verificationStatus: "specimen_placeholder",
    summary:
      "Comprehensive foundation in computer science, software engineering, algorithms, web technologies, and database systems.",
    highlights: [
      "Coursework: Data Structures & Algorithms, Database Management Systems, Web Development, Software Engineering.",
      "Academic Projects: Interactive full-stack web applications and database-backed services.",
      "Participation: Technical workshops and open-source software explorations.",
    ],
    technologies: ["Data Structures", "Algorithms", "Web Technologies", "SQL", "TypeScript", "Python"],
  },
];
