import { Skeleton, CardGridSkeleton } from "@/components/ui/Skeleton";

export default function AppsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10">
        <Skeleton className="mb-3 h-5 w-32 rounded-full" />
        <Skeleton className="mb-3 h-9 w-56" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <Skeleton className="mb-8 h-11 w-full rounded-xl" />
      <div className="mb-10 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 shrink-0 rounded-full" />
        ))}
      </div>
      <CardGridSkeleton variant="app" count={6} />
    </div>
  );
}
