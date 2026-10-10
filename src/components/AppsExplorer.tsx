"use client";

import { useMemo, useState } from "react";
import { Search, PackageOpen, SearchX } from "lucide-react";
import { AppItem, AppCategory, Platform } from "@/types";
import { AppCard } from "./AppCard";
import { EmptyState } from "./ui/EmptyState";

type FilterValue = "All" | Platform | AppCategory;

const filters: FilterValue[] = [
  "All",
  "Android",
  "Windows",
  "Web",
  "Productivity",
  "Education",
  "Business",
  "Other",
];

export function AppsExplorer({ apps }: { apps: AppItem[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("All");

  const results = useMemo(() => {
    return apps.filter((app) => {
      const matchesQuery =
        !query.trim() ||
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase()) ||
        app.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesFilter =
        filter === "All" ||
        app.platform.includes(filter as Platform) ||
        app.category === filter;

      return matchesQuery && matchesFilter;
    });
  }, [apps, query, filter]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps..."
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      <div className="scrollbar-thin mb-10 flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-foreground/80 hover:bg-surface-2"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {apps.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No apps published yet"
          message="Check back soon — apps will show up here as they're added."
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No apps match your search"
          message="Try a different search term or clear your filters."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
