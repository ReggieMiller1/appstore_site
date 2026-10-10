import { Skeleton, TextBlockSkeleton } from "@/components/ui/Skeleton";

export default function AppDetailsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <Skeleton className="mb-8 h-5 w-32" />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-9 w-64 max-w-full" />
          <Skeleton className="h-4 w-80 max-w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 w-40 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Skeleton className="mb-5 h-6 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-64 w-36 shrink-0 rounded-2xl sm:h-80 sm:w-44" />
          <Skeleton className="h-64 w-36 shrink-0 rounded-2xl sm:h-80 sm:w-44" />
          <Skeleton className="h-64 w-36 shrink-0 rounded-2xl sm:h-80 sm:w-44" />
        </div>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="mb-4 h-6 w-40" />
          <TextBlockSkeleton lines={5} />
        </div>
        <div>
          <Skeleton className="mb-4 h-6 w-28" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
