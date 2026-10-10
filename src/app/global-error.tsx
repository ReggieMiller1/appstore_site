"use client";

/**
 * Only activates if an error escapes the root layout entirely — e.g. a bug
 * in layout.tsx itself, not just its data fetch (that case is now handled
 * gracefully inside layout.tsx with a try/catch, so this should rarely if
 * ever fire). Per Next.js's architecture, a regular error.tsx cannot catch
 * errors thrown by the root layout, because error.tsx boundaries live
 * *inside* that layout; only global-error.tsx can, and it has to replace
 * the entire document (own <html>/<body>) since the layout that would
 * normally provide them is itself what failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            {error.message || "The application hit an unexpected error."}
          </p>
          <button
            onClick={reset}
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "999px",
              padding: "0.65rem 1.5rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
