import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AppItem } from "@/types";
import { SiteConfig } from "@/lib/api";

export function Hero({ apps, siteConfig }: { apps: AppItem[]; siteConfig: SiteConfig }) {
  const featured = apps.slice(0, 3);

  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-accent/20 blur-[120px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="reveal mb-6 inline-block rounded-full border border-border bg-surface-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
            {siteConfig.role}
          </span>
          <h1 className="reveal text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="reveal mt-6 max-w-lg text-lg text-muted">{siteConfig.description}</p>

          <div className="reveal mt-9 flex flex-wrap gap-3">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore My Apps
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface-2"
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-accent"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="reveal relative hidden h-[420px] lg:block">
          {featured.map((app, i) => (
            <div
              key={app.slug}
              className={`absolute w-56 rounded-2xl border border-border bg-surface p-4 shadow-xl transition-transform hover:-translate-y-2 ${
                i === 0
                  ? "left-6 top-0 rotate-[-6deg]"
                  : i === 1
                  ? "left-32 top-40 rotate-[3deg] z-10"
                  : "left-6 top-[280px] rotate-[6deg]"
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-2">
                  <Image src={app.icon} alt={app.name} width={36} height={36} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{app.name}</p>
                  <p className="text-[11px] text-muted">{app.platform.join(", ")}</p>
                </div>
              </div>
              <p className="line-clamp-2 text-xs text-muted">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
