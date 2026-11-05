import type { NextConfig } from "next";

// Uploaded icons/screenshots/project images are served by the CMS backend,
// so the image config is derived from the same API_URL the data layer uses
// (src/lib/api.ts) rather than hardcoding a host in two places.


// Next.js's image optimizer has SSRF protection: it refuses to fetch an
// upstream image whose host resolves to a private/loopback address, and
// reports that as a 400 '"url" parameter is not allowed' — even when the
// host is listed in remotePatterns. That's exactly the situation in local
// development (backend on localhost:4000), so every icon/screenshot 400'd.
// Only relax that check when the backend really is local; with a real
// deployed domain it stays off.

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         pathname: "/appstore/**",
//       },
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         pathname: "/appstore/**",
//       },
//     ],
//     dangerouslyAllowLocalIP: true,
//   },
// };
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qenikxdyxzvoegqriluu.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};
export default nextConfig;
