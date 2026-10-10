import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { AppItem } from "@/types";
import { TechnologyBadge } from "./TechnologyBadge";

export function AppCard({ app }: { app: AppItem }) {
  return (
    <div className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2">
          <Image src={app.icon} alt={`${app.name} icon`} width={48} height={48} />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{app.name}</h3>
          <span className="text-xs text-muted">{app.platform.join(" · ")}</span>
        </div>
        {app.status && (
          <span className="ml-auto rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
            {app.status}
          </span>
        )}
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-muted">{app.description}</p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {app.technologies.slice(0, 3).map((tech) => (
          <TechnologyBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 text-xs text-muted">
        <span>v{app.version}</span>
        <span>{app.category}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/apps/${app.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          View details
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        {app.downloads[0] && (
          <a
            href={app.downloads[0].url}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        )}
      </div>
    </div>
  );
}
