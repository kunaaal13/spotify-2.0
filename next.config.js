/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['i.scdn.co', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
