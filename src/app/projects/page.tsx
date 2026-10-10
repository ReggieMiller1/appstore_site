import type { Metadata } from "next";
import { FolderOpen } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProjects } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects I've built across mobile, web, and backend.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Portfolio"
        title="Projects"
        description="A closer look at the systems and products I've built end to end."
      />
      {projects.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No projects published yet"
          message="Check back soon — projects will show up here as they're added."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
