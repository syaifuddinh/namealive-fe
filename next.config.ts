import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
          {
            source: "/",
            destination: "/p",
            permanent: true
          }
        ];
      }
};

export default nextConfig;
