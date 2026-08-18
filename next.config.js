/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/campaigns",
        destination: "/programs",
        permanent: true,
      },
      {
        source: "/medical-container",
        destination: "/programs",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
