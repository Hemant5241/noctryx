import { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://omshinde.dev"; // Representative domain

  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date("2026-11-06"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectRoutes,
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
