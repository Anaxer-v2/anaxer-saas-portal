/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
  async redirects() {
    return [
      {
        source: '/workspace',
        destination: '/workspace/overview',
        permanent: true,
      },
      // ... other redirects
    ]
  },
  async rewrites() {
    return [
      {
        source: '/workspace/form-builder',
        destination: '/workspace/form-builder',
      },
    ]
  },
};

module.exports = nextConfig;
