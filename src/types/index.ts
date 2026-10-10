export type Platform = "Android" | "iOS" | "Windows" | "Web" | "macOS" | "Linux" | "Cross-Platform";

export type AppCategory =
  | "Productivity"
  | "Education"
  | "Business"
  | "Social"
  | "Utility"
  | "Other";

export interface DownloadLink {
  platform: Platform;
  label: string;
  url: string; // configurable, may be "#" placeholder
}

export interface AppFeature {
  title: string;
  description: string;
}

export interface AppItem {
  slug: string;
  name: string;
  description: string; // short
  longDescription: string; // detailed, supports paragraphs separated by \n\n
  icon: string; // path or emoji fallback
  screenshots: string[]; // paths
  version: string;
  platform: Platform[];
  category: AppCategory;
  technologies: string[];
  size?: string;
  releaseDate: string; // ISO date
  updatedDate: string; // ISO date
  downloads: DownloadLink[];
  githubUrl?: string;
  websiteUrl?: string;
  featured?: boolean;
  features: AppFeature[];
  /** Optional display-only lifecycle label; publish state is managed by the CMS separately. */
  status?: string;
}

export type ProjectStatus = string;

export interface ProjectItem {
  slug: string;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: "Frontend" | "Backend" | "Database" | "Tools" | "Design";
  skills: string[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}
