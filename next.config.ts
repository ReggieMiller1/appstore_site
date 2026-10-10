import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",

    // Only allow private-IP images in development.
    dangerouslyAllowLocalIP: isDev,

    remotePatterns: [
      // The CMS backend, in development.
      ...(isDev
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "4000",
              pathname: "/uploads/**",
            },
            // Optional: also allow the loopback literal, in case something
            // builds URLs with 127.0.0.1 instead of localhost.
            {
              protocol: "http" as const,
              hostname: "127.0.0.1",
              port: "4000",
              pathname: "/uploads/**",
            },
          ]
        : []),

      // Production backend
      // {
      //   protocol: "https",
      //   hostname: "api.yourdomain.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

export default nextConfig;
