"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/ErrorState";

/**
 * Catches errors thrown while rendering any page under this segment —
 * including the backend fetch failures from src/lib/api.ts (connection
 * refused, timeouts, non-OK responses). Without this file, those errors
 * were unhandled: Next.js fell back to its generic, unstyled error page,
 * which is what made "data doesn't appear" look unrecoverable short of a
 * manual refresh. `reset()` re-renders this route segment and re-runs its
 * data fetch, which is what the Retry button below uses.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-24">
      <ErrorState message={error.message} onRetry={reset} />
    </div>
  );
}
