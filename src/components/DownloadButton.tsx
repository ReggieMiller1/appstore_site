import { Download, Globe, Monitor, Smartphone, Apple, Terminal } from "lucide-react";
import { DownloadLink } from "@/types";

const platformIcon: Record<string, React.ElementType> = {
  Android: Smartphone,
  iOS: Apple,
  Windows: Monitor,
  macOS: Apple,
  Web: Globe,
  Linux: Terminal,
  "Cross-Platform": Download,
};

export function DownloadButton({
  link,
  variant = "primary",
}: {
  link: DownloadLink;
  variant?: "primary" | "secondary";
}) {
  const Icon = platformIcon[link.platform] ?? Download;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:opacity-90 hover:scale-[1.02]"
      : "border border-border bg-surface hover:bg-surface-2";

  return (
    <a href={link.url} className={`${base} ${styles}`} target={link.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      <Icon className="h-4 w-4" />
      {link.label}
    </a>
  );
}
