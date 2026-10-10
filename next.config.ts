import type { NextConfig } from "next";

// Uploaded icons/screenshots/project images are served by the CMS backend,
// so the image config is derived from the same API_URL the data layer uses
// (src/lib/api.ts) rather than hardcoding a host in two places.
const apiUrl = new URL(
"https://appstore-siov.onrender.com"
);

// Next.js's image optimizer has SSRF protection: it refuses to fetch an
// upstream image whose host resolves to a private/loopback address, and
// reports that as a 400 '"url" parameter is not allowed' — even when the
// host is listed in remotePatterns. That's exactly the situation in local
// development (backend on localhost:4000), so every icon/screenshot 400'd.
// Only relax that check when the backend really is local; with a real
// deployed domain it stays off.
const backendIsLocal = ["localhost", "127.0.0.1", "[::1]", "::1"].includes(apiUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    dangerouslyAllowLocalIP: backendIsLocal,
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        ...(apiUrl.port ? { port: apiUrl.port } : {}),
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
