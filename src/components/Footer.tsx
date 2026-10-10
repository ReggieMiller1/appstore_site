import Link from "next/link";
import { Code2, Briefcase, Mail } from "lucide-react";
import { AppItem, ProjectItem } from "@/types";
import { SiteConfig } from "@/lib/api";

export function Footer({
  siteConfig,
  apps,
  projects,
}: {
  siteConfig: SiteConfig;
  apps: AppItem[];
  projects: ProjectItem[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="text-gradient">
              {siteConfig.name === "[YOUR NAME]" ? "YourName" : siteConfig.name}
            </span>
            .dev
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Building digital products — mobile apps, web platforms, and backend
            systems — designed with real users in mind.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.github}
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-surface-2"
            >
              <Code2 className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.linkedin}
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-surface-2"
            >
              <Briefcase className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-surface-2"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-accent">Home</Link></li>
            <li><Link href="/apps" className="hover:text-accent">Apps</Link></li>
            <li><Link href="/projects" className="hover:text-accent">Projects</Link></li>
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Apps</h4>
          <ul className="space-y-2 text-sm text-muted">
            {apps.slice(0, 4).map((app) => (
              <li key={app.slug}>
                <Link href={`/apps/${app.slug}`} className="hover:text-accent">
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Projects</h4>
          <ul className="space-y-2 text-sm text-muted">
            {projects.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <Link href="/projects" className="hover:text-accent">
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
