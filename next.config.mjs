/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
