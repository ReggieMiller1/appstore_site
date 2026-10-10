import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Code2, Globe, HardDrive, Tag } from "lucide-react";
import { getApp, getApps } from "@/lib/api";
import { TechnologyBadge } from "@/components/TechnologyBadge";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { DownloadButton } from "@/components/DownloadButton";
import { AppCard } from "@/components/AppCard";

// Content is managed live from the CMS, so these pages are rendered
// per-request rather than statically generated at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) return {};
  return {
    title: app.name,
    description: app.description,
    openGraph: {
      title: app.name,
      description: app.description,
      images: [app.icon],
    },
  };
}

export default async function AppDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) return notFound();

  const allApps = await getApps();
  const related = allApps.filter((a) => a.slug !== app.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <Link
        href="/apps"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all apps
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2">
          <Image src={app.icon} alt={`${app.name} icon`} width={64} height={64} />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{app.name}</h1>
            {app.status && (
              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">
                {app.status}
              </span>
            )}
          </div>
          <p className="max-w-2xl text-muted">{app.description}</p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-4 w-4" /> v{app.version}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" /> {app.platform.join(", ")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Updated {new Date(app.updatedDate).toLocaleDateString("en-GB", { year: "numeric", month: "long" })}
            </span>
            {app.size && (
              <span className="inline-flex items-center gap-1.5">
                <HardDrive className="h-4 w-4" /> {app.size}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {app.downloads.map((d) => (
              <DownloadButton key={d.platform} link={d} />
            ))}
            {app.githubUrl && (
              <a
                href={app.githubUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-2"
              >
                <Code2 className="h-4 w-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <section className="mt-14">
        <h2 className="mb-5 text-xl font-semibold">Screenshots</h2>
        <ScreenshotGallery images={app.screenshots} alt={app.name} />
      </section>

      {/* About */}
      <section className="mt-14 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">About {app.name}</h2>
          <div className="space-y-4 text-muted">
            {app.longDescription.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Technology</h2>
          <div className="flex flex-wrap gap-2">
            {app.technologies.map((tech) => (
              <TechnologyBadge key={tech} label={tech} />
            ))}
          </div>

          <h2 className="mb-4 mt-8 text-xl font-semibold">Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border py-2">
              <dt className="text-muted">Category</dt>
              <dd>{app.category}</dd>
            </div>
            <div className="flex justify-between border-b border-border py-2">
              <dt className="text-muted">Released</dt>
              <dd>{new Date(app.releaseDate).toLocaleDateString("en-GB", { year: "numeric", month: "short" })}</dd>
            </div>
            <div className="flex justify-between border-b border-border py-2">
              <dt className="text-muted">Version</dt>
              <dd>{app.version}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Features */}
      <section className="mt-14">
        <h2 className="mb-5 text-xl font-semibold">Features</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {app.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
            >
              <p className="mb-1 font-medium">✓ {feature.title}</p>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section className="mt-14 rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold">Download {app.name}</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Available on {app.platform.join(" and ")}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {app.downloads.map((d) => (
            <DownloadButton key={d.platform} link={d} />
          ))}
        </div>
      </section>

      {/* Related apps */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-xl font-semibold">More apps</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <AppCard key={a.slug} app={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
