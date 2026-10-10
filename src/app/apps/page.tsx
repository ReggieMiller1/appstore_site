import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AppsExplorer } from "@/components/AppsExplorer";
import { getApps } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apps",
  description: "Browse and download all applications I've built.",
};

export default async function AppsPage() {
  const apps = await getApps();
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="App Marketplace"
        title="All Apps"
        description="Browse every application I've built. Search or filter by platform and category."
      />
      <AppsExplorer apps={apps} />
    </div>
  );
}
