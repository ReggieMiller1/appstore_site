import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { AppCard } from "@/components/AppCard";
import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedApps, getFeaturedProjects, getProfileBundle, getSiteConfig } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredApps, featuredProjectsAll, siteConfig, profile] = await Promise.all([
    getFeaturedApps(),
    getFeaturedProjects(),
    getSiteConfig(),
    getProfileBundle(),
  ]);
  const featuredProjects = featuredProjectsAll.slice(0, 3);
  const { featuredSkills, whatIBuild } = profile;

  return (
    <>
      <Hero apps={featuredApps} siteConfig={siteConfig} />

      {/* Featured Apps */}
      {featuredApps.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            eyebrow="Featured"
            title="Featured Apps"
            description="A few applications I've built recently — offline-first, real-time, and production-focused."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
          <div className="reveal mt-10 text-center">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              View all apps
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* About Me */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              About Me
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              I&apos;m {siteConfig.name}, a developer who ships complete products.
            </h2>
            <p className="mt-5 text-muted">
              {siteConfig.about_intro ||
                "I design and build mobile apps, web platforms, and backend systems end to end — from data model to UI polish."}
            </p>
            {whatIBuild.length > 0 && (
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-foreground/80">
                {whatIBuild.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              More about me
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="reveal relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface-2">
            <Image
              src="/icons/profile-placeholder.svg"
              alt="[PROFILE PHOTO]"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Skills */}
      {featuredSkills.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            align="center"
            eyebrow="Skills"
            title="Technologies I work with"
            description="A toolkit built around shipping reliable, real-world software."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {featuredSkills.map((skill) => (
              <span
                key={skill}
                className="reveal rounded-2xl border border-border bg-surface px-5 py-3 text-sm font-medium shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {featuredProjects.length > 0 && (
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <SectionHeading
              eyebrow="Portfolio"
              title="Selected Projects"
              description="A mix of mobile, web, and backend work."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <div className="reveal mt-10 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h2 className="reveal text-3xl font-semibold tracking-tight sm:text-4xl">
          Have an idea? Let&apos;s build it.
        </h2>
        <p className="reveal mt-4 text-muted">
          Whether it&apos;s a mobile app, a web platform, or a backend system —
          I&apos;d love to hear about it.
        </p>
        <Link
          href="/contact"
          className="reveal mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Contact Me
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
