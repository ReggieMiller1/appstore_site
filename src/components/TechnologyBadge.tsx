export function TechnologyBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-foreground/80">
      {label}
    </span>
  );
}
