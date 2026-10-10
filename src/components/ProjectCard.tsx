import Image from "next/image";
import { Code2, ExternalLink, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "@/types";
import { TechnologyBadge } from "./TechnologyBadge";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="reveal group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-semibold">{project.name}</h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
            {project.status}
          </span>
        </div>

        <p className="mb-4 text-sm text-muted">{project.description}</p>

        <ul className="mb-4 space-y-1.5">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-foreground/80">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-2" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <TechnologyBadge key={tech} label={tech} />
          ))}
        </div>

        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              <Code2 className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
