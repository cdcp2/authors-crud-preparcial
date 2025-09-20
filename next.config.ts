import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/authors/:path*',
        destination: 'http://127.0.0.1:8080/api/authors/:path*',
      },
    ];
  },
};

export default nextConfig;
