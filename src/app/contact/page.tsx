import type { Metadata } from "next";
import { Code2, Briefcase, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { getSiteConfig } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: "Contact",
    description: `Get in touch with ${siteConfig.name}.`,
  };
}

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact Me"
        description="Have an idea, a project, or an opportunity? I'd love to hear from you."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="reveal rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="reveal space-y-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent"
          >
            <Mail className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted">{siteConfig.email}</p>
            </div>
          </a>

          <a
            href={siteConfig.github}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent"
          >
            <Code2 className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium">GitHub</p>
              <p className="text-xs text-muted">{siteConfig.github}</p>
            </div>
          </a>

          <a
            href={siteConfig.linkedin}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent"
          >
            <Briefcase className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <p className="text-xs text-muted">{siteConfig.linkedin}</p>
            </div>
          </a>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
            <MapPin className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-xs text-muted">{siteConfig.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
