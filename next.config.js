/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["placehold.co",'firebasestorage.googleapis.com','media.licdn.com','https://images.unsplash.com', 'images.offerup.com'],
    domains:['*'],
    formats: ["image/avif", "image/webp"],
   
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "placehold.co",
      //   port: "",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "images.offerup.com",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
  },
};

module.exports = nextConfig;
