import { AppItem, ProjectItem, SkillCategory, TimelineEntry, DownloadLink } from "@/types";

const API_BASE = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Backend-stored paths (icons, screenshots, project images) are relative,
 * e.g. "/uploads/icons/foo.svg". Turn those into absolute URLs pointing at
 * the CMS backend; leave already-absolute URLs (http/https) untouched.
 */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) return "/icons/profile-placeholder.svg";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE}${path}`;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw Object.assign(new Error("Not found"), { status: 404 });
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed (${res.status})`);
  }
  return res.json();
}

// ---------- Apps ----------

interface ApiAppFeature {
  id?: number;
  title: string;
  description: string;
}
interface ApiAppDownload {
  id: number;
  platform: string;
  version: string;
  filename: string | null;
  external_url: string | null;
  size_bytes: number | null;
  release_date: string | null;
  download_count: number;
  url: string | null;
}
interface ApiApp {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string | null;
  version: string;
  category: string;
  developer: string;
  size: string | null;
  releaseDate: string | null;
  updatedDate: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
  featured: boolean;
  platform: string[];
  technologies: string[];
  features: ApiAppFeature[];
  screenshots: string[];
  downloads: ApiAppDownload[];
}

function mapDownload(d: ApiAppDownload): DownloadLink {
  return {
    platform: d.platform as DownloadLink["platform"],
    label: `Download for ${d.platform}`,
    url: mediaUrl(d.url),
  };
}

function mapApp(a: ApiApp): AppItem {
  return {
    slug: a.slug,
    name: a.name,
    description: a.description,
    longDescription: a.longDescription,
    icon: mediaUrl(a.icon),
    screenshots: a.screenshots.map(mediaUrl),
    version: a.version,
    platform: a.platform as AppItem["platform"],
    category: a.category as AppItem["category"],
    technologies: a.technologies,
    size: a.size || undefined,
    releaseDate: a.releaseDate || "",
    updatedDate: a.updatedDate || "",
    downloads: a.downloads.map(mapDownload),
    githubUrl: a.githubUrl || undefined,
    websiteUrl: a.websiteUrl || undefined,
    featured: a.featured,
    features: a.features.map((f) => ({ title: f.title, description: f.description })),
    // Publish state lives in the backend and already filters what the public
    // API returns, so there's no separate lifecycle status to show here.
  };
}

export async function getApps(): Promise<AppItem[]> {
  const data = await apiFetch<{ apps: ApiApp[] }>("/api/apps");
  return data.apps.map(mapApp);
}

export async function getFeaturedApps(): Promise<AppItem[]> {
  const apps = await getApps();
  return apps.filter((a) => a.featured);
}

export async function getApp(slug: string): Promise<AppItem | null> {
  try {
    const data = await apiFetch<{ app: ApiApp }>(`/api/apps/${slug}`);
    return mapApp(data.app);
  } catch (err) {
    if ((err as { status?: number }).status === 404) return null;
    throw err;
  }
}

// ---------- Projects ----------

interface ApiProject {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string | null;
  status: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  technologies: string[];
  features: string[];
}

function mapProject(p: ApiProject): ProjectItem {
  return {
    slug: p.slug,
    name: p.name,
    description: p.description,
    image: mediaUrl(p.image),
    technologies: p.technologies,
    features: p.features,
    status: p.status as ProjectItem["status"],
    githubUrl: p.githubUrl || undefined,
    liveUrl: p.liveUrl || undefined,
    featured: p.featured,
  };
}

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await apiFetch<{ projects: ApiProject[] }>("/api/projects");
  return data.projects.map(mapProject);
}

export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

// ---------- Profile / site content ----------

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  about_intro?: string;
}

interface ProfileBundle {
  settings: Record<string, string>;
  skillCategories: SkillCategory[];
  featuredSkills: string[];
  timeline: TimelineEntry[];
  whatIBuild: string[];
  socialLinks: { platform: string; url: string }[];
}

export async function getProfileBundle(): Promise<ProfileBundle> {
  return apiFetch<ProfileBundle>("/api/profile");
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const { settings } = await getProfileBundle();
  return {
    name: settings.name || "[YOUR NAME]",
    role: settings.role || "",
    tagline: settings.tagline || "",
    description: settings.description || "",
    email: settings.email || "[YOUR EMAIL]",
    github: settings.github || "[GITHUB URL]",
    linkedin: settings.linkedin || "[LINKEDIN URL]",
    location: settings.location || "",
    about_intro: settings.about_intro,
  };
}

// ---------- Contact ----------

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  await apiFetch("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function recordPageView(path: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/stats/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
      cache: "no-store",
    });
  } catch {
    // Non-critical — never let view tracking break the page.
  }
}
