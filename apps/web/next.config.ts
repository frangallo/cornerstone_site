import { withCMS } from "@repo/cms/next-config";
import { config } from "@repo/next-config";
import type { NextConfig } from "next";

let nextConfig: NextConfig = { ...config };

nextConfig.images?.remotePatterns?.push({
  protocol: "https",
  hostname: "assets.basehub.com",
});

if (process.env.NODE_ENV === "production") {
  const redirects: NextConfig["redirects"] = async () => [
    {
      source: "/legal",
      destination: "/legal/privacy",
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

export default withCMS(nextConfig);
