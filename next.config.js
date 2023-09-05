/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co",'firebasestorage.googleapis.com','media.licdn.com'],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "webapi.titandeve.info",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
