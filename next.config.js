/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xsgames.co",
        port: "",
        pathname: "/randomusers/**",
      },
    ],
  },
};

module.exports = nextConfig;
