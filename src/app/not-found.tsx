import Link from "next/link";
import { CompassIcon } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24">
      <EmptyState
        icon={CompassIcon}
        title="Page not found"
        message="The page you're looking for doesn't exist or may have been moved."
      />
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
