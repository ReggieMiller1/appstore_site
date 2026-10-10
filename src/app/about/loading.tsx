import { Skeleton, TextBlockSkeleton } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-10">
        <Skeleton className="mb-3 h-5 w-24 rounded-full" />
        <Skeleton className="mb-3 h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-56" />
      </div>
      <TextBlockSkeleton lines={3} />

      <div className="mt-16">
        <Skeleton className="mb-8 h-7 w-36" />
        <div className="space-y-10 border-l border-border pl-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64 max-w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Skeleton className="mb-8 h-7 w-20" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-5">
              <Skeleton className="mb-3 h-4 w-24" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
