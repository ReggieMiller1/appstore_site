import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="mb-10">
        <Skeleton className="mb-3 h-5 w-28 rounded-full" />
        <Skeleton className="mb-3 h-9 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
