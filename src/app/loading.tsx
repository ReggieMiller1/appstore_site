import { Skeleton, CardGridSkeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Skeleton className="mb-6 h-7 w-44 rounded-full" />
            <Skeleton className="mb-3 h-12 w-full max-w-md" />
            <Skeleton className="mb-6 h-12 w-3/4 max-w-sm" />
            <Skeleton className="mb-9 h-5 w-80 max-w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
          <Skeleton className="hidden h-[420px] rounded-3xl lg:block" />
        </div>
      </section>

      {/* Featured Apps */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10">
          <Skeleton className="mb-3 h-5 w-24 rounded-full" />
          <Skeleton className="h-9 w-56" />
        </div>
        <CardGridSkeleton variant="app" count={3} />
      </section>
    </>
  );
}
