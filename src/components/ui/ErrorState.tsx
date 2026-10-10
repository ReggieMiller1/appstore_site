"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-20 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="h-6 w-6 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold">Something went wrong</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">
        {message || "We couldn't load this content. The server may be temporarily unavailable."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}
