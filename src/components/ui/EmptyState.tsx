import { Inbox, type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  message,
}: {
  icon?: LucideIcon;
  title: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-20 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2">
        <Icon className="h-6 w-6 text-muted" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>}
    </div>
  );
}
