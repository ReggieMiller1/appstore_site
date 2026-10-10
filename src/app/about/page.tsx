import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { TechnologyBadge } from "@/components/TechnologyBadge";
import { getProfileBundle, getSiteConfig } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: "About",
    description: `About ${siteConfig.name} — ${siteConfig.role}.`,
  };
}

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();
  const { skillCategories, timeline, whatIBuild } = await getProfileBundle();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <SectionHeading
        eyebrow="About Me"
        title={`Hi, I'm ${siteConfig.name}`}
        description={siteConfig.role}
      />

      <div className="reveal space-y-4 text-muted">
        <p>
          {siteConfig.about_intro ||
            "I'm a developer who enjoys building complete, working products — not just prototypes."}
        </p>
      </div>

      {/* Journey */}
      {timeline.length > 0 && (
        <section className="mt-16">
          <h2 className="reveal mb-8 text-2xl font-semibold">My Journey</h2>
          <ol className="relative space-y-10 border-l border-border pl-8">
            {timeline.map((entry) => (
              <li key={entry.title} className="reveal relative">
                <span className="absolute -left-[2.15rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-background" />
                {entry.year && (
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-accent">
                    {entry.year}
                  </span>
                )}
                <h3 className="font-semibold">{entry.title}</h3>
                <p className="mt-1 text-sm text-muted">{entry.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <section className="mt-16">
          <h2 className="reveal mb-8 text-2xl font-semibold">Skills</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div
                key={cat.category}
                className="reveal rounded-2xl border border-border bg-surface p-5"
              >
                <h3 className="mb-3 font-semibold">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <TechnologyBadge key={skill} label={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What I Build */}
      {whatIBuild.length > 0 && (
        <section className="mt-16">
          <h2 className="reveal mb-8 text-2xl font-semibold">What I Build</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {whatIBuild.map((item) => (
              <div
                key={item}
                className="reveal rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition-colors hover:border-accent"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
