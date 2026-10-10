import { Skeleton, CardGridSkeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10">
        <Skeleton className="mb-3 h-5 w-24 rounded-full" />
        <Skeleton className="mb-3 h-9 w-48" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <CardGridSkeleton variant="project" count={6} />
    </div>
  );
}
