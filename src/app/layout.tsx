import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import { getApps, getProjects, getSiteConfig, type SiteConfig } from "@/lib/api";

// Used only if the backend is briefly unreachable while the root layout
// renders (see the try/catch below) — never shown when the fetch succeeds.
const FALLBACK_SITE_CONFIG: SiteConfig = {
  name: "[YOUR NAME]",
  role: "",
  tagline: "",
  description: "",
  email: "[YOUR EMAIL]",
  github: "[GITHUB URL]",
  linkedin: "[LINKEDIN URL]",
  location: "",
};

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig().catch(() => FALLBACK_SITE_CONFIG);
  return {
    title: {
      default: `${siteConfig.name} — ${siteConfig.role}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      title: `${siteConfig.name} — ${siteConfig.role}`,
      description: siteConfig.description,
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The Navbar/Footer here wrap every route, including this page's own
  // content in `children`. If this fetch throws, there is no error.tsx
  // that can catch it — error.tsx boundaries live *inside* this layout,
  // so they can't catch a failure in the layout itself (only
  // global-error.tsx can, and that replaces the entire document). A
  // transient backend hiccup here would previously take down the whole
  // site — every page, not just the data-driven content — with Next.js's
  // raw, unstyled crash screen.
  //
  // Nav/footer branding and links aren't critical to any single page
  // working, so on failure we fall back to safe defaults here and let
  // `children` (the actual page) handle its own fetch/error/loading state
  // independently, exactly as it already does. This keeps a backend
  // hiccup from being an all-or-nothing failure for the entire app.
  let siteConfig: SiteConfig = FALLBACK_SITE_CONFIG;
  let apps: Awaited<ReturnType<typeof getApps>> = [];
  let projects: Awaited<ReturnType<typeof getProjects>> = [];

  try {
    [siteConfig, apps, projects] = await Promise.all([getSiteConfig(), getApps(), getProjects()]);
  } catch (err) {
    console.error("Root layout: failed to load site config/apps/projects:", err);
  }

  return (
    <html data-scroll-behavior="smooth" lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <ScrollRevealInit />
          <Navbar siteName={siteConfig.name} />
          <main className="flex-1">{children}</main>
          <Footer siteConfig={siteConfig} apps={apps} projects={projects} />
        </ThemeProvider>
      </body>
    </html>
  );
}
